import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ menssage: 'hello Go stack' }),
);

export default routes;
