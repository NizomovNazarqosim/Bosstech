"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = exports.multerConfig = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const path_1 = require("path");
const multer_1 = require("multer");
exports.multerConfig = {
    dest: 'uploads'
};
function uuidRandom(file) {
    const result = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
    return result;
}
exports.multerOptions = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const uploadPath = exports.multerConfig.dest;
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, uuidRandom(file));
        }
    })
};
//# sourceMappingURL=multer.js.map