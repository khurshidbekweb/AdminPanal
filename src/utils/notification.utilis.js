import { custimAxios } from "../configs/axios.config"

export const notificationUtils = {
    getNotification:  async (id) => {
        const {data} = custimAxios.get(`notification/${id}`)
        return data
    },
    postNatification: async ({message, type, userId}) => {
        const {data} = custimAxios.post('/natification/add', 
        {
            headers: {
                "access-token": localStorage.getItem("access-token")
            }
        },
        {
            message: message,
            type: type,
            userId: userId
        }
        )
        return data
    },
    patchNatification: async ({id, watchedUserId, status}) => {
        const {data} = custimAxios.patch(`/antification/update/${id}`, 
        {
            headers: {
                "access-token": localStorage.getItem("access-token")
            }
        },
        {
            watchedUserId: watchedUserId,
            status: status
        }        
        )
        return data
    },
    deleteNatification: async (id) => {
        const {data} = await custimAxios.delete(`/natification/delete/${id}`)
        return data
    }
}