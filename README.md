
# About This project

A well structured Hono backend run with bun included Routers , Controllers , Services, Mysql Database and migration using drizzle orm.   




## Prerequisite



```bash
 Bun Version 1.1.43+
```
```bash
 MySql 8
```






## Install Bun

[Bun Documentation](https://bun.com/docs/installation)


## Run Locally

Clone the project

```bash
  git clone https://github.com/otakuict/complete-hono-backend-template.git
```

Go to the project directory

```bash
  cd complete-hono-backend-template
```

Install dependencies

```bash
  bun install
```


Migrate generate Database

```bash
bun run migrate:generate
```

Apply Migrattion  

```bash
bun run migrate:push
```

Start the server

```bash
  bun run dev
```


## API Reference Example

#### Get all items

```http
  GET /api/produtcs
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | id |
| `name` | `string` | name of product |
| `price` | `number` | price of product |


Retuen all Products in database


## Authors

- [@otakuict](https://github.com/otakuict)


## License

[MIT](https://choosealicense.com/licenses/mit/)

