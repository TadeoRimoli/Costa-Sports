import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, idToken TEXT, localId TEXT,updatedAt INTEGER);',
      [],
      (_, result) => {
        console.log('Table created successfully');
      },
      (_, error) => {
        console.log('Error creating table:', error);
      }
    );
  });
};

const getSession = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM sessions LIMIT 1;',
      [],
      (_, result) => {
        callback(result.rows.item(0));
      },
      (_, error) => {
        console.log('Error getting session:', error);
      }
    );
  });
};

const insertSession = (email, idToken, localId) => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const updatedAt = currentTimeInSeconds;
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO sessions (email, idToken, localId, updatedAt) VALUES (?, ?, ?, ?);',
        [email, idToken, localId, updatedAt],
        (_, result) => {
          console.log('Session inserted successfully');
        },
        (_, error) => {
          console.log('Error inserting session:', error);
        }
      );
    });
  };
const deleteSession = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM sessions;',
      [],
      (_, result) => {
        console.log('Session deleted successfully');
      },
      (_, error) => {
        console.log('Error deleting session:', error);
      }
    );
  });
};


export { createTable, getSession, insertSession, deleteSession, dropTable };
