// import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import next from 'next';
// import { errorHandler } from './middleware/errorMiddleware';
import mongoose from 'mongoose';
// import { IUser } from './models/userModel';
// import { Document, Types } from 'mongoose';

import projectRoutes from './pages/api/routes/projectRoutes.js';
import imageRoutes from './pages/api/routes/imageRoutes.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

connectDB();

const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
// const app = express();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    server.use('/api/projects', projectRoutes);
    server.use('/api/images', imageRoutes);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });

    // server.listen(port).on('error', (err) => {
    //   console.log(err);
    // });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/projects', require('./routes/projectRoutes'));
// app.use('/api/images', require('./routes/imageRoutes'));

//TODO:
// 1. add user registration and login handling
// 2. associate user with projects
// 3. authentication for interacting with projects using cookies

//Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));
//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('Please set to production');
//   });
// }

// app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`));

// Extending the Request interface to receive the user object
// declare module 'express-serve-static-core' {
//   interface Request {
//     user:
//       | (Document<unknown, any, IUser> &
//           IUser & {
//             _id: Types.ObjectId;
//           })
//       | null;
//   }
// }
