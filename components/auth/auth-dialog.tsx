'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/utils/helpers';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useGoogleLogin } from '@react-oauth/google';
import { FacebookIcon, GoogleIcon } from '@/components/ui/brand-icons';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInSchema = z.infer<typeof signInSchema>;
type SignUpSchema = z.infer<typeof signUpSchema>;

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState('signin');
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async response => {
      console.log('Google Login Success:', response);
      // TODO: Send access token to your backend
      // const userInfo = await axios.get(
      //   'https://www.googleapis.com/oauth2/v3/userinfo',
      //   { headers: { Authorization: `Bearer ${response.access_token}` } }
      // );
      // dispatch(login(userInfo.data));
      // onClose();
    },
    onError: error => console.log('Google Login Failed:', error),
  });

  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSignIn = (data: SignInSchema) => {
    console.log('Sign in:', data);
    // TODO: Implement authentication logic
  };

  const onSignUp = (data: SignUpSchema) => {
    console.log('Sign up:', data);
    // TODO: Implement registration logic
  };

  const handleSocialAuth = (provider: 'google' | 'facebook') => {
    // TODO: Implement social authentication logic
    // dispatch(login({ id: '1', name: 'John Doe', email: '', token: '' }));
    // onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px] rounded-xl"
        onOpenAutoFocus={e => e.preventDefault()}
        onEscapeKeyDown={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
        // hideCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Welcome to IVY</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...signInForm.register('email')}
                  placeholder="Enter your email"
                  className={cn(signInForm.formState.errors.email && 'border-red-500')}
                />
                {signInForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {signInForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...signInForm.register('password')}
                  type="password"
                  placeholder="Enter your password"
                  className={cn(signInForm.formState.errors.password && 'border-red-500')}
                />
                {signInForm.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {signInForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  {...signUpForm.register('name')}
                  placeholder="Enter your name"
                  className={cn(signUpForm.formState.errors.name && 'border-red-500')}
                />
                {signUpForm.formState.errors.name && (
                  <p className="text-sm text-red-500">{signUpForm.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  {...signUpForm.register('email')}
                  placeholder="Enter your email"
                  className={cn(signUpForm.formState.errors.email && 'border-red-500')}
                />
                {signUpForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {signUpForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  {...signUpForm.register('password')}
                  type="password"
                  placeholder="Create a password"
                  className={cn(signUpForm.formState.errors.password && 'border-red-500')}
                />
                {signUpForm.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </TabsContent>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-b from-white to-gray-50 text-gray-700 font-medium relative h-11 px-4 shadow-sm active:scale-[0.99] hover:text-gray-700"
              onClick={() => googleLogin()}
            >
              <span className="absolute left-4">
                <GoogleIcon />
              </span>
              <span className="text-center pl-6">Continue with Google</span>
            </Button>

            <FacebookLogin
              appId="1088597931155576"
              onSuccess={response => {
                console.log('Login Success!', response);
              }}
              onFail={error => {
                console.log('Login Failed!', error);
              }}
              onProfileSuccess={response => {
                console.log('Get Profile Success!', response);
              }}
              render={({ onClick }) => (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-b from-[#1877F2] to-[#0C63D4] text-white font-medium relative h-11 px-4 shadow-sm border-[#1877F2] active:scale-[0.99] hover:text-white"
                  onClick={onClick}
                >
                  <span className="absolute left-4">
                    <FacebookIcon />
                  </span>
                  <span className="text-center pl-6">Continue with Facebook</span>
                </Button>
              )}
            />
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
