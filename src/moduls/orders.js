const mongoose = require('mongoose');


require('dotenv').config();

const { Schema } = mongoose;

const ordersGamesSchema = new Schema({
    orderGame: {
        type: Number,
    },
    gameCode: {
        type: String,
        required: true,
    },
    diamondsGameAmount: {
        type: String,
        required: true,
    },
    userGameId: {
        type: String,
        required: true,
    },
    serverGameId: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

const OrderGames = mongoose.model('OrderGames', ordersGamesSchema);
module.exports = OrderGames;
