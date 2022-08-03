import axios from "axios"

const request = axios.create({
    baseURL: "/api",
    timeout: 5000
})
request.interceptors.request.use((req) => {
    // console.log(req);
    return req
})

request.interceptors.response.use((res) => {
    return res
})
export default request