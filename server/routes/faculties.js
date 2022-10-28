// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) 
    {
      return console.error(err);
    } else 
    {
      res.render("faculties", {
        title: "Faculties",
        faculties: faculties});
       
        res.render("faculties", {title: "Faculty List", faculties: faculties});
      
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
 res.render("faculties/add", {title: "Add a faculty"})
});

// POST process the faculty  Details page and create a new faculty  - CREATE operation
router.post("/add", (req, res, next) => {
  let newFaculty = faculty({
    "Facultyid": req.body.Facultyid,
    "Facultyname": req.body.Facultyname,
    "Department": req.body.Department,
    "Subject": req.body.Subject
  });
  faculty.create(newFaculty, (err, faculty) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //refresh the Faculty list
      res.redirect("/faculties");
    }
  });
});

// GET the faculty  Details page in order to edit an existing faculty- UPDATE operation
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id;
  faculty.findById(id, (err, facultytoEdit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
// show the edit view
res.render("faculties/details", {title: "Edit Faculty", faculty:facultytoEdit})
    }
  });
});

// POST - process the information passed from the details form and update the document- UPDATE operation
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id;
  
  let updateFaculty = faculty({
   "_id" :id,
    "Facultyid": req.body.Facultyid,
    "Facultyname": req.body.Facultyname,
    "Department": req.body.Department,
    "Subject": req.body.Subject
  });
  faculty.updateOne({_id:id}, updateFaculty, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //refresh the faculty list
      res.redirect("/faculties");

    }
  });
});

// GET - process the delete - DELETE operation
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  faculty.remove({_id: id}, (err) => {
  if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
    //refresh the faculty list
    res.redirect("/faculties");
    }
});
});

module.exports = router;
