import { type ReactNode } from 'react';
import { AboutPage } from 'pages/AboutPage';
import { AccountSettingsPage } from 'pages/AccountSettingsPage';
import { BlogPage } from 'pages/BlogPage';
import { ContactPage } from 'pages/ContactPage';
import { MainPage } from 'pages/MainPage';
import { MyReviews } from 'pages/MyReviews';
import { NotFoundPage } from 'pages/NotFoundPage';
import { DetailedPaceCard } from 'widgets/DetailedPaceCard';

export interface AppRouteConfig {
  path: string;
  element: ReactNode;
  children?: AppRouteConfig[];
}

export enum AppRoutes {
  MAIN = 'main',
  BLOG = 'blog',
  ABOUT = 'about',
  CONTACTS = 'contacts',
  PROFILE = 'profile',
  MY_REVIEWS = 'myReviews',
  NOT_FOUND = 'not_found',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.BLOG]: 'blog',
  [AppRoutes.ABOUT]: 'about',
  [AppRoutes.CONTACTS]: 'contacts',
  [AppRoutes.MY_REVIEWS]: 'my-reviews',
  [AppRoutes.PROFILE]: 'profile',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteConfig> = {
  [AppRoutes.MAIN]: {
    path: RoutePaths.main,
    element: <MainPage />,
    children: [
      {
        path: 'details',
        element: <DetailedPaceCard />,
      },
    ],
  },
  [AppRoutes.BLOG]: {
    path: RoutePaths.blog,
    element: <BlogPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePaths.about,
    element: <AboutPage />,
  },
  [AppRoutes.CONTACTS]: {
    path: RoutePaths.contacts,
    element: <ContactPage />,
  },
  [AppRoutes.MY_REVIEWS]: {
    path: RoutePaths.myReviews,
    element: <MyReviews />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePaths.profile,
    element: <AccountSettingsPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
  },
};
