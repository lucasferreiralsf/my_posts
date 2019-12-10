export enum SignUpTypes {
  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE"
}

export enum SignUpErrorTypes {
  TOKEN_EXPIRED = "TOKEN_EXPIRED"
}

export type SignUpPayload =  {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SignUpPayloadError = {
  errors?: {
    [index:string]: { value: string; msg: { message: string; status: number } };
  };
};

export interface Users {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  posts?: {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpState {
  readonly data: SignUpPayload & SignUpPayloadError;
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorType: SignUpErrorTypes;
}
