# spec-nest-backend — NestJS API with Prisma and PostgreSQL.

=> Users CRUD: POST/GET/PATCH/DELETE /users and GET /users/:id. Passwords hashed with bcrypt; responses expose only id, username, email.

=> Stack: NestJS, Prisma, PostgreSQL, class-validator DTOs, UserResponse / UserApiResponse in users.response.ts.

=> Structure: Global PrismaModule, UsersModule for routes and UsersService; app runs on PORT (default 4000).
