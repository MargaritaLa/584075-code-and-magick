'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setupWizardWindow = document.querySelector('.setup');
  var setupOpenWizardWindow = document.querySelector('.setup-open');
  var setupCloseWizardWindow = setupWizardWindow.querySelector('.setup-close');

  // функции обработки событий

  setupOpenWizardWindow.addEventListener('click', function () {
    window.openPopup();
  });

  setupOpenWizardWindow.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.openPopup();
    }
  });

  setupCloseWizardWindow.addEventListener('click', function () {
    window.closePopup();
  });

  setupCloseWizardWindow.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.closePopup();
    }
  });

  window.openPopup = function () {
    setupWizardWindow.classList.remove('hidden');
    document.addEventListener('keydown', window.onPopupEscPress);
  };

  window.closePopup = function () {
    var focused = document.activeElement;
    if (focused !== document.querySelector('.setup-user-name')) {
      setupWizardWindow.classList.add('hidden');
      document.removeEventListener('keydown', window.onPopupEscPress);
    }
  };

  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closePopup();
    }
  };


})();

