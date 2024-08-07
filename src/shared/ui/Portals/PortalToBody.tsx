import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const PortalToBody = ({ children, element = document.body }: PortalProps) => {
  return createPortal(children, element);
};
