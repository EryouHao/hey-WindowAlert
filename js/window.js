define(['widget','jquery','jqueryUI'],function(widget,$,$UI){

  function Window(){
    this.cfg = {
      width: 400,
      min_height: 225,
      title: '系统消息',     //标题
      content: '',          //内容
      hasCloseBtn: false,   //关闭按钮
      hasMask: true,//遮罩层
      skinClassName: null,//换肤
      isDraggable: true,//拖动
      dragHandle: null,
      text4AlertBtn: '确定',//定制按钮文案
      text4ConfirmBtn: '确定',
      text4CancelBtn: '取消',
      text4PromptBtn: '确定',
      isPromptInputPassword: false,
      defaultValue4PromptInput: '',
      maxlength4PromptInput: 10,
      handler4AlertBtn: null,//确定按钮回调函数
      handler4CloseBtn: null,//关闭按钮回调函数
      handler4ConfirmBtn: null,
      handler4CancelBtn: null,
      handler4PromptBtn: null
    };

  }

  Window.prototype = $.extend({},new widget.Widget(), {
    renderUI: function() {
      var footerContent = '';
      switch (this.cfg.winType) {
        case 'alert':
          footerContent = '<input type="button" value="'+ this.cfg.text4AlertBtn +'" class="window_alertBtn">';
          break;
        case 'confirm':
          footerContent = '<input type="button" value="' + this.cfg.text4ConfirmBtn + '" class="window_confirmBtn"><input type="button" value="' +
          this.cfg.text4CancelBtn + '" class="window_cancelBtn">';
          break;
        case 'prompt':
          this.cfg.content += '<p class="window_promptInputWrapper"><input type="' + (this.cfg.isPromptInputPassword? "password":"text") +
          '" value="' + this.cfg.defaultValue4PromptInput + '" maxlength="' + this.cfg.maxlength4PromptInput +
          '" class="window_promptInput"></p>';
          footerContent = '<input type="button" value="' + this.cfg.text4PromptBtn + '" class="window_promptBtn"><input type="button" value="' +
          this.cfg.text4CancelBtn + '" class="window_cancelBtn">';
          break;
        default:
          footerContent = '<input type="button" value="'+ this.cfg.text4AlertBtn +'" class="window_alertBtn">'; //没有必要
      }
      this.boundingBox = $('<div class="window_boundingBox">' +
                              '<div class="window_body">' + this.cfg.content + '</div>' +
                            '</div>');
      if (this.cfg.winType != 'common') {
        this.boundingBox.prepend('<div class="window_header">' + this.cfg.title + '</div>');
        this.boundingBox.append('<div class="window_footer">'+ footerContent +'</div>');
      }
      this._promptInput = this.boundingBox.find('.window_promptInput');
      if (this.cfg.hasMask) {
        this._mask = $('<div class="window_mask"></div>');
        this._mask.appendTo('body');
      }
      if (this.cfg.hasCloseBtn) {
        this.boundingBox.append('<span class="window_closeBtn">X</span>');
      }
      this.boundingBox.appendTo(document.body);
    },

    bindUI: function() {
      var that = this;
      this.boundingBox.delegate('.window_alertBtn', 'click', function(){
        that.fire('alert');
        that.destroy();
      }).delegate('.window_closeBtn', 'click', function(){
        that.fire('close');
        that.destroy();
      }).delegate('.window_confirmBtn', 'click', function(){
        that.fire('confirm');
        that.destroy();
      }).delegate('.window_cancelBtn', 'click', function() {
        that.fire('cancel');
        that.destroy();
      }).delegate('.window_promptBtn', 'click', function(){
        that.fire('prompt', that._promptInput.val());
        that.destroy();
      });
      if (this.cfg.handler4AlertBtn) {
        this.on('alert', this.cfg.handler4AlertBtn);
      }
      if (this.cfg.handler4CloseBtn) {
        this.on('close', this.cfg.handler4CloseBtn);
      }
      if (this.cfg.handler4ConfirmBtn) {
        this.on('confirm', this.cfg.handler4ConfirmBtn);
      }
      if (this.cfg.handler4CancelBtn) {
        this.on('cancel', this.cfg.handler4CancelBtn);
      }
      if (this.cfg.handler4PromptBtn) {
        this.on('prompt', this.cfg.handler4PromptBtn);
      }
    },

    syncUI: function() {
     var boundingBoxHeight =  this.boundingBox.height();
      this.boundingBox.css({
        width: this.cfg.width + 'px',
        minHeight: this.cfg.min_height + 'px',
        left: (this.cfg.x ||(window.innerWidth - this.cfg.width) / 2) + 'px',
        top: (this.cfg.y || (window.innerHeight - boundingBoxHeight) / 2) + 'px'
      });
      $('.window_body').css({minHeight:(this.boundingBox.height() - 110) + 'px' });
      //换肤
      if (this.cfg.skinClassName) {
        this.boundingBox.addClass(this.cfg.skinClassName);
      }
      //可拖拽
      if (this.cfg.isDraggable) {
        if (this.cfg.dragHandle) {
          this.boundingBox.draggable({
            handle: this.cfg.dragHandle,
            containment: 'body',//限制只能在body内拖动
            scroll: false
          });
        } else {
          this.boundingBox.draggable({ containment: 'body', scroll: false });
        }
      }

    },

    destructor: function() {
      this._mask && this._mask.remove();
    },

    alert: function (cfg) {
      $.extend(this.cfg, cfg, {winType: 'alert'});
      this.render();
      return this;
    },

    confirm: function(cfg) {
      $.extend(this.cfg, cfg, {winType: 'confirm'});
      this.render();
      return this;
    },

    prompt: function(cfg) {
      $.extend(this.cfg, cfg, {winType: 'prompt'});
      this.render();
      this._promptInput.focus();
      return this;
    },

    common: function(cfg) {
      $.extend(this.cfg, cfg, {winType: 'common'});
      this.render();
      return this;
    }
  });
  return {
    Window: Window
  }
});
