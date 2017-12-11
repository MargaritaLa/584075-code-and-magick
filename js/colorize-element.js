'use strict';

(function () {
  // переменные для функций изменения вида волшебника
  var intoFocusFieldWizard = document.querySelector('.setup-player');
  var inputValueCoat = document.querySelector('[name = "coat-color"]');
  var inputValueEyes = document.querySelector('[name = "eyes-color"]');
  var inputValueFireball = document.querySelector('[name = "fireball-color"]');
  var changeCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var changeEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var changeFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // функции изменения вида волшебника
  intoFocusFieldWizard.addEventListener('click', function (e) {
    e.stopPropagation();
    var clickedElement = e.target;

    // оповещение о выбранном цвете и элементе
    window.wizardElementClicked(clickedElement);

  }, false);

  window.colorizeElement = function(clickedElement, colorizeElementFunction) {

    var colorsArray;
    var getClass = clickedElement.getAttribute('class');

    switch(getClass) {
      case 'wizard-coat':
      colorsArray = changeCoatColors;
      break;
      case 'wizard-eyes':
      colorsArray = changeEyesColors;
      break;
      case 'setup-fireball':
      colorsArray = changeFireballColors;
      break;
      default:
      console.log('клик вне волшебника');
      return;
    }

 // выбор рандомного цвета
 var color = colorsArray[window.mathUtils.getZeroMaxRandomValue(0, colorsArray.length - 1)];

 if (typeof colorizeElementFunction === 'function') {
  colorizeElementFunction(clickedElement, color);
}

}

})();

