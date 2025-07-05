import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_: NextRequest, context: { params: Promise<{ buildId: string }> }) {
    try {
        const { buildId } = await context.params;
        if (!ObjectId.isValid(buildId)) {
            return NextResponse.json({ message: "ID no válido" }, { status: 400 });
        }
        const db = await getDb();
        const result = await db.collection("builds").deleteOne({
            _id: new ObjectId(buildId),
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Build no encontrada" }, { status: 404 });
        }

        return NextResponse.json({ message: "Build eliminada correctamente" });

    } catch (error) {
        console.error("Error al obtener componente:", error);
        return NextResponse.json({ message: "Error interno" }, { status: 500 });
    }
}