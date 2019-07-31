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
    const schema = this.createToken(this.val.args[0], 0);
    return val.reduce((prev, current) => {
      return [...prev, schema.Execute(current)];
    }, []);
  }

  public ExtractSchema() {
    return ListToken.prim;
  }
}
