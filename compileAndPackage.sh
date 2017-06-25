#!/bin/bash
function cloneAndCheckout {
	git clone https://github.com/phillyfan1138/$1
	cd $1
	cd ..
}
function editMake {

	sed -i "1s/^/STATIC=-static-libstdc++\n/" makefile 
}
function compile {
	cd $1
	editMake
	make 
	cp $1 ../bin
	cd ..
}
rm -rf bin
mkdir bin

cloneAndCheckout marketRisk 
cloneAndCheckout creditRisk 
cloneAndCheckout opsRisk 
cloneAndCheckout HullWhite 
cloneAndCheckout GaussNewton 
cloneAndCheckout FunctionalUtilities 
cloneAndCheckout BinomialTree 
cloneAndCheckout MonteCarlo
cloneAndCheckout Vasicek
cloneAndCheckout CharacteristicFunctions 
cloneAndCheckout FangOost 
cloneAndCheckout TupleUtilities 
cloneAndCheckout RungeKutta
cloneAndCheckout AutoDiff
git clone https://github.com/miloyip/rapidjson
compile marketRisk
compile opsRisk
compile creditRisk
rm -rf marketRisk
rm -rf creditRisk
rm -rf opsRisk
rm -rf HullWhite
rm -rf GaussNewton
rm -rf FunctionalUtilities
rm -rf BinomialTree
rm -rf Vasicek
rm -rf MonteCarlo
rm -rf CharacteristicFunctions
rm -rf FangOost
rm -rf TupleUtilities
rm -rf RungeKutta
rm -rf AutoDiff
rm -rf rapidjson
#serverless deploy -v
