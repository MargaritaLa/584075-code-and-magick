'use strict';

(function () {

  /* обработка ошибок */
  window.onError = function (errorMessage) {
    var messageDialog = document.createElement('div');
    messageDialog.classList.add('messageError');
    messageDialog.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', messageDialog);
  };

  window.backend.load(window.onLoad, window.onError);

})();

