import axios, {AxiosRequestConfig} from "axios";

const $host = axios.create({
    baseURL:""
})

const $autHost = axios.create({
    baseURL:""
})

$autHost.interceptors.request.use( async (config:AxiosRequestConfig)=>{
    //@ts-ignore
    config.headers.authorization = ""
    return config
})

export {$host,$autHost}
