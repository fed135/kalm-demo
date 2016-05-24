require([
	'Arstider/Browser',
	'Arstider/Engine',
	'Arstider/Viewport',
	'Arstider/Events'
],
function(Browser, Engine, Viewport, Events){

	var globalWrapper = document.getElementById('global-wrapper');

	Viewport.preserveAspect = true;

	window.addEventListener('resize', goFullSize);
	function goFullSize(){
		Viewport.maxWidth=parseInt(window.innerWidth);
		Viewport.maxHeight=parseInt(window.innerHeight);
		Viewport.minWidth=parseInt(window.innerWidth);
		Viewport.minHeight=parseInt(window.innerHeight);
		globalWrapper.style.height=Viewport.maxHeight + 'px';
		globalWrapper.style.width=Viewport.maxWidth + 'px';
	}
	goFullSize();
	
	var rotateImg = document.getElementById('rotate-img');

	if(Browser.isMobile){
		Events.bind('Viewport.resize', function(){
			if(Viewport.orientation == 'landscape') rotateImg.show();
			else if(Viewport.orientation == 'portrait') rotateImg.hide();
		});
	}
	if(Browser.isMobile && Browser.platform != 'ipad'){
		var fillSave = null;
			
		Events.bind('Viewport.resize', function(){
			if(Viewport.orientation == 'landscape'){
				if(fillSave == null) fillSave = Engine.context.fillStyle;
				Viewport.unsupportedOrientation = true;
				Engine.stop();
					
				Viewport.tag.style.width = window.innerWidth + 'px';
				Viewport.tag.style.height = window.innerHeight + 'px';
				Viewport.tag.width = window.innerWidth;
				Viewport.tag.height = window.innerHeight;
							
				Viewport.tag.style.left = '0px';
				Viewport.tag.style.top = '0px';
				Viewport.tag.style.position = 'fixed';
			}
			else if(Viewport.orientation == 'portrait'){				
				if(fillSave!= null) Engine.context.fillStyle = fillSave;
				Viewport.unsupportedOrientation = false;
				Engine.play();
			}
		});
	}

	//Boot up the engine
	Engine.start('canvas', true);

	Viewport._resize();
	//Double-up-animation speed. We don't want this blowing up ;)
	Arstider.setFPS(120);

	Engine.loadScreen({
		name: 'js/canvas',
		noPreloader: true 
	});
});