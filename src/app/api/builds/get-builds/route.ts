import { getDb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const db = await getDb();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const builds = await db.collection('builds').find({userId}).toArray();
        return NextResponse.json({
            success: true,
            data: builds,
        });
    } catch (error) {
        console.error('Error al obtener builds:', error);
        return NextResponse.json(
            { message: 'Error al obtener builds' },
            { status: 500 }
        );
    }
}
