import {CornerSquareType, DotType} from "styled-qr-code";
import {CornerDotType} from "styled-qr-code/lib/types";

export interface IQRCreate {
  size: number;
  margin: number;
  dotColor: string
  dotType: DotType;
  cornerDotColor: string
  cornerDotType: CornerDotType;
  cornerSquareColor: string
  cornerSquareType: CornerSquareType;
  imageMargin: number
  imageSize: number
  background: string
  icon_id?: number;
}
