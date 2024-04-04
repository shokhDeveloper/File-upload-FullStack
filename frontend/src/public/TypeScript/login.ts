const elLoginForm = document.querySelector(".js-form") as HTMLFormElement;
const handleSubLogin = async (evt:SubmitEvent):Promise<void> => {
    evt.preventDefault();
    const formDataLogin = new FormData(evt.target as HTMLFormElement);
    const userLogin:User = {
        email: formDataLogin.get("email") as string,
        password: formDataLogin.get("password") as string 
    }
    const typeLogin: boolean  = Object.keys(userLogin).every(key => userLogin[key] !== null)
    if(typeLogin){
        let response:RegisterResponse = await request("/auth/login", "POST", undefined, userLogin) as RegisterResponse;
        if(response.accessToken){
            window.localStorage.setItem("file-upload-token", response.accessToken)
            window.localStorage.setItem("file-upload-user", JSON.stringify(response.user))
            window.location.replace("/")
        }
    }
}
elLoginForm.addEventListener("submit", handleSubLogin)