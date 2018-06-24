# Installation packages
- npm i

## Start server
- pbiviz start

## Créer un package
- pbiviz package

## Créer un projet (pour info)
- pbiviz new myTestVisual

## Tslint
- Installer l'extension tslint
- tslint --init initialise la conf si le fichier tslint.json n'existe pas et se base sur les rules de microsoft. Non utilisé ici car trops de contraintes pour le momment...
- https://basarat.gitbooks.io/typescript/docs/styleguide/styleguide.html

## Chrome debug
- Activer le certificat pour le localhost : chrome://flags/#allow-insecure-localhost
- Installer l'extension chrome
- /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrx@ome --remote-debugging-port=9222
- https://powerbi.microsoft.com/fr-fr/

# TODOS
- Nettoyage code / réorganisation
- Multilingue, Fichier des libellés text / Internationalization (i18n)
- Ajout d'une icone de contrôle
- Revoir le fichier de configuration package.json à configurer correctement (licence nmp start etc)
- Publier sur le store -> quid de la licence / propriétaire / maintenance
- Ajout d'une bulle d'aide de description à coté du titre, commentaire en dessous du contrôle ?
- Arrondi supperieur ou inferieur ou au okus, et décimals ? -> à configurer ?
- Définir les descriptions des propriétés.
- Définir les noms des priorités pour la localization
- Si une seule mesure de VOR sélectionnée, sélectionner la valide pour la non valide, ne pas activer le VOR des mesures?
- Utiliser la palette des couleurs pour définir des valeurs par défaut -> Récupérer les couleurs des mesures sélectionnées.
- AJouter le fichier de licence
- Sur githhub, le fichier readme doit décrire le projet, mettre les bug dans issues et la todo liste dans pull request
- Gestion des version api à automatiser (1.8, 1.11, 1.12) via gulp? -> Création de plusieurs branches sur github.

# Idées pour plus tard
- Titre custom & style du titre + font Fira, option titre au dessus ou en dessous -> limite sur une seule ligne -> Saisie du titre dans les options ?
- Option de décalage des animations si plusieurs contrôles ?
- Police text roboto  ? --> Utiiliser des fonts externes ? Les inclures dans le package.
- Mettre le suffixe % plus petit que la valeur ?
- Ne plus utiliser d3js pour desquestions de perf -> Chercher à minimiser et n'utiliser que les librairies utiles -> utiliser au moins la V4|V5 de d3js -> Compatible 1.8?
- Regarder l'utilisation des canvas
- Utilisation des thèmes personalisés https://docs.microsoft.com/fr-fr/power-bi/desktop-report-themes

# Questions
- Comment ajouter dans les propriétés un slider avec des ranges
- Récupérer les couleurs par défaut des mesures/groupes sélectionnés.
- Comment récupérer les paramètres par défaut des options comme le title, le border etc -> Impossible pour le moment
- Sur les options, comment cacher/désactiver des options en fonctions d'autres options -> Faire un test avec enumerateObjectInstances du visual
- Comment définir des valeurs min/max
- Le répertoire .temp n'est pas exclus par gitignore
- Voir l'utilisation des tooltips de page : https://microsoft.github.io/PowerBI-visuals/docs/latest/how-to-guide/adding-report-page-tooltips/
- Voir l'utilisation des tooltips : https://microsoft.github.io/PowerBI-visuals/docs/latest/how-to-guide/adding-tooltips/
- Regarder l'utilité du fichier dependencies.json
- Le tooltip et le descriptionKey ne sont pas prévues dans le capabilities.json de la 1.8, voir si les ajouter à la main de pose pas de pbs lors du déploiement 

# Liens utiles
- https://tsmatz.wordpress.com/2016/09/27/power-bi-custom-visuals-programming/
- https://github.com/Microsoft/PowerBI-visuals#developing-your-first-powerbi-visual
- https://community.powerbi.com/t5/Developer/custom-visual-enumeration-issues/m-p/146866
- https://microsoft.github.io/PowerBI-visuals/docs/latest/concepts/capabilities/