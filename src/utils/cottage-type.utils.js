import { custimAxios } from "../configs/axios.config"

export const cottageTypeUtils = {
    getCottageType: async () => {
        const {data} = await custimAxios.get('/cottage-type', 
        {
            headers: {
                language: localStorage.getItem('language') || 'uz'
            }
        }
        )
        return data
    },
    postCottageType: async (name)=>{
        const {data} = await custimAxios.post('/cottage-type/add', {
            name: name
        })
        return data
    },
    patchCottageType: async ({id, name}) => {
        const {data} = await custimAxios.patch(`/cottage-type/edit/${id}`, 
            {
                name: name
            }
        )
        return data
    },
    deleteCottageType: async (id) => {
        const {data} = await custimAxios.delete(`/cottage-type/delete/${id}`)
        return data
    }
}