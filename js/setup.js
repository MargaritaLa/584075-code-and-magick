'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_COUNT = 4;

  var allWizards = createWizardsArray(WIZARDS_COUNT, WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);

  var setupWizardWindow = document.querySelector('.setup');
  var setupOpenWizardWindow = document.querySelector('.setup-open');
  var setupCloseWizardWindow = setupWizardWindow.querySelector('.setup-close');
  var setupSimilarWizardWindow = document.querySelector('.setup-similar');

  var similarWizardListWindow = setupWizardWindow.querySelector('.setup-similar-list');
  var wizardsFragment = document.createDocumentFragment();

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // показываем блок формы настройки волшебника и блок выбора волшебника соответсвенно
  // setupWizardWindow.classList.remove('hidden');
  setupSimilarWizardWindow.classList.remove('hidden');

  // отображаем волшебников во фрагменте
  renderWizards(wizardsFragment, allWizards);

  // выводим всех волшебников в блок формы настройки волшебника
  similarWizardListWindow.appendChild(wizardsFragment);

  // создаем массив объектов "Волшебник"
  function createWizardsArray(wizardsCount, wizardsNames, wizardsSurnames, operationWizardCoatColors, operationWizardEyesColors) {

    var wizardsArray = [];
    var wizardCoatColors = operationWizardCoatColors.slice().sort(compareRandom);
    var wizardEyesColors = operationWizardEyesColors.slice().sort(compareRandom);

    for (var i = 0; i < wizardsCount; i++) {

      var wizard = {
        name: wizardsNames[getRandomValue(wizardsNames.length - 1)],
        surname: wizardsSurnames[getRandomValue(wizardsSurnames.length - 1)],
        coatColor: wizardCoatColors[i],
        eyesColor: wizardEyesColors[i]
      };

      wizardsArray.push(wizard);
    }

    return wizardsArray;
  }

  // выводим всех волшебников в блок формы настройки волшебника
  function renderWizards(operationWizardsFragment, operationAllWizards) {
    for (var i = 0; i <= operationAllWizards.length - 1; i++) {
      operationWizardsFragment.appendChild(renderWizard(operationAllWizards[i]));
    }
  }

  // функция вывода волшебника в верстку
  function renderWizard(wizard) {

    var wizardNode = similarWizardTemplate.cloneNode(true);

    wizardNode.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardNode.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardNode.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardNode;

  }

  // функции обработки событий

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setupWizardWindow.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    var focused = document.activeElement;
    if (focused !== document.querySelector('.setup-user-name')) {
      setupWizardWindow.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  setupOpenWizardWindow.addEventListener('click', function () {
    openPopup();
  });

  setupOpenWizardWindow.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupCloseWizardWindow.addEventListener('click', function () {
    closePopup();
  });

  setupCloseWizardWindow.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });


  // функции изменения вида волшебника
  var intoFocusWizard = document.querySelector('.setup-wizard-wrap');
  var intoFocusFireballWizard = document.querySelector('.setup-fireball-wrap');
  var inputValueCoat = document.querySelector('[name = "coat-color"]');
  var inputValueEyes = document.querySelector('[name = "eyes-color"]');
  var inputValueFireball = document.querySelector('[name = "fireball-color"]');
  var changeCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var changeEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var changeFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  intoFocusWizard.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.classList.contains('wizard-coat')) {
      var colorCoat = changeCoatColors[getZeroMaxRandomValue(0, changeCoatColors.length - 1)];
      e.target.style.fill = colorCoat;
      inputValueCoat.value = colorCoat;
    }

    if (e.target.classList.contains('wizard-eyes')) {
      var colorEyes = changeEyesColors[getZeroMaxRandomValue(0, changeEyesColors.length - 1)];
      e.target.style.fill = colorEyes;
      inputValueEyes.value = colorEyes;
    }
  }, false);

  intoFocusFireballWizard.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.classList.contains('setup-fireball')) {
      var color = changeFireballColors[getZeroMaxRandomValue(0, changeFireballColors.length - 1)];
      e.target.parentElement.style.background = color;
      inputValueFireball.value = color;
    }
  }, true);


  // математические функции

  // функция перемешивания значений в массиве
  function compareRandom() {
    return Math.random() - 0.5;
  }

  // получить случайное число в диапозоне от 0 до max
  function getRandomValue(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  /*  получить случайное число в диапозоне от min до max включительно */
  function getZeroMaxRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

})();
