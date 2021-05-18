const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let regionSchema = new Schema({
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true,
    },
    region: {
        type: Number,
        required: [true, "La region es requerida"],
    }
});



module.exports = mongoose.model("Region", regionSchema);