import { Request, Response } from "express";

const authController = {
  login: async (req: Request, res: Response) => {
    try {
      //
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: error.message });
      }
    }
  },
};

export default authController;
