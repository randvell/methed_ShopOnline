const createTimerItem = (modificator) => {
  const container = document.createElement('p');
  container.classList.add('timer__item', `timer__item--${modificator}`);
  const value = document.createElement('span');
  const unit = document.createElement('span');
  value.classList.add('timer__value', `timer__value--${modificator}`);
  unit.classList.add('timer__unit', `timer__unit---${modificator}`);

  container.value = value;
  container.unit = unit;
  container.append(value, unit);
  return container;
};

const getUnit = (n, labels) => {
  return labels[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
};

const getTimeComponents = (time) => {
  var totalSeconds = time / 1000;

  var days = Math.floor(totalSeconds / (60 * 60 * 24));
  totalSeconds %= 60 * 60 * 24;

  var hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds %= 60 * 60;

  var minutes = Math.floor(totalSeconds / 60);
  totalSeconds %= 60;

  var seconds = Math.floor(totalSeconds);

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

const padWithZeros = (num, totalLength = 2) =>
  String(num).padStart(totalLength, '0');

export const processTimer = (timerElement) => {
  if (!timerElement) {
    return;
  }

  const deadline = timerElement.dataset.timerDeadline;
  if (!deadline) {
    return;
  }

  const header = document.createElement('p');
  header.classList.add('timer__header');
  header.textContent = 'До конца акции осталось';

  const timerItemsContainer = document.createElement('div');
  timerItemsContainer.classList.add('timer__items');

  timerElement.append(header, timerItemsContainer);

  const daysContainer = createTimerItem('days');
  const hoursContainer = createTimerItem('hours');
  const minutesContainer = createTimerItem('minutes');
  const secondsContainer = createTimerItem('seconds');
  timerItemsContainer.append(
    daysContainer,
    hoursContainer,
    minutesContainer,
    secondsContainer
  );

  const timeStop = new Date(deadline).getTime();
  if (Number.isNaN(timeStop)) {
    return;
  }

  const timer = setInterval(() => {
    const timeNow = Date.now();
    const timeRemaining = Math.max(0, timeStop - timeNow);

    const { days, hours, minutes, seconds } = getTimeComponents(timeRemaining);

    if (timeRemaining === 0) {
      clearInterval(timer);
      timerElement.classList.add('hidden');
    }

    if (days > 0) {
      daysContainer.classList.remove('hidden');
      secondsContainer.classList.add('hidden');

      daysContainer.unit.textContent = getUnit(days, ['день', 'дня', 'дней']);
      daysContainer.value.textContent = days;
    } else {
      secondsContainer.classList.remove('hidden');
      daysContainer.classList.add('hidden');

      secondsContainer.unit.textContent = getUnit(seconds, [
        'секунда',
        'секунды',
        'секунд',
      ]);
      secondsContainer.value.textContent = padWithZeros(seconds);
    }

    hoursContainer.unit.textContent = getUnit(hours, ['час', 'часа', 'часов']);
    hoursContainer.value.textContent = padWithZeros(hours);

    minutesContainer.unit.textContent = getUnit(minutes, [
      'минута',
      'минуты',
      'минут',
    ]);
    minutesContainer.value.textContent = padWithZeros(minutes);
  }, 1000);
};
