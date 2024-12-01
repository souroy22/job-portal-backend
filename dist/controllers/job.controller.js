"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_util_1 = __importDefault(require("../utils/catchAsync.util"));
const Company_model_1 = require("../models/Company.model");
const AppError_util_1 = __importDefault(require("../utils/AppError.util"));
const Job_model_1 = require("../models/Job.model");
const pagination_util_1 = require("../utils/pagination.util");
const Application_model_1 = require("../models/Application.model");
const JobSeeker_model_1 = require("../models/JobSeeker.model");
const jobController = {
    createJob: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { companySlug, title, description, location, jobType, salary, skills, } = req.body;
        if (!req.user.user.finishedProfile) {
            throw new AppError_util_1.default("Please create your company profile first", 400);
        }
        if (!title ||
            !description ||
            !location ||
            !jobType ||
            !Number(salary) ||
            !skills ||
            !Array.isArray(skills) ||
            !skills.length) {
            throw new AppError_util_1.default("Please fill all the details", 400);
        }
        const userId = req.user.user.id;
        if (!req.user.user.finishedProfile) {
            throw new AppError_util_1.default("Please create your company profile first", 400);
        }
        const company = yield Company_model_1.Company.findOne({ slug: companySlug });
        if (!company) {
            throw new AppError_util_1.default("Company not found", 400);
        }
        const newJob = new Job_model_1.Job({
            title,
            description,
            location,
            jobType,
            salary: Number(salary),
            requirements: skills,
            postedBy: userId,
            company: company.id,
        });
        yield newJob.save();
        return res.status(200).json({ message: "Job created successfully" });
    })),
    getAllJobs: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { searchQuery, location, jobType } = req.query;
        const params = { status: "open" };
        if (searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.toString().trim()) {
            params.$or = [
                { title: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
            ];
        }
        if (location === null || location === void 0 ? void 0 : location.toString().trim()) {
            params["location"] = location;
        }
        if (jobType === null || jobType === void 0 ? void 0 : jobType.toString().trim()) {
            params["jobType"] = jobType;
        }
        const jobQuery = Job_model_1.Job.find(params).populate("company");
        const jobs = yield (0, pagination_util_1.paginate)(jobQuery, req.pagination);
        const allJobs = [];
        for (let job of jobs.data) {
            const applied = yield Application_model_1.Application.findOne({
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
        return res.status(200).json(Object.assign(Object.assign({}, jobs), { data: allJobs }));
    })),
    getPostedJobs: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const jobQuery = Job_model_1.Job.find({ postedBy: req.user.user.id }).populate("company");
        const jobs = yield (0, pagination_util_1.paginate)(jobQuery, req.pagination);
        const allJobs = [];
        for (let job of jobs.data) {
            const applied = yield Application_model_1.Application.findOne({
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
        return res.status(200).json(Object.assign(Object.assign({}, jobs), { data: allJobs }));
    })),
    getJobDetails: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { jobId } = req.params;
        const jobData = yield Job_model_1.Job.findById(jobId).populate("company");
        if (!jobData) {
            throw new AppError_util_1.default("No Job found", 404);
        }
        const applicantCount = yield Application_model_1.Application.countDocuments({ jobId });
        const filters = { jobId };
        if (req.user.user.role === "job_seeker") {
            filters["applicant"] = req.user.user.id;
        }
        const appliedCandidates = yield Application_model_1.Application.find(filters).populate("applicant");
        const data = {
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
            applied: !!(appliedCandidates === null || appliedCandidates === void 0 ? void 0 : appliedCandidates.length),
        };
        if (req.user.user.role === "job_seeker") {
            const applicationStatus = yield Application_model_1.Application.findOne({
                applicant: req.user.user.id,
                jobId,
            }).select("status");
            data["applicationStatus"] = applicationStatus
                ? applicationStatus.status
                : "Not Applied";
            data["recruiterId"] = jobData.postedBy;
        }
        else {
            const applicants = [];
            for (let candidate of appliedCandidates) {
                const applicantProfile = yield JobSeeker_model_1.JobSeekerProfile.findOne({
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
            data["applicants"] = applicants;
        }
        return res.status(200).json(data);
    })),
    getRecommendedJobs: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Fetch the job seeker's profile
        const profile = yield JobSeeker_model_1.JobSeekerProfile.findOne({
            userId: req.user.user.id,
        });
        if (!profile) {
            return res.status(404).json({ message: "Job seeker profile not found" });
        }
        // Destructure profile details
        const { skills, preferences } = profile;
        const { jobType, location } = preferences || {};
        // Build query conditions
        const queryConditions = {
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
        const jobs = yield Job_model_1.Job.find(queryConditions).populate("company").lean();
        // Filter jobs to include only those with at least 60% matching requirements
        const recommendedJobs = jobs.filter((job) => {
            const { requirements } = job;
            if (!requirements || requirements.length === 0)
                return false;
            const matchingSkillsCount = requirements.filter((req) => skills.includes(req)).length;
            const matchingPercentage = matchingSkillsCount / requirements.length;
            return matchingPercentage >= 0.4;
        });
        const allJobs = [];
        for (let job of recommendedJobs) {
            const applied = yield Application_model_1.Application.findOne({
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
    })),
    changeJobStatus: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = req.body;
        const { jobId } = req.params;
        const updatedJob = yield Job_model_1.Job.findByIdAndUpdate(jobId, { status }, { new: true });
        if (!updatedJob) {
            throw new AppError_util_1.default("No job found", 404);
        }
        return res.status(200).json({ message: "Successfully change job status" });
    })),
    appliedJobs: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const appliedJobs = yield Application_model_1.Application.find({
            applicant: req.user.user.id,
        });
        const data = [];
        for (let job of appliedJobs) {
            const jobDetails = yield Job_model_1.Job.findById(job.jobId).populate("company");
            data.push({
                title: jobDetails.title,
                description: jobDetails.description,
                company: jobDetails.company.name,
                location: jobDetails.location,
                jobType: jobDetails.jobType,
                salary: jobDetails.salary,
                requirements: jobDetails.requirements,
                logo: jobDetails.company.logo,
                id: jobDetails._id,
                applied: true,
            });
        }
        return res.status(200).json(data);
    })),
};
exports.default = jobController;
//# sourceMappingURL=job.controller.js.map