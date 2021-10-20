// get the client
const { createConnection } = require('mysql2/promise');
const { Usuario, ZombieEstado } = require("./models");

// create the connection to database
const openConnection = () => {
  return createConnection({
    host: 'localhost',
    user: 'root',
    database: 'zombies'
  });
};

async function createUser(email, password) {
  const sqlInsert = "INSERT INTO Usuarios (id, email, password) VALUES(?, ?, ?)";
  const insertValues = [0, email, password];
  const db = await openConnection();

  const result = await db.query(sqlInsert, insertValues);
  await db.end();

  return result[0]["affectedRows"] > 0;
}

async function createZombie(nombre, estado) {
  const db = await openConnection();
  const [rows, _] = await db.query("SELECT Id FROM Estados WHERE estado = ?", [estado]);
  const { Id: estado_id } = rows[0];

  if (!estado_id) {
    return false;
  }

  const zombieSql = "INSERT INTO Zombies (id, nombre) VALUES (?, ?)";
  const zombieValues = [0, nombre];
  const zombieResult = await db.query(zombieSql, zombieValues);

  const insertedZombie = zombieResult[0]["affectedRows"] > 0;
  const zombie_id = zombieResult[0]["insertId"];

  if (!insertedZombie) {
    return false;
  }

  const relationSql = "INSERT INTO zombie_estado (id, zombie_id, estado_id) VALUES (?, ?, ?)";
  const relationValues = [0, zombie_id, estado_id];
  const relationResult = await db.query(relationSql, relationValues);
  await db.end();

  return relationResult[0]["affectedRows"] > 0;
}

async function tryLogin(userEmail, userPassword) {
  const sqlFind = "SELECT * FROM Usuarios WHERE email = ? AND password = ?";
  const values = [userEmail, userPassword];
  const db = await openConnection();
  const [rows, _] = await db.query(sqlFind, values);

  const { id, email, password } = rows[0];
  await db.end();

  return new Usuario(id, email, password);
};

async function getAllZombies() {
  const db = await openConnection();
  const [rows, _] = await db.query("SELECT * FROM zombies_estados");
  await db.end();
  return rows.map(row => new ZombieEstado(
    row.nombre,
    row.estado,
    row.actualizado)
  );
}

async function getAllZombiesByState(estado) {
  const db = await openConnection();
  const sqlZombies = "SELECT * FROM zombies_estados WHERE estado = ?";
  const [rows, _] = await db.query(sqlZombies, [estado]);
  await db.end();
  return rows.map(row => new ZombieEstado(
    row.nombre,
    row.estado,
    row.actualizado)
  );
}

async function zombieCount() {
  const db = await openConnection();
  const [rows, _] = await db.query("SELECT COUNT(nombre) as Zombies FROM zombies_estados");
  await db.end();
  return rows[0]["Zombies"];
}

async function zombieStateCount() {
  const db = await openConnection();
  const sqlCount = "SELECT Estado, COUNT(*) AS zombies FROM zombies_estados GROUP BY Estado";
  const [rows, _] = await db.query(sqlCount);

  await db.end();
  return rows;
}

module.exports = {
  createUser,
  createZombie,
  getAllZombies,
  getAllZombiesByState,
  openConnection,
  tryLogin,
  zombieCount,
  zombieStateCount
}
