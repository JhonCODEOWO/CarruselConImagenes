//Seleccionamos los elementos por medio de dom
const divCarrusel = document.querySelector("#carrusel") ?? null;
const divInfoExtra = document.querySelector("#info-extra-img") ?? null;
const divTituloCarrusel = document.querySelector('#titulo-carrusel') ?? null;
const divEnlaceCarrusel = document.querySelector('#hipervinculo-carrusel') ?? null;
const image = document.querySelector("#imagen") ?? null;
const btnAnterior = document.querySelector("#btnAnterior") ?? null;
const btnSiguiente = document.querySelector("#btnSiguiente") ?? null;
let btnsNavs = null;
//-----------------------------------------------------------

//Variables globales
//indice para la navegación en el arreglo
let indice = 0;
let intervalID;


//Arreglo con las direcciones de las imágenes
const imagenes = [
    "img/slcualidadesMasc.jpg",
    "img/SLIDERART8FRACCVI.jpg_PruebaTitulo_https://www.itssnp.edu.mx/index.php",
    "img/slidernuevasmasculinidades2.jpg",
    "img/SliderSexting.jpg_PruebaTitulo_https://www.itssnp.edu.mx/index.php"
]

document.addEventListener("DOMContentLoaded", function () {
    aplicarHeightImg(image, divCarrusel);
    cambiarConTiempo();
    createNavegacionCarrusel(imagenes);
    btnsNavs = document.querySelectorAll('#navElement');
    btnsNavs[0].style.color = "Black";
});


//Método que aplica la imágen en base al índice recibido
function aplicarIndice(indice) {
    let subDivision = imagenes[indice].split('_');
    let ligaImg = subDivision[0];
    let tituloImg = subDivision[1];
    let hipervinvulo = subDivision[2];
    let textoHiper = subDivision[3];

    //Mostrar elementos si son diferentes de null
    (mostrarElemento(divTituloCarrusel)) ? configurarTituloImg(divTituloCarrusel, tituloImg) : console.log("No hay nada en el apartado de hipervinculo");

    (mostrarElemento(divEnlaceCarrusel)) ? configurarHipervinculoImg(divEnlaceCarrusel, textoHiper, hipervinvulo) : console.log("No hay nada en el apartado de hipervinculo");

    if (hipervinvulo == null && tituloImg == null) {
        divInfoExtra.style.display = "none";
    } else {
        divInfoExtra.style.display = "block";
    }

    //Elimina la clase anterior para volver a aplicar la animación
    image.classList.remove("desvanecer");
    //Colocar imagen correspondiente
    image.src = ligaImg;
    //Ajusta el div a la altura de la nueva imagen
    aplicarHeightImg(image, divCarrusel);
    //Añade la animación
    image.classList.add("desvanecer");
}

function isFinished(arreglo, indice){
    if (indice == arreglo.length - 1) {
        console.log();
        return true;
    }else{
        return false;
    }
}

//Listener que aplica un cambio de imagen en cuanto se haga resize a una pagina
window.addEventListener('resize', function () {
    aplicarHeightImg(image, divCarrusel);
});

function mostrarElemento(elemento) {
    if (elemento != null) {
        elemento.style.display = "block";
        return true;
    } else {
        elemento.style.display = "none";
        return false;
    }
}

function configurarHipervinculoImg(divEnlaceCarrusel, textoHiper, enlace) {
    //Verifica que tenga texto en la sintaxis correspondiente
    if (!textoHiper || textoHiper.trim() === "") {
        divEnlaceCarrusel.textContent = "Conoce más >";
    } else {
        divEnlaceCarrusel.textContent = textoHiper;
    }
    //Aplica el href obtenido
    divEnlaceCarrusel.href = enlace;
}

function configurarTituloImg(divTituloCarrusel, texto) {
    divTituloCarrusel.textContent = texto;
}

function aplicarHeightImg(img, div) {
    let altura = img.height;
    console.log(altura);
    div.style.height = altura + "px";
}

function cambiarConTiempo() {
    intervalID = setInterval(() => {

        if (indice == imagenes.length - 1) {
            btnsNavs[indice].style.color = "white";
            indice = 0;
            btnsNavs[indice].style.color = "black";
            aplicarIndice(indice);
        } else {
            btnsNavs[indice].style.color = "white";
            indice++;
            btnsNavs[indice].style.color = "black";
            aplicarIndice(indice);
        }
    }, 2000);
}

function createNavegacionCarrusel(arreglo) {
    if (arreglo.length != 0) {
        //Crear div del navegador
        const div = document.createElement('DIV');
        div.classList.add('NavCarru');
        divCarrusel.appendChild(div);
        //Recorrer el arreglo y agregar botones en base al recorrido
        for (let index = 0; index < imagenes.length; index++) {
            //Crear el botón
            const btnNav = document.createElement('BUTTON');
            btnNav.id = 'navElement';
            btnNav.textContent = index + 1;
            //Añadir evento de escuchass
            btnNav.addEventListener('click',function(){
                //Aplicamos el nuevo indice al actual que pueda tener
                btnsNavs[indice].style.color = "white";
                indice = btnNav.textContent - 1;
                //Aplicamos el cambio
                aplicarIndice(btnNav.textContent - 1);
                btnNav.style.color = "black";
            });
            //Añadir al div NavCarru
            div.appendChild(btnNav);
        }
    }
}

btnAnterior.addEventListener('click', function () {
    btnsNavs[indice].style.color = "white";
    if (indice == 0) {
        indice = imagenes.length - 1;
        aplicarIndice(indice);
    } else {
        indice--;
        console.log(imagenes[indice]);
        aplicarIndice(indice);
        btnsNavs[indice].style.color = "Black";
    }

});

btnSiguiente.addEventListener('click', function () {
    btnsNavs[indice].style.color = "White";
    if (indice == imagenes.length - 1) {
        clearInterval(intervalID);
        indice = 0;
        aplicarIndice(indice);
    } else {
        indice++;
        console.log(imagenes[indice]);
        aplicarIndice(indice);
        btnsNavs[indice].style.color = "Black";
    }
});