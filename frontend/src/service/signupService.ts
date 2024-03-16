import { AxiosInstance } from "./axiosInstance";

export class SignupService {

    signup(name: string, email: string, password: string) {
        return AxiosInstance.post('/signup',{ name: name, email: email, password: password })
    }

}