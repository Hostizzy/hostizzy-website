'use client';

/**
 * OptimizedImage Component
 * Automatically serves WebP images with fallback to original formats
 * Supports lazy loading and responsive images
 */

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
  sizes,
  ...props
}) {
  // Convert image path to WebP version
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  // Extract original extension for fallback
  const hasImageExtension = /\.(png|jpg|jpeg)$/i.test(src);

  // If no standard image extension, just return regular img
  if (!hasImageExtension) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    );
  }

  return (
    <picture>
      {/* WebP version for modern browsers */}
      <source srcSet={webpSrc} type="image/webp" sizes={sizes} />

      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    </picture>
  );
}
