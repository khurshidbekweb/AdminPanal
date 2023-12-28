import { custimAxios } from "../configs/axios.config"


export const patchLAnguage = async (id) => {
    const {data} = custimAxios.patch(`language/${id}`)

    return data
}