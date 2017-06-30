/**
 * Module dependencies.
 * @type {exports}
 */
import bodyParser from 'body-parser'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import expressValidator from 'express-validator'
import http from 'http'
import io from 'socket.io'
import methodOverride from 'method-override'
import morgan from 'morgan'
import util from 'util'
import cors from 'cors'
import typeDefs from './data/schema'
import resolvers from './data/resolvers'
// import Mocks from './data/mocks';

import { apolloExpress, graphiqlExpress } from 'apollo-server'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

// addMockFunctionsToSchema({
//   schema: executableSchema,
//   mocks: Mocks,
//   preserveResolvers: true,
// });

const { SERVER_PORT } = process.env

const graphQLServer = express()
graphQLServer.use(cors())

// Set port
graphQLServer.set('port', SERVER_PORT || 3000)

/**
 * Allow for the use of HTTP verbs such as PUT or DELETE in places
 * where the client doesn't support it.
 */
graphQLServer.use(methodOverride())

// Add `compression` for compressing responses.
graphQLServer.use(compress())

// Add `morgan` for logging HTTP requests.
graphQLServer.use(morgan('dev'))

// Add `body-parser` for parsing request body
graphQLServer.use(bodyParser.json())
graphQLServer.use(bodyParser.urlencoded({ extended: true }))

/**
 * Add `express-validator`
 * This module allows values in req.body to be validated with the use of
 * helper methods.
 */
graphQLServer.use(expressValidator())

// Add cookie-parser
graphQLServer.use(cookieParser())

// `context` must be an object and can't be undefined when using connectors
graphQLServer.use(
  '/graphql',
  bodyParser.json(),
  apolloExpress({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
      allowUndefinedInResolve: false,
      printErrors: true
    }),
    context: {}
  })
)

graphQLServer.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

graphQLServer.use((req, res) =>
  res.status(404).json({
    message: 'The index you have requested has no corresponding route'
  })
)

const port = graphQLServer.get('port')
const env = graphQLServer.get('env')
const server = http.Server(graphQLServer) /* eslint new-cap: 0 */

// Add socket to graphQLServer and begin listening.
graphQLServer.socket = io(server)

// Start graphQLServerlication server.
server.listen(port, () =>
  util.log(`Cthulhu has risen at port ${port} in ${env} mode`)
)

// Emit initial message
graphQLServer.socket.on('connection', socket =>
  socket.emit('message', {
    message: 'Cthulhu has you in her grips.'
  })
)
