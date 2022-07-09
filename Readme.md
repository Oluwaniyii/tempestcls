This project is an oauth based central login system for all of my personal projects.
The goal is to have a user create account once with a single click and have it persist in all projects minimising effort while trying out my projects

The starter template is from [Sandor Turanszky's production-ready-expressjs-server](https://github.com/sandorTuranszky/production-ready-expressjs-server) with few tweaks to make it just enough for this project

Current stack is Nodejs and Mysql

## Features

- Nodejs `v. ^16`
- Error handling `v. 1.0.0`
- Logging with Morgan and Winston
- Application Configuration with <a href="https://github.com/lorenwest/node-config" target="_blank">node-config</a>
- Linting
- Mysql support with Sequelize `v.6.20.1`
- Sentry error tracking

## Todos:

Todo list will be expanded as the application progresses

- Design app solution
- Login system
- Oauth Authorization

## Get started

- [Features](#features)
- [Todos:](#todos)
- [Get started](#get-started)
- [Set up environment variables](#set-up-environment-variables)
- [Install and start Docker](#install-and-start-docker)
- [Install npm dependencies](#install-npm-dependencies)
- [Set mysql docker environmental variables](#set-mysql-docker-environmental-variables)
- [Create account and setup Sentry error tracking](#create-account-and-setup-sentry-error-tracking)
- [Create account and setup MailJet to send transactional emails](#create-account-and-setup-mailjet-to-send-transactional-emails)
- [Run server](#run-server)

## Set up environment variables

Rename `*.sample.js` files in `/server/config` directory:

- `default.sample.js -> default.js`
- `production.sample.js -> production.js`
- `test.sample.js -> test.js`

Rename `.env.example` to `.env` and set your actual values

```
//.env

MONGO_DB=mongodb+srv://<user>:<password>@cluster0-clxgl.mongodb.net/test?retryWrites=true&w=majority
NGINX_PORT=3045 // or whatever you want

```

More details on how config works see [node-config](https://github.com/lorenwest/node-config).
You may also find [Securing production config files](https://github.com/lorenwest/node-config/wiki/Securing-Production-Config-Files) useful

## Install and start Docker

- Install [Docker](https://www.docker.com/get-started) (if not yet installed) and make sure it runs
- Run `docker-compose up`

## Install npm dependencies

- Run `npm install`

## Set mysql docker environmental variables

variables will be assigned on buid up, [learn more about mysql setup](https://dev.mysql.com/doc/refman/5.7/en/environment-variables.html)
For the host docker compose network will map `mysql://mysql` to mysql container

```
MYSQL_ROOT_PASSWORD=
MYSQL_HOST=mysql://mysql:3306 // docker network host
MYSQL_DATABASE=
MYSQL_USER=user
MYSQL_PASSWORD=password
```

## Create account and setup Sentry error tracking

- Create a Sentry account [here](https://sentry.io/welcome/)
- Add `your-sentry-dsn` to env file

```
  SENTRY_DSN=your_sentry_dsn
```

## Create account and setup MailJet to send transactional emails

- Create a MailJet account [here](https://www.mailjet.com/)
- Add `your-mailjet-api-key` and `your-mailjet-secret` to env

```
  MAILJET_API_KEY=your_mailjet_api_key,
  MAILJET_API_SECRET=your_mailjet_secret,
```

- Important!!! You need to use a domain-based email address as an email sender (e.g. your project's domain name) to ensure emails are delivered to the inbox. Otherwise, they will end up in spam (including example@gmail.com once). In your MailJet account you can verify your email and take additional measures (e.g.SPF and DKIM settings) to ensure your emails are delivered.

## Run server

- `npm run dev` - development mode or
- `npm run start` - production mode
