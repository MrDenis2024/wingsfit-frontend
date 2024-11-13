export interface GlobalError {
  error: string;
}

export interface IUser {
  _id: string;
  email: string;
  googleId: string;
  role: string;
  firstName: string;
  token: string;
  avatar: string | null;
}

export interface UserMutation {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
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

export interface UserInfoMutation {
  firstName: string;
  lastName: string;
  timezone: {
    value: string;
    label: string;
  };
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
}
