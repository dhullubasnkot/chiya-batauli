// controllers/items-controller.ts
import { Request, Response } from "express";
import { SqlItemsModel } from "../sql-models/items-model";

export const getAllItems = async (req: Request, res: Response) => {
  const items = await SqlItemsModel.getAllItems();
  res.json(items);
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await SqlItemsModel.getItemById(Number(id));
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json(item);
  } catch (err) {
    console.error("Error fetching item by ID:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchItems = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (typeof query !== "string" || !query.trim()) {
      res.status(400).json({ message: "Query parameter is required" });
      return;
    }
    const items = await SqlItemsModel.searchItems(query);
    res.json(items);
    return;
  } catch (err) {
    console.error("Error searching items:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
export const createMenu = async (req: Request, res: Response) => {
  try {
    const { name, price, category, ingredients, description, isAvailable } =
      req.body;

    const image = req.file?.filename;
    const numericPrice = parseFloat(price);
    const available = isAvailable === "true" || isAvailable === "on";

    const ingredientsArray =
      typeof ingredients === "string"
        ? ingredients.split(",").map((item) => item.trim())
        : [];

    if (
      typeof name !== "string" ||
      isNaN(numericPrice) ||
      typeof category !== "string" ||
      typeof description !== "string" ||
      !Array.isArray(ingredientsArray) ||
      !image
    ) {
      res.status(400).json({ message: "Invalid input data" });
      return;
    }

    const imagePath = `/${category}/${image}`;

    const newItem = await SqlItemsModel.createMenuItem({
      name,
      price: numericPrice,
      image: imagePath,
      category,
      ingredients: JSON.stringify(ingredientsArray),
      description,
      isAvailable: available,
    });

    res.status(200).json(newItem);
  } catch (err) {
    console.error("Error creating menu item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
