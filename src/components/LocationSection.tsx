import React from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, HeartHandshake, Compass, Building2 } from 'lucide-react';
import { ConfiguracionGeneral } from '../types';

interface LocationSectionProps {
  config: ConfiguracionGeneral;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config }) => {
  return (
    <section id="ubicacion" className="py-20 bg-[#121212] relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D32F2F]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-block px-3 py-1 border border-[#FF5722]/30 bg-[#FF5722]/10 rounded text-[#FF5722] text-[10px] font-bold uppercase tracking-[0.2em]">
            Atención Presencial en Cuenca
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Visítanos en <span className="text-[#D32F2F]">Nuestro Local</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans">
            Te esperamos con la calidez del Austro ecuatoriano. Disfruta de un ambiente tradicional y acogedor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-3xl glass-dark border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl flame-gradient text-white glow-red shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-[#FFC107] uppercase tracking-widest">
                    Ubicación Física Exacta:
                  </h3>
                  <p className="text-base font-bold text-white font-serif mt-1">
                    {config.direccionTexto || 'Av. Las Américas y Calle del Batán, Cuenca - Ecuador'}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-3 border-t border-white/10">
                <div className="p-3 rounded-2xl glass-dark border border-white/10 text-[#FF5722] shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-[#FFC107] uppercase tracking-widest">
                    Horario de Atención:
                  </h3>
                  <p className="text-sm font-semibold text-gray-200 mt-1">
                    {config.horarioAtencion || 'Lunes a Domingo: 08:00 AM - 09:30 PM'}
                  </p>
                </div>
              </div>

              {/* Direct Map Button */}
              <div className="pt-2">
                <a 
                  href={config.mapLinkDirecto || "https://maps.google.com/?q=Cuenca+Ecuador"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl flame-gradient text-white font-bold text-xs uppercase tracking-wider shadow-lg glow-red transition-all flex items-center justify-center gap-2 group"
                  id="btn-abrir-google-maps"
                >
                  <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>
            </div>

            {/* In-Person Experience Philosophy Card */}
            <div className="p-6 rounded-3xl glass-dark border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#FFC107] font-bold text-xs uppercase tracking-widest">
                <HeartHandshake className="w-5 h-5 text-[#FF5722]" />
                <span>Fraternidad & Gastronomía</span>
              </div>
              <p className="text-xs text-gray-400 italic leading-relaxed">
                Creemos en la buena mesa compartida en persona. Servimos los platos directo de la parrilla y el horno de leña a tu mesa para garantizar la mayor frescura.
              </p>
            </div>

            {/* Safety & No-Delivery Notice */}
            <div className="p-4 rounded-2xl glass-dark border border-[#FF5722]/30 text-amber-200 text-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#FF5722] shrink-0 mt-0.5" />
              <span>
                <strong>Nota Importante:</strong> Atendemos únicamente en nuestro restaurante de forma presencial para mantener la más alta calidad gastronómica.
              </span>
            </div>

          </div>

          {/* Right Interactive Google Map Embed */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl glass-dark border border-white/10 overflow-hidden shadow-2xl h-[450px]">
              {config.mapEmbedUrl ? (
                <iframe 
                  src={config.mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Restaurante Dragón Rojo"
                  className="w-full h-full filter brightness-90 contrast-105"
                  id="iframe-mapa-google"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 text-gray-400 p-8 text-center space-y-4">
                  <Compass className="w-12 h-12 text-[#FF5722] animate-spin-slow" />
                  <p className="text-sm font-serif font-bold text-white">Mapa Interactivo de Cuenca - Austro Ecuatoriano</p>
                  <a 
                    href={config.mapLinkDirecto || "https://maps.google.com/?q=Cuenca+Ecuador"}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-5 py-2 flame-gradient text-white font-bold text-xs rounded-full uppercase tracking-wider glow-red"
                  >
                    Ver mapa en Google
                  </a>
                </div>
              )}

              {/* Map Footer Banner Overlay */}
              <div className="absolute bottom-4 left-4 right-4 glass-dark p-3 rounded-2xl border border-white/20 flex items-center justify-between text-xs text-gray-200 shadow-xl">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D32F2F] animate-bounce" />
                  <span className="font-bold font-serif">Dragón Rojo • Cuenca</span>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 text-[10px] uppercase tracking-wider">
                  Abierto Hoy
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
