
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/layout/PageTransition";
import { User, Mail, Lock, Shield, Bell } from "lucide-react";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      
      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div 
              className="glass-panel rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                {formData.name.charAt(0)}
              </div>
              
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-muted-foreground">{formData.email}</p>
              
              <div className="mt-6 flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-start"
                  onClick={() => setIsEditing(true)}
                >
                  <User size={16} className="mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-start">
                  <Shield size={16} className="mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-start">
                  <Bell size={16} className="mr-2" />
                  Notifications
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-2">
            <motion.div 
              className="glass-panel rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-6">
                {isEditing ? "Edit Profile" : "Profile Information"}
              </h2>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-muted-foreground">
                      <User size={16} />
                    </div>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`pl-9 ${!isEditing ? 'opacity-70' : 'glass-input'}`}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-muted-foreground">
                      <Mail size={16} />
                    </div>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`pl-9 ${!isEditing ? 'opacity-70' : 'glass-input'}`}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-muted-foreground">
                          <Lock size={16} />
                        </div>
                        <Input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="glass-input pl-9"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-muted-foreground">
                          <Lock size={16} />
                        </div>
                        <Input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="glass-input pl-9"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm Password</label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-muted-foreground">
                          <Lock size={16} />
                        </div>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="glass-input pl-9"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {isEditing ? (
                  <div className="flex space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : "Save Changes"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="mt-4"
                  >
                    Edit Profile
                  </Button>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
