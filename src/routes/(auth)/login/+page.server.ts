import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import type { Action, Actions, PageServerLoad } from "./$types";

import db from "$lib/database";

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if logged in
  if (locals.user) {
    throw redirect(302, "/");
  }
};

const login: Action = async ({ cookies, request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return fail(400, { error: { message: "email and password are required." } });
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return fail(400, { error: { message: "Email not found." } });
  }

  const userPassword = await bcrypt.compare(password, user.passwordHash);
  if (!userPassword) {
    return fail(400, { error: { message: "Invalid credentials." } });
  }

  // generate new auth token just in case
  const authenticatedUser = await db.user.update({
    where: { email: user.email },
    data: { userAuthToken: crypto.randomUUID() },
  });

  cookies.set("session", authenticatedUser.userAuthToken, {
    // send cookie for every page
    path: "/",
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: "strict",
    // only sent over HTTPS in production
    secure: process.env.NODE_ENV === "production",
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24 * 30,
  });

  // redirect the user
  throw redirect(302, "/");
};

export const actions: Actions = { login };
