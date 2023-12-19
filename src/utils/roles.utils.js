import { custimAxios } from "../configs/axios.config"

export const rolesUtils = {
    getRoles: async () => {
        const {data} = await custimAxios.get('role')
        return data
    },
    postRoles: async ({ name, permissions}) => {
        const {data} = await custimAxios.post('roles/add', {
            name: name,
            permissions: permissions
        })
        return data
    },
    patchRoles: async ({id, name, permissions}) => {
        const {data} = await custimAxios.patch(`/role/edit/${id}`, {
            name: name,
            permissions: permissions
        })
        return data
    },
    deleteRoles: async (id) => {
        const {data} = await custimAxios.delete(`/role/delete/${id}`)
        return data
    }
}