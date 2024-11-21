import { Notification } from "../../core/entities /Notification";

export  interface NotificationSender {
    send(notification : Notification) : Promise<void>;
}