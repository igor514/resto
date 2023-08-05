import {Injectable} from "@nestjs/common";
import * as crypto from "crypto";
import {keyConstants} from "./auth.constants";
@Injectable()
export class CryptoService {
    private readonly key;
    private readonly iv;
    private readonly encryption_method = 'aes-256-cbc'

    constructor() {
        this.key = crypto
            .createHash('sha512')
            .update(keyConstants.secret_key)
            .digest('hex')
            .substring(0, 32)
        this.iv = crypto
            .createHash('sha512')
            .update(keyConstants.secret_iv)
            .digest('hex')
            .substring(0, 16)
    }

    encryptData(data: string): string {
        const cipher = crypto.createCipheriv(this.encryption_method, this.key, this.iv)
        return Buffer.from(
            cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
        ).toString('base64')
    }

    decryptData(encryptedData: string): string {
        const buff = Buffer.from(encryptedData, 'base64')
        const decipher = crypto.createDecipheriv(this.encryption_method, this.key, this.iv)
        return (
            decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')
        )
    }
}