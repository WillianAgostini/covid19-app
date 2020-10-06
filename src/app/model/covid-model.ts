export interface CovidModel {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

export interface Result {
  city: string;
  cityIbgeCode: string;
  confirmed: number;
  confirmedPer100KInhabitants: number;
  date: Date;
  deathRate: number;
  deaths: number;
  estimatedPopulation2019: number;
  isLast: boolean;
  orderForPlace: number;
  placeType: string;
  state: string;
}
