'use strict';

(function () {

  // математические функции
  window.mathUtils = {
    // функция перемешивания значений в массиве
    compareRandom: function compareRandom() {
      return Math.random() - 0.5;
    },
    // получить случайное число в диапозоне от 0 до max
    getRandomValue: function getRandomValue(max) {
      return Math.floor(Math.random() * (max + 1));
    },
    /*  получить случайное число в диапозоне от min до max включительно */
    getZeroMaxRandomValue: function getZeroMaxRandomValue(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  };
}
)();
