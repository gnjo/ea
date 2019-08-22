;(function(root){
 ///
 ;(function(root){
  /*original by underscore.js*/ 
  if(root._) return;
  var _={}
  ;
  _.now = Date.now || function(){return new Date().getTime()};//line 1457
  //line 883
  _.debounce = function(func, wait, immediate) {
   var timeout, args, context, timestamp, result
   ,f = function() {
    var last = _.now() - timestamp;
    if (last < wait && last >= 0)timeout = setTimeout(f, wait - last)
    ;
    timeout = null;
    if(immediate)return;
    result = func.apply(context, args);
    if (!timeout) context = args = null;      
   }
   ;
   return function() {
    context = this;
    args = arguments;
    timestamp = _.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(f, wait);
    if (callNow) { result = func.apply(context, args); context = args = null;}
    return result;
   };
  }
  ;
  root._ =_
 })(this)
 /// 
 let is={}
 is.string = function(obj){return toString.call(obj) === '[object String]'}
 ;
 let fn={}
 fn.i3=(d)=>{
  if(typeof d !=='string') return d
  var el=document.createElement('table'); el.innerHTML=d.trim();
  var me=el.childNodes[0]
  el=void 0;
  return me
 }
 fn.q=(d)=>document.querySelector(d)
 fn.gcs=(el)=>window.getComputedStyle(el)
 fn.max=(el)=>el.clientHeight/parseInt(fn.gcs(el).lineHeight)
 fn.pad=(i)=>('0000'+i).slice(-3)
 fn.nd=(max,st)=>Array.from({length:max}).map((d,i)=>fn.pad(i+st)).join('\n')
 ;
 ;
 ;//core
 let css=`
.ea{
 line-height:1.3;/*important*/
 padding-left:2.5rem;/*important*/ 
}
.ea{
 max-width:100%;
 position:relative; 
 font-family:monospace;
 outline:none;
 height:auto; 
 flex-grow:1;
 word-break:break-all;
 white-space:pre-wrap;
}
.ea:before{
 position:absolute;left:0;right:0;
 content:attr(data-num);
 white-space:pre-wrap;
}
`;
 let _style=fn.q('head>style.eacss')
 //
 if(!_style) document.head.appendChild( fn.i3(`<style class="eacss">${css}</style>`) )
 ;
 ///default option
 let option={}
 option.cls='ea'
 option.dt=70
 option.nd=fn.nd
 option.st=0
 ; 
 function entry(q,_caller,_opt){
  let el=is.string(q)?fn.q(q):q
  ,opt=Object.assign({},option,_opt)
  ,f=(ev)=>{
   let el=ev.target
   el.dataset.num=''//need reflesh
   let max=fn.max(el)
   el.dataset.num=nd(max,opt.st)//fn.nd(max)//number draw
   el.dataset.max=max;
   el.dataset.length=el.textContent.length;
  }
  ,caller=(_caller)?_.debounce(_caller,opt.dt):void 0
  ;
  f=_.debounce(f,opt.dt)
  if(!fn.gcs(el).lineHeight)console.error('need set the line-height')
  el.setAttribute('contenteditable','plaintext-only')
  el.classList.add(opt.cls)
  el.addEventListener('keyup',f)
  if(caller) el.addEventListener('keydown',caller)
  ;
  f({target:el}) //initialize;
  ;
  return el;
 }
 ;
 root.ea=entry
 /*
 opt.cls
 opt.dt
 opt.nd
 opt.st
 */
})(this);
