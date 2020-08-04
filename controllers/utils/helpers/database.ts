import { Client } from '../../../serverDeps.ts';
import 'https://deno.land/x/dotenv/load.ts';

const database = new Client({
  user: 'postgres',
  database: 'sunnyvillas',
  hostname: 'localhost',
  password: Deno.env.get('PASSWORD')!,
  port: 5432,
});

await database.connect();

export default database;
