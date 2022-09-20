const { connect } = require("mongoose");

const connectDB = async () => {
  const connection = await connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // eslint-disable-next-line no-console
  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = connectDB;
