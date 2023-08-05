import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Res,
    UploadedFile,
    UseInterceptors, UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { QRService } from "./qr.service";
import {IAnswer} from "../../model/dto/answer.interface";
import {CreateQrDto} from "./dto/create.qr.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {GetQrDto} from "./dto/get.qr.dto";
import {promises as fs} from "fs";

@Controller('restorator/qr')
export class QRController {
    constructor (private qrService: QRService) {}    

    @Get("get-image/:restaurant_id") //?text=[...]&mode=[get|download]
    async qr(
        @Query() query,
        @Param('restaurant_id') restaurant_id: string,
        @Res() res: Response
    ): Promise<void> {
        try {
            let buf: Buffer = await this.qrService.getImage(query.text, +restaurant_id);
            res.set("Content-type", "image/png");
            query.mode === "download" ? res.set("Content-Disposition", "attachment; filename=qr.png") : null;
            res.end(buf);
        } catch(e) {
            console.log(e)
        }
    }

    @Post('update/:restaurant_id')
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(new ValidationPipe())
    async update(
        @Body() body: CreateQrDto,
        @Param('restaurant_id') restaurant_id: string,
        @UploadedFile() file: Express.Multer.File
    ):Promise<IAnswer<void>> {
        return this.qrService.updateConfig(restaurant_id, body, file)
    }

    @Post('get/:restaurant_id')
    async get(@Param('restaurant_id') restaurant_id: string): Promise<IAnswer<GetQrDto>> {
        return this.qrService.getConfig(restaurant_id);
    }

    @Post('icon/:restaurant_id')
    async icon(
        @Param('restaurant_id') restaurant_id: string,
        @Res() res: Response
    ) {
        const path = await this.qrService.getMediaPath(restaurant_id)
        let buffer = await fs.readFile(path);
        if (path.includes('svg')) {
            buffer = await this.qrService.svgToPng(buffer)
        }
        res.end(buffer)
    }

    @Post('icon')
    async getIcon(@Res() res: Response, @Body() body: {icon_id: number}) {
        const path = await this.qrService.getIconPath(body.icon_id)
        let buffer = await fs.readFile(path);
        if (path.includes('svg')) {
            buffer = await this.qrService.svgToPng(buffer)
        }
        res.end(buffer)
    }
}



