function get(a)
{
	return document.querySelector(a);
}
function ael(a,b,c)
{
	get(a).addEventListener(b,c);
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
		console.log.e('[serviceWorker] not supported');
	}
}
function onload()
{
	sw();
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
	var constraints = { video: true};
	navigator.mediaDevices.enumerateDevices()
	
		.then((devices) => 
		{
			var device = devices.filter(device => 
			{
				if(device.kind == "videoinput") return device;
			});
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
		}).catch(handleError);
	const video = get("#camera");
	function handleError(error)
	{
		console.error("[camera] rejected!", error);
		alert("error", error);
	}
	ael("#fullscreen", "click", a => 
	{
		video.requestFullscreen? video.requestFullscreen() : video.mozRequestFullscreen? video.mozRequestFullscreen() : video.webkitRequestFullscreen();
		a.preventDefault();
	});
	ael("#snap", "click", a => 
	{
		URL = URL || webkitURL;
		var c = document.createElement("canvas");
		var ctx = c.getContext("2d");
		ctx.drawImage(get("video"), 0, 0, c.width, c.height);
		var l = document.createElement('a');
		l.href = c.toDataURL();
		l.download='scrshoot.png';
		l.click();
		a.preventDefault();
	});
	navigator.mediaDevices.getUserMedia(constraints).then(stream => video.srcObject = stream).catch(handleError);
	get("#splash").remove();
}
