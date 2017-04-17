var redis = require('redis');
// Creates a new client. By default it uses port 6379
// Otherwise, use: var client = redis.createClient(port, host);
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected');
});

// Redis commands. Check https://redis.io/commands
client.set('framework', 'AngularJS', function(err, reply) {
  console.log('Set reply: ' + reply);
});

client.get('framework', function(err, reply) {
    console.log('Get reply: ' + reply);
});

client.hmset('frameworks', ['javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express']);

client.hgetall('frameworks', function(err, object) {
    console.log('HGETALL reply: ' + object);
});

client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log('RPUSH reply: ' + reply); //prints 2
});

client.lrange('frameworks', 0, -1, function(err, reply) {
    console.log('LRANGE reply: ' + reply); // ['angularjs', 'backbone']
});

client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
    console.log('SADD reply: ' + reply); // 3
});

client.smembers('tags', function(err, reply) {
    console.log('SMEMBERS reply: ' + reply);
});

client.exists('frameworks', function(err, reply) {
    if (reply === 1) {
        console.log('frameworks EXISTS reply: exists');
    } else {
        console.log('frameworks EXISTS reply: doesn\'t exist');
    }
});

client.exists('tags', function(err, reply) {
    if (reply === 1) {
        console.log('tags EXISTS reply: exists');
    } else {
        console.log('tags EXISTS reply: doesn\'t exist');
    }
});

client.del('frameworks', function(err, reply) {
    console.log('DEL reply: ' + reply);
});

client.set('key1', 'val1');
client.expire('key1', 30);

client.set('key1', 10, function() {
    client.incr('key1', function(err, reply) {
        console.log('INCR reply: ' + reply); // 11
    });
});