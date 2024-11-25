const express = require("express");
const router = express.Router();

// Sample data: Replace this with your actual data from MongoDB
const foodItems = [
  { id: 1, name: "Pizza", description: "Delicious cheese pizza" },
  { id: 2, name: "Burger", description: "Juicy beef burger" },
];

// Route to get all food items
router.get("/", (req, res) => {
  res.json(foodItems);
});

// Example route to get a specific food item by id
router.get("/:id", (req, res) => {
  const foodItem = foodItems.find((item) => item.id === parseInt(req.params.id));
  if (!foodItem) {
    return res.status(404).json({ message: "Food item not found" });
  }
  res.json(foodItem);
});

module.exports = router;

