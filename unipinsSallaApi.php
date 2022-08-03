
<?php

$curl = curl_init();
$date = new DateTime();
echo $date->getTimestamp();
echo '<br>';
$hash = hash_hmac("sha256", "9f6b0cd5-8f51-4cbc-a923-91f3f013cc37".(string)$date->getTimestamp()."in-game-topup/list", "7sushitngzq0kxqy");
echo $hash;
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://dev-api.unipin.com/in-game-topup/list',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'partnerid: 9f6b0cd5-8f51-4cbc-a923-91f3f013cc37',
    'timestamp: '.$date->getTimestamp(),
    'path: in-game-topup/list',
    'auth: '.$hash,
    'Content-Type: application/json',
    'Host: dev-api.unipin.com'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo '<br>';
echo $response;
