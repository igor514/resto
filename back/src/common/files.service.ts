import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from "fs";
import { extname } from 'path';
import { IAnswer } from 'src/model/dto/answer.interface';
import { IImgUpload } from 'src/model/dto/imgupload.interface';
import { IPathable } from 'src/model/dto/pathable.interface';

@Injectable()
export class FilesService {
    public async imgUploadResize(file: Express.Multer.File, dto: IImgUpload): Promise<IAnswer<IPathable>> {
        try {
            const diskFolder: string = `/home/webmaster/resto-club/static/images/${dto.folder}`;
            const diskSubfolder: string = `${new Date().getFullYear ()}-${new Date().getMonth() + 1}`;
            const diskFullFolder: string = `${diskFolder}/${diskSubfolder}`;
            !fs.existsSync(diskFullFolder) ? fs.mkdirSync(diskFullFolder, {recursive: true}) : null;
            let paths: string[] = [];
            let widths: number[] = JSON.parse(dto.resize);

            for (let w of widths) {
                const filename: string = await this.saveResizedImg(diskFullFolder, file, w);
                paths.push(`${diskSubfolder}/${filename}`);
                if (!fs.existsSync(diskFullFolder)) {
                    throw new Error("could not save file")
                }
            }

            return {statusCode: 200, data: {paths}};
        } catch (err) {
            let errTxt: string = `Error in FilesService.uploadImg: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async imgUpload(file: Express.Multer.File, dto: IImgUpload): Promise<IAnswer<IPathable>> {
        try {
            const diskFolder: string = `/home/webmaster/resto-club/static/images/${dto.folder}`; // todo move back after fix of pm2 user
            const diskSubfolder: string = `${new Date ().getFullYear ()}-${new Date().getMonth() + 1}`;
            const diskFullFolder: string = `${diskFolder}/${diskSubfolder}`;            
            !fs.existsSync(diskFullFolder) ? fs.mkdirSync(diskFullFolder) : null;            
            let paths: string[] = [];   
            let filename: string = await this.saveFile(diskFullFolder, file);
            paths.push(`${diskSubfolder}/${filename}`);
            if (!fs.existsSync(diskFullFolder)) {
                throw new Error("could not save file")
            }
            return {statusCode: 200, data: {paths}};
        } catch (err) {
            let errTxt: string = `Error in FilesService.uploadImg: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private saveFile(folder: string, file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileName: string = Math.round(new Date().getTime()).toString();
            const fileExtension: string = extname(file.originalname);
            const fileFullName = `${fileName}${fileExtension}`;
            const fileFullNameWithFolder = `${folder}/${fileFullName}`;
            fs.writeFile(fileFullNameWithFolder, file.buffer, (err) => err ? reject(err) : resolve(fileFullName));
        });
    }

    private async saveResizedImg(folder: string, file: Express.Multer.File, width: number): Promise<string> {
        const fileName: string = Math.round(new Date().getTime()).toString()+`_${width}`;
        const fileFullName = `${fileName}.jpg`;
        await sharp(file.buffer)
            .rotate() // поворачиваем в соответствии с метаданными, которые по умолчанию не используются (и не надо, т.к. не все устройства их понимают!)
            .resize({width, withoutEnlargement: true})
            .jpeg({quality: 80})
            .toFile(`${folder}/${fileFullName}`);
        return fileFullName;
    }
}
