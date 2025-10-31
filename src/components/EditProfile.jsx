import React, { useState } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCamera,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
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

  // Password change state
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError("");
    setPasswordSuccess(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    // Validate passwords
    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Get current user from registered users
    const registeredUsers = JSON.parse(
      localStorage.getItem("unifyr_registered_users") || "[]"
    );
    const currentUser = registeredUsers.find((u) => u.email === user?.email);

    if (!currentUser) {
      setPasswordError("User not found");
      return;
    }

    // Verify current password
    if (currentUser.password !== passwordData.currentPassword) {
      setPasswordError("Current password is incorrect");
      return;
    }

    // Update password
    const updatedUsers = registeredUsers.map((u) => {
      if (u.email === user?.email) {
        return { ...u, password: passwordData.newPassword };
      }
      return u;
    });

    localStorage.setItem(
      "unifyr_registered_users",
      JSON.stringify(updatedUsers)
    );

    // Clear password fields and show success
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setShowPasswordSection(false);
    }, 3000);
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
      localStorage.setItem(
        `profile_${user?.email}`,
        JSON.stringify(profileData)
      );

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
              {profilePicture
                ? "Change profile picture"
                : "Upload a profile picture"}
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

          {/* Change Password Section */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Security</h3>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordSection(!showPasswordSection);
                  setPasswordError("");
                  setPasswordSuccess(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="text-[#FFD60A] hover:underline text-sm font-medium"
              >
                {showPasswordSection ? "Cancel" : "Change Password"}
              </button>
            </div>

            {showPasswordSection && (
              <div className="space-y-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                {passwordError && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    <FiAlertCircle size={18} />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                    <FiCheckCircle size={18} />
                    <span>Password changed successfully!</span>
                  </div>
                )}

                {/* Current Password */}
                <div>
                  <label className="text-sm font-medium text-white/90 mb-2 block">
                    Current Password
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                      size={18}
                    />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                    >
                      {showCurrentPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-sm font-medium text-white/90 mb-2 block">
                    New Password
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                      size={18}
                    />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                    >
                      {showNewPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  {passwordData.newPassword && (
                    <p
                      className={`text-xs mt-1 ml-1 ${
                        passwordData.newPassword.length < 6
                          ? "text-red-400"
                          : passwordData.newPassword.length < 10
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      Password strength:{" "}
                      {passwordData.newPassword.length < 6
                        ? "Weak"
                        : passwordData.newPassword.length < 10
                        ? "Medium"
                        : "Strong"}
                    </p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="text-sm font-medium text-white/90 mb-2 block">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                      size={18}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  {passwordData.confirmPassword && (
                    <div className="flex items-center gap-1 mt-1 ml-1">
                      {passwordData.newPassword ===
                      passwordData.confirmPassword ? (
                        <>
                          <FiCheckCircle className="text-green-400" size={14} />
                          <p className="text-xs text-green-400">
                            Passwords match
                          </p>
                        </>
                      ) : (
                        <>
                          <FiAlertCircle className="text-red-400" size={14} />
                          <p className="text-xs text-red-400">
                            Passwords do not match
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  type="button"
                  onClick={handleChangePassword}
                  className="w-full"
                  disabled={
                    !passwordData.currentPassword ||
                    !passwordData.newPassword ||
                    !passwordData.confirmPassword
                  }
                >
                  Update Password
                </Button>
              </div>
            )}
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
