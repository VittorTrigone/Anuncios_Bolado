import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dinheiroMask'
})
export class DinheiroMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const numero = value.replace(/\D/g, '');
    const centavos = numero.slice(-2).padStart(2, '0');
    const reais = numero.slice(0, -2).replace(/^0+/, '');

    let partesReais = '';
    for (let i = reais.length - 1; i >= 0; i--) {
      partesReais = reais[i] + partesReais;
      if ((reais.length - i) % 3 === 0 && i !== 0) {
        partesReais = '.' + partesReais;
      }
    }

    return `R$ ${partesReais},${centavos}`;
  }
}
