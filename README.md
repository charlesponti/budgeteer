# Homiem api

An implementation of a human data backpack, in which the user could keeping track of all data in one's life, from Netflix viewing history to health data. 

The first iteration managed a user's personal finance. The lack of visibility many individuals have regarding their personal wealth has always been an interest of mine. 

Future iterations and will expand to encompass possession management, educational and work history, media consumption, communication, calendar, etc.

 to one data be a Google Drive for all data

This projects aims to one day supply its users with a local (on-device or personal cloud) and secure database of all their information. They should have access and control of their data at all times, as well as have the ability to license their data to third-parties in an anonomized fashion.

## Components

- **[Docker Compose](https://github.com/charlesponti/hominem-api/blob/master/docker-compose.dev.yml)** - Docker compose script to start service in production mode.
- **[Data](#development)** - MongoDB
- **GraphQL** - This project uses GraphQL `http://localhost:4000/graphql`
- **[Envirnment](#environment)** - `.env` file for setting local environment variables
- **[Logging](#logging)**: - [Winston](https://github.com/winstonjs/winston)
- **Linting**: **ESLint**
- **Testing**: **Jest**

## Installation

```bash
<!-- Clone repoe -->
$ git clone git@github.com:charlesponti/hominem-api.git
$ cd your-app-name

<!-- Install dependencies -->
$ npm i
```

## Environment

1. Create a file with name `.env` with the contents from `.env.default`.

## Database

```bash
$ yarn start:mongo # Start Docker container with MongoDB instance
```

In development, an instance of MongoDB is started as a service in a Docker container.


## API Server

```bash
$ yarn start:dev   # Start NestJS server
```

## Packaging and Deployment

```bash
$ now
```