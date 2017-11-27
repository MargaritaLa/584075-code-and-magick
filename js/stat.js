'use strict';

(function () {

  function renderBasicText(ctx, beginningLine) {
    ctx.fillStyle = '#333333';
    ctx.strokeStyle = '#333333';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура, вы победили!', beginningLine, 50);
    ctx.fillText('Список результатов:', beginningLine, 70);
  }

  window.renderStatistics = function(ctx, names, times) {
    var max;
    var start;
    var widthColumn = 40;
    var heightHistogramme = 150;
    var leftPoint = 120;
    var topPoint = 100;
    var bottomWhiteRect = 270;
    var indentColumn = 50;
    var myColor = 'rgba(255, 0, 0, 1)';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 10, 420, bottomWhiteRect);

    renderBasicText(ctx, leftPoint);

    max = Math.max.apply(Math, times);

    heightHistogramme -= topPoint;

    for (var i = 0; i <= names.length - 1; i++) {

      var top = heightHistogramme - Math.round(heightHistogramme * (Math.round(times[i]) / max));

      start = i === 0 ? 0 : i * (widthColumn + indentColumn);

      if (names[i] === 'Вы') {
        ctx.fillStyle = myColor;
      } else {
        ctx.fillStyle = ('rgba(0, 0, 255, ' + Math.random() + ')');
      }

      ctx.fillRect(start + leftPoint, top + topPoint, widthColumn, heightHistogramme - top + topPoint);
      ctx.fillStyle = '#333333';
      ctx.fillText(names[i], start + leftPoint, bottomWhiteRect);

    }
  };
})();

