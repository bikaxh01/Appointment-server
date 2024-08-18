"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = require("express");
exports.adminRoute = (0, express_1.Router)();
exports.adminRoute.get("/", (req, res) => {
    res.json({ message: "Admin Route are working" });
});
