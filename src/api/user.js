import request from '../util/http'

export const userLoginService = ({ username, password }) => {
    return request.post('/api/login', {
        username,
        password
    })
}

export const userRegisterService = ({ username, password }) => {
    return request.post('/api/register', {
        username,
        password
    })
}

export const userLogoutService = () => {
    return request.post('/api/logout')
}
