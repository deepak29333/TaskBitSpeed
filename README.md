# TaskBitSpeed

TaskBitSpeed is a Node.js@22.16.0  TypeScript project.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/deepak29333/TaskBitSpeed.git
   cd TaskBitSpeed
   ```

2. Install dependencies:
   ```
   yarn install
   ```
//Note:-
    please create a database then then change the creidentials in `src/database/dataSource.ts` file

## Running the Project

To start the application in development mode:

```
 yarn start
```

## Project Structure

- `src/` - Source code
- `src/controller/` - Controllers
- `src/entity/` - Entities
- `src/database/` - Database configuration

## Tech Stack

- **Node.js** (v22 or higher)
- **TypeScript**
- **koa.js** (web framework)
- **TypeORM** (ORM for database interaction)
- **PostgreSQL** (default database, can be changed)

## Database Configuration

The default database is SQLite. You can change the database configuration in `src/database/dataSource.ts`.
