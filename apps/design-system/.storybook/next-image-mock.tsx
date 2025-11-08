import React from 'react'

/**
 * Mock do next/image para Storybook
 * Desabilita otimização e usa <img> padrão
 */
export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  className,
  style,
  sizes,
  priority,
  loading,
  quality,
  placeholder,
  blurDataURL,
  onLoad,
  onError,
  ...props
}: any) {
  // Se usar fill, retorna img com position absolute
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...style,
        }}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    )
  }

  // Caso normal com width/height
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  )
}
