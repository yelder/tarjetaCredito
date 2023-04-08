import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { TarjetaCredito } from '../models/tarjeta';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  private tarjeta$ = new Subject<any>();

  constructor(private firebase: AngularFirestore) {}

  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any> {
    return this.firebase.collection('Tarjetas').add(tarjeta);
  }

  listarTarjetas(): Observable<any> {
    return this.firebase
      .collection('Tarjetas', (ref) => ref.orderBy('fechaCreacion', 'asc'))
      .snapshotChanges();
  }

  eliminarTarjeta(id: string): Promise<any> {
    return this.firebase.collection('Tarjetas').doc(id).delete();
  }

  addTarjetaEdit(tarjeta: TarjetaCredito) {
    this.tarjeta$.next(tarjeta);
  }

  getTarjeta(): Observable<TarjetaCredito> {
    return this.tarjeta$.asObservable();
  }

  editarTarjeta(id: string, tarjeta: any): Promise<any> {
    return this.firebase.collection('Tarjetas').doc(id).update(tarjeta);
  }
}
