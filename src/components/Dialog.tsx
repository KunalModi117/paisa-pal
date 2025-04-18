"use client";

import {
  Dialog as DialogWrapper,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Dialog({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  footer,
}: DialogProps) {
  return (
    <DialogWrapper open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </DialogWrapper>
  );
}
