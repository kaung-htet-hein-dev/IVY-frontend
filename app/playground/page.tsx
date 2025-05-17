'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Moon, Sun } from 'lucide-react';

export default function ThemingPlayground() {
  // To avoid hydration mismatch, we need to wait for the component to mount
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until the component is mounted
  if (!mounted) return null;

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-6">Theme Switching Playground</h1>

      {/* Basic Theme Controls */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Basic Theme Controls</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            onClick={() => setTheme('light')}
            className="flex items-center gap-2"
          >
            <Sun className="h-4 w-4" />
            Light Mode
          </Button>
          <Button
            variant="outline"
            onClick={() => setTheme('dark')}
            className="flex items-center gap-2"
          >
            <Moon className="h-4 w-4" />
            Dark Mode
          </Button>
          <Button variant="outline" onClick={() => setTheme('system')}>
            System
          </Button>
        </div>
      </Card>

      {/* Theme Status */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Theme Status</h2>
        <p className="text-lg">
          Current theme: <span className="font-bold">{theme}</span>
        </p>
      </Card>

      {/* Theme Demo Elements */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Theme Demo Elements</h2>
        <div className="space-y-4">
          {/* Primary Colors */}
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">
            Primary Color Block
          </div>

          {/* Secondary Colors */}
          <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
            Secondary Color Block
          </div>

          {/* Accent Colors */}
          <div className="p-4 bg-accent text-accent-foreground rounded-lg">Accent Color Block</div>

          {/* Muted Colors */}
          <div className="p-4 bg-muted text-muted-foreground rounded-lg">Muted Color Block</div>
        </div>
      </Card>

      {/* Theme Implementation Notes */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4 text-sm">
          <p>
            1. Tailwind is configured to use CSS variables defined in globals.css with the darkMode:
            ['class'] setting in tailwind.config.ts
          </p>
          <p>
            2. next-themes provides the ThemeProvider component and useTheme hook to manage theme
            state
          </p>
          <p>
            3. CSS variables in :root and .dark selectors define the actual color values for each
            theme
          </p>
          <p>
            4. Components use Tailwind classes that reference these CSS variables (e.g.,
            bg-background, text-foreground)
          </p>
        </div>
      </Card>
    </div>
  );
}
