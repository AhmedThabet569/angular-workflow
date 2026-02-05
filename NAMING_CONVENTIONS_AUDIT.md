# Angular Application Naming Convention Audit

**Date:** 2026-02-05
**Project:** Angular Training Task
**Status:** 🚨 Critical Improvements Needed

## Executive Summary

An analysis of the codebase reveals significant deviations from standard Angular naming conventions and general software development best practices. Adhering to these conventions is critical for maintainability, readability, and team collaboration.

---

## 1. File Naming Conventions

**Rule:** Files should use `kebab-case.type.ts`. Separate the file name from its type (component, service, module) with a dot.

### 🔴 Critical Issues Found

| Current File                             | 🟢 Recommended Name                         | Violation Type                                  |
| :--------------------------------------- | :------------------------------------------ | :---------------------------------------------- |
| `src/app/app.ts`                         | `src/app/app.component.ts`                  | Missing file type (`.component`)                |
| `src/app/app-module.ts`                  | `src/app/app.module.ts`                     | Incorrect separator (use `.` not `-` for types) |
| `src/app/app-routing-module.ts`          | `src/app/app-routing.module.ts`             | Incorrect separator                             |
| `src/app/core/model/User.ts`             | `src/app/core/model/user.model.ts`          | PascalCase file name & missing type             |
| `src/app/core/services/user-services.ts` | `src/app/core/services/user.service.ts`     | Plural service name & missing dot separator     |
| `src/app/shared/header/header.ts`        | `src/app/shared/header/header.component.ts` | Missing file type                               |
| `src/app/shared/footer/footer.ts`        | `src/app/shared/footer/footer.component.ts` | Missing file type                               |

---

## 2. Symbol Naming (Classes & Interfaces)

**Rule:** Class names should be **PascalCase** and end with a specific suffix indicating their type (`Component`, `Service`, `Module`).

### 🔴 Critical Issues Found

| Current Symbol       | 🟢 Recommended Symbol   | Reason                                         |
| :------------------- | :---------------------- | :--------------------------------------------- |
| `class App`          | `class AppComponent`    | Components must have `Component` suffix        |
| `class UserServices` | `class UserService`     | Services are singletons and should be singular |
| `class Header`       | `class HeaderComponent` | Missing suffix                                 |
| `class Footer`       | `class FooterComponent` | Missing suffix                                 |
| `class Home`         | `class HomeComponent`   | Missing suffix                                 |

---

## 3. Member Naming (Methods & Variables)

**Rule:** properCamelCase. Methods should describe the action.

### 🟠 Improvements Needed

- **`getUserByid`** → **`getUserById`**: 'Id' should be usually treated as a word or capitalized fully depending on convention, but consistent camelCase `ById` is standard.
- **`getAllUser`** → **`getUsers`**: Methods returning arrays should generally be plural.

---

## 4. Action Plan Checklist

Use this checklist to bring your project up to standard.

- [ ] **Rename Files**: Rename all `*.ts` component files to include `.component.ts`.
- [ ] **Rename Classes**: Open each component file and append `Component` to the class name (e.g., `export class HeaderComponent`).
- [ ] **Update References**: Update `app.module.ts` to import the new file names and class names.
- [ ] **Standardize Services**: Rename `UserServices` to `UserService` (singular) and update the file name to `user.service.ts`.
- [ ] **Fix Models**: Rename `User.ts` to `user.model.ts` to denote it implies an interface/type definition file.

## References

- [Angular Style Guide (Style 02-01)](https://angular.io/guide/styleguide#separate-file-names-with-dots-and-dashes)
- [Naming Conventions Article](https://towardsdev.com/why-naming-conventions-matter-691c3855baae)

---

## 5. Phase 2 Deep Dive Analysis (Code Content)

After inspecting the file contents, the following **Logical & Functional Issues** have been identified. These go beyond invalid filenames and affect the code's ability to compile and run.

### 🔴 Critical Compilation & Runtime Errors

1.  **Broken Template Reference in Header**:
    - `src/app/shared/header/header.ts` (Line 6) points to `./header.html`.
    - **Reality**: The file was renamed to `header.component.html` in the git references.
    - **Result**: Angular build will fail (Template not found).

2.  **Mismatched Service Naming**:
    - `src/app/core/services/user.services.ts` defines class `UserServices` (Plural).
    - Standard: Service classes should be singular (`UserService`).
    - Filename is `user.services.ts` (Plural). Standard is `user.service.ts`.

3.  **Component Class Naming Violations**:
    - `src/app/features/home/home.ts` defines `export class Home`.
    - **Violation**: Must be `HomeComponent`.
    - `src/app/shared/header/header.ts` defines `export class Header`.
    - **Violation**: Must be `HeaderComponent`.
    - `src/app/app.component.ts` defines `export class App`.
    - **Violation**: Must be `AppComponent`.

4.  **Module Import Mismatches**:
    - `app.module.ts` imports `Home` from `./features/home/home`.
    - If we rename the files and classes, `app.module.ts` will break unless updated simultaneously.

### 🟡 Architecture observations (Vs. 2025 "Features Approach")

- **Standalone Components**: The project currently uses `standalone: false` (NgModules). The referenced 2025 approach strongly recommends **Standalone Components**.
- **Structure**: The `core` and `features` folders are present, which is good. The `shared` folder is present; in strict 2025 `core` replaced `shared` for singletons, but reusable UI components often still live in a `ui` or `shared` feature.

---

## 6. Recovery Strategy (Immediate Fixes)

Recommended steps to "recover" the code and align with conventions:

1.  **File Renaming (System)**:
    - `src/app/features/home/home.ts` -> `src/app/features/home/home.component.ts`
    - `src/app/shared/header/header.ts` -> `src/app/shared/header/header.component.ts`
    - `src/app/core/services/user.services.ts` -> `src/app/core/services/user.service.ts`

2.  **Code Refactoring (Content)**:
    - **Rename Classes**: `Home` -> `HomeComponent`, `Header` -> `HeaderComponent`, `App` -> `AppComponent`, `UserServices` -> `UserService`.
    - **Update Template URLs**: Point to `.component.html` files.
    - **Update Imports**: Update all references in `app.module.ts` and `home.component.ts`.

3.  **Verify**: Run the build to ensure all references are regained.
