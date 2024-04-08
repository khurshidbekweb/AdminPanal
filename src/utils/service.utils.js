import custimAxios from "../configs/axios.config";

export const serviceUtils = {
  getService: async () => {
    const { data } = await custimAxios.get("/services", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  addService: async ({ name, description, code, images }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("code", code);

    for (const img of images) {
      formData.append("images", img);
    }

    const { data } = await custimAxios.post("/services/add", formData);
    return data;
  },
  editService: async ({ id, name, description, images }) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      for (const img of images) {
        formData.append("images", img);
      }

      const { data } = await custimAxios.patch(
        `/services/edit/${id}`,
        formData
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  deleteService: async (id) => {
    const { data } = await custimAxios.delete(`/services/delete/${id}`);
    return data;
  },
};
