var canvas, stage, exportRoot;
var quizinterval, timerinterval;
var notonquizslide = 0;
var jumped = 0;
var timelapsed = 0;
var initresultDoc;
var Timer;
var TotalSeconds;
var attempts = 0;
var totalTime;
var minutes;
var timedout = 0;
var seconds;
var flag = 0;
var flag2 = 0;
var flag1 = 0;
var lag;
var testval = 0;
var timecheck;
var id;
var quizentered, attempts, cpattempts, quizexit, noquiz, retakeinterval;
var inquizflag = 0;
var outquizflag = 0;
var nomoreretakes = 0;
var timeOutNoQuiz = 0;
var whichslide;
var quizcomplete = false;
var notonquizslide = false;
var doneonce = false;
var evtHandle;

var isResponsiveProject = false;
var mainCPNamespace;

var movieWidth;
var movieHeight;

var bgsel,txtSelectedColor,bgSelectedColor

function hinit() {
	canvas = document.getElementById("canvas");
	exportRoot = new lib.timerMain();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	exportRoot.timer1.visible = false;
	//exportRoot.plain1.visible = false;
	stage.update();

	createjs.Ticker.setFPS(24);
	//createjs.Ticker.addListener(stage);
	this.timeElapsed = resvar;
	varHandle[this.timeElapsed] = "0";

	//Code Modification for bug fix 
	if (timeway == "down") {

		var tempminutes = Math.floor(timeInSecs / 60);
		var tempseconds = timeInSecs % 60;
		//timeInSecs = timeInSecs - 1;

		if (tempminutes <= 9) {
			exportRoot.timer1.mins.text = "0" + tempminutes;
		} else {
			exportRoot.timer1.mins.text = tempminutes;
		}
		if (tempseconds <= 9) {
			exportRoot.timer1.sec.text = "0" + tempseconds;
		} else {
			exportRoot.timer1.sec.text = tempseconds;
		}
	} else {
		exportRoot.timer1.mins.text = "00";
		exportRoot.timer1.sec.text = "00";
	}
	
	if(bgsel=="false"){
		exportRoot.timer1.base_mc.visible = false;
		exportRoot.timer1.border_mc.visible = false;
		exportRoot.timer1.cline_mc.visible = false;
	}
	all();
}

function all() {
	if ((insidequiz == "true") && (((timeway == "down") && (timeInSecs = totalTime)) || ((timeway == "up") && (timelapsed == 0)))) {
		clearInterval(quizinterval);
		if (parent.cpInQuizScope == true) {
			attempts++;
			quizentered++;
			exportRoot.timer1.visible = true;
			if(timeway=="up"){
				timelapsed = 1
			}
			timerinterval = setInterval(starttimer, 998);
		} else if (parent.cpInQuizScope == false) {
			notonquizslide = true;
			quizexit++;
			flag = true;
		}
	} else if (insidequiz == "false") {
		noquiz = 1;
		exportRoot.timer1.visible = true;
		if(timeway=="down"){
			timeInSecs = timeInSecs-1;
		}else{
			timelapsed = 1
		}
		timerinterval = setInterval(starttimer, 998);
	}
	stage.update();
}

function starttimer() {
	if (insidequiz == "true") {
		if (parent.cpInQuizScope == true) {
			exportRoot.timer1.visible = true;
		} else if (parent.cpInQuizScope == false) {
			exportRoot.timer1.visible = false;
			//exportRoot.plain1.visible = false;
			exportRoot.timeupmsg.visible = false;
		}
	}

	if (timeway == "down") {
		if ((timeInSecs >= 0) && (exportRoot.timer1.visible == true)) {
			jumped = 0;
			varHandle[this.timeElapsed] = "0";

			minutes = Math.floor(timeInSecs / 60);
			seconds = timeInSecs % 60;
			timeInSecs = timeInSecs - 1;

			if (minutes <= 9) {
				exportRoot.timer1.mins.text = "0" + minutes;
			} else {
				exportRoot.timer1.mins.text = minutes;
			}if (seconds <= 9) {
				exportRoot.timer1.sec.text = "0" + seconds;
			} else {
				exportRoot.timer1.sec.text = seconds;
			}
		} else if ((exportRoot.timer1.visible == false) && (timeInSecs > 0)) {
			clearInterval(timerinterval);
			flag1 = true;
			varHandle[this.timeElapsed] = "0";
			//quizinterval = setInterval(checkscope, 100);
		} else if (timeInSecs <= 0) {
			varHandle[this.timeElapsed] = "1";
			timeout();
		}
	} else if (timeway == "up") {
		if ((timeInSecs >= timelapsed) && (exportRoot.timer1.visible == true)) {
			jumped = 0;
			varHandle[this.timeElapsed] = "0";
			minutes = Math.floor(timelapsed / 60);
			seconds = timelapsed % 60;
			timelapsed = timelapsed + 1;

			if (minutes <= 9) {
				exportRoot.timer1.mins.text = "0" + minutes;
			} else {
				exportRoot.timer1.mins.text = minutes;
			}
			
			if (seconds <= 9) {
				exportRoot.timer1.sec.text = "0" + seconds;
			} else {
				exportRoot.timer1.sec.text = seconds;
			}
		} else if ((exportRoot.timer1.visible == false) && (timelapsed < timeInSecs)) {
			varHandle[this.timeElapsed] = "0";
			clearInterval(timerinterval);
			flag1 = true;
			//quizinterval = setInterval(checkscope, 100);
		} else if ((timelapsed >= timeInSecs) && (jumped == 0)) {
			varHandle[this.timeElapsed] = "1";
			clearInterval(timerinterval);
			timeout();
		}
	}
	stage.update();
}

//EVENT LISTENERS FROM CAPTIVATE

function SlideEnterEventListener(){
	checkscope();
}

function checkscope() {
	if (parent.cpInQuizScope == true) {
		if ((notonquizslide == true) && (doneonce == false)) {
			all();
			doneonce = true;
		} else {
			flag1 = true;
			if (flag2 == true) {
				if (timeway == "down") {
					timeInSecs = totalTime;
				} else if (timeway == "up") {
					timelapsed = 0;
				}
				flag2 = false;
				jumped = 0;
				//exportRoot.plain1.visible = false;
				exportRoot.timeupmsg.visible = false;
				exportRoot.timeupmsg.text = "";
				testval = 0;
				all();
				clearInterval(quizinterval);
			}
		}

	} else if (parent.cpInQuizScope == false) {
		if (flag1 == true) {
			flag2 = true;
			flag1 = false;
		}
		if ((exportRoot.timer1.visible == true)&& (doneonce == true)) {
			exportRoot.timer1.visible = false;
			//exportRoot.plain1.visible = false;
			exportRoot.timeupmsg.visible = false;
		}
	}
}

function timeout() {
	clearInterval(timerinterval);
	if (mess != "") {
		//exportRoot.plain1.visible = true;
		
		exportRoot.timer1.sec.visible =false;
		exportRoot.timer1.mins.visible =false;
		exportRoot.timer1.cline_mc.visible =false;
		exportRoot.timer1.middotsmc.visible =false;
		
		exportRoot.timeupmsg.visible = true;
		exportRoot.timeupmsg.text = mess;
	}
	if (insidequiz == "false") {
		if ((jumpto != "") && (jumped == 0) && (exportRoot.timer1.visible == true) && (mess != "")) {
			clearInterval(timerinterval);
			lag = setInterval(showtwosecs, 998);
			if (testval == 2) {
				clearInterval(lag);
			}
		} else if ((jumpto != "") && (jumped == 0) && (exportRoot.timer1.visible == true)) {
			jumped = 1;
			parent.cpCmndGotoSlideAndResume = parseInt(jumpto) - 1;
		} else if (jumpto == "") {
			clearInterval(timerinterval);
			timeOutNoQuiz = 1;
		}
	} else if (insidequiz == "true") {
		if ((jumpto != "") && (jumped == 0) && (mess != "")) {
			lag = setInterval(showtwosecs, 998);
			if (testval == 2) {
				clearInterval(lag);
				clearInterval(timerinterval);
			}
			//quizinterval = setInterval(checkscope, 100);
		} else if ((jumpto != "") && (jumped == 0) && (mess == "")) {
			jumped = 1;
			parent.cpCmndGotoSlideAndResume = parseInt(jumpto) - 1;
		} else if (jumpto == "") {

			//quizinterval = setInterval(checkscope, 100);
		}
	}
}

function showtwosecs() {
	if (testval == 2) {
		clearInterval(lag);
		parent.cpCmndGotoSlideAndResume = parseInt(jumpto) - 1;
		jumped = 1;
		return;
	} else {
		testval = testval + 1;
	}
}

playbarUse1 = {
	onLoad: function() {
		if (!this.captivate) return;

		this.movieProps = this.captivate.CPMovieHandle.getMovieProps();
		if (!this.movieProps) return;
		varHandle = this.movieProps.variablesHandle;
		evtHandle = this.movieProps.eventDispatcher;
		mainCPNamespace = this.movieProps.getCpHandle();
		isResponsiveProject = mainCPNamespace.responsive;
		this.xmlStr = this.captivate.CPMovieHandle.widgetParams();
		var size = this.OpenAjax.getSize();
		width = size.width;
		height = size.height;
		this.internalImage = '';
		this.externalImage = '';
		this.instructions = '';
		this.buttonLabel = '';
		this.buttonContent = '';
		this.soundName = '';
		this.title = '';
		this.directions = '';
		this.currentTheme
		
		movieWidth = parseInt(size.width.split("px")[0]);
		movieHeight = parseInt(size.height.split("px")[0]);
			
		this.updateData();
		hinit();
		this.doUpdate();
		
		//Captivate Event listener
		evtHandle.addEventListener(mainCPNamespace.WINDOWRESIZECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
		evtHandle.addEventListener(mainCPNamespace.ORIENTATIONCHANGECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
		
		evtHandle.addEventListener(evtHandle.SLIDE_ENTER_EVENT, SlideEnterEventListener, false);
		evtHandle.addEventListener(evtHandle.SLIDE_EXIT_EVENT, SlideEnterEventListener, false);
		evtHandle.addEventListener(evtHandle.MOVIE_START_EVENT, SlideEnterEventListener, false);
		SlideEnterEventListener();
	
	},

	updateData: function() {
		var id = 0;
		var initresult = jQuery.parseXML(this.xmlStr);
		initresultDoc = jQuery(initresult);
		var thexml = initresultDoc.find('string').text();
		
		var jumptoVar = initresultDoc.find('#slide');
        if (jumptoVar){
            if (jumptoVar.find('string')){
                jumpto = jumptoVar.find('string').text();
            }
        }
		//jumpto = initresult.getElementById("slide").textContent
		
		var insidequizVar = initresultDoc.find('#insidequiz');
        if (insidequizVar){
            if (insidequizVar.find('string')){
                insidequiz = insidequizVar.find('string').text();
            }
        }
		//insidequiz = initresult.getElementById("insidequiz").textContent;
		
		var iminVar = initresultDoc.find('#imin');
        if (iminVar){
            if (iminVar.find('string')){
                imin = iminVar.find('string').text();
            }
        }
		//imin = initresult.getElementById("imin").textContent
		
		var isecVar = initresultDoc.find('#isec');
        if (isecVar){
            if (isecVar.find('string')){
                isec = isecVar.find('string').text();
            }
        }
		//isec = initresult.getElementById("isec").textContent
		
		var resvarVar = initresultDoc.find('#variable1');
        if (resvarVar){
            if (resvarVar.find('string')){
                resvar = resvarVar.find('string').text();
            }
        }
		//resvar = initresult.getElementById("variable1").textContent
		
		var messVar = initresultDoc.find('#mess');
        if (messVar){
            if (messVar.find('string')){
                mess = messVar.find('string').text();
            }
        }
		//mess = initresult.getElementById("mess").textContent
		
		var timewayVar = initresultDoc.find('#timeway');
        if (timewayVar){
            if (timewayVar.find('string')){
                timeway = timewayVar.find('string').text();
            }
        }
		//timeway = initresult.getElementById("timeway").textContent
		//Enhancements 101
		var bgselvar = initresultDoc.find('#bgsel');
        if (bgselvar){
            if (bgselvar.find('string')){
                bgsel = bgselvar.find('string').text();
            }
        }
		
		var txtSelectedColorHex = initresultDoc.find('#txtSelectedColorHex');
        if (txtSelectedColorHex){
            if (txtSelectedColorHex.find('string')){
                txtSelectedColor = '#' + txtSelectedColorHex.find('string').text();
            }
        }
		
		var bgSelectedColorHex = initresultDoc.find('#bgSelectedColorHex');
        if (bgSelectedColorHex){
            if (bgSelectedColorHex.find('string')){
                bgSelectedColor = '#' + bgSelectedColorHex.find('string').text();
            }
        }
		
		
		timeInSecs = parseInt(imin * 60) + parseInt(isec);
		if(timeway=="down"){
			totalTime = timeInSecs-1;
		}else{
			totalTime = timeInSecs;
		}
		whichslide = parent.cpInfoCurrentSlide;
	},

	doUpdate: function() {

		var allWidgets = window.parent.document.getElementsByClassName("cp-widget");
		var myFrameName = window.name;

		var myWidgetiFrame = window.parent.document.getElementById(window.name);
		if (myWidgetiFrame) {
			canvas.style.width = myWidgetiFrame.parentElement.parentElement.style.width
			canvas.style.height = myWidgetiFrame.parentElement.parentElement.style.height

		}

	}
};
timer_use = function() {
	return playbarUse1;
}

function updateSizeNPositionOnResizeComplete(){
	resizeInteraction(width,height);
}

function resizeInteraction(thewidth, theheight) {
	var scale = 0;
    thewidth = String(thewidth).replace("px", "");
    theheight = String(theheight).replace("px", "");
    if (thewidth < theheight){
        scale = thewidth / (movieWidth);
    } else{
        scale = theheight / (movieHeight);
    }
	var holdScale = scale
    var margins = Math.round(25 * scale);
    margins += "px"
    scale = "scale(" + scale + ")";
    $('#canvas').css('-webkit-transform', scale);
    $('#canvas').css('-moz-transform', scale);
    $('#canvas').css('-o-transform', scale);
    $('#canvas').css('-ms-transform', scale);
    $('#canvas').css('-webkit-transform-origin', '0 0');
	$('#canvas').css('-moz-transform-origin', '0 0');
    $('#canvas').css('-o-transform-origin', '0 0');
    $('#canvas').css('-ms-transform-origin', '0 0');
	$('#canvas').css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
}