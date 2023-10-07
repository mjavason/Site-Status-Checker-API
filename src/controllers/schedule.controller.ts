import { scheduleService } from '../services';
import { siteController } from './site.controller';

// export const startSecondsJob = scheduleService.startEverySecond(() => logme());
// export const startEveryMinuteJob = scheduleService.startEveryMinute(() => payHourlySalaries());
// export const startHourlyJob = scheduleService.startHourly(() => payHourlySalaries());
// export const startDailyJob = scheduleService.startDaily(() => payDailySalaries());
// export const startWeeklyJob = scheduleService.startWeekly(() => payWeeklySalaries());
// export const startMonthlyJob = scheduleService.startMonthly(() => payMonthlySalaries());
// export const startYearlyJob = scheduleService.startYearly(() => payYearlySalaries());

function sayHello() {
  console.log('Hello at', new Date());
}

class Controller {
  startEverySecond() {
    scheduleService.startEverySecond(async () => {
      // await paySalaries(1 'hour');
      sayHello();
    });
  }

  startEveryMinute() {
    scheduleService.startEveryMinute(async () => {
      sayHello();
      // siteController.checkSites(1, 'hourly');
    });
  }

  startEvery10thMinute() {
    scheduleService.startEvery10thMinute(() => {
      siteController.checkSites(1, 'hourly');
    });
  }

  startEvery30thMinute() {
    scheduleService.startEvery30thMinute(() => {
      siteController.checkSites(0.5, 'semi hourly');
      sayHello();
    });
  }

  startHourlyJobs() {
    scheduleService.startHourly(async () => {
      await siteController.checkSites(1, 'hourly');
    });
  }

  startDailyJobs() {
    scheduleService.startDaily(async () => {
      await siteController.checkSites(24, 'daily');
    });
  }

  startWeeklyJobs() {
    scheduleService.startWeekly(async () => {
      await siteController.checkSites(168, 'weekly');
    });
  }

  startMonthlyJobs() {
    scheduleService.startMonthly(async () => {
      await siteController.checkSites(720, 'monthly');
    });
  }

  startYearlyJobs() {
    scheduleService.startYearly(async () => {
      await siteController.checkSites(8760, 'yearly');
    });
  }
}

export const scheduleController = new Controller();
