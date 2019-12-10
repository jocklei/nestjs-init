import * as fs from 'fs';
import * as dotenv from 'dotenv';

export class ConfigService {
  envConfig: any;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
