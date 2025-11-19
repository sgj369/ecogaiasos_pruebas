// ==========================================
// 1. CONFIGURACIÓN Y DATOS
// ==========================================

const SHEET_ID = '1lM4o-nEUk-uDmdTymrqv9N0HDbnJDAvdw_dDfgRTA6c';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

let todosLosProyectos = [];
let filtroActual = 'evento'; 

// ==========================================
// 2. INICIALIZACIÓN
// ==========================================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 800);

    iniciarParticulas();
    cargarDatosDeGoogleSheets();
    setupMapaToggle();
    setupMobileTooltips();
    setupHamburgerMenu();
});

// ==========================================
// 3. LÓGICA DE DATOS
// ==========================================

async function cargarDatosDeGoogleSheets() {
    try {
        const respuesta = await fetch(SHEET_URL);
        const texto = await respuesta.text();
        const jsonTexto = texto.substring(47).slice(0, -2);
        const json = JSON.parse(jsonTexto);
        
        todosLosProyectos = json.table.rows.map((fila, index) => {
            const c = fila.c;
            const tipoAsignado = index % 2 === 0 ? 'evento' : 'lugar';

            return {
                nombre: c[0] ? c[0].v : 'Sin Nombre',
                categoria: c[1] ? c[1].v : 'General',
                ubicacion: c[2] ? c[2].v : 'CDMX',
                imagen: c[3] ? c[3].v : 'img/kpop.jpg', 
                descripcion: c[4] ? c[4].v : 'Sin descripción.',
                tipo: tipoAsignado
            };
        });

        filtrarYRenderizar();

    } catch (error) {
        console.log("Cargando datos de prueba...");
        
        // DATOS DE RESPALDO (6 Eventos + 6 Lugares para llenar el grid)
        todosLosProyectos = [
            // EVENTOS (Se mostrarán en 3 columnas)
            { nombre: "Taller de Composta", categoria: "Taller", ubicacion: "Parque México, Condesa", imagen: "img/kpop.jpg", tipo: "evento" },
            { nombre: "Limpieza del Río", categoria: "Voluntariado", ubicacion: "Los Dinamos", imagen: "img/ajolote.jpg", tipo: "evento" },
            { nombre: "Mercado de Trueque", categoria: "Feria", ubicacion: "Bosque de Chapultepec", imagen: "img/colibri.jpg", tipo: "evento" },
            { nombre: "Cine Debate Ambiental", categoria: "Cultura", ubicacion: "Cineteca Nacional", imagen: "img/lobo.jpg", tipo: "evento" },
            { nombre: "Clase de Huerto", categoria: "Curso", ubicacion: "Huerto Roma Verde", imagen: "img/kpop.jpg", tipo: "evento" },
            { nombre: "Recolección Electrónicos", categoria: "Acopio", ubicacion: "Parque de los Venados", imagen: "img/ajolote.jpg", tipo: "evento" },
            
            // LUGARES (Se mostrarán al cambiar el switch)
            { nombre: "Huerto Roma Verde", categoria: "Huerto", ubicacion: "Roma Sur", imagen: "img/kpop.jpg", tipo: "lugar" },
            { nombre: "Viveros de Coyoacán", categoria: "Parque", ubicacion: "Coyoacán", imagen: "img/colibri.jpg", tipo: "lugar" },
            { nombre: "Parque Bicentenario", categoria: "Parque", ubicacion: "Azcapotzalco", imagen: "img/lobo.jpg", tipo: "lugar" },
            { nombre: "Jardín Botánico UNAM", categoria: "Jardín", ubicacion: "CU", imagen: "img/ajolote.jpg", tipo: "lugar" },
            { nombre: "Mercado El 100", categoria: "Mercado", ubicacion: "Roma", imagen: "img/kpop.jpg", tipo: "lugar" },
            { nombre: "Museo de Historia Natural", categoria: "Museo", ubicacion: "Chapultepec", imagen: "img/colibri.jpg", tipo: "lugar" }
        ];
        filtrarYRenderizar();
    }
}

function filtrarYRenderizar() {
    const textoBuscador = document.getElementById('buscador-input').value.toLowerCase();
    let datosFiltrados = todosLosProyectos.filter(p => p.tipo === filtroActual);

    if (textoBuscador) {
        datosFiltrados = datosFiltrados.filter(p => 
            p.nombre.toLowerCase().includes(textoBuscador) ||
            p.categoria.toLowerCase().includes(textoBuscador) ||
            p.ubicacion.toLowerCase().includes(textoBuscador)
        );
    }

    renderCards(datosFiltrados);
}

function renderCards(data) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';
    
    if(data.length === 0) {
        contenedor.innerHTML = '<p style="color:white; text-align:center;">No se encontraron resultados.</p>';
        return;
    }

    data.forEach(p => {
        const html = `
            <div class="card">
                <div class="card-image">
                    <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='img/kpop.jpg'">
                </div>
                <div class="card-content">
                    <span class="card-category">${p.categoria}</span>
                    <h3 class="card-title">${p.nombre}</h3>
                    <p class="card-location">
                        <i class="fa-solid fa-location-dot"></i> ${p.ubicacion}
                    </p>
                </div>
            </div>`;
        contenedor.innerHTML += html;
    });
}

function setupMapaToggle() {
    const btn = document.getElementById('btn-toggle-mapa');
    if(!btn) return;
    const mapaDiv = document.getElementById('mapa-desplegable');
    
    btn.addEventListener('click', () => {
        mapaDiv.classList.toggle('activo');
        if (mapaDiv.classList.contains('activo')) {
            btn.innerHTML = '<i class="fa-solid fa-map-location-dot"></i> Ocultar Mapa de Actores';
        } else {
            btn.innerHTML = '<i class="fa-solid fa-map-location-dot"></i> Mostrar Mapa de Actores';
        }
    });
}

function setupMobileTooltips() {
    const toggles = document.querySelectorAll('.mobile-info-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentWrapper = toggle.closest('.btn-wrapper');
            const tooltip = parentWrapper.querySelector('.tooltip-list');
            document.querySelectorAll('.tooltip-list').forEach(el => {
                if(el !== tooltip) el.classList.remove('activo');
            });
            tooltip.classList.toggle('activo');
        });
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-wrapper')) {
            document.querySelectorAll('.tooltip-list').forEach(el => el.classList.remove('activo'));
        }
    });
}

function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.getElementById('nav-menu-list');
    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
            }
        });
    }
}

document.getElementById('buscador-input').addEventListener('input', filtrarYRenderizar);

const toggleSwitch = document.querySelector('.toggle-switch');
const labels = document.querySelectorAll('.toggle-label');

toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle('active');
    if(toggleSwitch.classList.contains('active')) {
        labels[0].classList.remove('active'); // Eventos OFF
        labels[1].classList.add('active');    // Lugares ON
        filtroActual = 'lugar';
    } else {
        labels[0].classList.add('active');    // Eventos ON
        labels[1].classList.remove('active'); // Lugares OFF
        filtroActual = 'evento';
    }
    filtrarYRenderizar();
});

labels.forEach(label => {
    label.addEventListener('click', () => {
        const target = label.getAttribute('data-filter');
        if(target !== filtroActual) toggleSwitch.click();
    });
});

function iniciarParticulas() {
    if(typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#72B04D", "#0077b6", "#FFD700", "#E74C3C"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0, "sync": false } },
                "size": { "value": 8, "random": true },
                "line_linked": { "enable": true, "distance": 180, "color": "#cccccc", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 3.5, "direction": "out", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }
            },
            "retina_detect": true
        });
    }
}
