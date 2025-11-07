'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onAddTag?: (value: string) => void;
}

/**
 * Átomo: Input básico para adicionar tags
 * Captura Enter e adiciona tag
 */
export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ className, onAddTag, ...props }, ref) => {
    const [value, setValue] = React.useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        const trimmedValue = value.trim();
        if (trimmedValue && onAddTag) {
          onAddTag(trimmedValue);
          setValue('');
        }
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

TagInput.displayName = 'TagInput';
