import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  envConfig: any;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
