(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-goods~pages-goods-show~pages-index-index"],{"12a1":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-row",style:{alignItems:t.uAlignItem,justifyContent:t.uJustify},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}},[t._t("default")],2)},r=[]},1428:function(t,e,i){"use strict";i.r(e);var a=i("700e"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},"29b4":function(t,e,i){"use strict";var a=i("6265"),n=i.n(a);n.a},"2c5a":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.u-image[data-v-33adde74]{position:relative;transition:opacity .5s ease-in-out}.u-image__image[data-v-33adde74]{width:100%;height:100%}.u-image__loading[data-v-33adde74], .u-image__error[data-v-33adde74]{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:row;align-items:center;justify-content:center;background-color:#f3f4f6;color:#909399;font-size:%?46?%}',""]),t.exports=e},"388e":function(t,e,i){"use strict";i.r(e);var a=i("74b2"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},"52c4":function(t,e,i){var a=i("2c5a");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("0cc24db8",a,!0,{sourceMap:!1,shadowMode:!1})},6265:function(t,e,i){var a=i("883d");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2ba4d02a",a,!0,{sourceMap:!1,shadowMode:!1})},6388:function(t,e,i){var a=i("7537");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("23de4bd8",a,!0,{sourceMap:!1,shadowMode:!1})},6652:function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"u-row",props:{gutter:{type:[String,Number],default:20},justify:{type:String,default:"start"},align:{type:String,default:"center"},stop:{type:Boolean,default:!0}},computed:{uJustify:function(){return"end"==this.justify||"start"==this.justify?"flex-"+this.justify:"around"==this.justify||"between"==this.justify?"space-"+this.justify:this.justify},uAlignItem:function(){return"top"==this.align?"flex-start":"bottom"==this.align?"flex-end":this.align}},methods:{click:function(t){this.$emit("click")}}};e.default=a},"66a3":function(t,e,i){"use strict";i.r(e);var a=i("12a1"),n=i("f506");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("29b4");var o,u=i("f0c5"),s=Object(u["a"])(n["default"],a["b"],a["c"],!1,null,"3a08278e",null,!1,a["a"],o);e["default"]=s.exports},"700e":function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"u-col",props:{span:{type:[Number,String],default:12},offset:{type:[Number,String],default:0},justify:{type:String,default:"start"},align:{type:String,default:"center"},textAlign:{type:String,default:"left"},stop:{type:Boolean,default:!0}},data:function(){return{gutter:20}},created:function(){this.parent=!1},mounted:function(){this.parent=this.$u.$parent.call(this,"u-row"),this.parent&&(this.gutter=this.parent.gutter)},computed:{uJustify:function(){return"end"==this.justify||"start"==this.justify?"flex-"+this.justify:"around"==this.justify||"between"==this.justify?"space-"+this.justify:this.justify},uAlignItem:function(){return"top"==this.align?"flex-start":"bottom"==this.align?"flex-end":this.align}},methods:{click:function(t){this.$emit("click")}}};e.default=a},"74b2":function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"u-image",props:{src:{type:String,default:""},mode:{type:String,default:"aspectFill"},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:"auto"},shape:{type:String,default:"square"},borderRadius:{type:[String,Number],default:0},lazyLoad:{type:Boolean,default:!0},showMenuByLongpress:{type:Boolean,default:!0},loadingIcon:{type:String,default:"photo"},errorIcon:{type:String,default:"error-circle"},showLoading:{type:Boolean,default:!0},showError:{type:Boolean,default:!0},fade:{type:Boolean,default:!0},webp:{type:Boolean,default:!1},duration:{type:[String,Number],default:500},bgColor:{type:String,default:"#f3f4f6"}},data:function(){return{isError:!1,loading:!0,opacity:1,durationTime:this.duration,backgroundStyle:{}}},watch:{src:{immediate:!0,handler:function(t){t?this.isError=!1:(this.isError=!0,this.loading=!1)}}},computed:{wrapStyle:function(){var t={};return t.width=this.$u.addUnit(this.width),t.height=this.$u.addUnit(this.height),t.borderRadius="circle"==this.shape?"50%":this.$u.addUnit(this.borderRadius),t.overflow=this.borderRadius>0?"hidden":"visible",this.fade&&(t.opacity=this.opacity,t.transition="opacity ".concat(Number(this.durationTime)/1e3,"s ease-in-out")),t}},methods:{onClick:function(){this.$emit("click")},onErrorHandler:function(t){this.loading=!1,this.isError=!0,this.$emit("error",t)},onLoadHandler:function(){var t=this;if(this.loading=!1,this.isError=!1,this.$emit("load"),!this.fade)return this.removeBgColor();this.opacity=0,this.durationTime=0,setTimeout((function(){t.durationTime=t.duration,t.opacity=1,setTimeout((function(){t.removeBgColor()}),t.durationTime)}),50)},removeBgColor:function(){this.backgroundStyle={backgroundColor:"transparent"}}}};e.default=a},7537:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.u-col-0[data-v-790095f8]{width:0}.u-col-1[data-v-790095f8]{width:calc(100%/12)}.u-col-2[data-v-790095f8]{width:calc(100%/12 * 2)}.u-col-3[data-v-790095f8]{width:calc(100%/12 * 3)}.u-col-4[data-v-790095f8]{width:calc(100%/12 * 4)}.u-col-5[data-v-790095f8]{width:calc(100%/12 * 5)}.u-col-6[data-v-790095f8]{width:calc(100%/12 * 6)}.u-col-7[data-v-790095f8]{width:calc(100%/12 * 7)}.u-col-8[data-v-790095f8]{width:calc(100%/12 * 8)}.u-col-9[data-v-790095f8]{width:calc(100%/12 * 9)}.u-col-10[data-v-790095f8]{width:calc(100%/12 * 10)}.u-col-11[data-v-790095f8]{width:calc(100%/12 * 11)}.u-col-12[data-v-790095f8]{width:calc(100%/12 * 12)}',""]),t.exports=e},7652:function(t,e,i){"use strict";var a=i("52c4"),n=i.n(a);n.a},"883d":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.u-row[data-v-3a08278e]{display:flex;flex-direction:row;flex-wrap:wrap}',""]),t.exports=e},"8d64":function(t,e,i){"use strict";var a=i("6388"),n=i.n(a);n.a},"8e29":function(t,e,i){"use strict";i.r(e);var a=i("fbb8"),n=i("388e");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("7652");var o,u=i("f0c5"),s=Object(u["a"])(n["default"],a["b"],a["c"],!1,null,"33adde74",null,!1,a["a"],o);e["default"]=s.exports},c515:function(t,e,i){"use strict";i.r(e);var a=i("eb6c"),n=i("1428");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("8d64");var o,u=i("f0c5"),s=Object(u["a"])(n["default"],a["b"],a["c"],!1,null,"790095f8",null,!1,a["a"],o);e["default"]=s.exports},eb6c:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-col",class:["u-col-"+t.span],style:{padding:"0 "+Number(t.gutter)/2+"rpx",marginLeft:100/12*t.offset+"%",flex:"0 0 "+100/12*t.span+"%",alignItems:t.uAlignItem,justifyContent:t.uJustify,textAlign:t.textAlign},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}},[t._t("default")],2)},r=[]},f506:function(t,e,i){"use strict";i.r(e);var a=i("6652"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},fbb8:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var a={uIcon:i("2d12").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-image",style:[t.wrapStyle,t.backgroundStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.isError?t._e():i("v-uni-image",{staticClass:"u-image__image",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)},attrs:{src:t.src,mode:t.mode,"lazy-load":t.lazyLoad},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorHandler.apply(void 0,arguments)},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadHandler.apply(void 0,arguments)}}}),t.showLoading&&t.loading?i("v-uni-view",{staticClass:"u-image__loading",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius),backgroundColor:this.bgColor}},[t.$slots.loading?t._t("loading"):i("u-icon",{attrs:{name:t.loadingIcon,width:t.width,height:t.height}})],2):t._e(),t.showError&&t.isError&&!t.loading?i("v-uni-view",{staticClass:"u-image__error",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)}},[t.$slots.error?t._t("error"):i("u-icon",{attrs:{name:t.errorIcon,width:t.width,height:t.height}})],2):t._e()],1)},r=[]}}]);