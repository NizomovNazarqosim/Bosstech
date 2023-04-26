import * as nodemailer from 'nodemailer'


interface IEmailArguments {
    email: string;
    text: string;
    subject: string;
}

export function sendEmail(args: IEmailArguments) {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nazarqosimnizomov@gmail.com',
          pass: 'q z x l o x s a x n w k e p a v'
        }
      })
  
      const mail_configs = {
        from: 'BOSSTECH company',
        to: args.email,
        subject: args.subject,
        text:  args.text
      }
      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          reject(error)
        }
        resolve(info)
      })
    })
  }