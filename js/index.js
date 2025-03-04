const categorias = {
    1: {
        titulo: "PRODUCTOS MÁS VENDIDOS",
        productos: [
            { nombre: "MOZZE BREEZE 2", imagen: "img/mozze.png" },
            { nombre: "NAYB BABY", imagen: "img/Cachimba-Nayb-Baby-morada-humo-blanco-transformed.jpeg" },
            { nombre: "CHARMELEON MINI", imagen: "img/cachimba-chameleon-mini-crazy-superhero-hulk-1100x1100-1.jpeg" },
            { nombre: "CAZOLETA HC STRIP", imagen: "img/strip.jpg" },
            { nombre: "DIAVLA HOOKAH", imagen: "img/diavla.png" },
            { nombre: "BOQUILLA MADERA", imagen: "img/boquilla.png" },
            { nombre: "GESTOR DE CALOR PROVOST", imagen: "img/proovost.png" }
        ]
    },
    2: {
        titulo: "PROMOCIONES Y OFERTAS",
        productos: [
            { nombre: "ALPHA HOOKAH RED CANDY 249,95 €", imagen: "img/alpha.png" },
            { nombre: "JUNTA SILICONA MANGUERA 2x0,5", imagen: "img/junta.png" },
            { nombre: "Hornillo multicalor 19,95 €", imagen: "img/hornillo.png" },
            { nombre: "CARBON COCOSOUL 267,00 €", imagen: "img/carbones.png" },
            { nombre: "MR. SHISHA ROCKET 2.0 99,95 €", imagen: "img/rocket.png" },
            { nombre: "BASE RUSA PINK 39,95 €", imagen: "img/base.png" },
            { nombre: "PLATO CASCADA MINI KHALIFA 9,95 €", imagen: "img/plato.png" }
        ]
    },
    3: {
    titulo: "NUESTRA HISTORIA",
    productos: [
        { 
            nombre: "Conoce Nuestra Historia", 
            imagen: "img/historia.png", 
            descripcion: "Nuestra historia comenzó como un sueño entre amigos apasionados por el mundo de las cachimbas. En un pequeño local, decidimos aventurarnos a crear un espacio donde los amantes de las cachimbas pudieran encontrar productos auténticos, de calidad y llenos de carácter. Con el paso del tiempo, nuestro negocio ha crecido, pero nuestra dedicación y amor por lo que hacemos siguen intactos. Nos enorgullece haber sido pioneros en ofrecer una experiencia única y personalizada a cada cliente, porque cada cachimba que vendemos lleva una parte de nuestra historia." 
        },
        { 
            nombre: "Quiénes Somos", 
            imagen: "img/somos.png", 
            descripcion: "Somos un equipo apasionado por lo que hacemos, comprometidos en ofrecerte lo mejor en cachimbas, tabacos y accesorios. Nuestra misión es hacer de tu experiencia algo único, acercándote a productos que realmente cumplen con altos estándares de calidad y autenticidad. Creemos que una cachimba es más que un producto, es una experiencia de encuentro y disfrute. Es por eso que cuidamos cada detalle, desde la selección de proveedores hasta la atención personalizada, para que cada cliente se sienta como en casa." 
        },
        { 
            nombre: "Nuestra Pasión por las Cachimbas", 
            imagen: "img/pasion.png", 
            descripcion: "La cachimba es mucho más que un objeto; es un ritual, una cultura, una pasión que queremos compartir contigo. Nos dedicamos a seleccionar cuidadosamente cada cachimba y tabaco, asegurándonos de que cada pieza ofrezca una experiencia única. Sabemos que la calidad es esencial, y por eso trabajamos con proveedores que comparten nuestros valores de autenticidad y excelencia. Nos entusiasma descubrir nuevos sabores, accesorios y tendencias para poder ofrecerte siempre lo mejor. Queremos que disfrutes de cada momento con tu cachimba tanto como nosotros al hacertela." 
        }
    ]
    }   

};

let categoriaActual = 1;
let posicion = 0; // Control del carrusel

function cambiarCategoria(numero) {
    categoriaActual = numero;
    posicion = 0; // Reiniciar la posición del carrusel

    // Cambiar el título
    document.getElementById("titulo").textContent = categorias[numero].titulo;

    // Renderizar solo los primeros 4 productos
    renderizarProductos();

    // Actualizar los botones de selección
    document.querySelectorAll(".boton-categoria").forEach((boton, index) => {
        const imagen = boton.querySelector("img");  // Ahora buscamos la imagen dentro de cada botón
        if (index + 1 === numero) {
            imagen.src = `img/${index + 1}-azul.png`;  // Imagen azul para el botón activo
        } else {
            imagen.src = `img/${index + 1}-gris.png`;  // Imagen gris para los botones no activos
        }

        // Eliminar la clase activo de todos los botones
        boton.classList.remove("activo");
    });

    // Agregar la clase "activo" al botón seleccionado
    document.querySelector(`.botones button:nth-child(${numero})`).classList.add("activo");
}

function renderizarProductos() {
    const carouselTrack = document.getElementById("carouselTrack");
    carouselTrack.innerHTML = ""; // Vaciar el carrusel

    const productos = categorias[categoriaActual].productos;

    if (categoriaActual === 3) {
        const producto = productos[posicion]; 

        if (producto) {
            const div = document.createElement("div");
            div.classList.add("product-card-large");

            div.innerHTML = `
                <div class="product-content">
                    <div class="product-image">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div class="product-info">
                        <h2>${producto.nombre}</h2>
                        <div class="product-description">
                            <p>${producto.descripcion}</p>
                        </div>
                    </div>
                </div>
            `;
            carouselTrack.appendChild(div);
        }
    } else {
        productos.slice(posicion, posicion + 4).forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("product-card", "text-center");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h5>${producto.nombre}</h5>
            `;
            carouselTrack.appendChild(div);
        });
    }
}


function moverCarrusel(direccion) {
    const totalProductos = categorias[categoriaActual].productos.length;

    if (categoriaActual === 3) {
        if (direccion === 1 && posicion < totalProductos - 1) {
            posicion++;
        } else if (direccion === -1 && posicion > 0) {
            posicion--;
        }
    } else {
        const maxPosicion = totalProductos - 4;
        if (direccion === 1 && posicion < maxPosicion) {
            posicion++;
        } else if (direccion === -1 && posicion > 0) {
            posicion--;
        }
    }

    renderizarProductos();
}
// Cargar la primera categoría al inicio
cambiarCategoria(1);

document.addEventListener("DOMContentLoaded", function () {
    let btnRegistro = document.getElementById("btnRegistro");
    let modal = document.getElementById("modal");
    let closeBtn = document.querySelector(".close");

    if (btnRegistro && modal && closeBtn) {
        btnRegistro.addEventListener("click", function (event) {
            event.preventDefault();
            modal.style.display = "flex";
        });

        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        // Cierra el modal si se hace clic fuera de él
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});

 // Función para abrir el modal
        function abrirModal() {
            var modal = document.getElementById('modalUsuario');
            modal.style.display = "block";
        }

        // Función para cerrar el modal
        function cerrarModal() {
            var modal = document.getElementById('modalUsuario');
            modal.style.display = "none";
        }

        // Cerrar el modal cuando se hace clic fuera de él
        window.onclick = function(event) {
            var modal = document.getElementById('modalUsuario');
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }