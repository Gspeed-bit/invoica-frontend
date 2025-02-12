// services/auth/auth.ts

import { gqlClient } from '@/config/server';

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  businessName?: string;
  accountType: 'individual' | 'business';
  password: string;
  confirmPassword: string;
}) => {
  const mutation = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      message
    }
  }
  `;

  const variables = {
    input: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      businessName: userData.businessName,
      accountType: userData.accountType,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    },
  };

  const { data, error } = await gqlClient<{
    register: { success: boolean; message: string } | null;
  }>(mutation, variables);

  console.log('Server Response:', { register: data?.register, error });

  // ✅ Handle "Account already exists but not verified" case
  if (error?.includes('not verified')) {
    return {
      success: false,
      message:
        "Your account exists but isn't verified. Please check your email for verification.",
    };
  }

  return {
    success: data?.register?.success || false,
    message: error || data?.register?.message || 'Registration failed.',
  };
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const mutation = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          firstName
          lastName
          email
          username
          phone
          accountType
          isEmailVerified
        }
      }
    }
  `;

  const variables = {
    email: credentials.email,
    password: credentials.password,
  };

  const { data, error } = await gqlClient<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: { token: string; user: any } | null;
  }>(mutation, variables);

  console.log('Server Response:', { login: data?.login, error });

  if (error) {
    return {
      success: false,
      message: error || 'Login failed. Please try again.',
    };
  }

  return {
    success: !!data?.login?.token,
    token: data?.login?.token || null,
    user: data?.login?.user || null,
    message: data?.login ? 'Login successful' : 'Invalid credentials',
  };
};


export const verifyEmail = async (token: string) => {
  const mutation = `
    mutation VerifyEmail($token: String!) {
      verifyEmail(token: $token) {
        success
        message
      }
    }
  `;

  const { data, error } = await gqlClient<{
    verifyEmail: { success: boolean; message: string };
  }>(mutation, { token });

  return {
    status: data?.verifyEmail.success ? 'success' : 'error',
    message: error || data?.verifyEmail.message || 'Unknown error',
  };
};

export const resendVerificationEmail = async (email: string) => {
  const mutation = `
    mutation ResendVerificationEmail($email: String!) {
      resendVerificationEmail(email: $email) {
        success
        message
      }
    }
  `;

  const { data, error } = await gqlClient<{
    resendVerificationEmail: { success: boolean; message: string };
  }>(mutation, { email });

  return {
    status: data?.resendVerificationEmail.success ? 'success' : 'error',
    message: error || data?.resendVerificationEmail.message || 'Unknown error',
  };
};

// Add the `getUserVerificationStatus` query here
export const getUserVerificationStatus = async (email: string) => {
  const query = `
    query GetVerificationStatus($email: String!) {
      getUserVerificationStatus(email: $email) {
        isVerified
      }
    }
  `;

  const { data, error } = await gqlClient<{
    getUserVerificationStatus: { isVerified: boolean };
  }>(query, { email });

  return {
    status: data?.getUserVerificationStatus.isVerified
      ? 'verified'
      : 'not_verified',
    message:
      error ||
      `User verification status is ${
        data?.getUserVerificationStatus.isVerified ? 'verified' : 'not verified'
      }`,
  };
};
