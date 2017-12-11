'use strict';

(function () {
  // переменные для функций изменения вида волшебника
  var intoFocusFieldWizard = document.querySelector('.setup-player');
  var intoFocusWizard = document.querySelector('.setup-wizard-wrap');
  var intoFocusFireballWizard = document.querySelector('.setup-fireball-wrap');
  var inputValueCoat = document.querySelector('[name = "coat-color"]');
  var inputValueEyes = document.querySelector('[name = "eyes-color"]');
  var inputValueFireball = document.querySelector('[name = "fireball-color"]');
  var changeCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var changeEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var changeFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // функции изменения вида волшебника
  intoFocusFieldWizard.addEventListener('click', function (e) {
    e.stopPropagation();

    var getClass = e.target.getAttribute('class');

    switch(getClass) {
      case 'wizard-coat':
      chooseRandomColor(e.target, changeCoatColors, inputValueCoat);
      break;
      case 'wizard-eyes':
      chooseRandomColor(e.target, changeEyesColors, inputValueEyes);
      break;
      case 'setup-fireball':
      chooseRandomColor(e.target, changeFireballColors, inputValueFireball);
      break;
      default:
      console.log('клик вне волшебника');
    }
  }, false);

  function chooseRandomColor(repaintElement, colorsArray, inputElement) {

    var color = colorsArray[window.mathUtils.getZeroMaxRandomValue(0, colorsArray.length - 1)];
    inputElement.value = color;
    colorizeElement(repaintElement, color);

  }

  function colorizeElement(processedElement, colorFill) {

    if(!processedElement.classList.contains('setup-fireball')){
      processedElement.style.fill = colorFill;
    } else{
     processedElement.style.background = colorFill;
   }

 }

})();

