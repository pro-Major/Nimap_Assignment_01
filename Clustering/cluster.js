var cluster = require('cluster');

if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('fork', function (worker) {
        console.log(`Worker ${worker.id} was forked.`);
    })

        // Listen for dying workers
        cluster.on('exit', function () {
            cluster.fork();
        });
    } else {
        require('./server');
    }