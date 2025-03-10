import { Country } from './country';
import { State } from './state';

export class Address {
  public city!: string;
  public street!: string;
  public zipCode!: string;
  public country!: Country;
  public state!: State;
}
