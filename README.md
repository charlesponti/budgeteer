# Hominem API

An application for aggregating and managing one's data, including financial health, Netflix viewing historym, workouts, etc.

## Hominem/Finance
The lack of visibility many individuals have regarding their personal wealth has always been an interest of mine. 


This projects aims to provide its users with a personal and secure database of all their information. It is our belief that everyone should have access and control of all of their data at all times

Individuals should also have the ability to license their data to others in an anonomized fashion, whether it be for a longitudinal medical study or for personalized recommendations.

## Components

- **Database**: MongoDB
- **API**: [NestJS](https://nestjs.com) & [GraphQL](https://graphql.org)
- **UI**: [Hominem-UI](https://github.com/charlesponti/hominem-ui) (React, Typescript)
- **Logging**: [Winston](https://github.com/winstonjs/winston)
- **Linting**: ESLint
- **Testing**: Jest

## Installation

```bash
# Clone repo
$ git clone git@github.com:charlesponti/hominem-api.git your-app-name
$ cd your-app-name

# Install dependencies
$ yarn
```

## Environment

1. Create a file with name `.env` with the contents from `.env.default`.

## Database

```bash
# Start Docker container with MongoDB instance
$ yarn start:mongo 
```

In development, an instance of MongoDB is started as a service in a Docker container.


## API Server

```bash
# Start NestJS server
$ yarn start:dev
```

## Build

```bash
$ yarn build
```