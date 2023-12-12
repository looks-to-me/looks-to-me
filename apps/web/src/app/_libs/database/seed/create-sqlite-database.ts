import { cleanupWorker, setupWorker } from './setup-worker';

//NOTE: If this is not executed first, the '.sqlite' file will not be created.
const createSqliteDB = async () => {
  await setupWorker();
  await cleanupWorker();
};

void createSqliteDB();
