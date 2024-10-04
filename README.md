<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Important notes

- This microservice of payment is different to anothers, the reason is because it is hibrid (work with NATS server and also as a REST traditional server).

- Also you will see the PORTS section inside the docker-compose.yml (to allow it works as REST server and expose a port to exterior), in another hand, inside other MS in the docker-compose.yml is not set the PORTS.

## Instalations

1. Joi

```
npm i joi
```

2. Dotenv

```
npm i dotenv
```

3. Stripe (Important)

```
npm install stripe --save
```

4. Class-validator and transformer

```
npm i class-validator class-transformer
```

5. Install microservices

```
npm i --save @nestjs/microservices
```

6. **NATS**

```
npm i --save nats
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
