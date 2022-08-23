const express = require('express');
const errorHandler = (err,req,res,next)=>{
errorStatus = err.status || 500;
errorMessage = err.message ||"Sorry something went wrong!";
errorStack = err.stack;
return res.status(errorStatus).json({
    success:false,
    message:errorMessage,
    stack:errorStack
});

  }
  
  module.exports = errorHandler;