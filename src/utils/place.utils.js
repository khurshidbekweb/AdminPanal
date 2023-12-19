import { custimAxios } from "../configs/axios.config"

export const placeUtils = {
    getPlace: async () => {
        const {data} = await custimAxios.get('/place', {
            headers: {
                language: localStorage.getItem('language') || 'uz'
            }
        })
        return data
    },
    postPalce: async({image, name, regionId}) => {
        const {data} = await custimAxios.post('/place/add', {
            image: image,
            name: name,
            regionId: regionId
        })
        return data
    },
    patchPlace: async({id, image, name}) => {
        const {data} = await custimAxios.patch(`/place/edit/${id}`, {
            image: image,
            name: name
        })
        return data
    },
    deletePlace: async (id) => {
        const {data} = await custimAxios.delete(`/place/delete/${id}`)
        return data
    }
}