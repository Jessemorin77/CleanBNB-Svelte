import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/database";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ request }) => {
    return {
        properties: await prisma.property.findMany(),
    }
}

export const actions: Actions = {
    createProperty: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData()) as Record<string, string | number>;

        const {
            Address,
            City,
            State,
            Zip,
            Beds,
            Baths,
            Sqft,
            Type,
            Status,
            Desc,
        } = formData;

        const convertedFormData = {
            Address: String(Address),
            City: String(City),
            State: String(State),
            Zip: Number(Zip),
            Beds: Number(Beds),
            Baths: Number(Baths),
            Sqft: Number(Sqft),
            Type: String(Type),
            Status: String(Status),
            Desc: String(Desc),
        };

        try {
            await prisma.property.create({
                data: convertedFormData,
            });
        } catch (err) {
            console.error(err);
            return fail(500, { error: { message: "Failed to create property." } });
        }
        return {
            status: 201,
        };
    },
};

    
