!function(){var e={},t=function(t){for(var n=e[t],i=n.deps,o=n.defn,a=i.length,s=new Array(a),l=0;l<a;++l)s[l]=r(i[l]);var c=o.apply(null,s);if(void 0===c)throw"module ["+t+"] returned undefined";n.instance=c},n=function(t,n,r){if("string"!=typeof t)throw"module id must be a string";if(void 0===n)throw"no dependencies for "+t;if(void 0===r)throw"no definition function for "+t;e[t]={deps:n,defn:r,instance:void 0}},r=function(n){var r=e[n];if(void 0===r)throw"module ["+n+"] was undefined";return void 0===r.instance&&t(n),r.instance},i=function(e,t){for(var n=e.length,i=new Array(n),o=0;o<n;++o)i.push(r(e[o]));t.apply(null,t)},o={};o.bolt={module:{api:{define:n,require:i,demand:r}}};var a=n,s=function(e,t){a(e,[],function(){return t})};s("1",tinymce.PluginManager),s("2",tinymce.Env),s("3",tinymce.util.Promise),s("4",tinymce.util.URI),s("5",tinymce.util.Tools),s("6",tinymce.util.Delay),a("m",[],function(){function e(e,t){return r(document.createElement("canvas"),e,t)}function t(e){return e.getContext("2d")}function n(e){var t=null;try{t=e.getContext("webgl")||e.getContext("experimental-webgl")}catch(e){}return t||(t=null),t}function r(e,t,n){return e.width=t,e.height=n,e}return{create:e,resize:r,get2dContext:t,get3dContext:n}}),a("n",[],function(){function e(e){return e.naturalWidth||e.width}function t(e){return e.naturalHeight||e.height}return{getWidth:e,getHeight:t}}),a("o",[],function(){function e(e,t){return function(){e.apply(t,arguments)}}function t(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],s(t,e(r,this),e(i,this))}function n(e){var t=this;return null===this._state?void this._deferreds.push(e):void l(function(){var n=t._state?e.onFulfilled:e.onRejected;if(null===n)return void(t._state?e.resolve:e.reject)(t._value);var r;try{r=n(t._value)}catch(t){return void e.reject(t)}e.resolve(r)})}function r(t){try{if(t===this)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if("function"==typeof n)return void s(e(n,t),e(r,this),e(i,this))}this._state=!0,this._value=t,o.call(this)}catch(e){i.call(this,e)}}function i(e){this._state=!1,this._value=e,o.call(this)}function o(){for(var e=0,t=this._deferreds.length;e<t;e++)n.call(this,this._deferreds[e]);this._deferreds=null}function a(e,t,n,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r}function s(e,t,n){var r=!1;try{e(function(e){r||(r=!0,t(e))},function(e){r||(r=!0,n(e))})}catch(e){if(r)return;r=!0,n(e)}}if(window.Promise)return window.Promise;var l=t.immediateFn||"function"==typeof setImmediate&&setImmediate||function(e){setTimeout(e,1)},c=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};return t.prototype["catch"]=function(e){return this.then(null,e)},t.prototype.then=function(e,r){var i=this;return new t(function(t,o){n.call(i,new a(e,r,t,o))})},t.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&c(arguments[0])?arguments[0]:arguments);return new t(function(t,n){function r(o,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(e){r(o,e)},n)}e[o]=a,0===--i&&t(e)}catch(e){n(e)}}if(0===e.length)return t([]);for(var i=e.length,o=0;o<e.length;o++)r(o,e[o])})},t.resolve=function(e){return e&&"object"==typeof e&&e.constructor===t?e:new t(function(t){t(e)})},t.reject=function(e){return new t(function(t,n){n(e)})},t.race=function(e){return new t(function(t,n){for(var r=0,i=e.length;r<i;r++)e[r].then(t,n)})},t}),a("p",[],function(){function e(e){var t=document.createElement("a");return t.href=e,t.pathname}function t(t){var n=e(t).split("."),r=n[n.length-1],i={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png"};return r&&(r=r.toLowerCase()),i[r]}return{guessMimeType:t}}),a("e",["o","m","p","n"],function(e,t,n,r){function i(t){return new e(function(e){function n(){t.removeEventListener("load",n),e(t)}t.complete?e(t):t.addEventListener("load",n)})}function o(e){return i(e).then(function(e){var n,i;return i=t.create(r.getWidth(e),r.getHeight(e)),n=t.get2dContext(i),n.drawImage(e,0,0),i})}function a(e){return i(e).then(function(e){var t=e.src;return 0===t.indexOf("blob:")?l(t):0===t.indexOf("data:")?c(t):o(e).then(function(e){return c(e.toDataURL(n.guessMimeType(t)))})})}function s(t){return new e(function(e){function n(){r.removeEventListener("load",n),e(r)}var r=new Image;r.addEventListener("load",n),r.src=URL.createObjectURL(t),r.complete&&n()})}function l(t){return new e(function(e){var n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="blob",n.onload=function(){200==this.status&&e(this.response)},n.send()})}function c(t){return new e(function(e){var n,r,i,o,a,s;if(t=t.split(","),o=/data:([^;]+)/.exec(t[0]),o&&(a=o[1]),n=atob(t[1]),window.WebKitBlobBuilder){for(s=new WebKitBlobBuilder,r=new ArrayBuffer(n.length),i=0;i<r.length;i++)r[i]=n.charCodeAt(i);return s.append(r),void e(s.getBlob(a))}for(r=new Uint8Array(n.length),i=0;i<r.length;i++)r[i]=n.charCodeAt(i);e(new Blob([r],{type:a}))})}function u(e){return 0===e.indexOf("blob:")?l(e):0===e.indexOf("data:")?c(e):null}function d(e,t){return c(e.toDataURL(t))}function f(t){return new e(function(e){var n=new FileReader;n.onloadend=function(){e(n.result)},n.readAsDataURL(t)})}function p(e){return f(e).then(function(e){return e.split(",")[1]})}function m(e){URL.revokeObjectURL(e.src)}return{blobToImage:s,imageToBlob:a,blobToDataUri:f,blobToBase64:p,imageToCanvas:o,canvasToBlob:d,revokeImageUrl:m,uriToBlob:u}}),a("q",[],function(){function e(e,t,n){return e=parseFloat(e),e>n?e=n:e<t&&(e=t),e}function t(){return[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1]}function n(e,t){var n,r,i,o,a=[],s=new Array(10);for(n=0;n<5;n++){for(r=0;r<5;r++)a[r]=t[r+5*n];for(r=0;r<5;r++){for(o=0,i=0;i<5;i++)o+=e[r+5*i]*a[i];s[r+5*n]=o}}return s}function r(t,n){return n=e(n,0,1),t.map(function(t,r){return r%6===0?t=1-(1-t)*n:t*=n,e(t,0,1)})}function i(t,r){var i;return r=e(r,-1,1),r*=100,r<0?i=127+r/100*127:(i=r%1,i=0===i?d[r]:d[Math.floor(r)]*(1-i)+d[Math.floor(r)+1]*i,i=127*i+127),n(t,[i/127,0,0,0,.5*(127-i),0,i/127,0,0,.5*(127-i),0,0,i/127,0,.5*(127-i),0,0,0,1,0,0,0,0,0,1])}function o(t,r){var i,o,a,s;return r=e(r,-1,1),i=1+(r>0?3*r:r),o=.3086,a=.6094,s=.082,n(t,[o*(1-i)+i,a*(1-i),s*(1-i),0,0,o*(1-i),a*(1-i)+i,s*(1-i),0,0,o*(1-i),a*(1-i),s*(1-i)+i,0,0,0,0,0,1,0,0,0,0,0,1])}function a(t,r){var i,o,a,s,l;return r=e(r,-180,180)/180*Math.PI,i=Math.cos(r),o=Math.sin(r),a=.213,s=.715,l=.072,n(t,[a+i*(1-a)+o*-a,s+i*-s+o*-s,l+i*-l+o*(1-l),0,0,a+i*-a+.143*o,s+i*(1-s)+.14*o,l+i*-l+o*-.283,0,0,a+i*-a+o*-(1-a),s+i*-s+o*s,l+i*(1-l)+o*l,0,0,0,0,0,1,0,0,0,0,0,1])}function s(t,r){return r=e(255*r,-255,255),n(t,[1,0,0,0,r,0,1,0,0,r,0,0,1,0,r,0,0,0,1,0,0,0,0,0,1])}function l(t,r,i,o){return r=e(r,0,2),i=e(i,0,2),o=e(o,0,2),n(t,[r,0,0,0,0,0,i,0,0,0,0,0,o,0,0,0,0,0,1,0,0,0,0,0,1])}function c(t,i){return i=e(i,0,1),n(t,r([.393,.769,.189,0,0,.349,.686,.168,0,0,.272,.534,.131,0,0,0,0,0,1,0,0,0,0,0,1],i))}function u(t,i){return i=e(i,0,1),n(t,r([.33,.34,.33,0,0,.33,.34,.33,0,0,.33,.34,.33,0,0,0,0,0,1,0,0,0,0,0,1],i))}var d=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10];return{identity:t,adjust:r,multiply:n,adjustContrast:i,adjustBrightness:s,adjustSaturation:o,adjustHue:a,adjustColors:l,adjustSepia:c,adjustGrayscale:u}}),a("c",["m","n","e","q"],function(e,t,n,r){function i(r,i){return n.blobToImage(r).then(function(r){function o(e,t){var n,r,i,o,a,s=e.data,l=t[0],c=t[1],u=t[2],d=t[3],f=t[4],p=t[5],m=t[6],h=t[7],g=t[8],v=t[9],b=t[10],y=t[11],C=t[12],x=t[13],w=t[14],N=t[15],E=t[16],S=t[17],_=t[18],k=t[19];for(a=0;a<s.length;a+=4)n=s[a],r=s[a+1],i=s[a+2],o=s[a+3],s[a]=n*l+r*c+i*u+o*d+f,s[a+1]=n*p+r*m+i*h+o*g+v,s[a+2]=n*b+r*y+i*C+o*x+w,s[a+3]=n*N+r*E+i*S+o*_+k;return e}var a,s=e.create(t.getWidth(r),t.getHeight(r)),l=e.get2dContext(s);return l.drawImage(r,0,0),u(r),a=o(l.getImageData(0,0,s.width,s.height),i),l.putImageData(a,0,0),n.canvasToBlob(s)})}function o(r,i){return n.blobToImage(r).then(function(r){function o(e,t,n){function r(e,t,n){return e>n?e=n:e<t&&(e=t),e}var i,o,a,s,l,c,u,d,f,p,m,h,g,v,b,y,C;for(a=Math.round(Math.sqrt(n.length)),s=Math.floor(a/2),i=e.data,o=t.data,y=e.width,C=e.height,c=0;c<C;c++)for(l=0;l<y;l++){for(u=d=f=0,m=0;m<a;m++)for(p=0;p<a;p++)h=r(l+p-s,0,y-1),g=r(c+m-s,0,C-1),v=4*(g*y+h),b=n[m*a+p],u+=i[v]*b,d+=i[v+1]*b,f+=i[v+2]*b;v=4*(c*y+l),o[v]=r(u,0,255),o[v+1]=r(d,0,255),o[v+2]=r(f,0,255)}return t}var a,s,l=e.create(t.getWidth(r),t.getHeight(r)),c=e.get2dContext(l);return c.drawImage(r,0,0),u(r),a=c.getImageData(0,0,l.width,l.height),s=c.getImageData(0,0,l.width,l.height),s=o(a,s,i),c.putImageData(s,0,0),n.canvasToBlob(l)})}function a(r){return function(i,o){return n.blobToImage(i).then(function(i){function a(e,t){var n,r=e.data;for(n=0;n<r.length;n+=4)r[n]=t[r[n]],r[n+1]=t[r[n+1]],r[n+2]=t[r[n+2]];return e}var s,l,c=e.create(t.getWidth(i),t.getHeight(i)),d=e.get2dContext(c),f=new Array(256);for(l=0;l<f.length;l++)f[l]=r(l,o);return d.drawImage(i,0,0),u(i),s=a(d.getImageData(0,0,c.width,c.height),f),d.putImageData(s,0,0),n.canvasToBlob(c)})}}function s(e){return function(t,n){return i(t,e(r.identity(),n))}}function l(e){return function(t){return i(t,e)}}function c(e){return function(t){return o(t,e)}}var u=n.revokeImageUrl;return{invert:l([-1,0,0,0,255,0,-1,0,0,255,0,0,-1,0,255,0,0,0,1,0]),brightness:s(r.adjustBrightness),hue:s(r.adjustHue),saturate:s(r.adjustSaturation),contrast:s(r.adjustContrast),grayscale:s(r.adjustGrayscale),sepia:s(r.adjustSepia),colorize:function(e,t,n,o){return i(e,r.adjustColors(r.identity(),t,n,o))},sharpen:c([0,-1,0,-1,5,-1,0,-1,0]),emboss:c([-2,-1,0,-1,1,1,0,1,2]),gamma:a(function(e,t){return 255*Math.pow(e/255,1-t)}),exposure:a(function(e,t){return 255*(1-Math.exp(-(e/255)*t))}),colorFilter:i,convoluteFilter:o}}),a("r",["o","e","m","n"],function(e,t,n,r){function i(e,t,n){var a=r.getWidth(e),s=r.getHeight(e),l=t/a,c=n/s,u=!1;(l<.5||l>2)&&(l=l<.5?.5:2,u=!0),(c<.5||c>2)&&(c=c<.5?.5:2,u=!0);var d=o(e,l,c);return u?d.then(function(e){return i(e,t,n)}):d}function o(t,i,o){return new e(function(e){var a=r.getWidth(t),s=r.getHeight(t),l=Math.floor(a*i),c=Math.floor(s*o),u=n.create(l,c),d=n.get2dContext(u);d.drawImage(t,0,0,a,s,0,0,l,c),e(u)})}return{scale:i}}),a("d",["e","m","n","r"],function(e,t,n,r){function i(r,i){return e.blobToImage(r).then(function(o){var a=t.create(n.getWidth(o),n.getHeight(o)),s=t.get2dContext(a),c=0,u=0;return i=i<0?360+i:i,90!=i&&270!=i||t.resize(a,a.height,a.width),90!=i&&180!=i||(c=a.width),270!=i&&180!=i||(u=a.height),s.translate(c,u),s.rotate(i*Math.PI/180),s.drawImage(o,0,0),l(o),e.canvasToBlob(a,r.type)})}function o(r,i){return e.blobToImage(r).then(function(r){var o=t.create(n.getWidth(r),n.getHeight(r)),a=t.get2dContext(o);return"v"==i?(a.scale(1,-1),a.drawImage(r,0,-o.height)):(a.scale(-1,1),a.drawImage(r,-o.width,0)),l(r),e.canvasToBlob(o)})}function a(n,r,i,o,a){return e.blobToImage(n).then(function(n){var s=t.create(o,a),c=t.get2dContext(s);return c.drawImage(n,-r,-i),l(n),e.canvasToBlob(s)})}function s(t,n,i){return e.blobToImage(t).then(function(o){var a;return a=r.scale(o,n,i).then(function(n){return e.canvasToBlob(n,t.type)}).then(c(o))["catch"](c(o))})}var l=e.revokeImageUrl,c=function(e){return function(t){return l(e),t}};return{rotate:i,flip:o,crop:a,resize:s}}),a("7",["c","d"],function(e,t){var n=function(t){return e.invert(t)},r=function(t){return e.sharpen(t)},i=function(t){return e.emboss(t)},o=function(t,n){return e.gamma(t,n)},a=function(t,n){return e.exposure(t,n)},s=function(t,n,r,i){return e.colorize(t,n,r,i)},l=function(t,n){return e.brightness(t,n)},c=function(t,n){return e.hue(t,n)},u=function(t,n){return e.saturate(t,n)},d=function(t,n){return e.contrast(t,n)},f=function(t,n){return e.grayscale(t,n)},p=function(t,n){return e.sepia(t,n)},m=function(e,n){return t.flip(e,n)},h=function(e,n,r,i,o){return t.crop(e,n,r,i,o)},g=function(e,n,r){return t.resize(e,n,r)},v=function(e,n){return t.rotate(e,n)};return{invert:n,sharpen:r,emboss:i,brightness:l,hue:c,saturate:u,contrast:d,grayscale:f,sepia:p,colorize:s,gamma:o,exposure:a,flip:m,crop:h,resize:g,rotate:v}}),a("8",["e"],function(e){var t=function(t){return e.blobToImage(t)},n=function(t){return e.imageToBlob(t)},r=function(t){return e.blobToDataUri(t)},i=function(t){return e.blobToBase64(t)};return{blobToImage:t,imageToBlob:n,blobToDataUri:r,blobToBase64:i}}),s("f",tinymce.dom.DOMUtils),s("g",tinymce.ui.Factory),s("h",tinymce.ui.Form),s("i",tinymce.ui.Container),s("s",tinymce.ui.Control),s("t",tinymce.ui.DragHelper),s("u",tinymce.geom.Rect),s("w",tinymce.dom.DomQuery),s("x",tinymce.util.Observable),s("y",tinymce.util.VK),a("v",["w","t","u","5","x","y"],function(e,t,n,r,i,o){var a=0;return function(s,l,c,u,d){function f(e,t){return{x:t.x+e.x,y:t.y+e.y,w:t.w,h:t.h}}function p(e,t){return{x:t.x-e.x,y:t.y-e.y,w:t.w,h:t.h}}function m(){return p(c,s)}function h(e,t,r,i){var o,a,l,u,d;o=t.x,a=t.y,l=t.w,u=t.h,o+=r*e.deltaX,a+=i*e.deltaY,l+=r*e.deltaW,u+=i*e.deltaH,l<20&&(l=20),u<20&&(u=20),d=s=n.clamp({x:o,y:a,w:l,h:u},c,"move"==e.name),d=p(c,d),E.fire("updateRect",{rect:d}),x(d)}function g(){function n(e){var n;return new t(R,{document:u.ownerDocument,handle:R+"-"+e.name,start:function(){n=s},drag:function(t){h(e,n,t.deltaX,t.deltaY)}})}e('<div id="'+R+'" class="'+T+'croprect-container" role="grid" aria-dropeffect="execute">').appendTo(u),r.each(k,function(t){e("#"+R,u).append('<div id="'+R+"-"+t+'"class="'+T+'croprect-block" style="display: none" data-mce-bogus="all">')}),r.each(S,function(t){e("#"+R,u).append('<div id="'+R+"-"+t.name+'" class="'+T+"croprect-handle "+T+"croprect-handle-"+t.name+'"style="display: none" data-mce-bogus="all" role="gridcell" tabindex="-1" aria-label="'+t.label+'" aria-grabbed="false">')}),_=r.map(S,n),b(s),e(u).on("focusin focusout",function(t){e(t.target).attr("aria-grabbed","focus"===t.type)}),e(u).on("keydown",function(e){function t(e,t,r,i,o){e.stopPropagation(),e.preventDefault(),h(n,r,i,o)}var n;switch(r.each(S,function(t){if(e.target.id==R+"-"+t.name)return n=t,!1}),e.keyCode){case o.LEFT:t(e,n,s,-10,0);break;case o.RIGHT:t(e,n,s,10,0);break;case o.UP:t(e,n,s,0,-10);break;case o.DOWN:t(e,n,s,0,10);break;case o.ENTER:case o.SPACEBAR:e.preventDefault(),d()}})}function v(t){var n;n=r.map(S,function(e){return"#"+R+"-"+e.name}).concat(r.map(k,function(e){return"#"+R+"-"+e})).join(","),t?e(n,u).show():e(n,u).hide()}function b(t){function n(t,n){n.h<0&&(n.h=0),n.w<0&&(n.w=0),e("#"+R+"-"+t,u).css({left:n.x,top:n.y,width:n.w,height:n.h})}r.each(S,function(n){e("#"+R+"-"+n.name,u).css({left:t.w*n.xMul+t.x,top:t.h*n.yMul+t.y})}),n("top",{x:l.x,y:l.y,w:l.w,h:t.y-l.y}),n("right",{x:t.x+t.w,y:t.y,w:l.w-t.x-t.w+l.x,h:t.h}),n("bottom",{x:l.x,y:t.y+t.h,w:l.w,h:l.h-t.y-t.h+l.y}),n("left",{x:l.x,y:t.y,w:t.x-l.x,h:t.h}),n("move",t)}function y(e){s=e,b(s)}function C(e){l=e,b(s)}function x(e){y(f(c,e))}function w(e){c=e,b(s)}function N(){r.each(_,function(e){e.destroy()}),_=[]}var E,S,_,k,T="mce-",R=T+"crid-"+a++;return S=[{name:"move",xMul:0,yMul:0,deltaX:1,deltaY:1,deltaW:0,deltaH:0,label:"Crop Mask"},{name:"nw",xMul:0,yMul:0,deltaX:1,deltaY:1,deltaW:-1,deltaH:-1,label:"Top Left Crop Handle"},{name:"ne",xMul:1,yMul:0,deltaX:0,deltaY:1,deltaW:1,deltaH:-1,label:"Top Right Crop Handle"},{name:"sw",xMul:0,yMul:1,deltaX:1,deltaY:0,deltaW:-1,deltaH:1,label:"Bottom Left Crop Handle"},{name:"se",xMul:1,yMul:1,deltaX:0,deltaY:0,deltaW:1,deltaH:1,label:"Bottom Right Crop Handle"}],k=["top","right","bottom","left"],g(u),E=r.extend({toggleVisibility:v,setClampRect:w,setRect:y,getInnerRect:m,setInnerRect:x,setViewPortRect:C,destroy:N},i)}}),a("j",["s","t","u","5","3","v"],function(e,t,n,r,i,o){function a(e){return new i(function(t){function n(){e.removeEventListener("load",n),t(e)}e.complete?t(e):e.addEventListener("load",n)})}return e.extend({Defaults:{classes:"imagepanel"},selection:function(e){return arguments.length?(this.state.set("rect",e),this):this.state.get("rect")},imageSize:function(){var e=this.state.get("viewRect");return{w:e.w,h:e.h}},toggleCropRect:function(e){this.state.set("cropEnabled",e)},imageSrc:function(e){var t=this,r=new Image;r.src=e,a(r).then(function(){var e,i,o=t.state.get("viewRect");if(i=t.$el.find("img"),i[0])i.replaceWith(r);else{var a=document.createElement("div");a.className="mce-imagepanel-bg",t.getEl().appendChild(a),t.getEl().appendChild(r)}e={x:0,y:0,w:r.naturalWidth,h:r.naturalHeight},t.state.set("viewRect",e),t.state.set("rect",n.inflate(e,-20,-20)),o&&o.w==e.w&&o.h==e.h||t.zoomFit(),t.repaintImage(),t.fire("load")})},zoom:function(e){return arguments.length?(this.state.set("zoom",e),this):this.state.get("zoom")},postRender:function(){return this.imageSrc(this.settings.imageSrc),this._super()},zoomFit:function(){var e,t,n,r,i,o,a,s=this;a=10,e=s.$el.find("img"),t=s.getEl().clientWidth,n=s.getEl().clientHeight,r=e[0].naturalWidth,i=e[0].naturalHeight,o=Math.min((t-a)/r,(n-a)/i),o>=1&&(o=1),s.zoom(o)},repaintImage:function(){var e,t,n,r,i,o,a,s,l,c,u;u=this.getEl(),l=this.zoom(),c=this.state.get("rect"),a=this.$el.find("img"),s=this.$el.find(".mce-imagepanel-bg"),i=u.offsetWidth,o=u.offsetHeight,n=a[0].naturalWidth*l,r=a[0].naturalHeight*l,e=Math.max(0,i/2-n/2),t=Math.max(0,o/2-r/2),a.css({left:e,top:t,width:n,height:r}),s.css({left:e,top:t,width:n,height:r}),this.cropRect&&(this.cropRect.setRect({x:c.x*l+e,y:c.y*l+t,w:c.w*l,h:c.h*l}),this.cropRect.setClampRect({x:e,y:t,w:n,h:r}),this.cropRect.setViewPortRect({x:0,y:0,w:i,h:o}))},bindStates:function(){function e(e){t.cropRect=new o(e,t.state.get("viewRect"),t.state.get("viewRect"),t.getEl(),function(){t.fire("crop")}),t.cropRect.on("updateRect",function(e){var n=e.rect,r=t.zoom();n={x:Math.round(n.x/r),y:Math.round(n.y/r),w:Math.round(n.w/r),h:Math.round(n.h/r)},t.state.set("rect",n)}),t.on("remove",t.cropRect.destroy)}var t=this;t.state.on("change:cropEnabled",function(e){t.cropRect.toggleVisibility(e.value),t.repaintImage()}),t.state.on("change:zoom",function(){t.repaintImage()}),t.state.on("change:rect",function(n){var r=n.value;t.cropRect||e(r),t.cropRect.setRect(r)})}})}),a("k",[],function(){return function(){function e(e){var t;return t=o.splice(++a),o.push(e),{state:e,removed:t}}function t(){if(r())return o[--a]}function n(){if(i())return o[++a]}function r(){return a>0}function i(){return a!=-1&&a<o.length-1}var o=[],a=-1;return{data:o,add:e,undo:t,redo:n,canUndo:r,canRedo:i}}}),a("9",["f","5","3","g","h","i","j","7","8","k"],function(e,t,n,r,i,o,a,s,l,c){function u(e){return{blob:e,url:URL.createObjectURL(e)}}function d(e){e&&URL.revokeObjectURL(e.url)}function f(e){t.each(e,d)}function p(n,l,p){function m(e){var t,n,r,i;t=O.find("#w")[0],n=O.find("#h")[0],r=parseInt(t.value(),10),i=parseInt(n.value(),10),O.find("#constrain")[0].checked()&&ae&&se&&r&&i&&("w"==e.control.settings.name?(i=Math.round(r*le),n.value(i)):(r=Math.round(i*ce),t.value(r))),ae=r,se=i}function h(e){return Math.round(100*e)+"%"}function g(){O.find("#undo").disabled(!ue.canUndo()),O.find("#redo").disabled(!ue.canRedo()),O.statusbar.find("#save").disabled(!ue.canUndo())}function v(){O.find("#undo").disabled(!0),O.find("#redo").disabled(!0)}function b(e){e&&$.imageSrc(e.url)}function y(e){return function(){var n=t.grep(oe,function(t){return t.settings.name!=e});t.each(n,function(e){e.hide()}),e.show(),e.focus()}}function C(e){z=u(e),b(z)}function x(e){n=u(e),b(n),f(ue.add(n).removed),g()}function w(){var e=$.selection();s.crop(n.blob,e.x,e.y,e.w,e.h).then(function(e){x(e),S()})}function N(e){var t=[].slice.call(arguments,1);return function(){var r=z||n;e.apply(this,[r.blob].concat(t)).then(C)}}function E(e){var t=[].slice.call(arguments,1);return function(){e.apply(this,[n.blob].concat(t)).then(x)}}function S(){b(n),d(z),y(H)(),g()}function _(){z&&(x(z.blob),S())}function k(){var e=$.zoom();e<2&&(e+=.1),$.zoom(e)}function T(){var e=$.zoom();e>.1&&(e-=.1),$.zoom(e)}function R(){n=ue.undo(),b(n),g()}function A(){n=ue.redo(),b(n),g()}function B(){l(n.blob),O.close()}function P(e){return new i({layout:"flex",direction:"row",labelGap:5,border:"0 0 1 0",align:"center",pack:"center",padding:"0 10 0 10",spacing:5,flex:0,minHeight:60,defaults:{classes:"imagetool",type:"button"},items:e})}function D(e,t){return P([{text:"Back",onclick:S},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:_}]).hide().on("show",function(){v(),t(n.blob).then(function(e){var t=u(e);b(t),d(z),z=t})})}function M(e,t,r,i,o){function a(e){t(n.blob,e).then(function(e){var t=u(e);b(t),d(z),z=t})}return P([{text:"Back",onclick:S},{type:"spacer",flex:1},{type:"slider",flex:1,ondragend:function(e){a(e.value)},minValue:i,maxValue:o,value:r,previewFilter:h},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:_}]).hide().on("show",function(){this.find("slider").value(r),v()})}function L(e,t){function r(){var e,r,i;e=O.find("#r")[0].value(),r=O.find("#g")[0].value(),i=O.find("#b")[0].value(),t(n.blob,e,r,i).then(function(e){var t=u(e);b(t),d(z),z=t})}return P([{text:"Back",onclick:S},{type:"spacer",flex:1},{type:"slider",label:"R",name:"r",minValue:0,value:1,maxValue:2,ondragend:r,previewFilter:h},{type:"slider",label:"G",name:"g",minValue:0,value:1,maxValue:2,ondragend:r,previewFilter:h},{type:"slider",label:"B",name:"b",minValue:0,value:1,maxValue:2,ondragend:r,previewFilter:h},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:_}]).hide().on("show",function(){O.find("#r,#g,#b").value(1),v()})}function I(e){e.control.value()===!0&&(le=se/ae,ce=ae/se)}var O,H,F,z,W,U,V,$,j,q,Y,X,K,G,J,Q,Z,ee,te,ne,re,ie,oe,ae,se,le,ce,ue=new c;W=P([{text:"Back",onclick:S},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:w}]).hide().on("show hide",function(e){$.toggleCropRect("show"==e.type)}).on("show",v),U=P([{text:"Back",onclick:S},{type:"spacer",flex:1},{type:"textbox",name:"w",label:"Width",size:4,onkeyup:m},{type:"textbox",name:"h",label:"Height",size:4,onkeyup:m},{type:"checkbox",name:"constrain",text:"Constrain proportions",checked:!0,onchange:I},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:"submit"}]).hide().on("submit",function(e){var t=parseInt(O.find("#w").value(),10),n=parseInt(O.find("#h").value(),10);e.preventDefault(),E(s.resize,t,n)(),S()}).on("show",v),V=P([{text:"Back",onclick:S},{type:"spacer",flex:1},{icon:"fliph",tooltip:"Flip horizontally",onclick:N(s.flip,"h")},{icon:"flipv",tooltip:"Flip vertically",onclick:N(s.flip,"v")},{icon:"rotateleft",tooltip:"Rotate counterclockwise",onclick:N(s.rotate,-90)},{icon:"rotateright",tooltip:"Rotate clockwise",onclick:N(s.rotate,90)},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:_}]).hide().on("show",v),Y=D("Invert",s.invert),te=D("Sharpen",s.sharpen),ne=D("Emboss",s.emboss),X=M("Brightness",s.brightness,0,-1,1),K=M("Hue",s.hue,180,0,360),G=M("Saturate",s.saturate,0,-1,1),J=M("Contrast",s.contrast,0,-1,1),Q=M("Grayscale",s.grayscale,0,0,1),Z=M("Sepia",s.sepia,0,0,1),ee=L("Colorize",s.colorize),re=M("Gamma",s.gamma,0,-1,1),ie=M("Exposure",s.exposure,1,0,2),F=P([{text:"Back",onclick:S},{type:"spacer",flex:1},{text:"hue",icon:"hue",onclick:y(K)},{text:"saturate",icon:"saturate",onclick:y(G)},{text:"sepia",icon:"sepia",onclick:y(Z)},{text:"emboss",icon:"emboss",onclick:y(ne)},{text:"exposure",icon:"exposure",onclick:y(ie)},{type:"spacer",flex:1}]).hide(),H=P([{tooltip:"Crop",icon:"crop",onclick:y(W)},{tooltip:"Resize",icon:"resize2",onclick:y(U)},{tooltip:"Orientation",icon:"orientation",onclick:y(V)},{tooltip:"Brightness",icon:"sun",onclick:y(X)},{tooltip:"Sharpen",icon:"sharpen",onclick:y(te)},{tooltip:"Contrast",icon:"contrast",onclick:y(J)},{tooltip:"Color levels",icon:"drop",onclick:y(ee)},{tooltip:"Gamma",icon:"gamma",onclick:y(re)},{tooltip:"Invert",icon:"invert",onclick:y(Y)}]),$=new a({flex:1,imageSrc:n.url}),j=new o({layout:"flex",direction:"column",border:"0 1 0 0",padding:5,spacing:5,items:[{type:"button",icon:"undo",tooltip:"Undo",name:"undo",onclick:R},{type:"button",icon:"redo",tooltip:"Redo",name:"redo",onclick:A},{type:"button",icon:"zoomin",tooltip:"Zoom in",onclick:k},{type:"button",icon:"zoomout",tooltip:"Zoom out",onclick:T}]}),q=new o({type:"container",layout:"flex",direction:"row",align:"stretch",flex:1,items:[j,$]}),oe=[H,W,U,V,F,Y,X,K,G,J,Q,Z,ee,te,ne,re,ie],O=r.create("window",{layout:"flex",direction:"column",align:"stretch",minWidth:Math.min(e.DOM.getViewPort().w,800),minHeight:Math.min(e.DOM.getViewPort().h,650),title:"Edit image",items:oe.concat([q]),buttons:[{text:"Save",name:"save",subtype:"primary",onclick:B},{text:"Cancel",onclick:"close"}]}),O.renderTo(document.body).reflow(),O.on("close",function(){p(),f(ue.data),ue=null,z=null}),ue.add(n),g(),$.on("load",function(){ae=$.imageSize().w,se=$.imageSize().h,le=se/ae,ce=ae/se,O.find("#w").value(ae),O.find("#h").value(se)}),$.on("crop",w)}function m(e){return new n(function(t,n){p(u(e),t,n)})}return{edit:m}}),a("a",[],function(){function e(e){function t(e){return/^[0-9\.]+px$/.test(e)}var n,r;return n=e.style.width,r=e.style.height,n||r?t(n)&&t(r)?{w:parseInt(n,10),h:parseInt(r,10)}:null:(n=e.width,r=e.height,n&&r?{w:parseInt(n,10),h:parseInt(r,10)}:null)}function t(e,t){var n,r;t&&(n=e.style.width,r=e.style.height,(n||r)&&(e.style.width=t.w+"px",e.style.height=t.h+"px",e.removeAttribute("data-mce-style")),n=e.width,r=e.height,(n||r)&&(e.setAttribute("width",t.w),e.setAttribute("height",t.h)))}function n(e){return{w:e.naturalWidth,h:e.naturalHeight}}return{getImageSize:e,setImageSize:t,getNaturalImageSize:n}}),a("l",["3","5"],function(e,t){var n=function(e){return null!==e&&void 0!==e},r=function(e,t){var r;return r=t.reduce(function(e,t){return n(e)?e[t]:void 0},e),n(r)?r:null},i=function(n,r){return new e(function(e){var i;i=new XMLHttpRequest,i.onreadystatechange=function(){4===i.readyState&&e({status:i.status,blob:this.response})},i.open("GET",n,!0),t.each(r,function(e,t){i.setRequestHeader(t,e)}),i.responseType="blob",i.send()})},o=function(t){return new e(function(e){var n=new FileReader;n.onload=function(t){var n=t.target;e(n.result)},n.readAsText(t)})},a=function(e){var t;try{t=JSON.parse(e)}catch(e){}return t};return{traverse:r,readBlob:o,requestUrlAsBlob:i,parseJson:a}}),a("b",["3","5","l"],function(e,t,n){function r(t){return n.requestUrlAsBlob(t,{}).then(function(t){return t.status>=400?o(t.status):e.resolve(t.blob)})}var i=function(e){return 400===e||403===e||500===e},o=function(t){return e.reject("ImageProxy HTTP error: "+t)},a=function(t){e.reject("ImageProxy Service error: "+t)},s=function(e,t){return n.readBlob(t).then(function(e){var t=n.parseJson(e),r=n.traverse(t,["error","type"]);return a(r?r:"Invalid JSON")})},l=function(e,t){return i(e)?s(e,t):o(e)},c=function(t,r){return n.requestUrlAsBlob(t,{"Content-Type":"application/json;charset=UTF-8","tiny-api-key":r}).then(function(t){return t.status>=400?l(t.status,t.blob):e.resolve(t.blob)})},u=function(e,t){return t?c(e,t):r(e)};return{getUrl:u}}),a("0",["1","2","3","4","5","6","7","8","9","a","b"],function(e,t,n,r,i,o,a,s,l,c,u){var d=function(e){function d(t){e.notificationManager.open({text:t,type:"error"})}function f(){return e.selection.getNode()}function p(t){var n=t.match(/\/([^\/\?]+)?\.(?:jpeg|jpg|png|gif)(?:\?|$)/i);return n?e.dom.encode(n[1]):null}function m(){return"imagetools"+D++}function h(t){var n=t.src;return 0===n.indexOf("data:")||0===n.indexOf("blob:")||new r(n).host===e.documentBaseURI.host}function g(t){return i.inArray(e.settings.imagetools_cors_hosts,new r(t.src).host)!==-1}function v(){return e.settings.api_key||e.settings.imagetools_api_key}function b(t){var n,r=t.src;return g(t)?u.getUrl(t.src,null):h(t)?s.imageToBlob(t):(r=e.settings.imagetools_proxy,r+=(r.indexOf("?")===-1?"?":"&")+"url="+encodeURIComponent(t.src),n=v(),u.getUrl(r,n))}function y(){var t;return t=e.editorUpload.blobCache.getByUri(f().src),t?t.blob():b(f())}function C(){B=o.setEditorTimeout(e,function(){e.editorUpload.uploadImagesAuto()},e.settings.images_upload_timeout||3e4)}function x(){clearTimeout(B)}function w(t,n){return s.blobToDataUri(t).then(function(i){var o,a,s,l,c,u;return u=f(),l=e.editorUpload.blobCache,c=l.getByUri(u.src),s=r.parseDataUri(i).data,o=m(),e.settings.images_reuse_filename&&(a=c?c.filename():p(u.src)),c=l.create(o,t,s,a),l.add(c),e.undoManager.transact(function(){function t(){e.$(u).off("load",t),e.nodeChanged(),n?e.editorUpload.uploadImagesAuto():(x(),C())}e.$(u).on("load",t),e.$(u).attr({src:c.blobUri()}).removeAttr("data-mce-src")}),c})}function N(t){return function(){return e._scanForImages().then(y).then(t).then(w,d)}}function E(e){return function(){return N(function(t){var n=c.getImageSize(f());return n&&c.setImageSize(f(),{w:n.h,h:n.w}),a.rotate(t,e)})()}}function S(e){return function(){return N(function(t){return a.flip(t,e)})()}}function _(){var e=f(),t=c.getNaturalImageSize(e),r=function(r){return new n(function(n){s.blobToImage(r).then(function(i){var o=c.getNaturalImageSize(i);t.w==o.w&&t.h==o.h||c.getImageSize(e)&&c.setImageSize(e,o),URL.revokeObjectURL(i.src),n(r)})})},i=function(e){return l.edit(e).then(r).then(function(e){w(e,!0)},function(){})};e&&b(e).then(i,d)}function k(){e.addButton("rotateleft",{title:"Rotate counterclockwise",cmd:"mceImageRotateLeft"}),e.addButton("rotateright",{title:"Rotate clockwise",cmd:"mceImageRotateRight"}),e.addButton("flipv",{title:"Flip vertically",cmd:"mceImageFlipVertical"}),e.addButton("fliph",{title:"Flip horizontally",cmd:"mceImageFlipHorizontal"}),e.addButton("editimage",{title:"Edit image",cmd:"mceEditImage"}),e.addButton("imageoptions",{title:"Image options",icon:"options",cmd:"mceImage"})}function T(){e.on("NodeChange",function(t){P&&P.src!=t.element.src&&(x(),e.editorUpload.uploadImagesAuto(),P=void 0),R(t.element)&&(P=t.element)})}function R(t){var n=e.dom.is(t,"img:not([data-mce-object],[data-mce-placeholder])");return n&&(h(t)||g(t)||e.settings.imagetools_proxy)}function A(){var t=e.settings.imagetools_toolbar;t||(t="rotateleft rotateright | flipv fliph | crop editimage imageoptions"),e.addContextToolbar(R,t)}var B,P,D=0;t.fileApi&&(i.each({mceImageRotateLeft:E(-90),mceImageRotateRight:E(90),mceImageFlipVertical:S("v"),mceImageFlipHorizontal:S("h"),mceEditImage:_},function(t,n){e.addCommand(n,t)}),k(),A(),T())};return e.add("imagetools",d),function(){}}),r("0")()}();
