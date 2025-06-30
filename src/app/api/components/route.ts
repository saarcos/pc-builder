import { getDb } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const db = await getDb();
        const { searchParams } = new URL(req.url);

        const componentType = searchParams.get('componentType');
        const search = searchParams.get('search') || '';
        const pageParam = searchParams.get('page');
        const limitParam = searchParams.get('limit');

        const query: Record<string, unknown> = {};

        if (componentType) {
            query.componentType = componentType;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const collection = db.collection('components');

        // Si no se pasa paginación explícita o se pide "all"
        if (!pageParam || !limitParam || limitParam === 'all') {
            const components = await collection.find(query).toArray();
            return NextResponse.json({
                data: components,
                total: components.length,
                page: 1,
                totalPages: 1,
            });
        }

        const page = parseInt(pageParam, 10);
        const limit = parseInt(limitParam, 10);
        const skip = (page - 1) * limit;

        const components = await collection.find(query).skip(skip).limit(limit).toArray();
        const total = await collection.countDocuments(query);

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
