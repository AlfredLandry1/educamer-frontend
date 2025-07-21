"use client";
import { useState } from "react";
import { User, Camera, Edit, Mail } from "lucide-react";

interface ProfileAvatarProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  };
  onAvatarChange?: (file: File) => void;
  onEditClick?: () => void;
  isEditing?: boolean;
}

export default function ProfileAvatar({ user, onAvatarChange, onEditClick, isEditing }: ProfileAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student": return "Élève";
      case "parent": return "Parent";
      case "teacher": return "Enseignant";
      case "admin": return "Administrateur";
      default: return role;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
      <div className="flex flex-col items-center text-center">
        {/* Avatar Section */}
        <div 
          className="relative mb-4 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center relative overflow-hidden">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} className="text-primary-600 dark:text-primary-400" />
            )}
            
            {/* Overlay on hover */}
            {isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            )}
          </div>
          
          {/* Upload button */}
          <label className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors">
            <Camera size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {user.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {getRoleLabel(user.role)}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Mail size={14} />
            {user.email}
          </div>
        </div>

        {/* Edit Button */}
        {onEditClick && (
          <button
            onClick={onEditClick}
            className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
              isEditing 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Edit size={16} />
            {isEditing ? "En cours..." : "Modifier le profil"}
          </button>
        )}
      </div>
    </div>
  );
} 