"use client";

import {
  Drawer as ShadDrawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@pal/components/ui/drawer";

interface ControlledDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: ControlledDrawerProps) => {
  return (
    <ShadDrawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          {(title || description) && (
            <DrawerHeader>
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
          )}
          <div className="p-4">{children}</div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </div>
      </DrawerContent>
    </ShadDrawer>
  );
};
