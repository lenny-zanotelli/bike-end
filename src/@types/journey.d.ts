export interface Journey {
  to_id: string;
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
  comment: string | null;
}
