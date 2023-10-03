function create() {
  // パスワードを生成する(テスト)
  PasswordCreater.lengthChange(Number(document.getElementById("len").value));

  // 使わない記号の設定
  let notSymbol = "!<>?";
  PasswordCreater.notSymbolChange(notSymbol);

  PasswordCreater.test();

  let all = PasswordCreater.createAll();
  let normal = PasswordCreater.createNormal();
  let num = PasswordCreater.createNumber();

  document.getElementById("result-all").value = all;
  document.getElementById("result-normal").value = normal;
  document.getElementById("result-number").value = num;
}

PasswordCreater.test();
