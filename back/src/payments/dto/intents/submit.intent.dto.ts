import {IsString} from "class-validator";

export class SubmitIntentDto {
    @IsString()
    intent_id: string;
}