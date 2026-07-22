import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { LocationSection } from './components/LocationSection';
import { PlatoModal } from './components/PlatoModal';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { ConfiguracionGeneral, Plato } from './types';
import { defaultConfiguracion, defaultPlatos } from './data/defaultData';
import { subscribeConfiguracion, subscribePlatos } from './services/restaurantService';

export default function App() {
  const [config, setConfig] = useState<ConfiguracionGeneral>(defaultConfiguracion);
  const [platos, setPlatos] = useState<Plato[]>(defaultPlatos);
  const [selectedPlato, setSelectedPlato] = useState<Plato | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Real-time Firestore subscriptions
  useEffect(() => {
    const unsubConfig = subscribeConfiguracion((nuevaConfig) => {
      setConfig(nuevaConfig);
      // Dynamic CSS color variable injection
      if (nuevaConfig.colorPrimario) {
        document.documentElement.style.setProperty('--color-primary', nuevaConfig.colorPrimario);
      }
      if (nuevaConfig.colorLlama) {
        document.documentElement.style.setProperty('--color-flame', nuevaConfig.colorLlama);
      }
    });

    const unsubPlatos = subscribePlatos((nuevosPlatos) => {
      setPlatos(nuevosPlatos);
    });

    return () => {
      unsubConfig();
      unsubPlatos();
    };
  }, []);

  // Smooth Navigation
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 selection:bg-red-600 selection:text-white font-sans">
      
      {/* Sticky Navigation Header */}
      <Navbar 
        config={config} 
        onOpenAdmin={() => setAdminModalOpen(true)} 
        onNavigate={scrollToSection} 
      />

      {/* Hero Welcome Section */}
      <Hero 
        config={config} 
        onNavigate={scrollToSection} 
      />

      {/* Dynamic Dishes Catalog from Firestore */}
      <MenuSection 
        platos={platos} 
        onSelectPlato={(plato) => setSelectedPlato(plato)} 
      />

      {/* Physical Location & Map Section */}
      <LocationSection 
        config={config} 
      />

      {/* Footer */}
      <Footer 
        config={config} 
        onOpenAdmin={() => setAdminModalOpen(true)} 
      />

      {/* Dish Detailed View Modal */}
      <PlatoModal 
        plato={selectedPlato} 
        onClose={() => setSelectedPlato(null)} 
      />

      {/* Web Administration Panel Modal */}
      <AdminModal 
        config={config} 
        platos={platos} 
        isOpen={adminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
      />

    </div>
  );
}
