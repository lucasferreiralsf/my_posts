import { logout } from "./auth";

export interface CustomError {
  status: number;
  errorMessage: string;
  error?: any;
}

export class CustomError {
  status: number;
  errorMessage: string;
  error?: any;

  constructor(response: Response, message?: string) {
    switch (response.status) {
      case 401:
        this.status = response.status;
        this.errorMessage = "Sua sessão expirou, entre novamente.";
        response.json().then(res => {
          this.error = res;
        });
        logout();
        break;
      case 404:
        this.status = response.status;
        this.errorMessage = "Registro não encontrado.";
        response.json().then(res => {
          this.error = res;
        });
        logout();
        break;

      default:
        this.status = response.status;
        this.errorMessage = "Erro interno, tente novamente mais tarde.";
        response.json().then(res => {
          this.error = res;
        });
        break;
    }
  }
}
