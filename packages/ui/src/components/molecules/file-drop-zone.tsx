'use client';

import * as React from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../../lib/utils';
import { FileInput } from '../atoms/file-input';

export interface FileDropZoneProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // em bytes
  disabled?: boolean;
  className?: string;
}

/**
 * Molécula: Zona de drop de arquivos com feedback visual
 * Combina FileInput com área de drag and drop
 */
export function FileDropZone({
  onFileSelect,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB padrão
  disabled = false,
  className,
}: FileDropZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (maxSize && file.size > maxSize) {
      setError(`Arquivo muito grande. Máximo: ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
      return false;
    }

    if (accept && !file.type.match(accept.replace('*', '.*'))) {
      setError('Tipo de arquivo não permitido');
      return false;
    }

    return true;
  };

  const handleFile = (file: File | null) => {
    if (!file) {
      onFileSelect(null);
      return;
    }

    if (validateFile(file)) {
      onFileSelect(file);
    } else {
      onFileSelect(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    handleFile(file || null);
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center',
          'rounded-lg border-2 border-dashed p-8 transition-all',
          'hover:border-primary hover:bg-primary/5',
          isDragging && 'border-primary bg-primary/10',
          disabled && 'cursor-not-allowed opacity-50',
          error && 'border-destructive'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <Upload
          className={cn(
            'mb-4 size-12 text-muted-foreground transition-colors',
            isDragging && 'text-primary',
            error && 'text-destructive'
          )}
        />
        <div className="text-center">
          <p className="text-sm font-medium">
            {isDragging ? 'Solte o arquivo aqui' : 'Clique ou arraste uma imagem'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Formatos: JPG, PNG, WEBP (máx. {(maxSize / 1024 / 1024).toFixed(0)}MB)
          </p>
        </div>

        <FileInput
          ref={inputRef}
          accept={accept}
          onFileSelect={handleFile}
          disabled={disabled}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
