# Bike-End-Back

- Installation des modules nécessaires à l'application `npm install -y`
  - (axios, bcrypt, cors, dotenv, express, express-jsdoc-swagger, joi, jsonwebtoken, pg, redis)
- Création de la BDD **bikeend** sur *PostgreSQL* qui va accueilir la structure
- Installation de **Sqitch** (https://sqitch.org/download/) ici pour *PostgreSQL* sur *Linux*
  - `apt-get install sqitch libdbd-pg-perl postgresql-client`
- Paramétrage du fichier **sqitch.conf** sur le modèle *sqitch.example.conf* avec les identifiants de votre BDD
- Installation de **Redis‌** (https://redis.io/docs/getting-started/) ici sur *Linux*
  ```
  curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

  echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
  
  sudo apt-get update
  sudo apt-get install redis
  ```
- Lancement du serveur **Redis** `redis-server` sur un autre terminal
- Vérification du démarrage de **Redis** `redis-cli ping` => réponse `PONG`
- Paramétrage du fichier **.env** sur le modèle *.env.example* avec les identifiants de votre BDD
> - Démarrage avec `npm run builddev` en mode dev (correspond à `npm i && sqitch deploy`)
> - Démarrage avec `npm run buildprod` en mode prod (correspond à `sqitch --target production deploy`)
> - Réinitialisation avec `npm run resetdb` en mode dev (correspond à `sqitch revert -y && sqitch deploy`)
