import app, { port } from './api/app';


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
