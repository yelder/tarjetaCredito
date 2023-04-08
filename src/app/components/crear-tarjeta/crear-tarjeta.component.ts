import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjeta';
import { TarjetaService } from 'src/app/service/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css'],
})
export class CrearTarjetaComponent implements OnInit {
  forms: FormGroup;
  loading: boolean = false;
  titulo = 'Agregar Tarjeta';
  id: string | undefined;
  constructor(
    private fb: FormBuilder,
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) {
    this.forms = this.fb.group({
      titular: ['', Validators.required],
      nroTarjeta: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this._tarjetaService.getTarjeta().subscribe((res) => {
      this.titulo = 'Editar Tarjeta';
      this.id = res.id;
      this.forms.patchValue({
        titular: res.titular,
        nroTarjeta: res.numeroDeTarjeta,
        fechaExpiracion: res.fechaExpiracion,
        cvv: res.cvv,
      });
      console.log(res);
    });
  }

  guardarTarjeta() {
    if (this.id === undefined) {
      this.crearTarjeta();
    } else {
      this.editarTarjeta(this.id);
    }
  }

  editarTarjeta(id: string) {
    const TARJETA: any = {
      titular: this.forms.value.titular,
      numeroDeTarjeta: this.forms.value.nroTarjeta,
      cvv: this.forms.value.cvv,
      fechaExpiracion: this.forms.value.fechaExpiracion,
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._tarjetaService.editarTarjeta(id, TARJETA).then(
      () => {
        this.loading = false;
        this.toastr.info(
          'El registo fue actualizado correctamente',
          'Registro Actualizado'
        );
        this.forms.reset();
        this.titulo = 'Agregar Tarjeta';
        this.id = undefined;
      },
      (error) => {
        this.toastr.error('Error en la actualización', 'Error');
      }
    );
  }
  crearTarjeta() {
    console.log(this.forms);
    const TARJETA: TarjetaCredito = {
      titular: this.forms.value.titular,
      numeroDeTarjeta: this.forms.value.nroTarjeta,
      cvv: this.forms.value.cvv,
      fechaExpiracion: this.forms.value.fechaExpiracion,
      fechaActualizacion: new Date(),
      fechaCreacion: new Date(),
    };
    this.loading = true;
    this._tarjetaService.guardarTarjeta(TARJETA).then(
      () => {
        this.loading = false;
        this.toastr.success(
          'Tarjeta registrada correctamente',
          'Targeta Registrada'
        );
        this.forms.reset();
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.toastr.error('Error en el registro de la Tarjeta', 'Error');
      }
    );
  }
}
