// ==========================================
// 1. CONFIGURACIÓN Y DATOS
// ==========================================

// ID de tu Google Sheet (Extraído del repositorio original)
const SHEET_ID = '1lM4o-nEUk-uDmdTymrqv9N0HDbnJDAvdw_dDfgRTA6c';
// URL para obtener los datos como JSON (Usando la API de visualización de Google)
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

// Variable para guardar los datos crudos
let todosLosProyectos = [];

// ==========================================
// 2. INICIALIZACIÓN (Cuando carga la página)
// ==========================================

window.addEventListener('load', () => {
    // A. Manejar Pantalla de Carga
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 800); // Tiempo mínimo de carga

    // B. Iniciar Partículas
    iniciarParticulas();

    // C. Cargar Datos
    cargarDatosDeGoogleSheets();
});

// ==========================================
// 3. LÓGICA DE DATOS (Google Sheets)
// ==========================================

async function cargarDatosDeGoogleSheets() {
    const contenedor = document.getElementById('contenedor-tarjetas');
    
    try {
        const respuesta = await fetch(SHEET_URL);
        const texto = await respuesta.text();
        
        // La respuesta de Google trae un texto extra al principio y final, hay que limpiarlo
        const jsonTexto = texto.substring(47).slice(0, -2);
        const json = JSON.parse(jsonTexto);
        
        // Procesar las filas del Excel a un formato más limpio
        todosLosProyectos = json.table.rows.map(fila => {
            // OJO: Indices de columnas
            const c = fila.c;
            return {
                nombre: c[0] ? c[0].v : 'Sin Nombre',
                categoria: c[1] ? c[1].v : 'General',
                ubicacion: c[2] ? c[2].v : 'CDMX',
                // RUTA CORREGIDA: img/kpop.jpg
                imagen: c[3] ? c[3].v : 'img/kpop.jpg', 
                descripcion: c[4] ? c[4].v : '',
                tipo: 'evento'
            };
        });

        if (todosLosProyectos.length === 0) throw new Error("Hoja vacía");

        mostrarProyectos(todosLosProyectos);

    } catch (error) {
        console.error("Error cargando Sheet:", error);
        // DATOS DE RESPALDO (Por si falla la conexión)
        todosLosProyectos = [
            {
                nombre: "Huerto Roma Verde",
                categoria: "Huerto Urbano",
                ubicacion: "Roma Sur, CDMX",
                imagen: "img/kpop.jpg", // RUTA CORREGIDA
                tipo: "lugar"
            },
            {
                nombre: "Taller de Composta",
                categoria: "Taller",
                ubicacion: "Parque México",
                imagen: "img/kpop.jpg", // RUTA CORREGIDA
                tipo: "evento"
            },
            {
                nombre: "Limpieza de Barrancas",
                categoria: "Voluntariado",
                ubicacion: "Álvaro Obregón",
                imagen: "img/kpop.jpg", // RUTA CORREGIDA
                tipo: "evento"
            }
        ];
        mostrarProyectos(todosLosProyectos);
    }
}

// Función para pintar las tarjetas en el HTML
function mostrarProyectos(proyectos) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = ''; 

    proyectos.forEach(proyecto => {
        // Crear HTML de la tarjeta
        const tarjetaHTML = `
            <div class="card">
                <div class="card-image">
                    <!-- RUTA CORREGIDA EN ONERROR: img/kpop.jpg -->
                    <img src="${proyecto.imagen}" alt="${proyecto.nombre}" onerror="this.src='img/kpop.jpg'">
                </div>
                <div class="card-content">
                    <span class="card-category">${proyecto.categoria}</span>
                    <h3 class="card-title">${proyecto.nombre}</h3>
                    <p class="card-location"><i class="fa-solid fa-location-dot"></i> ${proyecto.ubicacion}</p>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}

// ==========================================
// 4. LÓGICA DE INTERFAZ (Buscador y Toggle)
// ==========================================

const inputBuscador = document.getElementById('buscador-input');
inputBuscador.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    const proyectosFiltrados = todosLosProyectos.filter(proyecto => {
        return proyecto.nombre.toLowerCase().includes(texto) || 
               proyecto.categoria.toLowerCase().includes(texto) ||
               proyecto.ubicacion.toLowerCase().includes(texto);
    });
    mostrarProyectos(proyectosFiltrados);
});

const toggle = document.querySelector('.toggle-switch');
const labels = document.querySelectorAll('.toggle-label');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    if (toggle.classList.contains('active')) {
        labels[0].classList.remove('active');
        labels[1].classList.add('active');
    } else {
        labels[0].classList.add('active');
        labels[1].classList.remove('active');
    }
});

labels.forEach(label => {
    label.addEventListener('click', () => {
        const target = label.getAttribute('data-target');
        if ((target === 'eventos' && toggle.classList.contains('active')) ||
            (target === 'lugares' && !toggle.classList.contains('active'))) {
            toggle.click();
        }
    });
});

// ==========================================
// 5. PARTICULAS
// ==========================================
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
