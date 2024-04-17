"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createAccountData } from "../actions";

export interface FormData {
	username: string;
	email: string;
}

export default function createAccount() {
	const [serverResponse, setServerResponse] = useState<string | null>(null);
	const { register, handleSubmit } = useForm<FormData>();

	const action: () => void = handleSubmit(async (data) => {
		const response = await createAccountData(data);
		setServerResponse(response);
	});

	return (
		<form
			action={action}
			className="flex flex-col w-fit h-fit fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-4"
		>
			<h1 className="text-2xl">Create Account</h1>
			<label>
				Name :{" "}
				<input
					type="text"
					className="border p-2"
					{...register("username")}
				></input>
			</label>
			<label>
				Email :{" "}
				<input
					type="email"
					className="border p-2"
					{...register("email")}
				></input>
			</label>
			<button type="submit">create Account</button>
			{serverResponse}
		</form>
	);
}
