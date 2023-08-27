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
exports.loginUserService = exports.signupUserService = exports.findUser = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const connection_1 = require("../database/connection");
const user_1 = require("../schema/user");
const validator = __importStar(require("validator"));
const bcrypt = __importStar(require("bcrypt"));
const tokenCreation_1 = require("../middlewares/tokenCreation");
const initializeNewUser_1 = require("../utils/initializeNewUser");
const findUser = async (value, type) => {
    try {
        let result = [];
        if (type === "username") {
            result = await connection_1.db.select().from(user_1.user).where((0, drizzle_orm_1.eq)(user_1.user.userName, value));
        }
        else if (type === "email") {
            result = await connection_1.db.select().from(user_1.user).where((0, drizzle_orm_1.eq)(user_1.user.userEmail, value));
        }
        return result[0];
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        throw new Error("Failed to retrieve user information from the database.");
    }
};
exports.findUser = findUser;
const signupUserService = async (data) => {
    const { username, email, password } = data;
    if (!username || !email || !password) {
        throw new Error("All fields must be filled!");
    }
    if (!validator.default.isEmail(email)) {
        throw new Error("Email is not valid!");
    }
    if (!validator.default.isStrongPassword(password)) {
        throw new Error("Password not strong enough!");
    }
    const userExists = await (0, exports.findUser)(username, "username");
    if (!userExists) {
        const emailExists = await (0, exports.findUser)(email, "email");
        if (!emailExists) {
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(password, salt);
            let resultNewUser;
            const newUser = {
                userName: username,
                userPassword: hashedPassword,
                userEmail: email,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            try {
                resultNewUser = await connection_1.db.insert(user_1.user).values(newUser);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                throw new Error("Failed to create user!");
            }
            try {
                await (0, initializeNewUser_1.initializeNewUser)(username);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                throw new Error("Failed to initialize user's playlists!");
            }
            return resultNewUser;
        }
        else {
            throw new Error("User with this email already exists!");
        }
    }
    else {
        throw new Error("User with this username already exists!");
    }
};
exports.signupUserService = signupUserService;
const loginUserService = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error("All fields must be filled!");
    }
    const user = await (0, exports.findUser)(email, "email");
    if (user) {
        const valid = await bcrypt.compare(password, user.userPassword ?? "");
        if (!valid) {
            throw new Error("Incorrect password!");
        }
        const usersToken = (0, tokenCreation_1.createToken)(user.userId, user.userName ?? "", user.userEmail ?? "");
        return { email: email, token: usersToken };
    }
    else {
        throw new Error("Incorrect email!");
    }
};
exports.loginUserService = loginUserService;
//# sourceMappingURL=user.service.js.map