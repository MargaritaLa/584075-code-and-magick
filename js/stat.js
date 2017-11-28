
(function () {

  'use strict';

  var widthColumnHistogram = 40;
  var heightHistogram = 150;
  var leftPoint = 120;
  var topPoint = 100;
  var bottomWhiteRect = 270;
  var textColor = '#333333';
  var indentColumn = 50;
  var currentUserColor = 'rgba(255, 0, 0, 1)';


  function drawBackground(ctx, bottomWhiteRect) {

   // shadow
   ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
   ctx.fillRect(110, 20, 420, 270);
   // rectangle
   ctx.fillStyle = 'white';
   ctx.fillRect(100, 10, 420, bottomWhiteRect);

 }

 function drawCongratulationsText(ctx, leftPoint) {

  ctx.fillStyle = textColor;
  ctx.strokeStyle = textColor;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', leftPoint, 50);
  ctx.fillText('Список результатов:', leftPoint, 70);

}

function drawHistogramColumn(ctx, columnX, columnY, heightColumnHistogram, histogramColumnColor) {

  ctx.fillStyle = histogramColumnColor;
  ctx.fillRect(columnX, columnY, widthColumnHistogram, heightColumnHistogram);

}

function drawHistogram(ctx, times, names) {

  var maxTimeValue = Math.max.apply(Math, times);
  var heightHistogramDrawArea = heightHistogram - topPoint;

  for (var i = 0; i <= names.length - 1; i++) {

    var columnX = i === 0 ? 0 : i * (widthColumnHistogram + indentColumn);
    var columnY = heightHistogramDrawArea - Math.round(heightHistogramDrawArea * (Math.round(times[i]) / maxTimeValue));
    var histogramColumnColor;

    if (names[i] === 'Вы') {
      histogramColumnColor = currentUserColor;
    } else {
      histogramColumnColor = ('rgba(0, 0, 255, ' + Math.random() + ')');
    }

    drawHistogramColumn(ctx, columnX + leftPoint, columnY + topPoint, heightHistogramDrawArea - columnY + topPoint, histogramColumnColor);

    drawName(ctx, names[i], columnX);

  }

}

function drawName(ctx, name, columnX) {

  ctx.fillStyle = textColor;
  ctx.fillText(name, columnX + leftPoint, bottomWhiteRect);

}

window.renderStatistics = function(ctx, names, times) {

  drawBackground(ctx, bottomWhiteRect);
  drawCongratulationsText(ctx, leftPoint);
  drawHistogram(ctx, times, names);

};

})();

