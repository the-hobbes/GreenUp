<?php

	//This query should be squished down to narrow the field of view for optimization. 
	//can't do yet becuase we haven't gotten the edge locations of the map yet.
	require_once('config.php');
	$dbh = new PDO('mysql:host='.HOST.';dbname='.DB_NAME.';', DB_USER, DB_PASS);
	$getPins = "SELECT lat,lon,pins.fkType as fkType,message from pins,talk where talk.pkId = pins.fkTalkId" ;
	$statment = $dbh->query($getPins);
	$returned = $statment->fetchAll(PDO::FETCH_ASSOC);
	header('Content-Type: application/json');
	echo json_encode($returned);

?>