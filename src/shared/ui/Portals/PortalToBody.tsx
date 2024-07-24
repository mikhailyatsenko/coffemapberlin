import { createPortal } from 'react-dom';
import { type ReactNode } from 'react';

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const PortalToBody = ({ children, element = document.body }: PortalProps) => {
  return createPortal(children, element);
};
