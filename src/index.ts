import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";
import * as winston from "winston";
import { Mutation } from "./mutations";

const logger = winston.createLogger({
    format: winston.format.json(),
    level: "info",
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

const resolvers = {
    Mutation,
    Query: {
        humans: (_, args, context, info) => {
            return context.prisma.query.humans({}, info);
        }
    }
};

const server = new GraphQLServer({
    context: req => ({
        ...req,
        prisma: new Prisma({
            endpoint: process.env.PRISMA_ENDPOINT,
            secret: process.env.PRISMA_SECRET,
            typeDefs: "src/generated/prisma.graphql"
        })
    }),
    resolvers,
    typeDefs: "src/schema.graphql"
});

server.start(() =>
    logger.info(`🚀 GraphQL server is running on http://localhost:4000 🚀`)
);
