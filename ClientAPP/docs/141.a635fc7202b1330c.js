"use strict";(self.webpackChunkClientAPP=self.webpackChunkClientAPP||[]).push([[141],{1141:(A,d,s)=>{s.r(d),s.d(d,{BasketModule:()=>x});var i=s(6814),u=s(8733),t=s(4946),p=s(7183);function m(e,r){if(1&e&&(t.TgZ(0,"ul",4)(1,"li",5)(2,"strong",6),t._uU(3,"Order Subtotal "),t.qZA(),t.TgZ(4,"strong"),t._uU(5),t.ALo(6,"currency"),t.qZA()(),t.TgZ(7,"li",5)(8,"strong",6),t._uU(9,"Shipping and Handling"),t.qZA(),t.TgZ(10,"strong"),t._uU(11),t.ALo(12,"currency"),t.qZA()(),t.TgZ(13,"li",5)(14,"strong",6),t._uU(15,"Order Subtotal "),t.qZA(),t.TgZ(16,"strong"),t._uU(17),t.ALo(18,"currency"),t.qZA()()()),2&e){const n=r.ngIf;t.xp6(5),t.Oqu(t.lcZ(6,3,n.subTotal)),t.xp6(6),t.Oqu(t.lcZ(12,5,n.shippingPrice)),t.xp6(6),t.Oqu(t.lcZ(18,7,n.total))}}let g=(()=>{var e;class r{constructor(o){this.basketService=o}}return(e=r).\u0275fac=function(o){return new(o||e)(t.Y36(p.v))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-order-total"]],decls:7,vars:3,consts:[[1,"bg-light","px-4","py-3","text-uppercase","fw-bold"],[1,"p-4"],[1,"fst-italic","mb-4"],["class","list-unstyled mb-4",4,"ngIf"],[1,"list-unstyled","mb-4"],[1,"d-flex","justify-content-between","py-3","border-bottom"],[1,"text-muted"]],template:function(o,c){1&o&&(t.TgZ(0,"div",0),t._uU(1," Order Summary "),t.qZA(),t.TgZ(2,"div",1)(3,"p",2),t._uU(4," Shipping cost will be calculated based on choices made during checkout "),t.qZA(),t.YNc(5,m,19,9,"ul",3),t.ALo(6,"async"),t.qZA()),2&o&&(t.xp6(5),t.Q6J("ngIf",t.lcZ(6,1,c.basketService.basketTotalSource$)))},dependencies:[i.O5,i.Ov,i.H9]}),r})();function Z(e,r){1&e&&(t.TgZ(0,"div")(1,"p"),t._uU(2," there are no items in your basket. "),t.qZA()())}function _(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"tr")(1,"th")(2,"div",12),t._UZ(3,"img",13),t.TgZ(4,"div",14)(5,"h5",15)(6,"a",16),t._uU(7),t.qZA()(),t.TgZ(8,"span",17),t._uU(9),t.qZA()()()(),t.TgZ(10,"td",18)(11,"strong"),t._uU(12),t.ALo(13,"currency"),t.qZA()(),t.TgZ(14,"td",18)(15,"div",19)(16,"i",20),t.NdJ("click",function(){const a=t.CHM(n).$implicit,l=t.oxw(2);return t.KtG(l.removeItem(a.id,1))}),t.qZA(),t.TgZ(17,"strong",21),t._uU(18),t.qZA(),t.TgZ(19,"i",22),t.NdJ("click",function(){const a=t.CHM(n).$implicit,l=t.oxw(2);return t.KtG(l.increamentItem(a))}),t.qZA()()(),t.TgZ(20,"td",18)(21,"strong"),t._uU(22),t.ALo(23,"currency"),t.qZA()(),t.TgZ(24,"td",18)(25,"a",23)(26,"i",24),t.NdJ("click",function(){const a=t.CHM(n).$implicit,l=t.oxw(2);return t.KtG(l.removeItem(a.id,a.quantity))}),t.qZA()()()()}if(2&e){const n=r.$implicit;t.xp6(3),t.s9C("src",n.pictureUrl,t.LSH),t.s9C("alt",n.productName),t.xp6(3),t.MGl("routerLink","shop/",n.id,""),t.xp6(1),t.Oqu(n.productName),t.xp6(2),t.hij(" Type:",n.type," "),t.xp6(3),t.Oqu(t.lcZ(13,8,n.price)),t.xp6(6),t.Oqu(n.quantity),t.xp6(4),t.hij(" ",t.lcZ(23,10,n.price*n.quantity),"")}}function f(e,r){if(1&e&&(t.ynx(0),t.TgZ(1,"div",2)(2,"div",3)(3,"div",4)(4,"table",5)(5,"thead",6)(6,"tr")(7,"th")(8,"div",7),t._uU(9,"Product"),t.qZA()(),t.TgZ(10,"th")(11,"div",7),t._uU(12,"Price"),t.qZA()(),t.TgZ(13,"th")(14,"div",7),t._uU(15,"Quantity"),t.qZA()(),t.TgZ(16,"th")(17,"div",7),t._uU(18,"Total"),t.qZA()(),t.TgZ(19,"th")(20,"div",7),t._uU(21,"Remove"),t.qZA()()()(),t.TgZ(22,"tbody"),t.YNc(23,_,27,12,"tr",8),t.qZA()()()(),t.TgZ(24,"div",3)(25,"div",9),t._UZ(26,"app-order-total"),t.TgZ(27,"div",10)(28,"a",11),t._uU(29,"Proceed to Checkout"),t.qZA()()()()(),t.BQk()),2&e){const n=r.ngIf;t.xp6(23),t.Q6J("ngForOf",n.items)}}const k=[{path:"",component:(()=>{var e;class r{constructor(o){this.basketService=o}increamentItem(o){this.basketService.addItemToBasket(o)}removeItem(o,c){this.basketService.removeItemFromBasket(o,c)}}return(e=r).\u0275fac=function(o){return new(o||e)(t.Y36(p.v))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-basket"]],decls:5,vars:6,consts:[[1,"container","mt-5"],[4,"ngIf"],[1,"container"],[1,"row"],[1,"table-responsive"],[1,"table"],[1,"bg-light","text-uppercase"],[1,"py-2"],[4,"ngFor","ngForOf"],[1,"col-6","offset-6"],[1,"d-grid"],["routerLink","/checkout",1,"btn-outline-primary","py-2"],[1,"p-2","d-inline-block"],["loading","lazy",1,"img-fluid",2,"max-height","50px",3,"src","alt"],[1,"ms-3","d-inline-block","align-middle"],[1,"mb-0"],[1,"text-dark","text-decoration-none",3,"routerLink"],[1,"text-muted","fst-italic"],[1,"align-middle"],[1,"d-flex","align-items-center"],[1,"fa","fa-minus-circle","text-warning","me-2",2,"cursor","pointer","font-size","2em",3,"click"],[2,"font-size","1.5em"],[1,"fa","fa-plus-circle","text-warning","mx-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"text-danger"],[1,"fa","fa-trash",2,"font-size","2em","cursor","pointer",3,"click"]],template:function(o,c){1&o&&(t.TgZ(0,"div",0),t.YNc(1,Z,3,0,"div",1),t.ALo(2,"async"),t.YNc(3,f,30,1,"ng-container",1),t.ALo(4,"async"),t.qZA()),2&o&&(t.xp6(1),t.Q6J("ngIf",null===t.lcZ(2,2,c.basketService.basketSource$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(4,4,c.basketService.basketSource$)))},dependencies:[i.sg,i.O5,u.rH,g,i.Ov,i.H9]}),r})()}];let v=(()=>{var e;class r{}return(e=r).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[i.ez,u.Bz.forChild(k),u.Bz]}),r})();var T=s(6208);let x=(()=>{var e;class r{}return(e=r).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[i.ez,v,T.m]}),r})()}}]);