src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   ├── auth-guard.ts          ← Angular 20 naming
│   │   │   ├── auth-guard.spec.ts
│   │   │   ├── admin-guard.ts
│   │   │   └── admin-guard.spec.ts
│   │   ├── interceptors/
│   │   │   ├── auth-interceptor.ts
│   │   │   └── auth-interceptor.spec.ts
│   │   ├── services/
│   │   │   ├── auth.ts               ← Not auth.service.ts
│   │   │   ├── auth.spec.ts
│   │   │   ├── api.ts                ← Not api.service.ts
│   │   │   └── api.spec.ts
│   │   └── models/
│   │       ├── user.model.ts         ← Create manually
│   │       └── auth.model.ts         ← Create manually
│   │
│   ├── shared/
│   │   └── components/
│   │       ├── header/
│   │       │   ├── header.ts         ← Not header.component.ts
│   │       │   ├── header.html       ← Not header.component.html
│   │       │   ├── header.css
│   │       │   └── header.spec.ts
│   │       └── footer/
│   │           ├── footer.ts
│   │           ├── footer.html
│   │           ├── footer.css
│   │           └── footer.spec.ts
│   │
│   ├── features/
│   │   ├── home/
│   │   │   ├── home.ts
│   │   │   ├── home.html
│   │   │   ├── home.css
│   │   │   └── home.spec.ts
│   │   │
│   │   ├── auth/
│   │   │   └── login/
│   │   │       ├── login.ts
│   │   │       ├── login.html
│   │   │       ├── login.css
│   │   │       └── login.spec.ts
│   │   │
│   │   ├── user/
│   │   │   └── dashboard/
│   │   │       ├── dashboard.ts
│   │   │       ├── dashboard.html
│   │   │       ├── dashboard.css
│   │   │       └── dashboard.spec.ts
│   │   │
│   │   └── admin/
│   │       └── dashboard/
│   │           ├── dashboard.ts
│   │           ├── dashboard.html
│   │           ├── dashboard.css
│   │           └── dashboard.spec.ts
│   │
│   ├── app.config.server.ts
│   ├── app.config.ts
│   ├── app.css
│   ├── app.html
│   ├── app.routes.server.ts
│   ├── app.routes.ts
│   ├── app.spec.ts
│   ├── app.ts

# Create directories
mkdir -p src/app/core/models
mkdir -p src/app/core/guards
mkdir -p src/app/core/interceptors
mkdir -p src/app/core/services


# Auth Guard
ng generate guard core/guards/auth --functional

# Admin Guard  
ng generate guard core/guards/admin --functional


# Auth Interceptor
ng generate interceptor core/interceptors/auth --functional


# Auth Service
ng generate service core/services/auth

# API Service
ng generate service core/services/api

``
# Header Component
# ng generate component shared/components/header --standalone

# Footer Component
# ng generate component shared/components/footer --standalone

``
# Home Component
ng generate component features/home --standalone

# Login Component
ng generate component features/auth/login --standalone

# User Dashboard Component
ng generate component features/user/dashboard --name=dashboard --standalone
ng generate component features/user/header --name=header --standalone
ng generate component features/user/footer --name=footer --standalone

# Admin Dashboard Component
ng generate component features/admin/dashboard --name=dashboard --standalone
ng generate component features/admin/header --name=header --standalone
ng generate component features/admin/footer --name=footer --standalone

``
# Create environments folder
mkdir -p src/environments
Manually create:

src/environments/environment.ts

src/environments/environment.development.ts

# 3. Manually create environment files
touch src/environments/environment.ts
touch src/environments/environment.development.ts