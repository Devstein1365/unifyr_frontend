import React, { useState } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCamera,
} from "react-icons/fi";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useAuth } from "../context/AuthContext";

const EditProfile = ({ onClose }) => {
  const { user, updateUser } = useAuth();

  // Load existing profile data from localStorage
  const loadProfileData = () => {
    const savedProfile = localStorage.getItem(`profile_${user?.email}`);
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      country: "",
      bio: "",
    };
  };

  const [formData, setFormData] = useState(loadProfileData());
  const [isSaving, setIsSaving] = useState(false);
  const [profilePicture, setProfilePicture] = useState(() => {
    const savedProfile = localStorage.getItem(`profile_${user?.email}`);
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      return profile.profilePicture || null;
    }
    return null;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      // Save to profile-specific localStorage (including profile picture)
      const profileData = { ...formData, profilePicture };
      localStorage.setItem(`profile_${user?.email}`, JSON.stringify(profileData));

      // Update name in registered users if changed
      if (formData.name !== user?.name && user?.email !== "admin@unifyr.com") {
        const registeredUsers = JSON.parse(
          localStorage.getItem("unifyr_registered_users") || "[]"
        );
        const userIndex = registeredUsers.findIndex(
          (u) => u.email === user?.email
        );
        if (userIndex !== -1) {
          registeredUsers[userIndex].name = formData.name;
          localStorage.setItem(
            "unifyr_registered_users",
            JSON.stringify(registeredUsers)
          );
        }
      }

      // Update current session user data
      const updatedUser = { ...user, name: formData.name };
      updateUser(updatedUser);

      setIsSaving(false);
      alert("Profile updated successfully!");
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0A192F] border border-white/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0A192F] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b border-white/10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#FFD60A]/20 border-2 border-[#FFD60A] flex items-center justify-center overflow-hidden">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="text-[#FFD60A]" size={40} />
                )}
              </div>
              <input
                type="file"
                id="profile-picture-upload"
                accept="image/*"
                onChange={handlePictureUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("profile-picture-upload").click()
                }
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#FFD60A] rounded-full flex items-center justify-center hover:bg-[#FFD60A]/80 transition-colors"
              >
                <FiCamera className="text-[#0A192F]" size={16} />
              </button>
            </div>
            <p className="text-white/60 text-sm">
              {profilePicture ? "Change profile picture" : "Upload a profile picture"}
            </p>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Personal Information
            </h3>

            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              icon={<FiUser size={18} />}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              icon={<FiMail size={18} />}
              disabled
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleInputChange}
              icon={<FiPhone size={18} />}
            />
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Location</h3>

            <Input
              label="Address"
              name="address"
              type="text"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={handleInputChange}
              icon={<FiMapPin size={18} />}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                type="text"
                placeholder="New York"
                value={formData.city}
                onChange={handleInputChange}
              />

              <Input
                label="Country"
                name="country"
                type="text"
                placeholder="United States"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Bio</label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              className="flex-1"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="flex-1"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
