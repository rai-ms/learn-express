"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../config"));
const logDir = path_1.default.join(__dirname, '../../logs');
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir, { recursive: true });
}
const { combine, timestamp, printf, colorize, align } = winston_1.default.format;
const logger = winston_1.default.createLogger({
    level: config_1.default.logLevel,
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), align(), printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, 'error.log'), level: 'error' }),
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, 'combined.log') }),
    ],
    exitOnError: false,
});
exports.logger = logger;
if (config_1.default.env !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(colorize(), winston_1.default.format.simple()),
    }));
}
