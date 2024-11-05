import * as fs from "fs/promises"

class Pulse {
  public filePath: string;
  public database: Map<string, any>;
  constructor(filePath: string) {
    this.filePath = filePath;
    this.database = new Map<string, any>();
    this.load()
  }
  
  private async load() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      const jsonData = JSON.parse(data);
      this.database = new Map<string, any>(Object.entries(jsonData))
    } catch(error) {
      fs.writeFile(this.filePath, JSON.stringify({}, null, 2));
    }
  }

  put(key: string, value: any): void {
    if(!value || value === undefined) {
      throw new Error("Value cannot be undefined")
    }
    this.database.set(key, value);
    this.save()
  }

  get(key: string): void | null {
    return this.database.has(key) ? this.database.get(key) : null;
  }

  remove(key: string): void {
    this.database.delete(key)
    this.save()
  }

   async save(): Promise<void> {
    const dataToSave = Object.fromEntries(this.database);
    try {
    const currentData = await fs.readFile(this.filePath, "utf-8");

    if(currentData !== JSON.stringify(dataToSave, null, 2)) {
      await fs.writeFile(this.filePath, JSON.stringify(dataToSave, null, 2))
    }
   } catch(error) {
      console.error("Error saving database:", error);
      await fs.writeFile(this.filePath, JSON.stringify(dataToSave, null, 2))
    }
  }
}

module.exports = Pulse;
