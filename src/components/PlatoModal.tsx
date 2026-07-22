import React from 'react';
import { X, Flame, CheckCircle, Tag, Utensils } from 'lucide-react';
import { Plato } from '../types';

interface PlatoModalProps {
  plato: Plato | null;
  onClose: () => void;
}

export const PlatoModal: React.FC<PlatoModalProps> = ({ plato, onClose }) => {
  if (!plato) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl glass-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
        id="modal-plato-detalle"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full glass-dark text-gray-300 hover:text-white hover:bg-[#D32F2F] transition-colors shadow-lg border border-white/20"
          id="btn-close-plato-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900">
          <img 
            src={plato.imagenUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"} 
            alt={plato.nombre}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-black/40" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full flame-gradient text-white font-bold text-[10px] uppercase tracking-widest mb-2 shadow-md glow-red">
                <Tag className="w-3.5 h-3.5" />
                {plato.categoria}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-md">
                {plato.nombre}
              </h2>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-[#FFC107] block font-bold uppercase tracking-widest">Precio</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#FFC107]">
                ${plato.precio.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Status badge */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FF5722] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-200">
                Gastronomía Austro Ecuatoriana
              </span>
            </div>

            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              plato.disponible !== false 
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' 
                : 'bg-red-950/80 text-red-400 border border-red-500/40'
            }`}>
              {plato.disponible !== false ? 'Disponible Hoy' : 'Agotado'}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#FFC107] mb-2">
              Descripción del Plato:
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed glass-dark p-4 rounded-2xl border border-white/5 font-sans italic">
              {plato.descripcion}
            </p>
          </div>

          {/* Ingredients list if present */}
          {plato.ingredientes && plato.ingredientes.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#FFC107] mb-2 flex items-center gap-1.5">
                <Utensils className="w-4 h-4" />
                <span>Ingredientes & Acompañantes:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {plato.ingredientes.map((ing, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-dark border border-white/10 text-gray-300 text-xs font-medium"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{ing}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notice for local physical visit */}
          <div className="p-4 rounded-2xl glass-dark border border-white/10 flex items-center justify-between text-xs text-gray-300">
            <span className="text-xs text-gray-400">Servido caliente y recién preparado en nuestro local presencial.</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full flame-gradient text-white font-bold text-xs uppercase tracking-wider glow-red"
            >
              Entendido
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
