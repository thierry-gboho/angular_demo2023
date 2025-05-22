Création d'une observation de banc
```
curl -d '[{"name": "new Recipe", "description": "new description", "imagePath": "http/path/image.jpg", "ingredients": [ { "name": "carrot", "amount": 45}, {"name": "onion", "amount": 54} ] } ]' -H "Content-Type: application/json" -X POST http://localhost:8080/recipes && echo
```
