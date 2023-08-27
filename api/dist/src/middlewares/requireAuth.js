"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const connection_1 = require("../database/connection");
const user_1 = require("../schema/user");
const dotenv = __importStar(require("dotenv"));
const drizzle_orm_1 = require("drizzle-orm");
dotenv.config();
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: "Authorization token required!" });
    }
    const token = authorization.split(" ")[1];
    try {
        const { userId } = jwt.verify(token ?? "", process.env.SECRET);
        const result = await connection_1.db
            .select({ userId: user_1.user.userId })
            .from(user_1.user)
            .where((0, drizzle_orm_1.eq)(user_1.user.userId, userId));
        req.user = result[0];
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: "Request is not authorized!" });
        }
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=requireAuth.js.map