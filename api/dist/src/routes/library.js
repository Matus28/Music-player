"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const requireAuth_1 = require("../middlewares/requireAuth");
const library_controller_1 = require("../controllers/library.controller");
exports.router = express_1.default.Router();
exports.router.use(requireAuth_1.requireAuth);
exports.router.get("/", library_controller_1.libraryController.getLibrary);
//# sourceMappingURL=library.js.map