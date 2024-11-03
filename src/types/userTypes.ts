export interface GlobalError {
  error: string;
}

export interface IUser {
  _id: string;
  email: string;
  googleId: string;
  role: string;
  token: string;
}

export interface UserMutation {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}
