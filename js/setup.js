'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  // перемешиваем массивы цветов для глаз и плащей
  wizardCoatColors = wizardCoatColors.sort(compareRandom);
  wizardEyesColors = wizardEyesColors.sort(compareRandom);

  var WIZARDS_COUNT = 4;
  var allWizards = createWizardsArray(WIZARDS_COUNT, WIZARD_NAMES, WIZARD_SURNAMES, wizardCoatColors, wizardEyesColors);

  var setupWizardWindow = document.querySelector('.setup');
  var setupSimilarWizardWindow = document.querySelector('.setup-similar');

  var similarWizardListWindow = setupWizardWindow.querySelector('.setup-similar-list');
  var wizardsFragment = document.createDocumentFragment();

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // показываем блок формы настройки волшебника и блок выбора волшебника соответсвенно
  setupWizardWindow.classList.remove('hidden');
  setupSimilarWizardWindow.classList.remove('hidden');

  // отображаем волшебников во фрагменте
  renderWizards(wizardsFragment, allWizards);

  // выводим всех волшебников в блок формы настройки волшебника
  similarWizardListWindow.appendChild(wizardsFragment);

  // создаем массив объектов "Волшебник"
  function createWizardsArray(wizardsCount, wizardsNames, wizardsSurnames, operationWizardCoatColors, operationWizardEyesColors) {

    var wizardsArray = [];

    for (var i = 0; i < wizardsCount; i++) {

      var wizard = {
        name: wizardsNames[getRandomValue(wizardsNames.length - 1)],
        surname: wizardsSurnames[getRandomValue(wizardsSurnames.length - 1)],
        coatColor: operationWizardCoatColors[i],
        eyesColor: operationWizardEyesColors[i]
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

  // функция перемешивания значений в массиве
  function compareRandom() {
    return Math.random() - 0.5;
  }

  // получить случайное число в диапозоне от 0 до max
  function getRandomValue(max) {
    return Math.floor(Math.random() * (max + 1));
  }

})();
