 interface Login { 
  email: string;
  password: string;
}

interface LoginResponse {
    message: string;
    name: string;
    token: string;
    email: string;
    _id: string;
  }

export { Login, LoginResponse }