import { AlertTriggeredDomainEvent } from "../../../../alertService/alerts/domain/AlertDomainEvent";


export class SendMailService {

    static createMailFactory(queuType : string) : string {
        switch (queuType) {
            case AlertTriggeredDomainEvent.EVENT_NAME:
                return 'Ceci est un mail pour une alerte !'
            case "TODO" :
                return 'Ceci est un mail pour le trading execution'
            default : 
                throw new Error('the queue doesnt exist')
        }

            
    }
}