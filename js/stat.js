'use strict';

(function () {

  var widthColumnHistogram = 40;
  var heightHistogram = 150;
  var leftPoint = 120;
  var topPoint = 100;
  var bottomWhiteRect = 270;
  var textColor = '#333333';


  function drawBackground(ctx, bottomWhiteRect) {

   ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
   ctx.fillRect(110, 20, 420, 270);
   ctx.fillStyle = 'white';
   ctx.fillRect(100, 10, 420, bottomWhiteRect);

 }

 function drawCongratulationsText(ctx, beginningLine) {

  ctx.fillStyle = textColor;
  ctx.strokeStyle = textColor;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', beginningLine, 50);
  ctx.fillText('Список результатов:', beginningLine, 70);

}

function drawHistogram(ctx, times, names) {


  var indentColumn = 50;
  var currentUserColor = 'rgba(255, 0, 0, 1)';
  var maxTimeValue = Math.max.apply(Math, times);

  heightHistogram -= topPoint;

  for (var i = 0; i <= names.length - 1; i++) {

    var top = heightHistogram - Math.round(heightHistogram * (Math.round(times[i]) / maxTimeValue));
    var start = i === 0 ? 0 : i * (widthColumnHistogram + indentColumn);

    if (names[i] === 'Вы') {
      ctx.fillStyle = currentUserColor;
    } else {
      ctx.fillStyle = ('rgba(0, 0, 255, ' + Math.random() + ')');
    }

    ctx.fillRect(start + leftPoint, top + topPoint, widthColumnHistogram, heightHistogram - top + topPoint);

    drawName(ctx, names[i], start);
  }

}

function drawName(ctx, names, start) {

  ctx.fillStyle = textColor;
  ctx.fillText(names, start + leftPoint, bottomWhiteRect);

}

window.renderStatistics = function(ctx, names, times) {

  drawBackground(ctx, bottomWhiteRect);
  drawCongratulationsText(ctx, leftPoint);
  drawHistogram(ctx, times, names);

};

})();

