import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routes';

const PORT = process.env.PORT || 1337;

const server = express();

server.use(cors()); // enable cors
server.use(bodyParser.json());

server.use('/', router);

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});