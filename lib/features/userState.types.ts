export interface IUserState {
  user: {
    name: string;
    email: string;
    phone: string;
    password: string;
    pets: string[];
    role?: "user" | "admin";
    registrationDate?: Date;
    preferredContactMethod?: "email" | "phone" | "none";
    reportHistory?: Report[];
    profilePictureUrl?: string;
  };
  isAuthenticated: boolean;
}

export type UserKeys = keyof NonNullable<IUserState["user"]>;

export type UserStateUpdate = {
  key: UserKeys;
  value: any;
};

// Estado inicial
const UserState: IUserState = {
  user: {
    name: "",
    email: "",
    phone: "",
    password: "",
    pets: [],
    role: undefined,
    registrationDate: undefined,
    preferredContactMethod: undefined,
    reportHistory: [],
    profilePictureUrl: "",
  },
  isAuthenticated: false,
};

export default UserState;