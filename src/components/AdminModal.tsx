import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  KeyRound, 
  Palette, 
  UtensilsCrossed, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  RefreshCw, 
  Sparkles, 
  Image as ImageIcon, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CategoriaPlato, ConfiguracionGeneral, Plato } from '../types';
import { 
  updateConfiguracionGeneral, 
  crearPlato, 
  actualizarPlato, 
  eliminarPlato 
} from '../services/restaurantService';

interface AdminModalProps {
  config: ConfiguracionGeneral;
  platos: Plato[];
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIAS: CategoriaPlato[] = [
  'Platos Fuertes',
  'Caldos y Entradas',
  'Tradicionales Ecuatorianos',
  'Bebidas y Postres'
];

export const AdminModal: React.FC<AdminModalProps> = ({ config, platos, isOpen, onClose }) => {
  if (!isOpen) return null;

  // PIN Auth state
  const [pinInput, setPinInput] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [errorPin, setErrorPin] = useState(false);

  // Tab State: 'general' | 'menu' | 'ubicacion'
  const [activeTab, setActiveTab] = useState<'general' | 'menu' | 'ubicacion'>('general');

  // Form General Config
  const [formDataConfig, setFormDataConfig] = useState<ConfiguracionGeneral>({ ...config });
  const [guardandoConfig, setGuardandoConfig] = useState(false);
  const [mensajeExitoConfig, setMensajeExitoConfig] = useState('');

  // Dish Editing State
  const [editandoPlato, setEditandoPlato] = useState<Plato | null>(null);
  const [modoNuevoPlato, setModoNuevoPlato] = useState(false);
  const [formPlato, setFormPlato] = useState<Omit<Plato, 'id'>>({
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: 'Platos Fuertes',
    imagenUrl: '',
    destacado: false,
    disponible: true,
    ingredientes: []
  });
  const [ingredientesTexto, setIngredientesTexto] = useState('');
  const [guardandoPlato, setGuardandoPlato] = useState(false);

  // Verify PIN
  const handleVerificarPin = (e: React.FormEvent) => {
    e.preventDefault();
    const pinCorrecto = config.pinAdmin || '1234';
    if (pinInput.trim() === pinCorrecto) {
      setAutenticado(true);
      setErrorPin(false);
      setFormDataConfig({ ...config });
    } else {
      setErrorPin(true);
    }
  };

  // Save General Config
  const handleGuardarConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardandoConfig(true);
    setMensajeExitoConfig('');

    const ok = await updateConfiguracionGeneral(formDataConfig);
    setGuardandoConfig(false);

    if (ok) {
      setMensajeExitoConfig('¡Configuración guardada en Firestore exitosamente!');
      setTimeout(() => setMensajeExitoConfig(''), 4000);
    }
  };

  // Prepare New Dish Form
  const handleIniciarNuevoPlato = () => {
    setEditandoPlato(null);
    setModoNuevoPlato(true);
    setFormPlato({
      nombre: '',
      descripcion: '',
      precio: 5.00,
      categoria: 'Platos Fuertes',
      imagenUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
      destacado: false,
      disponible: true,
      ingredientes: ['Arroz', 'Salsa criolla']
    });
    setIngredientesTexto('Arroz, Salsa criolla');
  };

  // Prepare Edit Dish Form
  const handleIniciarEditarPlato = (plato: Plato) => {
    setEditandoPlato(plato);
    setModoNuevoPlato(false);
    setFormPlato({
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      precio: plato.precio,
      categoria: plato.categoria,
      imagenUrl: plato.imagenUrl,
      destacado: plato.destacado ?? false,
      disponible: plato.disponible ?? true,
      ingredientes: plato.ingredientes || []
    });
    setIngredientesTexto((plato.ingredientes || []).join(', '));
  };

  // Save Dish
  const handleGuardarPlato = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardandoPlato(true);

    const listaIngredientes = ingredientesTexto
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const platoPayload = {
      ...formPlato,
      precio: Number(formPlato.precio),
      ingredientes: listaIngredientes
    };

    if (modoNuevoPlato) {
      await crearPlato(platoPayload);
    } else if (editandoPlato) {
      await actualizarPlato(editandoPlato.id, platoPayload);
    }

    setGuardandoPlato(false);
    setModoNuevoPlato(false);
    setEditandoPlato(null);
  };

  // Delete Dish
  const handleEliminarPlato = async (id: string, nombre: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el plato "${nombre}"?`)) {
      await eliminarPlato(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-4xl glass-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="panel-administracion-modal"
      >
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 glass-dark border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl flame-gradient text-white glow-red">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wider">
                Panel de Administración
              </h2>
              <p className="text-xs text-[#FFC107] font-sans">
                Gestión en tiempo real para Restaurante {config.nombre || 'Dragón Rojo'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full glass-dark text-gray-400 hover:text-white hover:bg-[#D32F2F] transition-colors border border-white/10"
            id="btn-close-admin-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!autenticado ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full glass-dark border border-[#FF5722]/50 text-[#FF5722] flex items-center justify-center mx-auto shadow-xl glow-red">
              <KeyRound className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-white tracking-wider">Acceso Restringido</h3>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                Ingresa el PIN de seguridad para administrar el menú, logotipo y colores.
              </p>
            </div>

            <form onSubmit={handleVerificarPin} className="space-y-4">
              <input 
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN (Por defecto: 1234)"
                className="w-full text-center tracking-widest text-xl font-mono py-3 rounded-2xl glass-dark border border-white/10 text-white focus:outline-none focus:border-[#FF5722]"
                autoFocus
                id="input-pin-admin"
              />

              {errorPin && (
                <div className="flex items-center gap-2 text-xs text-red-400 justify-center bg-red-950/50 p-2.5 rounded-xl border border-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>PIN incorrecto. Intenta con "1234".</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full flame-gradient text-white font-bold text-xs uppercase tracking-wider shadow-lg glow-red"
                id="btn-ingresar-pin"
              >
                Ingresar al Panel
              </button>
            </form>
          </div>
        ) : (
          
          /* Main Admin Workspace */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 glass-dark border-b border-white/10 shrink-0 overflow-x-auto">
              <button
                onClick={() => { setActiveTab('general'); setModoNuevoPlato(false); setEditandoPlato(null); }}
                className={`px-4 py-3 rounded-t-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'general' 
                    ? 'border-[#D32F2F] text-[#FF5722] glass-dark' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                id="tab-config-general"
              >
                <Palette className="w-4 h-4" />
                <span>Configuración & Colores</span>
              </button>

              <button
                onClick={() => { setActiveTab('menu'); }}
                className={`px-4 py-3 rounded-t-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'menu' 
                    ? 'border-[#D32F2F] text-[#FF5722] glass-dark' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                id="tab-gestion-menu"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Gestión de Menú ({platos.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('ubicacion'); setModoNuevoPlato(false); setEditandoPlato(null); }}
                className={`px-4 py-3 rounded-t-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'ubicacion' 
                    ? 'border-[#D32F2F] text-[#FF5722] glass-dark' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                id="tab-config-ubicacion"
              >
                <MapPin className="w-4 h-4" />
                <span>Ubicación Exacta</span>
              </button>
            </div>

            {/* Tab Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: GENERAL CONFIG & STYLING */}
              {activeTab === 'general' && (
                <form onSubmit={handleGuardarConfig} className="space-y-6">
                  
                  {mensajeExitoConfig && (
                    <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span>{mensajeExitoConfig}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Basic Info */}
                    <div className="space-y-4 glass-dark p-5 rounded-3xl border border-white/10">
                      <h3 className="text-sm font-bold text-[#FFC107] uppercase tracking-wider flex items-center gap-2 font-serif">
                        <Sparkles className="w-4 h-4 text-[#FF5722]" />
                        <span>Identidad del Restaurante</span>
                      </h3>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          Nombre del Restaurante:
                        </label>
                        <input 
                          type="text"
                          value={formDataConfig.nombre}
                          onChange={(e) => setFormDataConfig({ ...formDataConfig, nombre: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          Subtítulo:
                        </label>
                        <input 
                          type="text"
                          value={formDataConfig.subtitulo}
                          onChange={(e) => setFormDataConfig({ ...formDataConfig, subtitulo: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          URL del Logotipo (Imagen):
                        </label>
                        <input 
                          type="text"
                          value={formDataConfig.logoUrl}
                          onChange={(e) => setFormDataConfig({ ...formDataConfig, logoUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          URL Imagen de Portada Hero:
                        </label>
                        <input 
                          type="text"
                          value={formDataConfig.heroImage}
                          onChange={(e) => setFormDataConfig({ ...formDataConfig, heroImage: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          Descripción de Bienvenida:
                        </label>
                        <textarea 
                          rows={3}
                          value={formDataConfig.descripcionHero}
                          onChange={(e) => setFormDataConfig({ ...formDataConfig, descripcionHero: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    {/* Palette & Security Settings */}
                    <div className="space-y-4 glass-dark p-5 rounded-3xl border border-white/10">
                      <h3 className="text-sm font-bold text-[#FFC107] uppercase tracking-wider flex items-center gap-2 font-serif">
                        <Palette className="w-4 h-4 text-[#FF5722]" />
                        <span>Paleta de Colores Institucional</span>
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            Color Primario:
                          </label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color"
                              value={formDataConfig.colorPrimario || '#D32F2F'}
                              onChange={(e) => setFormDataConfig({ ...formDataConfig, colorPrimario: e.target.value })}
                              className="w-10 h-10 rounded-xl border border-white/10 cursor-pointer bg-transparent"
                            />
                            <input 
                              type="text"
                              value={formDataConfig.colorPrimario || '#D32F2F'}
                              onChange={(e) => setFormDataConfig({ ...formDataConfig, colorPrimario: e.target.value })}
                              className="w-full px-2 py-1.5 rounded-xl glass-dark border border-white/10 text-white text-xs font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            Color Llama / Fuego:
                          </label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color"
                              value={formDataConfig.colorLlama || '#FF5722'}
                              onChange={(e) => setFormDataConfig({ ...formDataConfig, colorLlama: e.target.value })}
                              className="w-10 h-10 rounded-xl border border-white/10 cursor-pointer bg-transparent"
                            />
                            <input 
                              type="text"
                              value={formDataConfig.colorLlama || '#FF5722'}
                              onChange={(e) => setFormDataConfig({ ...formDataConfig, colorLlama: e.target.value })}
                              className="w-full px-2 py-1.5 rounded-xl glass-dark border border-white/10 text-white text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <label className="block text-xs font-bold text-[#FFC107] mb-1">
                          Cambiar PIN de Administración:
                        </label>
                        <input 
                          type="text"
                          value={formDataConfig.pinAdmin || '1234'}
                          onChange={(e) => setFormDataConfig({ ...formDataConfig, pinAdmin: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white font-mono text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          Horario de Atención:
                        </label>
                        <input 
                          type="text"
                          value={formDataConfig.horarioAtencion}
                          onChange={(e) => setFormDataConfig({ ...formDataConfig, horarioAtencion: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={guardandoConfig}
                      className="px-6 py-3 rounded-full flame-gradient text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg glow-red disabled:opacity-50"
                      id="btn-guardar-config-general"
                    >
                      {guardandoConfig ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Guardar Configuración en Firestore</span>
                    </button>
                  </div>

                </form>
              )}

              {/* TAB 2: MENU DISHES MANAGEMENT */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  
                  {/* Sub-header Controls */}
                  <div className="flex items-center justify-between glass-dark p-4 rounded-2xl border border-white/10">
                    <div>
                      <h3 className="text-base font-serif font-bold text-white tracking-wider">
                        Catálogo de Platos Típicos
                      </h3>
                      <p className="text-xs text-gray-400 font-sans">
                        Agrega nuevos platos o edita los existentes en Firestore.
                      </p>
                    </div>

                    {!modoNuevoPlato && !editandoPlato && (
                      <button
                        onClick={handleIniciarNuevoPlato}
                        className="px-5 py-2.5 rounded-full flame-gradient text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg glow-red"
                        id="btn-agregar-nuevo-plato"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar Nuevo Plato</span>
                      </button>
                    )}
                  </div>

                  {/* Create or Edit Dish Form */}
                  {(modoNuevoPlato || editandoPlato) ? (
                    <form onSubmit={handleGuardarPlato} className="glass-dark p-6 rounded-3xl border border-white/10 space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h4 className="text-sm font-bold text-[#FFC107] font-serif uppercase tracking-wider">
                          {modoNuevoPlato ? '➕ Registrar Nuevo Plato' : `✏️ Editar Plato: ${editandoPlato?.nombre}`}
                        </h4>
                        <button
                          type="button"
                          onClick={() => { setModoNuevoPlato(false); setEditandoPlato(null); }}
                          className="text-xs text-gray-400 hover:text-white glass-dark border border-white/10 px-3 py-1 rounded-full"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            Nombre del Plato:
                          </label>
                          <input 
                            type="text"
                            value={formPlato.nombre}
                            onChange={(e) => setFormPlato({ ...formPlato, nombre: e.target.value })}
                            placeholder="Ej. Cuy Asado con Papas"
                            className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            Categoría:
                          </label>
                          <select
                            value={formPlato.categoria}
                            onChange={(e) => setFormPlato({ ...formPlato, categoria: e.target.value as CategoriaPlato })}
                            className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm bg-[#121212]"
                          >
                            {CATEGORIAS.map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            Precio ($ USD):
                          </label>
                          <input 
                            type="number"
                            step="0.25"
                            value={formPlato.precio}
                            onChange={(e) => setFormPlato({ ...formPlato, precio: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            URL Imagen de Presentación:
                          </label>
                          <input 
                            type="text"
                            value={formPlato.imagenUrl}
                            onChange={(e) => setFormPlato({ ...formPlato, imagenUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm font-mono text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          Descripción completa:
                        </label>
                        <textarea 
                          rows={3}
                          value={formPlato.descripcion}
                          onChange={(e) => setFormPlato({ ...formPlato, descripcion: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          Ingredientes (separados por coma):
                        </label>
                        <input 
                          type="text"
                          value={ingredientesTexto}
                          onChange={(e) => setIngredientesTexto(e.target.value)}
                          placeholder="Ej. Cuy criollo, Papas, Salsa de maní, Mote"
                          className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <label className="inline-flex items-center gap-2 text-xs font-bold text-gray-200 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={formPlato.destacado}
                            onChange={(e) => setFormPlato({ ...formPlato, destacado: e.target.checked })}
                            className="w-4 h-4 rounded accent-[#D32F2F]"
                          />
                          <span>Marcar como Plato Destacado ⭐</span>
                        </label>

                        <label className="inline-flex items-center gap-2 text-xs font-bold text-gray-200 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={formPlato.disponible}
                            onChange={(e) => setFormPlato({ ...formPlato, disponible: e.target.checked })}
                            className="w-4 h-4 rounded accent-emerald-600"
                          />
                          <span>Disponible Hoy ✅</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => { setModoNuevoPlato(false); setEditandoPlato(null); }}
                          className="px-4 py-2 rounded-full glass-dark border border-white/10 text-gray-300 text-xs font-bold"
                        >
                          Cancelar
                        </button>

                        <button
                          type="submit"
                          disabled={guardandoPlato}
                          className="px-6 py-2 rounded-full flame-gradient text-white font-bold text-xs uppercase flex items-center gap-2 glow-red"
                        >
                          {guardandoPlato ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          <span>Guardar Plato</span>
                        </button>
                      </div>

                    </form>
                  ) : (
                    /* Dish Table List */
                    <div className="space-y-3">
                      {platos.map((plato) => (
                        <div 
                          key={plato.id}
                          className="p-4 rounded-2xl glass-dark border border-white/10 flex items-center justify-between gap-4 hover:border-white/30 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <img 
                              src={plato.imagenUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"} 
                              alt={plato.nombre}
                              className="w-12 h-12 rounded-xl object-cover bg-black shrink-0 border border-white/10" 
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white font-serif">{plato.nombre}</h4>
                                {plato.destacado && (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-[#FFC107] text-[9px] font-bold border border-amber-500/40">
                                    ⭐ Destacado
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[#FFC107] font-semibold block font-sans">
                                {plato.categoria} • ${plato.precio.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleIniciarEditarPlato(plato)}
                              className="p-2 rounded-xl glass-dark text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                              title="Editar Plato"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleEliminarPlato(plato.id, plato.nombre)}
                              className="p-2 rounded-xl bg-red-950/80 text-red-400 hover:bg-[#D32F2F] hover:text-white transition-colors border border-red-500/40"
                              title="Eliminar Plato"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: LOCATION & MAP CONFIG */}
              {activeTab === 'ubicacion' && (
                <form onSubmit={handleGuardarConfig} className="space-y-6">
                  
                  {mensajeExitoConfig && (
                    <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span>{mensajeExitoConfig}</span>
                    </div>
                  )}

                  <div className="glass-dark p-6 rounded-3xl border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold text-[#FFC107] uppercase tracking-wider flex items-center gap-2 font-serif">
                      <MapPin className="w-4 h-4 text-[#FF5722]" />
                      <span>Configuración del Mapa e Integración Presencial</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Dirección Texto Visible:
                      </label>
                      <input 
                        type="text"
                        value={formDataConfig.direccionTexto}
                        onChange={(e) => setFormDataConfig({ ...formDataConfig, direccionTexto: e.target.value })}
                        placeholder="Ej. Av. Las Américas y Calle del Batán, Cuenca"
                        className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        URL Embed para Iframe de Google Maps:
                      </label>
                      <textarea 
                        rows={3}
                        value={formDataConfig.mapEmbedUrl}
                        onChange={(e) => setFormDataConfig({ ...formDataConfig, mapEmbedUrl: e.target.value })}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-xs font-mono"
                      />
                      <span className="text-[11px] text-gray-400 mt-1 block font-sans">
                        Obtén la URL en Google Maps haciendo clic en Compartir &gt; Insertar un mapa.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Enlace Directo para Abrir Mapa en Dispositivos:
                      </label>
                      <input 
                        type="text"
                        value={formDataConfig.mapLinkDirecto}
                        onChange={(e) => setFormDataConfig({ ...formDataConfig, mapLinkDirecto: e.target.value })}
                        placeholder="https://maps.google.com/?q=..."
                        className="w-full px-3 py-2 rounded-xl glass-dark border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={guardandoConfig}
                      className="px-6 py-3 rounded-full flame-gradient text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg glow-red disabled:opacity-50"
                      id="btn-guardar-ubicacion"
                    >
                      {guardandoConfig ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Guardar Cambios de Ubicación</span>
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
