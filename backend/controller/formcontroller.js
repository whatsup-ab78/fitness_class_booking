const Formmodel = require('../model/formmodel');

// Save (Create)
const savedata = async (req, res) => {
    try {
        const form = new Formmodel(req.body);
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all
const viewdata = async (req, res) => {
    try {
        const forms = await Formmodel.find();
        res.status(200).json(forms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View single
const viewdatabyid = async (req, res) => {
    try {
        const form = await Formmodel.findById(req.params.id);
        res.status(200).json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit (Update)
const editdata = async (req, res) => {
    try {
        const updated = await Formmodel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
const deletedata = async (req, res) => {
    try {
        await Formmodel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { savedata, viewdata, viewdatabyid, editdata, deletedata };
