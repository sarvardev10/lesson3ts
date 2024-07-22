import { create } from "zustand";
import { clients } from "../service";

const useClientsStore = create((set) => ({
  client: [],
  isLoading: false,
  totalCount: 1,
  getClient: async (params) => {
    try {
      set({ isLoading: true });
      const response = await clients.get_clients(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data.total / params.limit),
          client: response?.data?.clients_list,
        });
      }
      set({ isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
  deleteClient: async (client_id, owner_id) => {
    try {
      const response = await clients.delete_client(client_id, owner_id);
      if (response.status === 200) {
        set((state) => ({
          client: state.client.filter((item) => item.client_id !== client_id),
        }));
        return response.status;
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useClientsStore;

