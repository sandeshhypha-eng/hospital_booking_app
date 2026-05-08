export interface IUser {
  id: string;
  email: string;
  role: string;
  tenantId: string;
  createdAt: Date;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
