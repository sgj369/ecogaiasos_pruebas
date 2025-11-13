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
    // Pantalla de carga
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 800);

    iniciarParticulas();
    cargarDatosDeGoogleSheets();
    
    // Inicializar Toggle de Mapa
    setupMapaToggle();
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
            // Lógica simple para asignar tipo (temporal)
            const tipoAsignado = index % 2 === 0 ? 'evento' : 'lugar';

            return {
                nombre: c[0] ? c[0].v : 'Sin Nombre',
                categoria: c[1] ? c[1].v : 'General',
                ubicacion: c[2] ? c[2].v : 'CDMX',
                imagen: c[3] ? c[3].v : 'img/kpop.jpg', 
                descripcion: c[4] ? c[4].v : 'Sin descripción disponible.',
                tipo: tipoAsignado
            };
        });

        filtrarYRenderizar();

    } catch (error) {
        console.error("Error cargando Sheet:", error);
        // DATOS DE RESPALDO
        todosLosProyectos = [
            { nombre: "Huerto Roma Verde", categoria: "Huerto", ubicacion: "Roma Sur", imagen: "img/kpop.jpg", tipo: "lugar" },
            { nombre: "Taller Composta", categoria: "Taller", ubicacion: "Parque México", imagen: "img/kpop.jpg", tipo: "evento" }
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

// ==========================================
// 4. RENDERIZADO Y UI
// ==========================================

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
                    <p class="card-location"><i class="fa-solid fa-location-dot"></i> ${p.ubicacion}</p>
                </div>
            </div>`;
        contenedor.innerHTML += html;
    });
}

function setupMapaToggle() {
    const btn = document.getElementById('btn-toggle-mapa');
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

// Buscador Input
document.getElementById('buscador-input').addEventListener('input', filtrarYRenderizar);

// Toggle Eventos/Lugares
const toggleSwitch = document.querySelector('.toggle-switch');
const labels = document.querySelectorAll('.toggle-label');

toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle('active');
    const isLugar = toggleSwitch.classList.toggle('lugar-mode'); 
    
    if(isLugar) {
        labels[0].classList.remove('active');
        labels[1].classList.add('active');
        filtroActual = 'lugar';
    } else {
        labels[0].classList.add('active');
        labels[1].classList.remove('active');
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

// Particulas
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
