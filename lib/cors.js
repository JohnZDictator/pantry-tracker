import Cors from 'cors';
import initMiddleware from './init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*',  // Adjust as necessary
  })
);

export default cors;
