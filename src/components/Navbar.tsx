import React, { useState, useEffect } from 'react';
import { Flame, MapPin, UtensilsCrossed, Settings, Menu, X, Clock, Sparkles } from 'lucide-react';
import { ConfiguracionGeneral } from '../types';
import { getDirectImageUrl } from '../utils/imageUtils';

interface NavbarProps {
  config: ConfiguracionGeneral;
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenAdmin, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-dark shadow-2xl py-3 border-b border-white/10' 
          : 'bg-gradient-to-b from-black/95 via-black/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo-container"
          >
            <div className="relative">
              {config.logoUrl ? (
                <img 
                  src={getDirectImageUrl(config.logoUrl)} 
                  alt={config.nombre} 
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-[#FF5722]/40 glow-red group-hover:scale-105 transition-transform duration-300 relative z-10 bg-[#121212]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0';
                  }}
                />
              ) : null}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flame-gradient flex items-center justify-center text-white glow-red font-black text-lg">
                <span>DR</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-widest text-[#D32F2F] uppercase font-sans drop-shadow-md">
                  {config.nombre || 'Dragón Rojo'}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF5722]/20 border border-[#FF5722]/40 text-[#FF5722] tracking-widest uppercase">
                  Austro
                </span>
              </div>
              <span className="text-xs text-gray-400 font-medium tracking-wide">
                {config.subtitulo || 'Comida Típica Ecuatoriana'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-navigation">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-[#FF5722] transition-colors flex items-center gap-2 group"
              id="nav-link-inicio"
            >
              <Sparkles className="w-4 h-4 text-[#FF5722] group-hover:scale-110 transition-transform" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleNavClick('menu')}
              className="text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-[#FF5722] transition-colors flex items-center gap-2 group"
              id="nav-link-menu"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#FF5722] group-hover:scale-110 transition-transform" />
              <span>Nuestro Menú</span>
            </button>

            <button
              onClick={() => handleNavClick('ubicacion')}
              className="text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-[#FF5722] transition-colors flex items-center gap-2 group"
              id="nav-link-ubicacion"
            >
              <MapPin className="w-4 h-4 text-[#FF5722] group-hover:scale-110 transition-transform" />
              <span>Ubicación</span>
            </button>
          </nav>

          {/* Action Area: Open Admin Panel */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Atención Presencial</span>
            </div>

            <button
              onClick={onOpenAdmin}
              className="px-5 py-2 rounded-full border border-[#D32F2F] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#D32F2F] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
              id="btn-admin-panel"
            >
              <Settings className="w-4 h-4 text-[#FF5722]" />
              <span className="hidden sm:inline">Admin Panel</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl glass-dark text-gray-200 hover:text-white border border-white/10 focus:outline-none"
              id="btn-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden glass-dark border-b border-white/10 px-6 py-6 shadow-2xl space-y-4 animate-in slide-in-from-top-5 duration-300"
          id="mobile-navigation-dropdown"
        >
          <button
            onClick={() => handleNavClick('hero')}
            className="w-full text-left py-2.5 text-gray-200 hover:text-[#FF5722] font-semibold text-sm uppercase tracking-wider flex items-center gap-3 border-b border-zinc-800"
          >
            <Sparkles className="w-5 h-5 text-[#FF5722]" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => handleNavClick('menu')}
            className="w-full text-left py-2.5 text-gray-200 hover:text-[#FF5722] font-semibold text-sm uppercase tracking-wider flex items-center gap-3 border-b border-zinc-800"
          >
            <UtensilsCrossed className="w-5 h-5 text-[#FF5722]" />
            <span>Nuestro Menú</span>
          </button>

          <button
            onClick={() => handleNavClick('ubicacion')}
            className="w-full text-left py-2.5 text-gray-200 hover:text-[#FF5722] font-semibold text-sm uppercase tracking-wider flex items-center gap-3 border-b border-zinc-800"
          >
            <MapPin className="w-5 h-5 text-[#FF5722]" />
            <span>Ubicación Exacta</span>
          </button>

          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-3 rounded-lg border border-emerald-800/40">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{config.horarioAtencion || 'Abierto Lunes a Domingo'}</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-3 rounded-xl flame-gradient text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 glow-red"
            >
              <Settings className="w-4 h-4" />
              <span>Administrar Restaurante</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
