# Attain-React-SSR
Server side rendering for Attain Framework.


## Avaliable Scripts

### attain dev
start dev server.

### attain build
build static and view files.

### attain start
start production server which is not watching the file changes.

## Database access

This project is working with a PostgreSQL database:
- connecting to the database in `controllers/utils/helpers/database.ts`
- queries in `controllers/utils/helpers/Postgres.ts`
- proccesing the data in `controllers/utils/PostgresService.ts`
