
let video;
let buton;
let canvas, context, W, H;
let buttonEf1, buttonEf2, buttonEf3, buttonEf4, buttonEf5, btnReset;

let px = 10, py = 10, pw = 185, ph = 110, h = 30;
let vidPrev;
let frameTarget;
let urls = {
    'media/1.mp4': 'Plane movie',
    'media/2.mp4': 'Bee movie',
    'media/3.mp4': 'Beer movie',
    'media/4.mp4': 'Flower with bee movie'
};

let urlIndex = 0;
let showPreview = false;
let afisareContrl = false;
let mx = 0, my = 0;

const btnSize = 30;


//2.Desenare
function desenare() {
    //desenare video
     context.drawImage(video,0,0,W,H);

    if (afisareContrl) {

        //dreptunghi gri
        context.fillStyle = 'rgba(0,0,0,0.3)';
        context.fillRect(0, H - h, W, H);

        //progress bar rosu
        context.fillStyle = 'rgba(255,0,0,0.5)';
        let w = video.duration ? video.currentTime * W / video.duration : 0;
        context.fillRect(0, H - h, w, h);

        //btn sageata inapoi
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.lineWidth = 4;
        context.beginPath();
       
        context.moveTo(btnSize , H - 2 * h);
        context.lineTo(0, H - 3 * h / 2);
        context.lineTo(btnSize, H - h);
        context.stroke(); //desenam ce linii am pus

        //btn sageata inainte
        context.beginPath();
        context.moveTo(btnSize * 2, H - 2 * h);
        context.lineTo(btnSize * 2.75, H - 3 * h / 2);
        context.lineTo(btnSize * 2, H - h);

        context.stroke();

        //btn play/pause
        if (video.paused) {
             //desenare play
            context.beginPath();
            context.moveTo(btnSize, H - 2 * h);
            context.lineTo(btnSize * 2, H - 3 * h / 2);
            context.lineTo(btnSize, H - h);
            
            context.fill();
        } else {
            //desenare pause
            context.beginPath();
            context.moveTo(btnSize * 1.33, H - 2 * h);
            context.lineTo(btnSize * 1.33, H - h);

            context.moveTo(btnSize * 1.66, H - 2 * h);
            context.lineTo(btnSize * 1.66, H - h);

            context.stroke();
        }

        if (video.muted === false) {
            //desenare volum mute
            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            context.moveTo(btnSize * 5, H - 2 * h);
            context.lineTo(btnSize * 6, H - h);
            context.moveTo(btnSize * 6, H - 2 * h);
            context.lineTo(btnSize * 5, H - h);

            context.stroke(); //desenam ce linii am pus
        } else {
            //desenare volum unmute
            context.beginPath();
            context.lineWidth = 4;
            context.fillStyle = 'rgba(0, 0, 0, 0.5)';
            context.moveTo(btnSize * 4, H - 2 * h);
            context.lineTo(btnSize * 4.5, H - h);
            context.lineTo(btnSize * 5, H - 2 * h);

            context.stroke();
        }

        //desenare buton fullscreen
        context.beginPath();
        context.lineWidth = 4;
        context.moveTo(btnSize * 6.1, H - 2 * h);
        context.lineTo(btnSize * 7, H - 2 * h);
        context.lineTo(btnSize * 7, H - h);
        context.lineTo(btnSize * 6.1,H - h);
        context.lineTo(btnSize *6.1,H - h * 2);
        context.stroke();

        //pt secundele din video
        context.textAlign = 'right';
        context.fillStyle = 'white';
        context.fillText(Math.round(video.currentTime), W - h / 2, H - h / 2);

        //pentru volum up
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(btnSize * 7.5,H -2 * h);
        context.lineTo(btnSize * 7.5,H-h);
        context.moveTo(btnSize * 7.1,H - 3 * h / 2);
        context.lineTo(btnSize * 8,H - 3 * h / 2);
        context.stroke();

        //pentru volum down
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(btnSize * 8.3,H - 3 * h / 2);
        context.lineTo(btnSize * 9,H - 3 * h / 2);
        context.stroke();

        //preview frame
        if (showPreview === true){
            context.drawImage(vidPrev, 0, 0, W, H, px, py, pw, ph);
        }
    }

    desenarePlaylist();
    requestAnimationFrame(desenare);
}

function desenareEfect1(){
    var imageData1 = context.getImageData(0,0,video.width,video.height);
    var pixels = imageData1.data;
    for (var y = 0; y < H; y++) {
        for (var x = 0; x < W; x++) {
            var i = (y * W * 4) + x * 4;
            if(y < H ){
                pixels[i * 4] = 20;
                pixels[(i + 1) *4] = -10;
                pixels[(i + 2) * 4] = 10;

            }
        }
    }
    context.putImageData(imageData1, 0, 0);
    requestAnimationFrame(desenareEfect1);
}

function randomNumber(min,max){
    return Math.floor(Math.random() * max) + min;
}

function desenareEfect2(){
    var imageData2 = context.getImageData(0,0,video.width,video.height);
    var pixels = imageData2.data;
    for (var y = 0; y < H; y++) {
        for (var x = 0; x < W; x++) {
            var i = (y * W * 4) + x * 4;
            if(y < H ){
                pixels[i] = randomNumber(0,255);   //rosu
                pixels[i + 1] = randomNumber(0,255);  //verde
                pixels[i + 2] = randomNumber(0,255);  //albastru
                pixels[i + 3] = 255;  //opacity
            }
        }
    }
    context.putImageData(imageData2, 0, 0);
    requestAnimationFrame(desenareEfect2);
}

function desenareEfect3(){
    var imageData3 = context.getImageData(0,0,video.width,video.height);
    var pixels = imageData3.data;
    for (var y = 0; y < H; y++) {
        for (var x = 0; x < W; x++) {
            var i = (y * W * 4) + x * 4;
            if(y < H ){
                pixels[i] = pixels[i] ^ 255;
                pixels[i + 1] =  pixels[i] ^ 255;
                pixels[i + 2] =  pixels[i] ^ 255;

            }
        }
    }
    context.putImageData(imageData3, 0, 0);
    requestAnimationFrame(desenareEfect5);
}

function desenareEfect4(){
    var imageData4 = context.getImageData(0,0,video.width,video.height);
    var pixels = imageData4.data;
    for (var y = 0; y < H; y++) {
        for (var x = 0; x < W; x++) {
            var i = (y * W * 4) + x * 4;
            if(y < H ){
                pixels[i] = Math.min(Math.round(0.393 * pixels[i] + 0.769 * pixels[i+1] + 0.189 * pixels[i+2]), 255);
                pixels[i + 1] = Math.min(Math.round(0.349 * pixels[i] + 0.686 * pixels[i+1] + 0.168 * pixels[i+2]), 255);
                pixels[i + 2] = Math.min(Math.round(0.272 * pixels[i] + 0.534 * pixels[i+1] + 0.131 * pixels[i+2]), 255);

            }
        }
    }
    context.putImageData(imageData4, 0, 0);
    requestAnimationFrame(desenareEfect4);

}

function desenareEfect5(){
    var imageData5 = context.getImageData(0,0,video.width,video.height);
    var pixels = imageData5.data;
    for (var y = 0; y < H; y++) {
        for (var x = 0; x < W; x++) {
            var i = (y * W * 4) + x * 4;
            if(y < H ){
                pixels[i] = pixels[i] ^ 255;
                pixels[i + 1] =  pixels[i] ^ 255;
                pixels[i + 2] =  pixels[i] ^ 255;

            }
        }
    }
    context.putImageData(imageData5, 0, 0);
    requestAnimationFrame(desenareEfect5);
}

function resetEffect(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, W, H);
    requestAnimationFrame(desenare)
}

function desenarePlaylist() {
    //desenare lista playlist
    let lista = document.querySelector('ol');
    //srcVideouri retine cheile obiectului,respectiv cele 4 video-uri,fiind un array de obiecte
    let srcVideouri = Object.keys(urls);
    lista.innerHTML = '';
    for (let i = 0; i < srcVideouri.length; i++) {
        let element = document.createElement('li');
        //srcCurent retine cheia/melodia curenta
        let srcCurent = srcVideouri[i];
        element.innerText = urls[srcCurent];
        element.style.margin = '10px';
        if (i === urlIndex) {
            element.style.fontWeight = 'bold';  //sa bold video-ul curent
            element.style.color = 'red';
        }

        element.dataset.index = i.toString();   // sa calc dupa index
        //adaugam click pe fiecare elem din lista, ca atunci cand dam click sa mi dea play la vid resp
        element.addEventListener('mousedown', e => {
            urlIndex = parseInt(e.target.dataset.index);    //iau indexul 
            advance(0); //ca sa incarce melodia resp
        });

        //event pentru delete element din lista
        element.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            urlIndex = parseInt(e.target.dataset.index);
            let srcVideoClickuit = Object.keys(urls)[urlIndex];
            delete urls[srcVideoClickuit];
            desenarePlaylist();
            advance(1);
        });
        lista.append(element);
    }
}

function advance(beta) {
    urlIndex = urlIndex + beta;
    let srcVideouri = Object.keys(urls);

    if (urlIndex >= srcVideouri.length) {
        urlIndex = 0;
    }

    if (urlIndex < 0) {
        urlIndex = srcVideouri.length - 1;
    }
    video.src = srcVideouri[urlIndex];
    vidPrev.src = video.src;
    video.load(); 
    video.play();
   
}

//cand se termina vid
function videoEnded() {
    advance(1);
}

//Aici adaugam subtitrarile si  avem grija ca ele sa se schimbe intre ele in functie de cum
//se schimba sursa din video
function adaugaSubtitrariLaVideo(subtitrari) {
    for (let sub of subtitrari) {
        // Pentru fiecare obiect din subtitrari facem un track in video-ul nostru
        const track = video.addTextTrack("captions", sub.label, sub.language);
        track.mode = "hidden"; //... si il ascundem by default

        //Trecem prin subtirarile propriu-zise, ce apare pe ecran si le adaugam in track
        for (let cue of sub.cues) {
            const cueObject = new VTTCue(cue.startTime, cue.endTime, cue.text);
            cueObject.line = 1; // pozitionare subtitrare sus de tot
            track.addCue(cueObject);
        }
    }

    // Vrem ca atunci cand se schimba video-ul, in momentul cand datele despre fisierul video
    // au fost incarcate (metadata loaded) sa vedem ce video s-a incarcat si sa schimbam mode-ul track-ului
    // asociat acestui video
    video.addEventListener('loadedmetadata', () => {
        // preluam url-ul videoului
        const urlVideo = Object.keys(urls)[urlIndex];

        // Trecem prin toate track-urile adaugate in video si lasam afisat doar pe cel asociat videoului curent
        for (let i = 0; i <  Object.keys(video.textTracks).length; i++) {
            // stim ca la label-ul trackurilor am pus fix url-ul videoului, deci asa facem asocierea
            if(video.textTracks[i].label == urlVideo) video.textTracks[i].mode = 'showing';
            else video.textTracks[i].mode = 'hidden';
        }
    });
}

async function app() {
    video = document.querySelector('video');
    buton = document.querySelector('#btnAdauga');
    buttonEf1 = document.querySelector('#btnEffect1');
    buttonEf2 = document.querySelector('#btnEffect2');
    buttonEf3 = document.querySelector('#btnEffect3');
    buttonEf4 = document.querySelector('#btnEffect4');
    buttonEf5 = document.querySelector('#btnEffect5');
    btnReset = document.querySelector('#btnReset');

    vidPrev = document.createElement('video');
    vidPrev.src = video.src;
    vidPrev.load();

    const subtitrariRequest = await fetch('media/subtitrari_video.json');
    const subtitrari = await subtitrariRequest.json();
    adaugaSubtitrariLaVideo(subtitrari);


    buton.addEventListener('change', function() {
        const fisiereSelectate = this.files;
        if (fisiereSelectate.length === 0) {
            return;
        }
        const fisier = fisiereSelectate[0];
        const urlFisierSelectat = URL.createObjectURL(fisier);
       
        urls[urlFisierSelectat] = fisier.name;
        desenarePlaylist();
    })

    buttonEf1.addEventListener('click',desenareEfect1);
    buttonEf2.addEventListener('click',desenareEfect2);
    buttonEf3.addEventListener('click',desenareEfect3);
    buttonEf4.addEventListener('click',desenareEfect4);
    buttonEf5.addEventListener('click',desenareEfect5);

    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    btnReset.addEventListener('click',resetEffect);
    canvas.addEventListener('mouseenter', e => afisareContrl = true);
    canvas.addEventListener('mouseleave', e => afisareContrl = false);
    canvas.addEventListener('mousemove', e => {
        //x si y al cursorului
        mx = e.x - canvas.getBoundingClientRect().x;
        my = e.y - canvas.getBoundingClientRect().y;
        console.log(mx, my);

        if (my > H - h) {  //in interiorul progress bar
            //preview frame
            //secunda de unde este pus mouse-ul
            frameTarget = Math.round(mx * video.duration / W);
            vidPrev.currentTime = frameTarget;
            //console.log(videoPreview.currentTime);
            showPreview = true;
        } else {
            showPreview = false;
        }
    });

    canvas.addEventListener('mousedown', e => {
        if (my > H - h) {  //in interiorul progress bar
            video.currentTime = mx * video.duration / W;          
        }                 //in interiorul dreptunghiului de butoane
            if (my > H - 2 * h  && my < H - h) {    // my > 210 && my < 240
                let buttonIndex = Math.floor(mx / btnSize);  // det pozitiei
                switch (buttonIndex) {
                    case 0: //prev
                        advance(-1);
                        vidPrev.src = video.src;
                        break;
                    case 1: //play/pause
                        video.paused ? video.play() : video.pause();
                        break;
                    case 2: //next                 
                        advance(1);
                        vidPrev.src = video.src;
                        break;
                    case 4:
                        video.muted = false;
                        //setare volum
                        break;
                    case 5:
                        video.muted = true;
                        //setare volum
                        break;
                    case 6:
                        //fullscreen
                        canvas.requestFullscreen();
                        break;
                    case 7:
                        //volum up
                        video.volume += 0.25;
                        break;
                    case 8:
                        //volum down
                        video.volume -= 0.25;
                            break;
                } 
            }
    });

    video.addEventListener('ended', videoEnded);
    desenare();
}

document.addEventListener('DOMContentLoaded', app);
