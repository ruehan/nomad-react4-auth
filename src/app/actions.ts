"use server";

import { getIronSession } from "iron-session";
import { FormData } from "./create-account/page";
import { LoginFormData } from "./log-in/page";
import db from "./lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "./session";

export async function createAccountData({ username, email }: FormData) {
	const isExist = await db.user.findUnique({
		where: { email: email },
	});

	if (isExist) {
		return JSON.stringify({ error: "User already exists" });
	}

	const user = await db.user.create({
		data: {
			username,
			email,
		},
	});

	const session = await getSession();
	session.id = user?.id!;
	await session.save();

	redirect("/log-in");
}

export async function logInAccountData({ email }: LoginFormData) {
	const user = await db.user.findUnique({
		where: { email: email },
		select: { id: true },
	});

	if (user) {
		const session = await getSession();

		session.id = user?.id!;
		await session.save();
		redirect("/");
	}
}
