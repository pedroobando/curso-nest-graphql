<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Anylist API GraphQl

1. Clonar proyecto
2. `yarn install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar: `yarn start:dev`

7. Ejecutar SEED

```
http://localhost:3000/graphql
```

8. Ejecutar docker compose con otro nombre

```
docker compose -f minio-compose.yml up -d
```
