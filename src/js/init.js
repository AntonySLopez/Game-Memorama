
//funciones universales

    //funcion para mostrar u ocultar modal
    function mostrarQuitarModal (modal){
        modal.classList.toggle("hidden");
    }

// funciones de control de tiempo

    //Tiempo que entrega la dificultad de juego/
    let tiempoDeJuego = 5;
    //obtenemos contenedor de tiempo
    const tiempo = document.getElementById("tiempo");
    //contenedor de tiempo de juego para cada juego
    let contador = null;
    //funcion para iniciar el temporizador
    function correrTiempo () {
        console.log(`tiempo corriendo`);       
        contador = setInterval(()=> {
            if(tiempoDeJuego > 1){
                tiempoDeJuego--;
                tiempo.innerText = `${tiempoDeJuego}`
            } else {
                clearInterval(contador);
                console.log(`Tiempo detenido`);
                
            }
        },1000);
    }
    //contenedor de timepo guardado para play pause
    let tiempoGuardado = null;
    //bool de pay pause
    let play = true
    // funcion para play pause
    const cronometro = document.getElementById("cronometro");
    function playPause(cronometro){
        if(play){
            play = false;
            tiempoGuardado = tiempoDeJuego;
            console.log(`Tiempo guardado = ${tiempoGuardado}`);           
            clearInterval(contador);
            console.log(`Tiempo pausado`);
            cronometro.style.background = "gray"
        }else{
            play = true;
            correrTiempo();
            console.log(`tiempo ranudado`);           
            cronometro.style.background = ""
        }
    }
//arreglo EJEMPLO para exponer modal GameOver
const resultados = {
    points: 350,
    time: 2,
    acerts: 10,
    totalAcerts: 12
}
//Funcion para reemplazar valores de jugador en GAMEOVER
    // Obteniendo valores para reemplazar
    const modalGameOver = document.getElementById("modaL-GameOver");
    const tableroGame = document.getElementById("game");
    //funcion para cargados de resumen de juego a modal GameOver
    function cargarDatosGO (){    
        //obtenemos los id para modificar
        const totalPuntos = document.getElementById("total-puntos");
        const puntos = document.getElementById("points");
        const tiempo = document.getElementById("time");
        const aciertos = document.getElementById("acerts")
        //destructuramos el objeto resutados
        const {points, time, acerts, totalAcerts} = resultados;
        //agregamos nuevos valores
        totalPuntos.innerHTML = `${points*(acerts*time)}`;
        puntos.innerHTML = `${points}`;
        tiempo.innerHTML = `${time}`;
        aciertos.innerHTML = `${acerts}/${totalAcerts}`;
    }

//funcion para mostrar modal salir de juego
    function salirDeJuego(){
        if(play){
            playPause(cronometro);
            const modalSalir = document.getElementById("modalSalir");
            mostrarQuitarModal(modalSalir);
            mostrarQuitarModal(tableroGame);
            clearInterval(contador)
        }else{
            regresarJuego()
        }
    }

    function regresarJuego(){
        const modalSalir = document.getElementById("modalSalir");
        modalSalir.classList.toggle("hidden");
        tableroGame.classList.toggle("hidden")
        playPause(cronometro);
    }
        //Cargamos datos y mostramos modal GameOver
            cargarDatosGO();
            tableroGame.classList.toggle("hidden")
            mostrarQuitarModal(modalGameOver);
            console.log(`mostrar modal`);
        //codigo para mostrar estadisticas
        /*
        setTimeout(()=>{
            mostrarQuitarModal(modalGameOver);
            mostrarQuitarModal(modalEstadisticas);
        },4000)*/