# Sunny Villas
Created with the server side rendering for Attain Framework.

## Backend Architecture

This backend is a fully object-oriented backend, meaning you can change the database service with just one line of code.

To create a new database service, create a new TypeScript class and implement the `serviceDao` interface located in `controllers/utils/models`.<br />
You can use any database you want, as long as you return the right information. 

This project uses a `PostgreSQL` database. The `Postgres` helper is responsible for querying the data in the database. This helper is used by the `PostgresService` to query data and return it in the right place.

In order for the server to use your service, go to `controllers/utils/mod.ts` and change the definition of the `service` variable. The controllers will now use your service automatically.

## Frontend Artchitecture

This project uses React.js and MaterialUI for unconditioning responsive design. 

### Pages
- `/` - the home page
- `/login` and `/signup` - authentication pages.
- `/bookings` for the user's list of bookings.
- `/deals` for new available deals.
- `/booking/:bid` for a detailed booking page.
- `/deal/:id` for a detaled deal page.

## Avaliable Scripts

### attain dev
start dev server.

### attain build
build static and view files.

### attain start
start production server which is not watching the file changes.

