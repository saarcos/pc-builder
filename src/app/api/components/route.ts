import { getDb } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const db = await getDb();
        const components = await db.collection('components').find({}).toArray();
        return NextResponse.json(components);
    } catch (error) {
        console.error('Error al obtener productos:', error)
        return NextResponse.json(
            { message: 'Error al obtener productos' },
            { status: 500 }
        )
    }
}