import { LugarTuristico } from './lugar';

// Modelo para el viaje que crea el usuario
export interface ViajeUsuario {
  id: string; // ID único (usaremos Date.now())
  nombreViaje: string;
  ciudadDestino: string;
  presupuestoTotal: number;
  presupuestoRestante: number;
  lugaresElegidos: LugarTuristico[]; // Array de monumentos seleccionados
}