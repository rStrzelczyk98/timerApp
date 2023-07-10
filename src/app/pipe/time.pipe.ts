import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe',
})
export class TimePipe implements PipeTransform {
  transform(value: number | null): string {
    if (!value) return '00:00:00';
    const h = Math.floor(value / 60 ** 2);
    const m = Math.floor((value % 60 ** 2) / 60);
    const s = Math.floor(value % 60);
    return `${this.format(h)}:${this.format(m)}:${this.format(s)}`;
  }

  private format(n: number): string {
    return n < 10 ? '0' + n : n + '';
  }
}
