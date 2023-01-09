This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Technologies Used

- Next.js
- Objection.js
- Knex.js
- TypeScript
- Postgresql

## Getting Started

First, clone this repo:

```bash
git clone https://github.com/Baribor/food-court-next-app.git

cd food-court-next-app
```

Then run:

```
yarn add
```

Then rename the `.env.example` to `.env` and fill the necessary data contained in it (required for database connection)
Ensure the details you enter are for a `Postgresql` Database.

Next we need to create the tables in the database run this command:

```
yarn run migrate
```

If no error occurs and you don't see the message `Batch 1 run: 1 migrations` run the command again till you see it. This happens sometimes.

Next we populate the tables with some initial data. Run:

```
yarn run seed:run
```

If no error occurs and you don't see the message `Ran 1 seed files` run the command again till you see it.

To start up the server locally, run:

```
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

API routes can be accessed on [http://localhost:3000/api](http://localhost:3000/api)

For testing purpose a default Admin user was creating while populating the table with the following details:

- email: testUser@example.com
- password: password1234

These can be used to sign in to get a token to access all routes starting with `/brands/`

Two brands were also created with possible ids of `1` and `2` respectively. While six addons were created with possie ids of `1` to `6` respectively. (You should view your database to confirm these)

### Api routes available

[http://localhost:3000/api](http://localhost:3000/api) - **GET** Base route

**http://localhost:3000/api/brands/:brandId/addons** - **GET** Gets all addons of brand with id `:brandId`

**http://localhost:3000/api/brands/:brandId/addons** - **POST** Creates a new addons for the brand with id `:brandId`

**Request body**

- `name`: The name of the meal addon (string, required)
- `description`: A description of the meal addon (string, optional)
- `price`: The price of the meal addon (number, required)
- `category`: The category of the meal addon (string, optional)

**http://localhost:3000/api/brands/:brandId/addons/:addonId** - **GET** Retrieve a single meal addon by its ID for the specified brand.

**http://localhost:3000/api/brands/:brandId/addons/:addonId** - **PATCH** Update a single meal addon by its ID for the specified brand. The request body should contain the following fields:

- `name`: The updated name of the meal addon (string, optional)
- `description`: The updated description of the meal addon (string, optional)
- `price`: The updated price of the meal addon (number, optional)
- `category`: The updated category of the meal addon (string, optional)

**http://localhost:3000/api/brands/:brandId/addons/:addonId** - **DELETE** Delete a single meal addon by its ID for the specified brand.

**http://localhost:3000/api/brands/1/add-categories** - **POST** Create a new category for meal addons for the specified brand. The request body should contain the following field:

- `name`: The name of the category (string, required)

_[NOTE]_: All the routes above requires an ADMIN role to access them. Token should be passed in the request headers with the format `token <user-token-here>` example `token Lshjsy773bsnab==`

### User routes

**http://localhost:3000/api/auth/signup** - **POST** Creates a new user. Required fields:

- `username` : Username of the user (string, required)
- `email` - Email of the user (string, required)
- `password` - Password of the user (string, required)
  On success returns a `token` to be added to the headers of restricted routes.

**http://localhost:3000/api/auth/signin** - **POST** Sign in a user. Required fields:

- `email` - Email of the user (string, required)
- `password` - Password of the user (string, required)
  On success returns a `token` to be added to the headers of restricted routes.

**http://localhost:3000/api/auth/signout** - **GET** Sign out a user. Requires a authorization token in the request header.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

To verify that your app wouldn't crash during deployment, run:

```
yarn run build
```

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Live APP

[https://food-court-next-app.vercel.app/](https://food-court-next-app.vercel.app/)
