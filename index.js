get = document.querySelector;
function ael(a,b,c)
{
	get(a).addEventListener(b,c, {passive: true});
}
function setprop (a, b, c)
{
	get(a)[b] = c;
}
function alert(title, msg)
{
	dialog = get("dialog");
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
//	sw();
	init();
}
function update(stream)
{
	get("video").src = stream.url;
}
function isCompatible() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
function init()
{
	var constraints, snap;
	navigator.mediaDevices.enumerateDevices()
		.then(devices => 
		{
			var device = devices.filter(device => 
			{
				if(device.kind == "videoinput") return device;
			});
			alert("device", device);
			if(device.length > 1)
			{
				constraints = 
				{
					video:
					{
						mandatory:
						{
							sourceId: device[1].deviceId ? device[1].deviceId : null
						}
					},
					audio: false
				}
			} else if(device.length)
			{
				constraints = 
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
		})//.catch(handleError);
	const video = document.querySelector("#camera");
	function handleSuccess(stream)
	{
		if(snap)
		{
			window.open(stream);
			snap = false;
		}
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
	ael("snap", "click", () => 
	{
		snap = true;
	});
	navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
	get("#splash").remove();
}
