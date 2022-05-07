const helmet = require('helmet');
const express = require('express');
const datas = require('./datas.json');
app = express();

app.use(helmet());

app.get('/', (req, res) => {
    res.send({ "error": "Please Use \/:app To Go To Specific App" });
});

app.get('*', (req, res) => {
    var app = req.params[0].split('/')[1];

    if (app in datas) {

        var params = req.params[0];
        var query = req.query;
        var redirect = "";
        redirect += datas[app]

        if (params.split('/').length > 2 && !params.toString().endsWith('/') || params.split('/').length > 3) {
            var finalParams = params.split('/');
            delete finalParams[1];
            redirect += finalParams.join('/').replace('//', '/');
        }

        if (Object.keys(query).length > 0) {
            redirect += "?";
            for (key in query) {
                redirect += key + "=" + query[key] + "&";
            }
            redirect = redirect.slice(0, -1);
        }
        res.send("Redirecting to: <a style='all:unset;font-family:monospace;color:blue;cursor:pointer;' href=" + redirect + ">" + redirect + "</a><script>window.onload=function(){window.location.href='" + redirect + "'}</script>");

    } else {
        res.send({ "error": "App Name Not Found" });
    }
});

app.listen(8080);