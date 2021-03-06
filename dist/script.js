﻿var playListID = ["PL0SkdWT0_8kUbc5tGByWlOB6gLyNeUEle"]; // replace with your desired youtube playlist ID
    var apiKey = "AIzaSyBMRyIdlgyAKIoKe9ptUZgejHZQB3RWumY"; // this default YouTube API key will work but you should change it to your own
    var autoPlayNext = 0; // auto play next video in list when current ends? 0 for no. 1 for yes.
    var showPlayerControls = 1; // display YouTube video player controls? 0 for no. 1 for yes.
    var showVideoInfo = 1; // display video title on youtube player? 0 for no. 1 for yes.
    var showRelatedVideos = 0; // display related videos after video ends? 0 for no. 1 for yes.
    var showTitlesInList = 1; // display video titles under each thumbnail in playlist? 0 for no. 1 for yes.


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
setTimeout(initPage,1000);
function initPage() { 
     var $domObject = $('#vid_frame1'); 
     if ($domObject.length === 0) { // Dom object not loaded yet. 
       console.log("dom non chargé >> "+$domObject.length);
      window.setTimeout(function() { 
       initPage(); 
      }, 0); // Try again after other stuff has finished. 
      return; 
     } 
  console.log("dom chargé >> "+$domObject.length);
     var videoID =[];
  $('.mlvp-list .vid-item').each(function(i,t){
   var __src = $(this).find('img').attr('src').split('/')[4];
    videoID.push(__src);
    $(this).on('click',function(me){
      $('#vid_frame1').attr('src',"https://www.youtube.com/embed/"+$(this).attr("videourl")+"?html5=1&showinfo=1&autoplay=0&rel=0&controls=1&playsinline=1&enablejsapi=1&widgetid=1");
    })
    $(this).attr('videourl', videoID[i]);
   // $(this).attr('onclick', "vid_frame["+i+"].cueVideoById({ videoId:\'"+videoID[i]+"\' });");
    console.log(' __src  >> ' + __src,'tab SRC >> '+videoID);
  
  }); 
    } 
initPage();




// Check for mobile and detect if iOS

var myVar = 0;

var isMobile = {

    Android: function() {

        return navigator.userAgent.match(/Android/i);

    },

    BlackBerry: function() {

        return navigator.userAgent.match(/BlackBerry/i);

    },

    iOS: function() {

        return navigator.userAgent.match(/iPhone|iPad|iPod/i);

    },

    Opera: function() {

        return navigator.userAgent.match(/Opera Mini/i);

    },

    Windows: function() {

        return navigator.userAgent.match(/IEMobile/i);

    },

    any: function() {

        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());

    }

};



if(isMobile.iOS()) {

   // It is iOS

   myVar = 1;

}





var first_vid="";

var listNum=0;

var vidIDs = [];

var videosURL = [];

var vid_frame = [];

var listLength = [];

var list_width = [];

var pNum = 0;

var tgt = "vid_frame1";

var x;



// Check how many players on the page

var numPlaylists = playListID.length;

// console.log("numPlaylists: "+numPlaylists);

for (var n=0;n<numPlaylists;n++) {

	//console.log(n);

	vidIDs[n] = [];

	videosURL[n] = "https://www.googleapis.com/youtube/v3/playlistItems?playlistId="+playListID[n]+"&key="+apiKey+"&fields=items&part=snippet&maxResults=50";

}



function onYouTubeIframeAPIReady() {



	for (var n=0;n<numPlaylists;n++) {

		doAjaxCallStuff(n);

	}

	

}

function doAjaxCallStuff(n) {

	var m = n+1;

	console.log("m: "+m);



	$.ajax({

	  url: videosURL[n],

	  dataType: 'json',

	  async: true,

	  success: function(data) {



			var list_data="";

			var first_vid_iframe="";

	

			$.each(data.items, function(i, val) {

		        var feedTitle = val.snippet.title;

		        var feedDesc = val.snippet.description;

		        var videoID = val.snippet.resourceId.videoId;

		        var thumb = "http://img.youtube.com/vi/"+ videoID +"/default.jpg";

	

		        // BUILD THE PLAYLIST(S)

		        if(i === 0) { // so we can set first vid as current

		        	// if(isMobile.iOS()) { // if iOS use cueVideoById initially

		        	if(myVar === 1) { // if iOS use cueVideoById initially

		        		list_data += '<div class=\"vid-item\" tabindex=\"0\" onClick=\"vid_frame['+m+'].cueVideoById({ videoId:\''+videoID+'\' }); listNum='+ i +'; setCurrent('+m+')\" onfocus=\"$(document).keyup(function(e) { if(e.keyCode ==13) { vid_frame['+m+'].loadVideoById({ videoId:\''+videoID+'\' }); listNum='+ i +'; setCurrent('+m+') } });\">\n';

		        	} else { // otherwise use loadVideoById

		        		list_data += '<div class=\"vid-item\" tabindex=\"0\" onClick=\"vid_frame['+m+'].loadVideoById({ videoId:\''+videoID+'\' }); listNum='+ i +'; pNum='+m+'; setCurrent('+m+')\" onfocus=\"$(document).keyup(function(e) { if(e.keyCode ==13) { vid_frame['+m+'].loadVideoById({ videoId:\''+videoID+'\' }); listNum='+ i +'; setCurrent('+m+') } });\">\n';

		        	}

		        	list_data += '<div class=\"thumb\"><img class=\"current-vid\" src="'+ thumb +'"></div>\n';

			        if (showTitlesInList === 1) {

			        	list_data += '<div class=\"desc current-vid\">'+feedTitle+'</div>\n';

			        }

			        list_data += '</div>';

		        } else {

		        	if(myVar === 1) {

		        		list_data += '<div class=\"vid-item\" tabindex=\"0\" onClick=\"vid_frame['+m+'].cueVideoById({ videoId:\''+videoID+'\' }); listNum='+ i +'; setCurrent('+m+')\" onfocus=\"$(document).keyup(function(e) { if(e.keyCode ==13) { vid_frame['+m+'].loadVideoById({ videoId:\''+videoID+'\' }); listNum='+ i +'; setCurrent('+m+') } });\" >\n';

		        	} else {

		        		list_data += '<div class=\"vid-item\" tabindex=\"0\" onClick=\"vid_frame['+m+'].loadVideoById({ videoId:\''+videoID+'\' }); listNum='+ i +'; pNum='+m+'; setCurrent('+m+') \" onfocus=\"$(document).keyup(function(e) { if(e.keyCode ==13) { vid_frame['+m+'].loadVideoById({ videoId:\''+videoID+'\' }); listNum='+ i +'; setCurrent('+m+') } });\" >\n';

		        	}

			        list_data += '<div class=\"thumb\"><img src="'+ thumb +'"></div>\n';

			        if (showTitlesInList === 1) {

			        	list_data += '<div class=\"desc\">'+feedTitle+'</div>\n';

			        }

			        list_data += '</div>';

		        }

		        vidIDs[n].push(videoID);

		        // get total number of videos in list

	        	listLength[m] = i+1;

			});

	

	

			// CREATE YOUTUBE VIDEO PLAYER

			vid_frame[m] = new YT.Player('vid_frame'+m, {

		      height: '200',

		      width: '200',

		      playerVars: { 'html5': 1, 'showinfo': showVideoInfo, 'autoplay': 0, 'rel': showRelatedVideos, 'controls': showPlayerControls, 'playsinline': 1 },

		      videoId: vidIDs[n][0],

		      events: {

		        //'onReady': onPlayerReady,

		        'onStateChange': onPlayerStateChange

		      }

		    });

	

			// set overall width of vList div

		    list_width[m] = listLength[m]*168;

		    $("#player-container"+m+">div.mlvp-list-container>div.mlvp-list").width(list_width[m]+"px");

			



			$(list_data).appendTo("#player-container"+m+">div.mlvp-list-container>div.mlvp-list");

	

			first_vid = data.items[0].snippet.resourceId.videoId;

	

			setScrollAmt(n);

			//window.onresize = setScrollAmt(n);

	

			$(function() {      

			  //Enable swiping...

			  $("#player-container"+m+">div.mlvp-list-container").swipe( {

			    //Generic swipe handler for all directions

			    swipe:function( event, direction, distance, duration, fingerCount, fingerData ) {

			      //$(this).text("You swiped " + direction );  

			      if(direction=="left") {

				event.preventDefault();
			        scrollListLeft(m);

			      } else if (direction=="right") {
				event.preventDefault();
			      	scrollListRight(m);

			      }

			    },

			    //Default is 75px, set to 0 for demo so any distance triggers swipe

			     threshold:75,

			     allowPageScroll:"vertical",

			     preventDefaultEvents: false

			  });

			});

		} // ajax close

    });

}





function onPlayerStateChange(event) {

	tgt = event.target.getIframe().id;



	// console.log("target: "+event.target.getIframe().id);

	// console.log("pNum: "+pNum);

	// console.log("event.data: "+event.data);





	if (tgt == "vid_frame1") {

		x=0;

		y=1;

	}

	if (tgt == "vid_frame2") {

		x=1;

		y=2;

	}

	if (tgt == "vid_frame3") {

		x=2;

		y=3;

	}

	if (tgt == "vid_frame4") {

		x=3;

		y=4;

	}

	if (tgt == "vid_frame5") {

		x=4;

		y=5;

	}

	if (tgt == "vid_frame6") {

		x=5;

		y=6;

	}

	// add more for additional players 



	//document.getElementById("console").innerHTML = "target: "+tgt+" and state.data: "+state.data;



	

	// AUTOPLAY OPTION

	if(autoPlayNext === 1) { // if autoplay is on



    	//console.log("state: "+state.data);

    	//console.log("list index: "+listNum);

	    if(event.data === 0){  // if video has ended



	        //find next vid in playlist

	        nextVid = listNum+1;



	        // console.log("nextvid: "+nextVid);

	        // console.log(listLength[y]);



	        if (nextVid >= listLength[y]) {

	        	console.log("greater");

	        	nextVid = 0;

	        	var nextVidId = vidIDs[x][nextVid];



		        //play next vid in playlist

		        vid_frame[y].loadVideoById({ videoId:nextVidId });



		        listNum = 0;

		        setCurrent(y);



function getOffset( el ) {

    var _x = 0;

    var _y = 0;

    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {

        _x += el.offsetLeft - el.scrollLeft;

        _y += el.offsetTop - el.scrollTop;

        el = el.offsetParent;

    }

    return { top: _y, left: _x };

}

var xPos = getOffset( jQuery("#player-container"+y+">div.mlvp-list-container") ).left; 







		        console.log("left: "+xPos);

		        //jQuery("#player-container"+y+">div.mlvp-list-container").css('left', 100);

	        } else {



	        	var nextVidId = vidIDs[x][nextVid];



		        //play next vid in playlist

		        //event.target.loadVideoById({ videoId:nextVidId }); 

		        vid_frame[y].loadVideoById({ videoId:nextVidId });



		        listNum = listNum+1;

		        setCurrent(y);

	        }

	    }

	}





	if(myVar === 1) { // if iOS 

		//myVar = 0;

		// clear onclicks for each .vid-item

		if(event.data === 1) {

			for (var i=0; i<listLength[n]; i++) {

				var lnum = i+1;

				var vnum = vidIDs[x][i];



				// if onclick attribute contains 'cueVideoById' clear onclick and run resetOnClick()

				if (  $('#player-container'+y+' .mlvp-list-container .mlvp-list .vid-item:first-child').attr('onClick').indexOf('cueVideoById') > -1) {

					$('#player-container'+y+'>div.mlvp-list-container>div.mlvp-list.vid-item:nth-child('+lnum+')').attr('onclick','');

				}

			}

			resetOnClick(); // run this function to reset onclicks to use loadVideoById 

		}

	}



}





// set styles in playlist to show currently selected video

function setCurrent(n) {



	$('#player-container'+n+'>div.mlvp-list-container>div.mlvp-list>div.vid-item>div.current-vid').removeClass('current-vid');

	$('#player-container'+n+'>div.mlvp-list-container>div.mlvp-list>div.vid-item>div.thumb img.current-vid').removeClass('current-vid');



	var currNum = listNum+1;

	$('#player-container'+n+'>div.mlvp-list-container>div.mlvp-list div:nth-child('+currNum+') div.desc').addClass('current-vid');

	$('#player-container'+n+'>div.mlvp-list-container>div.mlvp-list div:nth-child('+currNum+') div.thumb img').addClass('current-vid');



}



// iOS wierdness fix

// after first playing of a video clicking a thumb in playlist will start playing a vid

// so we reset the onclicks to loadVideoByID

function resetOnClick() {



	var m = n+1;

	for (var i=0; i<listLength[y]; i++) {

		var lnum = i+1;

		//var vnum = vidIDs[i];

		var vnum = "'"+vidIDs[x][i]+"'";

		var clickString = "vid_frame["+y+"].loadVideoById({ videoId: "+vnum+" }); listNum="+i+"; setCurrent("+y+");"

		

		// console.log(lnum+": "+vnum);

		// console.log(clickString);

		$('#player-container'+y+'>div.mlvp-list-container>div.mlvp-list>div.vid-item:nth-child('+lnum+')').attr('onclick',clickString);

	}

	return;

}







// JS FOR SCROLLING THE ROW OF THUMBNAILS

// set horizontal scroll distance of playlist row

function setScrollAmt(n) {

	var m = n+1;

    // var w = jQuery(window).width();

    var w = jQuery('#player-container'+m+'>div.mlvp-container').width();

    console.log("container width: "+w);



    if (w <= 572) {

        scrollAmt = 336;

    } else if (w >= 573 && w <= 742) {

        scrollAmt = 504;

    } else {

        scrollAmt = 672;

    }

    // console.log("scroll amount: "+scrollAmt);



    // scroll on click of arrows

	jQuery("#player-container"+m+">div.mlvp-arrows>div.mlvp-arrow-right").bind("click", function(event) {

	    // event.preventDefault();

	    jQuery("#player-container"+m+">div.mlvp-list-container").stop().animate({

	        scrollLeft: "+=" + scrollAmt

	    }, 750);

	});

	jQuery("#player-container"+m+">div.mlvp-arrows>div.mlvp-arrow-left").bind("click", function(event) {

	    // event.preventDefault();

	    jQuery("#player-container"+m+">div.mlvp-list-container").stop().animate({

	        scrollLeft: "-=" + scrollAmt

	    }, 750);

	});





	// ADJUST ARROW SIZE / VISIBILITY BASED ON WIDTH OF PLAYER

	if (w<=420 && w>=316) { // smaller arrows on small screens

		jQuery('.mlvp-arrows').css({ display: "block" });

		jQuery('.demo-icon').css({ "font-size": "24px", "line-height": "1.2em" });

		jQuery('.mlvp-list-container').css({ "margin-left": "24px", "margin-right": "24px" });

	} else if (w <= 315) { // hide arrows on very small screens

		jQuery('.mlvp-arrows').css({ display: "none" });

		jQuery('.mlvp-list-container').css({ "margin-left": "0", "margin-right": "0" });

	} else {

		jQuery('.mlvp-arrows').css({ display: "block" });

		jQuery('.mlvp-list-container').css({ "margin-left": "37px", "margin-right": "38px" });

		jQuery('.demo-icon').css({ "font-size": "32px", "line-height": "1em" });

	}







}



function scrollListLeft(m) {

	 //event.preventDefault();

    $("#player-container"+m+">div.mlvp-list-container").stop().animate({

        scrollLeft: "+=" + scrollAmt

    }, 750);

}



function scrollListRight(m) {

	 //event.preventDefault();

    $("#player-container"+m+">div.mlvp-list-container").stop().animate({

        scrollLeft: "-=" + scrollAmt

    }, 750);

}







// reset playlist scroll amount if window resized

window.addEventListener("resize", getPlayerSize); 



// make sure to set scroll amount for each player on page

function getPlayerSize() {

    for (var n=0;n<numPlaylists;n++) {

		setScrollAmt(n);

	}

}