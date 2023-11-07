import PasswordCreater from "../../src/main.ts";

window.PasswordCreater = PasswordCreater;

function passwordCreate() {
  // パスワードを生成する(テスト)
  PasswordCreater.lengthChange(Number(document.getElementById("len").value));

  // 文字の連続使用の設定
  let consecutive_radio = document.getElementsByName("consecutive");

  for (let i = 0; i < consecutive_radio.length; i++) {
    if (consecutive_radio[i].checked) {
      let consecutive_select = Number(consecutive_radio[i].value);

      if (consecutive_select) {
        // 同じ文字を連続して使う場合
        PasswordCreater.sameStringConsecutiveChange(true);
      } else {
        // 同じ文字を連続して使わない場合
        PasswordCreater.sameStringConsecutiveChange(false);
      }

      break;
    }
  }

  // 似ている文字の使用の設定
  let similar_radio = document.getElementsByName("similar");

  for (let i = 0; i < similar_radio.length; i++) {
    if (similar_radio[i].checked) {
      let similar_select = Number(similar_radio[i].value);

      if (similar_select) {
        // 似ている文字を使う場合
        PasswordCreater.similarStrNotChange(false);
      } else {
        // 似ている文字を使わない場合
        PasswordCreater.similarStrNotChange(true);
      }

      break;
    }
  }

  // 使わない記号の設定
  let notSymbol = document.getElementById("not-symbol").value;
  PasswordCreater.notSymbolChange(notSymbol);

  PasswordCreater.test();

  // 使う記号の設定
  let activeSymbol = document.getElementById("active-symbol").value;
  PasswordCreater.activeSymbolChange(activeSymbol);

  PasswordCreater.test();

  let all = PasswordCreater.createAll();
  let normal = PasswordCreater.createNormal();
  let num = PasswordCreater.createNumber();

  document.getElementById("result-all").value = all;
  document.getElementById("result-normal").value = normal;
  document.getElementById("result-number").value = num;

  console.log(PasswordCreater.settingGet());
}

PasswordCreater.test();
console.log(PasswordCreater.settingGet());

window.passwordCreate = passwordCreate;
