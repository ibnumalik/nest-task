import * as config from 'config';

const server = config.get('server');

export const APP_PORT = process.env.APP_PORT || server.PORT;
