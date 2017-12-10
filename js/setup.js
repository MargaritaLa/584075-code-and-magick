'use strict';

(function () {


  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_COUNT = 4;
  var setupWizardWindow = document.querySelector('.setup');
  var setupSimilarWizardWindow = document.querySelector('.setup-similar');

  var allWizards = createWizardsArray(WIZARDS_COUNT, WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);

  var similarWizardListWindow = setupWizardWindow.querySelector('.setup-similar-list');
  var wizardsFragment = document.createDocumentFragment();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // переменные для функций изменения вида волшебника
  var intoFocusWizard = document.querySelector('.setup-wizard-wrap');
  var intoFocusFireballWizard = document.querySelector('.setup-fireball-wrap');
  var inputValueCoat = document.querySelector('[name = "coat-color"]');
  var inputValueEyes = document.querySelector('[name = "eyes-color"]');
  var inputValueFireball = document.querySelector('[name = "fireball-color"]');
  var changeCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var changeEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var changeFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // переменные для релизации функций магазина
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');


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
    var wizardCoatColors = operationWizardCoatColors.slice().sort(window.mathUtils.compareRandom);
    var wizardEyesColors = operationWizardEyesColors.slice().sort(window.mathUtils.compareRandom);

    for (var i = 0; i < wizardsCount; i++) {

      var wizard = {
        name: wizardsNames[window.mathUtils.getRandomValue(wizardsNames.length - 1)],
        surname: wizardsSurnames[window.mathUtils.getRandomValue(wizardsSurnames.length - 1)],
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

  // функции изменения вида волшебника
  intoFocusWizard.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.classList.contains('wizard-coat')) {
      var colorCoat = changeCoatColors[window.mathUtils.getZeroMaxRandomValue(0, changeCoatColors.length - 1)];
      e.target.style.fill = colorCoat;
      inputValueCoat.value = colorCoat;
    }

    if (e.target.classList.contains('wizard-eyes')) {
      var colorEyes = changeEyesColors[window.mathUtils.getZeroMaxRandomValue(0, changeEyesColors.length - 1)];
      e.target.style.fill = colorEyes;
      inputValueEyes.value = colorEyes;
    }
  }, false);

  intoFocusFireballWizard.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.classList.contains('setup-fireball')) {
      var color = changeFireballColors[window.mathUtils.getZeroMaxRandomValue(0, changeFireballColors.length - 1)];
      e.target.parentElement.style.background = color;
      inputValueFireball.value = color;
    }
  }, true);

  /* функции для работы магазина */

  /*  пользователь начал перетаскивать звездочку */
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  /* звездочка перемещается в области элемента, который может его принять. */
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();

    return false;
  });

  /* звездочка размещается в область элемента (drop target), который может его принять*/
  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var elem = document.elementFromPoint(evt.clientX, evt.clientY).closest('.setup-artifacts-cell');
    if (elem.childNodes.length === 0) {
      evt.target.style.backgroundColor = '';
      evt.target.style.outline = '';
      evt.target.appendChild(draggedItem.cloneNode(true));
      evt.target.children[0].removeAttribute('draggable');
    }

  });

  /* звездочка вошла в область элемента, который может принять перетаскиваемый объект */
  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    var elem = document.elementFromPoint(evt.clientX, evt.clientY).closest('.setup-artifacts-cell');
    if (elem.childNodes.length === 0) {
      evt.target.style.backgroundColor = 'yellow';
      evt.target.style.outline = '2px dashed red';
    }
  });

  /* звездочка покидает пределы элемента (drop target), который может его принять */
  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = '';
    evt.preventDefault();
  });

})();
