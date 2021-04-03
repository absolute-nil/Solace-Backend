const express = require('express');
require('express-async-errors'); // to use throw in async functions
const cookieSession = require('cookie-session');
const cors = require('cors');

//route handlers
const currentUserRouter = require('./routes/current-user');
const signInRouter = require('./routes/sign-in');
const signUpRouter = require('./routes/sign-up');
const signOutRouter = require('./routes/sign-out');
const publishBlogRouter = require('./routes/publish-blog');
const getBlogsRouter = require('./routes/get-all-blogs');
const likeBlogRouter = require('./routes/like-blog');

// error
const { errorHandler } = require('./middleware/error-handler');
const { CustomError } = require('./errors/custom-error');
const { currentUser } = require('./middleware/current-user');

const app = express();
app.use(cors());
app.options('*', cors());

app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //* for dev - process.env.NODE_ENV !== "test"
  })
);

//routes
app.use('/api/users/me', currentUserRouter);
app.use('/api/users/sign-in', signInRouter);
app.use('/api/users/sign-out', signOutRouter);
app.use('/api/users/sign-up', signUpRouter);
app.use('/api/blogs/publish', publishBlogRouter);
app.use('/api/blogs', getBlogsRouter);
app.use('/api/blogs/like/:blogId', likeBlogRouter);

// if route does not exist
app.all('*', async () => {
  throw new CustomError('not found', 404);
});

// middleware
app.use(errorHandler);
app.use(currentUser);

module.exports = { app };
