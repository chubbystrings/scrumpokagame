import createError  from 'http-errors';
import express, { NextFunction, Request, Response}  from 'express';
import cors from 'cors';

import path  from 'path';
import cookieParser  from 'cookie-parser';
import logger  from 'morgan';

import indexRouter  from './routes/index';
import linkRouter  from './routes/link';
import { connectToDB } from './database';
import { NODE_ENV } from './env';

const app = express();


// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

connectToDB()

app.use('/link', linkRouter);

const dirname = path.resolve()
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/client/dist')))

  app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'client', 'dist', 'index.html')))
} else {

  app.use('/', indexRouter);
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: { message: any; status: any; }, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



export default app;
