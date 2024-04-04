const BECKEND_SERVER = 'http://192.168.1.108:4000'
const BASE_METHODS:string[] = ["GET", "DELETE"]
const request = async (path:string, method: string, token?: string | null, body?:object ):Promise<RegisterResponse | FileType[] | void> => {
    const req = await fetch(BECKEND_SERVER + path , !BASE_METHODS.includes(method) ? {
        method, 
        headers: {
            "Content-type": "application/json",
            token: token || ""
        },
        body: JSON.stringify(body)
    }: {
        headers: {"Content-type": "application/json", token: token || ""}
    })
        const res = await req.json();
        console.log(res)
        return res
    
}