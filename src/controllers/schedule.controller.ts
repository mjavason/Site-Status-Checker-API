import { siteService, scheduleService, userService } from '../services';
import logger from '../helpers/logger';
import { mailController } from './mail.controller';

// export const startSecondsJob = scheduleService.startEverySecond(() => logme());
// export const startEveryMinuteJob = scheduleService.startEveryMinute(() => payHourlySalaries());
// export const startHourlyJob = scheduleService.startHourly(() => payHourlySalaries());
// export const startDailyJob = scheduleService.startDaily(() => payDailySalaries());
// export const startWeeklyJob = scheduleService.startWeekly(() => payWeeklySalaries());
// export const startMonthlyJob = scheduleService.startMonthly(() => payMonthlySalaries());
// export const startYearlyJob = scheduleService.startYearly(() => payYearlySalaries());

// Helper function to pay salaries based on time interval
async function paySalaries(intervalInHours: number, timeUnit: string) {
  const hoursInInterval = intervalInHours;

  // Find sites where hourly_interval matches the specified time unit
  const earners = await siteService.find({
    hourly_interval: hoursInInterval,
  });

  if (!earners) return;

  // Check if there are earners
  if (earners.length === 0) {
    logger.info(`No ${timeUnit} earners found.`);
    return;
  }

  // Iterate through the earners
  for (const site of earners) {
    // Get the amount to be paid and the user id from the site
    const { amount_to_earn, user } = site;

    // Update the user's account_balance field to add their salary
    const updatedUser = await userService.update(
      { _id: user },
      { $inc: { account_balance: amount_to_earn } },
    );

    if (!updatedUser) {
      logger.error('User account failed to update');
      return;
    }

    await mailController.sendWelcomeMail(
      updatedUser.email,
      updatedUser.first_name,
      updatedUser.last_name,
      '50',
    );

    // Log that the user has been paid
    logger.info(`Paid ${amount_to_earn} to ${updatedUser.first_name} ${updatedUser.last_name}`);
  }
}

function sayHello() {
  console.log('Hello at', Date.now());
}

class Controller {
  startEverySecond() {
    const startEverySecond = scheduleService.startEverySecond(async () => {
      // await paySalaries(1, 'hour');
      sayHello();
    });
  }

  startEveryMinute() {
    const startEveryMinuteJob = scheduleService.startEveryMinute(async () => {
      await paySalaries(1, 'hourly');
    });
  }

  startEvery10thMinute() {
    const startEvery10Minute = scheduleService.startEvery10thMinute(() => {
      sayHello();
    });
  }

  startEvery30thMinute() {
    const startEvery30Minute = scheduleService.startEvery30thMinute(() => {
      sayHello();
    });
  }

  startHourlyJobs() {
    const startHourlyJob = scheduleService.startHourly(async () => {
      await paySalaries(1, 'hourly');
    });
  }

  startDailyJobs() {
    const startDailyJob = scheduleService.startDaily(async () => {
      await paySalaries(24, 'daily');
    });
  }

  startWeeklyJobs() {
    const startWeeklyJob = scheduleService.startWeekly(async () => {
      await paySalaries(168, 'weekly');
    });
  }

  startMonthlyJobs() {
    const startMonthlyJob = scheduleService.startMonthly(async () => {
      await paySalaries(720, 'monthly');
    });
  }

  startYearlyJobs() {
    const startYearlyJob = scheduleService.startYearly(async () => {
      await paySalaries(8760, 'yearly');
    });
  }
}

export const scheduleController = new Controller();
