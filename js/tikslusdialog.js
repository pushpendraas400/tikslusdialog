//tikslus dialogs
//author pushpendra chouhan @tikslus.com
//show modal dialogs 


(function ($) {

//create dialog
$.fn.tdialog = function(options) {


//var dbuttons=[];
var chandle;
var defaults = {
   type: 'window', //can be window,prompt,alert,warning,error,info,confirm
   title: '', //title of the dialog
   content: '',//message or content 
   icon:'',//icon: can be help,info,error,warning,confirm
   promptCallback:function(){},
   confirmCallback:function(){},
   position:'center', //can be center,top,bottom,top left,bottom left, top right, bottom right,center left, center right
   effect:'fade', //can be fade,slide,css3 css3 added in 1.1
   css3EffectIn:'', //added in 1.1
   css3EffectOut:'', //added in 1.1       
   titleBar:true,//true:show title bar false: hide title bar
   showButtons:true,//true: show buttons false:hide buttons
   showOverlay:true,//true: show overlay in background
   closeKey:true,// true: use esc key from keyboard to close dialog
   closeOverlay:true,//ture: close dialog on clicking overlay
   autoCloseInterval:3000,
   autoClose:false,
   animationSpeed:300,
   draggable:true,
   showClose:true,
   showMinimize:false
   }	


  // Extend our default options with those provided.
  var options = $.extend(defaults, options);
  // Our plugin implementation code goes here.
  if($("#tdialog").length)//if dialog is already present remove it
  {
  $("#tdialog").remove();
  }
$("body").append('<div id="tdialog"><div class="wrapper_up"><div class="title"></div><div id="icon"></div><div class="controls"></div></div><div id="content_wrapper"><div class="content"></div><div class="buttons"></div></div></div>');



$("#tdialog").find(".title").html("");
$("#tdialog").find(".content").html("");
$("#tdialog").find(".buttons").html("");
if(options.icon=="")
{
$("#tdialog").find("#icon").remove();
$("#tdialog").find(".title").css("padding-left","5px");
}
else
{
$("#tdialog").find(".title").css("padding-left","42px");
}

if(options.titleBar==false)
{
$("#tdialog").find(".title").remove();
$("#tdialog").find("#icon").remove();
}

if(options.showClose==true)
{
$("#tdialog .controls").append('<a href="#" class="cross"></a>');
}

if(options.showMinimize==true)
{
$("#tdialog .controls").append('<a href="#" class="minimize"></a>');
}



  //Create overlay
  $.fn.toverlay=function()
  {
var screen_width;
var screen_height;
screen_width=screen.width;
screen_height=$(document).height();
var bk="<div id='bk_overlay' style='width:" + screen_width + "px;height:" + screen_height + "px;z-index:1002;top:0px;left:0px;position:fixed;' class='outer-overlay'></div>";
if($("#bk_overlay").length==0)
{
$("body").append(bk);

}
  }
  ////////////////////////////////////////////////
  //taken from http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
  // All credits go to them
/*
  1.  Append two dives to the body and position them off screen
   2. Measure the width of the inner div
   3. Set the outer div to overflow
   4. Measure the width of the inner div (again)
   5. Remove the divs
   6. Return the difference of the two widths
 */
 
 function scrollbarWidth() {
    var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
    // Append our div, do our calculation and then remove it
    $('body').append(div);
    var w1 = $('div', div).innerWidth();
    div.css('overflow-y', 'scroll');
    var w2 = $('div', div).innerWidth();
    $(div).remove();
    return (w1 - w2);
}
  
  
  
  
$("#tdialog").find(".content").html(options.content);

  if(options.title)
{
$("#tdialog").find(".title").html(options.title);
}
if(options.icon)
{
$("#tdialog").find("#icon").removeClass().addClass(options.icon);
}
else
{
$("#tdialog").find("#icon").removeClass();
}

if(options.width)
{
$("#tdialog .content").css('min-width',options.width + 'px');
}
else
{
$("#tdialog .content").css('min-width','360px');
}


if(options.height)
{
$("#tdialog .content").css('min-height',options.height + 'px');
}
else
{
$("#tdialog .content").css('min-height','50px');
}
///////////////////////////////////////////////////
  
  //show overlay
$.fn.showoverlay=function()
{
    //$("body").addClass("bodyoverlay");
	

$.fn.toverlay();



$('#bk_overlay').show();

}  
  
//create buttons  
function CreateButtons()
  {
		var buttonHTML = '';
	
		if(options.buttons)
		{
		$.each(options.buttons,function(name,obj){

			// Generatr markup for the buttons:
	
			buttonHTML += '<li><a href="#" class="button '+obj['button_class']+'">'+name+'<span></span></a></li>';
			if(!obj['action']){
				obj['action'] = function(){};
			}
			
			
		});  
		
		}
		
		
		if(buttonHTML=="" || buttonHTML==undefined || buttonHTML==null)
	return(false);
		else
		return('<ul>'+buttonHTML+'</ul>');
  }
  
//Creates a dialog box
//param dtype can be info,error,warning,window,confirm,alert,prompt
  $.fn.dialog=function(dtype)
  {
 
var btns='';
if(options.showButtons==true) //if showButtons parameter is set
{
btns=CreateButtons();//create buttons
}



  switch(dtype)
  {
  case "info":
  if((btns=="" || btns==undefined) && options.showButtons==true) //create 'Ok' button for info dialog only if user hasn't provided buttons parameter and showButtons is set to true
  {
  btns="<ul><li><a href='#' class='button_ok'>Ok</a></li></ul>";
  
  }
   $("#tdialog").find(".buttons").html("").append(btns);//append Ok button to the dialog
   $("#tdialog").find("#icon").addClass('info');
   if(!options.title)
   {
   $("#tdialog").find(".title").html("Information");// set title to 'Information'
  }
  break;
  
  case "error":

    if((btns=="" || btns==undefined) && options.showButtons==true)//same as above
  {
  btns="<ul><li><a href='#' class='button_ok'>Ok</a></li></ul>";
  
  }

   $("#tdialog").find(".buttons").html("").append(btns);
   $("#tdialog").find("#icon").addClass('error');
   $("#tdialog").find(".title").html("Error");
   break;
   
     case "alert":

    if((btns=="" || btns==undefined) && options.showButtons==true)//same as above
  {
  btns="<ul><li><a href='#' class='button_ok'>Ok</a></li></ul>";
  
  }

   $("#tdialog").find(".buttons").html("").append(btns);
   $("#tdialog").find("#icon").addClass('alert');
   $("#tdialog").find(".title").html("Alert");
   break;
   
        case "warning":

    if((btns=="" || btns==undefined) && options.showButtons==true)//same as above
  {
  btns="<ul></li><a href='#' class='button_ok'>Ok</a></li></ul>";
  
  }

   $("#tdialog").find(".buttons").html("").append(btns);
   $("#tdialog").find("#icon").addClass('warning');
   $("#tdialog").find(".title").html("Warning");
   break;
   
   
     case "confirm":

    if((btns=="" || btns==undefined || btns==false) && options.showButtons==true)//create 'Confirm' & 'Cancel' buttons for confirm dialog only if user hasn't provided buttons parameter and showButtons is set to true
  {
  btns="<ul><li><a href='#' class='button_confirm'>Confirm</a></li><li><a href='#' class='button_cancel'>Cancel</a></li></ul>";
  
  }

   $("#tdialog").find(".buttons").html("").append(btns);
   $("#tdialog").find("#icon").addClass('confirm');
   $("#tdialog").find(".title").html("Confirm");
   break;
  
  
       case "window":

    if((btns=="" || btns==undefined) && options.showButtons==true)//create Ok button
  {
  btns="<ul><li><a href='#' class='button_ok'>Ok</a><li></ul>";
  
  }

   $("#tdialog").find(".buttons").html("").append(btns);
  
   $("#tdialog").find(".title").html(options.title);
   
   break;
   
   case "prompt":
       if((btns=="" || btns==undefined) && options.showButtons==true)//create ok and cancel buttons
  {
  btns="<ul><li><a href='#' class='button_ok'>Ok</a></li><li><a href='#' class='button_cancel'>Cancel</a></li></ul>";
  
  }
   var con;
   if(options.content)
   {
   con= $("#tdialog").find(".content").html()+ "<input type='text' id='prompt' value=''>";
   }
   else
   {
   con= "<input type='text' id='prompt' value=''>";
   }
   
   $("#tdialog").find(".buttons").html("").append(btns);
    $("#tdialog").find(".title").html(options.title);
   
   $("#tdialog").find(".content").html(con);

   
  break;
  }


  
}


//close dialog and overlay
$.fn.closeTdialog=function()
{

//$('#tdialog').fadeOut("slow");

if(options.effect=="slide")
{
if((options.position).indexOf("center")>=0|| (options.position).indexOf("top")>=0)
{

$('#tdialog').css("display","block").animate({top:-($("#tdialog").height()+10)},options.animationSpeed).fadeOut("slow");
}

if((options.position).indexOf("bottom")>=0)
{
$('#tdialog').css("display","block").animate({top:$(window).height()+$("#tdialog").width()},options.animationSpeed).fadeOut("slow");
//$('#tdialog').css({"top":$(window).height()+10 + "px",'display':'block'});

}

}
else if(options.effect=="slide left")
{
$('#tdialog').css("display","block").animate({left:screen.width+($("#tdialog").width()+10)},options.animationSpeed).fadeOut("slow");
}
else if(options.effect=="slide right")
{
$('#tdialog').css("display","block").animate({left:-($("#tdialog").width()+10)},options.animationSpeed).fadeOut("slow");
}
else if(options.effect=="css3"){
$("#tdialog").removeClass(options.css3Effectin).addClass("animated").addClass(options.css3EffectOut).fadeOut("slow");
}
else
{
$("#tdialog").fadeOut("slow");
}

$("#bk_overlay").fadeOut("fast");
window.clearInterval(chandle);
//$("body").removeClass("bodyoverlay");

}






switch(options.type)
{
case "confirm":
$.fn.dialog('confirm');
break;

case "info":
$.fn.dialog('info');

break;

case "error":

$.fn.dialog('error');
break;

case "alert":

$.fn.dialog('alert');
break;

case "warning":

$.fn.dialog('warning');
break;

case "window":

$.fn.dialog('window');
break

case "prompt":
$.fn.dialog('prompt');
break;

default:
$.fn.dialog('window');
}


var wrapper_up_width=$("#tdialog").css("width");
$("#tdialog").find(".wrapper_up").css("width",wrapper_up_width);


//calcualte left and top for the dialog box according to user supplied values for position and effect paarameters
var dleft;
var dtop;
dleft= ($(window).width() - $("#tdialog").width() ) / 2+$(window).scrollLeft();

if(options.position=="top")
{
dtop=0;
}
else if(options.position=="bottom")
{
dtop=($(window).height() - $("#tdialog").outerHeight()) + $(window).scrollTop()-scrollbarWidth();
}
else if(options.position=="top right")
{
dleft= $(window).width() - $("#tdialog").width() +$(window).scrollLeft() - scrollbarWidth();
dtop=0;
}
else if(options.position=="top left")
{
dleft= 2;
dtop=0;
}
else if(options.position=="bottom left")
{
dleft= 2;
dtop=($(window).height() - $("#tdialog").outerHeight()) + $(window).scrollTop()-scrollbarWidth();

}
else if(options.position=="bottom right")
{
dtop=($(window).height() - $("#tdialog").outerHeight()) + $(window).scrollTop()-scrollbarWidth();
dleft= $(window).width() - $("#tdialog").width() +$(window).scrollLeft() - scrollbarWidth();
}
else if(options.position=="center left")
{
dtop=(($(window).height() - $("#tdialog").outerHeight())/2) + $(window).scrollTop();
dleft= 2;
}
else if(options.position=="center right")
{
dtop=(($(window).height() - $("#tdialog").outerHeight())/2) + $(window).scrollTop();
dleft= $(window).width() - $("#tdialog").width() +$(window).scrollLeft() - scrollbarWidth();
}

else
{
dtop=(($(window).height() - $("#tdialog").outerHeight())/2) + $(window).scrollTop();
}


 //var dleft=$(window).width()/2-$("#tdialog").width()/2;
$("#tdialog").css("top",dtop+"px");
$("#tdialog").css("left",dleft + "px");
$("#tdialog").addClass("shadow");

if(options.showOverlay==true) //display overlay only when showOverlay property is set to true
{
$.fn.showoverlay();
}

if(options.effect=="fade")
{
$('#tdialog').fadeIn("slow");
}
else if(options.effect=="slide")
{
if((options.position).indexOf("center")>=0|| (options.position).indexOf("top")>=0)
{
$('#tdialog').css({"top":-$("#tdialog").height()+10,'display':'block'});
}

if((options.position).indexOf("bottom")>=0)
{

$('#tdialog').css({"top":$(window).height()+10 + "px",'display':'block'});

}

$('#tdialog').css("display","block").animate({top:dtop},options.animationSpeed);

}
else if(options.effect=="slide left")
{
$('#tdialog').css({"left":screen.width,'display':'block'});
$('#tdialog').css("display","block").animate({left:dleft},options.animationSpeed);
}
else if(options.effect=="slide right")
{
$('#tdialog').css({"left":-$("#tdialog").width(),'display':'block'});
$('#tdialog').css("display","block").animate({left:dleft},options.animationSpeed);
}
else if(options.effect=="css3"){
$("#tdialog").addClass("animated").show().addClass(options.css3EffectIn);    
}

else
{
$('#tdialog').fadeIn("slow");
}

$("#tdilaog").css({position:'fixed'});


if(options.autoClose==true)
{
chandle=setInterval("$.fn.autoCloseDialog();",options.autoCloseInterval);
}

$.fn.autoCloseDialog=function()
{
$.fn.closeTdialog();
window.clearInterval(chandle);
}


//drag related functions
var dragging=false;	
var coord= new Object();	
var ctop,cleft;
if(options.draggable)
{
$("#tdialog .title").bind('mousedown',function(e) {
coord={
oleft:$("#tdialog").position().left,
otop:$("#tdialog").position().top,
ox: (e.pageX || e.screenX),
oy: (e.pageY || e.screenY)
};
e.preventDefault();
dragging = true;
});


$(document).mouseup(function(e) {
dragging = false;
$("body").css("cursor", "default");

});

$(document).mousemove(function(e) {

if(dragging) {
$("body").css("cursor", "move");
cleft=coord.oleft + (e.pageX || e.screenX) - coord.ox;
ctop=coord.otop + (e.pageY || e.screenY) - coord.oy;
$("#tdialog").css("left",cleft + "px");
$("#tdialog").css("top",ctop + "px");
}
});

}



//event handling for default created 'Ok' and 'Cancel' buttons
//will try to execute any callback if supplied, otherwise just closes the dialog
$(".button_ok").click(function(e){
e.preventDefault();
if(options.type=="prompt")
{
   if(options.promptCallback &&  typeof options.promptCallback == 'function')
   {
   options.promptCallback(undefined != arguments[0] ? arguments[0] : '');
   }
}
$.fn.closeTdialog();

});

$(".button_cancel").click(function(e){
e.preventDefault();
$.fn.closeTdialog();
});

			//event handling for confirm button
			//will try to execute any callback if supplied, otherwise just closes the dialog
		$(".button_confirm").click(function(e){
e.preventDefault();
			$('#tdialog').fadeOut("slow");
			   if(options.confirmCallback &&  typeof options.confirmCallback == 'function')
   {
   options.confirmCallback(undefined != arguments[0] ? arguments[0] : '');
    
   }
   
$.fn.closeTdialog();
			});
			
$("#tdialog a.cross").click(function(e){	
e.preventDefault();
$.fn.closeTdialog();
});	

$("#tdialog a.minimize").click(function(e){	
e.preventDefault();
$.fn.tdialog.minimizeDialog();
});		

		
	
	
//close dialog on clicking overlay if closeOverlay property is set to 'true'
$("#bk_overlay").click(function(){
if(options.closeOverlay==true)
$.fn.closeTdialog();
});			

//keypress event handling
//close dialog on pressing 'esc' key if closeKey property is set to 'true'
$(document).keypress(function(e){
//works only when dialog is shown
if($("#tdialog").css("display")=="block")
{
 var code = (e.keyCode ? e.keyCode : e.which);
 switch(code)
{
case 27: //escape key
if(options.closeKey==true)
$.fn.closeTdialog();
break;
}
}
});

	

		//event handling for user created buttons
		//try to execute callback if any and close the dialog
		var tbuttons = $('#tdialog .button');
			var i = 0;
		$.each(options.buttons,function(name,obj){
	
			tbuttons.eq(i).click(function(){

				// Calling the action attribute when a
				// click occurs, and hiding the confirm.
				
			//obj.action(undefined != arguments[0] ? arguments[0] : '');
				obj.action();
				$.fn.closeTdialog();
				return false;
			});
			
			i++;
		});



		
}
$.fn.tdialog.tScreenWidth=function(adjust)
{
return($(window).width()-adjust);
}		
		
$.fn.tdialog.tScreenHeight=function(adjust)
{
return($(window).height()-adjust);
}

$.fn.tdialog.minimizeDialog=function()
{
if($("#tdialog .controls").find(".minimize").hasClass('maximize'))
{

$("#tdialog #content_wrapper").slideDown();
$("#tdialog .controls").find(".minimize").removeClass('maximize');
}
else
{
$("#tdialog #content_wrapper").slideUp();
$("#tdialog .controls").find(".minimize").addClass("maximize");
}
}


	
})(jQuery);
