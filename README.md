# gepard-web
Web client for gepard (Browser, React, ...)
General purpose communication and synchronization layer for distributed applications / Microservices / events, semaphores, locks and messages for JavaScript, Java, Python and PHP

# Overview
This __JavaScript__ module implements a simple client for the __GEPARD__ middleware for general purpose distributed applications to be used in a Web-Browser application or in a React/React-native application for browser, iPhone and Android app.

This __GEPARD__ client can be used also within all JavaScript-based web-framworks.
It connects a WebApp directly with the __GEPARD__ middleware on the server-side. The connection is done with pure JavaScript WebSocket features without any helper-libs like socket.io or the like.
With this technology high performance is guaranteed without any overhead.

Service requests, semaphores, locks, events in an __GEPARD__ based communication layer are directly accessible.
The WebSocket server is based on an appropriate node-module on the server side.

This WebSocket server can easily be plugged into a standard web-server like apache or nginx.
Example configurations and many examples can be found in [gepard on npm](https://www.npmjs.com/package/gepard) and [gessinger-hj/gepard on github](https://github.com/gessinger-hj/gepard)

