import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/database";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ request }) => {
    return {
        listings: await prisma.listing.findMany(),
        properties: await prisma.property.findMany(),
    };
};

export const actions: Actions = {
    createListing: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData()) as Record<string, string | number>;

        const {
            propertyId,
            jobType,
            contractorType,
            readyToHire,
            startDate,
            endDate,
            title,
            description,
            budget, 
        } = formData;

        const convertedFormData = {
            propertyId: String(propertyId),
            jobType: String(jobType),
            contractorType: String(contractorType),
            readyToHire: Boolean(readyToHire),
            startDate: new Date(String(startDate)), // Convert to Date object
            endDate: new Date(String(endDate)), // Convert to Date object
            title: String(title),
            description: String(description),
            budget: Number(budget),
        };

        try {
            console.log("propertyId: ",propertyId)
            await prisma.listing.create({
                data: convertedFormData,
                
            });
        } catch (err) {
            console.error(err);
            return fail(500, { error: { message: "Failed to create listing." } });
        }
        return {
            status: 201,
            
        };
    },
};
