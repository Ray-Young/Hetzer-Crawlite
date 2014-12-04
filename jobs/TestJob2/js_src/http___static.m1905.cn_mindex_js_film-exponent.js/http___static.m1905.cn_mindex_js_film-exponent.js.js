(function () {    function setElementPos(element, index, leftW) {        var iNow = index % 4;        switch (iNow) {        case 1:            element.style.left = 0;            break;        case 2:            element.style.left = leftW * 1 + 'px';            break;        case 3:            element.style.left = leftW * 2 + 'px';            break;        case 0:            element.style.left = leftW * 3 + 'px';            break;        }        if (index < 5) {            element.style.top = 0;        } else {            element.style.top = element.parentNode.children[index - 5].offsetTop + element.parentNode.children[index -                4].offsetHeight + 15 + 'px'; //aLi[index-4].offsetTop + aLi[index-4].offsetHeight + 15 + "px";        }    }    /*     * Dime     * Date: 2013-04-15     * 使用Dime用来实现列表项每个影片鼠标划过所要执行的操作,其中调用了外部函数setElementPos来实影片的init分布位置�?     */    $.fn.DimeItem = function (options) {        var defaults = {            Box: '#filmlist-box',            BoxLi: '.film-item',            HideV: '.b-top',            LiHover: '.list-dime li',            LiCss: 'bg-c',            Cwhite: '.film-name a',            leftW: '249'        }        var options = $.extend(defaults, options);        var Hnum = Math.ceil(($(options.Box).children(options.BoxLi).length) / 4);        $(options.Box).height(Hnum * 370 + 35);        this.each(function (i, el) {            var filmItem = $(el);            ++i;            setElementPos(el, i, options.leftW);            if (i % 4 == 0) {                $(filmItem).addClass("mr00");            }            $(filmItem).mouseover(function () {                $(filmItem).addClass("fitem-hover").find(options.Cwhite).addClass("c-white");                $(filmItem).find(options.HideV).show();                $(filmItem).find(options.LiHover).each(function (j, el1) {                    $(el1).mouseover(function () {                        $(this).addClass(options.LiCss);                    }).mouseout(function () {                        $(this).removeClass(options.LiCss);                    });                });            }).mouseout(function () {                $(filmItem).removeClass("fitem-hover").find(options.Cwhite).removeClass("c-white");                $(filmItem).find(options.HideV).hide();            });        });     };   })(jQuery);/* * backToTop * Date: 2013-05-07 * 获取影片底层页提名和获奖的个�? */function gettingDate(element) {	if(element==undefined ){		return false;	}else{	  if (element.count > 0) {		  var anum = 0,			  bnum = 0;		  $(element.data).each(function (i, el) {			  if (el.first == 2) {				  anum++;			  } else {				  bnum++;			  }		  });		  var arrayA = [],			  arrayB = [],			  arrayC = [];		  if (anum > 0) {			  var $oli1 = '<li class="awards-title">获奖</li>';			  arrayA[0] = $oli1;		  }		  if (bnum > 0) {			  var $oli2 = '<li class="awards-title1">提名</li>';			  arrayB[0] = $oli2;		  }		  if (((anum + bnum) > 3 && anum != 0 && bnum != 0) || anum >= 5 || bnum >= 5) {			  if (element == seekData.award[0]) {				  $('.pre-next-btn').eq(0).show();				  $('.pre-next-none').eq(0).hide();			  } else {				  $('.pre-next-btn').eq(1).show();				  $('.pre-next-none').eq(0).hide();			  }		  }		  if ((anum == 1 && bnum == 0) || (anum == 0 && bnum == 1)) {			  var num2 = 0,				  num1 = 0,				  imgSrc=0;			  $(element.data).each(function (i, el) {				  if (el.first == 2) {   					   if(el.festivalid==3){						  imgSrc=1;					  }else if(el.festivalid==91){						  imgSrc=2;					  }else if(el.festivalid==147){						  imgSrc=3;					  }else if(el.festivalid==681){						  imgSrc=4;					  }else{						  imgSrc=0;					  }					  $(el.festival.award).each(function (j, el1) {						  $oli1 =							  '<li class="won-awards "><img src="http://testwww.m1905.com/static/mindex/img/trophy00'+imgSrc+'.png" alt=""/><div class="awards-txt "><a class="awards-theme" title="' +							  el.festival.title + '">' + el.festival.title + '</a><a title="' + el1.title + '">' + el1.title +							  '</a></div></li><li class="won-awards "></li><li class="won-awards "></li><li class="won-awards "></li><li></li><li></li><li></li>';						  ++num2;						  arrayA[num2] = $oli1;					  });					  				  } else {					  $(el.festival.award).each(function (j, el1) {						  $oli2 =							  '<li class="nominate"><p title="'+el.year+'�?' + el.festival.title + '' + el1.title + '">'+el.year+'�?' + el.festival.title + '' + el1.title + '</p></li><li></li><li></li><li></li>';						  ++num1;						  arrayB[num1] = $oli2;					  });				  }			  });		  } else {			  var num2 = 0;			  num1 = 0,			  imgSrc=0;			  $(element.data).each(function (i, el) {				  if (el.first == 2) {					   if(el.festivalid==3){						  imgSrc=1;					  }else if(el.festivalid==91){						  imgSrc=2;					  }else if(el.festivalid==147){						  imgSrc=3;					  }else if(el.festivalid==681){						  imgSrc=4;					  }else{						  imgSrc=0;					  }					  $(el.festival.award).each(function (j, el1) {						  $oli1 =							  '<li class="won-awards"><img img src="http://testwww.m1905.com/static/mindex/img/trophy00'+imgSrc+'.png" alt=""/><div class="awards-txt"><a class="awards-theme" title="' +							  el.festival.title + '">' + el.festival.title + '</a><a title="' + el1.title + '">' + el1.title +							  '</a></div></li>';						  ++num2;						  arrayA[num2] = $oli1;					  });				  } else {					  $(el.festival.award).each(function (j, el1) {						  $oli2 = '<li class="nominate"><p title="'+el.year+'�?' + el.festival.title + '' + el1.title + '">'+el.year+'�?' + el.festival.title + '' + el1.title + '</p></li>';						  ++num1;						  arrayB[num1] = $oli2;					  });				  }			  });		  }		  for (var i = 0; i < arrayA.length; i++) {			  arrayC.push(arrayA[i]);		  }		  for (var i = 0; i < arrayB.length; i++) {   			  arrayC.push(arrayB[i]);		  }		  var arrayCLen = arrayC.length,			  fOutNum = Math.ceil(arrayCLen / 5)			  var FoutDiv = '';		  for (i = 0; i < fOutNum; i++) {			  FoutDiv += '<ul class="f_out" ></ul>'		  }		  if (element == seekData.award[0]) {			  $(".awards-area").eq(0).append(FoutDiv);		  } else {			  $(".awards-area").eq(1).append(FoutDiv);		  }		  var strsub = 0;		  if (element == seekData.award[0]) {			  $(".awards-area").eq(0).find('.f_out').each(function (i, el) {				  var Foutvalue = '';				  for (var z = i * 5; z < (i * 5 + 5) && z < arrayCLen; z++) {					  Foutvalue += arrayC[z];   				  }				  $(el).append(Foutvalue);			  });		  } else {			  $(".awards-area").eq(1).find('.f_out').each(function (i, el) {				  var Foutvalue = '';				  for (var z = i * 5; z < (i * 5 + 5) && z < arrayCLen; z++) {					  Foutvalue += arrayC[z];   				  }				  $(el).append(Foutvalue);			  });		  }  	  }	  $(".awards-wrapper").FeatureList();  }}      $(document).on('mouseover', '.att-list', function () {	  $(this).addClass('bbnone').children('.att-list-inf').slideDown(0);	  if ($(this).children('.att-list-inf').length == 1) {		  $(this).height(145).siblings('.att-list').height(35).removeClass('bbnone').children('.att-list-inf').slideUp(0);		  $(this).siblings('.att-title').height(39);	  }	}) 	//首页问号说明	.on('mouseover', '.descr-btn', function(){	   $(this).siblings('.descr-txtcon').slideDown(200);	})	.on('mouseout', '.descr-btn', function(){	   $(this).siblings('.descr-txtcon').slideUp(100);	})	//影片底层页及其pk页鼠标滑过遮罩播�?   .on('mouseover', '.cplay-film', function(){	   $(this).children('.film-overlay').slideDown(0).siblings('.film-play').show();   })   .on('mouseout', '.cplay-film', function(){	   $(this).children('.film-overlay').slideUp(0).siblings('.film-play').hide();   })   //pk页的相关视频的切�?   .on('mouseover', '[data-tabf]', function(){	   $(this).addClass('active').siblings('[data-tabf]').removeClass('active');	   var $chart = $('#chart_bubble');		  var type = $(this).data('type') ;		  type = type.length ? type : $chart.data('chart-type');		  var startDate = $(this).data('chart') || $chart.data('chart-date');		  var content = $(this).data('content');		  var data = {};		  $chart.data({			  'chart-type': type,			  'chart-date': startDate		  });		  data.type = type;		  data.data = film_chart_bubble_data[content];			 $chart.trigger('change.chart', [data.type, data.data])		  return false;	      })   //pk页的趋势切换  .on('mouseenter','[data-event]',function(e) {	  var $this=$(this);	   if(!$this.parent('li').hasClass('active')){		   var selector=$this.attr('data-href'),$tabCont=$('.tab-cont');			if (selector) {			  selector = $this.attr('data-href')			  selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7			}			$this.parent('li').addClass('active').siblings('li').removeClass('active');			$(selector).addClass('active').siblings($tabCont).removeClass('active');			if($(selector).find('.trends-tab').find('.chart-table').hasClass('active')){			    $('.chart-area').show();				$(selector).find('.exp-term-tab').find('a').eq(0).trigger('click');			 }else{				 $('.chart-area').hide();			 } 	   }	   return false;  })   .on('mouseover', '[data-hov]', function(){	   var dataH=$(this).attr('data-hov');	   if(dataH=='tab-rqs'){		   $('.chart-area').hide();	   }else{		   $('.chart-area').show();	   }  });$(function(){	   //指数top1 显示    var attListInf = $('.att-list-inf');    $(attListInf).each(function (j, el1) {        ++j;        if (j % 10 == 1) {            $(el1).show().parent('.att-list').height(145).addClass('bbnone');        }    })}) 