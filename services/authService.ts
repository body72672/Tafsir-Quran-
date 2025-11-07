import { User } from '../types';

// This is a mock authentication service.
// In a real application, this would integrate with Firebase Auth, Auth0, etc.

const FAKE_DELAY = 1000;

export const signInWithGoogle = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        uid: `mock-uid-${Date.now()}`,
        name: 'عبدالله محمد',
        email: 'abdullah.m@example.com',
        // Using a service that generates different avatars to simulate different users
        photoURL: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent('عبدالله محمد')}`,
      };
      resolve(user);
    }, FAKE_DELAY);
  });
};

export const signOut = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};