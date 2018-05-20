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
	navigator.mediaDevices.enumerateDevices()
		.then(devices => 
		{
			var device = devices.filter(device => 
			{
				if(device.kind == "videoinput") return device;
			});
			if(device.length > 1)
			{
				var constraints = 
				{
					video:
					{
						mandatory:
						{
							sourceId: device[1]/deviceId ? device[1].deviceId : null
						}
					},
					audio: false
				}
			} else if(device.length)
			{
				var constraints = 
				{
					video:
					{
						mandatory:
						{
							sourceId: device[0].deviceId? device[0].deviceId : null
						}
					},
					audio: false
				}
			}
		}).catch(handleError);
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
