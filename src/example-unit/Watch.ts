import {Minute} from "./Minute";
import {Hour} from "./Hour";

export class Watch {
  private timeDisplay: HTMLElement;
  private modeButton: HTMLButtonElement;
  private increaseButton: HTMLButtonElement;
  private lightButton: HTMLButtonElement;
  private formatButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;

  private editable: boolean;
  private mode: number;
  private hours: Hour;
  private minutes: Minute;
  private is24HourFormat: boolean;

  constructor() {
    console.log("Init Clock...");
    this.timeDisplay = document.getElementById('time')!;
    this.modeButton = document.getElementById('modeBtn') as HTMLButtonElement;
    this.increaseButton = document.getElementById('increaseBtn') as HTMLButtonElement;
    this.lightButton = document.getElementById('lightBtn') as HTMLButtonElement;
    this.formatButton = document.getElementById('formatBtn') as HTMLButtonElement;
    this.resetButton = document.getElementById('resetBtn') as HTMLButtonElement;

    this.editable = false;
    this.mode = 0;
    this.hours = new Hour(0);
    this.minutes = new Minute(0);
    this.is24HourFormat = true;

    this.setupListeners();
  }

  private setupListeners(): void {
    this.modeButton.addEventListener('click', () => this.handleModeButtonClick());
    this.increaseButton.addEventListener('click', () => this.handleIncreaseButtonClick());
    this.lightButton.addEventListener('click', (event) => this.handleLightButtonClick());
    this.formatButton.addEventListener('click', () => this.handleFormatButtonClick());
    this.resetButton.addEventListener('click', () => this.resetClock());
  }

  private resetClock(): void {
    const now = new Date();
    this.hours = new Hour(now.getHours());
    this.minutes = new Minute(now.getMinutes());
    this.displayTime();
  }

  private displayTime(): void {
    let hours = this.hours.getValue().toString().padStart(2, '0');
    let ampm = '';

    if (!this.is24HourFormat) {
      ampm = this.hours.getValue() >= 12 ? 'PM' : 'AM';
      hours = (this.hours.getValue() % 12 || 12).toString();
    }

    const minutes = this.minutes.getValue().toString().padStart(2, '0');

    this.timeDisplay.textContent = `${hours}:${minutes} ${ampm}`.trim();
  }

  private handleModeButtonClick(): void {
    if (this.mode === 0) {
      this.mode = 1;
    } else if (this.mode === 1) {
      this.mode = 2;
    } else {
      this.mode = 0;
      this.increaseButton.disabled = false;
    }
  }

  private handleIncreaseButtonClick(): void {
    if (this.mode === 1) {
      this.hours.increment();
    } else if (this.mode === 2) {
      this.minutes.increment();
    }
    this.displayTime();
  }

  private handleLightButtonClick(): void {
    const clockDigits = document.getElementById('time')!;
    if (clockDigits.classList.contains('clock-digits-light')) {
      clockDigits.classList.remove('clock-digits-light');
      clockDigits.classList.add('clock-digits-dark');
    } else {
      clockDigits.classList.remove('clock-digits-dark');
      clockDigits.classList.add('clock-digits-light');
    }
  }

  private handleFormatButtonClick(): void {
    this.is24HourFormat = !this.is24HourFormat;
    this.displayTime();
  }

  public start(): void {
    const now = new Date();
    this.hours = new Hour(now.getHours());
    this.minutes = new Minute(now.getMinutes());
    this.displayTime();


    setInterval(() => {
      this.minutes.increment();
      if (this.minutes.getValue() === 0) {
        this.hours.increment();
      }
      this.displayTime();
    }, 60000);
  }
}
