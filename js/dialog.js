'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setupWizardWindow = document.querySelector('.setup');
  var setupOpenWizardWindow = document.querySelector('.setup-open');
  var setupCloseWizardWindow = setupWizardWindow.querySelector('.setup-close');
  var setupWizardForm = setupWizardWindow.querySelector('.setup-wizard-form');


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
      setupWizardWindow.style.cssText = '';
    }
  };

  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closePopup();
    }
  };

  var dialogHandle = setupWizardWindow.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupWizardWindow.style.top = (setupWizardWindow.offsetTop - shift.y) + 'px';
      setupWizardWindow.style.left = (setupWizardWindow.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  dialogHandle.addEventListener('click', function (evt) {
    evt.preventDefault();
  });

  var onLoad = function (data) {
   console.log(data);
   window.closePopup();
 };

 var blockMessage = document.createElement('div');
 blockMessage.classList.add('errorMessage');
 document.body.appendChild(blockMessage);

 var onError = function (errorMessage) {
   var errorMessage = document.createElement('div');
   errorMessage.classList.add('item_errorMessage');
   errorMessage.textContent = 'message';
   blockMessage.insertAdjacentElement('afterbegin', errorMessage);
 }

 var formSubmitHandler = function (evt) {
  evt.preventDefault();
  window.backend.save(new FormData(setupWizardForm), onLoad, onError);

};

setupWizardForm.addEventListener('submit', formSubmitHandler);

})();

