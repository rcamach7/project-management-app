# API Endpoints

An non-exhaustive list of API endpoints that are available in the API.

## [User]("./../schemas.md#user")

**Authentication Needed**

```js
GET /api/user/
returns Users
```

```js
GET /api/user/:id
returns User
```

```js
GET /api/user/:email
returns User
```

```js
PUT /api/user/:id
body: {
  avatar: String,
  name: String,
}
returns User
```

**No Authentication Needed**

```js
POST /api/user
body: {
  avatar: String,
  name: String,
  email: String,
  password: String,
  workspaces: [Workspaces];
}
returns User
```
