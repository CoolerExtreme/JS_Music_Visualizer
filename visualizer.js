function Bar(p, w)
{
    this.width = w;
    this.height = 10;
    this.p2 = new Point(p.x + this.width, p.y + this.height);
    var rect = new Rectangle(p, this.p2);
    var sizep = new Size(1, 1);
    this.path = new Path.RoundRectangle(rect, sizep);
    this.path.fillColor =
    {
        hue: p.x / 640 * 360,
        saturation: 1,
        brightness: 1
    };
    this.iterate = function(y)
    {
        this.path.bounds.height = y;
    };
}

//--------------------- main ---------------------
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var myAudio = document.getElementById('player1');
var source = audioCtx.createMediaElementSource(myAudio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 512;
var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Uint8Array(bufferLength);
var bars = [];
var numBars = 256;
var w = 640/numBars;
for (var i = 0; i < numBars; i++)
{
    var position = new Point(i * w, 0);
    bars.push(new Bar(position, w));
}

function onFrame()
{
    analyser.getByteFrequencyData(dataArray);
    for(var i = 0, l = numBars; i < l; i++)
    {
        var y = dataArray[i] + 10;
        bars[i].iterate(y);
    }
}
