import { NextApiRequest, NextApiResponse } from "next";
import getSession from "./session";

export const userData = async function (
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession();
	console.log(session);
};
