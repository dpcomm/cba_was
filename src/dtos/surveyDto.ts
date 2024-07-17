export interface requestApplicationDto {
    userId: string,
    transfer: string,
    meal:number[][], //JSON type 변환은 JSON.parse를 통해
    bus?: number[],
    carId?: string
}


export interface SurveyFormatDto {
    userId: string,
    surveyData: string, //JSON type 변환은 JSON.parse를 통해
    attended: boolean,
    feePaid: boolean,
    retreatId: number
}

export interface requestApplicationResponseDto {
  userId: string,
}

export interface EditApplicationAttendedAndFeePaidDtoType {
  id: number,
  attended: boolean,
  feePaid: boolean,
}