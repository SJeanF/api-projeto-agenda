import Contact from "../models/Contact.js";

//POST

export const postNewContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.json(newContact);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//GET

export const getAllContacts = async (req, res) => {
  try {
    const ContactsList = await Contact.find();
    res.json(ContactsList);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getContactsByInitial = async (req, res) => {
  try {
    const contactList = await Contact.find({
      name: { $regex: `^${req.params.letter}`, $options: "i" },
    });
    res.json(contactList);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate("groups");
    res.json(contact);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const queryContactsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const regex = new RegExp(name, "i");
    const contacts = await Contact.find({ name: regex });
    res.status(200).json(contacts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getContactsByGroup = async (req, res) => {
  try {
    const contactsList = await Contact.find({
      groups: req.params.group,
    });
    res.json(contactsList);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getFavoritesContacts = async (req, res) => {
  try {
    const favoriteContacts = await Contact.find({ favorite: true });
    res.json(favoriteContacts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//PUT

export const putContactById = async (req, res) => {
  try {
    const newContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(newContact);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// PATCH

export const patchContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updateContact = await Contact.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updateContact)
      res.status(404).json({ message: "Contato não encontrado" });

    res.json(updateContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE

export const deleteContactById = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    res.json(deletedContact);
  } catch (error) {
    res.json({ error: error.message });
  }
};
