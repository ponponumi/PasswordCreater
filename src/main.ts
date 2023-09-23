class PasswordCreater{
  // パスワードの生成
  private notSymbolArray: string[];
  private length: number;

  constructor() {
    // 初期化
    this.length = 16;
    this.notSymbolArray = [];
  }

  private lowerGet() {
    // 小文字を取得する
    let lower: string;
    lower = "abcdefghijklmnopqrstuvwxyz";

    return lower;
  }

  private upperGet() {
    // 大文字を取得する
    let upper: string;
    upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return upper;
  }

  private numberGet() {
    // 数字を取得する
    let number: string;
    number = "1234567890";

    return number;
  }

  private symbolGet() {
    // 記号を取得する
    let symbol: string;
    symbol = '!#$%&()=-~^|\\`@{}[]+;*:<>.,?/_';

    if (this.notSymbolArray) {
      this.notSymbolArray.forEach(notSymbol => {
        // 使わない記号を消していく
        symbol = symbol.replace(new RegExp(notSymbol, "L"), "");
      });
    }

    return symbol;
  }

  private stringShuffle(string: string) {
    // 配列に分解し、文字をシャッフルして返す
    let array: string[] = string.split("");

    for (let i: number = array.length - 1; i > 0; i--) {
      let j: number = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  private createCore(text: string) {
    // パスワードの生成のコア部分
    let result = "";
    let last = "";

    // テキストをリストにした上で、シャッフルする
    let stringList: string[] = this.stringShuffle(text);

    while (result.length < this.length) {
      // 長さを満たすまでループ
      let arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      let index = arr[0] % stringList.length;
      let add = stringList[index];

      if (add != last) {
        // 文字が連続しなければ
        result += add;
        last = add;
      }
    }

    return result;
  }

  public test() {
    // テスト用
    let text: string = this.lowerGet() + this.upperGet() + this.numberGet() + this.symbolGet();
    let array: string[] = this.stringShuffle(text);
    console.log(array);
  }

  public createAll() {
    // 全ての文字を使ってパスワードを生成
    let text: string = this.lowerGet() + this.upperGet() + this.numberGet() + this.symbolGet();
    let result: string = this.createCore(text);
    console.log(result);
    return result;
  }

  public createNormal() {
    // 英数字を使ってパスワード生成
    let text: string = this.lowerGet() + this.upperGet() + this.numberGet();
    let result: string = this.createCore(text);
    console.log(result);
    return result;
  }

  public createNumber() {
    // 数字のみのパスワードを生成(原則非推奨)
    let text: string = this.numberGet();
    let result: string = this.createCore(text);
    console.log(result);
    return result;
  }

  public lengthChange(length: number) {
    // 長さを変更する
    if (length > 0) {
      this.length = length;
    }
  }

  public notSymbolChange(notSymbol: string) {
    // 使わない記号を変更する
    if (notSymbol.length > 0) {
      // 記号が含まれていれば
      this.notSymbolArray = notSymbol.split("");
    }
  }
}

export default new PasswordCreater();
