export interface IUser {
  id: string;
  fullName: string | null;
  phone: string | null;
  userType: string | null | undefined;
  accessType: string | null | undefined;
  province: string | undefined;
  enable: boolean;
}
