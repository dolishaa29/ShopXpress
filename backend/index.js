let express=require("express");
let path=require("path");
let app=express();
let ejs=require("ejs");
let cors=require('cors');
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
let {eco}=require("./dbconnection");
eco();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/public')));
// app.use(express.static(path.join(__dirname,'/public/images')));
app.use(cors({
  origin:"http://localhost:3000",
  methods:["POST","GET","DELETE"],
  credentials:true,
}));

app.use("/",require("./router"));
const PORT=9000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});