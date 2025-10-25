export interface Customer {
  id?: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  coverImg: string;
  profileImg: string;
  socialMedia: Record<string, string> | string;
  createdAt?: string;
}
