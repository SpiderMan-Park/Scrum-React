import request from '../util/http'

export const getProjectListService = () => {
    return request.get('/api/projects')
}
export const getProjectService = (id) => {
    return request.get(`/api/project/${id}`)
}
export const updateProjectService = (id, data) => {
    return request.put(`/api/projects/${id}/kanban`, data)
}
// 下拉框数据
export const getUsersService = () => {
    return request.get('/api/users')
}
export const getOrgsService = () => {
    return request.get('/api/organization')
}
export const getTaskTypeService = () => {
    return request.get('/api/task/type_list')
}
export const searchProjectService = (id) => {
    return request.get(`/api/project/${id}`)
}