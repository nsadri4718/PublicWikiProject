const express = require("express");
const mongoose = require("mongoose");

const Wiki = require("../models/wiki.js");

const router = express.Router();

// Endpoint handlers

// at least 5 endpoints

// 1) Search Endpoint
// Be the endpoint used in the Home view to search for an existing page

router.get("/search/:term", (req, res) => {
  let filter = {
    $or: [
      { title: { $regex: req.params.term, $options: "i" } },
      { html: { $regex: req.params.term, $options: "i" } },
      { author: { $regex: req.params.term, $options: "i" } },
      { category: { $regex: req.params.term, $options: "i" } }
    ]
  }
  
  Wiki.find(filter).exec((err, result) => {
    res.status(200).send(result);
  })
})

// 2 (Return a single wiki page based on the urlName)
// GET /api/wiki/:urlName (Used for the wiki edit and wiki display views)
// - query collection using the function findOne()
// - If that page exists, increment the page count, save it result.save(), return the wiki page

router.get("/:urlName", (req, res) => {
  
  Wiki.findOne( {urlName: req.params.urlName}, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else if (result) {
      result.pageViews++;
      result.save(function(err, result) {
        if(err) {
          res.status(400).send(err);
        } else {
          let newObj = {
            "title": result.title,
            "category": result.category,
            "author": result.author,
            "urlName": result.urlName,
            "html": result.html,
            "pageViews": result.pageViews,
            "_id": result._id,
            "createdDate": result.createdDate,
            "updatedDate": result.updatedDate
          }
          result = newObj;
          res.status(200).send(result);
        }
      })
    } else {
      res.status(400).send("Wiki not found.");
    }
  })
});

// 3 (Create a new wiki page)
// POST /api/wiki/ (Used for the new wiki view)
// - Create the new wiki object based on the data from the client new Wiki(req.body)
// - You save the wiki and return the result

router.post("/", (req, res) => {
  var newWiki = new Wiki(req.body);

  newWiki.save(function(err, result) {
    if(!err) {
      res.status(201).send(result);
    } else {
      res.status(400).send(err.message);
    }
  })
  
});

// 4 (Updating an existing wiki page)
// PUT /api/wiki/:urlName (Used for the wiki update view)
// - Get the wiki page based on the urlName (findOne())
// - If the wiki is found then we compare the password that is stored with the one client passed it
//   if (result.managePassword == req.body.managePassword)
//      set the data item one by one and call the save() -> return result

router.put("/:urlName" , (req, res) => {
  
  Wiki.findOne( {urlName: req.params.urlName}, function(err, result) {

    if(err) {
      res.status(400).send(err);
    } else if (result) {
      if(result.password === req.body.password) {
        result.title = req.body.title;
        result.category = req.body.category;
        result.author = req.body.author;
        result.html = req.body.html;
        result.updatedDate = Date.now();
        result.urlName = req.body.urlName;

        result.save(function(err, result) {
          if(!err) {
            let updatedWiki = {
              "title": result.title,
              "category": result.category,
              "html": result.html,
              "updatedDate": result.updatedDate,
              "author": result.author,
             
            };
            result = updatedWiki;
            res.status(200).send(result);
          } else {
            res.status(400).send(err);
          }
        });
      }
      
    } else {
      res.status(400).send("Something went wrong. Cannot update page.");
    }
  })
  
});

// 5 (Delete a wiki page)
// POST /api/wiki/delete/:urlName
// - Get the wiki page using findOne()
// - if the page exists, compare the stored management password with the one client sent in
//   if (result.managePassword == req.body.managePassword)
//    findByIdAndDelete(result._id)

// From client
// $http.post("/api/wiki/abc", { managementPassword: $scope.password })
// POST /api/wiki/delete/:urlName

router.post("/:urlName", (req, res) => {

  Wiki.findOne( {urlName: req.params.urlName}, function(err, result) {
    if(err) {
      res.status(400).send(err);
    } else if(result) {
      if(result.password === req.body.password) {
        Wiki.findByIdAndDelete(result._id, function(err, result) {
          if(!err) {
            res.status(200).send(result);
          } else {
            res.status(400).send(err);
          }
          
        })
      } else {
        alert("Password not a match.");
      }
    } else {
      res.status(400).send(err);
    }    
  });

});


// From this point on
// Focus more on client-side technologies
// React, Vue.js, Latest Angular

module.exports = router;