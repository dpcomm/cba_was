class UserService {
  async getUser(userDTO: any) {
    try {


      return ({
        ok: 1,
        message: "success",
      })
    } catch(err) {
      throw err;
    }
  }
}

export default UserService;