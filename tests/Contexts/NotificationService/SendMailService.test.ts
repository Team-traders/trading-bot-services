import { SendMailService } from "../../../src/Contexts/notificationService/mails/application/services/SendMailService";

describe("SendMailService", () => {
  it("should return the correct email content for AlertTriggeredDomainEvent.EVENT_NAME", () => {
    const result = SendMailService.createMailFactory("alert.triggered");
    expect(result).toBe("Ceci est un mail pour une alerte !");
  });

  it("should return the correct email content for 'TODO'", () => {
    const result = SendMailService.createMailFactory("TODO");
    expect(result).toBe("Ceci est un mail pour le trading execution");
  });

  it("should throw an error for an unsupported queueType", () => {
    expect(() => {
      SendMailService.createMailFactory("INVALID_TYPE");
    }).toThrow("the queue doesnt exist");
  });
});
