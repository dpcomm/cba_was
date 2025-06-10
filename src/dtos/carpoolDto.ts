export interface CreateCarpoolDto {
  driverId: number;
  origin: string;
  originDetailed: string;
  destination: string;
  seatsTotal: number;
  note: string;
}

export interface UpdateCarpoolDto extends Partial<CreateCarpoolDto> {
  seatsLeft: number;
  isArrived: boolean;
}