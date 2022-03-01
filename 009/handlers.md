# Kanban Board Features
### Account
  ```
  id: ID
  email: string
  password?: string
  ```
  Commands: 
  - Create Account (`email`: string, `password`?: string)
  - Update Account (`id`: ID, params: { `password`?: string })
  - Delete Account (`id`: ID)
  - Authenticate (params: { `username`: string; `password`: string } | { `token`: string })
  - Revoke Token

### Project
  ```
  id: ID
  title: string
  members: ID[] // Account
  creator: ID // Account
  dateTimeCreated: Date
  columns: ID[] // SortConfiguration
  ```
  Commands: 
  - Create Project (`title`: string)
  - Delete Project (`id`: ID)
  - Add Member (`member`: ID)
  - Remove Member (`member`: ID)
  - Add Column (`column`: ID)
  - Remove Column (`column`: ID)
  - Update Column Sort Order (`column`: ID, `order`: number)

### SortConfiguration
  ```
  column?: ID // Column
  card?: ID // Card
  order: number
  cursor: Buffer
  ```
  Commands: 
  - Create SortConfiguration (params: { `column`: ID; `order`: number } | { `card`: ID; `order`: number })
  - Update SortConfiguration (`column` | `card`: ID, `order`: number)
  - Delete SortConfiguration (`column` | `card`: ID)

### Column
  ```
  id: ID
  title: 
  cards: ID[] // SortConfiguration
  ```
  Commands: 
  - Create Column (`title`: string)
  - Update Column (`id`: ID, `title`: string)
  - Delete Column (`id`: ID)
  - Add Card (`card`: ID)
  - Remove Card (`card`: ID)
  - Update Card Sort Order (`card`: ID, `order`: number)


### Card 
  ```
  id: ID
  title: string
  description?: string
  assignee?: ID // Account
  reporter: ID // Account 
  dateTimeStarted?: Date
  dateTimeFinished?: Date
  dateTimeCreated: Date
  cursor: Buffer
  ```
  Commands: 
  - Create Card (`title`: string)
  - Update Card (`id`: ID, params: Partial<Pick<Card, `title` | `descrription` | `assignee` | `dateTimeStarted` | `dateTimeFinished`>>)
  - Delete Card (`id`: ID)