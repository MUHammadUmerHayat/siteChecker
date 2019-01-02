const hbs = require('nodemailer-express-handlebars');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = function(site) {
  const mailer = config('mailer');
  console.log('mailer', mailer);
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
