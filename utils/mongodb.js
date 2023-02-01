import mongoose from "mongoose";

//mongoose.set("strictQuery", true);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

async function dbConnect() {
  if (cached.con) {
    /*console.log("DB Verbindung aktiv"); */
    //console.log(cached.con);
    return cached.con;
  }
  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, options)
      .then((mongoose) => {
        /* console.log("DB Verbindung gestartet"); */
        return mongoose;
      });
  }
  cached.con = await cached.promise;
  return cached.con;
}

async function dbDisconnect() {
  await mongoose.disconnect();
  cached.con = null;
  cached.promise = null;
  /* console.log("DB Verbindung beendet"); */
  return;
}

const mongodb = { dbConnect, dbDisconnect };
export default mongodb;
