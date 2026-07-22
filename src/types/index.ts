export type CategoriaPlato = 
  | 'Platos Fuertes'
  | 'Caldos y Entradas'
  | 'Tradicionales Ecuatorianos'
  | 'Bebidas y Postres';

export interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: CategoriaPlato;
  imagenUrl: string;
  destacado?: boolean;
  disponible?: boolean;
  ingredientes?: string[];
  orden?: number;
}

export interface ConfiguracionGeneral {
  nombre: string;
  subtitulo: string;
  logoUrl: string;
  heroImage: string;
  descripcionHero: string;
  mensajeBienvenida: string;
  colorPrimario: string;
  colorLlama: string;
  colorFondoDark: string;
  mapEmbedUrl: string;
  mapLinkDirecto: string;
  direccionTexto: string;
  horarioAtencion: string;
  pinAdmin: string;
}
