export type RegisterUserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  businessName?: string;
  accountType: 'individual' | 'business';
  password: string;
  confirmPassword: string;
};
