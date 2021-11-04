const http = require('http');
const app = require('./app');
const cluster = require('cluster');
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const port = process.env.PORT || '3001'


const server = http.createServer(app);


// set the view engine to ejs
app.set('view engine', 'ejs');



// View Routes
app.get('/',function (req,res){
    res.render('index')
})





if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Count the machine's CPUs

  const cpuCount = require('os').cpus().length;
  console.log(cpuCount)

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('fork', function (worker) {
    console.log(`Worker ${worker.id} was forked.`);
  });

  // Listen for dying workers
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });


} else {
  server.listen(port);
}

