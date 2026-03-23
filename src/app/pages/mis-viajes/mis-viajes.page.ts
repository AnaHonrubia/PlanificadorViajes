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
    addIcons({ airplaneOutline, mapOutline, trashOutline, add, moonOutline, sunnyOutline });
  }

  ngOnInit() {
    const preferencia = localStorage.getItem('modo-oscuro');
    this.modoOscuro = preferencia ? preferencia === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', this.modoOscuro);
  }

  ionViewWillEnter() {
    this.listaDeMisViajes = this.servicio.obtenerTodosLosViajes();
  }

  toggleDarkMode() {
    this.modoOscuro = !this.modoOscuro;
    document.documentElement.classList.toggle('dark', this.modoOscuro);
    localStorage.setItem('modo-oscuro', this.modoOscuro.toString());
  }

  borrarUnViaje(id: string) {
    this.servicio.borrarViaje(id);
    this.listaDeMisViajes = this.servicio.obtenerTodosLosViajes();
  }

}