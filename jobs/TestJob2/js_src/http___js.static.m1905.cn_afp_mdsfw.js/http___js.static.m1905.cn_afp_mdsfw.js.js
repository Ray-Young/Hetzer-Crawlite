(function(e,o){if(e!=0){var e=e||"90629",o=o||10,t="http://www.m1905.com/coll/adfwproxy.html?aid=";var i={90621:["90621","94039","94177"],90637:["90637","94041","94179"],90627:["90627","94043","94181"],92561:["92561"],90625:["90625","94045","94183"],90633:["90633","94047","94185"],90623:["90623","93971","93973","94193"],90629:["90629","94051","94187"],90631:["90631","94053","94189"],90635:["90635","94055","94191"],94331:["94331"],95739:["95739","95761","95763"]};var n=function(e,o,t,i){var n=function(){var o=document.createElement("iframe");o.id=e;o.name=e;o.width=t;o.height=i||0;o.scrolling="no";o.transparency="true";o.frameBorder="no";o.style.border="none";return o}();n.src=o;return n};var r=function(){if($.browser.msie&&$.browser.version=="6.0"&&!$.support.style){$("html").css({"background-image":"url(about:blank)","background-attachment":"fixed"})}var r=0,d=0,a=e;if(i[e]){d=i[e].length-1;a=i[e][r]}var c=$('<div id="adjs_adfw_'+a+'"  style="overflow: hidden; display: inline-block; position: fixed; bottom: 0px; right: 3px; z-index: 99999;background-color:transparent;width:300px;text-align:right;_position:absolute;_bottom:auto;"></div>');var l=$('<div style="float:right;width: 61px; height: 20px; top: 0px; right:0px; margin: 0px 0px 5px; padding: 0px; cursor: pointer; overflow: hidden;"><div style="width: 40px; height: 20px; background-color: rgb(153, 153, 153); color: rgb(255, 255, 255); float: left; margin-right: 1px; font-size: 12px; font-family: 微软雅黑; text-align: center; line-height: 20px;">关闭</div><a style="padding: 0px; display: inline-block; border: medium none; overflow: hidden; height: 20px; line-height: 20px; cursor: pointer; width: 20px; background: url(&quot;http://afp.m1905.com/mediafiles/creative/close.png&quot;) no-repeat scroll 0px 0px transparent; margin-bottom: 3px; float: left;"></a></div></div>');$(l).hover(function(){$(this).find("div").css("background-color","rgb(0, 102, 204)");$(this).find("a").css("backgroundImage","url(http://afp.m1905.com/mediafiles/creative/mouseover_close.png)")},function(){$(this).find("div").css("background-color","rgb(153, 153, 153)");$(this).find("a").css("backgroundImage","url(http://afp.m1905.com/mediafiles/creative/close.png)")});var s=n("m1905_fw_"+a,t+a,300,250);setTimeout(function(){c.appendTo($("body"));$(s).appendTo(c);$(s).one("load",function(){setTimeout(function(){$(l).prependTo(c);l.on("click",function(){$(c).hide()})},2e3);setTimeout(function(){$(c).is(":hidden")||$(c).hide()},35e3)})},500);if(d>0){var p=setInterval(function(){r++;if(r==d)clearInterval(p);var o=t+i[e][r];s.src=o;$(s).one("load",function(){$(c).show();setTimeout(function(){$(c).is(":hidden")||$(c).hide()},35e3)})},o==10?1e3*400:1e3*50)}function u(){var e=document.documentElement.clientHeight,o=document.documentElement.scrollTop||document.body.scrollTop,t=275,i=e+o-t;c.css("top",i+"px")}if(!window.XMLHttpRequest){u();$(window).unbind("scroll",null,u).bind("scroll",null,u)}};var d=window.mBuffer||window.jQuery;d(function(){!/bdyybfq/.test(location.search)&&window._acK&&r()})}})(adfwid,randtimes);