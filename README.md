# Pulse Database

Pulse Database is a simple library for managing a key-value database, using JSON files for data persistence. It is ideal for applications that require lightweight storage and easy access.

## Installation

You can install Pulse Database using npm:

```bash
npm install pulse-database
```

## Usage

- Below is an example of how to use Pulse Database in your project:

```javascript
// Import the Pulse class
import Pulse from 'pulse-database';

// Create a new instance of Pulse Database
const db = new Pulse('./test.json');

// Add a value to the database
db.put('name', 'Gabriel');

// Retrieve a value from the database
const name = db.get('name');
console.log(name); // Output: Gabriel

// Remove a value from the database
db.remove('name');

// Check if the value has been removed
const deletedName = db.get('name');
console.log(deletedName); // Output: null
```

## Available Methods

```javascript
put(key: string, value: any): void

// Adds or updates a value in the database. Throws an error if the value is undefined.
```

```javascript
get(key: string): void | null

// Returns the value associated with the specified key, or null if the key doesn't exist.
```

```javascript
remove(key: string): void

// Removes the value associated with the specified key from the database.
```
