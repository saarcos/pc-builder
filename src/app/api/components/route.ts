import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const db = await getDb();
        const { searchParams } = new URL(req.url);

        const componentType = searchParams.get('componentType');
        const search = searchParams.get('search') || '';
        const sort = searchParams.get('sort'); // 'asc' o 'desc
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
        const sortOptions: Record<string, 1 | -1> = {};
        if (sort === 'asc') {
            sortOptions.price = 1;
        } else if (sort === 'desc') {
            sortOptions.price = -1;
        }

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

        const components = await collection.find(query).sort(sortOptions).skip(skip).limit(limit).toArray();
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
export async function DELETE(req: NextRequest) {
    try {
        const db = await getDb();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ message: "Falta el parámetro 'id'" }, { status: 400 });
        }
        const result = await db.collection('components').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "No se encontró el componente con ese ID" }, { status: 404 });
        }
        return NextResponse.json({ message: "Componente eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar componente:", error);
        return NextResponse.json({ message: "Error al eliminar componente" }, { status: 500 });
    }
}
