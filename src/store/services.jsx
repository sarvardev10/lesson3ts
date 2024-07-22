import { create } from "zustand";
import services from "../service/services";

const useServiceStore = create((set) => ({
  data: [],
  isLoading: false,
  totalPages: 0, 
  getData: async (params) => {
    try {
      set({ isLoading: true });
      const response = await services.get_services(params);
      if (response.status === 200) {
        set({ 
          data: response?.data?.services,
          totalPages: response?.data?.total || 0, 
        });
      }
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  postData: async (data) => {
    try {
      const response = await services.post_services(data);
      if (response.status === 201) {
        set((state) => ({
          data:
            state?.data?.length < 10
              ? [...state?.data, response?.data]
              : [...state?.data],
        }));
        return response.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteData: async (id) => {
    try {
      const response = await services.delete_service(id);
      if (response.status === 200) {
        set((state) => ({
          data: state.data.filter((item) => item.id !== id),
        }));
        return response.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateData: async (data) => {
    try {
      const response = await services.update_service(data);
      if (response.status === 200) {
        set((state) => {
          const updatedData = state.data.map((item) =>
            item.id === data.id ? { ...item, ...data } : item
          );
          return { data: updatedData };
        });
        return response.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useServiceStore;
