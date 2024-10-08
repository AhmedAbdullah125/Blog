import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  // Find the absolute path of the "json" directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  // Read the "data.json" file
  const fileContents = await fs.readFile(jsonDirectory + '/blogPosts.json', 'utf8');
  // Return the content of the data file in JSON format
  res.status(200).json(JSON.parse(fileContents));
}