import type { Action, Actions, PageServerLoad } from "./$types";
import prisma from "$lib/database";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ request, cookies, locals }) => {
  const userId = locals.user?.id; // Get the userId from the locals object

  return {
    bids: await prisma.bid.findMany(),
    userId: userId,
  };
};

export const actions: Actions = {
  declineBid: async ({ url }) => {
    const id = url.searchParams.get("id");
    if (!id) {
      return fail(400, { error: { message: "Missing bid id." } });
    }

    try {
      await prisma.bid.delete({
        where: {
          id: String(id),
        },
      });

      return {
        status: 201,
      };
    } catch (err) {
      console.error(err);
      return fail(500, { error: { message: "Failed to delete bid." } });
    }
  },
  acceptBid: async ({ url, request, cookies, locals }) => {
    const bidId = url.searchParams.get("id");
    if (!bidId) {
      return fail(400, { error: { message: "Missing bid id." } });
    }

    const userId = locals.user?.id; // Get the userId from the locals object

    if (!userId) {
      return fail(403, { error: { message: "User not authenticated." } });
    }

    try {
      // Fetch the bid details including the userId and other necessary information
      const bid = await prisma.bid.findUnique({
        where: {
          id: bidId,
        },
        include: {
          listing: true, // Include the listing associated with the bid
        },
      });

      if (!bid) {
        return fail(404, { error: { message: "Bid not found." } });
      }

      // Create a new chat room with a name based on the bid details
      const room = await prisma.room.create({
        data: {
          name: `Chat Room for Bid #${bid.id}`,
          users: {
            connect: [
              { id: userId }, // Connect the bidder user to the room using the userId from the locals object
              { id: bid.userId }, // Connect the user who created the listing to the room
            ],
          },
        },
      });

      // Now you have a new room created and both users are connected to it
      // You can use this room in the frontend to implement the chat feature

      // Update the bid status to "Accepted"
      await prisma.bid.update({
        where: {
          id: bidId,
        },
        data: {
          bidStatus: "Accepted",
        },
      });

      await prisma.job.create({
        data: {
          listingId: bid.listingId,
          userId: userId,
          contractorId: bid.userId,
          bidId: bid.id,
          jobAmount: bid.bidAmount,
          jobStatus: "Pending",
          jobDate: bid.listing?.startDate // You can set the initial status of the job here
          // Add other fields as needed, such as jobAmount, jobDate, etc.
        },
      });
      
      // Return a success response
      return {
        status: 201,
      };
    } catch (err) {
      console.error(err);
      return fail(500, { error: { message: "Failed to update bid or create chat room." } });
    }
  },
};


