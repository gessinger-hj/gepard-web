#!/bin/sh
rm -f gepard-web.js gepard-web.min.js
cd src
rm -f User.js Event.js MultiHash.js GPWebClient.js
wget https://raw.githubusercontent.com/gessinger-hj/gepard/master/src/User.js
wget https://raw.githubusercontent.com/gessinger-hj/gepard/master/src/Event.js
wget https://raw.githubusercontent.com/gessinger-hj/gepard/master/src/MultiHash.js
wget https://raw.githubusercontent.com/gessinger-hj/gepard/master/src/GPWebClient.js

cat User.js Event.js MultiHash.js GPWebClient.js | grep -v "require.*(" > ../gepard-web.js
cd ..	
if [ -x "./node_modules/.bin/uglifyjs" ]
then
	./node_modules/.bin/uglifyjs gepard-web.js -o gepard-web.min.js
fi
