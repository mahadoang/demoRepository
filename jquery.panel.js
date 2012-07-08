function Delegate(){}Delegate.create=function(o,f){var a=new Array();var l=arguments.length;for(var i=2;i<l;i++)a[i-2]=arguments[i];return function(){var aP=[].concat(arguments,a);f.apply(o,aP)}};Tween=function(obj,prop,func,begin,finish,duration,suffixe){this.init(obj,prop,func,begin,finish,duration,suffixe)};var t=Tween.prototype;t.obj=new Object();t.prop='';t.func=function(t,b,c,d){return c*t/d+b};t.begin=0;t.change=0;t.prevTime=0;t.prevPos=0;t.looping=false;t._duration=0;t._time=0;t._pos=0;t._position=0;t._startTime=0;t._finish=0;t.name='';t.suffixe='';t._listeners=new Array();t.setTime=function(t){this.prevTime=this._time;if(t>this.getDuration()){if(this.looping){this.rewind(t-this._duration);this.update();this.broadcastMessage('onMotionLooped',{target:this,type:'onMotionLooped'})}else{this._time=this._duration;this.update();this.stop();this.broadcastMessage('onMotionFinished',{target:this,type:'onMotionFinished'})}}else if(t<0){this.rewind();this.update()}else{this._time=t;this.update()}};t.getTime=function(){return this._time};t.setDuration=function(d){this._duration=(d==null||d<=0)?100000:d};t.getDuration=function(){return this._duration};t.setPosition=function(p){this.prevPos=this._pos;var a=this.suffixe!=''?this.suffixe:'';this.obj[this.prop]=Math.round(p)+a;this._pos=p;this.broadcastMessage('onMotionChanged',{target:this,type:'onMotionChanged'})};t.getPosition=function(t){if(t==undefined)t=this._time;return this.func(t,this.begin,this.change,this._duration)};t.setFinish=function(f){this.change=f-this.begin};t.getFinish=function(){return this.begin+this.change};t.init=function(obj,prop,func,begin,finish,duration,suffixe){if(!arguments.length)return;this._listeners=new Array();this.addListener(this);if(suffixe)this.suffixe=suffixe;this.obj=obj;this.prop=prop;this.begin=begin;this._pos=begin;this.setDuration(duration);if(func!=null&&func!=''){this.func=func}this.setFinish(finish)};t.start=function(){this.rewind();this.startEnterFrame();this.broadcastMessage('onMotionStarted',{target:this,type:'onMotionStarted'})};t.rewind=function(t){this.stop();this._time=(t==undefined)?0:t;this.fixTime();this.update()};t.fforward=function(){this._time=this._duration;this.fixTime();this.update()};t.update=function(){this.setPosition(this.getPosition(this._time))};t.startEnterFrame=function(){this.stopEnterFrame();this.isPlaying=true;this.onEnterFrame()};t.onEnterFrame=function(){if(this.isPlaying){this.nextFrame();setTimeout(Delegate.create(this,this.onEnterFrame),0)}};t.nextFrame=function(){this.setTime((this.getTimer()-this._startTime)/1000)};t.stop=function(){this.stopEnterFrame();this.broadcastMessage('onMotionStopped',{target:this,type:'onMotionStopped'})};t.stopEnterFrame=function(){this.isPlaying=false};t.continueTo=function(finish,duration){this.begin=this._pos;this.setFinish(finish);if(this._duration!=undefined)this.setDuration(duration);this.start()};t.resume=function(){this.fixTime();this.startEnterFrame();this.broadcastMessage('onMotionResumed',{target:this,type:'onMotionResumed'})};t.yoyo=function(){this.continueTo(this.begin,this._time)};t.addListener=function(o){this.removeListener(o);return this._listeners.push(o)};t.removeListener=function(o){var a=this._listeners;var i=a.length;while(i--){if(a[i]==o){a.splice(i,1);return true}}return false};t.broadcastMessage=function(){var arr=new Array();for(var i=0;i<arguments.length;i++){arr.push(arguments[i])}var e=arr.shift();var a=this._listeners;var l=a.length;for(var i=0;i<l;i++){if(a[i][e])a[i][e].apply(a[i],arr)}};t.fixTime=function(){this._startTime=this.getTimer()-this._time*1000};t.getTimer=function(){return new Date().getTime()-this._time};Tween.backEaseIn=function(t,b,c,d,a,p){if(s==undefined)var s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b};Tween.backEaseOut=function(t,b,c,d,a,p){if(s==undefined)var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b};Tween.backEaseInOut=function(t,b,c,d,a,p){if(s==undefined)var s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b};Tween.elasticEaseIn=function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(!a||a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b};Tween.elasticEaseOut=function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(!a||a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)};Tween.elasticEaseInOut=function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)var p=d*(.3*1.5);if(!a||a<Math.abs(c)){var a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b};Tween.bounceEaseOut=function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}};Tween.bounceEaseIn=function(t,b,c,d){return c-Tween.bounceEaseOut(d-t,0,c,d)+b};Tween.bounceEaseInOut=function(t,b,c,d){if(t<d/2)return Tween.bounceEaseIn(t*2,0,c,d)*.5+b;else return Tween.bounceEaseOut(t*2-d,0,c,d)*.5+c*.5+b};Tween.strongEaseInOut=function(t,b,c,d){return c*(t/=d)*t*t*t*t+b};Tween.regularEaseIn=function(t,b,c,d){return c*(t/=d)*t+b};Tween.regularEaseOut=function(t,b,c,d){return-c*(t/=d)*(t-2)+b};Tween.regularEaseInOut=function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b};Tween.strongEaseIn=function(t,b,c,d){return c*(t/=d)*t*t*t*t+b};Tween.strongEaseOut=function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b};Tween.strongEaseInOut=function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b};
(function($,document,window){
	var 
	defaults = {
		height:105,
		width:350,
		type:'iframe',  /*message,iframe,inner,html*/
		content:'',
		scroll:'no',
		icon:'',
		title:'', 
		move_hide:true,
		x:0,
		y:0,
		url:'',
		innerid:'',
		overlay_color:'#fff',
		model:true,
		close:true,
		on_confirm_y:null,
		on_confirm_n:null,
		on_confirm_o:null,
		on_confirm_c:null,
		params:null,
		self:null,
		header:true,
		init_call_func:null,
		init_param:null,
		mtype:'1', /* 1 alert  2 confirm  */
		id:(new Date()).getTime()
	},
	conteners = [],
	perfix_panel 	= 'mahadoang-panel-',
	perfix_overlay 	= 'mahadoang-overlay-',
	perfix_contener = 'mahadoang-contener-',
	id_panel,
	id_overlay,
	id_contener,
	area_width = $(window).width(),
	area_height= $(window).height(),
	settings,
	api,
	class_active;
	
	api = $.fn['panel'] = $['panel'] = function (options) {
		options 		= options || {};
		if(options.id==undefined || options.id==null || options.id==''){
			options.id = (new Date()).getTime();
		}
		
		class_active = options.id;		
		settings 	= $.extend({},defaults,options);
		id_panel 	= perfix_panel+options.id;
		id_overlay	= perfix_overlay+options.id;
		id_contener = perfix_contener+options.id;
		api.add_contener();
		api.create();
		return this;
	};
	api.create = function()
	{
		if(settings.id !=undefined && $('#'+id_panel).size() > 0){
			api.set_center(settings.id);
			return false;
		}
		if(settings.model){
			api.overlay();
		}
		$(document.body).append(
			$panel = $('<div/>')
				.attr('id',id_panel)
				.attr('style','background-color:none;position:absolute !important;display:none;width:'+settings.width+'px;')
				.addClass('window-panal')
				.css("top", (-settings.height)+ "px")
				.css("left",(($(window).width() - settings.width) / 2) + "px")
				.append(
					$panel_header = $('<div/>')
						.addClass('window-header')
						.append(
							$panel_header_icon = (settings.icon!='') ? 
								$('<div/>')
									.addClass('window-icon')
									.attr('style','background:url('+settings.icon+')'):''
							,
							$panel_header_title = $("<div/>")
								.addClass('window-title')
								.append(
									$panel_header_title_text = $("<strong/>")
										.css("font-weight","bold")
										.html(settings.title)
								)
							,
							$close_button = (settings.close) ? $("<a/>")
								.addClass('close-window'):''
						)
					,
					$panel_contener = $('<div/>')
						.attr('id',id_contener)
						.attr('style','margin:0;padding:0;clear:both;width: 100%;')
						.addClass('background_window')
				)
		);
		if(settings.close){
			$panel_header_title.css({width:(settings.width-25),height:21,overflow:'hidden'});
		}else{
			$panel_header_title.css({width:(settings.width-5),height:21,overflow:'hidden'});
		}
		if(settings.type=='message')
		{				
			if(settings.mtype==1){
				$control_msg = "<div style='clear:both;height:13px;'></div><input type='button' class='message-button-ok'/>";
			}else{
				$control_msg="<div style='clear:both;height:13px;'></div><input type='button' class='message-button-yes'/><input type='button' class='message-button-no'/>";
			}
			$panel_contener.append(
				$content_msg = $('<p/>')
					.attr('style','width:'+(settings.width-20)+'px; visibility: visible;clear:both;margin:0;padding:10px;padding-top:15px;text-align:center;background:#fff;')
					.html(settings.content)
					.append($control_msg)
			);			
			$(".message-button-ok,.message-button-yes,.message-button-no",$content_msg).click(function(){
				$my_setting = api.get_setting($(this));
				if($my_setting.tween!=undefined) $my_setting.tween.stop();
				$my = $(this).attr('class');
				if($my=='message-button-ok'){
					call_back = $my_setting.on_confirm_o;
				} else if($my=='message-button-yes'){
					call_back = $my_setting.on_confirm_y;
				}else if($my=='message-button-no'){
					call_back = $my_setting.on_confirm_n;
				}				
				if(call_back!=null) 
				{
					if($my_setting.self!=undefined && $my_setting.self !=null){
						$my_setting.self[call_back]($my_setting.params);
					}else{ 
						window[call_back]($my_setting.params);
					}
				}
				api.close($my_setting.id);
			});
			api.set_uniqid([$(".message-button-ok",$content_msg)
				,$(".message-button-yes",$content_msg)
				,$(".message-button-no",$content_msg)
			]);
			$panel.draggable({ containment:'document',handle:'.window-header',start:function(){if(settings.tween!=undefined) settings.tween.stop();}});
		}
		else
		{			
			if(settings.type=='iframe'){
				$panel.draggable({
					zIndex: api.zindex(),
					scroll:false,
					handle:'.window-header',
					start:function(){
						var id = $(this).attr('uniqid');
						var myst = api.get_setting(this);
						if(myst.tween!=undefined) 
						myst.tween.stop(); 
						if(myst.move_hide){
							$("#"+perfix_contener+id).children().hide();
						}				
					},
					stop:function(){
						var id = $(this).attr('uniqid');
						$("#"+perfix_contener+id).children().show();
					}
				});
				$panel_contener.append(
					$iframe = $('<iframe/>')
						.attr('scrolling',settings.scroll)
						.attr('frameborder','0')
						.attr('allowTransparency','1')
						.attr('src',settings.url)
						.attr('marginwidth','0')
						.attr('align','top')
						.attr('marginheight','0')
						.attr('style','height:'+(settings.height-19)+'px; width: 100%; visibility: visible;clear:both;')
				);
				$panel_contener.css('height',(settings.height-19)+'px');
			}else if(settings.type=='inner'){
				$panel_contener.append(
					$inner = $('<div/>')
						.css('padding','10px')
						.append($(settings.innerid).html())
				);
				$panel.draggable({
					zIndex: api.zindex(),
					scroll:false,
					handle:'.window-header',
					start:function(){
						var myst = api.get_setting(this);
						if(myst.tween!=undefined) 
						myst.tween.stop(); 
					}
				});
			}else if(settings.type=='html'){
				$panel_contener.append(
					$inner = $('<div/>')
						.css('padding','10px')
						.append(settings.content)
				);
				$panel.draggable({					
					scroll:false,
					handle:'.window-header',
					start:function(){
						var myst = api.get_setting(this);
						if(myst.tween!=undefined) 
						myst.tween.stop(); 
					}
				});
			}else{
				
			}
		}
		if(!settings.header){
			$panel_header.hide();
		}
		if($close_button!='' && $close_button.size() > 0){
			$close_button.click(function(){
				api.close($(this).attr('uniqid'));
			});		
		}
		api.set_uniqid([$panel,$close_button]);
		$panel.get(0).onmousedown = function(){
			var maxZ = Math.max.apply(null,$.map($('body > div'), function(e,n){
	           if($(e).css('position')=='absolute')
	                return parseInt($(e).css('z-index'))||1 ;
	           })
			);
			$(this).css('z-index',(maxZ+1));
		};
		api.set_position(settings.id,settings.x,settings.y,0.5);
	};
	api.overlay = function()
	{
		$(document.body).append(
			$('<div/>')
			.attr('id',id_overlay)
			.attr('style','opacity:0.9;filter:alpha(opacity=90);background:'+settings.overlay_color+';position:absolute;left:0;top:0;width:'+area_width+'px;height:'+area_height+'px;z-index:'+api.zindex())
		);
	};
	api.zindex = function()
	{
		var maxZ = Math.max.apply(null,$.map($('body  div'), function(e,n){
           if($(e).css('position')=='absolute') 		
                return parseInt($(e).css('z-index'))|| 1 ;
           })
          
		);
		return (maxZ > 1000) ? maxZ+1:maxZ+1000;
	};
	api.set_position = function(id,x,y)
	{
		$el = $('#'+perfix_panel+id);
		console.log($el);
		var top 	= (y > 0) ? y:(($(window).height() - $el.height()) / 2) + $(window).scrollTop();
		var left 	= (x > 0) ? x:(($(window).width() - $el.width()) / 2) + $(window).scrollLeft();
		$el.css('z-index',api.zindex()).show();	
		var ole_opsition = $el.offset(); 
		var t1 = new Tween($el.get(0).style,'top',Tween.bounceEaseOut,ole_opsition.top,top,0.5,'px');
		var t2 = new Tween($el.get(0).style,'left',Tween.bounceEaseOut,ole_opsition.left,left,0.5,'px');
		t1.start();
		t2.start();	
	};
	api.set_center = function(id)
	{
		$el = $('#'+perfix_panel+id);
		var top = 20;
		var ole_opsition = $el.offset(); 
		var left = (($(window).width() - $el.width()) / 2) + $(window).scrollLeft();
		$el.css('z-index',(api.zindex()+1)).show();
		var t1 = new Tween($el.get(0).style,'top',Tween.bounceEaseOut,ole_opsition.top,top,0.5,'px');
		var t2 = new Tween($el.get(0).style,'left',Tween.bounceEaseOut,ole_opsition.left,left,0.5,'px');
		t1.start();
		t2.start();
	};
	api.close = function(id){
		var el= $('#'+perfix_panel+id).get(0);
		var t1 = new Tween(el.style,'top',Tween.regularEaseOut,$(el).position().top,-$(el).height(),.5,'px');
		t1.start();
		$('#'+perfix_overlay+id).fadeOut(1000);
		t1.onMotionFinished = function()
		{	
			$('#'+perfix_panel+id).remove();
			$('#'+perfix_overlay+id).remove();
			delete t1;
		}
		conteners[id] = null;
		delete conteners[id];
	};
	api.add_contener = function()
	{
		conteners[class_active] = settings;
	};
	api.get_setting = function(el)
	{
		$key = $(el).attr('uniqid');
		if($key!=undefined && $key !=null){
			return (conteners[$key]!=undefined && conteners[$key]!=null) ?conteners[$key]:null;
		}
		return null;
	};
	api.get_uniqid = function(el)
	{
		return $(el).attr('uniqid');
	}
	api.set_uniqid = function(el)
	{
		if(el.sort()){
			$.each(el,function(i,e){
				$(e).attr('uniqid',class_active);
			});
		}else{
			el.attr('uniqid',class_active);
		}
	}
})(jQuery,document,this);
