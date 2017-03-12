const spawn = require('child_process').spawn;
process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
const parseToInteger=(obj)=>{
    const isParseble=(val)=>{
        try{
            val=parseFloat(val);
        }catch(err){
            return val;
        }
        return val;
    }
    return Object.keys(obj).reduce((prev, curr)=>{
        prev[curr]=isParseble(obj[curr]);
        return prev;
    },{});
}
const genericSpawn=(event, binary, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res,
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
            'Content-Type': 'application/json',
        },
    });
    var modelOutput='';
    var modelErr='';
    const model=spawn('./bin/'+binary, [event.queryStringParameters?JSON.stringify(parseToInteger(event.queryStringParameters)):"{}"]);
    model.stdout.on('data', (data)=>{
        modelOutput+=data;
    });
    model.stderr.on('data', (data)=>{
        modelErr+=data;
    });
    model.on('close', (code)=>{
        if(modelErr){
            return done(new Error(modelErr), "");
        }
        return done(null, modelOutput);
    });
};
exports.opsRisk = (event, context, callback)=>{
    return genericSpawn(event, "opsRisk", callback);
}
exports.marketRisk = (event, context, callback)=>{
    return genericSpawn(event, "marketRisk", callback);
}
exports.creditRisk = (event, context, callback)=>{
    return genericSpawn(event, "creditRisk", callback);
}