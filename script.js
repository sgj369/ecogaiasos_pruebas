const { useState } = React;

// --- 1. COMPONENTES DE ÍCONOS (SVG) ---
// Definimos los iconos aquí para no depender de descargas externas en la tablet
const IconLeaf = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
const IconMenu = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 12"/></svg>;
const IconMap = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>;
const IconChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const IconChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;

// --- 2. DATOS DE LA AGENDA ---
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

// --- 3. COMPONENTE PRINCIPAL (APP) ---
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState('eventos'); // Estado para cambiar entre Eventos y Lugares

  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-sm fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-1.5 rounded-lg text-white">
                <IconLeaf />
              </div>
              <span className="font-bold text-xl tracking-tight text-green-800">Ecogaia</span>
            </div>
            
            {/* Menú Escritorio */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-green-600 transition">Inicio</a>
              <a href="#nosotros" className="hover:text-green-600 transition">Nosotros</a>
              <a href="#agenda" className="text-green-600 font-bold">Agenda</a>
              <a href="#contacto" className="hover:text-green-600 transition">Contacto</a>
            </div>

            {/* Botón Menú Móvil */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <IconX /> : <IconMenu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Desplegable Menú Móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600">Inicio</a>
              <a href="#agenda" className="block px-3 py-2 text-base font-medium text-green-600 font-bold">Agenda</a>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO HEADER --- */}
      <header className="relative bg-green-900 text-white pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          {/* Imagen de fondo */}
          <img src="https://images.unsplash.com/photo-1518173946687-a4c88928d999?auto=format&fit=crop&q=80&w=1920" alt="Naturaleza" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Conectando con la <span className="text-green-300">Naturaleza</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto mb-10">
            Descubre eventos, talleres y lugares dedicados a la conservación.
          </p>
          <a href="#agenda" className="inline-block bg-white text-green-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-50 transition transform hover:scale-105">
            Ver Agenda
          </a>
        </div>
      </header>

      {/* --- SECCIÓN AGENDA (INTEGRADA CON DISEÑO DE 3 COLUMNAS) --- */}
      <section id="agenda" className="py-16 bg-[#5b7f75] relative">
        {/* Textura de fondo opcional */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          
          {/* Título Sección */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Agenda Ecológica</h2>
            <p className="text-green-100">Actividades destacadas del mes</p>
          </div>

          {/* Interruptor (Toggle) Eventos/Lugares */}
          <div className="flex justify-center items-center mb-10 space-x-4">
            <span className={`font-bold text-lg ${view === 'eventos' ? 'text-white' : 'text-green-200/70'}`}>Eventos</span>
            
            <button 
              onClick={() => setView(view === 'eventos' ? 'lugares' : 'eventos')}
              className="w-16 h-8 bg-black/20 rounded-full p-1 flex items-center transition-colors duration-300 cursor-pointer border border-white/10"
            >
              <div 
                className={`w-6 h-6 bg-[#e8dcb5] rounded-full shadow-md transform transition-transform duration-300 ${view === 'lugares' ? 'translate-x-8' : 'translate-x-0'}`}
              ></div>
            </button>

            <span className={`font-bold text-lg ${view === 'lugares' ? 'text-white' : 'text-green-200/70'}`}>Lugares</span>
          </div>

          {/* GRID DE TARJETAS (3 COLUMNAS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS_DATA.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#1f2928] rounded-2xl overflow-hidden shadow-xl flex h-40 hover:scale-[1.02] transition-transform duration-200 cursor-pointer border border-white/10 group"
              >
                {/* Imagen a la izquierda (40%) */}
                <div className="w-2/5 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradiente sutil */}
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Texto a la derecha (60%) */}
                <div className="w-3/5 p-4 flex flex-col justify-center relative">
                  <span className="text-[10px] uppercase tracking-wider text-green-400/80 mb-1 block font-semibold">
                    {item.category}
                  </span>
                  <h3 className="text-[#e8dcb5] font-bold text-lg leading-tight mb-1 line-clamp-2">
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
             <button className="hover:text-white p-2 hover:bg-white/10 rounded-full transition"><IconChevronLeft /></button>
             
             <span className="w-8 h-8 bg-[#e8dcb5] text-[#1f2928] rounded-full flex items-center justify-center font-bold shadow-lg">
               1
             </span>
             <button className="w-8 h-8 hover:bg-white/10 rounded-full flex items-center justify-center transition">
               2
             </button>
             
             <button className="hover:text-white p-2 hover:bg-white/10 rounded-full transition"><IconChevronRight /></button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1f2928] text-gray-400 py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-green-500"><IconLeaf /></span>
                <span className="font-bold text-lg text-white">Ecogaia</span>
            </div>
            <p>© 2024 Ecogaia. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* --- BOTÓN FLOTANTE (MAPA) --- */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-[#b91c49] hover:bg-[#d62859] text-white font-bold py-3 px-6 rounded-full shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 hover:-translate-y-1 border-2 border-white/10">
          <span>Ver mapa</span>
          <IconMap />
        </button>
      </div>

    </div>
  );
}

// --- 4. RENDERIZADO ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
