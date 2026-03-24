import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViajeUsuario } from '../models/viaje';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GestorViajesService {
  private http = inject(HttpClient);
  
  // USAREMOS SOLO UNA LISTA PARA EVITAR LÍOS
  private listaViajes: ViajeUsuario[] = [];
  private infoDestinos: any[] = [];

  constructor() {
    this.cargarDeMemoria();
    this.cargarDestinos();
  }

  async cargarDestinos() {
    try {
      const urlRaw = 'https://raw.githubusercontent.com/AnaHonrubia/api-viajes/main/ciudades.json';
      
      // Pedimos el JSON de forma limpia
      const res = await firstValueFrom(
        this.http.get(urlRaw, { responseType: 'text' })
      );

      this.infoDestinos = JSON.parse(res);
    } catch (e) {
      // Solo dejamos este por si acaso hay un error de red en el futuro
      console.error("Error en la red al cargar destinos");
    }
  }

  getDatosDetalle(nombreCiudad: string) {
    if (!this.infoDestinos || this.infoDestinos.length === 0) return null;
    return this.infoDestinos.find(c => c.nombre.toLowerCase() === nombreCiudad.toLowerCase());
  }

  getFotoCiudad(nombreCiudad: string): string {
    const ciudadEncontrada = this.infoDestinos.find(c => c.nombre.toLowerCase() === nombreCiudad.toLowerCase());
    return ciudadEncontrada?.imagen || 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400';
  }

  obtenerTodosLosViajes() { 
    return this.listaViajes; 
  }

  agregarViaje(v: ViajeUsuario) { 
    this.listaViajes.push(v); 
    this.guardarEnMemoria(); 
  }

  borrarViaje(id: string) {
    this.listaViajes = this.listaViajes.filter(v => v.id !== id);
    this.guardarEnMemoria();
  }

  actualizarViaje(viajeActualizado: any) {
    const index = this.listaViajes.findIndex(v => v.id === viajeActualizado.id);
    if (index !== -1) {
      this.listaViajes[index] = viajeActualizado;
      this.guardarEnMemoria();
    }
  }

  private guardarEnMemoria() {
    localStorage.setItem('mis_viajes', JSON.stringify(this.listaViajes));
  }

  private cargarDeMemoria() {
    const data = localStorage.getItem('mis_viajes');
    if (data) this.listaViajes = JSON.parse(data);
  }

  obtenerListaCiudades(): string[] {
    // Aquí SÍ podemos usar this.infoDestinos porque la variable vive aquí
    if (this.infoDestinos && this.infoDestinos.length > 0) {
      return this.infoDestinos.map((destino: any) => destino.nombre);
    }
    return ['Madrid', 'Tokio', 'París', 'Londres', 'Roma'];
  }
}