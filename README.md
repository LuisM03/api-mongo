# Mongo API REST - CRUD 

Para correr el proyecto lo primero que debe hacer es instalar las dependencias. Para ejecutarlo `npm install`

## Estructura del proyecto.

### Colección:
1. Ratings - Calificaciones

### Endpoints:
1. **Get All Ratings** -> `GET: "ratings/"`
2. **Get One Rating** -> `GET: "ratings/:id"`
3. **Create Rating** -> `POST: "ratings/"`
4. **Create Many Ratings** -> `POST: "ratings/create_many_ratings"`
5. **Update Rating** -> `PATCH: "ratings/:id"`
6. **Update Rating Upsert** -> `PATCH: "ratings/:id/upsert"`
7. **Update Many Ratings** -> `PUT: "ratings/update_many_ratings"`
8. **Update Many Ratings Upsert** -> `PUT: "ratings/update_many_ratings/upsert"`
9. **Delete Rating** -> `DELETE: "ratings/:id"`

## Para ejecutar el proyecto corra el siguiente comando:
`npm run start`