import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
});


export class SignupService {

    signup(name: string, email: string, password: string) {
        return axiosInstance.post('/signup',{ name: name, email: email, password: password })
    }

}