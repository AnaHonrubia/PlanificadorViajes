import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, 
  IonCardContent, IonButton, IonIcon, IonFab, IonFabButton, IonButtons 
} from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons'; 
import { moonOutline, sunnyOutline, airplaneOutline, mapOutline, trashOutline, add } from 'ionicons/icons';
import { GestorViajesService } from '../../services/gestor-viajes';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, 
    IonCardContent, IonButton, IonIcon, IonFab, IonFabButton, IonButtons
  ]
})
export class MisViajesPage implements OnInit {
  private servicio = inject(GestorViajesService);
  listaDeMisViajes: any[] = [];
  modoOscuro = false;

  constructor() {
    // Registramos los iconos necesarios
    addIcons({ airplaneOutline, mapOutline, trashOutline, add, moonOutline, sunnyOutline });
  }

  ngOnInit() {
    // Sincronizamos el estado inicial del modo oscuro
    this.modoOscuro = document.documentElement.classList.contains('dark');
  }

  ionViewWillEnter() {
    this.listaDeMisViajes = this.servicio.obtenerTodosLosViajes();
  }

  toggleDarkMode() {
    this.modoOscuro = !this.modoOscuro;
    // 'dark' es la clase que configuramos en variables.scss
    document.documentElement.classList.toggle('dark', this.modoOscuro);
  }

  borrarUnViaje(id: string) {
    this.servicio.borrarViaje(id);
    this.listaDeMisViajes = this.servicio.obtenerTodosLosViajes();
  }
}