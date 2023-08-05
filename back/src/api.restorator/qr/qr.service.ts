import {Injectable} from "@nestjs/common";
import {APIService} from "src/common/api.service";
import {InjectRepository} from "@nestjs/typeorm";
import {QRConfig} from "../../model/orm/qr.entity";
import {Repository} from "typeorm";
import {IAnswer} from "../../model/dto/answer.interface";
import {FilesService} from "../../common/files.service";
import {CreateQrDto} from "./dto/create.qr.dto";
import {join} from 'path';
import {GetQrDto} from "./dto/get.qr.dto";
import {api_url, defaultVersion} from "../../config/options";
import {Options as QROptions, QRCodeCanvas} from "@loskir/styled-qr-code-node";
import {promises as fs} from 'fs';
import * as sharp from "sharp";
import {Icon} from "../../model/orm/icon.entity";

@Injectable()
export class QRService extends APIService {
    constructor(
        @InjectRepository(QRConfig) private qrRepository: Repository<QRConfig>,
        @InjectRepository(Icon) private iconRepository: Repository<Icon>,
        private filesService: FilesService,
    ) {
        super();
    }

    public async getImage(text: string, restaurant_id: number): Promise<Buffer> {
        try {
            const config = await this.get(restaurant_id)
            const options = await this.getQROptions(config, text)
            const qr = new QRCodeCanvas(options)
            return qr.toBuffer("png")
        } catch (err) {
            const errTxt: string = `Error in QRService.getImage: ${String(err)}`;
            console.log(errTxt);
            return null;
        }
    }

    public async getMediaPath(restaurant_id: string): Promise<string> {
        try {
            const config = await this.get(+restaurant_id)
            let path = ''
            if (config.img) {
                path = join(process.cwd(), '../static/images/qr', config.img)
            } else if (config.icon) {
                path = join(process.cwd(), '../static/images/icons', config.icon.img)
            } else {
                return null
            }
            await fs.access(path)
            return path
        } catch (err) {
            const errTxt: string = `Error in QRService.getMediaPath: ${String(err)}`;
            console.log(errTxt);
            return null;
        }
    }

    public async getIconPath(icon_id: number): Promise<string> {
        try {
            const icon = await this.iconRepository.findOne({where: {id: icon_id}})
            let path = join(process.cwd(), '../static/images/icons', icon.img)
            await fs.access(path)
            return path
        } catch (err) {
            const errTxt: string = `Error in QRService.getIconPath: ${String(err)}`;
            console.log(errTxt);
            return null;
        }
    }

    public async getConfig(restaurant_id: string): Promise<IAnswer<GetQrDto>> {
        try {
            const config = await this.get(+restaurant_id)

            const response: IAnswer<GetQrDto> = {
                statusCode: 200,
                data: null
            }

            if (config) {
                let imgURL: string = null
                let imgName: string = null
                if (config?.img) {
                    imgName = config.img.split('/').slice(-1)[0] as string
                    imgURL = `${api_url}/api/v${defaultVersion}/restorator/qr/icon/${restaurant_id}`
                }
                delete config?.img
                response.data = {
                    ...config,
                    imgURL,
                    imgName
                }
            }

            return response
        } catch (err) {
            const errTxt: string = `Error in QRService.getConfig: ${String(err)}`;
            console.log(errTxt);
            return null;
        }
    }

    public async updateConfig(restaurant_id: string, body: CreateQrDto, icon: Express.Multer.File): Promise<IAnswer<void>> {
        try {
            delete body?.file
            let payload: Partial<QRConfig> = {
                ...body,
                size: +body.size,
                margin: +body.margin,
                imageMargin: +body.imageMargin,
                imageSize: +body.imageSize,
                icon_id: null,
                img: null,
            }

            if (icon) {
                const saved = await this.filesService.imgUpload(icon, {folder: 'qr'})
                payload.img = saved.data.paths[0]
            } else if (body.icon_id) {
                payload.icon_id = +body.icon_id
            }

            const config = await this.get(+restaurant_id);

            if (!config) {
                const data = this.qrRepository.create({
                    restaurant_id: +restaurant_id,
                    ...payload
                })
                await this.qrRepository.save(data)
            } else {
                await this.qrRepository.update({id: config.id}, {
                    ...payload,
                })
            }
            return {
                statusCode: 200,
            }
        } catch (err) {
            const errTxt: string = `Error in QRService.updateConfig: ${String(err)}`;
            console.log(errTxt);
            return null;
        }
    }

    private async get(restaurant: number | QRConfig): Promise<QRConfig> {
        if (typeof restaurant === 'number') {
            return await this.qrRepository.findOne(
                {where: {restaurant_id: restaurant}, relations: ['icon']}
            )
        } else {
            return restaurant
        }

    }

    private async getQROptions(config: QRConfig, data: string): Promise<QROptions> {
        const options: QROptions = {
            width: 200,
            height: 200,
            margin: 10,
            data: data,
            dotsOptions: {
                color: "#000000",
                type: "extra-rounded"
            },
            cornersDotOptions: {
                color: "#000000",
                type: 'square'
            },
            cornersSquareOptions: {
                color: "#000000",
                type: 'square'
            },
            backgroundOptions: {
                color: "#ffffff",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 2,
                imageSize: 0.3,
                hideBackgroundDots: true
            },
            qrOptions: {
                typeNumber: 0,
                errorCorrectionLevel: 'M',
                mode: 'Byte'
            }
        };
        if (!config) return options

        if (config.img) {
            options.image = join(process.cwd(), `../static/images/qr`, config.img)
        } else if (config.icon) {
            options.image = join(process.cwd(), '../static/images/icons', config.icon.img)
        }

        if (options.image) {
            const path = options.image as string
            let buffer = await fs.readFile(path);
            if (path.includes('svg')) {
                buffer = await this.svgToPng(buffer)
            }
            options.image = buffer
        }

        options.margin = config.margin
        options.width = config.size
        options.height = config.size
        options.dotsOptions.type = config.dotType
        options.dotsOptions.color = config.dotColor
        options.cornersSquareOptions.type = config.cornerSquareType
        options.cornersSquareOptions.color = config.cornerSquareColor
        options.cornersDotOptions.type = config.cornerDotType
        options.cornersDotOptions.color = config.cornerDotColor
        options.imageOptions.margin = config.imageMargin
        options.imageOptions.imageSize = config.imageSize
        options.backgroundOptions.color = config.background

        return options
    }

    public async svgToPng(buffer: Buffer): Promise<Buffer> {
        return sharp(buffer).toFormat('png').toBuffer()
    }
}