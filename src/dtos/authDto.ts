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
  group: string,
  phone: string,
  birth: string,
  gender: string,
}

export interface requestRefreshAccessTokenDto {
  accessToken: string,
  refreshToken: string,
}

export interface requestAuthCheckDto {
  accessToken: string,
}