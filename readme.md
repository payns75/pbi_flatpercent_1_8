# Chrome debug
- Activer le certificat pour le localhost : chrome://flags/#allow-insecure-localhost
- Installer l'extension chrome
- /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrx@ome --remote-debugging-port=9222
- https://powerbi.microsoft.com/fr-fr/

# TODOS

## Code
- Nettoyage code / réorganisation
- Ajout d'une bulle d'aide de description à coté du titre, commentaire en dessous du contrôle ?
- Arrondi supperieur ou inferieur ou au plus près, et nb décimals ? -> à configurer ?
- Si une seule mesure de VOR sélectionnée, sélectionner la valide pour la non valide, ne pas activer le VOR des mesures si riend de sélectionné ?
- Vérifier que si pas d'unité configuré, il n'affiche rien (%)
- Mettre par défaut la fonction de somme.
- Utiliser la palette des couleurs pour définir des valeurs par défaut -> Récupérer les couleurs des dimensions sélectionnées.
    - https://github.com/Microsoft/powerbi-visuals-utils-colorutils/blob/master/docs/api/colorHelper.md

## Configuration
- Multilingue, Fichier des libellés text / Internationalization (i18n)
- Ajout d'une icone de contrôle
- Revoir le fichier de configuration package.json à configurer correctement (licence npm start etc)
- Définir les noms des priorités pour la localization
- Définir les descriptions des propriétés.
- AJouter le fichier de licence
- Publier sur le store -> quid de la licence / propriétaire / maintenance
- Sur githhub, le fichier readme doit décrire le projet, mettre les bug dans issues et la todo liste dans pull request
- Gestion des version api à automatiser (1.8, 1.11, 1.12) via gulp? -> Création de plusieurs branches sur github.
- Tester 'pbiviz update 1.2.0' --> en upgrade et downgrade
- Le répertoire .temp n'est pas exclus par .gitignore

## Idées
- Titre custom & style du titre + font Fira, option titre au dessus ou en dessous -> limite sur une seule ligne -> Saisie du titre dans les options ?
- Police text roboto  ? --> Utiliser des fonts externes ? Les inclures dans le package ?
- Pour les vor, option d'inversion des couleurs de fond et de texte (blanc sur fond vor)
- Mettre le suffixe % plus petit que la valeur ?
- d3js -> Chercher à minimiser et n'utiliser que les librairies utiles -> utiliser au moins la V4|V5 de d3js -> Compatible 1.8?
- Utilisation des thèmes personalisés https://docs.microsoft.com/fr-fr/power-bi/desktop-report-themes

# Questions
- Comment ajouter dans les propriétés un slider avec des ranges
- Comment récupérer les paramètres par défaut des options comme le title, le border etc -> Impossible pour le moment
- Sur les options, comment cacher/désactiver des options en fonctions d'autres options -> Faire un test avec enumerateObjectInstances du visual
- Comment définir des valeurs min/max
- Voir l'utilisation des tooltips de page : https://microsoft.github.io/PowerBI-visuals/docs/latest/how-to-guide/adding-report-page-tooltips/ -> Non compatible V1.8
- Voir l'utilisation des tooltips : https://microsoft.github.io/PowerBI-visuals/docs/latest/how-to-guide/adding-tooltips/ -> Non compatible v1.8
- Regarder l'utilité du fichier dependencies.json
- Le tooltip et le descriptionKey ne sont pas prévues dans le capabilities.json de la 1.8 

# Liens utiles
- https://microsoft.github.io/PowerBI-visuals/docs/latest/concepts/capabilities/  -> Doc de base
- https://github.com/Microsoft/PowerBI-visuals#developing-your-first-powerbi-visual -> Repository d'exemples
- https://community.powerbi.com/t5/Developer/custom-visual-enumeration-issues/m-p/146866 -> A étudier, props dynaliques
