const Botkit = require('botkit');
const rp = require('request-promise');
const sendMail = require('./email');

const config = require('../config');

var controller = Botkit.slackbot({})
var bot = controller.spawn()

bot.configureIncomingWebhook({ url: config('WEBHOOK_URL') })

const msgDefaults = {
  response_type: 'in_channel',
  username: 'notifier',
  icon_emoji: config('ICON_EMOJI')
}

function* makeRangeIterator(urls) {
  yield * urls.map((url) => testUrl(url));
}

const testUrl = (uri) => {
  var options = {
    uri,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  return rp(options);
};
const URL = process.env.URL;
const urls = URL ? URL.split(',') : ['https://staging.fibre.com', 'https://fibrelifestyle.github.io/supply-FE/']

module.exports = function() {
  urls.map(function*(url) { yield testUrl(url) }).forEach((res) => {
    const site = [...res][0];
    site
      .then((response) => console.log(`\n Site success report delivered`))
      .catch(function(error) {
        const title_link = error.message.split(' ')[3];
        var attachments = [{
          title: `${title_link} is down!!!`,
          title_link: title_link,
          text: `Your site with ${title_link} requires urgent attention`,
          mrkdwn_in: ['text', 'pretext']
        }];

        return bot.sendWebhook({ attachments, ...msgDefaults}, (err, res) => {
          if (err) throw err
          sendMail(title_link);
          return console.log(`\n ❌ Site error report delivered`)
        })
      });
  });
};
