import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextFunction, Response, Request } from "express";
import fs from "fs";
import path from "path";
import { BUCKET_NAME } from "../config/EnvConfigs";

const client = new S3Client({});

export const uploadDocumentToS3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const documentMetaData = req.file;

  if (!documentMetaData) {
    return res.json({
      success: false,
      message: "Please upload Document",
      data: [],
    });
  }
  //@ts-ignore
  const filePath = path.resolve(documentMetaData.path);

  //@ts-ignore
  const fileStream = fs.createReadStream(filePath);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `Documents/${req.body.fullName}`,
    Body: fileStream,
    ContentType: documentMetaData?.mimetype,
  });

  try {
    console.log('🚀Uploading Document.....');
    
    const response = await client.send(command);
    fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          return;
        }
      
        console.log(`File ${filePath} has been successfully removed.`);
      });
    const documentUrl = `https://s3.amazonaws.com/${BUCKET_NAME}/Documents/${req.body.fullName}`;
    req.body.documentUrl = documentUrl
    next();
  } catch (err) {
    console.error(err);
  }
};
