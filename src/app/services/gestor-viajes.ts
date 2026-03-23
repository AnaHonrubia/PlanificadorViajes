import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViajeUsuario } from '../models/viaje';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestorViajesService {
  private http = inject(HttpClient);
  private misViajes: ViajeUsuario[] = [];
  private sugerencias: any = {};
  private readonly STORAGE_KEY = 'planificador_viajes_data';

  constructor() {
    this.cargarDatosIniciales();
  }

  // Carga las ciudades y monumentos de tu JSON en GitHub
  async cargarDatosIniciales() {
    try {
      const url = 'https://my-json-server.typicode.com/AnaHonrubia/api-viajes/db';
      const res: any = await firstValueFrom(this.http.get(url));
      this.sugerencias = res.sugerencias;
      this.cargarDeStorage();
    } catch (error) {
      console.error('Error cargando API:', error);
    }
  }

  obtenerListaCiudades(): string[] {
    return Object.keys(this.sugerencias || {});
  }

  obtenerTodosLosViajes() {
    return this.misViajes;
  }

  agregarViaje(nuevo: ViajeUsuario) {
    this.misViajes.unshift(nuevo);
    this.guardarEnStorage();
  }

  borrarViaje(id: string) {
    this.misViajes = this.misViajes.filter(v => v.id !== id);
    this.guardarEnStorage();
  }

  private guardarEnStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.misViajes));
  }

  private cargarDeStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) this.misViajes = JSON.parse(data);
  }
}