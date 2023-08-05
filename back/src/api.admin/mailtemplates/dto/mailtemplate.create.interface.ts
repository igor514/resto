import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";

export interface IMailtemplateCreate {
    readonly name: string;
    readonly translations: MailtemplateTranslation[];
}