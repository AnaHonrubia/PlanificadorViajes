import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonList, IonItem, 
  IonThumbnail, IonLabel, IonNote, IonBadge, IonButton, IonIcon, IonProgressBar, AlertController,
  IonSpinner
} from '@ionic/angular/standalone';
import { GestorViajesService } from '../../services/gestor-viajes';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, 
            IonList, IonItem, IonThumbnail, IonLabel, IonNote, IonBadge, IonButton, IonIcon, 
            IonProgressBar, IonSpinner
          ]
})
export class DetalleViajePage implements OnInit {
  private route = inject(ActivatedRoute);
  private servicio = inject(GestorViajesService);
  private alertCtrl = inject(AlertController);
  
  viajeId: string | null = null;
  datosViaje: any; 
  infoCiudad: any; 
  presupuestoInicial: number = 0; // Calcula la barra de progreso

  constructor() {
    addIcons({ cartOutline });
  }

  ngOnInit() {
    this.viajeId = this.route.snapshot.paramMap.get('id');
    
    if (this.viajeId) {
      // Buscamos el viaje guardado
      this.datosViaje = this.servicio.obtenerTodosLosViajes().find(v => v.id === this.viajeId);

      if (this.datosViaje) {
        // Guardamos el presupuesto con el que entramos para la barra
        this.presupuestoInicial = this.datosViaje.presupuesto;
        this.infoCiudad = this.servicio.getDatosDetalle(this.datosViaje.ciudadDestino);
      }
    }
  }

  // Método que lanza la alerta
  async confirmarReserva(sitio: any){
    const alert =  await this.alertCtrl.create({
      header: 'Confirmar reserva',
      subHeader: sitio.nombre,
      message: `Se descontarán ${sitio.precio}€ de tu presupuesto. ¿Confirmar?`,
      buttons: [
        {
         text: 'Cancelar', 
         role: 'cancel'
        }, 
        {
          text: 'Aceptar',
          handler: () => { this.ejecutarReserva(sitio); }
        }
      ]
    });
    await alert.present;
  }

  //Resta el dinero de verdad
  ejecutarReserva(sitio: any){
    if(this.datosViaje.presupuesto >= sitio.precio){
      // Restamos el precio del monumento al presupuesto actual
      this.datosViaje.presupuesto -= sitio.precio;
      // Actualizamos en el servicio y memoria
      this.servicio.actualizarViaje(this.datosViaje);
      // Si tiene URL, la abrimos para poder reservar
      if(sitio.urlReserva) {
        window.open(sitio.urlReserva, '_blank');
      }
      console.log('Nuevo presupuesto: ', this.datosViaje.presupuesto);
    }else{
      this.mostrarErrorSinFondos();
    }
  }

  async mostrarErrorSinFondos(){
    const alert = await this.alertCtrl.create({
      header: 'Presupuesto insuficiente',
      message: 'No te queda suficiente dinero para esta actividad',
      buttons: ['OK']
    });
    await alert.present;
  }

  // Calculo para la barra de progreso 
  getPorcentajePresupuesto(){
    if(!this.datosViaje || this.presupuestoInicial === 0){
      return 0;
    }
    const porcentaje = this.datosViaje.presupuesto / this.presupuestoInicial;
    return porcentaje > 0 ? porcentaje: 0;
  }

}