import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:3000',
    headers:
    {
        "Content-Type":'application/json',
    },
})

// SEND TOKEN BY DEFAULT TO ALL REQUESTS

instance.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem('auth_token')
    if(token)
        config.headers["Authorization"] = `Bearer ${token}`
    return config
})

export default instance