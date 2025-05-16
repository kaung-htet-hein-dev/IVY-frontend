'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto p-8">
      {/* Main heading using custom font variable */}
      <h1 className="font-playfair text-4xl text-foreground mb-8">Tailwind CSS Playground</h1>

      {/* Colors Section */}
      <section className="space-y-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Colors & Backgrounds</h2>

        {/* Primary Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Base colors using CSS variables */}
          <Card className="p-4 bg-[var(--primary)] text-[var(--primary-foreground)]">
            Primary Color
          </Card>
          <Card className="p-4 bg-[var(--secondary)] text-[var(--secondary-foreground)]">
            Secondary Color
          </Card>
          <Card className="p-4 bg-[var(--accent)] text-[var(--accent-foreground)]">
            Accent Color
          </Card>
        </div>

        {/* Text Colors */}
        <div className="space-y-2">
          <p className="text-[var(--foreground)]">Default Text</p>
          <p className="text-[var(--muted-foreground)]">Muted Text</p>
          <p className="text-[var(--primary)]">Primary Colored Text</p>
        </div>
      </section>

      {/* Components Section */}
      <section className="space-y-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Component Examples</h2>

        {/* Buttons with different styles */}
        <div className="space-x-4">
          <Button variant="default">Default Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>

        {/* Cards with different styles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Default Card */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-2">Default Card</h3>
            <p className="text-[var(--muted-foreground)]">
              Uses default background and border colors
            </p>
          </Card>

          {/* Custom Styled Card */}
          <Card className="p-6 border-[var(--primary)] border-2">
            <h3 className="text-lg font-bold mb-2 text-[var(--primary)]">Custom Card</h3>
            <p className="text-[var(--muted-foreground)]">Uses primary color for borders</p>
          </Card>
        </div>
      </section>

      {/* Utility Classes Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold mb-4">Utility Classes</h2>

        {/* Animations */}
        <div className="space-y-4">
          <div className="animate-fade-in p-4 bg-[var(--accent)]">Fade In Animation</div>
          <div className="animate-slide-up p-4 bg-[var(--secondary)]">Slide Up Animation</div>
          <div className="animate-slide-in-right p-4 bg-[var(--primary)]">
            Slide In Right Animation
          </div>
        </div>

        {/* Border Radius */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-sm p-4 bg-[var(--muted)]">Small Radius</div>
          <div className="rounded-md p-4 bg-[var(--muted)]">Medium Radius</div>
          <div className="rounded-lg p-4 bg-[var(--muted)]">Large Radius</div>
        </div>
      </section>
    </div>
  );
}
