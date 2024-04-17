import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
	id?: number;
}

export default function getSession() {
	return getIronSession<SessionContent>(cookies(), {
		cookieName: "login-data",
		password: "duEtx8nTPWNsUM1auTarJ1KXUbkifmgLgHia0vYJMW7JWv",
		cookieOptions: {
			secure: false,
		},
	});
}
