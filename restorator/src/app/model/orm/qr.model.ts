import {CornerSquareType, DotType} from "styled-qr-code";
import {CornerDotType} from "styled-qr-code/lib/types";

export class QRModel {
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
  restaurant_id: number;
  icon_id: number;

  imgURL?: string;
  imgName?: string
}
