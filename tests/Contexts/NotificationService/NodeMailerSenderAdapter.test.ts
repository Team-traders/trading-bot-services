import nodemailer from "nodemailer";
import { NodeMailerSenderAdapter } from "../../../src/Contexts/notificationService/mails/infrastructure/adapters/NodeMailerSenderAdapter";
import { MailOption } from "../../../src/Contexts/notificationService/mails/domain/valueObjects/MailOption";

jest.mock("nodemailer");

describe("NodeMailerSenderAdapter", () => {
  let nodeMailerAdapter: NodeMailerSenderAdapter;

  beforeEach(() => {
    nodeMailerAdapter = new NodeMailerSenderAdapter();
  });

  it("should send an email successfully", async () => {
    const sendMailMock = jest.fn().mockResolvedValue({ messageId: "12345" });
    const createTransportMock = jest.fn().mockReturnValue({ sendMail: sendMailMock });
    (nodemailer.createTransport as jest.Mock).mockImplementation(createTransportMock);

    const mailOption: MailOption = {
      from: "test@example.com",
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test Body",
    };

    await expect(nodeMailerAdapter.send(mailOption)).resolves.not.toThrow();

    expect(createTransportMock).toHaveBeenCalledWith({
      host: process.env.HOST_GMAIL || "EMPTY",
      port: parseInt(process.env.PORT || "EMPTY"),
      secure: true,
      auth: {
        user: process.env.USER_MAIL || "EMPTY",
        pass: process.env.PASSWORD_APPLICATION || "EMPTY",
      },
    });

    expect(sendMailMock).toHaveBeenCalledWith(mailOption);
  });

  it("should throw an error if sending email fails", async () => {
    const sendMailMock = jest.fn().mockRejectedValue(new Error("Send failed"));
    const createTransportMock = jest.fn().mockReturnValue({ sendMail: sendMailMock });
    (nodemailer.createTransport as jest.Mock).mockImplementation(createTransportMock);

    const mailOption: MailOption = {
      from: "test@example.com",
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test Body",
    };

    await expect(nodeMailerAdapter.send(mailOption)).rejects.toThrow("Erreur lors de l'envoi de l'email");

    expect(createTransportMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(mailOption);
  });

  it("should handle missing environment variables gracefully", async () => {
    process.env.HOST_GMAIL = "";
    process.env.USER_MAIL = "";
    process.env.PASSWORD_APPLICATION = "";

    const sendMailMock = jest.fn().mockResolvedValue({ messageId: "12345" });
    const createTransportMock = jest.fn().mockReturnValue({ sendMail: sendMailMock });
    (nodemailer.createTransport as jest.Mock).mockImplementation(createTransportMock);

    const mailOption: MailOption = {
      from: "test@example.com",
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test Body",
    };

    await expect(nodeMailerAdapter.send(mailOption)).resolves.not.toThrow();

    expect(createTransportMock).toHaveBeenCalledWith({
      host: "EMPTY",
      port: NaN,
      secure: true,
      auth: {
        user: "EMPTY",
        pass: "EMPTY",
      },
    });

    expect(sendMailMock).toHaveBeenCalledWith(mailOption);
  });
});
