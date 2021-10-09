import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRouter);
export default routes;
