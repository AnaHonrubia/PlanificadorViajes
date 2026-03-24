import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
  IonInput, IonSelect, IonSelectOption, IonButton, IonDatetime, 
  IonDatetimeButton, IonModal, IonButtons, IonBackButton 
} from '@ionic/angular/standalone';
import { GestorViajesService } from '../../services/gestor-viajes';
import { ViajeUsuario } from '../../models/viaje';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'], // Asegúrate de que esta línea esté
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, 
    IonDatetime, IonDatetimeButton, IonModal, IonButtons, IonBackButton
  ]
})
export class CrearViajePage implements OnInit {
  private servicio = inject(GestorViajesService);
  private router = inject(Router);

  nombreViaje: string = '';
  ciudadDestino: string = '';
  presupuesto: number = 0;
  ciudades: string[] = [];
  
  // Variables de fecha
  hoyDate: Date = new Date();
  fechaMinima: string = new Date().toISOString();
  fechaMaxima: string = new Date(this.hoyDate.getFullYear() + 2, 11, 31).toISOString();
  
  // IMPORTANTE: Inicializar como array vacío para que no bloquee la carga
  fechaSeleccionada: string[] = []; 
  listaCiudades: string[] = [];

  ngOnInit() {
    this.listaCiudades = this.servicio.obtenerListaCiudades();
  }

  guardarViaje() {
    // Validamos que haya al menos 2 fechas
    if (!this.nombreViaje || !this.ciudadDestino || !this.fechaSeleccionada || this.fechaSeleccionada.length < 2) {
      alert('Por favor, rellena todo y elige al menos 2 fechas (ida y vuelta).');
      return;
    }

    const fechasOrdenadas = [...this.fechaSeleccionada].sort();

    const nuevoViaje: ViajeUsuario = {
      id: Date.now().toString(),
      nombreViaje: this.nombreViaje,
      ciudadDestino: this.ciudadDestino,
      presupuesto: +this.presupuesto, // + para convertir a número
      presupuestoRestante: +this.presupuesto, // + para convertir a número
      fechaInicio: fechasOrdenadas[0],
      fechaFin: fechasOrdenadas[fechasOrdenadas.length - 1],
      lugares: []
    };

    this.servicio.agregarViaje(nuevoViaje);
    this.router.navigate(['/mis-viajes']);
  }
}