function create() {
  // パスワードを生成する(テスト)
  PasswordCreater.lengthChange(Number(document.getElementById("len").value));
  let all = PasswordCreater.createAll();
  let normal = PasswordCreater.createNormal();
  let num = PasswordCreater.createNumber();

  document.getElementById("result-all").value = all;
  document.getElementById("result-normal").value = normal;
  document.getElementById("result-number").value = num;
}
