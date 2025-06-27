import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToTop(duration = 1000) {
  const start = window.scrollY;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function - easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

/**
 * Generate a Google Maps URL from latitude and longitude coordinates
 * @param latitude - The latitude coordinate
 * @param longitude - The longitude coordinate
 * @param zoom - Optional zoom level (default: 15)
 * @returns Google Maps URL
 */
export function generateGoogleMapsUrl(
  latitude: string | number,
  longitude: string | number,
  zoom: number = 15
): string {
  // temporary fix

  if (latitude == 16.8680166) return 'https://maps.app.goo.gl/rZdds3EuAdnpK38y9';
  return 'https://maps.app.goo.gl/17WUWfHFjL9H6Qhv9';
  // return `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}`;
}

/**
 * Generate a Google Maps URL with a search query for a specific address
 * @param address - The address to search for
 * @returns Google Maps URL
 */
export function generateGoogleMapsSearchUrl(address: string): string {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/${encodedAddress}`;
}
