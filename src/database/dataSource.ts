import {DataSource} from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "asdf",
  database: "bitespeed",
  synchronize: true,
  logging: true,
  entities: [__dirname + "/../entity/*.{js,ts}"],
});

