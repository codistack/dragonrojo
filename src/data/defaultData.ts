import { ConfiguracionGeneral, Plato } from '../types';

export const defaultConfiguracion: ConfiguracionGeneral = {
  nombre: 'Dragón Rojo',
  subtitulo: 'Comida Típica del Austro Ecuatoriano',
  logoUrl: 'https://i.imgur.com/IYGNbmi.jpg',
  heroImage: 'https://i.imgur.com/IMihdjZ.jpg',
  descripcionHero: 'Sabores autóctonos y auténticos del sur del Ecuador. Especialistas en Pollo Asado a la Leña, Cuy Asado, Caldos Tradicionales, Tamales, Humitas y el mejor Morocho del Austro.',
  mensajeBienvenida: '¡Bienvenido a Dragón Rojo! Un rincón de tradición, leña y fraternidad ecuatoriana.',
  colorPrimario: '#D32F2F',
  colorLlama: '#FF5722',
  colorFondoDark: '#121212',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.720846174828!2d-79.00685492415174!3d-2.8974138970789725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd1813c9e6a0d3%3A0x6b823e5900227181!2sCuenca%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1710000000000!5m2!1es!2sec',
  mapLinkDirecto: 'https://maps.app.goo.gl/Md8AwPwopHjPveb88',
  direccionTexto: 'Av. Las Américas y Calle del Batán (Sector Austro), Cuenca - Ecuador',
  horarioAtencion: 'Lunes a Domingo: 08:00 AM - 09:30 PM',
  pinAdmin: '1234'
};

export const defaultPlatos: Plato[] = [
  {
    id: 'cuy-asado-especial',
    nombre: 'Cuy Asado Criollo con Papas',
    descripcion: 'Cuy entero crujiente preparado a la brasa con aliño autóctono del Austro, servido con papas en salsa de maní, mote pillo jugoso y ensalada fresca.',
    precio: 18.50,
    categoria: 'Platos Fuertes',
    imagenUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    destacado: true,
    disponible: true,
    ingredientes: ['Cuy criollo', 'Papas doradas', 'Salsa de maní', 'Mote pillo', 'Ensalada criolla'],
    orden: 1
  },
  {
    id: 'pollo-al-carbon',
    nombre: 'Pollo Asado a la Leña estilo Dragón',
    descripcion: 'Delicioso Pollo Asado crujiente marinado con hierbas de la serranía y asado al carbón y a la leña. Acompañado de arroz, menestra casera, papas y ají cuencano.',
    precio: 8.50,
    categoria: 'Platos Fuertes',
    imagenUrl: 'https://i.imgur.com/IMihdjZ.jpg',
    destacado: true,
    disponible: true,
    ingredientes: ['Pollo a la leña', 'Menestra casera', 'Arroz blanco', 'Papas fritas', 'Ají de tomate de árbol'],
    orden: 2
  },
  {
    id: 'caldo-gallina-campo',
    nombre: 'Caldo de Gallina Criolla de Campo',
    descripcion: 'Nutritivo y reconfortante caldo con gallina de campo, yuca suave, huevo duro entero, cilantro fresco y cebollín.',
    precio: 4.50,
    categoria: 'Caldos y Entradas',
    imagenUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    destacado: true,
    disponible: true,
    ingredientes: ['Gallina de campo', 'Yuca', 'Huevo duro', 'Hierbitas', 'Consomé artesanal'],
    orden: 3
  },
  {
    id: 'mote-pillo-con-carne',
    nombre: 'Mote Pillo con Lomo Asado',
    descripcion: 'Mote tierno salteado con huevo de campo, cebolla larga y queso fresco criollo, acompañado con jugoso lomo de res a la plancha.',
    precio: 6.50,
    categoria: 'Tradicionales Ecuatorianos',
    imagenUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    destacado: true,
    disponible: true,
    ingredientes: ['Mote cuencano', 'Queso criollo', 'Huevo salteado', 'Lomo fino', 'Maduro frito'],
    orden: 4
  },
  {
    id: 'tamal-cuencano-tradicional',
    nombre: 'Tamales Cuencanos de Achira',
    descripcion: 'Fina masa de maíz rellena con estofado de chancho o pollo, huevo duro, arvejas y pasas, envuelta y cocida al vapor en hoja de achira.',
    precio: 2.50,
    categoria: 'Tradicionales Ecuatorianos',
    imagenUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
    destacado: false,
    disponible: true,
    ingredientes: ['Masa de maíz tierno', 'Carne de chancho', 'Huevo duro', 'Arvejas', 'Hoja de achira'],
    orden: 5
  },
  {
    id: 'humitas-choclo',
    nombre: 'Humitas de Choclo con Queso',
    descripcion: 'Esponjosas humitas elaboradas con choclo tierno molido en piedra, abundante queso mantecoso de la azuaya y doradas al vapor.',
    precio: 2.00,
    categoria: 'Tradicionales Ecuatorianos',
    imagenUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800',
    destacado: false,
    disponible: true,
    ingredientes: ['Choclo tierno', 'Queso derretido', 'Mantequilla de campo'],
    orden: 6
  },
  {
    id: 'quimbolitos-artesanales',
    nombre: 'Quimbolitos Tradicionales',
    descripcion: 'Delicada masa abizcochada aromatizada con vainilla y licor dulce, con pasas de uva y cocinada lentamente en hoja de achira.',
    precio: 1.75,
    categoria: 'Tradicionales Ecuatorianos',
    imagenUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    destacado: false,
    disponible: true,
    ingredientes: ['Masa esponjosa', 'Pasas', 'Aroma de achira', 'Mantequilla'],
    orden: 7
  },
  {
    id: 'tarrina-higos-queso',
    nombre: 'Tarrina de Higos pasados con Queso',
    descripcion: 'Higos cocidos suavemente en almíbar denso de panela, clavos de olor y canela en rama, servidos con una generosa tajada de queso criollo.',
    precio: 3.00,
    categoria: 'Bebidas y Postres',
    imagenUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    destacado: true,
    disponible: true,
    ingredientes: ['Higos maduros', 'Miel de panela artesanal', 'Canela', 'Queso fresco salado'],
    orden: 8
  },
  {
    id: 'morocho-caliente',
    nombre: 'Morocho Caliente con Espuma',
    descripcion: 'Bebida espesa y reconfortante preparada con maíz morocho partido, leche entera, panela de caña, canela y pasas maceradas.',
    precio: 2.00,
    categoria: 'Bebidas y Postres',
    imagenUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    destacado: true,
    disponible: true,
    ingredientes: ['Maíz morocho', 'Leche cremosa', 'Panela', 'Canela en rama', 'Pasas'],
    orden: 9
  },
  {
    id: 'cafe-pasado-chuspa',
    nombre: 'Café de Pasado en Chuspa',
    descripcion: 'Café de altura molido artesanalmente y pasado en chuspa de tela al momento. Aroma inconfundible del Austro.',
    precio: 1.50,
    categoria: 'Bebidas y Postres',
    imagenUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    destacado: false,
    disponible: true,
    ingredientes: ['Grano de café de altura', 'Agua de manantial'],
    orden: 10
  }
];
