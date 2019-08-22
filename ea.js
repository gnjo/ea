;(function(root){
 ///
 ;(function(root){
  /*original by underscore.js*/ 
  if(root._) return;
  var _={}; 

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
  };

  root._ =_;
 })(this)
 /// 
 let is={}
 is.string = function(obj){return toString.call(obj) === '[object String]'}
 ;
 let fn={}
 fn.q=(d)=>document.querySelector(d)
 fn.gcs=(el)=>window.getComputedStyle(el)
 fn.max=(el)=>el.clientHeight/parseInt(fn.gcs(el).lineHeight)
 fn.pad=(i)=>('0000'+i).slice(-3)
 fn.nd=(max,st)=>Array.from({length:max}).map((d,i)=>fn.pad(i+st)).join('\n')
 ;
 function entry(q,_caller,_opt){
  let el=is.string(q)?fn.q(q):q
  ,opt=_opt||{}
  ,cls=opt.cls||'ea'
  ,dt=opt.dt||70
  ,nd=opt.nd||fn.nd
  ,st=opt.start||0
  ,f=(ev)=>{
   let el=ev.target
   el.dataset.num=''//need reflesh
   let max=fn.max(el)
   el.dataset.num=nd(max,st)//fn.nd(max)//number draw
   el.dataset.max=max;
   el.dataset.length=el.textContent.length;
  }
  ,caller=(_caller)?_.debounce(_caller,dt):void 0
  ;
  f=_.debounce(f,dt)
  if(!fn.gcs(el).lineHeight)console.error('need set the line-height')
  el.setAttribute('contenteditable','plaintext-only')
  el.classList.add(cls)
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
 opt.start
 */
})(this);
