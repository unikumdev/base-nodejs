"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeModuleIsAvailable = void 0;
const nodeModuleIsAvailable = (name) => {
    try {
        require.resolve(name);
        return true;
    }
    catch {
        return false;
    }
};
exports.nodeModuleIsAvailable = nodeModuleIsAvailable;
