import { custimAxios } from "../configs/axios.config";

export const regionUtils = {
    getRegion: async () => {
        const {data} = await custimAxios.get('/region', {
            headers: {
                language: localStorage.getItem('language') || 'uz' 
            }
        })
        return data;
    },
    postRegion: async (name) => {
        const {data} = await custimAxios.post('/region/add', name)
        return data
    },
    patchRegion: async ({id, name}) => {
        const {data} = await custimAxios.patch(`region/edit/${id}`, name)
        return data 
    },
    deleteRegion: async (id) => {
        const {data} = await custimAxios.delete(`/region/delete/${id}`)
        return data
    }
}