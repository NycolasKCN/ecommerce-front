import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcommerceFormService {
  constructor() {}

  getCreditCardMonths(): Observable<number[]> {
    let monthNumbers: number[] = [];

    for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
      monthNumbers.push(monthNumber);
    }

    return of(monthNumbers);
  }

  getCreditCardYears(): Observable<number[]> {
    let years: number[] = [];
    const startYear: number = new Date().getFullYear() - 3;
    const endYear: number = startYear + 23;

    for (let year = startYear; year < endYear; year++) {
      years.push(year);
    }

    return of(years);
  }
}
