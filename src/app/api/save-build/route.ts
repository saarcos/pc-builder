import { getDb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const componentSnapshotSchema = z.object({
    type: z.enum([
        "processor",
        "motherboard",
        "videoCard",
        "memory",
        "storage",
        "psu",
        "cooler"
    ]),
    componentId: z.string(),
    name: z.string(),
    image: z.string().url(),
    price: z.number().positive(),
    link: z.string().url()
});
const buildSchema = z.object({
    usage: z.string().min(1),
    budget: z.number().positive(),
    totalPrice: z.number().positive(),
    components: z.array(componentSnapshotSchema).min(1)
});
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = buildSchema.parse(body);

        const db = await getDb();
        const result = await db.collection("builds").insertOne({
            ...parsed,
            createdAt: new Date()
        });

        return NextResponse.json(
            { message: "Build guardada correctamente", id: result.insertedId },
            { status: 201 }
        );
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Datos inválidos", details: err.errors },
                { status: 400 }
            );
        }
        console.error("Error al guardar la build:", err);
        return NextResponse.json(
            { error: "Error del servidor" },
            { status: 500 }
        );
    }
}