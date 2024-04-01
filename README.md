# The Molkky test

## Develop

```bash
npm ci
npm run dev
```

> Notes: frontend will be available at http://localhost:5173 and backend will be available at http://localhost:3000

## TODO (FR)

### Failing tests... 😰

Quand vous exécutez les tests unitaires (avec `npm run dev` ou `npm run test-backend`) vous pouvez voir que deux tests échouent.

Vous devez faire passer tous les tests.

> Indice: les règles peuvent pas pas avoir été implémenté ou pas correctement 🙈 

### Come on the backend side! 😈

Il manque un endpoint : GET http://localhost:3000/api/games

Vous devez l'implémenter.

> Astruce: jetez un coup d'œil à `backend/src/features/games/rest/games.controller.ts` 😉

### Go to the front side! 😇

Sur le dashboard (sur la page d'accueil), vous pouvez voir les tableaux de score des précédentes sessions. Les données dans ce dashboard sont statiques (les données sont stockées dans le frontend).

En appelant le endpoint que vous avez implémentez à la question précédente, vous devez rendre dynamique le dashboard.

> Astuce: jetez un coup d'œil à `frontend/src/features/dashboard/DashboardPage.tsx` pour  voir comment le dashboard récupère ses données 😇

### The game is over! 🏆

Actuellement la partie ne se termine jamais. Le status d'une partie n'est pas correctement calculé à chaque tour.

Vous devez corriger ça côté backend (calcul du status) and côté front (la fin de partie affichage un message pour le gagnant).

> Astuce 1: la fonction de calcul du status existe déjà, donc il est possible que l'implémentation soit incorrecte 🤔
> Astuce 2: ne perdez pas trop de temps sur le style : contentez vous de désactiver le champ "board input", le bouton sauvegarder, et affiché un simple message de félicitation pour le gagnant 👌



## TODO (EN)

### Failing tests... 😰

When running unit tests (with `npm run dev` or `npm run test-backend`) you should see 2 failing tests.

You should make all tests pass.

> Tip: the rules may have not been implemented or not correctly 🙈 


### Come on the backend side! 😈

There is one missing endpoint: GET http://localhost:3000/api/games

You should implement it.

> Tip: take a look at `backend/src/features/games/rest/games.controller.ts` 😉

### Go to the front side! 😇

On the dashboard (on the home page), you can see a score scoreboard of the previous sessions. The data used in the dashboard is static (data is stored in the frontend).

By calling the endpoint you implemented in the previous question, you should make the dashboard dynamic.

> Tip: take a look at `frontend/src/features/dashboard/DashboardPage.tsx` to see how the dashboard get its data. 😇

### The game is over! 🏆

Currently a game will never stop. The game status is not correctly computed after each turn.

You should fix that on the backend side (status computation) and on the front side (end the game and show a winner message).

> Tip 1: the status computation function already exists, so it may not be correctly implemented 🤔
> Tip 2: do spend to much time on the style: just disable the board input, the save button, and display a simple congratulation message for the winner 👌
