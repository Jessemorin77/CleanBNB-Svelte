import type { PageServerLoad,Actions } from "./$types";
import prisma from "$lib/database";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
    const userId = locals.user?.id; // Get the userId from the locals object
    const roomId = parseInt(params.slug); // Convert the slug to an integer using parseInt()
    console.log("roomId: ",roomId)
    // Fetch the messages for the specific chat room and include sender and receiver details
    const messages = await prisma.message.findMany({
        where: {
            roomId: roomId, // Use the roomId here, not params.slug
        },
        include: { 
            sender: true,
            receiver: true,
        },
    });

    return {
        messages,
    };
};


export const actions: Actions = {
    sendMessage: async ({ request, params, locals }) => {
        const formData = Object.fromEntries(await request.formData()) as Record<string, string | number>;

       const {
            content,
        } = formData;

        const convertedFormData = {
            content: String(content),
        };

        const userId = locals.user?.id; // Get the userId from the locals object
        const roomId = parseInt(params.slug); // Convert the slug to an integer using parseInt()

        if (!userId) {
            return fail(403, { error: { message: "User not authenticated." } });
        }

        try {
            await prisma.message.create({
                data: {
                    ...convertedFormData,
                    sender: {
                        connect: {
                            id: userId,
                        },
                    },
                    receiver: {
                        connect: {
                            id: userId,
                        },
                    },
                    room: {
                        connect: {
                            id: roomId,
                        },
                    },
                    content: String(content),
                },
            });
        }
        catch (err) {
            console.error(err);
            return fail(500, { error: { message: "Failed to send message." } });
        }
        return {
            status: 201,
       }
    }
}
