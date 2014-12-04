(function(jq){	var posterTvGrid = function(o, options){		this.parent = jq("#"+ o);		this.body   = jq("body");		if (this.parent.length <= 0) { 			return false;		}		this.options = jq.extend({}, posterTvGrid.options, options);		this.reset();	};	posterTvGrid.prototype = {		reset: function(options){			if(typeof(options) == 'object'){				jq.extend(this.options, options);				}			this.total = $(".bottomNavButtonOFF").length;			this.pageNow = this.options.initPage;			this.preLeft = 0;			this.nextLeft = this.options.width-530;			this.preNLeft = -530;			this.nextNLeft = this.options.width;			this.pageNowLeft = (this.options.width-840)/2;			this.drawContent();		},		drawContent: function(){			this.parent.css({width:this.options.width+"px", height:this.options.height+"px", position: "relative"});			this.content= $("#posterTvGrid");			this.content.cssText = "width:"+this.options.width+"px;height:"+this.options.height+"px;cursor:move;position:absolute;";			this.contentHolder = document.createElement("DIV");			this.contentHolder.style.width = this.options.width + 'px';			this.contentHolder.style.height = this.options.height + 'px';			this.parent.css({overflow:'hidden'});			this.initContent();			this.bind();			this.start();					},				initContent: function(){			contentHolderUnit = this.parent.find(".contentHolderUnit");			contentHolderUnit.css({width:'0px',height:'0px', opacity: 0, left:this.options.width/2+'px', zIndex:0, marginTop: '135px'});			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+")").css({width:'840px',height:'300px', opacity: 1, left: this.pageNowLeft+'px', zIndex: 3, marginTop: 0			});			/*20140307 zlh*/			this.parent.find(".substr").show();			this.parent.siblings().find(".substr").hide();			/*20140307 zlh*/						this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .elementOverlay").css({opacity:0});			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .leftShadow").css({opacity:1});			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .rightShadow").css({opacity:1});						var pre = this.pageNow > 1 ? this.pageNow -1: this.total;			var next = this.pageNow == this.total ? 1 : this.pageNow + 1;			this.parent.find(".contentHolderUnit:nth-child("+pre+")").css({opacity: 1, left: this.preLeft+'px',height: '240px', width: '840px', zIndex: 0, marginTop: '30px'});			this.parent.find(".contentHolderUnit:nth-child("+pre+") .elementOverlay").css({opacity:0.4});			this.parent.find(".contentHolderUnit:nth-child("+pre+") .leftShadow").css({opacity:0});			this.parent.find(".contentHolderUnit:nth-child("+pre+") .rightShadow").css({opacity:0});						this.parent.find(".contentHolderUnit:nth-child("+next+")").css({opacity: 1, left: this.nextLeft+'px',height: '240px', width: '840px', zIndex: 0, marginTop: '30px'});			this.parent.find(".contentHolderUnit:nth-child("+next+") .elementOverlay").css({opacity:0.4});			this.parent.find(".contentHolderUnit:nth-child("+next+") .leftShadow").css({opacity:0});			this.parent.find(".contentHolderUnit:nth-child("+next+") .rightShadow").css({opacity:0});		},		bind: function(){			this.leftNav = $(".leftNav");			this.rightNav = $(".rightNav");			this.bottonNav = $(".bottomNavButtonOFF");			this.lists = $(".contentHolderUnit");			var _this = this;						this.parent.mouseover(function(){				_this.stop();				_this.leftNav.show();				_this.rightNav.show();			});			this.parent.mouseout(function(){				_this.start();				//_this.leftNav.hide();				//_this.rightNav.hide();			});			_this.leftNav.click(function(){				_this.turn("right");					 			});			_this.rightNav.click(function(){				_this.turn("left");					 			});			_this.bottonNav.click(function(){				var ref = parseInt(this.getAttribute("ref"));								if(_this.pageNow == ref) return false;				if(_this.pageNow < ref){					var rightAbs = ref - _this.pageNow;					var leftAbs = _this.pageNow + _this.total - ref;				}else{					var rightAbs = _this.total - _this.pageNow + ref;					var leftAbs = _this.pageNow - ref;				}				if(leftAbs < rightAbs){					 dir = "right";					}else{					 dir = "left";					}				_this.turnpage(ref, dir);				return false;			});						_this.lists.click(function(){  /*20140219修改*/				var ref = parseInt(this.getAttribute("ref"));  //为什么此时的this指向的当前�?�中的那个事�?								if(_this.pageNow == ref) {					return true;				}else{					e.preventDefault();				}				if(_this.pageNow < ref){					var rightAbs = ref - _this.pageNow;					var leftAbs = _this.pageNow + _this.total - ref;				}else{					var rightAbs = _this.total - _this.pageNow + ref;					var leftAbs = _this.pageNow - ref;				}				if(leftAbs < rightAbs){					 dir = "right";					}else{					 dir = "left";					}				_this.turnpage(ref, dir);				});		},		initBottomNav: function(){				this.parent.find(".bottomNavButtonOFF").removeClass("bottomNavButtonON");				this.parent.find(".bottomNavButtonOFF:nth-child("+this.pageNow+")").addClass("bottomNavButtonON");		},		start: function(){			var _this = this;			if(_this.timerId) _this.stop();			_this.timerId = setInterval(function(){				if(_this.options.direct == "left"){					_this.turn("left");					}else{					_this.turn("right");					}			}, _this.options.delay);		},		stop: function(){			clearInterval(this.timerId);		},		turn: function(dir){			var _this = this;						if(dir == "right"){				var page = _this.pageNow -1;				if(page <= 0) page = _this.total;			}else{				var page = _this.pageNow + 1;				if(page > _this.total) page = 1;			}			_this.turnpage(page, dir);					},		turnpage: function(page, dir){			var _this = this;			if(_this.locked) return false;			_this.locked = true;			if(_this.pageNow == page) return false;						var run = function(page, dir, t){				var pre = page > 1 ? page -1: _this.total;				var next = page == _this.total ? 1 : page + 1;				var preP = pre - 1 >= 1 ? pre-1 : _this.total;				var nextN = next + 1 > _this.total ? 1 : next+1;				if(pre != _this.pageNow && next != _this.pageNow){					var nowpre = _this.pageNow > 1 ? _this.pageNow -1: _this.total;					var nownext = _this.pageNow == _this.total ? 1 : _this.pageNow + 1;					_this.parent.find(".contentHolderUnit:nth-child("+nowpre+")").animate({width:'0px',height:'0px', opacity: 0, left:_this.options.width/2+'px', zIndex:0, marginTop: '135px'}, t);					_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").animate({width:'0px',height:'0px', opacity: 0, left:_this.options.width/2+'px', zIndex:0, marginTop: '135px'}, t);					_this.parent.find(".contentHolderUnit:nth-child("+nownext+")").animate({width:'0px',height:'0px', opacity: 0, left:_this.options.width/2+'px', zIndex:0, marginTop: '135px'}, t);														}				/*20140307 zlh*/					_this.parent.find(".substr").hide();					_this.parent.find(".contentHolderUnit:nth-child("+page+")").find(".substr").show();									/*20140307 zlh*/								if(dir == 'left'){										_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").css({zIndex: 0});					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .elementOverlay").css({opacity:0.4});					_this.parent.find(".contentHolderUnit:nth-child("+pre+")").animate({opacity: 1, left: _this.preLeft+'px', height: '240px', width: '530px', zIndex: 2, marginTop: '30px'}, t);					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .leftShadow").css({opacity:0});					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .rightShadow").css({opacity:0});										_this.parent.find(".contentHolderUnit:nth-child("+page+")").css({zIndex: 3});					_this.parent.find(".contentHolderUnit:nth-child("+page+")").animate({opacity: 1, left: _this.pageNowLeft+'px', height: '300px', width: '840px', zIndex: 3, marginTop: '0'}, t);															_this.parent.find(".contentHolderUnit:nth-child("+page+") .elementOverlay").css({opacity:0});					_this.parent.find(".contentHolderUnit:nth-child("+page+") .leftShadow").css({opacity:1});					_this.parent.find(".contentHolderUnit:nth-child("+page+") .rightShadow").css({opacity:1});																														_this.parent.find(".contentHolderUnit:nth-child("+next+")").css({opacity: 0, left: _this.nextNLeft+'px', height: '100px', width: '530px', zIndex: 2, marginTop: '85px'});					_this.parent.find(".contentHolderUnit:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', height: '240px', width:"530px", zIndex: 2, marginTop: '30px'}, t);					_this.parent.find(".contentHolderUnit:nth-child("+next+") .elementOverlay").css({opacity:0.4});					_this.parent.find(".contentHolderUnit:nth-child("+next+") .leftShadow").css({opacity:0});					_this.parent.find(".contentHolderUnit:nth-child("+next+") .rightShadow").css({opacity:0});										_this.parent.find(".contentHolderUnit:nth-child("+preP+")").css({zIndex:0});					_this.parent.find(".contentHolderUnit:nth-child("+preP+")").animate({width:'530px',height:'100px', opacity: 0, left:_this.preNLeft+'px', zIndex:0, marginTop: '85px'},t, "", function(){_this.locked=false;});										}else{					_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").css({zIndex: 0});										_this.parent.find(".contentHolderUnit:nth-child("+next+")").css({zIndex:2});					_this.parent.find(".contentHolderUnit:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', height: '240px', width: '530px', zIndex: 2, marginTop: '30px'}, t);					_this.parent.find(".contentHolderUnit:nth-child("+next+") .elementOverlay").css({opacity:0.4});					_this.parent.find(".contentHolderUnit:nth-child("+next+") .leftShadow").css({opacity:0});					_this.parent.find(".contentHolderUnit:nth-child("+next+") .rightShadow").css({opacity:0});										_this.parent.find(".contentHolderUnit:nth-child("+page+")").css({zIndex: 3}, t);					_this.parent.find(".contentHolderUnit:nth-child("+page+")").animate({opacity: 1, left: _this.pageNowLeft+'px', height: '300px', width: '840px', zIndex: 3, marginTop: '0px'}, t);					_this.parent.find(".contentHolderUnit:nth-child("+page+") .elementOverlay").css({opacity:0});					_this.parent.find(".contentHolderUnit:nth-child("+page+") .leftShadow").css({opacity:1});					_this.parent.find(".contentHolderUnit:nth-child("+page+") .rightShadow").css({opacity:1});										_this.parent.find(".contentHolderUnit:nth-child("+pre+")").css({opacity: 0, left: _this.preNLeft+'px', height: '100px', width: '530px', zIndex: 2, marginTop: '85px'});					_this.parent.find(".contentHolderUnit:nth-child("+pre+")").animate({opacity: 1, left: _this.preLeft+'px', height: '240px', width: '530px', zIndex: 2, marginTop: '30px'}, t);					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .elementOverlay").css({opacity:0.4});					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .leftShadow").css({opacity:0});					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .rightShadow").css({opacity:0});										_this.parent.find(".contentHolderUnit:nth-child("+nextN+")").css({zIndex:0});					_this.parent.find(".contentHolderUnit:nth-child("+nextN+")").animate({width:'530px',height:'100px', opacity: 0, left:_this.nextNLeft+'px', zIndex:0, marginTop: '85px'}, t, "",function(){_this.locked=false;});															}				_this.pageNow = page;				_this.initBottomNav();			};			run(page, dir,_this.options.speed);							}	};	posterTvGrid.options = {		offsetPages : 3,//默认可视�?大条�?		direct : "left",//滚动的方�?		initPage : 2,//默认当前显示第几�?		autoWidth : true,//默认不用设置�?		width : 980,//�?外层宽，�?要使用的时�?�在�?,默认由程序自动判�?		height : 300,//�?外层�?  		delay : 4000,//滚动间隔（毫秒） /*此处表示的图片的自动滚动的延时时�?*/		speed : 500 //滚动速度毫秒	};	window.posterTvGrid = posterTvGrid;})($);