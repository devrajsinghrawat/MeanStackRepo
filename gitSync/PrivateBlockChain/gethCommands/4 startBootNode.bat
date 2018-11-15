/// Port should be not part of Public network or conflicting one 
// Network id should be the one which was given while creating Genesis Block
// bootnodes details should be captured from Boot node Command output and just replace [::] with 127.0.0.1 i.e. localhost

// Node 1

geth 
--datadir node1/ 
--syncmode 'full' 
--port 30311 
--rpc --rpcaddr 'localhost' --rpcport 8501 --rpcapi 'personal,db,eth,net,web3,txpool,miner' 
--bootnodes 'enode://2654501864c2333b223469ab867a197d6caf896a19760dac1beec276cf918a5214f1b25d277dda8b68a890cc40fd7abb7b4ca083468d03c5807cca51979fa921@127.0.0.1:56184' 
--networkid 3018 --gasprice '1' -unlock '0xcb3457a71b98db0eb569467665f8e7639603a1c8' 
--password node1/password.txt --mine

// Node 2
geth 
--datadir node2/ 
--syncmode 'full' 
--port 30312 
--rpc --rpcaddr 'localhost' --rpcport 8502 --rpcapi 'personal,db,eth,net,web3,txpool,miner' 
--bootnodes 'enode://2654501864c2333b223469ab867a197d6caf896a19760dac1beec276cf918a5214f1b25d277dda8b68a890cc40fd7abb7b4ca083468d03c5807cca51979fa921@127.0.0.1:56184' 
--networkid 3018 
--gasprice '1' 
-unlock '0x877666c71805ee8909699a744b8fcad8cf676907' --password node2/password.txt --mine