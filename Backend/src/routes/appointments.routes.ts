import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthententicated from '../middlewares/ensureAuthentited';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthententicated);
appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appoinmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appoinmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const pasedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: pasedDate,
    });

    return response.json(appointment);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
