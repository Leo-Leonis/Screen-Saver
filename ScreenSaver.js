var canvas, ctx;


// variabili di stato
var palline = [];


function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");

    // numero di palline
    var n = 150;

    // assegno i parametri alle Palline
    for(var i = 0; i<n; i++) {
        var pallina = {};
        pallina.r = 5 + 40 * Math.random();
        //pallina.r = 5
        pallina.x = canvas.width/2;
        pallina.y = canvas.height/2;
        pallina.vx = 30*(Math.random(0.9,1)-0.5);
        pallina.vy = 30*(Math.random()-0.5);
        pallina.colore = coloreCasuale();
        palline.push(pallina);
    }

    anima();
}


//assegna i colori
function coloreCasuale() {
    var r = Math.floor(Math.random()* 256);
    var g = Math.floor(Math.random()* 256);
    var b = Math.floor(Math.random()* 256);
    //var r = Math.random()* 256;
    //var g = Math.random()* 256;
    //var b = Math.random()* 256;

    return 'rgb(' + r +', ' + g + ',' + b +')';
}


//forma l'animazione
function anima() {
    // cancella tutto
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    calcola();

    disegna();

    // richiama anima() il prima possibile
    requestAnimationFrame(anima);
}


//disegna il cerchio
function cerchio(x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
}


// aggiorna tutte le variabili di stato per il nuovo fotogramma
function calcola() {

    var dt = 0.5;

    for(var i=0; i<palline.length; i++) {
        var p = palline[i];

        // limiti nel movimento:
        var x0 = p.r,
            x1 = canvas.width - p.r,
            y0 = p.r,
            y1 = canvas.height - p.r;

        // muove la posizione
        p.x = p.x + p.vx*dt;
        p.y =  p.y + p.vy*dt;

        // gestisce i rimbalzi orizzontali
        if(p.x>x1)      { p.x = x1 - (p.x-x1); p.vx = -p.vx; }
        else if(p.x<x0) { p.x = x0 + (x0-p.x); p.vx = -p.vx; }

        // gestisce i rimbalzi verticali
        if(p.y>y1)      { p.y = y1 - (p.y-y1); p.vy = -p.vy; }
        else if(p.y<y0) { p.y = y0 + (y0-p.y); p.vy = -p.vy; }
    }
}

// disegna tutto
function disegna() {
    for(var i=0; i<palline.length; i++) {
        var p = palline[i];
        ctx.fillStyle = p.colore;
        cerchio(p.x,p.y,p.r);
    }
}
