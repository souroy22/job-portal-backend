"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const routers_1 = __importDefault(require("./routers"));
const corsConfig_1 = require("./configs/corsConfig");
const dbConfig_1 = __importDefault(require("./database/dbConfig"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const sockets_1 = require("./sockets");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || "8000";
// Set up middlewares
app.set("port", PORT);
app.use(express_1.default.json({ limit: "10kb" }));
app.use((0, cors_1.default)(corsConfig_1.corsOptions));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
(0, dbConfig_1.default)();
// Base route for testing server
app.get("/", (_, res) => {
    return res.status(200).json({ msg: "Successfully running" });
});
// Define application routes
app.use("/api/v1", routers_1.default);
// Error handler middleware
app.use(errorHandler_middleware_1.default);
// Create HTTP server and integrate with Socket.io
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: corsConfig_1.whitelist,
    },
});
(0, sockets_1.initializeSocket)(io);
// Start the server
httpServer.listen(parseInt(PORT, 10), "0.0.0.0", () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
//# sourceMappingURL=index.js.map