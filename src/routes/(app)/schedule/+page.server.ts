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

export const actions: Actions = {
  createPayment: async ({ request, locals, url }) => {
    const userId = locals.user.id;
    const  jobId  = url.searchParams.get("jobId");

    const job = await prisma.job.findUnique({
      where: {
        id: String(jobId),
      },
    });

    const jobPrice = job?.jobAmount;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(jobPrice) * 100,
            product_data: {
              name: "Service",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/",
    });

  return {
    sessionId: session.id ,
  };
  },
}