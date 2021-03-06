/*
 * 
 * ele：元素
 * IE8及以下不支持
 * 
 * 
 * */
function fixdeFooter(ele) { //判断是否有滚动条，没有则固定foot
	$(document).scrollTop(1)
	if($(document).scrollTop() <= 0) {
		//		loginHeight()
		ele.css({
			'position': 'absolute',
			'bottom': '0'
		})
	} else {
		ele.css({
			'position': 'relative'
		})
	}
	$(document).scrollTop(0)
}
/*
 * 
 * ele：自适应高度的元素，
 * img：背景图，string类型
 * tbHeight：顶部与底部总和的高度，没有默认为0
 * IE8及以下不支持
 * 
 * */
function loginHeight(ele, img, tbHeight) { //登录界面背景图自适应高度
	if(ele.length <= 0) {
		return false;
	}
	tbHeight ? tbHeight : 0
	var loginHeight;
	if(document.defaultView == undefined) {
		loginHeight = document.documentElement.clientHeight - tbHeight
		ele.css({
			'height': loginHeight,
			'background-size': 'cover',
			'-moz-background-size': '100% ' + loginHeight + 'px'
		})
	} else {
		loginHeight = document.defaultView.innerHeight - tbHeight
		ele.css({
			'height': loginHeight,
			'background-size': 'cover',
			'-moz-background-size': '100% ' + loginHeight + 'px'
		})
	}
}

/*
 * 
 * 
 * 浏览器窗口缩放触发的函数
 * IE8及以下不支持
 * 
 * 
 * */
window.onresize = function() { //浏览器窗口缩放
	fixdeFooter() //判断是否有滚动条，没有则固定foot
}

/*
 * 
 * 
 * canvas制图
 * canvas：canvas DOM
 * 
 * 
 * */
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

/*
 * 
 * 
 * 判断是否引用layui,加载模块
 * 
 * 
 * */
if(typeof(layui) != 'undefined') {
	var layer, laydate
	layui.use(['layer', 'laydate'], function() {
		laydate = layui.laydate
		layer = layui.layer
		layer.config({
			resize: false,
		})
	})
}

/*
 * 
 * 
 * 获取日期
 * begin: 起始时间
 * end: 结束时间,可选参数，默认为当前日期
 * b: 布尔类型，是否加入小时
 * 
 * */
//获取当前日期 例：2018-01-01
Date.prototype.format = function(b) {
	var s = '';
	var h = ''; //小时
	s += this.getFullYear() + '-'; // 获取年份。
	s += (this.getMonth() + 1)  < 10 ? '0' + (this.getMonth() + 1) + "-" : (this.getMonth() + 1) + "-"; // 获取月份。
	s += this.getDate() < 10 ? '0' + this.getDate() : this.getDate(); // 获取日。
	h += this.getHours() < 10 ? '0' + this.getHours() : this.getHours() //小时
	h += ':00'
	if (b) {
		return (s + " " + h)
	}
	return (s) // 返回日期。
};

//按日查询
function getDayAll(begin, end) {
	end = end ? end : new Date().format()
	var dateAllArr = new Array();
	var ab = begin.split("-");
	var ae = end.split("-");
	var db = new Date();
	db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
	var de = new Date();
	de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
	var unixDb = db.getTime();
	var unixDe = de.getTime();
	for(var k = unixDb; k <= unixDe;) {
		dateAllArr.push((new Date(parseInt(k))).format().toString());
		k = k + 24 * 60 * 60 * 1000;
	}
	return dateAllArr;
}

//按周查询
function getWeekAll(begin, end) {
	end = end ? end : new Date().format()
	var dateAllArr = new Array();
	var ab = begin.split("-");
	var ae = end.split("-");
	var db = new Date();
	db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
	var de = new Date();
	de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
	var unixDb = db.getTime();
	var unixDe = de.getTime();
	for(var k = unixDb; k <= unixDe;) {
		dateAllArr.push((new Date(parseInt(k))).format().toString());
		k = k + 7 * 24 * 60 * 60 * 1000;
	}
	return dateAllArr;
}

function getMonthAll(begin, end) {
	end = end ? end : new Date().format()
	var d1 = begin;
	var d2 = end;
	var dateArry = new Array();
	var s1 = d1.split("-");
	var s2 = d2.split("-");
	var mCount = 0;
	if(parseInt(s1[0]) < parseInt(s2[0])) {
		mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1]) + 1;
	} else {
		mCount = parseInt(s2[1]) - parseInt(s1[1]) + 1;
	}
	if(mCount > 0) {
		var startM = parseInt(s1[1]);
		var startY = parseInt(s1[0]);
		for(var i = 0; i < mCount; i++) {
			if(startM < 12) {
				dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
				startM += 1;
			} else {
				dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
				startM = 1;
				startY += 1;
			}
		}
	}
	return dateArry;
}

function getYearAll(begin, end) {
	end = end ? end : new Date().format()
	var d1 = begin;
	var d2 = end;
	var dateArry = new Array();
	var s1 = d1.split("-");
	var s2 = d2.split("-");
	var mYearCount = parseInt(s2[0]) - parseInt(s1[0]) + 1;
	var startY = parseInt(s1[0]);
	for(var i = 0; i < mYearCount; i++) {
		dateArry[i] = startY;
		startY += 1;
	}
	return dateArry;
}
function getDayNum (begin) { //获取起始日到现在的天数
	var time = Date.parse(new Date());
	var lasttime = Date.parse(begin);
	var dayNum = parseInt((time-lasttime)/(1000*60*60*24));
	return dayNum;
}

// 获取最近N天,count:数字，返回值[date1,data2]
function timeForMat (count) {
// 拼接时间
let time1 = new Date()
    time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
    let Y1 = time1.getFullYear()
    let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
    let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
    let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
    let time2 = new Date()
    time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
    let Y2 = time2.getFullYear()
    let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
    let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
    let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
    return [timer2, timer1];
}
/*
 * 打印操作
 * sURL：打印地址
 * 
 * */
function closePrint() {
  return function() {
    const m = document.querySelector(".printIframe");
    m.parentNode.removeChild(m);
    document.body.removeChild(this.__container__);
  }
}
function setPrint() {
  return function() {
    this.contentWindow.__container__ = this;
    this.contentWindow.addEventListener('afterprint',closePrint())
    this.contentWindow.onafterprint = closePrint();
    this.contentWindow.print();
    this.contentWindow.focus(); // Required for IE
  }
}
function printPage(sURL) {
  let oHiddFrame = document.createElement("iframe");
  oHiddFrame.className = "printIframe";
  oHiddFrame.style.visibility = "hidden";
  oHiddFrame.style.position = "fixed";
  oHiddFrame.style.right = "0";
  oHiddFrame.style.bottom = "0";
  oHiddFrame.style.width = "0";
  oHiddFrame.style.height = "0";
  oHiddFrame.style.border = "none";
  oHiddFrame.src = sURL;
  // oHiddFrame.src = 'http://localhost:8080/#/'; //本地调试
  document.body.appendChild(oHiddFrame);
  oHiddFrame.onload = setPrint();
}
//保留两位小数
function mustTwoDecimal(number) {
    number ? number : number = 0.00
    var num = twoDecimal(number).toString();
    var index = num.indexOf(".");
    if (index <= 0) {
        num += '.';
        index = num.length - 1;
    }
    while ((index + 3) != num.length) {
        num += '0';
    }
    return num;
}
function twoDecimal(number) {
    if (isNaN(number)) {
        return;
    }
    return Math.round(number * 100) / 100;
}
