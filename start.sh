#!/usr/bin/env bash
export SOCKETPROVIDER=wss://ropsten.leverj.io/socket
export NETWORK=https://ropsten.leverj.io/rpc
export STAKE=0x21ec0699AE84e342D34cABA2628880901e1A2bF1
export FEE=0xcba90Ed0CF9A12B7662A04e824f2022d9C106D4F
export ETHERSCAN=https://ropsten.etherscan.io
export LEV=0xaa7127e250e87476fdd253f15e86a4ea9c4c4bd4
export SALE=0xce2e19cec5a5188b434c7e11e40a12d611acac11
export FEEDECIMALS=9
export LEVDECIMALS=9

grunt; nodemon -d 2 src/server/index.js