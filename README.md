# hey-WindowAlert
在线demo：(http://fehey.com/hey-WindowAlert/),欢迎交流与意见，star也不介意哦~
# 使用说明
1.文件引用
``` html
<link rel="stylesheet" href="css/window.css">
<script src="js/require.js" data-main="js/main"></script>
```
2.html部分
``` html
<a href="javascript:;" id="default">默认消息提示</a>
```
3.js调用
``` javascript
$('#default').click(function () {
    new w.Window().alert({});
});
```
4.配置选项

属性名     | 默认值 | 说明
-------- | --- | ----
width | 400|    弹框的宽度
min_height |    225 |   弹框的最小高度
title | 系统消息 |  弹框标题
content |   ' ' |   弹框内容
hasCloseBtn |   false | 是否有关闭按钮
hasMask |   true |  是否有遮罩层
skinClassName | null |  皮肤名
isDraggable |   true |  是否可拖动
dragHandle |    null |  可拖动的部分（class名），默认为整个弹框
text4AlertBtn | 确定 |    alert弹框的按钮文字
text4ConfirmBtn |   确定 |    confirm弹框的按钮文字
text4ConfirmBtn |   取消 |    取消按钮文字
text4PromptBtn |    确定 |    prompt按钮文字
isPromptInputPassword | false | 输入框是否为密码输入
defaultValue4PromptInput |  ' ' |   prompt输入框的默认值
maxlength4PromptInput | 10 |    prompt输入框的默认输入长度
handler4AlertBtn |  null |  alert确定按钮的回调函数
handler4AlertBtn |  null |  alert确定按钮的回调函数
handler4CloseBtn |  null |  关闭按钮的回调函数
handler4ConfirmBtn |    null |  confirm确定按钮的回调函数
handler4CancelBtn | null |  取消按钮的回调函数
handler4PromptBtn | null |  prompt确定按钮的回调函数

5.回调函数用法示例
``` javascript
    //单个绑定示例
    $('#a').click(function(){
      var win = new w.Window();
      win.alert({
        title:'提示',
        content: '内容',
        hasCloseBtn: true,
        handler4AlertBtn: function(){
          alert('you click the alert button');
        },
        handler4CloseBtn: function(){
          alert('you click the close button');
        },
        skinClassName: 'window_skin_a',
        text4AlertBtn: '保存',
        dragHandle: '.window_header'
      });

    });
    //多个绑定示例（用on）
    $('#a').click(function(){
      var win = new w.Window();
      win.alert({
        title:'提示',
        content: '内容',
        hasCloseBtn: true,
        skinClassName: 'window_skin_a',
        text4AlertBtn: '保存',
        dragHandle: '.window_header'
      });
      win.on('alert', function(){
        alert('the second alert handler');
      }).on('alert', function(){
        alert('the third alert handler');
      }).on('close', function(){
        alert('the second close handler');
      });
    });
```