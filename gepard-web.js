if ( typeof gepard === 'undefined' ) gepard = {} ;

/**
 * User class
 *
 * @class
 * @param      {string}    id      The identifier
 * @param      {int}    key     The key
 * @param      {string}    pwd     The password
 */
gepard.User = function ( id, key, pwd )
{
	this.className  = "User" ;
	this.id         = id ;
	this.key        = key ;
	this._pwd       = pwd ;
	this.rights     = {} ;
	this.groups     = {} ;
	this.attributes = {} ;
};
/**
 * Description
 * @return String representation
 */
gepard.User.prototype.toString = function()
{
	var str = "" ;
	for ( var key in this.rights )
	{
		str += key + "=" + this.rights[key] ;
	}
	return "(" + this.className + ")[id=" + this.id + ",key=" + this.key + "\n" + str + "\n]" ;
};
/**
 * Description
 * @return id
 */
gepard.User.prototype.getId = function (  )
{
	return this.id ;
};
/**
 * Description
 * @return key
 */
gepard.User.prototype.getKey = function (  )
{
	return this.key ;
};
/**
 * Description
 * @return key
 */
gepard.User.prototype.getRights = function (  )
{
	return this.rights ;
};
/**
 * Gets right.
 *
 * @param      {string}  name    The name
 * @return     {string}  The right.
 */
gepard.User.prototype.getRight = function ( name )
{
	return this.rights[name] ;
};
/**
 * Sets the key.
 *
 * @param      {int}  key     The key
 */
gepard.User.prototype.setKey = function ( key )
{
  this.key = key ;
};
/**
 * Adds right.
 *
 * @param      {string}  name    The name
 * @param      {string}  value   The value
 */
gepard.User.prototype.addRight = function ( name, value )
{
  this.rights[name] = value ;
};
/**
 * Gets the attributes.
 *
 * @return     {object}  The attributes.
 */
gepard.User.prototype.getAttributes = function()
{
  return this.attributes ;
};

/**
 * Gets the attribute.
 *
 * @param      {string}  name    The name
 * @return     {string}  The attribute.
 */
gepard.User.prototype.getAttribute = function ( name )
{
	return this.attributes[name] ;
};
/**
 * Gets the language.
 *
 * @return     {string}  The language.
 */
gepard.User.prototype.getLanguage = function()
{
	return this.getAttribute("lang") ;
};
if ( typeof module === 'undefined' ) module = {} ;
module.exports = gepard.User ;
if ( typeof gepard === 'undefined' ) gepard = {} ;
if ( !Array.isArray )
{
  /**
   * Description
   * @method isArray
   * @param {} arg
   * @return LogicalExpression
   */
  Array.isArray = function(arg) {
  	return arg && arg.constructor === Array ;
  };
}
var _Event_isBrowser = true ;
if ( typeof process === 'object' ) {
  if ( typeof process.versions === 'object' ) {
    if ( typeof process.versions.node !== 'undefined' ) {
      _Event_isBrowser = false ;
    }
  }
}
var _Event_replace_Buffer_toJSON = null ;
/**
 * Description
 * @constructor
 * @class    Event
 * @param      {}    name    { description }
 * @param      {}    type    { description }
 * @param      {}    data    { description }
 */
gepard.Event = function ( name, type, data )
{
	this._init ( name, type, data ) ;
};
gepard.Event.prototype =
{
	/**
	 * Description
	 * @method serialize
	 * @param {object} obj
	 * @return string
	 */
	serialize: function ( obj )
	{
		var Date_toJSON, Buffer_toJSON ;
		if ( ! obj )
		{
			if ( this._Client ) delete this["_Client"] ;
			obj = this ;
		}
 		if ( typeof Buffer !== 'undefined' )
 		{
 			if ( _Event_replace_Buffer_toJSON === null )
 			{
 				var s = String ( Buffer.prototype.toJSON ) ;
	 			if ( s.indexOf ( 'type:' ) < 0 && s.indexOf ( 'data' ) < 0 )
	 			{
	 				_Event_replace_Buffer_toJSON = true ;
	 			}
 			}
 			if ( _Event_replace_Buffer_toJSON )
 			{
	    	Buffer_toJSON = Buffer.prototype.toJSON ;
 				Buffer.prototype.toJSON = function function_Buffer_toJSON()
 				{
			    return { type:"Buffer", data:Array.prototype.slice.call(this, 0) } ;
			  }
 			}
 		}
	  Date_toJSON = Date.prototype.toJSON ;
	  try
	  {
	    /**
    	 * Description
    	 * @method toJSON
    	 * @return ObjectExpression
    	 */
    	Date.prototype.toJSON = function function_Date_toJSON()
	    {
	      return { type:'Date', 'value': this.toISOString() } ;
	    };
	    return JSON.stringify ( obj ) ;
	  }
	  finally
	  {
	  	if ( Date_toJSON )
	  	{
	    	Date.prototype.toJSON = Date_toJSON ;
	  	}
	  	if ( Buffer_toJSON )
	  	{
	    	Buffer.prototype.toJSON = Buffer_toJSON ;
	  	}
	  }
	},
	_classNameToConstructor: {},
	addClassNameToConstructor: function ( className, clazz )
	{
		this._classNameToConstructor[className] = clazz ;
	},
	setTargetIsLocalHost: function ( state )
	{
		state = !! state ;
    this._visit ( this.body, function e_visit ( o )
    {
      if ( typeof o.setTargetIsLocalHost === 'function' )
      {
        o.setTargetIsLocalHost ( state ) ;
      }
    }) ;
  },
	visit: function ( visitor )
	{
		this._visit ( this, visitor ) ;
	},
	_visit: function ( obj, visitor )
	{
		for ( var key in obj )
		{
			var o = obj[key] ;
			if ( typeof o !== 'object' )
			{
				continue ;
			}
			if ( ! o )
			{
				continue ;
			}
			if ( visitor.call ( null, o ) === false )
			{
				return false ;
			}
			if ( this._visit ( o, visitor ) === false )
			{
				return false ;
			}
		}
	},
	/**
	 * Description
	 * @method deserialize
	 * @param {} serializedObject
	 * @param {} classNameToConstructor
	 * @param {} deepClassInspection
	 * @return that
	 */
	deserialize: function ( serializedObject, classNameToConstructor, deepClassInspection )
	{
	  var that, f ;
	  var obj = serializedObject ;
	  if ( deepClassInspection !== false ) deepClassInspection = true ;
	  if ( typeof serializedObject === 'string' )
	  {
			try
			{
		    obj = JSON.parse ( serializedObject ) ;
			}
			catch ( exc )
			{
				console.log ( serializedObject ) ;
				console.log ( exc ) ;
				throw exc ;
			}
	  }
	  if ( deepClassInspection )
	  {
		  if ( ! _Event_isBrowser )
		  {
		  	module.exports.prototype.deepDeserializeClass ( obj ) ;
		  }
		  else
		  {
		  	gepard.Event.prototype.deepDeserializeClass ( obj ) ;
		  }
	  }
	  if ( ! classNameToConstructor )
	  {
		  if ( ! _Event_isBrowser )
		  {
		  	classNameToConstructor = module.exports.prototype._classNameToConstructor ;
		  }
		  else
		  {
		  	classNameToConstructor = gepard.Event.prototype._classNameToConstructor ;
		  }
	  }
	  if ( obj.className && typeof obj.className === 'string' )
	  {
      var mcn = classNameToConstructor[obj.className] ;
      if ( mcn )
      {
        that = f = new mcn() ;
      }
      if ( ! f )
      {
	      f = eval ( obj.className ) ;
		    if ( typeof Object.create === 'function' )
		    {
			    that = Object.create ( f.prototype ) ;
		    }
		    else
		    {
			    /**
    			 * Description
    			 * @method F
    			 * @return 
    			 */
    			function F() { } ;
			    F.prototype = f.prototype ;
	    		that = new F();
	  		}
	    }

	    for ( var k in obj )
	    {
	      if ( ! obj.hasOwnProperty ( k ) ) continue ;
	      var o = obj[k] ;
	      if ( o && typeof o === 'object' )
	      {
	        if ( o.className && typeof o.className === 'string' )
	        {
	          that[k] = this.deserialize ( o ) ;
	          continue ;
	        }
	      }
	      that[k] = obj[k]  ;
	    }
	  }
  	return that ;
	},
	/**
	 * Description
	 * @method deepDeserializeClass
	 * @param {} obj
	 * @return 
	 */
	deepDeserializeClass: function ( obj )
	{
  	if ( ! obj ) return ;
  	for ( var k in obj )
  	{
    	if ( typeof obj.hasOwnProperty === 'function' )
    	{
	    	if ( ! obj.hasOwnProperty ( k ) ) continue ;
    	}
	    var o = obj[k] ;
  	  if ( ! o ) continue ;
    
	    if ( typeof o.type === 'string' )
	    {
	      if ( o.type === 'Date' )
	      {
	        obj[k] = new Date ( o.value ) ;
	        continue ;
	      }
	      if ( typeof Buffer !== 'undefined' )
	      {
		      if ( o.type === "Buffer" && Array.isArray ( o.data ) )
		      {
		        obj[k] = new Buffer ( o.data ) ;
		        continue ;
		      }
	      }
	      if ( ! _Event_isBrowser )
	      {
		      // if ( o.type === 'Xml' )
		      // {
		      //   var f = new txml.XmlFactory() ;
		      //   obj[k] = f.create ( o.value ) ;
		      //   continue ;
		      // }
	      }
	    }
	    if ( o.className && typeof o.className === 'string' )
	    {
	      var mcn = this._classNameToConstructor[o.className] ;
	      if ( mcn )
	      {
			    if ( typeof Object.create === 'function' )
			    {
				    obj[k] = that = Object.create ( mcn.prototype ) ;
				    for ( var kk in o )
				    {
				      if ( ! o.hasOwnProperty ( kk ) ) continue ;
				      var oo = o[kk] ;
				      if ( oo && typeof oo === 'object' )
				      {
				        if ( oo.className && typeof oo.className === 'string' )
				        {
				          that[kk] = this.deserialize ( oo ) ;
				          continue ;
				        }
				        if ( typeof oo.type === 'string' )
				        {
						      if ( oo.type === 'Date' )
						      {
						        that[kk] = new Date ( oo.value ) ;
						        continue ;
						      }
						      if ( typeof Buffer !== 'undefined' )
						      {
							      if ( oo.type === "Buffer" && Array.isArray ( oo.data ) )
							      {
							        that[kk] = new Buffer ( oo.data ) ;
							        continue ;
							      }
							    }
						      if ( ! _Event_isBrowser )
						      {
							      // if ( o.type === 'Xml' )
							      // {
							      //   var f = new txml.XmlFactory() ;
							      //   obj[k] = f.create ( o.value ) ;
							      //   continue ;
							      // }
						      }
				        }
				      }
				      that[kk] = o[kk]  ;
				    }
			    }
	      }
	    }
	    if ( typeof o === 'object' )
	    {
	      this.deepDeserializeClass ( o ) ;
	    }
	  }
	},
	_init: function ( name, type, data )
	{
		this.className = "Event" ;
		this.name = "" ;
		this.type = "" ;
		this.setName ( name ) ;
		if ( type && typeof type === 'object' )
		{
			data = type ;
			type = "" ;
		}
		this.setType ( type ) ;
		this.user = null ;
		this.control = { createdAt: new Date(), plang: "JavaScript" } ;
		if ( data )
		{
			if ( typeof data === 'object' ) this.body = data ;
			else
			{
				this.body = {} ;
				this.body.data = data ;
			}
		}
		else this.body = {} ;
	},
	/**
	 * Description
	 * @method getClassName
	 * @return MemberExpression
	 */
	getClassName: function()
	{
		return this.className ;
	},
	/**
	 * Description
	 * @method toString
	 * @return 
	 */
	toString: function()
	{
		return "(" + this.className + ")["
		+  "name=" + this.name
		+ ",type=" + this.type
		+ "]\n"
		+ ( this.user ? "[user=" + this.user + "]" : "" )
		+ "[control=" + this.toFullString ( this.control ) + "]\n"
		+ "[body=" + this.toFullString ( this.body ) + "]"
		;
	},
	toFullString: function ( text, indent )
	{
	  if ( ! indent ) indent = "" ;
	  if ( Array.isArray ( text ) || ( typeof ( text ) == 'object' && text ) )
	  {
	    var str = "" ;
	    if ( text.jsClassName && typeof ( text.toString ) == 'function' )
	    {
	      str += indent + text + "\n" ;
	      return ;
	    }
	    if ( typeof ( text.nodeType ) == 'number' && text.nodeName && typeof ( text.firstChild  ) )
	    {
	      str += indent + text + "\n" ;
	      return ;
	    }
	    for ( var key in text )
	    {
	      var p = text [ key ] ;
	      if ( typeof ( p ) == 'function' ) continue ;
	      if ( Array.isArray ( p ) || ( typeof ( p ) == 'object' && ! ( p instanceof Date ) ) )
	      {
	        str += indent + "\"" + key + "\":\n" + this.toFullString ( p, indent + "  " ) + "\n" ;
	        continue ;
	      }
	      str += indent + "\"" + key + "\": \"" + p + "\"\n" ;
	    }
	    return str ;
	  }
	  return String ( text ) ;
	},
	/**
	 * Description
	 * @method getCreatedAt
	 * @return MemberExpression
	 */
	getCreatedAt: function()
	{
  	return this.control.createdAt ;
	},
	/**
	 * Description
	 * @method setIsResult
	 * @return 
	 */
	setIsResult: function()
	{
  	this.control._isResult = true ;
	},
	/**
	 * Description
	 * @method isResult
	 * @return MemberExpression
	 */
	isResult: function()
	{
  	return this.control._isResult ;
	},
	/**
	 * Description
	 * @method setResultRequested
	 * @return 
	 */
	setResultRequested: function()
	{
  	this.control._isResultRequested = true ;
	},
		/**
	 * Description
	 * @method isResultRequested
	 * @return MemberExpression
	 */
	isResultRequested: function()
	{
  	return this.control._isResultRequested ;
	},
	setFailureInfoRequested: function()
	{
  	this.control._isFailureInfoRequested = true ;
	},
	isFailureInfoRequested: function()
	{
  	return this.control._isFailureInfoRequested ;
	},
	setStatusInfoRequested: function()
	{
  	this.control._isStatusInfoRequested = true ;
	},
	isStatusInfoRequested: function()
	{
  	return this.control._isStatusInfoRequested ;
	},
	setIsStatusInfo: function()
	{
  	this.control._isStatusInfo = true ;
	},
	isStatusInfo: function()
	{
  	return this.control._isStatusInfo ;
	},
	/**
	 * Description
	 * @method setIsBroadcast
	 * @return 
	 */
	setIsBroadcast: function()
	{
  	this.control._isBroadcast = true ;
	},
		/**
	 * Description
	 * @method isBroadcast
	 * @return MemberExpression
	 */
	isBroadcast: function()
	{
  	return this.control._isBroadcast ;
	},
	/**
	 * Description
	 * @method getSourceIdentifier
	 * @return MemberExpression
	 */
	getSourceIdentifier: function()
	{
  	return this.control.sourceIdentifier ;
	},
	/**
	 * Description
	 * @method setSourceIdentifier
	 * @param {} sourceIdentifier
	 * @return 
	 */
	setSourceIdentifier: function ( sourceIdentifier )
	{
  	this.control.sourceIdentifier = sourceIdentifier ;
	},
	setChannel: function ( channel )
	{
		if ( this.control.channel ) return ;
  	this.control.channel = channel ;
	},
	getChannel: function()
	{
  	return this.control.channel ;
	},
	/**
	 * Description
	 * @method getProxyIdentifier
	 * @return MemberExpression
	 */
	getProxyIdentifier: function()
	{
  	return this.control.proxyIdentifier ;
	},
	/**
	 * Description
	 * @method setProxyIdentifier
	 * @param {} proxyIdentifier
	 * @return 
	 */
	setProxyIdentifier: function ( proxyIdentifier )
	{
  	this.control.proxyIdentifier = proxyIdentifier ;
	},
	/**
	 * Description
	 * @method getWebIdentifier
	 * @return MemberExpression
	 */
	getWebIdentifier: function()
	{
  	return this.control.webIdentifier ;
	},
	/**
	 * Description
	 * @method setWebIdentifier
	 * @param {} webIdentifier
	 * @return 
	 */
	setWebIdentifier: function ( webIdentifier )
	{
  	this.control.webIdentifier = webIdentifier ;
	},
	/**
	 * Description
	 * @method getName
	 * @return MemberExpression
	 */
	getName: function()
	{
  	return this.name ;
	},
	/**
	 * Description
	 * @method setName
	 * @param {} name
	 * @return 
	 */
	setName: function ( name )
	{
  	this.name = name ? name : "" ;
	},
	/**
	 * Description
	 * @method getType
	 * @return MemberExpression
	 */
	getType: function()
	{
		return this.type ;
	},
	/**
	 * Description
	 * @method setType
	 * @param {} type
	 * @return 
	 */
	setType: function ( type )
	{
		if ( typeof type === 'undefined' ) type = "" ;
  	this.type = type ;
	},
	/**
	 * Description
	 * @method getBody
	 * @return {object} body
	 */
	getBody: function()
	{
		return this.body ;
	},
	/**
	 * Description
	 * @method setBody
	 * @param {object} data
	 * @return 
	 */
	setBody: function ( data )
	{
		if ( ! data ) return ;
		if ( typeof data !== 'object' )
		{
			throw new Error ( "Event.setBody(): Argument must be an object." ) ;
		}
		if ( data ) this.body = data ;
	},
	/**
	 * Description
	 * @method putValue
	 * @param {string} name
	 * @param {any} value
	 * @return 
	 */
	putValue: function ( name, value )
	{
		if ( ! name || typeof name !== 'string' )
		{
			throw new Error ( "Event.putValue(): name must be a string." ) ;
		}
		if ( typeof value === 'undefined' )
		{
			throw new Error ( "Event.putValue(): Missing value." ) ;
		}
		this.body[name] = value ;
	},
	/**
	 * Description
	 * @method removeValue
	 * @param {string} name
	 * @return 
	 */
	removeValue: function ( name )
	{
		if ( ! name || typeof name !== 'string' )
		{
			throw new Error ( "Event.removeValue(): name must be a string." ) ;
		}
		var v = this.body[name] ;
		delete this.body[name] ;
		return v ;
	},
	/**
	 * Description
	 * @method getValue
	 * @param {string} name
	 * @return {any} value
	 */
	getValue: function ( name )
	{
		if ( ! name || typeof name !== 'string' )
		{
			throw new Error ( "Event.getValue(): name must be a string." ) ;
		}
		return this.body[name] ;
	},
	/**
	 * Description
	 * @method getUser
	 * @return MemberExpression
	 */
	getUser: function()
	{
		return this.user ;
	},
	/**
	 * Description
	 * @method setUser
	 * @param {} u
	 * @return 
	 */
	setUser: function ( u )
	{
		this.user = u ;
	},
	/**
	 * Description
	 * @method getControl
	 * @return MemberExpression
	 */
	getControl: function()
	{
		return this.control ;
	},
	/**
	 * Description
	 * @method setUniqueId
	 * @param {} uid
	 * @return 
	 */
	setUniqueId: function ( uid )
	{
		if ( ! this.control.uniqueId )
		{
			this.control.uniqueId = uid ;
		}
	},
	/**
	 * Description
	 * @method getUniqueId
	 * @return MemberExpression
	 */
	getUniqueId: function()
	{
		return this.control.uniqueId ;
	},
	isInUse: function()
	{
		return !! this.control.isInUse ;
	},
	setInUse: function()
	{
		return this.control.isInUse = true ;
	},
	/**
	 * Description
	 * @method isBad
	 * @return BinaryExpression
	 */
	isBad: function()
	{
		if ( ! this.control ) return false ;
		if ( ! this.control.status ) return false ;
		if ( this.control.status.code === 'undefined' ) return false ;
		return this.control.status.code !== 0 ;
	},
	/**
	 * Description
	 * @method getStatus
	 * @return MemberExpression
	 */
	getStatus: function()
	{
		if ( ! this.control ) return ;
		return this.control.status ;
	},
	/**
	 * Description
	 * @method getStatusReason
	 * @return MemberExpression
	 */
	getStatusReason: function()
	{
		if ( ! this.control ) return ;
		if ( ! this.control.status ) return ;
		return this.control.status.reason ;
	},
	getStatusName: function()
	{
		if ( ! this.control ) return ;
		if ( ! this.control.status ) return ;
		return this.control.status.name ;
	},
	getStatusCode: function()
	{
		if ( ! this.control ) return ;
		if ( ! this.control.status ) return ;
		return this.control.status.code ;
	},
	setStatus: function ( code, name, reason )
	{
		if ( ! this.control ) this.control = {} ;
		this.control.status = {} ;
		if ( code )
		{
			code = parseInt ( code ) ;
		}
		if ( ! code )
		{
			code = 0 ;
		}
		this.control.status.code = code ;
		if ( name )
		{
			this.control.status.name = name ;
		}
		if ( reason )
		{
			this.control.status.reason = reason ;
		}
	},
	sendBack: function()
	{
		var c = this._Client ;
		this._Client = null ;
		delete this._Client ;
		c.sendResult ( this ) ;
	},
	getClient: function()
	{
		return this._Client ;
	},
	_setHostname: function ( hostName )
	{
		if ( ! this.control.hostName )
		{
			this.control.hostname = hostName ;
		}
	},
	/**
	 * Description
	 * @method _getHostname
	 * @param {} hostName
	 * @return {string} hostname
	 */
	getHostname: function()
	{
		return this.control.hostname ;
	}
};
// export default gepard.Event ;

if ( typeof module === 'undefined' ) module = {} ;
module.exports = gepard.Event ;
gepard.Event.prototype._classNameToConstructor["Event"] = gepard.Event ;
if ( typeof gepard.User !== 'undefined' )
{
	gepard.Event.prototype._classNameToConstructor.User = gepard.User ;
}
if ( _Event_isBrowser )
{
	gepard.serialize = gepard.Event.prototype.serialize ;
	gepard.deserialize = gepard.Event.prototype.deserialize ;
 	gepard.Event.prototype._classNameToConstructor["Event"] = gepard.Event ;
}
else
if ( typeof require === 'undefined' )
{
}
else
{
	module.exports = gepard.Event ;
 	gepard.Event.prototype._classNameToConstructor["Event"] = gepard.Event ;
 	if ( typeof gepard.Event.prototype._classNameToConstructor.User === 'undefined' )
 	{
 	}
	if ( require.main === module )
	{
		var e = new gepard.Event ( 'ALARM', "TEST" ) ;
		var u = new User ( "smith", 4711, "secret" ) ;
		u.addRight ( "CAN_READ_FILES", "*.docx" ) ;
		e.setUser ( u ) ;
		var b = new Buffer ( "ABCDE" ) ;
		e.getBody().binaryData = b ;
		var str = e.serialize() ;
		console.log ( "str=" + str ) ;
		var o = gepard.Event.prototype.deserialize ( str ) ;
		console.log ( o ) ;
	}
	// gepard = undefined ;
}
if ( typeof tangojs === 'undefined' ) tangojs = {} ;
/**
 *  @constructor
 */
tangojs.MultiHash = function()
{
  this._hash = {} ;
  this.className = "MultiHash" ;
  this.__defineGetter__( "length", this.size.bind ( this ) ) ;
};
tangojs.MultiHash.prototype =
{
  /**
   * Description
   * @param {} key
   * @param {} obj
   */
  put: function ( key, obj )
  {
    var l = this._hash[key] ;
    if ( ! l )
    {
      l = [] ;
      this._hash[key] = l ;
    }
    if ( l.indexOf ( obj ) >= 0 )
    {
      return ;
    }
    l.push ( obj ) ;
  },
  /**
   * Description
   * @param {} obj
   * @return list
   */
  getKeysOf: function ( obj )
  {
    var list = [] ;
    var keys = this.getKeys() ;
    for ( var i = 0 ; i < keys.length ; i++ )
    {
      var l = this._hash[keys[i]]
      if ( l.indexOf ( obj ) >= 0 )
      {
        list.push ( keys[i] ) ;
      }
    }
    return list ;
  },
  removeFirst: function ( key )
  {
    var l = this._hash[key] ;
    if ( ! l ) return ;
    if ( ! l.length ) return ;
    var obj = l[0] ;
    return this.remove ( key, obj ) ;
  },
  /**
   * Description
   * @param {} key
   * @param {} obj
   * @return obj
   */
  remove: function ( key, obj )
  {
    var l ;
    var index ;
    if ( key && ( typeof key === 'object' || typeof key === 'function' ) )
    {
      obj = key ;
      var keys = this.getKeys() ;
      for ( var i = 0 ; i < keys.length ; i++ )
      {
        l = this._hash[keys[i]]
        index = l.indexOf ( obj ) ;
        if ( index < 0 ) continue ;
        l.splice ( index, 1 ) ;
        if ( ! l.length )
        {
          delete this._hash[keys[i]] ;
        }
      }
      return ;
    }
    l = this._hash[key] ;
    if ( ! l ) return false ;
    if ( ! obj )
    {
      l.length = 0 ;
      delete this._hash[key] ;
      return true ;
    }
    index = l.indexOf ( obj ) ;
    if ( index >= 0 )
    {
      l.splice ( index, 1 ) ;
    }
    if ( ! l.length )
    {
      delete this._hash[key] ;
    }
    return obj ;
  },
  /**
   * Description
   * @param {} key
   * @return l
   */
  get: function ( key )
  {
    var l = this._hash[key] ;
    return l ;
  },
  size: function()
  {
    var k = this.getKeys() ;
    return k.length ;
  },
  /**
   * Description
   * @return a
   */
  getKeys: function()
  {
    var a = [] ;
    for ( var k in this._hash )
    {
      if ( typeof ( this._hash[k] ) === 'function' ) continue ;
      a.push ( k ) ;
    }
    return a ;
  },
  /**
   * Description
   * @return str
   */
  toString: function()
  {
    var str = "(MultiHash)" ;
    // str += "size=" + this._hash.length ;
    for ( var k in this._hash )
    {
      var l = this._hash[k] ;
      if ( ! Array.isArray ( l ) ) continue ;
      str += "\n  key=" + k + ",size=" + l.length ;
      for ( var i = 0 ; i < l.length ; i++ )
      {
        str += "\n    " + i + ":" + l[i] ;
      }
    }
    return str ;
  },
  /**
   * Description
   */
  flush: function()
  {
    delete this._hash ;
  }
};
if ( typeof module === 'undefined' ) module = {} ;
module.exports = tangojs.MultiHash ;

if ( typeof gepard === 'undefined' ) gepard = {} ;

gepard.counter = 0 ;
gepard.port = 17502 ; // default port
gepard.clients = {} ;
/**
 * get an existing client or create a new one
 * @param  {int} port port
 * @param  {[string]} host host (optional)
 * @return {WebClient}      the WebClient object
 */
gepard.getClient = function ( port, host )
{
  return this.getWebClient ( port, host ) ;
};
/**
 * get an existing client or create a new one
 * @param  {int} port port
 * @param  {[string]} host host (optional)
 * @return {WebClient}      the WebClient object
 */
gepard.getWebClient = function ( port, host )
{
  var key = "" + port + host ;
  if ( typeof port === "string" )
  {
    key = port ;
  }
  else
  {
    host = ! host ? "" : host ;
    if ( ! port )
    {
      port = gepard.port ;
    }
    key = "" + port + host ;
  }
  var wc = gepard[key] ;
  if ( wc ) return wc ;
  return new gepard.WebClient ( port, host ) ;
};
gepard.hasStacks = false;
try {
  if ( typeof Error !== 'undefined' )
  {
    throw new Error();
  }
} catch (e) {
    gepard.hasStacks = !!e.stack;
};
gepard.where = function ( str )
{
  var t = this._where ( str ) ;
  if ( typeof t !== 'undefined' )
  {
    console.log ( t ) ;
  }
};
gepard._where = function ( str )
{
  if ( ! gepard.hasStacks) {
      return;
  }
  try
  {
    throw new Error();
  }
  catch (e)
  {
    var lines = e.stack.split ("\n") ;
    var i = 0 ;
    for ( i = 0 ; i < lines.length ; i++ )
    {
      if ( lines[i].indexOf ( "where" ) >= 0 )
      {
        break ;
      }
    }
    for ( ; i < lines.length ; i++ )
    {
      if ( lines[i].indexOf ( "where" ) < 0 )
      {
        break ;
      }
    }
    var firstLine = lines[i] ;
    firstLine = firstLine.trim() ;
    if ( firstLine.indexOf ( "at " ) === 0 ) firstLine = firstLine.substring ( 3 ) ;
    if ( firstLine.indexOf ( "<anonymous function: " ) === 0 )
    {
      firstLine = firstLine.substring ( "<anonymous function: ".length ) ;
    }
    var p1 = firstLine.indexOf ( "http:" ) ;
    if ( p1 > 0 )
    {
      var p2 = firstLine.lastIndexOf ( "/" ) ;
      if ( p2 > 0 )
      {
        firstLine = firstLine.substring ( 0, p1 ) + firstLine.substring ( p2 + 1 ) ;
      }
    }
    var p1 = firstLine.indexOf ( "?" ) ;
    if ( p1 > 0 )
    {
      var p2 = firstLine.indexOf ( ":", p1 ) ;
      if ( p2 > 0 )
      {
        firstLine = firstLine.substring ( 0, p1 ) + firstLine.substring ( p2 ) ;
      }
    }
    if ( str )
    {
      return str + ": " + firstLine ;
    }
    return firstLine ;
  }
};

/**
 * WebClient class
 * @param {int} port port of interest.
 *                   Default: 17502
 * @param {[string]} host host of interest
 */
gepard.WebClient = function ( port, host )
{
  this._port                     = port ;
  this._socket                   = null ;
  this._user                     = null ;
  this._pendingEventList         = [] ;
  this._pendingResultList        = {} ;
  this._callbacks                = {} ;
  this._eventListenerFunctions   = new tangojs.MultiHash() ;
  this._pendingEventListenerList = [] ;
  var domain                     = host ? host : typeof document === 'object' ? document.domain : "" ;
  if ( typeof port === 'string' )
  {
    this._url = port ;
  }
  else
  if ( typeof window === 'object' && typeof window.location === 'object' && window.location.protocol === 'https:')
  {
    this._url = "wss://" + domain + ":" + this._port ;
  }
  else
  {
    this._url = "ws://" + domain + ":" + this._port ;
  }

  this._proxyIdentifier             = null ;
  this._onCallbackFunctions         = new tangojs.MultiHash() ;
  this._pendingLockList             = [] ;
  this._acquiredResources           = {} ;
  this._ownedResources              = {} ;
  this._acquiredSemaphores          = {} ;
  this._ownedSemaphores             = {} ;
  this._pendingAcquireSemaphoreList = [] ;
  gepard.clients[""+port+host]      = this ;
  this._reconnectIntervalMillis     = 5000 ;
  this._reconnect                   = !! gepard.reconnect ;
  // this.setChannel ( T.getProperty ( "gepard.channel" ) ) ; TODO
  this._isReconnecting              = false ;
};
gepard.WebClient.prototype._initialize = function()
{
};
/**
 * Description
 * @return unique id
 */
gepard.WebClient.prototype._createUniqueEventId = function()
{
  return this._url + "_" + new Date().getTime() + "-" + this._proxyIdentifier + "-" + (gepard.counter++) ;
};
gepard.WebClient.prototype._emit = function ( p1, eventName )
{
  var list = this._onCallbackFunctions.get ( eventName ) ;
  if ( list )
  {
    for ( i = 0 ; i < list.length ; i++ )
    {
      list[i].call ( this, p1, eventName ) ;
    }
  }
};
/**
 * close this client-connection.
 */
gepard.WebClient.prototype.close = function()
{
  this._reconnect = false ;
  if ( ! this._socket ) return ;
  try
  {
    this._socket.close() ;
    this._socket = null ;
  }
  catch ( exc )
  {
    
  }
}
/**
 * Sets the reconnect.
 *
 * @param      {boolean}  state   The state
 * @return     {Object}  this
 */
gepard.WebClient.prototype.setReconnect = function ( state )
{
  state = !! state ;
  this._reconnect = state ;
  return this ;
};
gepard.WebClient.prototype._retryConnection = function()
{
  this.getSocket() ;
};
gepard.WebClient.prototype._connect = function()
{
  var thiz = this ;
  this._socket = new WebSocket ( this._url ) ;
  console.log("Creating WebSocket for url: " + this._url ) ;
  var list, i ;

  /**
   * Description
   * @param {} err
   */
  this._socket.onerror = function(err)
  {
    console.log("WebSocket error '"+err.message+"' for url: " + thiz._url ) ;
    if ( thiz._socket )
    {
      thiz._socket.close() ;
      thiz._socket = null ;
    }
    thiz._emit ( err, "error" ) ;
    if ( thiz._reconnect && ! thiz._isReconnecting )
    {
      thiz._isReconnecting = true ;
      var keyList = thiz._eventListenerFunctions.getKeys() ;
      if ( keyList.length && ! thiz._pendingEventListenerList.length )
      {
        var e = new gepard.Event ( "system", "addEventListener" ) ;
        if ( thiz.user ) e.setUser ( thiz.user ) ;
        e.body.eventNameList = keyList ;
        thiz._pendingEventListenerList.push ( { e:e } ) ;
      }
      if ( thiz.intervalId ) clearInterval ( thiz.intervalId ) ;
      console.log ( "Connection failed. Trying to reconnect." ) ;
      thiz.intervalId = setInterval ( thiz._retryConnection.bind ( thiz ), thiz._reconnectIntervalMillis ) ;
    }
  } ;
  this._socket.onclose = function onclose(e)
  {
    console.log("WebSocket closed for url: " + thiz._url ) ;
    thiz._socket = null ;
    thiz._emit ( null, "close" ) ;
    thiz._emit ( null, "end" ) ;
    if ( thiz._reconnect && ! thiz._isReconnecting )
    {
      thiz._isReconnecting = true ;
      var keyList = thiz._eventListenerFunctions.getKeys() ;
      if ( keyList.length && ! thiz._pendingEventListenerList.length )
      {
        var e = new gepard.Event ( "system", "addEventListener" ) ;
        if ( thiz.user ) e.setUser ( thiz.user ) ;
        e.body.eventNameList = keyList ;
        thiz._pendingEventListenerList.push ( { e:e } ) ;
      }
      if ( thiz.intervalId ) clearInterval ( thiz.intervalId ) ;
      console.log ( "Connection closed. Trying to reconnect." ) ;
      thiz.intervalId = setInterval ( thiz._retryConnection.bind ( thiz ), thiz._reconnectIntervalMillis ) ;
    }
  } ;
  /**
   * Description
   * @param {} messageEvent
   */
  this._socket.onmessage = function onmessage ( messageEvent )
  {
    var mm = messageEvent.data ;
    if ( ! this.partialMessage ) this.partialMessage = "" ;
    mm = this.partialMessage + mm ;
    this.partialMessage = "" ;
    var result = thiz._splitJSONObjects ( mm ) ;
    var messageList = result.list

    var j = 0 ;
    for ( j = 0 ; j < messageList.length ; j++ )
    {
      var m = messageList[j] ;
      if ( m.length === 0 )
      {
        continue ;
      }
      if ( j === messageList.length - 1 )
      {
        if ( result.lastLineIsPartial )
        {
          this.partialMessage = m ;
          break ;
        }
      }
      if ( m.charAt ( 0 ) === '{' )
      {
        var e = gepard.deserialize ( m ) ;
        // e._Client = thiz ;
        var wid = e.getWebIdentifier() ;
        if ( e.isResult() )
        {
          var ctx = thiz._callbacks[wid] ;
          delete thiz._callbacks[wid] ;
          if ( e.isBad() )
          {
            console.log ( e.getStatus() ) ;
            if ( ctx.error )
            {
              ctx.error.call ( thiz, e ) ;
            }
            else
            if ( ctx.result )
            {
              ctx.result.call ( thiz, e ) ;
            }
            continue ;
          }
          var rcb = ctx.result ;
          rcb.call ( thiz, e ) ;
          continue ;
        }
        if ( e.getName() === "system" )
        {
          if ( e.getType() === "shutdown" )
          {
            return ;
          }
          if ( e.getType() === "client_info_response" )
          {
            thiz._proxyIdentifier = e.getProxyIdentifier() ;
            return ;
          }
          if ( e.isBad() )
          {
            var ctx = thiz._callbacks[wid] ;
            delete thiz._callbacks[wid] ;
            var rcb = ctx.error ;
            if ( rcb )
            {
              rcb.call ( thiz, e ) ;
            }
            continue ;
          }
          ////////////////////////////
          // lock resource handling //
          ////////////////////////////
          if ( e.getType() === "lockResourceResult" )
          {
            ctx = thiz._acquiredResources[e.body.resourceId] ;
            delete thiz._acquiredResources[e.body.resourceId] ;
            if ( e.body.isLockOwner )
            {
              thiz._ownedResources[e.body.resourceId] = ctx ;
            }
            if ( ctx )
            {
              ctx.callback.call ( thiz, null, e ) ;
            }
            continue ;
          }
          if ( e.getType() === "unlockResourceResult" )
          {
            delete thiz._ownedResources[e.body.resourceId] ;
            continue ;
          }
          ////////////////////////
          // semaphore handling //
          ////////////////////////
          if ( e.getType() === "acquireSemaphoreResult" )
          {
            if ( e.body.isSemaphoreOwner )
            {
              thiz._ownedSemaphores[e.body.resourceId] = thiz._acquiredSemaphores[e.body.resourceId] ;
              delete thiz._acquiredSemaphores[e.body.resourceId] ;
              ctx = thiz._ownedSemaphores[e.body.resourceId] ;
              ctx.callback.call ( thiz, null, e ) ;
            }
            continue ;
          }
          if ( e.getType() === "releaseSemaphoreResult" )
          {
            continue ;
          }
        }
        else
        {
          var callbackList = thiz._eventListenerFunctions.get ( e.getName() ) ;
          if ( ! callbackList )
          {
            thiz._error ( "callbackList for " + e.getName() + " not found." ) ;
            thiz._error ( e ) ;
          }
          for  ( j = 0 ; j < callbackList.length ; j++ )
          {
            if ( e.isResultRequested() )
            {
              e._Client = thiz ;
              callbackList[j].call ( thiz, e ) ;
              break ;
            }
            else
            {
              callbackList[j].call ( thiz, e ) ;
            }
          }
        }
      }
    }
  } ;
  /**
   * Description
   */
  this._socket.onopen = function()
  {
    console.log("WebSocket opened for url: " + thiz._url ) ;
    var wasReconnecting
    if ( thiz._isReconnecting )
    {
      thiz._isReconnecting = false ;
      console.log ( "re-connect in progress." ) ;
      thiz._emit ( null, "reconnect" ) ;
    }
    thiz._isReconnecting = false ;
    if ( thiz.intervalId )
    {
      clearInterval ( thiz.intervalId ) ;
      thiz.intervalId = null ;
    }
    var einfo = new gepard.Event ( "system", "client_info" ) ;
    einfo.body.userAgent = navigator.userAgent ;
    einfo.body.connectionTime = new Date() ;
    einfo.body.domain = typeof document === 'object' ? document.domain : "" ;
    thiz._socket.send ( einfo.serialize() ) ;

    thiz._emit ( null, "open" ) ;
    thiz._emit ( null, "connect" ) ;

    var i ;
    if ( thiz._pendingEventList.length )
    {
      var uid = thiz._createUniqueEventId() ;
      for ( i = 0 ; i < thiz._pendingEventList.length ; i++ )
      {
        var ctx = thiz._pendingEventList[i] ;
        var e = ctx.e ;
        var resultCallback = ctx.resultCallback ;
        e.setWebIdentifier ( uid ) ;
        thiz._callbacks[uid] = ctx ;
        ctx.e = undefined ;
        thiz._socket.send ( e.serialize() ) ;
      }
      thiz._pendingEventList.length = 0 ;
    }
    if ( thiz._pendingEventListenerList.length )
    {
      for ( i = 0 ; i < thiz._pendingEventListenerList.length ; i++ )
      {
        var ctx = thiz._pendingEventListenerList[i] ;
        var e = ctx.e ;
        e.setWebIdentifier ( uid ) ;
        thiz._socket.send ( e.serialize() ) ;
      }
      thiz._pendingEventListenerList.length = 0 ;
    }
    if ( thiz._pendingLockList.length )
    {
      for ( i = 0 ; i < thiz._pendingLockList.length ; i++ )
      {
        var uid = thiz._createUniqueEventId() ;
        var ctx = thiz._pendingLockList[i] ;
        ctx.e.setUniqueId ( uid ) ;
        thiz._socket.send ( ctx.e.serialize() ) ;
        thiz._acquiredResources[ctx.e.body.resourceId] = ctx;
      }
      thiz._pendingLockList.length = 0 ;
    }
    if ( thiz._pendingAcquireSemaphoreList.length )
    {
      for ( i = 0 ; i < thiz._pendingAcquireSemaphoreList.length ; i++ )
      {
        var uid = thiz._createUniqueEventId() ;
        var ctx = thiz._pendingAcquireSemaphoreList[i] ;
        ctx.e.setUniqueId ( uid ) ;
        thiz._socket.send ( ctx.e.serialize() ) ;
        thiz._acquiredSemaphores[ctx.e.body.resourceId] = ctx;
      }
      thiz._pendingAcquireSemaphoreList.length = 0 ;
    }
    console.log ( "Connection opened." ) ;
  };
};
/**
 * Description
 * @return MemberExpression
 */
gepard.WebClient.prototype.getSocket = function()
{
  if ( ! this._socket )
  {
    this._connect() ;
  }
  return this._socket ;
};
/**
 * Description
 * @method emit
 * @param {} params
 * @param {} callback
 * @return 
 */
gepard.WebClient.prototype.emit = function ( params, callback )
{
  this._fireEvent ( params, callback, null ) ;
};
/**
 * Description
 * @method fire
 * @param {} params
 * @param {} callback
 * @return 
 */
gepard.WebClient.prototype.fire = function ( params, callback )
{
  this._fireEvent ( params, callback, null ) ;
};
/**
 * Description
 * @method request
 * @param {} params
 * @param {} callback
 * @return 
 */
gepard.WebClient.prototype.request = function ( params, callback )
{
  if ( typeof params === 'string' )
  {
    params = { name: params } ;
  }
  if ( typeof callback === 'function' )
  {
    callback = { result: callback } ;
  }
  if ( typeof callback.result !== 'function' )
  {
    throw new Error ( "Missing result function.")
  }
  this._fireEvent ( params, callback, { isBroadcast:false } ) ;
};
/**
 * Description
 * @method fireEvent
 * @param {} params
 * @param {} callback
 * @return 
 */
gepard.WebClient.prototype.fireEvent = function ( params, callback )
{
  return this._fireEvent ( params, callback, null ) ;
};
/**
 */
gepard.WebClient.prototype._fireEvent = function ( params, callback, opts )
{
  var e = null, user ;
  if ( params instanceof gepard.Event )
  {
    e = params ;
  }
  else
  if ( typeof params === 'string' )
  {
    e = new gepard.Event ( params ) ;
  }
  else
  if ( params && typeof params === 'object' )
  {
    e = new gepard.Event ( params.name, params.type ) ;
    e.setBody ( params.body ) ;
    e.setUser ( params.user ) ;
  }
  if ( ! e.getUser() ) e.setUser ( this.user )

  var ctx = {} ;
  if ( callback )
  {
    if ( typeof callback === 'object' )
    {
      ctx.result = callback.result ;
      if ( ctx.result ) e.setResultRequested() ;
      ctx.error = callback.error ;
      ctx.write = callback.write ;
    }
    else
    if ( typeof callback === 'function' )
    {
      ctx.write = callback ;
    }
  }
  if ( ! this._socket )
  {
    ctx.e = e ;
    this._pendingEventList.push ( ctx ) ;
  }
  var s = this.getSocket() ;
  if ( ! this._pendingEventList.length )
  {
    var uid = this._createUniqueEventId() ;
    e.setWebIdentifier ( uid ) ;
    this._callbacks[uid] = ctx ;
    var thiz = this ;
    s.send ( e.serialize() ) ;
  }
};
/**
 * Description
 * @param {} eventNameList
 * @param {} callback
 */
gepard.WebClient.prototype.on = function ( eventNameList, callback )
{
  if ( typeof eventNameList === 'string' )
  {
    if (  eventNameList === "open"
       || eventNameList === "close"
       || eventNameList === "error"
       || eventNameList === "shutdown"
       || eventNameList === "end"
       || eventNameList === "reconnect"
       // || eventNameList === "disconnect"
       )
    {
      this._onCallbackFunctions.put ( eventNameList, callback ) ;
      return ;
    }
  }
  this.addEventListener ( eventNameList, callback ) ;
};
/**
 * Description
 * @param {} eventNameList
 * @param {} callback
 */
gepard.WebClient.prototype.addEventListener = function ( eventNameList, callback )
{
  if ( ! eventNameList ) throw new Error ( "Client.addEventListener: Missing eventNameList." ) ;
  if ( typeof callback !== 'function' ) throw new Error ( "Client.addEventListener: callback must be a function." ) ;
  if ( typeof eventNameList === 'string' ) eventNameList = [ eventNameList ] ;
  if ( ! Array.isArray ( eventNameList ) )
  {
    throw new Error ( "Client.addEventListener: eventNameList must be a string or an array of strings." ) ;
  }
  if ( ! eventNameList.length )
  {
    throw new Error ( "Client.addEventListener: eventNameList must not be empty." ) ;
  }
  var e = new gepard.Event ( "system", "addEventListener" ) ;
  if ( this._user )
  {
    e.setUser ( this._user ) ;
  }
  e.body.eventNameList = eventNameList ;
  var i ;
  for ( i = 0 ; i < eventNameList.length ; i++ )
  {
    this._eventListenerFunctions.put ( eventNameList[i], callback ) ;
  }
  if ( ! this._socket )
  {
    this._pendingEventListenerList.push ( { e:e, callback:callback } ) ; // TODO: callback ??
  }
  else
  if ( this._pendingEventListenerList.length )
  {
    this._pendingEventListenerList.push ( { e:e, callback:callback } ) ;
  }
  var s = this.getSocket() ;
  if ( ! this._pendingEventListenerList.length )
  {
    var uid = this._createUniqueEventId() ;
    e.setUniqueId ( uid ) ;
    e.setWebIdentifier ( uid ) ;
    s.send ( e.serialize() ) ;
  }
};
/**
 * Description
 * @param {} eventNameOrFunction
 */
gepard.WebClient.prototype.removeEventListener = function ( eventNameOrFunction )
{
  var i ;
  if ( typeof eventNameOrFunction === 'string' )
  {
    eventNameOrFunction = [ eventNameOrFunction ] ;
  }
  else
  if ( typeof eventNameOrFunction === 'function' )
  {
    eventNameOrFunction = [ eventNameOrFunction ] ;
  }
  else
  if ( Array.isArray ( eventNameOrFunction ) )
  {
  }
  else
  {
    throw new Error ( "Client.removeEventListener: eventNameOrFunction must be a function, a string or an array of strings." ) ;
  }

  var eventNameList = [] ;
  for ( i = 0 ; i < eventNameOrFunction.length  ; i++ )
  {
    var item = eventNameOrFunction[i] ;
    if ( typeof item === 'string' )
    {
      eventNameList.push ( item ) ;
      this._eventListenerFunctions.remove ( item ) ;
    }
    else
    if ( typeof item === 'function' )
    {
      var keys = this._eventListenerFunctions.getKeysOf ( item ) ;
      for ( i = 0 ; i < keys.length ; i++ )
      {
        eventNameList.push ( keys[i] ) ;
      }
      this._eventListenerFunctions.remove ( item ) ;
    }
    if ( ! eventNameList.length ) return ;
    var e = new gepard.Event ( "system", "removeEventListener" ) ;
    e.setUser ( this._user ) ;
    e.body.eventNameList = eventNameList ;
    var s = this.getSocket() ;
    s.send ( e.serialize() ) ;
  }
};
/**
 * Description
 * @param {} str
 * @return list
 */
gepard.WebClient.prototype._splitJSONObjects = function ( str )
{
  var list = [] ;
  var pcounter = 1 ;
  var q = "" ;
  var i0 = 0 ;
  var i = 1 ;
  for ( i = 1 ; i < str.length ; i++ )
  {
    var c = str.charAt ( i ) ;
    if ( c === '"' || c === "'" )
    {
      q = c ;
      for ( var j = i+1 ; j < str.length ; j++ )
      {
        c = str.charAt ( j ) ;
        if ( c === q )
        {
          if ( str.charAt  ( j - 1 ) === '\\' )
          {
            continue ;
          }
          i = j ;
          break ;
        }
      }
    }
    if ( c === '{' )
    {
      pcounter++ ;
      continue ;
    }
    if ( c === '}' )
    {
      pcounter-- ;
      if ( pcounter === 0 )
      {
        list.push ( str.substring ( i0, i + 1 ) ) ;
        i0 = i + 1 ;
        for ( ; i0 < str.length ; i0++ )
        {
          if ( str.charAt ( i0 ) === '{' )
          {
            i = i0 - 1 ;
            break ;
          }
        }
      }
      continue ;
    }
  }
  if ( i0 < str.length )
  {
    list.push ( str.substring ( i0 ) ) ;
  }
	return { list: list, lastLineIsPartial: pcounter ? true : false } ;
};
////////////////////////////////////////////////////////////////////////////////
/// Unification                                                               //
////////////////////////////////////////////////////////////////////////////////
/**
 * Description
 * @param {} message
 */
gepard.WebClient.prototype.sendResult = function ( message )
{
  if ( ! message.isResultRequested() )
  {
    this._error ( "No result requested" ) ;
    this._error ( message ) ;
    return ;
  }
  message.setIsResult() ;
  this.send ( message ) ;
};
/**
 * Description
 * @param {} message
 */
gepard.WebClient.prototype.send = function ( event )
{
  this.getSocket().send ( event.serialize() ) ;
};
/**
 * Description
 * @param {} what
 */
gepard.WebClient.prototype._error = function ( what )
{
  console.log ( what ) ;
};
/**
 * Description
 * @method lockResource
 * @param {} resourceId
 * @param {} callback
 * @return 
 */
gepard.WebClient.prototype._lockResource = function ( resourceId, callback )
{
  if ( typeof resourceId !== 'string' || ! resourceId )
  {
    this._error ( "Client.lockResource: resourceId must be a string." ) ;
    return ;
  }
  if ( typeof callback !== 'function' )
  {
    this._error ( "Client.lockResource: callback must be a function." ) ;
    return ;
  }
  if ( this._ownedResources[resourceId] || this._acquiredResources[resourceId] )
  {
    this._error ( "Client.lockResource: already owner of resourceId=" + resourceId ) ;
    return ;
  }

  var e = new gepard.Event ( "system", "lockResourceRequest" ) ;
  e.body.resourceId = resourceId ;
  var ctx = {} ;
  ctx.resourceId = resourceId ;
  ctx.callback = callback ;
  ctx.e = e ;
  if ( ! this._socket || this._pendingLockList.length )
  {
    this._pendingLockList.push ( ctx ) ;
  }
  var s = this.getSocket() ;
  if ( ! this._pendingLockList.length )
  {
    e.setUniqueId ( this._createUniqueEventId() ) ;
    this._acquiredResources[resourceId] = ctx;
    this.send ( e ) ;
  }
};
/**
 * Description
 * @method unlockResource
 * @param {} resourceId
 * @return 
 */
gepard.WebClient.prototype._unlockResource = function ( resourceId )
{
  if ( typeof resourceId !== 'string' || ! resourceId )
  {
    this._error ( "Client.unlockResource: resourceId must be a string." ) ;
    return ;
  }
  delete this._acquiredResources[resourceId] ;
  if ( ! this._ownedResources[resourceId] )
  {
    this._error ( "Client.unlockResource: not owner of resourceId=" + resourceId ) ;
    return ;
  }

  var e = new gepard.Event ( "system", "unlockResourceRequest" ) ;
  e.body.resourceId = resourceId ;
  var s = this.getSocket() ;
  e.setUniqueId ( this._createUniqueEventId() ) ;
  delete this._ownedResources[resourceId] ;
  this.send ( e ) ;
};
/**
 * Description
 * @method acquireSemaphore
 * @param {} resourceId
 * @param {} callback
 * @return 
 */
gepard.WebClient.prototype._acquireSemaphore = function ( resourceId, callback )
{
  if ( typeof resourceId !== 'string' || ! resourceId )
  {
    this._error ( "Client.acquireSemaphore: resourceId must be a string." ) ;
    return ;
  }
  if ( typeof callback !== 'function' )
  {
    this._error ( "Client.acquireSemaphore: callback must be a function." ) ;
    return ;
  }
  if ( this._acquiredSemaphores[resourceId] )
  {
    this._error ( "Client.acquireSemaphore: already waiting for resourceId=" + resourceId ) ;
    return ;
  }
  if ( this._ownedSemaphores[resourceId] )
  {
    this._error ( "Client.acquireSemaphore: already owner of resourceId=" + resourceId ) ;
    return ;
  }

  var e = new gepard.Event ( "system", "acquireSemaphoreRequest" ) ;
  e.body.resourceId = resourceId ;
  var ctx = {} ;
  ctx.resourceId = resourceId ;
  ctx.callback = callback ;
  ctx.e = e ;

  if ( ! this._socket || this._pendingAcquireSemaphoreList.length )
  {
    this._pendingAcquireSemaphoreList.push ( ctx ) ;
  }
  var s = this.getSocket() ;
  if ( ! this._pendingAcquireSemaphoreList.length )
  {
    e.setUniqueId ( this._createUniqueEventId() ) ;
    this._acquiredSemaphores[resourceId] = ctx;
    this.send ( e ) ;
  }
};
/**
 * Description
 * @method releaseSemaphore
 * @param {} resourceId
 * @return 
 */
gepard.WebClient.prototype._releaseSemaphore = function ( resourceId )
{
  if ( typeof resourceId !== 'string' || ! resourceId )
  {
    this._error ( "Client.releaseSemaphore: resourceId must be a string." ) ;
    return ;
  }
  delete this._acquiredSemaphores[resourceId] ;
  var e = new gepard.Event ( "system", "releaseSemaphoreRequest" ) ;
  e.body.resourceId = resourceId ;
  var s = this.getSocket() ;
  e.setUniqueId ( this._createUniqueEventId() ) ;
  delete this._ownedSemaphores[resourceId] ;
  this.send ( e ) ;
};
gepard.WebClient.prototype._releaseAllSemaphores = function()
{
  for ( var key in this._ownedSemaphores )
  {
    this.releaseSemaphore ( this._ownedSemaphores[key] ) ;
  }
  this.releaseSemaphore = {} ;
};
gepard.WebClient.prototype.getSemaphore = function ( resourceId )
{
  return new gepard.Semaphore ( this, resourceId ) ;
};
gepard.WebClient.prototype.getLock = function ( resourceId )
{
  return new gepard.Lock ( this, resourceId ) ;
};
/**
 * Description
 * @constructor
 * @return 
 */
gepard.Semaphore = function ( client, resourceId )
{
  this.className         = "Semaphore" ;
  this._resourceId       = resourceId ;
  this._isSemaphoreOwner = false ;
  if ( typeof client === 'string' )
  {
    this._resourceId = client ;
    this._client     = gepard.getWebClient() ;
  }
  else
  {
    this._client = client ;
  }
};

/**
 * Description
 * @method toString
 * @return string
 */
gepard.Semaphore.prototype.toString = function()
{
  return "(" + this.className + ")[resourceId=" + this._resourceId + ",isOwner=" + this._isSemaphoreOwner + "]" ;
};
/**
 * Description
 * @method acquire
 * @param {} resourceId
 * @param {} callback
 * @return 
 */
gepard.Semaphore.prototype.acquire = function ( callback )
{
  this._callback = callback ;
  this._client._acquireSemaphore ( this._resourceId, this._acquireSemaphoreCallback.bind ( this ) ) ;
};
gepard.Semaphore.prototype._acquireSemaphoreCallback = function ( err, e )
{
  if ( ! err )
  {
    this._acquireSemaphoreResult = e ;
    this._isSemaphoreOwner = e.body.isSemaphoreOwner ;
  }
  this._callback.call ( this, err ) ;
};
/**
 * Description
 * @method isOwner
 * @return MemberExpression
 */
gepard.Semaphore.prototype.isOwner = function()
{
  return this._isSemaphoreOwner ;
};
/**
 * Description
 * @method release
 * @return 
 */
gepard.Semaphore.prototype.release = function()
{
  this._isSemaphoreOwner = false ;
  this._client._releaseSemaphore ( this._resourceId ) ;
};
/**
 * Description
 * @constructor
 * @param {string} resourceId
 * @return 
 */
gepard.Lock = function ( client, resourceId )
{
  this.className = "Lock" ;
  this._resourceId = resourceId ;
  this._isLockOwner = false ;
  if ( typeof client === 'string' )
  {
    this._resourceId = client ;
    this._client = gepard.getWebClient() ;
  }
  else
  {
    this._client = client ;
  }
};
/**
 * Description
 * @method toString
 * @return string
 */
gepard.Lock.prototype.toString = function()
{
  return "(" + this.className + ")[resourceId=" + this._resourceId + ",isOwner=" + this._isLockOwner + "]" ;
};

/**
 * Description
 * @method acquire
 * @param {} resourceId
 * @param {} callback
 * @return 
 */
gepard.Lock.prototype.acquire = function ( callback )
{
  this._callback = callback ;
  this._client._lockResource ( this._resourceId, this._lockResourceCallback.bind ( this ) ) ;
};
gepard.Lock.prototype._lockResourceCallback = function ( err, e )
{
  this._lockResourceResult = e ;
  this._isLockOwner = e.body.isLockOwner ;
  this._callback.call ( this, err ) ;
};
/**
 * Description
 * @method isOwner
 * @return MemberExpression
 */
gepard.Lock.prototype.isOwner = function()
{
  return this._isLockOwner ;
};
/**
 * Description
 * @method release
 * @return 
 */
gepard.Lock.prototype.release = function()
{
  if ( ! this._isLockOwner )
  {
    return ;
  }
  this._isLockOwner = false ;
  this._client._unlockResource ( this._resourceId ) ;
};
if ( typeof module === 'undefined' ) module = {} ;
module.exports = gepard ;

