import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

export const database = drizzle(process.env.DATABASE_URL!, { schema });

