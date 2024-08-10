import { lazy } from 'react';

export const ContactPageLazy = lazy(async () => await import('./ContactPage'));
