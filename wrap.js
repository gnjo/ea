;(function(root){
 function makemin(){
  if(fn.q('.wrapmincss'))return
  ;
  let wrapmincss=`
.wrapmin{
max-height:2rem!important;
overflow:hidden;
opacity:0.5;
}
.wrapmin>*{
pointer-events:none
}
`
  let css=fn.ce('style')
  css.textContent=wrapmincss
  css.classList.add('wrapmincss')
  fn.a2(css,document.head)
 }
 ;
 function ir(wrap,opt,ignore){
  interact(wrap)
   .draggable({
   ignoreFrom: ignore,
   modifiers: [
    interact.modifiers.snap({
     targets: [
      interact.createSnapGrid({ x: opt.grid, y: opt.grid })
     ],
     range: Infinity,
     relativePoints: [ { x: 0, y: 0 } ]
    }),
    interact.modifiers.restrict({
     restriction: wrap.parentNode,
     elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
     endOnly: true
    })
   ],
   inertia: true
  })
   .on('dragmove', function (event) {
   let x=parseFloat(event.target.dataset.x||0)
   ,y=parseFloat(event.target.dataset.y||0)
   x += event.dx
   y += event.dy
   event.target.dataset.x=x
   event.target.dataset.y=y

   event.target.style.webkitTransform =
    event.target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'
  })
   .on('doubletap', function (event) {
   event.target.classList.toggle('wrapmin')
   event.preventDefault()
  })

 }

 ;
 const option={
  cls:'w'
  ,resize:true
  ,drag:true
  ,min:true
  ,grid:30
  ,padding:'0.5rem'
  ,border:'2px solid'
  ,boxSizing:'border-box'
 }
 ;
 ;
 function entry(query,_opt){
  makemin()
  ;
  let opt=Object.assign({},option,_opt)
  let tar=fn.q(query) //need alive
  let el=fn.ce('div')
  el.classList.add(opt.cls)
  el.style.display='inline-block' //need
  el.style.position='absolute' //need
  el.style.padding=opt.padding
  el.style.border=opt.border
  el.style.boxSizing=opt.boxSizing
  let dummy=fn.ce('span')
  dummy.classList.add('dummy1234')
  fn.as2(dummy,tar)
  fn.a2(tar,el)
  dummy.parentElement.replaceChild(el,dummy)
  ir(el,opt,tar)
  return el;
 }
 root.wrap=entry;
})(this);
