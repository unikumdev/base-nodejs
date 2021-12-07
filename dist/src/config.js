"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const path_1 = require("path");
/* istanbul ignore next */
const configuration_1 = require("./configuration");
Object.defineProperty(exports, "Configuration", { enumerable: true, get: function () { return configuration_1.Configuration; } });
exports.default = new configuration_1.Configuration({
    pathRoot: (0, path_1.join)(__dirname, '..'),
});
