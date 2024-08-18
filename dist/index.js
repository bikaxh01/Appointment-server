"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const EnvConfigs_1 = require("./config/EnvConfigs");
const user_routes_1 = require("./routes/user.routes");
const admin_routes_1 = require("./routes/admin.routes");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is Running '
    });
});
app.use('/apis/user', user_routes_1.userRoute);
app.use('/apis/admin', admin_routes_1.adminRoute);
app.listen(EnvConfigs_1.PORT, () => console.log(`Running at ${EnvConfigs_1.PORT}`));
