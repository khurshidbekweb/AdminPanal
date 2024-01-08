import  custimAxios from "../configs/axios.config"

export const cottageUtils = {
  getCottage: async () => {
    const { data } = await custimAxios.get("/cottage", {
      headers: {
        'accept-language': localStorage.getItem("language")
      },
    });
    return data;
  },
  postCottage: async ({
    comforts,
    cottageType,
    description,
    images,
    name,
    placeId,
    price,
    priceWeekend,
    regionId,
  }) => {
    const formData = new FormData()

    for(const el of comforts){
      formData.append("comforts", el)
    }

    for(const el of images){
      formData.append("images", el)
    }

    for(const el of cottageType){
      formData.append("cottageType", el)
    }

    formData.append("description", description)
    formData.append("name", name)
    formData.append("placeId", placeId)
    formData.append("price", price)
    formData.append("priceWeekend", priceWeekend)
    formData.append("regionId", regionId)
    console.log(formData.getAll("price"));
    const { data } = await custimAxios.post("cottage/add", formData);
    return data;
  },
  postCHildImages: async ({cottageId, image}) => {
    const formData = new FormData()
    formData.append("cottageId", cottageId)
    formData.append("image", image)
    const {data} = await custimAxios.post('cottage/image/add', formData)
    return data
  },
  patchCottageText: async ({
    id,
    comforts,
    cottageStatus,
    cottageType,
    description,
    name,
    price,
    priceWeekend,
    status,
    lattitude,
    longitude,
  }) => {
    const { data } = await custimAxios.patch(`/cottage/edit/${id}`,
    {
    comforts: comforts,
    cottageStatus: cottageStatus,
    cottageType: cottageType,
    description: description,
    name: name,
    price: price,
    priceWeekend: priceWeekend,
    status: status,
    lattitude: lattitude,
    longitude: longitude,
    });
    return data
  },

  patchCottageImage: async ({id, image, status}) => {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("status", status)

    const {data} = await custimAxios.patch(`/cottage/image/edit/${id}`, formData)
    return data
  },
  deleteCottageAll: async (id) => {
    const {data} = await custimAxios.delete(`/cottage/delete/${id}`)
    return data
  },
  deleteCottageImage: async (id) => {
    const {data} = await custimAxios.delete(`/cottage/image/delete/${id}`)
    return data
  }
};
