<?php

function vite_load($path){
  // パスからビルド後のパスを取得
  $manifest = __DIR__ . "/build/manifest.json";
  $data = file_get_contents($manifest);
  $array = json_decode($data,true);

  return "/build/" . $array[$path]["file"];
}

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>動作テスト</title>
  <script src="<?= vite_load("test/js/test.js") ?>"></script>
  <link rel="stylesheet" href="<?= vite_load("test/scss/style.scss") ?>">
</head>
<body>
  <h1>パスワード生成の動作テスト</h1>
  <form action="javascript:passwordCreate()">
    <!-- パスワード生成 -->
    <label>
      長さ
      <input type="number" id="len" min="1" value="16">
    </label>
    <label>
      使う記号
      <input type="text" id="active-symbol">
    </label>
    <label>
      使わない記号
      <input type="text" id="not-symbol">
    </label>
    <label>
      <input type="radio" name="consecutive" value="1">
      同じ文字を連続する
    </label>
    <label>
      <input type="radio" name="consecutive" value="0" checked>
      同じ文字を連続しない
    </label>
    <label>
      <input type="radio" name="similar" value="1" checked>
      似ている文字(01OIoi)を使用する
    </label>
    <label>
      <input type="radio" name="similar" value="0">
      似ている文字(01OIoi)を使用しない
    </label>
    <input type="submit" value="生成する">
  </form>
  <h2>生成結果</h2>
  <div>
    <h3>英数字+記号</h3>
    <textarea id="result-all" cols="30" rows="5" readonly></textarea>
  </div>
  <div>
    <h3>英数字</h3>
    <textarea id="result-normal" cols="30" rows="5" readonly></textarea>
  </div>
  <div>
    <h3>数字</h3>
    <textarea id="result-number" cols="30" rows="5" readonly></textarea>
  </div>
</body>
</html>
