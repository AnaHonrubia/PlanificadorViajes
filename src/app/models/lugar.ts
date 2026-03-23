// Modelo para los lugares turísticos sugeridos
export interface LugarTuristico {
  id: number;
  nombre: string;
  ciudad: string;
  precio: number;
  imagenUrl: string;
  duracionEstimada: string;
}