import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

const dbn = 'jate';
const nm = 1;
const id = '1';
const rdw = 'readwrite';
const rd = 'readonly';

const putDb = async (content) => {
  try {
    const cn = await openDB(dbn, nm);
    const pt = { id: id, teContent: content };
    await cn.transaction(dbn, rdw).objectStore(dbn).put(pt);
  } catch (re) { throw re }
};

// TODO: Add logic for a method that gets all the content from the database
const getDb = async () => {
  try {
    const cn = await openDB(dbn, nm);
    const rt = await cn.transaction(dbn, rd).objectStore(dbn).get(id);
    switch (true) {
      case (!rt):
        return;
      default:
        return rt.teContent;
    };
  } catch (re) { throw re }
};

export { putDb, getDb }

initdb();
