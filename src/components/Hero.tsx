import React from 'react';
import { Flame, MapPin, Utensils, HeartHandshake, ShieldAlert, Award, Compass } from 'lucide-react';
import { ConfiguracionGeneral } from '../types';

interface HeroProps {
  config: ConfiguracionGeneral;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onNavigate }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#121212]">
      {/* Background Image Overlay with Gradients */}
      <div className="absolute inset-0 z-0">
        <img 
          src={config.heroImage || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600"} 
          alt="Comida Típica Austro Ecuatoriano" 
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 scale-105 transition-transform duration-1000"
        />
        {/* Fire and Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/85 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212]/90" />
        {/* Glow red accent */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D32F2F]/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-[#FF5722]/15 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-block px-3 py-1 border border-[#FF5722]/30 bg-[#FF5722]/10 rounded text-[#FF5722] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              Austro Ecuatoriano • Cuenca y Cañar
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Sabor que <span className="text-[#D32F2F]">Quema</span> <br />
              en el Alma.
            </h1>

            {/* Subtitle / Welcome Message */}
            <p className="text-gray-400 text-lg sm:text-xl font-sans leading-relaxed max-w-2xl border-l-4 border-[#D32F2F] pl-4 py-1">
              {config.descripcionHero || 'Recetas ancestrales del austro, preparadas al fuego lento de nuestra tradición. La esencia del Azuay en cada bocado.'}
            </p>

            {/* Security & Presence Note */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl glass-dark border border-white/10 text-amber-200 text-xs sm:text-sm max-w-xl">
              <ShieldAlert className="w-5 h-5 text-[#FF5722] shrink-0" />
              <span>
                <strong>Atención 100% Presencial:</strong> Fomentamos la tradición y la buena mesa. Visítanos en nuestro local para disfrutar del cuy recién asado al carbón.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('menu')}
                className="flame-gradient px-8 py-4 rounded-xl font-bold flex items-center gap-2 glow-red text-white uppercase tracking-wider text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all duration-300 group"
                id="hero-btn-ver-menu"
              >
                <Utensils className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>EXPLORAR NUESTRO MENÚ</span>
              </button>

              <button
                onClick={() => onNavigate('ubicacion')}
                className="px-8 py-4 rounded-xl glass-dark hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                id="hero-btn-ubicacion"
              >
                <MapPin className="w-4 h-4 text-[#FF5722]" />
                <span>VISÍTANOS EN GOOGLE MAPS</span>
              </button>
            </div>

            {/* Popular Culinary Tags */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-3">
                Especialidades Tradicionales del Austro:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Cuy Asado Criollo', 
                  'Pollo al Carbón', 
                  'Caldo de Gallina', 
                  'Mote Pillo con Carne', 
                  'Tamales & Humitas', 
                  'Tarrina de Higos', 
                  'Morocho Caliente'
                ].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-full glass-dark border border-white/10 text-[#FFC107] text-[10px] font-bold uppercase tracking-wider hover:border-[#D32F2F] hover:text-white transition-colors cursor-default"
                  >
                    🔥 {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Hero Banner / Feature Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card */}
              <div className="glass-dark rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 card-hover">
                
                <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group">
                  <img 
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" 
                    alt="Cuy Asado Criollo Austro Ecuatoriano"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full flame-gradient text-white font-bold text-[10px] uppercase tracking-widest glow-red">
                      Tradición Cuencana
                    </span>
                    <span className="px-3 py-1 rounded-full glass-dark text-[#FFC107] font-bold text-sm border border-white/20">
                      $18.50
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white flex items-center justify-between">
                    <span>Cuy Asado al Carbón</span>
                    <Award className="w-5 h-5 text-[#FF5722]" />
                  </h3>
                  <p className="text-xs text-gray-400 italic leading-relaxed">
                    Servido con papas doradas, mote pillo jugoso y salsa de maní artesanal molida a piedra.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl glass-dark border border-white/5 flex items-center gap-3">
                    <HeartHandshake className="w-5 h-5 text-[#FF5722] shrink-0" />
                    <div>
                      <span className="block text-[10px] text-gray-500 uppercase font-bold">Sazón</span>
                      <span className="text-xs font-bold text-white">100% Auténtica</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl glass-dark border border-white/5 flex items-center gap-3">
                    <Compass className="w-5 h-5 text-[#FFC107] shrink-0" />
                    <div>
                      <span className="block text-[10px] text-gray-500 uppercase font-bold">Ambiente</span>
                      <span className="text-xs font-bold text-white">Familiar y Cálido</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Floating Pill */}
              <div className="absolute -bottom-5 -left-5 flame-gradient text-white p-4 rounded-2xl shadow-2xl border border-white/20 hidden sm:flex items-center gap-3 animate-bounce-slow glow-red z-20">
                <Flame className="w-6 h-6 text-yellow-300" />
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider">¡El Auténtico Sabor del Austro!</span>
                  <span className="text-[10px] text-white/90">Atención presencial de lunes a domingo</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
