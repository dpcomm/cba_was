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
  birth: Date,
  gender: string,
  rank: string,
  etcGroup?: string
}

export interface requestRefreshAccessTokenDto {
  accessToken: string,
  refreshToken: string,
}

export interface requestAuthCheckDto {
  accessToken: string,
}
export interface updateUserDto {
  userId: string,
  // password: string,
  name: string,
  group: string,
  phone: string,
  birth: Date,
  gender: string,

}

export interface checkUserDto {
  userId: string,
  password?: string,
  name: string,
  gender: string,
  phone: string,
  group: string,
  birth: string,
}

export interface resetPasswordDto {
  userId: string,
  password: string,
}