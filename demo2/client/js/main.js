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