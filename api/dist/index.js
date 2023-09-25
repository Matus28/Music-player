"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import { db } from "./database/connection";
const songs_1 = require("./src/routes/songs");
const playlists_1 = require("./src/routes/playlists");
const library_1 = require("./src/routes/library");
const users_1 = require("./src/routes/users");
const service_1 = require("./src/utils/service");
const toad_scheduler_1 = require("toad-scheduler");
dotenv_1.default.config();
// APP creating
const app = (0, express_1.default)();
// PORT
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Loging request and method in the terminal
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// Routes
app.use("/api/songs", songs_1.router);
app.use("/api/playlists", playlists_1.router);
app.use("/api/library", library_1.router);
app.use("/api/users", users_1.router);
// Listens on Port
app.listen(PORT, () => {
    console.log(`[API]: Server is running on http://localhost:${PORT}`);
});
// Updates DB in intervals
const scheduler = new toad_scheduler_1.ToadScheduler();
const task = new toad_scheduler_1.AsyncTask("updates database", () => {
    return (0, service_1.updateDatabase)().then((result) => {
        if (!result)
            throw new Error("Update of Database was not successful!");
        console.log("Task triggered!");
        console.log(result);
    });
}, (error) => {
    console.log(error);
});
const job = new toad_scheduler_1.SimpleIntervalJob({ seconds: 60, runImmediately: true }, task, {
    id: "id_1",
    preventOverrun: true,
});
scheduler.addSimpleIntervalJob(job);
exports.default = app;
//# sourceMappingURL=index.js.map