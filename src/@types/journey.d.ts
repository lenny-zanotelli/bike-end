export interface Journey {
  isFavorite: boolean;
  departure_date_time: string;
  duration: number;
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
  nb_transfers: number;
  queryUrl: string;
}
