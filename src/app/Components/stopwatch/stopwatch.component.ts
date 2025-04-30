import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  elapsedTime: number = 0;
  running: boolean = false;

  ngOnInit() {
    this.startPauseTimer();
    // Load saved time from localStorage (optional)
    const savedTime = localStorage.getItem('stopwatchTime');
    if (savedTime) {
      this.elapsedTime = parseInt(savedTime, 10);
    }
  }

  startPauseTimer() {
    if (this.running) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.running = true;
    this.subscription = interval(10).subscribe(() => {
      this.elapsedTime += 10;
      localStorage.setItem('stopwatchTime', this.elapsedTime.toString()); // Save time
    });
  }

  stopTimer() {
    this.running = false;
    this.subscription?.unsubscribe();
  }

  resetTimer() {
    this.stopTimer();
    this.elapsedTime = 0;
    localStorage.removeItem('stopwatchTime'); // Clear storage
  }

  get formattedTime(): string {
    // const ms = this.elapsedTime % 1000;
    const seconds = Math.floor((this.elapsedTime / 1000) % 60);
    const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 24);
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number, size: number = 2): string {
    return num.toString().padStart(size, '0');
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
