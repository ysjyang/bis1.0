<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript">
function openDiv(newDivID)
   {
      var newMaskID = "mask";  //遮罩层id
      var  newMaskWidth =document.body.scrollWidth;//遮罩层宽度
      var  newMaskHeight =document.body.scrollHeight;//遮罩层高度    
      //mask遮罩层  
     var newMask = document.createElement("div");//创建遮罩层
    newMask.id = newMaskID;//设置遮罩层id
    newMask.style.position = "absolute";//遮罩层位置
    newMask.style.zIndex = "1";//遮罩层zIndex
    newMask.style.width = newMaskWidth + "px";//设置遮罩层宽度
    newMask.style.height = newMaskHeight + "px";//设置遮罩层高度
    newMask.style.top = "0px";//设置遮罩层于上边距离
    newMask.style.left = "0px";//设置遮罩层左边距离
    newMask.style.background = "red";//#33393C//遮罩层背景色
    newMask.style.filter = "alpha(opacity=40)";//遮罩层透明度IE
    newMask.style.opacity = "0.40";//遮罩层透明度FF
    document.body.appendChild(newMask);//遮罩层添加到DOM中
   
    //新弹出层
    var newDivWidth = 400;//新弹出层宽度
    var newDivHeight = 200;//新弹出层高度
    var newDiv = document.createElement("div");//创建新弹出层
    newDiv.id = newDivID;//设置新弹出层ＩＤ
    newDiv.style.position = "absolute";//新弹出层位置
    newDiv.style.zIndex = "9999";//新弹出层zIndex
 
    newDiv.style.width = newDivWidth + "px";//新弹出层宽度
    newDiv.style.height = newDivHeight + "px";//新弹出层高度
    var newDivtop=(document.body.scrollTop + document.body.clientHeight/2 
          - newDivHeight/2) ;//新弹出层距离上边距离
    var newDivleft=(document.body.scrollLeft + document.body.clientWidth/2 
            - newDivWidth/2);//新弹出层距离左边距离
    newDiv.style.top = newDivtop+ "px";//新弹出层距离上边距离
    newDiv.style.left = newDivleft + "px";//新弹出层距离左边距离
    newDiv.style.background = "#EFEFEF";//新弹出层背景色
    newDiv.style.border = "1px solid #860001";///新弹出层边框样式
    newDiv.style.padding = "5px";//新弹出层
    newDiv.innerHTML = "content;content";//新弹出层内容
    document.body.appendChild(newDiv);//新弹出层添加到DOM中
   
    //弹出层滚动居中
    function newDivCenter()
    {
       newDiv.style.top = (document.body.scrollTop + document.body.clientHeight/2 
                 - newDivHeight/2) + "px";
       newDiv.style.left = (document.body.scrollLeft + document.body.clientWidth/2
                - newDivWidth/2) + "px";
    }
    if(document.all)//处理滚动事件，使弹出层始终居中
    {
        window.attachEvent("onscroll",newDivCenter);
    }
    else
    {
        window.addEventListener('scroll',newDivCenter,false);
    }
   
    //关闭新图层和mask遮罩层

    var newA = document.createElement("span");
    newA.href = "#";
    newA.style.position = "absolute";//span位置
    newA.style.left=350+ "px";
    newA.innerHTML = "Close";
    newA.onclick = function()//处理关闭事件
    {
        if(document.all)
        {
            window.detachEvent("onscroll",newDivCenter);
        }
        else
        {
            window.removeEventListener('scroll',newDivCenter,false);
        }
         document.body.removeChild(newMask);//移除遮罩层   
         document.body.removeChild(newDiv);////移除弹出框
        return false;
      }
      newDiv.appendChild(newA);//添加关闭span
}
</script>
</head>
<body>
<a onclick="openDiv('newDiv');" style="cursor:pointer">TestOpenDiv</a>
<br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<a onclick="openDiv('newDiv');" style="cursor:pointer">TestOpenDiv</a>
<a href="javascript:window.open('http://www.baidu.com', '_blank', 'width=645,height=550');void(0);" >弹出百度窗口</a>
</body>
</html>