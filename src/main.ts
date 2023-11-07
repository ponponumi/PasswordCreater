/*!
 * PasswordCreater JavaScript Library
 * (C) 2023 ponponumi
 * Released under the MIT license
 */

class PasswordCreater{
  // パスワードの生成
  private notSymbolArray: string[];
  private length: number;
  private activeSymbol: string;
  private sameStrConsecutive: boolean;
  private similarStrNot: boolean;

  constructor() {
    // 初期化
    this.length = 16;
    this.notSymbolArray = [];
    this.activeSymbol = "";
    this.sameStrConsecutive = false;
    this.similarStrNot = false;
  }

  private lowerGet() {
    // 小文字を取得する
    let lower: string;
    lower = "abcdefghijklmnopqrstuvwxyz";

    return lower;
  }

  private upperGet() {
    // 大文字を取得する
    let lower: string;
    let upper: string;
    lower = this.lowerGet();
    upper = lower.toUpperCase();

    return upper;
  }

  private numberGet() {
    // 数字を取得する
    let number: string;
    number = "1234567890";

    return number;
  }

  private symbolGetSystem() {
    // システム用の記号取得用メソッド
    let symbol: string = '!#$%&()=-~^|\\`@{}[]+;*:<>.,?/_';

    if (this.activeSymbol !== "") {
      // 有効な記号が含まれていれば
      symbol = this.activeSymbol;
    }

    return symbol;
  }

  private symbolGet() {
    // 記号を取得する
    let symbol: string = this.symbolGetSystem();

    if (this.notSymbolArray) {
      this.notSymbolArray.forEach(notSymbol => {
        // 使わない記号を消していく
        symbol = symbol.replace(notSymbol, "");
      });
    }

    return symbol;
  }

  private random(max: number) {
    // 乱数を生成する
    let arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    let result: number = arr[0] % max;

    return result;
  }

  private stringShuffle(string: string) {
    // 配列に分解し、文字をシャッフルして返す
    if (this.similarStrNot) {
      // 似ている文字を使わない場合(非推奨)
      string = string.replace("0", "");
      string = string.replace("1", "");
      string = string.replace("I", "");
      string = string.replace("O", "");
      string = string.replace("l", "");
      string = string.replace("o", "");
    }

    let array: string[] = string.split("");

    for (let i: number = array.length - 1; i > 0; i--) {
      let j: number = this.random(array.length);
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  private createCore(text: string) {
    // パスワードの生成のコア部分
    let result: string = "";
    let last: string = "";

    // テキストをリストにした上で、シャッフルする
    let stringList: string[] = this.stringShuffle(text);

    while (result.length < this.length) {
      // 長さを満たすまでループ
      let index: number = this.random(stringList.length);
      let add: string = stringList[index];

      if (add.toLowerCase() != last.toLowerCase() || this.sameStrConsecutive) {
        // 文字が連続していないか、連続使用が有効であれば
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
    console.log(text);
    console.log(text.length);
  }

  // ここから下は他アプリからの呼び出し用のメソッド

  public createAll() {
    // 全ての文字を使ってパスワードを生成
    let text: string = this.lowerGet() + this.upperGet() + this.numberGet() + this.symbolGet();
    let result: string = this.createCore(text);
    return result;
  }

  public createNormal() {
    // 英数字を使ってパスワード生成
    let text: string = this.lowerGet() + this.upperGet() + this.numberGet();
    let result: string = this.createCore(text);
    return result;
  }

  public createNumber() {
    // 数字のみのパスワードを生成(原則非推奨)
    let text: string = this.numberGet();
    let result: string = this.createCore(text);
    return result;
  }

  public createUpperNumber() {
    // 大文字と数字
    let text: string = this.upperGet() + this.numberGet();
    let result: string = this.createCore(text);
    return result;
  }

  public createLowerNumber() {
    // 小文字と数字
    let text: string = this.lowerGet() + this.numberGet();
    let result: string = this.createCore(text);
    return result;
  }

  public createAlphabet() {
    // アルファベット
    let text: string = this.lowerGet() + this.upperGet();
    let result: string = this.createCore(text);
    return result;
  }

  public createUpper() {
    // 大文字
    let text: string = this.upperGet();
    let result: string = this.createCore(text);
    return result;
  }

  public createLower() {
    // 小文字
    let text: string = this.lowerGet();
    let result: string = this.createCore(text);
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
    } else {
      // 記号が含まれていなければ
      this.notSymbolArray = [];
    }
  }

  public notSymbolClear() {
    // 使わない記号をリセットする
    this.notSymbolArray = [];
  }

  public activeSymbolChange(activeSymbol: string) {
    // 使う記号を変更する
    if (activeSymbol.length > 0) {
      // 記号が含まれていれば
      this.activeSymbol = activeSymbol;
    } else {
      // 記号が含まれていなければ
      this.activeSymbol = "";
    }
  }

  public activeSymbolClear() {
    // 使う記号をリセットする
    this.activeSymbol = "";
  }

  public sameStringConsecutiveChange(set: boolean) {
    // 同じ文字の連続設定を変更
    this.sameStrConsecutive = set;
  }

  public similarStrNotChange(set: boolean) {
    // 似ている文字を使わないかどうかの設定を変更(通常はfalseを推奨)
    this.similarStrNot = set;
  }

  public settingGet() {
    // 現在の設定を取得する
    let result = {
      "length": this.length,
      "notSymbol": this.notSymbolArray.join(""),
      "activeSymbol": this.activeSymbol,
      "sameStringConsecutive": this.sameStrConsecutive,
      "similarString": this.similarStrNot,
    };

    return result;
  }
}

export default new PasswordCreater();
