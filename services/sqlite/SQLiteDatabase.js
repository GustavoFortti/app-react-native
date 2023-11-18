import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("storage.db")

export default db