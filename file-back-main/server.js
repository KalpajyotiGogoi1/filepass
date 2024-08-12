const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config();

const DB = "mongodb+srv://gogoikalpa000:o2p2nhsPHKq3NwPS@cluster0.whov5kn.mongodb.net/"

const accountName = "filepass";
const accountKey = "nY5zmG3niwLyZAHe9P8pxi+JjDwmfRQ+Ow+uQgD7la/sYGAjRtVhRdY8OmZ6VOagxX84rw3pGMJ0+AStJBu64A=="; 
const containerName = "filepass";

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


