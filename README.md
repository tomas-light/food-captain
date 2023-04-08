# food-captain
Food menu manager for home

### Installation
```bash
yarn install
```

### Dev
To run application in dev mode you need to:
1) run docker service
2) run docker container (see Database [Readme](./application/server/database/Readme.md))
3) run server/host and server/api projects:
you may use one command for all:
```bash
yarn start 
```
or execute independent commands for each of them in parallel:
```bash
yarn start:api
```
```bash
yarn start:host
```

Application will run on https://food-captain.localhost/
