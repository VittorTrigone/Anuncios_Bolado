import { Component } from '@angular/core';
import { Carro } from '../carro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosService } from '../dados.service';

import { CnpjMaskPipe } from './cnpj-mask.pipe';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent {

  carros: Carro[] = [];
  isEditing: boolean = false;
  formGroupCarro: FormGroup;
  submitted: boolean = false;
  mostrarInput = false;

  checkboxClicked() {
    if (!this.mostrarInput) {
      this.mostrarInput = true;
    } else {
      this.mostrarInput = false;
    }
  }

  telefoneMask = '(00) 0 0000-0000';
  cnpjMask = '00.000.000/0000-00';

  constructor(
    private dadosService: DadosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
    ) {
    this.formGroupCarro = formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      endereco: ['', Validators.required],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      tForn: ['', [Validators.required]],
      termo: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadCarros();
  }

  loadCarros() {
    this.dadosService.getCarro().subscribe(
      {
        next: data => this.carros = data
      }
    );
  }

  save() {
    this.submitted = true;

    if (this.formGroupCarro.valid) {
      if (this.isEditing) {
        this.dadosService.updateCar(this.formGroupCarro.value).subscribe(
          {
            next: () => {
              this.loadCarros();
              this.modalService.dismissAll();
              this.formGroupCarro.reset();
              this.formGroupCarro.get('estado')?.setValue('');
              this.isEditing = false;
              this.submitted = false;
            }
          }
        )
      }
      else {
        this.dadosService.saveCar(this.formGroupCarro.value).subscribe(
          {
            next: data => {
              this.carros.push(data);
              this.modalService.dismissAll();
              this.formGroupCarro.reset();
              this.formGroupCarro.get('estado')?.setValue('');
              this.submitted = false;
            }
          }
        )
      }
    }
  }

  edit(carro: Carro) {
    this.formGroupCarro.setValue(carro);
    this.isEditing = true;
  }

  delete(carro: Carro) {
    this.dadosService.deleteCar(carro).subscribe({
      next: () => this.loadCarros()
    })
  }

  open(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'xl' // Defina o tamanho desejado, por exemplo, 'xl' para extra large
    });
  }

  get name(): any {
    return this.formGroupCarro.get("name")
  }
  get email(): any {
    return this.formGroupCarro.get("email")
  }
  get cnpj(): any {
    return this.formGroupCarro.get("cnpj")
  }
  get telefone(): any {
    return this.formGroupCarro.get("telefone")
  }
  get endereco(): any {
    return this.formGroupCarro.get("endereco")
  }
  get estado(): any {
    return this.formGroupCarro.get("estado")
  }
  get cidade(): any {
    return this.formGroupCarro.get("cidade")
  }
  get tForn(): any {
    return this.formGroupCarro.get("tForn")
  }
  get termo(): any {
    return this.formGroupCarro.get("termo")
  }

  fecharModal() {
    this.modalService.dismissAll();
    this.formGroupCarro.reset();
    this.formGroupCarro.get('estado')?.setValue(''); // Define o valor do campo "estado" como vazio
    this.submitted = false;
  }
}
