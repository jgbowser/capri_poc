import express from 'express';
import bodyParser from 'body-parser';

import { queryDocuments } from './queryChain.js';

const app = express();

app.use(bodyParser.json());

app.post('/query', async (req, res) => {
  if (!req.body.query) {
    return res
      .status(400)
      .json({ error: 'Missing query property in the request body' });
  }

  const answer = await queryDocuments(req.body.query);

  res.json(answer);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
