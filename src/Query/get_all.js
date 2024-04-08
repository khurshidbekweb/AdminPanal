import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query_keys";
import { comfortUtils } from "../utils/comfort.utils";
import { cottageUtils } from "../utils/cottage.utils";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import { userUtils } from "../utils/user.utils";
import { languageUtils } from "../utils/language.utils";
import { regionUtils } from "../utils/region.utils";
import { placeUtils } from "../utils/place.utils";
import { notificationUtils } from "../utils/notification.utilis";
import { rolesUtils } from "../utils/roles.utils";
import { translateUtils } from "../utils/translate.utils";
import { modelsUtils } from "../utils/models.utils";
import { serviceUtils } from "../utils/service.utils";
import { tariffUtils } from "../utils/tariff.utils";

const useComforts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.comforts],
    queryFn: comfortUtils.getComfort,
  });
};

const useCottage = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.cottages],
    queryFn: cottageUtils.getCottage,
  });
};

const useCottageType = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.cottagetypes],
    queryFn: cottageTypeUtils.getCottageType,
  });
};

const useUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.users],
    queryFn: userUtils.getUsers,
  });
};

const useLanguage = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.languages],
    queryFn: languageUtils.getLanguage,
  });
};

const useRegion = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.regions],
    queryFn: regionUtils.getRegion,
  });
};

const usePlaces = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.places],
    queryFn: placeUtils.getPlace,
  });
};

const useNotifications = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.notifications],
    queryFn: notificationUtils.getAllNitification,
  });
};

const useRoles = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.roles],
    queryFn: rolesUtils.getRoles,
  });
};

const useTranslate = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.translates],
    queryFn: translateUtils.getTranslate,
  });
};

const useUnusedTranslates = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.unusedTranslates],
    queryFn: translateUtils.getUnusedTranslates,
  });
};

const useModels = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.models],
    queryFn: modelsUtils.getModels,
  });
};

const useServices = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.services],
    queryFn: serviceUtils.getService,
  });
};

const useTariff = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.tariff],
    queryFn: tariffUtils.getTariff,
  });
};

export {
  useComforts,
  useCottage,
  useCottageType,
  useUsers,
  useLanguage,
  useRegion,
  usePlaces,
  useNotifications,
  useRoles,
  useTranslate,
  useUnusedTranslates,
  useModels,
  useServices,
  useTariff,
};
