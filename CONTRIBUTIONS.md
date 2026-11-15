# Who built what – presentation guide

| Member | Role | Files (open these during the presentation) |
|--------|------|--------------------------------------------|
| 1 | Server setup and Express routes | `server.js`, `routes/*.js`, `controllers/residentsController.js`, `middleware/errorHandler.js` |
| 2 | SQLite database | `db/schema.sql`, `db/seed.sql`, `db/queries.sql`, `db/queries.js`, `db/database.js` |
| 3 | Room CRUD and join endpoint | `controllers/roomsController.js`, `controllers/allotmentsController.js` |
| 4 | Validation and search | `validation/validateRoom.js`, `validation/validateId.js`, `validation/roomSearch.js` |
| 5 | Sorting, Postman, README | `sorting/roomSort.js`, `postman/HostelHub.postman_collection.json`, `README.md` |

## How a request flows (explain in this order)
`GET /rooms?block=A&sort=name&order=desc`

1. **Member 1** – `server.js` receives it; `routes/roomRoutes.js` sends it to the rooms handler.
2. **Member 3** – `getAllRooms` in `roomsController.js` handles the request.
3. **Member 5** – `buildRoomSort` checks `sort` and `order` (unknown field → 400 "Cannot sort by that field").
4. **Member 4** – `buildRoomSearch` checks `block`, `name`, `available`.
5. **Member 2** – `db/queries.js` runs the SQL on the SQLite database.
6. **Member 3** – the controller returns the rooms with status 200.

## Demo script per member
- **Member 1:** show `GET /`, an unknown URL (404) and the three route files.
- **Member 2:** show `schema.sql` (primary and foreign keys), `seed.sql`, and run a query from `queries.sql`.
- **Member 3:** Postman: GET all, GET one, POST (201), PUT (200), DELETE (204), then `GET /allotments`.
- **Member 4:** POST with a missing name (400 with message), PUT with an invalid block, `GET /rooms?block=A`.
- **Member 5:** the three sort tests in Postman, then walk through the README.
