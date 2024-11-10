/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as DemoImport } from './routes/demo'
import { Route as ContactUsImport } from './routes/contact-us'
import { Route as AppImport } from './routes/app'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as AppIndexImport } from './routes/app/index'
import { Route as AppSettingsImport } from './routes/app/settings'
import { Route as AppSearchImport } from './routes/app/search'
import { Route as AppProfileImport } from './routes/app/profile'
import { Route as AppMessagesImport } from './routes/app/messages'
import { Route as AppWrapsIndexImport } from './routes/app/wraps/index'
import { Route as AppWrapsNewImport } from './routes/app/wraps/new'
import { Route as AppWrapsWrapIdImport } from './routes/app/wraps/$wrapId'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DemoRoute = DemoImport.update({
  id: '/demo',
  path: '/demo',
  getParentRoute: () => rootRoute,
} as any)

const ContactUsRoute = ContactUsImport.update({
  id: '/contact-us',
  path: '/contact-us',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any)

const AppSettingsRoute = AppSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AppRoute,
} as any)

const AppSearchRoute = AppSearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => AppRoute,
} as any)

const AppProfileRoute = AppProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AppRoute,
} as any)

const AppMessagesRoute = AppMessagesImport.update({
  id: '/messages',
  path: '/messages',
  getParentRoute: () => AppRoute,
} as any)

const AppWrapsIndexRoute = AppWrapsIndexImport.update({
  id: '/wraps/',
  path: '/wraps/',
  getParentRoute: () => AppRoute,
} as any)

const AppWrapsNewRoute = AppWrapsNewImport.update({
  id: '/wraps/new',
  path: '/wraps/new',
  getParentRoute: () => AppRoute,
} as any)

const AppWrapsWrapIdRoute = AppWrapsWrapIdImport.update({
  id: '/wraps/$wrapId',
  path: '/wraps/$wrapId',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      id: '/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/contact-us': {
      id: '/contact-us'
      path: '/contact-us'
      fullPath: '/contact-us'
      preLoaderRoute: typeof ContactUsImport
      parentRoute: typeof rootRoute
    }
    '/demo': {
      id: '/demo'
      path: '/demo'
      fullPath: '/demo'
      preLoaderRoute: typeof DemoImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/app/messages': {
      id: '/app/messages'
      path: '/messages'
      fullPath: '/app/messages'
      preLoaderRoute: typeof AppMessagesImport
      parentRoute: typeof AppImport
    }
    '/app/profile': {
      id: '/app/profile'
      path: '/profile'
      fullPath: '/app/profile'
      preLoaderRoute: typeof AppProfileImport
      parentRoute: typeof AppImport
    }
    '/app/search': {
      id: '/app/search'
      path: '/search'
      fullPath: '/app/search'
      preLoaderRoute: typeof AppSearchImport
      parentRoute: typeof AppImport
    }
    '/app/settings': {
      id: '/app/settings'
      path: '/settings'
      fullPath: '/app/settings'
      preLoaderRoute: typeof AppSettingsImport
      parentRoute: typeof AppImport
    }
    '/app/': {
      id: '/app/'
      path: '/'
      fullPath: '/app/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
    '/app/wraps/$wrapId': {
      id: '/app/wraps/$wrapId'
      path: '/wraps/$wrapId'
      fullPath: '/app/wraps/$wrapId'
      preLoaderRoute: typeof AppWrapsWrapIdImport
      parentRoute: typeof AppImport
    }
    '/app/wraps/new': {
      id: '/app/wraps/new'
      path: '/wraps/new'
      fullPath: '/app/wraps/new'
      preLoaderRoute: typeof AppWrapsNewImport
      parentRoute: typeof AppImport
    }
    '/app/wraps/': {
      id: '/app/wraps/'
      path: '/wraps'
      fullPath: '/app/wraps'
      preLoaderRoute: typeof AppWrapsIndexImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppMessagesRoute: typeof AppMessagesRoute
  AppProfileRoute: typeof AppProfileRoute
  AppSearchRoute: typeof AppSearchRoute
  AppSettingsRoute: typeof AppSettingsRoute
  AppIndexRoute: typeof AppIndexRoute
  AppWrapsWrapIdRoute: typeof AppWrapsWrapIdRoute
  AppWrapsNewRoute: typeof AppWrapsNewRoute
  AppWrapsIndexRoute: typeof AppWrapsIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppMessagesRoute: AppMessagesRoute,
  AppProfileRoute: AppProfileRoute,
  AppSearchRoute: AppSearchRoute,
  AppSettingsRoute: AppSettingsRoute,
  AppIndexRoute: AppIndexRoute,
  AppWrapsWrapIdRoute: AppWrapsWrapIdRoute,
  AppWrapsNewRoute: AppWrapsNewRoute,
  AppWrapsIndexRoute: AppWrapsIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/app': typeof AppRouteWithChildren
  '/contact-us': typeof ContactUsRoute
  '/demo': typeof DemoRoute
  '/login': typeof LoginRoute
  '/app/messages': typeof AppMessagesRoute
  '/app/profile': typeof AppProfileRoute
  '/app/search': typeof AppSearchRoute
  '/app/settings': typeof AppSettingsRoute
  '/app/': typeof AppIndexRoute
  '/app/wraps/$wrapId': typeof AppWrapsWrapIdRoute
  '/app/wraps/new': typeof AppWrapsNewRoute
  '/app/wraps': typeof AppWrapsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact-us': typeof ContactUsRoute
  '/demo': typeof DemoRoute
  '/login': typeof LoginRoute
  '/app/messages': typeof AppMessagesRoute
  '/app/profile': typeof AppProfileRoute
  '/app/search': typeof AppSearchRoute
  '/app/settings': typeof AppSettingsRoute
  '/app': typeof AppIndexRoute
  '/app/wraps/$wrapId': typeof AppWrapsWrapIdRoute
  '/app/wraps/new': typeof AppWrapsNewRoute
  '/app/wraps': typeof AppWrapsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/app': typeof AppRouteWithChildren
  '/contact-us': typeof ContactUsRoute
  '/demo': typeof DemoRoute
  '/login': typeof LoginRoute
  '/app/messages': typeof AppMessagesRoute
  '/app/profile': typeof AppProfileRoute
  '/app/search': typeof AppSearchRoute
  '/app/settings': typeof AppSettingsRoute
  '/app/': typeof AppIndexRoute
  '/app/wraps/$wrapId': typeof AppWrapsWrapIdRoute
  '/app/wraps/new': typeof AppWrapsNewRoute
  '/app/wraps/': typeof AppWrapsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/app'
    | '/contact-us'
    | '/demo'
    | '/login'
    | '/app/messages'
    | '/app/profile'
    | '/app/search'
    | '/app/settings'
    | '/app/'
    | '/app/wraps/$wrapId'
    | '/app/wraps/new'
    | '/app/wraps'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/contact-us'
    | '/demo'
    | '/login'
    | '/app/messages'
    | '/app/profile'
    | '/app/search'
    | '/app/settings'
    | '/app'
    | '/app/wraps/$wrapId'
    | '/app/wraps/new'
    | '/app/wraps'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/app'
    | '/contact-us'
    | '/demo'
    | '/login'
    | '/app/messages'
    | '/app/profile'
    | '/app/search'
    | '/app/settings'
    | '/app/'
    | '/app/wraps/$wrapId'
    | '/app/wraps/new'
    | '/app/wraps/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  AppRoute: typeof AppRouteWithChildren
  ContactUsRoute: typeof ContactUsRoute
  DemoRoute: typeof DemoRoute
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  AppRoute: AppRouteWithChildren,
  ContactUsRoute: ContactUsRoute,
  DemoRoute: DemoRoute,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/app",
        "/contact-us",
        "/demo",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/app": {
      "filePath": "app.tsx",
      "children": [
        "/app/messages",
        "/app/profile",
        "/app/search",
        "/app/settings",
        "/app/",
        "/app/wraps/$wrapId",
        "/app/wraps/new",
        "/app/wraps/"
      ]
    },
    "/contact-us": {
      "filePath": "contact-us.tsx"
    },
    "/demo": {
      "filePath": "demo.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/app/messages": {
      "filePath": "app/messages.tsx",
      "parent": "/app"
    },
    "/app/profile": {
      "filePath": "app/profile.tsx",
      "parent": "/app"
    },
    "/app/search": {
      "filePath": "app/search.tsx",
      "parent": "/app"
    },
    "/app/settings": {
      "filePath": "app/settings.tsx",
      "parent": "/app"
    },
    "/app/": {
      "filePath": "app/index.tsx",
      "parent": "/app"
    },
    "/app/wraps/$wrapId": {
      "filePath": "app/wraps/$wrapId.tsx",
      "parent": "/app"
    },
    "/app/wraps/new": {
      "filePath": "app/wraps/new.tsx",
      "parent": "/app"
    },
    "/app/wraps/": {
      "filePath": "app/wraps/index.tsx",
      "parent": "/app"
    }
  }
}
ROUTE_MANIFEST_END */
