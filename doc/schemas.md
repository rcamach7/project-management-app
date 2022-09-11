## Database Documents

User Schema:

```js
  image: String,
  name: String,
  email: String,
  Workspaces: Workspace[]
  // Future Fields V2.0
  requestedWorkspaces: Workspace[];
  invitedToWorkspaces: Workspace[];
```

Workspace Schema:

```js
  _id: ObjectId,
  name: String,
  description: String,
  users: User[],
  boards: Board[],
  // Future Fields V2.0
  admins: User[];
  pendingInvitations: User[];
  requestedUsers: User[];
```

---

## Stored within above documents - not in their own collection.

Board Schema:

```js
  _id: ObjectId,
  title: String,
  description: String,
  cards: Card[],
```

Card Schema:

```js
  _id: ObjectId,
  title: String,
  description: String,
  comments: Comment[],
  labels: Label[],
  // Future Fields V2.0
  membersAssigned: User[],
  attachments: Attachment[],
```

Comment Schema:

```js
  _id: ObjectId,
  user: User,
  text: String,
```

Label Enum:

```js
  BACKEND,
  FRONTEND,
  FEAT,
  REFACTOR,
  TEST,
  PERF,
  STYLE,
  ASSET,
  DOC,
  CI,
  CHORE,
  WIP,
```
