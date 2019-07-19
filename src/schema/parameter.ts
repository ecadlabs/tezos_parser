import { createToken } from '../tokens/createToken';
import { Token } from '../tokens/token';

export class ParameterSchema {
  private root: Token;

  static fromRPCResponse(val) {
    return new ParameterSchema(
      val.script.code.find(x => x.prim === 'parameter')!.args[0]
    );
  }

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
