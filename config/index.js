'use strict'

const config = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  STARBOT_COMMAND_TOKEN: process.env.STARBOT_COMMAND_TOKEN,
  SLACK_TOKEN: process.env.SLACK_TOKEN,
  ICON_EMOJI: ':scream:',
  mailer: {
    from: process.env.MAILER_FROM,
    options: {
      host: 'smtp.gmail.com',
      port: 465,
      pool: true,
      tls: {
        rejectUnauthorized: false
      },
      logger: false,
      service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD,
      }
    }
  }
};

module.exports = (key) => {
  if (!key) return config

  return config[key]
}
