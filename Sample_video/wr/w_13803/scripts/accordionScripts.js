var btnClicked = "-1";
var isPresenter = false;
function getWidgetIFrame(){
	if(isPresenter){
		return window.parent.document.getElementById(window.name);
	}else{
		var cpWidget = window.parent.document.getElementsByClassName("cp-widget");
		for(i=0;i<cpWidget.length;i++){
			for(j=0;j<cpWidget[i].children.length;j++){
				if(cpWidget[i].children[j].children[0] != undefined){
					if(cpWidget[i].children[j].children[0].contentDocument.getElementById("accordionwdgt") != null){
						myFrameName = window.name;
						return window.parent.document.getElementById(window.name);
					}
				}
			}
		}
	}
}

function resizeInteractionPresenter(thewidth,theheight) {
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");
	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	var scaleW = thewidth / (700);
	var scaleH = theheight/ (498);
	
	myWidgetiFrame.style.width = parseInt(parseInt(750*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(550*scaleH))+"px"
	
	
	var iframewidth = String(myWidgetiFrame.style.width).replace("px","");
	var iframeheight = String(myWidgetiFrame.style.height).replace("px","");

	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	/*********************/
	
	//Resize fonts
	var fontscaleW = thewidth / (800);
	var fontscaleH = theheight/ (600);
	if(fontscaleW<fontscaleH){
		fontscale = fontscaleW
	}else{
		fontscale = fontscaleH
	}

	contentStyles.size = contentStylessize*fontscale;
	buttonStyles.size = buttonStylessize*fontscale;
	headerStyles.size = headerStylessize*fontscale;
	instStyles.size = instStylessize*fontscale;
	
	setupStyle("#intTitle", headerStyles);
	setupStyle("#intInstructions", instStyles);
	setupStyle(".content", contentStyles);
	setupStyle(".header a", buttonStyles);
	
	//Resize interaction
	var marginsW = Math.round(30 * scaleW);
	var marginsH = Math.round(25 * scaleH);
	var totContentPadding = 20;
	
	$('#reveal').css('width',(680*scaleW));
	$('#reveal').css('height',(470*scaleH));
	$('#content_bg').css('height',(305*scaleH));
	
	$('#reveal').css('margin-left', marginsW+"px");
	$('#reveal').css('margin-top', marginsH+"px");
	
	var contentDisheight = $('#content_bg').height();
	var optionsHeaderHeight = 0
	
	for(i=0;i<textArray.length;i++){
		optionsHeaderHeight = optionsHeaderHeight+$("#btnHeader"+i).innerHeight();
	}
	
	var setContentHeight = ((contentDisheight- totContentPadding) - optionsHeaderHeight)
	if(setContentHeight<=10){
		setContentHeight = 10;
	}
	
	$('.scroll-pane').css('height',(setContentHeight));
	
	$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
	$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
	
	$(myWidgetiFrame).show()
	
}

function resizeInteraction(thewidth,theheight) {
	if(isPresenter)
		return resizeInteractionPresenter(thewidth, theheight);
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");
	if(thewidth<320){
		thewidth = 320
	}
	if(theheight<350){
		theheight = 350
	}
	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	var scaleW = thewidth / (700);
	var scaleH = theheight/ (498);
	
	myWidgetiFrame.style.width = parseInt(parseInt(750*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(550*scaleH))+"px"
	
	
	var iframewidth = String(myWidgetiFrame.style.width).replace("px","");
	var iframeheight = String(myWidgetiFrame.style.height).replace("px","");

	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	/*********************/
	
	//Resize fonts
	if(scalefont=="true"){
		//Content font size
		if(contentStylessize>=12){
			if(thewidth>=1024){
				contentStyles.size = contentStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(contentStylessize-2);
				if(tempNum>=12){
					contentStyles.size = tempNum
				}else{
					contentStyles.size = 12
				}
			}else if(thewidth>= 320){
				contentStyles.size = 12
			}
			
			var tempcontentStylessize = contentStyles.size*scaleW;
			if(tempcontentStylessize>=12 && tempcontentStylessize<=contentStylessize){
				contentStyles.size = tempcontentStylessize;
			}
		}
		
		//Button font size
		if(buttonStylessize>=12){
			if(thewidth>=1024){
				buttonStyles.size = buttonStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(buttonStylessize-2);
				if(tempNum>=12){
					buttonStyles.size = tempNum
				}else{
					buttonStyles.size = 12
				}
			}else if(thewidth>= 320){
				buttonStyles.size = 12
			}
			
			var tempbuttonStylessize = buttonStyles.size*scaleW;
			if(tempbuttonStylessize>=12 && tempbuttonStylessize<=buttonStylessize){
				buttonStyles.size = tempbuttonStylessize;
			}
		}
		
		//Header font size
		if(headerStylessize>=16){
			if(thewidth>=1024){
				headerStyles.size = headerStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(headerStylessize-2);
				if(tempNum>=16){
					headerStyles.size = tempNum
				}else{
					headerStyles.size = 16
				}
			}else if(thewidth>= 320){
				headerStyles.size = 16
			}
			
			var tempheaderStylessize = headerStyles.size*scaleW;
			if(tempheaderStylessize>=16 && tempheaderStylessize<=headerStylessize){
				headerStyles.size = tempheaderStylessize;
			}
		}
		
		//Instructions font size
		if(instStylessize>=12){
			if(thewidth>=1024){
				instStyles.size = instStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(instStylessize-2);
				if(tempNum>=12){
					instStyles.size = tempNum
				}else{
					instStyles.size = 12
				}
			}else if(thewidth>= 320){
				instStyles.size = 12
			}
			
			var tempinstStylessize = instStyles.size*scaleW;
			if(tempinstStylessize>=12 && tempinstStylessize<=instStylessize){
				instStyles.size = tempinstStylessize;
			}
		}

		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".content", contentStyles)
		setupStyle(".header a", buttonStyles)
	}else{
		
		contentStyles.size = contentStylessize;
		buttonStyles.size = buttonStylessize;
		headerStyles.size = headerStylessize;
		instStyles.size = instStylessize;
		
		if(theheight == 350 || thewidth == 320){
			contentStyles.size = 12;
			buttonStyles.size = 12;
			headerStyles.size = 16;
			instStyles.size = 12;
		}
		
		setupStyle("#intTitle", headerStyles);
		setupStyle("#intInstructions", instStyles);
		setupStyle(".content", contentStyles);
		setupStyle(".header a", buttonStyles);
	}
	
	//Resize interaction
	var marginsW
	var totContentPadding =  20;
	if(thewidth>=1024){
		marginsW = Math.round((27+scaleW) * scaleW);
		totContentPadding = 20;
	}else if(thewidth>= 768){
		marginsW = Math.round((25+scaleW) * scaleW);
		totContentPadding = 20
	}else{
		marginsW = Math.round((19+scaleW) * scaleW);
		totContentPadding = 50
	}
	
	var marginsH = Math.round(30 * scaleH);
	
	$('#reveal').css('width',(680*scaleW));
	$('#reveal').css('height',(470*scaleH));
	$('#content_bg').css('height',(305*scaleH));
	
	$('#reveal').css('margin-left', marginsW+"px");
	$('#reveal').css('margin-top', marginsH+"px");
	
	var contentDisheight = $('#content_bg').height();
	var optionsHeaderHeight = 0;
	//console.log(buttonStyles.size,"btnsize")
	for(i=0;i<textArray.length;i++){
		optionsHeaderHeight = optionsHeaderHeight+$("#btnHeader"+i).innerHeight();
		//console.log($("#btnHeader"+i).innerHeight(),"innerheight");
		if($("#btnHeader"+i).innerHeight()>36){
			var temptext = $("#btnHeader"+i).find('a').text();
			//$("#btnHeader"+i).text($("#btnHeader"+i).text().substring(0,50)+"...")
			if(temptext.length > 50)
			$("#btnHeader"+i).find('a').text(temptext.substring(0,50)+"...")
		}
	}
	
	var setContentHeight = ((contentDisheight- totContentPadding) - optionsHeaderHeight)
	if(setContentHeight<=10){
		setContentHeight = 10;
	}
	
	$('.scroll-pane').css('height',(setContentHeight));
	
	if(isResponsiveProject){
		$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
		$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
	}else{
		if(firstLoad){
			$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
			$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
		}
	}
}


function addClickHandlers() {
	
	$("#reveal").fadeIn();		
	$('#content_bg .header a').mouseleave(function() {
  		var main = $(this).parent().hasClass('activeBtn')
		if (!main) {
			outState(this);
		}
	});
	
	$('#content_bg .header a').keydown(function() {
  		var main = $(this).parent().hasClass('activeBtn')
		if (!main) {
			outState(this);
		}
	});
	
		$('#content_bg .header a').mouseenter(function() {
			 var main = $(this).parent().hasClass('activeBtn')
			if (!main) {
				overState(this);
			}
	});
	
		$('#content_bg .header a').keyup(function() {
			 var main = $(this).parent().hasClass('activeBtn')
			if (!main) {
				overState(this);
			}
	});
										  
	$('#content_bg .header a').click(function(e){	
		//Calculate by how much the container should be set
		for(i=0;i<textArray.length;i++){
			//console.log($("#btnHeader"+i).innerHeight(),"innerheight");
			if($("#btnHeader"+i).innerHeight()>36){
				var temptext = $("#btnHeader"+i).find('a').text();
				//$("#btnHeader"+i).text($("#btnHeader"+i).text().substring(0,50)+"...")
				if(temptext.length > 50)
				$("#btnHeader"+i).find('a').text(temptext.substring(0,50)+"...")
			}
		}
	
		if (btnClicked != e.target.id){
			//make sure that nothing happens if the same button is clicked
			//console.log("this",this)
			var dad = $(this).parent(); //grab parent
			
			if (btnClicked != "-1") { //make sure it's not the first click 
				var grabMe = btnClicked*2 + 1;
				$('#content_bg div').eq(grabMe).slideUp('slow'); //slide the content div
				$('#content_bg div').eq(grabMe-1).removeClass('overBtn'); //remove class from header div
				$('#content_bg div').eq(grabMe-1).removeClass('activeBtn'); //remove class from header div
				$('#content_bg div').eq(grabMe-1).addClass('unactive'); //add the unactive state to the btn						
			}
			$("#btnHeader"+e.target.id).find('a').text(textArray[e.target.id]);
// +"hxxxxelhello\n\nhellohelhellohellohellohe llohellohellohellohellohellohelloh ellohhelhellohellohelhellohellohellohel lohellohellohellohellohellohellohellohellohellohe llohellohellohellolohelhellohellohellohellohellohellohellohelloh ellohellohellohellohellohellohellohellohellolohel hellohellohellohellohellohe llohellohellohellohellohellohellohellohellohellohellohellolohelhelloh ellohellohellohellohellohellohelloh llohellohellohellohellohellohellohellohel lolohelhellohel lohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellolohe lhellohellohellohellohellohellohellohellohell ohellohellohellohellohellohellohellohe llolohellohellohellohelloh ellohellohellohellohellohellohellohellohellohellohelloloellohellohellohellohellohellolohelhellohellohellohellohello hellohellohellohellohellohellohelloh ellohellohellohellohellolohelhellohello hellohellohellohellohellohellohellohellohellohellohel lohellohellohellohellolohelhellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellolohelhellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellolohelhellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellolohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellolo");
			if($("#btnHeader"+e.target.id).innerHeight()>150){
				var temptext = $("#btnHeader"+e.target.id).find('a').text();
				//$("#btnHeader"+i).text($("#btnHeader"+i).text().substring(0,50)+"...")
				if(temptext.length > 450)
				$("#btnHeader"+e.target.id).find('a').text(temptext.substring(0,450)+"...");
			}

			//now move up the other 
			btnClicked = e.target.id;
			
			$(dad).removeClass('unactive'); //remove class from header div
			$(dad).removeClass('overBtn'); //remove class from header div
			$(dad).addClass('activeBtn');
			
			//console.log($(this).addClass('active').parent('div').next('.content'))
			$(this).addClass('active').parent('div').next('.content').slideDown('slow', function() {
				//after animation is complete, run setup and play audio
				//Added this for IE 9 and IE 11 scroll issues.
				$(this).css('overflow',"auto");	
				pauseSound();
				if (soundArray[btnClicked] != "-1") {
					setTimeout("play_sound(soundArray[btnClicked])",50);
				}
			  });
		}else{
			var grabMe = btnClicked*2 + 1;
			$('#content_bg div').eq(grabMe).slideUp('slow');
			$('#content_bg div').eq(grabMe).slideUp('slow'); //slide the content div
			$('#content_bg div').eq(grabMe-1).removeClass('overBtn'); //remove class from header div
			$('#content_bg div').eq(grabMe-1).removeClass('activeBtn'); //remove class from header div
			$('#content_bg div').eq(grabMe-1).addClass('unactive'); //add the unactive state to the btn	
			btnClicked =-1;
		}
		
		$('.unactive a').css('color', buttonStyles.color);
		$('.unactive').css('background-color', generalStyles.btnColorUp);
		$('.activeBtn').css('background-color', generalStyles.btnColorDown);
		$('.activeBtn a').css('color', buttonStyles.textDown);

	});
	
	$(document).keydown(function(e){	
	//console.log("key press",btnClicked,e.target.firstChild,e.keyCode)
		if(e.keyCode  == 13 || e.keyCode  == 32) {
	//console.log("this",e.target.firstChild)
		//if(e.target.id != "")
		if (btnClicked != e.target.firstChild.id) //make sure that nothing happens if the same button is clicked
		{
			
				var dad = $(e.target.firstChild).parent(); //grab parent
				if (btnClicked != "-1") { //make sure it's not the first click 
				var grabMe = btnClicked*2 + 1;
				$('#content_bg div').eq(grabMe).slideUp('slow'); //slide the content div
				$('#content_bg div').eq(grabMe-1).removeClass('overBtn'); //remove class from header div

				$('#content_bg div').eq(grabMe-1).removeClass('activeBtn'); //remove class from header div
				$('#content_bg div').eq(grabMe-1).addClass('unactive'); //add the unactive state to the btn						
			}
			//now move up the other 
			btnClicked = e.target.firstChild.id;
			
			//console.log(btnClicked,"btnClicked")
			$(dad).removeClass('unactive'); //remove class from header div
			$(dad).removeClass('overBtn'); //remove class from header div
			$(dad).addClass('activeBtn');
			$(e.target.firstChild).addClass('active').parent('div').next('.content').slideDown('slow', function() {
				//after animation is complete, run setup and play audio
				pauseSound();
				if (soundArray[btnClicked] != "-1") {
					setTimeout("play_sound(soundArray[btnClicked])",50);
				}
			  });
		}
		
		$('.unactive a').css('color', buttonStyles.color);
		$('.unactive').css('background-color', generalStyles.btnColorUp);
		$('.activeBtn').css('background-color', generalStyles.btnColorDown);
		$('.activeBtn a').css('color', buttonStyles.textDown);
	}
	
		});
}
function overState(obj) {
	var dad = $(obj).parent();
	$(dad).addClass('overBtn');
	$('.overBtn').css('background-color', generalStyles.btnColorOver);
	$('.overBtn a').css('color', buttonStyles.textOver);
	
}

function outState(obj2) {
	//alert("out");
	var dad = $(obj2).parent();
	$(dad).removeClass('overBtn');
	$(dad).addClass('unactive');
	$('.unactive').css('background-color', generalStyles.btnColorUp);
	$('.unactive a').css('color', buttonStyles.color);
	
}


function html5_audio(){
	var a = document.createElement('audio');
	return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}
 
/*var theSnd = null;

function pauseSound() {
	if(theSnd != null) // && theSnd.src != wavePath)
	{ theSnd.pause();}
}

function play_sound(url){
	theSnd = new Audio(url);
	theSnd.load();
	theSnd.play();	
}*/

//Modifying the sound function - Audio load and play is now handled by captivate: IF it does not handle the audio revert to old code.
//This fix was mainly  implemented for IPAD.
var isDevice = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	isDevice = true
}
//var isDevice = navigator.userAgent.match(/iPad/i) != null;
var theSnd = null;
var theSndURL = null;

function pauseSound() {
	if(isDevice){
		if(!this.handle)
		return;
		
		if(!this.handle.stopWidgetAudio(theSndURL)){
			if(theSnd != null){ 
				theSnd.pause();
			}
		}else{
			this.handle.stopWidgetAudio(theSndURL)
		}
	} else {
		if(theSnd != null) // && theSnd.src != wavePath)
		{ theSnd.pause();}
	}
}

function play_sound(url){
	if(isDevice){
		if(!this.handle)
		return;
		
		theSndURL = url;
		if(!this.handle.playWidgetAudio(url)){	
			theSnd = new Audio(url);
			theSnd.load();
			theSnd.play();
		}else{
			this.handle.playWidgetAudio(url)
		}
	}else{
		theSnd = new Audio(url);
		theSnd.load();
		theSnd.play();	
	}
}

function setupCustomStyles() {
	generalStyles.headerColor = formatColor(generalStyles.headerColor); //generalStyles.headerColor.substring(2);
	generalStyles.contentBodyColor = formatColor(generalStyles.contentBodyColor); //"#" + generalStyles.contentBodyColor.substring(2);
	generalStyles.bodyColor = formatColor(generalStyles.bodyColor); //"#" + generalStyles.bodyColor.substring(2);
	//generalStyles.arrowColor = formatColor(generalStyles.arrowColor);
	generalStyles.btnColorUp = formatColor(generalStyles.btnColorUp);
	generalStyles.btnColorOver = formatColor(generalStyles.btnColorOver);
	generalStyles.btnColorDown = formatColor(generalStyles.btnColorDown);
	//generalStyles.lineColor = formatColor(generalStyles.lineColor);	
	buttonStyles.color  = formatColor(buttonStyles.color);
	buttonStyles.textOver = formatColor(buttonStyles.textOver);
	buttonStyles.textDown = formatColor(buttonStyles.textDown);
		
	//alert(generalStyles.lineColor);
		if (currentTheme != 3 && currentTheme != 11 && currentTheme != 16) {
			$('#headerColor').css('background-color', generalStyles.headerColor)//generalStyles.headerColor);
		} else {
			$('#headerColor').css('background-color', generalStyles.bodyColor)//generalStyles.headerColor);
			
		}
		//alert(buttonStyles.color);
	//$('#headerColor').css('background-image', 'none');
	$('div.content').css('background-color', generalStyles.contentBodyColor);
	$('#content_bg').css('background-color', generalStyles.bodyColor);
	
	$('#reveal').css('background-color', generalStyles.bodyColor);
	$('.header').css('background-color', generalStyles.btnColorUp);
	
	$('.header a').css('color', buttonStyles.color);
	if (generalStyles.headerActive == 2) {
		$('#headerColor').css('display', 'none');
	}
	
}