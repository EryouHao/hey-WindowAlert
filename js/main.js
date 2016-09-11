require.config({
  paths: {
    jquery: 'jquery-2.1.1.min',
    jqueryUI: 'jquery-ui-1.10.4.custom.min'
  }
});

require(['jquery','window'],function($,w){

  $('#default').click(function () {
    new w.Window().alert({

    });
  });

  $('#a').click(function(){
    var win = new w.Window();
    win.alert({
      title:'提示',
      content: '内容',
      hasCloseBtn: true,
      handler4AlertBtn: function(){
        // alert('you click the alert button');
      },
      handler4CloseBtn: function(){
        //alert('you click the close button');
      },
      skinClassName: 'window_skin_a',
      text4AlertBtn: '保存',
      dragHandle: '.window_header'
    });
    win.on('alert', function(){
      // alert('the second alert handler');
    }).on('alert', function(){
      // alert('the third alert handler');
    }).on('close', function(){
      // alert('the second close handler');
    });

  });

  $('#b').click(function () {
    var win = new w.Window();
    win.confirm({
      title: '系统消息',
      content: '您确定要删除这个文件吗？',
      text4ConfirmBtn: '是',
      text4CancelBtn: '否',
      dragHandle: '.window_header'
    }).on('confirm', function(){
      alert('确定');
    }).on('cancel', function() {
      alert('取消');
    });
  });

  $('#c').click(function () {
    var win = new w.Window();
    win.prompt({
      title: '请输入您的名字',
      content: '我们将会为您保密您输入的信息。',
      text4PromptBtn: '输入',
      text4CancelBtn: '取消',
      defaultValue4PromptInput: '张三',
      dragHandle: '.window_header',
      handler4PromptBtn: function(inputValue) {
        alert('您输入的内容是:' + inputValue);
      },
      handler4CancelBtn: function(){
        alert('取消');
      }
    });
  });

  $('#d').click(function () {
    new w.Window().common({
      content: '我是一个通用弹框',
      hasCloseBtn: true
    });
  });

});
