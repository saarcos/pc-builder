// /lib/mongodb.ts
import { Build } from "@/app/types/pc-builder";
import { MongoClient, Db, ObjectId } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const uri: string = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('pc_builder');
}
export type BuildDocument = Omit<Build, '_id'> & { _id: ObjectId };

export async function getBuildById(buildId: string): Promise<Build | null> {
  const db = await getDb();

  if (!ObjectId.isValid(buildId)) return null;

  const result = await db
    .collection<BuildDocument>('builds')
    .findOne({ _id: new ObjectId(buildId) });

  if (!result) return null;

  // Convertimos _id de ObjectId a string si es necesario
  return {
    ...result,
    _id: result._id.toString(),
  };
}

export default clientPromise;
