const categoryModel = require("../models/category");
const addcategory = (req, res) => {
  const { title } = req.body;
  const newcategory = new categoryModel({
    title,
  });
  newcategory
    .save()
    .then((result) => {
      res.status(201)
        .json({
          success: true,
          message: "Category Created Successfully",
          section: result,
        });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: error.message,
      });
    });
  }
    const getNameCeteogry=(req,res)=>
    {
      categoryModel.find({})
      .then((result) => {
        res.status(200)
          .json({
            success: true,
            message: "all category ",
            section: result,
          });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Server Error",
          err: error.message,
        });
      });
    }

module.exports={addcategory,getNameCeteogry}
