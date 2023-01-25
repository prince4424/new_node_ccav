var http = require('http'),
    fs = require('fs'), 
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response){
    var body = '',
	workingKey = process.env.CC_WORKING_KEY,	
	accessCode = process.env.CC_ACCESS_CODE,			
    encRequest = '',
	formbody = '';
    console.log(ccav.encrypt(workingKey, accessCode))
    request.on('data', function (data) {
	body += data;
	encRequest = ccav.encrypt(body,workingKey); 
	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    console.log("enc request: " + JSON.stringify(encRequest));
});
				
    request.on('end', function () {
        response.writeHeader(200, {"Content-Type": "text/html"});
	response.write(formbody);
	response.end();
    });
   return; 
};
