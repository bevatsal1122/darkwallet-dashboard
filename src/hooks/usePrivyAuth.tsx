
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from './use-toast';

export const usePrivyAuth = () => {
  const { 
    ready,
    authenticated,
    user,
    login,
    logout,
    createWallet,
    linkWallet,
    unlinkWallet,
    // Access embedded wallet from usePrivy - adjust based on actual Privy API
  } = usePrivy();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Map Privy auth state to local storage for compatibility with existing code
  useEffect(() => {
    if (ready) {
      if (authenticated) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        localStorage.setItem("isAuthenticated", "false");
      }
    }
  }, [ready, authenticated]);

  const handleLogin = async () => {
    try {
      await login();
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserWallet = () => {
    if (!authenticated || !user?.wallet) return null;
    
    // Return the embedded wallet from the user object
    return user.wallet;
  };

  return {
    ready,
    isAuthenticated: authenticated,
    user,
    login: handleLogin,
    logout: handleLogout,
    createWallet,
    linkWallet,
    unlinkWallet,
    wallets: user?.wallet ? [user.wallet] : [], // Provide a wallets array for compatibility
    getUserWallet,
  };
};
