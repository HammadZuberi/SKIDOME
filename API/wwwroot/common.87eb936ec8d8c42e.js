"use strict";(self.webpackChunkClientAPP=self.webpackChunkClientAPP||[]).push([[592],{9384:(Z,g,a)=>{a.d(g,{b:()=>u});var t=a(4769),m=a(7183),l=a(6814),f=a(2999);function T(n,i){1&n&&(t.TgZ(0,"th")(1,"div",4),t._uU(2,"Remove"),t.qZA()())}function s(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"i",19),t.NdJ("click",function(){t.CHM(e);const p=t.oxw().$implicit,v=t.oxw(2);return t.KtG(v.removeBasketItem(p.id,1))}),t.qZA()}}function d(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"i",20),t.NdJ("click",function(){t.CHM(e);const p=t.oxw().$implicit,v=t.oxw(2);return t.KtG(v.addBasketItem(p))}),t.qZA()}}function c(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"td",13)(1,"a",21)(2,"i",22),t.NdJ("click",function(){t.CHM(e);const p=t.oxw().$implicit,v=t.oxw(2);return t.KtG(v.removeBasketItem(p.id,p.quantity))}),t.qZA()()()}}function _(n,i){if(1&n&&(t.TgZ(0,"tr")(1,"th")(2,"div",7),t._UZ(3,"img",8),t.TgZ(4,"div",9)(5,"h5",10)(6,"a",11),t._uU(7),t.qZA()(),t.TgZ(8,"span",12),t._uU(9),t.qZA()()()(),t.TgZ(10,"td",13)(11,"strong"),t._uU(12),t.ALo(13,"currency"),t.qZA()(),t.TgZ(14,"td",13)(15,"div",14),t.YNc(16,s,1,0,"i",15),t.TgZ(17,"strong",16),t._uU(18),t.qZA(),t.YNc(19,d,1,0,"i",17),t.qZA()(),t.TgZ(20,"td",13)(21,"strong"),t._uU(22),t.ALo(23,"currency"),t.qZA()(),t.YNc(24,c,3,0,"td",18),t.qZA()),2&n){const e=i.$implicit,o=t.oxw(2);t.xp6(3),t.s9C("src",e.pictureUrl,t.LSH),t.s9C("alt",e.productName),t.xp6(3),t.MGl("routerLink","/shop/",e.id,""),t.xp6(1),t.Oqu(e.productName),t.xp6(2),t.hij(" Type:",e.type," "),t.xp6(3),t.Oqu(t.lcZ(13,13,e.price)),t.xp6(3),t.ekj("justify-content-center",!o.isBasket),t.xp6(1),t.Q6J("ngIf",o.isBasket),t.xp6(2),t.Oqu(e.quantity),t.xp6(1),t.Q6J("ngIf",o.isBasket),t.xp6(3),t.hij(" ",t.lcZ(23,15,e.price*e.quantity),""),t.xp6(2),t.Q6J("ngIf",o.isBasket)}}function r(n,i){if(1&n&&(t.TgZ(0,"div",1)(1,"table",2)(2,"thead",3)(3,"tr")(4,"th")(5,"div",4),t._uU(6,"Product"),t.qZA()(),t.TgZ(7,"th")(8,"div",4),t._uU(9,"Price"),t.qZA()(),t.TgZ(10,"th")(11,"div",4),t._uU(12,"Quantity"),t.qZA()(),t.TgZ(13,"th")(14,"div",4),t._uU(15,"Total"),t.qZA()(),t.YNc(16,T,3,0,"th",5),t.qZA()(),t.TgZ(17,"tbody"),t.YNc(18,_,25,17,"tr",6),t.qZA()()()),2&n){const e=i.ngIf,o=t.oxw();t.xp6(2),t.ekj("bg-light",o.isBasket),t.xp6(8),t.ekj("text-center",!o.isBasket),t.xp6(6),t.Q6J("ngIf",o.isBasket),t.xp6(2),t.Q6J("ngForOf",e.items)}}let u=(()=>{var n;class i{constructor(o){this.basketService=o,this.addItem=new t.vpe,this.removeItem=new t.vpe,this.isBasket=!0}addBasketItem(o){this.addItem.emit(o)}removeBasketItem(o,p=1){this.removeItem.emit({id:o,quantity:p})}}return(n=i).\u0275fac=function(o){return new(o||n)(t.Y36(m.v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-basket-summary"]],inputs:{isBasket:"isBasket"},outputs:{addItem:"addItem",removeItem:"removeItem"},decls:2,vars:3,consts:[["class","table-responsive",4,"ngIf"],[1,"table-responsive"],[1,"table"],[1,"text-uppercase"],[1,"py-2"],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"p-2","d-inline-block"],["loading","lazy",1,"img-fluid",2,"max-height","50px",3,"src","alt"],[1,"ms-3","d-inline-block","align-middle"],[1,"mb-0"],[1,"text-dark","text-decoration-none",3,"routerLink"],[1,"text-muted","fst-italic"],[1,"align-middle"],[1,"d-flex","align-items-center"],["class","fa fa-minus-circle text-warning me-2","style","cursor: pointer; font-size: 2em;",3,"click",4,"ngIf"],[2,"font-size","1.5em"],["class","fa fa-plus-circle text-warning mx-2","style","cursor: pointer; font-size: 2em;",3,"click",4,"ngIf"],["class","align-middle",4,"ngIf"],[1,"fa","fa-minus-circle","text-warning","me-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"fa","fa-plus-circle","text-warning","mx-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"text-danger"],[1,"fa","fa-trash",2,"font-size","2em","cursor","pointer",3,"click"]],template:function(o,p){1&o&&(t.YNc(0,r,19,6,"div",0),t.ALo(1,"async")),2&o&&t.Q6J("ngIf",t.lcZ(1,1,p.basketService.basketSource$))},dependencies:[l.sg,l.O5,f.rH,l.Ov,l.H9]}),i})()},9866:(Z,g,a)=>{a.d(g,{m:()=>_});var t=a(4769),m=a(95),l=a(6814);function f(r,u){1&r&&t._UZ(0,"div",5)}function T(r,u){if(1&r&&(t.TgZ(0,"div",6),t._uU(1),t.qZA()),2&r){const n=t.oxw();t.xp6(1),t.hij(" ",n.label," is required ")}}function s(r,u){1&r&&(t.TgZ(0,"div",6),t._uU(1," Please choose a correct email ID "),t.qZA())}function d(r,u){1&r&&(t.TgZ(0,"div",6),t._uU(1," The entered email address is already taken. "),t.qZA())}function c(r,u){1&r&&(t.TgZ(0,"div",6),t._uU(1," Please choose a complex password with "),t.TgZ(2,"ul")(3,"li"),t._uU(4," 8-16 characters"),t.qZA(),t.TgZ(5,"li"),t._uU(6,"1 Upper case"),t.qZA(),t.TgZ(7,"li"),t._uU(8,"1 Lower case"),t.qZA(),t.TgZ(9,"li"),t._uU(10,"1 digit"),t.qZA(),t.TgZ(11,"li"),t._uU(12,"1 special charachter"),t.qZA()()())}let _=(()=>{var r;class u{constructor(i){this.controlDir=i,this.type="text",this.label="",this.controlDir.valueAccessor=this}writeValue(i){}registerOnChange(i){}registerOnTouched(i){}setDisabledState(i){}get control(){return this.controlDir.control}}return(r=u).\u0275fac=function(i){return new(i||r)(t.Y36(m.a5,2))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-input-text"]],inputs:{type:"type",label:"label"},decls:9,vars:10,consts:[[1,"form-floating","mb-3"],[1,"form-control",3,"formControl","ngClass","type","placeholder"],["class","fa fa-spinner fa-spin loader",4,"ngIf"],["for","floatingInput"],["class","invalid-feedback",4,"ngIf"],[1,"fa","fa-spinner","fa-spin","loader"],[1,"invalid-feedback"]],template:function(i,e){1&i&&(t.TgZ(0,"div",0),t._UZ(1,"input",1),t.YNc(2,f,1,0,"div",2),t.TgZ(3,"label",3),t._uU(4),t.qZA(),t.YNc(5,T,2,1,"div",4),t.YNc(6,s,2,0,"div",4),t.YNc(7,d,2,0,"div",4),t.YNc(8,c,13,0,"div",4),t.qZA()),2&i&&(t.xp6(1),t.s9C("type",e.type),t.s9C("placeholder",e.label),t.Q6J("formControl",e.control)("ngClass",e.control.touched?e.control.invalid?"is-invalid":"is-valid":null),t.xp6(1),t.Q6J("ngIf","PENDING"==e.control.status),t.xp6(2),t.Oqu(e.label),t.xp6(1),t.Q6J("ngIf",null==e.control.errors?null:e.control.errors.required),t.xp6(1),t.Q6J("ngIf",null==e.control.errors?null:e.control.errors.email),t.xp6(1),t.Q6J("ngIf",null==e.control.errors?null:e.control.errors.emailExists),t.xp6(1),t.Q6J("ngIf",null==e.control.errors?null:e.control.errors.pattern))},dependencies:[l.mk,l.O5,m.Fj,m.JJ,m.oH],styles:[".loader[_ngcontent-%COMP%]{position:absolute;width:auto;top:20px;right:40px;margin-top:0}"]}),u})()},9366:(Z,g,a)=>{a.d(g,{V:()=>T});var t=a(4769),m=a(7183),l=a(6814);function f(s,d){if(1&s&&(t.TgZ(0,"ul",4)(1,"li",5)(2,"strong",6),t._uU(3,"Order Subtotal "),t.qZA(),t.TgZ(4,"strong"),t._uU(5),t.ALo(6,"currency"),t.qZA()(),t.TgZ(7,"li",5)(8,"strong",6),t._uU(9,"Shipping and Handling"),t.qZA(),t.TgZ(10,"strong"),t._uU(11),t.ALo(12,"currency"),t.qZA()(),t.TgZ(13,"li",5)(14,"strong",6),t._uU(15,"Order Subtotal "),t.qZA(),t.TgZ(16,"strong"),t._uU(17),t.ALo(18,"currency"),t.qZA()()()),2&s){const c=d.ngIf;t.xp6(5),t.Oqu(t.lcZ(6,3,c.subTotal)),t.xp6(6),t.Oqu(t.lcZ(12,5,c.shippingPrice)),t.xp6(6),t.Oqu(t.lcZ(18,7,c.total))}}let T=(()=>{var s;class d{constructor(_){this.basketService=_}}return(s=d).\u0275fac=function(_){return new(_||s)(t.Y36(m.v))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-order-total"]],decls:7,vars:3,consts:[[1,"bg-light","px-4","py-3","text-uppercase","fw-bold"],[1,"p-4"],[1,"fst-italic","mb-4"],["class","list-unstyled mb-4",4,"ngIf"],[1,"list-unstyled","mb-4"],[1,"d-flex","justify-content-between","py-3","border-bottom"],[1,"text-muted"]],template:function(_,r){1&_&&(t.TgZ(0,"div",0),t._uU(1," Order Summary "),t.qZA(),t.TgZ(2,"div",1)(3,"p",2),t._uU(4," Shipping cost will be calculated based on choices made during checkout "),t.qZA(),t.YNc(5,f,19,9,"ul",3),t.ALo(6,"async"),t.qZA()),2&_&&(t.xp6(5),t.Q6J("ngIf",t.lcZ(6,1,r.basketService.basketTotalSource$)))},dependencies:[l.O5,l.Ov,l.H9]}),d})()}}]);