function AddCookie(name,value){	var cookie_domain = '.m1905.com';	var cookie_path = '/';	var expire = new Date();	expire.setTime(expire.getTime() + 3600000*24);     document.cookie= name+"=" + escape(value)+ ("; path=" + cookie_path) + ((cookie_domain == '') ? "" : ("; domain=" + cookie_domain)) + ";expires="+expire.toGMTString();}function DelCookie(name){    var expires = new Date();    expires.setTime(expires.getTime()-1);    document.cookie= name+"=;expires=" + expires.toGMTString();}function GetCookie(name){    var cookieString = document.cookie;    var start = cookieString.indexOf(name + '=');    if (start == -1)    return null;    start += name.length + 1;    var end = cookieString.indexOf(';', start);    if (end == -1) return unescape(cookieString.substring(start));    return unescape(cookieString.substring(start, end));}function resizewd(idiv){    idiv.style.height = document.body.clientHeight;    document.body.style.overflow = "hidden";}function createIframe() {	document.domain = 'm1905.com';    var box = document.createElement("div");    box.id = "div-ad-iframe";    document.body.appendChild(box);    var i = document.createElement("iframe");    i.src = "http://home.m1905.com/space.php?do=ding&__tc=ding";    i.scrolling = "no";    i.frameBorder = '0';    i.width = "100%";    i.allowTransparency = "true";    i.name = "iframepage";    i.id = "iframepage";    //i.onLoad="iFrameHeight();alert(aa)"    i.style.background="transparent";    i.style.position = "fixed";    i.style.top = "0";    i.style.zIndex = "888";    i.style.display ="none";    //i.style.height = document.body.scrollHeight;    document.getElementById("div-ad-iframe").appendChild(i);    setTimeout(function(){        var i = document.getElementById("iframepage");        i.height = document.documentElement.clientHeight || document.body.clientHeight;        i.style.display = "block";        //document.body.style.height = document.documentElement.clientHeight || document.body.clientHeight;        //document.body.style.overflowY = "hidden";    },300)   // iFrameHeight();};function StartWindow() {  var uid =  GetCookie("WOlTvIlgRpuid");  if(uid>0){    var url = "http://d.m1905.com/index.php?app=api&mod=Ucinvite&act=isokUserRegi&callback=?";  	jQuery.getJSON(url,{uid:uid,wwwapi:1}, function(data){  	  if(!data){        var cookie_key = uid+'_window';	    var windowstate = GetCookie(cookie_key);	    var timestamp = (new Date()).valueOf();	    var timelock = timestamp - windowstate-(24*3600000);	    if(windowstate=='' || timelock>0){          AddCookie(cookie_key,timestamp); 	      createIframe();	    }	  }	}); 	  } else {    var cookie_key = 'm1905_dingding';    var windowstate = GetCookie(cookie_key);    var timestamp = (new Date()).valueOf();    var timelock = timestamp - windowstate-(24*3600000);    if(windowstate=='' || timelock>0) {      AddCookie(cookie_key,timestamp);      createIframe();    }   }}//调用弹窗方法//StartWindow();