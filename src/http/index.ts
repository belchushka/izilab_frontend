import axios, {AxiosRequestConfig} from "axios";

const $host = axios.create({
    baseURL:"http://127.0.0.1:8000/"
})

const $autHost = axios.create({
    baseURL:""
})

$autHost.interceptors.request.use( async (config:AxiosRequestConfig)=>{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    config.headers.authorization = ""
    return config
})

export {$host,$autHost}
