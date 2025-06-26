import { getDb } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const db = await getDb();
        const { searchParams } = new URL(req.url);

        const componentType = searchParams.get('componentType');
        const search = searchParams.get('search') || '';
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '12', 10);
        const skip = (page - 1) * limit;

        const query: Record<string, unknown> = {};

        if (componentType) {
            query.componentType = componentType;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const components = await db
            .collection('components')
            .find(query)
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await db.collection('components').countDocuments(query);

        return NextResponse.json({
            data: components,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return NextResponse.json(
            { message: 'Error al obtener productos' },
            { status: 500 }
        );
    }
}
