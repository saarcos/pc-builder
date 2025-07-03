import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = await getDb();
    const component = await db
      .collection('components')
      .findOne({ _id: new ObjectId(id) });

    if (!component) {
      return NextResponse.json({ message: "No se encontró el componente" }, { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error("Error al obtener componente:", error);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
