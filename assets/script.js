const songs= [
    {
        imagen: "assets/imgs/yes-and.jpeg",
        titulo: "yes, and?",
        autor: "Ariana Grande",
        cancion: "assets/music/Ariana Grande - yes, and (Official Audio).mp3"
    },

    {
        imagen: "assets/imgs/baby-one-more-time.jpeg",
        titulo: "Baby One More Time",
        autor: "Britney Spears",
        cancion: "assets/music/Britney Spears - Baby One More Time (Instrumental).mp3"
    },

    {
        imagen: "assets/imgs/24-k-magic.jpeg",
        titulo: "24K Magic",
        autor: "Bruno Mars",
        cancion: "assets/music/Bruno Mars - 24K Magic (Audio).mp3"
    },

    {
        imagen: "assets/imgs/count-on-me.jpeg",
        titulo: "Count On Me",
        autor: "Bruno Mars",
        cancion: "assets/music/Bruno Mars - Count on Me (Official Lyric Video).mp3"
    },

    {
        imagen: "assets/imgs/count-on-me.jpeg",
        titulo: "Marry You",
        autor: "Bruno Mars",
        cancion: "/assets/music/Bruno Mars - Marry You (Official Instrumental).mp3"
    }
];

let currentSong = 0;

let img = document.querySelector("#portada");
let title = document.querySelector("#conTitulos h3");
let artist = document.querySelector("#conTitulos p");
let song = document.querySelector("audio");

let duracionTotal = document.getElementById("duracionTotal");
let duracion;

let tiempoConsumido = document.getElementById("tiempoConsumido");

    //Funcion que devuelve el tiempo en formato de segundo y minutos. el song.duration se lo pasa como parámetro o el currentTime en el caso de la actualizacion manual del tiempo
    function formatTime(seconds) {
        //lo transforma en minutos y segundos
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        //devuelve un template strings con los numeros resultados y padStart() asegura que los segundos siempre tengan dos dígitos. que si es un numero de un digito ponga un 0
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }

function updateSong (){

    img.setAttribute("src", songs[currentSong].imagen);
    title.innerText = songs[currentSong].titulo;
    artist.innerText = songs[currentSong].autor;
    song.setAttribute("src", songs[currentSong].cancion);

    song.addEventListener("loadedmetadata", ()=>{

        duracionTotal.innerHTML = formatTime(song.duration); //.duration te da la cantidad de segundos.

    });


    
}

updateSong();

function dalePlay (){
    song.play();
    iconoButton.classList.add("bi-pause-fill");
    iconoButton.classList.remove("bi-play-fill");
}

const playButton = document.getElementById("play");
let iconoButton = document.querySelector("#play i");

playButton.addEventListener('click', ()=>{

    if (song.paused){
        song.play();
        iconoButton.classList.add("bi-pause-fill");
        iconoButton.classList.remove("bi-play-fill");
    } else {
        song.pause();
        iconoButton.classList.remove("bi-pause-fill");
        iconoButton.classList.add("bi-play-fill");
    }

});

const buttonSig = document.getElementById("buttonSig");
const buttonAn = document.getElementById("buttonAn");

buttonSig.addEventListener('click', ()=>{

    currentSong++;
    
    if (currentSong>songs.length-1){
        currentSong=0;
    }

    updateSong();
    dalePlay();

});

buttonAn.addEventListener('click', ()=>{

    currentSong--;

    if (currentSong<0){
        currentSong = songs.length-1;
    }

    updateSong();
    dalePlay();

});


const progress = document.querySelector("#barra");

/*un event listener que ejecuta la funcion cada vez que el tiempo cambia */
song.addEventListener('timeupdate', ()=>{

    /*actualiza el tiempo consumido*/
    tiempoConsumido.innerHTML = formatTime(song.currentTime);

    /*calcula el porcentaje y lo guarda en una variable */
    let progressPercent = (song.currentTime/song.duration) * 100;

    /*cambia el estilo del css a través de una variable utilizada en la clase del after*/
    progress.style.setProperty("--progress-width", `${progressPercent}%`);
});

progress.addEventListener('click', (e)=>{

    let barwidth = progress.clientWidth; //saca el ancho total de la barra en px

    let clickX = e.offsetX; //saca la posicion en x donde se hizo clic

    let newTime = (clickX/barwidth) * song.duration; //calcula la nueva posicion

    song.currentTime = newTime; //salta a ese momento de la cancion

    dalePlay();

});