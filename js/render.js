'use strict';

(function () {

  var WIZARDS_COUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardsFragment = document.createDocumentFragment();
  var setupWizardWindow = document.querySelector('.setup');
  var similarWizardListWindow = setupWizardWindow.querySelector('.setup-similar-list');

  // функция вывода волшебника в верстку
  window.renderWizardNode = function (wizard) {
    var wizardNode = similarWizardTemplate.cloneNode(true);
    wizardNode.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardNode.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardNode.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardNode;
  };

  // выводим всех волшебников в блок формы настройки волшебника
  window.renderWizards = function (operationAllWizards) {
    similarWizardListWindow.innerHTML = '';
    // operationAllWizards.length >= 4 ? WIZARDS_COUNT = 4 : WIZARDS_COUNT = operationAllWizards.length;
    for (var i = 0; i <= WIZARDS_COUNT - 1; i++) {
      wizardsFragment.appendChild(window.renderWizardNode(operationAllWizards[i]));
    }

    similarWizardListWindow.appendChild(wizardsFragment);

  };

})();

