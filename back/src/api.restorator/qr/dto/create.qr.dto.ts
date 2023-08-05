import {CornerDotType, CornerSquareType, DotType} from "@loskir/styled-qr-code-node"
import {IsOptional, IsString} from "class-validator";

export class CreateQrDto {
    @IsString()
    size: string;
    @IsString()
    margin: string;
    @IsString()
    dotColor: string
    @IsString()
    dotType: DotType;
    @IsString()
    cornerDotColor: string
    @IsString()
    cornerDotType: CornerDotType;
    @IsString()
    cornerSquareColor: string
    @IsString()
    cornerSquareType: CornerSquareType;
    @IsString()
    imageMargin: string
    @IsString()
    imageSize: string
    @IsString()
    background: string
    @IsOptional()
    @IsString()
    icon_id: string;
    file: any
}