
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Home, 
  PlusCircle, 
  MinusCircle, 
  User, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Mock authentication check - replace with actual auth logic later
  useEffect(() => {
    // Simulating auth check
    const hasAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(hasAuth);
  }, []);

  // For demo purposes - this would be replaced with real authentication
  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsLoggedIn(false);
  };

  const NavLink = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link to={to} className="relative">
        <motion.div
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
            isActive 
              ? "text-accent font-medium" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon size={18} />
          <span>{label}</span>
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 w-full bg-accent rounded-full"
              layoutId="navbar-indicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2"
        >
          <motion.div
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center shadow-md">
              <span className="text-white font-bold">D</span>
            </div>
          </motion.div>
          <span className="font-bold text-xl">DarkWallet</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" icon={Home} label="Dashboard" />
              <NavLink to="/deposit" icon={PlusCircle} label="Deposit" />
              <NavLink to="/withdraw" icon={MinusCircle} label="Withdraw" />
              <NavLink to="/profile" icon={User} label="Profile" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="ml-2"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                asChild 
                variant="default" 
                size="sm"
                className="shadow-md"
                onClick={handleLogin} // For demo only
              >
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden rounded-md p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden glass-panel rounded-b-lg mx-4 overflow-hidden shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col p-4 gap-2">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md">
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/deposit" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md">
                  <PlusCircle size={18} />
                  <span>Deposit</span>
                </Link>
                <Link to="/withdraw" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md">
                  <MinusCircle size={18} />
                  <span>Withdraw</span>
                </Link>
                <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md">
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <button 
                  className="flex items-center gap-2 p-2 text-left hover:bg-white/5 rounded-md mt-2 text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center justify-center bg-accent p-2 rounded-md font-medium">
                Login
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
