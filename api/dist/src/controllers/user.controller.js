"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
exports.userController = {
    async signupUser(req, res) {
        try {
            await (0, user_service_1.signupUserService)(req.body);
            res.status(201).json({ message: "User successfully created!" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(422).json({ message: error.message });
            }
        }
    },
    async loginUser(req, res) {
        try {
            const { email, token } = await (0, user_service_1.loginUserService)(req.body);
            res.status(200).json({ email, token });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    },
};
//# sourceMappingURL=user.controller.js.map