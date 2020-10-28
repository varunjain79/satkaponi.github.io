
//holder arrays
var textArray = [];
var buttonArray = [];
var imageIDArray = [];
var soundIDArray = [];
var imageArray = [];
var soundArray = [];
var picAlignArray=[];
var color;
var face;
var style;
var size;
var align;

var contentStylessize;
var buttonStylessize;
var headerStylessize;
var instStylessize;

var contentStyles = new Object();
var buttonStyles = new Object();
var headerStyles = new Object();
var instStyles = new Object();
var generalStyles = new Object();
var width
var height
var handle

var isResponsiveProject = false;
var mainCPNamespace;
var evtHandle;
var myWidgetiFrame, myFrameName;
var scalefont;
var myWidgetiFrameLeft,myWidgetiFrameTop

accordionUse1 = {
	onLoad: function()
	{
		if ( ! this.captivate )
			return;
				handle = this.captivate.CPMovieHandle;
		//if(handle.isWidgetVisible() == true)
		//{

		if(typeof this.captivate.CPMovieHandle.isPresenter == 'function')
			isPresenter = this.captivate.CPMovieHandle.isPresenter();		
		this.movieProps = this.captivate.CPMovieHandle.getMovieProps();
		if ( ! this.movieProps )
			return;
			
		mainCPNamespace = this.movieProps.getCpHandle();
		isResponsiveProject = mainCPNamespace.responsive;	
		this.varHandle = this.movieProps.variablesHandle;
		//this.eventDisp = this.movieProps.eventDispatcher;
		evtHandle = this.movieProps.eventDispatcher;
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
		this.updateData();
		this.doUpdate();                                                             
		/*if (this.captivate.CPMovieHandle.pauseMovie ) {
			setTimeout("parent.cp.movie.pause(parent.cp.ReasonForPause.INTERACTIVE_ITEM)",100);
		}*/
		//Captivate Event listener
	
		evtHandle.addEventListener(mainCPNamespace.WINDOWRESIZECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
		evtHandle.addEventListener(mainCPNamespace.ORIENTATIONCHANGECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
		
		//}
	},

	updateData: function()
	{
		var id = 0;
		var initresult = jQuery.parseXML( this.xmlStr );
		var initresultDoc = jQuery( initresult );
		var thexml = initresultDoc.find( 'string' ).text();
		
		//Few lines of code added to cater to additions made fro theme colors and to retain the old XML structure 
		var tempStringStartLoc = thexml.indexOf("<");
		var tempStringEndLoc = thexml.lastIndexOf(">")+1;
		thexml = thexml.substring(tempStringStartLoc, tempStringEndLoc)
		//console.log(thexml)  
		
		var result = jQuery.parseXML( thexml );
		var resultDoc = jQuery( result );
		//alert(jQuery.isXMLDoc(resultDoc));
		
		var theButtons = resultDoc.find( 'buttons' ); 
		var theTextProps = resultDoc.find( 'textProperties' );
		var theContentProps = resultDoc.find( 'buttonContent' );
		var theButtonProps = resultDoc.find( 'buttonLabel' );
		var theHeaderProps = resultDoc.find( 'headerTitle' );
		var theInstProps = resultDoc.find( 'headerInst' );
		
		var getscalefont = initresultDoc.find('#scaleFonts');
        if (getscalefont){
            if (getscalefont.find('string')){
                scalefont = getscalefont.find('string').text();
            }
        }

		currentTheme = theTextProps.children('general').attr("themeNum");
		
		
		//setup styles
		contentStyles.color = theContentProps.children('color').attr("textColor");
		contentStyles.face = theContentProps.children('font').attr("face");
		contentStyles.italic = theContentProps.children('textDecoration').attr("italic");
		contentStyles.bold = theContentProps.children('textDecoration').attr("bold");
		contentStyles.size = theContentProps.children('font').attr("size");
		contentStyles.align = theContentProps.children('font').attr("align");
		
		buttonStyles.color = theButtonProps.children('color').attr("textColor");
		buttonStyles.textOver = theButtonProps.children('color').attr("textOver");
		buttonStyles.textDown = theButtonProps.children('color').attr("textDown");
		

		buttonStyles.face = theButtonProps.children('font').attr("face");
		buttonStyles.italic = theButtonProps.children('textDecoration').attr("italic");
		buttonStyles.bold = theButtonProps.children('textDecoration').attr("bold");
		buttonStyles.size = theButtonProps.children('font').attr("size");
		buttonStyles.align = theButtonProps.children('font').attr("align");		
		
		headerStyles.color = theHeaderProps.children('color').attr("textColor");
		headerStyles.face = theHeaderProps.children('font').attr("face");
		headerStyles.italic = theHeaderProps.children('textDecoration').attr("italic");
		headerStyles.bold = theHeaderProps.children('textDecoration').attr("bold");
		headerStyles.size = theHeaderProps.children('font').attr("size");
		headerStyles.align = theHeaderProps.children('font').attr("align");		
		
		instStyles.color = theInstProps.children('color').attr("textColor");
		instStyles.face = theInstProps.children('font').attr("face");
		instStyles.italic = theInstProps.children('textDecoration').attr("italic");
		instStyles.bold = theInstProps.children('textDecoration').attr("bold");
		instStyles.size = theInstProps.children('font').attr("size");
		instStyles.align = theInstProps.children('font').attr("align");				

		generalStyles.headerActive = theTextProps.children('general').attr("headerActive");
		//generalStyles.arrowColor = theTextProps.children('general').attr("arrowColor");
		//generalStyles.lineColor = theTextProps.children('general').attr("lineColor");
		generalStyles.headerColor = theTextProps.children('general').attr("headerColor");
		generalStyles.contentBodyColor = theTextProps.children('general').attr("contentBodyColor");
		generalStyles.bodyColor = theTextProps.children('general').attr("bodyColor");
		generalStyles.btnColorUp = theTextProps.children('general').attr("btnColorUp");
		generalStyles.btnColorOver = theTextProps.children('general').attr("btnColorOver");
		generalStyles.btnColorDown = theTextProps.children('general').attr("btnColorDown");
		
		
		contentStylessize = contentStyles.size;
		buttonStylessize = buttonStyles.size;
		headerStylessize = headerStyles.size;
		instStylessize = instStyles.size;
		
		//DIYeLearning&gt;&lt;textProperties&gt;&lt;general themeNum=&quot;1&q
		
		var that = this;
		//loop through each button node
		theButtons.children('button').each(function(index) {
			textArray.push( cleanIt(jQuery( this ).children('text').text()) );	
			buttonArray.push( cleanIt(jQuery( this ).children('buttonContent').text()) );	
			imageIDArray.push(that.grabAssetId(jQuery( this ).children('image')));	//grab image id
			soundIDArray.push(that.grabAssetId(jQuery( this ).children('sound')));	//grab sound id		
			picAlignArray.push(jQuery( this ).children('buttonContent').attr("picAlign"));		
		});
		
		//access other items on the stage
		this.title = resultDoc.find( 'general' ).attr("titleText");
		this.instructions = resultDoc.find( 'general' ).attr("instructionsText");
		
		
		///access audio and images
		for (num=0; num < imageIDArray.length; num++) {
			//first check images	
			id = imageIDArray[num];
			if (id != -1) { 
				imageArray[num] = this.movieProps.ExternalResourceLoader.getResourcePath( id )
				imageArray[num] = imageArray[num].replace("index.html", "");
			} else {
				imageArray[num] = -1;
			}
			//then check sound
			id = soundIDArray[num];	
			if (id != -1) { 
				soundArray[num] = this.movieProps.ExternalResourceLoader.getResourcePath( id )
		   		soundArray[num] = soundArray[num].replace("index.html", "");
			} else {
				soundArray[num] = -1;
			}
			
		}
	},
	
	grabAssetId: function(jqueryXMLNode)
	{
		var id = jqueryXMLNode.attr("id");
		if(id == -1)
			return -1;
		var nodeValue = jqueryXMLNode.text();	
		if(nodeValue == "")
			return parseInt(id);				//For captivate
		return nodeValue;						//For presenter
	},	
	
	doUpdate: function() 
	{
		myWidgetiFrame = getWidgetIFrame();
		myWidgetiFrameLeft = parseInt(String($($(myWidgetiFrame).parent().parent()).css("left")).replace("px",""));
		myWidgetiFrameTop = parseInt(String($($(myWidgetiFrame).parent().parent()).css("top")).replace("px",""));
		
		//$(myWidgetiFrame).hide();
		//init the default html values
		var divHtmlHeader = "<div class='header' tabindex='1000'><a>aaaa this button to see the response in the drop down box.</a></div>";
		var divHtmlContent = "<div class='content' tabindex='1001'>aaaa job! That was easy, wasn't it?</div>";
		
		//init the other elements on the page		
		var elem = document.getElementById('intTitle');
		elem.innerHTML = this.title;
		elem.tabIndex = '1000';
		elem = document.getElementById('intInstructions');
		elem.innerHTML = this.instructions;
		elem.tabIndex = '1001';

				
		var button_elem;
		var tabindex = 5000;
		jQuery.each(textArray, function(index, value) {	
			   
		   button_elem = document.getElementById('content_bg');
		   
		   button_elem.innerHTML += "<div class='header' id='btnHeader" + index + "' tabindex='"+tabindex+"'><a id='" + index + "'>" + textArray[index] + "</a></div>";
		   
		   
		  //check if image exists, if so add it
		   if (imageArray[index] == "-1") { 
		   		button_elem.innerHTML += "<div class='content scroll-pane' id='" + index + "' tabindex='"+(tabindex+1)+"'>" + buttonArray[index] + "</div>";
		   } else { 
				button_elem.innerHTML += "<div class='content scroll-pane' id='" + index + "' tabindex='"+(tabindex+1)+"'><img hspace='15' width='150' align='" + picAlignArray[index] + "' height='100' src='" + imageArray[index] + "'/>" + buttonArray[index] + "</div> ";
		   }
		   
		   //button_elem.firstElementChild.innerHTML +="<div class='accessibility' style='position:fixed;left:-1999px;opacity:0;width:0px;height:0px;' id='" + index + "' ><p>"+textArray[index] + buttonArray[index] +"</p></div>"
		   tabindex = tabindex + 3
 		 });
		
		//setTimeout("setupScrollbar()",0);
	
		changeTheme("themes/accordionTheme" + currentTheme + ".css", "themes/headerTheme" + currentTheme + ".css" );
		setupCustomStyles();
		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".content", contentStyles)
		setupStyle(".header a", buttonStyles)

		firstLoad = true;
		resizeInteraction(width,height);
		addClickHandlers(); //setup the click handlers
		updateSizeNPositionOnResizeComplete()
	}
};
		
function updateSizeNPositionOnResizeComplete(){
	firstLoad = false;
	resizeInteraction(width,height);
}

/*initializes scrollbar*/
function setupScrollbar(){
	$('.scroll-pane').jScrollPane();
}


accordion_use = function ()
{
	return accordionUse1;
}

