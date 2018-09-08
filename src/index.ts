import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";
import winston from "winston";
import { Mutation } from "./mutations";

const logger = winston.createLogger();

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
            endpoint: "http://localhost:4466",
            typeDefs: "src/generated/prisma.graphql"
        })
    }),
    resolvers,
    typeDefs: "src/schema.graphql"
});

const logInput = async (resolve, root, args, context, info) => {
    logger.info(`1. logInput: ${JSON.stringify(args)}`);
    const result = await resolve(root, args, context, info);
    logger.info(`5. logInput`);
    return result;
};

const logResult = async (resolve, root, args, context, info) => {
    logger.info(`2. logResult`);
    const result = await resolve(root, args, context, info);
    logger.info(`4. logResult: ${JSON.stringify(result)}`);
    return result;
};

server.start(() =>
    logger.info(`🚀 GraphQL server is running on http://localhost:4000 🚀`)
);
