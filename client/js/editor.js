"use strict";

(function( $ ) {
	$.widget( "my.codeEditor", {
		options: { 
			websocketServer: '',
			width: null,
			height: null
		},
	 
		_create: function() {
			var containerID = this.element[0].id;
			var editor = ace.edit(containerID);
			var socket = new WebSocket(this.options.websocketServer);
			
			editor.setTheme("ace/theme/chrome");
			editor.getSession().setMode("ace/mode/javascript");
			this.element.css( "width", this.options.width);
			this.element.css( "height", this.options.height);
			
			editor.getSession().on('change', function(e) {
				var msgToServer = editor.getSession().getValue();
				if (editor.curOp && editor.curOp.command.name) socket.send(msgToServer);				
				return false;
			});
			socket.onmessage = function(event) {
				var newBody = event.data;
				editBody(newBody);
			};	
			function editBody(aceNewBody) {
				var currentBody = editor.getSession().getValue();
				if (aceNewBody != currentBody) editor.getSession().setValue(aceNewBody); 
			};
		}					
	});
}( jQuery ) ); 