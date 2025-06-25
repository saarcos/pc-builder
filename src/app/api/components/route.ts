import { getDb } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const db = await getDb();
        const { searchParams } = new URL(req.url);
        const componentType = searchParams.get('componentType');

        const query = componentType ? {componentType} : {};
        const components = await db.collection('components').find(query).toArray();
        return NextResponse.json(components);
    } catch (error) {
        console.error('Error al obtener productos:', error)
        return NextResponse.json(
            { message: 'Error al obtener productos' },
            { status: 500 }
        )
    }
}