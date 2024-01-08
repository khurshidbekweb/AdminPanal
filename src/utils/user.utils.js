import  custimAxios from "../configs/axios.config"

export const userUtils = {
  getUsers: async () => {
    const { data } = await custimAxios.get("user/all");
    return data;
  },
  getUserDevice: async (userId) => {
    const { data } = await custimAxios.get(`user/user-device/${userId}`);
    return data;
  },
  postUser: async ({ password, phone, roles, username }) => {
    const { data } = custimAxios.post("user/add", {
      password: password,
      phone: phone,
      roles: roles,
      username: username,
    });
    return data;
  },
  patchUser: async ({
    id,
    email,
    favoriteCottages,
    image,
    name,
    password,
    phone,
    roles,
    username,
  }) => {
    const formData = new FormData()
    formData.append("email", email)
    const { data } = await custimAxios.patch(`user/edit/${id}`, {
      
      email: email || undefined,
      favoriteCottages: favoriteCottages || [],
      image,
      name: name || undefined,
      password: password || undefined,
      phone: phone || undefined,
      roles: roles || [],
      username: username || undefined,
    });
    return data;
  },
  deletUser: async (id) => {
    const { data } = await custimAxios.delete(`user/delete/${id}`);
    return data;
  },
};
