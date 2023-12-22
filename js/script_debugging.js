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
    // console.log(btnsNavs);
});


//Método que aplica la imágen en base al índice recibido
function aplicarIndice(indice) {
    let subDivision = imagenes[indice].split('_');
    let ligaImg = subDivision[0];
    let tituloImg = subDivision[1];
    let hipervinvulo = subDivision[2];
    let textoHiper = subDivision[3];
    // console.log(`URL: ${ligaImg} Titulo de imagen: ${tituloImg} Hipervinculo: ${hipervinvulo}` );

    //Mostrar elementos si son diferentes de null
    (mostrarElemento(divTituloCarrusel)) ? configurarTituloImg(divTituloCarrusel, tituloImg) : console.log("No hay nada en el apartado de hipervinculo");

    (mostrarElemento(divEnlaceCarrusel)) ? configurarHipervinculoImg(divEnlaceCarrusel, textoHiper, hipervinvulo) : console.log("No hay nada en el apartado de hipervinculo");



    // if (hipervinvulo != null) {
    //     divEnlaceCarrusel.style.display = "block";
    //     if (textoHiper == null) {
    //         divEnlaceCarrusel.textContent = "Conoce más >";
    //     }else{
    //         divEnlaceCarrusel.textContent = textoHiper;
    //     }
    //     divEnlaceCarrusel.href = hipervinvulo
    // }else{
    //     divEnlaceCarrusel.style.display = "none";
    // }
    // if (tituloImg != null) {
    //     divTituloCarrusel.style.display = "block";
    //     divTituloCarrusel.textContent = tituloImg;
    // }else{
    //     divTituloCarrusel.style.display = "none";
    // }
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

    // //Pinta el numero del color
    // console.log(`Indice recibido sin restar ${indice}`);
    // console.log(`Elemento del nav accedido con la resta`);
    // console.log(btnsNavs[indice - 1]);
    // console.log(`Elemento del nav accedido sin la resta`);
    // console.log(btnsNavs[indice]);
    // console.log(`¿Se ha llegado al limite? ${isFinished(imagenes, indice)}`);

    // if (!isFinished(imagenes, indice)) {
    //     btnsNavs[indice - 1].style.color = "white";
    //     btnsNavs[indice].style.color = "black";
    // }else{
    //     btnsNavs[indice + 1].style.color = "black";
    // }
    // let altura = image.height;
    // divCarrusel.style.height = altura + "px";
    // divImage.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(" + ligaImg + ")";
}

function isFinished(arreglo, indice){
    if (indice == arreglo.length - 1) {
        console.log();
        return true;
    }else{
        return false;
    }
}

function repaintNavElement(FirstIndex, SecondIndex) {
    btnsNavs[FirstIndex].style.color = "White";
    btnsNavs[SecondIndex].style.color = "Black";
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
        console.log("Se ha entrado en el timeout");
        console.log(`Indice actual: ${indice} - Indice máximo: ${imagenes.length}`);

        if (indice == imagenes.length - 1) {

            // console.log("Se ha alcanzado el máximo del arreglo");
            btnsNavs[indice].style.color = "white";
            indice = 0;
            btnsNavs[indice].style.color = "black";
            aplicarIndice(indice);
        } else {
            btnsNavs[indice].style.color = "white";
            indice++;
            btnsNavs[indice].style.color = "black";
            // console.log(`Indice actual dentro del timeinterval ${indice} -> ${imagenes[indice]}`);
            aplicarIndice(indice);
        }
    }, 9000);
}

function createNavegacionCarrusel(arreglo) {
    if (arreglo.length != 0) {
        //Crear div del navegador
        const div = document.createElement('DIV');
        div.classList.add('NavCarru');
        divCarrusel.appendChild(div);
        //Recorrer el arreglo y agregar botones en base al recorrido
        for (let index = 0; index < imagenes.length; index++) {
            // console.log(index);
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
    console.log(`Indice actual dentro del listener siguiente ${indice}`);
    btnsNavs[indice].style.color = "white";
    if (indice == imagenes.length - 1) {
        console.log("Has llegado al límite máximo de los elementos");
        clearInterval(intervalID);
        indice = 0;
        aplicarIndice(indice);
        btnsNavs[indice].style.color = "black";
    } else {
        indice++;
        console.log(imagenes[indice]);
        aplicarIndice(indice);
        btnsNavs[indice].style.color = "black";
    }
});