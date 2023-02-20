import express from 'express';
import http from 'http';
import config from './config';
import validateEnv from './utils/validateEnv';


const router = express();
validateEnv();


async function bootstrap() {

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'Still Alive!!' }));

    http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
}

bootstrap()
  .catch((err) => {
    throw err;
  });
