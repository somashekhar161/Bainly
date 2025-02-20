import { create } from "zustand";
type UserState = {
  username: string;
  userLoading: boolean;
};

type UserActions = {
  addUser: (username: string) => void;
  updateLoading: (loading: boolean) => void;
};
export const useUserStore = create<UserState & UserActions>((set) => ({
  username: "",
  userLoading: true,
  addUser: (username: string) => set(() => ({ username: username })),
  updateLoading: (loading: boolean) => set(() => ({ userLoading: loading })),
}));
