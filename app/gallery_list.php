<?php
header("access-control-allow-origin: *");
header('Content-Type: application/json');
$brand = $_GET['brand'];
$model = $_GET['model'];
$files = array_map("basename", glob("../assets/images/galeria/*", GLOB_ONLYDIR));
$result = array();
foreach ($files as $file) {
  $subfolders = array_map("basename", glob("../assets/images/galeria/".$file."/*", GLOB_ONLYDIR));
  $object = (object) array("folder" => $file, "subfolders" => $subfolders);
  array_push($result, $object);
  // array_push($result, $subfolders);
}
echo json_encode($result);
?>
