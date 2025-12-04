const mongoose = require('mongoose');

const uri = "mongodb+srv://samioden111_db_user:Clmu5MJXducvqnzp@opccard.7nowyik.mongodb.net/?appName=OpcCard";

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));