## User Page

Only populates what is needed for the user page. **Additional fields exist for workspace that aren't needed for the user page and are not included.**

```json
{
  "name": "Ricardo Camacho Mireles",
  "email": "",
  "image": "",
  "_id": "634084c70984362d0a83f1c0",
  "workspaces": [
    {
      "_id": "63408606597b3c3ca580bd52",
      "name": "Cool Workspace Project",
      "description": "This is a cool workspace project description",
      "owner": {
        "_id": "634084c70984362d0a83f1c0",
        "name": "Ricardo Camacho Mireles",
        "image": ""
      },
      "users": [
        {
          "_id": "634084c70984362d0a83f1c0",
          "name": "Ricardo Camacho Mireles",
          "image": ""
        }
      ]
    }
  ]
}
```

---

## API Architecture

**Workspace**

/api/workspace/

- Allows POST in order to create a new workspace

/api/workspace/:id

- Allows GET in order to get a workspace
- Allows PUT in order to update a workspace
- Allows DELETE in order to delete a workspace

**Board**

/api/workspace/board/

- Allows POST in order to create a new board (will need [wid] on req body)

/api/workspace/board/:id

- Allows GET in order to get the board details
- Allows PUT in order to update a board
- Allows DELETE in order to delete the board

/workspace/[wid]/board/[bid]/ticket/[tid]
