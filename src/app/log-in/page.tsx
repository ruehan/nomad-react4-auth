"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createAccountData, logInAccountData } from "../actions";
import { useFormState } from "react-dom";

export interface LoginFormData {
	email: string;
}

export default function loginAccount() {
	const [serverResponse, setServerResponse] = useState<string | null>(null);
	const { register, handleSubmit } = useForm<LoginFormData>();

	const action: () => void = handleSubmit(async (data) => {
		const response = await logInAccountData(data);
	});

	return (
		<form
			action={action}
			className="flex flex-col w-fit h-fit fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-4"
		>
			<h1 className="text-2xl">Login</h1>
			<label>
				Email :{" "}
				<input
					type="email"
					className="border p-2"
					{...register("email")}
				></input>
			</label>
			<button type="submit">Login</button>
			{serverResponse}
		</form>
	);
}
