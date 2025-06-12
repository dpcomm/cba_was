export interface CreateCarpoolDto {
  driverId: number;
  carInfo: string;
  departureTime: Date;
  origin: string;
  originDetailed?: string | null;
  destination: string;
  destinationDetailed?: string | null;
  seatsTotal: number;
  note: string;
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
}

export interface UpdateCarpoolDto extends Partial<CreateCarpoolDto> {
  seatsLeft: number;
  isArrived: boolean;
}
