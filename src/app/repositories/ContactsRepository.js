const db = require("../../database/index");

class ContactsRepository {
  //busca todos os contatos
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(
      `SELECT contacts.*, categories.name AS category_name
       FROM contacts
       LEFT JOIN categories ON categories.id = contacts.category_id
       ORDER BY contacts.name ${direction}`
    );
    return rows;
  }
  //busca um contato pelo id
  async findById(id) {
    const [row] = await db.query(
      `SELECT contacts.*, categories.name AS category_name
       FROM contacts
       LEFT JOIN categories ON categories.id = contacts.category_id
       WHERE contacts.id = $1`,
      [id]
    );
    return row;
  }
  //busca um email existente
  async findByEmail(email) {
    const [row] = await db.query(
      `
     SELECT * FROM contacts WHERE email = $1`,
      [email]
    );
    return row;
  }
  //cria um novo contato
  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `
     INSERT INTO contacts(name, email, phone, category_id)
     VALUES($1, $2, $3, $4)
     RETURNING *
   `,
      [name, email, phone, category_id]
    );
    return row;
  }
  //atualiza um contato existente
  async update(id, { name, email, phone, category_id }) {
    const [row] = await db.query(
      `
     UPDATE contacts
     SET name=$1, email=$2, phone=$3, category_id=$4
     WHERE id = $5
     RETURNING *
   `,
      [name, email, phone, category_id, id]
    );
    return row;
  }
  //detela um contato
  async delete(id) {
    const contactDelected = await db.query(
      `DELETE FROM contacts WHERE id = $1`,
      [id]
    );
    return contactDelected;
  }
}
module.exports = new ContactsRepository();
