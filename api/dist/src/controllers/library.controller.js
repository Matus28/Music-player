"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.libraryController = void 0;
const library_service_1 = require("../services/library.service");
exports.libraryController = {
    async getLibrary(req, res) {
        const userId = req.user?.userId ?? -1;
        try {
            const result = await (0, library_service_1.getLibraryService)(userId);
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            }
        }
    },
};
//# sourceMappingURL=library.controller.js.map