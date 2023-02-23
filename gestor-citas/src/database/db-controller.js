const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'neros',
  password: '1234',
  port: 5432,
});

const _getUser =  async (req, res) => {
  try {
    const userid = req.query.userid;
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM users where userid = '${userid}'`)
    const results = result.rows;
    client.release();
    console.log(`Enviando datos del usuario '${userid}'`);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};

const _getUsers =  async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users ORDER BY userid ASC');
    const results = result.rows;
    client.release();
    console.log('Enviando datos de todos los usuarios');
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};

const _addUser =  async (req, res) => {
  try {
    const userData = req.body;
    const client = await pool.connect();
    const query = `INSERT INTO users (name, surname, dni, address, city, province, phone, email, tutor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const result = await client.query(query, [userData.name, userData.surname, userData.dni, userData.address, userData.city, userData.province, 
                                              userData.phone, userData.email, userData.tutor], (err, res) => {
      if (err) throw err;
      console.log(`Creado usuario '${userData.name}' '${userData.surname}'  '${userData.dni}' '${userData.address}'  '${userData.city}' '${userData.province}'
      '${userData.phone}' '${userData.email}'  '${userData.tutor}'`);
    });
    client.release();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};

const _addCita =  async (req, res) => {
  try {
    const citaData = req.body;
    const client = await pool.connect();
    const query = `INSERT INTO citas (userid, date, hour, fisio) VALUES ($1, $2, $3, $4)`;
    const result = await client.query(query, [citaData.userid, citaData.date, citaData.hour, citaData.fisio], (err, res) => {
      if (err) throw err;
      console.log(`Creada cita '${citaData.userid}' '${citaData.date}' '${citaData.hour}' '${citaData.fisio}'`);
    });
    client.release();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};

const _removeCita =  async (req, res) => {
  try {
    const citaData = req.body;
    const client = await pool.connect();
    const query = `DELETE FROM citas WHERE date='${citaData.date}' AND hour='${citaData.hour}' AND fisio='${citaData.fisio}'`;
    const result = await client.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Borrada cita '${citaData.date}' '${citaData.hour}' '${citaData.fisio}'`);
    });
    client.release();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};

const _getCitasByUser =  async (req, res) => {
	try {
		const userid = req.query.userid;
    const client = await pool.connect();
    //const result = await client.query(`SELECT ARRAY_AGG(date || ' ' || hour) FROM citas where userid = '${userid}'`)
    const result = await client.query(`SELECT * FROM citas where userid = '${userid}'`)
    const results = result.rows;
    client.release();
    console.log(`Enviando citas del usuario '${userid}'`);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};

const _getCitasByDate =  async (req, res) => {
	try {
		const date = req.query.date;
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM citas where date = '${date}'`)
    const results = result.rows;
    client.release();
    console.log(`Enviando citas del dia '${date}'`);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};

module.exports = {
	getUser: _getUser,
	getUsers: _getUsers,
	addUser: _addUser,
	addCita: _addCita,
	removeCita: _removeCita,
	getCitasByUser: _getCitasByUser,
	getCitasByDate: _getCitasByDate
}