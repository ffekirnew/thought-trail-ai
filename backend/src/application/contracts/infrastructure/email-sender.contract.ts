interface IEmailSender {
  send: (to: string, subject: string, body: string) => Promise<boolean>;
}

export default IEmailSender;
