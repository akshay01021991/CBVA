
import React from 'react';
import { CURRENT_USER } from '../data/mockData';
import { User, Mail, Phone, KeyRound, LogOut } from 'lucide-react';

const ProfileInfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="text-primary">{icon}</div>
        <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    </div>
);


const ProfilePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">Profile</h1>
      
      <div className="bg-white dark:bg-slate-800 shadow-md">
        <ProfileInfoRow icon={<User size={22} />} label="Name" value={CURRENT_USER.name} />
        <ProfileInfoRow icon={<Mail size={22} />} label="Email" value={CURRENT_USER.email} />
        <ProfileInfoRow icon={<Phone size={22} />} label="Phone" value={CURRENT_USER.phone} />
        <button className="w-full flex items-center p-4 text-left border-b border-gray-200 dark:border-slate-700">
            <div className="text-primary"><KeyRound size={22} /></div>
            <p className="ml-4 font-semibold text-gray-800 dark:text-gray-200">Change Password</p>
        </button>
      </div>

      <div className="mt-8">
        <button className="w-full flex items-center justify-center p-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors">
            <LogOut size={20} className="mr-2" />
            Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
