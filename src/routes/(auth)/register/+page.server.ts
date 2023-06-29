import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import bcrypt from "bcrypt";

import db from "$lib/database";

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if logged in
  if (locals.user) {
    throw redirect(302, "/");
  }
};

const register: Action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  const passwordConfirmation = data.get("password-confirmation");

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return fail(400, { error: { message: "email and password are required." } });
  }

  if (password !== passwordConfirmation) {
    return fail(400, { error: { message: "Password confirmation doesn't match." } });
  }

  const user = await db.user.findUnique({ where: { email } });
  if (user) {
    return fail(400, { error: { message: "email already exists." } });
  }

  await db.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
    },
  });

  throw redirect(303, "/login");
};

export const actions: Actions = { register };
