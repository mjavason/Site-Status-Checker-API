import schedule from 'node-schedule';

class ScheduleService {
  startEverySecond(taskFunction: () => void) {
    console.log('Task started for each second');

    const secondTask = schedule.scheduleJob('* * * * * *', taskFunction);
    return secondTask;
  }

  startEveryMinute(taskFunction: () => void) {
    console.log('Task started for each minute');

    const minuteTask = schedule.scheduleJob('* * * * *', taskFunction);
    return minuteTask;
  }

  startEvery30thMinute(taskFunction: () => void) {
    console.log('Task started for each 30th minute');

    const minuteTask = schedule.scheduleJob('*/30 * * * *', taskFunction);
    return minuteTask;
  }

  startEvery10thMinute(taskFunction: () => void) {
    console.log('Task started for each 10th minute');

    const minuteTask = schedule.scheduleJob('*/10 * * * *', taskFunction);
    return minuteTask;
  }

  startHourly(taskFunction: () => void) {
    console.log('Task started for each hour');

    const hourlyTask = schedule.scheduleJob('0 * * * *', taskFunction);
    return hourlyTask;
  }

  startWeekly(taskFunction: () => void) {
    console.log('Task started for each week');

    const weeklyTask = schedule.scheduleJob('0 0 7,14,21,28 * *', taskFunction);
    return weeklyTask;
  }

  startDaily(taskFunction: () => void) {
    console.log('Task started for each day');

    const dailyTask = schedule.scheduleJob('0 0 * * *', taskFunction);
    return dailyTask;
  }

  startMonthly(taskFunction: () => void) {
    console.log('Task started for each month');

    const monthlyTask = schedule.scheduleJob('0 0 1 * *', taskFunction);
    return monthlyTask;
  }

  startHalfYearly(taskFunction: () => void) {
    console.log('Task started for each half year');

    const halfYearlyTask = schedule.scheduleJob('0 0 1 1,7 *', taskFunction);
    return halfYearlyTask;
  }

  startYearly(taskFunction: () => void) {
    console.log('Task started for each year');

    const yearlyTask = schedule.scheduleJob('0 0 1 1 *', taskFunction);
    return yearlyTask;
  }

  cancelScheduler(task: schedule.Job) {
    task.cancel();
  }
}

export const scheduleService = new ScheduleService();
