
    var video, canvas, context, imageData, detector;
	var debugImage;
  
    function InitMarkers(){
      video = document.getElementById("V1");
      canvas = document.getElementById("canvas1");
      context = canvas.getContext("2d");
	  
      debugImage = context.createImageData(video.clientWidth, video.clientHeight);
        detector = new AR.Detector();
        requestAnimationFrame(tick);
		
      }

    function tick(){
      requestAnimationFrame(tick);
      
      if (video.readyState === video.HAVE_ENOUGH_DATA){
        snapshot();

        var markers = detector.detect(imageData);
		if (UseDebugMode == true) {drawDebug()};
        drawCorners(markers);
        drawId(markers);
      }
    }
    function snapshot(){
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    }      
    function drawCorners(markers){
      var corners, corner, i, j;
    
      context.lineWidth = 3;

      for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;
        
        context.strokeStyle = "red";
        context.beginPath();
        
        for (j = 0; j !== corners.length; ++ j){
          corner = corners[j];
          context.moveTo(corner.x, corner.y);
          corner = corners[(j + 1) % corners.length];
          context.lineTo(corner.x, corner.y);
        }

        context.stroke();
        context.closePath();
        
        context.strokeStyle = "green";
        context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
      }
    }
    function drawId(markers){
      var corners, corner, x, y, i, j;
      if (markers.length > 0 ) {lastQRCode = "0"};
	  document.getElementById('img1').src = "";
	  
      context.strokeStyle = "blue";
      context.lineWidth = 1;
      
      for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;
        
        x = Infinity;
        y = Infinity;
        
        for (j = 0; j !== corners.length; ++ j){
          corner = corners[j];
          
          x = Math.min(x, corner.x);
          y = Math.min(y, corner.y);
        }

        context.strokeText(markers[i].id, x, y)

		if (lastQRBin !=  markers[i].id){
			UIkit.notify({
				message : markers[i].id,
				status  : 'info',
				timeout : 500,
				pos     : 'top-right'
			});
			say (" Marker " + markers[i].id + " wurde erkannt");
			InitCursor 	(530,110);
			InitOnOff 	();
		}
		
		lastQRBin = markers[i].id;
		lastQRCode += "Marker" + i + "_" + markers[i].id;
		if (markers[i].id == 1005) {
			var img = document.getElementById('img1');
			img.style.opacity = "0.3";
			img.filter="Alpha(Opacity=100);";
			img.src = "http://raspiwz2:8083/fhem/SVG_showLog?dev=SVG_FHT_0058&logdev=FileLog_FHT_0058&gplotfile=fht&logfile=CURRENT";
		} else {
			var img = document.getElementById('img1');
			img.style.opacity = "0.3";
			img.filter="Alpha(Opacity=100);";
			img.src = "";
			}
		}
    }
    function drawDebug(){
      var width = video.width, height = video.height;

      context.putImageData(imageData, 0, 0);

      drawContours(detector.contours, 0, height, width, height, function(hole) {return hole? "magenta": "blue";});
      drawContours(detector.polys, 0, height, width, height, function() {return "green";} );
      drawContours(detector.candidates, 0, height, width, height, function() {return "red";} );

    }
    function drawContours(contours, x, y, width, height, fn){
      var i = contours.length, j, contour, point;
      
      while(i --){
        contour = contours[i];

        context.strokeStyle = fn(contour.hole);
        context.beginPath();

        for (j = 0; j < contour.length; ++ j){
          point = contour[j];
          this.context.moveTo(x + point.x, y + point.y);
          point = contour[(j + 1) % contour.length];
          this.context.lineTo(x + point.x, y + point.y);
        }
        
        context.stroke();
        context.closePath();
      }
    }
    function createImage(src, dst){
      var i = src.data.length, j = (i * 4) + 3;
      
      while(i --){
        dst.data[j -= 4] = 255;
        dst.data[j - 1] = dst.data[j - 2] = dst.data[j - 3] = src.data[i];
      }
      
      return dst;
    };
InitMarkers();