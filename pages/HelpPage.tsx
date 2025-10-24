
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const HelpPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Help & Support</h1>
      <div className="bg-white dark:bg-slate-800 shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          If you need any assistance with your courses, payments, or have any other questions, please feel free to reach out to us using the contact information below. Our team is available to help you.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="text-primary mr-3" size={24} />
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Email Support</p>
              <a href="mailto:support@cbva.com" className="text-primary">support@cbva.com</a>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="text-primary mr-3" size={24} />
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Phone Support</p>
              <a href="tel:+911234567890" className="text-primary">+91 12345 67890</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
