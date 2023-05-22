# TODO

## Implémenter l'algorithme de calcul du score d'un coup

Règles du molkky courtes ([version complète ici](https://www.molkky.info/regles-officielles/)) : 
- si on lance en faisant tomber une quille, on marque la valeur indiqué sur la quille
- si on lancee et qu'on fait tomber plusieurs quilles, on marque le nombre de quille tombée
- si on ne touche aucune quille, on ne marque pas de point
- si on ne marche aucun point pendant trois tours consécutifs on perd la partie
- si on atteint 50 exactement on gagne la partie
- si on dépasse 50, notre score retombe à 25 point

À coder dans ce fichier : backend/srsc/utils/score.utils.ts

> Note: il y a des tests unitaires dans le projet pour valider les règles

## Render dynamique le dashboard de l'acceuil

Actuellement le dashboard utilise des données qui sont mockées dans le frontend.

L'idée est d'ajouter un endpoint dans le backend qui va renvoyer l'historique des 5 dernières parties.

## Gérer les joueurs en doublon

Actuellement on ne gère pas correctement l'ajout de joueur en double. On voudrait que si on essaie d'ajouter 2 fois le même nom, il soit refusé (en gérant différentes cases "John" et "john" ne sont pas compatibles).

## Gérer les parties non finies

Actuellement si on quitte la page d'une partie on ne peut pas reprendre la partie.

On souhaite ajouter un lien sur le détail d'une partie dans le dashboard permettant de revenir à la page permettant de jouer la partie.

On ne souhaite pas afficher ce lien sur un partie qui n'est pas finie (qui n'a pas de vainqueur ou tous les joueurs qui ont perdus).

## Rendre plus visible les parties non terminées

Les parties non finies sont difficilement identifiables, on souhaite donc avoir un nouveau panel sur le dashboard avec les parties non terminées pour plus facilement les reprendre.

On ne veut plus les affichées dans l'historique des dernières parties. On veut afficher toutes les parties non finies quelque soit la date de création.


