import serverlessExpress from '@vendia/serverless-express';
// Adjust the import path to the correct location of your Express app
import app from '../index';

export const handler = serverlessExpress({ app });
