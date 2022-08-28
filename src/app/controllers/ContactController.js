const ContactsRepository = require("../Repositories/ContactsRepository");

class ContactController {
  async index(req, res) {
    const contacts = await ContactsRepository.findAll();
    res.json(contacts);
  }
  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ Error: "Contact not found" });
    }
    res.json(contact);
  }

  store(req, res) {}

  update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return res.status(404).json({ Error: "Contact not found" });
    }
    await ContactsRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
