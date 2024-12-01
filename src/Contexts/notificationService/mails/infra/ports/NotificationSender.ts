import { MailOption } from "../../domain/valueObjects/MailOption";

export  interface NotificationSender {
    send(mailOption : MailOption) : Promise<void>;
}