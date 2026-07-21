const express = require("express");
const { Category } = require("../models/category.model");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    if (!req.body.name || req.body.name.length < 3) {
      return res.status(400).send({
        message: req.t("categoryNameValidation"),
      });
    }
    const newCategory = await Category.create({
      name: req.body.name,
    });
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const categoriesList = await Category.find();
    if (!categoriesList) {
      return res.status(404).send({
        message: req.t("noCategories"),
      });
    }
    res.status(200).send(categoriesList);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).send({
        message: req.t("categoryNotFound"),
      });
    }
    res.status(200).send({
      message: req.t("categoryDeletedSuccessfully"),
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true },
    );
    if (!updatedCategory) {
      return res.status(404).send({
        message: req.t("categoryNotFound"),
      });
    }
    res.status(200).send(req.t("categoryUpdatedSuccessfully"));
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});
module.exports = router;
