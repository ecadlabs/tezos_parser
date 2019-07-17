import { Token, TokenFactory } from './token';

export class ListToken extends Token {
  static prim = 'list';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val) {
    return '';
  }

  public ExtractSchema() {
    return ListToken.prim;
  }
}
