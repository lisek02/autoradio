<?php
header("access-control-allow-origin: *");
header('Content-Type: application/json');
$brand = $_GET['brand'];
$model = $_GET['model'];
$desc = file_get_contents("../assets/images/galeria/".$brand."/".$model."/".$model.".txt");
$files = array_map("basename", glob("../assets/images/galeria/".$brand."/".$model."/*.{jpg,gif,png}", GLOB_BRACE));
$object = array("files" => $files, "description" => $desc);
echo json_encode($object);
?>
