# gepard-web
Web client for gepard (Browser, React, ...)
General purpose communication and synchronization layer for distributed applications / Microservices / events, semaphores, locks and messages for JavaScript, Java, Python and PHP

<!-- MarkdownTOC -->

- [Overview](#overview)
- [Usecases](#usecases)
	- [Updating a Customer-record in the Database](#updating-a-customer-record-in-the-database)

<!-- /MarkdownTOC -->

# Overview
This __JavaScript__ module implements a simple client for the __GEPARD__ middleware for general purpose distributed applications to be used in a Web-Browser application or in a React/React-native application for browser, iPhone and Android app.

This __GEPARD__ client can be used also within all JavaScript-based web-framworks.
It connects a WebApp directly with the __GEPARD__ middleware on the server-side. The connection is done with pure JavaScript WebSocket features without any helper-libs like socket.io or the like.
With this technology high performance is guaranteed without any overhead.

Service requests, semaphores, locks, events in an __GEPARD__ based communication layer are directly accessible.
The WebSocket server is based on an appropriate node-module on the server side.

This WebSocket server can easily be plugged into a standard web-server like apache or nginx.
Example configurations and many examples can be found in [gepard on npm](https://www.npmjs.com/package/gepard) and [gessinger-hj/gepard on github](https://github.com/gessinger-hj/gepard)

# Usecases
## Updating a Customer-record in the Database

Suppose there is a database containing customer base-data like for example name, id, enabled,...

The access to the database for example is done with __laravel/eloquent__. The UPDATE is coded with the following code-snippet:

```PHP
$customer_Id = 1 ;
$customer = App\Customer::find($customer_id);

$customer->name = 'New Customer Name';

$customer->save();
```

Interested 3rd parties now are informed by sending an Event:
```PHP
Client::getInstance()->emit('CUSTOMER_CHANGED', ['CUSTOMER_ID' => $customer_id]);
```

Interested parties for example are:

* A Java program which sends an e-mail.
	```Java
	Client.getInstance().on ( new String[] { "CUSTOMER_CHANGED" }, (e) -> {
		Integer customer_id = e.getValue ( "CUSTOMER_ID" ) ;

		*select customer from database with customer_id*
		*use any mail-api to send mail*
	} ) ;
	```

* A JavaScript program which sends an e-mail:
	```JavaScript
	gepard.getClient().on ( 'CUSTOMER_CHANGED', (e) => {
		let customer_id = e.getValue ( 'CUSTOMER_ID' ) ;

		*select customer from database with customer_id*
		*use any mail-api to send mail*
	} ) ;
	```
* A Python program which sends an e-mail:
	```py

	def on_CUSTOMER_CHANGED ( event ):
		customer_id = event.getValue ( 'CUSTOMER_ID' ) ;

		*select customer from database with customer_id*
		*use any mail-api to send mail*

	gepard.Client.getInstance().on ( 'CUSTOMER_CHANGED', on_CUSTOMER_CHANGED ) ;
	```
* A single page web-app or a React-native app
	```js
	gepard.getWebClient().on ( 'CUSTOMER_CHANGED', (e) => {
		let customer_id = e.getValue ( 'CUSTOMER_ID' ) ;

		if ( customer-data are displayed in any part of the page ) {
			*select customer from database with customer_id via a REST call*
			*update appropriate display*
		}
	} ) ;
	
	```


