import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe',
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    const h = Math.floor(value / (1000 * 60 * 60));
    const m = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((value % (1000 * 60)) / 1000);
    return `${this.format(h)}:${this.format(m)}:${this.format(s)}`;
  }

  private format(n: number): string {
    return n < 10 ? '0' + n : n + '';
  }
}
