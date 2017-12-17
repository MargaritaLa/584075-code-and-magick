'use strict';

(function () {

  var savedWizards = [];
  var originalСolorEyes = getComputedStyle(document.querySelector('.wizard-eyes'));
  var originalСolorCoat = getComputedStyle(document.querySelector('.wizard-coat'));
  var originalСolorFireball = getComputedStyle(document.querySelector('.setup-fireball-wrap'));

  window.fireballColor = originalСolorFireball.backgroundColor;
  window.coatColor = originalСolorCoat.fill;
  window.eyesColor = originalСolorEyes.fill;

  /* загрузка других волшебников с сервера */
  window.onLoad = function (wizards) {

    if (typeof wizards !== 'undefined') {
      savedWizards = wizards;
      selectSimilarWizards();
    }

  };

  var getRank = function (wizard, coatColor, eyesColor) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;

  };

  var namesComparator = function (left, right) {

    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }

  };

  document.addEventListener('WizardChanged', function (e) {
    window.debounce(function () {
      selectSimilarWizards(e.detail.coatColor, e.detail.eyesColor);
    });
  });

  var selectSimilarWizards = function (coatColor, eyesColor) {
    window.renderWizards(savedWizards.sort(function (left, right) {
      var rankDiff = getRank(right, coatColor, eyesColor) - getRank(left, coatColor, eyesColor);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));

  };

})();

