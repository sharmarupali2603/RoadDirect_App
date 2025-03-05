import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
  private db: any; // Dexie DB
  private time = 0; // Store time in seconds
  private isRunning = false;
  private timerSubscription: Subscription | null = null;
  
  time$ = new BehaviorSubject<number>(this.time);

  constructor() {
    // Initialize Dexie DB
    this.db = new Dexie('StopwatchDB');
    this.db.version(1).stores({ time: 'id,value' });

    // Load time from IndexedDB
    this.loadTime();
  }

  private async loadTime() {
    const savedTime = await this.db.time.get(1);
    if (savedTime) {
      this.time = savedTime.value;
      this.time$.next(this.time);
    }
  }

  private async saveTime() {
    await this.db.time.put({ id: 1, value: this.time });
  }

  // start() {
  //   if (!this.isRunning) {
  //     this.isRunning = true;
  //     this.timerSubscription = interval(1000).subscribe(() => {
  //       this.time++;
  //       this.time$.next(this.time);
  //       this.saveTime();
  //     });
  //   }
  // }


start() {
  if (!this.isRunning) { // Prevent multiple intervals
    this.isRunning = true;
    this.timerSubscription = interval(1000).subscribe(() => {
      this.time++;
      this.time$.next(this.time);
      this.saveTime();
    });
  }
}

  // stop() {
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //     this.timerSubscription = null;
  //   }
  //   this.isRunning = false;
  // }
  stop() {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null; // Reset subscription safely
    }
    this.isRunning = false;
  }
  reset() {
    this.stop();
    this.time = 0;
    this.time$.next(this.time);
    this.saveTime();
  }
}
