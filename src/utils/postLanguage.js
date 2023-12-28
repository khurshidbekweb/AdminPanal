import { custimAxios } from "../configs/axios.config"

export  const postLanguage = async ({code, title}) =>{
    const {data} = await custimAxios.post('/language', {
        code,
        title
    })
    return data;
}