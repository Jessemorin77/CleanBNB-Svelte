import type { Action, Actions, PageServerLoad } from "./$types";
import prisma from "$lib/database";
import { fail } from "@sveltejs/kit";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = "sk_test_51NF403BALYAgqgdEAPPSOMn43a7HFFZ2yBz0Y5C2P7yHM9A8kLcx0HzifiXYRTrB3uiQDOhrNyuifTuwc3HKASmL00TaAKhHYX";
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const load: PageServerLoad = async ({ request, locals }) => {
  const userId = locals.user.id;
  const jobs = await prisma.job.findMany();

  return {
    jobs,
  };
} 

