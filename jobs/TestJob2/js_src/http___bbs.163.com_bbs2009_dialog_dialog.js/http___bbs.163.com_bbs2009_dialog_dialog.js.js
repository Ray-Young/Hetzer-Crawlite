/** * Author: 阿海 */var Drag = {	"obj" : null,	"init" : function(a, aRoot) {		a.onmousedown = Drag.start;		a.root = aRoot;		if (isNaN(parseInt(a.root.style.left)))			a.root.style.left = "0px";		if (isNaN(parseInt(a.root.style.top)))			a.root.style.top = "0px";		a.root.onDragStart = new Function();		a.root.onDragEnd = new Function();		a.root.onDrag = new Function();	},	"start" : function(a) {		var b = Drag.obj = this;		a = Drag.fixE(a);		var c = parseInt(b.root.style.top);		var d = parseInt(b.root.style.left);		b.root.onDragStart(d, c, a.clientX, a.clientY);		b.lastMouseX = a.clientX;		b.lastMouseY = a.clientY;		document.onmousemove = Drag.drag;		document.onmouseup = Drag.end;		return false;	},	"drag" : function(a) {		a = Drag.fixE(a);		var b = Drag.obj;		var c = a.clientY;		var d = a.clientX;		var e = parseInt(b.root.style.top);		var f = parseInt(b.root.style.left);		var h, g;		h = f + d - b.lastMouseX;		g = e + c - b.lastMouseY;		b.root.style.left = h + "px";		b.root.style.top = g + "px";		b.lastMouseX = d;		b.lastMouseY = c;		b.root.onDrag(h, g, a.clientX, a.clientY);		return false;	},	"end" : function() {		document.onmousemove = null;		document.onmouseup = null;		Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style.left),				parseInt(Drag.obj.root.style.top));		Drag.obj = null;	},	"fixE" : function(a) {		if (typeof a == "undefined")			a = window.event;		if (typeof a.layerX == "undefined")			a.layerX = a.offsetX;		if (typeof a.layerY == "undefined")			a.layerY = a.offsetY;		return a;	}};Object.printAll = function(obj) {	var msg = "";	var i = 0;	for (dd in obj) {		msg += dd + "  ";		if ((i + 1) % 5 == 0) {			msg += "\n";		}		i++;	}	alert(msg);}var Dialog = {	"init" : "",	"dialogBox" : null,	"defWidth" : 400,	"width" : 0,	"height" : 400,	"basePath" : "",	"setBasePath" : function(url) {		this.basePath = url;	},	"parseUrl" : function(url) {		if (this.basePath == "") {			return url;		}		if (url.substring(0, 7) == "http://") {			return url;		}				var basePath;		if (this.basePath.substring(this.basePath.length-1)=="/") {			basePath = this.basePath.substring(0, this.basePath.length-1); 		}		else {			basePath = this.basePath; 		}		var firstChar = url.substring(0);		if ("/" == firstChar) {			url = basePath + url;		} else {			url = basePath + "/" + url;		}		return url;	},	/**	 * 显示窗口	 * 	 * @param title	 *            窗口标题	 * @param url	 *            窗口内容页面的URL	 * @param loadCss	 *            是否加载CSS	 * @param loadJs	 *            是否加载JS	 */	"show" : function(title, url, loadCss, loadJs, initfunc) {		if (this.dialogBox == null) {			// 窗口不存在，自动创建			this.create();		}		this.setWidth(this.defWidth); // 默认宽度		this.dialogBox.style.display = "block"; // 显示窗口		this.setTitle(title); // 设置标题		this.loading = setTimeout("Dialog.setLoading()", 0); // 前端要求修改，解决闪现的问题。 200毫秒内数据没有加载就会显示“数据加载中...”		Drag.init(document.getElementById("draghead"), this.dialogBox);		this.dialogBox.onDragEnd = function(x, y) {			Dialog.dialogBox.ox = x - Dialog.getRange().left;			Dialog.dialogBox.oy = y - Dialog.getRange().top;		}		this.center(); // 当浏览器不是在第一屏的位置显示窗口会看不见，所以要让它自动在当前屏幕的中间显示		url = this.parseUrl(url);		this.loadContent(url, loadCss, loadJs, initfunc); // 加载窗口内容	},	"showContent" : function(title, content) {		if (this.dialogBox == null) {			// 窗口不存在，自动创建			this.create();		}		this.setWidth(this.defWidth); // 默认宽度		this.dialogBox.style.display = "block"; // 显示窗口		this.setTitle(title); // 设置标题				Drag.init(document.getElementById("draghead"), this.dialogBox);		this.dialogBox.onDragEnd = function(x, y) {			Dialog.dialogBox.ox = x - Dialog.getRange().left;			Dialog.dialogBox.oy = y - Dialog.getRange().top;		}		this.center(); // 当浏览器不是在第一屏的位置显示窗口会看不见，所以要让它自动在当前屏幕的中间显示		var html = '<div class="dialogBox_Content">';		html += '<h5 style="font-size:16px; font-weight:normal; clear:both; line-height:24px;">';		html += content + '</h5>';		$("dialogBox_content").innerHTML = html;	},	"setWidth" : function(width) {		if (width != this.width) {			this.width = width;			this.dialogBox.style.width = width + "px";			this.center();		}	},	"setHeight" : function(height) {		if (height != this.height) {			this.height = height;		}	},	"loading" : null,	"setLoading" : function() {		this.setContent("数据加载中...");	},	"clearLoading" : function() {		if (this.loading != null) {			clearTimeout(this.loading);			this.loading = null;		}	},	/**	 * 加载窗口内容	 */	"loadContent" : function(url, loadCss, loadJs, initfunc) {		var time = "?" + (new Date().getTime());		/**		 * 使用GET方式会有缓存问题，所以要使用POST		 */		new Ajax.Request(url, {			method : 'get',			requestHeaders : [ "If-Modified-Since", "0" ],			onComplete : function(obj) {				Dialog.clearLoading()				/**				 * this.setContent("数据加载中...");//须将内容清空，否则有时会发生IE崩溃的情况(目前发现修改文章时会发生)				 */				$("dialogBox_content").innerHTML = (obj.responseText);				if (loadCss) {					Dialog.loadCss(url + ".css");				}				if (loadJs) {					Dialog.loadJs(url + ".js", initfunc);				}			}		});	},	"alert":function(content) {		this.showContent("系统提示", content);	},	/**	 * 设置窗口内容（提示信息）.	 */	"setContent" : function(content) {		document.getElementById("dialogBox_content").innerHTML = "<div class='dialogBox_Content'>"				+ content + "</div>";	},	/**	 * 关闭窗口	 */	"close" : function() {		if (this.dialogBox != null) {			this.dialogBox.style.display = "none";			this.setLoading();		}	},	/**	 * 设置窗口的标题	 * 	 * @html 窗口的标题，支持HTML	 */	"setTitle" : function(html) {		document.getElementById("dialogBox_title").innerHTML = html;	},	/**	 * 创建窗口	 */	"create" : function() {		this.loadCss("http://img1.cache.netease.com/bbs/css/dialog_v1.0.0.css");		var dialogBox = document.createElement("DIV");		dialogBox.id = "dialogBox";		dialogBox.className = "dialogBoxBg";		var html = '<div class="dialogBox" style="cursor:pointer"><div id="draghead" class="title"><h2 id="dialogBox_title"></h2>';		html += '<span class="close"><a id="dialog_close_btn" href="javascript:Dialog.close()" target="_self">关闭</a></span></div>';		html += '<div class="content" id="dialogBox_content"></div></div>';		dialogBox.innerHTML = html;		document.body.appendChild(dialogBox);		this.dialogBox = document.getElementById("dialogBox");		this.center(); // 设置窗口位置		this.addScrollEvent(Dialog.onBodyScroll);	},	/**	 * 加载CSS	 */	"loadCss" : function(filename) {		var head = document.getElementsByTagName('HEAD').item(0);		var style = document.createElement('link');		style.href = filename;		style.rel = 'stylesheet';		style.type = 'text/css';		head.appendChild(style);	},	/**	 * 加载JS	 * 	 * @param filename	 *            脚本URL	 */	"loadJs" : function(filename, initfunc) {		/**		 * 应该将filename MD5编码后作为ID使用		 */		var script = document.getElementById("js1");		if (script == null) {			script = document.createElement("script");			script.id = "js1";			script.src = filename;			/**			 * 为什么要使用insertAdjacentElement？			 * 因为appendChild在JS文件已经存在浏览器缓存时就会出现IE崩溃的情况(Bbs.editArticle方法就会出现,postArticle则正常)			 */			if (document.frames) {				document.body.insertAdjacentElement("BeforeBegin", script);			} else {				document.body.appendChild(script);			}		}else{			if(initfunc != undefined){				initfunc();			}		}	},	"onBodyScroll" : function() {		var range = Dialog.getRange();		var top = (range.top + Dialog.dialogBox.oy);		var left = (range.left + Dialog.dialogBox.ox);		if (top < 5) {			top = 5;		}		if (left < 5) {			left = 5;		}		Dialog.dialogBox.style.top = top + "px";		Dialog.dialogBox.style.left = left + "px";		if (typeof (Passport) != "undefined" && Passport != null) {			var ds = document.getElementById("passportusernamelist");			if (ds != null && typeof (ds) == "object") {				Passport.resizeFunc();			}		}	},	/**	 * 设置窗口居中显示	 */	"center" : function() {		var range = Dialog.getRange();		var position = this.getPosition();		var left = (range.width - position.width) / 2;		var top = (range.height - position.height) / 2;		this.dialogBox.ox = left;		this.dialogBox.oy = top;		if (range.left > left) {			left = range.left + left;		}		if (range.top > top) {			top = range.top + top;		}		this.dialogBox.style.left = left + "px";		this.dialogBox.style.top = top + "px";	},	/**	 * 设置窗口居中显示	 */	"center_bak" : function() {		var range = Dialog.getRange();		var left = (range.width - this.width) / 2;		var top = (range.height - this.height) / 2;		this.dialogBox.ox = left;		this.dialogBox.oy = top;		if (range.left > left) {			left = range.left + left;		}		if (range.top > top) {			top = range.top + top;		}		this.dialogBox.style.left = left + "px";		this.dialogBox.style.top = top + "px";	},	/**	 * 移动窗口位置	 * 	 * @left	 * @top	 */	"move" : function(left, top) {		this.dialogBox.ox = left;		this.dialogBox.oy = top;		this.dialogBox.style.left = left + "px";		this.dialogBox.style.top = top + "px";	},	/**	 * 判断窗口是否创建过	 */	"isCreated" : function() {		return (this.dialogBox == null);	},	"getPosition" : function() {		if (this.dialogBox == null) {			return {				top : 0,				left : 0,				height : this.height,				width : this.width			};		}		var top = this.dialogBox.offsetTop;		var left = this.dialogBox.offsetLeft;		var width = this.dialogBox.offsetWidth;		var height = this.dialogBox.offsetHeight;		if (height < this.height) {			height = this.height;		}		return {			top : top,			left : left,			height : height,			width : width		};	},	"getRange" : function() {		var top = document.documentElement.scrollTop;		var left = document.documentElement.scrollLeft;		var height = document.documentElement.clientHeight;		var width = document.documentElement.clientWidth;		if (top == 0) {			top = document.body.scrollTop;		}		if (left == 0) {			left = document.body.scrollLeft;		}		if (height == 0) {			height = document.body.clientHeight;		}		if (width == 0) {			width = document.body.clientWidth;		}		return {			top : top,			left : left,			height : height,			width : width		};	},	"addScrollEvent" : function(func) {		var oldonscroll = window.onscroll;		if (typeof window.onscroll != "function") {			window.onscroll = func;		} else {			window.onscroll = function() {				oldonscroll();				func();			}		}	},	"addResizeEvent" : function(func) {		var oldonresize = window.onresize;		if (typeof window.onresize != "function") {			window.onresize = func;		} else {			window.onresize = function() {				oldonresize();				func();			}		}	}}