import custimAxios from "../configs/axios.config";

export const tariffUtils = {
  getTariff: async () => {
    const { data } = await custimAxios.get("tariff", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },

  addTariff: async ({ days, description, price, service_id, type }) => {
    const { data } = await custimAxios.post("tariff/add", {
      days: Number(days),
      description,
      price: Number(price),
      service_id,
      type,
    });
    return data;
  },

  editTariff: async ({ days, description, price, id }) => {
    const { data } = await custimAxios.patch(`tariff/edit/${id}`, {
      days: Number(days),
      description,
      price: Number(price),
    });

    return data;
  },

  disableTariff: async ({ cottageId, tariffId }) => {
    const { data } = await custimAxios.delete(`tariff/disable`, {
      cottageId,
      tariffId,
    });
    return data;
  },

  deleteTariff: async (id) => {
    const { data } = await custimAxios.delete(`tariff/delete/${id}`);
    return data;
  },
};
