const MOOGOID_API_URL = process.env.MOOGOID_API_URL;
var axios = require('axios');

exports.moogoldApiBalance = async () => await new Promise((resolve, reject) => {
    try {

        var data = JSON.stringify({
            "path": "user/balance"
        });

        var config = {
            method: 'post',
            url: `${MOOGOID_API_URL}/user/balance`,
            headers: { 
                'Authorization': 'Basic OWY2YjBjZDUtOGY1MS00Y2JjLWE5MjMtOTFmM2YwMTNjYzM3OjdzdXNoaXRuZ3pxMGt4cXk=', 
                'Content-Type': 'application/json', 
                'Cookie': 'aelia_cs_selected_currency=USD'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(response)
            resolve({
                status: true,
                response,
            }) 
        })
        .catch(function (e) {
            console.log(e.data)
            resolve({
                status: true,
                error: e,
            })
        }); 
    } catch (e) {
        console.log(e.data)
        resolve({
            status: true,
            error: e,
        })
    }
});