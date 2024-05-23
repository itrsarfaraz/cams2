import { diskStorage } from 'multer';

export const MulterConfig = {
  dest: './uploads',
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
};
