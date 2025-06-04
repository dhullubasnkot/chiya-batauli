import { Request, Response } from "express";
import { SqlGuffadiModel } from "../sql-models/guffadi-model";
export const GetAllGuffadiHaru = async (req: Request, res: Response) => {
  const items = await SqlGuffadiModel.getAllGuffadi();
  res.json(items);
};

export const GetGuffadiById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const numericId = Number(id);
    const item = await SqlGuffadiModel.getGuffadiById(numericId);
    if (!item) {
      res.status(404).json({ message: "Guffadi not found" });
      return;
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const createGuffgaff = async (req: Request, res: Response) => {
  const { author, content } = req.body;
  const image = req.file?.filename;

  if (!image) {
    res.status(400).json({ message: "Image upload failed." });
    return;
  }

  const imagePath = `/guffadi/${image}`;

  try {
    const newGuff = await SqlGuffadiModel.createGuffgaff(
      author,
      imagePath,
      content
    );
    res.status(200).json(newGuff);
    console.log(newGuff);
  } catch (error) {
    console.error("❌ Error creating guff:", error);
    res.status(500).json({ message: "Failed to create Guffgaff", error });
  }
};
