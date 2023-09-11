import config from "./app.config";
import mongoose from "mongoose";

mongoose.connect(config.mongoose.url, config.mongoose.options);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.error(`Connected to MongoDB.`));

export default db;
