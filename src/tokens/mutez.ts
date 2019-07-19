import { Token, TokenFactory } from './token';

export class MutezToken extends Token {
  static prim = 'mutez';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val): { [key: string]: any } {
    return val.int;
  }

  public ExtractSchema() {
    return MutezToken.prim;
  }
}
