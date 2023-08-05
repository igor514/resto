import { Controller, Post, UseGuards, Param, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";

import { IImgUpload } from 'src/model/dto/imgupload.interface';
import { FilesService } from 'src/common/files.service';
import { AdminsGuard } from "src/common/guards/admins.guard";
import { IPathable } from 'src/model/dto/pathable.interface';
import { IAnswer } from 'src/model/dto/answer.interface';

@Controller('admin/files')
export class FilesController {
    constructor (private filesService: FilesService) {}
    
    // upload image
    @Post("img-upload")
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AdminsGuard)
    public imgUpload(@Body() dto: IImgUpload, @UploadedFile() file: Express.Multer.File): Promise<IAnswer<IPathable>> {        
        return this.filesService.imgUpload(file, dto);
    }

    // upload and resize image
    @Post("img-upload-resize")
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AdminsGuard)
    public imgUploadResize(@Body() dto: IImgUpload, @UploadedFile() file: Express.Multer.File): Promise<IAnswer<IPathable>> {        
        return this.filesService.imgUploadResize(file, dto);
    }    
}
