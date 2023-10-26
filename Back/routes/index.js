const Express = require('express');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');
const { authMW, adminCheck } = require('../middleware/authentication.middleware');

const app = Express();

const authRouter = require('./auth');
const userRouter = require("./userRouter")
// Rutas



// use=
app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
app.use('/auth', authRouter);
app.use("/user", userRouter);
app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
