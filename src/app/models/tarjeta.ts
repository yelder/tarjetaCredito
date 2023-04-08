export class TarjetaCredito {
  id?: string;
  titular: string;
  numeroDeTarjeta: string;
  cvv: number;
  fechaExpiracion: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(titular: string, numeroDeTarjeta: string, cvv: number) {
    this.titular = titular;
    this.numeroDeTarjeta = numeroDeTarjeta;
    this.cvv = cvv;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
    this.fechaExpiracion = new Date();
  }
}
