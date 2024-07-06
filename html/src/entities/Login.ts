export interface Login {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  name: String;
  email: string;
  birthdate: string;
  mobile: string;
  gender: string;
}
export interface AuthStore {
  user: UserData;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// create<AuthStore>((set) => ({
//   user: { id: "", name: "", email: "", birthdate: "", mobile: "", gender: "" },
//   login: (email, password) => set(() => ({})),
//   logout: () => set(() => ({})),
// }));
