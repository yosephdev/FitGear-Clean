import React, { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button.tsx';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label.tsx';
import { Switch } from '../components/ui/switch.tsx';
import { Badge } from '../components/ui/badge.tsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog.tsx';

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: 'profile' });
  const activeTab = searchParams.get('tab');
  const { user } = useAuth();

  const tabs = useMemo(() => [
    { id: 'profile', name: 'My Profile', icon: UserIcon, badge: null },
    { id: 'orders', name: 'My Orders', icon: ShoppingBagIcon, badge: null },
    { id: 'wishlist', name: 'My Wishlist', icon: HeartIcon, badge: '3' },
    { id: 'settings', name: 'Settings', icon: CogIcon, badge: null },
  ], []);

  const handleTabChange = useCallback((tabId) => {
    setSearchParams({ tab: tabId });
  }, [setSearchParams]);

  const renderContent = useCallback(() => {
    const contentMap = {
      profile: <ProfileContent />,
      orders: <OrdersContent />,
      wishlist: <WishlistContent />,
      settings: <SettingsContent />,
    };
    return contentMap[activeTab] || <ProfileContent />;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar 
                user={user} 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={handleTabChange} 
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted Sidebar Component
const ProfileSidebar = React.memo(({ user, tabs, activeTab, onTabChange }) => (
  <Card className="sticky top-24">
    <CardContent className="p-6">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/20">
          <span className="text-white font-bold text-3xl">
            {user?.first_name?.charAt(0)}
            {user?.last_name?.charAt(0)}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
        <Badge variant="secondary" className="mt-2">
          Member since 2024
        </Badge>
      </div>
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 text-sm font-medium group ${
              activeTab === tab.id
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </div>
            {tab.badge && (
              <Badge variant="default" className="text-xs">
                {tab.badge}
              </Badge>
            )}
          </button>
        ))}
      </nav>
    </CardContent>
  </Card>
));

ProfileSidebar.displayName = 'ProfileSidebar';

// Enhanced Profile Content with Edit Mode
const ProfileContent = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Profile</CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              <XMarkIcon className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              <CheckIcon className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-muted-foreground">First Name</Label>
                <p className="text-foreground mt-1 text-lg">{user?.first_name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Name</Label>
                <p className="text-foreground mt-1 text-lg">{user?.last_name}</p>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">Email Address</Label>
              <p className="text-foreground mt-1 text-lg">{user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Enhanced Orders Content
const OrdersContent = () => {
  const [orders] = useState([]); // This would come from your orders context/API

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ShoppingBagIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              When you place orders, they'll appear here with tracking information and order details.
            </p>
            <Button asChild>
              <a href="/products">Start Shopping</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Order list would go here */}
        <div className="space-y-4">
          {/* Example order item */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Order #12345</p>
                <p className="text-sm text-muted-foreground">Placed on January 15, 2024</p>
              </div>
              <Badge variant="success">Delivered</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Wishlist Content
const WishlistContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>My Wishlist</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center py-12">
        <HeartIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Save items you love for later by adding them to your wishlist. They'll appear here for easy access.
        </p>
        <Button asChild>
          <a href="/products">Explore Products</a>
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Enhanced Settings Content
const SettingsContent = () => {
  const [activeSetting, setActiveSetting] = useState('account');

  const settingsTabs = useMemo(() => [
    { id: 'account', name: 'Account', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  ], []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <div className="border-b mt-4">
          <nav className="-mb-px flex space-x-8">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSetting(tab.id)}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeSetting === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {activeSetting === 'account' && <AccountSettings />}
        {activeSetting === 'notifications' && <NotificationSettings />}
        {activeSetting === 'security' && <SecuritySettings />}
      </CardContent>
    </Card>
  );
};

// Enhanced Account Settings
const AccountSettings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Account Information</h3>
        <p className="text-sm text-muted-foreground">Update your account details and preferences.</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="settingsFirstName">First Name</Label>
            <Input 
              id="settingsFirstName" 
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="settingsLastName">Last Name</Label>
            <Input 
              id="settingsLastName" 
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="settingsEmail">Email</Label>
          <Input 
            id="settingsEmail" 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

// Enhanced Notification Settings
const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    orders: true,
    promotions: false,
    security: true,
  });

  const toggleNotification = useCallback((key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">Manage how and when you want to be notified.</p>
      </div>
      <div className="space-y-6">
        {[
          { key: 'email', label: 'Email Notifications', description: 'Get notified about new products and special offers' },
          { key: 'orders', label: 'Order Updates', description: 'Receive updates about your order status and shipping' },
          { key: 'promotions', label: 'Promotional Emails', description: 'Get deals, discounts, and special offers' },
          { key: 'security', label: 'Security Alerts', description: 'Important notifications about your account security' },
        ].map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label className="text-base font-medium">{label}</Label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Switch
              checked={notifications[key]}
              onCheckedChange={() => toggleNotification(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Security Settings
const SecuritySettings = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account security and privacy.</p>
      </div>
      
      <div className="space-y-4">
        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="password" placeholder="Current Password" />
            <Input type="password" placeholder="New Password" />
            <Input type="password" placeholder="Confirm New Password" />
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <Button variant="outline">
              Enable 2FA
            </Button>
          </CardContent>
        </Card>

        {/* Delete Account */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive text-base">Delete Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all of your data. This action cannot be undone.
            </p>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              Delete My Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {/* Handle account deletion */}}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;