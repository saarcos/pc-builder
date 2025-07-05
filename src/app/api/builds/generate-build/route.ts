import { NextRequest, NextResponse } from "next/server";
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { Item } from "@/app/types/pc-builder";

const componentSchema = z.object({
    id: z.string(),
    name: z.string()
});

const buildSchema = z.object({
    build: z.object({
        processor: componentSchema,
        motherboard: componentSchema,
        videoCard: componentSchema.optional(),
        memory: componentSchema,
        storage: componentSchema,
        psu: componentSchema,
        cooler: componentSchema.optional()
    })
});

type RawAvailableComponents = {
    processors: Item[];
    motherboards: Item[];
    "video-cards"?: Item[];
    memory: Item[];
    "hard-drives": Item[];
    "power-supplies": Item[];
    coolers?: Item[];
};

function transformAvailableComponents(raw: RawAvailableComponents) {
    const format = (arr: Item[] = []) =>
        arr
            .sort((a, b) => a.price - b.price)
            .map((item) => ({
                id: item._id,
                name: item.name,
                price: item.price
            }));

    return {
        processor: format(raw.processors),
        motherboard: format(raw.motherboards),
        videoCard: format(raw["video-cards"]),
        memory: format(raw.memory),
        storage: format(raw["hard-drives"]),
        psu: format(raw["power-supplies"]),
        cooler: raw.coolers ? format(raw.coolers) : undefined,
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { usage, budget, storageRequirement, rawComponents } = body;

        const availableComponents = transformAvailableComponents(rawComponents);

        const prompt = `
            You are a PC building assistant AI. Your job is to generate a compatible and optimized PC build based on the user's goals and the list of available components.

            Constraints:
            - Only select components from the provided list.
            - The build must be fully compatible:
                - CPU must match the motherboard socket.
                - PSU must provide sufficient power for all components.
            - Respect the user's total budget: $${budget}. Do **not** exceed this amount.
            - At the same time, aim to **maximize the quality and performance of the components** while **minimizing unused budget**. Avoid builds that leave a large portion of the budget unspent when better parts are available.
            - If there are no available video cards, do not include one.
            - Only add a cooler if there's remaining budget after selecting the essential components.
            - Storage must meet at least ${storageRequirement} GB.
            - Optimize the component selection for this usage: ${usage} (e.g., gaming, office, rendering, etc.).
            - If the usage is office-dedicated it means that we need to add a video card
            - Use only the provided IDs and names for each component.

            Available components (each one has id, name, and price):
            ${JSON.stringify(availableComponents, null, 2)}

            Respond with a JSON object in this exact format:

            {
            build: {
                processor: { id: string, name: string },
                motherboard: { id: string, name: string },
                videoCard?: { id: string, name: string },
                memory: { id: string, name: string },
                storage: { id: string, name: string },
                psu: { id: string, name: string },
                cooler?: { id: string, name: string }
            }
            }
            `;
        const result = await generateObject({
            model: openai('gpt-4o'),
            schema: buildSchema,
            prompt,
        });

        return NextResponse.json(result.object);

    } catch (error) {
        console.error('Error generating the build:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}
