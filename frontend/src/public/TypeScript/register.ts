const elFormRegister = document.querySelector(".js-form") as HTMLFormElement;
const handleSub = async (evt:SubmitEvent):Promise<void> => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const user:User = {
        name: formData.get("name") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        birthDate: formData.get("birth-date") as string
    }
    const type: boolean  = Object.keys(user).every(key => user[key] !== null)
    if(type){
        let response:RegisterResponse = await request("/auth/register", "POST", undefined, user) as RegisterResponse;
        if(response.accessToken){
            window.localStorage.setItem("file-upload-token", response.accessToken)
            window.localStorage.setItem("file-upload-user", JSON.stringify(response.user))
            window.location.replace("/")
        }
    }
}
elFormRegister.addEventListener("submit", handleSub)