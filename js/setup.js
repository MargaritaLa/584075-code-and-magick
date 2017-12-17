'use strict';

(function () {

  var setupSimilarWizardWindow = document.querySelector('.setup-similar');

  // переменные для релизации функций магазина
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  // показываем блок формы настройки волшебника и блок выбора волшебника соответсвенно
  setupSimilarWizardWindow.classList.remove('hidden');

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

  document.addEventListener('WizardChanged', handleWizardChangeEvent);

  function colorizeNotFireball(clickedElement, color) {
    clickedElement.style.fill = color;
  }

  function colorizeFireball(clickedElement, color) {
    clickedElement.closest('.setup-fireball-wrap').style.background = color;
  }

  function handleWizardChangeEvent(e) {

    fillForm(e.detail);

    var clickedElement = e.detail.clickedElement;

    if (clickedElement.classList.contains('setup-fireball')) {
      colorizeFireball(clickedElement, e.detail.fireballColor);
    } else if (clickedElement.classList.contains('wizard-coat')) {
      colorizeNotFireball(clickedElement, e.detail.coatColor);
    } else if (clickedElement.classList.contains('wizard-eyes')) {
      colorizeNotFireball(clickedElement, e.detail.eyesColor);
    }
  }

  function fillForm(colors) {
    inputValueCoat.value = colors.coatColor;
    inputValueEyes.value = colors.eyesColor;
    inputValueFireball.value = colors.fireballColor;
  }

})();
