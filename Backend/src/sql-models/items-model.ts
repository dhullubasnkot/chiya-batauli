import pool from "./mysql-client";

export const SqlItemsModel = {
  async getAllItems() {
    const [rows] = await pool.query("SELECT * FROM menu");
    return rows;
  },

  async getItemById(id: number) {
    const [rows] = await pool.query("SELECT * FROM menu WHERE id = ?", [id]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  },
  async searchItems(query: string) {
    const searchTerm = `%${query.toLowerCase()}%`;
    const [rows] = await pool.query(
      `SELECT * FROM menu WHERE 
      LOWER(name) LIKE ? OR 
      LOWER(category) LIKE ? OR 
      LOWER(ingredients) LIKE ?`,
      [searchTerm, searchTerm, searchTerm]
    );
    return rows;
  },

  async createMenuItem(item: {
    name: string;
    price: number;
    image: string;
    category: string;
    ingredients: string;
    description: string;
    isAvailable: boolean;
  }) {
    const {
      name,
      price,
      image,
      category,
      ingredients,
      description,
      isAvailable,
    } = item;
    const [result] = await pool.query(
      `INSERT INTO menu (name, price, image, category, ingredients, description, isAvailable)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, price, image, category, ingredients, description, isAvailable]
    );
    return result;
  },
};
