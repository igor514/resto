import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";

export interface IMailtemplateUpdate {
    readonly id: number;
    readonly name: string;
    readonly defended: boolean;
    readonly translations: MailtemplateTranslation[];
}