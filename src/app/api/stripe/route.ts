import { prisma } from "@/lib/db";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
  });

  const body = await request.text();

  // verify that webhook is from Stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      request.headers.get("stripe-signature")!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error(`Webhook signature verification failed.`);
    if (error instanceof Error) {
      console.error(error.message);
    }
    return Response.json({ received: false }, { status: 400 });
  }

  // fulfill order
  switch (event.type) {
    case "checkout.session.completed":
      await prisma.membership.create({
        data: {
          userId: event.data.object.client_reference_id!,
          status: "active",
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // return 200 OK
  return Response.json({ received: true }, { status: 200 });
}
