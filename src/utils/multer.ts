import {HttpException, HttpStatus} from '@nestjs/common'
import {existsSync, mkdir, mkdirSync} from 'fs'
import {v4 as uuid} from 'uuid'
import {extname} from 'path'
import {diskStorage} from 'multer'

export const multerConfig = {
    dest: 'uploads'
}
function uuidRandom(file) {
    const result = `${uuid()}${extname(file.originalname)}`
    return result
}
export const multerOptions = {
    fileFilter:(req: any, file: any, cb) => {
        if(file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)){
            cb(null, true)
        }
        else{
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false)
        }
    },
    storage: diskStorage({
        destination:(req, file, cb) => {
            const uploadPath = multerConfig.dest
            if(!existsSync(uploadPath)){
                mkdirSync(uploadPath)
            }
            cb(null, uploadPath)
        },
        filename:(req, file, cb) => {
            cb(null, uuidRandom(file))
        }
    })
}