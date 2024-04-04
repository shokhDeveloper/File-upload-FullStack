interface User {
    [key:string]: string | any;
    name?: string,
    lastname?: string,
    email: string,
    password: string,
    birthDate?: string,
    userId?: string | number
}   
interface RegisterResponse {
    accessToken: string,
    message: string,
    user: User
}
interface FileType {
    fileName: string,
    file: string,
    userId: string | number
}