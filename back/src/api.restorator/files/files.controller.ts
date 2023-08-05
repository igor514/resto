import { Controller, Post, UseGuards, Param, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { IImgUpload } from 'src/model/dto/imgupload.interface';
import { FilesService } from 'src/common/files.service';
import { IPathable } from 'src/model/dto/pathable.interface';
import { IAnswer } from 'src/model/dto/answer.interface';
import { EmployeesGuard } from 'src/common/guards/employees.guard';

@Controller('restorator/files')
export class FilesController {
    constructor (private filesService: FilesService) {}
    
    // upload image
    @Post("img-upload")
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(EmployeesGuard)
    public imgUpload(@Body() dto: IImgUpload, @UploadedFile() file: Express.Multer.File): Promise<IAnswer<IPathable>> {        
        return this.filesService.imgUpload(file, dto);
    }

    // upload and resize image
    @Post("img-upload-resize")
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(EmployeesGuard)
    public imgUploadResize(@Body() dto: IImgUpload, @UploadedFile() file: Express.Multer.File): Promise<IAnswer<IPathable>> {        
        return this.filesService.imgUploadResize(file, dto);
    }    
}
