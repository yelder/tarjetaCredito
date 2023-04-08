import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjeta';
import { TarjetaService } from 'src/app/service/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css'],
})
export class ListarTarjetaComponent implements OnInit {
  constructor(
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) {}
  listaTarjetas: TarjetaCredito[] = [];

  ngOnInit(): void {
    this.listarTarjetas();
  }

  listarTarjetas() {
    this._tarjetaService.listarTarjetas().subscribe((res) => {
      this.listaTarjetas = [];
      console.log(res);
      res.forEach((element: any) => {
        this.listaTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.listaTarjetas);
    });
  }

  eliminarTarjeta(id: any) {
    this._tarjetaService.eliminarTarjeta(id).then(
      () => {
        this.toastr.error(
          'Tarjeta Eliminada correctamente',
          'Tarjeta Eliminada'
        );
      },
      (error) => {
        this.toastr.error('Tarjeta No fue eliminada correctamente', 'Error');
      }
    );
  }

  editarTarjeta(tarjeta: TarjetaCredito) {
    this._tarjetaService.addTarjetaEdit(tarjeta);
  }
}
