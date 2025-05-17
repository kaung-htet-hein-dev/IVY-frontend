import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { cn } from '@/utils/helpers';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'my', name: 'Myanmar' },
];

export default function LanguageSwitcher({ isScrolled }: { isScrolled?: boolean }) {
  const switchLanguage = (langCode: string) => {
    // Implementation will be added when we set up i18n
    console.log(`Switching to ${langCode}`);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className={cn('h-5 w-5', isScrolled ? 'text-gray-700' : 'text-white')} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(lang => (
          <DropdownMenuItem key={lang.code} onClick={() => switchLanguage(lang.code)}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
