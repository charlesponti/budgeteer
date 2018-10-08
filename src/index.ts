import * as express from "express";
import * as path from "path";
import * as winston from "winston";
import { prisma } from "./prisma-client";

const app = express();

const logger = winston.createLogger({
    format: winston.format.json(),
    level: "info",
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),
        new winston.transports.File({ filename: "logs/combined.log" })
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

app.post("/api/events", async (req, res) => {
    const events = await prisma.events({ where: { date_lte: "2018-10-01" } });
    res.json(events);
});

const staticDir = path.resolve(
    __dirname,
    "../../backpack-ui/dist/backpack-ui/"
);
app.use(express.static(staticDir));
app.use("*", express.static(staticDir));

app.listen(4200, () => logger.info(`🚀 GraphQL server is running 🚀`));
