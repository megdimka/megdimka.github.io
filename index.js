function ael(a,b,c)
{
	document.querySelector(a).addEventListener(b,c);
}
function setprop (a, b, c)
{
	document.querySelector(a)[b] = c;
}
function alert(title, msg)
{
	dialog = document.querySelector("dialog");
	setprop(".mdl-dialog__title", "innerHTML", title);
	setprop(".mdl-dialog__content", "innerHTML", msg);
	ael("#dialog-ok", "click", () => dialog.close());
	dialog.show();
}
function sw()
{
	if('serviceWorker' in navigator)
	{
		navigator.serviceWorker.register('sw.js');
	} else
	{
		console.log.e('[serviceWorker] not found');
	}
}
function onload()
{
	sw();
	document.querySelector("#loading").remove();
	init();
}
function update(stream)
{
	document.querySelector("video").src = stream.url;
}
function isCompatible() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
function init()
{
	const constraints = 
	{
		video: true
	};
	const video = document.querySelector("#camera");
	function handleSuccess(stream)
	{
		video.srcObject = stream;
	}
	function handleError(error)
	{
		console.error("[camera] rejected!", error);
		alert("error", error);
	}
	ael("#fullscreen", "click", () => 
	{
		video.requestFullscreen? video.requestFullscreen() : video.mozRequestFullscreen? video.mozRequestFullscreen() : video.webkitRequestFullscreen()
	});
	navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
}
