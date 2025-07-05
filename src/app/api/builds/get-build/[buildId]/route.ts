import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, context: { params: Promise<{ buildId: string }> }) {
    try {
        const { buildId } = await context.params;
        const db = await getDb();
        const result = await db.collection('builds').findOne({ _id: new ObjectId(buildId) });
        if (!result) {
            return NextResponse.json({ message: "No se encontró la build" }, { status: 404 });
        }
        return NextResponse.json(result)
    } catch (error) {
        console.error("Error al obtener componente:", error);
        return NextResponse.json({ message: "Error interno" }, { status: 500 });
    }
}