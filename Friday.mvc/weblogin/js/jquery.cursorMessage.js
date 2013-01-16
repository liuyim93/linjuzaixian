// jQuery鼠标位置消息提示插件
//
// Version 0.1
//
// Tim de Koning
// Kingsquare Information Services (http://www.kingsquare.nl/)
//
// Visit http://www.kingsquare.nl/cursorMessage for usage and more information
//
// Terms of Use
//
// This file is released under the GPL, any version you like
// 使用方法:
// $.cursorMessage("提示的消息字符串",{offsetX: 5,offsetY:5,hideTimeout:1500});
// offsetX 离鼠标的X位置间隔      单位象素 默认 5
// offsetY 离鼠标的Y位置间隔      单位象素 默认 5
// hideTimeout 提示文字的消失时间 单位毫秒 默认 1000
// {offsetX: 5,offsetY:5,hideTimeout:1500} 为可选项
if(jQuery) {
	( function($) {
	$.cursorMessageData = {}; 

	$(window).ready(function(e) {
		if ($('#cursorMessageDiv').length==0) {
			  $('body').append('<div id="cursorMessageDiv">&nbsp;</div>');	
			  $('#cursorMessageDiv').hide();
		}

		$('body').mousemove(function(e) {
			$.cursorMessageData.mouseX = e.pageX;
			$.cursorMessageData.mouseY = e.pageY;
			if ($.cursorMessageData.options != undefined) $._showCursorMessage();
		});
	});	
	$.extend({
		cursorMessage: function(message, options) {
			if( options == undefined ) options = {};
			if( options.offsetX == undefined ) options.offsetX = 5;
			if( options.offsetY == undefined ) options.offsetY = 5;
			if( options.hideTimeout == undefined ) options.hideTimeout = 1000;
			
			var hideCursorMessage = function() {
				$('#cursorMessageDiv').html(message).fadeOut('slow');
			};
			
			$('#cursorMessageDiv').html(message).fadeIn('slow');
			if (jQuery.cursorMessageData.hideTimoutId != undefined)  clearTimeout(jQuery.cursorMessageData.hideTimoutId);
			jQuery.cursorMessageData.hideTimoutId = setTimeout(hideCursorMessage,options.hideTimeout);
			jQuery.cursorMessageData.options = options;
			$._showCursorMessage();
		},
		
		_showCursorMessage: function() {
			$('#cursorMessageDiv').css({ top: ($.cursorMessageData.mouseY + $.cursorMessageData.options.offsetY)+'px', left: ($.cursorMessageData.mouseX + $.cursorMessageData.options.offsetX) })
		}
	});
})(jQuery);
}
//加载js的时候输出样式
document.write("<style type='text//css'>");  
document.write("#cursorMessageDiv {");  
document.write("BORDER-RIGHT: #ccc 1px solid; PADDING-RIGHT: 2px; BORDER-TOP: #ccc 1px solid; DISPLAY: none; PADDING-LEFT: 2px; FONT-SIZE: 12px; Z-INDEX: 99999; BACKGROUND: #eee; PADDING-BOTTOM: 2px; MARGIN: 0px; BORDER-LEFT: #ccc 1px solid; PADDING-TOP: 2px; BORDER-BOTTOM: #ccc 1px solid; POSITION: absolute");  
document.write("}</style> ");
    