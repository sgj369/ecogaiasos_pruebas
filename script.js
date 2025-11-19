// Obtenemos los hooks de React desde el objeto global (ya que usamos CDN)
const { useState, useEffect } = React;

// ==========================================
// 1. COMPONENTES DE ÍCONOS (SVG)
// ==========================================
// Usamos estos iconos SVG directamente para no depender de librerías externas que puedan fallar.

const IconLeaf = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const IconMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" x2="9" y1="3" y2="18"/>
    <line x1="15" x2="15" y1="6" y2="21"/>
  </svg>
);

const IconChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

// ==========================================
// 2. DATOS DE LA AGENDA (MOCK DATA)
// ==========================================
const EVENTS_DATA = [
  { 
    id: 1, 
    category: "Voluntariado", 
    title: "Reforestación Urbana", 
    subtitle: "Parque México", 
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=300&h=200" 
  },
  { 
    id: 2, 
    category: "Talleres", 
    title: "Huertos en Casa", 
    subtitle: "Centro Comunitario Roma", 
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=300&h=200" 
  },
  { 
    id: 3, 
    category: "Conferencias", 
    title: "El Futuro del Agua", 
    subtitle: "Auditorio Nacional", 
    image: "https://images.unsplash.com/photo-1518998053901-5348d3969105?auto=format&fit=crop&q=80&w=300&h=200" 
  },
  { 
    id: 4, 
    category: "Talleres", 
    title: "Ecoprint y Pigmentos", 
    subtitle: "Museo de Geología", 
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=300&h=200" 
  },
  { 
    id: 5, 
    category: "Reciclaje", 
    title: "Taller de Composta", 
    subtitle: "Viveros de Coyoacán", 
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9bf4e10?auto=format&fit=crop&q=80&w=300&h=200" 
  },
  { 
    id: 6, 
    category: "Cine Debate", 
    title: "Documental: Terra", 
    subtitle: "Cineteca Nacional", 
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=300&h=200" 
  },
];

// ==========================================
// 3. COMPONENTE PRINCIPAL DE LA AGENDA
// ==========================================
function AgendaApp() {
  // Estado para controlar si vemos "Eventos" o "Lugares"
  const [view, setView] = useState('eventos');

  // Efecto para ocultar el loader una vez que React ha cargado
  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      // Añadimos la clase que lo desvanece (definida en CSS o inline style)
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      // Lo quitamos del flujo después de la transición
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, []);

  return (
    // Contenedor principal con fondo verde y bordes redondeados en desktop
    <div className="relative bg-[#5b7f75] py-12 px-4 md:rounded-xl mx-0 md:mx-4 shadow-2xl mt-8">
      
      {/* Textura de fondo decorativa */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] md:rounded-xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Título de la sección */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Agenda Ecológica</h2>
          <p className="text-green-100">Descubre qué está pasando en la comunidad</p>
        </div>

        {/* Toggle Switch (Selector Eventos / Lugares) */}
        <div className="flex justify-center items-center mb-10 space-x-4 select-none">
          <span 
            className={`font-bold text-lg cursor-pointer transition-colors ${view === 'eventos' ? 'text-white' : 'text-green-200/70'}`} 
            onClick={() => setView('eventos')}
          >
            Eventos
          </span>
          
          <button 
            onClick={() => setView(view === 'eventos' ? 'lugares' : 'eventos')}
            className="w-16 h-8 bg-black/20 rounded-full p-1 flex items-center transition-colors duration-300 cursor-pointer border border-white/10 focus:outline-none hover:bg-black/30"
            aria-label="Alternar vista"
          >
            <div 
              className={`w-6 h-6 bg-[#e8dcb5] rounded-full shadow-md transform transition-transform duration-300 ${view === 'lugares' ? 'translate-x-8' : 'translate-x-0'}`}
            ></div>
          </button>

          <span 
            className={`font-bold text-lg cursor-pointer transition-colors ${view === 'lugares' ? 'text-white' : 'text-green-200/70'}`} 
            onClick={() => setView('lugares')}
          >
            Lugares
          </span>
        </div>

        {/* --- GRID DE 3 COLUMNAS (DISEÑO PRINCIPAL) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS_DATA.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#1f2928] rounded-2xl overflow-hidden shadow-xl flex h-40 hover:scale-[1.02] transition-transform duration-200 cursor-pointer border border-white/10 group"
            >
              {/* Imagen (40% ancho) */}
              <div className="w-2/5 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>

              {/* Contenido Texto (60% ancho) */}
              <div className="w-3/5 p-4 flex flex-col justify-center relative text-left">
                <span className="text-[10px] uppercase tracking-wider text-green-400/80 mb-1 block font-semibold">
                  {item.category}
                </span>
                <h3 className="text-[#e8dcb5] font-bold text-lg leading-tight mb-1 line-clamp-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs italic mt-1 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center mt-12 space-x-4 text-sm font-medium text-white/80">
           <button className="hover:text-white p-2 hover:bg-white/10 rounded-full transition">
             <IconChevronLeft />
           </button>
           
           <span className="w-8 h-8 bg-[#e8dcb5] text-[#1f2928] rounded-full flex items-center justify-center font-bold shadow-lg">
             1
           </span>
           
           <button className="hover:text-white p-2 hover:bg-white/10 rounded-full transition">
             <IconChevronRight />
           </button>
        </div>

      </div>

      {/* Botón Flotante de Mapa (Solo visible dentro de esta app en móvil o fijo en pantalla según preferencia) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-[#b91c49] hover:bg-[#d62859] text-white font-bold py-3 px-6 rounded-full shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 hover:-translate-y-1 border-2 border-white/10"
          onClick={() => {
             // Lógica opcional: abrir el mapa de Google Maps que tienes oculto
             const mapDiv = document.getElementById('mapa-desplegable');
             if(mapDiv) mapDiv.classList.remove('hidden');
             window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
        >
          <span>Ver mapa</span>
          <IconMap />
        </button>
      </div>

    </div>
  );
}

// ==========================================
// 4. MONTAJE DE LA APLICACIÓN
// ==========================================
// Buscamos el div con id "react-agenda-root" en el HTML y renderizamos la app allí.

const container = document.getElementById('react-agenda-root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<AgendaApp />);
} else {
  console.error("Error: No se encontró el contenedor <div id='react-agenda-root'> en el HTML.");
}
