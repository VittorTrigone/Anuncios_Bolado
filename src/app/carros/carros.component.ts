import { Component } from '@angular/core';
import { Carro } from '../carro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosService } from '../dados.service';

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

  valor: string = '';

  formatarValor(event: any) {
    let valorDigitado = event.target.value;
    valorDigitado = valorDigitado.replace(/\D/g, '');

    if (valorDigitado.length === 0) {
      event.target.value = '';
      this.valor = '';
      return;
    }

    let valorFormatado = '';
    if (valorDigitado.length < 3) {
      valorFormatado = `R$ ${valorDigitado.padStart(2, '0')}`;
    } else {
      const centavos = valorDigitado.slice(-2).padStart(2, '0');
      const reais = valorDigitado.slice(0, -2).replace(/^0+/, '');

      let partesReais = '';
      for (let i = reais.length - 1; i >= 0; i--) {
        partesReais = reais[i] + partesReais;
        if ((reais.length - i) % 3 === 0 && i !== 0) {
          partesReais = '.' + partesReais;
        }
      }

      valorFormatado = `R$ ${partesReais},${centavos}`;
    }

    event.target.value = valorFormatado;
    this.valor = valorFormatado;
  }

  checkboxClicked() {
    if (!this.mostrarInput) {
      this.mostrarInput = true;
    } else {
      this.mostrarInput = false;
    }
  }

  constructor(
    private dadosService: DadosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formGroupCarro = formBuilder.group({
      id: [''],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(20)]],
      preco: ['', [Validators.required]],
      validade: ['', [Validators.required]],
      img: ['', Validators.required],
      status: ['', [Validators.required]]
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
      size: 'xl', // Defina o tamanho desejado, por exemplo, 'xl' para extra large
      backdrop: 'static' // Evita que o modal seja fechado ao clicar fora dele
    });
  }


  get titulo(): any {
    return this.formGroupCarro.get("titulo")
  }
  get descricao(): any {
    return this.formGroupCarro.get("descricao")
  }
  get preco(): any {
    return this.formGroupCarro.get("preco")
  }
  get validade(): any {
    return this.formGroupCarro.get("validade")
  }
  get img(): any {
    return this.formGroupCarro.get("img")
  }
  get status(): any {
    return this.formGroupCarro.get("status")
  }

  fecharModal() {
    this.modalService.dismissAll();
    this.formGroupCarro.reset();
    this.formGroupCarro.get('estado')?.setValue(''); // Define o valor do campo "estado" como vazio
    this.submitted = false;
    this.isEditing = false;
  }
}
