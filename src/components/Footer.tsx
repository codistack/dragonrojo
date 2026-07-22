import React from 'react';
import { Flame, MapPin, Clock, Heart, ShieldCheck } from 'lucide-react';
import { ConfiguracionGeneral } from '../types';

interface FooterProps {
  config: ConfiguracionGeneral;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin }) => {
  return (
    <footer className="bg-[#181818] text-gray-400 border-t border-white/5 pt-12 pb-6 relative overflow-hidden">
      
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-[#D32F2F]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flame-gradient flex items-center justify-center text-white glow-red font-bold text-base">
                <span>DR</span>
              </div>
              <span className="text-xl font-bold text-[#D32F2F] uppercase tracking-widest font-sans">
                {config.nombre || 'Dragón Rojo'}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-sans">
              Restaurante de comida típica del Austro Ecuatoriano. Preservamos las tradiciones culinarias de la región con recetas ancestrales al carbón y a la leña.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-[#FFC107] font-semibold">
              <Heart className="w-4 h-4 text-[#D32F2F] fill-[#D32F2F]" />
              <span>Orgullosamente Ecuatoriano • Cuenca, Azuay</span>
            </div>
          </div>

          {/* Opening Hours & Local Service */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF5722]" />
              <span>Horarios de Atención Presencial</span>
            </h4>
            <p className="text-xs font-bold text-gray-200">
              {config.horarioAtencion || 'Lunes a Domingo: 08:00 AM - 09:30 PM'}
            </p>
            <p className="text-[11px] text-gray-500 italic leading-relaxed">
              Atención presencial continua en nuestro local. Ven a compartir en familia la mejor gastronomía típica.
            </p>
          </div>

          {/* Physical Address */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF5722]" />
              <span>Dirección</span>
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              {config.direccionTexto || 'Av. Las Américas y Calle del Batán, Cuenca - Ecuador'}
            </p>
            <a 
              href={config.mapLinkDirecto || "https://maps.google.com/?q=Cuenca+Ecuador"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#FF5722] hover:underline font-bold inline-block uppercase tracking-wider text-[10px]"
            >
              Ver en Google Maps →
            </a>
          </div>

        </div>

        {/* Security Statement */}
        <div className="p-4 rounded-2xl glass-dark border border-white/10 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs">Página 100% Informativa y Segura • Visítanos presencialmente</span>
          </div>

          <button
            onClick={onOpenAdmin}
            className="text-[10px] font-bold text-[#FFC107] hover:text-white uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full glass-dark transition-all"
          >
            Admin Panel
          </button>
        </div>

        {/* Copyright & Immersive UI Footer Bar */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {config.nombre || 'Dragón Rojo'} - Gastronomía Ecuatoriana
          </p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="text-[#D32F2F]">●</span> Firestore Database Connected
          </p>
        </div>

      </div>
    </footer>
  );
};
