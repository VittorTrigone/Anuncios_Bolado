import { Component, OnInit } from '@angular/core';
import { Carro } from '../carro';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})

export class PaginaInicialComponent implements OnInit{
  carros: Carro[] = [];

  constructor(private dadosService: DadosService){}


  ngOnInit(): void {
    this.loadCarros();
  }

  loadCarros() {
    this.dadosService.getCarro().subscribe({
      next: (data) => (this.carros = data),
    });
  }
}