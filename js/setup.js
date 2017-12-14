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

  // переменные для релизации функций магазина
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  // показываем блок формы настройки волшебника и блок выбора волшебника соответсвенно
  setupSimilarWizardWindow.classList.remove('hidden');

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
  function renderWizard(operationWizardsFragment, operationAllWizards) {
    operationWizardsFragment.appendChild(renderWizardNode(operationAllWizards));
  }

  // функция вывода волшебника в верстку
  function renderWizardNode(wizard) {
    var wizardNode = similarWizardTemplate.cloneNode(true);

    wizardNode.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardNode.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardNode.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardNode;
  }

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

  /* часть функционала перекрашивания по клику элементов волшебника */
  /* переменные для заполнения формы */
  var inputValueCoat = document.querySelector('[name = "coat-color"]');
  var inputValueEyes = document.querySelector('[name = "eyes-color"]');
  var inputValueFireball = document.querySelector('[name = "fireball-color"]');

  function fillForm(clickedElement, color) {
    switch (clickedElement.getAttribute('class')) {
      case 'wizard-coat':
      inputValueCoat.value = color;
      break;
      case 'wizard-eyes':
      inputValueEyes.value = color;
      break;
      case 'setup-fireball':
      inputValueFireball.value = color;
      break;
    }

  }

  function colorizeFireball(clickedElement, color) {
    clickedElement.style.fill = color;
  }

  function colorizeNotFireball(clickedElement, color) {
    clickedElement.closest('.setup-fireball-wrap').style.background = color;
  }

  window.wizardElementClicked = function (clickedElement) {

    var colorizeElementFunction;

    if (!clickedElement.classList.contains('setup-fireball')) {
      colorizeElementFunction = colorizeFireball;
    } else {
      colorizeElementFunction = colorizeNotFireball;
    }

    window.colorizeElement(clickedElement, colorizeElementFunction);
    window.colorizeElement(clickedElement, fillForm);

  };

  /* загрузка других волшебников с сервера */
  var onLoad = function (wizards) {
    if(wizards !== undefined){
      for (var i = 0; i < WIZARDS_COUNT; i++) {
        renderWizard(wizardsFragment, wizards[window.mathUtils.getRandomValue(wizards.length - 1)]);
      }
      similarWizardListWindow.appendChild(wizardsFragment);
    }
  };

  var onError = function (errorMessage) {
   var messageDialog = document.createElement('div');
   messageDialog.classList.add('messageError');
   messageDialog.textContent = message;
   document.body.insertAdjacentElement('afterbegin', messageDialog);
 }

 window.backend.load(onLoad, onError);
})();
