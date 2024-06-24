export interface requestSurveyResponseDto {
    userId: string,
    idn: string, //주민등록번호
    surveyData: string, //JSON type 변환은 JSON.parse를 통해
    attended: Boolean,
    feePaid: Boolean,
    retreatId: number
  }