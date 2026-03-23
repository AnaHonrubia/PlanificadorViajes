import { LugarTuristico } from './lugar';

// Modelo para el viaje que crea el usuario
export interface ViajeUsuario {
  id: string;
  nombreViaje: string;
  ciudadDestino: string;
  presupuesto: number;
  presupuestoRestante: number;
  fechaInicio: string; 
  fechaFin: string;    
  lugares: any[];
}