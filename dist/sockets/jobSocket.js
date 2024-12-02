"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSocketServer = void 0;
const jobSocketServer = (io, socket) => {
    socket.on("update-job-status", (data) => {
        console.log("DATA----", data);
        io.emit("job-status-updated", {
            userId: data.userId,
            jobId: data.jobId,
            newStatus: data.newStatus,
        });
    });
};
exports.jobSocketServer = jobSocketServer;
//# sourceMappingURL=jobSocket.js.map