import { Router } from 'express';
import multer from 'multer';
import ensureAuthententicated from '../middlewares/ensureAuthentited';
import CreateUserService from '../services/CreateUserService';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    delete user.password;
    return response.json(user);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthententicated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvartar = new UpdateUserAvatarService();

      const user = await updateUserAvartar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usersRouter;
