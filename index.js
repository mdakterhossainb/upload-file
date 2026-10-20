const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 8005;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//connect db
const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/myball")
    .then(() => {
      console.log(`mongo is ccccccc`);
    })
    .catch((error) => {
      console.log(`mongo is not ccccccc`);

      console.log(error);
      process.exit(1);
    });
};
//creating schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
  },
  image: {
    type: String,
    required: [true, "user image is required"],
  },
});
const User = mongoose.model("Users", userSchema);
//file upload start here
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });
app.get("/register", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/index.html");
});
app.post("/register", upload.single("image"), async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      image: req.file.filename,
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//file upload end here
//another way start here
const express = require("express");
const multer = require("multer");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const upload = multer({ dest: "uploads/" });
app.get("/", (req, res) => {
  res.send(
    `
       <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="myfile" required />
      <button type="submit">Upload</button>
    </form>
    `,
  );
});
app.post("/upload", upload.single("myfile"), function (req, res) {
  res.send("file upload sssssssssssss");
});

app.listen(port, () => {
  console.log(`server is http://localhost:${port}`);
});

//another way end here
//100% another way start here
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ফাইল আপলোডের জন্য multer কনফিগারেশন
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});
// হোম পেজে আপলোড ফর্ম রেন্ডার করা
app.get("/", (req, res) => {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" required>
      <button type="submit">Upload</button>
    </form>
  `);
});

// ফাইল আপলোড হ্যান্ডেল করা
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).send("ফাইল সফলভাবে আপলোড হয়েছে!");
});

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});

//100% another way end here

//route error
app.use((req, res, next) => {
  res.status(404).json({ message: "route not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: "something broke" });
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT : http://localhost:${PORT}`);
  connectDB();
});
