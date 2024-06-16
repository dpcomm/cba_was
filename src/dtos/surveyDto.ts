export interface requestSurveyResponseDto {
    userId: string,
    role: string, //users table role과 중복 colname
    breakfastDay1: boolean,
    lunchDay1:     boolean,
    dinnerDay1:    boolean,
    breakfastDay2: boolean,
    lunchDay2:     boolean,
    dinnerDay2:    boolean,
    breakfastDay3: boolean,
    lunchDay3:     boolean,
    transportType: string,
    carPlate?:      string,
    ssn:           string,
    insurance:     boolean
  }