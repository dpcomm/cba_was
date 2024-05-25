import { Request, Response } from 'express';
import AuthService from '../services/authService';

const authService = new AuthService();

const login = async (req: Request, res: Response) => {
  try {
    const userDTO = req.body;
    const loginData = await authService.login(userDTO);
    /* loginData.ok로 service 코드의 fulfilled를 분기합니다. */
    if (loginData.ok) {
      return res.status(200).json({
        message: "Authorize success",
        accessToken: loginData.accessToken,
        refreshToken: loginData?.refreshToken,
        user: loginData.user
      });
    }
    /* 예외적인 에러는 try문 최하단에 service message로 리턴합니다.(401) */
    /* 서비스에서 분기해줄 오류가 없는 경우 임의 에러 분기 코드를 작성하지 않아도 됩니다. */
    return res.status(401).json({
      message: loginData.message,
    })
  } catch (err) {
    /* 그 외 iternal error는 하단 에러로 처리합니다.(500) */
    /* 테스트코드 작성을 위해 하단 console.error를 작성합니다. */
    console.error("Login controller error:", err.message);
    return res.status(500).json({
      message: "Failed to login",
      err: err.message
    });
  }
}

export { login };