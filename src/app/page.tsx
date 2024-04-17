import { Suspense } from "react";
import db from "./lib/db";
import getSession from "./session";
import { redirect } from "next/navigation";

async function getUser() {
	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		});
		if (user) {
			return user;
		}
	}
	redirect("/create-account");
}

async function Username() {
	const user = await getUser();
	console.log(user);
	return (
		<>
			<h1>Welcome! {user?.username}</h1>
			<h1>Your email is {user?.email}</h1>
		</>
	);
}

export default function Home() {
	const logOut = async () => {
		"use server";

		const session = await getSession();
		await session.destroy();
		redirect("/log-in");
	};

	return (
		<div className="flex flex-col w-fit h-fit fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-4">
			<Suspense fallback={"Welcome"}>
				<Username />
			</Suspense>
			<form action={logOut}>
				<button>Log out</button>
			</form>
		</div>
	);
}
