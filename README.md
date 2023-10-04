<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.imgur.com/4xiI9Hu.png" width="620" alt="Nest Logo" /></a>
</p>

> ### Blog made using Nestjs + Mikro-orm codebase(backend) containing real world examples (CRUD, auth (password based and oauth), advanced patterns, etc) and batteries included and ever-evolving

<br/>

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Database](#database)
- [Features Covered](#features-covered)
- [Available Scripts](#available-scripts)
- [Setup](#setup)
- [File Structure](#file-structure)
- [Authentication](#authentication)
- [Deployment](#deployment)

## Prerequisites

NodeJS
https://nodejs.org/en/

Typescript
https://www.typescriptlang.org/

PostgresQL
https://www.postgresql.org/

Redis
https://redis.io/

RabbitMQ
https://www.rabbitmq.com

## Getting started

```sh

# 1. Clone the repository.

# 3. Create Environment variables file.
cp env/.env.sample env/.env.dev

# 4. Install dependencies (preferred: pnpm)

 npm install
 pnpm install
 yarn install

```

## Database

<p align="center">
  <a href="https://mikro-orm.io/" target="blank"><img src="https://raw.githubusercontent.com/mikro-orm/mikro-orm/master/docs/static/img/logo-readme.svg?sanitize=true" width="320" alt="Mikro Orm" /></a>
</p>

The example codebase uses [MikroORM](https://mikro-orm.io/) with a Postgres database. Why `Mikroorm`? It is a modern ORM
for Node.js based on Data Mapper, Unit of Work and Identity Map patterns. It is fully compatible with TypeScript and
provides additional features like support for enums, custom types, MongoDB, transactions, caching, migrations, change
tracking, advanced queries, lazy/eager relations and much more.

Copy sample env file and adjust the connection settings and other settings(jwt,redis,mail,etc) respectively on sample
env file

`Note`: Env files are kept in env folder. The config validation allows 4 environment ['dev', 'prod', 'test','stage'].
The env file name
should be of format .env.[environment] Ex. (.env.dev). The env to use should be provided while running any script as
NODE_ENV=dev pnpm run dev

Start local Postgres server and run `npx cross-env NODE_ENV=dev just migrate` to apply migrations

Now you can start the application witt `npx cross-env NODE_ENV=dev pnpm run start`.

---

## Features covered:

- 🌐 **I18n** - Internationalization
- 🧵 **Stats** - swagger stats for common server metrics
- 🧵 **Poolifier** - threads for cpu extensive tasks
- 💬 **Twilio** - sms support
- 📱 **NestJS** — latest version
- 🎉 **TypeScript** - Type checking
- ⚙️ **Dotenv** - Supports environment variables
- 🗝 **Authentication** - JWT, RSA256, oauth
- 🏬 **Authorization** - RBAC with casl
- 🏪 **MikroORM** - Database ORM
- 🏪 **PostgreSQL** - Open-Source Relational Database
- 🧠 **Configuration** - Single config for all
- 📃 **Swagger** - API Documentation
- 🐳 **Docker Compose** - Container Orchestration
- 🔐 **Helmet** - secure HTTP headers
- 📏 **ESLint** — Pluggable JavaScript linter

## Available Scripts

- `pnpm run start` - Start application
- `pnpm run start:dev` - Start application in watch mode
- `pnpm run start:prod` - Start built application
- `pnpm run start:hmr` - Start application with hot module replacement
- `pnpm run lint` - Uses eslint to lint all the files inside src with config provided in `eslint.config.js`
- `pnpm run orm migration:create` - Uses Mikroorm to create a migration file
- `pnpm run orm migration:up` - This command is used to run availablexisting migration files.
- `pnpm run orm migration:down` - This command is used to rollback migration.
- `pnpm run orm seeder:run` - This command is used to run existing seeders in `src/common/database`.

All the scripts require `NODE_ENV` flag

Additionally, you can also see the scripts in `justfile` which is a cross platform task runner. You can use it by
installing [just](https://github.com/casey/just#packages) and then running `just <script>`. Ex. `just build`

---

## Setup

- First if you don't want to use any libs from like redis, mailer etc. replace them from the app.module.tasks
    - You will also need to remove the config from `validate.config.ts` from line ` load: []`
    - Also remove the unwanted config variables from the env file
- Make sure you create a env file under `env` directory with name like `.env.something`.The portion after .env is
  the `NODE_ENV` value which will be required while running the app

## Migration and seeding

Migrations are used to update the database schema. The migration files are stored in `migrations` directory.

```sh
  npx cross-env NODE_ENV=dev pnpm run orm migration:up # applies migration for dev env
```

Seeding is used to insert data into the database. The seeding files are stored in `common/database/seeders` directory.

```sh
    npx cross-env USER_PASSWORD=Test@1234 NODE_ENV=dev pnpm run orm seeder:run   # seeds data for dev env with all user password set as Test@1234
```

## Start application

- `npx cross-env NODE_ENV=[env name] pnpm run start`
- View automatically generated swagger api docs by browsing to `http://localhost:[port]/docs`
- View automatically generated swagger stats dashboard by browsing to `http://localhost:[port]/stats`. The username and
  password is the values set in the env file under `SWAGGER_USERNAME` and `SWAGGER_PASS` respectively

## File structure

```text
ultimate-nest
├── env                                           * Contains all configuration files
│   └── .env.example                              * Sample configuration file.
│   └── .env.dev                                  * Configuration file for development environment.
│   └── .env.prod                                 * Configuration file for production environment.
│   └── .env.test                                 * Configuration file for test environment.
├── coverage                                      * Coverage reports after running `npm run test:cov` command.
├── dist                                          * Optimized code for production after `npm run build` is run.
├── src
    └── modules                                   * Folder where specific modules all files are stored
          └── <module>
      │       └── dto                             * Data Transfer Objects.
      │       └── <module>.controller.ts          * Controller file.
      │       └── <module>.module.ts              * root module file for module.
      │       └── <module>.service.ts             * Service file for <module>.
      │       └── <module>.service.spec.ts        * Test file for service.
      │       └── <module>.repository.ts          * Repository file for <module>.
      │       └── <module>.repository.spec.ts     * Test file for repository.
│   └── common                                    * Common helpers function, dto, entity,guards, custom validators,types, exception, decorators etc.
│   └── __mocks__                                 * Fixtures for unit tests.
│   └── libs                                      * Resusable pre configured libraries
│   └── resources                                 * Contains all static resources like ssl, i18n,email templates etc.
│   └── app.module.ts                             * Root module of the application.
│   └── main.ts                                   * The entry file of the application which uses the core function NestFactory to create a Nest application instance.
├── test                                          * End to end test files for the application.

```

# Authentication

This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using
the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and
authentication of the token.

# Deployment

You need to have `docker` and `docker-compose` installed. The image environment variable values can be found at the compose file

```sh
  ENV=dev sh ./scripts/deploy.sh   # deploys dev environment (.env.dev used)
  ENV=prod sh ./scripts/deploy.sh   # deploys prod environment (.env.prod used)
```

More docs found at `docs` folder