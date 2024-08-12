const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config();

const DB = "mongodb+srv://gogoikalpa000:o2p2nhsPHKq3NwPS@cluster0.whov5kn.mongodb.net/"

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY; 
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

console.log("From .env: ",process.env.AZURE_STORAGE_CONTAINER_NAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

/* app.use(express.static("./file/build"));
app.get("*", (req, res)=>{
  res.sendFile(path.resolve(__dirname, "file", "build", "index.html"))
}) */

app.listen(8080, () => {
  console.log(`Server started...`);
});


