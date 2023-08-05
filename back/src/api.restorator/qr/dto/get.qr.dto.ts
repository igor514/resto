import {QRConfig} from "../../../model/orm/qr.entity";

export type GetQrDto = Omit<QRConfig, 'icon'> & {
    imgURL: string
    imgName: string
}