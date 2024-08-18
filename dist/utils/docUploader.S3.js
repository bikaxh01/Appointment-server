"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocumentToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const EnvConfigs_1 = require("../config/EnvConfigs");
const client = new client_s3_1.S3Client({});
const uploadDocumentToS3 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const documentMetaData = req.file;
    if (!documentMetaData) {
        return res.json({
            success: false,
            message: "Please upload Document",
            data: [],
        });
    }
    //@ts-ignore
    const filePath = path_1.default.resolve(documentMetaData.path);
    //@ts-ignore
    const fileStream = fs_1.default.createReadStream(filePath);
    const command = new client_s3_1.PutObjectCommand({
        Bucket: EnvConfigs_1.BUCKET_NAME,
        Key: `Documents/${req.body.fullName}`,
        Body: fileStream,
        ContentType: documentMetaData === null || documentMetaData === void 0 ? void 0 : documentMetaData.mimetype,
    });
    try {
        console.log('🚀Uploading Document.....');
        const response = yield client.send(command);
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return;
            }
            console.log(`File ${filePath} has been successfully removed.`);
        });
        const documentUrl = `https://s3.amazonaws.com/${EnvConfigs_1.BUCKET_NAME}/Documents/${req.body.fullName}`;
        req.body.documentUrl = documentUrl;
        next();
    }
    catch (err) {
        console.error(err);
    }
});
exports.uploadDocumentToS3 = uploadDocumentToS3;
