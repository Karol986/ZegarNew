const CLOCK_BUTTON_ID = 'js-toggle-mode';
const CLOCK_CONTAINER_SELECTOR = '.clock__container';
const CLOCK_ID = 'js-clock';
const CLOCK__IS_ACTIVE_CLASS = '.clock__container--is-active';
const CLOCK_SIZE = 640;
const HOURS_DISPLAY_ID = 'js-hours-digital';
const HOURS_HAND_SHIFT = 30;
const MAX_SIZE_OF_CLOCK = 800;
const MINUTES_DISPLAY_ID = 'js-minutes-digital';
const MINUTES_HAND_SHIFT = 6;
const ONE_SECOND = 1000;
const SCALE_PROPERTY_NAME = '--scale-value';
const HOURS_PROPERTY_NAME = '--hours';
const MINUTES_PROPERTY_NAME = '--minutes';
const SECOND_PROPERTY_NAME = '--seconds';
const SECONDS_DISPLAY_ID = 'js-seconds-digital';

class Clock {
    constructor(){
        this.attachToElements();
        this.handleResizeWindow();
        window.setInterval(() => this.clockTick(), ONE_SECOND);
        this.buttonElement.addEventListener('click', () => this.handleToogleClock());
        window.addEventListener('resize', () => this.handleResizeWindow())

    }

    attachToElements(){
        this.hoursDisplayElement =document.getElementById(HOURS_DISPLAY_ID);
        this.minutesDisplayElement =document.getElementById(MINUTES_DISPLAY_ID);
        this.secondsDisplayElement =document.getElementById(SECONDS_DISPLAY_ID);
        this.propertyContainer = document.documentElement.style;
        this.clockElement = document.getElementById(CLOCK_ID);
        this.contatainersElements = [...document.querySelectorAll(CLOCK_CONTAINER_SELECTOR)];
        this.buttonElement = document.getElementById(CLOCK_BUTTON_ID);
    }

    handleResizeWindow() {
        const maxSize = window.innerWidth > window.innerHeight
            ? window.innerHeight
            : window.innerWidth;
            
        const scale = maxSize > MAX_SIZE_OF_CLOCK ? MAX_SIZE_OF_CLOCK / CLOCK_SIZE : maxSize / CLOCK_SIZE;
        this.propertyContainer.setProperty(SCALE_PROPERTY_NAME, scale);   
     }

     clockTick() {
         const timer = new Date();
         const seconds = timer.getSeconds();
         const minutes = timer.getMinutes();
         const hours = timer.getHours();

         this.hoursDisplayElement.textContent = hours <= 9 ? `0${hours}` : hours;
         this.minutesDisplayElement.textContent = minutes <= 9 ? `0${minutes}` : minutes;
         this.secondsDisplayElement.textContent = seconds <= 9 ? `0${seconds}` : seconds;
         this.propertyContainer.setProperty(SECOND_PROPERTY_NAME, seconds );
         this.propertyContainer.setProperty(MINUTES_PROPERTY_NAME, `${minutes * MINUTES_HAND_SHIFT}deg`);
         this.propertyContainer.setProperty(HOURS_PROPERTY_NAME, `${hours % 12 * HOURS_HAND_SHIFT}deg`);
         
         
     }

     handleToogleClock() {
         this.contatainersElements.forEach(clockElement => clockElement.classList.toggle(CLOCK__IS_ACTIVE_CLASS ))
     }
}

new Clock();