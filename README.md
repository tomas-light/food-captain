# food-captain
Food menu manager for home

### Installation
```bash
yarn install
```

### Dev

#### MacOS / Linux
<i>Are not supported (you have to find out solution for your system by yourself)</i>

#### First run on Windows

1) Modify your `C:/Windows/System32/drivers/etc/host` file with adding following line:
```
127.0.0.1 food-captain.localhost
```

2) Run caddy with Administration permission to allow him install TSL certificates in your system:
```bash
yarn caddy:run 
```

#### Dev run

To run application in dev mode you need to:
1) run docker service
2) run database, server/host and server/api projects:
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
```bash
yarn db:docker:run
```
Database is running in docker container [Database Readme](./application/server/database/Readme.md).

Application will run on https://food-captain.localhost/

To use API project separately you have to un Caddy by yourself with
```bash
yarn caddy:run 
```
