export interface CreateCarpoolDto {
  driverId: number;
  phone: string;
  carInfo: string;
  origin: string;
  originDetailed: string;
  destination: string;
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