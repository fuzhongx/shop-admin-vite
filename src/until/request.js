import axios from 'axios'

const service = axios.create({
    baseURL:"/api"
})


// 请求拦截器
service.interceptors.request.use(config => {

    return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {

    return response.data.data
}, error => {
    Promise.reject(error)
})

export default service