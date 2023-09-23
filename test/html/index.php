<?php

function vite_load($path){
  // パスからビルド後のパスを取得
  $manifest = __DIR__ . "/build/manifest.json";
  $data = file_get_contents($manifest);
  $array = json_decode($data,true);

  return "build/" . $array[$path]["file"];
}

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>動作テスト</title>
  <script src="<?= vite_load("test/js/test.js") ?>"></script>
</head>
<body>
  <h1>パスワード生成の動作テスト</h1>
  <form action="javascript:create()">
    <!-- パスワード生成 -->
    <label>
      長さ
      <input type="number" id="len" min="1" value="16">
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
  <script src="js/script.js"></script>
</body>
</html>
