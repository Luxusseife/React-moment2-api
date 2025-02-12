# Moment 2, API till uppgiften i _Reaktiv React_
Den här README-filen har skapats för att redogöra för användningen av webbtjänsten/API:et.

I koden implementeras **CRUD**; create (POST), read (GET), update (PUT) och delete (DELETE). 

## Användning av API

Här nedan beskrivs användningen av API:et:

| **Metod** | **Endpoint** | **Beskrivning**                                                                                                                                   |
|:---------:|:------------:|---------------------------------------------------------------------------------------------------------------------------------------------------|
| GET       | /todo        | Hämtar alla lagrade att göra-uppgifter.                                                                                                        |
| POST      | /todo        | Lagrar en ny att göra-uppgift. Kräver att ett objekt med tre fält; title, description och status skickas med. Description är inte required och status har ett defaultvärde som är "Ej påbörjad".                          |
| PUT       | /todo/:id    | Uppdaterar en existerande att göra-uppgift med angivet ID. Kräver att ett objekt med tre fält; title, description och status skickas med. Description är inte required. |
| DELETE    | /todo/:id    | Raderar en att göra-uppgift med angivet ID.                                                                                                                  |

### Output

Ett todo-objekt returneras/skickas i JSON-format med följande struktur:
```
{
  "_id": "67ab48e0f45fd91c93e2ea0b",
  "title": "Bära in säng",
  "description": "Ta emot leverans. Bär in säng och ta av emballage.",
  "status": "Avklarad",S
}
```

#### _Skapad av Jenny Lind, jeli2308_.