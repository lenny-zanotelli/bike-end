# Routes nécessaires pour l'API Bike-end (MVP)

| route                |  GET  | POST | PATCH | DELETE |
| :------------------- | :---: | :---: | :---: | :----: |
| - - - *utilisateur* - - - |      |      |      |      |
| /login               |   ❌   |   ✅   |   ❌   |   ❌   |
| /signup              |   ❌   |   ✅   |   ❌   |   ❌   |
| /user                |   ✅   |   ❌   |   ✅   |   ✅   |
| - - - *itinéraires* - - - |      |      |      |      |
| /autocomplete/:place |   ✅   |   ❌   |   ❌   |   ❌   |
| /journey/search*     |   ✅   |   ❌   |   ❌   |   ❌   |
| /journey/detail*     |   ✅   |   ❌   |   ❌   |   ❌   |
| - - - *favoris* - - -     |      |      |      |      |
| /favorite*           |   ✅   |   ✅   |   ✅   |   ✅   |
| - - - *doc API* - - -     |      |      |      |      |
| /api-docs            |   _   |   _   |   _   |   _   |
