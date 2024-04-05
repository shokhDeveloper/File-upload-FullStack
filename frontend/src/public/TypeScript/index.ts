
const token:string | null = window.localStorage.getItem("file-upload-token")
const mainUser:User | null = JSON.parse(window.localStorage.getItem("file-upload-user")!) 
const elFormFile = document.querySelector(".js-form") as HTMLFormElement;
const elFileInput = document.querySelector(".js-file-input") as HTMLInputElement;
const elUserTemp = (document.querySelector(".js-user-temp") as HTMLTemplateElement).content;
const elFileTemp = (document.querySelector(".js-file-temp") as HTMLTemplateElement).content;
const elList = document.querySelector(".js-files-inner-list") as HTMLUListElement;
const elUserList = document.querySelector(".js-user-list") as HTMLUListElement;
const handleGetData = async ():Promise<void> => {
    const files:FileType[] = await request("/files", "GET", token) as FileType[]
    handleRenderData(files)
}
const handleGetUser = async ():Promise<void> => {
    const users:User[] = await request("/users", "GET", token) as User[]
    handleRenderUser(users)
}
const handleGetImage = async (arr:FileType[]):Promise<Blob[]> => {
    let result = await Promise.all(
        arr.map(({file}) => {
            return(
                fetch(BECKEND_SERVER + "/getFile/" + file, {
                    method: "GET",
                    headers:{
                        token: token || ""
                    }
                } ).then(res => {
                    return res.blob()
                })
            )
        })
    )
    return result
}
async function handleRenderData (arr:FileType[]):Promise<void> {
    const fileDocFragment = document.createDocumentFragment();
    elList.innerHTML = ''
    let images = await handleGetImage(arr);
    for(let i = 0; i<arr.length; i++){
        let clone = elFileTemp.cloneNode(true) as DocumentFragment;
        (clone.querySelector(".js-image") as HTMLImageElement).src = URL.createObjectURL(images[i]) ;
        (clone.querySelector(".js-desc") as HTMLParagraphElement).textContent = arr[i].fileName;
        const elLink = (clone.querySelector(".js-link") as HTMLLinkElement)
        elLink.href = BECKEND_SERVER + `/download/${arr[i].file}`
        elLink.dataset.id = arr[i].file
        fileDocFragment.append(clone)
    }   
    elList.append(fileDocFragment)
}
const handleRenderUser = (arr:User[]):void => {
    const userDocFragment = document.createDocumentFragment();
    for (const user of arr) {
        const clone = elUserTemp.cloneNode(true) as DocumentFragment;
        const elUserLink = (clone.querySelector(".js-user-link") as HTMLLinkElement)
        elUserLink.dataset.id = user.userId as string
        elUserLink.textContent = user.name as string
        userDocFragment.append(clone);
    }
    elUserList.append(userDocFragment)
}
const handleIncludeToken = ():void => {
    if(!token){
        window.location.replace("/login")
    }
}
const handleSubFile = async (evt:SubmitEvent):Promise<void> => {
    evt.preventDefault();
    const fileFormData = new FormData(evt.target as HTMLFormElement);
    fileFormData.append("fileName", fileFormData.get("file-name") as string);
    fileFormData.append("file", elFileInput.files?.item(0) as File);
    fileFormData.append("userId", mainUser?.userId as string);

    if(fileFormData){
        const req = await fetch(BECKEND_SERVER + "/files", {
            method: "POST",
            headers: {
                "token": token as string
            },
            body: fileFormData
        })
        await req.json();
        handleGetData();
    }
}
const handleClick = async (evt:Event):Promise<void> => {
    const elTarget = evt.target as HTMLElement
    const id = elTarget.dataset.id;
    if(elTarget.matches(".js-user-link")){
    let files = await request(`/files/${id}`, "GET", token);
        handleRenderData(files)
}

      
}
elUserList.addEventListener("click", handleClick)
elList.addEventListener("click", handleClick)
elFormFile.addEventListener("submit", handleSubFile)
handleIncludeToken()
handleGetData()
handleGetUser()