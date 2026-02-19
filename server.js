const app = require('./src/app');
const port = process.env.PORT||5000;
app.listen(port,()=>{
    console.log('server is running on http://localhost:5000');
})