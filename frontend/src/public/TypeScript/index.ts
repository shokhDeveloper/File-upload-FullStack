
const token:string | null = window.localStorage.getItem("file-upload-token")
const mainUser:User | null = JSON.parse(window.localStorage.getItem("file-upload-user")!) 
const elFormFile = document.querySelector(".js-form") as HTMLFormElement;
const elFileInput = document.querySelector(".js-file-input") as HTMLInputElement;
const elFileTemp = (document.querySelector(".js-file-temp") as HTMLTemplateElement).content;
const elList = document.querySelector(".js-files-inner-list") as HTMLUListElement;
const handleGetData = async ():Promise<void> => {
    const files:FileType[] = await request("/files", "GET", token) as FileType[]
    handleRenderData(files)
}
function handleRenderData (arr:FileType[]):void {
    const fileDocFragment = document.createDocumentFragment();
    elList.innerHTML = ''
    for(let i = 0; i<arr.length; i++){
        let clone = elFileTemp.cloneNode(true) as DocumentFragment;
        (clone.querySelector(".js-image") as HTMLImageElement).src = (BECKEND_SERVER + "/getFile/" + arr[i].file) as string;
        (clone.querySelector(".js-desc") as HTMLParagraphElement).textContent = arr[i].fileName;
        (clone.querySelector(".js-link") as HTMLLinkElement).href = (BECKEND_SERVER + "/download/" + arr[i].file) as string;
        fileDocFragment.append(clone)
    }   
    elList.append(fileDocFragment)
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
        handleGetData()
    }
}
elFormFile.addEventListener("submit", handleSubFile)
handleIncludeToken()
handleGetData()