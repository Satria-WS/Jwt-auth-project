import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;





export const connect = (MONGO_URI) => {

  mongoose.connect(
    MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  ).then(() => {
    console.log("Succesffuly connect to database")
  })
    .catch((error) => {
      console.log("database connection failed ")
      console.log(error)
      process.exit(1);
  })
}


