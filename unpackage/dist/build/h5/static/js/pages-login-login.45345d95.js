(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"12e1":function(t,e,n){"use strict";n.r(e);var a=n("f2c4"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},2024:function(t,e,n){"use strict";var a=n("4ea4");n("a9e3"),n("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("46fa")),o={name:"u-input",mixins:[i.default],props:{value:{type:[String,Number],default:""},type:{type:String,default:"text"},inputAlign:{type:String,default:"left"},placeholder:{type:String,default:"请输入内容"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},placeholderStyle:{type:String,default:"color: #c0c4cc;"},confirmType:{type:String,default:"done"},customStyle:{type:Object,default:function(){return{}}},fixed:{type:Boolean,default:!1},focus:{type:Boolean,default:!1},passwordIcon:{type:Boolean,default:!0},border:{type:Boolean,default:!1},borderColor:{type:String,default:"#dcdfe6"},autoHeight:{type:Boolean,default:!0},selectOpen:{type:Boolean,default:!1},height:{type:[Number,String],default:""},clearable:{type:Boolean,default:!0},cursorSpacing:{type:[Number,String],default:0},selectionStart:{type:[Number,String],default:-1},selectionEnd:{type:[Number,String],default:-1},trim:{type:Boolean,default:!0},showConfirmbar:{type:Boolean,default:!0}},data:function(){return{defaultValue:this.value,inputHeight:70,textareaHeight:100,validateState:!1,focused:!1,showPassword:!1,lastValue:""}},watch:{value:function(t,e){this.defaultValue=t,t!=e&&"select"==this.type&&this.handleInput({detail:{value:t}})}},computed:{inputMaxlength:function(){return Number(this.maxlength)},getStyle:function(){var t={};return t.minHeight=this.height?this.height+"rpx":"textarea"==this.type?this.textareaHeight+"rpx":this.inputHeight+"rpx",t=Object.assign(t,this.customStyle),t},getCursorSpacing:function(){return Number(this.cursorSpacing)},uSelectionStart:function(){return String(this.selectionStart)},uSelectionEnd:function(){return String(this.selectionEnd)}},created:function(){this.$on("on-form-item-error",this.onFormItemError)},methods:{handleInput:function(t){var e=this,n=t.detail.value;this.trim&&(n=this.$u.trim(n)),this.$emit("input",n),this.defaultValue=n,setTimeout((function(){e.dispatch("u-form-item","on-form-change",n)}),40)},handleBlur:function(t){var e=this;setTimeout((function(){e.focused=!1}),100),this.$emit("blur",t.detail.value),setTimeout((function(){e.dispatch("u-form-item","on-form-blur",t.detail.value)}),40)},onFormItemError:function(t){this.validateState=t},onFocus:function(t){this.focused=!0,this.$emit("focus")},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.$emit("input","")},inputClick:function(){this.$emit("click")}}};e.default=o},2447:function(t,e,n){"use strict";var a=n("dd42"),i=n.n(a);i.a},"2e18":function(t,e,n){"use strict";n.r(e);var a=n("bc1c"),i=n("df6b");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("fb4b");var r,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"23939e4b",null,!1,a["a"],r);e["default"]=u.exports},3944:function(t,e,n){"use strict";n.r(e);var a=n("a2de"),i=n("12e1");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("2447");var r,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"70d8bf53",null,!1,a["a"],r);e["default"]=u.exports},"46fa":function(t,e,n){"use strict";function a(t,e,n){this.$children.map((function(i){t===i.$options.name?i.$emit.apply(i,[e].concat(n)):a.apply(i,[t,e].concat(n))}))}n("99af"),n("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={methods:{dispatch:function(t,e,n){var a=this.$parent||this.$root,i=a.$options.name;while(a&&(!i||i!==t))a=a.$parent,a&&(i=a.$options.name);a&&a.$emit.apply(a,[e].concat(n))},broadcast:function(t,e,n){a.call(this,t,e,n)}}};e.default=i},"4fc0":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.u-input[data-v-23939e4b]{position:relative;flex:1;display:flex;flex-direction:row}.u-input__input[data-v-23939e4b]{font-size:%?28?%;color:#303133;flex:1}.u-input__textarea[data-v-23939e4b]{width:auto;font-size:%?28?%;color:#303133;padding:%?10?% 0;line-height:normal;flex:1}.u-input--border[data-v-23939e4b]{border-radius:%?6?%;border-radius:4px;border:1px solid #dcdfe6}.u-input--error[data-v-23939e4b]{border-color:#fa3534!important}.u-input__right-icon__item[data-v-23939e4b]{margin-left:%?10?%}.u-input__right-icon--select[data-v-23939e4b]{transition:-webkit-transform .4s;transition:transform .4s;transition:transform .4s,-webkit-transform .4s}.u-input__right-icon--select--reverse[data-v-23939e4b]{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}',""]),t.exports=e},"8d22":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.wrap[data-v-70d8bf53]{font-size:%?28?%}.wrap .content[data-v-70d8bf53]{width:%?600?%;margin:%?80?% auto 0}.wrap .content .title[data-v-70d8bf53]{text-align:center;font-size:%?48?%;color:#ff6a00;font-weight:500;margin-bottom:%?100?%}.wrap .content uni-input[data-v-70d8bf53]{text-align:left;margin-bottom:%?10?%;padding-bottom:%?6?%}.wrap .content .tips[data-v-70d8bf53]{color:#909399;margin-bottom:%?60?%;margin-top:%?8?%}.wrap .content .getCaptcha[data-v-70d8bf53]{background-color:#fdf3d0;color:#909399;border:none;font-size:%?30?%;margin:%?12?% 0;padding:%?12?% 0}.wrap .content .getCaptcha[data-v-70d8bf53]::after{border:none}.wrap .content .alternative[data-v-70d8bf53]{height:16px;line-height:16px;color:#ff6a00;display:flex;justify-content:space-between;margin-top:%?30?%}.wrap .buttom .loginType[data-v-70d8bf53]{display:flex;padding:%?350?% %?150?% %?150?% %?150?%;justify-content:space-between}.wrap .buttom .loginType .item[data-v-70d8bf53]{display:flex;flex-direction:column;align-items:center;color:#606266;font-size:%?28?%}.wrap .buttom .hint[data-v-70d8bf53]{padding:%?20?% %?40?%;font-size:%?20?%;color:#909399}.wrap .buttom .hint .link[data-v-70d8bf53]{color:#f90}',""]),t.exports=e},a2de:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={uInput:n("2e18").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"wrap"},[n("v-uni-view",{staticClass:"top"}),n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"title"},[t._v("欢迎登录图书商城")]),n("u-input",{staticClass:"u-border-bottom",attrs:{type:"text",trim:!0,focus:!0,placeholder:"请输入邮箱"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.emailBlur()},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.Focus()}},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),n("v-uni-view",{staticClass:"alternative"},[n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.emailFlag,expression:"emailFlag"}],staticClass:"enroll"},[t._v("邮箱未输入或者格式不正确，请重新输入")])],1),n("u-input",{staticClass:"u-border-bottom",attrs:{type:"password",trim:!0,"password-icon":!0,placeholder:"请输入密码"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.passwordBlur()},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.Focus()}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),n("v-uni-view",{staticClass:"alternative"},[n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.passwordFlag,expression:"passwordFlag"}],staticClass:"enroll"},[t._v("密码未输入,请输入密码")])],1),n("v-uni-button",{staticClass:"getCaptcha",style:[t.inputStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("立即登入")]),n("v-uni-view",{staticClass:"alternative"},[n("v-uni-view",{staticClass:"enroll",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.register.apply(void 0,arguments)}}},[t._v("没有账户，立即注册")])],1)],1),n("v-uni-view",{staticClass:"buttom"},[n("v-uni-view",{staticClass:"hint",staticStyle:{"text-align":"center"}},[t._v("登录代表同意"),n("v-uni-text",{staticClass:"link"},[t._v("图书商城用户协议、隐私政策，")]),t._v("并授权使用您的图书商城账号信息(如昵称、头像、收获地址)以便您统一管理")],1)],1)],1)},o=[]},bc1c:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={uIcon:n("2d12").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-input",class:{"u-input--border":t.border,"u-input--error":t.validateState},style:{padding:"0 "+(t.border?20:0)+"rpx",borderColor:t.borderColor,textAlign:t.inputAlign},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.inputClick.apply(void 0,arguments)}}},["textarea"==t.type?n("v-uni-textarea",{staticClass:"u-input__input u-input__textarea",style:[t.getStyle],attrs:{value:t.defaultValue,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,fixed:t.fixed,focus:t.focus,autoHeight:t.autoHeight,"selection-end":t.uSelectionEnd,"selection-start":t.uSelectionStart,"cursor-spacing":t.getCursorSpacing,"show-confirm-bar":t.showConfirmbar},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}):n("v-uni-input",{staticClass:"u-input__input",style:[t.getStyle],attrs:{type:"password"==t.type?"text":t.type,value:t.defaultValue,password:"password"==t.type&&!t.showPassword,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled||"select"===t.type,maxlength:t.inputMaxlength,focus:t.focus,confirmType:t.confirmType,"cursor-spacing":t.getCursorSpacing,"selection-end":t.uSelectionEnd,"selection-start":t.uSelectionStart,"show-confirm-bar":t.showConfirmbar},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"u-input__right-icon u-flex"},[t.clearable&&""!=t.value&&t.focused?n("v-uni-view",{staticClass:"u-input__right-icon__clear u-input__right-icon__item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}},[n("u-icon",{attrs:{size:"32",name:"close-circle-fill",color:"#c0c4cc"}})],1):t._e(),t.passwordIcon&&"password"==t.type?n("v-uni-view",{staticClass:"u-input__right-icon__clear u-input__right-icon__item"},[n("u-icon",{attrs:{size:"32",name:t.showPassword?"eye-fill":"eye",color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showPassword=!t.showPassword}}})],1):t._e(),"select"==t.type?n("v-uni-view",{staticClass:"u-input__right-icon--select u-input__right-icon__item",class:{"u-input__right-icon--select--reverse":t.selectOpen}},[n("u-icon",{attrs:{name:"arrow-down-fill",size:"26",color:"#c0c4cc"}})],1):t._e()],1)],1)},o=[]},dd42:function(t,e,n){var a=n("8d22");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("09ed9c84",a,!0,{sourceMap:!1,shadowMode:!1})},df6b:function(t,e,n){"use strict";n.r(e);var a=n("2024"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},e7c8:function(t,e,n){var a=n("4fc0");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("490a3027",a,!0,{sourceMap:!1,shadowMode:!1})},f2c4:function(t,e,n){"use strict";var a=n("4ea4");n("4160"),n("ac1f"),n("1276"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=a(n("1da1")),o={data:function(){return{email:"1793056542@qq.com",password:"zjt07191713",emailFlag:!1,passwordFlag:!1}},computed:{inputStyle:function(){var t={};return this.$u.test.email(this.email)&&this.password&&(t.color="#fff",t.backgroundColor=this.$u.color["warning"]),t}},onLoad:function(){if(sessionStorage.getItem("url")&&!sessionStorage.getItem("register"))return this.$u.toast("未登入，请登入")},methods:{submit:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var n,a,i,o,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$u.test.email(t.email)||!t.password){e.next=21;break}return n={email:t.email,password:t.password},e.next=4,t.$u.post("/api/auth/login",n);case 4:if(a=e.sent,200==a.statusCode){e.next=10;break}if("Unauthorized"!=a.data.message){e.next=10;break}return t.email="",t.password="",e.abrupt("return",t.$u.toast("邮箱或者密码错误，请重新输入"));case 10:if(sessionStorage.setItem("access_token",a.data.access_token),t.$u.toast("登入成功"),i={},sessionStorage.getItem("params")&&(o=sessionStorage.getItem("params"),r=o.split("&"),r.forEach((function(t){i[t.split("=")[0]]=t.split("=")[1]}))),s=sessionStorage.getItem("url"),sessionStorage.removeItem("url"),sessionStorage.removeItem("params"),sessionStorage.removeItem("register"),"pages/goodbus/goodbus"==s||"pages/center/center"==s){e.next=20;break}return e.abrupt("return",setTimeout((function(){t.$u.route({type:"redirectTo",url:s,params:i})}),1500));case 20:return e.abrupt("return",setTimeout((function(){t.$u.route({type:"switchTab",url:s,params:i})}),1500));case 21:case"end":return e.stop()}}),e)})))()},register:function(){this.$u.route({url:"pages/register/register"})},Focus:function(){this.emailFlag=!1,this.passwordFlag=!1},emailBlur:function(){this.$u.test.email(this.email)||(this.emailFlag=!0)},passwordBlur:function(){""==this.password&&(this.passwordFlag=!0)}}};e.default=o},fb4b:function(t,e,n){"use strict";var a=n("e7c8"),i=n.n(a);i.a}}]);