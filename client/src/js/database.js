import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log("PUT to the database");

  // Creating a connection to the database and version we want to use.
  const jateDB = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .put() method pn the store and pass in the id and the content
  const request = store.put({ jate: content });

  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get all from the database");

  const jateDB = await openDB("jate", 1);

  const tx = jateDB.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
