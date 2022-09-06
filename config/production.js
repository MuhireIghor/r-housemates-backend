const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
export function(app){
    app.use(helmet())
    app.use(compression());
}