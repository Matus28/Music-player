"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSongsDataTask = void 0;
const getDriveData_1 = require("./getDriveData");
const getSongsDataTask = async () => {
    try {
        const songesData = await (0, getDriveData_1.getDriveData)();
        return songesData;
    }
    catch (error) {
        if (error instanceof Error) {
            return [];
        }
    }
};
exports.getSongsDataTask = getSongsDataTask;
//# sourceMappingURL=getSongsDataTask.js.map