const cron = require('cron');
const siteChecker = require('./notify');

const CronJob = cron.CronJob;
console.log('in the cron job task');
const cronTime = process.env.CRONTIME || '*/1 * * * *';
const TaskJob = new CronJob({
  cronTime,
  onTick: function() {
    siteChecker()

  },
  start: false,
  timeZone: 'Africa/Lagos'
});

TaskJob.start();
