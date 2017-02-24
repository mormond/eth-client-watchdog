var Web3 = require('web3');
var web3 = new Web3();
var sys = require('sys');
var exec = require('child_process').exec

web3.setProvider(new web3.providers.HttpProvider('http://13.95.8.186:8545'));
function puts(error, stdout, stderr) {	sys.puts(stdout) }

var interval = 60 * 1000;
var previousBlockNumber = 0;
setInterval(function() {
	console.log("Checking status of local ethereum client")
	var currentBlockNumber = web3.eth.blockNumber;
	console.log("Current block number " + currentBlockNumber);
	if(currentBlockNumber > previousBlockNumber) {
		console.log("Everything looks ok!")
		previousBlockNumber = currentBlockNumber;
	} else {
		console.log("Thing might have staled, let me give it a kick!")
		exec("pm2 restart gethNode", puts)	
	}
}, interval)
