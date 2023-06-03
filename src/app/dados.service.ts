import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Carro } from './carro';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  url = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getCarro(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.url}/carros`);
  }

  saveCar(carro: Carro): Observable<Carro>{
    return this.http.post<Carro>(`${this.url}/carros`, carro);
  }

  updateCar(carro: Carro): Observable<void>{
    return this.http.put<void>(`${this.url}/carros/${carro.id}`, carro);
  }

  deleteCar(carro: Carro): Observable<void>{
    return this.http.delete<void>(`${this.url}/carros/${carro.id}`);
  }
}