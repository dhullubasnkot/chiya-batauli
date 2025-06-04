import pool from "./mysql-client";
export const SqlGuffadiModel = {
  async getAllGuffadi(): Promise<any> {
    const [rows] = await pool.query("SELECT * FROM guffgaff");
    return rows;
  },

  async getGuffadiById(id: number): Promise<any> {
    const [rows] = (await pool.query("SELECT * FROM guffgaff WHERE id = ?", [
      id,
    ])) as [any[], any];
    return rows[0];
  },

  async createGuffgaff(
    author: string,
    image: string,
    content: string
  ): Promise<any> {
    const [result] = await pool.query(
      "INSERT INTO guffgaff (author, image, content) VALUES (?, ?, ?)",
      [author, image, content]
    );
    console.log(result);
    return result;
  },
};
