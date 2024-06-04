var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

var conStr = "mongodb://127.0.0.1:27017";

app.get("/users", (request, response) => {
  mongoClient.connect(conStr).then((clientObject) => {
    var database = clientObject.db("online-shopping");
    database
      .collection("tblUser")
      .find({})
      .toArray()
      .then((documents) => {
        response.send(documents);
        response.end();
      });
  });
});

app.get("/get-user/:userName",(req,res)=>{
  mongoClient.connect(conStr)
  .then(clientObject=>{
    let dataBase = clientObject.db("online-shopping");
    dataBase.collection("tblUser").find({UserName:req.params.userName}).toArray()
    .then(document=>{
      res.send(document);
      res.end();
    })
  })
})

app.post("/register-user", (req, res) => {
  var user = {
    UserId: req.body.UserId,
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
    Mobile: req.body.Mobile,
  };

  mongoClient.connect(conStr).then((clientObject) => {
    var dataBase = clientObject.db("online-shopping");
    dataBase
      .collection("tblUser")
      .insertOne(user)
      .then((document) => {
        console.log("User Registered");
        res.end();
      });
  });
});
 app.get('/get-admin',(req,res)=>{
    mongoClient.connect(conStr)
    .then(clientObject=>{
        var dataBase = clientObject.db('video-library');
        dataBase.collection('tblAdmin').find({}).toArray()
        .then(document=>{
            res.send(document);
            res.end();
        });
    });
 });
//  app.delete('/delete-video/:id',(req,res)=>{
//     mongoClient.connect(conStr)
//     .then(clientObject=>{
//         var dataBase = clientObject.db('online-shopping');
//         dataBase.collection('tblUser').deleteOne({VideoId:parseInt(req.params.id)})
//         .then(()=>{
//             console.log('Video Deleted');
//             res.end();
//         });
//     });
//  });

app.post("/post-product",(req,res)=>{
  // var products = {
  //       id: req.body.map(p=>p.id),
  //       title: req.body.map(p=>p.title),
  //       price: req.body.map(p=>p.price),
  //       description: req.body.map(p=>p.description),
  //       category: req.body.map(p=>p.category),
  //       image: req.body.map(p=>p.image),
  //       rating: req.body.map(p=>p.rating),
  // };

  var products = req.body.map(p=>p);

  mongoClient.connect(conStr)
  .then(ClientObject=>{
    var dataBase = ClientObject.db("online-shopping");
    dataBase.collection("tblProducts").insertMany(products)
    .then(()=>{
      console.log("Products Purchased");
      res.end()
    });
  });
});

app.get("/get-products",(req,res)=>{
  mongoClient.connect(conStr)
  .then(ClientObject=>{
    var dataBase = ClientObject.db("online-shopping");
    dataBase.collection("tblProducts").find({}).toArray()
    .then(document=>{
      res.send(document);
      res.end();
    });
  });
});
// app.put('/edit-user/:id',(req,res)=>{
//   var id = parseInt(req.params.id);
//   var user = {
//       VideoId: parseInt(req.body.VideoId),
//       CategoryId: parseInt(req.body.CategoryId),
//       Title: req.body.Title,
//       Description: req.body.Description,
//       Url: req.body.Url,
//       Views: parseInt(req.body.Views),
//       Likes: parseInt(req.body.Likes),
//       Dislikes: parseInt(req.body.Dislikes)
//   }

//   mongoClient.connect(conStr)
//   .then(clientObject=>{
//       var dataBase = clientObject.db('video-library');
//       dataBase.collection('tblVideos').updateOne({VideoId:id},{$set:video})
//       .then(()=>{
//           console.log('Video Updated Successfully');
//           res.end();
//       });
//   });
// });

app.listen(3210);
console.log("Server started at http://127.0.0.1:3210");
