import IEmailSender from "../../application/contracts/infrastructure/email-sender.contract";
import nodemailer from "nodemailer";

class EmailSender implements IEmailSender {
  private user: string;
  private transporter: nodemailer.Transporter;

  constructor(user: string, pass: string, service: string, host: string) {
    this.user = user;
    this.transporter = nodemailer.createTransport({
      service: service,
      host: host,
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  async send(to: string, subject: string, body: string): Promise<boolean> {
    console.log(this.transporter);
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: this.user,
        to,
        subject,
        text: body,
      };

      await this.transporter.sendMail(mailOptions);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default EmailSender;
