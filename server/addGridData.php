<?php
include('Grid.php');

$data = json_decode($_POST['data']);
$grid = new Grid();
$previousPoint = $data[0];
for($i=1; $i<sizeof($data); $i++)
{	
	if(round($data[$i]['lat'],4) !== round($previousPoint['lat'],4) || round($data[$i]['long'],4) !== round($previousPoint['long'],4) || $i = (sizeof($data)-1))
	{
		$grid->incrementTime($previousPoint['lat'], $previousPoint['long'], ($data[$i]['seconds']- $previousPoint['seconds']));
		$previousPoint = $data[$i];
	}
	
}

echo json_encode(true);

?>