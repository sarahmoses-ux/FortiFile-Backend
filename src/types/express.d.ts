import { UserDocument } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}

export {};
