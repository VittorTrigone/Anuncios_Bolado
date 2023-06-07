import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarrosComponent } from './carros/carros.component';
import { AppRoutingModule } from './app-routing.module';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { NgxMaskModule } from "ngx-mask";
import { CommonModule } from '@angular/common';

import { DinheiroMaskPipe } from './carros/dinheiro-mask.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarrosComponent,
    PaginaInicialComponent,
    CabecalhoComponent, DinheiroMaskPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
