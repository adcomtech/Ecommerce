import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// Routers
import { authRouter } from './routes/authRoutes.js';
import { departmentRouter } from './routes/departmentRoutes.js';
import { materialRouter } from './routes/materialRoutes.js';
import { topicRouter } from './routes/topicRoutes.js';
import { deptDegreeRouter } from './routes/deptDegreeRoutes.js';

dotenv.config();

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch(err => console.log('DB CONNECTION ERR', err));

// middlewares
app.use(morgan('dev'));
// Middlewares
app.use(express.json({ limit: '2mb' }));
// app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// routes middleware, this will merge all the files in the routes folder
// readdirSync('./routes').map(r => app.use('/api', `${authRoutes}` / r));
app.use('/api', authRouter);
app.use('/api', departmentRouter);
app.use('/api', materialRouter);
app.use('/api', deptDegreeRouter);
app.use('/api', topicRouter);

// port
const port = process.env.PORT || 3500;

app.listen(port, () => console.log(`Server is running on port ${port}`));
