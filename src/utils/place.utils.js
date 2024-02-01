import  custimAxios from "../configs/axios.config"

export const placeUtils = {
    getPlace: async () => {
        const {data} = await custimAxios.get('place', {
            headers: {
                "accept-language": localStorage.getItem('language')
            }
        })
        return data
    },
    postPalce: async({image, name, regionId}) => {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("name", name)
        formData.append("regionId", regionId)
        const {data} = await custimAxios.post('place/add', formData)
        return data
    },
    patchPlace: async({id, image, name}) => {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("name", name)

        console.log(formData.get("name"))
        const {data} = await custimAxios.patch(`place/edit/${id}`, formData)
        return data
    },
    deletePlace: async (id) => {
        const {data} = await custimAxios.delete(`place/delete/${id}`)
        return data
    }
}