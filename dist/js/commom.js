var isIE6		= navigator.appVersion.indexOf("MSIE 6.0") > -1;
if (top!=self){
	try{
		var strHref=top.location.href.toLowerCase();
		if(strHref.indexOf("http://www.no5.com.cn")==-1&&strHref.indexOf("http://192.168.0.203")==-1&&strHref.indexOf("http://123.103.13.224")==-1&&strHref.indexOf("http://123.103.13.225")==-1){
			top.location=self.location;
		}
	}
	catch(e){
		top.location=self.location;
	}
}
var browser="";
var browserVersion="";
window.name="";

if(window.ActiveXObject){
	browser="ie";
	if (navigator.userAgent.indexOf("MSIE 7.0")!=-1){browserVersion="ie7";}
	else if (navigator.userAgent.indexOf("MSIE 6.0")!=-1){browserVersion="ie6";}
}
else{browser="ns";}

function Request_Ajax(url){
	var ReturnText=""
	if (window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open ("get",url,false);
		xmlHttp.send(null);
		if (xmlHttp.status==200){
			ReturnText=xmlHttp.responseText;
		}
	} 
	else if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		xmlHttp.open ("get",url,false);
		xmlHttp.send();
		if (xmlHttp.status==200){
			ReturnText=xmlHttp.responseText;
		}
	}
	else{
		return;
	}
	return ReturnText;
}

function filtersbc(ctl){
	var returnstr="",charcode;
	var str=new String(ctl.value)
	for (var i=0;i<=str.length-1;i++){
		charcode=str.charCodeAt(i);
		if(charcode>=65295&&charcode<=65305){
			returnstr+=String.fromCharCode(charcode-65248);
		}
		else{
			returnstr+=str.charAt(i);
		}
	}
	ctl.value=returnstr;
}

function showtip(tip,relobj,str){
	tip.innerHTML="";
	str=str+"<br><a href=javascript:; onclick=javascript:document.getElementById('cart_tip').style.visibility='hidden'>[ 关闭 <span id='cart_cd'></span> ]</a>";
	tip.innerHTML=str;
	with(tip.style){
		left=(getElementPoint(relobj).x+relobj.offsetWidth)+"px";
		top=getElementPoint(relobj).y+"px";
		visibility="visible";
	}
}

function showtip2(tip,relobj,str,offsetleft){
	tip.innerHTML=str;
	with(tip.style){
		left=parseInt(getElementPoint(relobj).x-120-offsetleft)+"px";
		top=parseInt(getElementPoint(relobj).y+20)+"px";
		visibility="visible";
	}
}

function hideprotip(){
	if (!flag_tip2){
		setTimeout("hideprotip()","5000");
		return;
	}
	document.getElementById('pro_tip').style.visibility="hidden";
}

function addtofav(proid,btn,offsetleft){
	var tip=document.getElementById("pro_tip");
	var url="/addtofav.asp?proid="+proid;
	var str=""
	new Ajax.Request(
		"/addtofav.asp?proid="+proid+"&t=" + new Date().getTime(),{
			method:"get",
			onComplete:function(xhr){
				var ret=xhr.responseText;
				switch(ret){
					case "0":
						str="您还没有登录，不能将商品加入收藏夹，是否现在登录？<br /><a href='/customer/login.html?ReturnUrl=/addtofav.asp?act=1{boundsymbol}proid="+proid+"'>[登录]</a> <a href='javascript:;' onclick=javascript:document.getElementById('pro_tip').style.visibility='hidden';>[取消]</a>";
						showtip2(tip,btn,str,offsetleft);
						break;
					case "1":
						str="该商品在您的收藏夹中已经存在。<br /><a href='/customer/account_item.html?item=fav'>[查看收藏夹]</a> <a href='javascript:;' onclick=javascript:document.getElementById('pro_tip').style.visibility='hidden';>[关闭]</a>"
						showtip2(tip,btn,str,offsetleft);
						break;
					case "2":
						str="商品已经成功加入您的收藏夹。<br /><a href='/customer/account_item.html?item=fav'>[查看收藏夹]</a> <a href='javascript:;' onclick=javascript:document.getElementById('pro_tip').style.visibility='hidden';>[关闭]</a>"
						showtip2(tip,btn,str,offsetleft);
						break;
				}
			}
		}
	);
}

function chknumstring(str){
	if (str==""){
		return false;
	}
	var chknum="0123456789";
	for (var i=0;i<=str.length-1;i++){
		if (chknum.indexOf(str.charAt(i))==-1){
			return false;
		}
	}
  return true;
}

function addtocart(proid){
	var url="/shopping/checkout_addtocart.asp?productid="+proid;
	var w=window.screen.availWidth-30;
	var h=window.screen.availHeight-160;
	var l=10;
	var t=parseInt((window.screen.availHeight-h)/2)-70;
	var cart=window.open (url,"shoppingcar","width="+w+",height="+h+",top="+t+",left="+l+",menubar=1,location=1,toolbar=1,scrollbars=1,resizable=1");
	cart.focus();
}

function commendproduct(proid){
	var relobj=document.getElementById("btncommend");
	var l=getElementPoint(relobj).x-150;
	var t=getElementPoint(relobj).y+20
	with(document.getElementById("pro_commend")){
		style.visibility="visible";
		style.top=t+"px";
		style.left=l+"px";
		style.width="299px";
		style.height="350px";
		innerHTML="<iframe src='/commend.asp?productid="+proid+"' frameborder='0' marginwidth='0' marginheight='0' width='299' height='350'></iframe>"
	}
	window.scrollTo(0,220);
}

function getElementPoint(el){   
	for(var lx=0,ly=0;el!=null;lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent);
	return{x:lx,y:ly}   
}

function hotsearch(str){
	with (document.SearchForm){
		category.selectedIndex=0;
		act.value=1
		keyword.value=str;
		submit();
	}
}

/*document.oncontextmenu = function(e){
	if (browser=="ie"){
		if (event.srcElement.tagName=="IMG"){
			return false;
		}
	}else{
		if (e){
			if(e.target=="[object HTMLImageElement]"){
				return false;
			}
		}
	}
	//return !((e||event).cancelBubble = true); 
}*/

function isDate(dateStr){ 
	var datePat = /^(\d{4})(\-)(\d{1,2})(\-)(\d{1,2})$/;
	var matchArray = dateStr.match(datePat);
	if (matchArray == null) return false; 
	var month = matchArray[3];
	var day = matchArray[5]; 
	var year = matchArray[1]; 
	if (month < 1 || month > 12) return false; 
	if (day < 1 || day > 31) return false; 
	if ((month==4 || month==6 || month==9 || month==11) && day==31) return false; 
	if (month == 2){
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); 
		if (day > 29 || (day==29 && !isleap)) return false; 
	} 
	return true;
}

function OpenService(flag){
	var w=700,h=500;
	var t=(window.screen.availHeight-h)/2;
	var l=(window.screen.availWidth-w)/2;
	try{
		ServiceWindow=window.open ("/OnLineService_2011/RedirectToNewChat.asp?actflag=" + flag,"ols2009","width="+w+",height="+h+",top="+t+",left="+l+",scrollbars=0,menubar=0,resizable=0,toolbar=0,resizable=0");
		ServiceWindow.focus();
	}
	catch(err){
		return true;
	}
	return false;
}

function Feedback(action){
	OpenService(action+1);
}

function cTrim(obj,iType){
	var sInputString=obj.value;
	var sTmpStr = ' ';
	var i = -1;
	if(iType == 0 || iType == 1){
		while(sTmpStr == ' '){
			++i;
			sTmpStr = sInputString.substr(i,1);
		}
		sInputString = sInputString.substring(i);
	}
	if(iType == 0 || iType == 2){
		sTmpStr = ' ';
		i = sInputString.length;
		while(sTmpStr == ' '){
			--i;
			sTmpStr = sInputString.substr(i,1);
		}
		sInputString = sInputString.substring(0,i+1);
	}
	obj.value=sInputString;
}

String.prototype.HalfAngle=function(){
	var RetStr="",charcode;
	var chkstr="！＠＃＄％＾＆＊（）｛｝［］：＂；＇，．＜＞／？－＝＋＿";
	var str=new String(this)
	for (var i=0;i<=str.length-1;i++){
		charcode=str.charCodeAt(i);
		if(charcode>=65295&&charcode<=65305||charcode>=65345&&charcode<=65370||charcode>=65313&&charcode<=65338){
			RetStr+=String.fromCharCode(charcode-65248);
		}
		else if(chkstr.indexOf(str.charAt(i))!=-1){
			RetStr+=String.fromCharCode(charcode-65248);
		}
		else{
			RetStr+=str.charAt(i);
		}
	}
	return RetStr;
}

String.prototype.ToAddress=function(){
	var RetStr="",charcode;
	var chkstr="!@#$%^&*()_+{}|:\"<>?-=[];',./\\";
	var str=new String(this)
	for (var i=0;i<=str.length-1;i++){
		charcode=str.charCodeAt(i);
		if(charcode>=65295&&charcode<=65305||charcode>=65345&&charcode<=65370||charcode>=65313&&charcode<=65338){
			RetStr+=String.fromCharCode(charcode-65248);
		}
		else if(chkstr.indexOf(str.charAt(i))!=-1){
			RetStr+=String.fromCharCode(charcode+65248);
		}
		else{
			RetStr+=str.charAt(i);
		}
	}
	return RetStr;
}

String.prototype.trim = function() {
  var matches = this.match(/^\s+/);
  var prefixLength = (matches == null) ? 0 : matches[0].length;
  matches = this.match(/\s+$/);
  var suffixLength = (matches == null) ? 0 : matches[0].length;
  return this.slice( prefixLength, this.length - suffixLength );
}

function fv(obj){
	var v=obj.value
	obj.value=v.HalfAngle().trim();
}

function getRandString(){
	var ret=Math.round(Math.random()*1000000);
	ret=ret+""+gettimenum();
	return ret;
}

function gettimenum(){
	var curdate=new Date();
	return curdate.getTime();
}
function bodyClick(event){
	var x=event.clientX;
	var y=event.clientY;
	for (var i=0;i<=10;i++){
		hidelayer(i,x,y);
	}
}
function hidelayer(flag,mouseX,mouseY){
	var layer;
	var StayFlag=false;
	switch(flag){
		case 0:
			StayFlag=true;
			layer=$("cart_wait");
			break;
		case 1:
			layer=$("pro_tip");
			break;
		case 2:
			StayFlag=true;
			layer=$("antupdtip");
			break;
		default:
			break;
	}
	if(layer){
		if (layer.style.visibility!="visible"){return;}
		if (mouseX&&mouseY){
			var ll=getElementPoint(layer).x;
			var lt=getElementPoint(layer).y;
			if(mouseX>=ll&&mouseX<=ll+layer.offsetWidth&&mouseY>=lt&&mouseY<=lt+layer.offsetHeight){
				return;
			}
			if(StayFlag&&clknum1<2){
				clknum1+=1
				return;
			}else{
				clknum1=1;
			}
			layer.style.visibility="hidden";
		}
		else{
			layer.style.visibility="hidden";
		}		
	}
}
function oosreg(proid){
	window.location.href="/oosregister_" + proid + ".html";
}
function syserrmsg(){
	alert("报歉！由于系统错误导致操作失败，请尝试重新操作或与我们的客服中心联系。")
}
function BodyMask(){
	var layer=$("layermask");
	if (layer){
		layer.innerHTML="<div id='mask_back'></div>";
		with($("mask_back").style){
			zIndex=98;
			width=document.documentElement.scrollWidth+"px";
			height=document.documentElement.scrollHeight+"px";
		}
	}
}
function showMask(isParent){
	var doc = (isParent) ? parent.document : document;	
	with (doc.getElementById("lyrMask").style){
		if(isIE6){
			var tmr = window.setInterval(function(){
				width = doc.body.clientWidth + "px";
				height = ((doc.documentElement.clientHeight == 0) ? doc.body.clientHeight : doc.documentElement.clientHeight) + "px";				
				if (visibility != "visible") window.clearInterval(tmr);
			}, 100);			
		}
		visibility = "visible";
	}	
}