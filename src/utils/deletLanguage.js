import { custimAxios } from "../configs/axios.config"


export const deletLanguage = async (id) => {
    const {data} = custimAxios.delete(`language/${id}`)

    return data
}