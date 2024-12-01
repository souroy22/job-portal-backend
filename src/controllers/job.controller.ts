import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import { Company } from "../models/Company.model";
import AppError from "../utils/AppError.util";
import { Job } from "../models/Job.model";
import { paginate } from "../utils/pagination.util";
import { Application } from "../models/Application.model";
import { JobSeekerProfile } from "../models/JobSeeker.model";

const jobController = {
  createJob: catchAsync(async (req: Request, res: Response) => {
    const {
      companySlug,
      title,
      description,
      location,
      jobType,
      salary,
      skills,
    } = req.body;
    if (!req.user.user.finishedProfile) {
      throw new AppError("Please create your company profile first", 400);
    }
    if (
      !title ||
      !description ||
      !location ||
      !jobType ||
      !Number(salary) ||
      !skills ||
      !Array.isArray(skills) ||
      !skills.length
    ) {
      throw new AppError("Please fill all the details", 400);
    }
    const userId = req.user.user.id;
    if (!req.user.user.finishedProfile) {
      throw new AppError("Please create your company profile first", 400);
    }
    const company = await Company.findOne({ slug: companySlug });
    if (!company) {
      throw new AppError("Company not found", 400);
    }
    const newJob = new Job({
      title,
      description,
      location,
      jobType,
      salary: Number(salary),
      requirements: skills,
      postedBy: userId,
      company: company.id,
    });
    await newJob.save();
    return res.status(200).json({ message: "Job created successfully" });
  }),
  getAllJobs: catchAsync(async (req: Request, res: Response) => {
    const { searchQuery, location, jobType } = req.query;
    const params: any = {};
    if (searchQuery?.toString().trim()) {
      params.$or = [
        { title: { $regex: searchQuery as string, $options: "i" } },
        { description: { $regex: searchQuery as string, $options: "i" } },
      ];
    }
    if (location?.toString().trim()) {
      params["location"] = location;
    }
    if (jobType?.toString().trim()) {
      params["jobType"] = jobType;
    }

    const jobQuery = Job.find(params).populate("company");
    const jobs: any = await paginate(jobQuery, req.pagination);
    const allJobs = [];
    for (let job of jobs.data) {
      const applied = await Application.findOne({
        jobId: job._id,
        applicant: req.user.user.id,
      });
      allJobs.push({
        title: job.title,
        description: job.description,
        company: job.company.name,
        location: job.location,
        jobType: job.jobType,
        salary: job.salary,
        requirements: job.requirements,
        logo: job.company.logo,
        id: job._id,
        applied: !!applied,
      });
    }
    return res.status(200).json({ ...jobs, data: allJobs });
  }),
  getPostedJobs: catchAsync(async (req: Request, res: Response) => {
    const jobQuery = Job.find({ postedBy: req.user.user.id }).populate(
      "company"
    );
    const jobs: any = await paginate(jobQuery, req.pagination);
    const allJobs = [];
    for (let job of jobs.data) {
      const applied = await Application.findOne({
        jobId: job._id,
        applicant: req.user.user.id,
      });
      allJobs.push({
        title: job.title,
        description: job.description,
        company: job.company.name,
        location: job.location,
        jobType: job.jobType,
        salary: job.salary,
        requirements: job.requirements,
        logo: job.company.logo,
        id: job._id,
        applied: !!applied,
      });
    }
    return res.status(200).json({ ...jobs, data: allJobs });
  }),
  getJobDetails: catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const jobData: any = await Job.findById(jobId).populate("company");
    if (!jobData) {
      throw new AppError("No Job found", 404);
    }
    const applicantCount = await Application.countDocuments({ jobId });
    const filters: any = { jobId };
    if (req.user.user.role === "job_seeker") {
      filters["applicant"] = req.user.user.id;
    }
    const appliedCandidates: any = await Application.find(filters).populate(
      "applicant"
    );

    const data: any = {
      title: jobData.title,
      id: jobData._id,
      description: jobData.description,
      company: jobData.company.name,
      logo: jobData.company.logo,
      location: jobData.location,
      jobType: jobData.jobType,
      salary: jobData.salary || "Not Mentioned",
      requirements: jobData.requirements,
      applicantCount,
      status: jobData.status,
      applied: !!appliedCandidates?.length,
    };
    const applicants = [];
    if (req.user.user.role === "recruiter") {
      for (let candidate of appliedCandidates) {
        const applicantProfile = await JobSeekerProfile.findOne({
          userId: candidate.applicant._id,
        });
        applicants.push({
          name: candidate.applicant.name,
          appliedAt: candidate.createdAt,
          email: candidate.applicant.email,
          skills: applicantProfile.skills,
          resume: applicantProfile.resume,
          status: candidate.status,
          id: candidate.applicant._id,
        });
      }
    }
    data["applicants"] = applicants;
    return res.status(200).json(data);
  }),
  getRecommendedJobs: catchAsync(async (req: Request, res: Response) => {
    // Fetch the job seeker's profile
    const profile = await JobSeekerProfile.findOne({
      userId: req.user.user.id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Job seeker profile not found" });
    }

    // Destructure profile details
    const { skills, preferences } = profile;
    const { jobType, location } = preferences || {};

    // Build query conditions
    const queryConditions: any = {
      status: "open",
      requirements: { $exists: true, $not: { $size: 0 } },
    };

    if (jobType) {
      queryConditions.jobType = jobType;
    }

    if (location) {
      queryConditions.location = location;
    }

    // Fetch jobs matching query conditions
    const jobs = await Job.find(queryConditions).populate("company").lean();

    // Filter jobs to include only those with at least 60% matching requirements
    const recommendedJobs: any = jobs.filter((job) => {
      const { requirements } = job;
      if (!requirements || requirements.length === 0) return false;

      const matchingSkillsCount = requirements.filter((req: string) =>
        skills.includes(req)
      ).length;
      const matchingPercentage = matchingSkillsCount / requirements.length;

      return matchingPercentage >= 0.4;
    });

    const allJobs = [];
    for (let job of recommendedJobs) {
      const applied = await Application.findOne({
        jobId: job._id,
        applicant: req.user.user.id,
      });
      allJobs.push({
        title: job.title,
        description: job.description,
        company: job.company.name,
        location: job.location,
        jobType: job.jobType,
        salary: job.salary,
        requirements: job.requirements,
        logo: job.company.logo,
        id: job._id,
        applied: !!applied,
      });
    }

    res.status(200).json({
      message: "Recommended jobs fetched successfully",
      recommendedJobs: allJobs,
    });
  }),
};

export default jobController;
