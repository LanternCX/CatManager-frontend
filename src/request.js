import axios from 'axios'
import {getToken, removeToken} from './cookieManager'
import { Notification } from 'element-ui'
import {configLoader} from "@/main";

// create an axios instance
const service = axios.create({
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers.Authorization = 'Bearer ' + getToken()
        }
        config.baseURL = configLoader.baseUrl
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        if (response.status >= 300 || response.status < 200) {
            return Promise.reject(response)
        } else {
            return response.data
        }
    },
    error => {
        if (error.response.status === 403) {
            if (location.href.indexOf("/login") !== -1) {
                return
            }
            removeToken()
            location.reload();
        }
        Notification({
            title: error.response.data.msg.substring(0, error.response.data.msg.indexOf(',')),
            message: error.response.data.msg.substr(error.response.data.msg.indexOf(',') + 1),
            type: 'error'
        })
        return Promise.reject(error)
    }
)

export default service
