import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { mongo } from "../../server/db/mongo";

const mongoLogin: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await mongo.connect();

    console.log(req.body)
    try {
        const login = await mongo.db('onlinestore').collection('user_data').findOne({ email: req.body.email });
        console.log(login)
        if (login === null) return res.status(200).send(false)
        res.status(200).send(true)
    }

    catch (err) {
        console.log(err);
        res.status(418).send(false)
    }
}
export default mongoLogin;
