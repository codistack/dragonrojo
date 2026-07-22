import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Filter, Eye, UtensilsCrossed } from 'lucide-react';
import { CategoriaPlato, Plato } from '../types';
import { getDirectImageUrl } from '../utils/imageUtils';

interface MenuSectionProps {
  platos: Plato[];
  onSelectPlato: (plato: Plato) => void;
}

const CATEGORIAS: ('Todos' | CategoriaPlato)[] = [
  'Todos',
  'Platos Fuertes',
  'Caldos y Entradas',
  'Tradicionales Ecuatorianos',
  'Bebidas y Postres'
];

export const MenuSection: React.FC<MenuSectionProps> = ({ platos, onSelectPlato }) => {
  const [categoriaSel, setCategoriaSel] = useState<'Todos' | CategoriaPlato>('Todos');
  const [busqueda, setBusqueda] = useState('');

  const platosFiltrados = useMemo(() => {
    return platos.filter((plato) => {
      const coincideCat = categoriaSel === 'Todos' || plato.categoria === categoriaSel;
      const coincideBusqueda = 
        plato.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        plato.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        (plato.ingredientes && plato.ingredientes.some(i => i.toLowerCase().includes(busqueda.toLowerCase())));
      return coincideCat && coincideBusqueda;
    });
  }, [platos, categoriaSel, busqueda]);

  const platosDestacados = useMemo(() => {
    return platos.filter(p => p.destacado);
  }, [platos]);

  return (
    <section id="menu" className="py-20 bg-[#121212] relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D32F2F]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#FF5722]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-block px-3 py-1 border border-[#FF5722]/30 bg-[#FF5722]/10 rounded text-[#FF5722] text-[10px] font-bold uppercase tracking-[0.2em]">
            Nuestra Carta Tradicional
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Especialidades de <span className="text-[#D32F2F]">Nuestra Tierra</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans">
            Recetas ancestrales del austro preparadas al fuego lento de nuestra tradición.
            Haz clic en cualquier plato para ver detalles e ingredientes.
          </p>
        </div>

        {/* Filter Controls: Search & Category Tabs */}
        <div className="space-y-6 mb-12">
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative" id="search-container">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar cuy, pollo al carbón, caldo, tamales, morocho..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl glass-dark text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D32F2F] transition-all shadow-inner border border-white/10"
              id="input-buscar-plato"
            />
            {busqueda && (
              <button 
                onClick={() => setBusqueda('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-white glass-dark px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-widest font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="category-tabs">
            {CATEGORIAS.map((cat) => {
              const active = categoriaSel === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoriaSel(cat)}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    active 
                      ? 'flame-gradient text-white shadow-lg glow-red scale-105' 
                      : 'glass-dark text-gray-400 hover:text-white hover:border-[#D32F2F] border border-white/10'
                  }`}
                >
                  {cat === 'Todos' && <Filter className="w-3.5 h-3.5" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Featured Section Highlight (Only when 'Todos' selected and no search) */}
        {categoriaSel === 'Todos' && !busqueda && platosDestacados.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
              <h3 className="text-2xl font-serif italic text-gray-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFC107]" />
                <span>Especialidades del Día</span>
              </h3>
              <span className="text-xs text-[#D32F2F] uppercase tracking-widest font-bold">Platos Recomendados</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platosDestacados.slice(0, 3).map((plato) => (
                <div 
                  key={`destacado-${plato.id}`}
                  onClick={() => onSelectPlato(plato)}
                  className="glass-dark rounded-3xl p-6 flex flex-col gap-4 card-hover cursor-pointer transition-all duration-300"
                >
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gray-800">
                    <img 
                      src={getDirectImageUrl(plato.imagenUrl) || "https://i.imgur.com/IMihdjZ.jpg"} 
                      alt={plato.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full flame-gradient text-white font-bold text-[10px] uppercase tracking-widest glow-red">
                      Especialidad
                    </span>

                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-xl glass-dark text-[#FFC107] font-bold text-base border border-white/20">
                      ${plato.precio.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[#FFC107] font-bold uppercase text-[10px] tracking-widest">
                      {plato.categoria}
                    </span>
                    <h4 className="text-xl font-bold text-white font-serif">
                      {plato.nombre}
                    </h4>
                    <p className="text-xs text-gray-400 italic line-clamp-2 leading-relaxed">
                      {plato.descripcion}
                    </p>

                    <div className="pt-3 mt-auto flex items-center justify-between border-t border-white/10 text-xs font-semibold text-[#FF5722]">
                      <span>Consultar receta & ingredientes</span>
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Dishes Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
            <h3 className="text-xl font-serif italic text-gray-300 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-[#FF5722]" />
              <span>
                {categoriaSel === 'Todos' ? 'Nuestra Carta Completa' : `Menú: ${categoriaSel}`}
              </span>
            </h3>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">
              {platosFiltrados.length} {platosFiltrados.length === 1 ? 'plato' : 'platos'}
            </span>
          </div>

          {platosFiltrados.length === 0 ? (
            <div className="text-center py-16 glass-dark rounded-3xl border border-white/10 max-w-md mx-auto space-y-3">
              <UtensilsCrossed className="w-12 h-12 text-gray-600 mx-auto" />
              <h4 className="text-lg font-bold text-white font-serif">No se encontraron platos</h4>
              <p className="text-xs text-gray-400 px-6">
                No hay resultados para la búsqueda o categoría seleccionada.
              </p>
              <button 
                onClick={() => { setCategoriaSel('Todos'); setBusqueda(''); }}
                className="px-5 py-2 rounded-full flame-gradient text-white font-bold text-xs uppercase tracking-wider glow-red"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {platosFiltrados.map((plato) => (
                <div 
                  key={plato.id}
                  onClick={() => onSelectPlato(plato)}
                  className="glass-dark rounded-3xl p-5 flex flex-col justify-between gap-4 card-hover cursor-pointer transition-all duration-300"
                  id={`card-plato-${plato.id}`}
                >
                  <div className="space-y-3">
                    {/* Dish Card Image */}
                    <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-800">
                      <img 
                        src={getDirectImageUrl(plato.imagenUrl) || "https://i.imgur.com/IMihdjZ.jpg"} 
                        alt={plato.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                      
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full glass-dark text-white text-[10px] font-bold border border-white/20">
                        {plato.categoria}
                      </span>

                      <span className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-xl flame-gradient text-white font-extrabold text-sm shadow-md glow-red">
                        ${plato.precio.toFixed(2)}
                      </span>
                    </div>

                    {/* Dish Info */}
                    <div className="space-y-1">
                      <span className="text-[#FFC107] font-bold uppercase text-[10px] tracking-widest block">
                        {plato.categoria}
                      </span>
                      <h4 className="text-lg font-bold text-white font-serif line-clamp-1">
                        {plato.nombre}
                      </h4>
                      <p className="text-xs text-gray-400 italic line-clamp-2 leading-relaxed">
                        {plato.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center justify-between transition-colors">
                      <span className="text-[10px] uppercase font-bold tracking-widest">Ver Receta</span>
                      <Eye className="w-3.5 h-3.5 text-[#FF5722]" />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
