import type {RequestHandler} from "@sveltejs/kit";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = "sk_test_51NF403BALYAgqgdEAPPSOMn43a7HFFZ2yBz0Y5C2P7yHM9A8kLcx0HzifiXYRTrB3uiQDOhrNyuifTuwc3HKASmL00TaAKhHYX";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });

export const POST: RequestHandler = async (request) => {
    const data = await request.json()

    let lineItems : any = [];

    lineItems.forEach((item: any) => {
        lineItems.push({
            price_data: {
                currency: "usd",
                unit_amount: item.price * 100,
                product_data: {
                    name: item.name,
                },
            },
            quantity: item.quantity,
        });
    }, []);

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/",
    });

return new Response(
    JSON.stringify({ url: session.url }),
    {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    }
)
}