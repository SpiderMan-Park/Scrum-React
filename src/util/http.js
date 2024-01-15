import axios from 'axios'
import EventBus from './event'
// const baseURL = 'http://localhost:7001'

const instance = axios.create({
    timeout: 50000,
    // baseURL,
})

instance.interceptors.response.use((response) => {
    if (response.status === 200) {
        if (response.data.code === 401) {
            EventBus.emit('global_not_login', response.data.msg)
            return Promise.reject("没有登录状态")
        }
        if (response.data.code !== 0 && response.data.code !== 401) {
            EventBus.emit('global_error_tips', response.data.msg)
        }
    } else {
        EventBus.emit('global_error_tips', response.data.msg)
    }
    return response
}, (error) => {
    return Promise.reject(error)
})

// export { baseURL }
export default instance