/**
 * Image optimization utilities
 * Provides helper functions for optimized image loading
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

/**
 * Generate optimized image srcset for responsive images
 */
export const generateSrcSet = (
  baseUrl: string,
  widths: number[] = [400, 800, 1200, 1600, 2000]
): string => {
  if (!baseUrl || baseUrl.startsWith('data:')) {
    return '';
  }
  
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
};

/**
 * Get optimized image URL (for Cloudinary or similar CDN)
 */
export const getOptimizedImageUrl = (
  url: string,
  options: ImageOptimizationOptions = {}
): string => {
  if (!url || url.startsWith('data:') || url.startsWith('/')) {
    return url;
  }

  const { width, height, quality = 80, format = 'webp' } = options;
  const params = new URLSearchParams();

  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('f', format);
  params.append('auto', 'format,compress');

  // Check if URL already has query params
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
};

/**
 * Get image loading priority based on position
 */
export const getImagePriority = (index: number, isAboveFold: boolean = false): 'high' | 'low' => {
  if (isAboveFold && index < 3) return 'high';
  return 'low';
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizes = (breakpoints: Record<string, string> = {}): string => {
  const defaultSizes = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
  };

  const sizes = { ...defaultSizes, ...breakpoints };
  return `(max-width: 768px) ${sizes.mobile}, (max-width: 1024px) ${sizes.tablet}, ${sizes.desktop}`;
};

