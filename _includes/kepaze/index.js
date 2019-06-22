const talim = [
  ["23.04.19", 220],
  ["24.04.19", 265],
  ["25.04.19", 220],
  ["26.04.19", 180],
  ["27.04.19", 180],
  ["28.04.19", 300],
  ["29.04.19", 330],
  ["30.04.19", 460],
  ["01.05.19", 300],
  ["02.05.19", 500],
  ["03.05.19", 410],
  ["04.05.19", 635],
  ["05.05.19", 560],
  ["06.05.19", 300],
  ["07.05.19", 290],
  ["08.05.19", 350],
  ["09.05.19", 320],
  ["10.05.19", 310],
  ["11.05.19", 60],
  ["12.05.19", 350],
  ["13.05.19", 310],
  ["14.05.19", 310],
  ["15.05.19", 180],
  ["16.05.19", 0],
  ["17.05.19", 0],
  ["18.05.19", 0],
  ["19.05.19", 210],
  ["20.05.19", 0],
  ["21.05.19", 450],
  ["21.05.19", 230],
  ["22.05.19", 250],
  ["23.05.19", 210],
  ["24.05.19", 0],
  ["25.05.19", 0],
  ["26.05.19", 0],
  ["27.05.19", 410],
  ["28.05.19", 300],
  ["29.05.19", 100],
  ["30.05.19", 450],
  ["31.05.19", 400],
  ["31.05.19", 440],
  ["31.05.19", 400],
  // -- bayram tatili
  ["12.06.19", 450],
  ["13.06.19", 250],
  ["14.06.19", 0],
  ["15.06.19", 0],
  ["16.06.19", 0],
  ["17.06.19", 0],
  ["18.06.19", 0],
  ["19.06.19", 300],
  ["20.06.19", 250],
  ["21.06.19", 200],
  ["22.06.19", 50]
]
var canvas = document.getElementById('kepaze');
var ctx = canvas.getContext('2d');

// fix dpi
let dpi = window.devicePixelRatio;
let style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//get CSS width
let style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//scale the canvas
canvas.setAttribute('height', style_height * dpi);
canvas.setAttribute('width', style_width * dpi);
var canvasWidth = canvas.offsetWidth;
// end fix dpi

var totalKepaze = 0;
var totalDays = talim.length;
var passedDays = 0;
for (var i = totalDays - 1; i >= 0; i--) {
  totalKepaze += talim[i][1];
  if (talim[i][1] == 0)
    passedDays++;
}
document.getElementById('startDate').innerHTML = 'Gayrimüslim takvimiyle ' + talim[0][0] + ' tarihi itibariyle bu yola girmiş ve kepâzekeş olmuştur.';
document.getElementById('totalDays').innerHTML = totalDays + " gündür talim etmekte'dur.";
document.getElementById('passedDays').innerHTML = "Ve bu süre zarfında " + passedDays + " gün talimi terketmek cürümünde bulunmuştur.";
var calculatedTotalKepaze = 200 * totalDays;
var actualProgress = totalKepaze * 100 / 12000;
var calculatedProgress = 200 * totalDays * 100 / 12000;

// total
var pos = canvasWidth*dpi;
ctx.fillStyle = "#ffe500";
ctx.fillRect(0, 50, pos, 70);
ctx.fillStyle = "#555";
ctx.font = "40px Merriweather";
ctx.fillText("Toplam: 12000 germe (sağ ve sol ayrı)", 30, 100);

// calculated
pos = Math.min(canvasWidth*dpi*calculatedProgress/100, canvasWidth*dpi);
ctx.fillStyle = "#195e9b";
ctx.fillRect(0, 150, pos, 70);
ctx.fillStyle = "#fff";
ctx.font = "40px Merriweather";
ctx.fillText("Beklenen: " + 200*totalDays + " germe", 30, 200);
ctx.fillText("%"+Math.round(calculatedProgress), pos - 120, 200);


// actual
pos = Math.min(canvasWidth*dpi*actualProgress/100, canvasWidth*dpi);
ctx.fillStyle = "#1cbc71";
ctx.fillRect(0, 250, pos, 70);
ctx.fillStyle = "#fff";
ctx.font = "40px Merriweather";
ctx.fillText("Ulaşılan: " + totalKepaze + " germe", 30, 300);
ctx.fillText("%"+Math.round(actualProgress), pos - 120, 300);