import { MailOption } from "../../core/entities/MailOption";

export  interface NotificationSender {
    send(mailOption : MailOption) : Promise<void>;
}