import { processTimer } from './modules/timer.js';

addEventListener('DOMContentLoaded', () => {
  const timerItems = document.querySelectorAll('.timer');
  timerItems.forEach((timerElement) => processTimer(timerElement));
});
