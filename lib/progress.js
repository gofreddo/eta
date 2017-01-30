'use strict';

const EventEmitter = require('events');
const moment = require('moment');

class Progress extends EventEmitter {
  constructor(options) {
    super();
    this.total = options.total || 1;
    this.startTime = options.startTime || new Date();
    this.count = options.count || 0;
  }

  tick(count) {
    const tickcount = count || 1;
    this.count += tickcount;
    return this.stats();
  }

  stats() {
    const percentComplete = this.count / this.total;
    const now = new Date();
    const elapsedMS = now - this.startTime;
    const ticksPerMS = elapsedMS / this.count;
    const ticksRemaining = this.total - this.count;
    const msRemaining = ticksRemaining * ticksPerMS;
    const secondsRemaining = Math.round(msRemaining / 1000);
    const timeRemaining = new Date(msRemaining + this.startTime.getTime());
    const timeTo = moment(timeRemaining)
      .from(moment(this.startTime));
    let eta = new Date(msRemaining + elapsedMS + this.startTime.getTime());
    let finishedAt = null;
    if (this.count >= this.total) {
      finishedAt = new Date();
      eta = finishedAt;
    }

    const result = {
      startTime: this.startTime,
      eta,
      secondsRemaining,
      percentComplete,
      count: this.count,
      total: this.total,
      timeTo,
      finishedAt,
    };
    this.emit('tick', result);
    if (this.count >= this.total) {
      this.emit('finished', result);
    }
    return result;
  }
}

module.exports = Progress;
