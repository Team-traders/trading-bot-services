import { rabbitMQConfig } from "../../infra/config/RabbitMQConfig";

export class SendMailService {
    static getTemplateMail(queuType : string) : string {
        switch (queuType) {
            case rabbitMQConfig.queues.notificationA :
                return 'message 1 youpi'
            case rabbitMQConfig.queues.notificationB :
                return 'message 2 youpi'
            default : 
                throw new Error('the queue doesnt exist')
        }

            
    }
}