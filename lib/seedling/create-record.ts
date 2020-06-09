import { Timer } from '../timer';
import logger from './logger'

export async function createRecords(name: string, fn: Function): Promise<void> {
  try {
    const timer = new Timer(
      logger,
      name,
      `Importing ${name}`,
      `Imported ${name}`
    );
    await fn();
    timer.stop();
  } catch (err) {
    logger.error({ message: `Could not save ${name}: ${err} ` });
    process.exit(1);
  }
}