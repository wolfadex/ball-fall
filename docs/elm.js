(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.eE.cm === region.e6.cm)
	{
		return 'on line ' + region.eE.cm;
	}
	return 'on lines ' + region.eE.cm + ' through ' + region.e6.cm;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (Object.prototype.hasOwnProperty.call(value, key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	var unwrapped = _Json_unwrap(value);
	if (!(key === 'toJSON' && typeof unwrapped === 'function'))
	{
		object[key] = unwrapped;
	}
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.hH,
		impl.ij,
		impl.ic,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (
		(typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		||
		(Array.isArray(_Json_unwrap(value)) && _VirtualDom_RE_js_html.test(String(_Json_unwrap(value))))
	)
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		be: func(record.be),
		eF: record.eF,
		es: record.es
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.be;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.eF;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.es) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.hH,
		impl.ij,
		impl.ic,
		function(sendToApp, initialModel) {
			var view = impl.ip;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.hH,
		impl.ij,
		impl.ic,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.ez && impl.ez(sendToApp)
			var view = impl.ip;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.dM);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.ig) && (_VirtualDom_doc.title = title = doc.ig);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.hY;
	var onUrlRequest = impl.hZ;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		ez: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.gw === next.gw
							&& curr.fv === next.fv
							&& curr.gr.a === next.gr.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		hH: function(flags)
		{
			return A3(impl.hH, flags, _Browser_getUrl(), key);
		},
		ip: impl.ip,
		ij: impl.ij,
		ic: impl.ic
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hE: 'hidden', g9: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hE: 'mozHidden', g9: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hE: 'msHidden', g9: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hE: 'webkitHidden', g9: 'webkitvisibilitychange' }
		: { hE: 'hidden', g9: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		gC: _Browser_getScene(),
		gT: {
			n: _Browser_window.pageXOffset,
			o: _Browser_window.pageYOffset,
			bD: _Browser_doc.documentElement.clientWidth,
			bs: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		bD: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bs: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			gC: {
				bD: node.scrollWidth,
				bs: node.scrollHeight
			},
			gT: {
				n: node.scrollLeft,
				o: node.scrollTop,
				bD: node.clientWidth,
				bs: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			gC: _Browser_getScene(),
			gT: {
				n: x,
				o: y,
				bD: _Browser_doc.documentElement.clientWidth,
				bs: _Browser_doc.documentElement.clientHeight
			},
			hl: {
				n: x + rect.left,
				o: y + rect.top,
				bD: rect.width,
				bs: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.dT.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.dT.b, xhr)); });
		$elm$core$Maybe$isJust(request.gO) && _Http_track(router, xhr, request.gO.a);

		try {
			xhr.open(request.hQ, request.ik, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.ik));
		}

		_Http_configureRequest(xhr, request);

		request.dM.a && xhr.setRequestHeader('Content-Type', request.dM.a);
		xhr.send(request.dM.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.hC; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.$8.a || 0;
	xhr.responseType = request.dT.d;
	xhr.withCredentials = request.g$;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		ik: xhr.responseURL,
		h9: xhr.status,
		ia: xhr.statusText,
		hC: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			h5: event.loaded,
			gF: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			h2: event.loaded,
			gF: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { n: a[0], o: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.n, r.o]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { n: a[0], o: a[1], p: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.n, r.o, r.p]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { n: a[0], o: a[1], p: a[2], gU: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.n, r.o, r.p, r.gU]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.fN;
    m[1] = r.fR;
    m[2] = r.fV;
    m[3] = r.fZ;
    m[4] = r.fO;
    m[5] = r.fS;
    m[6] = r.fW;
    m[7] = r.f_;
    m[8] = r.fP;
    m[9] = r.fT;
    m[10] = r.fX;
    m[11] = r.f$;
    m[12] = r.fQ;
    m[13] = r.fU;
    m[14] = r.fY;
    m[15] = r.f0;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        fN: m[0], fR: m[1], fV: m[2], fZ: m[3],
        fO: m[4], fS: m[5], fW: m[6], f_: m[7],
        fP: m[8], fT: m[9], fX: m[10], f$: m[11],
        fQ: m[12], fU: m[13], fY: m[14], f0: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


// eslint-disable-next-line no-unused-vars
var _Texture_load = F6(function (magnify, mininify, horizontalWrap, verticalWrap, flipY, url) {
  var isMipmap = mininify !== 9728 && mininify !== 9729;
  return _Scheduler_binding(function (callback) {
    var img = new Image();
    function createTexture(gl) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magnify);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mininify);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, horizontalWrap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, verticalWrap);
      if (isMipmap) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
      gl.bindTexture(gl.TEXTURE_2D, null);
      return texture;
    }
    img.onload = function () {
      var width = img.width;
      var height = img.height;
      var widthPowerOfTwo = (width & (width - 1)) === 0;
      var heightPowerOfTwo = (height & (height - 1)) === 0;
      var isSizeValid = (widthPowerOfTwo && heightPowerOfTwo) || (
        !isMipmap
        && horizontalWrap === 33071 // clamp to edge
        && verticalWrap === 33071
      );
      if (isSizeValid) {
        callback(_Scheduler_succeed({
          $: 0,
          hd: createTexture,
          a: width,
          b: height
        }));
      } else {
        callback(_Scheduler_fail(A2(
          $elm_explorations$webgl$WebGL$Texture$SizeError,
          width,
          height
        )));
      }
    };
    img.onerror = function () {
      callback(_Scheduler_fail($elm_explorations$webgl$WebGL$Texture$LoadError));
    };
    if (url.slice(0, 5) !== 'data:') {
      img.crossOrigin = 'Anonymous';
    }
    img.src = url;
  });
});

// eslint-disable-next-line no-unused-vars
var _Texture_size = function (texture) {
  return _Utils_Tuple2(texture.a, texture.b);
};


var _WebGL_guid = 0;

function _WebGL_listEach(fn, list) {
  for (; list.b; list = list.b) {
    fn(list.a);
  }
}

function _WebGL_listLength(list) {
  var length = 0;
  for (; list.b; list = list.b) {
    length++;
  }
  return length;
}

var _WebGL_rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  function (cb) { setTimeout(cb, 1000 / 60); };

// eslint-disable-next-line no-unused-vars
var _WebGL_entity = F5(function (settings, vert, frag, mesh, uniforms) {
  return {
    $: 0,
    a: settings,
    b: vert,
    c: frag,
    d: mesh,
    e: uniforms
  };
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableBlend = F2(function (cache, setting) {
  var blend = cache.blend;
  blend.toggle = cache.toggle;

  if (!blend.enabled) {
    cache.gl.enable(cache.gl.BLEND);
    blend.enabled = true;
  }

  // a   b   c   d   e   f   g h i j
  // eq1 f11 f12 eq2 f21 f22 r g b a
  if (blend.a !== setting.a || blend.d !== setting.d) {
    cache.gl.blendEquationSeparate(setting.a, setting.d);
    blend.a = setting.a;
    blend.d = setting.d;
  }
  if (blend.b !== setting.b || blend.c !== setting.c || blend.e !== setting.e || blend.f !== setting.f) {
    cache.gl.blendFuncSeparate(setting.b, setting.c, setting.e, setting.f);
    blend.b = setting.b;
    blend.c = setting.c;
    blend.e = setting.e;
    blend.f = setting.f;
  }
  if (blend.g !== setting.g || blend.h !== setting.h || blend.i !== setting.i || blend.j !== setting.j) {
    cache.gl.blendColor(setting.g, setting.h, setting.i, setting.j);
    blend.g = setting.g;
    blend.h = setting.h;
    blend.i = setting.i;
    blend.j = setting.j;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepthTest = F2(function (cache, setting) {
  var depthTest = cache.depthTest;
  depthTest.toggle = cache.toggle;

  if (!depthTest.enabled) {
    cache.gl.enable(cache.gl.DEPTH_TEST);
    depthTest.enabled = true;
  }

  // a    b    c    d
  // func mask near far
  if (depthTest.a !== setting.a) {
    cache.gl.depthFunc(setting.a);
    depthTest.a = setting.a;
  }
  if (depthTest.b !== setting.b) {
    cache.gl.depthMask(setting.b);
    depthTest.b = setting.b;
  }
  if (depthTest.c !== setting.c || depthTest.d !== setting.d) {
    cache.gl.depthRange(setting.c, setting.d);
    depthTest.c = setting.c;
    depthTest.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencilTest = F2(function (cache, setting) {
  var stencilTest = cache.stencilTest;
  stencilTest.toggle = cache.toggle;

  if (!stencilTest.enabled) {
    cache.gl.enable(cache.gl.STENCIL_TEST);
    stencilTest.enabled = true;
  }

  // a   b    c         d     e     f      g      h     i     j      k
  // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
  if (stencilTest.d !== setting.d || stencilTest.a !== setting.a || stencilTest.b !== setting.b) {
    cache.gl.stencilFuncSeparate(cache.gl.FRONT, setting.d, setting.a, setting.b);
    stencilTest.d = setting.d;
    // a and b are set in the cache.gl.BACK diffing because they should be the same
  }
  if (stencilTest.e !== setting.e || stencilTest.f !== setting.f || stencilTest.g !== setting.g) {
    cache.gl.stencilOpSeparate(cache.gl.FRONT, setting.e, setting.f, setting.g);
    stencilTest.e = setting.e;
    stencilTest.f = setting.f;
    stencilTest.g = setting.g;
  }
  if (stencilTest.c !== setting.c) {
    cache.gl.stencilMask(setting.c);
    stencilTest.c = setting.c;
  }
  if (stencilTest.h !== setting.h || stencilTest.a !== setting.a || stencilTest.b !== setting.b) {
    cache.gl.stencilFuncSeparate(cache.gl.BACK, setting.h, setting.a, setting.b);
    stencilTest.h = setting.h;
    stencilTest.a = setting.a;
    stencilTest.b = setting.b;
  }
  if (stencilTest.i !== setting.i || stencilTest.j !== setting.j || stencilTest.k !== setting.k) {
    cache.gl.stencilOpSeparate(cache.gl.BACK, setting.i, setting.j, setting.k);
    stencilTest.i = setting.i;
    stencilTest.j = setting.j;
    stencilTest.k = setting.k;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableScissor = F2(function (cache, setting) {
  var scissor = cache.scissor;
  scissor.toggle = cache.toggle;

  if (!scissor.enabled) {
    cache.gl.enable(cache.gl.SCISSOR_TEST);
    scissor.enabled = true;
  }

  if (scissor.a !== setting.a || scissor.b !== setting.b || scissor.c !== setting.c || scissor.d !== setting.d) {
    cache.gl.scissor(setting.a, setting.b, setting.c, setting.d);
    scissor.a = setting.a;
    scissor.b = setting.b;
    scissor.c = setting.c;
    scissor.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableColorMask = F2(function (cache, setting) {
  var colorMask = cache.colorMask;
  colorMask.toggle = cache.toggle;
  colorMask.enabled = true;

  if (colorMask.a !== setting.a || colorMask.b !== setting.b || colorMask.c !== setting.c || colorMask.d !== setting.d) {
    cache.gl.colorMask(setting.a, setting.b, setting.c, setting.d);
    colorMask.a = setting.a;
    colorMask.b = setting.b;
    colorMask.c = setting.c;
    colorMask.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableCullFace = F2(function (cache, setting) {
  var cullFace = cache.cullFace;
  cullFace.toggle = cache.toggle;

  if (!cullFace.enabled) {
    cache.gl.enable(cache.gl.CULL_FACE);
    cullFace.enabled = true;
  }

  if (cullFace.a !== setting.a) {
    cache.gl.cullFace(setting.a);
    cullFace.a = setting.a;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePolygonOffset = F2(function (cache, setting) {
  var polygonOffset = cache.polygonOffset;
  polygonOffset.toggle = cache.toggle;

  if (!polygonOffset.enabled) {
    cache.gl.enable(cache.gl.POLYGON_OFFSET_FILL);
    polygonOffset.enabled = true;
  }

  if (polygonOffset.a !== setting.a || polygonOffset.b !== setting.b) {
    cache.gl.polygonOffset(setting.a, setting.b);
    polygonOffset.a = setting.a;
    polygonOffset.b = setting.b;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleCoverage = F2(function (cache, setting) {
  var sampleCoverage = cache.sampleCoverage;
  sampleCoverage.toggle = cache.toggle;

  if (!sampleCoverage.enabled) {
    cache.gl.enable(cache.gl.SAMPLE_COVERAGE);
    sampleCoverage.enabled = true;
  }

  if (sampleCoverage.a !== setting.a || sampleCoverage.b !== setting.b) {
    cache.gl.sampleCoverage(setting.a, setting.b);
    sampleCoverage.a = setting.a;
    sampleCoverage.b = setting.b;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleAlphaToCoverage = function (cache) {
  var sampleAlphaToCoverage = cache.sampleAlphaToCoverage;
  sampleAlphaToCoverage.toggle = cache.toggle;

  if (!sampleAlphaToCoverage.enabled) {
    cache.gl.enable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
    sampleAlphaToCoverage.enabled = true;
  }
};

var _WebGL_disableBlend = function (cache) {
  if (cache.blend.enabled) {
    cache.gl.disable(cache.gl.BLEND);
    cache.blend.enabled = false;
  }
};

var _WebGL_disableDepthTest = function (cache) {
  if (cache.depthTest.enabled) {
    cache.gl.disable(cache.gl.DEPTH_TEST);
    cache.depthTest.enabled = false;
  }
};

var _WebGL_disableStencilTest = function (cache) {
  if (cache.stencilTest.enabled) {
    cache.gl.disable(cache.gl.STENCIL_TEST);
    cache.stencilTest.enabled = false;
  }
};

var _WebGL_disableScissor = function (cache) {
  if (cache.scissor.enabled) {
    cache.gl.disable(cache.gl.SCISSOR_TEST);
    cache.scissor.enabled = false;
  }
};

var _WebGL_disableColorMask = function (cache) {
  var colorMask = cache.colorMask;
  if (!colorMask.a || !colorMask.b || !colorMask.c || !colorMask.d) {
    cache.gl.colorMask(true, true, true, true);
    colorMask.a = true;
    colorMask.b = true;
    colorMask.c = true;
    colorMask.d = true;
  }
};

var _WebGL_disableCullFace = function (cache) {
  cache.gl.disable(cache.gl.CULL_FACE);
};

var _WebGL_disablePolygonOffset = function (cache) {
  cache.gl.disable(cache.gl.POLYGON_OFFSET_FILL);
};

var _WebGL_disableSampleCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_COVERAGE);
};

var _WebGL_disableSampleAlphaToCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
};

var _WebGL_settings = ['blend', 'depthTest', 'stencilTest', 'scissor', 'colorMask', 'cullFace', 'polygonOffset', 'sampleCoverage', 'sampleAlphaToCoverage'];
var _WebGL_disableFunctions = [_WebGL_disableBlend, _WebGL_disableDepthTest, _WebGL_disableStencilTest, _WebGL_disableScissor, _WebGL_disableColorMask, _WebGL_disableCullFace, _WebGL_disablePolygonOffset, _WebGL_disableSampleCoverage, _WebGL_disableSampleAlphaToCoverage];

function _WebGL_doCompile(gl, src, type) {
  var shader = gl.createShader(type);
  // Enable OES_standard_derivatives extension
  gl.shaderSource(shader, '#extension GL_OES_standard_derivatives : enable\n' + src);
  gl.compileShader(shader);
  return shader;
}

function _WebGL_doLink(gl, vshader, fshader) {
  var program = gl.createProgram();

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw ('Link failed: ' + gl.getProgramInfoLog(program) +
      '\nvs info-log: ' + gl.getShaderInfoLog(vshader) +
      '\nfs info-log: ' + gl.getShaderInfoLog(fshader));
  }

  return program;
}

function _WebGL_getAttributeInfo(gl, type) {
  switch (type) {
    case gl.FLOAT:
      return { size: 1, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC2:
      return { size: 2, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC3:
      return { size: 3, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC4:
      return { size: 4, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_MAT4:
      return { size: 4, arraySize: 4, type: Float32Array, baseType: gl.FLOAT };
    case gl.INT:
      return { size: 1, arraySize: 1, type: Int32Array, baseType: gl.INT };
  }
}

/**
 *  Form the buffer for a given attribute.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {WebGLActiveInfo} attribute the attribute to bind to.
 *         We use its name to grab the record by name and also to know
 *         how many elements we need to grab.
 *  @param {Mesh} mesh The mesh coming in from Elm.
 *  @param {Object} attributes The mapping between the attribute names and Elm fields
 *  @return {WebGLBuffer}
 */
function _WebGL_doBindAttribute(gl, attribute, mesh, attributes) {
  // The length of the number of vertices that
  // complete one 'thing' based on the drawing mode.
  // ie, 2 for Lines, 3 for Triangles, etc.
  var elemSize = mesh.a.e5;

  var idxKeys = [];
  for (var i = 0; i < elemSize; i++) {
    idxKeys.push(String.fromCharCode(97 + i));
  }

  function dataFill(data, cnt, fillOffset, elem, key) {
    var i;
    if (elemSize === 1) {
      for (i = 0; i < cnt; i++) {
        data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
      }
    } else {
      idxKeys.forEach(function (idx) {
        for (i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
        }
      });
    }
  }

  var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

  if (attributeInfo === undefined) {
    throw new Error('No info available for: ' + attribute.type);
  }

  var dataIdx = 0;
  var dataOffset = attributeInfo.size * attributeInfo.arraySize * elemSize;
  var array = new attributeInfo.type(_WebGL_listLength(mesh.b) * dataOffset);

  _WebGL_listEach(function (elem) {
    dataFill(array, attributeInfo.size * attributeInfo.arraySize, dataIdx, elem, attributes[attribute.name] || attribute.name);
    dataIdx += dataOffset;
  }, mesh.b);

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
}

/**
 *  This sets up the binding caching buffers.
 *
 *  We don't actually bind any buffers now except for the indices buffer.
 *  The problem with filling the buffers here is that it is possible to
 *  have a buffer shared between two webgl shaders;
 *  which could have different active attributes. If we bind it here against
 *  a particular program, we might not bind them all. That final bind is now
 *  done right before drawing.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {Mesh} mesh a mesh object from Elm
 *  @return {Object} buffer - an object with the following properties
 *  @return {Number} buffer.numIndices
 *  @return {WebGLBuffer|null} buffer.indexBuffer - optional index buffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  if (mesh.a.fx > 0) {
    var indexBuffer = gl.createBuffer();
    var indices = _WebGL_makeIndexedBuffer(mesh.c, mesh.a.fx);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  } else {
    return {
      numIndices: mesh.a.e5 * _WebGL_listLength(mesh.b),
      indexBuffer: null,
      buffers: {}
    };
  }
}

/**
 *  Create an indices array and fill it from indices
 *  based on the size of the index
 *
 *  @param {List} indicesList the list of indices
 *  @param {Number} indexSize the size of the index
 *  @return {Uint32Array} indices
 */
function _WebGL_makeIndexedBuffer(indicesList, indexSize) {
  var indices = new Uint32Array(_WebGL_listLength(indicesList) * indexSize);
  var fillOffset = 0;
  var i;
  _WebGL_listEach(function (elem) {
    if (indexSize === 1) {
      indices[fillOffset++] = elem;
    } else {
      for (i = 0; i < indexSize; i++) {
        indices[fillOffset++] = elem[String.fromCharCode(97 + i)];
      }
    }
  }, indicesList);
  return indices;
}

function _WebGL_getProgID(vertID, fragID) {
  return vertID + '#' + fragID;
}

var _WebGL_drawGL = F2(function (model, domNode) {
  var cache = model.f;
  var gl = cache.gl;

  if (!gl) {
    return domNode;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  if (!cache.depthTest.b) {
    gl.depthMask(true);
    cache.depthTest.b = true;
  }
  if (cache.stencilTest.c !== cache.STENCIL_WRITEMASK) {
    gl.stencilMask(cache.STENCIL_WRITEMASK);
    cache.stencilTest.c = cache.STENCIL_WRITEMASK;
  }
  _WebGL_disableScissor(cache);
  _WebGL_disableColorMask(cache);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

  function drawEntity(entity) {
    if (!entity.d.b.b) {
      return; // Empty list
    }

    var progid;
    var program;
    var i;

    if (entity.b.id && entity.c.id) {
      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      program = cache.programs[progid];
    }

    if (!program) {

      var vshader;
      if (entity.b.id) {
        vshader = cache.shaders[entity.b.id];
      } else {
        entity.b.id = _WebGL_guid++;
      }

      if (!vshader) {
        vshader = _WebGL_doCompile(gl, entity.b.src, gl.VERTEX_SHADER);
        cache.shaders[entity.b.id] = vshader;
      }

      var fshader;
      if (entity.c.id) {
        fshader = cache.shaders[entity.c.id];
      } else {
        entity.c.id = _WebGL_guid++;
      }

      if (!fshader) {
        fshader = _WebGL_doCompile(gl, entity.c.src, gl.FRAGMENT_SHADER);
        cache.shaders[entity.c.id] = fshader;
      }

      var glProgram = _WebGL_doLink(gl, vshader, fshader);

      program = {
        glProgram: glProgram,
        attributes: Object.assign({}, entity.b.attributes, entity.c.attributes),
        currentUniforms: {},
        activeAttributes: [],
        activeAttributeLocations: []
      };

      program.uniformSetters = _WebGL_createUniformSetters(
        gl,
        model,
        program,
        Object.assign({}, entity.b.uniforms, entity.c.uniforms)
      );

      var numActiveAttributes = gl.getProgramParameter(glProgram, gl.ACTIVE_ATTRIBUTES);
      for (i = 0; i < numActiveAttributes; i++) {
        var attribute = gl.getActiveAttrib(glProgram, i);
        var attribLocation = gl.getAttribLocation(glProgram, attribute.name);
        program.activeAttributes.push(attribute);
        program.activeAttributeLocations.push(attribLocation);
      }

      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      cache.programs[progid] = program;
    }

    if (cache.lastProgId !== progid) {
      gl.useProgram(program.glProgram);
      cache.lastProgId = progid;
    }

    _WebGL_setUniforms(program.uniformSetters, entity.e);

    var buffer = cache.buffers.get(entity.d);

    if (!buffer) {
      buffer = _WebGL_doBindSetup(gl, entity.d);
      cache.buffers.set(entity.d, buffer);
    }

    for (i = 0; i < program.activeAttributes.length; i++) {
      attribute = program.activeAttributes[i];
      attribLocation = program.activeAttributeLocations[i];

      if (buffer.buffers[attribute.name] === undefined) {
        buffer.buffers[attribute.name] = _WebGL_doBindAttribute(gl, attribute, entity.d, program.attributes);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffers[attribute.name]);

      var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);
      if (attributeInfo.arraySize === 1) {
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
      } else {
        // Point to four vec4 in case of mat4
        var offset = attributeInfo.size * 4; // float32 takes 4 bytes
        var stride = offset * attributeInfo.arraySize;
        for (var m = 0; m < attributeInfo.arraySize; m++) {
          gl.enableVertexAttribArray(attribLocation + m);
          gl.vertexAttribPointer(attribLocation + m, attributeInfo.size, attributeInfo.baseType, false, stride, offset * m);
        }
      }
    }

    // Apply all the new settings
    cache.toggle = !cache.toggle;
    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$enableSetting(cache), entity.a);
    // Disable the settings that were applied in the previous draw call
    for (i = 0; i < _WebGL_settings.length; i++) {
      var setting = cache[_WebGL_settings[i]];
      if (setting.toggle !== cache.toggle && setting.enabled) {
        _WebGL_disableFunctions[i](cache);
        setting.enabled = false;
        setting.toggle = cache.toggle;
      }
    }

    if (buffer.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);
      gl.drawElements(entity.d.a.ga, buffer.numIndices, gl.UNSIGNED_INT, 0);
    } else {
      gl.drawArrays(entity.d.a.ga, 0, buffer.numIndices);
    }
  }

  _WebGL_listEach(drawEntity, model.g);
  return domNode;
});

function _WebGL_createUniformSetters(gl, model, program, uniformsMap) {
  var glProgram = program.glProgram;
  var currentUniforms = program.currentUniforms;
  var textureCounter = 0;
  var cache = model.f;
  function createUniformSetter(glProgram, uniform) {
    var uniformName = uniform.name;
    var uniformLocation = gl.getUniformLocation(glProgram, uniformName);
    switch (uniform.type) {
      case gl.INT:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1i(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1f(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC2:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform2f(uniformLocation, value[0], value[1]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC3:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform3f(uniformLocation, value[0], value[1], value[2]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC4:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform4f(uniformLocation, value[0], value[1], value[2], value[3]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_MAT4:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
            currentUniforms[uniformName] = value;
          }
        };
      case gl.SAMPLER_2D:
        var currentTexture = textureCounter++;
        return function (texture) {
          gl.activeTexture(gl.TEXTURE0 + currentTexture);
          var tex = cache.textures.get(texture);
          if (!tex) {
            tex = texture.hd(gl);
            cache.textures.set(texture, tex);
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          if (currentUniforms[uniformName] !== texture) {
            gl.uniform1i(uniformLocation, currentTexture);
            currentUniforms[uniformName] = texture;
          }
        };
      case gl.BOOL:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1i(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      default:
        return function () { };
    }
  }

  var uniformSetters = {};
  var numUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < numUniforms; i++) {
    var uniform = gl.getActiveUniform(glProgram, i);
    uniformSetters[uniformsMap[uniform.name] || uniform.name] = createUniformSetter(glProgram, uniform);
  }

  return uniformSetters;
}

function _WebGL_setUniforms(setters, values) {
  Object.keys(values).forEach(function (name) {
    var setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// VIRTUAL-DOM WIDGET

// eslint-disable-next-line no-unused-vars
var _WebGL_toHtml = F3(function (options, factList, entities) {
  return _VirtualDom_custom(
    factList,
    {
      g: entities,
      f: {},
      h: options
    },
    _WebGL_render,
    _WebGL_diff
  );
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAlpha = F2(function (options, option) {
  options.contextAttributes.alpha = true;
  options.contextAttributes.premultipliedAlpha = option.a;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepth = F2(function (options, option) {
  options.contextAttributes.depth = true;
  options.sceneSettings.push(function (gl) {
    gl.clearDepth(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencil = F2(function (options, option) {
  options.contextAttributes.stencil = true;
  options.sceneSettings.push(function (gl) {
    gl.clearStencil(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAntialias = F2(function (options, option) {
  options.contextAttributes.antialias = true;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableClearColor = F2(function (options, option) {
  options.sceneSettings.push(function (gl) {
    gl.clearColor(option.a, option.b, option.c, option.d);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePreserveDrawingBuffer = F2(function (options, option) {
  options.contextAttributes.preserveDrawingBuffer = true;
});

/**
 *  Creates canvas and schedules initial _WebGL_drawGL
 *  @param {Object} model
 *  @param {Object} model.f that may contain the following properties:
           gl, shaders, programs, buffers, textures
 *  @param {List<Option>} model.h list of options coming from Elm
 *  @param {List<Entity>} model.g list of entities coming from Elm
 *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
 */
function _WebGL_render(model) {
  var options = {
    contextAttributes: {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    sceneSettings: []
  };

  _WebGL_listEach(function (option) {
    return A2($elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
  }, model.h);

  var canvas = _VirtualDom_doc.createElement('canvas');
  var gl = canvas.getContext && (
    canvas.getContext('webgl', options.contextAttributes) ||
    canvas.getContext('experimental-webgl', options.contextAttributes)
  );

  if (gl && typeof WeakMap !== 'undefined') {
    options.sceneSettings.forEach(function (sceneSetting) {
      sceneSetting(gl);
    });

    // Activate extensions
    gl.getExtension('OES_standard_derivatives');
    gl.getExtension('OES_element_index_uint');

    model.f.gl = gl;

    // Cache the current settings in order to diff them to avoid redundant calls
    // https://emscripten.org/docs/optimizing/Optimizing-WebGL.html#avoid-redundant-calls
    model.f.toggle = false; // used to diff the settings from the previous and current draw calls
    model.f.blend = { enabled: false, toggle: false };
    model.f.depthTest = { enabled: false, toggle: false };
    model.f.stencilTest = { enabled: false, toggle: false };
    model.f.scissor = { enabled: false, toggle: false };
    model.f.colorMask = { enabled: false, toggle: false };
    model.f.cullFace = { enabled: false, toggle: false };
    model.f.polygonOffset = { enabled: false, toggle: false };
    model.f.sampleCoverage = { enabled: false, toggle: false };
    model.f.sampleAlphaToCoverage = { enabled: false, toggle: false };

    model.f.shaders = [];
    model.f.programs = {};
    model.f.lastProgId = null;
    model.f.buffers = new WeakMap();
    model.f.textures = new WeakMap();
    // Memorize the initial stencil write mask, because
    // browsers may have different number of stencil bits
    model.f.STENCIL_WRITEMASK = gl.getParameter(gl.STENCIL_WRITEMASK);

    // Render for the first time.
    // This has to be done in animation frame,
    // because the canvas is not in the DOM yet
    _WebGL_rAF(function () {
      return A2(_WebGL_drawGL, model, canvas);
    });

  } else {
    canvas = _VirtualDom_doc.createElement('div');
    canvas.innerHTML = '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!';
  }

  return canvas;
}

function _WebGL_diff(oldModel, newModel) {
  newModel.f = oldModel.f;
  return _WebGL_drawGL(newModel);
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\u000A    ',
		A2($elm$core$String$split, '\u000A', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\u000A\u000A(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\u0027' + (f + '\u0027]'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\u000A\u000A',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\u000A\u000A';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\u000A\u000A    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\u000A\u000A' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.r) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.v),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.v);
		} else {
			var treeLen = builder.r * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.L) : builder.L;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.r);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.v) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.v);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{L: nodeList, r: (len / $elm$core$Array$branchFactor) | 0, v: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fc: fragment, fv: host, go: path, gr: port_, gw: protocol, gx: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$document = _Browser_document;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Main$AssetsLoaded = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$Loading = {$: 0};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			A2(
				$elm$core$Task$onError,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
					$elm$core$Result$Err),
				A2(
					$elm$core$Task$andThen,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Ok),
					task)));
	});
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$core$Task$fail = _Scheduler_fail;
var $elm$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			$elm$core$Task$onError,
			A2($elm$core$Basics$composeL, $elm$core$Task$fail, convert),
			task);
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $ianmackenzie$elm_geometry$Geometry$Types$Frame3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Geometry$Types$Point3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Point3d$origin = {n: 0, o: 0, p: 0};
var $ianmackenzie$elm_geometry$Geometry$Types$Direction3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Direction3d$unsafe = function (givenComponents) {
	return givenComponents;
};
var $ianmackenzie$elm_geometry$Direction3d$positiveX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{n: 1, o: 0, p: 0});
var $ianmackenzie$elm_geometry$Direction3d$x = $ianmackenzie$elm_geometry$Direction3d$positiveX;
var $ianmackenzie$elm_geometry$Direction3d$positiveY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{n: 0, o: 1, p: 0});
var $ianmackenzie$elm_geometry$Direction3d$y = $ianmackenzie$elm_geometry$Direction3d$positiveY;
var $ianmackenzie$elm_geometry$Direction3d$positiveZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{n: 0, o: 0, p: 1});
var $ianmackenzie$elm_geometry$Direction3d$z = $ianmackenzie$elm_geometry$Direction3d$positiveZ;
var $ianmackenzie$elm_geometry$Frame3d$atOrigin = {gl: $ianmackenzie$elm_geometry$Point3d$origin, gX: $ianmackenzie$elm_geometry$Direction3d$x, gY: $ianmackenzie$elm_geometry$Direction3d$y, g_: $ianmackenzie$elm_geometry$Direction3d$z};
var $ianmackenzie$elm_units$Length$inMeters = function (_v0) {
	var numMeters = _v0;
	return numMeters;
};
var $elm$core$String$lines = _String_lines;
var $w0rm$elm_obj_file$Obj$Internal$Parse$Group = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$addNonEmptyGroup = F8(
	function (object_, material_, groups_, smoothingGroup, faceElements, lineElements, pointsElements, groups) {
		if (faceElements.b) {
			return A2(
				$elm$core$List$cons,
				A4(
					$w0rm$elm_obj_file$Obj$Internal$Parse$Group,
					{cU: groups_, c4: material_, da: object_, eB: smoothingGroup},
					faceElements,
					lineElements,
					pointsElements),
				groups);
		} else {
			if (lineElements.b) {
				return A2(
					$elm$core$List$cons,
					A4(
						$w0rm$elm_obj_file$Obj$Internal$Parse$Group,
						{cU: groups_, c4: material_, da: object_, eB: smoothingGroup},
						faceElements,
						lineElements,
						pointsElements),
					groups);
			} else {
				if (pointsElements.b) {
					return A2(
						$elm$core$List$cons,
						A4(
							$w0rm$elm_obj_file$Obj$Internal$Parse$Group,
							{cU: groups_, c4: material_, da: object_, eB: smoothingGroup},
							faceElements,
							lineElements,
							pointsElements),
						groups);
				} else {
					return groups;
				}
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$IndexMap$IndexMap = $elm$core$Basics$identity;
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $w0rm$elm_obj_file$Obj$Internal$IndexMap$empty = function (size) {
	return A2($elm$core$Array$repeat, size, _List_Nil);
};
var $w0rm$elm_obj_file$Obj$Internal$Parse$formatError = F2(
	function (lineno, error) {
		return $elm$core$Result$Err(
			'Line ' + ($elm$core$String$fromInt(lineno) + (': ' + error)));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{L: nodeList, r: nodeListSize, v: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$FaceElement = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $w0rm$elm_obj_file$Obj$Internal$Parse$parseIndices = F3(
	function (list, allHaveNormals, vertices) {
		parseIndices:
		while (true) {
			if (list.b) {
				var first = list.a;
				var more = list.b;
				var _v1 = A2($elm$core$String$split, '/', first);
				if (_v1.b) {
					var pComponent = _v1.a;
					var uvnComponents = _v1.b;
					var _v2 = $elm$core$String$toInt(pComponent);
					if (!_v2.$) {
						var p = _v2.a;
						if (uvnComponents.b) {
							var uvComponent = uvnComponents.a;
							var nComponents = uvnComponents.b;
							var _v4 = $elm$core$String$toInt(uvComponent);
							if (!_v4.$) {
								var uv = _v4.a;
								if (nComponents.b) {
									var nComponent = nComponents.a;
									var _v6 = $elm$core$String$toInt(nComponent);
									if (!_v6.$) {
										var n = _v6.a;
										var $temp$list = more,
											$temp$allHaveNormals = allHaveNormals,
											$temp$vertices = A2(
											$elm$core$List$cons,
											{gc: n - 1, gm: p - 1, _: uv - 1},
											vertices);
										list = $temp$list;
										allHaveNormals = $temp$allHaveNormals;
										vertices = $temp$vertices;
										continue parseIndices;
									} else {
										return _Utils_Tuple2(false, _List_Nil);
									}
								} else {
									var $temp$list = more,
										$temp$allHaveNormals = false,
										$temp$vertices = A2(
										$elm$core$List$cons,
										{gc: -1, gm: p - 1, _: uv - 1},
										vertices);
									list = $temp$list;
									allHaveNormals = $temp$allHaveNormals;
									vertices = $temp$vertices;
									continue parseIndices;
								}
							} else {
								if (nComponents.b) {
									var nComponent = nComponents.a;
									var _v8 = $elm$core$String$toInt(nComponent);
									if (!_v8.$) {
										var n = _v8.a;
										var $temp$list = more,
											$temp$allHaveNormals = allHaveNormals,
											$temp$vertices = A2(
											$elm$core$List$cons,
											{gc: n - 1, gm: p - 1, _: -1},
											vertices);
										list = $temp$list;
										allHaveNormals = $temp$allHaveNormals;
										vertices = $temp$vertices;
										continue parseIndices;
									} else {
										return _Utils_Tuple2(false, _List_Nil);
									}
								} else {
									var $temp$list = more,
										$temp$allHaveNormals = false,
										$temp$vertices = A2(
										$elm$core$List$cons,
										{gc: -1, gm: p - 1, _: -1},
										vertices);
									list = $temp$list;
									allHaveNormals = $temp$allHaveNormals;
									vertices = $temp$vertices;
									continue parseIndices;
								}
							}
						} else {
							var $temp$list = more,
								$temp$allHaveNormals = false,
								$temp$vertices = A2(
								$elm$core$List$cons,
								{gc: -1, gm: p - 1, _: -1},
								vertices);
							list = $temp$list;
							allHaveNormals = $temp$allHaveNormals;
							vertices = $temp$vertices;
							continue parseIndices;
						}
					} else {
						return _Utils_Tuple2(false, _List_Nil);
					}
				} else {
					return _Utils_Tuple2(false, _List_Nil);
				}
			} else {
				return _Utils_Tuple2(allHaveNormals, vertices);
			}
		}
	});
var $elm$core$String$words = _String_words;
var $w0rm$elm_obj_file$Obj$Internal$Parse$parseFaceElements = F3(
	function (lineno, lines, faceElements) {
		parseFaceElements:
		while (true) {
			if (lines.b) {
				var line = lines.a;
				var remainingLines = lines.b;
				var _v1 = $elm$core$String$words(line);
				if (_v1.b && (_v1.a === 'f')) {
					var indices = _v1.b;
					var _v2 = A3($w0rm$elm_obj_file$Obj$Internal$Parse$parseIndices, indices, true, _List_Nil);
					var hasNormals = _v2.a;
					var vertices = _v2.b;
					if (vertices.b) {
						if (vertices.b.b && vertices.b.b.b) {
							var _v4 = vertices.b;
							var _v5 = _v4.b;
							var $temp$lineno = lineno + 1,
								$temp$lines = remainingLines,
								$temp$faceElements = A2(
								$elm$core$List$cons,
								A3($w0rm$elm_obj_file$Obj$Internal$Parse$FaceElement, lineno, hasNormals, vertices),
								faceElements);
							lineno = $temp$lineno;
							lines = $temp$lines;
							faceElements = $temp$faceElements;
							continue parseFaceElements;
						} else {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Face has less than three vertices');
						}
					} else {
						if (!indices.b) {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Face has less than three vertices');
						} else {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid face format');
						}
					}
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple3(lineno, lines, faceElements));
				}
			} else {
				return $elm$core$Result$Ok(
					_Utils_Tuple3(lineno, lines, faceElements));
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$LineElement = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$parseLineElements = F3(
	function (lineno, lines, lineElements) {
		parseLineElements:
		while (true) {
			if (lines.b) {
				var line = lines.a;
				var remainingLines = lines.b;
				var _v1 = $elm$core$String$words(line);
				if (_v1.b && (_v1.a === 'l')) {
					var indices = _v1.b;
					var _v2 = A3($w0rm$elm_obj_file$Obj$Internal$Parse$parseIndices, indices, false, _List_Nil);
					var vertices = _v2.b;
					if (vertices.b) {
						if (vertices.b.b) {
							var _v4 = vertices.b;
							var $temp$lineno = lineno + 1,
								$temp$lines = remainingLines,
								$temp$lineElements = A2(
								$elm$core$List$cons,
								A2($w0rm$elm_obj_file$Obj$Internal$Parse$LineElement, lineno, vertices),
								lineElements);
							lineno = $temp$lineno;
							lines = $temp$lines;
							lineElements = $temp$lineElements;
							continue parseLineElements;
						} else {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Line has less than two vertices');
						}
					} else {
						if (!indices.b) {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Line has less than two vertices');
						} else {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid line format');
						}
					}
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple3(lineno, lines, lineElements));
				}
			} else {
				return $elm$core$Result$Ok(
					_Utils_Tuple3(lineno, lines, lineElements));
			}
		}
	});
var $elm$core$String$toFloat = _String_toFloat;
var $w0rm$elm_obj_file$Obj$Internal$Parse$parseNormals = F3(
	function (lineno, lines, normals) {
		parseNormals:
		while (true) {
			if (lines.b) {
				var line = lines.a;
				var remainingLines = lines.b;
				var _v1 = $elm$core$String$words(line);
				if (_v1.b && (_v1.a === 'vn')) {
					var coords = _v1.b;
					if ((coords.b && coords.b.b) && coords.b.b.b) {
						var sx = coords.a;
						var _v3 = coords.b;
						var sy = _v3.a;
						var _v4 = _v3.b;
						var sz = _v4.a;
						var _v5 = $elm$core$String$toFloat(sx);
						if (!_v5.$) {
							var x = _v5.a;
							var _v6 = $elm$core$String$toFloat(sy);
							if (!_v6.$) {
								var y = _v6.a;
								var _v7 = $elm$core$String$toFloat(sz);
								if (!_v7.$) {
									var z = _v7.a;
									var $temp$lineno = lineno + 1,
										$temp$lines = remainingLines,
										$temp$normals = A2(
										$elm$core$List$cons,
										$ianmackenzie$elm_geometry$Direction3d$unsafe(
											{n: x, o: y, p: z}),
										normals);
									lineno = $temp$lineno;
									lines = $temp$lines;
									normals = $temp$normals;
									continue parseNormals;
								} else {
									return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid normal vector format');
								}
							} else {
								return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid normal vector format');
							}
						} else {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid normal vector format');
						}
					} else {
						return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid normal vector format');
					}
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple3(lineno, lines, normals));
				}
			} else {
				return $elm$core$Result$Ok(
					_Utils_Tuple3(lineno, lines, normals));
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$PointsElement = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$parsePointsElements = F3(
	function (lineno, lines, pointsElements) {
		parsePointsElements:
		while (true) {
			if (lines.b) {
				var line = lines.a;
				var remainingLines = lines.b;
				var _v1 = $elm$core$String$words(line);
				if (_v1.b && (_v1.a === 'p')) {
					var indices = _v1.b;
					var _v2 = A3($w0rm$elm_obj_file$Obj$Internal$Parse$parseIndices, indices, false, _List_Nil);
					var vertices = _v2.b;
					if (vertices.b) {
						var $temp$lineno = lineno + 1,
							$temp$lines = remainingLines,
							$temp$pointsElements = A2(
							$elm$core$List$cons,
							A2($w0rm$elm_obj_file$Obj$Internal$Parse$PointsElement, lineno, vertices),
							pointsElements);
						lineno = $temp$lineno;
						lines = $temp$lines;
						pointsElements = $temp$pointsElements;
						continue parsePointsElements;
					} else {
						if (!indices.b) {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Points element has no vertices');
						} else {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid points format');
						}
					}
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple3(lineno, lines, pointsElements));
				}
			} else {
				return $elm$core$Result$Ok(
					_Utils_Tuple3(lineno, lines, pointsElements));
			}
		}
	});
var $ianmackenzie$elm_geometry$Point3d$fromMeters = function (givenCoordinates) {
	return givenCoordinates;
};
var $w0rm$elm_obj_file$Obj$Internal$Parse$parsePositions = F4(
	function (units, lineno, lines, positions) {
		parsePositions:
		while (true) {
			if (lines.b) {
				var line = lines.a;
				var remainingLines = lines.b;
				var _v1 = $elm$core$String$words(line);
				if (_v1.b && (_v1.a === 'v')) {
					var coords = _v1.b;
					if ((coords.b && coords.b.b) && coords.b.b.b) {
						var sx = coords.a;
						var _v3 = coords.b;
						var sy = _v3.a;
						var _v4 = _v3.b;
						var sz = _v4.a;
						var _v5 = $elm$core$String$toFloat(sx);
						if (!_v5.$) {
							var x = _v5.a;
							var _v6 = $elm$core$String$toFloat(sy);
							if (!_v6.$) {
								var y = _v6.a;
								var _v7 = $elm$core$String$toFloat(sz);
								if (!_v7.$) {
									var z = _v7.a;
									var $temp$units = units,
										$temp$lineno = lineno + 1,
										$temp$lines = remainingLines,
										$temp$positions = A2(
										$elm$core$List$cons,
										$ianmackenzie$elm_geometry$Point3d$fromMeters(
											{
												n: units(x),
												o: units(y),
												p: units(z)
											}),
										positions);
									units = $temp$units;
									lineno = $temp$lineno;
									lines = $temp$lines;
									positions = $temp$positions;
									continue parsePositions;
								} else {
									return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid position format');
								}
							} else {
								return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid position format');
							}
						} else {
							return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid position format');
						}
					} else {
						return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid position format');
					}
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple3(lineno, lines, positions));
				}
			} else {
				return $elm$core$Result$Ok(
					_Utils_Tuple3(lineno, lines, positions));
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$parseUvs = F3(
	function (lineno, lines, uvs) {
		parseUvs:
		while (true) {
			if (lines.b) {
				var line = lines.a;
				var remainingLines = lines.b;
				var _v1 = $elm$core$String$words(line);
				if (_v1.b && (_v1.a === 'vt')) {
					var coords = _v1.b;
					if (coords.b) {
						if (coords.b.b) {
							var su = coords.a;
							var _v3 = coords.b;
							var sv = _v3.a;
							var _v4 = $elm$core$String$toFloat(su);
							if (!_v4.$) {
								var u = _v4.a;
								var _v5 = $elm$core$String$toFloat(sv);
								if (!_v5.$) {
									var v = _v5.a;
									var $temp$lineno = lineno + 1,
										$temp$lines = remainingLines,
										$temp$uvs = A2(
										$elm$core$List$cons,
										_Utils_Tuple2(u, v),
										uvs);
									lineno = $temp$lineno;
									lines = $temp$lines;
									uvs = $temp$uvs;
									continue parseUvs;
								} else {
									return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid texture coordinates format');
								}
							} else {
								return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid texture coordinates format');
							}
						} else {
							var su = coords.a;
							var _v6 = $elm$core$String$toFloat(su);
							if (!_v6.$) {
								var u = _v6.a;
								var $temp$lineno = lineno + 1,
									$temp$lines = remainingLines,
									$temp$uvs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(u, 0),
									uvs);
								lineno = $temp$lineno;
								lines = $temp$lines;
								uvs = $temp$uvs;
								continue parseUvs;
							} else {
								return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid texture coordinates format');
							}
						}
					} else {
						return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Invalid texture coordinates format');
					}
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple3(lineno, lines, uvs));
				}
			} else {
				return $elm$core$Result$Ok(
					_Utils_Tuple3(lineno, lines, uvs));
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$skipCommands = _List_fromArray(
	['mg', 'mtllib', 'bevel', 'c_interp', 'd_interp', 'lod', 'shadow_obj', 'trace_obj', 'ctech', 'stech', 'cstype', 'deg', 'bmat', 'step', 'curv', 'curv2', 'surf', 'parm', 'trim', 'hole', 'scrv', 'sp', 'end', 'con', 'call', 'scmp', 'csh']);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$Parse$parseHelp = function (units) {
	return function (lines) {
		return function (lineno) {
			return function (positions) {
				return function (normals) {
					return function (uvs) {
						return function (groups) {
							return function (object_) {
								return function (material_) {
									return function (groups_) {
										return function (faceElements) {
											return function (lineElements) {
												return function (pointsElements) {
													return function (currentSmoothingGroup) {
														parseHelp:
														while (true) {
															if (lines.b) {
																var line = lines.a;
																var remainingLines = lines.b;
																var _v1 = A2($elm$core$String$left, 2, line);
																switch (_v1) {
																	case 'f ':
																		var _v2 = A3($w0rm$elm_obj_file$Obj$Internal$Parse$parseFaceElements, lineno, lines, faceElements);
																		if (!_v2.$) {
																			var _v3 = _v2.a;
																			var newLineno = _v3.a;
																			var newLines = _v3.b;
																			var newFaceElements = _v3.c;
																			var $temp$units = units,
																				$temp$lines = newLines,
																				$temp$lineno = newLineno,
																				$temp$positions = positions,
																				$temp$normals = normals,
																				$temp$uvs = uvs,
																				$temp$groups = groups,
																				$temp$object_ = object_,
																				$temp$material_ = material_,
																				$temp$groups_ = groups_,
																				$temp$faceElements = newFaceElements,
																				$temp$lineElements = lineElements,
																				$temp$pointsElements = pointsElements,
																				$temp$currentSmoothingGroup = currentSmoothingGroup;
																			units = $temp$units;
																			lines = $temp$lines;
																			lineno = $temp$lineno;
																			positions = $temp$positions;
																			normals = $temp$normals;
																			uvs = $temp$uvs;
																			groups = $temp$groups;
																			object_ = $temp$object_;
																			material_ = $temp$material_;
																			groups_ = $temp$groups_;
																			faceElements = $temp$faceElements;
																			lineElements = $temp$lineElements;
																			pointsElements = $temp$pointsElements;
																			currentSmoothingGroup = $temp$currentSmoothingGroup;
																			continue parseHelp;
																		} else {
																			var err = _v2.a;
																			return $elm$core$Result$Err(err);
																		}
																	case 'v ':
																		var _v4 = A4($w0rm$elm_obj_file$Obj$Internal$Parse$parsePositions, units, lineno, lines, positions);
																		if (!_v4.$) {
																			var _v5 = _v4.a;
																			var newLineno = _v5.a;
																			var newLines = _v5.b;
																			var newPositions = _v5.c;
																			var $temp$units = units,
																				$temp$lines = newLines,
																				$temp$lineno = newLineno,
																				$temp$positions = newPositions,
																				$temp$normals = normals,
																				$temp$uvs = uvs,
																				$temp$groups = groups,
																				$temp$object_ = object_,
																				$temp$material_ = material_,
																				$temp$groups_ = groups_,
																				$temp$faceElements = faceElements,
																				$temp$lineElements = lineElements,
																				$temp$pointsElements = pointsElements,
																				$temp$currentSmoothingGroup = currentSmoothingGroup;
																			units = $temp$units;
																			lines = $temp$lines;
																			lineno = $temp$lineno;
																			positions = $temp$positions;
																			normals = $temp$normals;
																			uvs = $temp$uvs;
																			groups = $temp$groups;
																			object_ = $temp$object_;
																			material_ = $temp$material_;
																			groups_ = $temp$groups_;
																			faceElements = $temp$faceElements;
																			lineElements = $temp$lineElements;
																			pointsElements = $temp$pointsElements;
																			currentSmoothingGroup = $temp$currentSmoothingGroup;
																			continue parseHelp;
																		} else {
																			var err = _v4.a;
																			return $elm$core$Result$Err(err);
																		}
																	case 'vt':
																		var _v6 = A3($w0rm$elm_obj_file$Obj$Internal$Parse$parseUvs, lineno, lines, uvs);
																		if (!_v6.$) {
																			var _v7 = _v6.a;
																			var newLineno = _v7.a;
																			var newLines = _v7.b;
																			var newUvs = _v7.c;
																			var $temp$units = units,
																				$temp$lines = newLines,
																				$temp$lineno = newLineno,
																				$temp$positions = positions,
																				$temp$normals = normals,
																				$temp$uvs = newUvs,
																				$temp$groups = groups,
																				$temp$object_ = object_,
																				$temp$material_ = material_,
																				$temp$groups_ = groups_,
																				$temp$faceElements = faceElements,
																				$temp$lineElements = lineElements,
																				$temp$pointsElements = pointsElements,
																				$temp$currentSmoothingGroup = currentSmoothingGroup;
																			units = $temp$units;
																			lines = $temp$lines;
																			lineno = $temp$lineno;
																			positions = $temp$positions;
																			normals = $temp$normals;
																			uvs = $temp$uvs;
																			groups = $temp$groups;
																			object_ = $temp$object_;
																			material_ = $temp$material_;
																			groups_ = $temp$groups_;
																			faceElements = $temp$faceElements;
																			lineElements = $temp$lineElements;
																			pointsElements = $temp$pointsElements;
																			currentSmoothingGroup = $temp$currentSmoothingGroup;
																			continue parseHelp;
																		} else {
																			var err = _v6.a;
																			return $elm$core$Result$Err(err);
																		}
																	case 'vn':
																		var _v8 = A3($w0rm$elm_obj_file$Obj$Internal$Parse$parseNormals, lineno, lines, normals);
																		if (!_v8.$) {
																			var _v9 = _v8.a;
																			var newLineno = _v9.a;
																			var newLines = _v9.b;
																			var newNormals = _v9.c;
																			var $temp$units = units,
																				$temp$lines = newLines,
																				$temp$lineno = newLineno,
																				$temp$positions = positions,
																				$temp$normals = newNormals,
																				$temp$uvs = uvs,
																				$temp$groups = groups,
																				$temp$object_ = object_,
																				$temp$material_ = material_,
																				$temp$groups_ = groups_,
																				$temp$faceElements = faceElements,
																				$temp$lineElements = lineElements,
																				$temp$pointsElements = pointsElements,
																				$temp$currentSmoothingGroup = currentSmoothingGroup;
																			units = $temp$units;
																			lines = $temp$lines;
																			lineno = $temp$lineno;
																			positions = $temp$positions;
																			normals = $temp$normals;
																			uvs = $temp$uvs;
																			groups = $temp$groups;
																			object_ = $temp$object_;
																			material_ = $temp$material_;
																			groups_ = $temp$groups_;
																			faceElements = $temp$faceElements;
																			lineElements = $temp$lineElements;
																			pointsElements = $temp$pointsElements;
																			currentSmoothingGroup = $temp$currentSmoothingGroup;
																			continue parseHelp;
																		} else {
																			var err = _v8.a;
																			return $elm$core$Result$Err(err);
																		}
																	default:
																		var _v10 = $elm$core$String$words(line);
																		if (_v10.b) {
																			switch (_v10.a) {
																				case 'o':
																					var rest = _v10.b;
																					if (rest.b) {
																						var newObject = rest.a;
																						var $temp$units = units,
																							$temp$lines = remainingLines,
																							$temp$lineno = lineno + 1,
																							$temp$positions = positions,
																							$temp$normals = normals,
																							$temp$uvs = uvs,
																							$temp$groups = A8($w0rm$elm_obj_file$Obj$Internal$Parse$addNonEmptyGroup, object_, material_, groups_, currentSmoothingGroup, faceElements, lineElements, pointsElements, groups),
																							$temp$object_ = $elm$core$Maybe$Just(newObject),
																							$temp$material_ = material_,
																							$temp$groups_ = groups_,
																							$temp$faceElements = _List_Nil,
																							$temp$lineElements = _List_Nil,
																							$temp$pointsElements = _List_Nil,
																							$temp$currentSmoothingGroup = currentSmoothingGroup;
																						units = $temp$units;
																						lines = $temp$lines;
																						lineno = $temp$lineno;
																						positions = $temp$positions;
																						normals = $temp$normals;
																						uvs = $temp$uvs;
																						groups = $temp$groups;
																						object_ = $temp$object_;
																						material_ = $temp$material_;
																						groups_ = $temp$groups_;
																						faceElements = $temp$faceElements;
																						lineElements = $temp$lineElements;
																						pointsElements = $temp$pointsElements;
																						currentSmoothingGroup = $temp$currentSmoothingGroup;
																						continue parseHelp;
																					} else {
																						return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'No object name');
																					}
																				case 'g':
																					var newGroups = _v10.b;
																					if (!newGroups.b) {
																						var $temp$units = units,
																							$temp$lines = remainingLines,
																							$temp$lineno = lineno + 1,
																							$temp$positions = positions,
																							$temp$normals = normals,
																							$temp$uvs = uvs,
																							$temp$groups = A8($w0rm$elm_obj_file$Obj$Internal$Parse$addNonEmptyGroup, object_, material_, groups_, currentSmoothingGroup, faceElements, lineElements, pointsElements, groups),
																							$temp$object_ = object_,
																							$temp$material_ = material_,
																							$temp$groups_ = _List_fromArray(
																							['default']),
																							$temp$faceElements = _List_Nil,
																							$temp$lineElements = _List_Nil,
																							$temp$pointsElements = _List_Nil,
																							$temp$currentSmoothingGroup = currentSmoothingGroup;
																						units = $temp$units;
																						lines = $temp$lines;
																						lineno = $temp$lineno;
																						positions = $temp$positions;
																						normals = $temp$normals;
																						uvs = $temp$uvs;
																						groups = $temp$groups;
																						object_ = $temp$object_;
																						material_ = $temp$material_;
																						groups_ = $temp$groups_;
																						faceElements = $temp$faceElements;
																						lineElements = $temp$lineElements;
																						pointsElements = $temp$pointsElements;
																						currentSmoothingGroup = $temp$currentSmoothingGroup;
																						continue parseHelp;
																					} else {
																						var $temp$units = units,
																							$temp$lines = remainingLines,
																							$temp$lineno = lineno + 1,
																							$temp$positions = positions,
																							$temp$normals = normals,
																							$temp$uvs = uvs,
																							$temp$groups = A8($w0rm$elm_obj_file$Obj$Internal$Parse$addNonEmptyGroup, object_, material_, groups_, currentSmoothingGroup, faceElements, lineElements, pointsElements, groups),
																							$temp$object_ = object_,
																							$temp$material_ = material_,
																							$temp$groups_ = newGroups,
																							$temp$faceElements = _List_Nil,
																							$temp$lineElements = _List_Nil,
																							$temp$pointsElements = _List_Nil,
																							$temp$currentSmoothingGroup = currentSmoothingGroup;
																						units = $temp$units;
																						lines = $temp$lines;
																						lineno = $temp$lineno;
																						positions = $temp$positions;
																						normals = $temp$normals;
																						uvs = $temp$uvs;
																						groups = $temp$groups;
																						object_ = $temp$object_;
																						material_ = $temp$material_;
																						groups_ = $temp$groups_;
																						faceElements = $temp$faceElements;
																						lineElements = $temp$lineElements;
																						pointsElements = $temp$pointsElements;
																						currentSmoothingGroup = $temp$currentSmoothingGroup;
																						continue parseHelp;
																					}
																				case 'usemtl':
																					var rest = _v10.b;
																					if (rest.b) {
																						var newMaterial = rest.a;
																						var $temp$units = units,
																							$temp$lines = remainingLines,
																							$temp$lineno = lineno + 1,
																							$temp$positions = positions,
																							$temp$normals = normals,
																							$temp$uvs = uvs,
																							$temp$groups = groups,
																							$temp$object_ = object_,
																							$temp$material_ = $elm$core$Maybe$Just(newMaterial),
																							$temp$groups_ = groups_,
																							$temp$faceElements = faceElements,
																							$temp$lineElements = lineElements,
																							$temp$pointsElements = pointsElements,
																							$temp$currentSmoothingGroup = currentSmoothingGroup;
																						units = $temp$units;
																						lines = $temp$lines;
																						lineno = $temp$lineno;
																						positions = $temp$positions;
																						normals = $temp$normals;
																						uvs = $temp$uvs;
																						groups = $temp$groups;
																						object_ = $temp$object_;
																						material_ = $temp$material_;
																						groups_ = $temp$groups_;
																						faceElements = $temp$faceElements;
																						lineElements = $temp$lineElements;
																						pointsElements = $temp$pointsElements;
																						currentSmoothingGroup = $temp$currentSmoothingGroup;
																						continue parseHelp;
																					} else {
																						return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'No material name');
																					}
																				case 's':
																					var rest = _v10.b;
																					var newSmoothingGroup = function () {
																						if (rest.b && (!rest.b.b)) {
																							if (rest.a === 'off') {
																								return 0;
																							} else {
																								var numStr = rest.a;
																								return A2(
																									$elm$core$Maybe$withDefault,
																									0,
																									$elm$core$String$toInt(numStr));
																							}
																						} else {
																							return 0;
																						}
																					}();
																					var $temp$units = units,
																						$temp$lines = remainingLines,
																						$temp$lineno = lineno + 1,
																						$temp$positions = positions,
																						$temp$normals = normals,
																						$temp$uvs = uvs,
																						$temp$groups = A8($w0rm$elm_obj_file$Obj$Internal$Parse$addNonEmptyGroup, object_, material_, groups_, currentSmoothingGroup, faceElements, _List_Nil, _List_Nil, groups),
																						$temp$object_ = object_,
																						$temp$material_ = material_,
																						$temp$groups_ = groups_,
																						$temp$faceElements = _List_Nil,
																						$temp$lineElements = lineElements,
																						$temp$pointsElements = pointsElements,
																						$temp$currentSmoothingGroup = newSmoothingGroup;
																					units = $temp$units;
																					lines = $temp$lines;
																					lineno = $temp$lineno;
																					positions = $temp$positions;
																					normals = $temp$normals;
																					uvs = $temp$uvs;
																					groups = $temp$groups;
																					object_ = $temp$object_;
																					material_ = $temp$material_;
																					groups_ = $temp$groups_;
																					faceElements = $temp$faceElements;
																					lineElements = $temp$lineElements;
																					pointsElements = $temp$pointsElements;
																					currentSmoothingGroup = $temp$currentSmoothingGroup;
																					continue parseHelp;
																				case 'l':
																					var _v15 = A3($w0rm$elm_obj_file$Obj$Internal$Parse$parseLineElements, lineno, lines, lineElements);
																					if (!_v15.$) {
																						var _v16 = _v15.a;
																						var newLineno = _v16.a;
																						var newLines = _v16.b;
																						var newLineElements = _v16.c;
																						var $temp$units = units,
																							$temp$lines = newLines,
																							$temp$lineno = newLineno,
																							$temp$positions = positions,
																							$temp$normals = normals,
																							$temp$uvs = uvs,
																							$temp$groups = groups,
																							$temp$object_ = object_,
																							$temp$material_ = material_,
																							$temp$groups_ = groups_,
																							$temp$faceElements = faceElements,
																							$temp$lineElements = newLineElements,
																							$temp$pointsElements = pointsElements,
																							$temp$currentSmoothingGroup = currentSmoothingGroup;
																						units = $temp$units;
																						lines = $temp$lines;
																						lineno = $temp$lineno;
																						positions = $temp$positions;
																						normals = $temp$normals;
																						uvs = $temp$uvs;
																						groups = $temp$groups;
																						object_ = $temp$object_;
																						material_ = $temp$material_;
																						groups_ = $temp$groups_;
																						faceElements = $temp$faceElements;
																						lineElements = $temp$lineElements;
																						pointsElements = $temp$pointsElements;
																						currentSmoothingGroup = $temp$currentSmoothingGroup;
																						continue parseHelp;
																					} else {
																						var err = _v15.a;
																						return $elm$core$Result$Err(err);
																					}
																				case 'p':
																					var _v17 = A3($w0rm$elm_obj_file$Obj$Internal$Parse$parsePointsElements, lineno, lines, pointsElements);
																					if (!_v17.$) {
																						var _v18 = _v17.a;
																						var newLineno = _v18.a;
																						var newLines = _v18.b;
																						var newPointsElements = _v18.c;
																						var $temp$units = units,
																							$temp$lines = newLines,
																							$temp$lineno = newLineno,
																							$temp$positions = positions,
																							$temp$normals = normals,
																							$temp$uvs = uvs,
																							$temp$groups = groups,
																							$temp$object_ = object_,
																							$temp$material_ = material_,
																							$temp$groups_ = groups_,
																							$temp$faceElements = faceElements,
																							$temp$lineElements = lineElements,
																							$temp$pointsElements = newPointsElements,
																							$temp$currentSmoothingGroup = currentSmoothingGroup;
																						units = $temp$units;
																						lines = $temp$lines;
																						lineno = $temp$lineno;
																						positions = $temp$positions;
																						normals = $temp$normals;
																						uvs = $temp$uvs;
																						groups = $temp$groups;
																						object_ = $temp$object_;
																						material_ = $temp$material_;
																						groups_ = $temp$groups_;
																						faceElements = $temp$faceElements;
																						lineElements = $temp$lineElements;
																						pointsElements = $temp$pointsElements;
																						currentSmoothingGroup = $temp$currentSmoothingGroup;
																						continue parseHelp;
																					} else {
																						var err = _v17.a;
																						return $elm$core$Result$Err(err);
																					}
																				case '':
																					var $temp$units = units,
																						$temp$lines = remainingLines,
																						$temp$lineno = lineno + 1,
																						$temp$positions = positions,
																						$temp$normals = normals,
																						$temp$uvs = uvs,
																						$temp$groups = groups,
																						$temp$object_ = object_,
																						$temp$material_ = material_,
																						$temp$groups_ = groups_,
																						$temp$faceElements = faceElements,
																						$temp$lineElements = lineElements,
																						$temp$pointsElements = pointsElements,
																						$temp$currentSmoothingGroup = currentSmoothingGroup;
																					units = $temp$units;
																					lines = $temp$lines;
																					lineno = $temp$lineno;
																					positions = $temp$positions;
																					normals = $temp$normals;
																					uvs = $temp$uvs;
																					groups = $temp$groups;
																					object_ = $temp$object_;
																					material_ = $temp$material_;
																					groups_ = $temp$groups_;
																					faceElements = $temp$faceElements;
																					lineElements = $temp$lineElements;
																					pointsElements = $temp$pointsElements;
																					currentSmoothingGroup = $temp$currentSmoothingGroup;
																					continue parseHelp;
																				default:
																					var command = _v10.a;
																					if ((A2($elm$core$String$left, 1, command) === '#') || A2($elm$core$List$member, command, $w0rm$elm_obj_file$Obj$Internal$Parse$skipCommands)) {
																						var $temp$units = units,
																							$temp$lines = remainingLines,
																							$temp$lineno = lineno + 1,
																							$temp$positions = positions,
																							$temp$normals = normals,
																							$temp$uvs = uvs,
																							$temp$groups = groups,
																							$temp$object_ = object_,
																							$temp$material_ = material_,
																							$temp$groups_ = groups_,
																							$temp$faceElements = faceElements,
																							$temp$lineElements = lineElements,
																							$temp$pointsElements = pointsElements,
																							$temp$currentSmoothingGroup = currentSmoothingGroup;
																						units = $temp$units;
																						lines = $temp$lines;
																						lineno = $temp$lineno;
																						positions = $temp$positions;
																						normals = $temp$normals;
																						uvs = $temp$uvs;
																						groups = $temp$groups;
																						object_ = $temp$object_;
																						material_ = $temp$material_;
																						groups_ = $temp$groups_;
																						faceElements = $temp$faceElements;
																						lineElements = $temp$lineElements;
																						pointsElements = $temp$pointsElements;
																						currentSmoothingGroup = $temp$currentSmoothingGroup;
																						continue parseHelp;
																					} else {
																						return A2(
																							$w0rm$elm_obj_file$Obj$Internal$Parse$formatError,
																							lineno,
																							'Invalid OBJ syntax \u0027' + (($elm$core$String$length(line) > 20) ? (A2($elm$core$String$left, 20, line) + '...\u0027') : (line + '\u0027')));
																					}
																			}
																		} else {
																			var $temp$units = units,
																				$temp$lines = remainingLines,
																				$temp$lineno = lineno + 1,
																				$temp$positions = positions,
																				$temp$normals = normals,
																				$temp$uvs = uvs,
																				$temp$groups = groups,
																				$temp$object_ = object_,
																				$temp$material_ = material_,
																				$temp$groups_ = groups_,
																				$temp$faceElements = faceElements,
																				$temp$lineElements = lineElements,
																				$temp$pointsElements = pointsElements,
																				$temp$currentSmoothingGroup = currentSmoothingGroup;
																			units = $temp$units;
																			lines = $temp$lines;
																			lineno = $temp$lineno;
																			positions = $temp$positions;
																			normals = $temp$normals;
																			uvs = $temp$uvs;
																			groups = $temp$groups;
																			object_ = $temp$object_;
																			material_ = $temp$material_;
																			groups_ = $temp$groups_;
																			faceElements = $temp$faceElements;
																			lineElements = $temp$lineElements;
																			pointsElements = $temp$pointsElements;
																			currentSmoothingGroup = $temp$currentSmoothingGroup;
																			continue parseHelp;
																		}
																}
															} else {
																var positionsArray = $elm$core$Array$fromList(
																	$elm$core$List$reverse(positions));
																var fullGroups = A8($w0rm$elm_obj_file$Obj$Internal$Parse$addNonEmptyGroup, object_, material_, groups_, currentSmoothingGroup, faceElements, lineElements, pointsElements, groups);
																return $elm$core$Result$Ok(
																	_Utils_Tuple2(
																		{
																			bO: $w0rm$elm_obj_file$Obj$Internal$IndexMap$empty(
																				$elm$core$Array$length(positionsArray)),
																			fo: fullGroups,
																			gj: $elm$core$Array$fromList(
																				$elm$core$List$reverse(normals)),
																			gt: positionsArray,
																			cA: $elm$core$Array$fromList(
																				$elm$core$List$reverse(uvs))
																		},
																		fullGroups));
															}
														}
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $w0rm$elm_obj_file$Obj$Internal$Parse$parse = F2(
	function (units, content) {
		return $w0rm$elm_obj_file$Obj$Internal$Parse$parseHelp(units)(
			$elm$core$String$lines(content))(1)(_List_Nil)(_List_Nil)(_List_Nil)(_List_Nil)($elm$core$Maybe$Nothing)($elm$core$Maybe$Nothing)(
			_List_fromArray(
				['default']))(_List_Nil)(_List_Nil)(_List_Nil)(0);
	});
var $w0rm$elm_obj_file$Obj$Decode$decodeString = F3(
	function (units, _v0, content) {
		var decode = _v0;
		var unitsFn = function (n) {
			return $ianmackenzie$elm_units$Length$inMeters(
				units(n));
		};
		var _v1 = A2($w0rm$elm_obj_file$Obj$Internal$Parse$parse, unitsFn, content);
		if (!_v1.$) {
			var _v2 = _v1.a;
			var vertexData = _v2.a;
			var groups = _v2.b;
			return A3(decode, vertexData, _List_Nil, groups);
		} else {
			var err = _v1.a;
			return $elm$core$Result$Err(err);
		}
	});
var $w0rm$elm_obj_file$Obj$Decode$Decoder = $elm$core$Basics$identity;
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $w0rm$elm_obj_file$Obj$Decode$map = F2(
	function (fn, _v0) {
		var decoder = _v0;
		return F3(
			function (vertexData, filters, elements) {
				return A2(
					$elm$core$Result$map,
					fn,
					A3(decoder, vertexData, filters, elements));
			});
	});
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Length$meters = function (numMeters) {
	return numMeters;
};
var $elm$http$Http$stringResolver = A2(_Http_expect, '', $elm$core$Basics$identity);
var $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyMesh = {$: 0};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces = 0;
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormalsAndUvs = F4(
	function (a, b, c, d) {
		return {$: 6, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$linear_algebra$Math$Vector3$fromRecord = _MJS_v3fromRecord;
var $ianmackenzie$elm_geometry$Point3d$unwrap = function (_v0) {
	var pointCoordinates = _v0;
	return pointCoordinates;
};
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3 = function (point) {
	return $elm_explorations$linear_algebra$Math$Vector3$fromRecord(
		$ianmackenzie$elm_geometry$Point3d$unwrap(point));
};
var $ianmackenzie$elm_geometry$Vector3d$unwrap = function (_v0) {
	var givenComponents = _v0;
	return givenComponents;
};
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3 = function (vector) {
	return $elm_explorations$linear_algebra$Math$Vector3$fromRecord(
		$ianmackenzie$elm_geometry$Vector3d$unwrap(vector));
};
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectSmoothTextured = F2(
	function (_v0, accumulated) {
		var uv = _v0._;
		var normal = _v0.c8;
		var position = _v0.gs;
		var _v1 = uv;
		var u = _v1.a;
		var v = _v1.b;
		return A2(
			$elm$core$List$cons,
			{
				c8: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(normal),
				gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(position),
				_: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, u, v)
			},
			accumulated);
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices = function (_v0) {
	var mesh = _v0;
	return mesh.O;
};
var $elm_explorations$webgl$WebGL$MeshIndexed3 = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$indexedTriangles = $elm_explorations$webgl$WebGL$MeshIndexed3(
	{e5: 1, fx: 3, ga: 4});
var $elm_explorations$linear_algebra$Math$Vector3$getX = _MJS_v3getX;
var $elm_explorations$linear_algebra$Math$Vector3$getY = _MJS_v3getY;
var $elm_explorations$linear_algebra$Math$Vector3$getZ = _MJS_v3getZ;
var $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d = $elm$core$Basics$identity;
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema = function (given) {
	var _v0 = given.f5;
	var z2 = _v0;
	var _v1 = given.f8;
	var z1 = _v1;
	var _v2 = given.f4;
	var y2 = _v2;
	var _v3 = given.f7;
	var y1 = _v3;
	var _v4 = given.f3;
	var x2 = _v4;
	var _v5 = given.f6;
	var x1 = _v5;
	return {
		f3: A2($elm$core$Basics$max, x1, x2),
		f4: A2($elm$core$Basics$max, y1, y2),
		f5: A2($elm$core$Basics$max, z1, z2),
		f6: A2($elm$core$Basics$min, x1, x2),
		f7: A2($elm$core$Basics$min, y1, y2),
		f8: A2($elm$core$Basics$min, z1, z2)
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBoundsHelp = F7(
	function (minX, maxX, minY, maxY, minZ, maxZ, remaining) {
		vertexBoundsHelp:
		while (true) {
			if (remaining.b) {
				var next = remaining.a;
				var rest = remaining.b;
				var z = $elm_explorations$linear_algebra$Math$Vector3$getZ(next.gs);
				var y = $elm_explorations$linear_algebra$Math$Vector3$getY(next.gs);
				var x = $elm_explorations$linear_algebra$Math$Vector3$getX(next.gs);
				var $temp$minX = A2($elm$core$Basics$min, minX, x),
					$temp$maxX = A2($elm$core$Basics$max, maxX, x),
					$temp$minY = A2($elm$core$Basics$min, minY, y),
					$temp$maxY = A2($elm$core$Basics$max, maxY, y),
					$temp$minZ = A2($elm$core$Basics$min, minZ, z),
					$temp$maxZ = A2($elm$core$Basics$max, maxZ, z),
					$temp$remaining = rest;
				minX = $temp$minX;
				maxX = $temp$maxX;
				minY = $temp$minY;
				maxY = $temp$maxY;
				minZ = $temp$minZ;
				maxZ = $temp$maxZ;
				remaining = $temp$remaining;
				continue vertexBoundsHelp;
			} else {
				return $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema(
					{f3: maxX, f4: maxY, f5: maxZ, f6: minX, f7: minY, f8: minZ});
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBounds = F2(
	function (first, rest) {
		var z = $elm_explorations$linear_algebra$Math$Vector3$getZ(first.gs);
		var y = $elm_explorations$linear_algebra$Math$Vector3$getY(first.gs);
		var x = $elm_explorations$linear_algebra$Math$Vector3$getX(first.gs);
		return A7($ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBoundsHelp, x, x, y, y, z, z, rest);
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices = function (_v0) {
	var mesh = _v0;
	return mesh.bB;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$texturedFaces = function (givenMesh) {
	var collectedVertices = A3(
		$elm$core$Array$foldr,
		$ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectSmoothTextured,
		_List_Nil,
		$ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices(givenMesh));
	if (!collectedVertices.b) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyMesh;
	} else {
		var first = collectedVertices.a;
		var rest = collectedVertices.b;
		var webGLMesh = A2(
			$elm_explorations$webgl$WebGL$indexedTriangles,
			collectedVertices,
			$ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices(givenMesh));
		var bounds = A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBounds, first, rest);
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormalsAndUvs, bounds, givenMesh, webGLMesh, 0);
	}
};
var $ianmackenzie$elm_geometry$Geometry$Types$Vector3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector3d$cross = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {n: (v1.o * v2.p) - (v1.p * v2.o), o: (v1.p * v2.n) - (v1.n * v2.p), p: (v1.n * v2.o) - (v1.o * v2.n)};
	});
var $ianmackenzie$elm_geometry$Vector3d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		return {n: p2.n - p1.n, o: p2.o - p1.o, p: p2.p - p1.p};
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $ianmackenzie$elm_units$Quantity$float = function (value) {
	return value;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $ianmackenzie$elm_geometry$Vector3d$zero = {n: 0, o: 0, p: 0};
var $ianmackenzie$elm_geometry$Vector3d$scaleTo = F2(
	function (_v0, _v1) {
		var q = _v0;
		var v = _v1;
		var largestComponent = A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.n),
			A2(
				$elm$core$Basics$max,
				$elm$core$Basics$abs(v.o),
				$elm$core$Basics$abs(v.p)));
		if (!largestComponent) {
			return $ianmackenzie$elm_geometry$Vector3d$zero;
		} else {
			var scaledZ = v.p / largestComponent;
			var scaledY = v.o / largestComponent;
			var scaledX = v.n / largestComponent;
			var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
			return {n: (q * scaledX) / scaledLength, o: (q * scaledY) / scaledLength, p: (q * scaledZ) / scaledLength};
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$normalize = $ianmackenzie$elm_geometry$Vector3d$scaleTo(
	$ianmackenzie$elm_units$Quantity$float(1));
var $ianmackenzie$elm_geometry$Point3d$placeIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.gl;
		var p0 = _v2;
		var _v3 = frame.g_;
		var k = _v3;
		var _v4 = frame.gY;
		var j = _v4;
		var _v5 = frame.gX;
		var i = _v5;
		return {n: ((p0.n + (p.n * i.n)) + (p.o * j.n)) + (p.p * k.n), o: ((p0.o + (p.n * i.o)) + (p.o * j.o)) + (p.p * k.o), p: ((p0.p + (p.n * i.p)) + (p.o * j.p)) + (p.p * k.p)};
	});
var $w0rm$elm_obj_file$Obj$Internal$Faces$addFlatTexturedFaces = function (frame) {
	return function (vertexData) {
		return function (elementVertices) {
			return function (pendingFaces) {
				return function (pos0) {
					return function (prevPos) {
						return function (uv0) {
							return function (prevUV) {
								return function (outVertices) {
									return function (outIdx) {
										return function (outFaceIndices) {
											addFlatTexturedFaces:
											while (true) {
												if (elementVertices.b) {
													var vN = elementVertices.a;
													var remainingElementVertices = elementVertices.b;
													var _v1 = A2($elm$core$Array$get, vN.gm, vertexData.gt);
													if (!_v1.$) {
														var posN = _v1.a;
														var _v2 = A2($elm$core$Array$get, vN._, vertexData.cA);
														if (!_v2.$) {
															var uvN = _v2.a;
															var posNInFrame = A2($ianmackenzie$elm_geometry$Point3d$placeIn, frame, posN);
															var triangleNormal = $ianmackenzie$elm_geometry$Vector3d$normalize(
																A2(
																	$ianmackenzie$elm_geometry$Vector3d$cross,
																	A2($ianmackenzie$elm_geometry$Vector3d$from, pos0, prevPos),
																	A2($ianmackenzie$elm_geometry$Vector3d$from, pos0, posNInFrame)));
															var $temp$frame = frame,
																$temp$vertexData = vertexData,
																$temp$elementVertices = remainingElementVertices,
																$temp$pendingFaces = pendingFaces,
																$temp$pos0 = pos0,
																$temp$prevPos = posNInFrame,
																$temp$uv0 = uv0,
																$temp$prevUV = uvN,
																$temp$outVertices = A2(
																$elm$core$List$cons,
																{c8: triangleNormal, gs: pos0, _: uv0},
																A2(
																	$elm$core$List$cons,
																	{c8: triangleNormal, gs: prevPos, _: prevUV},
																	A2(
																		$elm$core$List$cons,
																		{c8: triangleNormal, gs: posNInFrame, _: uvN},
																		outVertices))),
																$temp$outIdx = outIdx + 3,
																$temp$outFaceIndices = A2(
																$elm$core$List$cons,
																_Utils_Tuple3(outIdx, outIdx + 1, outIdx + 2),
																outFaceIndices);
															frame = $temp$frame;
															vertexData = $temp$vertexData;
															elementVertices = $temp$elementVertices;
															pendingFaces = $temp$pendingFaces;
															pos0 = $temp$pos0;
															prevPos = $temp$prevPos;
															uv0 = $temp$uv0;
															prevUV = $temp$prevUV;
															outVertices = $temp$outVertices;
															outIdx = $temp$outIdx;
															outFaceIndices = $temp$outFaceIndices;
															continue addFlatTexturedFaces;
														} else {
															var $temp$frame = frame,
																$temp$vertexData = vertexData,
																$temp$elementVertices = remainingElementVertices,
																$temp$pendingFaces = pendingFaces,
																$temp$pos0 = pos0,
																$temp$prevPos = prevPos,
																$temp$uv0 = uv0,
																$temp$prevUV = prevUV,
																$temp$outVertices = outVertices,
																$temp$outIdx = outIdx,
																$temp$outFaceIndices = outFaceIndices;
															frame = $temp$frame;
															vertexData = $temp$vertexData;
															elementVertices = $temp$elementVertices;
															pendingFaces = $temp$pendingFaces;
															pos0 = $temp$pos0;
															prevPos = $temp$prevPos;
															uv0 = $temp$uv0;
															prevUV = $temp$prevUV;
															outVertices = $temp$outVertices;
															outIdx = $temp$outIdx;
															outFaceIndices = $temp$outFaceIndices;
															continue addFlatTexturedFaces;
														}
													} else {
														var $temp$frame = frame,
															$temp$vertexData = vertexData,
															$temp$elementVertices = remainingElementVertices,
															$temp$pendingFaces = pendingFaces,
															$temp$pos0 = pos0,
															$temp$prevPos = prevPos,
															$temp$uv0 = uv0,
															$temp$prevUV = prevUV,
															$temp$outVertices = outVertices,
															$temp$outIdx = outIdx,
															$temp$outFaceIndices = outFaceIndices;
														frame = $temp$frame;
														vertexData = $temp$vertexData;
														elementVertices = $temp$elementVertices;
														pendingFaces = $temp$pendingFaces;
														pos0 = $temp$pos0;
														prevPos = $temp$prevPos;
														uv0 = $temp$uv0;
														prevUV = $temp$prevUV;
														outVertices = $temp$outVertices;
														outIdx = $temp$outIdx;
														outFaceIndices = $temp$outFaceIndices;
														continue addFlatTexturedFaces;
													}
												} else {
													if (pendingFaces.b) {
														var _v4 = pendingFaces.a;
														var nextVertices = _v4.c;
														var remainingFaces = pendingFaces.b;
														if (nextVertices.b && nextVertices.b.b) {
															var v0 = nextVertices.a;
															var _v6 = nextVertices.b;
															var v1 = _v6.a;
															var remainingElementVertices = _v6.b;
															var _v7 = A2($elm$core$Array$get, v0.gm, vertexData.gt);
															if (!_v7.$) {
																var pos0New = _v7.a;
																var _v8 = A2($elm$core$Array$get, v1.gm, vertexData.gt);
																if (!_v8.$) {
																	var pos1New = _v8.a;
																	var _v9 = A2($elm$core$Array$get, v0._, vertexData.cA);
																	if (!_v9.$) {
																		var uv0New = _v9.a;
																		var _v10 = A2($elm$core$Array$get, v1._, vertexData.cA);
																		if (!_v10.$) {
																			var uv1New = _v10.a;
																			var pos1InFrame = A2($ianmackenzie$elm_geometry$Point3d$placeIn, frame, pos1New);
																			var pos0InFrame = A2($ianmackenzie$elm_geometry$Point3d$placeIn, frame, pos0New);
																			var $temp$frame = frame,
																				$temp$vertexData = vertexData,
																				$temp$elementVertices = remainingElementVertices,
																				$temp$pendingFaces = remainingFaces,
																				$temp$pos0 = pos0InFrame,
																				$temp$prevPos = pos1InFrame,
																				$temp$uv0 = uv0New,
																				$temp$prevUV = uv1New,
																				$temp$outVertices = outVertices,
																				$temp$outIdx = outIdx,
																				$temp$outFaceIndices = outFaceIndices;
																			frame = $temp$frame;
																			vertexData = $temp$vertexData;
																			elementVertices = $temp$elementVertices;
																			pendingFaces = $temp$pendingFaces;
																			pos0 = $temp$pos0;
																			prevPos = $temp$prevPos;
																			uv0 = $temp$uv0;
																			prevUV = $temp$prevUV;
																			outVertices = $temp$outVertices;
																			outIdx = $temp$outIdx;
																			outFaceIndices = $temp$outFaceIndices;
																			continue addFlatTexturedFaces;
																		} else {
																			var $temp$frame = frame,
																				$temp$vertexData = vertexData,
																				$temp$elementVertices = _List_Nil,
																				$temp$pendingFaces = remainingFaces,
																				$temp$pos0 = pos0,
																				$temp$prevPos = prevPos,
																				$temp$uv0 = uv0,
																				$temp$prevUV = prevUV,
																				$temp$outVertices = outVertices,
																				$temp$outIdx = outIdx,
																				$temp$outFaceIndices = outFaceIndices;
																			frame = $temp$frame;
																			vertexData = $temp$vertexData;
																			elementVertices = $temp$elementVertices;
																			pendingFaces = $temp$pendingFaces;
																			pos0 = $temp$pos0;
																			prevPos = $temp$prevPos;
																			uv0 = $temp$uv0;
																			prevUV = $temp$prevUV;
																			outVertices = $temp$outVertices;
																			outIdx = $temp$outIdx;
																			outFaceIndices = $temp$outFaceIndices;
																			continue addFlatTexturedFaces;
																		}
																	} else {
																		var $temp$frame = frame,
																			$temp$vertexData = vertexData,
																			$temp$elementVertices = _List_Nil,
																			$temp$pendingFaces = remainingFaces,
																			$temp$pos0 = pos0,
																			$temp$prevPos = prevPos,
																			$temp$uv0 = uv0,
																			$temp$prevUV = prevUV,
																			$temp$outVertices = outVertices,
																			$temp$outIdx = outIdx,
																			$temp$outFaceIndices = outFaceIndices;
																		frame = $temp$frame;
																		vertexData = $temp$vertexData;
																		elementVertices = $temp$elementVertices;
																		pendingFaces = $temp$pendingFaces;
																		pos0 = $temp$pos0;
																		prevPos = $temp$prevPos;
																		uv0 = $temp$uv0;
																		prevUV = $temp$prevUV;
																		outVertices = $temp$outVertices;
																		outIdx = $temp$outIdx;
																		outFaceIndices = $temp$outFaceIndices;
																		continue addFlatTexturedFaces;
																	}
																} else {
																	var $temp$frame = frame,
																		$temp$vertexData = vertexData,
																		$temp$elementVertices = _List_Nil,
																		$temp$pendingFaces = remainingFaces,
																		$temp$pos0 = pos0,
																		$temp$prevPos = prevPos,
																		$temp$uv0 = uv0,
																		$temp$prevUV = prevUV,
																		$temp$outVertices = outVertices,
																		$temp$outIdx = outIdx,
																		$temp$outFaceIndices = outFaceIndices;
																	frame = $temp$frame;
																	vertexData = $temp$vertexData;
																	elementVertices = $temp$elementVertices;
																	pendingFaces = $temp$pendingFaces;
																	pos0 = $temp$pos0;
																	prevPos = $temp$prevPos;
																	uv0 = $temp$uv0;
																	prevUV = $temp$prevUV;
																	outVertices = $temp$outVertices;
																	outIdx = $temp$outIdx;
																	outFaceIndices = $temp$outFaceIndices;
																	continue addFlatTexturedFaces;
																}
															} else {
																var $temp$frame = frame,
																	$temp$vertexData = vertexData,
																	$temp$elementVertices = _List_Nil,
																	$temp$pendingFaces = remainingFaces,
																	$temp$pos0 = pos0,
																	$temp$prevPos = prevPos,
																	$temp$uv0 = uv0,
																	$temp$prevUV = prevUV,
																	$temp$outVertices = outVertices,
																	$temp$outIdx = outIdx,
																	$temp$outFaceIndices = outFaceIndices;
																frame = $temp$frame;
																vertexData = $temp$vertexData;
																elementVertices = $temp$elementVertices;
																pendingFaces = $temp$pendingFaces;
																pos0 = $temp$pos0;
																prevPos = $temp$prevPos;
																uv0 = $temp$uv0;
																prevUV = $temp$prevUV;
																outVertices = $temp$outVertices;
																outIdx = $temp$outIdx;
																outFaceIndices = $temp$outFaceIndices;
																continue addFlatTexturedFaces;
															}
														} else {
															var $temp$frame = frame,
																$temp$vertexData = vertexData,
																$temp$elementVertices = _List_Nil,
																$temp$pendingFaces = remainingFaces,
																$temp$pos0 = pos0,
																$temp$prevPos = prevPos,
																$temp$uv0 = uv0,
																$temp$prevUV = prevUV,
																$temp$outVertices = outVertices,
																$temp$outIdx = outIdx,
																$temp$outFaceIndices = outFaceIndices;
															frame = $temp$frame;
															vertexData = $temp$vertexData;
															elementVertices = $temp$elementVertices;
															pendingFaces = $temp$pendingFaces;
															pos0 = $temp$pos0;
															prevPos = $temp$prevPos;
															uv0 = $temp$uv0;
															prevUV = $temp$prevUV;
															outVertices = $temp$outVertices;
															outIdx = $temp$outIdx;
															outFaceIndices = $temp$outFaceIndices;
															continue addFlatTexturedFaces;
														}
													} else {
														return _Utils_Tuple2(outVertices, outFaceIndices);
													}
												}
											}
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$get = F3(
	function (p, smoothingGroup, _v0) {
		var lookup = _v0.a;
		var arr = _v0.b;
		var _v1 = A2($elm$core$Array$get, p, arr);
		if (_v1.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var entries = _v1.a;
			return A3(lookup, smoothingGroup, entries, $elm$core$Maybe$Nothing);
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$IndexMap$lookup2 = F3(
	function (key1, key2, list) {
		lookup2:
		while (true) {
			if ((list.b && list.b.b) && list.b.b.b) {
				var k1 = list.a;
				var _v1 = list.b;
				var k2 = _v1.a;
				var _v2 = _v1.b;
				var result = _v2.a;
				var rest = _v2.b;
				if ((!(key1 - k1)) && (!(key2 - k2))) {
					return result;
				} else {
					var $temp$key1 = key1,
						$temp$key2 = key2,
						$temp$list = rest;
					key1 = $temp$key1;
					key2 = $temp$key2;
					list = $temp$list;
					continue lookup2;
				}
			} else {
				return -1;
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$IndexMap$get3 = F4(
	function (p, key1, key2, _v0) {
		var arr = _v0;
		var _v1 = A2($elm$core$Array$get, p, arr);
		if (!_v1.$) {
			var list = _v1.a;
			return A3($w0rm$elm_obj_file$Obj$Internal$IndexMap$lookup2, key1, key2, list);
		} else {
			return -1;
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$MeshHelpers$groupIndices = F3(
	function (p1, indices, outFaceIndices) {
		groupIndices:
		while (true) {
			if (indices.b) {
				var p2 = indices.a;
				var rest = indices.b;
				if (rest.b) {
					var p3 = rest.a;
					var $temp$p1 = p1,
						$temp$indices = rest,
						$temp$outFaceIndices = A2(
						$elm$core$List$cons,
						_Utils_Tuple3(p1, p2, p3),
						outFaceIndices);
					p1 = $temp$p1;
					indices = $temp$indices;
					outFaceIndices = $temp$outFaceIndices;
					continue groupIndices;
				} else {
					return outFaceIndices;
				}
			} else {
				return outFaceIndices;
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $w0rm$elm_obj_file$Obj$Internal$IndexMap$insert3 = F5(
	function (p, key1, key2, index, _v0) {
		var arr = _v0;
		var existing = function () {
			var _v1 = A2($elm$core$Array$get, p, arr);
			if (!_v1.$) {
				var list = _v1.a;
				return list;
			} else {
				return _List_Nil;
			}
		}();
		return A3(
			$elm$core$Array$set,
			p,
			A2(
				$elm$core$List$cons,
				key1,
				A2(
					$elm$core$List$cons,
					key2,
					A2($elm$core$List$cons, index, existing))),
			arr);
	});
var $ianmackenzie$elm_geometry$Vector3d$placeIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var v = _v1;
		var _v2 = frame.g_;
		var k = _v2;
		var _v3 = frame.gY;
		var j = _v3;
		var _v4 = frame.gX;
		var i = _v4;
		return {n: ((i.n * v.n) + (j.n * v.o)) + (k.n * v.p), o: ((i.o * v.n) + (j.o * v.o)) + (k.o * v.p), p: ((i.p * v.n) + (j.p * v.o)) + (k.p * v.p)};
	});
var $w0rm$elm_obj_file$Obj$Internal$Faces$addSmoothTexturedFaces = function (frame) {
	return function (vertexData) {
		return function (smoothNormals) {
			return function (smoothingGroup) {
				return function (elementVertices) {
					return function (pendingFaces) {
						return function (smoothIndexMap) {
							return function (outVertices) {
								return function (outIdx) {
									return function (outIndices) {
										return function (outFaceIndices) {
											addSmoothTexturedFaces:
											while (true) {
												if (!elementVertices.b) {
													var newFaceIndices = function () {
														if (outIndices.b) {
															var i1 = outIndices.a;
															var remainingIndices = outIndices.b;
															return A3($w0rm$elm_obj_file$Obj$Internal$MeshHelpers$groupIndices, i1, remainingIndices, outFaceIndices);
														} else {
															return outFaceIndices;
														}
													}();
													if (pendingFaces.b) {
														var _v2 = pendingFaces.a;
														var newSmoothingGroup = _v2.a;
														var _v3 = _v2.b;
														var newElementVertices = _v3.c;
														var remainingPendingFaces = pendingFaces.b;
														var $temp$frame = frame,
															$temp$vertexData = vertexData,
															$temp$smoothNormals = smoothNormals,
															$temp$smoothingGroup = newSmoothingGroup,
															$temp$elementVertices = newElementVertices,
															$temp$pendingFaces = remainingPendingFaces,
															$temp$smoothIndexMap = smoothIndexMap,
															$temp$outVertices = outVertices,
															$temp$outIdx = outIdx,
															$temp$outIndices = _List_Nil,
															$temp$outFaceIndices = newFaceIndices;
														frame = $temp$frame;
														vertexData = $temp$vertexData;
														smoothNormals = $temp$smoothNormals;
														smoothingGroup = $temp$smoothingGroup;
														elementVertices = $temp$elementVertices;
														pendingFaces = $temp$pendingFaces;
														smoothIndexMap = $temp$smoothIndexMap;
														outVertices = $temp$outVertices;
														outIdx = $temp$outIdx;
														outIndices = $temp$outIndices;
														outFaceIndices = $temp$outFaceIndices;
														continue addSmoothTexturedFaces;
													} else {
														return _Utils_Tuple3(outVertices, outIdx, newFaceIndices);
													}
												} else {
													var uv = elementVertices.a._;
													var p = elementVertices.a.gm;
													var remainingElementVertices = elementVertices.b;
													var existingIdx = A4($w0rm$elm_obj_file$Obj$Internal$IndexMap$get3, p, smoothingGroup, uv, smoothIndexMap);
													if (_Utils_cmp(existingIdx, -1) > 0) {
														var $temp$frame = frame,
															$temp$vertexData = vertexData,
															$temp$smoothNormals = smoothNormals,
															$temp$smoothingGroup = smoothingGroup,
															$temp$elementVertices = remainingElementVertices,
															$temp$pendingFaces = pendingFaces,
															$temp$smoothIndexMap = smoothIndexMap,
															$temp$outVertices = outVertices,
															$temp$outIdx = outIdx,
															$temp$outIndices = A2($elm$core$List$cons, existingIdx, outIndices),
															$temp$outFaceIndices = outFaceIndices;
														frame = $temp$frame;
														vertexData = $temp$vertexData;
														smoothNormals = $temp$smoothNormals;
														smoothingGroup = $temp$smoothingGroup;
														elementVertices = $temp$elementVertices;
														pendingFaces = $temp$pendingFaces;
														smoothIndexMap = $temp$smoothIndexMap;
														outVertices = $temp$outVertices;
														outIdx = $temp$outIdx;
														outIndices = $temp$outIndices;
														outFaceIndices = $temp$outFaceIndices;
														continue addSmoothTexturedFaces;
													} else {
														var _v5 = A3($w0rm$elm_obj_file$Obj$Internal$SmoothNormals$get, p, smoothingGroup, smoothNormals);
														if (!_v5.$) {
															var normal = _v5.a;
															var _v6 = A2($elm$core$Array$get, uv, vertexData.cA);
															if (!_v6.$) {
																var uvCoord = _v6.a;
																var _v7 = A2($elm$core$Array$get, p, vertexData.gt);
																if (!_v7.$) {
																	var position = _v7.a;
																	var $temp$frame = frame,
																		$temp$vertexData = vertexData,
																		$temp$smoothNormals = smoothNormals,
																		$temp$smoothingGroup = smoothingGroup,
																		$temp$elementVertices = remainingElementVertices,
																		$temp$pendingFaces = pendingFaces,
																		$temp$smoothIndexMap = A5($w0rm$elm_obj_file$Obj$Internal$IndexMap$insert3, p, smoothingGroup, uv, outIdx, smoothIndexMap),
																		$temp$outVertices = A2(
																		$elm$core$List$cons,
																		{
																			c8: A2($ianmackenzie$elm_geometry$Vector3d$placeIn, frame, normal),
																			gs: A2($ianmackenzie$elm_geometry$Point3d$placeIn, frame, position),
																			_: uvCoord
																		},
																		outVertices),
																		$temp$outIdx = outIdx + 1,
																		$temp$outIndices = A2($elm$core$List$cons, outIdx, outIndices),
																		$temp$outFaceIndices = outFaceIndices;
																	frame = $temp$frame;
																	vertexData = $temp$vertexData;
																	smoothNormals = $temp$smoothNormals;
																	smoothingGroup = $temp$smoothingGroup;
																	elementVertices = $temp$elementVertices;
																	pendingFaces = $temp$pendingFaces;
																	smoothIndexMap = $temp$smoothIndexMap;
																	outVertices = $temp$outVertices;
																	outIdx = $temp$outIdx;
																	outIndices = $temp$outIndices;
																	outFaceIndices = $temp$outFaceIndices;
																	continue addSmoothTexturedFaces;
																} else {
																	var $temp$frame = frame,
																		$temp$vertexData = vertexData,
																		$temp$smoothNormals = smoothNormals,
																		$temp$smoothingGroup = smoothingGroup,
																		$temp$elementVertices = remainingElementVertices,
																		$temp$pendingFaces = pendingFaces,
																		$temp$smoothIndexMap = smoothIndexMap,
																		$temp$outVertices = outVertices,
																		$temp$outIdx = outIdx,
																		$temp$outIndices = outIndices,
																		$temp$outFaceIndices = outFaceIndices;
																	frame = $temp$frame;
																	vertexData = $temp$vertexData;
																	smoothNormals = $temp$smoothNormals;
																	smoothingGroup = $temp$smoothingGroup;
																	elementVertices = $temp$elementVertices;
																	pendingFaces = $temp$pendingFaces;
																	smoothIndexMap = $temp$smoothIndexMap;
																	outVertices = $temp$outVertices;
																	outIdx = $temp$outIdx;
																	outIndices = $temp$outIndices;
																	outFaceIndices = $temp$outFaceIndices;
																	continue addSmoothTexturedFaces;
																}
															} else {
																var $temp$frame = frame,
																	$temp$vertexData = vertexData,
																	$temp$smoothNormals = smoothNormals,
																	$temp$smoothingGroup = smoothingGroup,
																	$temp$elementVertices = remainingElementVertices,
																	$temp$pendingFaces = pendingFaces,
																	$temp$smoothIndexMap = smoothIndexMap,
																	$temp$outVertices = outVertices,
																	$temp$outIdx = outIdx,
																	$temp$outIndices = outIndices,
																	$temp$outFaceIndices = outFaceIndices;
																frame = $temp$frame;
																vertexData = $temp$vertexData;
																smoothNormals = $temp$smoothNormals;
																smoothingGroup = $temp$smoothingGroup;
																elementVertices = $temp$elementVertices;
																pendingFaces = $temp$pendingFaces;
																smoothIndexMap = $temp$smoothIndexMap;
																outVertices = $temp$outVertices;
																outIdx = $temp$outIdx;
																outIndices = $temp$outIndices;
																outFaceIndices = $temp$outFaceIndices;
																continue addSmoothTexturedFaces;
															}
														} else {
															var $temp$frame = frame,
																$temp$vertexData = vertexData,
																$temp$smoothNormals = smoothNormals,
																$temp$smoothingGroup = smoothingGroup,
																$temp$elementVertices = remainingElementVertices,
																$temp$pendingFaces = pendingFaces,
																$temp$smoothIndexMap = smoothIndexMap,
																$temp$outVertices = outVertices,
																$temp$outIdx = outIdx,
																$temp$outIndices = outIndices,
																$temp$outFaceIndices = outFaceIndices;
															frame = $temp$frame;
															vertexData = $temp$vertexData;
															smoothNormals = $temp$smoothNormals;
															smoothingGroup = $temp$smoothingGroup;
															elementVertices = $temp$elementVertices;
															pendingFaces = $temp$pendingFaces;
															smoothIndexMap = $temp$smoothIndexMap;
															outVertices = $temp$outVertices;
															outIdx = $temp$outIdx;
															outIndices = $temp$outIndices;
															outFaceIndices = $temp$outFaceIndices;
															continue addSmoothTexturedFaces;
														}
													}
												}
											}
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $ianmackenzie$elm_geometry$Direction3d$placeIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var d = _v1;
		var _v2 = frame.g_;
		var k = _v2;
		var _v3 = frame.gY;
		var j = _v3;
		var _v4 = frame.gX;
		var i = _v4;
		return {n: ((i.n * d.n) + (j.n * d.o)) + (k.n * d.p), o: ((i.o * d.n) + (j.o * d.o)) + (k.o * d.p), p: ((i.p * d.n) + (j.p * d.o)) + (k.p * d.p)};
	});
var $ianmackenzie$elm_geometry$Direction3d$toVector = function (_v0) {
	var directionComponents = _v0;
	return directionComponents;
};
var $w0rm$elm_obj_file$Obj$Internal$Faces$addTexturedFaces = function (frame) {
	return function (vertexData) {
		return function (smoothingGroup) {
			return function (lineno) {
				return function (elementVertices) {
					return function (elements) {
						return function (maxIndex) {
							return function (indexMap) {
								return function (outVertices) {
									return function (outIndices) {
										return function (outFaceIndices) {
											return function (outFlatPendingFaces) {
												return function (outSmoothPendingFaces) {
													addTexturedFaces:
													while (true) {
														if (elementVertices.b) {
															var n = elementVertices.a.gc;
															var uv = elementVertices.a._;
															var p = elementVertices.a.gm;
															var remainingVertices = elementVertices.b;
															var idx = A4($w0rm$elm_obj_file$Obj$Internal$IndexMap$get3, p, uv, n, indexMap);
															if (_Utils_cmp(idx, -1) > 0) {
																var $temp$frame = frame,
																	$temp$vertexData = vertexData,
																	$temp$smoothingGroup = smoothingGroup,
																	$temp$lineno = lineno,
																	$temp$elementVertices = remainingVertices,
																	$temp$elements = elements,
																	$temp$maxIndex = maxIndex,
																	$temp$indexMap = indexMap,
																	$temp$outVertices = outVertices,
																	$temp$outIndices = A2($elm$core$List$cons, idx, outIndices),
																	$temp$outFaceIndices = outFaceIndices,
																	$temp$outFlatPendingFaces = outFlatPendingFaces,
																	$temp$outSmoothPendingFaces = outSmoothPendingFaces;
																frame = $temp$frame;
																vertexData = $temp$vertexData;
																smoothingGroup = $temp$smoothingGroup;
																lineno = $temp$lineno;
																elementVertices = $temp$elementVertices;
																elements = $temp$elements;
																maxIndex = $temp$maxIndex;
																indexMap = $temp$indexMap;
																outVertices = $temp$outVertices;
																outIndices = $temp$outIndices;
																outFaceIndices = $temp$outFaceIndices;
																outFlatPendingFaces = $temp$outFlatPendingFaces;
																outSmoothPendingFaces = $temp$outSmoothPendingFaces;
																continue addTexturedFaces;
															} else {
																var _v1 = A2($elm$core$Array$get, p, vertexData.gt);
																if (!_v1.$) {
																	var position = _v1.a;
																	var _v2 = A2($elm$core$Array$get, n, vertexData.gj);
																	if (!_v2.$) {
																		var normal = _v2.a;
																		var _v3 = A2($elm$core$Array$get, uv, vertexData.cA);
																		if (!_v3.$) {
																			var uvCoord = _v3.a;
																			var $temp$frame = frame,
																				$temp$vertexData = vertexData,
																				$temp$smoothingGroup = smoothingGroup,
																				$temp$lineno = lineno,
																				$temp$elementVertices = remainingVertices,
																				$temp$elements = elements,
																				$temp$maxIndex = maxIndex + 1,
																				$temp$indexMap = A5($w0rm$elm_obj_file$Obj$Internal$IndexMap$insert3, p, uv, n, maxIndex + 1, indexMap),
																				$temp$outVertices = A2(
																				$elm$core$List$cons,
																				{
																					c8: $ianmackenzie$elm_geometry$Direction3d$toVector(
																						A2($ianmackenzie$elm_geometry$Direction3d$placeIn, frame, normal)),
																					gs: A2($ianmackenzie$elm_geometry$Point3d$placeIn, frame, position),
																					_: uvCoord
																				},
																				outVertices),
																				$temp$outIndices = A2($elm$core$List$cons, maxIndex + 1, outIndices),
																				$temp$outFaceIndices = outFaceIndices,
																				$temp$outFlatPendingFaces = outFlatPendingFaces,
																				$temp$outSmoothPendingFaces = outSmoothPendingFaces;
																			frame = $temp$frame;
																			vertexData = $temp$vertexData;
																			smoothingGroup = $temp$smoothingGroup;
																			lineno = $temp$lineno;
																			elementVertices = $temp$elementVertices;
																			elements = $temp$elements;
																			maxIndex = $temp$maxIndex;
																			indexMap = $temp$indexMap;
																			outVertices = $temp$outVertices;
																			outIndices = $temp$outIndices;
																			outFaceIndices = $temp$outFaceIndices;
																			outFlatPendingFaces = $temp$outFlatPendingFaces;
																			outSmoothPendingFaces = $temp$outSmoothPendingFaces;
																			continue addTexturedFaces;
																		} else {
																			return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Index out of range');
																		}
																	} else {
																		return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Index out of range');
																	}
																} else {
																	return A2($w0rm$elm_obj_file$Obj$Internal$Parse$formatError, lineno, 'Index out of range');
																}
															}
														} else {
															var newFaceIndices = function () {
																if (outIndices.b) {
																	var p1 = outIndices.a;
																	var remainingIndices = outIndices.b;
																	return A3($w0rm$elm_obj_file$Obj$Internal$MeshHelpers$groupIndices, p1, remainingIndices, outFaceIndices);
																} else {
																	return outFaceIndices;
																}
															}();
															if (elements.b) {
																var newFaceElement = elements.a;
																var newLineno = newFaceElement.a;
																var hasNormals = newFaceElement.b;
																var newElementVertices = newFaceElement.c;
																var remainingElements = elements.b;
																if (hasNormals) {
																	var $temp$frame = frame,
																		$temp$vertexData = vertexData,
																		$temp$smoothingGroup = smoothingGroup,
																		$temp$lineno = newLineno,
																		$temp$elementVertices = newElementVertices,
																		$temp$elements = remainingElements,
																		$temp$maxIndex = maxIndex,
																		$temp$indexMap = indexMap,
																		$temp$outVertices = outVertices,
																		$temp$outIndices = _List_Nil,
																		$temp$outFaceIndices = newFaceIndices,
																		$temp$outFlatPendingFaces = outFlatPendingFaces,
																		$temp$outSmoothPendingFaces = outSmoothPendingFaces;
																	frame = $temp$frame;
																	vertexData = $temp$vertexData;
																	smoothingGroup = $temp$smoothingGroup;
																	lineno = $temp$lineno;
																	elementVertices = $temp$elementVertices;
																	elements = $temp$elements;
																	maxIndex = $temp$maxIndex;
																	indexMap = $temp$indexMap;
																	outVertices = $temp$outVertices;
																	outIndices = $temp$outIndices;
																	outFaceIndices = $temp$outFaceIndices;
																	outFlatPendingFaces = $temp$outFlatPendingFaces;
																	outSmoothPendingFaces = $temp$outSmoothPendingFaces;
																	continue addTexturedFaces;
																} else {
																	if (!smoothingGroup) {
																		var $temp$frame = frame,
																			$temp$vertexData = vertexData,
																			$temp$smoothingGroup = smoothingGroup,
																			$temp$lineno = newLineno,
																			$temp$elementVertices = _List_Nil,
																			$temp$elements = remainingElements,
																			$temp$maxIndex = maxIndex,
																			$temp$indexMap = indexMap,
																			$temp$outVertices = outVertices,
																			$temp$outIndices = _List_Nil,
																			$temp$outFaceIndices = newFaceIndices,
																			$temp$outFlatPendingFaces = A2($elm$core$List$cons, newFaceElement, outFlatPendingFaces),
																			$temp$outSmoothPendingFaces = outSmoothPendingFaces;
																		frame = $temp$frame;
																		vertexData = $temp$vertexData;
																		smoothingGroup = $temp$smoothingGroup;
																		lineno = $temp$lineno;
																		elementVertices = $temp$elementVertices;
																		elements = $temp$elements;
																		maxIndex = $temp$maxIndex;
																		indexMap = $temp$indexMap;
																		outVertices = $temp$outVertices;
																		outIndices = $temp$outIndices;
																		outFaceIndices = $temp$outFaceIndices;
																		outFlatPendingFaces = $temp$outFlatPendingFaces;
																		outSmoothPendingFaces = $temp$outSmoothPendingFaces;
																		continue addTexturedFaces;
																	} else {
																		var $temp$frame = frame,
																			$temp$vertexData = vertexData,
																			$temp$smoothingGroup = smoothingGroup,
																			$temp$lineno = newLineno,
																			$temp$elementVertices = _List_Nil,
																			$temp$elements = remainingElements,
																			$temp$maxIndex = maxIndex,
																			$temp$indexMap = indexMap,
																			$temp$outVertices = outVertices,
																			$temp$outIndices = _List_Nil,
																			$temp$outFaceIndices = newFaceIndices,
																			$temp$outFlatPendingFaces = outFlatPendingFaces,
																			$temp$outSmoothPendingFaces = A2(
																			$elm$core$List$cons,
																			_Utils_Tuple2(smoothingGroup, newFaceElement),
																			outSmoothPendingFaces);
																		frame = $temp$frame;
																		vertexData = $temp$vertexData;
																		smoothingGroup = $temp$smoothingGroup;
																		lineno = $temp$lineno;
																		elementVertices = $temp$elementVertices;
																		elements = $temp$elements;
																		maxIndex = $temp$maxIndex;
																		indexMap = $temp$indexMap;
																		outVertices = $temp$outVertices;
																		outIndices = $temp$outIndices;
																		outFaceIndices = $temp$outFaceIndices;
																		outFlatPendingFaces = $temp$outFlatPendingFaces;
																		outSmoothPendingFaces = $temp$outSmoothPendingFaces;
																		continue addTexturedFaces;
																	}
																}
															} else {
																return $elm$core$Result$Ok(
																	{O: newFaceIndices, a9: outVertices, ba: outFlatPendingFaces, cj: indexMap, bd: maxIndex, bj: outSmoothPendingFaces});
															}
														}
													}
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$SmoothNormals = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $ianmackenzie$elm_geometry$Vector3d$plus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {n: v1.n + v2.n, o: v1.o + v2.o, p: v1.p + v2.p};
	});
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$addNormal = F4(
	function (smoothingGroup, normal, entries, outEntries) {
		addNormal:
		while (true) {
			if (!entries.b) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(smoothingGroup, normal),
					outEntries);
			} else {
				var currentEntry = entries.a;
				var currentSmoothingGroup = currentEntry.a;
				var currentNormal = currentEntry.b;
				var remainingEntries = entries.b;
				if (!(smoothingGroup - currentSmoothingGroup)) {
					var $temp$smoothingGroup = smoothingGroup,
						$temp$normal = A2($ianmackenzie$elm_geometry$Vector3d$plus, normal, currentNormal),
						$temp$entries = remainingEntries,
						$temp$outEntries = outEntries;
					smoothingGroup = $temp$smoothingGroup;
					normal = $temp$normal;
					entries = $temp$entries;
					outEntries = $temp$outEntries;
					continue addNormal;
				} else {
					var $temp$smoothingGroup = smoothingGroup,
						$temp$normal = normal,
						$temp$entries = remainingEntries,
						$temp$outEntries = A2($elm$core$List$cons, currentEntry, outEntries);
					smoothingGroup = $temp$smoothingGroup;
					normal = $temp$normal;
					entries = $temp$entries;
					outEntries = $temp$outEntries;
					continue addNormal;
				}
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$collectSmoothNormalsVertices = F4(
	function (smoothingGroup, normal, elementVertices, outSmoothNormals) {
		collectSmoothNormalsVertices:
		while (true) {
			if (!elementVertices.b) {
				return outSmoothNormals;
			} else {
				var p = elementVertices.a.gm;
				var remainingElementVertices = elementVertices.b;
				var $temp$smoothingGroup = smoothingGroup,
					$temp$normal = normal,
					$temp$elementVertices = remainingElementVertices,
					$temp$outSmoothNormals = A3(
					$elm$core$Array$set,
					p,
					function () {
						var _v1 = A2($elm$core$Array$get, p, outSmoothNormals);
						if (!_v1.$) {
							var entries = _v1.a;
							return A4($w0rm$elm_obj_file$Obj$Internal$SmoothNormals$addNormal, smoothingGroup, normal, entries, _List_Nil);
						} else {
							return _List_fromArray(
								[
									_Utils_Tuple2(smoothingGroup, normal)
								]);
						}
					}(),
					outSmoothNormals);
				smoothingGroup = $temp$smoothingGroup;
				normal = $temp$normal;
				elementVertices = $temp$elementVertices;
				outSmoothNormals = $temp$outSmoothNormals;
				continue collectSmoothNormalsVertices;
			}
		}
	});
var $ianmackenzie$elm_geometry$Point3d$toMeters = function (_v0) {
	var pointCoordinates = _v0;
	return pointCoordinates;
};
var $ianmackenzie$elm_geometry$Vector3d$unitless = F3(
	function (x, y, z) {
		return {n: x, o: y, p: z};
	});
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$polygonFanNormal = F5(
	function (positions, p0, prevPos, elementVertices, normal) {
		polygonFanNormal:
		while (true) {
			if (elementVertices.b) {
				var vB = elementVertices.a;
				var remainingElementVertices = elementVertices.b;
				var _v1 = A2($elm$core$Array$get, vB.gm, positions);
				if (!_v1.$) {
					var posB = _v1.a;
					var pB = $ianmackenzie$elm_geometry$Point3d$toMeters(posB);
					var bz = pB.p - p0.p;
					var by = pB.o - p0.o;
					var bx = pB.n - p0.n;
					var az = prevPos.p - p0.p;
					var ay = prevPos.o - p0.o;
					var ax = prevPos.n - p0.n;
					var $temp$positions = positions,
						$temp$p0 = p0,
						$temp$prevPos = pB,
						$temp$elementVertices = remainingElementVertices,
						$temp$normal = A2(
						$ianmackenzie$elm_geometry$Vector3d$plus,
						normal,
						A3($ianmackenzie$elm_geometry$Vector3d$unitless, (by * az) - (bz * ay), (bz * ax) - (bx * az), (bx * ay) - (by * ax)));
					positions = $temp$positions;
					p0 = $temp$p0;
					prevPos = $temp$prevPos;
					elementVertices = $temp$elementVertices;
					normal = $temp$normal;
					continue polygonFanNormal;
				} else {
					var $temp$positions = positions,
						$temp$p0 = p0,
						$temp$prevPos = prevPos,
						$temp$elementVertices = remainingElementVertices,
						$temp$normal = normal;
					positions = $temp$positions;
					p0 = $temp$p0;
					prevPos = $temp$prevPos;
					elementVertices = $temp$elementVertices;
					normal = $temp$normal;
					continue polygonFanNormal;
				}
			} else {
				return normal;
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$collectSmoothNormalsFaces = F4(
	function (positions, smoothingGroup, faceElements, outSmoothNormals) {
		collectSmoothNormalsFaces:
		while (true) {
			if (!faceElements.b) {
				return outSmoothNormals;
			} else {
				if ((faceElements.a.c.b && faceElements.a.c.b.b) && faceElements.a.c.b.b.b) {
					var _v1 = faceElements.a;
					var elementVertices = _v1.c;
					var v0 = elementVertices.a;
					var _v2 = elementVertices.b;
					var v1 = _v2.a;
					var remainingElementVertices = _v2.b;
					var remainingFaceElements = faceElements.b;
					var _v3 = A2($elm$core$Array$get, v0.gm, positions);
					if (!_v3.$) {
						var pos0 = _v3.a;
						var _v4 = A2($elm$core$Array$get, v1.gm, positions);
						if (!_v4.$) {
							var pos1 = _v4.a;
							var normal = A5(
								$w0rm$elm_obj_file$Obj$Internal$SmoothNormals$polygonFanNormal,
								positions,
								$ianmackenzie$elm_geometry$Point3d$toMeters(pos0),
								$ianmackenzie$elm_geometry$Point3d$toMeters(pos1),
								remainingElementVertices,
								$ianmackenzie$elm_geometry$Vector3d$zero);
							var $temp$positions = positions,
								$temp$smoothingGroup = smoothingGroup,
								$temp$faceElements = remainingFaceElements,
								$temp$outSmoothNormals = A4($w0rm$elm_obj_file$Obj$Internal$SmoothNormals$collectSmoothNormalsVertices, smoothingGroup, normal, elementVertices, outSmoothNormals);
							positions = $temp$positions;
							smoothingGroup = $temp$smoothingGroup;
							faceElements = $temp$faceElements;
							outSmoothNormals = $temp$outSmoothNormals;
							continue collectSmoothNormalsFaces;
						} else {
							var $temp$positions = positions,
								$temp$smoothingGroup = smoothingGroup,
								$temp$faceElements = remainingFaceElements,
								$temp$outSmoothNormals = outSmoothNormals;
							positions = $temp$positions;
							smoothingGroup = $temp$smoothingGroup;
							faceElements = $temp$faceElements;
							outSmoothNormals = $temp$outSmoothNormals;
							continue collectSmoothNormalsFaces;
						}
					} else {
						var $temp$positions = positions,
							$temp$smoothingGroup = smoothingGroup,
							$temp$faceElements = remainingFaceElements,
							$temp$outSmoothNormals = outSmoothNormals;
						positions = $temp$positions;
						smoothingGroup = $temp$smoothingGroup;
						faceElements = $temp$faceElements;
						outSmoothNormals = $temp$outSmoothNormals;
						continue collectSmoothNormalsFaces;
					}
				} else {
					var _v5 = faceElements.a;
					var remainingFaceElements = faceElements.b;
					var $temp$positions = positions,
						$temp$smoothingGroup = smoothingGroup,
						$temp$faceElements = remainingFaceElements,
						$temp$outSmoothNormals = outSmoothNormals;
					positions = $temp$positions;
					smoothingGroup = $temp$smoothingGroup;
					faceElements = $temp$faceElements;
					outSmoothNormals = $temp$outSmoothNormals;
					continue collectSmoothNormalsFaces;
				}
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$collectSmoothNormalsHelp = F4(
	function (matches, positions, groups, outSmoothNormals) {
		collectSmoothNormalsHelp:
		while (true) {
			if (!groups.b) {
				return outSmoothNormals;
			} else {
				var _v1 = groups.a;
				var smoothingGroup = _v1.a.eB;
				var faceElements = _v1.b;
				var remainingGroups = groups.b;
				if (matches(smoothingGroup)) {
					var $temp$matches = matches,
						$temp$positions = positions,
						$temp$groups = remainingGroups,
						$temp$outSmoothNormals = A4($w0rm$elm_obj_file$Obj$Internal$SmoothNormals$collectSmoothNormalsFaces, positions, smoothingGroup, faceElements, outSmoothNormals);
					matches = $temp$matches;
					positions = $temp$positions;
					groups = $temp$groups;
					outSmoothNormals = $temp$outSmoothNormals;
					continue collectSmoothNormalsHelp;
				} else {
					var $temp$matches = matches,
						$temp$positions = positions,
						$temp$groups = remainingGroups,
						$temp$outSmoothNormals = outSmoothNormals;
					matches = $temp$matches;
					positions = $temp$positions;
					groups = $temp$groups;
					outSmoothNormals = $temp$outSmoothNormals;
					continue collectSmoothNormalsHelp;
				}
			}
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$getBitflag = F3(
	function (smoothingGroup, entries, outNormal) {
		getBitflag:
		while (true) {
			if (!entries.b) {
				if (!outNormal.$) {
					var normal = outNormal.a;
					return $elm$core$Maybe$Just(
						$ianmackenzie$elm_geometry$Vector3d$normalize(normal));
				} else {
					return $elm$core$Maybe$Nothing;
				}
			} else {
				var _v2 = entries.a;
				var currentSmoothingGroup = _v2.a;
				var currentNormal = _v2.b;
				var remainingEntries = entries.b;
				var $temp$smoothingGroup = smoothingGroup,
					$temp$entries = remainingEntries,
					$temp$outNormal = function () {
					if (!(!(smoothingGroup & currentSmoothingGroup))) {
						if (outNormal.$ === 1) {
							return $elm$core$Maybe$Just(currentNormal);
						} else {
							var existing = outNormal.a;
							return $elm$core$Maybe$Just(
								A2($ianmackenzie$elm_geometry$Vector3d$plus, existing, currentNormal));
						}
					} else {
						return outNormal;
					}
				}();
				smoothingGroup = $temp$smoothingGroup;
				entries = $temp$entries;
				outNormal = $temp$outNormal;
				continue getBitflag;
			}
		}
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$smoothingGroupsHelp = F2(
	function (groups, outSmoothingGroups) {
		smoothingGroupsHelp:
		while (true) {
			if (!groups.b) {
				return outSmoothingGroups;
			} else {
				var _v1 = groups.a;
				var record = _v1.a;
				var remainingGroups = groups.b;
				if (!record.eB) {
					var $temp$groups = remainingGroups,
						$temp$outSmoothingGroups = outSmoothingGroups;
					groups = $temp$groups;
					outSmoothingGroups = $temp$outSmoothingGroups;
					continue smoothingGroupsHelp;
				} else {
					var $temp$groups = remainingGroups,
						$temp$outSmoothingGroups = A2($elm$core$List$cons, record.eB, outSmoothingGroups);
					groups = $temp$groups;
					outSmoothingGroups = $temp$outSmoothingGroups;
					continue smoothingGroupsHelp;
				}
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$bitflag = F2(
	function (positions, groups) {
		var allBits = A3(
			$elm$core$List$foldl,
			$elm$core$Bitwise$or,
			0,
			A2($w0rm$elm_obj_file$Obj$Internal$SmoothNormals$smoothingGroupsHelp, groups, _List_Nil));
		return A2(
			$w0rm$elm_obj_file$Obj$Internal$SmoothNormals$SmoothNormals,
			$w0rm$elm_obj_file$Obj$Internal$SmoothNormals$getBitflag,
			A4(
				$w0rm$elm_obj_file$Obj$Internal$SmoothNormals$collectSmoothNormalsHelp,
				function (smoothingGroup) {
					return !(!(smoothingGroup & allBits));
				},
				positions,
				groups,
				A2(
					$elm$core$Array$repeat,
					$elm$core$Array$length(positions),
					_List_Nil)));
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$TriangularMesh = $elm$core$Basics$identity;
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$indexed = F2(
	function (vertices_, faceIndices_) {
		var numVertices = $elm$core$Array$length(vertices_);
		var validIndices = function (_v0) {
			var i = _v0.a;
			var j = _v0.b;
			var k = _v0.c;
			return ((i >= 0) && (_Utils_cmp(i, numVertices) < 0)) && (((j >= 0) && (_Utils_cmp(j, numVertices) < 0)) && ((k >= 0) && (_Utils_cmp(k, numVertices) < 0)));
		};
		return A2($elm$core$List$all, validIndices, faceIndices_) ? {O: faceIndices_, bB: vertices_} : {
			O: A2($elm$core$List$filter, validIndices, faceIndices_),
			bB: vertices_
		};
	});
var $w0rm$elm_obj_file$Obj$Internal$MeshHelpers$buildMeshResult = F3(
	function (filters, faceVertices, faceIndices) {
		if (faceIndices.b) {
			return $elm$core$Result$Ok(
				A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$indexed, faceVertices, faceIndices));
		} else {
			if (filters.b) {
				return $elm$core$Result$Err(
					'No faces found for ' + A2($elm$core$String$join, ', ', filters));
			} else {
				return $elm$core$Result$Err('No faces found');
			}
		}
	});
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$getExact = F3(
	function (smoothingGroup, entries, _v0) {
		getExact:
		while (true) {
			if (!entries.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var _v2 = entries.a;
				var currentSmoothingGroup = _v2.a;
				var currentNormal = _v2.b;
				var remainingEntries = entries.b;
				if (_Utils_eq(smoothingGroup, currentSmoothingGroup)) {
					return $elm$core$Maybe$Just(
						$ianmackenzie$elm_geometry$Vector3d$normalize(currentNormal));
				} else {
					var $temp$smoothingGroup = smoothingGroup,
						$temp$entries = remainingEntries,
						$temp$_v0 = $elm$core$Maybe$Nothing;
					smoothingGroup = $temp$smoothingGroup;
					entries = $temp$entries;
					_v0 = $temp$_v0;
					continue getExact;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $w0rm$elm_obj_file$Obj$Internal$SmoothNormals$exact = F2(
	function (positions, groups) {
		var smoothingGroupsSet = $elm$core$Set$fromList(
			A2($w0rm$elm_obj_file$Obj$Internal$SmoothNormals$smoothingGroupsHelp, groups, _List_Nil));
		return A2(
			$w0rm$elm_obj_file$Obj$Internal$SmoothNormals$SmoothNormals,
			$w0rm$elm_obj_file$Obj$Internal$SmoothNormals$getExact,
			A4(
				$w0rm$elm_obj_file$Obj$Internal$SmoothNormals$collectSmoothNormalsHelp,
				function (smoothingGroup) {
					return A2($elm$core$Set$member, smoothingGroup, smoothingGroupsSet);
				},
				positions,
				groups,
				A2(
					$elm$core$Array$repeat,
					$elm$core$Array$length(positions),
					_List_Nil)));
	});
var $w0rm$elm_obj_file$Obj$Internal$IndexMap$init3 = function (_v0) {
	var arr = _v0;
	return arr;
};
var $w0rm$elm_obj_file$Obj$Internal$Faces$triangularMesh = F8(
	function (add, groups, maxIndex, indexMap, outVertices, outFaceIndices, outFlatPendingFaces, outSmoothPendingFaces) {
		triangularMesh:
		while (true) {
			if (groups.b) {
				if (groups.a.b.b) {
					var _v1 = groups.a;
					var record = _v1.a;
					var _v2 = _v1.b;
					var faceElement = _v2.a;
					var lineno = faceElement.a;
					var hasNormals = faceElement.b;
					var elementVertices = faceElement.c;
					var faceElements = _v2.b;
					var remainingGroups = groups.b;
					var _v3 = hasNormals ? _Utils_Tuple3(elementVertices, outFlatPendingFaces, outSmoothPendingFaces) : ((!record.eB) ? _Utils_Tuple3(
						_List_Nil,
						A2($elm$core$List$cons, faceElement, outFlatPendingFaces),
						outSmoothPendingFaces) : _Utils_Tuple3(
						_List_Nil,
						outFlatPendingFaces,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(record.eB, faceElement),
							outSmoothPendingFaces)));
					var firstElementVertices = _v3.a;
					var newFlatPending = _v3.b;
					var newSmoothPending = _v3.c;
					var _v4 = add(record.eB)(lineno)(firstElementVertices)(faceElements)(maxIndex)(indexMap)(outVertices)(_List_Nil)(outFaceIndices)(newFlatPending)(newSmoothPending);
					if (!_v4.$) {
						var newState = _v4.a;
						var $temp$add = add,
							$temp$groups = remainingGroups,
							$temp$maxIndex = newState.bd,
							$temp$indexMap = newState.cj,
							$temp$outVertices = newState.a9,
							$temp$outFaceIndices = newState.O,
							$temp$outFlatPendingFaces = newState.ba,
							$temp$outSmoothPendingFaces = newState.bj;
						add = $temp$add;
						groups = $temp$groups;
						maxIndex = $temp$maxIndex;
						indexMap = $temp$indexMap;
						outVertices = $temp$outVertices;
						outFaceIndices = $temp$outFaceIndices;
						outFlatPendingFaces = $temp$outFlatPendingFaces;
						outSmoothPendingFaces = $temp$outSmoothPendingFaces;
						continue triangularMesh;
					} else {
						var error = _v4.a;
						return $elm$core$Result$Err(error);
					}
				} else {
					var _v5 = groups.a;
					var remainingGroups = groups.b;
					var $temp$add = add,
						$temp$groups = remainingGroups,
						$temp$maxIndex = maxIndex,
						$temp$indexMap = indexMap,
						$temp$outVertices = outVertices,
						$temp$outFaceIndices = outFaceIndices,
						$temp$outFlatPendingFaces = outFlatPendingFaces,
						$temp$outSmoothPendingFaces = outSmoothPendingFaces;
					add = $temp$add;
					groups = $temp$groups;
					maxIndex = $temp$maxIndex;
					indexMap = $temp$indexMap;
					outVertices = $temp$outVertices;
					outFaceIndices = $temp$outFaceIndices;
					outFlatPendingFaces = $temp$outFlatPendingFaces;
					outSmoothPendingFaces = $temp$outSmoothPendingFaces;
					continue triangularMesh;
				}
			} else {
				return $elm$core$Result$Ok(
					{O: outFaceIndices, a9: outVertices, ba: outFlatPendingFaces, cj: indexMap, bd: maxIndex, bj: outSmoothPendingFaces});
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Internal$Faces$texturedFaces = F5(
	function (frame, bitflags, vertexData, filters, filteredGroups) {
		var _v0 = A8(
			$w0rm$elm_obj_file$Obj$Internal$Faces$triangularMesh,
			A2($w0rm$elm_obj_file$Obj$Internal$Faces$addTexturedFaces, frame, vertexData),
			filteredGroups,
			-1,
			$w0rm$elm_obj_file$Obj$Internal$IndexMap$init3(vertexData.bO),
			_List_Nil,
			_List_Nil,
			_List_Nil,
			_List_Nil);
		if (_v0.$ === 1) {
			var error = _v0.a;
			return $elm$core$Result$Err(error);
		} else {
			var maxIndex = _v0.a.bd;
			var faceIndices = _v0.a.O;
			var faceVertices = _v0.a.a9;
			var smoothPendingFaces = _v0.a.bj;
			var flatPendingFaces = _v0.a.ba;
			var _v1 = _Utils_Tuple2(flatPendingFaces, smoothPendingFaces);
			if ((!_v1.a.b) && (!_v1.b.b)) {
				return A3(
					$w0rm$elm_obj_file$Obj$Internal$MeshHelpers$buildMeshResult,
					filters,
					$elm$core$Array$fromList(
						$elm$core$List$reverse(faceVertices)),
					faceIndices);
			} else {
				var _v2 = function () {
					if (!smoothPendingFaces.b) {
						return _Utils_Tuple3(faceVertices, maxIndex + 1, faceIndices);
					} else {
						var _v4 = smoothPendingFaces.a;
						var smoothingGroup = _v4.a;
						var _v5 = _v4.b;
						var elementVertices = _v5.c;
						var remainingSmoothPendingFaces = smoothPendingFaces.b;
						var smoothNormals = bitflags ? A2($w0rm$elm_obj_file$Obj$Internal$SmoothNormals$bitflag, vertexData.gt, filteredGroups) : A2($w0rm$elm_obj_file$Obj$Internal$SmoothNormals$exact, vertexData.gt, filteredGroups);
						return $w0rm$elm_obj_file$Obj$Internal$Faces$addSmoothTexturedFaces(frame)(vertexData)(smoothNormals)(smoothingGroup)(elementVertices)(remainingSmoothPendingFaces)(
							$w0rm$elm_obj_file$Obj$Internal$IndexMap$init3(vertexData.bO))(faceVertices)(maxIndex + 1)(_List_Nil)(faceIndices);
					}
				}();
				var verticesAfterSmooth = _v2.a;
				var idxAfterSmooth = _v2.b;
				var indicesAfterSmooth = _v2.c;
				var _v6 = $w0rm$elm_obj_file$Obj$Internal$Faces$addFlatTexturedFaces(frame)(vertexData)(_List_Nil)(flatPendingFaces)($ianmackenzie$elm_geometry$Point3d$origin)($ianmackenzie$elm_geometry$Point3d$origin)(
					_Utils_Tuple2(0, 0))(
					_Utils_Tuple2(0, 0))(verticesAfterSmooth)(idxAfterSmooth)(indicesAfterSmooth);
				var finalVertices = _v6.a;
				var finalIndices = _v6.b;
				return A3(
					$w0rm$elm_obj_file$Obj$Internal$MeshHelpers$buildMeshResult,
					filters,
					$elm$core$Array$fromList(
						$elm$core$List$reverse(finalVertices)),
					$elm$core$List$reverse(finalIndices));
			}
		}
	});
var $w0rm$elm_obj_file$Obj$Decode$texturedFacesIn = function (frame) {
	return A2($w0rm$elm_obj_file$Obj$Internal$Faces$texturedFaces, frame, false);
};
var $author$project$Main$meshResolver = $elm$http$Http$stringResolver(
	function (response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 1:
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 2:
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.h9));
			default:
				var body = response.b;
				var units = $ianmackenzie$elm_units$Length$meters;
				var decoder = A2(
					$w0rm$elm_obj_file$Obj$Decode$map,
					$ianmackenzie$elm_3d_scene$Scene3d$Mesh$texturedFaces,
					$w0rm$elm_obj_file$Obj$Decode$texturedFacesIn($ianmackenzie$elm_geometry$Frame3d$atOrigin));
				var _v1 = A3($w0rm$elm_obj_file$Obj$Decode$decodeString, units, decoder, body);
				if (!_v1.$) {
					var value = _v1.a;
					return $elm$core$Result$Ok(value);
				} else {
					var string = _v1.a;
					return $elm$core$Result$Err(
						$elm$http$Http$BadBody(string));
				}
		}
	});
var $elm$http$Http$resultToTask = function (result) {
	if (!result.$) {
		var a = result.a;
		return $elm$core$Task$succeed(a);
	} else {
		var x = result.a;
		return $elm$core$Task$fail(x);
	}
};
var $elm$http$Http$task = function (r) {
	return A3(
		_Http_toTask,
		0,
		$elm$http$Http$resultToTask,
		{g$: false, dM: r.dM, dT: r.h3, hC: r.hC, hQ: r.hQ, $8: r.$8, gO: $elm$core$Maybe$Nothing, ik: r.ik});
};
var $author$project$Main$getMesh = function (name) {
	return A2(
		$elm$core$Task$mapError,
		function (_v0) {
			return 'Failed to load ' + (name + ' obj');
		},
		$elm$http$Http$task(
			{dM: $elm$http$Http$emptyBody, hC: _List_Nil, hQ: 'GET', h3: $author$project$Main$meshResolver, $8: $elm$core$Maybe$Nothing, ik: 'assets/' + (name + '.obj')}));
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm_explorations$webgl$WebGL$Texture$Resize = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Texture$linear = 9729;
var $elm_explorations$webgl$WebGL$Texture$Wrap = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Texture$repeat = 10497;
var $ianmackenzie$elm_3d_scene$Scene3d$Material$bilinearFiltering = {cP: true, cV: $elm_explorations$webgl$WebGL$Texture$repeat, c3: $elm_explorations$webgl$WebGL$Texture$linear, c7: $elm_explorations$webgl$WebGL$Texture$linear, dv: $elm_explorations$webgl$WebGL$Texture$repeat};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Texture = function (a) {
	return {$: 1, a: a};
};
var $elm_explorations$webgl$WebGL$Texture$LoadError = {$: 0};
var $elm_explorations$webgl$WebGL$Texture$SizeError = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$Texture$loadWith = F2(
	function (_v0, url) {
		var flipY = _v0.cP;
		var verticalWrap = _v0.dv;
		var horizontalWrap = _v0.cV;
		var minify = _v0.c7;
		var magnify = _v0.c3;
		var expand = F4(
			function (_v1, _v2, _v3, _v4) {
				var mag = _v1;
				var min = _v2;
				var hor = _v3;
				var vert = _v4;
				return A6(_Texture_load, mag, min, hor, vert, flipY, url);
			});
		return A4(expand, magnify, minify, horizontalWrap, verticalWrap);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Material$loadWith = F2(
	function (options, url) {
		return A2(
			$elm$core$Task$map,
			function (data) {
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Texture(
					{e0: data, dc: options, ik: url});
			},
			A2($elm_explorations$webgl$WebGL$Texture$loadWith, options, url));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Material$load = function (url) {
	return A2($ianmackenzie$elm_3d_scene$Scene3d$Material$loadWith, $ianmackenzie$elm_3d_scene$Scene3d$Material$bilinearFiltering, url);
};
var $elm$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return A2(
							$elm$core$Task$andThen,
							function (c) {
								return A2(
									$elm$core$Task$andThen,
									function (d) {
										return $elm$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var $author$project$Main$init = function (_v0) {
	var height = _v0.bs;
	var width = _v0.bD;
	var initialSeed = _v0.dZ;
	return _Utils_Tuple2(
		{
			k: $author$project$Main$Loading,
			bs: height,
			Y: $elm$random$Random$initialSeed(initialSeed),
			bD: width
		},
		A2(
			$elm$core$Task$attempt,
			$author$project$Main$AssetsLoaded,
			A5(
				$elm$core$Task$map4,
				F4(
					function (a, b, c, d) {
						return _Utils_Tuple3(
							_Utils_Tuple2(a, b),
							c,
							d);
					}),
				$author$project$Main$getMesh('ball'),
				A2(
					$elm$core$Task$mapError,
					function (_v1) {
						return 'Failed to load texture';
					},
					$ianmackenzie$elm_3d_scene$Scene3d$Material$load('assets/ball.png')),
				$author$project$Main$getMesh('hole'),
				$author$project$Main$getMesh('goal_ring'))));
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Main$BrowserResized = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Main$BrowserVisibilityChanged = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$KeyDown = function (a) {
	return {$: 6, a: a};
};
var $author$project$Main$KeyUp = function (a) {
	return {$: 7, a: a};
};
var $author$project$Main$Tick = function (a) {
	return {$: 5, a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $ianmackenzie$elm_units$Duration$seconds = function (numSeconds) {
	return numSeconds;
};
var $ianmackenzie$elm_units$Duration$milliseconds = function (numMilliseconds) {
	return $ianmackenzie$elm_units$Duration$seconds(0.001 * numMilliseconds);
};
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {eh: oldTime, gA: request, gG: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$AnimationManager$now = _Browser_now(0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(0);
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var oldTime = _v0.eh;
		var request = _v0.gA;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 1) {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var oldTime = _v0.eh;
		var subs = _v0.gG;
		var send = function (sub) {
			if (!sub.$) {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (!sub.$) {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrameDelta = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Delta(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrameDelta = $elm$browser$Browser$AnimationManager$onAnimationFrameDelta;
var $elm$browser$Browser$Events$Document = 0;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {gp: pids, gG: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {e8: event, fD: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.gp,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var event = _v0.e8;
		var key = _v0.fD;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.gG);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, 0, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, 0, 'keyup');
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$browser$Browser$Events$Hidden = 1;
var $elm$browser$Browser$Events$Visible = 0;
var $elm$browser$Browser$Events$withHidden = F2(
	function (func, isHidden) {
		return func(
			isHidden ? 1 : 0);
	});
var $elm$browser$Browser$Events$onVisibilityChange = function (func) {
	var info = _Browser_visibilityInfo(0);
	return A3(
		$elm$browser$Browser$Events$on,
		0,
		info.g9,
		A2(
			$elm$json$Json$Decode$map,
			$elm$browser$Browser$Events$withHidden(func),
			A2(
				$elm$json$Json$Decode$field,
				'target',
				A2($elm$json$Json$Decode$field, info.hE, $elm$json$Json$Decode$bool))));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onAnimationFrameDelta(
				function (d) {
					return $author$project$Main$Tick(
						$ianmackenzie$elm_units$Duration$milliseconds(d));
				}),
				$elm$browser$Browser$Events$onKeyDown(
				A2(
					$elm$json$Json$Decode$map,
					$author$project$Main$KeyDown,
					A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string))),
				$elm$browser$Browser$Events$onKeyUp(
				A2(
					$elm$json$Json$Decode$map,
					$author$project$Main$KeyUp,
					A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string))),
				$elm$browser$Browser$Events$onResize($author$project$Main$BrowserResized),
				$elm$browser$Browser$Events$onVisibilityChange($author$project$Main$BrowserVisibilityChanged)
			]));
};
var $author$project$Main$Ball = {$: 0};
var $author$project$Main$Failure = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$Falling = 0;
var $author$project$Main$Loaded = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$MainMenu = {$: 0};
var $author$project$Main$Paused = 1;
var $author$project$Main$Playing = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$TimeRanOut = 2;
var $w0rm$elm_timestep$Timestep$Timestep = $elm$core$Basics$identity;
var $w0rm$elm_timestep$Timestep$applyN = F3(
	function (n, f, x) {
		applyN:
		while (true) {
			if (n <= 0) {
				return x;
			} else {
				var $temp$n = n - 1,
					$temp$f = f,
					$temp$x = f(x);
				n = $temp$n;
				f = $temp$f;
				x = $temp$x;
				continue applyN;
			}
		}
	});
var $ianmackenzie$elm_units$Quantity$minus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x - y;
	});
var $ianmackenzie$elm_units$Quantity$multiplyBy = F2(
	function (scale, _v0) {
		var value = _v0;
		return scale * value;
	});
var $ianmackenzie$elm_units$Quantity$plus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x + y;
	});
var $ianmackenzie$elm_units$Quantity$ratio = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return x / y;
	});
var $ianmackenzie$elm_units$Quantity$zero = 0;
var $w0rm$elm_timestep$Timestep$advance = F3(
	function (stepFn, dt, model) {
		var _v0 = model.ds;
		var s = _v0;
		var next = A2($ianmackenzie$elm_units$Quantity$plus, dt, s.ce);
		var wanted = $elm$core$Basics$floor(
			A2($ianmackenzie$elm_units$Quantity$ratio, next, s.e4));
		var finalElapsed = ((wanted - s.hP) > 0) ? $ianmackenzie$elm_units$Quantity$zero : A2(
			$ianmackenzie$elm_units$Quantity$minus,
			A2($ianmackenzie$elm_units$Quantity$multiplyBy, wanted, s.e4),
			next);
		var n = ((wanted - s.hP) > 0) ? s.hP : wanted;
		var steppedModel = A3(
			$w0rm$elm_timestep$Timestep$applyN,
			n,
			stepFn,
			_Utils_update(
				model,
				{
					ds: {e4: s.e4, ce: $ianmackenzie$elm_units$Quantity$zero, hP: s.hP, bk: n}
				}));
		return _Utils_update(
			steppedModel,
			{
				ds: {e4: s.e4, ce: finalElapsed, hP: s.hP, bk: n}
			});
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Internal$Transform3d$Transform3d = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Internal$Transform3d$Orientation3d = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $author$project$Internal$Transform3d$identity = A4($author$project$Internal$Transform3d$Orientation3d, 0, 0, 0, 1);
var $author$project$Internal$Vector3$zero = {n: 0, o: 0, p: 0};
var $author$project$Internal$Transform3d$atOrigin = A2($author$project$Internal$Transform3d$Transform3d, $author$project$Internal$Vector3$zero, $author$project$Internal$Transform3d$identity);
var $author$project$Internal$ContactId$bodyRange = 262144;
var $author$project$Internal$ContactId$bodyKey = F2(
	function (a, b) {
		return ((a - b) <= 0) ? ((a * $author$project$Internal$ContactId$bodyRange) + b) : ((b * $author$project$Internal$ContactId$bodyRange) + a);
	});
var $author$project$Internal$ContactCache$getGroup = F2(
	function (target, dict) {
		getGroup:
		while (true) {
			if (dict.$ === 1) {
				return _List_Nil;
			} else {
				var key = dict.b;
				var list = dict.c;
				var left = dict.d;
				var right = dict.e;
				var d = target - key;
				if (d < 0) {
					var $temp$target = target,
						$temp$dict = left;
					target = $temp$target;
					dict = $temp$dict;
					continue getGroup;
				} else {
					if (d > 0) {
						var $temp$target = target,
							$temp$dict = right;
						target = $temp$target;
						dict = $temp$dict;
						continue getGroup;
					} else {
						return list;
					}
				}
			}
		}
	});
var $author$project$Internal$ContactCache$lookup = F4(
	function (shapeKey, featureKey, _default, list) {
		lookup:
		while (true) {
			if (!list.b) {
				return _default;
			} else {
				var _v1 = list.a;
				var s = _v1.a;
				var f = _v1.b;
				var v = _v1.c;
				var rest = list.b;
				if ((!(f - featureKey)) && (!(s - shapeKey))) {
					return v;
				} else {
					var $temp$shapeKey = shapeKey,
						$temp$featureKey = featureKey,
						$temp$default = _default,
						$temp$list = rest;
					shapeKey = $temp$shapeKey;
					featureKey = $temp$featureKey;
					_default = $temp$default;
					list = $temp$list;
					continue lookup;
				}
			}
		}
	});
var $ianmackenzie$elm_units$Force$newtons = function (numNewtons) {
	return numNewtons;
};
var $author$project$Internal$Vector3$add = F2(
	function (a, b) {
		return {n: a.n + b.n, o: a.o + b.o, p: a.p + b.p};
	});
var $author$project$Internal$Transform3d$mul = F2(
	function (_v0, _v1) {
		var q1x = _v0.a;
		var q1y = _v0.b;
		var q1z = _v0.c;
		var q1w = _v0.d;
		var q2x = _v1.a;
		var q2y = _v1.b;
		var q2z = _v1.c;
		var q2w = _v1.d;
		return A4($author$project$Internal$Transform3d$Orientation3d, (((q1x * q2w) + (q1y * q2z)) - (q1z * q2y)) + (q1w * q2x), ((((-q1x) * q2z) + (q1y * q2w)) + (q1z * q2x)) + (q1w * q2y), (((q1x * q2y) - (q1y * q2x)) + (q1z * q2w)) + (q1w * q2z), ((((-q1x) * q2x) - (q1y * q2y)) - (q1z * q2z)) + (q1w * q2w));
	});
var $author$project$Internal$Transform3d$rotate = F2(
	function (_v0, _v1) {
		var qx = _v0.a;
		var qy = _v0.b;
		var qz = _v0.c;
		var qw = _v0.d;
		var z = _v1.p;
		var y = _v1.o;
		var x = _v1.n;
		var iz = 2 * ((qx * y) - (qy * x));
		var iy = 2 * ((qz * x) - (qx * z));
		var ix = 2 * ((qy * z) - (qz * y));
		return {n: ((x + (qw * ix)) + (qy * iz)) - (qz * iy), o: ((y + (qw * iy)) + (qz * ix)) - (qx * iz), p: ((z + (qw * iz)) + (qx * iy)) - (qy * ix)};
	});
var $author$project$Internal$Transform3d$placeIn = F2(
	function (_v0, _v1) {
		var globalPosition = _v0.a;
		var globalOrientation = _v0.b;
		var localPosition = _v1.a;
		var localOrientation = _v1.b;
		return A2(
			$author$project$Internal$Transform3d$Transform3d,
			A2(
				$author$project$Internal$Vector3$add,
				globalPosition,
				A2($author$project$Internal$Transform3d$rotate, globalOrientation, localPosition)),
			A2($author$project$Internal$Transform3d$mul, globalOrientation, localOrientation));
	});
var $author$project$Internal$Transform3d$pointPlaceIn = F2(
	function (_v0, _v2) {
		var globalOrigin = _v0.a;
		var _v1 = _v0.b;
		var qx = _v1.a;
		var qy = _v1.b;
		var qz = _v1.c;
		var qw = _v1.d;
		var z = _v2.p;
		var y = _v2.o;
		var x = _v2.n;
		var iz = ((qw * z) + (qx * y)) - (qy * x);
		var iy = ((qw * y) + (qz * x)) - (qx * z);
		var ix = ((qw * x) + (qy * z)) - (qz * y);
		var iw = (((-qx) * x) - (qy * y)) - (qz * z);
		return {n: ((((ix * qw) + (iw * (-qx))) + (iy * (-qz))) - (iz * (-qy))) + globalOrigin.n, o: ((((iy * qw) + (iw * (-qy))) + (iz * (-qx))) - (ix * (-qz))) + globalOrigin.o, p: ((((iz * qw) + (iw * (-qz))) + (ix * (-qy))) - (iy * (-qx))) + globalOrigin.p};
	});
var $author$project$Internal$Transform3d$derotate = F2(
	function (_v0, _v1) {
		var qx = _v0.a;
		var qy = _v0.b;
		var qz = _v0.c;
		var qw = _v0.d;
		var z = _v1.p;
		var y = _v1.o;
		var x = _v1.n;
		var iz = (((-qw) * z) + (qx * y)) - (qy * x);
		var iy = (((-qw) * y) + (qz * x)) - (qx * z);
		var ix = (((-qw) * x) + (qy * z)) - (qz * y);
		var iw = (((-qx) * x) - (qy * y)) - (qz * z);
		return {n: (((ix * (-qw)) + (iw * (-qx))) + (iy * (-qz))) - (iz * (-qy)), o: (((iy * (-qw)) + (iw * (-qy))) + (iz * (-qx))) - (ix * (-qz)), p: (((iz * (-qw)) + (iw * (-qz))) + (ix * (-qy))) - (iy * (-qx))};
	});
var $author$project$Internal$Vector3$sub = F2(
	function (a, b) {
		return {n: a.n - b.n, o: a.o - b.o, p: a.p - b.p};
	});
var $author$project$Internal$Transform3d$pointRelativeTo = F2(
	function (_v0, worldPoint) {
		var localOrigin = _v0.a;
		var localOrientation = _v0.b;
		return A2(
			$author$project$Internal$Transform3d$derotate,
			localOrientation,
			A2($author$project$Internal$Vector3$sub, worldPoint, localOrigin));
	});
var $author$project$Internal$Transform3d$relativeTo = F2(
	function (t1, _v1) {
		var _v0 = t1.b;
		var x = _v0.a;
		var y = _v0.b;
		var z = _v0.c;
		var w = _v0.d;
		var p2 = _v1.a;
		var o2 = _v1.b;
		return A2(
			$author$project$Internal$Transform3d$Transform3d,
			A2($author$project$Internal$Transform3d$pointRelativeTo, t1, p2),
			A2(
				$author$project$Internal$Transform3d$mul,
				A4($author$project$Internal$Transform3d$Orientation3d, -x, -y, -z, w),
				o2));
	});
var $ianmackenzie$elm_units$Quantity$times = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x * y;
	});
var $author$project$Physics$contactPointsHelp = F5(
	function (predicate, pairGroups, bodies, warmStartCache, acc) {
		contactPointsHelp:
		while (true) {
			if (!pairGroups.b) {
				return $elm$core$List$reverse(acc);
			} else {
				var pairGroup = pairGroups.a;
				var remainingPairGroups = pairGroups.b;
				var _v1 = pairGroup.e$;
				if (!_v1.b) {
					var $temp$predicate = predicate,
						$temp$pairGroups = remainingPairGroups,
						$temp$bodies = bodies,
						$temp$warmStartCache = warmStartCache,
						$temp$acc = acc;
					predicate = $temp$predicate;
					pairGroups = $temp$pairGroups;
					bodies = $temp$bodies;
					warmStartCache = $temp$warmStartCache;
					acc = $temp$acc;
					continue contactPointsHelp;
				} else {
					var _v2 = A2($elm$core$Array$get, pairGroup.eT.bt, bodies);
					if (!_v2.$) {
						var _v3 = _v2.a;
						var extId1 = _v3.a;
						var body1 = _v3.b;
						var _v4 = A2($elm$core$Array$get, pairGroup.eU.bt, bodies);
						if (!_v4.$) {
							var _v5 = _v4.a;
							var extId2 = _v5.a;
							if (A2(predicate, extId1, extId2) || A2(predicate, extId2, extId1)) {
								var transform = A2(
									$author$project$Internal$Transform3d$placeIn,
									body1.gP,
									A2($author$project$Internal$Transform3d$relativeTo, pairGroup.eT.gP, $author$project$Internal$Transform3d$atOrigin));
								var bodyPairKey = A2($author$project$Internal$ContactId$bodyKey, pairGroup.eT.bt, pairGroup.eU.bt);
								var warmStartList = A2($author$project$Internal$ContactCache$getGroup, bodyPairKey, warmStartCache);
								var points = A2(
									$elm$core$List$map,
									function (solverContact) {
										var contact = solverContact.hc;
										var normalDir = $ianmackenzie$elm_geometry$Direction3d$unsafe(
											{n: contact.hV.n, o: contact.hV.o, p: contact.hV.p});
										var ws = A4(
											$author$project$Internal$ContactCache$lookup,
											contact.h6,
											contact.ht,
											{d$: 0, eG: $author$project$Internal$Vector3$zero},
											warmStartList);
										return {
											hG: A2(
												$ianmackenzie$elm_units$Quantity$times,
												$ianmackenzie$elm_units$Duration$seconds(1),
												$ianmackenzie$elm_units$Force$newtons(ws.d$)),
											c8: normalDir,
											df: $ianmackenzie$elm_geometry$Point3d$fromMeters(
												A2($author$project$Internal$Transform3d$pointPlaceIn, transform, contact.h$))
										};
									},
									pairGroup.e$);
								var $temp$predicate = predicate,
									$temp$pairGroups = remainingPairGroups,
									$temp$bodies = bodies,
									$temp$warmStartCache = warmStartCache,
									$temp$acc = A2(
									$elm$core$List$cons,
									_Utils_Tuple3(extId1, extId2, points),
									acc);
								predicate = $temp$predicate;
								pairGroups = $temp$pairGroups;
								bodies = $temp$bodies;
								warmStartCache = $temp$warmStartCache;
								acc = $temp$acc;
								continue contactPointsHelp;
							} else {
								var $temp$predicate = predicate,
									$temp$pairGroups = remainingPairGroups,
									$temp$bodies = bodies,
									$temp$warmStartCache = warmStartCache,
									$temp$acc = acc;
								predicate = $temp$predicate;
								pairGroups = $temp$pairGroups;
								bodies = $temp$bodies;
								warmStartCache = $temp$warmStartCache;
								acc = $temp$acc;
								continue contactPointsHelp;
							}
						} else {
							var $temp$predicate = predicate,
								$temp$pairGroups = remainingPairGroups,
								$temp$bodies = bodies,
								$temp$warmStartCache = warmStartCache,
								$temp$acc = acc;
							predicate = $temp$predicate;
							pairGroups = $temp$pairGroups;
							bodies = $temp$bodies;
							warmStartCache = $temp$warmStartCache;
							acc = $temp$acc;
							continue contactPointsHelp;
						}
					} else {
						var $temp$predicate = predicate,
							$temp$pairGroups = remainingPairGroups,
							$temp$bodies = bodies,
							$temp$warmStartCache = warmStartCache,
							$temp$acc = acc;
						predicate = $temp$predicate;
						pairGroups = $temp$pairGroups;
						bodies = $temp$bodies;
						warmStartCache = $temp$warmStartCache;
						acc = $temp$acc;
						continue contactPointsHelp;
					}
				}
			}
		}
	});
var $author$project$Physics$contactPoints = F2(
	function (predicate, _v0) {
		var c = _v0;
		return A5($author$project$Physics$contactPointsHelp, predicate, c.ei, c.dL, c.gV, _List_Nil);
	});
var $author$project$Physics$Types$Contacts = $elm$core$Basics$identity;
var $author$project$Internal$ContactCache$Empty = F5(
	function (a, b, c, d, e) {
		return {$: 1, a: a, b: b, c: c, d: d, e: e};
	});
var $author$project$Internal$ContactCache$empty = A5($author$project$Internal$ContactCache$Empty, 0, 0, 0, 0, 0);
var $author$project$Physics$emptyContacts = {dL: $elm$core$Array$empty, d_: 0, ei: _List_Nil, gV: $author$project$Internal$ContactCache$empty};
var $ianmackenzie$elm_geometry$Frame3d$unsafe = function (properties) {
	return properties;
};
var $ianmackenzie$elm_geometry$Frame3d$atPoint = function (point) {
	return $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{gl: point, gX: $ianmackenzie$elm_geometry$Direction3d$x, gY: $ianmackenzie$elm_geometry$Direction3d$y, g_: $ianmackenzie$elm_geometry$Direction3d$z});
};
var $author$project$Main$floorSpacing = -3;
var $author$project$Physics$Types$Body = $elm$core$Basics$identity;
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $author$project$Physics$damp = F2(
	function (_v0, _v1) {
		var angular = _v0.g0;
		var linear = _v0.hM;
		var body = _v1;
		return {
			eP: A3($elm$core$Basics$clamp, 0, 1, angular),
			eQ: body.eQ,
			eR: body.eR,
			eX: body.eX,
			fa: body.fa,
			fp: body.fp,
			bt: body.bt,
			fz: body.fz,
			fA: body.fA,
			fB: body.fB,
			fE: body.fE,
			fL: A3($elm$core$Basics$clamp, 0, 1, linear),
			fM: body.fM,
			f1: body.f1,
			gL: body.gL,
			gP: body.gP,
			gS: body.gS,
			gW: body.gW
		};
	});
var $author$project$Physics$Types$Material = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Density$inKilogramsPerCubicMeter = function (_v0) {
	var numKilogramsPerCubicMeter = _v0;
	return numKilogramsPerCubicMeter;
};
var $author$project$Physics$Material$dense = function (cfg) {
	return {
		eV: A3($elm$core$Basics$clamp, 0, 1, cfg.eV),
		cL: A2(
			$elm$core$Basics$max,
			1,
			$ianmackenzie$elm_units$Density$inKilogramsPerCubicMeter(cfg.cL)),
		fe: A3($elm$core$Basics$clamp, 0, 1, cfg.fe)
	};
};
var $ianmackenzie$elm_units$Density$kilogramsPerCubicMeter = function (numKilogramsPerCubicMeter) {
	return numKilogramsPerCubicMeter;
};
var $ianmackenzie$elm_geometry$Vector3d$meters = F3(
	function (x, y, z) {
		return {n: x, o: y, p: z};
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Sphere3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$abs = function (_v0) {
	var value = _v0;
	return $elm$core$Basics$abs(value);
};
var $ianmackenzie$elm_geometry$Sphere3d$withRadius = F2(
	function (givenRadius, givenCenterPoint) {
		return {
			g8: givenCenterPoint,
			dj: $ianmackenzie$elm_units$Quantity$abs(givenRadius)
		};
	});
var $ianmackenzie$elm_geometry$Sphere3d$atPoint = F2(
	function (givenCenterPoint, givenRadius) {
		return A2($ianmackenzie$elm_geometry$Sphere3d$withRadius, givenRadius, givenCenterPoint);
	});
var $ianmackenzie$elm_geometry$Point3d$meters = F3(
	function (x, y, z) {
		return {n: x, o: y, p: z};
	});
var $author$project$Main$playerSphere = A2(
	$ianmackenzie$elm_geometry$Sphere3d$atPoint,
	A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 0),
	$ianmackenzie$elm_units$Length$meters(0.25));
var $author$project$Internal$Shape$centerOfMass = function (shape) {
	switch (shape.$) {
		case 2:
			var sphere = shape.a;
			return sphere.gs;
		case 0:
			var convex = shape.a;
			return convex.gs;
		case 3:
			var capsule = shape.a;
			return capsule.gs;
		case 1:
			return $author$project$Internal$Vector3$zero;
		default:
			return $author$project$Internal$Vector3$zero;
	}
};
var $author$project$Internal$Shape$volume = function (shape) {
	switch (shape.$) {
		case 2:
			var sphere = shape.a;
			return sphere.eM;
		case 0:
			var convex = shape.a;
			return convex.eM;
		case 3:
			var capsule = shape.a;
			return capsule.eM;
		case 1:
			return 0;
		default:
			return 0;
	}
};
var $author$project$Internal$Body$accumulateMassProps = F6(
	function (shapes, totalMass, totalVolume, comX, comY, comZ) {
		accumulateMassProps:
		while (true) {
			if (!shapes.b) {
				return {
					eW: (totalMass > 0) ? {n: comX / totalMass, o: comY / totalMass, p: comZ / totalMass} : $author$project$Internal$Vector3$zero,
					gM: totalMass,
					gN: totalVolume
				};
			} else {
				var _v1 = shapes.a;
				var shape = _v1.a;
				var density = _v1.b.cL;
				var sign = _v1.c;
				var rest = shapes.b;
				var signedVolume = sign * $author$project$Internal$Shape$volume(shape);
				var signedMass = signedVolume * density;
				var _v2 = $author$project$Internal$Shape$centerOfMass(shape);
				var z = _v2.p;
				var y = _v2.o;
				var x = _v2.n;
				var $temp$shapes = rest,
					$temp$totalMass = totalMass + signedMass,
					$temp$totalVolume = totalVolume + signedVolume,
					$temp$comX = comX + (signedMass * x),
					$temp$comY = comY + (signedMass * y),
					$temp$comZ = comZ + (signedMass * z);
				shapes = $temp$shapes;
				totalMass = $temp$totalMass;
				totalVolume = $temp$totalVolume;
				comX = $temp$comX;
				comY = $temp$comY;
				comZ = $temp$comZ;
				continue accumulateMassProps;
			}
		}
	});
var $author$project$Internal$Transform3d$atPoint = function (point) {
	return A2($author$project$Internal$Transform3d$Transform3d, point, $author$project$Internal$Transform3d$identity);
};
var $author$project$Internal$Matrix3$jacobiT = function (theta) {
	return (theta >= 0) ? (1 / (theta + $elm$core$Basics$sqrt(1 + (theta * theta)))) : (1 / (theta - $elm$core$Basics$sqrt(1 + (theta * theta))));
};
var $author$project$Internal$Matrix3$jacobiTolerance = 1.0e-12;
var $author$project$Internal$Matrix3$jacobiIterate = function (s) {
	jacobiIterate:
	while (true) {
		var abs23 = $elm$core$Basics$abs(s.an);
		var abs13 = $elm$core$Basics$abs(s.am);
		var abs12 = $elm$core$Basics$abs(s.al);
		if ((s.bk <= 0) || (((abs12 - $author$project$Internal$Matrix3$jacobiTolerance) < 0) && (((abs13 - $author$project$Internal$Matrix3$jacobiTolerance) < 0) && ((abs23 - $author$project$Internal$Matrix3$jacobiTolerance) < 0)))) {
			return s;
		} else {
			if (((abs12 - abs13) >= 0) && ((abs12 - abs23) >= 0)) {
				var theta = (s.aE - s.aD) / (2 * s.al);
				var t = $author$project$Internal$Matrix3$jacobiT(theta);
				var c = 1 / $elm$core$Basics$sqrt(1 + (t * t));
				var k = t * c;
				var $temp$s = {al: 0, am: (c * s.am) - (k * s.an), an: (k * s.am) + (c * s.an), aD: s.aD - (t * s.al), aE: s.aE + (t * s.al), aF: s.aF, aN: (c * s.aN) - (k * s.aO), aO: (k * s.aN) + (c * s.aO), aP: s.aP, aQ: (c * s.aQ) - (k * s.aR), aR: (k * s.aQ) + (c * s.aR), aS: s.aS, aT: (c * s.aT) - (k * s.aU), aU: (k * s.aT) + (c * s.aU), aV: s.aV, bk: s.bk - 1};
				s = $temp$s;
				continue jacobiIterate;
			} else {
				if ((abs13 - abs23) >= 0) {
					var theta = (s.aF - s.aD) / (2 * s.am);
					var t = $author$project$Internal$Matrix3$jacobiT(theta);
					var c = 1 / $elm$core$Basics$sqrt(1 + (t * t));
					var k = t * c;
					var $temp$s = {al: (c * s.al) - (k * s.an), am: 0, an: (k * s.al) + (c * s.an), aD: s.aD - (t * s.am), aE: s.aE, aF: s.aF + (t * s.am), aN: (c * s.aN) - (k * s.aP), aO: s.aO, aP: (k * s.aN) + (c * s.aP), aQ: (c * s.aQ) - (k * s.aS), aR: s.aR, aS: (k * s.aQ) + (c * s.aS), aT: (c * s.aT) - (k * s.aV), aU: s.aU, aV: (k * s.aT) + (c * s.aV), bk: s.bk - 1};
					s = $temp$s;
					continue jacobiIterate;
				} else {
					var theta = (s.aF - s.aE) / (2 * s.an);
					var t = $author$project$Internal$Matrix3$jacobiT(theta);
					var c = 1 / $elm$core$Basics$sqrt(1 + (t * t));
					var k = t * c;
					var $temp$s = {al: (c * s.al) - (k * s.am), am: (k * s.al) + (c * s.am), an: 0, aD: s.aD, aE: s.aE - (t * s.an), aF: s.aF + (t * s.an), aN: s.aN, aO: (c * s.aO) - (k * s.aP), aP: (k * s.aO) + (c * s.aP), aQ: s.aQ, aR: (c * s.aR) - (k * s.aS), aS: (k * s.aR) + (c * s.aS), aT: s.aT, aU: (c * s.aU) - (k * s.aV), aV: (k * s.aU) + (c * s.aV), bk: s.bk - 1};
					s = $temp$s;
					continue jacobiIterate;
				}
			}
		}
	}
};
var $author$project$Internal$Matrix3$eigenDecomposition = function (_v0) {
	var m23 = _v0.fT;
	var m13 = _v0.fP;
	var m12 = _v0.fO;
	var m33 = _v0.fX;
	var m22 = _v0.fS;
	var m11 = _v0.fN;
	var result = $author$project$Internal$Matrix3$jacobiIterate(
		{al: m12, am: m13, an: m23, aD: m11, aE: m22, aF: m33, aN: 1, aO: 0, aP: 0, aQ: 0, aR: 1, aS: 0, aT: 0, aU: 0, aV: 1, bk: 30});
	return {
		hk: {n: result.aD, o: result.aE, p: result.aF},
		il: {n: result.aN, o: result.aQ, p: result.aT},
		im: {n: result.aO, o: result.aR, p: result.aU},
		$9: {n: result.aP, o: result.aS, p: result.aV}
	};
};
var $author$project$Internal$Transform3d$fromOriginAndBasis = F4(
	function (origin, x, y, z) {
		var m22 = z.p;
		var m21 = y.p;
		var m20 = x.p;
		var m12 = z.o;
		var m11 = y.o;
		var m10 = x.o;
		var m02 = z.n;
		var m01 = y.n;
		var m00 = x.n;
		var tr = (m00 + m11) + m22;
		if (tr > 0) {
			var s = $elm$core$Basics$sqrt(tr + 1.0) * 2;
			return A2(
				$author$project$Internal$Transform3d$Transform3d,
				origin,
				A4($author$project$Internal$Transform3d$Orientation3d, (m21 - m12) / s, (m02 - m20) / s, (m10 - m01) / s, 0.25 * s));
		} else {
			if (((m00 - m11) > 0) && ((m00 - m22) > 0)) {
				var s = $elm$core$Basics$sqrt(((1.0 + m00) - m11) - m22) * 2;
				return A2(
					$author$project$Internal$Transform3d$Transform3d,
					origin,
					A4($author$project$Internal$Transform3d$Orientation3d, 0.25 * s, (m01 + m10) / s, (m02 + m20) / s, (m21 - m12) / s));
			} else {
				if ((m11 - m22) > 0) {
					var s = $elm$core$Basics$sqrt(((1.0 + m11) - m00) - m22) * 2;
					return A2(
						$author$project$Internal$Transform3d$Transform3d,
						origin,
						A4($author$project$Internal$Transform3d$Orientation3d, (m01 + m10) / s, 0.25 * s, (m12 + m21) / s, (m02 - m20) / s));
				} else {
					var s = $elm$core$Basics$sqrt(((1.0 + m22) - m00) - m11) * 2;
					return A2(
						$author$project$Internal$Transform3d$Transform3d,
						origin,
						A4($author$project$Internal$Transform3d$Orientation3d, (m02 + m20) / s, (m12 + m21) / s, 0.25 * s, (m10 - m01) / s));
				}
			}
		}
	});
var $author$project$Internal$Transform3d$inverse = function (transform3d) {
	var _v0 = transform3d.b;
	var x = _v0.a;
	var y = _v0.b;
	var z = _v0.c;
	var w = _v0.d;
	return A2(
		$author$project$Internal$Transform3d$Transform3d,
		A2($author$project$Internal$Transform3d$pointRelativeTo, transform3d, $author$project$Internal$Vector3$zero),
		A4($author$project$Internal$Transform3d$Orientation3d, -x, -y, -z, w));
};
var $author$project$Internal$Transform3d$orientation = function (_v0) {
	var _v1 = _v0.b;
	var x = _v1.a;
	var y = _v1.b;
	var z = _v1.c;
	var w = _v1.d;
	return {fN: (1 - ((2 * y) * y)) - ((2 * z) * z), fO: ((2 * x) * y) - ((2 * w) * z), fP: ((2 * x) * z) + ((2 * w) * y), fR: ((2 * x) * y) + ((2 * w) * z), fS: (1 - ((2 * x) * x)) - ((2 * z) * z), fT: ((2 * y) * z) - ((2 * w) * x), fV: ((2 * x) * z) - ((2 * w) * y), fW: ((2 * y) * z) + ((2 * w) * x), fX: (1 - ((2 * x) * x)) - ((2 * y) * y)};
};
var $author$project$Internal$Transform3d$invertedInertiaRotateIn = F2(
	function (transform3d, invInertia) {
		var c = invInertia.p;
		var b = invInertia.o;
		var a = invInertia.n;
		var _v0 = $author$project$Internal$Transform3d$orientation(transform3d);
		var m33 = _v0.fX;
		var m23 = _v0.fT;
		var m13 = _v0.fP;
		var m32 = _v0.fW;
		var m22 = _v0.fS;
		var m12 = _v0.fO;
		var m31 = _v0.fV;
		var m21 = _v0.fR;
		var m11 = _v0.fN;
		return {fN: (((m11 * m11) * a) + ((m12 * m12) * b)) + ((m13 * m13) * c), fO: (((m11 * m21) * a) + ((m12 * m22) * b)) + ((m13 * m23) * c), fP: (((m11 * m31) * a) + ((m12 * m32) * b)) + ((m13 * m33) * c), fR: (((m21 * m11) * a) + ((m22 * m12) * b)) + ((m23 * m13) * c), fS: (((m21 * m21) * a) + ((m22 * m22) * b)) + ((m23 * m23) * c), fT: (((m21 * m31) * a) + ((m22 * m32) * b)) + ((m23 * m33) * c), fV: (((m31 * m11) * a) + ((m32 * m12) * b)) + ((m33 * m13) * c), fW: (((m31 * m21) * a) + ((m32 * m22) * b)) + ((m33 * m23) * c), fX: (((m31 * m31) * a) + ((m32 * m32) * b)) + ((m33 * m33) * c)};
	});
var $author$project$Internal$Shape$Capsule = function (a) {
	return {$: 3, a: a};
};
var $author$project$Internal$Shape$Convex = function (a) {
	return {$: 0, a: a};
};
var $author$project$Internal$Shape$Particle = function (a) {
	return {$: 4, a: a};
};
var $author$project$Internal$Shape$Plane = function (a) {
	return {$: 1, a: a};
};
var $author$project$Internal$Shape$Sphere = function (a) {
	return {$: 2, a: a};
};
var $author$project$Internal$Transform3d$directionPlaceIn = F2(
	function (_v0, worldVector) {
		var globalOrientation = _v0.b;
		return A2($author$project$Internal$Transform3d$rotate, globalOrientation, worldVector);
	});
var $author$project$Internal$Matrix3$mul = F2(
	function (a, b) {
		return {fN: ((a.fN * b.fN) + (a.fO * b.fR)) + (a.fP * b.fV), fO: ((a.fN * b.fO) + (a.fO * b.fS)) + (a.fP * b.fW), fP: ((a.fN * b.fP) + (a.fO * b.fT)) + (a.fP * b.fX), fR: ((a.fR * b.fN) + (a.fS * b.fR)) + (a.fT * b.fV), fS: ((a.fR * b.fO) + (a.fS * b.fS)) + (a.fT * b.fW), fT: ((a.fR * b.fP) + (a.fS * b.fT)) + (a.fT * b.fX), fV: ((a.fV * b.fN) + (a.fW * b.fR)) + (a.fX * b.fV), fW: ((a.fV * b.fO) + (a.fW * b.fS)) + (a.fX * b.fW), fX: ((a.fV * b.fP) + (a.fW * b.fT)) + (a.fX * b.fX)};
	});
var $author$project$Internal$Matrix3$transpose = function (m) {
	return {fN: m.fN, fO: m.fR, fP: m.fV, fR: m.fO, fS: m.fS, fT: m.fW, fV: m.fP, fW: m.fT, fX: m.fX};
};
var $author$project$Internal$Transform3d$inertiaRotateIn = F2(
	function (transform3d, inertia) {
		var rotation = $author$project$Internal$Transform3d$orientation(transform3d);
		return A2(
			$author$project$Internal$Matrix3$mul,
			rotation,
			A2(
				$author$project$Internal$Matrix3$mul,
				inertia,
				$author$project$Internal$Matrix3$transpose(rotation)));
	});
var $author$project$Shapes$Capsule$placeIn = F2(
	function (transform3d, _v0) {
		var inertia = _v0.fy;
		var volume = _v0.eM;
		var position = _v0.gs;
		var axis = _v0.eS;
		var halfLength = _v0.fs;
		var radius = _v0.dj;
		return {
			eS: A2($author$project$Internal$Transform3d$directionPlaceIn, transform3d, axis),
			fs: halfLength,
			fy: A2($author$project$Internal$Transform3d$inertiaRotateIn, transform3d, inertia),
			gs: A2($author$project$Internal$Transform3d$pointPlaceIn, transform3d, position),
			dj: radius,
			eM: volume
		};
	});
var $author$project$Internal$VertexBuffer$Node = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $author$project$Internal$VertexBuffer$Empty = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $author$project$Internal$VertexBuffer$empty = A4($author$project$Internal$VertexBuffer$Empty, 0, 0, 0, 0);
var $author$project$Internal$VertexBuffer$map = F2(
	function (fn, buffer) {
		if (buffer.$ === 1) {
			return $author$project$Internal$VertexBuffer$empty;
		} else {
			var key = buffer.a;
			var value = buffer.b;
			var left = buffer.c;
			var right = buffer.d;
			return A4(
				$author$project$Internal$VertexBuffer$Node,
				key,
				fn(value),
				A2($author$project$Internal$VertexBuffer$map, fn, left),
				A2($author$project$Internal$VertexBuffer$map, fn, right));
		}
	});
var $author$project$Shapes$Convex$OneSidedFace = F6(
	function (a, b, c, d, e, f) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $author$project$Shapes$Convex$TwoSidedFace = F6(
	function (a, b, c, d, e, f) {
		return {$: 1, a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $author$project$Shapes$Convex$placeFaces = F3(
	function (transform3d, faces, result) {
		placeFaces:
		while (true) {
			if (faces.b) {
				if (!faces.a.$) {
					var _v1 = faces.a;
					var normal = _v1.a;
					var indices = _v1.b;
					var faceDist = _v1.c;
					var a = _v1.d;
					var b = _v1.e;
					var c = _v1.f;
					var rest = faces.b;
					var $temp$transform3d = transform3d,
						$temp$faces = rest,
						$temp$result = A2(
						$elm$core$List$cons,
						A6(
							$author$project$Shapes$Convex$OneSidedFace,
							A2($author$project$Internal$Transform3d$directionPlaceIn, transform3d, normal),
							indices,
							faceDist,
							a,
							b,
							c),
						result);
					transform3d = $temp$transform3d;
					faces = $temp$faces;
					result = $temp$result;
					continue placeFaces;
				} else {
					var _v2 = faces.a;
					var n1 = _v2.a;
					var i1 = _v2.b;
					var d1 = _v2.c;
					var n2 = _v2.d;
					var i2 = _v2.e;
					var d2 = _v2.f;
					var rest = faces.b;
					var $temp$transform3d = transform3d,
						$temp$faces = rest,
						$temp$result = A2(
						$elm$core$List$cons,
						A6(
							$author$project$Shapes$Convex$TwoSidedFace,
							A2($author$project$Internal$Transform3d$directionPlaceIn, transform3d, n1),
							i1,
							d1,
							A2($author$project$Internal$Transform3d$directionPlaceIn, transform3d, n2),
							i2,
							d2),
						result);
					transform3d = $temp$transform3d;
					faces = $temp$faces;
					result = $temp$result;
					continue placeFaces;
				}
			} else {
				return result;
			}
		}
	});
var $author$project$Shapes$Convex$Box = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $author$project$Shapes$Convex$NotBox = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $author$project$Internal$VertexBuffer$foldl = F3(
	function (fn, acc, buffer) {
		foldl:
		while (true) {
			if (buffer.$ === 1) {
				return acc;
			} else {
				var value = buffer.b;
				var left = buffer.c;
				var right = buffer.d;
				var $temp$fn = fn,
					$temp$acc = A2(
					fn,
					value,
					A3($author$project$Internal$VertexBuffer$foldl, fn, acc, left)),
					$temp$buffer = right;
				fn = $temp$fn;
				acc = $temp$acc;
				buffer = $temp$buffer;
				continue foldl;
			}
		}
	});
var $author$project$Shapes$Convex$placeObb = F3(
	function (transform3d, placedBuffer, obb) {
		if (!obb.$) {
			var ax = obb.a;
			var ay = obb.b;
			var az = obb.c;
			var he = obb.d;
			return A4(
				$author$project$Shapes$Convex$Box,
				A2($author$project$Internal$Transform3d$directionPlaceIn, transform3d, ax),
				A2($author$project$Internal$Transform3d$directionPlaceIn, transform3d, ay),
				A2($author$project$Internal$Transform3d$directionPlaceIn, transform3d, az),
				he);
		} else {
			return A4(
				$author$project$Shapes$Convex$NotBox,
				A3($author$project$Internal$VertexBuffer$foldl, $elm$core$List$cons, _List_Nil, placedBuffer),
				0,
				0,
				0);
		}
	});
var $author$project$Shapes$Convex$placeIn = F2(
	function (transform3d, convex) {
		var placedBuffer = A2(
			$author$project$Internal$VertexBuffer$map,
			$author$project$Internal$Transform3d$pointPlaceIn(transform3d),
			convex.bA);
		return {
			e9: A3($author$project$Shapes$Convex$placeFaces, transform3d, convex.e9, _List_Nil),
			fy: A2($author$project$Internal$Transform3d$inertiaRotateIn, transform3d, convex.fy),
			hX: A3($author$project$Shapes$Convex$placeObb, transform3d, placedBuffer, convex.hX),
			gs: A2($author$project$Internal$Transform3d$pointPlaceIn, transform3d, convex.gs),
			gR: convex.gR,
			bA: placedBuffer,
			eM: convex.eM
		};
	});
var $author$project$Shapes$Plane$placeIn = F2(
	function (transform3d, _v0) {
		var position = _v0.gs;
		var normal = _v0.c8;
		return {
			c8: A2($author$project$Internal$Transform3d$directionPlaceIn, transform3d, normal),
			gs: A2($author$project$Internal$Transform3d$pointPlaceIn, transform3d, position)
		};
	});
var $author$project$Shapes$Sphere$placeIn = F2(
	function (transform3d, _v0) {
		var inertia = _v0.fy;
		var volume = _v0.eM;
		var position = _v0.gs;
		var radius = _v0.dj;
		return {
			fy: inertia,
			gs: A2($author$project$Internal$Transform3d$pointPlaceIn, transform3d, position),
			dj: radius,
			eM: volume
		};
	});
var $author$project$Internal$Shape$placeIn = F2(
	function (transform3d, shape) {
		switch (shape.$) {
			case 0:
				var convex = shape.a;
				return $author$project$Internal$Shape$Convex(
					A2($author$project$Shapes$Convex$placeIn, transform3d, convex));
			case 1:
				var plane = shape.a;
				return $author$project$Internal$Shape$Plane(
					A2($author$project$Shapes$Plane$placeIn, transform3d, plane));
			case 2:
				var sphere = shape.a;
				return $author$project$Internal$Shape$Sphere(
					A2($author$project$Shapes$Sphere$placeIn, transform3d, sphere));
			case 3:
				var capsule = shape.a;
				return $author$project$Internal$Shape$Capsule(
					A2($author$project$Shapes$Capsule$placeIn, transform3d, capsule));
			default:
				var position = shape.a;
				return $author$project$Internal$Shape$Particle(
					A2($author$project$Internal$Transform3d$pointPlaceIn, transform3d, position));
		}
	});
var $author$project$Internal$Matrix3$add = F2(
	function (a, b) {
		return {fN: a.fN + b.fN, fO: a.fO + b.fO, fP: a.fP + b.fP, fR: a.fR + b.fR, fS: a.fS + b.fS, fT: a.fT + b.fT, fV: a.fV + b.fV, fW: a.fW + b.fW, fX: a.fX + b.fX};
	});
var $author$project$Internal$Vector3$length = function (_v0) {
	var z = _v0.p;
	var y = _v0.o;
	var x = _v0.n;
	return $elm$core$Basics$sqrt(((x * x) + (y * y)) + (z * z));
};
var $author$project$Shapes$Capsule$expandBoundingSphereRadius = F2(
	function (_v0, boundingSphereRadius) {
		var position = _v0.gs;
		var halfLength = _v0.fs;
		var radius = _v0.dj;
		return A2(
			$elm$core$Basics$max,
			($author$project$Internal$Vector3$length(position) + halfLength) + radius,
			boundingSphereRadius);
	});
var $author$project$Internal$Vector3$lengthSquared = function (_v0) {
	var z = _v0.p;
	var y = _v0.o;
	var x = _v0.n;
	return ((x * x) + (y * y)) + (z * z);
};
var $author$project$Shapes$Convex$expandBoundingSphereRadius = F2(
	function (_v0, boundingSphereRadius) {
		var vertexBuffer = _v0.bA;
		return $elm$core$Basics$sqrt(
			A3(
				$author$project$Internal$VertexBuffer$foldl,
				function (vertex) {
					return $elm$core$Basics$max(
						$author$project$Internal$Vector3$lengthSquared(vertex));
				},
				boundingSphereRadius * boundingSphereRadius,
				vertexBuffer));
	});
var $author$project$Shapes$Sphere$expandBoundingSphereRadius = F2(
	function (_v0, boundingSphereRadius) {
		var position = _v0.gs;
		var radius = _v0.dj;
		return A2(
			$elm$core$Basics$max,
			$author$project$Internal$Vector3$length(position) + radius,
			boundingSphereRadius);
	});
var $author$project$Internal$Const$maxNumber = 3.40282347e38;
var $author$project$Internal$Shape$expandBoundingSphereRadius = F2(
	function (shape, boundingSphereRadius) {
		switch (shape.$) {
			case 0:
				var convex = shape.a;
				return A2($author$project$Shapes$Convex$expandBoundingSphereRadius, convex, boundingSphereRadius);
			case 2:
				var sphere = shape.a;
				return A2($author$project$Shapes$Sphere$expandBoundingSphereRadius, sphere, boundingSphereRadius);
			case 3:
				var capsule = shape.a;
				return A2($author$project$Shapes$Capsule$expandBoundingSphereRadius, capsule, boundingSphereRadius);
			case 1:
				return $author$project$Internal$Const$maxNumber;
			default:
				var position = shape.a;
				return A2(
					$elm$core$Basics$max,
					boundingSphereRadius,
					$author$project$Internal$Vector3$length(position));
		}
	});
var $author$project$Internal$Matrix3$zero = {fN: 0, fO: 0, fP: 0, fR: 0, fS: 0, fT: 0, fV: 0, fW: 0, fX: 0};
var $author$project$Internal$Shape$inertia = function (shape) {
	switch (shape.$) {
		case 2:
			var sphere = shape.a;
			return sphere.fy;
		case 0:
			var convex = shape.a;
			return convex.fy;
		case 3:
			var capsule = shape.a;
			return capsule.fy;
		case 1:
			return $author$project$Internal$Matrix3$zero;
		default:
			return $author$project$Internal$Matrix3$zero;
	}
};
var $author$project$Internal$Matrix3$pointInertia = F4(
	function (m, x, y, z) {
		var m32 = ((-m) * y) * z;
		var m31 = ((-m) * x) * z;
		var m21 = ((-m) * x) * y;
		return {fN: m * ((y * y) + (z * z)), fO: m21, fP: m31, fR: m21, fS: m * ((z * z) + (x * x)), fT: m32, fV: m31, fW: m32, fX: m * ((x * x) + (y * y))};
	});
var $author$project$Internal$Transform3d$inertiaPlaceIn = F4(
	function (transform3d, centerOfMass, mass, inertia) {
		var z = transform3d.a.p;
		var y = transform3d.a.o;
		var x = transform3d.a.n;
		var rotatedInertia = A2($author$project$Internal$Transform3d$inertiaRotateIn, transform3d, inertia);
		var inertiaOffset = A4($author$project$Internal$Matrix3$pointInertia, mass, x - centerOfMass.n, y - centerOfMass.o, z - centerOfMass.p);
		return A2($author$project$Internal$Matrix3$add, rotatedInertia, inertiaOffset);
	});
var $author$project$Internal$Matrix3$scale = F2(
	function (k, m) {
		return {fN: k * m.fN, fO: k * m.fO, fP: k * m.fP, fR: k * m.fR, fS: k * m.fS, fT: k * m.fT, fV: k * m.fV, fW: k * m.fW, fX: k * m.fX};
	});
var $author$project$Internal$Body$placeShapes = F6(
	function (inverseCenterOfMassTransform3d, centerOfMassTransform3d, shapes, inertia, solidShapes, boundingSphereRadius) {
		placeShapes:
		while (true) {
			if (!shapes.b) {
				return {ca: boundingSphereRadius, fy: inertia, eC: solidShapes};
			} else {
				var _v1 = shapes.a;
				var shape = _v1.a;
				var mat = _v1.b;
				var sign = _v1.c;
				var rest = shapes.b;
				var movedShape = A2($author$project$Internal$Shape$placeIn, inverseCenterOfMassTransform3d, shape);
				var volume = $author$project$Internal$Shape$volume(movedShape);
				var resultInertia = A4(
					$author$project$Internal$Transform3d$inertiaPlaceIn,
					centerOfMassTransform3d,
					A2(
						$author$project$Internal$Transform3d$pointPlaceIn,
						centerOfMassTransform3d,
						$author$project$Internal$Shape$centerOfMass(movedShape)),
					volume,
					$author$project$Internal$Shape$inertia(movedShape));
				var $temp$inverseCenterOfMassTransform3d = inverseCenterOfMassTransform3d,
					$temp$centerOfMassTransform3d = centerOfMassTransform3d,
					$temp$shapes = rest,
					$temp$inertia = A2(
					$author$project$Internal$Matrix3$add,
					inertia,
					A2($author$project$Internal$Matrix3$scale, sign * mat.cL, resultInertia)),
					$temp$solidShapes = (sign > 0) ? A2(
					$elm$core$List$cons,
					_Utils_Tuple2(movedShape, mat),
					solidShapes) : solidShapes,
					$temp$boundingSphereRadius = (sign > 0) ? A2($author$project$Internal$Shape$expandBoundingSphereRadius, movedShape, boundingSphereRadius) : boundingSphereRadius;
				inverseCenterOfMassTransform3d = $temp$inverseCenterOfMassTransform3d;
				centerOfMassTransform3d = $temp$centerOfMassTransform3d;
				shapes = $temp$shapes;
				inertia = $temp$inertia;
				solidShapes = $temp$solidShapes;
				boundingSphereRadius = $temp$boundingSphereRadius;
				continue placeShapes;
			}
		}
	});
var $author$project$Internal$Body$compound = F2(
	function (kindInt, rawShapesWithMaterials) {
		var shapesWithMaterials = (kindInt === 2) ? rawShapesWithMaterials : A2(
			$elm$core$List$map,
			function (_v3) {
				var shape = _v3.a;
				var mat = _v3.b;
				var sign = _v3.c;
				return _Utils_Tuple3(
					shape,
					_Utils_update(
						mat,
						{cL: 0}),
					sign);
			},
			rawShapesWithMaterials);
		var _v0 = A6($author$project$Internal$Body$accumulateMassProps, shapesWithMaterials, 0, 0, 0, 0, 0);
		var centerOfMassPoint = _v0.eW;
		var totalVolume = _v0.gN;
		var totalMass = _v0.gM;
		var initialCenterOfMassTransform3d = $author$project$Internal$Transform3d$atPoint(centerOfMassPoint);
		var initialInverseCenterOfMassTransform3d = $author$project$Internal$Transform3d$inverse(initialCenterOfMassTransform3d);
		var initialPlaced = A6($author$project$Internal$Body$placeShapes, initialInverseCenterOfMassTransform3d, initialCenterOfMassTransform3d, shapesWithMaterials, $author$project$Internal$Matrix3$zero, _List_Nil, 0);
		var _v1 = $author$project$Internal$Matrix3$eigenDecomposition(initialPlaced.fy);
		var v3 = _v1.$9;
		var v2 = _v1.im;
		var v1 = _v1.il;
		var eigenvalues = _v1.hk;
		var invInertia = {
			n: (!eigenvalues.n) ? 0 : (1 / eigenvalues.n),
			o: (!eigenvalues.o) ? 0 : (1 / eigenvalues.o),
			p: (!eigenvalues.p) ? 0 : (1 / eigenvalues.p)
		};
		var eigenRotation = A4($author$project$Internal$Transform3d$fromOriginAndBasis, $author$project$Internal$Vector3$zero, v1, v2, v3);
		var centerOfMassTransform3d = A2($author$project$Internal$Transform3d$placeIn, initialCenterOfMassTransform3d, eigenRotation);
		var inverseCenterOfMassTransform3d = $author$project$Internal$Transform3d$inverse(centerOfMassTransform3d);
		var placed = A6($author$project$Internal$Body$placeShapes, inverseCenterOfMassTransform3d, centerOfMassTransform3d, shapesWithMaterials, $author$project$Internal$Matrix3$zero, _List_Nil, 0);
		var transform3d = A2($author$project$Internal$Transform3d$placeIn, $author$project$Internal$Transform3d$atOrigin, centerOfMassTransform3d);
		return {
			eP: 0.01,
			eQ: {n: 1, o: 1, p: 1},
			eR: $author$project$Internal$Vector3$zero,
			eX: centerOfMassTransform3d,
			fa: $author$project$Internal$Vector3$zero,
			fp: {ca: placed.ca, eA: placed.eC, eM: totalVolume},
			bt: -1,
			fz: invInertia,
			fA: A2($author$project$Internal$Transform3d$invertedInertiaRotateIn, transform3d, invInertia),
			fB: (!totalMass) ? 0 : (1 / totalMass),
			fE: kindInt,
			fL: 0.01,
			fM: {n: 1, o: 1, p: 1},
			f1: totalMass,
			gL: $author$project$Internal$Vector3$zero,
			gP: transform3d,
			gS: $author$project$Internal$Vector3$zero,
			gW: A2(
				$elm$core$List$map,
				function (_v2) {
					var s = _v2.a;
					var m = _v2.b;
					return _Utils_Tuple2(
						A2($author$project$Internal$Shape$placeIn, transform3d, s),
						m);
				},
				placed.eC)
		};
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Physics$dynamic = function (shapesWithMaterials) {
	return A2(
		$author$project$Internal$Body$compound,
		2,
		A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var entries = _v0.a;
				var internalMat = _v0.b;
				return A2(
					$elm$core$List$map,
					function (_v1) {
						var shape = _v1.a;
						var sign = _v1.b;
						return _Utils_Tuple3(shape, internalMat, sign);
					},
					entries);
			},
			shapesWithMaterials));
};
var $author$project$Physics$Types$Shape = $elm$core$Basics$identity;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$Internal$Matrix3$sphereInertia = F2(
	function (m, radius) {
		var i = (((m * 2) / 5) * radius) * radius;
		return {fN: i, fO: 0, fP: 0, fR: 0, fS: i, fT: 0, fV: 0, fW: 0, fX: i};
	});
var $author$project$Shapes$Sphere$atOrigin = function (radius) {
	var volume = ((4 / 3) * $elm$core$Basics$pi) * A2($elm$core$Basics$pow, radius, 3);
	return {
		fy: A2($author$project$Internal$Matrix3$sphereInertia, volume, radius),
		gs: $author$project$Internal$Vector3$zero,
		dj: radius,
		eM: volume
	};
};
var $ianmackenzie$elm_geometry$Sphere3d$centerPoint = function (_v0) {
	var properties = _v0;
	return properties.g8;
};
var $ianmackenzie$elm_geometry$Sphere3d$radius = function (_v0) {
	var properties = _v0;
	return properties.dj;
};
var $author$project$Physics$Shape$sphere = function (sphere3d) {
	var radius = $ianmackenzie$elm_units$Length$inMeters(
		$ianmackenzie$elm_geometry$Sphere3d$radius(sphere3d));
	var origin = $ianmackenzie$elm_geometry$Point3d$toMeters(
		$ianmackenzie$elm_geometry$Sphere3d$centerPoint(sphere3d));
	return _List_fromArray(
		[
			_Utils_Tuple2(
			$author$project$Internal$Shape$Sphere(
				A2(
					$author$project$Shapes$Sphere$placeIn,
					$author$project$Internal$Transform3d$atPoint(origin),
					$author$project$Shapes$Sphere$atOrigin(radius))),
			1)
		]);
};
var $author$project$Physics$sphere = F2(
	function (sphere3d, mat) {
		return $author$project$Physics$dynamic(
			_List_fromArray(
				[
					_Utils_Tuple2(
					$author$project$Physics$Shape$sphere(sphere3d),
					mat)
				]));
	});
var $ianmackenzie$elm_geometry$Vector3d$toMeters = function (_v0) {
	var vectorComponents = _v0;
	return vectorComponents;
};
var $author$project$Internal$Transform3d$translateBy = F2(
	function (vector, _v0) {
		var localOrigin = _v0.a;
		var localOrientation = _v0.b;
		return A2(
			$author$project$Internal$Transform3d$Transform3d,
			A2($author$project$Internal$Vector3$add, vector, localOrigin),
			localOrientation);
	});
var $author$project$Physics$translateBy = F2(
	function (vector3d, _v0) {
		var body = _v0;
		var bodyCoordinatesTransform3d = A2(
			$author$project$Internal$Transform3d$placeIn,
			body.gP,
			$author$project$Internal$Transform3d$inverse(body.eX));
		var newTransform3d = A2(
			$author$project$Internal$Transform3d$placeIn,
			A2(
				$author$project$Internal$Transform3d$translateBy,
				$ianmackenzie$elm_geometry$Vector3d$toMeters(vector3d),
				bodyCoordinatesTransform3d),
			body.eX);
		return {
			eP: body.eP,
			eQ: body.eQ,
			eR: body.eR,
			eX: body.eX,
			fa: body.fa,
			fp: body.fp,
			bt: body.bt,
			fz: body.fz,
			fA: body.fA,
			fB: body.fB,
			fE: body.fE,
			fL: body.fL,
			fM: body.fM,
			f1: body.f1,
			gL: body.gL,
			gP: newTransform3d,
			gS: body.gS,
			gW: A2(
				$elm$core$List$map,
				function (_v1) {
					var s = _v1.a;
					var m = _v1.b;
					return _Utils_Tuple2(
						A2($author$project$Internal$Shape$placeIn, newTransform3d, s),
						m);
				},
				body.fp.eA)
		};
	});
var $author$project$Main$initPlayer = A2(
	$author$project$Physics$damp,
	{g0: 0.5, hM: 0.01},
	A2(
		$author$project$Physics$translateBy,
		A3($ianmackenzie$elm_geometry$Vector3d$meters, 0, 0, 2),
		A2(
			$author$project$Physics$sphere,
			$author$project$Main$playerSphere,
			$author$project$Physics$Material$dense(
				{
					eV: 0.1,
					cL: $ianmackenzie$elm_units$Density$kilogramsPerCubicMeter(900),
					fe: 0.9
				}))));
var $author$project$Main$initTimer = $ianmackenzie$elm_units$Duration$seconds(30);
var $w0rm$elm_timestep$Timestep$init = function (config) {
	return {
		e4: config.e4,
		ce: $ianmackenzie$elm_units$Quantity$zero,
		hP: A2($elm$core$Basics$max, 1, config.hP),
		bk: 0
	};
};
var $author$project$Main$initTimestep = $w0rm$elm_timestep$Timestep$init(
	{
		e4: $ianmackenzie$elm_units$Duration$seconds(1 / 60),
		hP: 2
	});
var $author$project$Main$Wall = {$: 2};
var $ianmackenzie$elm_geometry$Direction3d$reverse = function (_v0) {
	var d = _v0;
	return {n: -d.n, o: -d.o, p: -d.p};
};
var $ianmackenzie$elm_geometry$Geometry$Types$Plane3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Plane3d$through = F2(
	function (givenPoint, givenNormalDirection) {
		return {gd: givenNormalDirection, gl: givenPoint};
	});
var $ianmackenzie$elm_geometry$Plane3d$flip = function (_v0) {
	var plane = _v0;
	return A2(
		$ianmackenzie$elm_geometry$Plane3d$through,
		plane.gl,
		$ianmackenzie$elm_geometry$Direction3d$reverse(plane.gd));
};
var $author$project$Main$maxExtent = 1.5;
var $ianmackenzie$elm_geometry$Plane3d$normalDirection = function (_v0) {
	var plane = _v0;
	return plane.gd;
};
var $ianmackenzie$elm_geometry$Plane3d$originPoint = function (_v0) {
	var plane = _v0;
	return plane.gl;
};
var $ianmackenzie$elm_geometry$Direction3d$unwrap = function (_v0) {
	var coordinates = _v0;
	return coordinates;
};
var $author$project$Physics$plane = F2(
	function (plane3d, _v0) {
		var internalMat = _v0;
		var position = $ianmackenzie$elm_geometry$Point3d$toMeters(
			$ianmackenzie$elm_geometry$Plane3d$originPoint(plane3d));
		var normal = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Plane3d$normalDirection(plane3d));
		return A2(
			$author$project$Internal$Body$compound,
			1,
			_List_fromArray(
				[
					_Utils_Tuple3(
					$author$project$Internal$Shape$Plane(
						{c8: normal, gs: position}),
					internalMat,
					1)
				]));
	});
var $ianmackenzie$elm_geometry$Point3d$translateBy = F2(
	function (_v0, _v1) {
		var v = _v0;
		var p = _v1;
		return {n: p.n + v.n, o: p.o + v.o, p: p.p + v.p};
	});
var $ianmackenzie$elm_geometry$Plane3d$withNormalDirection = F2(
	function (givenNormalDirection, givenPoint) {
		return {gd: givenNormalDirection, gl: givenPoint};
	});
var $ianmackenzie$elm_geometry$Plane3d$translateBy = F2(
	function (vector, _v0) {
		var plane = _v0;
		return A2(
			$ianmackenzie$elm_geometry$Plane3d$withNormalDirection,
			plane.gd,
			A2($ianmackenzie$elm_geometry$Point3d$translateBy, vector, plane.gl));
	});
var $author$project$Internal$Material$wood = {eV: 0.3, cL: 700, fe: 0.4};
var $author$project$Physics$Material$wood = $author$project$Internal$Material$wood;
var $ianmackenzie$elm_geometry$Plane3d$yz = A2($ianmackenzie$elm_geometry$Plane3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$x);
var $ianmackenzie$elm_geometry$Plane3d$zx = A2($ianmackenzie$elm_geometry$Plane3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$y);
var $author$project$Main$initWalls = _List_fromArray(
	[
		_Utils_Tuple2(
		$author$project$Main$Wall,
		A2(
			$author$project$Physics$plane,
			A2(
				$ianmackenzie$elm_geometry$Plane3d$translateBy,
				A3($ianmackenzie$elm_geometry$Vector3d$meters, $author$project$Main$maxExtent, 0, 0),
				$ianmackenzie$elm_geometry$Plane3d$flip($ianmackenzie$elm_geometry$Plane3d$yz)),
			$author$project$Physics$Material$wood)),
		_Utils_Tuple2(
		$author$project$Main$Wall,
		A2(
			$author$project$Physics$plane,
			A2(
				$ianmackenzie$elm_geometry$Plane3d$translateBy,
				A3($ianmackenzie$elm_geometry$Vector3d$meters, -$author$project$Main$maxExtent, 0, 0),
				$ianmackenzie$elm_geometry$Plane3d$yz),
			$author$project$Physics$Material$wood)),
		_Utils_Tuple2(
		$author$project$Main$Wall,
		A2(
			$author$project$Physics$plane,
			A2(
				$ianmackenzie$elm_geometry$Plane3d$translateBy,
				A3($ianmackenzie$elm_geometry$Vector3d$meters, 0, $author$project$Main$maxExtent, 0),
				$ianmackenzie$elm_geometry$Plane3d$flip($ianmackenzie$elm_geometry$Plane3d$zx)),
			$author$project$Physics$Material$wood)),
		_Utils_Tuple2(
		$author$project$Main$Wall,
		A2(
			$author$project$Physics$plane,
			A2(
				$ianmackenzie$elm_geometry$Plane3d$translateBy,
				A3($ianmackenzie$elm_geometry$Vector3d$meters, 0, -$author$project$Main$maxExtent, 0),
				$ianmackenzie$elm_geometry$Plane3d$zx),
			$author$project$Physics$Material$wood))
	]);
var $author$project$Main$FloorPiece = function (a) {
	return {$: 1, a: a};
};
var $ianmackenzie$elm_geometry$Frame3d$copy = function (_v0) {
	var properties = _v0;
	return properties;
};
var $ianmackenzie$elm_geometry$Block3d$axes = function (_v0) {
	var block = _v0;
	return $ianmackenzie$elm_geometry$Frame3d$copy(block.g4);
};
var $ianmackenzie$elm_geometry$Block3d$dimensions = function (_v0) {
	var block = _v0;
	return block.hg;
};
var $author$project$Internal$Vector3$dot = F2(
	function (a, b) {
		return ((a.n * b.n) + (a.o * b.o)) + (a.p * b.p);
	});
var $author$project$Shapes$Convex$orthogonalTolerance = 1.0e-6;
var $author$project$Shapes$Convex$orthogonal = F2(
	function (a, b) {
		return ($elm$core$Basics$abs(
			A2($author$project$Internal$Vector3$dot, a, b)) - $author$project$Shapes$Convex$orthogonalTolerance) < 0;
	});
var $author$project$Shapes$Convex$detectObb = F2(
	function (faces, vertices) {
		if ((((((faces.b && (faces.a.$ === 1)) && faces.b.b) && (faces.b.a.$ === 1)) && faces.b.b.b) && (faces.b.b.a.$ === 1)) && (!faces.b.b.b.b)) {
			var _v1 = faces.a;
			var n0 = _v1.a;
			var d0 = _v1.c;
			var _v2 = faces.b;
			var _v3 = _v2.a;
			var n1 = _v3.a;
			var d1 = _v3.c;
			var _v4 = _v2.b;
			var _v5 = _v4.a;
			var n2 = _v5.a;
			var d2 = _v5.c;
			return (A2($author$project$Shapes$Convex$orthogonal, n0, n1) && (A2($author$project$Shapes$Convex$orthogonal, n1, n2) && A2($author$project$Shapes$Convex$orthogonal, n0, n2))) ? A4(
				$author$project$Shapes$Convex$Box,
				n0,
				n1,
				n2,
				{n: d0, o: d1, p: d2}) : A4($author$project$Shapes$Convex$NotBox, vertices, 0, 0, 0);
		} else {
			return A4($author$project$Shapes$Convex$NotBox, vertices, 0, 0, 0);
		}
	});
var $author$project$Internal$VertexBuffer$count = F2(
	function (list, acc) {
		count:
		while (true) {
			if (list.b) {
				var rest = list.b;
				var $temp$list = rest,
					$temp$acc = acc + 1;
				list = $temp$list;
				acc = $temp$acc;
				continue count;
			} else {
				return acc;
			}
		}
	});
var $author$project$Internal$VertexBuffer$fromListHelp = F3(
	function (n, startKey, vertices) {
		if (n <= 0) {
			return _Utils_Tuple3($author$project$Internal$VertexBuffer$empty, vertices, startKey);
		} else {
			var _v0 = A3($author$project$Internal$VertexBuffer$fromListHelp, (n / 2) | 0, startKey, vertices);
			var left = _v0.a;
			var afterLeft = _v0.b;
			var rootKey = _v0.c;
			if (afterLeft.b) {
				var value = afterLeft.a;
				var rest = afterLeft.b;
				var _v2 = A3($author$project$Internal$VertexBuffer$fromListHelp, (n - ((n / 2) | 0)) - 1, rootKey + 1, rest);
				var right = _v2.a;
				var afterRight = _v2.b;
				var nextKey = _v2.c;
				return _Utils_Tuple3(
					A4($author$project$Internal$VertexBuffer$Node, rootKey, value, left, right),
					afterRight,
					nextKey);
			} else {
				return _Utils_Tuple3($author$project$Internal$VertexBuffer$empty, _List_Nil, rootKey);
			}
		}
	});
var $author$project$Internal$VertexBuffer$fromList = function (vertices) {
	var _v0 = A3(
		$author$project$Internal$VertexBuffer$fromListHelp,
		A2($author$project$Internal$VertexBuffer$count, vertices, 0),
		0,
		vertices);
	var buffer = _v0.a;
	return buffer;
};
var $author$project$Shapes$Convex$indexOfHelp = F3(
	function (target, vertices, i) {
		indexOfHelp:
		while (true) {
			if (vertices.b) {
				var v = vertices.a;
				var rest = vertices.b;
				if (_Utils_eq(v, target)) {
					return i;
				} else {
					var $temp$target = target,
						$temp$vertices = rest,
						$temp$i = i + 1;
					target = $temp$target;
					vertices = $temp$vertices;
					i = $temp$i;
					continue indexOfHelp;
				}
			} else {
				return -1;
			}
		}
	});
var $author$project$Shapes$Convex$indexOf = F2(
	function (target, vertices) {
		return A3($author$project$Shapes$Convex$indexOfHelp, target, vertices, 0);
	});
var $author$project$Shapes$Convex$indexEdges = F2(
	function (vertices, groups) {
		return A2(
			$elm$core$List$map,
			function (group) {
				return $elm$core$List$reverse(
					A2(
						$elm$core$List$map,
						function (v) {
							return A2($author$project$Shapes$Convex$indexOf, v, vertices);
						},
						group));
			},
			groups);
	});
var $author$project$Shapes$Convex$faceDistance = F3(
	function (normal, centroid, vertices) {
		if (vertices.b) {
			var v = vertices.a;
			return A2(
				$author$project$Internal$Vector3$dot,
				normal,
				A2($author$project$Internal$Vector3$sub, v, centroid));
		} else {
			return 0;
		}
	});
var $author$project$Shapes$Convex$indexFaceVertices = F2(
	function (vertices, face) {
		return A2(
			$elm$core$List$map,
			function (v) {
				return A2($author$project$Shapes$Convex$indexOf, v, vertices);
			},
			face.bB);
	});
var $author$project$Shapes$Convex$indexFaces = F3(
	function (centroid, vertices, faces) {
		return A2(
			$elm$core$List$map,
			function (_v0) {
				var primary = _v0.a;
				var partner = _v0.b;
				if (!partner.$) {
					var p = partner.a;
					return A6(
						$author$project$Shapes$Convex$TwoSidedFace,
						primary.c8,
						A2($author$project$Shapes$Convex$indexFaceVertices, vertices, primary),
						A3($author$project$Shapes$Convex$faceDistance, primary.c8, centroid, primary.bB),
						p.c8,
						A2($author$project$Shapes$Convex$indexFaceVertices, vertices, p),
						A3($author$project$Shapes$Convex$faceDistance, primary.c8, centroid, p.bB));
				} else {
					return A6(
						$author$project$Shapes$Convex$OneSidedFace,
						primary.c8,
						A2($author$project$Shapes$Convex$indexFaceVertices, vertices, primary),
						A3($author$project$Shapes$Convex$faceDistance, primary.c8, centroid, primary.bB),
						0,
						0,
						0);
				}
			},
			faces);
	});
var $author$project$Shapes$Convex$init = function (geometry) {
	var faces = A3($author$project$Shapes$Convex$indexFaces, geometry.gs, geometry.bB, geometry.e9);
	var buffer = $author$project$Internal$VertexBuffer$fromList(geometry.bB);
	return {
		e9: faces,
		fy: geometry.fy,
		hX: A2($author$project$Shapes$Convex$detectObb, faces, geometry.bB),
		gs: geometry.gs,
		gR: A2(
			$author$project$Shapes$Convex$indexEdges,
			geometry.bB,
			$elm$core$List$reverse(geometry.gR)),
		bA: buffer,
		eM: geometry.eM
	};
};
var $author$project$Internal$Vector3$xAxis = {n: 1, o: 0, p: 0};
var $author$project$Internal$Vector3$xNegative = {n: -1, o: 0, p: 0};
var $author$project$Internal$Vector3$yAxis = {n: 0, o: 1, p: 0};
var $author$project$Internal$Vector3$yNegative = {n: 0, o: -1, p: 0};
var $author$project$Internal$Vector3$zAxis = {n: 0, o: 0, p: 1};
var $author$project$Internal$Vector3$zNegative = {n: 0, o: 0, p: -1};
var $author$project$Shapes$Convex$fromBlock = F3(
	function (sizeX, sizeY, sizeZ) {
		var z = sizeZ / 2;
		var y = sizeY / 2;
		var x = sizeX / 2;
		var volume = (sizeX * sizeY) * sizeZ;
		var v7 = {n: -x, o: y, p: z};
		var v6 = {n: x, o: y, p: z};
		var v5 = {n: x, o: -y, p: z};
		var v4 = {n: -x, o: -y, p: z};
		var v3 = {n: -x, o: y, p: -z};
		var v2 = {n: x, o: y, p: -z};
		var v1 = {n: x, o: -y, p: -z};
		var v0 = {n: -x, o: -y, p: -z};
		var vertices = _List_fromArray(
			[v0, v1, v2, v3, v4, v5, v6, v7]);
		var uniqueEdges = _List_fromArray(
			[
				_List_fromArray(
				[v2, v3, v5, v4, v6, v7, v1, v0]),
				_List_fromArray(
				[v2, v1, v7, v4, v6, v5, v3, v0]),
				_List_fromArray(
				[v5, v1, v6, v2, v7, v3, v4, v0])
			]);
		var inertia = {fN: (volume / 12) * ((sizeY * sizeY) + (sizeZ * sizeZ)), fO: 0, fP: 0, fR: 0, fS: (volume / 12) * ((sizeX * sizeX) + (sizeZ * sizeZ)), fT: 0, fV: 0, fW: 0, fX: (volume / 12) * ((sizeY * sizeY) + (sizeX * sizeX))};
		var faces = _List_fromArray(
			[
				_Utils_Tuple2(
				{
					c8: $author$project$Internal$Vector3$zAxis,
					bB: _List_fromArray(
						[v4, v5, v6, v7])
				},
				$elm$core$Maybe$Just(
					{
						c8: $author$project$Internal$Vector3$zNegative,
						bB: _List_fromArray(
							[v3, v2, v1, v0])
					})),
				_Utils_Tuple2(
				{
					c8: $author$project$Internal$Vector3$yAxis,
					bB: _List_fromArray(
						[v2, v3, v7, v6])
				},
				$elm$core$Maybe$Just(
					{
						c8: $author$project$Internal$Vector3$yNegative,
						bB: _List_fromArray(
							[v5, v4, v0, v1])
					})),
				_Utils_Tuple2(
				{
					c8: $author$project$Internal$Vector3$xAxis,
					bB: _List_fromArray(
						[v1, v2, v6, v5])
				},
				$elm$core$Maybe$Just(
					{
						c8: $author$project$Internal$Vector3$xNegative,
						bB: _List_fromArray(
							[v0, v4, v7, v3])
					}))
			]);
		return $author$project$Shapes$Convex$init(
			{e9: faces, fy: inertia, gs: $author$project$Internal$Vector3$zero, gR: uniqueEdges, bB: vertices, eM: volume});
	});
var $ianmackenzie$elm_geometry$Direction3d$xComponent = function (_v0) {
	var d = _v0;
	return d.n;
};
var $ianmackenzie$elm_geometry$Direction3d$yComponent = function (_v0) {
	var d = _v0;
	return d.o;
};
var $ianmackenzie$elm_geometry$Direction3d$zComponent = function (_v0) {
	var d = _v0;
	return d.p;
};
var $ianmackenzie$elm_geometry$Frame3d$isRightHanded = function (_v0) {
	var frame = _v0;
	var i = $ianmackenzie$elm_geometry$Direction3d$zComponent(frame.g_);
	var h = $ianmackenzie$elm_geometry$Direction3d$yComponent(frame.g_);
	var g = $ianmackenzie$elm_geometry$Direction3d$xComponent(frame.g_);
	var f = $ianmackenzie$elm_geometry$Direction3d$zComponent(frame.gY);
	var e = $ianmackenzie$elm_geometry$Direction3d$yComponent(frame.gY);
	var d = $ianmackenzie$elm_geometry$Direction3d$xComponent(frame.gY);
	var c = $ianmackenzie$elm_geometry$Direction3d$zComponent(frame.gX);
	var b = $ianmackenzie$elm_geometry$Direction3d$yComponent(frame.gX);
	var a = $ianmackenzie$elm_geometry$Direction3d$xComponent(frame.gX);
	return (((((((a * e) * i) + ((b * f) * g)) + ((c * d) * h)) - ((c * e) * g)) - ((b * d) * i)) - ((a * f) * h)) > 0;
};
var $ianmackenzie$elm_geometry$Frame3d$originPoint = function (_v0) {
	var properties = _v0;
	return properties.gl;
};
var $ianmackenzie$elm_geometry$Frame3d$xDirection = function (_v0) {
	var properties = _v0;
	return properties.gX;
};
var $ianmackenzie$elm_geometry$Frame3d$yDirection = function (_v0) {
	var properties = _v0;
	return properties.gY;
};
var $ianmackenzie$elm_geometry$Frame3d$zDirection = function (_v0) {
	var properties = _v0;
	return properties.g_;
};
var $ianmackenzie$elm_geometry$Frame3d$reverseZ = function (frame) {
	return $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			gl: $ianmackenzie$elm_geometry$Frame3d$originPoint(frame),
			gX: $ianmackenzie$elm_geometry$Frame3d$xDirection(frame),
			gY: $ianmackenzie$elm_geometry$Frame3d$yDirection(frame),
			g_: $ianmackenzie$elm_geometry$Direction3d$reverse(
				$ianmackenzie$elm_geometry$Frame3d$zDirection(frame))
		});
};
var $author$project$Physics$Shape$block = function (block3d) {
	var frame3d = $ianmackenzie$elm_geometry$Block3d$axes(block3d);
	var rightHandedFrame3d = $ianmackenzie$elm_geometry$Frame3d$isRightHanded(frame3d) ? frame3d : $ianmackenzie$elm_geometry$Frame3d$reverseZ(frame3d);
	var origin = $ianmackenzie$elm_geometry$Point3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$originPoint(rightHandedFrame3d));
	var x = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$xDirection(rightHandedFrame3d));
	var y = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$yDirection(rightHandedFrame3d));
	var z = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(rightHandedFrame3d));
	var tranform3d = A4($author$project$Internal$Transform3d$fromOriginAndBasis, origin, x, y, z);
	var _v0 = $ianmackenzie$elm_geometry$Block3d$dimensions(block3d);
	var sizeX = _v0.a;
	var sizeY = _v0.b;
	var sizeZ = _v0.c;
	return _List_fromArray(
		[
			_Utils_Tuple2(
			$author$project$Internal$Shape$Convex(
				A2(
					$author$project$Shapes$Convex$placeIn,
					tranform3d,
					A3(
						$author$project$Shapes$Convex$fromBlock,
						$ianmackenzie$elm_units$Length$inMeters(sizeX),
						$ianmackenzie$elm_units$Length$inMeters(sizeY),
						$ianmackenzie$elm_units$Length$inMeters(sizeZ)))),
			1)
		]);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces = 1;
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Facets = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Indexed = F4(
	function (a, b, c, d) {
		return {$: 3, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormals = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithTangents = F4(
	function (a, b, c, d) {
		return {$: 7, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithUvs = F4(
	function (a, b, c, d) {
		return {$: 5, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Triangles = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$cullBackFaces = function (mesh) {
	switch (mesh.$) {
		case 0:
			return mesh;
		case 1:
			var boundingBox = mesh.a;
			var meshTriangles = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$Triangles, boundingBox, meshTriangles, webGLMesh, 1);
		case 2:
			var boundingBox = mesh.a;
			var meshTriangles = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$Facets, boundingBox, meshTriangles, webGLMesh, 1);
		case 3:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$Indexed, boundingBox, triangularMesh, webGLMesh, 1);
		case 4:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormals, boundingBox, triangularMesh, webGLMesh, 1);
		case 5:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithUvs, boundingBox, triangularMesh, webGLMesh, 1);
		case 6:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormalsAndUvs, boundingBox, triangularMesh, webGLMesh, 1);
		case 7:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithTangents, boundingBox, triangularMesh, webGLMesh, 1);
		case 8:
			return mesh;
		case 9:
			return mesh;
		default:
			return mesh;
	}
};
var $ianmackenzie$elm_geometry$BoundingBox3d$aggregateOfHelp = F8(
	function (currentMinX, currentMaxX, currentMinY, currentMaxY, currentMinZ, currentMaxZ, getBoundingBox, items) {
		aggregateOfHelp:
		while (true) {
			if (items.b) {
				var next = items.a;
				var rest = items.b;
				var _v1 = getBoundingBox(next);
				var b = _v1;
				var $temp$currentMinX = A2($elm$core$Basics$min, b.f6, currentMinX),
					$temp$currentMaxX = A2($elm$core$Basics$max, b.f3, currentMaxX),
					$temp$currentMinY = A2($elm$core$Basics$min, b.f7, currentMinY),
					$temp$currentMaxY = A2($elm$core$Basics$max, b.f4, currentMaxY),
					$temp$currentMinZ = A2($elm$core$Basics$min, b.f8, currentMinZ),
					$temp$currentMaxZ = A2($elm$core$Basics$max, b.f5, currentMaxZ),
					$temp$getBoundingBox = getBoundingBox,
					$temp$items = rest;
				currentMinX = $temp$currentMinX;
				currentMaxX = $temp$currentMaxX;
				currentMinY = $temp$currentMinY;
				currentMaxY = $temp$currentMaxY;
				currentMinZ = $temp$currentMinZ;
				currentMaxZ = $temp$currentMaxZ;
				getBoundingBox = $temp$getBoundingBox;
				items = $temp$items;
				continue aggregateOfHelp;
			} else {
				return {f3: currentMaxX, f4: currentMaxY, f5: currentMaxZ, f6: currentMinX, f7: currentMinY, f8: currentMinZ};
			}
		}
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$aggregateOf = F3(
	function (getBoundingBox, first, rest) {
		var _v0 = getBoundingBox(first);
		var b1 = _v0;
		return A8($ianmackenzie$elm_geometry$BoundingBox3d$aggregateOfHelp, b1.f6, b1.f3, b1.f7, b1.f4, b1.f8, b1.f5, getBoundingBox, rest);
	});
var $ianmackenzie$elm_units$Quantity$max = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return A2($elm$core$Basics$max, x, y);
	});
var $ianmackenzie$elm_units$Quantity$min = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return A2($elm$core$Basics$min, x, y);
	});
var $ianmackenzie$elm_geometry$Triangle3d$vertices = function (_v0) {
	var triangleVertices = _v0;
	return triangleVertices;
};
var $ianmackenzie$elm_geometry$Point3d$xCoordinate = function (_v0) {
	var p = _v0;
	return p.n;
};
var $ianmackenzie$elm_geometry$Point3d$yCoordinate = function (_v0) {
	var p = _v0;
	return p.o;
};
var $ianmackenzie$elm_geometry$Point3d$zCoordinate = function (_v0) {
	var p = _v0;
	return p.p;
};
var $ianmackenzie$elm_geometry$Triangle3d$boundingBox = function (triangle) {
	var _v0 = $ianmackenzie$elm_geometry$Triangle3d$vertices(triangle);
	var p1 = _v0.a;
	var p2 = _v0.b;
	var p3 = _v0.c;
	var x1 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p1);
	var y1 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p1);
	var z1 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p1);
	var x2 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p2);
	var y2 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p2);
	var z2 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p2);
	var x3 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p3);
	var y3 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p3);
	var z3 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p3);
	return $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema(
		{
			f3: A2(
				$ianmackenzie$elm_units$Quantity$max,
				x1,
				A2($ianmackenzie$elm_units$Quantity$max, x2, x3)),
			f4: A2(
				$ianmackenzie$elm_units$Quantity$max,
				y1,
				A2($ianmackenzie$elm_units$Quantity$max, y2, y3)),
			f5: A2(
				$ianmackenzie$elm_units$Quantity$max,
				z1,
				A2($ianmackenzie$elm_units$Quantity$max, z2, z3)),
			f6: A2(
				$ianmackenzie$elm_units$Quantity$min,
				x1,
				A2($ianmackenzie$elm_units$Quantity$min, x2, x3)),
			f7: A2(
				$ianmackenzie$elm_units$Quantity$min,
				y1,
				A2($ianmackenzie$elm_units$Quantity$min, y2, y3)),
			f8: A2(
				$ianmackenzie$elm_units$Quantity$min,
				z1,
				A2($ianmackenzie$elm_units$Quantity$min, z2, z3))
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$triangleNormal = F3(
	function (p1, p2, p3) {
		var v2 = A2($ianmackenzie$elm_geometry$Vector3d$from, p2, p3);
		var v1 = A2($ianmackenzie$elm_geometry$Vector3d$from, p1, p2);
		return $ianmackenzie$elm_geometry$Vector3d$normalize(
			A2($ianmackenzie$elm_geometry$Vector3d$cross, v2, v1));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$facetAttributes = function (triangle) {
	var _v0 = $ianmackenzie$elm_geometry$Triangle3d$vertices(triangle);
	var p1 = _v0.a;
	var p2 = _v0.b;
	var p3 = _v0.c;
	var normal = $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(
		A3($ianmackenzie$elm_3d_scene$Scene3d$Mesh$triangleNormal, p1, p2, p3));
	return _Utils_Tuple3(
		{
			c8: normal,
			gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p1)
		},
		{
			c8: normal,
			gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p2)
		},
		{
			c8: normal,
			gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p3)
		});
};
var $elm_explorations$webgl$WebGL$Mesh3 = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangles = $elm_explorations$webgl$WebGL$Mesh3(
	{e5: 3, fx: 0, ga: 4});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$facets = function (givenTriangles) {
	if (!givenTriangles.b) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyMesh;
	} else {
		var first = givenTriangles.a;
		var rest = givenTriangles.b;
		var webGLMesh = $elm_explorations$webgl$WebGL$triangles(
			A2($elm$core$List$map, $ianmackenzie$elm_3d_scene$Scene3d$Mesh$facetAttributes, givenTriangles));
		var bounds = A3($ianmackenzie$elm_geometry$BoundingBox3d$aggregateOf, $ianmackenzie$elm_geometry$Triangle3d$boundingBox, first, rest);
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$Facets, bounds, givenTriangles, webGLMesh, 0);
	}
};
var $ianmackenzie$elm_geometry$Geometry$Types$Triangle3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Triangle3d$from = F3(
	function (p1, p2, p3) {
		return _Utils_Tuple3(p1, p2, p3);
	});
var $ianmackenzie$elm_geometry$Point3d$xyz = F3(
	function (_v0, _v1, _v2) {
		var x = _v0;
		var y = _v1;
		var z = _v2;
		return {n: x, o: y, p: z};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Primitives$block = function () {
	var z = $ianmackenzie$elm_units$Length$meters(1);
	var y = $ianmackenzie$elm_units$Length$meters(1);
	var x = $ianmackenzie$elm_units$Length$meters(1);
	var minZ = A2($ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, z);
	var minY = A2($ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, y);
	var minX = A2($ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, x);
	var p0 = A3($ianmackenzie$elm_geometry$Point3d$xyz, minX, minY, minZ);
	var maxZ = A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, z);
	var p4 = A3($ianmackenzie$elm_geometry$Point3d$xyz, minX, minY, maxZ);
	var maxY = A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, y);
	var p3 = A3($ianmackenzie$elm_geometry$Point3d$xyz, minX, maxY, minZ);
	var p7 = A3($ianmackenzie$elm_geometry$Point3d$xyz, minX, maxY, maxZ);
	var maxX = A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, x);
	var p1 = A3($ianmackenzie$elm_geometry$Point3d$xyz, maxX, minY, minZ);
	var p2 = A3($ianmackenzie$elm_geometry$Point3d$xyz, maxX, maxY, minZ);
	var p5 = A3($ianmackenzie$elm_geometry$Point3d$xyz, maxX, minY, maxZ);
	var p6 = A3($ianmackenzie$elm_geometry$Point3d$xyz, maxX, maxY, maxZ);
	return $ianmackenzie$elm_3d_scene$Scene3d$Mesh$cullBackFaces(
		$ianmackenzie$elm_3d_scene$Scene3d$Mesh$facets(
			_List_fromArray(
				[
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p2, p1),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p3, p2),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p4, p5, p6),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p4, p6, p7),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p1, p2, p6),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p1, p6, p5),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p7, p3),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p4, p7),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p1, p5),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p5, p4),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p3, p6, p2),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p3, p7, p6)
				])));
}();
var $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow = {$: 0};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Shadow = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectShadowVertices = F3(
	function (getPosition, _v0, accumulated) {
		var mv1 = _v0.a;
		var mv2 = _v0.b;
		var mv3 = _v0.c;
		var p3 = getPosition(mv3);
		var p2 = getPosition(mv2);
		var p1 = getPosition(mv1);
		var faceNormal = $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(
			A3($ianmackenzie$elm_3d_scene$Scene3d$Mesh$triangleNormal, p1, p2, p3));
		var sv1 = {
			c8: faceNormal,
			gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p1)
		};
		var sv2 = {
			c8: faceNormal,
			gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p2)
		};
		var sv3 = {
			c8: faceNormal,
			gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p3)
		};
		return A2(
			$elm$core$List$cons,
			sv1,
			A2(
				$elm$core$List$cons,
				sv2,
				A2($elm$core$List$cons, sv3, accumulated)));
	});
var $elm$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				if (mc.$ === 1) {
					return $elm$core$Maybe$Nothing;
				} else {
					var c = mc.a;
					return $elm$core$Maybe$Just(
						A3(func, a, b, c));
				}
			}
		}
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex = F2(
	function (index, mesh) {
		return A2(
			$elm$core$Array$get,
			index,
			$ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices(mesh));
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$faceVertices = function (mesh) {
	var toFace = function (_v0) {
		var i = _v0.a;
		var j = _v0.b;
		var k = _v0.c;
		return A4(
			$elm$core$Maybe$map3,
			F3(
				function (firstVertex, secondVertex, thirdVertex) {
					return _Utils_Tuple3(firstVertex, secondVertex, thirdVertex);
				}),
			A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, i, mesh),
			A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, j, mesh),
			A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, k, mesh));
	};
	return A2(
		$elm$core$List$filterMap,
		toFace,
		$ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices(mesh));
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey = F2(
	function (firstPoint, secondPoint) {
		var p2 = $ianmackenzie$elm_geometry$Point3d$toMeters(secondPoint);
		var p1 = $ianmackenzie$elm_geometry$Point3d$toMeters(firstPoint);
		return _Utils_Tuple2(
			_Utils_Tuple3(p1.n, p1.o, p1.p),
			_Utils_Tuple3(p2.n, p2.o, p2.p));
	});
var $elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$zeroVec3 = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0);
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdge = F6(
	function (p1, p2, start, end, neighborDict, _v0) {
		var shadowFaceIndices = _v0.a;
		var extraShadowVertices = _v0.b;
		var nextShadowVertexIndex = _v0.c;
		var _v1 = A2(
			$elm$core$Dict$get,
			A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey, p1, p2),
			neighborDict);
		if (!_v1.$) {
			var opposite = _v1.a;
			return _Utils_Tuple3(
				A2(
					$elm$core$List$cons,
					_Utils_Tuple3(start, opposite, end),
					shadowFaceIndices),
				extraShadowVertices,
				nextShadowVertexIndex);
		} else {
			var v2 = {
				c8: $ianmackenzie$elm_3d_scene$Scene3d$Mesh$zeroVec3,
				gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p2)
			};
			var v1 = {
				c8: $ianmackenzie$elm_3d_scene$Scene3d$Mesh$zeroVec3,
				gs: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p1)
			};
			var b = nextShadowVertexIndex + 1;
			var a = nextShadowVertexIndex;
			return _Utils_Tuple3(
				A2(
					$elm$core$List$cons,
					_Utils_Tuple3(start, a, b),
					A2(
						$elm$core$List$cons,
						_Utils_Tuple3(start, b, end),
						shadowFaceIndices)),
				A2(
					$elm$core$List$cons,
					v2,
					A2($elm$core$List$cons, v1, extraShadowVertices)),
				nextShadowVertexIndex + 2);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdges = F5(
	function (getPosition, neighborDict, meshFaceVertices, nextShadowVertexIndex, state) {
		joinEdges:
		while (true) {
			if (meshFaceVertices.b) {
				var _v1 = meshFaceVertices.a;
				var mv1 = _v1.a;
				var mv2 = _v1.b;
				var mv3 = _v1.c;
				var remainingMeshFaceVertices = meshFaceVertices.b;
				var p3 = getPosition(mv3);
				var p2 = getPosition(mv2);
				var p1 = getPosition(mv1);
				var c = nextShadowVertexIndex + 2;
				var b = nextShadowVertexIndex + 1;
				var a = nextShadowVertexIndex;
				var $temp$getPosition = getPosition,
					$temp$neighborDict = neighborDict,
					$temp$meshFaceVertices = remainingMeshFaceVertices,
					$temp$nextShadowVertexIndex = nextShadowVertexIndex + 3,
					$temp$state = A6(
					$ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdge,
					p3,
					p1,
					c,
					a,
					neighborDict,
					A6(
						$ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdge,
						p2,
						p3,
						b,
						c,
						neighborDict,
						A6($ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdge, p1, p2, a, b, neighborDict, state)));
				getPosition = $temp$getPosition;
				neighborDict = $temp$neighborDict;
				meshFaceVertices = $temp$meshFaceVertices;
				nextShadowVertexIndex = $temp$nextShadowVertexIndex;
				state = $temp$state;
				continue joinEdges;
			} else {
				var _v2 = state;
				var shadowFaceIndices = _v2.a;
				var extraShadowVertices = _v2.b;
				return _Utils_Tuple2(
					shadowFaceIndices,
					$elm$core$List$reverse(extraShadowVertices));
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$visitFaces = F5(
	function (getPosition, meshFaceVertices, nextShadowVertexIndex, shadowFaceIndices, neighborDict) {
		visitFaces:
		while (true) {
			if (meshFaceVertices.b) {
				var _v1 = meshFaceVertices.a;
				var mv1 = _v1.a;
				var mv2 = _v1.b;
				var mv3 = _v1.c;
				var remainingMeshFaceVertices = meshFaceVertices.b;
				var p3 = getPosition(mv3);
				var p2 = getPosition(mv2);
				var p1 = getPosition(mv1);
				var c = nextShadowVertexIndex + 2;
				var b = nextShadowVertexIndex + 1;
				var a = nextShadowVertexIndex;
				var updatedNeighborDict = A3(
					$elm$core$Dict$insert,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey, p1, p3),
					c,
					A3(
						$elm$core$Dict$insert,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey, p3, p2),
						b,
						A3(
							$elm$core$Dict$insert,
							A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey, p2, p1),
							a,
							neighborDict)));
				var updatedShadowFaceIndices = A2(
					$elm$core$List$cons,
					_Utils_Tuple3(a, b, c),
					shadowFaceIndices);
				var $temp$getPosition = getPosition,
					$temp$meshFaceVertices = remainingMeshFaceVertices,
					$temp$nextShadowVertexIndex = nextShadowVertexIndex + 3,
					$temp$shadowFaceIndices = updatedShadowFaceIndices,
					$temp$neighborDict = updatedNeighborDict;
				getPosition = $temp$getPosition;
				meshFaceVertices = $temp$meshFaceVertices;
				nextShadowVertexIndex = $temp$nextShadowVertexIndex;
				shadowFaceIndices = $temp$shadowFaceIndices;
				neighborDict = $temp$neighborDict;
				continue visitFaces;
			} else {
				return _Utils_Tuple3(shadowFaceIndices, neighborDict, nextShadowVertexIndex);
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl = F3(
	function (meshBounds, getPosition, triangularMesh) {
		var meshFaceVertices = $ianmackenzie$elm_triangular_mesh$TriangularMesh$faceVertices(triangularMesh);
		var initialShadowVertices = A3(
			$elm$core$List$foldr,
			$ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectShadowVertices(getPosition),
			_List_Nil,
			meshFaceVertices);
		var _v0 = A5($ianmackenzie$elm_3d_scene$Scene3d$Mesh$visitFaces, getPosition, meshFaceVertices, 0, _List_Nil, $elm$core$Dict$empty);
		var initialShadowFaceIndices = _v0.a;
		var neighborDict = _v0.b;
		var nextShadowVertexIndex = _v0.c;
		var _v1 = A5(
			$ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdges,
			getPosition,
			neighborDict,
			meshFaceVertices,
			0,
			_Utils_Tuple3(initialShadowFaceIndices, _List_Nil, nextShadowVertexIndex));
		var allShadowFaceIndices = _v1.a;
		var extraShadowVertices = _v1.b;
		var allShadowVertices = $elm$core$List$isEmpty(extraShadowVertices) ? initialShadowVertices : _Utils_ap(initialShadowVertices, extraShadowVertices);
		return A3(
			$ianmackenzie$elm_3d_scene$Scene3d$Types$Shadow,
			meshBounds,
			A2(
				$ianmackenzie$elm_triangular_mesh$TriangularMesh$indexed,
				$elm$core$Array$fromList(allShadowVertices),
				allShadowFaceIndices),
			A2($elm_explorations$webgl$WebGL$indexedTriangles, allShadowVertices, allShadowFaceIndices));
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles = function (faceVertices_) {
	return {
		O: A2(
			$elm$core$List$map,
			function (i) {
				return _Utils_Tuple3(3 * i, (3 * i) + 1, (3 * i) + 2);
			},
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(faceVertices_) - 1)),
		bB: $elm$core$Array$fromList(
			$elm$core$List$concat(
				A2(
					$elm$core$List$map,
					function (_v0) {
						var v1 = _v0.a;
						var v2 = _v0.b;
						var v3 = _v0.c;
						return _List_fromArray(
							[v1, v2, v3]);
					},
					faceVertices_)))
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadow = function (mesh) {
	switch (mesh.$) {
		case 0:
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow;
		case 1:
			var boundingBox = mesh.a;
			var meshTriangles = mesh.b;
			var vertexTriples = A2($elm$core$List$map, $ianmackenzie$elm_geometry$Triangle3d$vertices, meshTriangles);
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				$elm$core$Basics$identity,
				$ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles(vertexTriples));
		case 2:
			var boundingBox = mesh.a;
			var meshTriangles = mesh.b;
			var vertexTriples = A2($elm$core$List$map, $ianmackenzie$elm_geometry$Triangle3d$vertices, meshTriangles);
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				$elm$core$Basics$identity,
				$ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles(vertexTriples));
		case 3:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3($ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl, boundingBox, $elm$core$Basics$identity, triangularMesh);
		case 4:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				function ($) {
					return $.gs;
				},
				triangularMesh);
		case 5:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				function ($) {
					return $.gs;
				},
				triangularMesh);
		case 6:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				function ($) {
					return $.gs;
				},
				triangularMesh);
		case 7:
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				function ($) {
					return $.gs;
				},
				triangularMesh);
		case 8:
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow;
		case 9:
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow;
		default:
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow;
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Primitives$blockShadow = $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$block);
var $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode = {$: 0};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty = $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode;
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Group = function (a) {
	return {$: 5, a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$collectNodes = F2(
	function (drawables, accumulated) {
		collectNodes:
		while (true) {
			if (!drawables.b) {
				return accumulated;
			} else {
				var node = drawables.a;
				var rest = drawables.b;
				var $temp$drawables = rest,
					$temp$accumulated = A2($elm$core$List$cons, node, accumulated);
				drawables = $temp$drawables;
				accumulated = $temp$accumulated;
				continue collectNodes;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$group = function (drawables) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Group(
		A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$collectNodes, drawables, _List_Nil));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$bumpyVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute highp vec3 normal;\n        attribute mediump vec2 uv;\n        attribute highp vec4 tangent;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec4 interpolatedTangent;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        vec4 getWorldTangent(vec4 modelTangent, vec4 modelScale, mat4 modelMatrix) {\n            return vec4((modelMatrix * vec4(safeNormalize(modelScale.xyz * modelTangent.xyz), 0.0)).xyz, modelScale.w * modelTangent.w);\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n            interpolatedUv = uv;\n            interpolatedTangent = getWorldTangent(tangent, modelScale, modelMatrix);\n        }\n    ',
	attributes: {normal: 'c8', position: 'gs', tangent: 'gJ', uv: '_'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', sceneProperties: 'd', viewMatrix: 'e'}
};
var $elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 0:
				return A2(_WebGL_enableAlpha, ctx, option);
			case 1:
				return A2(_WebGL_enableDepth, ctx, option);
			case 2:
				return A2(_WebGL_enableStencil, ctx, option);
			case 3:
				return A2(_WebGL_enableAntialias, ctx, option);
			case 4:
				return A2(_WebGL_enableClearColor, ctx, option);
			default:
				return A2(_WebGL_enablePreserveDrawingBuffer, ctx, option);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (cache, setting) {
		switch (setting.$) {
			case 0:
				return A2(_WebGL_enableBlend, cache, setting);
			case 1:
				return A2(_WebGL_enableDepthTest, cache, setting);
			case 2:
				return A2(_WebGL_enableStencilTest, cache, setting);
			case 3:
				return A2(_WebGL_enableScissor, cache, setting);
			case 4:
				return A2(_WebGL_enableColorMask, cache, setting);
			case 5:
				return A2(_WebGL_enableCullFace, cache, setting);
			case 6:
				return A2(_WebGL_enablePolygonOffset, cache, setting);
			case 7:
				return A2(_WebGL_enableSampleCoverage, cache, setting);
			default:
				return _WebGL_enableSampleAlphaToCoverage(cache);
		}
	});
var $elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform mediump sampler2D materialColorTexture;\n        uniform lowp vec4 constantMaterialColor;\n        uniform mediump sampler2D ambientOcclusionTexture;\n        uniform lowp vec2 constantAmbientOcclusion;\n        uniform mediump sampler2D normalMapTexture;\n        uniform lowp float normalMapType;\n        uniform highp mat4 viewMatrix;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec4 interpolatedTangent;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        vec3 getLocalNormal(sampler2D normalMap, float normalMapType, vec2 uv) {\n            if (normalMapType == 0.0) {\n                return vec3(0.0, 0.0, 1.0);\n            } else {\n                vec3 rgb = texture2D(normalMap, uv).rgb;\n                float x = 2.0 * (rgb.r - 0.5);\n                float y = 2.0 * (rgb.g - 0.5) * normalMapType;\n                float z = 2.0 * (rgb.b - 0.5);\n                return normalize(vec3(x, y, z));\n            }\n        }\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getMappedNormal(vec3 normal, vec4 tangent, vec3 localNormal) {\n            vec3 bitangent = cross(normal, tangent.xyz) * tangent.w;\n            return normalize(localNormal.x * tangent.xyz + localNormal.y * bitangent + localNormal.z * normal);\n        }\n        \n        float getFloatValue(sampler2D texture, vec2 uv, vec2 constantValue) {\n            if (constantValue.y == 1.0) {\n                return constantValue.x;\n            } else {\n                vec4 textureColor = texture2D(texture, uv);\n                return dot(textureColor, vec4(0.2126, 0.7152, 0.0722, 0.0));\n            }\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 lambertianLight(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            float ambientOcclusion,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                vec3 upDirection = xyz_type.xyz;\n                vec3 aboveLuminance = rgb_parameter.rgb;\n                vec3 belowLuminance = rgb_parameter.a * aboveLuminance;\n                vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, upDirection, surfaceNormal);\n                return luminance * materialColor * ambientOcclusion;\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(\n                xyz_type,\n                rgb_parameter,\n                surfacePosition,\n                directionToLight,\n                normalIlluminance\n            );\n        \n            float dotNL = positiveDotProduct(directionToLight, surfaceNormal);\n            return (normalIlluminance * dotNL) * (materialColor / kPi);\n        }\n        \n        vec3 lambertianLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            float ambientOcclusion,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            vec3 litColor1 = enabledLights[0] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights12[0], lights12[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights12[2], lights12[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights34[0], lights34[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights34[2], lights34[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights56[0], lights56[1]);\n            vec3 litColor6 = lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights56[2], lights56[3]);\n            vec3 litColor7 = lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights78[0], lights78[1]);\n            vec3 litColor8 = lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights78[2], lights78[3]);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float inverseGamma(float u) {\n            if (u <= 0.04045) {\n                return clamp(u / 12.92, 0.0, 1.0);\n            } else {\n                return clamp(pow((u + 0.055) / 1.055, 2.4), 0.0, 1.0);\n            }\n        }\n        \n        float inverseAlpha(float value) {\n            // the value used for alpha cannot be less than zero\n            float signValue = float(sign(value));\n            return signValue / (value + (signValue - 1.0));\n        }\n        \n        vec4 fromSrgb(vec4 srgbColor) {\n            float invAlpha = inverseAlpha(srgbColor.a);\n            return vec4(\n                inverseGamma(srgbColor.r * invAlpha) * srgbColor.a,\n                inverseGamma(srgbColor.g * invAlpha) * srgbColor.a,\n                inverseGamma(srgbColor.b * invAlpha) * srgbColor.a,\n                srgbColor.a\n            );\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec4 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            // linearColor has premultiplied alpha, but tone mapping works on\n            // non-premultiplied linear RGB so we need to temporarily \'undo\' the\n            // premultiplication before applying tone mapping\n            float invAlpha = inverseAlpha(linearColor.a);\n            float unitR = (linearColor.r * invAlpha) / referenceWhite.r;\n            float unitG = (linearColor.g * invAlpha) / referenceWhite.g;\n            float unitB = (linearColor.b * invAlpha) / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            // Apply tone mapping\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            // Re-apply premultiplied alpha after tone mapping\n            return vec4(toneMapped * linearColor.a, linearColor.a);\n        }\n        \n        void main() {\n            vec3 localNormal = getLocalNormal(normalMapTexture, normalMapType, interpolatedUv);\n            float normalSign = getNormalSign();\n            vec3 originalNormal = normalize(interpolatedNormal) * normalSign;\n            vec3 normalDirection = getMappedNormal(originalNormal, interpolatedTangent, localNormal);\n            float ambientOcclusion = getFloatValue(ambientOcclusionTexture, interpolatedUv, constantAmbientOcclusion);\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n            float useConstantColor = float(sign(constantMaterialColor.a));  // 1.0 for color, 0.0 for texture\n            vec4 materialColor = fromSrgb(texture2D(materialColorTexture, interpolatedUv)) * (1.0 - useConstantColor) + constantMaterialColor * useConstantColor;\n        \n            vec3 linearColor = lambertianLighting(\n                interpolatedPosition,\n                normalDirection,\n                materialColor.rgb,\n                ambientOcclusion,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(vec4(linearColor, materialColor.a), sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {ambientOcclusionTexture: 'ao', constantAmbientOcclusion: 'ap', constantMaterialColor: 'bJ', enabledLights: 'u', lights12: 'cl', lights34: 'c0', lights56: 'c1', lights78: 'c2', materialColorTexture: 'bV', normalMapTexture: 'av', normalMapType: 'aw', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$TransparentMeshNode = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$emptyMeshNode = F2(
	function (_v0, _v1) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode;
	});
var $elm_explorations$linear_algebra$Math$Vector4$getW = _MJS_v4getW;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode = function (color) {
	var alpha = $elm_explorations$linear_algebra$Math$Vector4$getW(color);
	return (alpha === 1) ? $ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode : ((!alpha) ? $ianmackenzie$elm_3d_scene$Scene3d$Entity$emptyMeshNode : $ianmackenzie$elm_3d_scene$Scene3d$Types$TransparentMeshNode);
};
var $elm_explorations$webgl$WebGL$Settings$FaceMode = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$back = 1029;
var $elm_explorations$webgl$WebGL$Internal$CullFace = function (a) {
	return {$: 5, a: a};
};
var $elm_explorations$webgl$WebGL$Settings$cullFace = function (_v0) {
	var faceMode = _v0;
	return $elm_explorations$webgl$WebGL$Internal$CullFace(faceMode);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting = $elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$back);
var $elm_explorations$webgl$WebGL$Settings$front = 1028;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting = $elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$front);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings = F3(
	function (isRightHanded, backFaceSetting, settings) {
		if (backFaceSetting === 1) {
			return isRightHanded ? A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, settings) : A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, settings);
		} else {
			return settings;
		}
	});
var $elm_explorations$linear_algebra$Math$Vector4$toRecord = _MJS_v4toRecord;
var $elm_explorations$linear_algebra$Math$Vector4$vec4 = _MJS_v4;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor = function (color) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector4$toRecord(color);
	var w = _v0.gU;
	var z = _v0.p;
	var y = _v0.o;
	var x = _v0.n;
	return A4($elm_explorations$linear_algebra$Math$Vector4$vec4, x * w, y * w, z * w, w);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4 = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0, 0, 0, 0);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$bumpyLambertianMesh = F8(
	function (useTextureOrColor, ambientOcclusionData, constantAmbientOcclusion, normalMapData, normalMapType, bounds, webGLMesh, backFaceSetting) {
		if (!useTextureOrColor.$) {
			var materialColorData = useTextureOrColor.a;
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v1, settings) {
						var lights = _v1.a;
						var enabledLights = _v1.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$bumpyVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment,
							webGLMesh,
							{ao: ambientOcclusionData, ap: constantAmbientOcclusion, bJ: $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4, u: enabledLights, cl: lights.cl, c0: lights.c0, c1: lights.c1, c2: lights.c2, bV: materialColorData, a: modelMatrix, b: modelScale, av: normalMapData, aw: normalMapType, c: projectionMatrix, d: sceneProperties, e: viewMatrix});
					}));
		} else {
			var constantMaterialColor = useTextureOrColor.a;
			var dummyTexture = useTextureOrColor.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
				constantMaterialColor,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v2, settings) {
						var lights = _v2.a;
						var enabledLights = _v2.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$bumpyVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment,
							webGLMesh,
							{
								ao: ambientOcclusionData,
								ap: constantAmbientOcclusion,
								bJ: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(constantMaterialColor),
								u: enabledLights,
								cl: lights.cl,
								c0: lights.c0,
								c1: lights.c1,
								c2: lights.c2,
								bV: dummyTexture,
								a: modelMatrix,
								b: modelScale,
								av: normalMapData,
								aw: normalMapType,
								c: projectionMatrix,
								d: sceneProperties,
								e: viewMatrix
							});
					}));
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform mediump sampler2D baseColorTexture;\n        uniform lowp vec4 constantBaseColor;\n        uniform mediump sampler2D roughnessTexture;\n        uniform lowp vec2 constantRoughness;\n        uniform mediump sampler2D metallicTexture;\n        uniform lowp vec2 constantMetallic;\n        uniform mediump sampler2D ambientOcclusionTexture;\n        uniform lowp vec2 constantAmbientOcclusion;\n        uniform mediump sampler2D normalMapTexture;\n        uniform lowp float normalMapType;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec4 interpolatedTangent;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const mediump float kMediumpFloatMax = 65504.0;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        float getFloatValue(sampler2D texture, vec2 uv, vec2 constantValue) {\n            if (constantValue.y == 1.0) {\n                return constantValue.x;\n            } else {\n                vec4 textureColor = texture2D(texture, uv);\n                return dot(textureColor, vec4(0.2126, 0.7152, 0.0722, 0.0));\n            }\n        }\n        \n        vec3 getLocalNormal(sampler2D normalMap, float normalMapType, vec2 uv) {\n            if (normalMapType == 0.0) {\n                return vec3(0.0, 0.0, 1.0);\n            } else {\n                vec3 rgb = texture2D(normalMap, uv).rgb;\n                float x = 2.0 * (rgb.r - 0.5);\n                float y = 2.0 * (rgb.g - 0.5) * normalMapType;\n                float z = 2.0 * (rgb.b - 0.5);\n                return normalize(vec3(x, y, z));\n            }\n        }\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getMappedNormal(vec3 normal, vec4 tangent, vec3 localNormal) {\n            vec3 bitangent = cross(normal, tangent.xyz) * tangent.w;\n            return normalize(localNormal.x * tangent.xyz + localNormal.y * bitangent + localNormal.z * normal);\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        // Adapted from https://google.github.io/filament/Filament.md.html#materialsystem/specularbrdf/normaldistributionfunction(speculard)\n        float specularD(float alpha, float dotNH, vec3 normalDirection, vec3 halfDirection) {\n            vec3 crossNH = cross(normalDirection, halfDirection);\n            float a = dotNH * alpha;\n            float k = alpha / (dot(crossNH, crossNH) + a * a);\n            float d = k * k * (1.0 / kPi);\n            return min(d, kMediumpFloatMax);\n        }\n        \n        float safeQuotient(float numerator, float denominator) {\n            if (denominator == 0.0) {\n                return 0.0;\n            } else {\n                return numerator / denominator;\n            }\n        }\n        \n        float g1(float dotNV, float alphaSquared) {\n            return safeQuotient(2.0 * dotNV, dotNV + sqrt(alphaSquared + (1.0 - alphaSquared) * dotNV * dotNV));\n        }\n        \n        float specularG(float dotNL, float dotNV, float alphaSquared) {\n            return g1(dotNV, alphaSquared) * g1(dotNL, alphaSquared);\n        }\n        \n        vec3 fresnelColor(vec3 specularBaseColor, float dotVH) {\n            vec3 one = vec3(1.0, 1.0, 1.0);\n            float scale = exp2((-5.55473 * dotVH - 6.98316) * dotVH);\n            return specularBaseColor + (one - specularBaseColor) * scale;\n        }\n        \n        vec3 brdf(vec3 normalDirection, vec3 directionToCamera, vec3 directionToLight, float alpha, float dotNV, float dotNL, vec3 specularBaseColor, vec3 normalIlluminance) {\n            vec3 halfDirection = normalize(directionToCamera + directionToLight);\n            float dotVH = positiveDotProduct(directionToCamera, halfDirection);\n            float dotNH = positiveDotProduct(normalDirection, halfDirection);\n            float dotNHSquared = dotNH * dotNH;\n        \n            float d = specularD(alpha, dotNH, normalDirection, halfDirection);\n            float g = specularG(dotNL, dotNV, alpha * alpha);\n            vec3 f = fresnelColor(specularBaseColor, dotVH);\n            return safeQuotient(d * g, 4.0 * dotNL * dotNV) * f;\n        }\n        \n        vec3 sampleFacetNormal(vec3 vH, vec3 vT1, vec3 vT2, float s, float alpha) {\n            float t2 = (1.0 - s);\n            vec3 vNh = t2 * vT2 + sqrt(max(0.0, 1.0 - t2 * t2)) * vH;\n            return normalize(vec3(alpha * vNh.x, alpha * vNh.y, max(0.0, vNh.z)));\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 softLightingSpecularSample(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localViewDirection,\n            vec3 localLightDirection,\n            vec3 localHalfDirection,\n            float alphaSquared,\n            vec3 specularBaseColor\n        ) {\n            vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, localUpDirection, localLightDirection);\n            float dotVH = positiveDotProduct(localViewDirection, localHalfDirection);\n            float dotNL = localLightDirection.z;\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n        }\n        \n        vec3 softLighting(\n            vec3 normalDirection,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            vec3 directionToCamera,\n            vec3 viewY,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float alphaSquared = alpha * alpha;\n            vec3 upDirection = xyz_type.xyz;\n            vec3 luminanceAbove = rgb_parameter.rgb;\n            vec3 luminanceBelow = rgb_parameter.a * luminanceAbove;\n            vec3 crossProduct = cross(normalDirection, directionToCamera);\n            float crossMagnitude = length(crossProduct);\n            vec3 xDirection = vec3(0.0, 0.0, 0.0);\n            vec3 yDirection = vec3(0.0, 0.0, 0.0);\n            if (crossMagnitude > 1.0e-6) {\n                yDirection = (1.0 / crossMagnitude) * crossProduct;\n                xDirection = cross(yDirection, normalDirection);\n            } else {\n                vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n                xDirection = normalize(cross(viewY, normalDirection));\n                yDirection = cross(normalDirection, xDirection);\n            }\n            float localViewX = dot(directionToCamera, xDirection);\n            float localViewZ = dot(directionToCamera, normalDirection);\n            vec3 localViewDirection = vec3(localViewX, 0, localViewZ);\n            float localUpX = dot(upDirection, xDirection);\n            float localUpY = dot(upDirection, yDirection);\n            float localUpZ = dot(upDirection, normalDirection);\n            vec3 localUpDirection = vec3(localUpX, localUpY, localUpZ);\n        \n            vec3 vH = normalize(vec3(alpha * localViewX, 0.0, localViewZ));\n            vec3 vT1 = vec3(0.0, 1.0, 0.0);\n            vec3 vT2 = cross(vH, vT1);\n            float s = 0.5 * (1.0 + vH.z);\n        \n            vec3 localHalfDirection = sampleFacetNormal(vH, vT1, vT2, s, alpha);\n            vec3 localLightDirection = vec3(0.0, 0.0, 0.0);\n        \n            localLightDirection = -reflect(localViewDirection, localHalfDirection);\n            vec3 specular = softLightingSpecularSample(luminanceAbove, luminanceBelow, localUpDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n        \n            localLightDirection = vec3(0.000000, 0.000000, 1.000000);\n            vec3 diffuse = softLightingLuminance(luminanceAbove, luminanceBelow, localUpDirection, localLightDirection) * localLightDirection.z;\n        \n            return specular + diffuse * diffuseBaseColor;\n        }\n        \n        vec3 physicalLight(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            vec3 normalDirection,\n            vec3 directionToCamera,\n            vec3 viewY,\n            float dotNV,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            float ambientOcclusion\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                return softLighting(normalDirection, diffuseBaseColor, specularBaseColor, alpha, directionToCamera, viewY, xyz_type, rgb_parameter) * ambientOcclusion;\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(xyz_type, rgb_parameter, surfacePosition, directionToLight, normalIlluminance);\n        \n            float dotNL = positiveDotProduct(normalDirection, directionToLight);\n            vec3 specularColor = brdf(normalDirection, directionToCamera, directionToLight, alpha, dotNV, dotNL, specularBaseColor, normalIlluminance);\n            return (normalIlluminance * dotNL) * ((diffuseBaseColor / kPi) + specularColor);\n        }\n        \n        vec3 physicalLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 baseColor,\n            vec3 directionToCamera,\n            mat4 viewMatrix,\n            float roughness,\n            float metallic,\n            float ambientOcclusion,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            float dotNV = positiveDotProduct(surfaceNormal, directionToCamera);\n            float alpha = roughness * roughness;\n            float nonmetallic = 1.0 - metallic;\n            vec3 diffuseBaseColor = nonmetallic * 0.96 * baseColor;\n            vec3 specularBaseColor = nonmetallic * 0.04 * vec3(1.0, 1.0, 1.0) + metallic * baseColor;\n            vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n        \n            vec3 litColor1 = enabledLights[0] == 1.0 ? physicalLight(lights12[0], lights12[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? physicalLight(lights12[2], lights12[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? physicalLight(lights34[0], lights34[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? physicalLight(lights34[2], lights34[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = physicalLight(lights56[0], lights56[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion);\n            vec3 litColor6 = physicalLight(lights56[2], lights56[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion);\n            vec3 litColor7 = physicalLight(lights78[0], lights78[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion);\n            vec3 litColor8 = physicalLight(lights78[2], lights78[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float inverseGamma(float u) {\n            if (u <= 0.04045) {\n                return clamp(u / 12.92, 0.0, 1.0);\n            } else {\n                return clamp(pow((u + 0.055) / 1.055, 2.4), 0.0, 1.0);\n            }\n        }\n        \n        float inverseAlpha(float value) {\n            // the value used for alpha cannot be less than zero\n            float signValue = float(sign(value));\n            return signValue / (value + (signValue - 1.0));\n        }\n        \n        vec4 fromSrgb(vec4 srgbColor) {\n            float invAlpha = inverseAlpha(srgbColor.a);\n            return vec4(\n                inverseGamma(srgbColor.r * invAlpha) * srgbColor.a,\n                inverseGamma(srgbColor.g * invAlpha) * srgbColor.a,\n                inverseGamma(srgbColor.b * invAlpha) * srgbColor.a,\n                srgbColor.a\n            );\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec4 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            // linearColor has premultiplied alpha, but tone mapping works on\n            // non-premultiplied linear RGB so we need to temporarily \'undo\' the\n            // premultiplication before applying tone mapping\n            float invAlpha = inverseAlpha(linearColor.a);\n            float unitR = (linearColor.r * invAlpha) / referenceWhite.r;\n            float unitG = (linearColor.g * invAlpha) / referenceWhite.g;\n            float unitB = (linearColor.b * invAlpha) / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            // Apply tone mapping\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            // Re-apply premultiplied alpha after tone mapping\n            return vec4(toneMapped * linearColor.a, linearColor.a);\n        }\n        \n        void main() {\n            float useConstantColor = float(sign(constantBaseColor.a));  // 1.0 for color, 0.0 for texture\n            vec4 baseColor = fromSrgb(texture2D(baseColorTexture, interpolatedUv)) * (1.0 - useConstantColor) + constantBaseColor * useConstantColor;\n        \n            float roughness = getFloatValue(roughnessTexture, interpolatedUv, constantRoughness);\n            float metallic = getFloatValue(metallicTexture, interpolatedUv, constantMetallic);\n            float ambientOcclusion = getFloatValue(ambientOcclusionTexture, interpolatedUv, constantAmbientOcclusion);\n        \n            vec3 localNormal = getLocalNormal(normalMapTexture, normalMapType, interpolatedUv);\n            float normalSign = getNormalSign();\n            vec3 originalNormal = normalize(interpolatedNormal) * normalSign;\n            vec3 normalDirection = getMappedNormal(originalNormal, interpolatedTangent, localNormal);\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n        \n            vec3 linearColor = physicalLighting(\n                interpolatedPosition,\n                normalDirection,\n                baseColor.rgb,\n                directionToCamera,\n                viewMatrix,\n                roughness,\n                metallic,\n                ambientOcclusion,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(vec4(linearColor, baseColor.a), sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {ambientOcclusionTexture: 'ao', baseColorTexture: 'bG', constantAmbientOcclusion: 'ap', constantBaseColor: 'bH', constantMetallic: 'bK', constantRoughness: 'bL', enabledLights: 'u', lights12: 'cl', lights34: 'c0', lights56: 'c1', lights78: 'c2', metallicTexture: 'bW', normalMapTexture: 'av', normalMapType: 'aw', roughnessTexture: 'b_', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$bumpyPhysicalMesh = function (useTextureOrColor) {
	return function (roughnessData) {
		return function (constantRoughness) {
			return function (metallicData) {
				return function (constantMetallic) {
					return function (ambientOcclusionData) {
						return function (constantAmbientOcclusion) {
							return function (normalMapData) {
								return function (normalMapType) {
									return function (bounds) {
										return function (webGLMesh) {
											return function (backFaceSetting) {
												if (!useTextureOrColor.$) {
													var baseColorData = useTextureOrColor.a;
													return A2(
														$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
														bounds,
														F8(
															function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v1, settings) {
																var lights = _v1.a;
																var enabledLights = _v1.b;
																return A5(
																	$elm_explorations$webgl$WebGL$entityWith,
																	A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
																	$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$bumpyVertex,
																	$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment,
																	webGLMesh,
																	{ao: ambientOcclusionData, bG: baseColorData, ap: constantAmbientOcclusion, bH: $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4, bK: constantMetallic, bL: constantRoughness, u: enabledLights, cl: lights.cl, c0: lights.c0, c1: lights.c1, c2: lights.c2, bW: metallicData, a: modelMatrix, b: modelScale, av: normalMapData, aw: normalMapType, c: projectionMatrix, b_: roughnessData, d: sceneProperties, e: viewMatrix});
															}));
												} else {
													var constantBaseColor = useTextureOrColor.a;
													var dummyTexture = useTextureOrColor.b;
													return A3(
														$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
														constantBaseColor,
														bounds,
														F8(
															function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v2, settings) {
																var lights = _v2.a;
																var enabledLights = _v2.b;
																return A5(
																	$elm_explorations$webgl$WebGL$entityWith,
																	A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
																	$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$bumpyVertex,
																	$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment,
																	webGLMesh,
																	{
																		ao: ambientOcclusionData,
																		bG: dummyTexture,
																		ap: constantAmbientOcclusion,
																		bH: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(constantBaseColor),
																		bK: constantMetallic,
																		bL: constantRoughness,
																		u: enabledLights,
																		cl: lights.cl,
																		c0: lights.c0,
																		c1: lights.c1,
																		c2: lights.c2,
																		bW: metallicData,
																		a: modelMatrix,
																		b: modelScale,
																		av: normalMapData,
																		aw: normalMapType,
																		c: projectionMatrix,
																		b_: roughnessData,
																		d: sceneProperties,
																		e: viewMatrix
																	});
															}));
												}
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$colorTextureFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump sampler2D colorTexture;\n        \n        varying mediump vec2 interpolatedUv;\n        \n        void main () {\n            gl_FragColor = texture2D(colorTexture, interpolatedUv);\n        }\n    ',
	attributes: {},
	uniforms: {colorTexture: 'cK'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute mediump vec2 uv;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        varying mediump vec2 interpolatedUv;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main() {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedUv = uv;\n        }\n    ',
	attributes: {position: 'gs', uv: '_'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$colorTextureMesh = F4(
	function (data, bounds, webGLMesh, backFaceSetting) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
			bounds,
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$colorTextureFragment,
						webGLMesh,
						{cK: data, a: modelMatrix, b: modelScale, c: projectionMatrix, d: sceneProperties, e: viewMatrix});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantFragment = {
	src: '\n        precision lowp float;\n        \n        uniform lowp vec4 constantColor;\n        \n        void main () {\n            gl_FragColor = constantColor;\n        }\n    ',
	attributes: {},
	uniforms: {constantColor: 'bI'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n        }\n    ',
	attributes: {position: 'gs'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh = F4(
	function (color, bounds, webGLMesh, backFaceSetting) {
		return A3(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
			color,
			bounds,
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantFragment,
						webGLMesh,
						{
							bI: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(color),
							a: modelMatrix,
							b: modelScale,
							c: projectionMatrix,
							d: sceneProperties,
							e: viewMatrix
						});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$PointNode = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantPointFragment = {
	src: '\n        precision lowp float;\n        \n        uniform lowp vec4 constantColor;\n        uniform lowp float pointRadius;\n        uniform highp mat4 sceneProperties;\n        \n        float pointAlpha(float pointRadius, vec2 pointCoord) {\n            float pointSize = 2.0 * pointRadius;\n            float x = (pointSize + 2.0) * (pointCoord.s - 0.5);\n            float y = (pointSize + 2.0) * (pointCoord.t - 0.5);\n            float r = sqrt(x * x + y * y);\n            float innerRadius = pointRadius;\n            float outerRadius = pointRadius + 1.0;\n            if (r > outerRadius) {\n                return 0.0;\n            } else if (r > innerRadius) {\n                return outerRadius - r;\n            } else {\n                return 1.0;\n            }\n        }\n        \n        void main () {\n            float supersampling = sceneProperties[3][0];\n            float alpha = pointAlpha(pointRadius * supersampling, gl_PointCoord);\n            gl_FragColor = constantColor * alpha;\n        }\n    ',
	attributes: {},
	uniforms: {constantColor: 'bI', pointRadius: 'dg', sceneProperties: 'd'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$pointVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform lowp float pointRadius;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            float supersampling = sceneProperties[3][0];\n            gl_PointSize = 2.0 * pointRadius * supersampling + 2.0;\n        }\n    ',
	attributes: {position: 'gs'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', pointRadius: 'dg', projectionMatrix: 'c', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$constantPointMesh = F4(
	function (color, radius, bounds, webGLMesh) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Types$PointNode,
			bounds,
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						settings,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$pointVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantPointFragment,
						webGLMesh,
						{
							bI: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(color),
							a: modelMatrix,
							b: modelScale,
							dg: radius,
							c: projectionMatrix,
							d: sceneProperties,
							e: viewMatrix
						});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump vec4 emissiveColor;\n        uniform highp mat4 sceneProperties;\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        float inverseAlpha(float value) {\n            // the value used for alpha cannot be less than zero\n            float signValue = float(sign(value));\n            return signValue / (value + (signValue - 1.0));\n        }\n        \n        vec4 toSrgb(vec4 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            // linearColor has premultiplied alpha, but tone mapping works on\n            // non-premultiplied linear RGB so we need to temporarily \'undo\' the\n            // premultiplication before applying tone mapping\n            float invAlpha = inverseAlpha(linearColor.a);\n            float unitR = (linearColor.r * invAlpha) / referenceWhite.r;\n            float unitG = (linearColor.g * invAlpha) / referenceWhite.g;\n            float unitB = (linearColor.b * invAlpha) / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            // Apply tone mapping\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            // Re-apply premultiplied alpha after tone mapping\n            return vec4(toneMapped * linearColor.a, linearColor.a);\n        }\n        \n        void main () {\n            gl_FragColor = toSrgb(emissiveColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {emissiveColor: 'bN', sceneProperties: 'd'}
};
var $ianmackenzie$elm_units$Luminance$inNits = function (_v0) {
	var numNits = _v0;
	return numNits;
};
var $elm_explorations$linear_algebra$Math$Vector4$scale = _MJS_v4scale;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh = F5(
	function (color, backlight, bounds, webGLMesh, backFaceSetting) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
			bounds,
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveFragment,
						webGLMesh,
						{
							bN: A2(
								$elm_explorations$linear_algebra$Math$Vector4$scale,
								$ianmackenzie$elm_units$Luminance$inNits(backlight),
								color),
							a: modelMatrix,
							b: modelScale,
							c: projectionMatrix,
							d: sceneProperties,
							e: viewMatrix
						});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissivePointFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump vec4 emissiveColor;\n        uniform lowp float pointRadius;\n        uniform highp mat4 sceneProperties;\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        float inverseAlpha(float value) {\n            // the value used for alpha cannot be less than zero\n            float signValue = float(sign(value));\n            return signValue / (value + (signValue - 1.0));\n        }\n        \n        vec4 toSrgb(vec4 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            // linearColor has premultiplied alpha, but tone mapping works on\n            // non-premultiplied linear RGB so we need to temporarily \'undo\' the\n            // premultiplication before applying tone mapping\n            float invAlpha = inverseAlpha(linearColor.a);\n            float unitR = (linearColor.r * invAlpha) / referenceWhite.r;\n            float unitG = (linearColor.g * invAlpha) / referenceWhite.g;\n            float unitB = (linearColor.b * invAlpha) / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            // Apply tone mapping\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            // Re-apply premultiplied alpha after tone mapping\n            return vec4(toneMapped * linearColor.a, linearColor.a);\n        }\n        \n        float pointAlpha(float pointRadius, vec2 pointCoord) {\n            float pointSize = 2.0 * pointRadius;\n            float x = (pointSize + 2.0) * (pointCoord.s - 0.5);\n            float y = (pointSize + 2.0) * (pointCoord.t - 0.5);\n            float r = sqrt(x * x + y * y);\n            float innerRadius = pointRadius;\n            float outerRadius = pointRadius + 1.0;\n            if (r > outerRadius) {\n                return 0.0;\n            } else if (r > innerRadius) {\n                return outerRadius - r;\n            } else {\n                return 1.0;\n            }\n        }\n        \n        void main () {\n            vec4 color = toSrgb(emissiveColor, sceneProperties);\n            float supersampling = sceneProperties[3][0];\n            float alpha = pointAlpha(pointRadius * supersampling, gl_PointCoord);\n            gl_FragColor = color * alpha;\n        }\n    ',
	attributes: {},
	uniforms: {emissiveColor: 'bN', pointRadius: 'dg', sceneProperties: 'd'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$emissivePointMesh = F5(
	function (color, backlight, radius, bounds, webGLMesh) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Types$PointNode,
			bounds,
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						settings,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$pointVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissivePointFragment,
						webGLMesh,
						{
							bN: A2(
								$elm_explorations$linear_algebra$Math$Vector4$scale,
								$ianmackenzie$elm_units$Luminance$inNits(backlight),
								color),
							a: modelMatrix,
							b: modelScale,
							dg: radius,
							c: projectionMatrix,
							d: sceneProperties,
							e: viewMatrix
						});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform lowp vec4 materialColor;\n        uniform lowp float ambientOcclusion;\n        uniform highp mat4 viewMatrix;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 lambertianLight(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            float ambientOcclusion,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                vec3 upDirection = xyz_type.xyz;\n                vec3 aboveLuminance = rgb_parameter.rgb;\n                vec3 belowLuminance = rgb_parameter.a * aboveLuminance;\n                vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, upDirection, surfaceNormal);\n                return luminance * materialColor * ambientOcclusion;\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(\n                xyz_type,\n                rgb_parameter,\n                surfacePosition,\n                directionToLight,\n                normalIlluminance\n            );\n        \n            float dotNL = positiveDotProduct(directionToLight, surfaceNormal);\n            return (normalIlluminance * dotNL) * (materialColor / kPi);\n        }\n        \n        vec3 lambertianLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            float ambientOcclusion,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            vec3 litColor1 = enabledLights[0] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights12[0], lights12[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights12[2], lights12[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights34[0], lights34[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights34[2], lights34[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights56[0], lights56[1]);\n            vec3 litColor6 = lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights56[2], lights56[3]);\n            vec3 litColor7 = lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights78[0], lights78[1]);\n            vec3 litColor8 = lambertianLight(surfacePosition, surfaceNormal, materialColor, ambientOcclusion, lights78[2], lights78[3]);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        float inverseAlpha(float value) {\n            // the value used for alpha cannot be less than zero\n            float signValue = float(sign(value));\n            return signValue / (value + (signValue - 1.0));\n        }\n        \n        vec4 toSrgb(vec4 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            // linearColor has premultiplied alpha, but tone mapping works on\n            // non-premultiplied linear RGB so we need to temporarily \'undo\' the\n            // premultiplication before applying tone mapping\n            float invAlpha = inverseAlpha(linearColor.a);\n            float unitR = (linearColor.r * invAlpha) / referenceWhite.r;\n            float unitG = (linearColor.g * invAlpha) / referenceWhite.g;\n            float unitB = (linearColor.b * invAlpha) / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            // Apply tone mapping\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            // Re-apply premultiplied alpha after tone mapping\n            return vec4(toneMapped * linearColor.a, linearColor.a);\n        }\n        \n        void main() {\n            vec3 normalDirection = normalize(interpolatedNormal) * getNormalSign();\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n        \n            vec3 linearColor = lambertianLighting(\n                interpolatedPosition,\n                normalDirection,\n                materialColor.rgb,\n                ambientOcclusion,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(vec4(linearColor, materialColor.a), sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {ambientOcclusion: 'bF', enabledLights: 'u', lights12: 'cl', lights34: 'c0', lights56: 'c1', lights78: 'c2', materialColor: 'ea', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$uniformVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute highp vec3 normal;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n        }\n    ',
	attributes: {normal: 'c8', position: 'gs'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh = F5(
	function (color, ambientOcclusion, bounds, webGLMesh, backFaceSetting) {
		return A3(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
			color,
			bounds,
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v0, settings) {
					var lights = _v0.a;
					var enabledLights = _v0.b;
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$uniformVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianFragment,
						webGLMesh,
						{
							bF: ambientOcclusion,
							u: enabledLights,
							cl: lights.cl,
							c0: lights.c0,
							c1: lights.c1,
							c2: lights.c2,
							ea: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(color),
							a: modelMatrix,
							b: modelScale,
							c: projectionMatrix,
							d: sceneProperties,
							e: viewMatrix
						});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform lowp vec4 baseColor;\n        uniform lowp float roughness;\n        uniform lowp float metallic;\n        uniform lowp float ambientOcclusion;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const mediump float kMediumpFloatMax = 65504.0;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        // Adapted from https://google.github.io/filament/Filament.md.html#materialsystem/specularbrdf/normaldistributionfunction(speculard)\n        float specularD(float alpha, float dotNH, vec3 normalDirection, vec3 halfDirection) {\n            vec3 crossNH = cross(normalDirection, halfDirection);\n            float a = dotNH * alpha;\n            float k = alpha / (dot(crossNH, crossNH) + a * a);\n            float d = k * k * (1.0 / kPi);\n            return min(d, kMediumpFloatMax);\n        }\n        \n        float safeQuotient(float numerator, float denominator) {\n            if (denominator == 0.0) {\n                return 0.0;\n            } else {\n                return numerator / denominator;\n            }\n        }\n        \n        float g1(float dotNV, float alphaSquared) {\n            return safeQuotient(2.0 * dotNV, dotNV + sqrt(alphaSquared + (1.0 - alphaSquared) * dotNV * dotNV));\n        }\n        \n        float specularG(float dotNL, float dotNV, float alphaSquared) {\n            return g1(dotNV, alphaSquared) * g1(dotNL, alphaSquared);\n        }\n        \n        vec3 fresnelColor(vec3 specularBaseColor, float dotVH) {\n            vec3 one = vec3(1.0, 1.0, 1.0);\n            float scale = exp2((-5.55473 * dotVH - 6.98316) * dotVH);\n            return specularBaseColor + (one - specularBaseColor) * scale;\n        }\n        \n        vec3 brdf(vec3 normalDirection, vec3 directionToCamera, vec3 directionToLight, float alpha, float dotNV, float dotNL, vec3 specularBaseColor, vec3 normalIlluminance) {\n            vec3 halfDirection = normalize(directionToCamera + directionToLight);\n            float dotVH = positiveDotProduct(directionToCamera, halfDirection);\n            float dotNH = positiveDotProduct(normalDirection, halfDirection);\n            float dotNHSquared = dotNH * dotNH;\n        \n            float d = specularD(alpha, dotNH, normalDirection, halfDirection);\n            float g = specularG(dotNL, dotNV, alpha * alpha);\n            vec3 f = fresnelColor(specularBaseColor, dotVH);\n            return safeQuotient(d * g, 4.0 * dotNL * dotNV) * f;\n        }\n        \n        vec3 sampleFacetNormal(vec3 vH, vec3 vT1, vec3 vT2, float s, float alpha) {\n            float t2 = (1.0 - s);\n            vec3 vNh = t2 * vT2 + sqrt(max(0.0, 1.0 - t2 * t2)) * vH;\n            return normalize(vec3(alpha * vNh.x, alpha * vNh.y, max(0.0, vNh.z)));\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 softLightingSpecularSample(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localViewDirection,\n            vec3 localLightDirection,\n            vec3 localHalfDirection,\n            float alphaSquared,\n            vec3 specularBaseColor\n        ) {\n            vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, localUpDirection, localLightDirection);\n            float dotVH = positiveDotProduct(localViewDirection, localHalfDirection);\n            float dotNL = localLightDirection.z;\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n        }\n        \n        vec3 softLighting(\n            vec3 normalDirection,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            vec3 directionToCamera,\n            vec3 viewY,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float alphaSquared = alpha * alpha;\n            vec3 upDirection = xyz_type.xyz;\n            vec3 luminanceAbove = rgb_parameter.rgb;\n            vec3 luminanceBelow = rgb_parameter.a * luminanceAbove;\n            vec3 crossProduct = cross(normalDirection, directionToCamera);\n            float crossMagnitude = length(crossProduct);\n            vec3 xDirection = vec3(0.0, 0.0, 0.0);\n            vec3 yDirection = vec3(0.0, 0.0, 0.0);\n            if (crossMagnitude > 1.0e-6) {\n                yDirection = (1.0 / crossMagnitude) * crossProduct;\n                xDirection = cross(yDirection, normalDirection);\n            } else {\n                vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n                xDirection = normalize(cross(viewY, normalDirection));\n                yDirection = cross(normalDirection, xDirection);\n            }\n            float localViewX = dot(directionToCamera, xDirection);\n            float localViewZ = dot(directionToCamera, normalDirection);\n            vec3 localViewDirection = vec3(localViewX, 0, localViewZ);\n            float localUpX = dot(upDirection, xDirection);\n            float localUpY = dot(upDirection, yDirection);\n            float localUpZ = dot(upDirection, normalDirection);\n            vec3 localUpDirection = vec3(localUpX, localUpY, localUpZ);\n        \n            vec3 vH = normalize(vec3(alpha * localViewX, 0.0, localViewZ));\n            vec3 vT1 = vec3(0.0, 1.0, 0.0);\n            vec3 vT2 = cross(vH, vT1);\n            float s = 0.5 * (1.0 + vH.z);\n        \n            vec3 localHalfDirection = sampleFacetNormal(vH, vT1, vT2, s, alpha);\n            vec3 localLightDirection = vec3(0.0, 0.0, 0.0);\n        \n            localLightDirection = -reflect(localViewDirection, localHalfDirection);\n            vec3 specular = softLightingSpecularSample(luminanceAbove, luminanceBelow, localUpDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n        \n            localLightDirection = vec3(0.000000, 0.000000, 1.000000);\n            vec3 diffuse = softLightingLuminance(luminanceAbove, luminanceBelow, localUpDirection, localLightDirection) * localLightDirection.z;\n        \n            return specular + diffuse * diffuseBaseColor;\n        }\n        \n        vec3 physicalLight(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            vec3 normalDirection,\n            vec3 directionToCamera,\n            vec3 viewY,\n            float dotNV,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            float ambientOcclusion\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                return softLighting(normalDirection, diffuseBaseColor, specularBaseColor, alpha, directionToCamera, viewY, xyz_type, rgb_parameter) * ambientOcclusion;\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(xyz_type, rgb_parameter, surfacePosition, directionToLight, normalIlluminance);\n        \n            float dotNL = positiveDotProduct(normalDirection, directionToLight);\n            vec3 specularColor = brdf(normalDirection, directionToCamera, directionToLight, alpha, dotNV, dotNL, specularBaseColor, normalIlluminance);\n            return (normalIlluminance * dotNL) * ((diffuseBaseColor / kPi) + specularColor);\n        }\n        \n        vec3 physicalLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 baseColor,\n            vec3 directionToCamera,\n            mat4 viewMatrix,\n            float roughness,\n            float metallic,\n            float ambientOcclusion,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            float dotNV = positiveDotProduct(surfaceNormal, directionToCamera);\n            float alpha = roughness * roughness;\n            float nonmetallic = 1.0 - metallic;\n            vec3 diffuseBaseColor = nonmetallic * 0.96 * baseColor;\n            vec3 specularBaseColor = nonmetallic * 0.04 * vec3(1.0, 1.0, 1.0) + metallic * baseColor;\n            vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n        \n            vec3 litColor1 = enabledLights[0] == 1.0 ? physicalLight(lights12[0], lights12[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? physicalLight(lights12[2], lights12[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? physicalLight(lights34[0], lights34[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? physicalLight(lights34[2], lights34[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = physicalLight(lights56[0], lights56[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion);\n            vec3 litColor6 = physicalLight(lights56[2], lights56[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion);\n            vec3 litColor7 = physicalLight(lights78[0], lights78[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion);\n            vec3 litColor8 = physicalLight(lights78[2], lights78[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha, ambientOcclusion);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        float inverseAlpha(float value) {\n            // the value used for alpha cannot be less than zero\n            float signValue = float(sign(value));\n            return signValue / (value + (signValue - 1.0));\n        }\n        \n        vec4 toSrgb(vec4 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            // linearColor has premultiplied alpha, but tone mapping works on\n            // non-premultiplied linear RGB so we need to temporarily \'undo\' the\n            // premultiplication before applying tone mapping\n            float invAlpha = inverseAlpha(linearColor.a);\n            float unitR = (linearColor.r * invAlpha) / referenceWhite.r;\n            float unitG = (linearColor.g * invAlpha) / referenceWhite.g;\n            float unitB = (linearColor.b * invAlpha) / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            // Apply tone mapping\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            // Re-apply premultiplied alpha after tone mapping\n            return vec4(toneMapped * linearColor.a, linearColor.a);\n        }\n        \n        void main() {\n            vec3 normalDirection = normalize(interpolatedNormal) * getNormalSign();\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n        \n            vec3 linearColor = physicalLighting(\n                interpolatedPosition,\n                normalDirection,\n                baseColor.rgb,\n                directionToCamera,\n                viewMatrix,\n                roughness,\n                metallic,\n                ambientOcclusion,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(vec4(linearColor, baseColor.a), sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {ambientOcclusion: 'bF', baseColor: 'dI', enabledLights: 'u', lights12: 'cl', lights34: 'c0', lights56: 'c1', lights78: 'c2', metallic: 'ed', roughness: 'ey', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh = F7(
	function (color, roughness, metallic, ambientOcclusion, bounds, webGLMesh, backFaceSetting) {
		return A3(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
			color,
			bounds,
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v0, settings) {
					var lights = _v0.a;
					var enabledLights = _v0.b;
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$uniformVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalFragment,
						webGLMesh,
						{
							bF: ambientOcclusion,
							dI: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(color),
							u: enabledLights,
							cl: lights.cl,
							c0: lights.c0,
							c1: lights.c1,
							c2: lights.c2,
							ed: metallic,
							a: modelMatrix,
							b: modelScale,
							c: projectionMatrix,
							ey: roughness,
							d: sceneProperties,
							e: viewMatrix
						});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantLambertianMaterial = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$UseColor = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$UseTexture = function (a) {
	return {$: 0, a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledFloat = function (value) {
	return A2($elm_explorations$linear_algebra$Math$Vector2$vec2, value, 1);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2 = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple = F2(
	function (fallbackData, texture) {
		if (!texture.$) {
			var value = texture.a;
			return _Utils_Tuple2(
				fallbackData,
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledFloat(value));
		} else {
			var data = texture.a.e0;
			return _Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple = F2(
	function (fallbackData, channel) {
		if (!channel.$) {
			return _Utils_Tuple2(fallbackData, 0.0);
		} else {
			var format = channel.a.hv;
			var data = channel.a.e0;
			return _Utils_Tuple2(
				data,
				function () {
					if (!format) {
						return 1.0;
					} else {
						return -1.0;
					}
				}());
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$resolveLambertian = F3(
	function (materialColorTexture, ambientOcclusionTexture, normalMapTexture) {
		var _v0 = _Utils_Tuple3(materialColorTexture, ambientOcclusionTexture, normalMapTexture);
		if (_v0.a.$ === 1) {
			var data = _v0.a.a.e0;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial,
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$UseTexture(data),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, ambientOcclusionTexture),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
		} else {
			if (!_v0.b.$) {
				if (!_v0.c.$) {
					var materialColor = _v0.a.a;
					var ambientOcclusion = _v0.b.a;
					var _v1 = _v0.c;
					return A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantLambertianMaterial, materialColor, ambientOcclusion);
				} else {
					var materialColor = _v0.a.a;
					var data = _v0.c.a.e0;
					return A3(
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$UseColor, materialColor, data),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, ambientOcclusionTexture),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
				}
			} else {
				var materialColor = _v0.a.a;
				var data = _v0.b.a.e0;
				return A3(
					$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$UseColor, materialColor, data),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, ambientOcclusionTexture),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantPbrMaterial = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial = F5(
	function (a, b, c, d, e) {
		return {$: 1, a: a, b: b, c: c, d: d, e: e};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$Tuple5 = F5(
	function (a, b, c, d, e) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$resolvePbr = F5(
	function (baseColorTexture, roughnessTexture, metallicTexture, ambientOcclusionTexture, normalMapTexture) {
		var _v0 = A5($ianmackenzie$elm_3d_scene$Scene3d$Entity$Tuple5, baseColorTexture, roughnessTexture, metallicTexture, ambientOcclusionTexture, normalMapTexture);
		if (_v0.a.$ === 1) {
			var data = _v0.a.a.e0;
			return A5(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$UseTexture(data),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, ambientOcclusionTexture),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
		} else {
			if (!_v0.b.$) {
				if (!_v0.c.$) {
					if (!_v0.d.$) {
						if (!_v0.e.$) {
							var baseColor = _v0.a.a;
							var roughness = _v0.b.a;
							var metallic = _v0.c.a;
							var ambientOcclusion = _v0.d.a;
							var _v1 = _v0.e;
							return A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantPbrMaterial, baseColor, roughness, metallic, ambientOcclusion);
						} else {
							var baseColor = _v0.a.a;
							var data = _v0.e.a.e0;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
								A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$UseColor, baseColor, data),
								A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
								A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
								A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, ambientOcclusionTexture),
								_Utils_Tuple2(data, 1.0));
						}
					} else {
						var baseColor = _v0.a.a;
						var data = _v0.d.a.e0;
						return A5(
							$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$UseColor, baseColor, data),
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
							_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2),
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
					}
				} else {
					var baseColor = _v0.a.a;
					var data = _v0.c.a.e0;
					return A5(
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$UseColor, baseColor, data),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
						_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, ambientOcclusionTexture),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
				}
			} else {
				var baseColor = _v0.a.a;
				var data = _v0.b.a.e0;
				return A5(
					$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$UseColor, baseColor, data),
					_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, ambientOcclusionTexture),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveTextureFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump sampler2D colorTexture;\n        uniform mediump float backlight;\n        uniform highp mat4 sceneProperties;\n        \n        varying mediump vec2 interpolatedUv;\n        \n        float inverseGamma(float u) {\n            if (u <= 0.04045) {\n                return clamp(u / 12.92, 0.0, 1.0);\n            } else {\n                return clamp(pow((u + 0.055) / 1.055, 2.4), 0.0, 1.0);\n            }\n        }\n        \n        float inverseAlpha(float value) {\n            // the value used for alpha cannot be less than zero\n            float signValue = float(sign(value));\n            return signValue / (value + (signValue - 1.0));\n        }\n        \n        vec4 fromSrgb(vec4 srgbColor) {\n            float invAlpha = inverseAlpha(srgbColor.a);\n            return vec4(\n                inverseGamma(srgbColor.r * invAlpha) * srgbColor.a,\n                inverseGamma(srgbColor.g * invAlpha) * srgbColor.a,\n                inverseGamma(srgbColor.b * invAlpha) * srgbColor.a,\n                srgbColor.a\n            );\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec4 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            // linearColor has premultiplied alpha, but tone mapping works on\n            // non-premultiplied linear RGB so we need to temporarily \'undo\' the\n            // premultiplication before applying tone mapping\n            float invAlpha = inverseAlpha(linearColor.a);\n            float unitR = (linearColor.r * invAlpha) / referenceWhite.r;\n            float unitG = (linearColor.g * invAlpha) / referenceWhite.g;\n            float unitB = (linearColor.b * invAlpha) / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            // Apply tone mapping\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            // Re-apply premultiplied alpha after tone mapping\n            return vec4(toneMapped * linearColor.a, linearColor.a);\n        }\n        \n        void main () {\n            vec4 linearTextureColor = fromSrgb(texture2D(colorTexture, interpolatedUv));\n            vec4 emissiveColor = vec4(linearTextureColor.rgb * backlight, linearTextureColor.a);\n            gl_FragColor = toSrgb(emissiveColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {backlight: 'dC', colorTexture: 'cK', sceneProperties: 'd'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedEmissiveMesh = F5(
	function (colorData, backlight, bounds, webGLMesh, backFaceSetting) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
			bounds,
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveTextureFragment,
						webGLMesh,
						{
							dC: $ianmackenzie$elm_units$Luminance$inNits(backlight),
							cK: colorData,
							a: modelMatrix,
							b: modelScale,
							c: projectionMatrix,
							d: sceneProperties,
							e: viewMatrix
						});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute highp vec3 normal;\n        attribute mediump vec2 uv;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec4 interpolatedTangent;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n            interpolatedUv = uv;\n            interpolatedTangent = vec4(0.0, 0.0, 0.0, 0.0);\n        }\n    ',
	attributes: {normal: 'c8', position: 'gs', uv: '_'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedLambertianMesh = F6(
	function (useTextureOrColor, ambientOcclusionData, constantAmbientOcclusion, bounds, webGLMesh, backFaceSetting) {
		if (!useTextureOrColor.$) {
			var materialColorData = useTextureOrColor.a;
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v1, settings) {
						var lights = _v1.a;
						var enabledLights = _v1.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment,
							webGLMesh,
							{ao: ambientOcclusionData, ap: constantAmbientOcclusion, bJ: $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4, u: enabledLights, cl: lights.cl, c0: lights.c0, c1: lights.c1, c2: lights.c2, bV: materialColorData, a: modelMatrix, b: modelScale, av: materialColorData, aw: 0.0, c: projectionMatrix, d: sceneProperties, e: viewMatrix});
					}));
		} else {
			var constantMaterialColor = useTextureOrColor.a;
			var dummyTexture = useTextureOrColor.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
				constantMaterialColor,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v2, settings) {
						var lights = _v2.a;
						var enabledLights = _v2.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment,
							webGLMesh,
							{
								ao: ambientOcclusionData,
								ap: constantAmbientOcclusion,
								bJ: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(constantMaterialColor),
								u: enabledLights,
								cl: lights.cl,
								c0: lights.c0,
								c1: lights.c1,
								c2: lights.c2,
								bV: dummyTexture,
								a: modelMatrix,
								b: modelScale,
								av: dummyTexture,
								aw: 0.0,
								c: projectionMatrix,
								d: sceneProperties,
								e: viewMatrix
							});
					}));
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedPhysicalMesh = F8(
	function (useTextureOrColor, roughnessData, constantRoughness, metallicData, constantMetallic, bounds, webGLMesh, backFaceSetting) {
		if (!useTextureOrColor.$) {
			var baseColorData = useTextureOrColor.a;
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v1, settings) {
						var lights = _v1.a;
						var enabledLights = _v1.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment,
							webGLMesh,
							{
								ao: baseColorData,
								bG: baseColorData,
								ap: $ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledFloat(1),
								bH: $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4,
								bK: constantMetallic,
								bL: constantRoughness,
								u: enabledLights,
								cl: lights.cl,
								c0: lights.c0,
								c1: lights.c1,
								c2: lights.c2,
								bW: metallicData,
								a: modelMatrix,
								b: modelScale,
								av: baseColorData,
								aw: 0.0,
								c: projectionMatrix,
								b_: roughnessData,
								d: sceneProperties,
								e: viewMatrix
							});
					}));
		} else {
			var constantBaseColor = useTextureOrColor.a;
			var dummyTexture = useTextureOrColor.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
				constantBaseColor,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v2, settings) {
						var lights = _v2.a;
						var enabledLights = _v2.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment,
							webGLMesh,
							{
								ao: dummyTexture,
								bG: dummyTexture,
								ap: $ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledFloat(1),
								bH: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(constantBaseColor),
								bK: constantMetallic,
								bL: constantRoughness,
								u: enabledLights,
								cl: lights.cl,
								c0: lights.c0,
								c1: lights.c1,
								c2: lights.c2,
								bW: metallicData,
								a: modelMatrix,
								b: modelScale,
								av: dummyTexture,
								aw: 0.0,
								c: projectionMatrix,
								b_: roughnessData,
								d: sceneProperties,
								e: viewMatrix
							});
					}));
		}
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$centerPoint = function (boundingBox) {
	var _v0 = boundingBox;
	var b = _v0;
	var x1 = b.f6;
	var x2 = b.f3;
	var y1 = b.f7;
	var y2 = b.f4;
	var z1 = b.f8;
	var z2 = b.f5;
	return {n: x1 + (0.5 * (x2 - x1)), o: y1 + (0.5 * (y2 - y1)), p: z1 + (0.5 * (z2 - z1))};
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxX = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.f3;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxY = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.f4;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxZ = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.f5;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minX = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.f6;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minY = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.f7;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minZ = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.f8;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$dimensions = function (boundingBox) {
	return _Utils_Tuple3(
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minX(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxX(boundingBox)),
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minY(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxY(boundingBox)),
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minZ(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxZ(boundingBox)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds = function (boundingBox) {
	var _v0 = $ianmackenzie$elm_geometry$BoundingBox3d$dimensions(boundingBox);
	var xDimension = _v0.a;
	var yDimension = _v0.b;
	var zDimension = _v0.c;
	return {
		g8: $ianmackenzie$elm_geometry$Point3d$unwrap(
			$ianmackenzie$elm_geometry$BoundingBox3d$centerPoint(boundingBox)),
		hz: xDimension / 2,
		hA: yDimension / 2,
		hB: zDimension / 2
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$mesh = F2(
	function (givenMaterial, givenMesh) {
		switch (givenMaterial.$) {
			case 0:
				if (!givenMaterial.b.$) {
					var color = givenMaterial.b.a;
					switch (givenMesh.$) {
						case 0:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 1:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 2:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 3:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 4:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 5:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 6:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 7:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 8:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								0);
						case 9:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								0);
						default:
							var boundingBox = givenMesh.a;
							var radius = givenMesh.b;
							var webGLMesh = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantPointMesh,
								color,
								radius,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh);
					}
				} else {
					var _v2 = givenMaterial.a;
					var data = givenMaterial.b.a.e0;
					switch (givenMesh.$) {
						case 0:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 1:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 2:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 3:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 4:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 5:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$colorTextureMesh,
								data,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 6:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$colorTextureMesh,
								data,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 7:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$colorTextureMesh,
								data,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 8:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 9:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				}
			case 1:
				if (!givenMaterial.b.$) {
					var emissiveColor = givenMaterial.b.a;
					var backlight = givenMaterial.c;
					switch (givenMesh.$) {
						case 0:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 1:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 2:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 3:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 4:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 5:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 6:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 7:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 8:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								0);
						case 9:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								0);
						default:
							var boundingBox = givenMesh.a;
							var radius = givenMesh.b;
							var webGLMesh = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissivePointMesh,
								emissiveColor,
								backlight,
								radius,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh);
					}
				} else {
					var _v5 = givenMaterial.a;
					var data = givenMaterial.b.a.e0;
					var backlight = givenMaterial.c;
					switch (givenMesh.$) {
						case 0:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 1:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 2:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 3:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 4:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 5:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedEmissiveMesh,
								data,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 6:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedEmissiveMesh,
								data,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 7:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedEmissiveMesh,
								data,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 8:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 9:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				}
			case 2:
				var _v7 = givenMaterial.a;
				var materialColorTexture = givenMaterial.b;
				var ambientOcclusionTexture = givenMaterial.c;
				var normalMapTexture = givenMaterial.d;
				var _v8 = A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$resolveLambertian, materialColorTexture, ambientOcclusionTexture, normalMapTexture);
				if (!_v8.$) {
					var materialColor = _v8.a;
					var ambientOcclusion = _v8.b;
					switch (givenMesh.$) {
						case 0:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 1:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 2:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh,
								materialColor,
								ambientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 3:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 4:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh,
								materialColor,
								ambientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 5:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 6:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh,
								materialColor,
								ambientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 7:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh,
								materialColor,
								ambientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 8:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 9:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				} else {
					var useColorOrTexture = _v8.a;
					var _v10 = _v8.b;
					var ambientOcclusionData = _v10.a;
					var constantAmbientOcclusion = _v10.b;
					var _v11 = _v8.c;
					var normalMapData = _v11.a;
					var normalMapType = _v11.b;
					switch (givenMesh.$) {
						case 0:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 1:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 2:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 3:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 4:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 5:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 6:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A6(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedLambertianMesh,
								useColorOrTexture,
								ambientOcclusionData,
								constantAmbientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 7:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A8(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$bumpyLambertianMesh,
								useColorOrTexture,
								ambientOcclusionData,
								constantAmbientOcclusion,
								normalMapData,
								normalMapType,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 8:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 9:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				}
			default:
				var _v13 = givenMaterial.a;
				var baseColorTexture = givenMaterial.b;
				var roughnessTexture = givenMaterial.c;
				var metallicTexture = givenMaterial.d;
				var ambientOcclusionTexture = givenMaterial.e;
				var normalMapTexture = givenMaterial.f;
				var _v14 = A5($ianmackenzie$elm_3d_scene$Scene3d$Entity$resolvePbr, baseColorTexture, roughnessTexture, metallicTexture, ambientOcclusionTexture, normalMapTexture);
				if (!_v14.$) {
					var baseColor = _v14.a;
					var roughness = _v14.b;
					var metallic = _v14.c;
					var ambientOcclusion = _v14.d;
					switch (givenMesh.$) {
						case 0:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 1:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 2:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A7(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh,
								baseColor,
								roughness,
								metallic,
								ambientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 3:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 4:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A7(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh,
								baseColor,
								roughness,
								metallic,
								ambientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 5:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 6:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A7(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh,
								baseColor,
								roughness,
								metallic,
								ambientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 7:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A7(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh,
								baseColor,
								roughness,
								metallic,
								ambientOcclusion,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 8:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 9:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				} else {
					var useTextureOrColor = _v14.a;
					var _v16 = _v14.b;
					var roughnessData = _v16.a;
					var constantRoughness = _v16.b;
					var _v17 = _v14.c;
					var metallicData = _v17.a;
					var constantMetallic = _v17.b;
					var _v18 = _v14.d;
					var ambientOcclusionData = _v18.a;
					var constantAmbientOcclusion = _v18.b;
					var _v19 = _v14.e;
					var normalMapData = _v19.a;
					var normalMapType = _v19.b;
					switch (givenMesh.$) {
						case 0:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 1:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 2:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 3:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 4:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 5:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 6:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A8(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedPhysicalMesh,
								useTextureOrColor,
								roughnessData,
								constantRoughness,
								metallicData,
								constantMetallic,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 7:
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$bumpyPhysicalMesh(useTextureOrColor)(roughnessData)(constantRoughness)(metallicData)(constantMetallic)(ambientOcclusionData)(constantAmbientOcclusion)(normalMapData)(normalMapType)(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox))(webGLMesh)(backFaceSetting);
						case 8:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 9:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$placeIn = function (frame) {
	var p0 = $ianmackenzie$elm_geometry$Point3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$originPoint(frame));
	var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
	var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$yDirection(frame));
	var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$xDirection(frame));
	return {
		fC: $ianmackenzie$elm_geometry$Frame3d$isRightHanded(frame),
		C: i.n,
		D: i.o,
		E: i.p,
		F: j.n,
		G: j.o,
		H: j.p,
		I: k.n,
		J: k.o,
		K: k.p,
		U: p0.n,
		V: p0.o,
		W: p0.p,
		dl: 1
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose = F2(
	function (t1, t2) {
		return {
			fC: _Utils_eq(t1.fC, t2.fC),
			C: ((t1.C * t2.C) + (t1.D * t2.F)) + (t1.E * t2.I),
			D: ((t1.C * t2.D) + (t1.D * t2.G)) + (t1.E * t2.J),
			E: ((t1.C * t2.E) + (t1.D * t2.H)) + (t1.E * t2.K),
			F: ((t1.F * t2.C) + (t1.G * t2.F)) + (t1.H * t2.I),
			G: ((t1.F * t2.D) + (t1.G * t2.G)) + (t1.H * t2.J),
			H: ((t1.F * t2.E) + (t1.G * t2.H)) + (t1.H * t2.K),
			I: ((t1.I * t2.C) + (t1.J * t2.F)) + (t1.K * t2.I),
			J: ((t1.I * t2.D) + (t1.J * t2.G)) + (t1.K * t2.J),
			K: ((t1.I * t2.E) + (t1.J * t2.H)) + (t1.K * t2.K),
			U: t2.U + ((((t1.U * t2.C) + (t1.V * t2.F)) + (t1.W * t2.I)) * t2.dl),
			V: t2.V + ((((t1.U * t2.D) + (t1.V * t2.G)) + (t1.W * t2.J)) * t2.dl),
			W: t2.W + ((((t1.U * t2.E) + (t1.V * t2.H)) + (t1.W * t2.K)) * t2.dl),
			dl: t1.dl * t2.dl
		};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy = F2(
	function (transformation, _v0) {
		var node = _v0;
		switch (node.$) {
			case 0:
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
			case 6:
				var existingTransformation = node.a;
				var underlyingNode = node.b;
				var compositeTransformation = A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose, existingTransformation, transformation);
				return A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, compositeTransformation, underlyingNode);
			case 1:
				return A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node);
			case 2:
				return A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node);
			case 4:
				return A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node);
			case 3:
				return A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node);
			default:
				return A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$placeIn = F2(
	function (frame, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$placeIn(frame),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode = function (a) {
	return {$: 3, a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleBounds = F2(
	function (_v0, bounds) {
		var scaleX = _v0.a;
		var scaleY = _v0.b;
		var scaleZ = _v0.c;
		var originalCenterPoint = bounds.g8;
		return {
			g8: {n: scaleX * originalCenterPoint.n, o: scaleY * originalCenterPoint.o, p: scaleZ * originalCenterPoint.p},
			hz: scaleX * bounds.hz,
			hA: scaleY * bounds.hA,
			hB: scaleZ * bounds.hB
		};
	});
var $elm_explorations$linear_algebra$Math$Vector4$fromRecord = _MJS_v4fromRecord;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleDrawFunction = function (_v0) {
	return function (originalDrawFunction) {
		return function (sceneProperties) {
			return function (modelScale) {
				return function (modelMatrix) {
					return function (isRightHanded) {
						return function (viewMatrix) {
							return function (projectionMatrix) {
								return function (lights) {
									return function (settings) {
										var scaleX = _v0.a;
										var scaleY = _v0.b;
										var scaleZ = _v0.c;
										var _v1 = $elm_explorations$linear_algebra$Math$Vector4$toRecord(modelScale);
										var w = _v1.gU;
										var z = _v1.p;
										var y = _v1.o;
										var x = _v1.n;
										var updatedModelScale = $elm_explorations$linear_algebra$Math$Vector4$fromRecord(
											{gU: w, n: x * scaleX, o: y * scaleY, p: z * scaleZ});
										return A8(originalDrawFunction, sceneProperties, updatedModelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings);
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleNode = F2(
	function (scalingFactors, node) {
		switch (node.$) {
			case 0:
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode;
			case 6:
				var transformation = node.a;
				var underlyingNode = node.b;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed,
					transformation,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleNode, scalingFactors, underlyingNode));
			case 1:
				var bounds = node.a;
				var drawFunction = node.b;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleBounds, scalingFactors, bounds),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleDrawFunction, scalingFactors, drawFunction));
			case 2:
				var bounds = node.a;
				var drawFunction = node.b;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$Types$TransparentMeshNode,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleBounds, scalingFactors, bounds),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleDrawFunction, scalingFactors, drawFunction));
			case 4:
				return node;
			case 3:
				var drawFunction = node.a;
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleDrawFunction, scalingFactors, drawFunction));
			default:
				var childNodes = node.a;
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Group(
					A2(
						$elm$core$List$map,
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleNode(scalingFactors),
						childNodes));
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$preScale = F2(
	function (scalingFactors, _v0) {
		var node = _v0;
		return A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleNode, scalingFactors, node);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowFragment = {
	src: '\n        precision lowp float;\n        \n        void main () {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$Test = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$always = 519;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement = 7683;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$increment = 7682;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$keep = 7680;
var $elm_explorations$webgl$WebGL$Internal$StencilTest = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {$: 2, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j, k: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate = F3(
	function (_v0, options1, options2) {
		var writeMask = _v0.eN;
		var mask = _v0.d9;
		var ref = _v0.eu;
		var expandTest = F2(
			function (_v2, fn) {
				var expandedTest = _v2;
				return fn(expandedTest);
			});
		var expandOp = F2(
			function (_v1, fn) {
				var op = _v1;
				return fn(op);
			});
		var expand = function (options) {
			return A2(
				$elm$core$Basics$composeR,
				expandTest(options.ct),
				A2(
					$elm$core$Basics$composeR,
					expandOp(options.cf),
					A2(
						$elm$core$Basics$composeR,
						expandOp(options.cB),
						expandOp(options.cC))));
		};
		return A2(
			expand,
			options2,
			A2(
				expand,
				options1,
				A3($elm_explorations$webgl$WebGL$Internal$StencilTest, ref, mask, writeMask)));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$leftHandedStencilTest = A3(
	$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
	{d9: 0, eu: 0, eN: 15},
	{cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement},
	{cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$increment});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$rightHandedStencilTest = A3(
	$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
	{d9: 0, eu: 0, eN: 15},
	{cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$increment},
	{cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowSettings = F2(
	function (isRightHanded, settings) {
		return isRightHanded ? A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$rightHandedStencilTest, settings) : A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$leftHandedStencilTest, settings);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute highp vec3 normal;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 shadowLight;\n        \n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        vec3 getDirectionToLight(vec3 surfacePosition, vec4 xyz_type, vec4 rgb_parameter) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                return xyz_type.xyz;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                return normalize(lightPosition - surfacePosition);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 shadowVertexPosition(vec3 position, vec3 normal, mat4 shadowLight, vec4 modelScale, mat4 modelMatrix, mat4 viewMatrix, mat4 projectionMatrix, mat4 sceneProperties) {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            vec3 worldNormal = getWorldNormal(normal, vec4(modelScale.xyz, 1.0), modelMatrix);\n            vec4 xyz_type = shadowLight[0];\n            vec4 rgb_parameter = shadowLight[1];\n            vec3 directionToLight = getDirectionToLight(worldPosition.xyz, xyz_type, rgb_parameter);\n            vec3 offset = vec3(0.0, 0.0, 0.0);\n            float sceneDiameter = sceneProperties[3][1];\n            if (dot(directionToLight, worldNormal) <= 0.0) {\n                offset = -sceneDiameter * directionToLight;\n            } else {\n                offset = -0.001 * sceneDiameter * directionToLight;\n            }\n            vec4 offsetPosition = worldPosition + vec4(offset, 0.0);\n            return projectionMatrix * (viewMatrix * offsetPosition);\n        }\n        \n        void main () {\n            gl_Position = shadowVertexPosition(\n                position,\n                normal,\n                shadowLight,\n                modelScale,\n                modelMatrix,\n                viewMatrix,\n                projectionMatrix,\n                sceneProperties\n            );\n        }\n    ',
	attributes: {normal: 'c8', position: 'gs'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', sceneProperties: 'd', shadowLight: 'dn', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowDrawFunction = function (givenShadow) {
	if (!givenShadow.$) {
		return $elm$core$Maybe$Nothing;
	} else {
		var webGLMesh = givenShadow.c;
		return $elm$core$Maybe$Just(
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, shadowLight, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowSettings, isRightHanded, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowFragment,
						webGLMesh,
						{a: modelMatrix, b: modelScale, c: projectionMatrix, d: sceneProperties, dn: shadowLight, e: viewMatrix});
				}));
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow = function (givenShadow) {
	var _v0 = $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowDrawFunction(givenShadow);
	if (!_v0.$) {
		var drawFunction = _v0.a;
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode(drawFunction);
	} else {
		return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$block = F4(
	function (renderObject, renderShadow, givenMaterial, givenBlock) {
		var baseEntity = A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$mesh, givenMaterial, $ianmackenzie$elm_3d_scene$Scene3d$Primitives$block);
		var untransformedEntity = function () {
			var _v1 = _Utils_Tuple2(renderObject, renderShadow);
			if (_v1.a) {
				if (_v1.b) {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(
						_List_fromArray(
							[
								baseEntity,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$blockShadow)
							]));
				} else {
					return baseEntity;
				}
			} else {
				if (_v1.b) {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$blockShadow);
				} else {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
				}
			}
		}();
		var _v0 = $ianmackenzie$elm_geometry$Block3d$dimensions(givenBlock);
		var scaleX = _v0.a;
		var scaleY = _v0.b;
		var scaleZ = _v0.c;
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$placeIn,
			$ianmackenzie$elm_geometry$Block3d$axes(givenBlock),
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$preScale,
				_Utils_Tuple3(scaleX, scaleY, scaleZ),
				untransformedEntity));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow = F2(
	function (givenMaterial, givenBlock) {
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$block, true, true, givenMaterial, givenBlock);
	});
var $author$project$Main$intExtent = $elm$core$Basics$floor($author$project$Main$maxExtent);
var $ianmackenzie$elm_geometry$Geometry$Types$Block3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) > -1;
	});
var $ianmackenzie$elm_units$Quantity$midpoint = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return x + (0.5 * (y - x));
	});
var $ianmackenzie$elm_geometry$Direction3d$negativeX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{n: -1, o: 0, p: 0});
var $ianmackenzie$elm_geometry$Direction3d$negativeY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{n: 0, o: -1, p: 0});
var $ianmackenzie$elm_geometry$Direction3d$negativeZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{n: 0, o: 0, p: -1});
var $ianmackenzie$elm_geometry$Block3d$axisAligned = F6(
	function (x1, y1, z1, x2, y2, z2) {
		var computedZDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, z1, z2) ? $ianmackenzie$elm_geometry$Direction3d$positiveZ : $ianmackenzie$elm_geometry$Direction3d$negativeZ;
		var computedYDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, y1, y2) ? $ianmackenzie$elm_geometry$Direction3d$positiveY : $ianmackenzie$elm_geometry$Direction3d$negativeY;
		var computedXDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, x1, x2) ? $ianmackenzie$elm_geometry$Direction3d$positiveX : $ianmackenzie$elm_geometry$Direction3d$negativeX;
		var computedDimensions = _Utils_Tuple3(
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, x1, x2)),
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, y1, y2)),
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, z1, z2)));
		var computedCenterPoint = A3(
			$ianmackenzie$elm_geometry$Point3d$xyz,
			A2($ianmackenzie$elm_units$Quantity$midpoint, x1, x2),
			A2($ianmackenzie$elm_units$Quantity$midpoint, y1, y2),
			A2($ianmackenzie$elm_units$Quantity$midpoint, z1, z2));
		var computedAxes = $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{gl: computedCenterPoint, gX: computedXDirection, gY: computedYDirection, g_: computedZDirection});
		return {g4: computedAxes, hg: computedDimensions};
	});
var $ianmackenzie$elm_geometry$Block3d$with = function (_v0) {
	var z2 = _v0.dB;
	var y2 = _v0.dz;
	var x2 = _v0.dx;
	var z1 = _v0.dA;
	var y1 = _v0.dy;
	var x1 = _v0.dw;
	return A6($ianmackenzie$elm_geometry$Block3d$axisAligned, x1, y1, z1, x2, y2, z2);
};
var $author$project$Main$generateFloor = function (_v0) {
	var holeX = _v0.a;
	var holeY = _v0.b;
	return {
		dD: (_Utils_cmp(holeX, -$author$project$Main$intExtent) > 0) ? $elm$core$Maybe$Just(
			$ianmackenzie$elm_geometry$Block3d$with(
				{
					dw: $ianmackenzie$elm_units$Length$meters(holeX - 0.5),
					dx: $ianmackenzie$elm_units$Length$meters(-$author$project$Main$maxExtent),
					dy: $ianmackenzie$elm_units$Length$meters(holeY + 0.5),
					dz: $ianmackenzie$elm_units$Length$meters(holeY + (-0.5)),
					dA: $ianmackenzie$elm_units$Length$meters(0),
					dB: $ianmackenzie$elm_units$Length$meters(-0.3)
				})) : $elm$core$Maybe$Nothing,
		dW: (_Utils_cmp(holeX, $author$project$Main$intExtent) < 0) ? $elm$core$Maybe$Just(
			$ianmackenzie$elm_geometry$Block3d$with(
				{
					dw: $ianmackenzie$elm_units$Length$meters($author$project$Main$maxExtent),
					dx: $ianmackenzie$elm_units$Length$meters(holeX + 0.5),
					dy: $ianmackenzie$elm_units$Length$meters(holeY + 0.5),
					dz: $ianmackenzie$elm_units$Length$meters(holeY + (-0.5)),
					dA: $ianmackenzie$elm_units$Length$meters(0),
					dB: $ianmackenzie$elm_units$Length$meters(-0.3)
				})) : $elm$core$Maybe$Nothing,
		d1: (_Utils_cmp(holeY, $author$project$Main$intExtent) < 0) ? $elm$core$Maybe$Just(
			$ianmackenzie$elm_geometry$Block3d$with(
				{
					dw: $ianmackenzie$elm_units$Length$meters($author$project$Main$maxExtent),
					dx: $ianmackenzie$elm_units$Length$meters(-$author$project$Main$maxExtent),
					dy: $ianmackenzie$elm_units$Length$meters($author$project$Main$maxExtent),
					dz: $ianmackenzie$elm_units$Length$meters(holeY + 0.5),
					dA: $ianmackenzie$elm_units$Length$meters(0),
					dB: $ianmackenzie$elm_units$Length$meters(-0.3)
				})) : $elm$core$Maybe$Nothing,
		ex: (_Utils_cmp(holeY, -$author$project$Main$intExtent) > 0) ? $elm$core$Maybe$Just(
			$ianmackenzie$elm_geometry$Block3d$with(
				{
					dw: $ianmackenzie$elm_units$Length$meters($author$project$Main$maxExtent),
					dx: $ianmackenzie$elm_units$Length$meters(-$author$project$Main$maxExtent),
					dy: $ianmackenzie$elm_units$Length$meters(holeY - 0.5),
					dz: $ianmackenzie$elm_units$Length$meters(-$author$project$Main$maxExtent),
					dA: $ianmackenzie$elm_units$Length$meters(0),
					dB: $ianmackenzie$elm_units$Length$meters(-0.3)
				})) : $elm$core$Maybe$Nothing
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$group = function (entities) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(entities);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Constant = function (a) {
	return {$: 0, a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$LambertianMaterial = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$NoNormalMap = {$: 0};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$UseMeshUvs = 0;
var $ianmackenzie$elm_3d_scene$Scene3d$Types$LinearRgb = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma = function (u) {
	return A3(
		$elm$core$Basics$clamp,
		0,
		1,
		(u <= 0.04045) ? (u / 12.92) : A2($elm$core$Basics$pow, (u + 0.055) / 1.055, 2.4));
};
var $avh4$elm_color$Color$toRgba = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	return {bE: a, dK: b, dY: g, et: r};
};
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToLinearRgb = function (color) {
	var _v0 = $avh4$elm_color$Color$toRgba(color);
	var alpha = _v0.bE;
	var blue = _v0.dK;
	var green = _v0.dY;
	var red = _v0.et;
	return A4(
		$elm_explorations$linear_algebra$Math$Vector4$vec4,
		$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(red),
		$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(green),
		$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(blue),
		alpha);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Material$constant = function (givenValue) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Constant(givenValue);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Material$matte = function (materialColor) {
	return A4(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$LambertianMaterial,
		0,
		$ianmackenzie$elm_3d_scene$Scene3d$Types$Constant(
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToLinearRgb(materialColor)),
		$ianmackenzie$elm_3d_scene$Scene3d$Material$constant(1),
		$ianmackenzie$elm_3d_scene$Scene3d$Types$NoNormalMap);
};
var $elm$random$Random$Generator = $elm$core$Basics$identity;
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return function (seed0) {
			var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _v0.a;
			var hi = _v0.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
					$elm$random$Random$next(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = $elm$random$Random$peel(seed);
						var seedN = $elm$random$Random$next(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		};
	});
var $elm$random$Random$map2 = F3(
	function (func, _v0, _v1) {
		var genA = _v0;
		var genB = _v1;
		return function (seed0) {
			var _v2 = genA(seed0);
			var a = _v2.a;
			var seed1 = _v2.b;
			var _v3 = genB(seed1);
			var b = _v3.a;
			var seed2 = _v3.b;
			return _Utils_Tuple2(
				A2(func, a, b),
				seed2);
		};
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Main$nextHole = A3(
	$elm$random$Random$map2,
	$elm$core$Tuple$pair,
	A2($elm$random$Random$int, -$author$project$Main$intExtent, $author$project$Main$intExtent),
	A2($elm$random$Random$int, -$author$project$Main$intExtent, $author$project$Main$intExtent));
var $ianmackenzie$elm_3d_scene$Scene3d$placeIn = F2(
	function (frame, entity) {
		return A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$placeIn, frame, entity);
	});
var $author$project$Physics$static = function (shapesWithMaterials) {
	return A2(
		$author$project$Internal$Body$compound,
		1,
		A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var entries = _v0.a;
				var internalMat = _v0.b;
				return A2(
					$elm$core$List$map,
					function (_v1) {
						var shape = _v1.a;
						var sign = _v1.b;
						return _Utils_Tuple3(shape, internalMat, sign);
					},
					entries);
			},
			shapesWithMaterials));
};
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0;
		return generator(seed);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$translateBy = function (displacement) {
	var v = $ianmackenzie$elm_geometry$Vector3d$unwrap(displacement);
	return {fC: true, C: 1, D: 0, E: 0, F: 0, G: 1, H: 0, I: 0, J: 0, K: 1, U: v.n, V: v.o, W: v.p, dl: 1};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$translateBy = F2(
	function (displacement, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$translateBy(displacement),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$translateBy = F2(
	function (displacement, entity) {
		return A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$translateBy, displacement, entity);
	});
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$white = A4($avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
var $author$project$Main$nextFloor = F2(
	function (floorCount, seed) {
		var zOffset = A3($ianmackenzie$elm_geometry$Vector3d$meters, 0, 0, floorCount * $author$project$Main$floorSpacing);
		var _v0 = A2($elm$random$Random$step, $author$project$Main$nextHole, seed);
		var hole = _v0.a;
		var nextSeed = _v0.b;
		var floor = $author$project$Main$generateFloor(hole);
		var floorBlocks = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[floor.d1, floor.ex, floor.dW, floor.dD]));
		var _v1 = hole;
		var holeX = _v1.a;
		var holeY = _v1.b;
		return {
			dL: A2(
				$elm$core$List$map,
				function (block) {
					return _Utils_Tuple2(
						$author$project$Main$FloorPiece(floorCount),
						A2(
							$author$project$Physics$translateBy,
							zOffset,
							$author$project$Physics$static(
								_List_fromArray(
									[
										_Utils_Tuple2(
										$author$project$Physics$Shape$block(block),
										$author$project$Physics$Material$wood)
									]))));
				},
				floorBlocks),
			aG: A2(
				$ianmackenzie$elm_3d_scene$Scene3d$translateBy,
				zOffset,
				A2(
					$ianmackenzie$elm_3d_scene$Scene3d$placeIn,
					$ianmackenzie$elm_geometry$Frame3d$atOrigin,
					$ianmackenzie$elm_3d_scene$Scene3d$group(
						A2(
							$elm$core$List$map,
							$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow(
								$ianmackenzie$elm_3d_scene$Scene3d$Material$matte($avh4$elm_color$Color$white)),
							floorBlocks)))),
			q: floorCount + 1,
			aI: _Utils_Tuple2(holeX, holeY),
			Y: nextSeed
		};
	});
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$playSound = _Platform_outgoingPort(
	'playSound',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'sound',
					$elm$json$Json$Encode$string($.cr)),
					_Utils_Tuple2(
					'volume',
					$elm$json$Json$Encode$float($.eM))
				]));
	});
var $author$project$Main$initNewGame = F2(
	function (model, game) {
		var fl1 = A2($author$project$Main$nextFloor, 0, model.Y);
		var fl2 = A2($author$project$Main$nextFloor, fl1.q, fl1.Y);
		var fl3 = A2($author$project$Main$nextFloor, fl2.q, fl2.Y);
		var fl4 = A2($author$project$Main$nextFloor, fl3.q, fl3.Y);
		var fl5 = A2($author$project$Main$nextFloor, fl4.q, fl4.Y);
		var fl6 = A2($author$project$Main$nextFloor, fl5.q, fl5.Y);
		var fl7 = A2($author$project$Main$nextFloor, fl6.q, fl6.Y);
		var fl8 = A2($author$project$Main$nextFloor, fl7.q, fl7.Y);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					k: $author$project$Main$Loaded(
						{
							aZ: game.aZ,
							dL: _Utils_ap(
								$author$project$Main$initWalls,
								_Utils_ap(
									fl1.dL,
									_Utils_ap(
										fl2.dL,
										_Utils_ap(
											fl3.dL,
											_Utils_ap(
												fl4.dL,
												_Utils_ap(
													fl5.dL,
													_Utils_ap(
														fl6.dL,
														_Utils_ap(fl7.dL, fl8.dL)))))))),
							e$: $author$project$Physics$emptyContacts,
							S: function () {
								var _v0 = fl1.aI;
								var holeX = _v0.a;
								var holeY = _v0.b;
								return _Utils_Tuple2(
									$ianmackenzie$elm_geometry$Frame3d$atPoint(
										A3($ianmackenzie$elm_geometry$Point3d$meters, holeX, holeY, 0)),
									0);
							}(),
							q: fl8.q,
							bq: _List_fromArray(
								[fl1.aG, fl2.aG, fl3.aG, fl4.aG, fl5.aG, fl6.aG, fl7.aG, fl8.aG]),
							bb: $elm$core$Set$empty,
							aM: $author$project$Main$initPlayer,
							a0: _List_Nil,
							a1: $author$project$Main$initTimer,
							Z: $author$project$Main$Playing(0),
							ds: $author$project$Main$initTimestep,
							cz: A2(
								$elm$core$List$indexedMap,
								F2(
									function (index, _v1) {
										var holeX = _v1.a;
										var holeY = _v1.b;
										return $ianmackenzie$elm_geometry$Frame3d$atPoint(
											A3($ianmackenzie$elm_geometry$Point3d$meters, holeX, holeY, (index + 1) * $author$project$Main$floorSpacing));
									}),
								_List_fromArray(
									[fl2.aI, fl3.aI, fl4.aI, fl5.aI, fl6.aI, fl7.aI, fl8.aI]))
						})
				}),
			$author$project$Main$playSound(
				{cr: 'menu_select', eM: 0.15}));
	});
var $ianmackenzie$elm_units$Quantity$lessThanOrEqualToZero = function (_v0) {
	var x = _v0;
	return x <= 0;
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$remove, key, dict);
	});
var $w0rm$elm_timestep$Timestep$duration = function (_v0) {
	var s = _v0;
	return s.e4;
};
var $author$project$Main$extractPlayerHelper = F3(
	function (defaultPlayer, searched, toSearch) {
		extractPlayerHelper:
		while (true) {
			if (!toSearch.b) {
				return _Utils_Tuple2(defaultPlayer, searched);
			} else {
				var next = toSearch.a;
				var id = next.a;
				var body = next.b;
				var rest = toSearch.b;
				if (_Utils_eq(id, $author$project$Main$Ball)) {
					return _Utils_Tuple2(
						body,
						_Utils_ap(searched, rest));
				} else {
					var $temp$defaultPlayer = defaultPlayer,
						$temp$searched = A2($elm$core$List$cons, next, searched),
						$temp$toSearch = rest;
					defaultPlayer = $temp$defaultPlayer;
					searched = $temp$searched;
					toSearch = $temp$toSearch;
					continue extractPlayerHelper;
				}
			}
		}
	});
var $author$project$Main$extractPlayer = function (defaultPlayer) {
	return A2($author$project$Main$extractPlayerHelper, defaultPlayer, _List_Nil);
};
var $ianmackenzie$elm_units$Constants$meter = 1.0;
var $ianmackenzie$elm_units$Constants$second = 1;
var $ianmackenzie$elm_units$Constants$gee = (9.80665 * $ianmackenzie$elm_units$Constants$meter) / ($ianmackenzie$elm_units$Constants$second * $ianmackenzie$elm_units$Constants$second);
var $ianmackenzie$elm_units$Acceleration$metersPerSecondSquared = function (numMetersPerSecondSquared) {
	return numMetersPerSecondSquared;
};
var $ianmackenzie$elm_units$Acceleration$gees = function (numGees) {
	return $ianmackenzie$elm_units$Acceleration$metersPerSecondSquared($ianmackenzie$elm_units$Constants$gee * numGees);
};
var $ianmackenzie$elm_geometry$Vector3d$xyz = F3(
	function (_v0, _v1, _v2) {
		var x = _v0;
		var y = _v1;
		var z = _v2;
		return {n: x, o: y, p: z};
	});
var $ianmackenzie$elm_geometry$Vector3d$gees = F3(
	function (x, y, z) {
		return A3(
			$ianmackenzie$elm_geometry$Vector3d$xyz,
			$ianmackenzie$elm_units$Acceleration$gees(x),
			$ianmackenzie$elm_units$Acceleration$gees(y),
			$ianmackenzie$elm_units$Acceleration$gees(z));
	});
var $author$project$Physics$onEarth = {
	dQ: F2(
		function (_v0, _v1) {
			return true;
		}),
	dR: function (_v2) {
		return $elm$core$Maybe$Nothing;
	},
	e$: $author$project$Physics$emptyContacts,
	e4: $ianmackenzie$elm_units$Duration$seconds(1 / 60),
	fq: A3($ianmackenzie$elm_geometry$Vector3d$gees, 0, 0, -1),
	eD: 20
};
var $author$project$Internal$AssignIds$memberSorted = F3(
	function (dir, x, list) {
		memberSorted:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var y = list.a;
				var rest = list.b;
				if (!(y - x)) {
					return true;
				} else {
					if ((dir * (y - x)) > 0) {
						return false;
					} else {
						var $temp$dir = dir,
							$temp$x = x,
							$temp$list = rest;
						dir = $temp$dir;
						x = $temp$x;
						list = $temp$list;
						continue memberSorted;
					}
				}
			}
		}
	});
var $author$project$Internal$AssignIds$accumulateReversed = F2(
	function (acc, remaining) {
		accumulateReversed:
		while (true) {
			if (!remaining.b) {
				return acc;
			} else {
				var y = remaining.a;
				var rest = remaining.b;
				var $temp$acc = A2($elm$core$List$cons, y, acc),
					$temp$remaining = rest;
				acc = $temp$acc;
				remaining = $temp$remaining;
				continue accumulateReversed;
			}
		}
	});
var $author$project$Internal$AssignIds$removeFirstReversing = F3(
	function (x, acc, remaining) {
		removeFirstReversing:
		while (true) {
			if (!remaining.b) {
				return acc;
			} else {
				var y = remaining.a;
				var rest = remaining.b;
				if (_Utils_eq(y, x)) {
					return A2($author$project$Internal$AssignIds$accumulateReversed, acc, rest);
				} else {
					var $temp$x = x,
						$temp$acc = A2($elm$core$List$cons, y, acc),
						$temp$remaining = rest;
					x = $temp$x;
					acc = $temp$acc;
					remaining = $temp$remaining;
					continue removeFirstReversing;
				}
			}
		}
	});
var $author$project$Internal$AssignIds$stable = F3(
	function (bodies, mx, acc) {
		stable:
		while (true) {
			if (!bodies.b) {
				return _Utils_Tuple2(
					$elm$core$List$reverse(acc),
					mx);
			} else {
				var _v1 = bodies.a;
				var extId = _v1.a;
				var body = _v1.b;
				var rest = bodies.b;
				var $temp$bodies = rest,
					$temp$mx = mx,
					$temp$acc = A2(
					$elm$core$List$cons,
					_Utils_Tuple2(extId, body),
					acc);
				bodies = $temp$bodies;
				mx = $temp$mx;
				acc = $temp$acc;
				continue stable;
			}
		}
	});
var $author$project$Internal$AssignIds$withId = F2(
	function (freshId, body) {
		return {eP: body.eP, eQ: body.eQ, eR: body.eR, eX: body.eX, fa: body.fa, fp: body.fp, bt: freshId, fz: body.fz, fA: body.fA, fB: body.fB, fE: body.fE, fL: body.fL, fM: body.fM, f1: body.f1, gL: body.gL, gP: body.gP, gS: body.gS, gW: body.gW};
	});
var $author$project$Internal$AssignIds$assign = F6(
	function (bodies, freeIds, dupIds, dir, mx, acc) {
		assign:
		while (true) {
			if (!freeIds.b) {
				return A3($author$project$Internal$AssignIds$stable, bodies, mx, acc);
			} else {
				var freshId = freeIds.a;
				var remainingFree = freeIds.b;
				if (!bodies.b) {
					return _Utils_Tuple2(acc, mx);
				} else {
					var _v2 = bodies.a;
					var extId = _v2.a;
					var body = _v2.b;
					var rest = bodies.b;
					if (_Utils_eq(body.bt, -1)) {
						var $temp$bodies = rest,
							$temp$freeIds = remainingFree,
							$temp$dupIds = dupIds,
							$temp$dir = dir,
							$temp$mx = A2($elm$core$Basics$max, mx, freshId),
							$temp$acc = A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								extId,
								A2($author$project$Internal$AssignIds$withId, freshId, body)),
							acc);
						bodies = $temp$bodies;
						freeIds = $temp$freeIds;
						dupIds = $temp$dupIds;
						dir = $temp$dir;
						mx = $temp$mx;
						acc = $temp$acc;
						continue assign;
					} else {
						if (A3($author$project$Internal$AssignIds$memberSorted, dir, body.bt, dupIds)) {
							var _v3 = A3($author$project$Internal$AssignIds$removeFirstReversing, body.bt, _List_Nil, dupIds);
							if (!_v3.b) {
								var $temp$bodies = rest,
									$temp$freeIds = remainingFree,
									$temp$dupIds = _List_Nil,
									$temp$dir = dir,
									$temp$mx = A2($elm$core$Basics$max, mx, freshId),
									$temp$acc = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										extId,
										A2($author$project$Internal$AssignIds$withId, freshId, body)),
									acc);
								bodies = $temp$bodies;
								freeIds = $temp$freeIds;
								dupIds = $temp$dupIds;
								dir = $temp$dir;
								mx = $temp$mx;
								acc = $temp$acc;
								continue assign;
							} else {
								var newDupIds = _v3;
								var $temp$bodies = rest,
									$temp$freeIds = remainingFree,
									$temp$dupIds = newDupIds,
									$temp$dir = -dir,
									$temp$mx = A2($elm$core$Basics$max, mx, freshId),
									$temp$acc = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										extId,
										A2($author$project$Internal$AssignIds$withId, freshId, body)),
									acc);
								bodies = $temp$bodies;
								freeIds = $temp$freeIds;
								dupIds = $temp$dupIds;
								dir = $temp$dir;
								mx = $temp$mx;
								acc = $temp$acc;
								continue assign;
							}
						} else {
							var $temp$bodies = rest,
								$temp$freeIds = freeIds,
								$temp$dupIds = dupIds,
								$temp$dir = dir,
								$temp$mx = mx,
								$temp$acc = A2(
								$elm$core$List$cons,
								_Utils_Tuple2(extId, body),
								acc);
							bodies = $temp$bodies;
							freeIds = $temp$freeIds;
							dupIds = $temp$dupIds;
							dir = $temp$dir;
							mx = $temp$mx;
							acc = $temp$acc;
							continue assign;
						}
					}
				}
			}
		}
	});
var $author$project$Internal$AssignIds$collect = F4(
	function (bodies, existingIds, newCount, mx) {
		collect:
		while (true) {
			if (!bodies.b) {
				return _Utils_Tuple3(existingIds, newCount, mx);
			} else {
				var _v1 = bodies.a;
				var body = _v1.b;
				var rest = bodies.b;
				if (_Utils_eq(body.bt, -1)) {
					var $temp$bodies = rest,
						$temp$existingIds = existingIds,
						$temp$newCount = newCount + 1,
						$temp$mx = mx;
					bodies = $temp$bodies;
					existingIds = $temp$existingIds;
					newCount = $temp$newCount;
					mx = $temp$mx;
					continue collect;
				} else {
					var $temp$bodies = rest,
						$temp$existingIds = A2($elm$core$List$cons, body.bt, existingIds),
						$temp$newCount = newCount,
						$temp$mx = A2($elm$core$Basics$max, mx, body.bt);
					bodies = $temp$bodies;
					existingIds = $temp$existingIds;
					newCount = $temp$newCount;
					mx = $temp$mx;
					continue collect;
				}
			}
		}
	});
var $author$project$Internal$AssignIds$findDups = F4(
	function (sorted, prev, acc, count) {
		findDups:
		while (true) {
			if (!sorted.b) {
				return _Utils_Tuple2(acc, count);
			} else {
				var x = sorted.a;
				var rest = sorted.b;
				if (!(x - prev)) {
					var $temp$sorted = rest,
						$temp$prev = x,
						$temp$acc = A2($elm$core$List$cons, x, acc),
						$temp$count = count + 1;
					sorted = $temp$sorted;
					prev = $temp$prev;
					acc = $temp$acc;
					count = $temp$count;
					continue findDups;
				} else {
					var $temp$sorted = rest,
						$temp$prev = x,
						$temp$acc = acc,
						$temp$count = count;
					sorted = $temp$sorted;
					prev = $temp$prev;
					acc = $temp$acc;
					count = $temp$count;
					continue findDups;
				}
			}
		}
	});
var $author$project$Internal$AssignIds$fillFrom = F3(
	function (n, needed, revAcc) {
		fillFrom:
		while (true) {
			if (!needed) {
				return $elm$core$List$reverse(revAcc);
			} else {
				var $temp$n = n + 1,
					$temp$needed = needed - 1,
					$temp$revAcc = A2($elm$core$List$cons, n, revAcc);
				n = $temp$n;
				needed = $temp$needed;
				revAcc = $temp$revAcc;
				continue fillFrom;
			}
		}
	});
var $author$project$Internal$AssignIds$findFree = F4(
	function (n, sorted, needed, revAcc) {
		findFree:
		while (true) {
			if (!needed) {
				return $elm$core$List$reverse(revAcc);
			} else {
				if (!sorted.b) {
					return A3($author$project$Internal$AssignIds$fillFrom, n, needed, revAcc);
				} else {
					var x = sorted.a;
					var rest = sorted.b;
					if ((x - n) > 0) {
						var $temp$n = n + 1,
							$temp$sorted = sorted,
							$temp$needed = needed - 1,
							$temp$revAcc = A2($elm$core$List$cons, n, revAcc);
						n = $temp$n;
						sorted = $temp$sorted;
						needed = $temp$needed;
						revAcc = $temp$revAcc;
						continue findFree;
					} else {
						if (_Utils_eq(x, n)) {
							var $temp$n = n + 1,
								$temp$sorted = rest,
								$temp$needed = needed,
								$temp$revAcc = revAcc;
							n = $temp$n;
							sorted = $temp$sorted;
							needed = $temp$needed;
							revAcc = $temp$revAcc;
							continue findFree;
						} else {
							var $temp$n = n,
								$temp$sorted = rest,
								$temp$needed = needed,
								$temp$revAcc = revAcc;
							n = $temp$n;
							sorted = $temp$sorted;
							needed = $temp$needed;
							revAcc = $temp$revAcc;
							continue findFree;
						}
					}
				}
			}
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $author$project$Internal$AssignIds$assignIds = function (bodiesWithIds) {
	var _v0 = A4($author$project$Internal$AssignIds$collect, bodiesWithIds, _List_Nil, 0, -1);
	var existingIds = _v0.a;
	var newCount = _v0.b;
	var mx = _v0.c;
	var sorted = $elm$core$List$sort(existingIds);
	var _v1 = A4($author$project$Internal$AssignIds$findDups, sorted, -2, _List_Nil, 0);
	var dupIds = _v1.a;
	var dupCount = _v1.b;
	var freeIds = A4($author$project$Internal$AssignIds$findFree, 0, sorted, newCount + dupCount, _List_Nil);
	if (!freeIds.b) {
		return A3($author$project$Internal$AssignIds$stable, bodiesWithIds, mx, _List_Nil);
	} else {
		return A6($author$project$Internal$AssignIds$assign, bodiesWithIds, freeIds, dupIds, -1, mx, _List_Nil);
	}
};
var $author$project$Internal$Transform3d$originPoint = function (_v0) {
	var localOrigin = _v0.a;
	return localOrigin;
};
var $author$project$Internal$BroadPhase$bodiesMayContact = F5(
	function (collide, id1, body1, id2, body2) {
		var p2 = $author$project$Internal$Transform3d$originPoint(body2.gP);
		var p1 = $author$project$Internal$Transform3d$originPoint(body1.gP);
		var dz = p2.p - p1.p;
		var dy = p2.o - p1.o;
		var dx = p2.n - p1.n;
		var distanceSquared = ((dx * dx) + (dy * dy)) + (dz * dz);
		var boundingRadiuses = body1.fp.ca + body2.fp.ca;
		return (((boundingRadiuses * boundingRadiuses) - distanceSquared) > 0) && (((body1.fE === 2) || (body2.fE === 2)) && A2(collide, id1, id2));
	});
var $author$project$Internal$Constraint$Distance = function (a) {
	return {$: 3, a: a};
};
var $author$project$Internal$Constraint$Hinge = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $author$project$Internal$Constraint$Lock = F8(
	function (a, b, c, d, e, f, g, h) {
		return {$: 2, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h};
	});
var $author$project$Internal$Constraint$PointToPoint = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Internal$Transform3d$directionRelativeTo = F2(
	function (_v0, worldVector) {
		var localOrientation = _v0.b;
		return A2($author$project$Internal$Transform3d$derotate, localOrientation, worldVector);
	});
var $author$project$Internal$Constraint$relativeToCenterOfMass = F3(
	function (centerOfMassFrame3d1, centerOfMassFrame3d2, constraint) {
		switch (constraint.$) {
			case 0:
				var pivot1 = constraint.a;
				var pivot2 = constraint.b;
				return A2(
					$author$project$Internal$Constraint$PointToPoint,
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d1, pivot1),
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d2, pivot2));
			case 1:
				var pivot1 = constraint.a;
				var axis1 = constraint.b;
				var pivot2 = constraint.c;
				var axis2 = constraint.d;
				return A4(
					$author$project$Internal$Constraint$Hinge,
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d1, pivot1),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d1, axis1),
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d2, pivot2),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d2, axis2));
			case 2:
				var pivot1 = constraint.a;
				var x1 = constraint.b;
				var y1 = constraint.c;
				var z1 = constraint.d;
				var pivot2 = constraint.e;
				var x2 = constraint.f;
				var y2 = constraint.g;
				var z2 = constraint.h;
				return A8(
					$author$project$Internal$Constraint$Lock,
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d1, pivot1),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d1, x1),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d1, y1),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d1, z1),
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d2, pivot2),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d2, x2),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d2, y2),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d2, z2));
			default:
				var length = constraint.a;
				return $author$project$Internal$Constraint$Distance(length);
		}
	});
var $author$project$Internal$Constraint$relativeToCenterOfMassFlipped = F3(
	function (centerOfMassFrame3d1, centerOfMassFrame3d2, constraint) {
		switch (constraint.$) {
			case 0:
				var pivot1 = constraint.a;
				var pivot2 = constraint.b;
				return A2(
					$author$project$Internal$Constraint$PointToPoint,
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d1, pivot2),
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d2, pivot1));
			case 1:
				var pivot1 = constraint.a;
				var axis1 = constraint.b;
				var pivot2 = constraint.c;
				var axis2 = constraint.d;
				return A4(
					$author$project$Internal$Constraint$Hinge,
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d1, pivot2),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d1, axis2),
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d2, pivot1),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d2, axis1));
			case 2:
				var pivot1 = constraint.a;
				var x1 = constraint.b;
				var y1 = constraint.c;
				var z1 = constraint.d;
				var pivot2 = constraint.e;
				var x2 = constraint.f;
				var y2 = constraint.g;
				var z2 = constraint.h;
				return A8(
					$author$project$Internal$Constraint$Lock,
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d1, pivot2),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d1, x2),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d1, y2),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d1, z2),
					A2($author$project$Internal$Transform3d$pointRelativeTo, centerOfMassFrame3d2, pivot1),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d2, x1),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d2, y1),
					A2($author$project$Internal$Transform3d$directionRelativeTo, centerOfMassFrame3d2, z1));
			default:
				var length = constraint.a;
				return $author$project$Internal$Constraint$Distance(length);
		}
	});
var $author$project$Internal$BroadPhase$constraintsBetween = F6(
	function (constrain, constrainFn1, id1, body1, id2, body2) {
		if ((body1.fE !== 2) && (body2.fE !== 2)) {
			return _List_Nil;
		} else {
			var forward = function () {
				if (!constrainFn1.$) {
					var fn = constrainFn1.a;
					return fn(id2);
				} else {
					return _List_Nil;
				}
			}();
			if (forward.b) {
				return A2(
					$elm$core$List$map,
					A2($author$project$Internal$Constraint$relativeToCenterOfMass, body1.eX, body2.eX),
					forward);
			} else {
				var _v1 = constrain(id2);
				if (!_v1.$) {
					var fn = _v1.a;
					return A2(
						$elm$core$List$map,
						A2($author$project$Internal$Constraint$relativeToCenterOfMassFlipped, body1.eX, body2.eX),
						fn(id1));
				} else {
					return _List_Nil;
				}
			}
		}
	});
var $author$project$Internal$Const$parallelTolerance = 1.0e-6;
var $author$project$Internal$Vector3$scale = F2(
	function (s, v3) {
		return {n: s * v3.n, o: s * v3.o, p: s * v3.p};
	});
var $author$project$Collision$CapsuleCapsule$closestSegmentPoints = F2(
	function (capsule1, capsule2) {
		var p2 = capsule2.gs;
		var p1 = capsule1.gs;
		var r = A2($author$project$Internal$Vector3$sub, p1, p2);
		var h2 = capsule2.fs;
		var h1 = capsule1.fs;
		var d2 = capsule2.eS;
		var f = A2($author$project$Internal$Vector3$dot, d2, r);
		var d1 = capsule1.eS;
		var c = A2($author$project$Internal$Vector3$dot, d1, r);
		var b = A2($author$project$Internal$Vector3$dot, d1, d2);
		var denom = 1 - (b * b);
		if ((denom - $author$project$Internal$Const$parallelTolerance) < 0) {
			var t = A2(
				$elm$core$Basics$max,
				-h2,
				A2($elm$core$Basics$min, h2, f));
			var s = A2(
				$elm$core$Basics$max,
				-h1,
				A2($elm$core$Basics$min, h1, (b * t) - c));
			return _Utils_Tuple2(
				A2(
					$author$project$Internal$Vector3$add,
					p1,
					A2($author$project$Internal$Vector3$scale, s, d1)),
				A2(
					$author$project$Internal$Vector3$add,
					p2,
					A2($author$project$Internal$Vector3$scale, t, d2)));
		} else {
			var s0 = A2(
				$elm$core$Basics$max,
				-h1,
				A2($elm$core$Basics$min, h1, ((b * f) - c) / denom));
			var t0 = A2(
				$elm$core$Basics$max,
				-h2,
				A2($elm$core$Basics$min, h2, (b * s0) + f));
			var s = A2(
				$elm$core$Basics$max,
				-h1,
				A2($elm$core$Basics$min, h1, (b * t0) - c));
			return _Utils_Tuple2(
				A2(
					$author$project$Internal$Vector3$add,
					p1,
					A2($author$project$Internal$Vector3$scale, s, d1)),
				A2(
					$author$project$Internal$Vector3$add,
					p2,
					A2($author$project$Internal$Vector3$scale, t0, d2)));
		}
	});
var $author$project$Internal$Vector3$direction = F2(
	function (a, b) {
		var c = A2($author$project$Internal$Vector3$sub, a, b);
		var len = $author$project$Internal$Vector3$length(c);
		return {n: c.n / len, o: c.o / len, p: c.p / len};
	});
var $author$project$Internal$Vector3$distance = F2(
	function (a, b) {
		var z = b.p - a.p;
		var y = b.o - a.o;
		var x = b.n - a.n;
		return $elm$core$Basics$sqrt(((x * x) + (y * y)) + (z * z));
	});
var $author$project$Internal$ContactId$tagSimple = 0;
var $author$project$Internal$ContactId$simple = $author$project$Internal$ContactId$tagSimple;
var $author$project$Collision$CapsuleCapsule$addContacts = F4(
	function (shapeKey, capsule1, capsule2, contacts) {
		var _v0 = A2($author$project$Collision$CapsuleCapsule$closestSegmentPoints, capsule1, capsule2);
		var pt1 = _v0.a;
		var pt2 = _v0.b;
		var distance = (A2($author$project$Internal$Vector3$distance, pt2, pt1) - capsule1.dj) - capsule2.dj;
		var normal = A2($author$project$Internal$Vector3$direction, pt2, pt1);
		return (distance > 0) ? contacts : A2(
			$elm$core$List$cons,
			{
				ht: $author$project$Internal$ContactId$simple,
				hV: normal,
				h$: A2(
					$author$project$Internal$Vector3$add,
					pt1,
					A2($author$project$Internal$Vector3$scale, capsule1.dj, normal)),
				h0: A2(
					$author$project$Internal$Vector3$sub,
					pt2,
					A2($author$project$Internal$Vector3$scale, capsule2.dj, normal)),
				h6: shapeKey
			},
			contacts);
	});
var $author$project$Internal$ContactId$featRange = 2048;
var $author$project$Internal$ContactId$feature = F5(
	function (tag, a, b, c, d) {
		return (((((((tag * $author$project$Internal$ContactId$featRange) + a) * $author$project$Internal$ContactId$featRange) + b) * $author$project$Internal$ContactId$featRange) + c) * $author$project$Internal$ContactId$featRange) + d;
	});
var $author$project$Internal$ContactId$siteCapCyl1 = 3;
var $author$project$Internal$ContactId$tagCapsuleConvex = 6;
var $author$project$Internal$ContactId$capsuleCylinder1 = function (convexFeature) {
	return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagCapsuleConvex, $author$project$Internal$ContactId$siteCapCyl1, convexFeature, 0, 0);
};
var $author$project$Internal$ContactId$siteCapCyl2 = 4;
var $author$project$Internal$ContactId$capsuleCylinder2 = function (convexFeature) {
	return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagCapsuleConvex, $author$project$Internal$ContactId$siteCapCyl2, convexFeature, 0, 0);
};
var $author$project$Collision$CapsuleConvex$ClipAlive = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Internal$VertexBuffer$get = F2(
	function (index, buffer) {
		get:
		while (true) {
			if (buffer.$ === 1) {
				return $author$project$Internal$Vector3$zero;
			} else {
				var key = buffer.a;
				var value = buffer.b;
				var left = buffer.c;
				var right = buffer.d;
				var d = index - key;
				if (d < 0) {
					var $temp$index = index,
						$temp$buffer = left;
					index = $temp$index;
					buffer = $temp$buffer;
					continue get;
				} else {
					if (d > 0) {
						var $temp$index = index,
							$temp$buffer = right;
						index = $temp$index;
						buffer = $temp$buffer;
						continue get;
					} else {
						return value;
					}
				}
			}
		}
	});
var $author$project$Shapes$Convex$materialize = F2(
	function (buffer, indices) {
		if (indices.b) {
			var i = indices.a;
			var rest = indices.b;
			return A2(
				$elm$core$List$cons,
				A2($author$project$Internal$VertexBuffer$get, i, buffer),
				A2($author$project$Shapes$Convex$materialize, buffer, rest));
		} else {
			return _List_Nil;
		}
	});
var $author$project$Shapes$Convex$faceVertices = F2(
	function (buffer, face) {
		return A2($author$project$Shapes$Convex$materialize, buffer, face.bB);
	});
var $author$project$Collision$CapsuleConvex$ClipDead = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Collision$CapsuleConvex$clipDead = A2($author$project$Collision$CapsuleConvex$ClipDead, 0, 0);
var $author$project$Internal$Vector3$cross = F2(
	function (a, b) {
		return {n: (a.o * b.p) - (a.p * b.o), o: (a.p * b.n) - (a.n * b.p), p: (a.n * b.o) - (a.o * b.n)};
	});
var $author$project$Internal$Vector3$lerp = F3(
	function (t, v1, v2) {
		return {n: v1.n + (t * (v2.n - v1.n)), o: v1.o + (t * (v2.o - v1.o)), p: v1.p + (t * (v2.p - v1.p))};
	});
var $author$project$Internal$Vector3$normalize = function (v3) {
	var len = $author$project$Internal$Vector3$length(v3);
	return {n: v3.n / len, o: v3.o / len, p: v3.p / len};
};
var $author$project$Collision$CapsuleConvex$walkClipEdge = F5(
	function (faceNormal, firstVertex, vertices, p1, p2) {
		walkClipEdge:
		while (true) {
			if (vertices.b) {
				var v1 = vertices.a;
				var rest1 = vertices.b;
				var v2 = function () {
					if (!rest1.b) {
						return firstVertex;
					} else {
						var next = rest1.a;
						return next;
					}
				}();
				var edge = $author$project$Internal$Vector3$normalize(
					A2($author$project$Internal$Vector3$sub, v1, v2));
				var planeNormal = A2($author$project$Internal$Vector3$cross, faceNormal, edge);
				var planeConstant = -A2($author$project$Internal$Vector3$dot, v1, planeNormal);
				var d2 = A2($author$project$Internal$Vector3$dot, planeNormal, p2) + planeConstant;
				var d1 = A2($author$project$Internal$Vector3$dot, planeNormal, p1) + planeConstant;
				if ((d1 < 0) && (d2 < 0)) {
					var $temp$faceNormal = faceNormal,
						$temp$firstVertex = firstVertex,
						$temp$vertices = rest1,
						$temp$p1 = p1,
						$temp$p2 = p2;
					faceNormal = $temp$faceNormal;
					firstVertex = $temp$firstVertex;
					vertices = $temp$vertices;
					p1 = $temp$p1;
					p2 = $temp$p2;
					continue walkClipEdge;
				} else {
					if ((d1 >= 0) && (d2 >= 0)) {
						return $author$project$Collision$CapsuleConvex$clipDead;
					} else {
						if (d1 < 0) {
							var $temp$faceNormal = faceNormal,
								$temp$firstVertex = firstVertex,
								$temp$vertices = rest1,
								$temp$p1 = p1,
								$temp$p2 = A3($author$project$Internal$Vector3$lerp, d1 / (d1 - d2), p1, p2);
							faceNormal = $temp$faceNormal;
							firstVertex = $temp$firstVertex;
							vertices = $temp$vertices;
							p1 = $temp$p1;
							p2 = $temp$p2;
							continue walkClipEdge;
						} else {
							var $temp$faceNormal = faceNormal,
								$temp$firstVertex = firstVertex,
								$temp$vertices = rest1,
								$temp$p1 = A3($author$project$Internal$Vector3$lerp, d1 / (d1 - d2), p1, p2),
								$temp$p2 = p2;
							faceNormal = $temp$faceNormal;
							firstVertex = $temp$firstVertex;
							vertices = $temp$vertices;
							p1 = $temp$p1;
							p2 = $temp$p2;
							continue walkClipEdge;
						}
					}
				}
			} else {
				return A2($author$project$Collision$CapsuleConvex$ClipAlive, p1, p2);
			}
		}
	});
var $author$project$Collision$CapsuleConvex$clipSegmentAgainstFace = F4(
	function (buffer, face, ep1, ep2) {
		var vertices = A2($author$project$Shapes$Convex$faceVertices, buffer, face);
		if (vertices.b && vertices.b.b) {
			var first = vertices.a;
			var _v1 = vertices.b;
			return A5($author$project$Collision$CapsuleConvex$walkClipEdge, face.c8, first, vertices, ep1, ep2);
		} else {
			return A2($author$project$Collision$CapsuleConvex$ClipAlive, ep1, ep2);
		}
	});
var $author$project$Internal$Vector3$negate = function (v3) {
	return {n: -v3.n, o: -v3.o, p: -v3.p};
};
var $author$project$Collision$CapsuleConvex$addDirectContact = F8(
	function (shapeKey, featureKey, orderContact, segmentPoint, separatingAxis, penetration, capsule, contacts) {
		var normal = $author$project$Internal$Vector3$negate(separatingAxis);
		var pi = {n: segmentPoint.n + (capsule.dj * normal.n), o: segmentPoint.o + (capsule.dj * normal.o), p: segmentPoint.p + (capsule.dj * normal.p)};
		var pj = {n: pi.n - (penetration * normal.n), o: pi.o - (penetration * normal.o), p: pi.p - (penetration * normal.p)};
		return A2(
			$elm$core$List$cons,
			orderContact(
				{ht: featureKey, hV: normal, h$: pi, h0: pj, h6: shapeKey}),
			contacts);
	});
var $author$project$Internal$Const$precision = 1.0e-6;
var $author$project$Collision$CapsuleConvex$tryAddBodyPoint = function (shapeKey) {
	return function (featureKey) {
		return function (orderContact) {
			return function (face) {
				return function (facePlaneConstant) {
					return function (separatingAxis) {
						return function (capsule) {
							return function (capPoint) {
								return function (point) {
									return function (contacts) {
										if (_Utils_cmp(
											A2($author$project$Internal$Vector3$distance, point, capPoint),
											$author$project$Internal$Const$precision) < 0) {
											return contacts;
										} else {
											var signedDist = A2($author$project$Internal$Vector3$dot, face.c8, point) + facePlaneConstant;
											var bodyPen = capsule.dj - signedDist;
											return (bodyPen <= 0) ? contacts : A8($author$project$Collision$CapsuleConvex$addDirectContact, shapeKey, featureKey, orderContact, point, separatingAxis, bodyPen, capsule, contacts);
										}
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Collision$CapsuleConvex$addBodyContacts = function (shapeKey) {
	return function (convexFeature) {
		return function (orderContact) {
			return function (buffer) {
				return function (faceContext) {
					return function (capsule) {
						return function (ep1) {
							return function (ep2) {
								return function (separatingAxis) {
									return function (capPoint) {
										return function (contacts) {
											if (faceContext.$ === 1) {
												return contacts;
											} else {
												var _v1 = faceContext.a;
												var face = _v1.b;
												var _v2 = A4($author$project$Collision$CapsuleConvex$clipSegmentAgainstFace, buffer, face, ep1, ep2);
												if (_v2.$ === 1) {
													return contacts;
												} else {
													var q1 = _v2.a;
													var q2 = _v2.b;
													var facePlaneConstant = function () {
														var _v3 = A2($author$project$Shapes$Convex$faceVertices, buffer, face);
														if (_v3.b) {
															var v = _v3.a;
															return -A2($author$project$Internal$Vector3$dot, face.c8, v);
														} else {
															return 0;
														}
													}();
													return $author$project$Collision$CapsuleConvex$tryAddBodyPoint(shapeKey)(
														$author$project$Internal$ContactId$capsuleCylinder2(convexFeature))(orderContact)(face)(facePlaneConstant)(separatingAxis)(capsule)(capPoint)(q2)(
														$author$project$Collision$CapsuleConvex$tryAddBodyPoint(shapeKey)(
															$author$project$Internal$ContactId$capsuleCylinder1(convexFeature))(orderContact)(face)(facePlaneConstant)(separatingAxis)(capsule)(capPoint)(q1)(contacts));
												}
											}
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Internal$Vector3$closestPointsBetweenSegments = F4(
	function (p1, q1, p2, q2) {
		var r = A2($author$project$Internal$Vector3$sub, p1, p2);
		var d2 = A2($author$project$Internal$Vector3$sub, q2, p2);
		var e = A2($author$project$Internal$Vector3$dot, d2, d2);
		var f = A2($author$project$Internal$Vector3$dot, d2, r);
		var d1 = A2($author$project$Internal$Vector3$sub, q1, p1);
		var a = A2($author$project$Internal$Vector3$dot, d1, d1);
		var _v0 = function () {
			if (((a - $author$project$Internal$Const$precision) <= 0) && ((e - $author$project$Internal$Const$precision) <= 0)) {
				return _Utils_Tuple2(0, 0);
			} else {
				if ((a - $author$project$Internal$Const$precision) <= 0) {
					return _Utils_Tuple2(
						0,
						A3($elm$core$Basics$clamp, 0, 1, f / e));
				} else {
					var c = A2($author$project$Internal$Vector3$dot, d1, r);
					if ((e - $author$project$Internal$Const$precision) <= 0) {
						return _Utils_Tuple2(
							A3($elm$core$Basics$clamp, 0, 1, (-c) / a),
							0);
					} else {
						var b = A2($author$project$Internal$Vector3$dot, d1, d2);
						var denom = (a * e) - (b * b);
						var sInit = (denom !== 0.0) ? A3($elm$core$Basics$clamp, 0, 1, ((b * f) - (c * e)) / denom) : 0.0;
						var tNom = (b * sInit) + f;
						return (tNom < 0.0) ? _Utils_Tuple2(
							A3($elm$core$Basics$clamp, 0, 1, (-c) / a),
							0) : (((tNom - e) > 0) ? _Utils_Tuple2(
							A3($elm$core$Basics$clamp, 0, 1, (b - c) / a),
							1) : _Utils_Tuple2(sInit, tNom / e));
					}
				}
			}
		}();
		var s = _v0.a;
		var t = _v0.b;
		return _Utils_Tuple2(
			A2(
				$author$project$Internal$Vector3$add,
				p1,
				A2($author$project$Internal$Vector3$scale, s, d1)),
			A2(
				$author$project$Internal$Vector3$add,
				p2,
				A2($author$project$Internal$Vector3$scale, t, d2)));
	});
var $author$project$Collision$CapsuleConvex$walkClosestEdge = F7(
	function (ep1, ep2, firstVertex, vertices, bestPCap, bestPEdge, bestDistSq) {
		walkClosestEdge:
		while (true) {
			if (vertices.b) {
				var v1 = vertices.a;
				var rest1 = vertices.b;
				var v2 = function () {
					if (!rest1.b) {
						return firstVertex;
					} else {
						var next = rest1.a;
						return next;
					}
				}();
				var _v1 = A4($author$project$Internal$Vector3$closestPointsBetweenSegments, ep1, ep2, v1, v2);
				var pCap = _v1.a;
				var pEdge = _v1.b;
				var dx = pCap.n - pEdge.n;
				var dy = pCap.o - pEdge.o;
				var dz = pCap.p - pEdge.p;
				var distSq = ((dx * dx) + (dy * dy)) + (dz * dz);
				if ((distSq - bestDistSq) < 0) {
					var $temp$ep1 = ep1,
						$temp$ep2 = ep2,
						$temp$firstVertex = firstVertex,
						$temp$vertices = rest1,
						$temp$bestPCap = pCap,
						$temp$bestPEdge = pEdge,
						$temp$bestDistSq = distSq;
					ep1 = $temp$ep1;
					ep2 = $temp$ep2;
					firstVertex = $temp$firstVertex;
					vertices = $temp$vertices;
					bestPCap = $temp$bestPCap;
					bestPEdge = $temp$bestPEdge;
					bestDistSq = $temp$bestDistSq;
					continue walkClosestEdge;
				} else {
					var $temp$ep1 = ep1,
						$temp$ep2 = ep2,
						$temp$firstVertex = firstVertex,
						$temp$vertices = rest1,
						$temp$bestPCap = bestPCap,
						$temp$bestPEdge = bestPEdge,
						$temp$bestDistSq = bestDistSq;
					ep1 = $temp$ep1;
					ep2 = $temp$ep2;
					firstVertex = $temp$firstVertex;
					vertices = $temp$vertices;
					bestPCap = $temp$bestPCap;
					bestPEdge = $temp$bestPEdge;
					bestDistSq = $temp$bestDistSq;
					continue walkClosestEdge;
				}
			} else {
				return {cM: bestDistSq, bZ: bestPCap, co: bestPEdge};
			}
		}
	});
var $author$project$Collision$CapsuleConvex$closestEdgeToSegment = F5(
	function (buffer, face, ep1, ep2, maxDistSq) {
		var vertices = A2($author$project$Shapes$Convex$faceVertices, buffer, face);
		if (vertices.b && vertices.b.b) {
			var first = vertices.a;
			var _v1 = vertices.b;
			return A7($author$project$Collision$CapsuleConvex$walkClosestEdge, ep1, ep2, first, vertices, $author$project$Internal$Vector3$zero, $author$project$Internal$Vector3$zero, maxDistSq);
		} else {
			return {cM: maxDistSq, bZ: $author$project$Internal$Vector3$zero, co: $author$project$Internal$Vector3$zero};
		}
	});
var $author$project$Collision$CapsuleConvex$addClosestEdgeContact = F9(
	function (shapeKey, featureKey, orderContact, buffer, face, ep1, ep2, capsule, contacts) {
		var radiusSq = capsule.dj * capsule.dj;
		var result = A5($author$project$Collision$CapsuleConvex$closestEdgeToSegment, buffer, face, ep1, ep2, radiusSq);
		if ((result.cM - radiusSq) >= 0) {
			return contacts;
		} else {
			var distance = $elm$core$Basics$sqrt(result.cM);
			if ((distance - $author$project$Internal$Const$precision) <= 0) {
				return contacts;
			} else {
				var inv = 1 / distance;
				var edgeSeparatingAxis = {n: (result.bZ.n - result.co.n) * inv, o: (result.bZ.o - result.co.o) * inv, p: (result.bZ.p - result.co.p) * inv};
				return A8($author$project$Collision$CapsuleConvex$addDirectContact, shapeKey, featureKey, orderContact, result.bZ, edgeSeparatingAxis, capsule.dj - distance, capsule, contacts);
			}
		}
	});
var $author$project$Internal$ContactId$siteCapCyl = 5;
var $author$project$Internal$ContactId$capsuleCylinder = function (convexFeature) {
	return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagCapsuleConvex, $author$project$Internal$ContactId$siteCapCyl, convexFeature, 0, 0);
};
var $author$project$Collision$CapsuleConvex$addParallelEdgeContacts = function (shapeKey) {
	return function (convexFeature) {
		return function (orderContact) {
			return function (ep1) {
				return function (ep2) {
					return function (v1) {
						return function (v2) {
							return function (separatingAxis) {
								return function (penetration) {
									return function (capsule) {
										return function (contacts) {
											var sV2 = A2($author$project$Internal$Vector3$dot, v2, capsule.eS);
											var sV1 = A2($author$project$Internal$Vector3$dot, v1, capsule.eS);
											var sEp2 = A2($author$project$Internal$Vector3$dot, ep2, capsule.eS);
											var sEp1 = A2($author$project$Internal$Vector3$dot, ep1, capsule.eS);
											var sHi = A2(
												$elm$core$Basics$min,
												A2($elm$core$Basics$max, sEp1, sEp2),
												A2($elm$core$Basics$max, sV1, sV2));
											var sLo = A2(
												$elm$core$Basics$max,
												A2($elm$core$Basics$min, sEp1, sEp2),
												A2($elm$core$Basics$min, sV1, sV2));
											var pointAt = function (s) {
												return {n: ep1.n + ((s - sEp1) * capsule.eS.n), o: ep1.o + ((s - sEp1) * capsule.eS.o), p: ep1.p + ((s - sEp1) * capsule.eS.p)};
											};
											if (((sHi - sLo) - $author$project$Internal$Const$precision) > 0) {
												return A8(
													$author$project$Collision$CapsuleConvex$addDirectContact,
													shapeKey,
													$author$project$Internal$ContactId$capsuleCylinder2(convexFeature),
													orderContact,
													pointAt(sHi),
													separatingAxis,
													penetration,
													capsule,
													A8(
														$author$project$Collision$CapsuleConvex$addDirectContact,
														shapeKey,
														$author$project$Internal$ContactId$capsuleCylinder1(convexFeature),
														orderContact,
														pointAt(sLo),
														separatingAxis,
														penetration,
														capsule,
														contacts));
											} else {
												var _v0 = A4($author$project$Internal$Vector3$closestPointsBetweenSegments, ep1, ep2, v1, v2);
												var pCapsule = _v0.a;
												return A8(
													$author$project$Collision$CapsuleConvex$addDirectContact,
													shapeKey,
													$author$project$Internal$ContactId$capsuleCylinder(convexFeature),
													orderContact,
													pCapsule,
													separatingAxis,
													penetration,
													capsule,
													contacts);
											}
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Internal$Vector3$almostZero = function (_v0) {
	var z = _v0.p;
	var y = _v0.o;
	var x = _v0.n;
	return (($elm$core$Basics$abs(x) - $author$project$Internal$Const$precision) <= 0) && ((($elm$core$Basics$abs(y) - $author$project$Internal$Const$precision) <= 0) && (($elm$core$Basics$abs(z) - $author$project$Internal$Const$precision) <= 0));
};
var $author$project$Collision$ConvexConvex$bestFaceWalk = F6(
	function (separatingAxis, groups, faceId, currentBestFaceId, currentBestFace, currentBestDistance) {
		bestFaceWalk:
		while (true) {
			if (!groups.b) {
				return _Utils_Tuple2(currentBestFaceId, currentBestFace);
			} else {
				if (groups.a.$ === 1) {
					var _v1 = groups.a;
					var n1 = _v1.a;
					var i1 = _v1.b;
					var n2 = _v1.d;
					var i2 = _v1.e;
					var restGroups = groups.b;
					var primaryDot = A2($author$project$Internal$Vector3$dot, n1, separatingAxis);
					var partnerDot = -primaryDot;
					var _v2 = ((currentBestDistance - primaryDot) > 0) ? _Utils_Tuple3(
						faceId,
						{c8: n1, bB: i1},
						primaryDot) : _Utils_Tuple3(currentBestFaceId, currentBestFace, currentBestDistance);
					var id1 = _v2.a;
					var f1 = _v2.b;
					var d1 = _v2.c;
					if ((d1 - partnerDot) > 0) {
						var $temp$separatingAxis = separatingAxis,
							$temp$groups = restGroups,
							$temp$faceId = faceId + 2,
							$temp$currentBestFaceId = faceId + 1,
							$temp$currentBestFace = {c8: n2, bB: i2},
							$temp$currentBestDistance = partnerDot;
						separatingAxis = $temp$separatingAxis;
						groups = $temp$groups;
						faceId = $temp$faceId;
						currentBestFaceId = $temp$currentBestFaceId;
						currentBestFace = $temp$currentBestFace;
						currentBestDistance = $temp$currentBestDistance;
						continue bestFaceWalk;
					} else {
						var $temp$separatingAxis = separatingAxis,
							$temp$groups = restGroups,
							$temp$faceId = faceId + 2,
							$temp$currentBestFaceId = id1,
							$temp$currentBestFace = f1,
							$temp$currentBestDistance = d1;
						separatingAxis = $temp$separatingAxis;
						groups = $temp$groups;
						faceId = $temp$faceId;
						currentBestFaceId = $temp$currentBestFaceId;
						currentBestFace = $temp$currentBestFace;
						currentBestDistance = $temp$currentBestDistance;
						continue bestFaceWalk;
					}
				} else {
					var _v3 = groups.a;
					var n1 = _v3.a;
					var i1 = _v3.b;
					var restGroups = groups.b;
					var d = A2($author$project$Internal$Vector3$dot, n1, separatingAxis);
					if ((currentBestDistance - d) > 0) {
						var $temp$separatingAxis = separatingAxis,
							$temp$groups = restGroups,
							$temp$faceId = faceId + 1,
							$temp$currentBestFaceId = faceId,
							$temp$currentBestFace = {c8: n1, bB: i1},
							$temp$currentBestDistance = d;
						separatingAxis = $temp$separatingAxis;
						groups = $temp$groups;
						faceId = $temp$faceId;
						currentBestFaceId = $temp$currentBestFaceId;
						currentBestFace = $temp$currentBestFace;
						currentBestDistance = $temp$currentBestDistance;
						continue bestFaceWalk;
					} else {
						var $temp$separatingAxis = separatingAxis,
							$temp$groups = restGroups,
							$temp$faceId = faceId + 1,
							$temp$currentBestFaceId = currentBestFaceId,
							$temp$currentBestFace = currentBestFace,
							$temp$currentBestDistance = currentBestDistance;
						separatingAxis = $temp$separatingAxis;
						groups = $temp$groups;
						faceId = $temp$faceId;
						currentBestFaceId = $temp$currentBestFaceId;
						currentBestFace = $temp$currentBestFace;
						currentBestDistance = $temp$currentBestDistance;
						continue bestFaceWalk;
					}
				}
			}
		}
	});
var $author$project$Collision$ConvexConvex$emptyFace = {c8: $author$project$Internal$Vector3$zero, bB: _List_Nil};
var $author$project$Collision$ConvexConvex$bestFace = F2(
	function (groups, separatingAxis) {
		return A6($author$project$Collision$ConvexConvex$bestFaceWalk, separatingAxis, groups, 1, -1, $author$project$Collision$ConvexConvex$emptyFace, $author$project$Internal$Const$maxNumber);
	});
var $author$project$Internal$ContactId$siteCapEnd1 = 1;
var $author$project$Internal$ContactId$capsuleCapEnd1 = function (convexFeature) {
	return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagCapsuleConvex, $author$project$Internal$ContactId$siteCapEnd1, convexFeature, 0, 0);
};
var $author$project$Internal$ContactId$siteCapEnd2 = 2;
var $author$project$Internal$ContactId$capsuleCapEnd2 = function (convexFeature) {
	return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagCapsuleConvex, $author$project$Internal$ContactId$siteCapEnd2, convexFeature, 0, 0);
};
var $author$project$Collision$CapsuleConvex$faceAlignedThreshold = 0.999;
var $author$project$Shapes$Convex$faceGroupNormal = function (group) {
	if (!group.$) {
		var normal = group.a;
		return normal;
	} else {
		var normal = group.a;
		return normal;
	}
};
var $author$project$Internal$Const$contactBreakingThreshold = 1.0e-3;
var $author$project$Collision$ConvexConvex$project = F4(
	function (localAxis, minVal, maxVal, currentVertices) {
		project:
		while (true) {
			if (!currentVertices.b) {
				return {hN: maxVal, hS: minVal};
			} else {
				var vec = currentVertices.a;
				var remainingVertices = currentVertices.b;
				var val = ((vec.n * localAxis.n) + (vec.o * localAxis.o)) + (vec.p * localAxis.p);
				var $temp$localAxis = localAxis,
					$temp$minVal = ((minVal - val) > 0) ? val : minVal,
					$temp$maxVal = ((maxVal - val) > 0) ? maxVal : val,
					$temp$currentVertices = remainingVertices;
				localAxis = $temp$localAxis;
				minVal = $temp$minVal;
				maxVal = $temp$maxVal;
				currentVertices = $temp$currentVertices;
				continue project;
			}
		}
	});
var $author$project$Collision$ConvexConvex$projectConvex = F2(
	function (axis, convex) {
		var _v0 = convex.hX;
		if (!_v0.$) {
			var ax = _v0.a;
			var ay = _v0.b;
			var az = _v0.c;
			var he = _v0.d;
			var e = (($elm$core$Basics$abs(
				A2($author$project$Internal$Vector3$dot, axis, ax)) * he.n) + ($elm$core$Basics$abs(
				A2($author$project$Internal$Vector3$dot, axis, ay)) * he.o)) + ($elm$core$Basics$abs(
				A2($author$project$Internal$Vector3$dot, axis, az)) * he.p);
			var c = A2($author$project$Internal$Vector3$dot, axis, convex.gs);
			return {hN: c + e, hS: c - e};
		} else {
			var vs = _v0.a;
			return A4($author$project$Collision$ConvexConvex$project, axis, $author$project$Internal$Const$maxNumber, -$author$project$Internal$Const$maxNumber, vs);
		}
	});
var $author$project$Collision$CapsuleConvex$testCapsuleConvexAxis = F3(
	function (_v0, convex, n) {
		var position = _v0.gs;
		var axis = _v0.eS;
		var halfLength = _v0.fs;
		var radius = _v0.dj;
		var p2 = A2($author$project$Collision$ConvexConvex$projectConvex, n, convex);
		var centerProj = A2($author$project$Internal$Vector3$dot, position, n);
		var axisContrib = $elm$core$Basics$abs(
			A2($author$project$Internal$Vector3$dot, axis, n)) * halfLength;
		var capsuleMax = (centerProj + axisContrib) + radius;
		var d1 = capsuleMax - p2.hS;
		var capsuleMin = (centerProj - axisContrib) - radius;
		var d2 = p2.hN - capsuleMin;
		return (((d1 + $author$project$Internal$Const$contactBreakingThreshold) < 0) || ((d2 + $author$project$Internal$Const$contactBreakingThreshold) < 0)) ? $elm$core$Maybe$Nothing : (((d1 - d2) > 0) ? $elm$core$Maybe$Just(d2) : $elm$core$Maybe$Just(d1));
	});
var $author$project$Collision$CapsuleConvex$edgeAxis = F5(
	function (capsule, ep1, ep2, v1, v2) {
		var _v0 = A4($author$project$Internal$Vector3$closestPointsBetweenSegments, ep1, ep2, v1, v2);
		var pCap = _v0.a;
		var pEdge = _v0.b;
		var diff = A2($author$project$Internal$Vector3$sub, pCap, pEdge);
		var distSq = $author$project$Internal$Vector3$lengthSquared(diff);
		if ((distSq - $author$project$Internal$Const$precision) > 0) {
			return $elm$core$Maybe$Just(
				A2(
					$author$project$Internal$Vector3$scale,
					1 / $elm$core$Basics$sqrt(distSq),
					diff));
		} else {
			var cross = A2(
				$author$project$Internal$Vector3$cross,
				capsule.eS,
				A2($author$project$Internal$Vector3$sub, v2, v1));
			return $author$project$Internal$Vector3$almostZero(cross) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				$author$project$Internal$Vector3$normalize(cross));
		}
	});
var $author$project$Collision$CapsuleConvex$walkUniqueEdges = F8(
	function (capsule, convex, ep1, ep2, edges, queuedGroups, target, dmin) {
		walkUniqueEdges:
		while (true) {
			if (edges.b && edges.b.b) {
				var i1 = edges.a;
				var _v1 = edges.b;
				var i2 = _v1.a;
				var rest = _v1.b;
				var v2 = A2($author$project$Internal$VertexBuffer$get, i2, convex.bA);
				var v1 = A2($author$project$Internal$VertexBuffer$get, i1, convex.bA);
				var _v2 = A5($author$project$Collision$CapsuleConvex$edgeAxis, capsule, ep1, ep2, v1, v2);
				if (_v2.$ === 1) {
					var $temp$capsule = capsule,
						$temp$convex = convex,
						$temp$ep1 = ep1,
						$temp$ep2 = ep2,
						$temp$edges = rest,
						$temp$queuedGroups = queuedGroups,
						$temp$target = target,
						$temp$dmin = dmin;
					capsule = $temp$capsule;
					convex = $temp$convex;
					ep1 = $temp$ep1;
					ep2 = $temp$ep2;
					edges = $temp$edges;
					queuedGroups = $temp$queuedGroups;
					target = $temp$target;
					dmin = $temp$dmin;
					continue walkUniqueEdges;
				} else {
					var axis = _v2.a;
					var _v3 = A3($author$project$Collision$CapsuleConvex$testCapsuleConvexAxis, capsule, convex, axis);
					if (_v3.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var dist = _v3.a;
						if ((dist - dmin) < 0) {
							var $temp$capsule = capsule,
								$temp$convex = convex,
								$temp$ep1 = ep1,
								$temp$ep2 = ep2,
								$temp$edges = rest,
								$temp$queuedGroups = queuedGroups,
								$temp$target = axis,
								$temp$dmin = dist;
							capsule = $temp$capsule;
							convex = $temp$convex;
							ep1 = $temp$ep1;
							ep2 = $temp$ep2;
							edges = $temp$edges;
							queuedGroups = $temp$queuedGroups;
							target = $temp$target;
							dmin = $temp$dmin;
							continue walkUniqueEdges;
						} else {
							var $temp$capsule = capsule,
								$temp$convex = convex,
								$temp$ep1 = ep1,
								$temp$ep2 = ep2,
								$temp$edges = rest,
								$temp$queuedGroups = queuedGroups,
								$temp$target = target,
								$temp$dmin = dmin;
							capsule = $temp$capsule;
							convex = $temp$convex;
							ep1 = $temp$ep1;
							ep2 = $temp$ep2;
							edges = $temp$edges;
							queuedGroups = $temp$queuedGroups;
							target = $temp$target;
							dmin = $temp$dmin;
							continue walkUniqueEdges;
						}
					}
				}
			} else {
				if (queuedGroups.b) {
					var group = queuedGroups.a;
					var restGroups = queuedGroups.b;
					var $temp$capsule = capsule,
						$temp$convex = convex,
						$temp$ep1 = ep1,
						$temp$ep2 = ep2,
						$temp$edges = group,
						$temp$queuedGroups = restGroups,
						$temp$target = target,
						$temp$dmin = dmin;
					capsule = $temp$capsule;
					convex = $temp$convex;
					ep1 = $temp$ep1;
					ep2 = $temp$ep2;
					edges = $temp$edges;
					queuedGroups = $temp$queuedGroups;
					target = $temp$target;
					dmin = $temp$dmin;
					continue walkUniqueEdges;
				} else {
					return (A2(
						$author$project$Internal$Vector3$dot,
						A2($author$project$Internal$Vector3$sub, convex.gs, capsule.gs),
						target) > 0) ? $elm$core$Maybe$Just(
						$author$project$Internal$Vector3$negate(target)) : $elm$core$Maybe$Just(target);
				}
			}
		}
	});
var $author$project$Collision$CapsuleConvex$testUniqueEdges = F7(
	function (capsule, convex, ep1, ep2, groups, target, dmin) {
		return A8($author$project$Collision$CapsuleConvex$walkUniqueEdges, capsule, convex, ep1, ep2, _List_Nil, groups, target, dmin);
	});
var $author$project$Collision$CapsuleConvex$testConvexNormals = F7(
	function (capsule, convex, ep1, ep2, groups, target, dmin) {
		testConvexNormals:
		while (true) {
			if (!groups.b) {
				return A7($author$project$Collision$CapsuleConvex$testUniqueEdges, capsule, convex, ep1, ep2, convex.gR, target, dmin);
			} else {
				var group = groups.a;
				var restGroups = groups.b;
				var normal = $author$project$Shapes$Convex$faceGroupNormal(group);
				var _v1 = A3($author$project$Collision$CapsuleConvex$testCapsuleConvexAxis, capsule, convex, normal);
				if (_v1.$ === 1) {
					return $elm$core$Maybe$Nothing;
				} else {
					var dist = _v1.a;
					if ((dist - dmin) < 0) {
						var $temp$capsule = capsule,
							$temp$convex = convex,
							$temp$ep1 = ep1,
							$temp$ep2 = ep2,
							$temp$groups = restGroups,
							$temp$target = normal,
							$temp$dmin = dist;
						capsule = $temp$capsule;
						convex = $temp$convex;
						ep1 = $temp$ep1;
						ep2 = $temp$ep2;
						groups = $temp$groups;
						target = $temp$target;
						dmin = $temp$dmin;
						continue testConvexNormals;
					} else {
						var $temp$capsule = capsule,
							$temp$convex = convex,
							$temp$ep1 = ep1,
							$temp$ep2 = ep2,
							$temp$groups = restGroups,
							$temp$target = target,
							$temp$dmin = dmin;
						capsule = $temp$capsule;
						convex = $temp$convex;
						ep1 = $temp$ep1;
						ep2 = $temp$ep2;
						groups = $temp$groups;
						target = $temp$target;
						dmin = $temp$dmin;
						continue testConvexNormals;
					}
				}
			}
		}
	});
var $author$project$Collision$CapsuleConvex$findSeparatingAxis = F4(
	function (capsule, convex, ep1, ep2) {
		return A7($author$project$Collision$CapsuleConvex$testConvexNormals, capsule, convex, ep1, ep2, convex.e9, $author$project$Internal$Vector3$zero, $author$project$Internal$Const$maxNumber);
	});
var $author$project$Internal$ContactId$cfEdge = 1;
var $author$project$Internal$ContactId$onConvexEdge = $author$project$Internal$ContactId$cfEdge;
var $author$project$Internal$ContactId$cfFaceOffset = 2;
var $author$project$Internal$ContactId$onConvexFace = function (faceId) {
	return faceId + $author$project$Internal$ContactId$cfFaceOffset;
};
var $author$project$Internal$ContactId$cfNone = 0;
var $author$project$Internal$ContactId$onConvexNone = $author$project$Internal$ContactId$cfNone;
var $author$project$Internal$ContactId$cfVertex = 2;
var $author$project$Internal$ContactId$onConvexVertex = $author$project$Internal$ContactId$cfVertex;
var $author$project$Collision$CapsuleConvex$perpendicularThreshold = 1.0e-3;
var $author$project$Collision$CapsuleConvex$supportTieTolerance = 1.0e-4;
var $author$project$Collision$CapsuleConvex$collectFirstTwoTied = F5(
	function (axis, maxProj, verts, count, v1) {
		collectFirstTwoTied:
		while (true) {
			if (!verts.b) {
				return (!count) ? _List_Nil : _List_fromArray(
					[v1]);
			} else {
				var v = verts.a;
				var rest = verts.b;
				if (((maxProj - A2($author$project$Internal$Vector3$dot, v, axis)) - $author$project$Collision$CapsuleConvex$supportTieTolerance) < 0) {
					if (!count) {
						var $temp$axis = axis,
							$temp$maxProj = maxProj,
							$temp$verts = rest,
							$temp$count = 1,
							$temp$v1 = v;
						axis = $temp$axis;
						maxProj = $temp$maxProj;
						verts = $temp$verts;
						count = $temp$count;
						v1 = $temp$v1;
						continue collectFirstTwoTied;
					} else {
						return _List_fromArray(
							[v1, v]);
					}
				} else {
					var $temp$axis = axis,
						$temp$maxProj = maxProj,
						$temp$verts = rest,
						$temp$count = count,
						$temp$v1 = v1;
					axis = $temp$axis;
					maxProj = $temp$maxProj;
					verts = $temp$verts;
					count = $temp$count;
					v1 = $temp$v1;
					continue collectFirstTwoTied;
				}
			}
		}
	});
var $author$project$Shapes$Convex$boxCorners = F5(
	function (c, ax, ay, az, he) {
		var corner = F3(
			function (sx, sy, sz) {
				return {n: ((c.n + ((sx * he.n) * ax.n)) + ((sy * he.o) * ay.n)) + ((sz * he.p) * az.n), o: ((c.o + ((sx * he.n) * ax.o)) + ((sy * he.o) * ay.o)) + ((sz * he.p) * az.o), p: ((c.p + ((sx * he.n) * ax.p)) + ((sy * he.o) * ay.p)) + ((sz * he.p) * az.p)};
			});
		return _List_fromArray(
			[
				A3(corner, 1, 1, 1),
				A3(corner, 1, 1, -1),
				A3(corner, 1, -1, 1),
				A3(corner, 1, -1, -1),
				A3(corner, -1, 1, 1),
				A3(corner, -1, 1, -1),
				A3(corner, -1, -1, 1),
				A3(corner, -1, -1, -1)
			]);
	});
var $author$project$Shapes$Convex$convexVertices = function (convex) {
	var _v0 = convex.hX;
	if (_v0.$ === 1) {
		var vs = _v0.a;
		return vs;
	} else {
		var ax = _v0.a;
		var ay = _v0.b;
		var az = _v0.c;
		var he = _v0.d;
		return A5($author$project$Shapes$Convex$boxCorners, convex.gs, ax, ay, az, he);
	}
};
var $author$project$Collision$CapsuleConvex$findTiedEdgeInGroup = F4(
	function (axis, maxProj, buffer, edges) {
		findTiedEdgeInGroup:
		while (true) {
			if (edges.b && edges.b.b) {
				var i1 = edges.a;
				var _v1 = edges.b;
				var i2 = _v1.a;
				var rest = _v1.b;
				var v2 = A2($author$project$Internal$VertexBuffer$get, i2, buffer);
				var v1 = A2($author$project$Internal$VertexBuffer$get, i1, buffer);
				if ((((maxProj - A2($author$project$Internal$Vector3$dot, v1, axis)) - $author$project$Collision$CapsuleConvex$supportTieTolerance) < 0) && (((maxProj - A2($author$project$Internal$Vector3$dot, v2, axis)) - $author$project$Collision$CapsuleConvex$supportTieTolerance) < 0)) {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(v1, v2));
				} else {
					var $temp$axis = axis,
						$temp$maxProj = maxProj,
						$temp$buffer = buffer,
						$temp$edges = rest;
					axis = $temp$axis;
					maxProj = $temp$maxProj;
					buffer = $temp$buffer;
					edges = $temp$edges;
					continue findTiedEdgeInGroup;
				}
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}
	});
var $author$project$Collision$CapsuleConvex$findTiedUniqueEdge = F4(
	function (axis, maxProj, buffer, groups) {
		findTiedUniqueEdge:
		while (true) {
			if (groups.b) {
				var group = groups.a;
				var restGroups = groups.b;
				var _v1 = A4($author$project$Collision$CapsuleConvex$findTiedEdgeInGroup, axis, maxProj, buffer, group);
				if (!_v1.$) {
					var found = _v1;
					return found;
				} else {
					var $temp$axis = axis,
						$temp$maxProj = maxProj,
						$temp$buffer = buffer,
						$temp$groups = restGroups;
					axis = $temp$axis;
					maxProj = $temp$maxProj;
					buffer = $temp$buffer;
					groups = $temp$groups;
					continue findTiedUniqueEdge;
				}
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}
	});
var $author$project$Collision$CapsuleConvex$maxProjection = F3(
	function (axis, verts, soFar) {
		maxProjection:
		while (true) {
			if (!verts.b) {
				return soFar;
			} else {
				var v = verts.a;
				var rest = verts.b;
				var p = A2($author$project$Internal$Vector3$dot, v, axis);
				var $temp$axis = axis,
					$temp$verts = rest,
					$temp$soFar = ((p - soFar) > 0) ? p : soFar;
				axis = $temp$axis;
				verts = $temp$verts;
				soFar = $temp$soFar;
				continue maxProjection;
			}
		}
	});
var $author$project$Collision$CapsuleConvex$supportFeature = F2(
	function (axis, convex) {
		var vertices = $author$project$Shapes$Convex$convexVertices(convex);
		var maxProj = A3($author$project$Collision$CapsuleConvex$maxProjection, axis, vertices, -$author$project$Internal$Const$maxNumber);
		var _v0 = A5($author$project$Collision$CapsuleConvex$collectFirstTwoTied, axis, maxProj, vertices, 0, $author$project$Internal$Vector3$zero);
		if (!_v0.b) {
			return _List_Nil;
		} else {
			if (!_v0.b.b) {
				var v = _v0.a;
				return _List_fromArray(
					[v]);
			} else {
				var firstTied = _v0.a;
				var _v1 = A4($author$project$Collision$CapsuleConvex$findTiedUniqueEdge, axis, maxProj, convex.bA, convex.gR);
				if (!_v1.$) {
					var _v2 = _v1.a;
					var e1 = _v2.a;
					var e2 = _v2.b;
					return _List_fromArray(
						[e1, e2]);
				} else {
					return _List_fromArray(
						[firstTied]);
				}
			}
		}
	});
var $author$project$Collision$CapsuleConvex$addContacts = F5(
	function (shapeKey, orderContact, capsule, convex, contacts) {
		var ep2 = {n: capsule.gs.n + (capsule.fs * capsule.eS.n), o: capsule.gs.o + (capsule.fs * capsule.eS.o), p: capsule.gs.p + (capsule.fs * capsule.eS.p)};
		var ep1 = {n: capsule.gs.n - (capsule.fs * capsule.eS.n), o: capsule.gs.o - (capsule.fs * capsule.eS.o), p: capsule.gs.p - (capsule.fs * capsule.eS.p)};
		var _v0 = A4($author$project$Collision$CapsuleConvex$findSeparatingAxis, capsule, convex, ep1, ep2);
		if (_v0.$ === 1) {
			return contacts;
		} else {
			var separatingAxis = _v0.a;
			var _v1 = A3($author$project$Collision$CapsuleConvex$testCapsuleConvexAxis, capsule, convex, separatingAxis);
			if (_v1.$ === 1) {
				return contacts;
			} else {
				var penetration = _v1.a;
				var t = A2($author$project$Internal$Vector3$dot, capsule.eS, separatingAxis);
				var faceContext = function () {
					var _v14 = A2(
						$author$project$Collision$ConvexConvex$bestFace,
						convex.e9,
						$author$project$Internal$Vector3$negate(separatingAxis));
					var fid = _v14.a;
					var f = _v14.b;
					return _Utils_eq(fid, -1) ? $elm$core$Maybe$Nothing : (((A2($author$project$Internal$Vector3$dot, f.c8, separatingAxis) - $author$project$Collision$CapsuleConvex$faceAlignedThreshold) > 0) ? $elm$core$Maybe$Just(
						_Utils_Tuple2(fid, f)) : $elm$core$Maybe$Nothing);
				}();
				var supportVerts = function () {
					if (!faceContext.$) {
						return _List_Nil;
					} else {
						return A2($author$project$Collision$CapsuleConvex$supportFeature, separatingAxis, convex);
					}
				}();
				var convexFeature = function () {
					if (!faceContext.$) {
						var _v10 = faceContext.a;
						var fid = _v10.a;
						return $author$project$Internal$ContactId$onConvexFace(fid);
					} else {
						if (supportVerts.b) {
							if (supportVerts.b.b) {
								var _v12 = supportVerts.b;
								return $author$project$Internal$ContactId$onConvexEdge;
							} else {
								return $author$project$Internal$ContactId$onConvexVertex;
							}
						} else {
							return $author$project$Internal$ContactId$onConvexNone;
						}
					}
				}();
				if ((t - $author$project$Collision$CapsuleConvex$perpendicularThreshold) > 0) {
					return $author$project$Collision$CapsuleConvex$addBodyContacts(shapeKey)(convexFeature)(orderContact)(convex.bA)(faceContext)(capsule)(ep1)(ep2)(separatingAxis)(ep1)(
						A8(
							$author$project$Collision$CapsuleConvex$addDirectContact,
							shapeKey,
							$author$project$Internal$ContactId$capsuleCapEnd1(convexFeature),
							orderContact,
							ep1,
							separatingAxis,
							penetration,
							capsule,
							contacts));
				} else {
					if ((t + $author$project$Collision$CapsuleConvex$perpendicularThreshold) < 0) {
						return $author$project$Collision$CapsuleConvex$addBodyContacts(shapeKey)(convexFeature)(orderContact)(convex.bA)(faceContext)(capsule)(ep1)(ep2)(separatingAxis)(ep2)(
							A8(
								$author$project$Collision$CapsuleConvex$addDirectContact,
								shapeKey,
								$author$project$Internal$ContactId$capsuleCapEnd2(convexFeature),
								orderContact,
								ep2,
								separatingAxis,
								penetration,
								capsule,
								contacts));
					} else {
						if (!faceContext.$) {
							var _v3 = faceContext.a;
							var face = _v3.b;
							var _v4 = A4($author$project$Collision$CapsuleConvex$clipSegmentAgainstFace, convex.bA, face, ep1, ep2);
							if (!_v4.$) {
								var p1 = _v4.a;
								var p2 = _v4.b;
								return A8(
									$author$project$Collision$CapsuleConvex$addDirectContact,
									shapeKey,
									$author$project$Internal$ContactId$capsuleCylinder2(convexFeature),
									orderContact,
									p2,
									separatingAxis,
									penetration,
									capsule,
									A8(
										$author$project$Collision$CapsuleConvex$addDirectContact,
										shapeKey,
										$author$project$Internal$ContactId$capsuleCylinder1(convexFeature),
										orderContact,
										p1,
										separatingAxis,
										penetration,
										capsule,
										contacts));
							} else {
								return A9(
									$author$project$Collision$CapsuleConvex$addClosestEdgeContact,
									shapeKey,
									$author$project$Internal$ContactId$capsuleCylinder(convexFeature),
									orderContact,
									convex.bA,
									face,
									ep1,
									ep2,
									capsule,
									contacts);
							}
						} else {
							if (supportVerts.b) {
								if (supportVerts.b.b) {
									var v1 = supportVerts.a;
									var _v6 = supportVerts.b;
									var v2 = _v6.a;
									if ($author$project$Internal$Vector3$almostZero(
										A2(
											$author$project$Internal$Vector3$cross,
											capsule.eS,
											A2($author$project$Internal$Vector3$sub, v2, v1)))) {
										return $author$project$Collision$CapsuleConvex$addParallelEdgeContacts(shapeKey)(convexFeature)(orderContact)(ep1)(ep2)(v1)(v2)(separatingAxis)(penetration)(capsule)(contacts);
									} else {
										var _v7 = A4($author$project$Internal$Vector3$closestPointsBetweenSegments, ep1, ep2, v1, v2);
										var pCapsule = _v7.a;
										return A8(
											$author$project$Collision$CapsuleConvex$addDirectContact,
											shapeKey,
											$author$project$Internal$ContactId$capsuleCylinder(convexFeature),
											orderContact,
											pCapsule,
											separatingAxis,
											penetration,
											capsule,
											contacts);
									}
								} else {
									var v = supportVerts.a;
									var _v8 = A4($author$project$Internal$Vector3$closestPointsBetweenSegments, ep1, ep2, v, v);
									var pCapsule = _v8.a;
									return A8(
										$author$project$Collision$CapsuleConvex$addDirectContact,
										shapeKey,
										$author$project$Internal$ContactId$capsuleCylinder(convexFeature),
										orderContact,
										pCapsule,
										separatingAxis,
										penetration,
										capsule,
										contacts);
								}
							} else {
								return contacts;
							}
						}
					}
				}
			}
		}
	});
var $author$project$Collision$CapsuleParticle$addContacts = F5(
	function (shapeKey, orderContact, capsule, particlePosition, contacts) {
		var t = A2(
			$elm$core$Basics$max,
			-capsule.fs,
			A2(
				$elm$core$Basics$min,
				capsule.fs,
				A2(
					$author$project$Internal$Vector3$dot,
					A2($author$project$Internal$Vector3$sub, particlePosition, capsule.gs),
					capsule.eS)));
		var closestPoint = A2(
			$author$project$Internal$Vector3$add,
			capsule.gs,
			A2($author$project$Internal$Vector3$scale, t, capsule.eS));
		var distance = A2($author$project$Internal$Vector3$distance, particlePosition, closestPoint) - capsule.dj;
		var normal = A2($author$project$Internal$Vector3$direction, particlePosition, closestPoint);
		return (distance > 0) ? contacts : A2(
			$elm$core$List$cons,
			orderContact(
				{
					ht: $author$project$Internal$ContactId$simple,
					hV: normal,
					h$: A2(
						$author$project$Internal$Vector3$add,
						closestPoint,
						A2($author$project$Internal$Vector3$scale, capsule.dj, normal)),
					h0: particlePosition,
					h6: shapeKey
				}),
			contacts);
	});
var $author$project$Collision$CapsuleSphere$addContacts = F5(
	function (shapeKey, orderContact, capsule, sphere, contacts) {
		var t = A2(
			$elm$core$Basics$max,
			-capsule.fs,
			A2(
				$elm$core$Basics$min,
				capsule.fs,
				A2(
					$author$project$Internal$Vector3$dot,
					A2($author$project$Internal$Vector3$sub, sphere.gs, capsule.gs),
					capsule.eS)));
		var closestPoint = A2(
			$author$project$Internal$Vector3$add,
			capsule.gs,
			A2($author$project$Internal$Vector3$scale, t, capsule.eS));
		var distance = (A2($author$project$Internal$Vector3$distance, sphere.gs, closestPoint) - capsule.dj) - sphere.dj;
		var normal = A2($author$project$Internal$Vector3$direction, sphere.gs, closestPoint);
		return (distance > 0) ? contacts : A2(
			$elm$core$List$cons,
			orderContact(
				{
					ht: $author$project$Internal$ContactId$simple,
					hV: normal,
					h$: A2(
						$author$project$Internal$Vector3$add,
						closestPoint,
						A2($author$project$Internal$Vector3$scale, capsule.dj, normal)),
					h0: A2(
						$author$project$Internal$Vector3$sub,
						sphere.gs,
						A2($author$project$Internal$Vector3$scale, sphere.dj, normal)),
					h6: shapeKey
				}),
			contacts);
	});
var $author$project$Internal$ContactId$tagConvexEdge = 2;
var $author$project$Internal$ContactId$convexConvexEdge = F4(
	function (dir1, edge1, dir2, edge2) {
		return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagConvexEdge, dir1, edge1, dir2, edge2);
	});
var $author$project$Collision$ConvexConvex$pickSupportEdgeHelp = F7(
	function (supportDir, edges, buffer, idx, bestIdx, bestEdge, bestDot) {
		pickSupportEdgeHelp:
		while (true) {
			if (edges.b && edges.b.b) {
				var i1 = edges.a;
				var _v1 = edges.b;
				var i2 = _v1.a;
				var rest = _v1.b;
				var v2 = A2($author$project$Internal$VertexBuffer$get, i2, buffer);
				var v1 = A2($author$project$Internal$VertexBuffer$get, i1, buffer);
				var midDot = ((supportDir.n * (v1.n + v2.n)) + (supportDir.o * (v1.o + v2.o))) + (supportDir.p * (v1.p + v2.p));
				if ((midDot - bestDot) > 0) {
					var $temp$supportDir = supportDir,
						$temp$edges = rest,
						$temp$buffer = buffer,
						$temp$idx = idx + 1,
						$temp$bestIdx = idx,
						$temp$bestEdge = _Utils_Tuple2(v1, v2),
						$temp$bestDot = midDot;
					supportDir = $temp$supportDir;
					edges = $temp$edges;
					buffer = $temp$buffer;
					idx = $temp$idx;
					bestIdx = $temp$bestIdx;
					bestEdge = $temp$bestEdge;
					bestDot = $temp$bestDot;
					continue pickSupportEdgeHelp;
				} else {
					var $temp$supportDir = supportDir,
						$temp$edges = rest,
						$temp$buffer = buffer,
						$temp$idx = idx + 1,
						$temp$bestIdx = bestIdx,
						$temp$bestEdge = bestEdge,
						$temp$bestDot = bestDot;
					supportDir = $temp$supportDir;
					edges = $temp$edges;
					buffer = $temp$buffer;
					idx = $temp$idx;
					bestIdx = $temp$bestIdx;
					bestEdge = $temp$bestEdge;
					bestDot = $temp$bestDot;
					continue pickSupportEdgeHelp;
				}
			} else {
				return _Utils_Tuple2(bestIdx, bestEdge);
			}
		}
	});
var $author$project$Collision$ConvexConvex$pickSupportEdge = F3(
	function (supportDir, edges, buffer) {
		return A7(
			$author$project$Collision$ConvexConvex$pickSupportEdgeHelp,
			supportDir,
			edges,
			buffer,
			1,
			0,
			_Utils_Tuple2($author$project$Internal$Vector3$zero, $author$project$Internal$Vector3$zero),
			-$author$project$Internal$Const$maxNumber);
	});
var $author$project$Collision$ConvexConvex$addEdgeContact = F9(
	function (shapeKey, separatingAxis, dir1Idx, edges1, buffer1, dir2Idx, edges2, buffer2, contacts) {
		var reversedSeparatingAxis = $author$project$Internal$Vector3$negate(separatingAxis);
		var _v0 = A3($author$project$Collision$ConvexConvex$pickSupportEdge, separatingAxis, edges2, buffer2);
		var edge2Idx = _v0.a;
		var _v1 = _v0.b;
		var e2p = _v1.a;
		var e2q = _v1.b;
		var _v2 = A3($author$project$Collision$ConvexConvex$pickSupportEdge, reversedSeparatingAxis, edges1, buffer1);
		var edge1Idx = _v2.a;
		var _v3 = _v2.b;
		var e1p = _v3.a;
		var e1q = _v3.b;
		var _v4 = A4($author$project$Internal$Vector3$closestPointsBetweenSegments, e1p, e1q, e2p, e2q);
		var pi = _v4.a;
		var pj = _v4.b;
		return A2(
			$elm$core$List$cons,
			{
				ht: A4($author$project$Internal$ContactId$convexConvexEdge, dir1Idx, edge1Idx, dir2Idx, edge2Idx),
				hV: reversedSeparatingAxis,
				h$: pi,
				h0: pj,
				h6: shapeKey
			},
			contacts);
	});
var $author$project$Collision$ConvexConvex$crossing = F4(
	function (nDotPrev, nDotNext, _v0, _v1) {
		var prevId = _v0.a;
		var prevP = _v0.b;
		var nextId = _v1.a;
		var nextP = _v1.b;
		var t = nDotPrev / (nDotPrev - nDotNext);
		return _Utils_Tuple2(
			(t < 0.5) ? prevId : nextId,
			A3($author$project$Internal$Vector3$lerp, t, prevP, nextP));
	});
var $author$project$Collision$ConvexConvex$clipFaceAgainstPlaneAdd = F5(
	function (planeNormal, planeConstant, prev, next, result) {
		var _v0 = prev;
		var prevP = _v0.b;
		var nDotPrev = A2($author$project$Internal$Vector3$dot, planeNormal, prevP) + planeConstant;
		var _v1 = next;
		var nextP = _v1.b;
		var nDotNext = A2($author$project$Internal$Vector3$dot, planeNormal, nextP) + planeConstant;
		return (nDotPrev < 0) ? ((nDotNext < 0) ? A2($elm$core$List$cons, next, result) : A2(
			$elm$core$List$cons,
			A4($author$project$Collision$ConvexConvex$crossing, nDotPrev, nDotNext, prev, next),
			result)) : ((nDotNext < 0) ? A2(
			$elm$core$List$cons,
			next,
			A2(
				$elm$core$List$cons,
				A4($author$project$Collision$ConvexConvex$crossing, nDotPrev, nDotNext, prev, next),
				result)) : result);
	});
var $author$project$Shapes$Convex$foldFaceEdgesHelp = F4(
	function (fn, seed, resultSeed, vertices) {
		foldFaceEdgesHelp:
		while (true) {
			if (vertices.b) {
				var el1 = vertices.a;
				var rest1 = vertices.b;
				if (!rest1.b) {
					return A3(fn, el1, seed, resultSeed);
				} else {
					var el2 = rest1.a;
					var $temp$fn = fn,
						$temp$seed = seed,
						$temp$resultSeed = A3(fn, el1, el2, resultSeed),
						$temp$vertices = rest1;
					fn = $temp$fn;
					seed = $temp$seed;
					resultSeed = $temp$resultSeed;
					vertices = $temp$vertices;
					continue foldFaceEdgesHelp;
				}
			} else {
				return resultSeed;
			}
		}
	});
var $author$project$Shapes$Convex$foldFaceEdges = F3(
	function (fn, resultSeed, vertices) {
		if (vertices.b && vertices.b.b) {
			var first = vertices.a;
			var _v1 = vertices.b;
			return A4($author$project$Shapes$Convex$foldFaceEdgesHelp, fn, first, resultSeed, vertices);
		} else {
			return resultSeed;
		}
	});
var $author$project$Collision$ConvexConvex$clipAgainstAdjacentFaces = F3(
	function (normal, referenceVertices, incidentPolygon) {
		return A3(
			$author$project$Shapes$Convex$foldFaceEdges,
			F2(
				function (v1, v2) {
					var edge = $author$project$Internal$Vector3$normalize(
						A2($author$project$Internal$Vector3$sub, v1, v2));
					var planeNormal = A2($author$project$Internal$Vector3$cross, normal, edge);
					var planeConstant = -A2($author$project$Internal$Vector3$dot, v1, planeNormal);
					return A2(
						$author$project$Shapes$Convex$foldFaceEdges,
						A2($author$project$Collision$ConvexConvex$clipFaceAgainstPlaneAdd, planeNormal, planeConstant),
						_List_Nil);
				}),
			incidentPolygon,
			referenceVertices);
	});
var $author$project$Internal$ContactId$tagConvexFace = 1;
var $author$project$Internal$ContactId$convexConvexFace = F3(
	function (f1, f2, v) {
		return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagConvexFace, f1, f2, v, 0);
	});
var $author$project$Collision$ConvexConvex$emitManifold = F8(
	function (shapeKey, faceId1, faceId2, separatingAxis, normal, planeConstant, points, result) {
		emitManifold:
		while (true) {
			if (points.b) {
				var _v1 = points.a;
				var vertexId = _v1.a;
				var vertex = _v1.b;
				var rest = points.b;
				var depth = A2($author$project$Internal$Vector3$dot, normal, vertex) + planeConstant;
				var $temp$shapeKey = shapeKey,
					$temp$faceId1 = faceId1,
					$temp$faceId2 = faceId2,
					$temp$separatingAxis = separatingAxis,
					$temp$normal = normal,
					$temp$planeConstant = planeConstant,
					$temp$points = rest,
					$temp$result = A2(
					$elm$core$List$cons,
					{
						ht: A3($author$project$Internal$ContactId$convexConvexFace, faceId1, faceId2, vertexId),
						hV: separatingAxis,
						h$: {n: vertex.n - (depth * normal.n), o: vertex.o - (depth * normal.o), p: vertex.p - (depth * normal.p)},
						h0: vertex,
						h6: shapeKey
					},
					result);
				shapeKey = $temp$shapeKey;
				faceId1 = $temp$faceId1;
				faceId2 = $temp$faceId2;
				separatingAxis = $temp$separatingAxis;
				normal = $temp$normal;
				planeConstant = $temp$planeConstant;
				points = $temp$points;
				result = $temp$result;
				continue emitManifold;
			} else {
				return result;
			}
		}
	});
var $author$project$Shapes$Convex$materializeIndexed = F2(
	function (buffer, indices) {
		if (indices.b) {
			var i = indices.a;
			var rest = indices.b;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					i,
					A2($author$project$Internal$VertexBuffer$get, i, buffer)),
				A2($author$project$Shapes$Convex$materializeIndexed, buffer, rest));
		} else {
			return _List_Nil;
		}
	});
var $author$project$Shapes$Convex$indexedFaceVertices = F2(
	function (buffer, face) {
		return A2($author$project$Shapes$Convex$materializeIndexed, buffer, face.bB);
	});
var $author$project$Internal$Vector3$distanceSquared = F2(
	function (a, b) {
		var z = b.p - a.p;
		var y = b.o - a.o;
		var x = b.n - a.n;
		return ((x * x) + (y * y)) + (z * z);
	});
var $author$project$Internal$Manifold$farthestFromHelp = F4(
	function (pa, remaining, best, bestScore) {
		farthestFromHelp:
		while (true) {
			if (remaining.b) {
				var q = remaining.a;
				var pq = q.b;
				var rest = remaining.b;
				var s = A2($author$project$Internal$Vector3$distanceSquared, pa, pq);
				if ((s - bestScore) > 0) {
					var $temp$pa = pa,
						$temp$remaining = rest,
						$temp$best = q,
						$temp$bestScore = s;
					pa = $temp$pa;
					remaining = $temp$remaining;
					best = $temp$best;
					bestScore = $temp$bestScore;
					continue farthestFromHelp;
				} else {
					var $temp$pa = pa,
						$temp$remaining = rest,
						$temp$best = best,
						$temp$bestScore = bestScore;
					pa = $temp$pa;
					remaining = $temp$remaining;
					best = $temp$best;
					bestScore = $temp$bestScore;
					continue farthestFromHelp;
				}
			} else {
				return best;
			}
		}
	});
var $author$project$Internal$Manifold$farthestFrom = F2(
	function (a, candidates) {
		var pa = a.b;
		if (candidates.b) {
			var head = candidates.a;
			var ph = head.b;
			var tail = candidates.b;
			return A4(
				$author$project$Internal$Manifold$farthestFromHelp,
				pa,
				tail,
				head,
				A2($author$project$Internal$Vector3$distanceSquared, pa, ph));
		} else {
			return a;
		}
	});
var $author$project$Internal$Manifold$farthestFrom2Help = F5(
	function (pa, pb, remaining, best, bestScore) {
		farthestFrom2Help:
		while (true) {
			if (remaining.b) {
				var q = remaining.a;
				var pq = q.b;
				var rest = remaining.b;
				var s = A2(
					$elm$core$Basics$min,
					A2($author$project$Internal$Vector3$distanceSquared, pa, pq),
					A2($author$project$Internal$Vector3$distanceSquared, pb, pq));
				if ((s - bestScore) > 0) {
					var $temp$pa = pa,
						$temp$pb = pb,
						$temp$remaining = rest,
						$temp$best = q,
						$temp$bestScore = s;
					pa = $temp$pa;
					pb = $temp$pb;
					remaining = $temp$remaining;
					best = $temp$best;
					bestScore = $temp$bestScore;
					continue farthestFrom2Help;
				} else {
					var $temp$pa = pa,
						$temp$pb = pb,
						$temp$remaining = rest,
						$temp$best = best,
						$temp$bestScore = bestScore;
					pa = $temp$pa;
					pb = $temp$pb;
					remaining = $temp$remaining;
					best = $temp$best;
					bestScore = $temp$bestScore;
					continue farthestFrom2Help;
				}
			} else {
				return best;
			}
		}
	});
var $author$project$Internal$Manifold$farthestFrom2 = F3(
	function (a, _v0, candidates) {
		var pa = a.b;
		var pb = _v0.b;
		if (candidates.b) {
			var head = candidates.a;
			var ph = head.b;
			var tail = candidates.b;
			return A5(
				$author$project$Internal$Manifold$farthestFrom2Help,
				pa,
				pb,
				tail,
				head,
				A2(
					$elm$core$Basics$min,
					A2($author$project$Internal$Vector3$distanceSquared, pa, ph),
					A2($author$project$Internal$Vector3$distanceSquared, pb, ph)));
		} else {
			return a;
		}
	});
var $author$project$Internal$Manifold$farthestFrom3Help = F6(
	function (pa, pb, pc, remaining, best, bestScore) {
		farthestFrom3Help:
		while (true) {
			if (remaining.b) {
				var q = remaining.a;
				var pq = q.b;
				var rest = remaining.b;
				var s = A2(
					$elm$core$Basics$min,
					A2($author$project$Internal$Vector3$distanceSquared, pa, pq),
					A2(
						$elm$core$Basics$min,
						A2($author$project$Internal$Vector3$distanceSquared, pb, pq),
						A2($author$project$Internal$Vector3$distanceSquared, pc, pq)));
				if ((s - bestScore) > 0) {
					var $temp$pa = pa,
						$temp$pb = pb,
						$temp$pc = pc,
						$temp$remaining = rest,
						$temp$best = q,
						$temp$bestScore = s;
					pa = $temp$pa;
					pb = $temp$pb;
					pc = $temp$pc;
					remaining = $temp$remaining;
					best = $temp$best;
					bestScore = $temp$bestScore;
					continue farthestFrom3Help;
				} else {
					var $temp$pa = pa,
						$temp$pb = pb,
						$temp$pc = pc,
						$temp$remaining = rest,
						$temp$best = best,
						$temp$bestScore = bestScore;
					pa = $temp$pa;
					pb = $temp$pb;
					pc = $temp$pc;
					remaining = $temp$remaining;
					best = $temp$best;
					bestScore = $temp$bestScore;
					continue farthestFrom3Help;
				}
			} else {
				return best;
			}
		}
	});
var $author$project$Internal$Manifold$farthestFrom3 = F4(
	function (a, _v0, _v1, candidates) {
		var pa = a.b;
		var pb = _v0.b;
		var pc = _v1.b;
		if (candidates.b) {
			var head = candidates.a;
			var ph = head.b;
			var tail = candidates.b;
			return A6(
				$author$project$Internal$Manifold$farthestFrom3Help,
				pa,
				pb,
				pc,
				tail,
				head,
				A2(
					$elm$core$Basics$min,
					A2($author$project$Internal$Vector3$distanceSquared, pa, ph),
					A2(
						$elm$core$Basics$min,
						A2($author$project$Internal$Vector3$distanceSquared, pb, ph),
						A2($author$project$Internal$Vector3$distanceSquared, pc, ph))));
		} else {
			return a;
		}
	});
var $author$project$Internal$Manifold$tieEpsilon = 1.0e-8;
var $author$project$Internal$Manifold$farthestPair = F5(
	function (outer, all, bestA, bestB, bestD) {
		farthestPair:
		while (true) {
			if (outer.b) {
				var p = outer.a;
				var pp = p.b;
				var rest = outer.b;
				var q = A2($author$project$Internal$Manifold$farthestFrom, p, all);
				var pq = q.b;
				var d = A2($author$project$Internal$Vector3$distanceSquared, pp, pq);
				if (((d - bestD) - $author$project$Internal$Manifold$tieEpsilon) > 0) {
					var $temp$outer = rest,
						$temp$all = all,
						$temp$bestA = p,
						$temp$bestB = q,
						$temp$bestD = d;
					outer = $temp$outer;
					all = $temp$all;
					bestA = $temp$bestA;
					bestB = $temp$bestB;
					bestD = $temp$bestD;
					continue farthestPair;
				} else {
					var $temp$outer = rest,
						$temp$all = all,
						$temp$bestA = bestA,
						$temp$bestB = bestB,
						$temp$bestD = bestD;
					outer = $temp$outer;
					all = $temp$all;
					bestA = $temp$bestA;
					bestB = $temp$bestB;
					bestD = $temp$bestD;
					continue farthestPair;
				}
			} else {
				var c = A3($author$project$Internal$Manifold$farthestFrom2, bestA, bestB, all);
				var e = A4($author$project$Internal$Manifold$farthestFrom3, bestA, bestB, c, all);
				return _List_fromArray(
					[bestA, bestB, c, e]);
			}
		}
	});
var $author$project$Internal$Manifold$withinMargin = F4(
	function (normal, marginConstant, points, acc) {
		withinMargin:
		while (true) {
			if (points.b) {
				var v = points.a;
				var p = v.b;
				var rest = points.b;
				if ((A2($author$project$Internal$Vector3$dot, normal, p) + marginConstant) < 0) {
					var $temp$normal = normal,
						$temp$marginConstant = marginConstant,
						$temp$points = rest,
						$temp$acc = A2($elm$core$List$cons, v, acc);
					normal = $temp$normal;
					marginConstant = $temp$marginConstant;
					points = $temp$points;
					acc = $temp$acc;
					continue withinMargin;
				} else {
					var $temp$normal = normal,
						$temp$marginConstant = marginConstant,
						$temp$points = rest,
						$temp$acc = acc;
					normal = $temp$normal;
					marginConstant = $temp$marginConstant;
					points = $temp$points;
					acc = $temp$acc;
					continue withinMargin;
				}
			} else {
				return acc;
			}
		}
	});
var $author$project$Internal$Manifold$reduce = F3(
	function (normal, planeConstant, points) {
		var _v0 = A4($author$project$Internal$Manifold$withinMargin, normal, planeConstant - $author$project$Internal$Const$contactBreakingThreshold, points, _List_Nil);
		if ((((_v0.b && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && _v0.b.b.b.b.b) {
			var candidates = _v0;
			var first = candidates.a;
			var _v1 = candidates.b;
			var _v2 = _v1.b;
			var _v3 = _v2.b;
			var _v4 = _v3.b;
			return A5($author$project$Internal$Manifold$farthestPair, candidates, candidates, first, first, -1);
		} else {
			var candidates = _v0;
			return candidates;
		}
	});
var $author$project$Collision$ConvexConvex$clipTwoFaces = F9(
	function (shapeKey, faceId1, faceId2, face, faceBuffer, incidentFace, incidentBuffer, separatingAxis, contacts) {
		var referenceVertices = A2($author$project$Shapes$Convex$faceVertices, faceBuffer, face);
		var point = function () {
			if (referenceVertices.b) {
				var first = referenceVertices.a;
				return first;
			} else {
				return $author$project$Internal$Vector3$zero;
			}
		}();
		var incidentPolygon = A2($author$project$Shapes$Convex$indexedFaceVertices, incidentBuffer, incidentFace);
		var facePlaneConstant = -A2($author$project$Internal$Vector3$dot, face.c8, point);
		return A8(
			$author$project$Collision$ConvexConvex$emitManifold,
			shapeKey,
			faceId1,
			faceId2,
			separatingAxis,
			face.c8,
			facePlaneConstant,
			A3(
				$author$project$Internal$Manifold$reduce,
				face.c8,
				facePlaneConstant,
				A3($author$project$Collision$ConvexConvex$clipAgainstAdjacentFaces, face.c8, referenceVertices, incidentPolygon)),
			contacts);
	});
var $author$project$Collision$ConvexConvex$orientAxis = F3(
	function (convex1, convex2, axis) {
		return (A2(
			$author$project$Internal$Vector3$dot,
			A2($author$project$Internal$Vector3$sub, convex2.gs, convex1.gs),
			axis) > 0) ? $author$project$Internal$Vector3$negate(axis) : axis;
	});
var $author$project$Collision$ConvexConvex$pickWinningFace = F3(
	function (groupIdx, group, axisToward) {
		if (group.$ === 1) {
			var n1 = group.a;
			var i1 = group.b;
			var n2 = group.d;
			var i2 = group.e;
			return (A2($author$project$Internal$Vector3$dot, n1, axisToward) <= 0) ? _Utils_Tuple2(
				groupIdx,
				{c8: n1, bB: i1}) : _Utils_Tuple2(
				groupIdx + 1,
				{c8: n2, bB: i2});
		} else {
			var n1 = group.a;
			var i1 = group.b;
			return _Utils_Tuple2(
				groupIdx,
				{c8: n1, bB: i1});
		}
	});
var $author$project$Collision$ConvexConvex$dispatchBestFaces = F5(
	function (shapeKey, convex1, convex2, winner, contacts) {
		var separatingAxis = A3($author$project$Collision$ConvexConvex$orientAxis, convex1, convex2, winner.eS);
		var reversedSeparatingAxis = $author$project$Internal$Vector3$negate(separatingAxis);
		var picked = function () {
			var _v0 = winner.dX;
			if (!_v0) {
				var _v1 = A3($author$project$Collision$ConvexConvex$pickWinningFace, winner.cT, winner.cS, separatingAxis);
				var wid = _v1.a;
				var wface = _v1.b;
				var _v2 = A2($author$project$Collision$ConvexConvex$bestFace, convex2.e9, reversedSeparatingAxis);
				var oid = _v2.a;
				var oface = _v2.b;
				return {dU: wface, dV: oface, cW: wid, cX: oid};
			} else {
				var _v3 = A3($author$project$Collision$ConvexConvex$pickWinningFace, winner.cT, winner.cS, reversedSeparatingAxis);
				var wid = _v3.a;
				var wface = _v3.b;
				var _v4 = A2($author$project$Collision$ConvexConvex$bestFace, convex1.e9, separatingAxis);
				var oid = _v4.a;
				var oface = _v4.b;
				return {dU: oface, dV: wface, cW: oid, cX: wid};
			}
		}();
		return (_Utils_eq(picked.cW, -1) || _Utils_eq(picked.cX, -1)) ? contacts : A9($author$project$Collision$ConvexConvex$clipTwoFaces, shapeKey, picked.cW, picked.cX, picked.dU, convex1.bA, picked.dV, convex2.bA, reversedSeparatingAxis, contacts);
	});
var $author$project$Collision$ConvexConvex$edgeBiasFactor = 1.05;
var $author$project$Collision$ConvexConvex$EdgeBeats = F5(
	function (a, b, c, d, e) {
		return {$: 1, a: a, b: b, c: c, d: d, e: e};
	});
var $author$project$Collision$ConvexConvex$EdgeSeparates = F5(
	function (a, b, c, d, e) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e};
	});
var $author$project$Collision$ConvexConvex$edgeSeparates = A5($author$project$Collision$ConvexConvex$EdgeSeparates, 0, 0, 0, 0, 0);
var $author$project$Collision$ConvexConvex$overlap = F2(
	function (p1, p2) {
		var d2 = p2.hN - p1.hS;
		var d1 = p1.hN - p2.hS;
		return (((d1 + $author$project$Internal$Const$contactBreakingThreshold) < 0) || ((d2 + $author$project$Internal$Const$contactBreakingThreshold) < 0)) ? $elm$core$Maybe$Nothing : (((d1 - d2) > 0) ? $elm$core$Maybe$Just(d2) : $elm$core$Maybe$Just(d1));
	});
var $author$project$Collision$ConvexConvex$testSeparatingAxis = F3(
	function (convex1, convex2, separatingAxis) {
		return A2(
			$author$project$Collision$ConvexConvex$overlap,
			A2($author$project$Collision$ConvexConvex$projectConvex, separatingAxis, convex1),
			A2($author$project$Collision$ConvexConvex$projectConvex, separatingAxis, convex2));
	});
var $author$project$Collision$ConvexConvex$findEdgeSATHelp = F9(
	function (convex1, convex2, initGroups2, groups1, groups2, dir1Idx, dir2Idx, best, dmin) {
		findEdgeSATHelp:
		while (true) {
			if (!groups1.b) {
				return best;
			} else {
				if (groups1.a.b && groups1.a.b.b) {
					var group1 = groups1.a;
					var v1a = group1.a;
					var _v1 = group1.b;
					var v1b = _v1.a;
					var remainingGroups1 = groups1.b;
					if (!groups2.b) {
						var $temp$convex1 = convex1,
							$temp$convex2 = convex2,
							$temp$initGroups2 = initGroups2,
							$temp$groups1 = remainingGroups1,
							$temp$groups2 = initGroups2,
							$temp$dir1Idx = dir1Idx + 1,
							$temp$dir2Idx = 1,
							$temp$best = best,
							$temp$dmin = dmin;
						convex1 = $temp$convex1;
						convex2 = $temp$convex2;
						initGroups2 = $temp$initGroups2;
						groups1 = $temp$groups1;
						groups2 = $temp$groups2;
						dir1Idx = $temp$dir1Idx;
						dir2Idx = $temp$dir2Idx;
						best = $temp$best;
						dmin = $temp$dmin;
						continue findEdgeSATHelp;
					} else {
						if (groups2.a.b && groups2.a.b.b) {
							var group2 = groups2.a;
							var v2a = group2.a;
							var _v3 = group2.b;
							var v2b = _v3.a;
							var remainingGroups2 = groups2.b;
							var dir2 = A2(
								$author$project$Internal$Vector3$direction,
								A2($author$project$Internal$VertexBuffer$get, v2a, convex2.bA),
								A2($author$project$Internal$VertexBuffer$get, v2b, convex2.bA));
							var dir1 = A2(
								$author$project$Internal$Vector3$direction,
								A2($author$project$Internal$VertexBuffer$get, v1a, convex1.bA),
								A2($author$project$Internal$VertexBuffer$get, v1b, convex1.bA));
							var cross = A2($author$project$Internal$Vector3$cross, dir1, dir2);
							if ($author$project$Internal$Vector3$almostZero(cross)) {
								var $temp$convex1 = convex1,
									$temp$convex2 = convex2,
									$temp$initGroups2 = initGroups2,
									$temp$groups1 = groups1,
									$temp$groups2 = remainingGroups2,
									$temp$dir1Idx = dir1Idx,
									$temp$dir2Idx = dir2Idx + 1,
									$temp$best = best,
									$temp$dmin = dmin;
								convex1 = $temp$convex1;
								convex2 = $temp$convex2;
								initGroups2 = $temp$initGroups2;
								groups1 = $temp$groups1;
								groups2 = $temp$groups2;
								dir1Idx = $temp$dir1Idx;
								dir2Idx = $temp$dir2Idx;
								best = $temp$best;
								dmin = $temp$dmin;
								continue findEdgeSATHelp;
							} else {
								var normalizedCross = $author$project$Internal$Vector3$normalize(cross);
								var _v4 = A3($author$project$Collision$ConvexConvex$testSeparatingAxis, convex1, convex2, normalizedCross);
								if (_v4.$ === 1) {
									return $author$project$Collision$ConvexConvex$edgeSeparates;
								} else {
									var dist = _v4.a;
									if ((dist - dmin) < 0) {
										var $temp$convex1 = convex1,
											$temp$convex2 = convex2,
											$temp$initGroups2 = initGroups2,
											$temp$groups1 = groups1,
											$temp$groups2 = remainingGroups2,
											$temp$dir1Idx = dir1Idx,
											$temp$dir2Idx = dir2Idx + 1,
											$temp$best = A5($author$project$Collision$ConvexConvex$EdgeBeats, normalizedCross, dir1Idx, group1, dir2Idx, group2),
											$temp$dmin = dist;
										convex1 = $temp$convex1;
										convex2 = $temp$convex2;
										initGroups2 = $temp$initGroups2;
										groups1 = $temp$groups1;
										groups2 = $temp$groups2;
										dir1Idx = $temp$dir1Idx;
										dir2Idx = $temp$dir2Idx;
										best = $temp$best;
										dmin = $temp$dmin;
										continue findEdgeSATHelp;
									} else {
										var $temp$convex1 = convex1,
											$temp$convex2 = convex2,
											$temp$initGroups2 = initGroups2,
											$temp$groups1 = groups1,
											$temp$groups2 = remainingGroups2,
											$temp$dir1Idx = dir1Idx,
											$temp$dir2Idx = dir2Idx + 1,
											$temp$best = best,
											$temp$dmin = dmin;
										convex1 = $temp$convex1;
										convex2 = $temp$convex2;
										initGroups2 = $temp$initGroups2;
										groups1 = $temp$groups1;
										groups2 = $temp$groups2;
										dir1Idx = $temp$dir1Idx;
										dir2Idx = $temp$dir2Idx;
										best = $temp$best;
										dmin = $temp$dmin;
										continue findEdgeSATHelp;
									}
								}
							}
						} else {
							var remainingGroups2 = groups2.b;
							var $temp$convex1 = convex1,
								$temp$convex2 = convex2,
								$temp$initGroups2 = initGroups2,
								$temp$groups1 = groups1,
								$temp$groups2 = remainingGroups2,
								$temp$dir1Idx = dir1Idx,
								$temp$dir2Idx = dir2Idx + 1,
								$temp$best = best,
								$temp$dmin = dmin;
							convex1 = $temp$convex1;
							convex2 = $temp$convex2;
							initGroups2 = $temp$initGroups2;
							groups1 = $temp$groups1;
							groups2 = $temp$groups2;
							dir1Idx = $temp$dir1Idx;
							dir2Idx = $temp$dir2Idx;
							best = $temp$best;
							dmin = $temp$dmin;
							continue findEdgeSATHelp;
						}
					}
				} else {
					var remainingGroups1 = groups1.b;
					var $temp$convex1 = convex1,
						$temp$convex2 = convex2,
						$temp$initGroups2 = initGroups2,
						$temp$groups1 = remainingGroups1,
						$temp$groups2 = groups2,
						$temp$dir1Idx = dir1Idx + 1,
						$temp$dir2Idx = dir2Idx,
						$temp$best = best,
						$temp$dmin = dmin;
					convex1 = $temp$convex1;
					convex2 = $temp$convex2;
					initGroups2 = $temp$initGroups2;
					groups1 = $temp$groups1;
					groups2 = $temp$groups2;
					dir1Idx = $temp$dir1Idx;
					dir2Idx = $temp$dir2Idx;
					best = $temp$best;
					dmin = $temp$dmin;
					continue findEdgeSATHelp;
				}
			}
		}
	});
var $author$project$Collision$ConvexConvex$NoEdgeBeats = F5(
	function (a, b, c, d, e) {
		return {$: 2, a: a, b: b, c: c, d: d, e: e};
	});
var $author$project$Collision$ConvexConvex$noEdgeBeats = A5($author$project$Collision$ConvexConvex$NoEdgeBeats, 0, 0, 0, 0, 0);
var $author$project$Collision$ConvexConvex$findEdgeSAT = F3(
	function (convex1, convex2, faceDmin) {
		return A9($author$project$Collision$ConvexConvex$findEdgeSATHelp, convex1, convex2, convex2.gR, convex1.gR, convex2.gR, 1, 1, $author$project$Collision$ConvexConvex$noEdgeBeats, faceDmin / $author$project$Collision$ConvexConvex$edgeBiasFactor);
	});
var $author$project$Collision$ConvexConvex$Convex1 = 0;
var $author$project$Collision$ConvexConvex$emptyGroup = A6($author$project$Shapes$Convex$OneSidedFace, $author$project$Internal$Vector3$zero, _List_Nil, 0, 0, 0, 0);
var $author$project$Collision$ConvexConvex$Convex2 = 1;
var $author$project$Collision$ConvexConvex$faceExtent = F3(
	function (axis, group, convex) {
		if (group.$ === 1) {
			var faceDist = group.c;
			var partnerDist = group.f;
			var posDot = A2($author$project$Internal$Vector3$dot, axis, convex.gs);
			return {hN: faceDist + posDot, hS: partnerDist + posDot};
		} else {
			return A4(
				$author$project$Collision$ConvexConvex$project,
				axis,
				$author$project$Internal$Const$maxNumber,
				-$author$project$Internal$Const$maxNumber,
				$author$project$Shapes$Convex$convexVertices(convex));
		}
	});
var $author$project$Collision$ConvexConvex$testFaceSeparatingAxis = F4(
	function (convex1, convex2, owningSide, group) {
		var axis = $author$project$Shapes$Convex$faceGroupNormal(group);
		if (!owningSide) {
			return A2(
				$author$project$Collision$ConvexConvex$overlap,
				A3($author$project$Collision$ConvexConvex$faceExtent, axis, group, convex1),
				A2($author$project$Collision$ConvexConvex$projectConvex, axis, convex2));
		} else {
			return A2(
				$author$project$Collision$ConvexConvex$overlap,
				A2($author$project$Collision$ConvexConvex$projectConvex, axis, convex1),
				A3($author$project$Collision$ConvexConvex$faceExtent, axis, group, convex2));
		}
	});
var $author$project$Collision$ConvexConvex$findFaceSATHelp = function (convex1) {
	return function (convex2) {
		return function (currentSide) {
			return function (normals) {
				return function (nextNormals) {
					return function (nextGroupIdx) {
						return function (winnerIdx) {
							return function (winnerSide) {
								return function (winnerGroup) {
									return function (dmin) {
										findFaceSATHelp:
										while (true) {
											if (!normals.b) {
												if (!nextNormals.b) {
													return _Utils_eq(winnerIdx, -1) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
														{
															eS: $author$project$Shapes$Convex$faceGroupNormal(winnerGroup),
															cN: dmin,
															dX: winnerSide,
															cS: winnerGroup,
															cT: winnerIdx
														});
												} else {
													var $temp$convex1 = convex1,
														$temp$convex2 = convex2,
														$temp$currentSide = 1,
														$temp$normals = nextNormals,
														$temp$nextNormals = _List_Nil,
														$temp$nextGroupIdx = 1,
														$temp$winnerIdx = winnerIdx,
														$temp$winnerSide = winnerSide,
														$temp$winnerGroup = winnerGroup,
														$temp$dmin = dmin;
													convex1 = $temp$convex1;
													convex2 = $temp$convex2;
													currentSide = $temp$currentSide;
													normals = $temp$normals;
													nextNormals = $temp$nextNormals;
													nextGroupIdx = $temp$nextGroupIdx;
													winnerIdx = $temp$winnerIdx;
													winnerSide = $temp$winnerSide;
													winnerGroup = $temp$winnerGroup;
													dmin = $temp$dmin;
													continue findFaceSATHelp;
												}
											} else {
												var group = normals.a;
												var restNormals = normals.b;
												var _v2 = A4($author$project$Collision$ConvexConvex$testFaceSeparatingAxis, convex1, convex2, currentSide, group);
												if (_v2.$ === 1) {
													return $elm$core$Maybe$Nothing;
												} else {
													var dist = _v2.a;
													var groupSize = function () {
														if (group.$ === 1) {
															return 2;
														} else {
															return 1;
														}
													}();
													if ((dist - dmin) < 0) {
														var $temp$convex1 = convex1,
															$temp$convex2 = convex2,
															$temp$currentSide = currentSide,
															$temp$normals = restNormals,
															$temp$nextNormals = nextNormals,
															$temp$nextGroupIdx = nextGroupIdx + groupSize,
															$temp$winnerIdx = nextGroupIdx,
															$temp$winnerSide = currentSide,
															$temp$winnerGroup = group,
															$temp$dmin = dist;
														convex1 = $temp$convex1;
														convex2 = $temp$convex2;
														currentSide = $temp$currentSide;
														normals = $temp$normals;
														nextNormals = $temp$nextNormals;
														nextGroupIdx = $temp$nextGroupIdx;
														winnerIdx = $temp$winnerIdx;
														winnerSide = $temp$winnerSide;
														winnerGroup = $temp$winnerGroup;
														dmin = $temp$dmin;
														continue findFaceSATHelp;
													} else {
														var $temp$convex1 = convex1,
															$temp$convex2 = convex2,
															$temp$currentSide = currentSide,
															$temp$normals = restNormals,
															$temp$nextNormals = nextNormals,
															$temp$nextGroupIdx = nextGroupIdx + groupSize,
															$temp$winnerIdx = winnerIdx,
															$temp$winnerSide = winnerSide,
															$temp$winnerGroup = winnerGroup,
															$temp$dmin = dmin;
														convex1 = $temp$convex1;
														convex2 = $temp$convex2;
														currentSide = $temp$currentSide;
														normals = $temp$normals;
														nextNormals = $temp$nextNormals;
														nextGroupIdx = $temp$nextGroupIdx;
														winnerIdx = $temp$winnerIdx;
														winnerSide = $temp$winnerSide;
														winnerGroup = $temp$winnerGroup;
														dmin = $temp$dmin;
														continue findFaceSATHelp;
													}
												}
											}
										}
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Collision$ConvexConvex$findFaceSAT = F2(
	function (convex1, convex2) {
		return $author$project$Collision$ConvexConvex$findFaceSATHelp(convex1)(convex2)(0)(convex1.e9)(convex2.e9)(1)(-1)(0)($author$project$Collision$ConvexConvex$emptyGroup)($author$project$Internal$Const$maxNumber);
	});
var $author$project$Collision$ConvexConvex$addContacts = F4(
	function (shapeKey, convex1, convex2, contacts) {
		var _v0 = A2($author$project$Collision$ConvexConvex$findFaceSAT, convex1, convex2);
		if (_v0.$ === 1) {
			return contacts;
		} else {
			var winner = _v0.a;
			var _v1 = A3($author$project$Collision$ConvexConvex$findEdgeSAT, convex1, convex2, winner.cN);
			switch (_v1.$) {
				case 0:
					return contacts;
				case 1:
					var edgeAxis = _v1.a;
					var dir1Idx = _v1.b;
					var edges1 = _v1.c;
					var dir2Idx = _v1.d;
					var edges2 = _v1.e;
					return A9(
						$author$project$Collision$ConvexConvex$addEdgeContact,
						shapeKey,
						A3($author$project$Collision$ConvexConvex$orientAxis, convex1, convex2, edgeAxis),
						dir1Idx,
						edges1,
						convex1.bA,
						dir2Idx,
						edges2,
						convex2.bA,
						contacts);
				default:
					return A5($author$project$Collision$ConvexConvex$dispatchBestFaces, shapeKey, convex1, convex2, winner, contacts);
			}
		}
	});
var $author$project$Collision$ParticleConvex$convexContact = function (shapeKey) {
	return function (orderContact) {
		return function (buffer) {
			return function (particlePosition) {
				return function (currentFace) {
					return function (nextFace) {
						return function (queuedGroups) {
							return function (bestDepth) {
								return function (bestNormal) {
									return function (contacts) {
										convexContact:
										while (true) {
											var point = function () {
												var _v5 = currentFace.bB;
												if (_v5.b) {
													var first = _v5.a;
													return A2($author$project$Internal$VertexBuffer$get, first, buffer);
												} else {
													return $author$project$Internal$Vector3$zero;
												}
											}();
											var dot = A2(
												$author$project$Internal$Vector3$dot,
												currentFace.c8,
												A2($author$project$Internal$Vector3$sub, point, particlePosition));
											if (dot >= 0) {
												var _v0 = ((dot - bestDepth) < 0) ? _Utils_Tuple2(dot, currentFace.c8) : _Utils_Tuple2(bestDepth, bestNormal);
												var newDepth = _v0.a;
												var newNormal = _v0.b;
												if (!nextFace.$) {
													var face = nextFace.a;
													var $temp$shapeKey = shapeKey,
														$temp$orderContact = orderContact,
														$temp$buffer = buffer,
														$temp$particlePosition = particlePosition,
														$temp$currentFace = face,
														$temp$nextFace = $elm$core$Maybe$Nothing,
														$temp$queuedGroups = queuedGroups,
														$temp$bestDepth = newDepth,
														$temp$bestNormal = newNormal,
														$temp$contacts = contacts;
													shapeKey = $temp$shapeKey;
													orderContact = $temp$orderContact;
													buffer = $temp$buffer;
													particlePosition = $temp$particlePosition;
													currentFace = $temp$currentFace;
													nextFace = $temp$nextFace;
													queuedGroups = $temp$queuedGroups;
													bestDepth = $temp$bestDepth;
													bestNormal = $temp$bestNormal;
													contacts = $temp$contacts;
													continue convexContact;
												} else {
													if (queuedGroups.b) {
														if (!queuedGroups.a.$) {
															var _v3 = queuedGroups.a;
															var n = _v3.a;
															var i = _v3.b;
															var restGroups = queuedGroups.b;
															var $temp$shapeKey = shapeKey,
																$temp$orderContact = orderContact,
																$temp$buffer = buffer,
																$temp$particlePosition = particlePosition,
																$temp$currentFace = {c8: n, bB: i},
																$temp$nextFace = $elm$core$Maybe$Nothing,
																$temp$queuedGroups = restGroups,
																$temp$bestDepth = newDepth,
																$temp$bestNormal = newNormal,
																$temp$contacts = contacts;
															shapeKey = $temp$shapeKey;
															orderContact = $temp$orderContact;
															buffer = $temp$buffer;
															particlePosition = $temp$particlePosition;
															currentFace = $temp$currentFace;
															nextFace = $temp$nextFace;
															queuedGroups = $temp$queuedGroups;
															bestDepth = $temp$bestDepth;
															bestNormal = $temp$bestNormal;
															contacts = $temp$contacts;
															continue convexContact;
														} else {
															var _v4 = queuedGroups.a;
															var n1 = _v4.a;
															var i1 = _v4.b;
															var n2 = _v4.d;
															var i2 = _v4.e;
															var restGroups = queuedGroups.b;
															var $temp$shapeKey = shapeKey,
																$temp$orderContact = orderContact,
																$temp$buffer = buffer,
																$temp$particlePosition = particlePosition,
																$temp$currentFace = {c8: n1, bB: i1},
																$temp$nextFace = $elm$core$Maybe$Just(
																{c8: n2, bB: i2}),
																$temp$queuedGroups = restGroups,
																$temp$bestDepth = newDepth,
																$temp$bestNormal = newNormal,
																$temp$contacts = contacts;
															shapeKey = $temp$shapeKey;
															orderContact = $temp$orderContact;
															buffer = $temp$buffer;
															particlePosition = $temp$particlePosition;
															currentFace = $temp$currentFace;
															nextFace = $temp$nextFace;
															queuedGroups = $temp$queuedGroups;
															bestDepth = $temp$bestDepth;
															bestNormal = $temp$bestNormal;
															contacts = $temp$contacts;
															continue convexContact;
														}
													} else {
														return ((newDepth - $author$project$Internal$Const$maxNumber) < 0) ? A2(
															$elm$core$List$cons,
															orderContact(
																{
																	ht: $author$project$Internal$ContactId$simple,
																	hV: $author$project$Internal$Vector3$negate(newNormal),
																	h$: particlePosition,
																	h0: A2(
																		$author$project$Internal$Vector3$add,
																		particlePosition,
																		A2($author$project$Internal$Vector3$scale, newDepth, newNormal)),
																	h6: shapeKey
																}),
															contacts) : contacts;
													}
												}
											} else {
												return contacts;
											}
										}
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Collision$ParticleConvex$addContacts = F5(
	function (shapeKey, orderContact, particlePosition, _v0, contacts) {
		var vertexBuffer = _v0.bA;
		var faces = _v0.e9;
		if (faces.b) {
			if (!faces.a.$) {
				var _v2 = faces.a;
				var n = _v2.a;
				var i = _v2.b;
				var rest = faces.b;
				return $author$project$Collision$ParticleConvex$convexContact(shapeKey)(orderContact)(vertexBuffer)(particlePosition)(
					{c8: n, bB: i})($elm$core$Maybe$Nothing)(rest)($author$project$Internal$Const$maxNumber)($author$project$Internal$Vector3$zero)(contacts);
			} else {
				var _v3 = faces.a;
				var n1 = _v3.a;
				var i1 = _v3.b;
				var n2 = _v3.d;
				var i2 = _v3.e;
				var rest = faces.b;
				return $author$project$Collision$ParticleConvex$convexContact(shapeKey)(orderContact)(vertexBuffer)(particlePosition)(
					{c8: n1, bB: i1})(
					$elm$core$Maybe$Just(
						{c8: n2, bB: i2}))(rest)($author$project$Internal$Const$maxNumber)($author$project$Internal$Vector3$zero)(contacts);
			}
		} else {
			return contacts;
		}
	});
var $author$project$Collision$PlaneCapsule$addCapContact = F8(
	function (shapeKey, featureKey, orderContact, normal, planePosition, radius, ep, contacts) {
		var vertex = {n: ep.n - (radius * normal.n), o: ep.o - (radius * normal.o), p: ep.p - (radius * normal.p)};
		var dot = (((vertex.n - planePosition.n) * normal.n) + ((vertex.o - planePosition.o) * normal.o)) + ((vertex.p - planePosition.p) * normal.p);
		return ((dot - $author$project$Internal$Const$contactBreakingThreshold) < 0) ? A2(
			$elm$core$List$cons,
			orderContact(
				{
					ht: featureKey,
					hV: normal,
					h$: {n: vertex.n - (dot * normal.n), o: vertex.o - (dot * normal.o), p: vertex.p - (dot * normal.p)},
					h0: vertex,
					h6: shapeKey
				}),
			contacts) : contacts;
	});
var $author$project$Internal$ContactId$tagPlaneCap = 4;
var $author$project$Internal$ContactId$planeCapEnd = function (endpoint) {
	return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagPlaneCap, endpoint, 0, 0, 0);
};
var $author$project$Collision$PlaneCapsule$addContacts = F5(
	function (shapeKey, orderContact, _v0, capsule, contacts) {
		var position = _v0.gs;
		var normal = _v0.c8;
		var ep2 = {n: capsule.gs.n + (capsule.fs * capsule.eS.n), o: capsule.gs.o + (capsule.fs * capsule.eS.o), p: capsule.gs.p + (capsule.fs * capsule.eS.p)};
		var ep1 = {n: capsule.gs.n - (capsule.fs * capsule.eS.n), o: capsule.gs.o - (capsule.fs * capsule.eS.o), p: capsule.gs.p - (capsule.fs * capsule.eS.p)};
		var contacts1 = A8(
			$author$project$Collision$PlaneCapsule$addCapContact,
			shapeKey,
			$author$project$Internal$ContactId$planeCapEnd(1),
			orderContact,
			normal,
			position,
			capsule.dj,
			ep1,
			contacts);
		return A8(
			$author$project$Collision$PlaneCapsule$addCapContact,
			shapeKey,
			$author$project$Internal$ContactId$planeCapEnd(2),
			orderContact,
			normal,
			position,
			capsule.dj,
			ep2,
			contacts1);
	});
var $author$project$Internal$ContactId$tagPlaneVertex = 3;
var $author$project$Internal$ContactId$planeVertex = function (v) {
	return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagPlaneVertex, v, 0, 0, 0);
};
var $author$project$Collision$PlaneConvex$emitPlaneContacts = F6(
	function (shapeKey, orderContact, planePosition, planeNormal, points, contacts) {
		emitPlaneContacts:
		while (true) {
			if (points.b) {
				var _v1 = points.a;
				var vertexId = _v1.a;
				var vertex = _v1.b;
				var rest = points.b;
				var dot = (((vertex.n - planePosition.n) * planeNormal.n) + ((vertex.o - planePosition.o) * planeNormal.o)) + ((vertex.p - planePosition.p) * planeNormal.p);
				var $temp$shapeKey = shapeKey,
					$temp$orderContact = orderContact,
					$temp$planePosition = planePosition,
					$temp$planeNormal = planeNormal,
					$temp$points = rest,
					$temp$contacts = A2(
					$elm$core$List$cons,
					orderContact(
						{
							ht: $author$project$Internal$ContactId$planeVertex(vertexId),
							hV: planeNormal,
							h$: {n: vertex.n - (dot * planeNormal.n), o: vertex.o - (dot * planeNormal.o), p: vertex.p - (dot * planeNormal.p)},
							h0: vertex,
							h6: shapeKey
						}),
					contacts);
				shapeKey = $temp$shapeKey;
				orderContact = $temp$orderContact;
				planePosition = $temp$planePosition;
				planeNormal = $temp$planeNormal;
				points = $temp$points;
				contacts = $temp$contacts;
				continue emitPlaneContacts;
			} else {
				return contacts;
			}
		}
	});
var $author$project$Collision$PlaneConvex$addContacts = F5(
	function (shapeKey, orderContact, plane, convex, contacts) {
		var _v0 = convex.hX;
		if (!_v0.$) {
			var ax = _v0.a;
			var ay = _v0.b;
			var az = _v0.c;
			var he = _v0.d;
			var planePosition = plane.gs;
			var planeNormal = plane.c8;
			var center = convex.gs;
			var emit = F5(
				function (sx, sy, sz, vertexId, acc) {
					var vz = ((center.p + ((sx * he.n) * ax.p)) + ((sy * he.o) * ay.p)) + ((sz * he.p) * az.p);
					var vy = ((center.o + ((sx * he.n) * ax.o)) + ((sy * he.o) * ay.o)) + ((sz * he.p) * az.o);
					var vx = ((center.n + ((sx * he.n) * ax.n)) + ((sy * he.o) * ay.n)) + ((sz * he.p) * az.n);
					var dot = (((vx - planePosition.n) * planeNormal.n) + ((vy - planePosition.o) * planeNormal.o)) + ((vz - planePosition.p) * planeNormal.p);
					return ((dot - $author$project$Internal$Const$contactBreakingThreshold) < 0) ? A2(
						$elm$core$List$cons,
						orderContact(
							{
								ht: $author$project$Internal$ContactId$planeVertex(vertexId),
								hV: planeNormal,
								h$: {n: vx - (dot * planeNormal.n), o: vy - (dot * planeNormal.o), p: vz - (dot * planeNormal.p)},
								h0: {n: vx, o: vy, p: vz},
								h6: shapeKey
							}),
						acc) : acc;
				});
			return A5(
				emit,
				-1,
				-1,
				-1,
				8,
				A5(
					emit,
					-1,
					-1,
					1,
					7,
					A5(
						emit,
						-1,
						1,
						-1,
						6,
						A5(
							emit,
							-1,
							1,
							1,
							5,
							A5(
								emit,
								1,
								-1,
								-1,
								4,
								A5(
									emit,
									1,
									-1,
									1,
									3,
									A5(
										emit,
										1,
										1,
										-1,
										2,
										A5(emit, 1, 1, 1, 1, contacts))))))));
		} else {
			var vertices = _v0.a;
			return A6(
				$author$project$Collision$PlaneConvex$emitPlaneContacts,
				shapeKey,
				orderContact,
				plane.gs,
				plane.c8,
				A3(
					$author$project$Internal$Manifold$reduce,
					plane.c8,
					-A2($author$project$Internal$Vector3$dot, plane.c8, plane.gs),
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (i, v) {
								return _Utils_Tuple2(i + 1, v);
							}),
						vertices)),
				contacts);
		}
	});
var $author$project$Collision$PlaneParticle$addContacts = F5(
	function (shapeKey, orderContact, _v0, particlePosition, contacts) {
		var normal = _v0.c8;
		var position = _v0.gs;
		var dot = (((particlePosition.n - position.n) * normal.n) + ((particlePosition.o - position.o) * normal.o)) + ((particlePosition.p - position.p) * normal.p);
		return ((dot - $author$project$Internal$Const$contactBreakingThreshold) < 0) ? A2(
			$elm$core$List$cons,
			orderContact(
				{
					ht: $author$project$Internal$ContactId$simple,
					hV: normal,
					h$: {n: particlePosition.n - (dot * normal.n), o: particlePosition.o - (dot * normal.o), p: particlePosition.p - (dot * normal.p)},
					h0: particlePosition,
					h6: shapeKey
				}),
			contacts) : contacts;
	});
var $author$project$Collision$PlaneSphere$addContacts = F5(
	function (shapeKey, orderContact, _v0, sphere, contacts) {
		var position = _v0.gs;
		var normal = _v0.c8;
		var _v1 = sphere.gs;
		var z = _v1.p;
		var y = _v1.o;
		var x = _v1.n;
		var vertex = {n: x - (sphere.dj * normal.n), o: y - (sphere.dj * normal.o), p: z - (sphere.dj * normal.p)};
		var dot = (((vertex.n - position.n) * normal.n) + ((vertex.o - position.o) * normal.o)) + ((vertex.p - position.p) * normal.p);
		return ((dot - $author$project$Internal$Const$contactBreakingThreshold) < 0) ? A2(
			$elm$core$List$cons,
			orderContact(
				{
					ht: $author$project$Internal$ContactId$simple,
					hV: normal,
					h$: {n: vertex.n - (dot * normal.n), o: vertex.o - (dot * normal.o), p: vertex.p - (dot * normal.p)},
					h0: vertex,
					h6: shapeKey
				}),
			contacts) : contacts;
	});
var $author$project$Collision$SphereConvex$classifyAndCollectEdgesHelp = F6(
	function (center, normal, firstVertex, vertices, candidateEdges, anyOutside) {
		classifyAndCollectEdgesHelp:
		while (true) {
			if (vertices.b) {
				var v1 = vertices.a;
				var rest1 = vertices.b;
				var v2 = function () {
					if (!rest1.b) {
						return firstVertex;
					} else {
						var next = rest1.a;
						return next;
					}
				}();
				var edgeZ = v2.p - v1.p;
				var edgeY = v2.o - v1.o;
				var edgeX = v2.n - v1.n;
				var cnZ = (normal.n * edgeY) - (normal.o * edgeX);
				var cnY = (normal.p * edgeX) - (normal.n * edgeZ);
				var cnX = (normal.o * edgeZ) - (normal.p * edgeY);
				var d = ((cnX * (v1.n - center.n)) + (cnY * (v1.o - center.o))) + (cnZ * (v1.p - center.p));
				if (d > 0) {
					var $temp$center = center,
						$temp$normal = normal,
						$temp$firstVertex = firstVertex,
						$temp$vertices = rest1,
						$temp$candidateEdges = A2(
						$elm$core$List$cons,
						_Utils_Tuple2(v1, v2),
						candidateEdges),
						$temp$anyOutside = true;
					center = $temp$center;
					normal = $temp$normal;
					firstVertex = $temp$firstVertex;
					vertices = $temp$vertices;
					candidateEdges = $temp$candidateEdges;
					anyOutside = $temp$anyOutside;
					continue classifyAndCollectEdgesHelp;
				} else {
					var $temp$center = center,
						$temp$normal = normal,
						$temp$firstVertex = firstVertex,
						$temp$vertices = rest1,
						$temp$candidateEdges = candidateEdges,
						$temp$anyOutside = anyOutside;
					center = $temp$center;
					normal = $temp$normal;
					firstVertex = $temp$firstVertex;
					vertices = $temp$vertices;
					candidateEdges = $temp$candidateEdges;
					anyOutside = $temp$anyOutside;
					continue classifyAndCollectEdgesHelp;
				}
			} else {
				return _Utils_Tuple2(anyOutside, candidateEdges);
			}
		}
	});
var $author$project$Collision$SphereConvex$classifyAndCollectEdges = F4(
	function (center, normal, vertices, candidateEdges) {
		if (vertices.b && vertices.b.b) {
			var first = vertices.a;
			var _v1 = vertices.b;
			return A6($author$project$Collision$SphereConvex$classifyAndCollectEdgesHelp, center, normal, first, vertices, candidateEdges, false);
		} else {
			return _Utils_Tuple2(false, candidateEdges);
		}
	});
var $author$project$Collision$SphereConvex$emitContact = F7(
	function (shapeKey, orderContact, featureKey, center, contactPoint, penetration, contacts) {
		var normal = A2($author$project$Internal$Vector3$direction, contactPoint, center);
		return A2(
			$elm$core$List$cons,
			orderContact(
				{
					ht: featureKey,
					hV: normal,
					h$: {n: contactPoint.n + (penetration * normal.n), o: contactPoint.o + (penetration * normal.o), p: contactPoint.p + (penetration * normal.p)},
					h0: contactPoint,
					h6: shapeKey
				}),
			contacts);
	});
var $author$project$Internal$ContactId$tagSphereConvex = 5;
var $author$project$Internal$ContactId$sphereOnConvex = function (convexFeature) {
	return A5($author$project$Internal$ContactId$feature, $author$project$Internal$ContactId$tagSphereConvex, convexFeature, 0, 0, 0);
};
var $author$project$Collision$SphereConvex$walkBoundaries = F8(
	function (shapeKey, orderContact, center, radius, edges, bestPoint, bestDistSq, contacts) {
		walkBoundaries:
		while (true) {
			if (!edges.b) {
				return ((bestDistSq - (radius * radius)) < 0) ? A7(
					$author$project$Collision$SphereConvex$emitContact,
					shapeKey,
					orderContact,
					$author$project$Internal$ContactId$sphereOnConvex($author$project$Internal$ContactId$onConvexVertex),
					center,
					bestPoint,
					radius - $elm$core$Basics$sqrt(bestDistSq),
					contacts) : contacts;
			} else {
				var _v1 = edges.a;
				var prevVertex = _v1.a;
				var vertex = _v1.b;
				var rest = edges.b;
				var edgeZ = vertex.p - prevVertex.p;
				var edgeY = vertex.o - prevVertex.o;
				var edgeX = vertex.n - prevVertex.n;
				var offsetTimesLen = (((center.n - prevVertex.n) * edgeX) + ((center.o - prevVertex.o) * edgeY)) + ((center.p - prevVertex.p) * edgeZ);
				var edgeLenSq = ((edgeX * edgeX) + (edgeY * edgeY)) + (edgeZ * edgeZ);
				if (offsetTimesLen < 0) {
					var distSq = A2($author$project$Internal$Vector3$distanceSquared, prevVertex, center);
					if ((distSq - bestDistSq) < 0) {
						var $temp$shapeKey = shapeKey,
							$temp$orderContact = orderContact,
							$temp$center = center,
							$temp$radius = radius,
							$temp$edges = rest,
							$temp$bestPoint = prevVertex,
							$temp$bestDistSq = distSq,
							$temp$contacts = contacts;
						shapeKey = $temp$shapeKey;
						orderContact = $temp$orderContact;
						center = $temp$center;
						radius = $temp$radius;
						edges = $temp$edges;
						bestPoint = $temp$bestPoint;
						bestDistSq = $temp$bestDistSq;
						contacts = $temp$contacts;
						continue walkBoundaries;
					} else {
						var $temp$shapeKey = shapeKey,
							$temp$orderContact = orderContact,
							$temp$center = center,
							$temp$radius = radius,
							$temp$edges = rest,
							$temp$bestPoint = bestPoint,
							$temp$bestDistSq = bestDistSq,
							$temp$contacts = contacts;
						shapeKey = $temp$shapeKey;
						orderContact = $temp$orderContact;
						center = $temp$center;
						radius = $temp$radius;
						edges = $temp$edges;
						bestPoint = $temp$bestPoint;
						bestDistSq = $temp$bestDistSq;
						contacts = $temp$contacts;
						continue walkBoundaries;
					}
				} else {
					if ((offsetTimesLen - edgeLenSq) > 0) {
						var distSq = A2($author$project$Internal$Vector3$distanceSquared, vertex, center);
						if ((distSq - bestDistSq) < 0) {
							var $temp$shapeKey = shapeKey,
								$temp$orderContact = orderContact,
								$temp$center = center,
								$temp$radius = radius,
								$temp$edges = rest,
								$temp$bestPoint = vertex,
								$temp$bestDistSq = distSq,
								$temp$contacts = contacts;
							shapeKey = $temp$shapeKey;
							orderContact = $temp$orderContact;
							center = $temp$center;
							radius = $temp$radius;
							edges = $temp$edges;
							bestPoint = $temp$bestPoint;
							bestDistSq = $temp$bestDistSq;
							contacts = $temp$contacts;
							continue walkBoundaries;
						} else {
							var $temp$shapeKey = shapeKey,
								$temp$orderContact = orderContact,
								$temp$center = center,
								$temp$radius = radius,
								$temp$edges = rest,
								$temp$bestPoint = bestPoint,
								$temp$bestDistSq = bestDistSq,
								$temp$contacts = contacts;
							shapeKey = $temp$shapeKey;
							orderContact = $temp$orderContact;
							center = $temp$center;
							radius = $temp$radius;
							edges = $temp$edges;
							bestPoint = $temp$bestPoint;
							bestDistSq = $temp$bestDistSq;
							contacts = $temp$contacts;
							continue walkBoundaries;
						}
					} else {
						var fraction = offsetTimesLen / edgeLenSq;
						var contactPoint = {n: prevVertex.n + (fraction * edgeX), o: prevVertex.o + (fraction * edgeY), p: prevVertex.p + (fraction * edgeZ)};
						var distSq = A2($author$project$Internal$Vector3$distanceSquared, contactPoint, center);
						if ((distSq - bestDistSq) < 0) {
							return A7(
								$author$project$Collision$SphereConvex$emitContact,
								shapeKey,
								orderContact,
								$author$project$Internal$ContactId$sphereOnConvex($author$project$Internal$ContactId$onConvexEdge),
								center,
								contactPoint,
								radius - $elm$core$Basics$sqrt(distSq),
								contacts);
						} else {
							var $temp$shapeKey = shapeKey,
								$temp$orderContact = orderContact,
								$temp$center = center,
								$temp$radius = radius,
								$temp$edges = rest,
								$temp$bestPoint = bestPoint,
								$temp$bestDistSq = bestDistSq,
								$temp$contacts = contacts;
							shapeKey = $temp$shapeKey;
							orderContact = $temp$orderContact;
							center = $temp$center;
							radius = $temp$radius;
							edges = $temp$edges;
							bestPoint = $temp$bestPoint;
							bestDistSq = $temp$bestDistSq;
							contacts = $temp$contacts;
							continue walkBoundaries;
						}
					}
				}
			}
		}
	});
var $author$project$Collision$SphereConvex$walkFaces = function (shapeKey) {
	return function (orderContact) {
		return function (buffer) {
			return function (center) {
				return function (radius) {
					return function (currentFace) {
						return function (currentFaceId) {
							return function (nextFace) {
								return function (queuedGroups) {
									return function (candidateEdges) {
										return function (contacts) {
											walkFaces:
											while (true) {
												var faceVerts = A2($author$project$Shapes$Convex$faceVertices, buffer, currentFace);
												var faceDistance = function () {
													if (faceVerts.b) {
														var first = faceVerts.a;
														return ((currentFace.c8.n * (center.n - first.n)) + (currentFace.c8.o * (center.o - first.o))) + (currentFace.c8.p * (center.p - first.p));
													} else {
														return -1;
													}
												}();
												if ((faceDistance > 0) && ((faceDistance - radius) < 0)) {
													var _v0 = A4($author$project$Collision$SphereConvex$classifyAndCollectEdges, center, currentFace.c8, faceVerts, candidateEdges);
													var anyOutside = _v0.a;
													var newCandidateEdges = _v0.b;
													if (anyOutside) {
														if (!nextFace.$) {
															var face = nextFace.a;
															var $temp$shapeKey = shapeKey,
																$temp$orderContact = orderContact,
																$temp$buffer = buffer,
																$temp$center = center,
																$temp$radius = radius,
																$temp$currentFace = face,
																$temp$currentFaceId = currentFaceId + 1,
																$temp$nextFace = $elm$core$Maybe$Nothing,
																$temp$queuedGroups = queuedGroups,
																$temp$candidateEdges = newCandidateEdges,
																$temp$contacts = contacts;
															shapeKey = $temp$shapeKey;
															orderContact = $temp$orderContact;
															buffer = $temp$buffer;
															center = $temp$center;
															radius = $temp$radius;
															currentFace = $temp$currentFace;
															currentFaceId = $temp$currentFaceId;
															nextFace = $temp$nextFace;
															queuedGroups = $temp$queuedGroups;
															candidateEdges = $temp$candidateEdges;
															contacts = $temp$contacts;
															continue walkFaces;
														} else {
															if (queuedGroups.b) {
																if (!queuedGroups.a.$) {
																	var _v3 = queuedGroups.a;
																	var n = _v3.a;
																	var i = _v3.b;
																	var restGroups = queuedGroups.b;
																	var $temp$shapeKey = shapeKey,
																		$temp$orderContact = orderContact,
																		$temp$buffer = buffer,
																		$temp$center = center,
																		$temp$radius = radius,
																		$temp$currentFace = {c8: n, bB: i},
																		$temp$currentFaceId = currentFaceId + 1,
																		$temp$nextFace = $elm$core$Maybe$Nothing,
																		$temp$queuedGroups = restGroups,
																		$temp$candidateEdges = newCandidateEdges,
																		$temp$contacts = contacts;
																	shapeKey = $temp$shapeKey;
																	orderContact = $temp$orderContact;
																	buffer = $temp$buffer;
																	center = $temp$center;
																	radius = $temp$radius;
																	currentFace = $temp$currentFace;
																	currentFaceId = $temp$currentFaceId;
																	nextFace = $temp$nextFace;
																	queuedGroups = $temp$queuedGroups;
																	candidateEdges = $temp$candidateEdges;
																	contacts = $temp$contacts;
																	continue walkFaces;
																} else {
																	var _v4 = queuedGroups.a;
																	var n1 = _v4.a;
																	var i1 = _v4.b;
																	var n2 = _v4.d;
																	var i2 = _v4.e;
																	var restGroups = queuedGroups.b;
																	var $temp$shapeKey = shapeKey,
																		$temp$orderContact = orderContact,
																		$temp$buffer = buffer,
																		$temp$center = center,
																		$temp$radius = radius,
																		$temp$currentFace = {c8: n1, bB: i1},
																		$temp$currentFaceId = currentFaceId + 1,
																		$temp$nextFace = $elm$core$Maybe$Just(
																		{c8: n2, bB: i2}),
																		$temp$queuedGroups = restGroups,
																		$temp$candidateEdges = newCandidateEdges,
																		$temp$contacts = contacts;
																	shapeKey = $temp$shapeKey;
																	orderContact = $temp$orderContact;
																	buffer = $temp$buffer;
																	center = $temp$center;
																	radius = $temp$radius;
																	currentFace = $temp$currentFace;
																	currentFaceId = $temp$currentFaceId;
																	nextFace = $temp$nextFace;
																	queuedGroups = $temp$queuedGroups;
																	candidateEdges = $temp$candidateEdges;
																	contacts = $temp$contacts;
																	continue walkFaces;
																}
															} else {
																return A8($author$project$Collision$SphereConvex$walkBoundaries, shapeKey, orderContact, center, radius, newCandidateEdges, $author$project$Internal$Vector3$zero, radius * radius, contacts);
															}
														}
													} else {
														return A7(
															$author$project$Collision$SphereConvex$emitContact,
															shapeKey,
															orderContact,
															$author$project$Internal$ContactId$sphereOnConvex(
																$author$project$Internal$ContactId$onConvexFace(currentFaceId)),
															center,
															{n: center.n - (faceDistance * currentFace.c8.n), o: center.o - (faceDistance * currentFace.c8.o), p: center.p - (faceDistance * currentFace.c8.p)},
															radius - faceDistance,
															contacts);
													}
												} else {
													if (!nextFace.$) {
														var face = nextFace.a;
														var $temp$shapeKey = shapeKey,
															$temp$orderContact = orderContact,
															$temp$buffer = buffer,
															$temp$center = center,
															$temp$radius = radius,
															$temp$currentFace = face,
															$temp$currentFaceId = currentFaceId + 1,
															$temp$nextFace = $elm$core$Maybe$Nothing,
															$temp$queuedGroups = queuedGroups,
															$temp$candidateEdges = candidateEdges,
															$temp$contacts = contacts;
														shapeKey = $temp$shapeKey;
														orderContact = $temp$orderContact;
														buffer = $temp$buffer;
														center = $temp$center;
														radius = $temp$radius;
														currentFace = $temp$currentFace;
														currentFaceId = $temp$currentFaceId;
														nextFace = $temp$nextFace;
														queuedGroups = $temp$queuedGroups;
														candidateEdges = $temp$candidateEdges;
														contacts = $temp$contacts;
														continue walkFaces;
													} else {
														if (queuedGroups.b) {
															if (!queuedGroups.a.$) {
																var _v7 = queuedGroups.a;
																var n = _v7.a;
																var i = _v7.b;
																var restGroups = queuedGroups.b;
																var $temp$shapeKey = shapeKey,
																	$temp$orderContact = orderContact,
																	$temp$buffer = buffer,
																	$temp$center = center,
																	$temp$radius = radius,
																	$temp$currentFace = {c8: n, bB: i},
																	$temp$currentFaceId = currentFaceId + 1,
																	$temp$nextFace = $elm$core$Maybe$Nothing,
																	$temp$queuedGroups = restGroups,
																	$temp$candidateEdges = candidateEdges,
																	$temp$contacts = contacts;
																shapeKey = $temp$shapeKey;
																orderContact = $temp$orderContact;
																buffer = $temp$buffer;
																center = $temp$center;
																radius = $temp$radius;
																currentFace = $temp$currentFace;
																currentFaceId = $temp$currentFaceId;
																nextFace = $temp$nextFace;
																queuedGroups = $temp$queuedGroups;
																candidateEdges = $temp$candidateEdges;
																contacts = $temp$contacts;
																continue walkFaces;
															} else {
																var _v8 = queuedGroups.a;
																var n1 = _v8.a;
																var i1 = _v8.b;
																var n2 = _v8.d;
																var i2 = _v8.e;
																var restGroups = queuedGroups.b;
																var $temp$shapeKey = shapeKey,
																	$temp$orderContact = orderContact,
																	$temp$buffer = buffer,
																	$temp$center = center,
																	$temp$radius = radius,
																	$temp$currentFace = {c8: n1, bB: i1},
																	$temp$currentFaceId = currentFaceId + 1,
																	$temp$nextFace = $elm$core$Maybe$Just(
																	{c8: n2, bB: i2}),
																	$temp$queuedGroups = restGroups,
																	$temp$candidateEdges = candidateEdges,
																	$temp$contacts = contacts;
																shapeKey = $temp$shapeKey;
																orderContact = $temp$orderContact;
																buffer = $temp$buffer;
																center = $temp$center;
																radius = $temp$radius;
																currentFace = $temp$currentFace;
																currentFaceId = $temp$currentFaceId;
																nextFace = $temp$nextFace;
																queuedGroups = $temp$queuedGroups;
																candidateEdges = $temp$candidateEdges;
																contacts = $temp$contacts;
																continue walkFaces;
															}
														} else {
															return A8($author$project$Collision$SphereConvex$walkBoundaries, shapeKey, orderContact, center, radius, candidateEdges, $author$project$Internal$Vector3$zero, radius * radius, contacts);
														}
													}
												}
											}
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Collision$SphereConvex$addContacts = F5(
	function (shapeKey, orderContact, _v0, _v1, contacts) {
		var position = _v0.gs;
		var radius = _v0.dj;
		var vertexBuffer = _v1.bA;
		var faces = _v1.e9;
		if (faces.b) {
			if (!faces.a.$) {
				var _v3 = faces.a;
				var n = _v3.a;
				var i = _v3.b;
				var rest = faces.b;
				return $author$project$Collision$SphereConvex$walkFaces(shapeKey)(orderContact)(vertexBuffer)(position)(radius)(
					{c8: n, bB: i})(1)($elm$core$Maybe$Nothing)(rest)(_List_Nil)(contacts);
			} else {
				var _v4 = faces.a;
				var n1 = _v4.a;
				var i1 = _v4.b;
				var n2 = _v4.d;
				var i2 = _v4.e;
				var rest = faces.b;
				return $author$project$Collision$SphereConvex$walkFaces(shapeKey)(orderContact)(vertexBuffer)(position)(radius)(
					{c8: n1, bB: i1})(1)(
					$elm$core$Maybe$Just(
						{c8: n2, bB: i2}))(rest)(_List_Nil)(contacts);
			}
		} else {
			return contacts;
		}
	});
var $author$project$Collision$SphereParticle$addContacts = F5(
	function (shapeKey, orderContact, _v0, particlePosition, contacts) {
		var position = _v0.gs;
		var radius = _v0.dj;
		var normal = A2($author$project$Internal$Vector3$direction, particlePosition, position);
		var distance = A2($author$project$Internal$Vector3$distance, particlePosition, position) - radius;
		return (distance > 0) ? contacts : A2(
			$elm$core$List$cons,
			orderContact(
				{
					ht: $author$project$Internal$ContactId$simple,
					hV: normal,
					h$: A2(
						$author$project$Internal$Vector3$add,
						position,
						A2($author$project$Internal$Vector3$scale, radius - distance, normal)),
					h0: particlePosition,
					h6: shapeKey
				}),
			contacts);
	});
var $author$project$Collision$SphereSphere$addContacts = F4(
	function (shapeKey, sphere1, sphere2, contacts) {
		var radius2 = sphere2.dj;
		var radius1 = sphere1.dj;
		var center2 = sphere2.gs;
		var center1 = sphere1.gs;
		var distance = (A2($author$project$Internal$Vector3$distance, center2, center1) - radius1) - radius2;
		var normal = A2($author$project$Internal$Vector3$direction, center2, center1);
		return (distance > 0) ? contacts : A2(
			$elm$core$List$cons,
			{
				ht: $author$project$Internal$ContactId$simple,
				hV: normal,
				h$: A2(
					$author$project$Internal$Vector3$add,
					center1,
					A2($author$project$Internal$Vector3$scale, radius1 - distance, normal)),
				h0: A2(
					$author$project$Internal$Vector3$add,
					center2,
					A2($author$project$Internal$Vector3$scale, -radius2, normal)),
				h6: shapeKey
			},
			contacts);
	});
var $author$project$Internal$Contact$flip = function (contact) {
	return {
		ht: contact.ht,
		hV: $author$project$Internal$Vector3$negate(contact.hV),
		h$: contact.h0,
		h0: contact.h$,
		h6: contact.h6
	};
};
var $author$project$Internal$NarrowPhase$addRawShapeContacts = F4(
	function (shapeKey, shape1, shape2, contacts) {
		switch (shape1.$) {
			case 0:
				var convex1 = shape1.a;
				switch (shape2.$) {
					case 0:
						var convex2 = shape2.a;
						return A4($author$project$Collision$ConvexConvex$addContacts, shapeKey, convex1, convex2, contacts);
					case 1:
						var plane2 = shape2.a;
						return A5($author$project$Collision$PlaneConvex$addContacts, shapeKey, $author$project$Internal$Contact$flip, plane2, convex1, contacts);
					case 2:
						var sphere2 = shape2.a;
						return A5($author$project$Collision$SphereConvex$addContacts, shapeKey, $author$project$Internal$Contact$flip, sphere2, convex1, contacts);
					case 4:
						var particle2 = shape2.a;
						return A5($author$project$Collision$ParticleConvex$addContacts, shapeKey, $author$project$Internal$Contact$flip, particle2, convex1, contacts);
					default:
						var capsule2 = shape2.a;
						return A5($author$project$Collision$CapsuleConvex$addContacts, shapeKey, $author$project$Internal$Contact$flip, capsule2, convex1, contacts);
				}
			case 1:
				var plane1 = shape1.a;
				switch (shape2.$) {
					case 1:
						return contacts;
					case 0:
						var convex2 = shape2.a;
						return A5($author$project$Collision$PlaneConvex$addContacts, shapeKey, $elm$core$Basics$identity, plane1, convex2, contacts);
					case 2:
						var sphere2 = shape2.a;
						return A5($author$project$Collision$PlaneSphere$addContacts, shapeKey, $elm$core$Basics$identity, plane1, sphere2, contacts);
					case 4:
						var particle2 = shape2.a;
						return A5($author$project$Collision$PlaneParticle$addContacts, shapeKey, $elm$core$Basics$identity, plane1, particle2, contacts);
					default:
						var capsule2 = shape2.a;
						return A5($author$project$Collision$PlaneCapsule$addContacts, shapeKey, $elm$core$Basics$identity, plane1, capsule2, contacts);
				}
			case 2:
				var sphere1 = shape1.a;
				switch (shape2.$) {
					case 1:
						var plane2 = shape2.a;
						return A5($author$project$Collision$PlaneSphere$addContacts, shapeKey, $author$project$Internal$Contact$flip, plane2, sphere1, contacts);
					case 0:
						var convex2 = shape2.a;
						return A5($author$project$Collision$SphereConvex$addContacts, shapeKey, $elm$core$Basics$identity, sphere1, convex2, contacts);
					case 2:
						var sphere2 = shape2.a;
						return A4($author$project$Collision$SphereSphere$addContacts, shapeKey, sphere1, sphere2, contacts);
					case 4:
						var particle2 = shape2.a;
						return A5($author$project$Collision$SphereParticle$addContacts, shapeKey, $elm$core$Basics$identity, sphere1, particle2, contacts);
					default:
						var capsule2 = shape2.a;
						return A5($author$project$Collision$CapsuleSphere$addContacts, shapeKey, $author$project$Internal$Contact$flip, capsule2, sphere1, contacts);
				}
			case 4:
				var particle1 = shape1.a;
				switch (shape2.$) {
					case 1:
						var plane2 = shape2.a;
						return A5($author$project$Collision$PlaneParticle$addContacts, shapeKey, $author$project$Internal$Contact$flip, plane2, particle1, contacts);
					case 0:
						var convex2 = shape2.a;
						return A5($author$project$Collision$ParticleConvex$addContacts, shapeKey, $elm$core$Basics$identity, particle1, convex2, contacts);
					case 2:
						var sphere2 = shape2.a;
						return A5($author$project$Collision$SphereParticle$addContacts, shapeKey, $author$project$Internal$Contact$flip, sphere2, particle1, contacts);
					case 4:
						return contacts;
					default:
						var capsule2 = shape2.a;
						return A5($author$project$Collision$CapsuleParticle$addContacts, shapeKey, $author$project$Internal$Contact$flip, capsule2, particle1, contacts);
				}
			default:
				var capsule1 = shape1.a;
				switch (shape2.$) {
					case 1:
						var plane2 = shape2.a;
						return A5($author$project$Collision$PlaneCapsule$addContacts, shapeKey, $author$project$Internal$Contact$flip, plane2, capsule1, contacts);
					case 0:
						var convex2 = shape2.a;
						return A5($author$project$Collision$CapsuleConvex$addContacts, shapeKey, $elm$core$Basics$identity, capsule1, convex2, contacts);
					case 2:
						var sphere2 = shape2.a;
						return A5($author$project$Collision$CapsuleSphere$addContacts, shapeKey, $elm$core$Basics$identity, capsule1, sphere2, contacts);
					case 3:
						var capsule2 = shape2.a;
						return A4($author$project$Collision$CapsuleCapsule$addContacts, shapeKey, capsule1, capsule2, contacts);
					default:
						var particle2 = shape2.a;
						return A5($author$project$Collision$CapsuleParticle$addContacts, shapeKey, $elm$core$Basics$identity, capsule1, particle2, contacts);
				}
		}
	});
var $author$project$Internal$Material$combineBounciness = F2(
	function (b1, b2) {
		return ((b1 + b2) + $elm$core$Basics$abs(b1 - b2)) * 0.5;
	});
var $author$project$Internal$Material$combineFriction = F2(
	function (f1, f2) {
		return $elm$core$Basics$sqrt(f1 * f2);
	});
var $author$project$Internal$NarrowPhase$addShapeContacts = F4(
	function (shapeKey, _v0, _v1, contacts) {
		var shape1 = _v0.a;
		var mat1 = _v0.b;
		var shape2 = _v1.a;
		var mat2 = _v1.b;
		var rawContacts = A4($author$project$Internal$NarrowPhase$addRawShapeContacts, shapeKey, shape1, shape2, _List_Nil);
		var friction = A2($author$project$Internal$Material$combineFriction, mat1.fe, mat2.fe);
		var bounciness = A2($author$project$Internal$Material$combineBounciness, mat1.eV, mat2.eV);
		return A3(
			$elm$core$List$foldl,
			F2(
				function (contact, acc) {
					return A2(
						$elm$core$List$cons,
						{eV: bounciness, hc: contact, fe: friction},
						acc);
				}),
			contacts,
			rawContacts);
	});
var $author$project$Internal$ContactId$shapeRange = 256;
var $author$project$Internal$ContactId$shapeKey = F2(
	function (shapeId1, shapeId2) {
		return (shapeId1 * $author$project$Internal$ContactId$shapeRange) + shapeId2;
	});
var $author$project$Internal$NarrowPhase$getContactsHelp = F7(
	function (shapeId1, pair1, currentPairs1, shapeId2, currentPairs2, pairs2, result) {
		getContactsHelp:
		while (true) {
			if (currentPairs2.b) {
				var pair2 = currentPairs2.a;
				var remainingPairs2 = currentPairs2.b;
				var $temp$shapeId1 = shapeId1,
					$temp$pair1 = pair1,
					$temp$currentPairs1 = currentPairs1,
					$temp$shapeId2 = shapeId2 + 1,
					$temp$currentPairs2 = remainingPairs2,
					$temp$pairs2 = pairs2,
					$temp$result = A4(
					$author$project$Internal$NarrowPhase$addShapeContacts,
					A2($author$project$Internal$ContactId$shapeKey, shapeId1, shapeId2),
					pair1,
					pair2,
					result);
				shapeId1 = $temp$shapeId1;
				pair1 = $temp$pair1;
				currentPairs1 = $temp$currentPairs1;
				shapeId2 = $temp$shapeId2;
				currentPairs2 = $temp$currentPairs2;
				pairs2 = $temp$pairs2;
				result = $temp$result;
				continue getContactsHelp;
			} else {
				if (currentPairs1.b) {
					var newPair1 = currentPairs1.a;
					var remainingPairs1 = currentPairs1.b;
					var $temp$shapeId1 = shapeId1 + 1,
						$temp$pair1 = newPair1,
						$temp$currentPairs1 = remainingPairs1,
						$temp$shapeId2 = 1,
						$temp$currentPairs2 = pairs2,
						$temp$pairs2 = pairs2,
						$temp$result = result;
					shapeId1 = $temp$shapeId1;
					pair1 = $temp$pair1;
					currentPairs1 = $temp$currentPairs1;
					shapeId2 = $temp$shapeId2;
					currentPairs2 = $temp$currentPairs2;
					pairs2 = $temp$pairs2;
					result = $temp$result;
					continue getContactsHelp;
				} else {
					return result;
				}
			}
		}
	});
var $author$project$Internal$NarrowPhase$getContacts = F2(
	function (pairs1, pairs2) {
		if (pairs1.b) {
			var pair1 = pairs1.a;
			var remainingPairs1 = pairs1.b;
			return A7($author$project$Internal$NarrowPhase$getContactsHelp, 1, pair1, remainingPairs1, 1, pairs2, pairs2, _List_Nil);
		} else {
			return _List_Nil;
		}
	});
var $author$project$Internal$BroadPhase$getPairsHelp = F9(
	function (collide, constrain, anyConstraints, id1, body1, constrainFn1, currentBodies, restBodies, result) {
		getPairsHelp:
		while (true) {
			if (restBodies.b) {
				var _v1 = restBodies.a;
				var id2 = _v1.a;
				var body2 = _v1.b;
				var newRestBodies = restBodies.b;
				var contacts = A5($author$project$Internal$BroadPhase$bodiesMayContact, collide, id1, body1, id2, body2) ? A2($author$project$Internal$NarrowPhase$getContacts, body1.gW, body2.gW) : _List_Nil;
				var constraints = anyConstraints ? A6($author$project$Internal$BroadPhase$constraintsBetween, constrain, constrainFn1, id1, body1, id2, body2) : _List_Nil;
				var newResult = function () {
					if (!contacts.b) {
						if (!constraints.b) {
							return result;
						} else {
							return A2(
								$elm$core$List$cons,
								{eT: body1, eU: body2, e_: constraints, e$: contacts},
								result);
						}
					} else {
						return A2(
							$elm$core$List$cons,
							{eT: body1, eU: body2, e_: constraints, e$: contacts},
							result);
					}
				}();
				var $temp$collide = collide,
					$temp$constrain = constrain,
					$temp$anyConstraints = anyConstraints,
					$temp$id1 = id1,
					$temp$body1 = body1,
					$temp$constrainFn1 = constrainFn1,
					$temp$currentBodies = currentBodies,
					$temp$restBodies = newRestBodies,
					$temp$result = newResult;
				collide = $temp$collide;
				constrain = $temp$constrain;
				anyConstraints = $temp$anyConstraints;
				id1 = $temp$id1;
				body1 = $temp$body1;
				constrainFn1 = $temp$constrainFn1;
				currentBodies = $temp$currentBodies;
				restBodies = $temp$restBodies;
				result = $temp$result;
				continue getPairsHelp;
			} else {
				if (currentBodies.b) {
					var _v5 = currentBodies.a;
					var newId1 = _v5.a;
					var newBody1 = _v5.b;
					var newRestBodies = currentBodies.b;
					var $temp$collide = collide,
						$temp$constrain = constrain,
						$temp$anyConstraints = anyConstraints,
						$temp$id1 = newId1,
						$temp$body1 = newBody1,
						$temp$constrainFn1 = constrain(newId1),
						$temp$currentBodies = newRestBodies,
						$temp$restBodies = newRestBodies,
						$temp$result = result;
					collide = $temp$collide;
					constrain = $temp$constrain;
					anyConstraints = $temp$anyConstraints;
					id1 = $temp$id1;
					body1 = $temp$body1;
					constrainFn1 = $temp$constrainFn1;
					currentBodies = $temp$currentBodies;
					restBodies = $temp$restBodies;
					result = $temp$result;
					continue getPairsHelp;
				} else {
					return result;
				}
			}
		}
	});
var $author$project$Internal$BroadPhase$hasAnyConstraints = F2(
	function (constrain, bodies) {
		hasAnyConstraints:
		while (true) {
			if (!bodies.b) {
				return false;
			} else {
				var _v1 = bodies.a;
				var extId = _v1.a;
				var rest = bodies.b;
				var _v2 = constrain(extId);
				if (!_v2.$) {
					return true;
				} else {
					var $temp$constrain = constrain,
						$temp$bodies = rest;
					constrain = $temp$constrain;
					bodies = $temp$bodies;
					continue hasAnyConstraints;
				}
			}
		}
	});
var $author$project$Internal$BroadPhase$getPairs = F3(
	function (collide, constrain, bodies) {
		if (bodies.b) {
			var _v1 = bodies.a;
			var id1 = _v1.a;
			var body1 = _v1.b;
			var restBodies = bodies.b;
			var anyConstraints = A2($author$project$Internal$BroadPhase$hasAnyConstraints, constrain, bodies);
			return A9(
				$author$project$Internal$BroadPhase$getPairsHelp,
				collide,
				constrain,
				anyConstraints,
				id1,
				body1,
				constrain(id1),
				restBodies,
				restBodies,
				_List_Nil);
		} else {
			return _List_Nil;
		}
	});
var $ianmackenzie$elm_units$Duration$inSeconds = function (_v0) {
	var numSeconds = _v0;
	return numSeconds;
};
var $author$project$Physics$outputBodiesHelp = F3(
	function (integratedBodies, bodies, acc) {
		outputBodiesHelp:
		while (true) {
			if (!bodies.b) {
				return acc;
			} else {
				var _v1 = bodies.a;
				var extId = _v1.a;
				var body = _v1.b;
				var rest = bodies.b;
				var _v2 = A2($elm$core$Array$get, body.bt, integratedBodies);
				if (!_v2.$) {
					var _v3 = _v2.a;
					var integratedBody = _v3.b;
					var $temp$integratedBodies = integratedBodies,
						$temp$bodies = rest,
						$temp$acc = A2(
						$elm$core$List$cons,
						_Utils_Tuple2(extId, integratedBody),
						acc);
					integratedBodies = $temp$integratedBodies;
					bodies = $temp$bodies;
					acc = $temp$acc;
					continue outputBodiesHelp;
				} else {
					var $temp$integratedBodies = integratedBodies,
						$temp$bodies = rest,
						$temp$acc = A2(
						$elm$core$List$cons,
						_Utils_Tuple2(extId, body),
						acc);
					integratedBodies = $temp$integratedBodies;
					bodies = $temp$bodies;
					acc = $temp$acc;
					continue outputBodiesHelp;
				}
			}
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Internal$Solver$applyEquationWarmStart = F4(
	function (solverLambda, jacobian, body1, body2) {
		return (!solverLambda) ? _Utils_Tuple2(body1, body2) : _Utils_Tuple2(
			function () {
				if (body1.dM.fE === 2) {
					var k1 = solverLambda * body1.dM.fB;
					var invI1 = body1.dM.fA;
					return {dM: body1.dM, at: body1.at, w: body1.w - (k1 * jacobian.aA), x: body1.x - (k1 * jacobian.aB), y: body1.y - (k1 * jacobian.aC), z: body1.z + ((((invI1.fN * jacobian.aa) + (invI1.fO * jacobian.ab)) + (invI1.fP * jacobian.ac)) * solverLambda), A: body1.A + ((((invI1.fR * jacobian.aa) + (invI1.fS * jacobian.ab)) + (invI1.fT * jacobian.ac)) * solverLambda), B: body1.B + ((((invI1.fV * jacobian.aa) + (invI1.fW * jacobian.ab)) + (invI1.fX * jacobian.ac)) * solverLambda)};
				} else {
					return body1;
				}
			}(),
			function () {
				if (body2.dM.fE === 2) {
					var k2 = solverLambda * body2.dM.fB;
					var invI2 = body2.dM.fA;
					return {dM: body2.dM, at: body2.at, w: body2.w + (k2 * jacobian.aA), x: body2.x + (k2 * jacobian.aB), y: body2.y + (k2 * jacobian.aC), z: body2.z + ((((invI2.fN * jacobian.ad) + (invI2.fO * jacobian.ae)) + (invI2.fP * jacobian.af)) * solverLambda), A: body2.A + ((((invI2.fR * jacobian.ad) + (invI2.fS * jacobian.ae)) + (invI2.fT * jacobian.af)) * solverLambda), B: body2.B + ((((invI2.fV * jacobian.ad) + (invI2.fW * jacobian.ae)) + (invI2.fX * jacobian.af)) * solverLambda)};
				} else {
					return body2;
				}
			}());
	});
var $author$project$Internal$Solver$applyConstraintsWarmStart = F3(
	function (body1, body2, equations) {
		applyConstraintsWarmStart:
		while (true) {
			if (!equations.b) {
				return _Utils_Tuple2(body1, body2);
			} else {
				var constraint = equations.a;
				var rest = equations.b;
				var _v1 = A4($author$project$Internal$Solver$applyEquationWarmStart, constraint.dq, constraint.cZ, body1, body2);
				var newBody1 = _v1.a;
				var newBody2 = _v1.b;
				var $temp$body1 = newBody1,
					$temp$body2 = newBody2,
					$temp$equations = rest;
				body1 = $temp$body1;
				body2 = $temp$body2;
				equations = $temp$equations;
				continue applyConstraintsWarmStart;
			}
		}
	});
var $author$project$Internal$Solver$applyContactsWarmStart = F3(
	function (body1, body2, contacts) {
		applyContactsWarmStart:
		while (true) {
			if (!contacts.b) {
				return _Utils_Tuple2(body1, body2);
			} else {
				var contact = contacts.a;
				var rest = contacts.b;
				var _v1 = A4($author$project$Internal$Solver$applyEquationWarmStart, contact.ge, contact.e0.c8, body1, body2);
				var b1n = _v1.a;
				var b2n = _v1.b;
				var _v2 = A4($author$project$Internal$Solver$applyEquationWarmStart, contact.fg, contact.e0.ff, b1n, b2n);
				var b1f1 = _v2.a;
				var b2f1 = _v2.b;
				var _v3 = A4($author$project$Internal$Solver$applyEquationWarmStart, contact.fk, contact.e0.fj, b1f1, b2f1);
				var b1f2 = _v3.a;
				var b2f2 = _v3.b;
				var $temp$body1 = b1f2,
					$temp$body2 = b2f2,
					$temp$contacts = rest;
				body1 = $temp$body1;
				body2 = $temp$body2;
				contacts = $temp$contacts;
				continue applyContactsWarmStart;
			}
		}
	});
var $author$project$Internal$Islands$findRoot = F2(
	function (id, parents) {
		findRoot:
		while (true) {
			var _v0 = A2($elm$core$Array$get, id, parents);
			if (!_v0.$) {
				var parent = _v0.a;
				if (!(parent - id)) {
					return _Utils_Tuple2(parents, id);
				} else {
					var _v1 = A2($elm$core$Array$get, parent, parents);
					if (!_v1.$) {
						var grandparent = _v1.a;
						if (!(grandparent - parent)) {
							return _Utils_Tuple2(parents, parent);
						} else {
							var $temp$id = grandparent,
								$temp$parents = A3($elm$core$Array$set, id, grandparent, parents);
							id = $temp$id;
							parents = $temp$parents;
							continue findRoot;
						}
					} else {
						return _Utils_Tuple2(parents, parent);
					}
				}
			} else {
				return _Utils_Tuple2(parents, id);
			}
		}
	});
var $author$project$Internal$Islands$connect = F3(
	function (a, b, parents) {
		var _v0 = A2($author$project$Internal$Islands$findRoot, a, parents);
		var parents1 = _v0.a;
		var rootA = _v0.b;
		var _v1 = A2($author$project$Internal$Islands$findRoot, b, parents1);
		var parents2 = _v1.a;
		var rootB = _v1.b;
		return (!(rootA - rootB)) ? parents2 : (((rootA - rootB) < 0) ? A3($elm$core$Array$set, rootB, rootA, parents2) : A3($elm$core$Array$set, rootA, rootB, parents2));
	});
var $author$project$Internal$Equation$computeContactB = F7(
	function (spookA, spookB, bounciness, _v0, bi, bj, jacobian) {
		var ni = _v0.hV;
		var pj = _v0.h0;
		var pi = _v0.h$;
		var gW = (((bounciness + 1) * (A2($author$project$Internal$Vector3$dot, bj.gS, ni) - A2($author$project$Internal$Vector3$dot, bi.gS, ni))) + (((bj.eR.n * jacobian.ad) + (bj.eR.o * jacobian.ae)) + (bj.eR.p * jacobian.af))) + (((bi.eR.n * jacobian.aa) + (bi.eR.o * jacobian.ab)) + (bi.eR.p * jacobian.ac));
		var g = (((pj.n - pi.n) * ni.n) + ((pj.o - pi.o) * ni.o)) + ((pj.p - pi.p) * ni.p);
		return ((-g) * spookA) - (gW * spookB);
	});
var $author$project$Internal$Equation$computeGiMf = F4(
	function (gravity, bi, bj, jacobian) {
		var gravityj = (bj.fE === 2) ? gravity : $author$project$Internal$Vector3$zero;
		var gravityi = (bi.fE === 2) ? gravity : $author$project$Internal$Vector3$zero;
		return (((((((-(((jacobian.aA * ((bi.fB * bi.fa.n) + gravityi.n)) + (jacobian.aB * ((bi.fB * bi.fa.o) + gravityi.o))) + (jacobian.aC * ((bi.fB * bi.fa.p) + gravityi.p)))) + (((jacobian.aA * ((bj.fB * bj.fa.n) + gravityj.n)) + (jacobian.aB * ((bj.fB * bj.fa.o) + gravityj.o))) + (jacobian.aC * ((bj.fB * bj.fa.p) + gravityj.p)))) + (jacobian.aa * (((bi.fA.fN * bi.gL.n) + (bi.fA.fO * bi.gL.o)) + (bi.fA.fP * bi.gL.p)))) + (jacobian.ab * (((bi.fA.fR * bi.gL.n) + (bi.fA.fS * bi.gL.o)) + (bi.fA.fT * bi.gL.p)))) + (jacobian.ac * (((bi.fA.fV * bi.gL.n) + (bi.fA.fW * bi.gL.o)) + (bi.fA.fX * bi.gL.p)))) + (jacobian.ad * (((bj.fA.fN * bj.gL.n) + (bj.fA.fO * bj.gL.o)) + (bj.fA.fP * bj.gL.p)))) + (jacobian.ae * (((bj.fA.fR * bj.gL.n) + (bj.fA.fS * bj.gL.o)) + (bj.fA.fT * bj.gL.p)))) + (jacobian.af * (((bj.fA.fV * bj.gL.n) + (bj.fA.fW * bj.gL.o)) + (bj.fA.fX * bj.gL.p)));
	});
var $author$project$Internal$Equation$computeSolverB = F5(
	function (ctx, bi, bj, jacobian, velocityB) {
		return velocityB - (ctx.T * A4($author$project$Internal$Equation$computeGiMf, ctx.fq, bi, bj, jacobian));
	});
var $author$project$Internal$Equation$computeGimgt = F3(
	function (bi, bj, jacobian) {
		return ((((((bi.fB + bj.fB) + (jacobian.aa * (((bi.fA.fN * jacobian.aa) + (bi.fA.fO * jacobian.ab)) + (bi.fA.fP * jacobian.ac)))) + (jacobian.ab * (((bi.fA.fR * jacobian.aa) + (bi.fA.fS * jacobian.ab)) + (bi.fA.fT * jacobian.ac)))) + (jacobian.ac * (((bi.fA.fV * jacobian.aa) + (bi.fA.fW * jacobian.ab)) + (bi.fA.fX * jacobian.ac)))) + (jacobian.ad * (((bj.fA.fN * jacobian.ad) + (bj.fA.fO * jacobian.ae)) + (bj.fA.fP * jacobian.af)))) + (jacobian.ae * (((bj.fA.fR * jacobian.ad) + (bj.fA.fS * jacobian.ae)) + (bj.fA.fT * jacobian.af)))) + (jacobian.af * (((bj.fA.fV * jacobian.ad) + (bj.fA.fW * jacobian.ae)) + (bj.fA.fX * jacobian.af)));
	});
var $author$project$Internal$Equation$computeSolverInvC = F4(
	function (spookEps, bi, bj, jacobian) {
		return 1 / (A3($author$project$Internal$Equation$computeGimgt, bi, bj, jacobian) + spookEps);
	});
var $author$project$Internal$Equation$defaultMaxImpulse = 1000000;
var $author$project$Internal$Equation$defaultRelaxation = 3;
var $author$project$Internal$Equation$defaultStiffness = 10000000;
var $author$project$Internal$Equation$addDistanceConstraintEquations = F4(
	function (ctx, body1, body2, distance) {
		var spookEps = 4.0 / (((ctx.T * ctx.T) * $author$project$Internal$Equation$defaultStiffness) * (1 + (4 * $author$project$Internal$Equation$defaultRelaxation)));
		var spookB = (4.0 * $author$project$Internal$Equation$defaultRelaxation) / (1 + (4 * $author$project$Internal$Equation$defaultRelaxation));
		var spookA = 4.0 / (ctx.T * (1 + (4 * $author$project$Internal$Equation$defaultRelaxation)));
		var ni = A2(
			$author$project$Internal$Vector3$direction,
			$author$project$Internal$Transform3d$originPoint(body2.gP),
			$author$project$Internal$Transform3d$originPoint(body1.gP));
		var halfDistance = distance / 2;
		var ri = A2($author$project$Internal$Vector3$scale, halfDistance, ni);
		var rj = A2($author$project$Internal$Vector3$scale, -halfDistance, ni);
		var jacobian = {aA: ni.n, aB: ni.o, aC: ni.p, aa: (ni.o * ri.p) - (ni.p * ri.o), ab: (ni.p * ri.n) - (ni.n * ri.p), ac: (ni.n * ri.o) - (ni.o * ri.n), ad: (rj.o * ni.p) - (rj.p * ni.o), ae: (rj.p * ni.n) - (rj.n * ni.p), af: (rj.n * ni.o) - (rj.o * ni.n)};
		var contact = {
			ht: 0,
			hV: ni,
			h$: A2(
				$author$project$Internal$Vector3$add,
				ri,
				$author$project$Internal$Transform3d$originPoint(body1.gP)),
			h0: A2(
				$author$project$Internal$Vector3$add,
				rj,
				$author$project$Internal$Transform3d$originPoint(body2.gP)),
			h6: 0
		};
		return $elm$core$List$cons(
			{
				cZ: jacobian,
				c5: $author$project$Internal$Equation$defaultMaxImpulse,
				c6: -$author$project$Internal$Equation$defaultMaxImpulse,
				$7: A5(
					$author$project$Internal$Equation$computeSolverB,
					ctx,
					body1,
					body2,
					jacobian,
					A7($author$project$Internal$Equation$computeContactB, spookA, spookB, 0, contact, body1, body2, jacobian)),
				dp: A4($author$project$Internal$Equation$computeSolverInvC, spookEps, body1, body2, jacobian),
				dq: 0,
				b2: spookEps
			});
	});
var $author$project$Internal$Equation$computeGW = F3(
	function (bi, bj, jacobian) {
		return (((-(((jacobian.aA * bi.gS.n) + (jacobian.aB * bi.gS.o)) + (jacobian.aC * bi.gS.p))) + (((jacobian.aa * bi.eR.n) + (jacobian.ab * bi.eR.o)) + (jacobian.ac * bi.eR.p))) + (((jacobian.aA * bj.gS.n) + (jacobian.aB * bj.gS.o)) + (jacobian.aC * bj.gS.p))) + (((jacobian.ad * bj.eR.n) + (jacobian.ae * bj.eR.o)) + (jacobian.af * bj.eR.p));
	});
var $author$project$Internal$Equation$computeRotationalB = F6(
	function (spookA, spookB, _v0, bi, bj, jacobian) {
		var maxAngleCos = _v0.eb;
		var nj = _v0.ee;
		var ni = _v0.hV;
		var gW = A3($author$project$Internal$Equation$computeGW, bi, bj, jacobian);
		var g = maxAngleCos - A2($author$project$Internal$Vector3$dot, ni, nj);
		return ((-g) * spookA) - (gW * spookB);
	});
var $author$project$Internal$Equation$addRotationalEquation = F6(
	function (ctx, body1, body2, ni, nj, equations) {
		var spookEps = 4.0 / (((ctx.T * ctx.T) * $author$project$Internal$Equation$defaultStiffness) * (1 + (4 * $author$project$Internal$Equation$defaultRelaxation)));
		var spookB = (4.0 * $author$project$Internal$Equation$defaultRelaxation) / (1 + (4 * $author$project$Internal$Equation$defaultRelaxation));
		var spookA = 4.0 / (ctx.T * (1 + (4 * $author$project$Internal$Equation$defaultRelaxation)));
		var jacobian = {aA: 0, aB: 0, aC: 0, aa: (nj.o * ni.p) - (nj.p * ni.o), ab: (nj.p * ni.n) - (nj.n * ni.p), ac: (nj.n * ni.o) - (nj.o * ni.n), ad: (ni.o * nj.p) - (ni.p * nj.o), ae: (ni.p * nj.n) - (ni.n * nj.p), af: (ni.n * nj.o) - (ni.o * nj.n)};
		return A2(
			$elm$core$List$cons,
			{
				cZ: jacobian,
				c5: $author$project$Internal$Equation$defaultMaxImpulse,
				c6: -$author$project$Internal$Equation$defaultMaxImpulse,
				$7: A5(
					$author$project$Internal$Equation$computeSolverB,
					ctx,
					body1,
					body2,
					jacobian,
					A6(
						$author$project$Internal$Equation$computeRotationalB,
						spookA,
						spookB,
						{eb: 0, hV: ni, ee: nj},
						body1,
						body2,
						jacobian)),
				dp: A4($author$project$Internal$Equation$computeSolverInvC, spookEps, body1, body2, jacobian),
				dq: 0,
				b2: spookEps
			},
			equations);
	});
var $author$project$Internal$Vector3$tangentAxisThreshold = 0.9;
var $author$project$Internal$Vector3$tangents = function (vec) {
	if ($author$project$Internal$Vector3$lengthSquared(vec) > 0) {
		var normalized = $author$project$Internal$Vector3$normalize(vec);
		var v = $author$project$Internal$Vector3$normalize(
			(($elm$core$Basics$abs(normalized.n) - $author$project$Internal$Vector3$tangentAxisThreshold) < 0) ? A2($author$project$Internal$Vector3$cross, normalized, $author$project$Internal$Vector3$xAxis) : A2($author$project$Internal$Vector3$cross, normalized, $author$project$Internal$Vector3$yAxis));
		return _Utils_Tuple2(
			v,
			A2($author$project$Internal$Vector3$cross, normalized, v));
	} else {
		return _Utils_Tuple2($author$project$Internal$Vector3$xAxis, $author$project$Internal$Vector3$yAxis);
	}
};
var $author$project$Internal$Equation$addHingeRotationalConstraintEquations = F6(
	function (ctx, body1, body2, axis1, axis2, equations) {
		var worldAxis2 = A2($author$project$Internal$Transform3d$directionPlaceIn, body2.gP, axis2);
		var _v0 = $author$project$Internal$Vector3$tangents(
			A2($author$project$Internal$Transform3d$directionPlaceIn, body1.gP, axis1));
		var ni1 = _v0.a;
		var ni2 = _v0.b;
		return A6(
			$author$project$Internal$Equation$addRotationalEquation,
			ctx,
			body1,
			body2,
			ni2,
			worldAxis2,
			A6($author$project$Internal$Equation$addRotationalEquation, ctx, body1, body2, ni1, worldAxis2, equations));
	});
var $author$project$Internal$Equation$addLockRotationalConstraintEquations = function (ctx) {
	return function (body1) {
		return function (body2) {
			return function (x1) {
				return function (x2) {
					return function (y1) {
						return function (y2) {
							return function (z1) {
								return function (z2) {
									return function (equations) {
										var worldZ2 = A2($author$project$Internal$Transform3d$directionPlaceIn, body2.gP, z2);
										var worldZ1 = A2($author$project$Internal$Transform3d$directionPlaceIn, body1.gP, z1);
										var worldY2 = A2($author$project$Internal$Transform3d$directionPlaceIn, body2.gP, y2);
										var worldY1 = A2($author$project$Internal$Transform3d$directionPlaceIn, body1.gP, y1);
										var worldX2 = A2($author$project$Internal$Transform3d$directionPlaceIn, body2.gP, x2);
										var worldX1 = A2($author$project$Internal$Transform3d$directionPlaceIn, body1.gP, x1);
										return A6(
											$author$project$Internal$Equation$addRotationalEquation,
											ctx,
											body1,
											body2,
											worldZ1,
											worldX2,
											A6(
												$author$project$Internal$Equation$addRotationalEquation,
												ctx,
												body1,
												body2,
												worldY1,
												worldZ2,
												A6($author$project$Internal$Equation$addRotationalEquation, ctx, body1, body2, worldX1, worldY2, equations)));
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Internal$Vector3$basis = _List_fromArray(
	[$author$project$Internal$Vector3$xAxis, $author$project$Internal$Vector3$yAxis, $author$project$Internal$Vector3$zAxis]);
var $author$project$Internal$Equation$addPointToPointConstraintEquations = F6(
	function (ctx, body1, body2, pivot1, pivot2, equations) {
		var spookEps = 4.0 / (((ctx.T * ctx.T) * $author$project$Internal$Equation$defaultStiffness) * (1 + (4 * $author$project$Internal$Equation$defaultRelaxation)));
		var spookB = (4.0 * $author$project$Internal$Equation$defaultRelaxation) / (1 + (4 * $author$project$Internal$Equation$defaultRelaxation));
		var spookA = 4.0 / (ctx.T * (1 + (4 * $author$project$Internal$Equation$defaultRelaxation)));
		var rj = A2($author$project$Internal$Transform3d$directionPlaceIn, body2.gP, pivot2);
		var ri = A2($author$project$Internal$Transform3d$directionPlaceIn, body1.gP, pivot1);
		return A3(
			$elm$core$List$foldl,
			function (ni) {
				var jacobian = {aA: ni.n, aB: ni.o, aC: ni.p, aa: (ni.o * ri.p) - (ni.p * ri.o), ab: (ni.p * ri.n) - (ni.n * ri.p), ac: (ni.n * ri.o) - (ni.o * ri.n), ad: (rj.o * ni.p) - (rj.p * ni.o), ae: (rj.p * ni.n) - (rj.n * ni.p), af: (rj.n * ni.o) - (rj.o * ni.n)};
				var contact = {
					ht: 0,
					hV: ni,
					h$: A2(
						$author$project$Internal$Vector3$add,
						$author$project$Internal$Transform3d$originPoint(body1.gP),
						ri),
					h0: A2(
						$author$project$Internal$Vector3$add,
						$author$project$Internal$Transform3d$originPoint(body2.gP),
						rj),
					h6: 0
				};
				return $elm$core$List$cons(
					{
						cZ: jacobian,
						c5: $author$project$Internal$Equation$defaultMaxImpulse,
						c6: -$author$project$Internal$Equation$defaultMaxImpulse,
						$7: A5(
							$author$project$Internal$Equation$computeSolverB,
							ctx,
							body1,
							body2,
							jacobian,
							A7($author$project$Internal$Equation$computeContactB, spookA, spookB, 0, contact, body1, body2, jacobian)),
						dp: A4($author$project$Internal$Equation$computeSolverInvC, spookEps, body1, body2, jacobian),
						dq: 0,
						b2: spookEps
					});
			},
			equations,
			$author$project$Internal$Vector3$basis);
	});
var $author$project$Internal$Equation$addConstraintEquations = F4(
	function (ctx, body1, body2, constraint) {
		switch (constraint.$) {
			case 0:
				var pivot1 = constraint.a;
				var pivot2 = constraint.b;
				return A5($author$project$Internal$Equation$addPointToPointConstraintEquations, ctx, body1, body2, pivot1, pivot2);
			case 1:
				var pivot1 = constraint.a;
				var axis1 = constraint.b;
				var pivot2 = constraint.c;
				var axis2 = constraint.d;
				return A2(
					$elm$core$Basics$composeR,
					A5($author$project$Internal$Equation$addPointToPointConstraintEquations, ctx, body1, body2, pivot1, pivot2),
					A5($author$project$Internal$Equation$addHingeRotationalConstraintEquations, ctx, body1, body2, axis1, axis2));
			case 2:
				var pivot1 = constraint.a;
				var x1 = constraint.b;
				var y1 = constraint.c;
				var z1 = constraint.d;
				var pivot2 = constraint.e;
				var x2 = constraint.f;
				var y2 = constraint.g;
				var z2 = constraint.h;
				return A2(
					$elm$core$Basics$composeR,
					A5($author$project$Internal$Equation$addPointToPointConstraintEquations, ctx, body1, body2, pivot1, pivot2),
					A9($author$project$Internal$Equation$addLockRotationalConstraintEquations, ctx, body1, body2, x1, x2, y1, y2, z1, z2));
			default:
				var distance = constraint.a;
				return A4($author$project$Internal$Equation$addDistanceConstraintEquations, ctx, body1, body2, distance);
		}
	});
var $author$project$Internal$Equation$computeFrictionB = F4(
	function (spookB, bi, bj, jacobian) {
		var gW = A3($author$project$Internal$Equation$computeGW, bi, bj, jacobian);
		return (-gW) * spookB;
	});
var $author$project$Internal$Vector3$stableTangents = F2(
	function (cachedT1, ni) {
		var d = A2($author$project$Internal$Vector3$dot, cachedT1, ni);
		var projected = A2(
			$author$project$Internal$Vector3$sub,
			cachedT1,
			A2($author$project$Internal$Vector3$scale, d, ni));
		var lenSq = $author$project$Internal$Vector3$lengthSquared(projected);
		if ((lenSq - $author$project$Internal$Const$precision) < 0) {
			return $author$project$Internal$Vector3$tangents(ni);
		} else {
			var t1 = A2(
				$author$project$Internal$Vector3$scale,
				1 / $elm$core$Basics$sqrt(lenSq),
				projected);
			return _Utils_Tuple2(
				t1,
				A2($author$project$Internal$Vector3$cross, ni, t1));
		}
	});
var $author$project$Internal$Equation$contactEquations = F6(
	function (seedLambda, cachedT1, ctx, body1, body2, _v0) {
		var contact = _v0.hc;
		var bounciness = _v0.eV;
		var friction = _v0.fe;
		var spookEps = 4.0 / (((ctx.T * ctx.T) * $author$project$Internal$Equation$defaultStiffness) * (1 + (4 * $author$project$Internal$Equation$defaultRelaxation)));
		var spookB = (4.0 * $author$project$Internal$Equation$defaultRelaxation) / (1 + (4 * $author$project$Internal$Equation$defaultRelaxation));
		var spookA = 4.0 / (ctx.T * (1 + (4 * $author$project$Internal$Equation$defaultRelaxation)));
		var rj = A2(
			$author$project$Internal$Vector3$sub,
			contact.h0,
			$author$project$Internal$Transform3d$originPoint(body2.gP));
		var ri = A2(
			$author$project$Internal$Vector3$sub,
			contact.h$,
			$author$project$Internal$Transform3d$originPoint(body1.gP));
		var normalJacobian = {aA: contact.hV.n, aB: contact.hV.o, aC: contact.hV.p, aa: (contact.hV.o * ri.p) - (contact.hV.p * ri.o), ab: (contact.hV.p * ri.n) - (contact.hV.n * ri.p), ac: (contact.hV.n * ri.o) - (contact.hV.o * ri.n), ad: (rj.o * contact.hV.p) - (rj.p * contact.hV.o), ae: (rj.p * contact.hV.n) - (rj.n * contact.hV.p), af: (rj.n * contact.hV.o) - (rj.o * contact.hV.n)};
		var _v1 = A2($author$project$Internal$Vector3$stableTangents, cachedT1, contact.hV);
		var t1 = _v1.a;
		var t2 = _v1.b;
		var friction1Jacobian = {aA: t1.n, aB: t1.o, aC: t1.p, aa: (t1.o * ri.p) - (t1.p * ri.o), ab: (t1.p * ri.n) - (t1.n * ri.p), ac: (t1.n * ri.o) - (t1.o * ri.n), ad: (rj.o * t1.p) - (rj.p * t1.o), ae: (rj.p * t1.n) - (rj.n * t1.p), af: (rj.n * t1.o) - (rj.o * t1.n)};
		var friction2Jacobian = {aA: t2.n, aB: t2.o, aC: t2.p, aa: (t2.o * ri.p) - (t2.p * ri.o), ab: (t2.p * ri.n) - (t2.n * ri.p), ac: (t2.n * ri.o) - (t2.o * ri.n), ad: (rj.o * t2.p) - (rj.p * t2.o), ae: (rj.p * t2.n) - (rj.n * t2.p), af: (rj.n * t2.o) - (rj.o * t2.n)};
		return {
			e0: {
				ht: contact.ht,
				ff: friction1Jacobian,
				fh: A5(
					$author$project$Internal$Equation$computeSolverB,
					ctx,
					body1,
					body2,
					friction1Jacobian,
					A4($author$project$Internal$Equation$computeFrictionB, spookB, body1, body2, friction1Jacobian)),
				fi: A4($author$project$Internal$Equation$computeSolverInvC, spookEps, body1, body2, friction1Jacobian),
				fj: friction2Jacobian,
				fl: A5(
					$author$project$Internal$Equation$computeSolverB,
					ctx,
					body1,
					body2,
					friction2Jacobian,
					A4($author$project$Internal$Equation$computeFrictionB, spookB, body1, body2, friction2Jacobian)),
				fm: A4($author$project$Internal$Equation$computeSolverInvC, spookEps, body1, body2, friction2Jacobian),
				fn: friction,
				c8: normalJacobian,
				gf: $author$project$Internal$Equation$defaultMaxImpulse,
				gg: 0,
				gh: A5(
					$author$project$Internal$Equation$computeSolverB,
					ctx,
					body1,
					body2,
					normalJacobian,
					A7($author$project$Internal$Equation$computeContactB, spookA, spookB, bounciness, contact, body1, body2, normalJacobian)),
				gi: A4($author$project$Internal$Equation$computeSolverInvC, spookEps, body1, body2, normalJacobian),
				h6: contact.h6,
				b2: spookEps
			},
			fg: 0,
			fk: 0,
			ge: seedLambda
		};
	});
var $author$project$Internal$Equation$defaultWarmStart = {d$: 0, eG: $author$project$Internal$Vector3$zero};
var $author$project$Internal$Equation$warmStartFactor = 0.85;
var $author$project$Internal$Equation$buildContactEquations = F6(
	function (ctx, body1, body2, warmStartList, contacts, acc) {
		buildContactEquations:
		while (true) {
			if (!contacts.b) {
				return acc;
			} else {
				var solverContact = contacts.a;
				var rest = contacts.b;
				var contact = solverContact.hc;
				var cached = A4($author$project$Internal$ContactCache$lookup, contact.h6, contact.ht, $author$project$Internal$Equation$defaultWarmStart, warmStartList);
				var $temp$ctx = ctx,
					$temp$body1 = body1,
					$temp$body2 = body2,
					$temp$warmStartList = warmStartList,
					$temp$contacts = rest,
					$temp$acc = A2(
					$elm$core$List$cons,
					A6($author$project$Internal$Equation$contactEquations, cached.d$ * $author$project$Internal$Equation$warmStartFactor, cached.eG, ctx, body1, body2, solverContact),
					acc);
				ctx = $temp$ctx;
				body1 = $temp$body1;
				body2 = $temp$body2;
				warmStartList = $temp$warmStartList;
				contacts = $temp$contacts;
				acc = $temp$acc;
				continue buildContactEquations;
			}
		}
	});
var $author$project$Internal$Equation$equationsForPair = F2(
	function (ctx, _v0) {
		var constraints = _v0.e_;
		var contacts = _v0.e$;
		var body2 = _v0.eU;
		var body1 = _v0.eT;
		var warmStartList = function () {
			if (!contacts.b) {
				return _List_Nil;
			} else {
				return A2(
					$author$project$Internal$ContactCache$getGroup,
					A2($author$project$Internal$ContactId$bodyKey, body1.bt, body2.bt),
					ctx.gV);
			}
		}();
		return {
			e_: A3(
				$elm$core$List$foldl,
				A3($author$project$Internal$Equation$addConstraintEquations, ctx, body1, body2),
				_List_Nil,
				constraints),
			e$: A6($author$project$Internal$Equation$buildContactEquations, ctx, body1, body2, warmStartList, contacts, _List_Nil)
		};
	});
var $author$project$Internal$Solver$buildAndWarmStart = F6(
	function (ctx, prevBody1, solverBodies, islands, groups, pairGroups) {
		buildAndWarmStart:
		while (true) {
			if (!pairGroups.b) {
				return _Utils_Tuple3(
					groups,
					(prevBody1.dM.fE === 2) ? A3($elm$core$Array$set, prevBody1.dM.bt, prevBody1, solverBodies) : solverBodies,
					islands);
			} else {
				var pairGroup = pairGroups.a;
				var rest = pairGroups.b;
				var built = A2($author$project$Internal$Equation$equationsForPair, ctx, pairGroup);
				var bodyId2 = pairGroup.eU.bt;
				var bodyId1 = pairGroup.eT.bt;
				var newIslands = ((pairGroup.eT.fE === 2) && (pairGroup.eU.fE === 2)) ? A3($author$project$Internal$Islands$connect, bodyId1, bodyId2, islands) : islands;
				var solverBodies1 = ((!(prevBody1.dM.bt - bodyId1)) || (prevBody1.dM.fE !== 2)) ? solverBodies : A3($elm$core$Array$set, prevBody1.dM.bt, prevBody1, solverBodies);
				var body2 = function () {
					var _v4 = A2($elm$core$Array$get, bodyId2, solverBodies1);
					if (!_v4.$) {
						var b = _v4.a;
						return b;
					} else {
						return prevBody1;
					}
				}();
				var body1 = function () {
					if (!(prevBody1.dM.bt - bodyId1)) {
						return prevBody1;
					} else {
						var _v3 = A2($elm$core$Array$get, bodyId1, solverBodies);
						if (!_v3.$) {
							var b = _v3.a;
							return b;
						} else {
							return prevBody1;
						}
					}
				}();
				var _v1 = A3($author$project$Internal$Solver$applyConstraintsWarmStart, body1, body2, built.e_);
				var wb1 = _v1.a;
				var wb2 = _v1.b;
				var _v2 = A3($author$project$Internal$Solver$applyContactsWarmStart, wb1, wb2, built.e$);
				var newBody1 = _v2.a;
				var newBody2 = _v2.b;
				var equationsGroup = {eT: newBody1, eU: newBody2, e_: built.e_, e$: built.e$, he: 0};
				var solverBodies2 = (newBody2.dM.fE === 2) ? A3($elm$core$Array$set, bodyId2, newBody2, solverBodies1) : solverBodies1;
				var $temp$ctx = ctx,
					$temp$prevBody1 = newBody1,
					$temp$solverBodies = solverBodies2,
					$temp$islands = newIslands,
					$temp$groups = A2($elm$core$List$cons, equationsGroup, groups),
					$temp$pairGroups = rest;
				ctx = $temp$ctx;
				prevBody1 = $temp$prevBody1;
				solverBodies = $temp$solverBodies;
				islands = $temp$islands;
				groups = $temp$groups;
				pairGroups = $temp$pairGroups;
				continue buildAndWarmStart;
			}
		}
	});
var $author$project$Internal$ContactCache$Black = 1;
var $author$project$Internal$ContactCache$Node = F5(
	function (a, b, c, d, e) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e};
	});
var $author$project$Internal$ContactCache$Red = 0;
var $author$project$Internal$ContactCache$balance = F5(
	function (color, key, list, left, right) {
		if ((!right.$) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rL = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((!left.$) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lL = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$author$project$Internal$ContactCache$Node,
					0,
					key,
					list,
					A5($author$project$Internal$ContactCache$Node, 1, lK, lL, lLeft, lRight),
					A5($author$project$Internal$ContactCache$Node, 1, rK, rL, rLeft, rRight));
			} else {
				return A5(
					$author$project$Internal$ContactCache$Node,
					color,
					rK,
					rL,
					A5($author$project$Internal$ContactCache$Node, 0, key, list, left, rLeft),
					rRight);
			}
		} else {
			if ((((!left.$) && (!left.a)) && (!left.d.$)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lL = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llL = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$author$project$Internal$ContactCache$Node,
					0,
					lK,
					lL,
					A5($author$project$Internal$ContactCache$Node, 1, llK, llL, llLeft, llRight),
					A5($author$project$Internal$ContactCache$Node, 1, key, list, lRight, right));
			} else {
				return A5($author$project$Internal$ContactCache$Node, color, key, list, left, right);
			}
		}
	});
var $author$project$Internal$ContactCache$insertHelp = F3(
	function (key, list, dict) {
		if (dict.$ === 1) {
			return A5($author$project$Internal$ContactCache$Node, 0, key, list, $author$project$Internal$ContactCache$empty, $author$project$Internal$ContactCache$empty);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nList = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var d = key - nKey;
			return (d < 0) ? A5(
				$author$project$Internal$ContactCache$balance,
				nColor,
				nKey,
				nList,
				A3($author$project$Internal$ContactCache$insertHelp, key, list, nLeft),
				nRight) : ((d > 0) ? A5(
				$author$project$Internal$ContactCache$balance,
				nColor,
				nKey,
				nList,
				nLeft,
				A3($author$project$Internal$ContactCache$insertHelp, key, list, nRight)) : A5($author$project$Internal$ContactCache$Node, nColor, nKey, list, nLeft, nRight));
		}
	});
var $author$project$Internal$ContactCache$insertGroup = F3(
	function (key, list, dict) {
		var _v0 = A3($author$project$Internal$ContactCache$insertHelp, key, list, dict);
		if ((!_v0.$) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var l = _v0.c;
			var left = _v0.d;
			var right = _v0.e;
			return A5($author$project$Internal$ContactCache$Node, 1, k, l, left, right);
		} else {
			var x = _v0;
			return x;
		}
	});
var $author$project$Internal$Solver$warmStartEntries = F2(
	function (contacts, acc) {
		warmStartEntries:
		while (true) {
			if (!contacts.b) {
				return acc;
			} else {
				var normalLambda = contacts.a.ge;
				var data = contacts.a.e0;
				var rest = contacts.b;
				var $temp$contacts = rest,
					$temp$acc = A2(
					$elm$core$List$cons,
					_Utils_Tuple3(
						data.h6,
						data.ht,
						{
							d$: normalLambda,
							eG: {n: data.ff.aA, o: data.ff.aB, p: data.ff.aC}
						}),
					acc);
				contacts = $temp$contacts;
				acc = $temp$acc;
				continue warmStartEntries;
			}
		}
	});
var $author$project$Internal$Solver$collectGroupCaches = F2(
	function (groups, acc) {
		collectGroupCaches:
		while (true) {
			if (!groups.b) {
				return acc;
			} else {
				var group = groups.a;
				var rest = groups.b;
				var _v1 = group.e$;
				if (!_v1.b) {
					var $temp$groups = rest,
						$temp$acc = acc;
					groups = $temp$groups;
					acc = $temp$acc;
					continue collectGroupCaches;
				} else {
					var bodyKey = A2($author$project$Internal$ContactId$bodyKey, group.eT.dM.bt, group.eU.dM.bt);
					var $temp$groups = rest,
						$temp$acc = A3(
						$author$project$Internal$ContactCache$insertGroup,
						bodyKey,
						A2($author$project$Internal$Solver$warmStartEntries, group.e$, _List_Nil),
						acc);
					groups = $temp$groups;
					acc = $temp$acc;
					continue collectGroupCaches;
				}
			}
		}
	});
var $author$project$Internal$Islands$annotate = F3(
	function (parents, groups, acc) {
		annotate:
		while (true) {
			if (!groups.b) {
				return acc;
			} else {
				var group = groups.a;
				var rest = groups.b;
				var pickedId = (group.eT.dM.fE === 2) ? group.eT.dM.bt : group.eU.dM.bt;
				var _v1 = A2($author$project$Internal$Islands$findRoot, pickedId, parents);
				var newParents = _v1.a;
				var root = _v1.b;
				var $temp$parents = newParents,
					$temp$groups = rest,
					$temp$acc = A2(
					$elm$core$List$cons,
					_Utils_Tuple2(root, group),
					acc);
				parents = $temp$parents;
				groups = $temp$groups;
				acc = $temp$acc;
				continue annotate;
			}
		}
	});
var $author$project$Internal$Islands$compareRoot = F2(
	function (_v0, _v1) {
		var a = _v0.a;
		var b = _v1.a;
		return ((a - b) < 0) ? 0 : (((a - b) > 0) ? 2 : 1);
	});
var $elm$core$List$sortWith = _List_sortWith;
var $author$project$Internal$Islands$walk = F5(
	function (solveIsland, currentRoot, currentIsland, acc, remaining) {
		walk:
		while (true) {
			if (!remaining.b) {
				return A2(solveIsland, currentIsland, acc);
			} else {
				var _v1 = remaining.a;
				var root = _v1.a;
				var group = _v1.b;
				var rest = remaining.b;
				if (!(root - currentRoot)) {
					var $temp$solveIsland = solveIsland,
						$temp$currentRoot = currentRoot,
						$temp$currentIsland = A2($elm$core$List$cons, group, currentIsland),
						$temp$acc = acc,
						$temp$remaining = rest;
					solveIsland = $temp$solveIsland;
					currentRoot = $temp$currentRoot;
					currentIsland = $temp$currentIsland;
					acc = $temp$acc;
					remaining = $temp$remaining;
					continue walk;
				} else {
					var $temp$solveIsland = solveIsland,
						$temp$currentRoot = root,
						$temp$currentIsland = _List_fromArray(
						[group]),
						$temp$acc = A2(solveIsland, currentIsland, acc),
						$temp$remaining = rest;
					solveIsland = $temp$solveIsland;
					currentRoot = $temp$currentRoot;
					currentIsland = $temp$currentIsland;
					acc = $temp$acc;
					remaining = $temp$remaining;
					continue walk;
				}
			}
		}
	});
var $author$project$Internal$Islands$fold = F4(
	function (solveIsland, acc, groups, parents) {
		var _v0 = A2(
			$elm$core$List$sortWith,
			$author$project$Internal$Islands$compareRoot,
			A3($author$project$Internal$Islands$annotate, parents, groups, _List_Nil));
		if (!_v0.b) {
			return acc;
		} else {
			var _v1 = _v0.a;
			var firstRoot = _v1.a;
			var firstGroup = _v1.b;
			var rest = _v0.b;
			return A5(
				$author$project$Internal$Islands$walk,
				solveIsland,
				firstRoot,
				_List_fromArray(
					[firstGroup]),
				acc,
				rest);
		}
	});
var $author$project$Internal$SolverBody$fromBody = F2(
	function (extId, body) {
		return {dM: body, at: extId, w: 0, x: 0, y: 0, z: 0, A: 0, B: 0};
	});
var $author$project$Internal$Vector3$one = {n: 1, o: 1, p: 1};
var $author$project$Internal$SolverBody$sentinel = function (extId) {
	return {
		dM: {
			eP: 0,
			eQ: $author$project$Internal$Vector3$one,
			eR: $author$project$Internal$Vector3$zero,
			eX: $author$project$Internal$Transform3d$atOrigin,
			fa: $author$project$Internal$Vector3$zero,
			fp: {ca: 0, eA: _List_Nil, eM: 0},
			bt: -1,
			fz: $author$project$Internal$Vector3$zero,
			fA: $author$project$Internal$Matrix3$zero,
			fB: 0,
			fE: 1,
			fL: 0,
			fM: $author$project$Internal$Vector3$one,
			f1: 0,
			gL: $author$project$Internal$Vector3$zero,
			gP: $author$project$Internal$Transform3d$atOrigin,
			gS: $author$project$Internal$Vector3$zero,
			gW: _List_Nil
		},
		at: extId,
		w: 0,
		x: 0,
		y: 0,
		z: 0,
		A: 0,
		B: 0
	};
};
var $author$project$Internal$SolverBody$fromBodies = F2(
	function (maxId, bodiesWithIds) {
		if (!bodiesWithIds.b) {
			return $elm$core$Array$empty;
		} else {
			var _v1 = bodiesWithIds.a;
			var firstExtId = _v1.a;
			return A3(
				$elm$core$List$foldl,
				F2(
					function (_v2, arr) {
						var extId = _v2.a;
						var body = _v2.b;
						return A3(
							$elm$core$Array$set,
							body.bt,
							A2($author$project$Internal$SolverBody$fromBody, extId, body),
							arr);
					}),
				A2(
					$elm$core$Array$repeat,
					maxId + 1,
					$author$project$Internal$SolverBody$sentinel(firstExtId)),
				bodiesWithIds);
		}
	});
var $author$project$Internal$Islands$init = function (maxId) {
	return A2($elm$core$Array$initialize, maxId + 1, $elm$core$Basics$identity);
};
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $author$project$Internal$Solver$maxInt = F2(
	function (a, b) {
		return ((a - b) > 0) ? a : b;
	});
var $author$project$Internal$Solver$minInt = F2(
	function (a, b) {
		return ((a - b) < 0) ? a : b;
	});
var $author$project$Internal$Solver$flushBody = F2(
	function (body, arr) {
		return (body.dM.fE === 2) ? A3($elm$core$Array$set, body.dM.bt, body, arr) : arr;
	});
var $author$project$Internal$Const$solverTolerance = 1.0e-6;
var $author$project$Internal$Solver$solveVelocityFrictions = F5(
	function (body1, body2, acc, deltalambdaTot, contacts) {
		solveVelocityFrictions:
		while (true) {
			if (!contacts.b) {
				return {
					eT: body1,
					eU: body2,
					e$: $elm$core$List$reverse(acc),
					he: deltalambdaTot
				};
			} else {
				var contact = contacts.a;
				var rest = contacts.b;
				var normalLambda = contact.ge;
				var invI2 = body2.dM.fA;
				var invI1 = body1.dM.fA;
				var data = contact.e0;
				var eq1 = data.ff;
				var gW1 = (((-(((eq1.aA * body1.w) + (eq1.aB * body1.x)) + (eq1.aC * body1.y))) + (((eq1.aa * body1.z) + (eq1.ab * body1.A)) + (eq1.ac * body1.B))) + (((eq1.aA * body2.w) + (eq1.aB * body2.x)) + (eq1.aC * body2.y))) + (((eq1.ad * body2.z) + (eq1.ae * body2.A)) + (eq1.af * body2.B));
				var eq2 = data.fj;
				var dPrev1 = data.fi * ((data.fh - gW1) - (data.b2 * contact.fg));
				var cap2 = data.fn * normalLambda;
				var cap1 = data.fn * normalLambda;
				var d1 = (((contact.fg + dPrev1) + cap1) < 0) ? ((-cap1) - contact.fg) : ((((contact.fg + dPrev1) - cap1) > 0) ? (cap1 - contact.fg) : dPrev1);
				var k1a = d1 * body1.dM.fB;
				var k1b = d1 * body2.dM.fB;
				var b2wZ = body2.B + ((((invI2.fV * eq1.ad) + (invI2.fW * eq1.ae)) + (invI2.fX * eq1.af)) * d1);
				var b2wY = body2.A + ((((invI2.fR * eq1.ad) + (invI2.fS * eq1.ae)) + (invI2.fT * eq1.af)) * d1);
				var b2wX = body2.z + ((((invI2.fN * eq1.ad) + (invI2.fO * eq1.ae)) + (invI2.fP * eq1.af)) * d1);
				var b2vZ = body2.y + (k1b * eq1.aC);
				var b2vY = body2.x + (k1b * eq1.aB);
				var b2vX = body2.w + (k1b * eq1.aA);
				var b1wZ = body1.B + ((((invI1.fV * eq1.aa) + (invI1.fW * eq1.ab)) + (invI1.fX * eq1.ac)) * d1);
				var b1wY = body1.A + ((((invI1.fR * eq1.aa) + (invI1.fS * eq1.ab)) + (invI1.fT * eq1.ac)) * d1);
				var b1wX = body1.z + ((((invI1.fN * eq1.aa) + (invI1.fO * eq1.ab)) + (invI1.fP * eq1.ac)) * d1);
				var b1vZ = body1.y - (k1a * eq1.aC);
				var b1vY = body1.x - (k1a * eq1.aB);
				var b1vX = body1.w - (k1a * eq1.aA);
				var gW2 = (((-(((eq2.aA * b1vX) + (eq2.aB * b1vY)) + (eq2.aC * b1vZ))) + (((eq2.aa * b1wX) + (eq2.ab * b1wY)) + (eq2.ac * b1wZ))) + (((eq2.aA * b2vX) + (eq2.aB * b2vY)) + (eq2.aC * b2vZ))) + (((eq2.ad * b2wX) + (eq2.ae * b2wY)) + (eq2.af * b2wZ));
				var dPrev2 = data.fm * ((data.fl - gW2) - (data.b2 * contact.fk));
				var d2 = (((contact.fk + dPrev2) + cap2) < 0) ? ((-cap2) - contact.fk) : ((((contact.fk + dPrev2) - cap2) > 0) ? (cap2 - contact.fk) : dPrev2);
				var newBody2 = function () {
					if (body2.dM.fE === 2) {
						var k2b = d2 * body2.dM.fB;
						return {dM: body2.dM, at: body2.at, w: b2vX + (k2b * eq2.aA), x: b2vY + (k2b * eq2.aB), y: b2vZ + (k2b * eq2.aC), z: b2wX + ((((invI2.fN * eq2.ad) + (invI2.fO * eq2.ae)) + (invI2.fP * eq2.af)) * d2), A: b2wY + ((((invI2.fR * eq2.ad) + (invI2.fS * eq2.ae)) + (invI2.fT * eq2.af)) * d2), B: b2wZ + ((((invI2.fV * eq2.ad) + (invI2.fW * eq2.ae)) + (invI2.fX * eq2.af)) * d2)};
					} else {
						return body2;
					}
				}();
				var newBody1 = function () {
					if (body1.dM.fE === 2) {
						var k2a = d2 * body1.dM.fB;
						return {dM: body1.dM, at: body1.at, w: b1vX - (k2a * eq2.aA), x: b1vY - (k2a * eq2.aB), y: b1vZ - (k2a * eq2.aC), z: b1wX + ((((invI1.fN * eq2.aa) + (invI1.fO * eq2.ab)) + (invI1.fP * eq2.ac)) * d2), A: b1wY + ((((invI1.fR * eq2.aa) + (invI1.fS * eq2.ab)) + (invI1.fT * eq2.ac)) * d2), B: b1wZ + ((((invI1.fV * eq2.aa) + (invI1.fW * eq2.ab)) + (invI1.fX * eq2.ac)) * d2)};
					} else {
						return body1;
					}
				}();
				var $temp$body1 = newBody1,
					$temp$body2 = newBody2,
					$temp$acc = A2(
					$elm$core$List$cons,
					{e0: data, fg: contact.fg + d1, fk: contact.fk + d2, ge: contact.ge},
					acc),
					$temp$deltalambdaTot = (deltalambdaTot + $elm$core$Basics$abs(d1)) + $elm$core$Basics$abs(d2),
					$temp$contacts = rest;
				body1 = $temp$body1;
				body2 = $temp$body2;
				acc = $temp$acc;
				deltalambdaTot = $temp$deltalambdaTot;
				contacts = $temp$contacts;
				continue solveVelocityFrictions;
			}
		}
	});
var $author$project$Internal$Solver$velocityFrictionGroup = F5(
	function (body1, body2, deltalambdaTot, contacts, constraints) {
		var afterFrictions = A5($author$project$Internal$Solver$solveVelocityFrictions, body1, body2, _List_Nil, deltalambdaTot, contacts);
		return {eT: afterFrictions.eT, eU: afterFrictions.eU, e_: constraints, e$: afterFrictions.e$, he: afterFrictions.he};
	});
var $author$project$Internal$Solver$applyVelocityBody1 = F3(
	function (deltalambda, jacobian, body) {
		if (body.dM.fE === 2) {
			var k = deltalambda * body.dM.fB;
			var invI = body.dM.fA;
			return {dM: body.dM, at: body.at, w: body.w - (k * jacobian.aA), x: body.x - (k * jacobian.aB), y: body.y - (k * jacobian.aC), z: body.z + ((((invI.fN * jacobian.aa) + (invI.fO * jacobian.ab)) + (invI.fP * jacobian.ac)) * deltalambda), A: body.A + ((((invI.fR * jacobian.aa) + (invI.fS * jacobian.ab)) + (invI.fT * jacobian.ac)) * deltalambda), B: body.B + ((((invI.fV * jacobian.aa) + (invI.fW * jacobian.ab)) + (invI.fX * jacobian.ac)) * deltalambda)};
		} else {
			return body;
		}
	});
var $author$project$Internal$Solver$applyVelocityBody2 = F3(
	function (deltalambda, jacobian, body) {
		if (body.dM.fE === 2) {
			var k = deltalambda * body.dM.fB;
			var invI = body.dM.fA;
			return {dM: body.dM, at: body.at, w: body.w + (k * jacobian.aA), x: body.x + (k * jacobian.aB), y: body.y + (k * jacobian.aC), z: body.z + ((((invI.fN * jacobian.ad) + (invI.fO * jacobian.ae)) + (invI.fP * jacobian.af)) * deltalambda), A: body.A + ((((invI.fR * jacobian.ad) + (invI.fS * jacobian.ae)) + (invI.fT * jacobian.af)) * deltalambda), B: body.B + ((((invI.fV * jacobian.ad) + (invI.fW * jacobian.ae)) + (invI.fX * jacobian.af)) * deltalambda)};
		} else {
			return body;
		}
	});
var $author$project$Internal$Solver$solveVelocityConstraints = F5(
	function (body1, body2, acc, deltalambdaTot, equations) {
		solveVelocityConstraints:
		while (true) {
			if (!equations.b) {
				return {
					eT: body1,
					eU: body2,
					he: deltalambdaTot,
					dS: $elm$core$List$reverse(acc)
				};
			} else {
				var constraint = equations.a;
				var rest = equations.b;
				var solverLambda = constraint.dq;
				var jacobian = constraint.cZ;
				var gWlambda = (((-(((jacobian.aA * body1.w) + (jacobian.aB * body1.x)) + (jacobian.aC * body1.y))) + (((jacobian.aa * body1.z) + (jacobian.ab * body1.A)) + (jacobian.ac * body1.B))) + (((jacobian.aA * body2.w) + (jacobian.aB * body2.x)) + (jacobian.aC * body2.y))) + (((jacobian.ad * body2.z) + (jacobian.ae * body2.A)) + (jacobian.af * body2.B));
				var deltalambdaPrev = constraint.dp * ((constraint.$7 - gWlambda) - (constraint.b2 * solverLambda));
				var deltalambda = (((solverLambda + deltalambdaPrev) - constraint.c6) < 0) ? (constraint.c6 - solverLambda) : ((((solverLambda + deltalambdaPrev) - constraint.c5) > 0) ? (constraint.c5 - solverLambda) : deltalambdaPrev);
				var $temp$body1 = A3($author$project$Internal$Solver$applyVelocityBody1, deltalambda, jacobian, body1),
					$temp$body2 = A3($author$project$Internal$Solver$applyVelocityBody2, deltalambda, jacobian, body2),
					$temp$acc = A2(
					$elm$core$List$cons,
					{cZ: jacobian, c5: constraint.c5, c6: constraint.c6, $7: constraint.$7, dp: constraint.dp, dq: solverLambda + deltalambda, b2: constraint.b2},
					acc),
					$temp$deltalambdaTot = deltalambdaTot + $elm$core$Basics$abs(deltalambda),
					$temp$equations = rest;
				body1 = $temp$body1;
				body2 = $temp$body2;
				acc = $temp$acc;
				deltalambdaTot = $temp$deltalambdaTot;
				equations = $temp$equations;
				continue solveVelocityConstraints;
			}
		}
	});
var $author$project$Internal$Solver$solveVelocityNormals = F5(
	function (body1, body2, acc, deltalambdaTot, contacts) {
		solveVelocityNormals:
		while (true) {
			if (!contacts.b) {
				return {
					eT: body1,
					eU: body2,
					e$: $elm$core$List$reverse(acc),
					he: deltalambdaTot
				};
			} else {
				var contact = contacts.a;
				var rest = contacts.b;
				var solverLambda = contact.ge;
				var data = contact.e0;
				var jacobian = data.c8;
				var gWlambda = (((-(((jacobian.aA * body1.w) + (jacobian.aB * body1.x)) + (jacobian.aC * body1.y))) + (((jacobian.aa * body1.z) + (jacobian.ab * body1.A)) + (jacobian.ac * body1.B))) + (((jacobian.aA * body2.w) + (jacobian.aB * body2.x)) + (jacobian.aC * body2.y))) + (((jacobian.ad * body2.z) + (jacobian.ae * body2.A)) + (jacobian.af * body2.B));
				var deltalambdaPrev = data.gi * ((data.gh - gWlambda) - (data.b2 * solverLambda));
				var deltalambda = (((solverLambda + deltalambdaPrev) - data.gg) < 0) ? (data.gg - solverLambda) : ((((solverLambda + deltalambdaPrev) - data.gf) > 0) ? (data.gf - solverLambda) : deltalambdaPrev);
				var $temp$body1 = A3($author$project$Internal$Solver$applyVelocityBody1, deltalambda, jacobian, body1),
					$temp$body2 = A3($author$project$Internal$Solver$applyVelocityBody2, deltalambda, jacobian, body2),
					$temp$acc = A2(
					$elm$core$List$cons,
					{e0: data, fg: contact.fg, fk: contact.fk, ge: solverLambda + deltalambda},
					acc),
					$temp$deltalambdaTot = deltalambdaTot + $elm$core$Basics$abs(deltalambda),
					$temp$contacts = rest;
				body1 = $temp$body1;
				body2 = $temp$body2;
				acc = $temp$acc;
				deltalambdaTot = $temp$deltalambdaTot;
				contacts = $temp$contacts;
				continue solveVelocityNormals;
			}
		}
	});
var $author$project$Internal$Solver$velocityNonFrictionGroup = F5(
	function (body1, body2, deltalambdaTot, contacts, constraints) {
		var afterConstraints = A5($author$project$Internal$Solver$solveVelocityConstraints, body1, body2, _List_Nil, deltalambdaTot, constraints);
		var afterNormals = A5($author$project$Internal$Solver$solveVelocityNormals, afterConstraints.eT, afterConstraints.eU, _List_Nil, afterConstraints.he, contacts);
		return {eT: afterNormals.eT, eU: afterNormals.eU, e_: afterConstraints.dS, e$: afterNormals.e$, he: afterNormals.he};
	});
var $author$project$Internal$Solver$solve2Body = F4(
	function (remainingIterations, group, arr, accGroups) {
		solve2Body:
		while (true) {
			var nonFriction = A5($author$project$Internal$Solver$velocityNonFrictionGroup, group.eT, group.eU, 0, group.e$, group.e_);
			var result = A5($author$project$Internal$Solver$velocityFrictionGroup, nonFriction.eT, nonFriction.eU, nonFriction.he, nonFriction.e$, nonFriction.e_);
			if (remainingIterations === 1) {
				return _Utils_Tuple3(
					A2(
						$author$project$Internal$Solver$flushBody,
						result.eU,
						A2($author$project$Internal$Solver$flushBody, result.eT, arr)),
					A2($elm$core$List$cons, result, accGroups),
					0);
			} else {
				if ((result.he - $author$project$Internal$Const$solverTolerance) < 0) {
					return _Utils_Tuple3(
						A2(
							$author$project$Internal$Solver$flushBody,
							result.eU,
							A2($author$project$Internal$Solver$flushBody, result.eT, arr)),
						A2($elm$core$List$cons, result, accGroups),
						remainingIterations - 1);
				} else {
					var $temp$remainingIterations = remainingIterations - 1,
						$temp$group = result,
						$temp$arr = arr,
						$temp$accGroups = accGroups;
					remainingIterations = $temp$remainingIterations;
					group = $temp$group;
					arr = $temp$arr;
					accGroups = $temp$accGroups;
					continue solve2Body;
				}
			}
		}
	});
var $author$project$Internal$Solver$FrictionPhase = 1;
var $author$project$Internal$Solver$NonFrictionPhase = 0;
var $author$project$Internal$Solver$sweep = F6(
	function (phase, prevBody1, solverBodies, acc, currentEquationsGroups, deltalambdaTot) {
		sweep:
		while (true) {
			if (!currentEquationsGroups.b) {
				return {he: deltalambdaTot, cU: acc, bh: prevBody1, b1: solverBodies};
			} else {
				var currentGroup = currentEquationsGroups.a;
				var remainingEquationsGroups = currentEquationsGroups.b;
				var bodyId2 = currentGroup.eU.dM.bt;
				var bodyId1 = currentGroup.eT.dM.bt;
				var newSolverBodies = ((!(prevBody1.dM.bt - bodyId1)) || (prevBody1.dM.fE !== 2)) ? solverBodies : A3($elm$core$Array$set, prevBody1.dM.bt, prevBody1, solverBodies);
				var body2 = function () {
					var _v3 = A2($elm$core$Array$get, bodyId2, newSolverBodies);
					if (!_v3.$) {
						var nextBody = _v3.a;
						return nextBody;
					} else {
						return prevBody1;
					}
				}();
				var body1 = function () {
					if (!(prevBody1.dM.bt - bodyId1)) {
						return prevBody1;
					} else {
						var _v2 = A2($elm$core$Array$get, bodyId1, solverBodies);
						if (!_v2.$) {
							var nextBody = _v2.a;
							return nextBody;
						} else {
							return prevBody1;
						}
					}
				}();
				var groupResult = function () {
					if (!phase) {
						return A5($author$project$Internal$Solver$velocityNonFrictionGroup, body1, body2, deltalambdaTot, currentGroup.e$, currentGroup.e_);
					} else {
						return A5($author$project$Internal$Solver$velocityFrictionGroup, body1, body2, deltalambdaTot, currentGroup.e$, currentGroup.e_);
					}
				}();
				var $temp$phase = phase,
					$temp$prevBody1 = groupResult.eT,
					$temp$solverBodies = (groupResult.eU.dM.fE === 2) ? A3($elm$core$Array$set, bodyId2, groupResult.eU, newSolverBodies) : newSolverBodies,
					$temp$acc = A2($elm$core$List$cons, groupResult, acc),
					$temp$currentEquationsGroups = remainingEquationsGroups,
					$temp$deltalambdaTot = groupResult.he;
				phase = $temp$phase;
				prevBody1 = $temp$prevBody1;
				solverBodies = $temp$solverBodies;
				acc = $temp$acc;
				currentEquationsGroups = $temp$currentEquationsGroups;
				deltalambdaTot = $temp$deltalambdaTot;
				continue sweep;
			}
		}
	});
var $author$project$Internal$Solver$step = F4(
	function (remainingIterations, prevBody1, solverBodies, currentEquationsGroups) {
		step:
		while (true) {
			var pass1 = A6($author$project$Internal$Solver$sweep, 0, prevBody1, solverBodies, _List_Nil, currentEquationsGroups, 0);
			var pass2 = A6(
				$author$project$Internal$Solver$sweep,
				1,
				pass1.bh,
				pass1.b1,
				_List_Nil,
				$elm$core$List$reverse(pass1.cU),
				0);
			var forwardResult = $elm$core$List$reverse(pass2.cU);
			var deltaTot = pass1.he + pass2.he;
			if (remainingIterations === 1) {
				return _Utils_Tuple3(
					A3($elm$core$Array$set, pass2.bh.dM.bt, pass2.bh, pass2.b1),
					forwardResult,
					0);
			} else {
				if ((deltaTot - $author$project$Internal$Const$solverTolerance) < 0) {
					return _Utils_Tuple3(
						A3($elm$core$Array$set, pass2.bh.dM.bt, pass2.bh, pass2.b1),
						forwardResult,
						remainingIterations - 1);
				} else {
					var $temp$remainingIterations = remainingIterations - 1,
						$temp$prevBody1 = pass2.bh,
						$temp$solverBodies = pass2.b1,
						$temp$currentEquationsGroups = forwardResult;
					remainingIterations = $temp$remainingIterations;
					prevBody1 = $temp$prevBody1;
					solverBodies = $temp$solverBodies;
					currentEquationsGroups = $temp$currentEquationsGroups;
					continue step;
				}
			}
		}
	});
var $author$project$Internal$Solver$solveOneIsland = F5(
	function (iterations, fillingBody, island, arr, accGroups) {
		if (island.b && (!island.b.b)) {
			var singleGroup = island.a;
			return A4($author$project$Internal$Solver$solve2Body, iterations, singleGroup, arr, accGroups);
		} else {
			var _v1 = A4($author$project$Internal$Solver$step, iterations, fillingBody, arr, island);
			var newArr = _v1.a;
			var newGroups = _v1.b;
			var remIters = _v1.c;
			return _Utils_Tuple3(
				newArr,
				_Utils_ap(newGroups, accGroups),
				remIters);
		}
	});
var $author$project$Internal$Transform3d$normalize = function (_v0) {
	var localOrigin = _v0.a;
	var _v1 = _v0.b;
	var x = _v1.a;
	var y = _v1.b;
	var z = _v1.c;
	var w = _v1.d;
	var len = $elm$core$Basics$sqrt((((x * x) + (y * y)) + (z * z)) + (w * w));
	return A2(
		$author$project$Internal$Transform3d$Transform3d,
		localOrigin,
		A4($author$project$Internal$Transform3d$Orientation3d, x / len, y / len, z / len, w / len));
};
var $author$project$Internal$Transform3d$rotateBy = F2(
	function (_v0, _v1) {
		var z = _v0.p;
		var y = _v0.o;
		var x = _v0.n;
		var localOrigin = _v1.a;
		var _v2 = _v1.b;
		var qx = _v2.a;
		var qy = _v2.b;
		var qz = _v2.c;
		var qw = _v2.d;
		return A2(
			$author$project$Internal$Transform3d$Transform3d,
			localOrigin,
			A4($author$project$Internal$Transform3d$Orientation3d, qx + ((((x * qw) + (y * qz)) - (z * qy)) * 0.5), qy + ((((y * qw) + (z * qx)) - (x * qz)) * 0.5), qz + ((((z * qw) + (x * qy)) - (y * qx)) * 0.5), qw + (((((-x) * qx) - (y * qy)) - (z * qz)) * 0.5)));
	});
var $author$project$Internal$SolverBody$solved = F3(
	function (dt, gravity, solverBody) {
		var body = solverBody.dM;
		var _v0 = body.fE;
		switch (_v0) {
			case 1:
				return _Utils_Tuple2(solverBody.at, body);
			case 3:
				var w = body.eR;
				var v = body.gS;
				var newTransform3d = $author$project$Internal$Transform3d$normalize(
					A2(
						$author$project$Internal$Transform3d$translateBy,
						{n: v.n * dt, o: v.o * dt, p: v.p * dt},
						A2(
							$author$project$Internal$Transform3d$rotateBy,
							{n: w.n * dt, o: w.o * dt, p: w.p * dt},
							body.gP)));
				return _Utils_Tuple2(
					solverBody.at,
					{
						eP: body.eP,
						eQ: body.eQ,
						eR: body.eR,
						eX: body.eX,
						fa: $author$project$Internal$Vector3$zero,
						fp: body.fp,
						bt: body.bt,
						fz: body.fz,
						fA: body.fA,
						fB: body.fB,
						fE: body.fE,
						fL: body.fL,
						fM: body.fM,
						f1: body.f1,
						gL: $author$project$Internal$Vector3$zero,
						gP: newTransform3d,
						gS: body.gS,
						gW: A2(
							$elm$core$List$map,
							function (_v1) {
								var s = _v1.a;
								var m = _v1.b;
								return _Utils_Tuple2(
									A2($author$project$Internal$Shape$placeIn, newTransform3d, s),
									m);
							},
							body.fp.eA)
					});
			default:
				var ld = A2($elm$core$Basics$pow, 1.0 - body.fL, dt);
				var newVelocity = {n: ((((gravity.n + (body.fa.n * body.fB)) * dt) + (body.gS.n * ld)) + solverBody.w) * body.fM.n, o: ((((gravity.o + (body.fa.o * body.fB)) * dt) + (body.gS.o * ld)) + solverBody.x) * body.fM.o, p: ((((gravity.p + (body.fa.p * body.fB)) * dt) + (body.gS.p * ld)) + solverBody.y) * body.fM.p};
				var velocityLength = $author$project$Internal$Vector3$length(newVelocity);
				var boundingSphereRadius = body.fp.ca;
				var cappedVelocity = ((!velocityLength) || ((!boundingSphereRadius) || (((velocityLength * dt) - boundingSphereRadius) < 0))) ? newVelocity : A2($author$project$Internal$Vector3$scale, boundingSphereRadius / (velocityLength * dt), newVelocity);
				var ad = A2($elm$core$Basics$pow, 1.0 - body.eP, dt);
				var newAngularVelocity = {n: ((((((body.fA.fN * body.gL.n) + (body.fA.fO * body.gL.o)) + (body.fA.fP * body.gL.p)) * dt) + (body.eR.n * ad)) + solverBody.z) * body.eQ.n, o: ((((((body.fA.fR * body.gL.n) + (body.fA.fS * body.gL.o)) + (body.fA.fT * body.gL.p)) * dt) + (body.eR.o * ad)) + solverBody.A) * body.eQ.o, p: ((((((body.fA.fV * body.gL.n) + (body.fA.fW * body.gL.o)) + (body.fA.fX * body.gL.p)) * dt) + (body.eR.p * ad)) + solverBody.B) * body.eQ.p};
				var newTransform3d = $author$project$Internal$Transform3d$normalize(
					A2(
						$author$project$Internal$Transform3d$translateBy,
						{n: cappedVelocity.n * dt, o: cappedVelocity.o * dt, p: cappedVelocity.p * dt},
						A2(
							$author$project$Internal$Transform3d$rotateBy,
							{n: newAngularVelocity.n * dt, o: newAngularVelocity.o * dt, p: newAngularVelocity.p * dt},
							body.gP)));
				return _Utils_Tuple2(
					solverBody.at,
					{
						eP: body.eP,
						eQ: body.eQ,
						eR: newAngularVelocity,
						eX: body.eX,
						fa: $author$project$Internal$Vector3$zero,
						fp: body.fp,
						bt: body.bt,
						fz: body.fz,
						fA: A2($author$project$Internal$Transform3d$invertedInertiaRotateIn, newTransform3d, body.fz),
						fB: body.fB,
						fE: body.fE,
						fL: body.fL,
						fM: body.fM,
						f1: body.f1,
						gL: $author$project$Internal$Vector3$zero,
						gP: newTransform3d,
						gS: newVelocity,
						gW: A2(
							$elm$core$List$map,
							function (_v2) {
								var s = _v2.a;
								var m = _v2.b;
								return _Utils_Tuple2(
									A2($author$project$Internal$Shape$placeIn, newTransform3d, s),
									m);
							},
							body.fp.eA)
					});
		}
	});
var $author$project$Internal$Solver$solve = F7(
	function (dt, gravity, iterations, pairGroups, maxId, bodiesWithIds, warmStart) {
		if (!bodiesWithIds.b) {
			return {dL: $elm$core$Array$empty, d_: 0, ei: pairGroups, gV: $author$project$Internal$ContactCache$empty};
		} else {
			var _v1 = bodiesWithIds.a;
			var firstExtId = _v1.a;
			var solverBodies = A2($author$project$Internal$SolverBody$fromBodies, maxId, bodiesWithIds);
			var fillingBody = $author$project$Internal$SolverBody$sentinel(firstExtId);
			var ctx = {
				T: dt,
				fq: gravity,
				hy: $author$project$Internal$Vector3$length(gravity),
				gV: warmStart
			};
			var _v2 = A6(
				$author$project$Internal$Solver$buildAndWarmStart,
				ctx,
				fillingBody,
				solverBodies,
				$author$project$Internal$Islands$init(maxId),
				_List_Nil,
				pairGroups);
			var equationsGroups = _v2.a;
			var warmStartedBodies = _v2.b;
			var islands = _v2.c;
			var _v3 = A4(
				$author$project$Internal$Islands$fold,
				F2(
					function (island, _v4) {
						var arr = _v4.a;
						var accGroups = _v4.b;
						var minRem = _v4.c;
						var _v5 = A5($author$project$Internal$Solver$solveOneIsland, iterations, fillingBody, island, arr, accGroups);
						var newArr = _v5.a;
						var newGroups = _v5.b;
						var remIters = _v5.c;
						return _Utils_Tuple3(
							newArr,
							newGroups,
							A2($author$project$Internal$Solver$minInt, minRem, remIters));
					}),
				_Utils_Tuple3(warmStartedBodies, _List_Nil, iterations),
				equationsGroups,
				islands);
			var finalSolverBodies = _v3.a;
			var finalEquationsGroups = _v3.b;
			var minRemainingIterations = _v3.c;
			var finalWarmStart = A2($author$project$Internal$Solver$collectGroupCaches, finalEquationsGroups, $author$project$Internal$ContactCache$empty);
			var integratedBodies = A2(
				$elm$core$Array$map,
				A2($author$project$Internal$SolverBody$solved, dt, gravity),
				finalSolverBodies);
			var iterationsUsed = A2($author$project$Internal$Solver$maxInt, 1, iterations - minRemainingIterations);
			return {dL: integratedBodies, d_: iterationsUsed, ei: pairGroups, gV: finalWarmStart};
		}
	});
var $author$project$Physics$simulate = F2(
	function (config, bodiesWithIds) {
		var gravityVec = $ianmackenzie$elm_geometry$Vector3d$unwrap(config.fq);
		var dt = $ianmackenzie$elm_units$Duration$inSeconds(config.e4);
		var _v0 = $author$project$Internal$AssignIds$assignIds(bodiesWithIds);
		var internalBodiesWithIds = _v0.a;
		var maxId = _v0.b;
		var sortedBodies = function () {
			var projection = function (_v4) {
				var body = _v4.b;
				var p = $author$project$Internal$Transform3d$originPoint(body.gP);
				return -(((p.n * gravityVec.n) + (p.o * gravityVec.o)) + (p.p * gravityVec.p));
			};
			return A2(
				$elm$core$List$map,
				$elm$core$Tuple$second,
				A2(
					$elm$core$List$sortWith,
					F2(
						function (_v2, _v3) {
							var a = _v2.a;
							var b = _v3.a;
							return ((a - b) < 0) ? 0 : (((a - b) > 0) ? 2 : 1);
						}),
					A2(
						$elm$core$List$map,
						function (item) {
							return _Utils_Tuple2(
								projection(item),
								item);
						},
						internalBodiesWithIds)));
		}();
		var pairGroups = A3($author$project$Internal$BroadPhase$getPairs, config.dQ, config.dR, sortedBodies);
		var _v1 = config.e$;
		var cache = _v1;
		var solverResult = A7($author$project$Internal$Solver$solve, dt, gravityVec, config.eD, pairGroups, maxId, sortedBodies, cache.gV);
		return _Utils_Tuple2(
			$elm$core$List$reverse(
				A3($author$project$Physics$outputBodiesHelp, solverResult.dL, internalBodiesWithIds, _List_Nil)),
			solverResult);
	});
var $author$project$Internal$Body$applyTorque = F2(
	function (torque, body) {
		return {
			eP: body.eP,
			eQ: body.eQ,
			eR: body.eR,
			eX: body.eX,
			fa: body.fa,
			fp: body.fp,
			bt: body.bt,
			fz: body.fz,
			fA: body.fA,
			fB: body.fB,
			fE: body.fE,
			fL: body.fL,
			fM: body.fM,
			f1: body.f1,
			gL: A2($author$project$Internal$Vector3$add, body.gL, torque),
			gP: body.gP,
			gS: body.gS,
			gW: body.gW
		};
	});
var $author$project$Physics$applyTorque = F2(
	function (torque, original) {
		var body = original;
		return (body.fE === 2) ? A2(
			$author$project$Internal$Body$applyTorque,
			$ianmackenzie$elm_geometry$Vector3d$unwrap(torque),
			body) : original;
	});
var $ianmackenzie$elm_3d_camera$Camera3d$frame = function (_v0) {
	var camera = _v0;
	return $ianmackenzie$elm_geometry$Frame3d$copy(camera.fd);
};
var $author$project$Physics$frame = function (_v0) {
	var centerOfMassTransform3d = _v0.eX;
	var transform3d = _v0.gP;
	var bodyCoordinatesTransform3d = A2(
		$author$project$Internal$Transform3d$placeIn,
		transform3d,
		$author$project$Internal$Transform3d$inverse(centerOfMassTransform3d));
	var _v1 = $author$project$Internal$Transform3d$orientation(bodyCoordinatesTransform3d);
	var m33 = _v1.fX;
	var m23 = _v1.fT;
	var m13 = _v1.fP;
	var m32 = _v1.fW;
	var m22 = _v1.fS;
	var m12 = _v1.fO;
	var m31 = _v1.fV;
	var m21 = _v1.fR;
	var m11 = _v1.fN;
	return $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			gl: $ianmackenzie$elm_geometry$Point3d$fromMeters(
				$author$project$Internal$Transform3d$originPoint(bodyCoordinatesTransform3d)),
			gX: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{n: m11, o: m21, p: m31}),
			gY: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{n: m12, o: m22, p: m32}),
			g_: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{n: m13, o: m23, p: m33})
		});
};
var $ianmackenzie$elm_3d_camera$Camera3d$Perspective = 0;
var $ianmackenzie$elm_3d_camera$Camera3d$Angle = function (a) {
	return {$: 0, a: a};
};
var $ianmackenzie$elm_3d_camera$Camera3d$angle = function (givenAngle) {
	return $ianmackenzie$elm_3d_camera$Camera3d$Angle(givenAngle);
};
var $ianmackenzie$elm_units$Angle$radians = function (numRadians) {
	return numRadians;
};
var $ianmackenzie$elm_units$Angle$degrees = function (numDegrees) {
	return $ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi * (numDegrees / 180));
};
var $ianmackenzie$elm_geometry$Vector3d$direction = function (_v0) {
	var v = _v0;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.n),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.o),
			$elm$core$Basics$abs(v.p)));
	if (!largestComponent) {
		return $elm$core$Maybe$Nothing;
	} else {
		var scaledZ = v.p / largestComponent;
		var scaledY = v.o / largestComponent;
		var scaledX = v.n / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return $elm$core$Maybe$Just(
			{n: scaledX / scaledLength, o: scaledY / scaledLength, p: scaledZ / scaledLength});
	}
};
var $ianmackenzie$elm_geometry$Point3d$distanceFrom = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		var deltaZ = p2.p - p1.p;
		var deltaY = p2.o - p1.o;
		var deltaX = p2.n - p1.n;
		var largestComponent = A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(deltaX),
			A2(
				$elm$core$Basics$max,
				$elm$core$Basics$abs(deltaY),
				$elm$core$Basics$abs(deltaZ)));
		if (!largestComponent) {
			return $ianmackenzie$elm_units$Quantity$zero;
		} else {
			var scaledZ = deltaZ / largestComponent;
			var scaledY = deltaY / largestComponent;
			var scaledX = deltaX / largestComponent;
			var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
			return scaledLength * largestComponent;
		}
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$dot = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return ((v1.n * v2.n) + (v1.o * v2.o)) + (v1.p * v2.p);
	});
var $ianmackenzie$elm_units$Quantity$greaterThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) > 0;
	});
var $ianmackenzie$elm_units$Quantity$lessThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) < 0;
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$minus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {n: v1.n - v2.n, o: v1.o - v2.o, p: v1.p - v2.p};
	});
var $ianmackenzie$elm_geometry$Vector3d$projectionIn = F2(
	function (_v0, _v1) {
		var d = _v0;
		var v = _v1;
		var projectedLength = ((v.n * d.n) + (v.o * d.o)) + (v.p * d.p);
		return {n: d.n * projectedLength, o: d.o * projectedLength, p: d.p * projectedLength};
	});
var $ianmackenzie$elm_geometry$Vector3d$reverse = function (_v0) {
	var v = _v0;
	return {n: -v.n, o: -v.o, p: -v.p};
};
var $ianmackenzie$elm_geometry$Direction3d$orthonormalize = F3(
	function (xVector, xyVector, xyzVector) {
		return A2(
			$elm$core$Maybe$andThen,
			function (xDirection) {
				var yVector = A2(
					$ianmackenzie$elm_geometry$Vector3d$minus,
					A2($ianmackenzie$elm_geometry$Vector3d$projectionIn, xDirection, xyVector),
					xyVector);
				return A2(
					$elm$core$Maybe$andThen,
					function (yDirection) {
						var rightHandedZVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, xyVector, xVector);
						var tripleProduct = A2($ianmackenzie$elm_geometry$Vector3d$dot, xyzVector, rightHandedZVector);
						var zVector = A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? rightHandedZVector : (A2($ianmackenzie$elm_units$Quantity$lessThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? $ianmackenzie$elm_geometry$Vector3d$reverse(rightHandedZVector) : $ianmackenzie$elm_geometry$Vector3d$zero);
						return A2(
							$elm$core$Maybe$map,
							function (zDirection) {
								return _Utils_Tuple3(xDirection, yDirection, zDirection);
							},
							$ianmackenzie$elm_geometry$Vector3d$direction(zVector));
					},
					$ianmackenzie$elm_geometry$Vector3d$direction(yVector));
			},
			$ianmackenzie$elm_geometry$Vector3d$direction(xVector));
	});
var $ianmackenzie$elm_geometry$Direction3d$perpendicularTo = function (_v0) {
	var d = _v0;
	var absZ = $elm$core$Basics$abs(d.p);
	var absY = $elm$core$Basics$abs(d.o);
	var absX = $elm$core$Basics$abs(d.n);
	if (_Utils_cmp(absX, absY) < 1) {
		if (_Utils_cmp(absX, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.p * d.p) + (d.o * d.o));
			return {n: 0, o: (-d.p) / scale, p: d.o / scale};
		} else {
			var scale = $elm$core$Basics$sqrt((d.o * d.o) + (d.n * d.n));
			return {n: (-d.o) / scale, o: d.n / scale, p: 0};
		}
	} else {
		if (_Utils_cmp(absY, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.p * d.p) + (d.n * d.n));
			return {n: d.p / scale, o: 0, p: (-d.n) / scale};
		} else {
			var scale = $elm$core$Basics$sqrt((d.n * d.n) + (d.o * d.o));
			return {n: (-d.o) / scale, o: d.n / scale, p: 0};
		}
	}
};
var $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis = function (direction) {
	var xDirection = $ianmackenzie$elm_geometry$Direction3d$perpendicularTo(direction);
	var _v0 = xDirection;
	var dX = _v0;
	var _v1 = direction;
	var d = _v1;
	var yDirection = {n: (d.o * dX.p) - (d.p * dX.o), o: (d.p * dX.n) - (d.n * dX.p), p: (d.n * dX.o) - (d.o * dX.n)};
	return _Utils_Tuple2(xDirection, yDirection);
};
var $ianmackenzie$elm_geometry$Geometry$Types$SketchPlane3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$SketchPlane3d$unsafe = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_camera$Camera3d$Camera3d = $elm$core$Basics$identity;
var $elm$core$Basics$atan2 = _Basics_atan2;
var $ianmackenzie$elm_units$Angle$atan2 = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return A2($elm$core$Basics$atan2, y, x);
	});
var $ianmackenzie$elm_units$Quantity$half = function (_v0) {
	var value = _v0;
	return 0.5 * value;
};
var $ianmackenzie$elm_geometry$Unsafe$Direction3d$unsafeCrossProduct = F2(
	function (_v0, _v1) {
		var d1 = _v0;
		var d2 = _v1;
		return {n: (d1.o * d2.p) - (d1.p * d2.o), o: (d1.p * d2.n) - (d1.n * d2.p), p: (d1.n * d2.o) - (d1.o * d2.n)};
	});
var $ianmackenzie$elm_geometry$SketchPlane3d$xDirection = function (_v0) {
	var properties = _v0;
	return properties.gX;
};
var $ianmackenzie$elm_geometry$SketchPlane3d$yDirection = function (_v0) {
	var properties = _v0;
	return properties.gY;
};
var $ianmackenzie$elm_geometry$SketchPlane3d$normalDirection = function (sketchPlane) {
	return A2(
		$ianmackenzie$elm_geometry$Unsafe$Direction3d$unsafeCrossProduct,
		$ianmackenzie$elm_geometry$SketchPlane3d$xDirection(sketchPlane),
		$ianmackenzie$elm_geometry$SketchPlane3d$yDirection(sketchPlane));
};
var $ianmackenzie$elm_geometry$SketchPlane3d$originPoint = function (_v0) {
	var properties = _v0;
	return properties.gl;
};
var $ianmackenzie$elm_geometry$SketchPlane3d$toFrame = function (sketchPlane) {
	return {
		gl: $ianmackenzie$elm_geometry$SketchPlane3d$originPoint(sketchPlane),
		gX: $ianmackenzie$elm_geometry$SketchPlane3d$xDirection(sketchPlane),
		gY: $ianmackenzie$elm_geometry$SketchPlane3d$yDirection(sketchPlane),
		g_: $ianmackenzie$elm_geometry$SketchPlane3d$normalDirection(sketchPlane)
	};
};
var $ianmackenzie$elm_units$Quantity$twice = function (_v0) {
	var value = _v0;
	return 2 * value;
};
var $ianmackenzie$elm_3d_camera$Camera3d$with = function (given) {
	return {
		bR: given.bR,
		fb: function () {
			var _v0 = given.hw;
			if (!_v0.$) {
				var givenAngle = _v0.a;
				return givenAngle;
			} else {
				var givenHeight = _v0.a;
				return $ianmackenzie$elm_units$Quantity$twice(
					A2(
						$ianmackenzie$elm_units$Angle$atan2,
						$ianmackenzie$elm_units$Quantity$half(givenHeight),
						given.bR));
			}
		}(),
		fd: $ianmackenzie$elm_geometry$SketchPlane3d$toFrame(given.eL),
		h1: given.h1
	};
};
var $ianmackenzie$elm_geometry$SketchPlane3d$through = F2(
	function (givenOrigin, givenNormalDirection) {
		var _v0 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(givenNormalDirection);
		var computedXDirection = _v0.a;
		var computedYDirection = _v0.b;
		return $ianmackenzie$elm_geometry$SketchPlane3d$unsafe(
			{gl: givenOrigin, gX: computedXDirection, gY: computedYDirection});
	});
var $ianmackenzie$elm_geometry$SketchPlane3d$withNormalDirection = F2(
	function (givenNormalDirection, givenOrigin) {
		return A2($ianmackenzie$elm_geometry$SketchPlane3d$through, givenOrigin, givenNormalDirection);
	});
var $ianmackenzie$elm_3d_camera$Camera3d$lookAt = function (given) {
	var zVector = A2($ianmackenzie$elm_geometry$Vector3d$from, given.hu, given.hq);
	var yVector = $ianmackenzie$elm_geometry$Direction3d$toVector(given.ii);
	var xVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, zVector, yVector);
	var computedViewPlane = function () {
		var _v0 = A3($ianmackenzie$elm_geometry$Direction3d$orthonormalize, zVector, yVector, xVector);
		if (!_v0.$) {
			var _v1 = _v0.a;
			var normalizedZDirection = _v1.a;
			var normalizedYDirection = _v1.b;
			var normalizedXDirection = _v1.c;
			return $ianmackenzie$elm_geometry$SketchPlane3d$unsafe(
				{gl: given.hq, gX: normalizedXDirection, gY: normalizedYDirection});
		} else {
			var _v2 = $ianmackenzie$elm_geometry$Vector3d$direction(zVector);
			if (!_v2.$) {
				var zDirection = _v2.a;
				return A2($ianmackenzie$elm_geometry$SketchPlane3d$withNormalDirection, zDirection, given.hq);
			} else {
				var _v3 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(given.ii);
				var arbitraryZDirection = _v3.a;
				var arbitraryXDirection = _v3.b;
				return $ianmackenzie$elm_geometry$SketchPlane3d$unsafe(
					{gl: given.hq, gX: arbitraryXDirection, gY: given.ii});
			}
		}
	}();
	return $ianmackenzie$elm_3d_camera$Camera3d$with(
		{
			bR: A2($ianmackenzie$elm_geometry$Point3d$distanceFrom, given.hq, given.hu),
			hw: given.hw,
			h1: given.h1,
			eL: computedViewPlane
		});
};
var $ianmackenzie$elm_geometry$Point3d$unsafe = function (givenCoordinates) {
	return givenCoordinates;
};
var $author$project$Main$makeCamera = function (playerPosition) {
	var pp = $ianmackenzie$elm_geometry$Point3d$unwrap(playerPosition);
	return $ianmackenzie$elm_3d_camera$Camera3d$lookAt(
		{
			hq: $ianmackenzie$elm_geometry$Point3d$unsafe(
				{n: 3, o: 3, p: pp.p + 3}),
			hu: $ianmackenzie$elm_geometry$Point3d$unsafe(
				{n: 0, o: 0, p: pp.p}),
			hw: $ianmackenzie$elm_3d_camera$Camera3d$angle(
				$ianmackenzie$elm_units$Angle$degrees(90)),
			h1: 0,
			ii: $ianmackenzie$elm_geometry$Direction3d$z
		});
};
var $ianmackenzie$elm_units$Torque$newtonMeters = function (numNewtonMeters) {
	return numNewtonMeters;
};
var $ianmackenzie$elm_geometry$Vector3d$withLength = F2(
	function (_v0, _v1) {
		var a = _v0;
		var d = _v1;
		return {n: a * d.n, o: a * d.o, p: a * d.p};
	});
var $author$project$Main$updatePlayerBall = F2(
	function (keysDown, body) {
		var applyRight = A2($elm$core$Set$member, 'ArrowRight', keysDown) || A2($elm$core$Set$member, 'd', keysDown);
		var applyLeft = A2($elm$core$Set$member, 'ArrowLeft', keysDown) || A2($elm$core$Set$member, 'a', keysDown);
		var applyForward = A2($elm$core$Set$member, 'ArrowUp', keysDown) || A2($elm$core$Set$member, 'w', keysDown);
		var applyBackward = A2($elm$core$Set$member, 'ArrowDown', keysDown) || A2($elm$core$Set$member, 's', keysDown);
		if (applyForward || (applyBackward || (applyLeft || applyRight))) {
			var cameraFrame = $ianmackenzie$elm_3d_camera$Camera3d$frame(
				$author$project$Main$makeCamera(
					$ianmackenzie$elm_geometry$Frame3d$originPoint(
						$author$project$Physics$frame(body))));
			var horizontalParts = (applyLeft && applyRight) ? {n: 0, o: 0, p: 0} : (applyLeft ? function (p) {
				return {n: -p.n, o: -p.o, p: 0};
			}(
				$ianmackenzie$elm_geometry$Direction3d$unwrap(
					$ianmackenzie$elm_geometry$Frame3d$yDirection(cameraFrame))) : (applyRight ? $ianmackenzie$elm_geometry$Direction3d$unwrap(
				$ianmackenzie$elm_geometry$Frame3d$yDirection(cameraFrame)) : {n: 0, o: 0, p: 0}));
			var verticalParts = (applyForward && applyBackward) ? {n: 0, o: 0, p: 0} : (applyForward ? function (p) {
				return {n: -p.n, o: -p.o, p: 0};
			}(
				$ianmackenzie$elm_geometry$Direction3d$unwrap(
					$ianmackenzie$elm_geometry$Frame3d$xDirection(cameraFrame))) : (applyBackward ? $ianmackenzie$elm_geometry$Direction3d$unwrap(
				$ianmackenzie$elm_geometry$Frame3d$xDirection(cameraFrame)) : {n: 0, o: 0, p: 0}));
			return A2(
				$author$project$Physics$applyTorque,
				A2(
					$ianmackenzie$elm_geometry$Vector3d$withLength,
					$ianmackenzie$elm_units$Torque$newtonMeters(150),
					$ianmackenzie$elm_geometry$Direction3d$unsafe(
						{n: verticalParts.n + horizontalParts.n, o: verticalParts.o + horizontalParts.o, p: 0})),
				body);
		} else {
			return body;
		}
	});
var $author$project$Main$simulateStep = function (game) {
	var _v0 = A2(
		$author$project$Physics$simulate,
		_Utils_update(
			$author$project$Physics$onEarth,
			{
				e$: game.e$,
				e4: $w0rm$elm_timestep$Timestep$duration(game.ds)
			}),
		A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				$author$project$Main$Ball,
				A2($author$project$Main$updatePlayerBall, game.bb, game.aM)),
			game.dL));
	var newBodies = _v0.a;
	var newContacts = _v0.b;
	var _v1 = A2($author$project$Main$extractPlayer, game.aM, newBodies);
	var player = _v1.a;
	var bodies = _v1.b;
	return _Utils_update(
		game,
		{dL: bodies, e$: newContacts, aM: player});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Material$map = F2(
	function (_function, texture) {
		if (!texture.$) {
			var value = texture.a;
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$Constant(
				_function(value));
		} else {
			var properties = texture.a;
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$Texture(properties);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Material$texturedMatte = function (colorTexture) {
	return A4(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$LambertianMaterial,
		0,
		A2($ianmackenzie$elm_3d_scene$Scene3d$Material$map, $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToLinearRgb, colorTexture),
		$ianmackenzie$elm_3d_scene$Scene3d$Material$constant(1),
		$ianmackenzie$elm_3d_scene$Scene3d$Types$NoNormalMap);
};
var $ianmackenzie$elm_units$Quantity$unwrap = function (_v0) {
	var value = _v0;
	return value;
};
var $author$project$Main$animateGoals = F2(
	function (delta, _v0) {
		var hole = _v0.a;
		var hue = _v0.b;
		var life = _v0.c;
		var remainingLife = A2($ianmackenzie$elm_units$Quantity$minus, delta, life);
		if (A2(
			$ianmackenzie$elm_units$Quantity$greaterThan,
			$ianmackenzie$elm_units$Duration$seconds(0),
			remainingLife)) {
			var newHue = hue + ($ianmackenzie$elm_units$Duration$inSeconds(delta) / 2.5);
			return $elm$core$Maybe$Just(
				_Utils_Tuple3(
					hole,
					(newHue > 1) ? (newHue - 1) : newHue,
					remainingLife));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Main$goalLife = $ianmackenzie$elm_units$Duration$seconds(0.5);
var $author$project$Main$maxFloors = 8;
var $author$project$Main$updateFloors = F3(
	function (delta, game, model) {
		if (_Utils_cmp(
			$ianmackenzie$elm_units$Length$inMeters(
				$ianmackenzie$elm_geometry$Point3d$zCoordinate(
					$ianmackenzie$elm_geometry$Frame3d$originPoint(
						$author$project$Physics$frame(game.aM)))),
			(game.q - $author$project$Main$maxFloors) * $author$project$Main$floorSpacing) < 0) {
			var newFloor = A2($author$project$Main$nextFloor, game.q, model.Y);
			var _v0 = newFloor.aI;
			var holeX = _v0.a;
			var holeY = _v0.b;
			var _v1 = function () {
				var _v2 = game.cz;
				if (!_v2.b) {
					return _Utils_Tuple2(
						game.S,
						_List_fromArray(
							[
								$ianmackenzie$elm_geometry$Frame3d$atPoint(
								A3($ianmackenzie$elm_geometry$Point3d$meters, holeX, holeY, (newFloor.q - 1) * $author$project$Main$floorSpacing))
							]));
				} else {
					var cg = _v2.a;
					var up = _v2.b;
					return _Utils_Tuple2(
						_Utils_Tuple2(cg, 0),
						_Utils_ap(
							up,
							_List_fromArray(
								[
									$ianmackenzie$elm_geometry$Frame3d$atPoint(
									A3($ianmackenzie$elm_geometry$Point3d$meters, holeX, holeY, (newFloor.q - 1) * $author$project$Main$floorSpacing))
								])));
				}
			}();
			var currentGoal = _v1.a;
			var upcomingGoals = _v1.b;
			var _v3 = game.S;
			var holeFrame = _v3.a;
			var holeHue = _v3.b;
			var nextGame = _Utils_update(
				game,
				{
					dL: _Utils_ap(
						newFloor.dL,
						A2(
							$elm$core$List$filter,
							function (_v4) {
								var id = _v4.a;
								if (id.$ === 1) {
									var height = id.a;
									return _Utils_cmp(height, game.q - $author$project$Main$maxFloors) > 0;
								} else {
									return true;
								}
							},
							game.dL)),
					S: currentGoal,
					q: newFloor.q,
					bq: function () {
						var _v6 = game.bq;
						if (!_v6.b) {
							return game.bq;
						} else {
							var restFloors = _v6.b;
							return _Utils_ap(
								restFloors,
								_List_fromArray(
									[newFloor.aG]));
						}
					}(),
					a0: A2(
						$elm$core$List$filterMap,
						$author$project$Main$animateGoals(delta),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple3(holeFrame, holeHue, $author$project$Main$goalLife),
							game.a0)),
					a1: A2($ianmackenzie$elm_units$Quantity$minus, delta, game.a1),
					cz: upcomingGoals
				});
			return _Utils_Tuple3(
				nextGame,
				_Utils_update(
					model,
					{
						k: $author$project$Main$Loaded(nextGame),
						Y: newFloor.Y
					}),
				true);
		} else {
			var _v7 = game.S;
			var hole = _v7.a;
			var holeHue = _v7.b;
			var newHue = holeHue + ($ianmackenzie$elm_units$Duration$inSeconds(delta) / 2.5);
			return _Utils_Tuple3(
				game,
				_Utils_update(
					model,
					{
						k: $author$project$Main$Loaded(
							_Utils_update(
								game,
								{
									S: _Utils_Tuple2(
										hole,
										(newHue > 1) ? (newHue - 1) : newHue),
									a0: A2(
										$elm$core$List$filterMap,
										$author$project$Main$animateGoals(delta),
										game.a0),
									a1: A2($ianmackenzie$elm_units$Quantity$minus, delta, game.a1)
								}))
					}),
				false);
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 1:
				var width = msg.a;
				var height = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bs: height, bD: width}),
					$elm$core$Platform$Cmd$none);
			case 0:
				if (msg.a.$ === 1) {
					var err = msg.a.a;
					var _v1 = model.k;
					if (!_v1.$) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									k: $author$project$Main$Failure(err)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					var _v2 = msg.a.a;
					var _v3 = _v2.a;
					var ballMesh = _v3.a;
					var ballTexture = _v3.b;
					var holeMesh = _v2.b;
					var goalRingMesh = _v2.c;
					var _v4 = model.k;
					if (!_v4.$) {
						var assets = {
							dE: $ianmackenzie$elm_3d_scene$Scene3d$Material$texturedMatte(ballTexture),
							dF: ballMesh,
							dG: $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadow(ballMesh),
							cR: goalRingMesh,
							ft: holeMesh,
							fu: $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadow(holeMesh)
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									k: $author$project$Main$Loaded(
										{
											aZ: assets,
											dL: _List_Nil,
											e$: $author$project$Physics$emptyContacts,
											S: _Utils_Tuple2($ianmackenzie$elm_geometry$Frame3d$atOrigin, 0),
											q: 0,
											bq: _List_Nil,
											bb: $elm$core$Set$empty,
											aM: $author$project$Main$initPlayer,
											a0: _List_Nil,
											a1: $author$project$Main$initTimer,
											Z: $author$project$Main$MainMenu,
											ds: $author$project$Main$initTimestep,
											cz: _List_Nil
										})
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				}
			case 3:
				var _v5 = model.k;
				if (_v5.$ === 2) {
					var game = _v5.a;
					var _v6 = game.Z;
					if (!_v6.$) {
						return A2($author$project$Main$initNewGame, model, game);
					} else {
						if (_v6.a === 2) {
							var _v7 = _v6.a;
							return A2($author$project$Main$initNewGame, model, game);
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 5:
				var delta = msg.a;
				var _v8 = model.k;
				if (_v8.$ === 2) {
					var game = _v8.a;
					var _v9 = game.Z;
					if (!_v9.$) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						switch (_v9.a) {
							case 2:
								var _v10 = _v9.a;
								return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							case 1:
								var _v11 = _v9.a;
								return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							default:
								var _v12 = _v9.a;
								if ($ianmackenzie$elm_units$Quantity$lessThanOrEqualToZero(game.a1)) {
									return _Utils_Tuple2(
										_Utils_update(
											model,
											{
												k: $author$project$Main$Loaded(
													_Utils_update(
														game,
														{
															Z: $author$project$Main$Playing(2)
														}))
											}),
										$elm$core$Platform$Cmd$none);
								} else {
									var _v13 = A3(
										$author$project$Main$updateFloors,
										delta,
										A3($w0rm$elm_timestep$Timestep$advance, $author$project$Main$simulateStep, delta, game),
										model);
									var nextGame = _v13.a;
									var nextModel = _v13.b;
									var goalMade = _v13.c;
									var ballHits = A3(
										$elm$core$List$foldl,
										function (_v14) {
											var contacts = _v14.c;
											return $elm$core$Basics$append(
												A2(
													$elm$core$List$filterMap,
													function (_v15) {
														var impulse = _v15.hG;
														return ($ianmackenzie$elm_units$Quantity$unwrap(impulse) > 65) ? $elm$core$Maybe$Just(
															$author$project$Main$playSound(
																{cr: 'ball_hit', eM: 0.3})) : $elm$core$Maybe$Nothing;
													},
													contacts));
										},
										_List_Nil,
										A2(
											$author$project$Physics$contactPoints,
											F2(
												function (id1, id2) {
													return _Utils_eq(id1, $author$project$Main$Ball) || _Utils_eq(id2, $author$project$Main$Ball);
												}),
											nextGame.e$));
									return _Utils_Tuple2(
										nextModel,
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													$elm$core$Platform$Cmd$batch(ballHits),
													goalMade ? $author$project$Main$playSound(
													{cr: 'goal_made', eM: 0.4}) : $elm$core$Platform$Cmd$none
												])));
								}
						}
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 2:
				if (!msg.a) {
					var _v16 = msg.a;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var _v17 = msg.a;
					var _v18 = model.k;
					if (_v18.$ === 2) {
						var game = _v18.a;
						var _v19 = game.Z;
						if ((_v19.$ === 1) && (!_v19.a)) {
							var _v20 = _v19.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										k: $author$project$Main$Loaded(
											_Utils_update(
												game,
												{
													Z: $author$project$Main$Playing(1)
												}))
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				}
			case 4:
				var _v21 = model.k;
				if (_v21.$ === 2) {
					var game = _v21.a;
					var _v22 = game.Z;
					if ((_v22.$ === 1) && (_v22.a === 1)) {
						var _v23 = _v22.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									k: $author$project$Main$Loaded(
										_Utils_update(
											game,
											{
												Z: $author$project$Main$Playing(0)
											}))
								}),
							$author$project$Main$playSound(
								{cr: 'menu_select', eM: 0.15}));
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 6:
				var key = msg.a;
				var _v24 = model.k;
				if (_v24.$ === 2) {
					var game = _v24.a;
					if (key === 'Escape') {
						var _v25 = game.Z;
						_v25$2:
						while (true) {
							if (_v25.$ === 1) {
								switch (_v25.a) {
									case 1:
										var _v26 = _v25.a;
										return _Utils_Tuple2(
											_Utils_update(
												model,
												{
													k: $author$project$Main$Loaded(
														_Utils_update(
															game,
															{
																Z: $author$project$Main$Playing(0)
															}))
												}),
											$elm$core$Platform$Cmd$none);
									case 0:
										var _v27 = _v25.a;
										return _Utils_Tuple2(
											_Utils_update(
												model,
												{
													k: $author$project$Main$Loaded(
														_Utils_update(
															game,
															{
																Z: $author$project$Main$Playing(1)
															}))
												}),
											$elm$core$Platform$Cmd$none);
									default:
										break _v25$2;
								}
							} else {
								break _v25$2;
							}
						}
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									k: $author$project$Main$Loaded(
										_Utils_update(
											game,
											{
												bb: A2($elm$core$Set$insert, key, game.bb)
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				var key = msg.a;
				var _v28 = model.k;
				if (_v28.$ === 2) {
					var game = _v28.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								k: $author$project$Main$Loaded(
									_Utils_update(
										game,
										{
											bb: A2($elm$core$Set$remove, key, game.bb)
										}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
		}
	});
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$UserClickedStart = {$: 3};
var $author$project$Main$UserUnpaused = {$: 4};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $author$project$Css$paused = $elm$html$Html$Attributes$class('paused');
var $author$project$Css$score = $elm$html$Html$Attributes$class('score');
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$Css$timeRanOut = $elm$html$Html$Attributes$class('timeRanOut');
var $author$project$Css$timer = $elm$html$Html$Attributes$class('timer');
var $ianmackenzie$elm_3d_scene$Scene3d$BackgroundColor = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_scene$Scene3d$backgroundColor = function (color) {
	return color;
};
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $ianmackenzie$elm_3d_scene$Scene3d$Light$CastsShadows = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows = function (flag) {
	return flag;
};
var $elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 0, a: a};
};
var $elm_explorations$webgl$WebGL$alpha = $elm_explorations$webgl$WebGL$Internal$Alpha;
var $elm_explorations$webgl$WebGL$Internal$Antialias = {$: 3};
var $elm_explorations$webgl$WebGL$antialias = $elm_explorations$webgl$WebGL$Internal$Antialias;
var $elm_explorations$webgl$WebGL$Internal$ClearColor = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$clearColor = $elm_explorations$webgl$WebGL$Internal$ClearColor;
var $elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 1, a: a};
};
var $elm_explorations$webgl$WebGL$depth = $elm_explorations$webgl$WebGL$Internal$Depth;
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $elm$core$Basics$round = _Basics_round;
var $elm_explorations$webgl$WebGL$Internal$Stencil = function (a) {
	return {$: 2, a: a};
};
var $elm_explorations$webgl$WebGL$stencil = $elm_explorations$webgl$WebGL$Internal$Stencil;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var $ianmackenzie$elm_units$Pixels$toInt = function (_v0) {
	var numPixels = _v0;
	return numPixels;
};
var $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 1, 1, 1, 1);
var $ianmackenzie$elm_3d_scene$Scene3d$call = F3(
	function (renderPasses, lights, settings) {
		return A2(
			$elm$core$List$map,
			function (renderPass) {
				return A2(renderPass, lights, settings);
			},
			renderPasses);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$CieXyz = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToCieXyz = F2(
	function (_v0, _v1) {
		var intensity = _v0;
		var y = _v1.o;
		var x = _v1.n;
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$CieXyz, (intensity * x) / y, intensity, (intensity * ((1 - x) - y)) / y, 1);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$cieXyzToLinearRgb = function (_v0) {
	var bigX = _v0.a;
	var bigY = _v0.b;
	var bigZ = _v0.c;
	var a = _v0.d;
	return A4($elm_explorations$linear_algebra$Math$Vector4$vec4, ((3.2406 * bigX) - (1.5372 * bigY)) - (0.4986 * bigZ), (((-0.9689) * bigX) + (1.8758 * bigY)) + (0.0415 * bigZ), ((0.0557 * bigX) - (0.204 * bigY)) + (1.057 * bigZ), a);
};
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb = F2(
	function (intensity, chromaticity) {
		return $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$cieXyzToLinearRgb(
			A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToCieXyz, intensity, chromaticity));
	});
var $elm_explorations$linear_algebra$Math$Matrix4$fromRecord = _MJS_m4x4fromRecord;
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$modelMatrix = function (transformation) {
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{fN: transformation.C, fO: transformation.F, fP: transformation.I, fQ: transformation.U, fR: transformation.D, fS: transformation.G, fT: transformation.J, fU: transformation.V, fV: transformation.E, fW: transformation.H, fX: transformation.K, fY: transformation.W, fZ: 0, f_: 0, f$: 0, f0: 1});
};
var $ianmackenzie$elm_3d_scene$Scene3d$createRenderPass = F5(
	function (sceneProperties, viewMatrix, projectionMatrix, transformation, drawFunction) {
		var normalSign = transformation.fC ? 1 : (-1);
		var modelScale = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, transformation.dl, transformation.dl, transformation.dl, normalSign);
		return A6(
			drawFunction,
			sceneProperties,
			modelScale,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$modelMatrix(transformation),
			transformation.fC,
			viewMatrix,
			projectionMatrix);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses = F6(
	function (sceneProperties, viewMatrix, projectionMatrix, currentTransformation, node, accumulated) {
		collectRenderPasses:
		while (true) {
			switch (node.$) {
				case 0:
					return accumulated;
				case 6:
					var transformation = node.a;
					var childNode = node.b;
					var $temp$sceneProperties = sceneProperties,
						$temp$viewMatrix = viewMatrix,
						$temp$projectionMatrix = projectionMatrix,
						$temp$currentTransformation = A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose, transformation, currentTransformation),
						$temp$node = childNode,
						$temp$accumulated = accumulated;
					sceneProperties = $temp$sceneProperties;
					viewMatrix = $temp$viewMatrix;
					projectionMatrix = $temp$projectionMatrix;
					currentTransformation = $temp$currentTransformation;
					node = $temp$node;
					accumulated = $temp$accumulated;
					continue collectRenderPasses;
				case 1:
					var meshDrawFunction = node.b;
					var updatedMeshes = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, meshDrawFunction),
						accumulated.R);
					return {R: updatedMeshes, ai: accumulated.ai, ak: accumulated.ak, m: accumulated.m};
				case 2:
					var meshDrawFunction = node.b;
					var updatedMeshes = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, meshDrawFunction),
						accumulated.m);
					return {R: accumulated.R, ai: accumulated.ai, ak: accumulated.ak, m: updatedMeshes};
				case 4:
					var pointDrawFunction = node.b;
					var updatedPoints = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, pointDrawFunction),
						accumulated.ai);
					return {R: accumulated.R, ai: updatedPoints, ak: accumulated.ak, m: accumulated.m};
				case 3:
					var shadowDrawFunction = node.a;
					var updatedShadows = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, shadowDrawFunction),
						accumulated.ak);
					return {R: accumulated.R, ai: accumulated.ai, ak: updatedShadows, m: accumulated.m};
				default:
					var childNodes = node.a;
					return A3(
						$elm$core$List$foldl,
						A4($ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses, sceneProperties, viewMatrix, projectionMatrix, currentTransformation),
						accumulated,
						childNodes);
			}
		}
	});
var $ianmackenzie$elm_units$Quantity$negate = function (_v0) {
	var value = _v0;
	return -value;
};
var $ianmackenzie$elm_geometry$Vector3d$length = function (_v0) {
	var v = _v0;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.n),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.o),
			$elm$core$Basics$abs(v.p)));
	if (!largestComponent) {
		return $ianmackenzie$elm_units$Quantity$zero;
	} else {
		var scaledZ = v.p / largestComponent;
		var scaledY = v.o / largestComponent;
		var scaledX = v.n / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return scaledLength * largestComponent;
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$sceneDiameter = function (viewBounds) {
	var _v0 = $ianmackenzie$elm_geometry$BoundingBox3d$dimensions(viewBounds);
	var xDimension = _v0.a;
	var yDimension = _v0.b;
	var zDimension = _v0.c;
	return $ianmackenzie$elm_geometry$Vector3d$length(
		A3($ianmackenzie$elm_geometry$Vector3d$xyz, xDimension, yDimension, zDimension));
};
var $ianmackenzie$elm_3d_scene$Scene3d$computeClipDepths = F2(
	function (givenClipDepth, viewBounds) {
		var nearClipDepth = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			0.99,
			A2(
				$ianmackenzie$elm_units$Quantity$max,
				$ianmackenzie$elm_units$Quantity$abs(givenClipDepth),
				$ianmackenzie$elm_units$Quantity$negate(
					$ianmackenzie$elm_geometry$BoundingBox3d$maxZ(viewBounds))));
		var farClipDepth = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			1.01,
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				$ianmackenzie$elm_3d_scene$Scene3d$sceneDiameter(viewBounds),
				$ianmackenzie$elm_units$Quantity$negate(
					$ianmackenzie$elm_geometry$BoundingBox3d$minZ(viewBounds))));
		return _Utils_Tuple2(nearClipDepth, farClipDepth);
	});
var $elm_explorations$webgl$WebGL$Internal$ColorMask = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$colorMask = $elm_explorations$webgl$WebGL$Internal$ColorMask;
var $elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$DepthTest$greaterOrEqual = function (_v0) {
	var far = _v0.aH;
	var near = _v0.aJ;
	var write = _v0.aX;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 518, write, near, far);
};
var $elm_explorations$webgl$WebGL$Internal$PolygonOffset = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$Settings$polygonOffset = $elm_explorations$webgl$WebGL$Internal$PolygonOffset;
var $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$DepthTest$greaterOrEqual(
		{aH: 1, aJ: 0, aX: false}),
		A4($elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false),
		A2($elm_explorations$webgl$WebGL$Settings$polygonOffset, 0.0, 1.0)
	]);
var $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount = 8;
var $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits = 15;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$replace = 7681;
var $ianmackenzie$elm_3d_scene$Scene3d$dummyFragmentShader = {
	src: '\n        precision lowp float;\n\n        void main() {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Mesh1 = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangleStrip = $elm_explorations$webgl$WebGL$Mesh1(
	{e5: 1, fx: 0, ga: 5});
var $ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadMesh = $elm_explorations$webgl$WebGL$triangleStrip(
	_List_fromArray(
		[
			{
			gs: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, -1)
		},
			{
			gs: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, -1)
		},
			{
			gs: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, 1)
		},
			{
			gs: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 1)
		}
		]));
var $ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadVertexShader = {
	src: '\n        precision lowp float;\n\n        attribute vec2 position;\n\n        void main() {\n            gl_Position = vec4(position, 0.0, 1.0);\n        }\n    ',
	attributes: {position: 'gs'},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$test = function (stencilTest) {
	return A3(
		$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
		{d9: stencilTest.d9, eu: stencilTest.eu, eN: stencilTest.eN},
		{cf: stencilTest.cf, ct: stencilTest.ct, cB: stencilTest.cB, cC: stencilTest.cC},
		{cf: stencilTest.cf, ct: stencilTest.ct, cB: stencilTest.cB, cC: stencilTest.cC});
};
var $ianmackenzie$elm_3d_scene$Scene3d$updateStencil = function (test) {
	return A5(
		$elm_explorations$webgl$WebGL$entityWith,
		_List_fromArray(
			[
				$elm_explorations$webgl$WebGL$Settings$StencilTest$test(test),
				A4($elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false)
			]),
		$ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadVertexShader,
		$ianmackenzie$elm_3d_scene$Scene3d$dummyFragmentShader,
		$ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadMesh,
		{});
};
var $ianmackenzie$elm_3d_scene$Scene3d$resetStencil = $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
	{cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, d9: 0, eu: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount, ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, eN: $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits, cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace});
var $elm_explorations$webgl$WebGL$Settings$StencilTest$greater = 516;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$invert = 5386;
var $ianmackenzie$elm_3d_scene$Scene3d$singleLightMask = function (index) {
	return A2($elm$core$Basics$pow, 2, index + 4);
};
var $ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue = function (lightIndex) {
	return $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
		{
			cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep,
			d9: $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits,
			eu: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount,
			ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$greater,
			eN: $ianmackenzie$elm_3d_scene$Scene3d$singleLightMask(lightIndex),
			cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$invert,
			cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$invert
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$createShadow = F3(
	function (shadowRenderPasses, lightIndex, lightMatrix) {
		return $elm$core$List$concat(
			_List_fromArray(
				[
					A3($ianmackenzie$elm_3d_scene$Scene3d$call, shadowRenderPasses, lightMatrix, $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil),
					_List_fromArray(
					[
						$ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue(lightIndex),
						$ianmackenzie$elm_3d_scene$Scene3d$resetStencil
					])
				]));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$createShadows = F2(
	function (shadowRenderPasses, shadowCasters) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$indexedMap,
				$ianmackenzie$elm_3d_scene$Scene3d$createShadow(shadowRenderPasses),
				shadowCasters));
	});
var $elm_explorations$webgl$WebGL$Internal$Blend = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {$: 0, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm_explorations$webgl$WebGL$Settings$Blend$custom = function (_v0) {
	var alpha = _v0.bE;
	var color = _v0.cJ;
	var a = _v0.cD;
	var b = _v0.cG;
	var g = _v0.cQ;
	var r = _v0.di;
	var expand = F2(
		function (_v1, _v2) {
			var eq1 = _v1.a;
			var f11 = _v1.b;
			var f12 = _v1.c;
			var eq2 = _v2.a;
			var f21 = _v2.b;
			var f22 = _v2.c;
			return $elm_explorations$webgl$WebGL$Internal$Blend(eq1)(f11)(f12)(eq2)(f21)(f22)(r)(g)(b)(a);
		});
	return A2(expand, color, alpha);
};
var $elm_explorations$webgl$WebGL$Settings$Blend$Blender = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$customAdd = F2(
	function (_v0, _v1) {
		var factor1 = _v0;
		var factor2 = _v1;
		return A3($elm_explorations$webgl$WebGL$Settings$Blend$Blender, 32774, factor1, factor2);
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$add = F2(
	function (factor1, factor2) {
		return $elm_explorations$webgl$WebGL$Settings$Blend$custom(
			{
				cD: 0,
				bE: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, factor1, factor2),
				cG: 0,
				cJ: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, factor1, factor2),
				cQ: 0,
				di: 0
			});
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$Factor = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$Blend$one = 1;
var $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha = 771;
var $elm_explorations$webgl$WebGL$Internal$SampleAlphaToCoverage = {$: 8};
var $elm_explorations$webgl$WebGL$Settings$sampleAlphaToCoverage = $elm_explorations$webgl$WebGL$Internal$SampleAlphaToCoverage;
var $ianmackenzie$elm_3d_scene$Scene3d$blendSettings = _List_fromArray(
	[
		A2($elm_explorations$webgl$WebGL$Settings$Blend$add, $elm_explorations$webgl$WebGL$Settings$Blend$one, $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha),
		$elm_explorations$webgl$WebGL$Settings$sampleAlphaToCoverage
	]);
var $elm_explorations$webgl$WebGL$Settings$DepthTest$less = function (_v0) {
	var far = _v0.aH;
	var near = _v0.aJ;
	var write = _v0.aX;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 513, write, near, far);
};
var $elm_explorations$webgl$WebGL$Settings$DepthTest$default = $elm_explorations$webgl$WebGL$Settings$DepthTest$less(
	{aH: 1, aJ: 0, aX: true});
var $ianmackenzie$elm_3d_scene$Scene3d$drawNormally = A2($elm$core$List$cons, $elm_explorations$webgl$WebGL$Settings$DepthTest$default, $ianmackenzie$elm_3d_scene$Scene3d$blendSettings);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$equal = 514;
var $elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual = function (_v0) {
	var far = _v0.aH;
	var near = _v0.aJ;
	var write = _v0.aX;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 515, write, near, far);
};
var $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits = 240;
var $ianmackenzie$elm_3d_scene$Scene3d$drawOutsideStencil = A2(
	$elm$core$List$cons,
	$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
		{aH: 1, aJ: 0, aX: true}),
	A2(
		$elm$core$List$cons,
		$elm_explorations$webgl$WebGL$Settings$StencilTest$test(
			{cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, d9: $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits, eu: 0, ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$equal, eN: 0, cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep}),
		$ianmackenzie$elm_3d_scene$Scene3d$blendSettings));
var $elm_explorations$webgl$WebGL$Settings$DepthTest$equal = function (_v0) {
	var far = _v0.aH;
	var near = _v0.aJ;
	var write = _v0.aX;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 514, write, near, far);
};
var $ianmackenzie$elm_3d_scene$Scene3d$drawWhereDepthTestEqual = A2(
	$elm$core$List$cons,
	$elm_explorations$webgl$WebGL$Settings$DepthTest$equal(
		{aH: 1, aJ: 0, aX: true}),
	$ianmackenzie$elm_3d_scene$Scene3d$blendSettings);
var $ianmackenzie$elm_3d_camera$Camera3d$eyePoint = function (camera) {
	return $ianmackenzie$elm_geometry$Frame3d$originPoint(
		$ianmackenzie$elm_3d_camera$Camera3d$frame(camera));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$placementFrame = function (transformation) {
	return $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			gl: $ianmackenzie$elm_geometry$Point3d$unsafe(
				{n: transformation.U, o: transformation.V, p: transformation.W}),
			gX: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{n: transformation.C, o: transformation.D, p: transformation.E}),
			gY: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{n: transformation.F, o: transformation.G, p: transformation.H}),
			g_: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{n: transformation.I, o: transformation.J, p: transformation.K})
		});
};
var $ianmackenzie$elm_geometry$Direction3d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var d = _v1;
		var _v2 = frame.g_;
		var k = _v2;
		var _v3 = frame.gY;
		var j = _v3;
		var _v4 = frame.gX;
		var i = _v4;
		return {n: ((d.n * i.n) + (d.o * i.o)) + (d.p * i.p), o: ((d.n * j.n) + (d.o * j.o)) + (d.p * j.p), p: ((d.n * k.n) + (d.o * k.o)) + (d.p * k.p)};
	});
var $ianmackenzie$elm_geometry$Point3d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.gl;
		var p0 = _v2;
		var deltaX = p.n - p0.n;
		var deltaY = p.o - p0.o;
		var deltaZ = p.p - p0.p;
		var _v3 = frame.g_;
		var k = _v3;
		var _v4 = frame.gY;
		var j = _v4;
		var _v5 = frame.gX;
		var i = _v5;
		return {n: ((deltaX * i.n) + (deltaY * i.o)) + (deltaZ * i.p), o: ((deltaX * j.n) + (deltaY * j.o)) + (deltaZ * j.p), p: ((deltaX * k.n) + (deltaY * k.o)) + (deltaZ * k.p)};
	});
var $ianmackenzie$elm_geometry$Frame3d$relativeTo = F2(
	function (otherFrame, frame) {
		return {
			gl: A2(
				$ianmackenzie$elm_geometry$Point3d$relativeTo,
				otherFrame,
				$ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
			gX: A2(
				$ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				$ianmackenzie$elm_geometry$Frame3d$xDirection(frame)),
			gY: A2(
				$ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				$ianmackenzie$elm_geometry$Frame3d$yDirection(frame)),
			g_: A2(
				$ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				$ianmackenzie$elm_geometry$Frame3d$zDirection(frame))
		};
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$union = F2(
	function (firstBox, secondBox) {
		var _v0 = secondBox;
		var b2 = _v0;
		var _v1 = firstBox;
		var b1 = _v1;
		return {
			f3: A2($elm$core$Basics$max, b1.f3, b2.f3),
			f4: A2($elm$core$Basics$max, b1.f4, b2.f4),
			f5: A2($elm$core$Basics$max, b1.f5, b2.f5),
			f6: A2($elm$core$Basics$min, b1.f6, b2.f6),
			f7: A2($elm$core$Basics$min, b1.f7, b2.f7),
			f8: A2($elm$core$Basics$min, b1.f8, b2.f8)
		};
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$withDimensions = F2(
	function (givenDimensions, givenCenterPoint) {
		var _v0 = givenCenterPoint;
		var z = _v0.p;
		var y = _v0.o;
		var x = _v0.n;
		var _v1 = givenDimensions;
		var dx = _v1.a;
		var dy = _v1.b;
		var dz = _v1.c;
		var halfDx = $elm$core$Basics$abs(dx) / 2;
		var halfDy = $elm$core$Basics$abs(dy) / 2;
		var halfDz = $elm$core$Basics$abs(dz) / 2;
		return {f3: x + halfDx, f4: y + halfDy, f5: z + halfDz, f6: x - halfDx, f7: y - halfDy, f8: z - halfDz};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds = F4(
	function (viewFrame, scale, modelBounds, current) {
		var originalCenter = modelBounds.g8;
		var modelZDimension = (2 * modelBounds.hB) * scale;
		var modelYDimension = (2 * modelBounds.hA) * scale;
		var modelXDimension = (2 * modelBounds.hz) * scale;
		var modelCenterZ = originalCenter.p * scale;
		var modelCenterY = originalCenter.o * scale;
		var modelCenterX = originalCenter.n * scale;
		var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$zDirection(viewFrame));
		var zDimension = ($elm$core$Basics$abs(modelXDimension * k.n) + $elm$core$Basics$abs(modelYDimension * k.o)) + $elm$core$Basics$abs(modelZDimension * k.p);
		var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$yDirection(viewFrame));
		var yDimension = ($elm$core$Basics$abs(modelXDimension * j.n) + $elm$core$Basics$abs(modelYDimension * j.o)) + $elm$core$Basics$abs(modelZDimension * j.p);
		var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$xDirection(viewFrame));
		var xDimension = ($elm$core$Basics$abs(modelXDimension * i.n) + $elm$core$Basics$abs(modelYDimension * i.o)) + $elm$core$Basics$abs(modelZDimension * i.p);
		var nodeBounds = A2(
			$ianmackenzie$elm_geometry$BoundingBox3d$withDimensions,
			_Utils_Tuple3(xDimension, yDimension, zDimension),
			A2(
				$ianmackenzie$elm_geometry$Point3d$relativeTo,
				viewFrame,
				A3($ianmackenzie$elm_geometry$Point3d$meters, modelCenterX, modelCenterY, modelCenterZ)));
		if (!current.$) {
			var currentBounds = current.a;
			return $elm$core$Maybe$Just(
				A2($ianmackenzie$elm_geometry$BoundingBox3d$union, currentBounds, nodeBounds));
		} else {
			return $elm$core$Maybe$Just(nodeBounds);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$getViewBounds = F4(
	function (viewFrame, scale, current, nodes) {
		getViewBounds:
		while (true) {
			if (nodes.b) {
				var first = nodes.a;
				var rest = nodes.b;
				switch (first.$) {
					case 0:
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = current,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 1:
						var modelBounds = first.a;
						var updated = A4($ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds, viewFrame, scale, modelBounds, current);
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = updated,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 2:
						var modelBounds = first.a;
						var updated = A4($ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds, viewFrame, scale, modelBounds, current);
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = updated,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 3:
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = current,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 4:
						var modelBounds = first.a;
						var updated = A4($ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds, viewFrame, scale, modelBounds, current);
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = updated,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 5:
						var childNodes = first.a;
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = A4($ianmackenzie$elm_3d_scene$Scene3d$getViewBounds, viewFrame, scale, current, childNodes),
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					default:
						var transformation = first.a;
						var childNode = first.b;
						var localViewFrame = A2(
							$ianmackenzie$elm_geometry$Frame3d$relativeTo,
							$ianmackenzie$elm_3d_scene$Scene3d$Transformation$placementFrame(transformation),
							viewFrame);
						var localScale = scale * transformation.dl;
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = A4(
							$ianmackenzie$elm_3d_scene$Scene3d$getViewBounds,
							localViewFrame,
							localScale,
							current,
							_List_fromArray(
								[childNode])),
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
				}
			} else {
				return current;
			}
		}
	});
var $elm_explorations$linear_algebra$Math$Vector4$getX = _MJS_v4getX;
var $elm_explorations$linear_algebra$Math$Vector4$getY = _MJS_v4getY;
var $elm_explorations$linear_algebra$Math$Vector4$getZ = _MJS_v4getZ;
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$identity = {fC: true, C: 1, D: 0, E: 0, F: 0, G: 1, H: 0, I: 0, J: 0, K: 1, U: 0, V: 0, W: 0, dl: 1};
var $ianmackenzie$elm_3d_scene$Scene3d$initStencil = $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
	{cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, d9: 0, eu: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount, ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, eN: 255, cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Light = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled = {cG: 0, g7: false, cQ: 0, er: 0, di: 0, eI: 0, n: 0, o: 0, p: 0};
var $ianmackenzie$elm_3d_scene$Scene3d$lightPair = F2(
	function (_v0, _v1) {
		var first = _v0;
		var second = _v1;
		return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{fN: first.n, fO: first.di, fP: second.n, fQ: second.di, fR: first.o, fS: first.cQ, fT: second.o, fU: second.cQ, fV: first.p, fW: first.cG, fX: second.p, fY: second.cG, fZ: first.eI, f_: first.er, f$: second.eI, f0: second.er});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled = _Utils_Tuple2(
	{
		cl: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		c0: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		c1: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		c2: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled)
	},
	A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0, 0, 0, 0));
var $ianmackenzie$elm_3d_camera$Camera3d$focalDistance = function (_v0) {
	var camera = _v0;
	return camera.bR;
};
var $ianmackenzie$elm_3d_camera$Camera3d$fovAngle = function (_v0) {
	var camera = _v0;
	return camera.fb;
};
var $elm$core$Basics$tan = _Basics_tan;
var $ianmackenzie$elm_units$Angle$tan = function (_v0) {
	var angle = _v0;
	return $elm$core$Basics$tan(angle);
};
var $ianmackenzie$elm_3d_camera$Camera3d$frustumSlope = function (camera) {
	return $ianmackenzie$elm_units$Angle$tan(
		$ianmackenzie$elm_units$Quantity$half(
			$ianmackenzie$elm_3d_camera$Camera3d$fovAngle(camera)));
};
var $ianmackenzie$elm_3d_camera$Camera3d$fovHeight = function (camera) {
	return $ianmackenzie$elm_units$Quantity$twice(
		A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_3d_camera$Camera3d$frustumSlope(camera),
			$ianmackenzie$elm_3d_camera$Camera3d$focalDistance(camera)));
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $ianmackenzie$elm_3d_camera$Camera3d$projection = function (_v0) {
	var camera = _v0;
	return camera.h1;
};
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$projectionMatrix = F2(
	function (camera, _v0) {
		var aspectRatio = _v0.g3;
		var farClipDepth = _v0.hs;
		var nearClipDepth = _v0.hU;
		var frustumSlope = $ianmackenzie$elm_3d_camera$Camera3d$frustumSlope(camera);
		var _v1 = $ianmackenzie$elm_units$Quantity$abs(nearClipDepth);
		var n = _v1;
		var _v2 = $ianmackenzie$elm_units$Quantity$abs(farClipDepth);
		var f = _v2;
		var _v3 = $ianmackenzie$elm_3d_camera$Camera3d$projection(camera);
		if (!_v3) {
			return $elm$core$Basics$isInfinite(f) ? $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{fN: 1 / (aspectRatio * frustumSlope), fO: 0, fP: 0, fQ: 0, fR: 0, fS: 1 / frustumSlope, fT: 0, fU: 0, fV: 0, fW: 0, fX: -1, fY: (-2) * n, fZ: 0, f_: 0, f$: -1, f0: 0}) : $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{fN: 1 / (aspectRatio * frustumSlope), fO: 0, fP: 0, fQ: 0, fR: 0, fS: 1 / frustumSlope, fT: 0, fU: 0, fV: 0, fW: 0, fX: (-(f + n)) / (f - n), fY: (((-2) * f) * n) / (f - n), fZ: 0, f_: 0, f$: -1, f0: 0});
		} else {
			var _v4 = $ianmackenzie$elm_3d_camera$Camera3d$fovHeight(camera);
			var h = _v4;
			return $elm$core$Basics$isInfinite(f) ? $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{fN: 2 / (aspectRatio * h), fO: 0, fP: 0, fQ: 0, fR: 0, fS: 2 / h, fT: 0, fU: 0, fV: 0, fW: 0, fX: 0, fY: -1, fZ: 0, f_: 0, f$: 0, f0: 1}) : $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{fN: 2 / (aspectRatio * h), fO: 0, fP: 0, fQ: 0, fR: 0, fS: 2 / h, fT: 0, fU: 0, fV: 0, fW: 0, fX: (-2) / (f - n), fY: (-(f + n)) / (f - n), fZ: 0, f_: 0, f$: 0, f0: 1});
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$drawInsideStencil = function (lightMask) {
	return A2(
		$elm$core$List$cons,
		$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
			{aH: 1, aJ: 0, aX: true}),
		A2(
			$elm$core$List$cons,
			$elm_explorations$webgl$WebGL$Settings$StencilTest$test(
				{cf: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, d9: $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits, eu: lightMask, ct: $elm_explorations$webgl$WebGL$Settings$StencilTest$equal, eN: 0, cB: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cC: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep}),
			$ianmackenzie$elm_3d_scene$Scene3d$blendSettings));
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $ianmackenzie$elm_3d_scene$Scene3d$enabledFlag = F2(
	function (lightMask, lightIndex) {
		return ((1 & (lightMask >> lightIndex)) === 1) ? 0 : 1;
	});
var $ianmackenzie$elm_3d_scene$Scene3d$renderWithinShadows = F3(
	function (meshRenderPasses, lightMatrices, numShadowingLights) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (lightMask) {
					var stencilMask = lightMask << 4;
					var enabledLights = A4(
						$elm_explorations$linear_algebra$Math$Vector4$vec4,
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 0),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 1),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 2),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 3));
					return A3(
						$ianmackenzie$elm_3d_scene$Scene3d$call,
						meshRenderPasses,
						_Utils_Tuple2(lightMatrices, enabledLights),
						$ianmackenzie$elm_3d_scene$Scene3d$drawInsideStencil(stencilMask));
				},
				A2(
					$elm$core$List$range,
					1,
					A2($elm$core$Basics$pow, 2, numShadowingLights) - 1)));
	});
var $elm_explorations$linear_algebra$Math$Matrix4$toRecord = _MJS_m4x4toRecord;
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4 = function (frame) {
	var p = $ianmackenzie$elm_geometry$Point3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$originPoint(frame));
	var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
	var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$yDirection(frame));
	var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$xDirection(frame));
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{fN: i.n, fO: j.n, fP: k.n, fQ: p.n, fR: i.o, fS: j.o, fT: k.o, fU: p.o, fV: i.p, fW: j.p, fX: k.p, fY: p.p, fZ: 0, f_: 0, f$: 0, f0: 1});
};
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$modelViewMatrix = F2(
	function (modelFrame, camera) {
		return $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4(
			A2(
				$ianmackenzie$elm_geometry$Frame3d$relativeTo,
				$ianmackenzie$elm_3d_camera$Camera3d$frame(camera),
				modelFrame));
	});
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$viewMatrix = function (camera) {
	return A2($ianmackenzie$elm_3d_camera$WebGL$Matrices$modelViewMatrix, $ianmackenzie$elm_geometry$Frame3d$atOrigin, camera);
};
var $ianmackenzie$elm_3d_scene$Scene3d$writeDepth = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$DepthTest$default,
		A4($elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false)
	]);
var $ianmackenzie$elm_3d_scene$Scene3d$toWebGLEntities = function (_arguments) {
	var cameraFrame = $ianmackenzie$elm_3d_camera$Camera3d$frame(_arguments.g6);
	var _v0 = $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(_arguments.hn);
	var rootNode = _v0;
	var _v1 = A4(
		$ianmackenzie$elm_3d_scene$Scene3d$getViewBounds,
		cameraFrame,
		1,
		$elm$core$Maybe$Nothing,
		_List_fromArray(
			[rootNode]));
	if (_v1.$ === 1) {
		return _List_Nil;
	} else {
		var viewBounds = _v1.a;
		var viewMatrix = $ianmackenzie$elm_3d_camera$WebGL$Matrices$viewMatrix(_arguments.g6);
		var _v2 = function () {
			var _v3 = _arguments.ih;
			switch (_v3.$) {
				case 0:
					return _Utils_Tuple2(0, 0);
				case 1:
					return _Utils_Tuple2(1, 0);
				case 2:
					return _Utils_Tuple2(2, 0);
				case 3:
					var overexposureLimit = _v3.a;
					return _Utils_Tuple2(3, overexposureLimit);
				case 4:
					var overexposureLimit = _v3.a;
					return _Utils_Tuple2(4, overexposureLimit);
				default:
					return _Utils_Tuple2(5, 0);
			}
		}();
		var toneMapType = _v2.a;
		var toneMapParam = _v2.b;
		var _v4 = A2($ianmackenzie$elm_3d_scene$Scene3d$computeClipDepths, _arguments.hb, viewBounds);
		var nearClipDepth = _v4.a;
		var farClipDepth = _v4.b;
		var projectionMatrix = A2(
			$ianmackenzie$elm_3d_camera$WebGL$Matrices$projectionMatrix,
			_arguments.g6,
			{g3: _arguments.g3, hs: farClipDepth, hU: nearClipDepth});
		var projectionType = $elm_explorations$linear_algebra$Math$Matrix4$toRecord(projectionMatrix).f0;
		var eyePointOrDirectionToCamera = (!projectionType) ? $ianmackenzie$elm_geometry$Point3d$toMeters(
			$ianmackenzie$elm_3d_camera$Camera3d$eyePoint(_arguments.g6)) : $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$zDirection(cameraFrame));
		var _v5 = _arguments.hp;
		var exposureLuminance = _v5;
		var _v6 = A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb, exposureLuminance, _arguments.iq);
		var referenceWhite = _v6;
		var sceneProperties = $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{
				fN: 0,
				fO: eyePointOrDirectionToCamera.n,
				fP: $elm_explorations$linear_algebra$Math$Vector4$getX(referenceWhite),
				fQ: _arguments.gH,
				fR: 0,
				fS: eyePointOrDirectionToCamera.o,
				fT: $elm_explorations$linear_algebra$Math$Vector4$getY(referenceWhite),
				fU: $ianmackenzie$elm_units$Length$inMeters(
					$ianmackenzie$elm_3d_scene$Scene3d$sceneDiameter(viewBounds)),
				fV: 0,
				fW: eyePointOrDirectionToCamera.p,
				fX: $elm_explorations$linear_algebra$Math$Vector4$getZ(referenceWhite),
				fY: toneMapType,
				fZ: 0,
				f_: projectionType,
				f$: 0,
				f0: toneMapParam
			});
		var renderPasses = A6(
			$ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses,
			sceneProperties,
			viewMatrix,
			projectionMatrix,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$identity,
			rootNode,
			{R: _List_Nil, ai: _List_Nil, ak: _List_Nil, m: _List_Nil});
		var _v7 = _arguments.hL;
		switch (_v7.$) {
			case 0:
				var lightMatrices = _v7.a;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.R,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$drawNormally),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$writeDepth)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$drawWhereDepthTestEqual)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$writeDepth)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$drawWhereDepthTestEqual)),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.ai, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$drawNormally)
						]));
			case 1:
				var lightMatrices = _v7.a;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.R, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$drawNormally),
							_List_fromArray(
							[$ianmackenzie$elm_3d_scene$Scene3d$initStencil]),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.ak, lightMatrices.cl, $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil),
							_List_fromArray(
							[
								$ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue(0)
							]),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.R,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$drawOutsideStencil),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$writeDepth)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$drawWhereDepthTestEqual)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$writeDepth)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$drawWhereDepthTestEqual)),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.ai, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$drawNormally)
						]));
			default:
				var shadowCasters = _v7.a;
				var allLightMatrices = _v7.b;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.R,
							_Utils_Tuple2(allLightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$drawNormally),
							_List_fromArray(
							[$ianmackenzie$elm_3d_scene$Scene3d$initStencil]),
							A2($ianmackenzie$elm_3d_scene$Scene3d$createShadows, renderPasses.ak, shadowCasters),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$renderWithinShadows,
							renderPasses.R,
							allLightMatrices,
							$elm$core$List$length(shadowCasters)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(allLightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$writeDepth)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(allLightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$drawWhereDepthTestEqual)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(allLightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$writeDepth)),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.m,
							_Utils_Tuple2(allLightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, $ianmackenzie$elm_3d_scene$Scene3d$drawWhereDepthTestEqual)),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.ai, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$drawNormally)
						]));
		}
	}
};
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $ianmackenzie$elm_3d_scene$Scene3d$composite = F2(
	function (_arguments, scenes) {
		var commonWebGLOptions = _List_fromArray(
			[
				$elm_explorations$webgl$WebGL$depth(1),
				$elm_explorations$webgl$WebGL$stencil(0),
				$elm_explorations$webgl$WebGL$alpha(true),
				A4($elm_explorations$webgl$WebGL$clearColor, 0, 0, 0, 0)
			]);
		var _v0 = function () {
			var _v1 = _arguments.g1;
			switch (_v1.$) {
				case 0:
					return _Utils_Tuple3(commonWebGLOptions, '0', 1);
				case 1:
					return _Utils_Tuple3(
						A2($elm$core$List$cons, $elm_explorations$webgl$WebGL$antialias, commonWebGLOptions),
						'1',
						1);
				default:
					var value = _v1.a;
					return _Utils_Tuple3(commonWebGLOptions, '0', value);
			}
		}();
		var webGLOptions = _v0.a;
		var key = _v0.b;
		var scalingFactor = _v0.c;
		var _v2 = _arguments.hg;
		var width = _v2.a;
		var height = _v2.b;
		var heightInPixels = $ianmackenzie$elm_units$Pixels$toInt(height);
		var heightCss = A2(
			$elm$html$Html$Attributes$style,
			'height',
			$elm$core$String$fromInt(heightInPixels) + 'px');
		var widthInPixels = $ianmackenzie$elm_units$Pixels$toInt(width);
		var aspectRatio = widthInPixels / heightInPixels;
		var webGLEntities = A2(
			$elm$core$List$concatMap,
			function (scene) {
				return $ianmackenzie$elm_3d_scene$Scene3d$toWebGLEntities(
					{g3: aspectRatio, g6: _arguments.g6, hb: _arguments.hb, hn: scene.hn, hp: scene.hp, hL: scene.hL, gH: scalingFactor, ih: scene.ih, iq: scene.iq});
			},
			scenes);
		var widthCss = A2(
			$elm$html$Html$Attributes$style,
			'width',
			$elm$core$String$fromInt(widthInPixels) + 'px');
		var _v3 = _arguments.g5;
		var givenBackgroundColor = _v3;
		var backgroundColorString = $avh4$elm_color$Color$toCssString(givenBackgroundColor);
		return A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'padding', '0px'),
					widthCss,
					heightCss
				]),
			_List_fromArray(
				[
					_Utils_Tuple2(
					key,
					A3(
						$elm_explorations$webgl$WebGL$toHtmlWith,
						webGLOptions,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$width(
								$elm$core$Basics$round(widthInPixels * scalingFactor)),
								$elm$html$Html$Attributes$height(
								$elm$core$Basics$round(heightInPixels * scalingFactor)),
								widthCss,
								heightCss,
								A2($elm$html$Html$Attributes$style, 'display', 'block'),
								A2($elm$html$Html$Attributes$style, 'background-color', backgroundColorString)
							]),
						webGLEntities))
				]));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$custom = function (_arguments) {
	return A2(
		$ianmackenzie$elm_3d_scene$Scene3d$composite,
		{g1: _arguments.g1, g5: _arguments.g5, g6: _arguments.g6, hb: _arguments.hb, hg: _arguments.hg},
		_List_fromArray(
			[
				{hn: _arguments.hn, hp: _arguments.hp, hL: _arguments.hL, ih: _arguments.ih, iq: _arguments.iq}
			]));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Chromaticity = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity = function (xy) {
	return xy;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$daylight = $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
	{n: 0.31271, o: 0.32902});
var $ianmackenzie$elm_3d_scene$Scene3d$Exposure = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Luminance$nits = function (numNits) {
	return numNits;
};
var $ianmackenzie$elm_3d_scene$Scene3d$exposureValue = function (ev100) {
	return $ianmackenzie$elm_units$Luminance$nits(
		1.2 * A2($elm$core$Basics$pow, 2, ev100));
};
var $ianmackenzie$elm_3d_scene$Scene3d$MultiplePasses = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass = function (a) {
	return {$: 0, a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$eraseLight = function (_v0) {
	var light = _v0;
	return light;
};
var $ianmackenzie$elm_3d_scene$Scene3d$lightCastsShadows = function (_v0) {
	var properties = _v0;
	return properties.g7;
};
var $ianmackenzie$elm_3d_scene$Scene3d$noLights = $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass($ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled.a);
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$singleLight = function (_v0) {
	var light = _v0;
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{fN: light.n, fO: light.di, fP: 0, fQ: 0, fR: light.o, fS: light.cQ, fT: 0, fU: 0, fV: light.p, fW: light.cG, fX: 0, fY: 0, fZ: light.eI, f_: light.er, f$: 0, f0: 0});
};
var $ianmackenzie$elm_3d_scene$Scene3d$eightLights = F8(
	function (first, second, third, fourth, fifth, sixth, seventh, eigth) {
		var _v0 = A2(
			$elm$core$List$partition,
			$ianmackenzie$elm_3d_scene$Scene3d$lightCastsShadows,
			_List_fromArray(
				[
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(first),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(second),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(third),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(fourth)
				]));
		var enabledShadowCasters = _v0.a;
		var disabledShadowCasters = _v0.b;
		if (!enabledShadowCasters.b) {
			return $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass(
				{
					cl: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, first, second),
					c0: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, third, fourth),
					c1: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, fifth, sixth),
					c2: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, seventh, eigth)
				});
		} else {
			var sortedLights = _Utils_ap(enabledShadowCasters, disabledShadowCasters);
			if ((((sortedLights.b && sortedLights.b.b) && sortedLights.b.b.b) && sortedLights.b.b.b.b) && (!sortedLights.b.b.b.b.b)) {
				var light0 = sortedLights.a;
				var _v3 = sortedLights.b;
				var light1 = _v3.a;
				var _v4 = _v3.b;
				var light2 = _v4.a;
				var _v5 = _v4.b;
				var light3 = _v5.a;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$MultiplePasses,
					A2($elm$core$List$map, $ianmackenzie$elm_3d_scene$Scene3d$singleLight, enabledShadowCasters),
					{
						cl: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, light0, light1),
						c0: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, light2, light3),
						c1: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, fifth, sixth),
						c2: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, seventh, eigth)
					});
			} else {
				return $ianmackenzie$elm_3d_scene$Scene3d$noLights;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$fiveLights = F5(
	function (first, second, third, fourth, fifth) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, third, fourth, fifth, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$fourLights = F4(
	function (first, second, third, fourth) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, third, fourth, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$linearRgbToCieXyz = function (_v0) {
	var linearRgb = _v0;
	var linearR = $elm_explorations$linear_algebra$Math$Vector4$getX(linearRgb);
	var linearG = $elm_explorations$linear_algebra$Math$Vector4$getY(linearRgb);
	var linearB = $elm_explorations$linear_algebra$Math$Vector4$getZ(linearRgb);
	return A4(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$CieXyz,
		((0.4124 * linearR) + (0.3576 * linearG)) + (0.1805 * linearB),
		((0.2126 * linearR) + (0.7152 * linearG)) + (0.0722 * linearB),
		((0.0193 * linearR) + (0.1192 * linearG)) + (0.9505 * linearB),
		$elm_explorations$linear_algebra$Math$Vector4$getW(linearRgb));
};
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToCieXyz = function (color) {
	return $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$linearRgbToCieXyz(
		$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToLinearRgb(color));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$color = function (givenColor) {
	var _v0 = $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToCieXyz(givenColor);
	var bigX = _v0.a;
	var bigY = _v0.b;
	var bigZ = _v0.c;
	var sum = (bigX + bigY) + bigZ;
	return $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
		{n: bigX / sum, o: bigY / sum});
};
var $avh4$elm_color$Color$hsla = F4(
	function (hue, sat, light, alpha) {
		var _v0 = _Utils_Tuple3(hue, sat, light);
		var h = _v0.a;
		var s = _v0.b;
		var l = _v0.c;
		var m2 = (l <= 0.5) ? (l * (s + 1)) : ((l + s) - (l * s));
		var m1 = (l * 2) - m2;
		var hueToRgb = function (h__) {
			var h_ = (h__ < 0) ? (h__ + 1) : ((h__ > 1) ? (h__ - 1) : h__);
			return ((h_ * 6) < 1) ? (m1 + (((m2 - m1) * h_) * 6)) : (((h_ * 2) < 1) ? m2 : (((h_ * 3) < 2) ? (m1 + (((m2 - m1) * ((2 / 3) - h_)) * 6)) : m1));
		};
		var b = hueToRgb(h - (1 / 3));
		var g = hueToRgb(h);
		var r = hueToRgb(h + (1 / 3));
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, alpha);
	});
var $avh4$elm_color$Color$hsl = F3(
	function (h, s, l) {
		return A4($avh4$elm_color$Color$hsla, h, s, l, 1.0);
	});
var $ianmackenzie$elm_units$LuminousFlux$lumens = function (numLumens) {
	return numLumens;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$point = F2(
	function (_v0, light) {
		var shadowFlag = _v0;
		var _v1 = $ianmackenzie$elm_geometry$Point3d$unwrap(light.gs);
		var z = _v1.p;
		var y = _v1.o;
		var x = _v1.n;
		var _v2 = A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb, light.cY, light.cI);
		var rgb = _v2;
		return {
			cG: $elm_explorations$linear_algebra$Math$Vector4$getZ(rgb),
			g7: shadowFlag,
			cQ: $elm_explorations$linear_algebra$Math$Vector4$getY(rgb),
			er: 0,
			di: $elm_explorations$linear_algebra$Math$Vector4$getX(rgb),
			eI: 2,
			n: x,
			o: y,
			p: z
		};
	});
var $author$project$Main$goalLight = function (_v0) {
	var frame = _v0.a;
	var hue = _v0.b;
	var holeColor = A3($avh4$elm_color$Color$hsl, hue, 1.0, 0.5);
	return A2(
		$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
		$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(false),
		{
			cI: $ianmackenzie$elm_3d_scene$Scene3d$Light$color(holeColor),
			cY: $ianmackenzie$elm_units$LuminousFlux$lumens(250),
			gs: $ianmackenzie$elm_geometry$Frame3d$originPoint(frame)
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$HableFilmicToneMapping = {$: 5};
var $ianmackenzie$elm_3d_scene$Scene3d$hableFilmicToneMapping = $ianmackenzie$elm_3d_scene$Scene3d$HableFilmicToneMapping;
var $ianmackenzie$elm_units$Pixels$int = function (numPixels) {
	return numPixels;
};
var $ianmackenzie$elm_3d_scene$Scene3d$mesh = F2(
	function (givenMaterial, givenMesh) {
		return A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$mesh, givenMaterial, givenMesh);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$meshWithShadow = F3(
	function (givenMaterial, givenMesh, givenShadow) {
		return $ianmackenzie$elm_3d_scene$Scene3d$group(
			_List_fromArray(
				[
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$mesh, givenMaterial, givenMesh),
					$ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow(givenShadow)
				]));
	});
var $ianmackenzie$elm_units$Length$millimeters = function (numMillimeters) {
	return $ianmackenzie$elm_units$Length$meters(0.001 * numMillimeters);
};
var $ianmackenzie$elm_3d_scene$Scene3d$NoAntialiasing = {$: 0};
var $ianmackenzie$elm_3d_scene$Scene3d$noAntialiasing = $ianmackenzie$elm_3d_scene$Scene3d$NoAntialiasing;
var $author$project$Main$prevGoalLight = function (_v0) {
	var frame = _v0.a;
	var hue = _v0.b;
	var life = _v0.c;
	var lifeMagnitude = $ianmackenzie$elm_units$Duration$inSeconds(life) / $ianmackenzie$elm_units$Duration$inSeconds($author$project$Main$goalLife);
	var holeColor = A3($avh4$elm_color$Color$hsl, hue, 1.0, 0.5);
	return A2(
		$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
		$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(false),
		{
			cI: $ianmackenzie$elm_3d_scene$Scene3d$Light$color(holeColor),
			cY: $ianmackenzie$elm_units$LuminousFlux$lumens(250 * lifeMagnitude),
			gs: $ianmackenzie$elm_geometry$Frame3d$originPoint(frame)
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$neverCastsShadows = false;
var $author$project$Main$prevGoalLightNoShadoow = function (_v0) {
	var frame = _v0.a;
	var hue = _v0.b;
	var life = _v0.c;
	var lifeMagnitude = $ianmackenzie$elm_units$Duration$inSeconds(life) / $ianmackenzie$elm_units$Duration$inSeconds($author$project$Main$goalLife);
	var holeColor = A3($avh4$elm_color$Color$hsl, hue, 1.0, 0.5);
	return A2(
		$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
		$ianmackenzie$elm_3d_scene$Scene3d$Light$neverCastsShadows,
		{
			cI: $ianmackenzie$elm_3d_scene$Scene3d$Light$color(holeColor),
			cY: $ianmackenzie$elm_units$LuminousFlux$lumens(250 * lifeMagnitude),
			gs: $ianmackenzie$elm_geometry$Frame3d$originPoint(frame)
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$scaleAbout = F2(
	function (point, k) {
		var p = $ianmackenzie$elm_geometry$Point3d$unwrap(point);
		var oneMinusK = 1 - k;
		return {fC: k >= 0, C: 1, D: 0, E: 0, F: 0, G: 1, H: 0, I: 0, J: 0, K: 1, U: oneMinusK * p.n, V: oneMinusK * p.o, W: oneMinusK * p.p, dl: k};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$scaleAbout = F3(
	function (centerPoint, scale, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$scaleAbout, centerPoint, scale),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$scaleAbout = F3(
	function (centerPoint, scale, entity) {
		return A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$scaleAbout, centerPoint, scale, entity);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$sixLights = F6(
	function (first, second, third, fourth, fifth, sixth) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, third, fourth, fifth, sixth, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $ianmackenzie$elm_units$Temperature$inKelvins = function (_v0) {
	var numKelvins = _v0;
	return numKelvins;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$colorTemperature = function (temperature) {
	var t = A3(
		$elm$core$Basics$clamp,
		1667,
		25000,
		$ianmackenzie$elm_units$Temperature$inKelvins(temperature));
	var x = (t <= 4000) ? ((((((-0.2661239) * 1.0e9) / ((t * t) * t)) - ((0.2343589 * 1.0e6) / (t * t))) + ((0.8776956 * 1.0e3) / t)) + 0.17991) : ((((((-3.0258469) * 1.0e9) / ((t * t) * t)) + ((2.1070379 * 1.0e6) / (t * t))) + ((0.2226347 * 1.0e3) / t)) + 0.24039);
	var y = (t <= 2222) ? (((((-1.1063814) * ((x * x) * x)) - (1.3481102 * (x * x))) + (2.18555832 * x)) - 0.20219683) : ((t <= 4000) ? (((((-0.9549476) * ((x * x) * x)) - (1.37418593 * (x * x))) + (2.09137015 * x)) - 0.16748867) : ((((3.081758 * ((x * x) * x)) - (5.8733867 * (x * x))) + (3.75112997 * x)) - 0.37001483));
	return $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
		{n: x, o: y});
};
var $ianmackenzie$elm_units$Temperature$Temperature = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Temperature$kelvins = function (numKelvins) {
	return numKelvins;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$sunlight = $ianmackenzie$elm_3d_scene$Scene3d$Light$colorTemperature(
	$ianmackenzie$elm_units$Temperature$kelvins(5600));
var $ianmackenzie$elm_3d_scene$Scene3d$threeLights = F3(
	function (first, second, third) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, third, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$twoLights = F2(
	function (first, second) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $author$project$Main$viewGoal = F2(
	function (assets, _v0) {
		var frame = _v0.a;
		var hue = _v0.b;
		var life = _v0.c;
		var holeColor = A3($avh4$elm_color$Color$hsl, hue, 1.0, 0.5);
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$placeIn,
			frame,
			A3(
				$ianmackenzie$elm_3d_scene$Scene3d$scaleAbout,
				$ianmackenzie$elm_geometry$Point3d$origin,
				0.9 * ($ianmackenzie$elm_units$Duration$inSeconds(life) / $ianmackenzie$elm_units$Duration$inSeconds($author$project$Main$goalLife)),
				A2(
					$ianmackenzie$elm_3d_scene$Scene3d$mesh,
					$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(holeColor),
					assets.cR)));
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$hullHelp = F7(
	function (currentMinX, currentMaxX, currentMinY, currentMaxY, currentMinZ, currentMaxZ, points) {
		hullHelp:
		while (true) {
			if (points.b) {
				var next = points.a;
				var rest = points.b;
				var _v1 = next;
				var z = _v1.p;
				var y = _v1.o;
				var x = _v1.n;
				var $temp$currentMinX = A2($elm$core$Basics$min, x, currentMinX),
					$temp$currentMaxX = A2($elm$core$Basics$max, x, currentMaxX),
					$temp$currentMinY = A2($elm$core$Basics$min, y, currentMinY),
					$temp$currentMaxY = A2($elm$core$Basics$max, y, currentMaxY),
					$temp$currentMinZ = A2($elm$core$Basics$min, z, currentMinZ),
					$temp$currentMaxZ = A2($elm$core$Basics$max, z, currentMaxZ),
					$temp$points = rest;
				currentMinX = $temp$currentMinX;
				currentMaxX = $temp$currentMaxX;
				currentMinY = $temp$currentMinY;
				currentMaxY = $temp$currentMaxY;
				currentMinZ = $temp$currentMinZ;
				currentMaxZ = $temp$currentMaxZ;
				points = $temp$points;
				continue hullHelp;
			} else {
				return {f3: currentMaxX, f4: currentMaxY, f5: currentMaxZ, f6: currentMinX, f7: currentMinY, f8: currentMinZ};
			}
		}
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$hull = F2(
	function (first, rest) {
		var _v0 = first;
		var z = _v0.p;
		var y = _v0.o;
		var x = _v0.n;
		return A7($ianmackenzie$elm_geometry$BoundingBox3d$hullHelp, x, x, y, y, z, z, rest);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainQuadVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 quadVertex;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 quadVertexPositions;\n        \n        void getQuadVertex(int quadVertexIndex, mat4 quadVertexPositions, out vec3 position, out vec3 normal, out vec4 tangent) {\n            vec3 next = vec3(0.0, 0.0, 0.0);\n            vec3 prev = vec3(0.0, 0.0, 0.0);\n            if (quadVertexIndex == 0) {\n                prev = quadVertexPositions[3].xyz;\n                position = quadVertexPositions[0].xyz;\n                next = quadVertexPositions[1].xyz;\n                tangent = vec4(normalize(next - position), 1.0);\n            } else if (quadVertexIndex == 1) {\n                prev = quadVertexPositions[0].xyz;\n                position = quadVertexPositions[1].xyz;\n                next = quadVertexPositions[2].xyz;\n                tangent = vec4(normalize(position - prev), 1.0);\n            } else if (quadVertexIndex == 2) {\n                prev = quadVertexPositions[1].xyz;\n                position = quadVertexPositions[2].xyz;\n                next = quadVertexPositions[3].xyz;\n                tangent = vec4(normalize(position - next), 1.0);\n            } else {\n                prev = quadVertexPositions[2].xyz;\n                position = quadVertexPositions[3].xyz;\n                next = quadVertexPositions[0].xyz;\n                tangent = vec4(normalize(prev - position), 1.0);\n            }\n            normal = normalize(cross(next - position, prev - position));\n        }\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main() {\n            vec3 position = vec3(0.0, 0.0, 0.0);\n            vec3 normal = vec3(0.0, 0.0, 0.0);\n            vec4 tangent = vec4(0.0, 0.0, 0.0, 0.0);\n            getQuadVertex(int(quadVertex.z), quadVertexPositions, position, normal, tangent);\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n        }\n    ',
	attributes: {quadVertex: 'dh'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', quadVertexPositions: 'az', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions = F4(
	function (firstPoint, secondPoint, thirdPoint, fourthPoint) {
		var p4 = $ianmackenzie$elm_geometry$Point3d$toMeters(fourthPoint);
		var p3 = $ianmackenzie$elm_geometry$Point3d$toMeters(thirdPoint);
		var p2 = $ianmackenzie$elm_geometry$Point3d$toMeters(secondPoint);
		var p1 = $ianmackenzie$elm_geometry$Point3d$toMeters(firstPoint);
		return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{fN: p1.n, fO: p2.n, fP: p3.n, fQ: p4.n, fR: p1.o, fS: p2.o, fT: p3.o, fU: p4.o, fV: p1.p, fW: p2.p, fX: p3.p, fY: p4.p, fZ: 0, f_: 0, f$: 0, f0: 0});
	});
var $elm_explorations$webgl$WebGL$triangleFan = $elm_explorations$webgl$WebGL$Mesh1(
	{e5: 1, fx: 0, ga: 6});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices = $elm_explorations$webgl$WebGL$triangleFan(
	_List_fromArray(
		[
			{
			dh: A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0)
		},
			{
			dh: A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 1, 0, 1)
		},
			{
			dh: A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 1, 1, 2)
		},
			{
			dh: A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 1, 3)
		}
		]));
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$smoothQuadVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 quadVertex;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 quadVertexPositions;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        void getQuadVertex(int quadVertexIndex, mat4 quadVertexPositions, out vec3 position, out vec3 normal, out vec4 tangent) {\n            vec3 next = vec3(0.0, 0.0, 0.0);\n            vec3 prev = vec3(0.0, 0.0, 0.0);\n            if (quadVertexIndex == 0) {\n                prev = quadVertexPositions[3].xyz;\n                position = quadVertexPositions[0].xyz;\n                next = quadVertexPositions[1].xyz;\n                tangent = vec4(normalize(next - position), 1.0);\n            } else if (quadVertexIndex == 1) {\n                prev = quadVertexPositions[0].xyz;\n                position = quadVertexPositions[1].xyz;\n                next = quadVertexPositions[2].xyz;\n                tangent = vec4(normalize(position - prev), 1.0);\n            } else if (quadVertexIndex == 2) {\n                prev = quadVertexPositions[1].xyz;\n                position = quadVertexPositions[2].xyz;\n                next = quadVertexPositions[3].xyz;\n                tangent = vec4(normalize(position - next), 1.0);\n            } else {\n                prev = quadVertexPositions[2].xyz;\n                position = quadVertexPositions[3].xyz;\n                next = quadVertexPositions[0].xyz;\n                tangent = vec4(normalize(prev - position), 1.0);\n            }\n            normal = normalize(cross(next - position, prev - position));\n        }\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        void main() {\n            vec3 position = vec3(0.0, 0.0, 0.0);\n            vec3 normal = vec3(0.0, 0.0, 0.0);\n            vec4 tangent = vec4(0.0, 0.0, 0.0, 0.0);\n            getQuadVertex(int(quadVertex.z), quadVertexPositions, position, normal, tangent);\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n        }\n    ',
	attributes: {quadVertex: 'dh'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', quadVertexPositions: 'az', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedQuadVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 quadVertex;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 quadVertexPositions;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec4 interpolatedTangent;\n        \n        void getQuadVertex(int quadVertexIndex, mat4 quadVertexPositions, out vec3 position, out vec3 normal, out vec4 tangent) {\n            vec3 next = vec3(0.0, 0.0, 0.0);\n            vec3 prev = vec3(0.0, 0.0, 0.0);\n            if (quadVertexIndex == 0) {\n                prev = quadVertexPositions[3].xyz;\n                position = quadVertexPositions[0].xyz;\n                next = quadVertexPositions[1].xyz;\n                tangent = vec4(normalize(next - position), 1.0);\n            } else if (quadVertexIndex == 1) {\n                prev = quadVertexPositions[0].xyz;\n                position = quadVertexPositions[1].xyz;\n                next = quadVertexPositions[2].xyz;\n                tangent = vec4(normalize(position - prev), 1.0);\n            } else if (quadVertexIndex == 2) {\n                prev = quadVertexPositions[1].xyz;\n                position = quadVertexPositions[2].xyz;\n                next = quadVertexPositions[3].xyz;\n                tangent = vec4(normalize(position - next), 1.0);\n            } else {\n                prev = quadVertexPositions[2].xyz;\n                position = quadVertexPositions[3].xyz;\n                next = quadVertexPositions[0].xyz;\n                tangent = vec4(normalize(prev - position), 1.0);\n            }\n            normal = normalize(cross(next - position, prev - position));\n        }\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        void main() {\n            vec3 position = vec3(0.0, 0.0, 0.0);\n            vec3 normal = vec3(0.0, 0.0, 0.0);\n            vec4 tangent = vec4(0.0, 0.0, 0.0, 0.0);\n            getQuadVertex(int(quadVertex.z), quadVertexPositions, position, normal, tangent);\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n            interpolatedUv = quadVertex.xy;\n            interpolatedTangent = tangent;\n        }\n    ',
	attributes: {quadVertex: 'dh'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', quadVertexPositions: 'az', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitQuadVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 quadVertex;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 quadVertexPositions;\n        \n        varying mediump vec2 interpolatedUv;\n        \n        void getQuadVertex(int quadVertexIndex, mat4 quadVertexPositions, out vec3 position, out vec3 normal, out vec4 tangent) {\n            vec3 next = vec3(0.0, 0.0, 0.0);\n            vec3 prev = vec3(0.0, 0.0, 0.0);\n            if (quadVertexIndex == 0) {\n                prev = quadVertexPositions[3].xyz;\n                position = quadVertexPositions[0].xyz;\n                next = quadVertexPositions[1].xyz;\n                tangent = vec4(normalize(next - position), 1.0);\n            } else if (quadVertexIndex == 1) {\n                prev = quadVertexPositions[0].xyz;\n                position = quadVertexPositions[1].xyz;\n                next = quadVertexPositions[2].xyz;\n                tangent = vec4(normalize(position - prev), 1.0);\n            } else if (quadVertexIndex == 2) {\n                prev = quadVertexPositions[1].xyz;\n                position = quadVertexPositions[2].xyz;\n                next = quadVertexPositions[3].xyz;\n                tangent = vec4(normalize(position - next), 1.0);\n            } else {\n                prev = quadVertexPositions[2].xyz;\n                position = quadVertexPositions[3].xyz;\n                next = quadVertexPositions[0].xyz;\n                tangent = vec4(normalize(prev - position), 1.0);\n            }\n            normal = normalize(cross(next - position, prev - position));\n        }\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main() {\n            vec3 position = vec3(0.0, 0.0, 0.0);\n            vec3 normal = vec3(0.0, 0.0, 0.0);\n            vec4 tangent = vec4(0.0, 0.0, 0.0, 0.0);\n            getQuadVertex(int(quadVertex.z), quadVertexPositions, position, normal, tangent);\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedUv = quadVertex.xy;\n        }\n    ',
	attributes: {quadVertex: 'dh'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', quadVertexPositions: 'az', sceneProperties: 'd', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$quadMesh = F5(
	function (givenMaterial, firstPoint, secondPoint, thirdPoint, fourthPoint) {
		var boundingBox = A2(
			$ianmackenzie$elm_geometry$BoundingBox3d$hull,
			firstPoint,
			_List_fromArray(
				[secondPoint, thirdPoint, fourthPoint]));
		var bounds = $ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox);
		switch (givenMaterial.$) {
			case 0:
				if (!givenMaterial.b.$) {
					var color = givenMaterial.b.a;
					return A3(
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
						color,
						bounds,
						F8(
							function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
								return A5(
									$elm_explorations$webgl$WebGL$entityWith,
									A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainQuadVertex,
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantFragment,
									$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
									{
										bI: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(color),
										a: modelMatrix,
										b: modelScale,
										c: projectionMatrix,
										az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
										d: sceneProperties,
										e: viewMatrix
									});
							}));
				} else {
					var _v1 = givenMaterial.a;
					var data = givenMaterial.b.a.e0;
					return A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
						bounds,
						F8(
							function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
								return A5(
									$elm_explorations$webgl$WebGL$entityWith,
									A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitQuadVertex,
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$colorTextureFragment,
									$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
									{
										cK: data,
										a: modelMatrix,
										b: modelScale,
										c: projectionMatrix,
										az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
										d: sceneProperties,
										e: viewMatrix
									});
							}));
				}
			case 1:
				if (!givenMaterial.b.$) {
					var emissiveColor = givenMaterial.b.a;
					var backlight = givenMaterial.c;
					return A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
						bounds,
						F8(
							function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
								return A5(
									$elm_explorations$webgl$WebGL$entityWith,
									A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainQuadVertex,
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveFragment,
									$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
									{
										dC: backlight,
										bN: A2(
											$elm_explorations$linear_algebra$Math$Vector4$scale,
											$ianmackenzie$elm_units$Luminance$inNits(backlight),
											emissiveColor),
										a: modelMatrix,
										b: modelScale,
										c: projectionMatrix,
										az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
										d: sceneProperties,
										e: viewMatrix
									});
							}));
				} else {
					var _v2 = givenMaterial.a;
					var data = givenMaterial.b.a.e0;
					var backlight = givenMaterial.c;
					return A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
						bounds,
						F8(
							function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
								return A5(
									$elm_explorations$webgl$WebGL$entityWith,
									A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitQuadVertex,
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveTextureFragment,
									$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
									{
										dC: $ianmackenzie$elm_units$Luminance$inNits(backlight),
										cK: data,
										a: modelMatrix,
										b: modelScale,
										c: projectionMatrix,
										az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
										d: sceneProperties,
										e: viewMatrix
									});
							}));
				}
			case 2:
				var _v3 = givenMaterial.a;
				var materialColorTexture = givenMaterial.b;
				var ambientOcclusionTexture = givenMaterial.c;
				var normalMapTexture = givenMaterial.d;
				var _v4 = A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$resolveLambertian, materialColorTexture, ambientOcclusionTexture, normalMapTexture);
				if (!_v4.$) {
					var materialColor = _v4.a;
					var ambientOcclusion = _v4.b;
					return A3(
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
						materialColor,
						bounds,
						F8(
							function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v5, settings) {
								var lights = _v5.a;
								var enabledLights = _v5.b;
								return A5(
									$elm_explorations$webgl$WebGL$entityWith,
									A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$smoothQuadVertex,
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianFragment,
									$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
									{
										bF: ambientOcclusion,
										u: enabledLights,
										cl: lights.cl,
										c0: lights.c0,
										c1: lights.c1,
										c2: lights.c2,
										ea: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(materialColor),
										a: modelMatrix,
										b: modelScale,
										c: projectionMatrix,
										az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
										d: sceneProperties,
										e: viewMatrix
									});
							}));
				} else {
					if (!_v4.a.$) {
						var materialColorData = _v4.a.a;
						var _v6 = _v4.b;
						var ambientOcclusionData = _v6.a;
						var constantAmbientOcclusion = _v6.b;
						var _v7 = _v4.c;
						var normalMapData = _v7.a;
						var normalMapType = _v7.b;
						return A2(
							$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
							bounds,
							F8(
								function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v8, settings) {
									var lights = _v8.a;
									var enabledLights = _v8.b;
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedQuadVertex,
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment,
										$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
										{
											ao: ambientOcclusionData,
											ap: constantAmbientOcclusion,
											bJ: $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4,
											u: enabledLights,
											cl: lights.cl,
											c0: lights.c0,
											c1: lights.c1,
											c2: lights.c2,
											bV: materialColorData,
											a: modelMatrix,
											b: modelScale,
											av: normalMapData,
											aw: normalMapType,
											c: projectionMatrix,
											az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
											d: sceneProperties,
											e: viewMatrix
										});
								}));
					} else {
						var _v9 = _v4.a;
						var constantMaterialColor = _v9.a;
						var dummyTexture = _v9.b;
						var _v10 = _v4.b;
						var ambientOcclusionData = _v10.a;
						var constantAmbientOcclusion = _v10.b;
						var _v11 = _v4.c;
						var normalMapData = _v11.a;
						var normalMapType = _v11.b;
						return A3(
							$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
							constantMaterialColor,
							bounds,
							F8(
								function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v12, settings) {
									var lights = _v12.a;
									var enabledLights = _v12.b;
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedQuadVertex,
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment,
										$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
										{
											ao: ambientOcclusionData,
											ap: constantAmbientOcclusion,
											bJ: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(constantMaterialColor),
											u: enabledLights,
											cl: lights.cl,
											c0: lights.c0,
											c1: lights.c1,
											c2: lights.c2,
											bV: dummyTexture,
											a: modelMatrix,
											b: modelScale,
											av: normalMapData,
											aw: normalMapType,
											c: projectionMatrix,
											az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
											d: sceneProperties,
											e: viewMatrix
										});
								}));
					}
				}
			default:
				var _v13 = givenMaterial.a;
				var baseColorTexture = givenMaterial.b;
				var roughnessTexture = givenMaterial.c;
				var metallicTexture = givenMaterial.d;
				var ambientOcclusionTexture = givenMaterial.e;
				var normalMapTexture = givenMaterial.f;
				var _v14 = A5($ianmackenzie$elm_3d_scene$Scene3d$Entity$resolvePbr, baseColorTexture, roughnessTexture, metallicTexture, ambientOcclusionTexture, normalMapTexture);
				if (!_v14.$) {
					var baseColor = _v14.a;
					var roughness = _v14.b;
					var metallic = _v14.c;
					var ambientOcclusion = _v14.d;
					return A3(
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
						baseColor,
						bounds,
						F8(
							function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v15, settings) {
								var lights = _v15.a;
								var enabledLights = _v15.b;
								return A5(
									$elm_explorations$webgl$WebGL$entityWith,
									A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$smoothQuadVertex,
									$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalFragment,
									$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
									{
										bF: ambientOcclusion,
										dI: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(baseColor),
										u: enabledLights,
										cl: lights.cl,
										c0: lights.c0,
										c1: lights.c1,
										c2: lights.c2,
										ed: metallic,
										a: modelMatrix,
										b: modelScale,
										c: projectionMatrix,
										az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
										ey: roughness,
										d: sceneProperties,
										e: viewMatrix
									});
							}));
				} else {
					if (!_v14.a.$) {
						var baseColorData = _v14.a.a;
						var _v16 = _v14.b;
						var roughnessData = _v16.a;
						var constantRoughness = _v16.b;
						var _v17 = _v14.c;
						var metallicData = _v17.a;
						var constantMetallic = _v17.b;
						var _v18 = _v14.d;
						var ambientOcclusionData = _v18.a;
						var constantAmbientOcclusion = _v18.b;
						var _v19 = _v14.e;
						var normalMapData = _v19.a;
						var normalMapType = _v19.b;
						return A2(
							$ianmackenzie$elm_3d_scene$Scene3d$Types$OpaqueMeshNode,
							bounds,
							F8(
								function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v20, settings) {
									var lights = _v20.a;
									var enabledLights = _v20.b;
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedQuadVertex,
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment,
										$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
										{
											ao: ambientOcclusionData,
											bG: baseColorData,
											ap: constantAmbientOcclusion,
											bH: $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4,
											bK: constantMetallic,
											bL: constantRoughness,
											u: enabledLights,
											cl: lights.cl,
											c0: lights.c0,
											c1: lights.c1,
											c2: lights.c2,
											bW: metallicData,
											a: modelMatrix,
											b: modelScale,
											av: normalMapData,
											aw: normalMapType,
											c: projectionMatrix,
											az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
											b_: roughnessData,
											d: sceneProperties,
											e: viewMatrix
										});
								}));
					} else {
						var _v21 = _v14.a;
						var constantBaseColor = _v21.a;
						var dummyTexture = _v21.b;
						var _v22 = _v14.b;
						var roughnessData = _v22.a;
						var constantRoughness = _v22.b;
						var _v23 = _v14.c;
						var metallicData = _v23.a;
						var constantMetallic = _v23.b;
						var _v24 = _v14.d;
						var ambientOcclusionData = _v24.a;
						var constantAmbientOcclusion = _v24.b;
						var _v25 = _v14.e;
						var normalMapData = _v25.a;
						var normalMapType = _v25.b;
						return A3(
							$ianmackenzie$elm_3d_scene$Scene3d$Entity$meshNode,
							constantBaseColor,
							bounds,
							F8(
								function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v26, settings) {
									var lights = _v26.a;
									var enabledLights = _v26.b;
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, 0, settings),
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedQuadVertex,
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment,
										$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertices,
										{
											ao: ambientOcclusionData,
											bG: dummyTexture,
											ap: constantAmbientOcclusion,
											bH: $ianmackenzie$elm_3d_scene$Scene3d$Entity$premultiplyColor(constantBaseColor),
											bK: constantMetallic,
											bL: constantRoughness,
											u: enabledLights,
											cl: lights.cl,
											c0: lights.c0,
											c1: lights.c1,
											c2: lights.c2,
											bW: metallicData,
											a: modelMatrix,
											b: modelScale,
											av: normalMapData,
											aw: normalMapType,
											c: projectionMatrix,
											az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
											b_: roughnessData,
											d: sceneProperties,
											e: viewMatrix
										});
								}));
					}
				}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$quadShadowMesh = function () {
	var quadShadowVertices = _List_fromArray(
		[
			{
			bi: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 1)
		},
			{
			bi: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 1)
		},
			{
			bi: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 2, 1)
		},
			{
			bi: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 3, 1)
		},
			{
			bi: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, -1)
		},
			{
			bi: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, -1)
		},
			{
			bi: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 2, -1)
		},
			{
			bi: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 3, -1)
		}
		]);
	var quadShadowFaces = _List_fromArray(
		[
			_Utils_Tuple3(0, 1, 2),
			_Utils_Tuple3(0, 2, 3),
			_Utils_Tuple3(4, 6, 5),
			_Utils_Tuple3(4, 7, 6),
			_Utils_Tuple3(4, 5, 1),
			_Utils_Tuple3(1, 0, 4),
			_Utils_Tuple3(5, 6, 2),
			_Utils_Tuple3(2, 1, 5),
			_Utils_Tuple3(6, 7, 3),
			_Utils_Tuple3(3, 2, 6),
			_Utils_Tuple3(7, 4, 0),
			_Utils_Tuple3(0, 3, 7)
		]);
	return A2($elm_explorations$webgl$WebGL$indexedTriangles, quadShadowVertices, quadShadowFaces);
}();
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$quadShadowVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec2 quadShadowVertex;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 shadowLight;\n        uniform highp mat4 quadVertexPositions;\n        \n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        \n        void getQuadVertex(int quadVertexIndex, mat4 quadVertexPositions, out vec3 position, out vec3 normal, out vec4 tangent) {\n            vec3 next = vec3(0.0, 0.0, 0.0);\n            vec3 prev = vec3(0.0, 0.0, 0.0);\n            if (quadVertexIndex == 0) {\n                prev = quadVertexPositions[3].xyz;\n                position = quadVertexPositions[0].xyz;\n                next = quadVertexPositions[1].xyz;\n                tangent = vec4(normalize(next - position), 1.0);\n            } else if (quadVertexIndex == 1) {\n                prev = quadVertexPositions[0].xyz;\n                position = quadVertexPositions[1].xyz;\n                next = quadVertexPositions[2].xyz;\n                tangent = vec4(normalize(position - prev), 1.0);\n            } else if (quadVertexIndex == 2) {\n                prev = quadVertexPositions[1].xyz;\n                position = quadVertexPositions[2].xyz;\n                next = quadVertexPositions[3].xyz;\n                tangent = vec4(normalize(position - next), 1.0);\n            } else {\n                prev = quadVertexPositions[2].xyz;\n                position = quadVertexPositions[3].xyz;\n                next = quadVertexPositions[0].xyz;\n                tangent = vec4(normalize(prev - position), 1.0);\n            }\n            normal = normalize(cross(next - position, prev - position));\n        }\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        vec3 getDirectionToLight(vec3 surfacePosition, vec4 xyz_type, vec4 rgb_parameter) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                return xyz_type.xyz;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                return normalize(lightPosition - surfacePosition);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 shadowVertexPosition(vec3 position, vec3 normal, mat4 shadowLight, vec4 modelScale, mat4 modelMatrix, mat4 viewMatrix, mat4 projectionMatrix, mat4 sceneProperties) {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            vec3 worldNormal = getWorldNormal(normal, vec4(modelScale.xyz, 1.0), modelMatrix);\n            vec4 xyz_type = shadowLight[0];\n            vec4 rgb_parameter = shadowLight[1];\n            vec3 directionToLight = getDirectionToLight(worldPosition.xyz, xyz_type, rgb_parameter);\n            vec3 offset = vec3(0.0, 0.0, 0.0);\n            float sceneDiameter = sceneProperties[3][1];\n            if (dot(directionToLight, worldNormal) <= 0.0) {\n                offset = -sceneDiameter * directionToLight;\n            } else {\n                offset = -0.001 * sceneDiameter * directionToLight;\n            }\n            vec4 offsetPosition = worldPosition + vec4(offset, 0.0);\n            return projectionMatrix * (viewMatrix * offsetPosition);\n        }\n        \n        void main () {\n            vec3 position = vec3(0.0, 0.0, 0.0);\n            vec3 normal = vec3(0.0, 0.0, 0.0);\n            vec4 tangent = vec4(0.0, 0.0, 0.0, 0.0);\n            getQuadVertex(int(quadShadowVertex.x), quadVertexPositions, position, normal, tangent);\n            normal *= quadShadowVertex.y;\n            gl_Position = shadowVertexPosition(\n                position,\n                normal,\n                shadowLight,\n                modelScale,\n                modelMatrix,\n                viewMatrix,\n                projectionMatrix,\n                sceneProperties\n            );\n        }\n    ',
	attributes: {quadShadowVertex: 'bi'},
	uniforms: {modelMatrix: 'a', modelScale: 'b', projectionMatrix: 'c', quadVertexPositions: 'az', sceneProperties: 'd', shadowLight: 'dn', viewMatrix: 'e'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$quadShadow = F4(
	function (firstPoint, secondPoint, thirdPoint, fourthPoint) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode(
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, shadowLight, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowSettings, isRightHanded, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$quadShadowVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowFragment,
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$quadShadowMesh,
						{
							a: modelMatrix,
							b: modelScale,
							c: projectionMatrix,
							az: A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadVertexPositions, firstPoint, secondPoint, thirdPoint, fourthPoint),
							d: sceneProperties,
							dn: shadowLight,
							e: viewMatrix
						});
				}));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$quad = F7(
	function (renderObject, renderShadow, givenMaterial, firstPoint, secondPoint, thirdPoint, fourthPoint) {
		var meshEntity = A5($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadMesh, givenMaterial, firstPoint, secondPoint, thirdPoint, fourthPoint);
		var _v0 = _Utils_Tuple2(renderObject, renderShadow);
		if (_v0.a) {
			if (_v0.b) {
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(
					_List_fromArray(
						[
							meshEntity,
							A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadShadow, firstPoint, secondPoint, thirdPoint, fourthPoint)
						]));
			} else {
				return meshEntity;
			}
		} else {
			if (_v0.b) {
				return A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$quadShadow, firstPoint, secondPoint, thirdPoint, fourthPoint);
			} else {
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$quadWithShadow = F5(
	function (givenMaterial, p1, p2, p3, p4) {
		return A7($ianmackenzie$elm_3d_scene$Scene3d$Entity$quad, true, true, givenMaterial, p1, p2, p3, p4);
	});
var $avh4$elm_color$Color$rgb = F3(
	function (r, g, b) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, 1.0);
	});
var $author$project$Main$wallNegX = function (playerZ) {
	return A5(
		$ianmackenzie$elm_3d_scene$Scene3d$quadWithShadow,
		$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(
			A3($avh4$elm_color$Color$rgb, 0.8, 0.75, 0.8)),
		A3($ianmackenzie$elm_geometry$Point3d$meters, (-$author$project$Main$maxExtent) - 0.01, $author$project$Main$maxExtent + 0.01, (-60) + playerZ),
		A3($ianmackenzie$elm_geometry$Point3d$meters, (-$author$project$Main$maxExtent) - 0.01, (-$author$project$Main$maxExtent) - 0.01, (-60) + playerZ),
		A3($ianmackenzie$elm_geometry$Point3d$meters, (-$author$project$Main$maxExtent) - 0.01, (-$author$project$Main$maxExtent) - 0.01, 10 + playerZ),
		A3($ianmackenzie$elm_geometry$Point3d$meters, (-$author$project$Main$maxExtent) - 0.01, $author$project$Main$maxExtent + 0.01, 10 + playerZ));
};
var $author$project$Main$wallNegY = function (playerZ) {
	return A5(
		$ianmackenzie$elm_3d_scene$Scene3d$quadWithShadow,
		$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(
			A3($avh4$elm_color$Color$rgb, 0.75, 0.75, 0.8)),
		A3($ianmackenzie$elm_geometry$Point3d$meters, (-$author$project$Main$maxExtent) - 0.01, (-$author$project$Main$maxExtent) - 0.01, (-60) + playerZ),
		A3($ianmackenzie$elm_geometry$Point3d$meters, $author$project$Main$maxExtent + 0.01, (-$author$project$Main$maxExtent) - 0.01, (-60) + playerZ),
		A3($ianmackenzie$elm_geometry$Point3d$meters, $author$project$Main$maxExtent + 0.01, (-$author$project$Main$maxExtent) - 0.01, 10 + playerZ),
		A3($ianmackenzie$elm_geometry$Point3d$meters, (-$author$project$Main$maxExtent) - 0.01, (-$author$project$Main$maxExtent) - 0.01, 10 + playerZ));
};
var $ianmackenzie$elm_3d_scene$Scene3d$nothing = $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
var $author$project$Main$wallPosX = $ianmackenzie$elm_3d_scene$Scene3d$nothing;
var $author$project$Main$wallPosY = $ianmackenzie$elm_3d_scene$Scene3d$nothing;
var $author$project$Main$view3d = F2(
	function (model, game) {
		var playerPosition = $ianmackenzie$elm_geometry$Frame3d$originPoint(
			$author$project$Physics$frame(game.aM));
		var playerZ = $ianmackenzie$elm_units$Length$inMeters(
			$ianmackenzie$elm_geometry$Point3d$zCoordinate(playerPosition));
		var camera = $author$project$Main$makeCamera(playerPosition);
		var mainLight = A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
			$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
			{
				cI: $ianmackenzie$elm_3d_scene$Scene3d$Light$sunlight,
				cY: $ianmackenzie$elm_units$LuminousFlux$lumens(5000),
				gs: $ianmackenzie$elm_3d_camera$Camera3d$eyePoint(camera)
			});
		var _v0 = game.S;
		var holeFrame = _v0.a;
		var holeHue = _v0.b;
		var holeColor = A3($avh4$elm_color$Color$hsl, holeHue, 1.0, 0.5);
		return $ianmackenzie$elm_3d_scene$Scene3d$custom(
			{
				g1: $ianmackenzie$elm_3d_scene$Scene3d$noAntialiasing,
				g5: $ianmackenzie$elm_3d_scene$Scene3d$backgroundColor($avh4$elm_color$Color$black),
				g6: camera,
				hb: $ianmackenzie$elm_units$Length$millimeters(2),
				hg: _Utils_Tuple2(
					$ianmackenzie$elm_units$Pixels$int(model.bD),
					$ianmackenzie$elm_units$Pixels$int(model.bs)),
				hn: _Utils_ap(
					_List_fromArray(
						[
							A2(
							$ianmackenzie$elm_3d_scene$Scene3d$placeIn,
							$author$project$Physics$frame(game.aM),
							A3(
								$ianmackenzie$elm_3d_scene$Scene3d$scaleAbout,
								$ianmackenzie$elm_geometry$Point3d$origin,
								0.25,
								A3($ianmackenzie$elm_3d_scene$Scene3d$meshWithShadow, game.aZ.dE, game.aZ.dF, game.aZ.dG))),
							$author$project$Main$wallPosX,
							$author$project$Main$wallNegX(playerZ),
							$author$project$Main$wallPosY,
							$author$project$Main$wallNegY(playerZ),
							A2(
							$ianmackenzie$elm_3d_scene$Scene3d$placeIn,
							holeFrame,
							A3(
								$ianmackenzie$elm_3d_scene$Scene3d$scaleAbout,
								$ianmackenzie$elm_geometry$Point3d$origin,
								0.9,
								A2(
									$ianmackenzie$elm_3d_scene$Scene3d$mesh,
									$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(holeColor),
									game.aZ.cR)))
						]),
					_Utils_ap(
						A2(
							$elm$core$List$map,
							$author$project$Main$viewGoal(game.aZ),
							game.a0),
						game.bq)),
				hp: $ianmackenzie$elm_3d_scene$Scene3d$exposureValue(4),
				hL: function () {
					var _v1 = game.a0;
					if (!_v1.b) {
						return A2(
							$ianmackenzie$elm_3d_scene$Scene3d$twoLights,
							mainLight,
							$author$project$Main$goalLight(game.S));
					} else {
						if (!_v1.b.b) {
							var one = _v1.a;
							return A3(
								$ianmackenzie$elm_3d_scene$Scene3d$threeLights,
								mainLight,
								$author$project$Main$goalLight(game.S),
								$author$project$Main$prevGoalLight(one));
						} else {
							if (!_v1.b.b.b) {
								var one = _v1.a;
								var _v2 = _v1.b;
								var two = _v2.a;
								return A4(
									$ianmackenzie$elm_3d_scene$Scene3d$fourLights,
									mainLight,
									$author$project$Main$goalLight(game.S),
									$author$project$Main$prevGoalLight(one),
									$author$project$Main$prevGoalLight(two));
							} else {
								if (!_v1.b.b.b.b) {
									var one = _v1.a;
									var _v3 = _v1.b;
									var two = _v3.a;
									var _v4 = _v3.b;
									var three = _v4.a;
									return A5(
										$ianmackenzie$elm_3d_scene$Scene3d$fiveLights,
										mainLight,
										$author$project$Main$goalLight(game.S),
										$author$project$Main$prevGoalLight(one),
										$author$project$Main$prevGoalLight(two),
										$author$project$Main$prevGoalLightNoShadoow(three));
								} else {
									var one = _v1.a;
									var _v5 = _v1.b;
									var two = _v5.a;
									var _v6 = _v5.b;
									var three = _v6.a;
									var _v7 = _v6.b;
									var four = _v7.a;
									return A6(
										$ianmackenzie$elm_3d_scene$Scene3d$sixLights,
										mainLight,
										$author$project$Main$goalLight(game.S),
										$author$project$Main$prevGoalLight(one),
										$author$project$Main$prevGoalLight(two),
										$author$project$Main$prevGoalLightNoShadoow(three),
										$author$project$Main$prevGoalLightNoShadoow(four));
								}
							}
						}
					}
				}(),
				ih: $ianmackenzie$elm_3d_scene$Scene3d$hableFilmicToneMapping,
				iq: $ianmackenzie$elm_3d_scene$Scene3d$Light$daylight
			});
	});
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $author$project$Css$mainMenu = $elm$html$Html$Attributes$class('mainMenu');
var $author$project$Main$viewMainMenu = _List_fromArray(
	[
		A2(
		$elm$html$Html$div,
		_List_fromArray(
			[$author$project$Css$mainMenu]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Ball Fall')
					])),
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Can you get the lowest score?')
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($author$project$Main$UserClickedStart)
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Drop-in')
							]))
					]))
			]))
	]);
var $author$project$Main$viewGame = F2(
	function (model, game) {
		var _v0 = game.Z;
		if (!_v0.$) {
			return $author$project$Main$viewMainMenu;
		} else {
			var state = _v0.a;
			return _List_fromArray(
				[
					A2($author$project$Main$view3d, model, game),
					function (z) {
					return A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$author$project$Css$score]),
						_List_fromArray(
							[
								$elm$html$Html$text('Score: ' + z)
							]));
				}(
					$elm$core$String$fromInt(
						$elm$core$Basics$floor(
							$ianmackenzie$elm_units$Length$inMeters(
								$ianmackenzie$elm_geometry$Point3d$zCoordinate(
									$ianmackenzie$elm_geometry$Frame3d$originPoint(
										$author$project$Physics$frame(game.aM))))))),
					function (z) {
					return A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$author$project$Css$timer]),
						_List_fromArray(
							[
								$elm$html$Html$text(z + 's')
							]));
				}(
					$elm$core$String$fromInt(
						$elm$core$Basics$ceiling(
							$ianmackenzie$elm_units$Duration$inSeconds(game.a1)))),
					function () {
					switch (state) {
						case 0:
							return $elm$html$Html$text('');
						case 1:
							return A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$author$project$Css$paused]),
								_List_fromArray(
									[
										$elm$html$Html$text('PAUSED'),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Main$UserUnpaused)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Resume')
											]))
									]));
						default:
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[$author$project$Css$timeRanOut]),
								_List_fromArray(
									[
										$elm$html$Html$text('Time ran out'),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Main$UserClickedStart)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Drop-in again')
											]))
									]));
					}
				}()
				]);
		}
	});
var $author$project$Main$view = function (model) {
	return {
		dM: function () {
			var _v0 = model.k;
			switch (_v0.$) {
				case 0:
					return _List_fromArray(
						[
							$elm$html$Html$text('Loading...')
						]);
				case 1:
					var err = _v0.a;
					return _List_fromArray(
						[
							$elm$html$Html$text(err)
						]);
				default:
					var game = _v0.a;
					return A2($author$project$Main$viewGame, model, game);
			}
		}(),
		ig: 'Ball Fall'
	};
};
var $author$project$Main$main = $elm$browser$Browser$document(
	{hH: $author$project$Main$init, ic: $author$project$Main$subscriptions, ij: $author$project$Main$update, ip: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (initialSeed) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (height) {
							return $elm$json$Json$Decode$succeed(
								{bs: height, dZ: initialSeed, bD: width});
						},
						A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$int));
				},
				A2($elm$json$Json$Decode$field, 'initialSeed', $elm$json$Json$Decode$int));
		},
		A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$int)))(0)}});}(this));