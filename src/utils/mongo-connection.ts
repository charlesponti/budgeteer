import * as mongoose from 'mongoose';

import logger from '../../src/utils/logger';

const { NODE_ENV } = process.env;

/** Callback for establishing or re-stablishing mongo connection */
interface OnConnectedCallback {
  (): void;
}

interface MongoConnectionProps {
  mongoUrl: string;
  onConnectedCallback?: OnConnectedCallback;
}

/**
 * A Mongoose Connection wrapper class to
 * help with mongo connection issues.
 *
 * This library tries to auto-reconnect to
 * MongoDB without crashing the server.
 */
export default class MongoConnection {
  /** URL to access mongo */
  private readonly mongoUrl: string;

  /** Callback when mongo connection is established or re-established */
  property: any;

  private onConnectedCallback: OnConnectedCallback;

  /**
   * Internal flag to check if connection established for
   * first time or after a disconnection
   */
  private isConnectedBefore = false;

  /** Mongo connection options to be passed Mongoose */
  private readonly mongoConnectionOptions: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  /**
   * Start mongo connection
   * @param {string} mongoUrl MongoDB URL
   * @param {function} onConnectedCallback callback to be called when mongo connection is successful
   */
  constructor({ mongoUrl, onConnectedCallback }: MongoConnectionProps) {
    if (NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

    this.mongoUrl = mongoUrl;
    this.onConnectedCallback = onConnectedCallback;
    mongoose.connection.on('error', this.onError);
    mongoose.connection.on('disconnected', this.onDisconnected);
    mongoose.connection.on('connected', this.onConnected);
    mongoose.connection.on('reconnected', this.onReconnected);
  }

  /**
    Close mongo connection
    @param {function} onClosed - fn to run on connection close
   */
  public close(onClosed: (err: mongoose.CallbackError) => void): void {
    logger.info({
      label: 'mongoose',
      message: 'Closing the MongoDB connection',
    });
    // noinspection JSIgnoredPromiseFromCall
    mongoose.connection.close(onClosed);
  }

  /** 
    * Start mongo connection 
    * @param {function} onConnectedCallback fn to be called when mongo connection is successful
    */
  public connect(onConnectedCallback: OnConnectedCallback): void {
    this.onConnectedCallback = onConnectedCallback;
    this.startConnection();
  }

  private startConnection = async (): Promise<void> => {
    if (NODE_ENV === 'development') {
      logger.info({
        label: 'mongoose',
        message: `Connecting to MongoDB at ${this.mongoUrl}`,
      });
    }

    try {
      await mongoose.connect(this.mongoUrl, this.mongoConnectionOptions);
    } catch (error) {
      logger.error({ message: `Could not connect to MongoDB: ${error}` });
      process.exit(1);
    }
  };

  /**
   * Handler called when mongo connection is established
   */
  private onConnected = (): void => {
    if (NODE_ENV === 'development') {
      logger.info({
        label: 'mongoose',
        message: `Connected to MongoDB at ${this.mongoUrl}`,
      });
    }
    this.isConnectedBefore = true;
    this.onConnectedCallback();
  };

  /** Handler called when mongo gets re-connected to the database */
  private onReconnected = (): void => {
    logger.info('Reconnected to MongoDB');
    this.onConnectedCallback();
  };

  /** Handler called for mongo connection errors */
  private onError = (): void => {
    logger.error(`Could not connect to ${this.mongoUrl}`);
  };

  /** Handler called when mongo connection is lost */
  private onDisconnected = (): void => {
    if (!this.isConnectedBefore) {
      setTimeout(() => {
        this.startConnection();
      }, 2000);
      logger.info('Retrying mongo connection');
    }
  };
}
