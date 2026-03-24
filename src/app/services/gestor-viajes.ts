import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViajeUsuario } from '../models/viaje';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GestorViajesService {
  private http = inject(HttpClient);
  private listaViajes: ViajeUsuario[] = [];
  private infoDestinos: any[] = [];

  constructor() {
    this.cargarDeMemoria();
    this.cargarDestinos();
  }

  async cargarDestinos() {
    try {
      const urlRaw = 'https://raw.githubusercontent.com/AnaHonrubia/api-viajes/refs/heads/main/ciudades.json';
      this.infoDestinos = await firstValueFrom(this.http.get<any[]>(urlRaw));
    } catch (e) {
      console.error("No se pudo cargar con GitHub", e);
    }
  }

  getFotoCiudad(nombreCiudad: string): string {
    // 1. Buscamos la ciudad en los datos de GitHub
    const ciudadEncontrada = this.infoDestinos.find(
      c => c.nombre.toLowerCase() === nombreCiudad.toLowerCase()
    );
    
    // 2. Si la encuentra, usamos el campo "imagen" 
    if (ciudadEncontrada && ciudadEncontrada.imagen) {
      return ciudadEncontrada.imagen;
    }
    
    // 3. Si no la encuentra, ponemos una de maletas por defecto
    return 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400';
  }

  obtenerListaCiudades(): string[] {
    // 1. Verificamos que hayamos bajado los datos del JSON
    if (this.infoDestinos && this.infoDestinos.length > 0) {
      // 2. Extraemos SOLO el nombre de cada ciudad
      // Esto convertirá la lista de objetos en una lista de textos ["Madrid", "Tokio", ...]
      return this.infoDestinos.map(destino => destino.nombre);
    }
  
    // 3. Plan B por si el JSON tarda en cargar (una lista vacía o de reserva)
    return ['Madrid', 'Tokio', 'París', 'Londres', 'Roma', 'Nueva York'];
  } 

  // Nueva función para usar en la pantalla de detalles
  getDatosDetalle(nombreCiudad: string) {
    return this.infoDestinos.find(c => c.nombre.toLowerCase() === nombreCiudad.toLowerCase());
  }

  // Retorna todos los viajes guardados
  obtenerTodosLosViajes() { 
    return this.listaViajes; 
  }

  // Añade un viaje y lo guarda en el disco (localStorage)
  agregarViaje(v: ViajeUsuario) { 
    this.listaViajes.push(v); 
    this.guardarEnMemoria(); 
  }

  // Borra un viaje y actualiza la memoria
  borrarViaje(id: string) {
    this.listaViajes = this.listaViajes.filter(v => v.id !== id);
    this.guardarEnMemoria();
  }

  // --- LÓGICA DE PERSISTENCIA ---

  private guardarEnMemoria() {
    localStorage.setItem('mis_viajes', JSON.stringify(this.listaViajes));
  }

  private cargarDeMemoria() {
    const data = localStorage.getItem('mis_viajes');
    if (data) this.listaViajes = JSON.parse(data);
  }

}