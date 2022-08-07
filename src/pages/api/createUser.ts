// src/pages/api/examples.ts
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { mongo } from "../../server/db/mongo";

const mongoExample: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await mongo.connect();
  const examples = await mongo.db('onlinestore').collection('user_data').indexInformation();
  res.status(200).json(examples);
};

export default mongoExample;
