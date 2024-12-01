"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (err.isOperational) {
        // Known and expected error
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }
    console.error("Unexpected Error: ", err); // Log unexpected errors for debugging
    return res.status(500).json({
        error: "Something went wrong! Please try again later.",
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map