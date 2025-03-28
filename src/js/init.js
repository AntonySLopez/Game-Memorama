//contendor de categorias.
const tematicas = {
    Arbol: [
        "src/img/categorias/Arboles/tree1.png",
        "src/img/categorias/Arboles/tree2.png",
        "src/img/categorias/Arboles/tree3.png",
        "src/img/categorias/Arboles/tree4.png",
        "src/img/categorias/Arboles/tree5.png",
        "src/img/categorias/Arboles/tree6.png",
        "src/img/categorias/Arboles/tree7.png",
        "src/img/categorias/Arboles/tree8.png",
        "src/img/categorias/Arboles/tree9.png",
        "src/img/categorias/Arboles/tree10.png",
        "src/img/categorias/Arboles/tree11.png",
        "src/img/categorias/Arboles/tree12.png",
        "src/img/categorias/Arboles/tree13.webp",
        "src/img/categorias/Arboles/tree14.webp",
        "src/img/categorias/Arboles/tree15.webp",
        "src/img/categorias/Arboles/tree16.webp",
        "src/img/categorias/Arboles/tree17.webp",
        "src/img/categorias/Arboles/tree18.webp",
        "src/img/categorias/Arboles/tree19.webp",
        "src/img/categorias/Arboles/tree20.webp",
    ]
};

const avatares = [
    "src/img/perfil-Madara.webp",
    "src/img/perfil-zerotwo.jpg"
]

//funciones universales

    //funcion para mostrar u ocultar modal
    function mostrarQuitarModal (modal){
        modal.classList.toggle("hidden");
        return console.log(`${modal.id} mostrado/oculto`);
    }

// funciones de control de tiempo

    //Tiempo que entrega la dificultad de juego/
    let tiempoDeJuego = 10;
    //obtenemos contenedor de tiempo
    const tiempo = document.getElementById("tiempo");
    //contenedor de tiempo de juego para cada juego
    let contador = null;
    //funcion para iniciar el temporizador
    function correrTiempo () {
        console.log(`tiempo corriendo`);       
        contador = setInterval(()=> {
            if(tiempoDeJuego > 0){
                tiempoDeJuego--;
                tiempo.innerText = `${tiempoDeJuego}`
            } else {
                clearInterval(contador);
                console.log(`Tiempo detenido`);
                mostrarQuitarModal(modalGameOver);                
            }
        },1000);
    }

    //contenedor de timepo guardado para play pause
    let tiempoGuardado = 10;
    //bool de pay pause
    let play = true
    // funcion para play pause
    function playPause(objeto){
        if(play){
            play = false;
            tiempoGuardado = tiempoDeJuego;
            console.log(`Tiempo guardado = ${tiempoGuardado}`);           
            clearInterval(contador);
            console.log(`Tiempo pausado`);
            objeto.style.background = "gray"
        }else{
            play = true;
            correrTiempo();
            console.log(`tiempo ranudado`);           
            objeto.style.background = ""
        }
    }

//arreglo EJEMPLO para exponer modal GameOver
const resultados = {
    points: 350,
    time: 2,
    acerts: 10,
    totalAcerts: 12
}

// Obteniendo objetos para trabajar main

    function RandomPorcantidad(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
            [array[i], array[j]] = [array[j], array[i]]; // Intercambio
        }
        return array;
    }
    //funcion para mostrar cartas
    const tableroGame = document.getElementById("game");
    function mostrarCartas(valor, cantidad){
        const cartas = tematicas[valor].slice(0, cantidad).map ((image,index) =>
            `<img onclick="addcart(this)" src="${image}"  alt="${valor}" data-valor="${index}" class="w-[150px] h-[200px]  shadow-md shadow-[#e9e9e9] border-[#bfe5fb] border-[1px] rounded-2xl hover:scale-[1.03] hover:shadow-black hover:shadow-1xl"><img onclick="addcart(this)" src="${image}"  alt="${valor}" data-valor="${index}" class="w-[150px] h-[200px]  shadow-md shadow-[#e9e9e9] border-[#bfe5fb] border-[1px] rounded-2xl hover:scale-[1.03] hover:shadow-black hover:shadow-1xl">`
        )

        console.log(`Cartas generadas`);     
        tableroGame.innerHTML = cartas.join("");
        console.log(`Cartas mostradas`);
        
    }
    //funcion add carta

    //contenedor de cartas
    let contendorDeCartas = [];
    //funcion para eliminar cartas del juego
    function hiddenCart(contenedor){
        contenedor.forEach(element => {
            element.classList.remove("scale-[1.03]", "shadow-black", "shadow-1xl");
            element.onclick = null;
            element.classList.add("opacity-40")
            console.log(`Carta eliminada`);
        });      
    }
    //funcion para agregarta
    function verificador(contendorDeCartas){
        console.log(`verificando cartas`);
        const valor1 = parseInt(contendorDeCartas[0].dataset.valor);
        const valor2 = parseInt(contendorDeCartas[1].dataset.valor);
        (valor1+1 == valor2 || valor1 == valor2+1) ? hiddenCart(contendorDeCartas) : console.log(`cartas no pares`);
    };

    function activarDesactivarCArta(valor,bool){
        if(bool){
            valor.classList.add("scale-[1.03]", "shadow-black", "shadow-1xl");
        }else{
         valor.classList.delete("scale-[1.03]", "shadow-black", "shadow-1xl");

        }
    }

    function addcart(valor){
        if (contendorDeCartas.length == 0){
            activarDesactivarCArta(valor, true);
            contendorDeCartas.push(valor);
            console.log(`primera carta agregada`);
        }else{
            activarDesactivarCArta(valor, true);
            contendorDeCartas.push(valor);
            console.log(`segunda carta agregada`);
            verificador(contendorDeCartas);
        }
    }

//Funcion para reemplazar valores de jugador en GAMEOVER
    const modalGameOver = document.getElementById("modaL-GameOver");
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
        }else{
            regresarJuego()
        }
    }

    function regresarJuego(){
        const modalSalir = document.getElementById("modalSalir");
        mostrarQuitarModal(modalSalir);
        mostrarQuitarModal(tableroGame);
        playPause(cronometro);
    }    

//funcion de primera etapa en modal

    let inicio = {
        avatar: ""
    }

    function showAvatars () {
        document.getElementById("avatares").innerHTML = avatares.map(element => `<img onclick="addPerfil(this)" src="${element}" class="w-[100px] overflow-auto rounded-2xl shadow-md hover:scale-[1.1] hover:shadow-lg hover:shadow-[#a3f9ff]">`).join("");
        console.log(`Lista de avatares desplegado`);
        
    }

    function starEtapa1(){
        document.getElementById("tbn-star").style.display = "none"
        console.log(`Inicio activo`);
        showAvatars();
        mostrarQuitarModal(document.getElementById("elejir-avatar"));
    }
    
    function addPerfil(element){
        inicio.avatar = element.src;
        console.log(`avatar agregado`);
        console.log(inicio.avatar);
        starGame();
    }

    function mostrarAvatarDeUsuario(){
        document.getElementById("avatar").src = `${inicio.avatar}`
        console.log(`avatar actualizado`);
    }

//funcion para iniciar juego
    function starGame() {
        mostrarQuitarModal(document.getElementById("modaL-Inicio"));
        mostrarAvatarDeUsuario()
        mostrarCartas("Arbol",12);
        correrTiempo();
    }