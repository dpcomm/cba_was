export interface requestLoginUserDto {
  userId: string,
  password: string | Buffer,
  autoLogin: boolean,
}

export interface requestLogoutUserDto {
  id: number
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

export interface requestRefreshAccessTokenDto {
  accessToken: string,
  refreshToken: string,
}