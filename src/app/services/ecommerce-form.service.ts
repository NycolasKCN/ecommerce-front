import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EcommerceFormService {
  private countriesUrl: string = 'http://localhost:8080/v1/api/countries';
  private statesUrl: string = 'http://localhost:8080/v1/api/states';

  constructor(private httpClient: HttpClient) {}

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

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response.content));
  }

  getStates(countryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient
      .get<GetResponseStates>(searchStatesUrl)
      .pipe(map((response) => response.content));
  }
}

interface GetResponseCountries {
  content: Country[];
}

interface GetResponseStates {
  content: State[];
}
