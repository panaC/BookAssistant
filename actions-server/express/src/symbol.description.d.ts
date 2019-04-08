
declare module 'symbol.prototype.description';

interface Symbol {
  /** Returns a string representation of an object. */
  toString(): string;

  /** Returns the primitive value of the specified object. */
  valueOf(): symbol;

  /** https://www.npmjs.com/package/symbol.prototype.description */
  description: string;
}