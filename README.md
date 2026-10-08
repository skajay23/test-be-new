#### Installation Process
aaaa
- Create a `.env` file and specify environmental values. Use postgresql as the database. (there is a .env.example file attached to help you)

- Create a `.env.test` file and put all environmental values other than DB_URL. Create a new test database and put its credentials instead of the real database.

- Run `yarn install`

- Run `yarn prisma:generate`

- Run `yarn prisma:migrate-dev`

- Run `yarn start:dev`

#### Testing

- Run this first: `yarn pretest:e2e` . It will create and scaffold the test database

- Run `yarn test:e2e` to test the files.

- Run `test:cov-e2e` to generate the test coverage.

#### running locally with docker

- install docker desktop from [here](https://www.docker.com/products/docker-desktop/)

- keep docker desktop turned on when using docker

- go to local sysrisk-be-new repo and open terminal there and run `docker compose up` in the terminal and wait

- to terminate the container press ctrl+c in the terminal and write `docker compose down`

- when new update is available just pull latest changes from remote repo and run `docker compose up` in terminal

- when facing problem, delete sysrisk-be image from docker desktop

- to delete all database data, run `docker compose down -v` in terminal
