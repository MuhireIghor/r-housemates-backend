const swaggerJsDoc= require('swagger-jsdoc');
const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:'R&HOUSEMATE BACKEND API',
            version:'1.0.0',
            description:'A full API documentation for the R&HOUSEMATES backend APIs'
        },
        servers:[
            {
                url:"http://localhost:3000"
            }
        ],
        consumes:['application/json','multipart/form-data','application/x-www-form-urlencoded'],
        produces:['application/json'],
        
    },
    apis:["./routes/api/*.js"],
}
const specs = swaggerJsDoc(options);
module.exports = {specs}