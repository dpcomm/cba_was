export interface requestLoginUserDto {
  userId: string,
  password: string | Buffer,
  autoLogin: boolean,
}

export interface requestRegisterUserDto {
  userId: string,
  password: string,
  name: string,
  affiliation: string,
  phoneNumber: string,
  birthDate: string,
  gender: string,
}