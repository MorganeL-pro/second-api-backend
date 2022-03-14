// controllers/wilders.js
const WilderModel = require("../models/Wilders");

module.exports = {
    create:  async (req, res) => {
       try {
           await WilderModel.init();
           const wilder = new WilderModel(req.body);
           const result = await wilder.save();
           res.status(200).json({success: true, result});
       } catch (err) {
            res.status(400).send({error: err.message})
       }
    },

    read: async (req, res) => {
        try {
            const wilders = await WilderModel.find({});
            if (!wilders) res.json({success: false, result: "No wilder found"});
            res.status(200).json({success: true, result: wilders});
        } catch (err) {
            res.status(404).json({success: false, result: err});
        }
    },
    update: async (req, res) => {
        try {
            const wilder = await WilderModel.findByIdAndUpdate({ "_id": req.params.id }, req.body, {new: true})
            if(!wilder) res.json({ success: false, result: "No such wilder exists"})
            res.status(200).json(wilder)
      } catch (err) {
            res.status(400).json({ success: false, result: err})
      }
    },
    delete: async (req, res) => {
        const wilder = await WilderModel.remove({"_id": req.params.id})
        try {
            if (!wilder) res.json({ success: false, result: "No wilder with such ID was found" })
            res.status(200).json({ success: true, result: wilder })
        } catch (err) {
            res.status(400).json({ success: false, result: err})
        }
    }
};