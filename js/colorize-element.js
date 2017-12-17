'use strict';

(function () {

  // переменные для функций изменения вида волшебника
  var intoFocusFieldWizard = document.querySelector('.setup-player');
  var changeCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var changeEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var changeFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // функции изменения вида волшебника
  intoFocusFieldWizard.addEventListener('click', function (e) {
    e.stopPropagation();
    var clickedElement = e.target;

    // оповещение о выбранном цвете и элементе
    colorizeElement(clickedElement);
  }, false);

  var coatColor = getComputedStyle(document.querySelector('.wizard-coat')).fill;
  var eyesColor = getComputedStyle(document.querySelector('.wizard-eyes')).fill;
  var fireballColor = getComputedStyle(document.querySelector('.setup-fireball-wrap')).backgroundColor;

  var colorizeElement = function (clickedElement) {
    var getClass = clickedElement.getAttribute('class');

    switch (getClass) {
      case 'wizard-coat':
        coatColor = changeCoatColors[window.mathUtils.getZeroMaxRandomValue(0, changeCoatColors.length - 1)];
        break;
      case 'wizard-eyes':
        eyesColor = changeEyesColors[window.mathUtils.getZeroMaxRandomValue(0, changeEyesColors.length - 1)];
        break;
      case 'setup-fireball':
        fireballColor = changeFireballColors[window.mathUtils.getZeroMaxRandomValue(0, changeFireballColors.length - 1)];
        break;
      default:
        return;
    }

    var event = new CustomEvent('WizardChanged', {'detail': {
      coatColor: coatColor,
      eyesColor: eyesColor,
      fireballColor: fireballColor,
      clickedElement: clickedElement,
    }});
    document.dispatchEvent(event);
  };

})();

