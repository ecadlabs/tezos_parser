import { createToken } from '../tokens/createToken';
import { Token } from '../tokens/token';

export class ParameterSchema {
  private root: Token;
  constructor(val) {
    this.root = createToken(val, 0);
  }

  Execute(val) {
    return this.root.Execute(val);
  }

  ExtractSchema() {
    return this.root.ExtractSchema();
  }
}
