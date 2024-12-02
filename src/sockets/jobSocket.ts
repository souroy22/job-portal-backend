import { Server, Socket } from "socket.io";

export const jobSocketServer = (io: Server, socket: Socket) => {
  socket.on(
    "update-job-status",
    (data: { jobId: string; userId: string; newStatus: string }) => {
      console.log("DATA----", data);
      io.emit("job-status-updated", {
        userId: data.userId,
        jobId: data.jobId,
        newStatus: data.newStatus,
      });
    }
  );
};
