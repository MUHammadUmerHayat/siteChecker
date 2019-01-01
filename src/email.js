import hbs from 'nodemailer-express-handlebars';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
const config = require('../config');

export default function sendMail(site) {
  const mailer = config('mailer');
  const smtpTransport = nodemailer.createTransport(mailer.options);

  const handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: './views',
    extName: '.html'
  };

  smtpTransport.use('compile', hbs(handlebarsOptions));
    let mailOptions = {
      to: 'olatundegaruba@gmail.com',
      subject: 'URGENT ATTENTION',
      template: 'site',
      context: {
        site
      },
      from: mailer.from,
    };

    smtpTransport.sendMail(mailOptions, (err, response) => {
      if (!err) {
        console.log('response', response);
      } else {
        console.log('err', err);
      }
  })
};
