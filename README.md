# bubot
Un bot utile a sa communauté, qui peux l'animer, la fideliser, la faire grossir

# Lancement
* pour installer les packages: `yarn`
* pour lancer les tests: `yarn test:local`
* pour lancer le bot: `yarn start:local`

Il faut pour lancer le serveur une base de donnée.

# .env.test TEMPLATE
```
# App requirements
NODE_ENV=test

# Debug params
DEBUG_COLORS=true
DEBUG_JSON=false
DEBUG_SERVERINFO=false
DEBUG_HIDE_DATE=false

# Choix du level de debug
# FATAL     --     logs only log.fatal
# ERROR     --     log.fatal, log.error
# WARN       --     log.fatal, log.error, log.warn
# INFO       --     log.fatal, log.error, log.warn and log.info
# DEBUG     --     log.fatal, log.error, log.warn, log.info and log.debug
DEBUG_LEVEL=WARN

#DEBUG=*,-mocha*,-knex*,-express*,-righter*,-sql
#DEBUG=sql,errors,log


DATABASE_host=localhost
DATABASE_port=5432
DATABASE_database=Bubot
DATABASE_user=username
DATABASE_password=password

DISCORD_token=YOUR_TOKEN
DISCORD_clientId=YOUR_BOT_ID
```
