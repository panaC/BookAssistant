<?php

$audiobookPath    = '/audiobook';
$path = $audiobookPath;

if(isset($_GET["path"])) {
    $userPath   = htmlspecialchars($_GET["path"]);
    preg_match('/.*(\.\.).*/', $userPath, $output_array);
    if (!$output_array[1]) {
      $path = $audiobookPath . $userPath;
    }
}

$json = array();
$json->path = true;
$json->files = scandir($path);

if (!$json->files) {
  $json->path = false;
  $json->files = [];
} else {
  array_splice($json->files, 0, 2);
}

header('Content-Type: application/json');
echo json_encode($json);
?>