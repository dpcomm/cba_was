export interface requestRegistTokenDto {
    userId: number,
    token: string,
}

export interface requestDeleteTokenDto {
    token: string,
}

export interface requestRefreshTokenDto {
    userId: number,
    oldToken: string,
    newToken: string,
}