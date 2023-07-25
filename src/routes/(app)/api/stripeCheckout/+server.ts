import Stripe from "stripe";
import prisma from "$lib/database";
import type { RequestEvent, RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

const STRIPE_SECRET_KEY = "sk_test_51NF403BALYAgqgdEAPPSOMn43a7HFFZ2yBz0Y5C2P7yHM9A8kLcx0HzifiXYRTrB3uiQDOhrNyuifTuwc3HKASmL00TaAKhHYX";
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST({request, locals, url}: RequestEvent) {
    const userId = locals.user.id;
    const jobId = url.searchParams.get("jobId");

    const job = await prisma.job.findUnique({
        where: {
          id: String(jobId),
        },
      });
    
      if (!job) {
        return { status: 404 };
      }
    
      const jobPrice = job.jobAmount;
    
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
        success_url: "http://localhost:3001/success",
        cancel_url: "http://localhost:3001/",
      });
    
      return json({url: session.url}, {status: 201}) 
}