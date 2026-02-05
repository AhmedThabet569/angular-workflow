# Angular 2025 Project Structure Plan (Features Approach)

Based on the [Ismael Ramos article](https://www.ismaelramos.dev/blog/angular-2025-project-structure-with-the-features-approach/), this document outlines the target structure for your application.

## 1. Core Principles

1.  **Features First**: The app is organized by **business capabilities** (Features), not technical types.
2.  **Standalone Components**: `NgModules` (`app.module.ts`) are optional/discouraged. We move to `standalone: true`.
3.  **Flat Structure**: Avoid over-nesting.
4.  **Core vs Shared**:
    - `Core`: Singleton services, models, interceptors (loaded once).
    - `Shared`: Reusable UI components (dumb components), pipes, directives (imported by features).

## 2. Directory Map (Current vs Target)

| Type             | Current Path                             | 🎯 Target Path (2025 Standard)                         | Changes Needed                              |
| :--------------- | :--------------------------------------- | :----------------------------------------------------- | :------------------------------------------ |
| **Feature**      | `src/app/features/home/home.ts`          | `src/app/features/home/home.component.ts`              | Rename, Convert to Standalone               |
| **Shared UI**    | `src/app/shared/header/header.ts`        | `src/app/shared/components/header/header.component.ts` | Rename, Move to `components/`, Standalone   |
| **Shared UI**    | `src/app/shared/footer/footer.ts`        | `src/app/shared/components/footer/footer.component.ts` | Rename, Move to `components/`, Standalone   |
| **Core Service** | `src/app/core/services/user.services.ts` | `src/app/core/services/user.service.ts`                | Rename file & class (Singular)              |
| **Core Model**   | `src/app/core/model/User.ts`             | `src/app/core/models/user.model.ts`                    | Rename folder `model` -> `models`           |
| **Root**         | `src/app/app.module.ts`                  | 🗑️ **DELETE**                                          | Migrate imports to `app.config.ts`          |
| **Root**         | `src/app/app.component.ts`               | `src/app/app.component.ts`                             | Convert to Standalone, imports RouterOutlet |
| **Routing**      | `src/app/app.routing.module.ts`          | `src/app/app.routes.ts`                                | Simplify to route array                     |

## 3. Detailed Structure Visualization

```text
src/
  main.ts                <-- Bootstraps AppComponent with app.config.ts
  app/
    app.component.ts     <-- Standalone, imports RouterOutlet, Header, Footer
    app.config.ts        <-- Replaces app.module.ts (providers)
    app.routes.ts        <-- Defines routes
    core/                <-- Business Logic & Data
      services/
        user.service.ts
      models/
        user.model.ts
      interceptors/
    features/            <-- Pages / Domains
      home/
        home.component.ts
        home.component.html
        home.component.css
    shared/              <-- UI Library
      components/
        header/
        footer/
```

## 4. Implementation Steps

1.  **Fix Naming**: Rename all files to `kebab-case.type.ts` (e.g., `home.component.ts`).
2.  **Standalone Migration**:
    - Add `standalone: true` to `HomeComponent`, `HeaderComponent`, `FooterComponent`.
    - Add `imports: [CommonModule, RouterModule]` to them as needed.
3.  **Remove NgModule**:
    - Create `app.config.ts` to provide `HttpClient` and Router.
    - Bootstrap `AppComponent` directly in `main.ts`.
4.  **Folder Cleanup**: Move header/footer into `shared/components`.

## 5. Next Action

Select which phase to start:

- [ ] **Phase 1**: Just fix the file names and internal class names (Keep NgModule for now).
- [ ] **Phase 2**: Full Migration to Standalone Components (Remove NgModule).
