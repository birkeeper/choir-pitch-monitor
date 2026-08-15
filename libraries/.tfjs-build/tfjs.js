var MD=Object.create;var Jf=Object.defineProperty;var LD=Object.getOwnPropertyDescriptor;var BD=Object.getOwnPropertyNames;var zD=Object.getPrototypeOf,VD=Object.prototype.hasOwnProperty;var mo=(o,t)=>()=>{try{return t||o((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}},Ae=(o,t)=>{for(var e in t)Jf(o,e,{get:t[e],enumerable:!0})},WD=(o,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of BD(t))!VD.call(o,n)&&n!==e&&Jf(o,n,{get:()=>t[n],enumerable:!(r=LD(t,n))||r.enumerable});return o};var th=(o,t,e)=>(e=o!=null?MD(zD(o)):{},WD(t||!o||!o.__esModule?Jf(e,"default",{value:o,enumerable:!0}):e,o));var HC=mo((aY,GC)=>{GC.exports=Jt;var fo=null;try{fo=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function Jt(o,t,e){this.low=o|0,this.high=t|0,this.unsigned=!!e}Jt.prototype.__isLong__;Object.defineProperty(Jt.prototype,"__isLong__",{value:!0});function je(o){return(o&&o.__isLong__)===!0}Jt.isLong=je;var _C={},OC={};function Ji(o,t){var e,r,n;return t?(o>>>=0,(n=0<=o&&o<256)&&(r=OC[o],r)?r:(e=te(o,(o|0)<0?-1:0,!0),n&&(OC[o]=e),e)):(o|=0,(n=-128<=o&&o<128)&&(r=_C[o],r)?r:(e=te(o,o<0?-1:0,!1),n&&(_C[o]=e),e))}Jt.fromInt=Ji;function ho(o,t){if(isNaN(o))return t?Zi:go;if(t){if(o<0)return Zi;if(o>=zC)return UC}else{if(o<=-LC)return Xe;if(o+1>=LC)return WC}return o<0?ho(-o,t).neg():te(o%bu|0,o/bu|0,t)}Jt.fromNumber=ho;function te(o,t,e){return new Jt(o,t,e)}Jt.fromBits=te;var kl=Math.pow;function dh(o,t,e){if(o.length===0)throw Error("empty string");if(o==="NaN"||o==="Infinity"||o==="+Infinity"||o==="-Infinity")return go;if(typeof t=="number"?(e=t,t=!1):t=!!t,e=e||10,e<2||36<e)throw RangeError("radix");var r;if((r=o.indexOf("-"))>0)throw Error("interior hyphen");if(r===0)return dh(o.substring(1),t,e).neg();for(var n=ho(kl(e,8)),s=go,i=0;i<o.length;i+=8){var a=Math.min(8,o.length-i),u=parseInt(o.substring(i,i+a),e);if(a<8){var c=ho(kl(e,a));s=s.mul(c).add(ho(u))}else s=s.mul(n),s=s.add(ho(u))}return s.unsigned=t,s}Jt.fromString=dh;function Ro(o,t){return typeof o=="number"?ho(o,t):typeof o=="string"?dh(o,t):te(o.low,o.high,typeof t=="boolean"?t:o.unsigned)}Jt.fromValue=Ro;var MC=65536,pA=1<<24,bu=MC*MC,zC=bu*bu,LC=zC/2,BC=Ji(pA),go=Ji(0);Jt.ZERO=go;var Zi=Ji(0,!0);Jt.UZERO=Zi;var Cu=Ji(1);Jt.ONE=Cu;var VC=Ji(1,!0);Jt.UONE=VC;var mh=Ji(-1);Jt.NEG_ONE=mh;var WC=te(-1,2147483647,!1);Jt.MAX_VALUE=WC;var UC=te(-1,-1,!0);Jt.MAX_UNSIGNED_VALUE=UC;var Xe=te(0,-2147483648,!1);Jt.MIN_VALUE=Xe;var rt=Jt.prototype;rt.toInt=function(){return this.unsigned?this.low>>>0:this.low};rt.toNumber=function(){return this.unsigned?(this.high>>>0)*bu+(this.low>>>0):this.high*bu+(this.low>>>0)};rt.toString=function(t){if(t=t||10,t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(Xe)){var e=ho(t),r=this.div(e),n=r.mul(e).sub(this);return r.toString(t)+n.toInt().toString(t)}else return"-"+this.neg().toString(t);for(var s=ho(kl(t,6),this.unsigned),i=this,a="";;){var u=i.div(s),c=i.sub(u.mul(s)).toInt()>>>0,l=c.toString(t);if(i=u,i.isZero())return l+a;for(;l.length<6;)l="0"+l;a=""+l+a}};rt.getHighBits=function(){return this.high};rt.getHighBitsUnsigned=function(){return this.high>>>0};rt.getLowBits=function(){return this.low};rt.getLowBitsUnsigned=function(){return this.low>>>0};rt.getNumBitsAbs=function(){if(this.isNegative())return this.eq(Xe)?64:this.neg().getNumBitsAbs();for(var t=this.high!=0?this.high:this.low,e=31;e>0&&(t&1<<e)==0;e--);return this.high!=0?e+33:e+1};rt.isZero=function(){return this.high===0&&this.low===0};rt.eqz=rt.isZero;rt.isNegative=function(){return!this.unsigned&&this.high<0};rt.isPositive=function(){return this.unsigned||this.high>=0};rt.isOdd=function(){return(this.low&1)===1};rt.isEven=function(){return(this.low&1)===0};rt.equals=function(t){return je(t)||(t=Ro(t)),this.unsigned!==t.unsigned&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low};rt.eq=rt.equals;rt.notEquals=function(t){return!this.eq(t)};rt.neq=rt.notEquals;rt.ne=rt.notEquals;rt.lessThan=function(t){return this.comp(t)<0};rt.lt=rt.lessThan;rt.lessThanOrEqual=function(t){return this.comp(t)<=0};rt.lte=rt.lessThanOrEqual;rt.le=rt.lessThanOrEqual;rt.greaterThan=function(t){return this.comp(t)>0};rt.gt=rt.greaterThan;rt.greaterThanOrEqual=function(t){return this.comp(t)>=0};rt.gte=rt.greaterThanOrEqual;rt.ge=rt.greaterThanOrEqual;rt.compare=function(t){if(je(t)||(t=Ro(t)),this.eq(t))return 0;var e=this.isNegative(),r=t.isNegative();return e&&!r?-1:!e&&r?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1};rt.comp=rt.compare;rt.negate=function(){return!this.unsigned&&this.eq(Xe)?Xe:this.not().add(Cu)};rt.neg=rt.negate;rt.add=function(t){je(t)||(t=Ro(t));var e=this.high>>>16,r=this.high&65535,n=this.low>>>16,s=this.low&65535,i=t.high>>>16,a=t.high&65535,u=t.low>>>16,c=t.low&65535,l=0,p=0,m=0,d=0;return d+=s+c,m+=d>>>16,d&=65535,m+=n+u,p+=m>>>16,m&=65535,p+=r+a,l+=p>>>16,p&=65535,l+=e+i,l&=65535,te(m<<16|d,l<<16|p,this.unsigned)};rt.subtract=function(t){return je(t)||(t=Ro(t)),this.add(t.neg())};rt.sub=rt.subtract;rt.multiply=function(t){if(this.isZero())return go;if(je(t)||(t=Ro(t)),fo){var e=fo.mul(this.low,this.high,t.low,t.high);return te(e,fo.get_high(),this.unsigned)}if(t.isZero())return go;if(this.eq(Xe))return t.isOdd()?Xe:go;if(t.eq(Xe))return this.isOdd()?Xe:go;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(BC)&&t.lt(BC))return ho(this.toNumber()*t.toNumber(),this.unsigned);var r=this.high>>>16,n=this.high&65535,s=this.low>>>16,i=this.low&65535,a=t.high>>>16,u=t.high&65535,c=t.low>>>16,l=t.low&65535,p=0,m=0,d=0,f=0;return f+=i*l,d+=f>>>16,f&=65535,d+=s*l,m+=d>>>16,d&=65535,d+=i*c,m+=d>>>16,d&=65535,m+=n*l,p+=m>>>16,m&=65535,m+=s*c,p+=m>>>16,m&=65535,m+=i*u,p+=m>>>16,m&=65535,p+=r*l+n*c+s*u+i*a,p&=65535,te(d<<16|f,p<<16|m,this.unsigned)};rt.mul=rt.multiply;rt.divide=function(t){if(je(t)||(t=Ro(t)),t.isZero())throw Error("division by zero");if(fo){if(!this.unsigned&&this.high===-2147483648&&t.low===-1&&t.high===-1)return this;var e=(this.unsigned?fo.div_u:fo.div_s)(this.low,this.high,t.low,t.high);return te(e,fo.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Zi:go;var r,n,s;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return Zi;if(t.gt(this.shru(1)))return VC;s=Zi}else{if(this.eq(Xe)){if(t.eq(Cu)||t.eq(mh))return Xe;if(t.eq(Xe))return Cu;var i=this.shr(1);return r=i.div(t).shl(1),r.eq(go)?t.isNegative()?Cu:mh:(n=this.sub(t.mul(r)),s=r.add(n.div(t)),s)}else if(t.eq(Xe))return this.unsigned?Zi:go;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();s=go}for(n=this;n.gte(t);){r=Math.max(1,Math.floor(n.toNumber()/t.toNumber()));for(var a=Math.ceil(Math.log(r)/Math.LN2),u=a<=48?1:kl(2,a-48),c=ho(r),l=c.mul(t);l.isNegative()||l.gt(n);)r-=u,c=ho(r,this.unsigned),l=c.mul(t);c.isZero()&&(c=Cu),s=s.add(c),n=n.sub(l)}return s};rt.div=rt.divide;rt.modulo=function(t){if(je(t)||(t=Ro(t)),fo){var e=(this.unsigned?fo.rem_u:fo.rem_s)(this.low,this.high,t.low,t.high);return te(e,fo.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))};rt.mod=rt.modulo;rt.rem=rt.modulo;rt.not=function(){return te(~this.low,~this.high,this.unsigned)};rt.and=function(t){return je(t)||(t=Ro(t)),te(this.low&t.low,this.high&t.high,this.unsigned)};rt.or=function(t){return je(t)||(t=Ro(t)),te(this.low|t.low,this.high|t.high,this.unsigned)};rt.xor=function(t){return je(t)||(t=Ro(t)),te(this.low^t.low,this.high^t.high,this.unsigned)};rt.shiftLeft=function(t){return je(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?te(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):te(0,this.low<<t-32,this.unsigned)};rt.shl=rt.shiftLeft;rt.shiftRight=function(t){return je(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?te(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):te(this.high>>t-32,this.high>=0?0:-1,this.unsigned)};rt.shr=rt.shiftRight;rt.shiftRightUnsigned=function(t){if(je(t)&&(t=t.toInt()),t&=63,t===0)return this;var e=this.high;if(t<32){var r=this.low;return te(r>>>t|e<<32-t,e>>>t,this.unsigned)}else return t===32?te(e,0,this.unsigned):te(e>>>t-32,0,this.unsigned)};rt.shru=rt.shiftRightUnsigned;rt.shr_u=rt.shiftRightUnsigned;rt.toSigned=function(){return this.unsigned?te(this.low,this.high,!1):this};rt.toUnsigned=function(){return this.unsigned?this:te(this.low,this.high,!0)};rt.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()};rt.toBytesLE=function(){var t=this.high,e=this.low;return[e&255,e>>>8&255,e>>>16&255,e>>>24,t&255,t>>>8&255,t>>>16&255,t>>>24]};rt.toBytesBE=function(){var t=this.high,e=this.low;return[t>>>24,t>>>16&255,t>>>8&255,t&255,e>>>24,e>>>16&255,e>>>8&255,e&255]};Jt.fromBytes=function(t,e,r){return r?Jt.fromBytesLE(t,e):Jt.fromBytesBE(t,e)};Jt.fromBytesLE=function(t,e){return new Jt(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,e)};Jt.fromBytesBE=function(t,e){return new Jt(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],e)}});var Pb=mo(()=>{});var _b=mo(()=>{});var Gb=mo((Ub,pg)=>{(function(o,t,e){function r(a){var u=this,c=i();u.next=function(){var l=2091639*u.s0+u.c*23283064365386963e-26;return u.s0=u.s1,u.s1=u.s2,u.s2=l-(u.c=l|0)},u.c=1,u.s0=c(" "),u.s1=c(" "),u.s2=c(" "),u.s0-=c(a),u.s0<0&&(u.s0+=1),u.s1-=c(a),u.s1<0&&(u.s1+=1),u.s2-=c(a),u.s2<0&&(u.s2+=1),c=null}function n(a,u){return u.c=a.c,u.s0=a.s0,u.s1=a.s1,u.s2=a.s2,u}function s(a,u){var c=new r(a),l=u&&u.state,p=c.next;return p.int32=function(){return c.next()*4294967296|0},p.double=function(){return p()+(p()*2097152|0)*11102230246251565e-32},p.quick=p,l&&(typeof l=="object"&&n(l,c),p.state=function(){return n(c,{})}),p}function i(){var a=4022871197,u=function(c){c=String(c);for(var l=0;l<c.length;l++){a+=c.charCodeAt(l);var p=.02519603282416938*a;a=p>>>0,p-=a,p*=a,a=p>>>0,p-=a,a+=p*4294967296}return(a>>>0)*23283064365386963e-26};return u}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.alea=s})(Ub,typeof pg=="object"&&pg,typeof define=="function"&&define)});var Kb=mo((Hb,mg)=>{(function(o,t,e){function r(i){var a=this,u="";a.x=0,a.y=0,a.z=0,a.w=0,a.next=function(){var l=a.x^a.x<<11;return a.x=a.y,a.y=a.z,a.z=a.w,a.w^=a.w>>>19^l^l>>>8},i===(i|0)?a.x=i:u+=i;for(var c=0;c<u.length+64;c++)a.x^=u.charCodeAt(c)|0,a.next()}function n(i,a){return a.x=i.x,a.y=i.y,a.z=i.z,a.w=i.w,a}function s(i,a){var u=new r(i),c=a&&a.state,l=function(){return(u.next()>>>0)/4294967296};return l.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},l.int32=u.next,l.quick=l,c&&(typeof c=="object"&&n(c,u),l.state=function(){return n(u,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xor128=s})(Hb,typeof mg=="object"&&mg,typeof define=="function"&&define)});var Xb=mo((qb,dg)=>{(function(o,t,e){function r(i){var a=this,u="";a.next=function(){var l=a.x^a.x>>>2;return a.x=a.y,a.y=a.z,a.z=a.w,a.w=a.v,(a.d=a.d+362437|0)+(a.v=a.v^a.v<<4^(l^l<<1))|0},a.x=0,a.y=0,a.z=0,a.w=0,a.v=0,i===(i|0)?a.x=i:u+=i;for(var c=0;c<u.length+64;c++)a.x^=u.charCodeAt(c)|0,c==u.length&&(a.d=a.x<<10^a.x>>>4),a.next()}function n(i,a){return a.x=i.x,a.y=i.y,a.z=i.z,a.w=i.w,a.v=i.v,a.d=i.d,a}function s(i,a){var u=new r(i),c=a&&a.state,l=function(){return(u.next()>>>0)/4294967296};return l.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},l.int32=u.next,l.quick=l,c&&(typeof c=="object"&&n(c,u),l.state=function(){return n(u,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xorwow=s})(qb,typeof dg=="object"&&dg,typeof define=="function"&&define)});var Yb=mo((jb,fg)=>{(function(o,t,e){function r(i){var a=this;a.next=function(){var c=a.x,l=a.i,p,m,d;return p=c[l],p^=p>>>7,m=p^p<<24,p=c[l+1&7],m^=p^p>>>10,p=c[l+3&7],m^=p^p>>>3,p=c[l+4&7],m^=p^p<<7,p=c[l+7&7],p=p^p<<13,m^=p^p<<9,c[l]=m,a.i=l+1&7,m};function u(c,l){var p,m,d=[];if(l===(l|0))m=d[0]=l;else for(l=""+l,p=0;p<l.length;++p)d[p&7]=d[p&7]<<15^l.charCodeAt(p)+d[p+1&7]<<13;for(;d.length<8;)d.push(0);for(p=0;p<8&&d[p]===0;++p);for(p==8?m=d[7]=-1:m=d[p],c.x=d,c.i=0,p=256;p>0;--p)c.next()}u(a,i)}function n(i,a){return a.x=i.x.slice(),a.i=i.i,a}function s(i,a){i==null&&(i=+new Date);var u=new r(i),c=a&&a.state,l=function(){return(u.next()>>>0)/4294967296};return l.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},l.int32=u.next,l.quick=l,c&&(c.x&&n(c,u),l.state=function(){return n(u,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xorshift7=s})(jb,typeof fg=="object"&&fg,typeof define=="function"&&define)});var Zb=mo((Qb,hg)=>{(function(o,t,e){function r(i){var a=this;a.next=function(){var c=a.w,l=a.X,p=a.i,m,d;return a.w=c=c+1640531527|0,d=l[p+34&127],m=l[p=p+1&127],d^=d<<13,m^=m<<17,d^=d>>>15,m^=m>>>12,d=l[p]=d^m,a.i=p,d+(c^c>>>16)|0};function u(c,l){var p,m,d,f,h,g=[],x=128;for(l===(l|0)?(m=l,l=null):(l=l+"\0",m=0,x=Math.max(x,l.length)),d=0,f=-32;f<x;++f)l&&(m^=l.charCodeAt((f+32)%l.length)),f===0&&(h=m),m^=m<<10,m^=m>>>15,m^=m<<4,m^=m>>>13,f>=0&&(h=h+1640531527|0,p=g[f&127]^=m+h,d=p==0?d+1:0);for(d>=128&&(g[(l&&l.length||0)&127]=-1),d=127,f=512;f>0;--f)m=g[d+34&127],p=g[d=d+1&127],m^=m<<13,p^=p<<17,m^=m>>>15,p^=p>>>12,g[d]=m^p;c.w=h,c.X=g,c.i=d}u(a,i)}function n(i,a){return a.i=i.i,a.w=i.w,a.X=i.X.slice(),a}function s(i,a){i==null&&(i=+new Date);var u=new r(i),c=a&&a.state,l=function(){return(u.next()>>>0)/4294967296};return l.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},l.int32=u.next,l.quick=l,c&&(c.X&&n(c,u),l.state=function(){return n(u,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xor4096=s})(Qb,typeof hg=="object"&&hg,typeof define=="function"&&define)});var ty=mo((Jb,gg)=>{(function(o,t,e){function r(i){var a=this,u="";a.next=function(){var l=a.b,p=a.c,m=a.d,d=a.a;return l=l<<25^l>>>7^p,p=p-m|0,m=m<<24^m>>>8^d,d=d-l|0,a.b=l=l<<20^l>>>12^p,a.c=p=p-m|0,a.d=m<<16^p>>>16^d,a.a=d-l|0},a.a=0,a.b=0,a.c=-1640531527,a.d=1367130551,i===Math.floor(i)?(a.a=i/4294967296|0,a.b=i|0):u+=i;for(var c=0;c<u.length+20;c++)a.b^=u.charCodeAt(c)|0,a.next()}function n(i,a){return a.a=i.a,a.b=i.b,a.c=i.c,a.d=i.d,a}function s(i,a){var u=new r(i),c=a&&a.state,l=function(){return(u.next()>>>0)/4294967296};return l.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},l.int32=u.next,l.quick=l,c&&(typeof c=="object"&&n(c,u),l.state=function(){return n(u,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.tychei=s})(Jb,typeof gg=="object"&&gg,typeof define=="function"&&define)});var ey=mo(()=>{});var ry=mo((oy,Kl)=>{(function(o,t,e){var r=256,n=6,s=52,i="random",a=e.pow(r,n),u=e.pow(2,s),c=u*2,l=r-1,p;function m(w,v,k){var N=[];v=v==!0?{entropy:!0}:v||{};var E=g(h(v.entropy?[w,b(t)]:w??x(),3),N),R=new d(N),A=function(){for(var F=R.g(n),P=a,_=0;F<u;)F=(F+_)*r,P*=r,_=R.g(1);for(;F>=c;)F/=2,P/=2,_>>>=1;return(F+_)/P};return A.int32=function(){return R.g(4)|0},A.quick=function(){return R.g(4)/4294967296},A.double=A,g(b(R.S),t),(v.pass||k||function(F,P,_,O){return O&&(O.S&&f(O,R),F.state=function(){return f(R,{})}),_?(e[i]=F,P):F})(A,E,"global"in v?v.global:this==e,v.state)}function d(w){var v,k=w.length,N=this,E=0,R=N.i=N.j=0,A=N.S=[];for(k||(w=[k++]);E<r;)A[E]=E++;for(E=0;E<r;E++)A[E]=A[R=l&R+w[E%k]+(v=A[E])],A[R]=v;(N.g=function(F){for(var P,_=0,O=N.i,M=N.j,L=N.S;F--;)P=L[O=l&O+1],_=_*r+L[l&(L[O]=L[M=l&M+P])+(L[M]=P)];return N.i=O,N.j=M,_})(r)}function f(w,v){return v.i=w.i,v.j=w.j,v.S=w.S.slice(),v}function h(w,v){var k=[],N=typeof w,E;if(v&&N=="object")for(E in w)try{k.push(h(w[E],v-1))}catch{}return k.length?k:N=="string"?w:w+"\0"}function g(w,v){for(var k=w+"",N,E=0;E<k.length;)v[l&E]=l&(N^=v[l&E]*19)+k.charCodeAt(E++);return b(v)}function x(){try{var w;return p&&(w=p.randomBytes)?w=w(r):(w=new Uint8Array(r),(o.crypto||o.msCrypto).getRandomValues(w)),b(w)}catch{var v=o.navigator,k=v&&v.plugins;return[+new Date,o,k,o.screen,b(t)]}}function b(w){return String.fromCharCode.apply(0,w)}if(g(e.random(),t),typeof Kl=="object"&&Kl.exports){Kl.exports=m;try{p=ey()}catch{}}else typeof define=="function"&&define.amd?define(function(){return m}):e["seed"+i]=m})(typeof self<"u"?self:oy,[],Math)});var xg=mo((Ult,ny)=>{var iO=Gb(),aO=Kb(),uO=Xb(),cO=Yb(),lO=Zb(),pO=ty(),ma=ry();ma.alea=iO;ma.xor128=aO;ma.xorwow=uO;ma.xorshift7=cO;ma.xor4096=lO;ma.tychei=pO;ny.exports=ma});var mr=class{constructor(t,e){this.backend=t,this.dataMover=e,this.data=new WeakMap,this.dataIdsCount=0}get(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)}set(t,e){this.dataIdsCount++,this.data.set(t,e)}has(t){return this.data.has(t)}delete(t){return this.dataIdsCount--,this.data.delete(t)}numDataIds(){return this.dataIdsCount}},No=class{refCount(t){return qe("refCount")}incRef(t){return qe("incRef")}timerAvailable(){return!0}time(t){return qe("time")}read(t){return qe("read")}readSync(t){return qe("readSync")}readToGPU(t,e){return qe("readToGPU")}numDataIds(){return qe("numDataIds")}disposeData(t,e){return qe("disposeData")}write(t,e,r){return qe("write")}move(t,e,r,n,s){return qe("move")}createTensorFromGPUData(t,e,r){return qe("createTensorFromGPUData")}memory(){return qe("memory")}floatPrecision(){return qe("floatPrecision")}epsilon(){return this.floatPrecision()===32?1e-7:1e-4}dispose(){return qe("dispose")}};function qe(o){throw new Error(`'${o}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}function NC(o){let t=o.length,e=0;for(;t>0;)e=Math.random()*t|0,t--,wl(o,t,e)}function UD(o,t){if(o.length!==t.length)throw new Error(`Array sizes must match to be shuffled together First array length was ${o.length}Second array length was ${t.length}`);let e=o.length,r=0;for(;e>0;)r=Math.random()*e|0,e--,wl(o,e,r),wl(t,e,r)}function qa(o,t,e){return Math.max(o,Math.min(t,e))}function GD(o){return o%2===0?o:o+1}function wl(o,t,e){let r=o[t];o[t]=o[e],o[e]=r}function HD(o){let t=0;for(let e=0;e<o.length;e++)t+=o[e];return t}function KD(o,t){let e=Math.random();return t*e+(1-e)*o}function qD(o,t){let e=0;for(let r=0;r<o.length;r++){let n=Number(o[r])-Number(t[r]);e+=n*n}return e}function T(o,t){if(!o)throw new Error(typeof t=="string"?t:t())}function Gt(o,t,e=""){T(Oe(o,t),()=>e+` Shapes ${o} and ${t} must match`)}function ao(o){T(o!=null,()=>"The input to the tensor constructor must be a non-null value.")}function St(o){if(o.length===0)return 1;let t=o[0];for(let e=1;e<o.length;e++)t*=o[e];return t}function XD(o){return o.length===0}function eh(o,t){if(o===t)return!0;if(o==null||t==null||o.length!==t.length)return!1;for(let e=0;e<o.length;e++)if(o[e]!==null&&t[e]!==null&&o[e]!==t[e])return!1;return!0}function Oe(o,t){if(o===t)return!0;if(o==null||t==null||o.length!==t.length)return!1;for(let e=0;e<o.length;e++)if(o[e]!==t[e])return!1;return!0}function dr(o){return o%1===0}function jD(o){if(Math.tanh!=null)return Math.tanh(o);if(o===1/0)return 1;if(o===-1/0)return-1;{let t=Math.exp(2*o);return(t-1)/(t+1)}}function YD(o){let t=Math.ceil(Math.sqrt(o));return[t,Math.ceil(o/t)]}function QD(o){let t=new Uint32Array(o);for(let e=0;e<o;++e)t[e]=e;return NC(t),t}function Mi(o,t){return t<=o.length?o:o+" ".repeat(t-o.length)}function ZD(o,t=n=>0,e,r){return new Promise((n,s)=>{let i=0,a=()=>{if(o()){n();return}i++;let u=t(i);if(e!=null&&i>=e){s();return}r!=null?r(a,u):setTimeout(a,u)};a()})}function JD(o,t){let e=1,r=-1;for(let s=0;s<o.length;++s)if(o[s]>=0)e*=o[s];else if(o[s]===-1){if(r!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${s}`);r=s}else if(o[s]<0)throw Error(`Shapes can not be < 0. Found ${o[s]} at dim ${s}`);if(r===-1){if(t>0&&t!==e)throw Error(`Size(${t}) must match the product of shape ${o}`);return o}if(e===0)throw Error(`Cannot infer the missing size in [${o}] when there are 0 elements`);if(t%e!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${e}`);let n=o.slice();return n[r]=t/e,n}function Pn(o,t){let e=t.length;return o=o==null?t.map((r,n)=>n):[].concat(o),T(o.every(r=>r>=-e&&r<e),()=>`All values in axis param must be in range [-${e}, ${e}) but got axis ${o}`),T(o.every(r=>dr(r)),()=>`All values in axis param must be integers but got axis ${o}`),o.map(r=>r<0?e+r:r)}function oh(o,t){let e=[],r=[],n=t!=null&&Array.isArray(t)&&t.length===0,s=t==null||n?null:Pn(t,o).sort(),i=0;for(let a=0;a<o.length;++a){if(s!=null){if(s[i]===a&&o[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${o[a]}' is not 1`);(s[i]==null||s[i]>a)&&o[a]===1&&(e.push(o[a]),r.push(a)),s[i]<=a&&i++}o[a]!==1&&(e.push(o[a]),r.push(a))}return{newShape:e,keptDims:r}}function rh(o,t){return Sl(o,t)}function Sl(o,t){let e=null;if(o==null||o==="float32")e=new Float32Array(t);else if(o==="int32")e=new Int32Array(t);else if(o==="bool")e=new Uint8Array(t);else if(o==="string")e=new Array(t);else throw new Error(`Unknown data type ${o}`);return e}function nh(o,t){for(let e=0;e<o.length;e++){let r=o[e];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${t} being uploaded contains ${r}.`)}}function sh(o){return o==="bool"||o==="complex64"||o==="float32"||o==="int32"||o==="string"}function tA(o,t){return!(t==="complex64"||t==="float32"&&o!=="complex64"||t==="int32"&&o!=="float32"&&o!=="complex64"||t==="bool"&&o==="bool")}function Xa(o){if(o==="float32"||o==="int32")return 4;if(o==="complex64")return 8;if(o==="bool")return 1;throw new Error(`Unknown dtype ${o}`)}function ih(o){if(o==null)return 0;let t=0;return o.forEach(e=>t+=e.length),t}function Eo(o){return typeof o=="string"||o instanceof String}function EC(o){return typeof o=="boolean"}function RC(o){return typeof o=="number"}function _n(o){return Array.isArray(o)?_n(o[0]):o instanceof Float32Array?"float32":o instanceof Int32Array||o instanceof Uint8Array||o instanceof Uint8ClampedArray?"int32":RC(o)?"float32":Eo(o)?"string":EC(o)?"bool":"float32"}function Wo(o){return!!(o&&o.constructor&&o.call&&o.apply)}function ja(o,t){for(let e=t;e<o;++e)if(o%e===0)return e;return o}function Uo(o){let t=o.length;if(t<2)return[];let e=new Array(t-1);e[t-2]=o[t-1];for(let r=t-3;r>=0;--r)e[r]=e[r+1]*o[r+1];return e}function DC(o,t,e,r=!1){let n=new Array;if(t.length===1){let s=t[0]*(r?2:1);for(let i=0;i<s;i++)n[i]=e[o+i]}else{let s=t[0],i=t.slice(1),a=i.reduce((u,c)=>u*c)*(r?2:1);for(let u=0;u<s;u++)n[u]=DC(o+u*a,i,e,r)}return n}function Oi(o,t,e=!1){if(o.length===0)return t[0];let r=o.reduce((n,s)=>n*s)*(e?2:1);if(r===0)return[];if(r!==t.length)throw new Error(`[${o}] does not match the input size ${t.length}${e?" for a complex tensor":""}.`);return DC(0,o,t,e)}function eA(o,t){if(Array.isArray(o))return o;if(t==="float32")return o instanceof Float32Array?o:new Float32Array(o);if(t==="int32")return o instanceof Int32Array?o:new Int32Array(o);if(t==="bool"||t==="string")return Uint8Array.from(new Int32Array(o));throw new Error(`Unknown dtype ${t}`)}function gc(o,t){let e=Ya(o,t);for(let r=0;r<e.length;r++)e[r]=1;return e}function Ya(o,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(o);if(t==="int32")return new Int32Array(o);if(t==="bool")return new Uint8Array(o);throw new Error(`Unknown data type ${t}`)}function oA(o,t){let e=o.reduce((r,n)=>r*n,1);if(t==null||t==="float32")return Oi(o,new Float32Array(e));if(t==="int32")return Oi(o,new Int32Array(e));if(t==="bool")return Oi(o,new Uint8Array(e));throw new Error(`Unknown data type ${t}`)}function Xt(o){o.forEach(t=>{T(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${o}].`)})}function rA(o,t,e){if(t===0)return 0;if(t===1)return o[0];let r=o[o.length-1];for(let n=0;n<o.length-1;++n)r+=e[n]*o[n];return r}function nA(o,t,e){if(t===0)return[];if(t===1)return[o];let r=new Array(t);for(let n=0;n<r.length-1;++n)r[n]=Math.floor(o/e[n]),o-=r[n]*e[n];return r[r.length-1]=o,r}function Li(o){return o&&o.then&&typeof o.then=="function"}var AC="tfjsflags",xc=class{constructor(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=iA,this.populateURLFlags()}setPlatform(t,e){this.platform!=null&&(D().getBool("IS_TEST")||D().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${t}.`)),this.platformName=t,this.platform=e}registerFlag(t,e,r){if(this.flagRegistry[t]={evaluationFn:e,setHook:r},this.urlFlags[t]!=null){let n=this.urlFlags[t];D().getBool("IS_TEST")||D().getBool("PROD")||console.warn(`Setting feature override from URL ${t}: ${n}.`),this.set(t,n)}}async getAsync(t){return t in this.flags?this.flags[t]:(this.flags[t]=await this.evaluateFlag(t),this.flags[t])}get(t){if(t in this.flags)return this.flags[t];let e=this.evaluateFlag(t);if(Li(e))throw new Error(`Flag ${t} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[t]=e,this.flags[t]}getNumber(t){return this.get(t)}getBool(t){return this.get(t)}getString(t){return this.get(t)}getFlags(){return this.flags}get features(){return this.flags}set(t,e){if(this.flagRegistry[t]==null)throw new Error(`Cannot set flag ${t} as it has not been registered.`);this.flags[t]=e,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(e)}evaluateFlag(t){if(this.flagRegistry[t]==null)throw new Error(`Cannot evaluate flag '${t}': no evaluation function found.`);return this.flagRegistry[t].evaluationFn()}setFlags(t){this.flags=Object.assign({},t)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;let t=this.getQueryParams(this.global.location.search);AC in t&&t[AC].split(",").forEach(r=>{let[n,s]=r.split(":");this.urlFlags[n]=uA(n,s)})}};function iA(o){let t={};return o.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...r)=>(aA(t,r[0],r[1]),r.join("="))),t}function aA(o,t,e){o[decodeURIComponent(t)]=decodeURIComponent(e||"")}function uA(o,t){let e=t.toLowerCase();return e==="true"||e==="false"?e==="true":`${+e}`===e?+e:t}function D(){return ah}var ah=null;function FC(o){ah=o}var uh;function ch(){if(uh==null){let o;if(typeof window<"u")o=window;else if(typeof global<"u")o=global;else if(typeof process<"u")o=process;else if(typeof self<"u")o=self;else throw new Error("Could not find a global object");uh=o}return uh}function cA(){let o=ch();return o._tfGlobals==null&&(o._tfGlobals=new Map),o._tfGlobals}function Cc(o,t){let e=cA();if(e.has(o))return e.get(o);{let r=t();return e.set(o,r),e.get(o)}}var On="Abs",fr="Acos",hr="Acosh",Go="Add",Mn="AddN",Bi="All",zi="Any",Ln="ArgMax",Bn="ArgMin",gr="Asin",xr="Asinh",Cr="Atan",br="Atanh",yr="Atan2",zn="AvgPool",Qa="AvgPoolGrad",Vn="AvgPool3D",Za="AvgPool3DGrad",Wn="BatchMatMul",Un="BatchToSpaceND",Gn="Bincount",Vi="BitwiseAnd",G8="BroadcastTo",Hn="BroadcastArgs",Ho="Cast",wr="Ceil",Sr="ClipByValue",Kn="Complex",qn="ComplexAbs",Xn="Concat",jn="Conv2D",Yn="Conv2DBackpropFilter",Qn="Conv2DBackpropInput",Zn="Conv3D",Ja="Conv3DBackpropFilterV2",Jn="Conv3DBackpropInputV2",ts="Cos",vr="Cosh",es="Cumprod",os="Cumsum",rs="CropAndResize",ns="DenseBincount",ss="DepthToSpace",is="DepthwiseConv2dNative",as="DepthwiseConv2dNativeBackpropFilter",us="DepthwiseConv2dNativeBackpropInput",cs="Diag",ls="Dilation2D",bc="Dilation2DBackpropInput",yc="Dilation2DBackpropFilter",Wi="Draw",Ir="RealDiv",ps="Einsum",ms="Elu",tu="EluGrad",ds="Erf",kr="Equal",fs="Exp",hs="ExpandDims",$r="Expm1",Ui="FFT",gs="Fill",xs="FlipLeftRight",Tr="Floor",Nr="FloorDiv",Cs="FusedBatchNorm",bs="GatherV2",ys="GatherNd",Er="Greater",Rr="GreaterEqual",Ko="Identity",ws="IFFT",Ss="Imag",Dr="IsFinite",Ar="IsInf",Fr="IsNan",vs="LeakyRelu",Pr="Less",_r="LessEqual",Is="LinSpace",ks="Log",Or="Log1p",Mr="LogicalAnd",Lr="LogicalNot",Br="LogicalOr",H8="LogicalXor",K8="LogSoftmax",q8="LowerBound",Gi="LRN",eu="LRNGrad",X8="MatrixBandPart",Hi="Max",zr="Maximum",$s="MaxPool",ou="MaxPoolGrad",Ts="MaxPool3D",ru="MaxPool3DGrad",Ns="MaxPoolWithArgmax",Es="Mean",Ki="Min",Vr="Minimum",Rs="MirrorPad",Ds="Mod",As="Multinomial",Wr="Multiply",qi="Neg",Ur="NotEqual",Fs="NonMaxSuppressionV3",nu="NonMaxSuppressionV4",Ps="NonMaxSuppressionV5",_s="OnesLike",Os="OneHot",Ms="Pack",Ls="PadV2",j8="Pool",Bs="Pow",zs="Prelu",Vs="Prod",su="RaggedGather",iu="RaggedRange",au="RaggedTensorToTensor",Ws="Range",Us="Real",Gr="Reciprocal",Hr="Relu",Gs="Reshape",Hs="ResizeNearestNeighbor",uu="ResizeNearestNeighborGrad",Ks="ResizeBilinear",cu="ResizeBilinearGrad",Kr="Relu6",qs="Reverse",qr="Round",Xr="Rsqrt",Xs="ScatterNd",js="TensorScatterUpdate",Ys="SearchSorted",Qs="Select",jr="Selu",Zs="Slice",Js="Sin",Yr="Sinh",Qr="Sign",Zr="Sigmoid",Jr="Softplus",tn="Sqrt",Xi="Sum",ti="SpaceToBatchND",ei="SplitV",oi="Softmax",lu="SparseFillEmptyRows",pu="SparseReshape",ri="SparseSegmentMean",ni="SparseSegmentSum",si="SparseToDense",en="SquaredDifference",mu="Square",ji="StaticRegexReplace",ii="StridedSlice",ai="StringNGrams",du="StringSplit",fu="StringToHashBucketFast",ui="Sub",ci="Tan",on="Tanh",qo="Tile",li="TopK",pi="Transform",Xo="Transpose",hu="Unique",mi="Unpack",di="UnsortedSegmentSum",Y8="UpperBound",fi="ZerosLike",rn="Step",Yi="FromPixels",hi="RotateWithOffset",nn="_FusedMatMul",sn="FusedConv2D",an="FusedDepthwiseConv2D";function jo(...o){D().getBool("IS_TEST")||D().getBool("PROD")||console.warn(...o)}function lA(...o){D().getBool("IS_TEST")||D().getBool("PROD")||console.log(...o)}var gu=Cc("kernelRegistry",()=>new Map),wc=Cc("gradRegistry",()=>new Map);function xu(o,t){let e=ph(o,t);return gu.get(e)}function lh(o){return wc.get(o)}function vl(o){let t=gu.entries(),e=[];for(;;){let{done:r,value:n}=t.next();if(r)break;let[s,i]=n,[a]=s.split("_");a===o&&e.push(i)}return e}function Qi(o){let{kernelName:t,backendName:e}=o,r=ph(t,e);gu.has(r)&&jo(`The kernel '${t}' for backend '${e}' is already registered`),gu.set(r,o)}function eY(o){let{kernelName:t}=o;wc.has(t)&&D().getBool("DEBUG")&&jo(`Overriding the gradient for '${t}'`),wc.set(t,o)}function oY(o,t){let e=ph(o,t);if(!gu.has(e))throw new Error(`The kernel '${o}' for backend '${t}' is not registered`);gu.delete(e)}function rY(o){if(!wc.has(o))throw new Error(`The gradient '${o}' for backend is not registered`);wc.delete(o)}function nY(o,t){vl(o).forEach(r=>{let n=Object.assign({},r,{backendName:t});Qi(n)})}function ph(o,t){return`${t}_${o}`}var C={};Ae(C,{arraysEqual:()=>Oe,arraysEqualWithNull:()=>eh,assert:()=>T,assertNonNegativeIntegerDimensions:()=>Xt,assertNonNull:()=>ao,assertShapesMatch:()=>Gt,bytesFromStringArray:()=>ih,bytesPerElement:()=>Xa,checkConversionForErrors:()=>nh,clamp:()=>qa,computeStrides:()=>Uo,convertBackendValuesAndArrayBuffer:()=>eA,createScalarValue:()=>xA,createShuffledIndices:()=>QD,decodeString:()=>wu,distSquared:()=>qD,encodeString:()=>xi,fetch:()=>bA,fingerPrint64:()=>gA,flatten:()=>Do,getArrayFromDType:()=>Sl,getTypedArrayFromDType:()=>rh,hasEncodingLoss:()=>tA,hexToLong:()=>Sc,indexToLoc:()=>nA,inferDtype:()=>_n,inferFromImplicitShape:()=>JD,isBoolean:()=>EC,isFunction:()=>Wo,isInt:()=>dr,isNumber:()=>RC,isPromise:()=>Li,isScalarShape:()=>XD,isString:()=>Eo,isTypedArray:()=>ue,isValidDtype:()=>sh,locToIndex:()=>rA,makeOnesTypedArray:()=>gc,makeZerosNestedTypedArray:()=>oA,makeZerosTypedArray:()=>Ya,nearestDivisor:()=>ja,nearestLargerEven:()=>GD,now:()=>oa,parseAxisParam:()=>Pn,randUniform:()=>KD,repeatedTry:()=>ZD,rightPad:()=>Mi,shuffle:()=>NC,shuffleCombo:()=>UD,sizeFromShape:()=>St,sizeToSquarishShape:()=>YD,squeezeShape:()=>oh,sum:()=>HD,swap:()=>wl,tanh:()=>jD,toNestedArray:()=>Oi,toTypedArray:()=>yu});function Il(o){return o instanceof Float32Array||o instanceof Int32Array||o instanceof Uint8Array||o instanceof Uint8ClampedArray}var hh=th(HC());var ea=hh.default||hh;function Sc(o){return ea.fromString(o,!0,16)}var qC=Sc("c3a5c85c97cb3127"),ta=Sc("b492b66fbe98f273"),Me=Sc("9ae16a3b2f90404f");function fh(o){return o.xor(o.shru(47))}function XC(o,t,e){let r=o.slice(t,t+e);return ea.fromBytes(Array.from(r),!0,!0)}function jt(o,t){return XC(o,t,8)}function KC(o,t){return XC(o,t,4)}function be(o,t){return t===0?o:o.shru(t).or(o.shl(64-t))}function gi(o,t,e=Sc("9ddfea08eb382d69")){let r=o.xor(t).mul(e);r=r.xor(r.shru(47));let n=t.xor(r).mul(e);return n=n.xor(n.shru(47)),n=n.mul(e),n}function mA(o,t,e,r,n,s){n=n.add(o),s=be(s.add(n).add(r),21);let i=n;return n=n.add(t),n=n.add(e),s=s.add(be(n,44)),[n.add(r),s.add(i)]}function $l(o,t,e,r){return mA(jt(o,t),jt(o,t+8),jt(o,t+16),jt(o,t+24),e,r)}function dA(o,t=o.length){if(t>=8){let e=Me.add(t*2),r=jt(o,0).add(Me),n=jt(o,t-8),s=be(n,37).mul(e).add(r),i=be(r,25).add(n).mul(e);return gi(s,i,e)}if(t>=4){let e=Me.add(t*2),r=KC(o,0);return gi(r.shl(3).add(t),KC(o,t-4),e)}if(t>0){let e=o[0],r=o[t>>1],n=o[t-1],s=e+(r<<8),i=t+(n<<2);return fh(Me.mul(s).xor(qC.mul(i))).mul(Me)}return Me}function fA(o,t=o.length){let e=Me.add(t*2),r=jt(o,0).mul(ta),n=jt(o,8),s=jt(o,t-8).mul(e),i=jt(o,t-16).mul(Me);return gi(be(r.add(n),43).add(be(s,30)).add(i),r.add(be(n.add(Me),18)).add(s),e)}function hA(o,t=o.length){let e=Me.add(t*2),r=jt(o,0).mul(Me),n=jt(o,8),s=jt(o,t-8).mul(e),i=jt(o,t-16).mul(Me),a=be(r.add(n),43).add(be(s,30)).add(i),u=gi(a,r.add(be(n.add(Me),18)).add(s),e),c=jt(o,16).mul(e),l=jt(o,24),p=a.add(jt(o,t-32)).mul(e),m=u.add(jt(o,t-24)).mul(e);return gi(be(c.add(l),43).add(be(p,30)).add(m),c.add(be(l.add(r),18)).add(p),e)}function gA(o,t=o.length){let e=ea.fromNumber(81,!0);if(t<=32)return t<=16?dA(o,t):fA(o,t);if(t<=64)return hA(o,t);let r=e,n=e.mul(ta).add(113),s=fh(n.mul(Me).add(113)).mul(Me),i=[ea.UZERO,ea.UZERO],a=[ea.UZERO,ea.UZERO];r=r.mul(Me).add(jt(o,0));let u=0,c=(t-1>>6)*64,l=c+(t-1&63)-63;do r=be(r.add(n).add(i[0]).add(jt(o,u+8)),37).mul(ta),n=be(n.add(i[1]).add(jt(o,u+48)),42).mul(ta),r=r.xor(a[1]),n=n.add(i[0]).add(jt(o,u+40)),s=be(s.add(a[0]),33).mul(ta),i=$l(o,u,i[1].mul(ta),r.add(a[0])),a=$l(o,u+32,s.add(a[1]),n.add(jt(o,u+16))),[s,r]=[r,s],u+=64;while(u!==c);let p=ta.add(s.and(255).shl(1));return u=l,a[0]=a[0].add(t-1&63),i[0]=i[0].add(a[0]),a[0]=a[0].add(i[0]),r=be(r.add(n).add(i[0]).add(jt(o,u+8)),37).mul(p),n=be(n.add(i[1]).add(jt(o,u+48)),42).mul(p),r=r.xor(a[1].mul(9)),n=n.add(i[0].mul(9).add(jt(o,u+40))),s=be(s.add(a[0]),33).mul(p),i=$l(o,u,i[1].mul(p),r.add(a[0])),a=$l(o,u+32,s.add(a[1]),n.add(jt(o,u+16))),[s,r]=[r,s],gi(gi(i[0],a[0],p).add(fh(n).mul(qC)).add(s),gi(i[1],a[1],p).add(r),p)}function xA(o,t){return t==="string"?xi(o):yu([o],t)}function CA(o,t){return o instanceof Float32Array&&t==="float32"||o instanceof Int32Array&&t==="int32"||o instanceof Uint8Array&&t==="bool"}function yu(o,t){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(o)&&(o=Do(o)),D().getBool("DEBUG")&&nh(o,t),CA(o,t))return o;if(t==null||t==="float32"||t==="complex64")return new Float32Array(o);if(t==="int32")return new Int32Array(o);if(t==="bool"){let e=new Uint8Array(o.length);for(let r=0;r<e.length;++r)Math.round(o[r])!==0&&(e[r]=1);return e}else throw new Error(`Unknown data type ${t}`)}function oa(){return D().platform.now()}function bA(o,t){return D().platform.fetch(o,t)}function xi(o,t="utf-8"){return t=t||"utf-8",D().platform.encode(o,t)}function wu(o,t="utf-8"){return t=t||"utf-8",D().platform.decode(o,t)}function ue(o){return D().platform.isTypedArray!=null?D().platform.isTypedArray(o):Il(o)}function Do(o,t=[],e=!1){if(t==null&&(t=[]),typeof o=="boolean"||typeof o=="number"||typeof o=="string"||Li(o)||o==null||ue(o)&&e)t.push(o);else if(Array.isArray(o)||ue(o))for(let r=0;r<o.length;++r)Do(o[r],t,e);else{let r=-1;for(let n of Object.keys(o))/^([1-9]+[0-9]*|0)$/.test(n)&&(r=Math.max(r,Number(n)));for(let n=0;n<=r;n++)Do(o[n],t,e)}return t}var Tl=class{constructor(t,e){this.backendTimer=t,this.logger=e,e==null&&(this.logger=new gh)}profileKernel(t,e,r){let n,s=()=>{n=r()},i,a=oa();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(s);else{s();for(let c of n)c.dataSync();i=Promise.resolve({kernelMs:oa()-a})}if(D().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let c=0;c<n.length;c++){let l=n[c];l.data().then(p=>{yA(p,l.dtype,t)})}return{kernelName:t,outputs:n,inputs:e,timeMs:i.then(c=>c.kernelMs),extraInfo:i.then(c=>c.getExtraProfileInfo!=null?c.getExtraProfileInfo():"")}}logKernelProfile(t){let{kernelName:e,outputs:r,timeMs:n,inputs:s,extraInfo:i}=t;r.forEach(a=>{Promise.all([a.data(),n,i]).then(u=>{this.logger.logKernelProfile(e,a,u[0],u[1],s,u[2])})})}};function yA(o,t,e){if(t!=="float32")return!1;for(let r=0;r<o.length;r++){let n=o[r];if(isNaN(n)||!isFinite(n))return console.warn(`Found ${n} in the result of '${e}'`),!0}return!1}var gh=class{logKernelProfile(t,e,r,n,s,i){let a=typeof n=="number"?Mi(`${n}ms`,9):n.error,u=Mi(t,25),c=e.rank,l=e.size,p=Mi(e.shape.toString(),14),m="";for(let d in s){let f=s[d];if(f!=null){let h=f.shape||e.shape,g=h.length;m+=`${d}: ${g}D ${g>0?h:""} `}}console.log(`%c${u}	%c${a}	%c${c}D ${p}	%c${l}	%c${m}	%c${i}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}};function jC(o,t,e){let r={},n={};for(let u=0;u<t.length;u++)r[t[u].id]=!0;for(let u=0;u<o.length;u++){let c=o[u],l=c.inputs;for(let p in l){let m=l[p],d=!1;for(let f=0;f<t.length;f++)if(r[m.id]){c.outputs.forEach(h=>r[h.id]=!0),d=!0,n[c.id]=!0;break}if(d)break}}let s={};s[e.id]=!0;let i={};for(let u=o.length-1;u>=0;u--){let c=o[u],l=c.inputs;for(let p=0;p<c.outputs.length;p++)if(s[c.outputs[p].id]){for(let m in l)s[l[m].id]=!0,i[c.id]=!0;break}}let a=[];for(let u=0;u<o.length;u++){let c=o[u];if(n[c.id]&&i[c.id]){let l={};for(let m in c.inputs){let d=c.inputs[m];r[d.id]&&(l[m]=d)}let p=Object.assign({},c);p.inputs=l,p.outputs=c.outputs,a.push(p)}}return a}function YC(o,t,e,r){for(let n=t.length-1;n>=0;n--){let s=t[n],i=[];if(s.outputs.forEach(u=>{let c=o[u.id];c!=null?i.push(c):i.push(null)}),s.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${s.kernelName}.`);let a=s.gradient(i);for(let u in s.inputs){if(!(u in a))throw new Error(`Cannot backprop through input ${u}. Available gradients found: ${Object.keys(a)}.`);let c=e(()=>a[u]());if(c.dtype!=="float32")throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input ${u} must have 'float32' dtype, but has '${c.dtype}'`);let l=s.inputs[u];if(!Oe(c.shape,l.shape))throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input '${u}' has shape '${c.shape}', which does not match the shape of the input '${l.shape}'`);if(o[l.id]==null)o[l.id]=c;else{let p=o[l.id];o[l.id]=r(p,c),p.dispose()}}}}var QC=20,vc=3,xh=7;function ZC(o,t,e,r){let n=Uo(t),s=wA(o,t,e,n),i=t.length,a=Nl(o,t,e,n,s),u=["Tensor"];return r&&(u.push(`  dtype: ${e}`),u.push(`  rank: ${i}`),u.push(`  shape: [${t}]`),u.push("  values:")),u.push(a.map(c=>"    "+c).join(`
`)),u.join(`
`)}function wA(o,t,e,r){let n=St(t),s=r[r.length-1],i=new Array(s).fill(0),a=t.length,u=e==="complex64"?kc(o):o;if(a>1)for(let c=0;c<n/s;c++){let l=c*s;for(let p=0;p<s;p++)i[p]=Math.max(i[p],Ic(u[l+p],0,e).length)}return i}function Ic(o,t,e){let r;return Array.isArray(o)?r=`${parseFloat(o[0].toFixed(xh))} + ${parseFloat(o[1].toFixed(xh))}j`:Eo(o)?r=`'${o}'`:e==="bool"?r=JC(o):r=parseFloat(o.toFixed(xh)).toString(),Mi(r,t)}function JC(o){return o===0?"false":"true"}function Nl(o,t,e,r,n,s=!0){let i=e==="complex64"?2:1,a=t[0],u=t.length;if(u===0){if(e==="complex64"){let h=kc(o);return[Ic(h[0],0,e)]}return e==="bool"?[JC(o[0])]:[o[0].toString()]}if(u===1){if(a>QC){let g=vc*i,x=Array.from(o.slice(0,g)),b=Array.from(o.slice((a-vc)*i,a*i));return e==="complex64"&&(x=kc(x),b=kc(b)),["["+x.map((w,v)=>Ic(w,n[v],e)).join(", ")+", ..., "+b.map((w,v)=>Ic(w,n[a-vc+v],e)).join(", ")+"]"]}return["["+(e==="complex64"?kc(o):Array.from(o)).map((g,x)=>Ic(g,n[x],e)).join(", ")+"]"]}let c=t.slice(1),l=r.slice(1),p=r[0]*i,m=[];if(a>QC){for(let h=0;h<vc;h++){let g=h*p,x=g+p;m.push(...Nl(o.slice(g,x),c,e,l,n,!1))}m.push("...");for(let h=a-vc;h<a;h++){let g=h*p,x=g+p;m.push(...Nl(o.slice(g,x),c,e,l,n,h===a-1))}}else for(let h=0;h<a;h++){let g=h*p,x=g+p;m.push(...Nl(o.slice(g,x),c,e,l,n,h===a-1))}let d=u===2?",":"";m[0]="["+(a>0?m[0]+d:"");for(let h=1;h<m.length-1;h++)m[h]=" "+m[h]+d;let f=`,
`;for(let h=2;h<u;h++)f+=`
`;return m[m.length-1]=" "+m[m.length-1]+"]"+(s?"":f),m}function kc(o){let t=[];for(let e=0;e<o.length;e+=2)t.push([o[e],o[e+1]]);return t}var Dt=class{constructor(t,e,r){if(this.dtype=e,this.shape=t.slice(),this.size=St(t),r!=null){let n=r.length;T(n===this.size,()=>`Length of values '${n}' does not match the size inferred by the shape '${this.size}'.`)}if(e==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||Sl(e,this.size),this.strides=Uo(t)}set(t,...e){e.length===0&&(e=[0]),T(e.length===this.rank,()=>`The number of provided coordinates (${e.length}) must match the rank (${this.rank})`);let r=this.locToIndex(e);this.values[r]=t}get(...t){t.length===0&&(t=[0]);let e=0;for(let n of t){if(n<0||n>=this.shape[e]){let s=`Requested out of range element at ${t}.   Buffer shape=${this.shape}`;throw new Error(s)}e++}let r=t[t.length-1];for(let n=0;n<t.length-1;++n)r+=this.strides[n]*t[n];return this.values[r]}locToIndex(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];let e=t[t.length-1];for(let r=0;r<t.length-1;++r)e+=this.strides[r]*t[r];return e}indexToLoc(t){if(this.rank===0)return[];if(this.rank===1)return[t];let e=new Array(this.shape.length);for(let r=0;r<e.length-1;++r)e[r]=Math.floor(t/this.strides[r]),t-=e[r]*this.strides[r];return e[e.length-1]=t,e}get rank(){return this.shape.length}toTensor(){return Ao().makeTensor(this.values,this.shape,this.dtype)}},Ao=null,Su=null,SA=null;function tb(o){Ao=o}function eb(o){Su=o}function ob(o){SA=o}var Ut=class{constructor(t,e,r,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=e||"float32",this.size=St(t),this.strides=Uo(t),this.dataId=r,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){let t=await this.data();return Su.buffer(this.shape,this.dtype,t)}bufferSync(){return Su.buffer(this.shape,this.dtype,this.dataSync())}async array(){let t=await this.data();return Oi(this.shape,t,this.dtype==="complex64")}arraySync(){return Oi(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();let t=Ao().read(this.dataId);if(this.dtype==="string"){let e=await t;try{return e.map(r=>wu(r))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return t}dataToGPU(t){return this.throwIfDisposed(),Ao().readToGPU(this.dataId,t)}dataSync(){this.throwIfDisposed();let t=Ao().readSync(this.dataId);if(this.dtype==="string")try{return t.map(e=>wu(e))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t}async bytes(){this.throwIfDisposed();let t=await Ao().read(this.dataId);return this.dtype==="string"?t:new Uint8Array(t.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),Ao().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(t=!1){return Su.print(this,t)}clone(){return this.throwIfDisposed(),Su.clone(this)}toString(t=!1){let e=this.dataSync();return ZC(e,this.shape,this.dtype,t)}cast(t){return this.throwIfDisposed(),Su.cast(this,t)}variable(t=!0,e,r){return this.throwIfDisposed(),Ao().makeVariable(this,t,e,r)}};Object.defineProperty(Ut,Symbol.hasInstance,{value:o=>!!o&&o.data!=null&&o.dataSync!=null&&o.throwIfDisposed!=null});function Ch(){return Cc("Tensor",()=>Ut)}Ch();var un=class extends Ut{constructor(t,e,r,n){super(t.shape,t.dtype,t.dataId,n),this.trainable=e,this.name=r}assign(t){if(t.dtype!==this.dtype)throw new Error(`dtype of the new value (${t.dtype}) and previous value (${this.dtype}) must match`);if(!Oe(t.shape,this.shape))throw new Error(`shape of the new value (${t.shape}) and previous value (${this.shape}) must match`);Ao().disposeTensor(this),this.dataId=t.dataId,Ao().incRef(this,null)}dispose(){Ao().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty(un,Symbol.hasInstance,{value:o=>o instanceof Ut&&o.assign!=null&&o.assign instanceof Function});var nb={};Ae(nb,{assertTypesMatch:()=>Ih,getTensorsInContainer:()=>$c,isTensorInList:()=>IA,makeTypesMatch:()=>yt});var bh;(function(o){o.R0="R0",o.R1="R1",o.R2="R2",o.R3="R3",o.R4="R4",o.R5="R5",o.R6="R6"})(bh||(bh={}));var yh;(function(o){o.float32="float32",o.int32="int32",o.bool="int32",o.complex64="complex64"})(yh||(yh={}));var wh;(function(o){o.float32="float32",o.int32="int32",o.bool="bool",o.complex64="complex64"})(wh||(wh={}));var Sh;(function(o){o.float32="float32",o.int32="float32",o.bool="float32",o.complex64="complex64"})(Sh||(Sh={}));var vh;(function(o){o.float32="complex64",o.int32="complex64",o.bool="complex64",o.complex64="complex64"})(vh||(vh={}));var vA={float32:Sh,int32:yh,bool:wh,complex64:vh};function Lt(o,t){if(o==="string"||t==="string"){if(o==="string"&&t==="string")return"string";throw new Error(`Can not upcast ${o} with ${t}`)}return vA[o][t]}function cn(o){return Lt(o,"int32")}function El(o){return o!=null&&typeof o=="object"&&"texture"in o&&o.texture instanceof WebGLTexture}function Rl(o){return typeof GPUBuffer<"u"&&o!=null&&typeof o=="object"&&"buffer"in o&&o.buffer instanceof GPUBuffer}function yt(o,t){if(o.dtype===t.dtype)return[o,t];let e=Lt(o.dtype,t.dtype);return[o.cast(e),t.cast(e)]}function Ih(o,t){T(o.dtype===t.dtype,()=>`The dtypes of the first(${o.dtype}) and second(${t.dtype}) input must match`)}function IA(o,t){return t.some(e=>e.id===o.id)}function $c(o){let t=[];return rb(o,t,new Set),t}function rb(o,t,e){if(o==null)return;if(o instanceof Ut){t.push(o);return}if(!kA(o))return;let r=o;for(let n in r){let s=r[n];e.has(s)||(e.add(s),rb(s,t,e))}}function kA(o){return Array.isArray(o)||typeof o=="object"}function kh(o){return o.kernelName!=null}var Dl=class{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(t=>t.name)))}}}dispose(){for(let t in this.registeredVariables)this.registeredVariables[t].dispose()}},Tc=class o{constructor(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Dl}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;let t=this.getSortedBackends();for(let e=0;e<t.length;e++){let r=t[e];if(await this.initializeBackend(r).success){await this.setBackend(r);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){let{name:t,asyncInit:e}=this.initializeBackendsAndReturnBest();if(e)throw new Error(`The highest priority backend '${t}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(t)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(t){if(!(t in this.registry))if(t in this.registryFactory){let{asyncInit:e}=this.initializeBackend(t);if(e)return null}else return null;return this.registry[t]}findBackendFactory(t){return t in this.registryFactory?this.registryFactory[t].factory:null}registerBackend(t,e,r=1){return t in this.registryFactory?(jo(`${t} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[t]={factory:e,priority:r},!0)}async setBackend(t){if(this.registryFactory[t]==null)throw new Error(`Backend name '${t}' not found in registry`);if(this.backendName=t,this.registry[t]==null){this.backendInstance=null;let{success:e,asyncInit:r}=this.initializeBackend(t);if(!(r?await e:e))return!1}return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new Tl(this.backendInstance),!0}setupRegisteredKernels(){vl(this.backendName).forEach(e=>{e.setupFunc!=null&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(t){vl(t).forEach(r=>{r.disposeFunc!=null&&r.disposeFunc(this.registry[t])})}initializeBackend(t){let e=this.registryFactory[t];if(e==null)throw new Error(`Cannot initialize backend ${t}, no registration found.`);try{let r=e.factory();if(r&&!(r instanceof No)&&typeof r.then=="function"){let n=++this.pendingBackendInitId,s=r.then(i=>n<this.pendingBackendInitId?!1:(this.registry[t]=i,this.pendingBackendInit=null,!0)).catch(i=>(n<this.pendingBackendInitId||(this.pendingBackendInit=null,jo(`Initialization of backend ${t} failed`),jo(i.stack||i.message)),!1));return this.pendingBackendInit=s,{success:s,asyncInit:!0}}else return this.registry[t]=r,{success:!0,asyncInit:!1}}catch(r){return jo(`Initialization of backend ${t} failed`),jo(r.stack||r.message),{success:!1,asyncInit:!1}}}removeBackend(t){if(!(t in this.registryFactory))throw new Error(`${t} backend not found in registry`);this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((t,e)=>this.registryFactory[e].priority-this.registryFactory[t].priority)}initializeBackendsAndReturnBest(){let t=this.getSortedBackends();for(let e=0;e<t.length;e++){let r=t[e],{success:n,asyncInit:s}=this.initializeBackend(r);if(s||n)return{name:r,asyncInit:s}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(t,e){let r=this.state.tensorInfo.get(e),n=r.backend,s=this.readSync(e),i=n.refCount(e);n.disposeData(e,!0),r.backend=t,t.move(e,s,r.shape,r.dtype,i),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(t,e){let r=null;if(e==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");e=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof e!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");r=t}let n;return this.scopedRun(()=>this.startScope(r),()=>this.endScope(n),()=>(n=e(),n instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n))}scopedRun(t,e,r){t();try{let n=r();return e(),n}catch(n){throw e(),n}}nextTensorId(){return o.nextTensorId++}nextVariableId(){return o.nextVariableId++}clone(t){let e=$.runKernel(Ko,{x:t}),r={x:t},n=i=>({x:()=>{let a="float32",u={x:i},c={dtype:a};return $.runKernel(Ho,u,c)}}),s=[];return this.addTapeNode(this.state.activeScope.name,r,[e],n,s,{}),e}runKernel(t,e,r){if(this.backendName==null&&this.backend,!(xu(t,this.backendName)!=null))throw new Error(`Kernel '${t}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:t,inputs:e,attrs:r})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(t,e,r){let n=this.backend.numDataIds(),s=0;r.forEach(u=>{s+=u.dtype==="complex64"?3:1});let i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],a=n-e-s-i;if(a>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${a} data ids) after running '${t}'`)}runKernelFunc(t){let e,r=[],n=this.isTapeOn(),s=this.state.numBytes,i=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let a;this.backendName==null&&this.backend;let u,c=kh(t)?t.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(kh(t)){let{kernelName:f,inputs:h,attrs:g}=t;this.backendName==null&&this.backend;let x=xu(f,this.backendName);T(x!=null,()=>`Cannot find registered kernel '${f}' for backend '${this.backendName}'`),a=()=>{let b=this.backend.numDataIds();u=x.kernelFunc({inputs:h,attrs:g,backend:this.backend});let w=Array.isArray(u)?u:[u];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(f,b,w);let v=w.map(k=>k.rank!=null?k:this.makeTensorFromTensorInfo(k));if(n){let k=this.getTensorsForGradient(f,h,v);r=this.saveTensorsForBackwardMode(k)}return v}}else{let{forwardFunc:f}=t,h=g=>{n&&(r=g.map(x=>this.keep(this.clone(x))))};a=()=>{let g=this.backend.numDataIds();u=this.tidy(()=>f(this.backend,h));let x=Array.isArray(u)?u:[u];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,g,x),x}}let{inputs:l,attrs:p}=t,m=kh(t)?null:t.backwardsFunc,d;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?e=a():(d=this.profiler.profileKernel(c,l,()=>a()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(d),e=d.outputs)}),n&&this.addTapeNode(c,l,e,m,r,p),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-s,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-i,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(l).map(f=>l[f]!=null?l[f].shape:null),outputShapes:e.map(f=>f.shape),kernelTimeMs:d.timeMs,extraInfo:d.extraInfo}),Array.isArray(u)?e:e[0]}saveTensorsForBackwardMode(t){return t.map(r=>this.keep(this.clone(r)))}getTensorsForGradient(t,e,r){let n=lh(t);if(n!=null){let s=n.inputsToSave||[],i=n.outputsToSave||[],a;n.saveAllInputs?(T(Array.isArray(e),()=>"saveAllInputs is true, expected inputs to be an array."),a=Object.keys(e).map(c=>e[c])):a=s.map(c=>e[c]);let u=r.filter((c,l)=>i[l]);return a.concat(u)}return[]}makeTensor(t,e,r,n){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");r=r||"float32",n=n||this.backend;let s=t;r==="string"&&Eo(t[0])&&(s=t.map(u=>xi(u)));let i=n.write(s,e,r),a=new Ut(e,r,i,this.nextTensorId());if(this.trackTensor(a,n),r==="string"){let u=this.state.tensorInfo.get(i),c=ih(s);this.state.numBytes+=c-u.bytes,u.bytes=c}return a}makeTensorFromDataId(t,e,r,n){r=r||"float32";let s={dataId:t,shape:e,dtype:r};return this.makeTensorFromTensorInfo(s,n)}makeTensorFromTensorInfo(t,e){let{dataId:r,shape:n,dtype:s}=t,i=new Ut(n,s,r,this.nextTensorId());return this.trackTensor(i,e),i}makeVariable(t,e=!0,r,n){r=r||this.nextVariableId().toString(),n!=null&&n!==t.dtype&&(t=t.cast(n));let s=new un(t,e,r,this.nextTensorId());if(this.state.registeredVariables[s.name]!=null)throw new Error(`Variable with name ${s.name} was already registered`);return this.state.registeredVariables[s.name]=s,this.incRef(s,this.backend),s}trackTensor(t,e){this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++;let r=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(r=t.size*Xa(t.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(t.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(t.dataId,{backend:e||this.backend,dtype:t.dtype,shape:t.shape,bytes:r})),t instanceof un||this.track(t)}incRef(t,e){this.trackTensor(t,e),this.backend.incRef(t.dataId)}removeDataId(t,e){this.state.tensorInfo.has(t)&&this.state.tensorInfo.get(t).backend===e&&(this.state.tensorInfo.delete(t),this.state.numDataBuffers--)}disposeTensor(t){if(!this.state.tensorInfo.has(t.dataId))return;let e=this.state.tensorInfo.get(t.dataId);if(this.state.numTensors--,t.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=e.bytes),t.dtype!=="complex64"&&t.dtype!=="string"){let r=t.size*Xa(t.dtype);this.state.numBytes-=r}e.backend.disposeData(t.dataId)&&this.removeDataId(t.dataId,e.backend)}disposeVariables(){for(let t in this.state.registeredVariables){let e=this.state.registeredVariables[t];this.disposeVariable(e)}}disposeVariable(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]}memory(){let t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t}async profile(t){this.state.profiling=!0;let e=this.state.numBytes,r=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(n=>n.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-e,this.state.activeProfile.newTensors=this.state.numTensors-r;for(let n of this.state.activeProfile.kernels)n.kernelTimeMs=await n.kernelTimeMs,n.extraInfo=await n.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(t,e,r,n,s,i){let a={id:this.state.nextTapeNodeId++,kernelName:t,inputs:e,outputs:r,saved:s},u=lh(t);u!=null&&(n=u.gradFunc),n!=null&&(a.gradient=c=>(c=c.map((l,p)=>{if(l==null){let m=r[p],d=Ya(m.size,m.dtype);return this.makeTensor(d,m.shape,m.dtype)}return l}),n(c.length>1?c:c[0],s,i))),this.state.activeTape.push(a)}keep(t){return t.kept=!0,t}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(t){let e={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(e.name=t),this.state.scopeStack.push(e),this.state.activeScope=e}endScope(t){let e=$c(t),r=new Set(e.map(s=>s.id));for(let s=0;s<this.state.activeScope.track.length;s++){let i=this.state.activeScope.track[s];!i.kept&&!r.has(i.id)&&i.dispose()}let n=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],e.forEach(s=>{!s.kept&&s.scopeId===n.id&&this.track(s)})}gradients(t,e,r,n=!1){if(T(e.length>0,()=>"gradients() received an empty list of xs."),r!=null&&r.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${r.dtype}'`);let s=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",t));T(s instanceof Ut,()=>"The result y returned by f() must be a tensor.");let i=jC(this.state.activeTape,e,s);if(!n&&i.length===0&&e.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{let a={};a[s.id]=r??$A(s.shape),YC(a,i,c=>this.tidy(c),TA);let u=e.map(c=>a[c.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(c=>{for(let l of c.saved)l.dispose()}),this.state.activeTape=null),{value:s,grads:u}})}customGrad(t){return T(Wo(t),()=>"The f passed in customGrad(f) must be a function."),(...e)=>{T(e.every(a=>a instanceof Ut),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let r,n={};e.forEach((a,u)=>{n[u]=a});let s=(a,u)=>(r=t(...e,u),T(r.value instanceof Ut,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),T(Wo(r.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),r.value),i=(a,u)=>{let c=r.gradFunc(a,u),l=Array.isArray(c)?c:[c];T(l.length===e.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),T(l.every(m=>m instanceof Ut),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let p={};return l.forEach((m,d)=>{p[d]=()=>m}),p};return this.runKernelFunc({forwardFunc:s,backwardsFunc:i,inputs:n})}}readSync(t){return this.state.tensorInfo.get(t).backend.readSync(t)}read(t){return this.state.tensorInfo.get(t).backend.read(t)}readToGPU(t,e){return this.state.tensorInfo.get(t).backend.readToGPU(t,e)}async time(t){let e=oa(),r=await this.backend.time(t);return r.wallMs=oa()-e,r}track(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Dl;for(let t in this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};Tc.nextTensorId=0;Tc.nextVariableId=0;function $A(o){let t=gc(St(o),"float32");return $.makeTensor(t,o,"float32")}function $h(){let o=ch();if(o._tfengine==null){let t=new xc(o);o._tfengine=new Tc(t)}return FC(o._tfengine.ENV),tb(()=>o._tfengine),o._tfengine}var $=$h();function TA(o,t){let e={a:o,b:t};return $.runKernel("Add",e)}var Ci={};Ae(Ci,{isBrowser:()=>Nh,isMobile:()=>RA,mockIsMobile:()=>EA});function NA(){return typeof navigator<"u"&&navigator!=null}var Th;function EA(o){Th=o}function RA(o){if(Th!==void 0)return Th;if(o||NA()){if(o||(o=navigator),o.product==="ReactNative")return!0;let t=o.userAgent||o.vendor||(typeof window<"u"?window.opera:"");if(!t){let e=o;return e.userAgentData&&e.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function Nh(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var We=D();We.registerFlag("DEBUG",()=>!1,o=>{o&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});We.registerFlag("IS_BROWSER",()=>Nh());We.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");We.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));We.registerFlag("IS_SAFARI",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor));We.registerFlag("PROD",()=>!1);We.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>We.getBool("DEBUG"));We.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);We.registerFlag("IS_TEST",()=>!1);We.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>We.getBool("DEBUG"));We.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);We.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);We.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);function ve(o,t){let e=o;if(ue(o))return t==="string"?[]:[o.length];if(El(o)){let n=o.channels||"RGBA";return[o.height,o.width*n.length]}else if(Rl(o))return[o.buffer.size/(t==null?4:Xa(t))];if(!Array.isArray(o))return[];let r=[];for(;Array.isArray(e)||ue(e)&&t!=="string";)r.push(e.length),e=e[0];return Array.isArray(o)&&D().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&ib(o,r,[]),r}function ib(o,t,e){if(e=e||[],!Array.isArray(o)&&!ue(o)){T(t.length===0,()=>`Element arr[${e.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}T(t.length>0,()=>`Element arr[${e.join("][")}] should be a primitive, but is an array of ${o.length} elements`),T(o.length===t[0],()=>`Element arr[${e.join("][")}] should have ${t[0]} elements, but has ${o.length} elements`);let r=t.slice(1);for(let n=0;n<o.length;++n)ib(o[n],r,e.concat(n))}function sb(o,t,e,r){if(o!=="string_or_numeric"){if(o==null)throw new Error("Expected dtype cannot be null.");if(o!=="numeric"&&o!==t||o==="numeric"&&t==="string")throw new Error(`Argument '${e}' passed to '${r}' must be ${o} tensor, but got ${t} tensor`)}}function S(o,t,e,r="numeric"){if(o instanceof Ch())return sb(r,o.dtype,t,e),o;let n=_n(o);if(n!=="string"&&["bool","int32","float32"].indexOf(r)>=0&&(n=r),sb(r,n,t,e),o==null||!ue(o)&&!Array.isArray(o)&&typeof o!="number"&&typeof o!="boolean"&&typeof o!="string"){let u=o==null?"null":o.constructor.name;throw new Error(`Argument '${t}' passed to '${e}' must be a Tensor or TensorLike, but got '${u}'`)}let s=ve(o,n);!ue(o)&&!Array.isArray(o)&&(o=[o]);let a=n!=="string"?yu(o,n):Do(o,[],!0);return $.makeTensor(a,s,n)}function ln(o,t,e,r="numeric"){if(!Array.isArray(o))throw new Error(`Argument ${t} passed to ${e} must be a \`Tensor[]\` or \`TensorLike[]\``);return o.map((s,i)=>S(s,`${t}[${i}]`,e,r))}var ab="__op";function I(o){let t=Object.keys(o);if(t.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let e=t[0],r=o[e];e.endsWith("_")&&(e=e.substring(0,e.length-1)),e=e+ab;let n=(...s)=>{$.startScope(e);try{let i=r(...s);return Li(i)&&console.error("Cannot return a Promise inside of tidy."),$.endScope(i),i}catch(i){throw $.endScope(null),i}};return Object.defineProperty(n,"name",{value:e,configurable:!0}),n}function DA(o,t){let e=S(o,"real","complex"),r=S(t,"imag","complex");Gt(e.shape,r.shape,`real and imag shapes, ${e.shape} and ${r.shape}, must match in call to tf.complex().`);let n={real:e,imag:r};return $.runKernel(Kn,n)}var Ye=I({complex_:DA});function Le(o,t,e,r){if(r==null)r=_n(o);else if(r==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(Rl(o)||El(o)){if(r!=="float32"&&r!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${r}.`);return $.backend.createTensorFromGPUData(o,t||e,r)}if(!ue(o)&&!Array.isArray(o)&&typeof o!="number"&&typeof o!="boolean"&&typeof o!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){Xt(t);let n=St(t),s=St(e);T(n===s,()=>`Based on the provided shape, [${t}], the tensor should have ${n} values but has ${s}`);for(let i=0;i<e.length;++i){let a=e[i],u=i===e.length-1?a!==St(t.slice(i)):!0;T(e[i]===t[i]||!u,()=>`Error creating a new Tensor. Inferred shape (${e}) does not match the provided shape (${t}). `)}}return!ue(o)&&!Array.isArray(o)&&(o=[o]),t=t||e,o=r!=="string"?yu(o,r):Do(o,[],!0),$.makeTensor(o,t,r)}function pn(o,t,e){let r=ve(o,e);return Le(o,t,r,e)}var mn={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};var Ie=class o{static join(t){return new o(t).slice()}constructor(t){if(this.shards=[],this.previousShardIndex=0,t==null||(t instanceof Array||(t=[t]),t=t.map(r=>ue(r)?r.buffer:r),t.length===0))return;this.bufferUniformSize=t[0].byteLength;let e=0;for(let r=0;r<t.length;r++){let n=t[r];r!==t.length-1&&n.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let s=e+n.byteLength;this.shards.push({buffer:n,start:e,end:s}),e=s}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(t=0,e=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(t=isNaN(Number(t))?0:t,e=isNaN(Number(e))?0:e,t=Math.max(0,t),e=Math.min(this.byteLength,e),e<=t)return new ArrayBuffer(0);let r=this.findShardForByte(t);if(r===-1)throw new Error(`Could not find start shard for byte ${t}`);let n=e-t,s=new ArrayBuffer(n),i=new Uint8Array(s),a=0;for(let u=r;u<this.shards.length;u++){let c=this.shards[u],p=t+a-c.start,m=a,f=Math.min(e,c.end)-c.start,h=new Uint8Array(c.buffer,p,f-p);if(i.set(h,m),a+=h.length,e<c.end)break}return s}findShardForByte(t){if(this.shards.length===0||t<0||t>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(t/this.bufferUniformSize),this.previousShardIndex;function e(n){return t<n.start?-1:t>=n.end?1:0}if(e(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;let r=AA(this.shards,e);return r===-1?-1:(this.previousShardIndex=r,this.previousShardIndex)}};function AA(o,t){let e=0,r=o.length;for(;e<=r;){let n=Math.floor((r-e)/2)+e,s=t(o[n]);if(s===0)return n;s<0?r=n:e=n+1}return-1}function d7(){D().set("PROD",!0)}function f7(){D().set("DEBUG",!0)}function h7(){D().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")}function FA(o){D().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(o+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}ob(FA);function g7(){$.disposeVariables()}function Be(){return $}function x7(){return $.memory()}function C7(o){return $.profile(o)}function Bt(o,t){return $.tidy(o,t)}function me(o){$c(o).forEach(e=>e.dispose())}function ub(o){return $.keep(o)}function b7(o){return $.time(o)}function y7(o){return $.setBackend(o)}function w7(){return $.ready()}function cb(){return $.backendName}function S7(o){$.removeBackend(o)}function v7(o){return $.findBackend(o)}function I7(o){return $.findBackendFactory(o)}function vu(o,t,e=1){return $.registerBackend(o,t,e)}function lb(){return $.backend}function k7(o,t){D().setPlatform(o,t)}var bi=4;async function db(o,t){let e=[],r=[],n=Array.isArray(o)?o.map(i=>i.name):Object.keys(o);for(let i=0;i<n.length;++i){let a=n[i],u=Array.isArray(o)?o[i].tensor:o[a];if(u.dtype!=="float32"&&u.dtype!=="int32"&&u.dtype!=="bool"&&u.dtype!=="string"&&u.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${a}': ${u.dtype}`);let c={name:a,shape:u.shape,dtype:u.dtype};if(u.dtype==="string"){let l=new Promise(async p=>{let m=await u.bytes(),d=m.reduce((g,x)=>g+x.length,0)+bi*m.length,f=new Uint8Array(d),h=0;for(let g=0;g<m.length;g++){let x=m[g],b=new Uint8Array(new Uint32Array([x.length]).buffer);f.set(b,h),h+=bi,f.set(x,h),h+=x.length}p(f)});r.push(l)}else r.push(u.data());t!=null&&(c.group=t),e.push(c)}let s=await Promise.all(r);return{data:OA(s),specs:e}}function Al(o,t){let e=new Ie(o),r={},n=0;for(let s of t){let i=PA(s,(a,u)=>e.slice(n+a,n+u));r[s.name]=fb(s,e.slice(n,n+i)),n+=i}return r}function PA(o,t){let e=St(o.shape),r;if("quantization"in o){let n=o.quantization;r=mn[n.dtype]}else if(o.dtype==="string"){let n=0;for(let s=0;s<e;s++)n+=bi+new Uint32Array(t(n,n+bi))[0];return n}else r=mn[o.dtype];return e*r}async function _A(o,t){let e=St(o.shape),r;if("quantization"in o){let n=o.quantization;r=mn[n.dtype]}else if(o.dtype==="string"){let n=0;for(let s=0;s<e;s++)n+=bi+new Uint32Array(await t(n,n+bi))[0];return n}else r=mn[o.dtype];return e*r}function fb(o,t){let e=o.name,r=o.dtype,n=o.shape,s=St(n),i,a=0;if("quantization"in o){let u=o.quantization;if(u.dtype==="uint8"||u.dtype==="uint16"){if(!("min"in u&&"scale"in u))throw new Error(`Weight ${o.name} with quantization ${u.dtype} doesn't have corresponding metadata min and scale.`)}else if(u.dtype==="float16"){if(r!=="float32")throw new Error(`Weight ${o.name} is quantized with ${u.dtype} which only supports weights of type float32 not ${r}.`)}else throw new Error(`Weight ${o.name} has unknown quantization dtype ${u.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);let c=mn[u.dtype],l=u.dtype==="uint8"?new Uint8Array(t):new Uint16Array(t);if(r==="float32")if(u.dtype==="uint8"||u.dtype==="uint16"){i=new Float32Array(l.length);for(let p=0;p<l.length;p++){let m=l[p];i[p]=m*u.scale+u.min}}else if(u.dtype==="float16")i=zA()(l);else throw new Error(`Unsupported quantization type ${u.dtype} for weight type float32.`);else if(r==="int32"){if(u.dtype!=="uint8"&&u.dtype!=="uint16")throw new Error(`Unsupported quantization type ${u.dtype} for weight type int32.`);i=new Int32Array(l.length);for(let p=0;p<l.length;p++){let m=l[p];i[p]=Math.round(m*u.scale+u.min)}}else throw new Error(`Unsupported dtype in weight '${e}': ${r}`);a+=s*c}else if(r==="string"){let u=St(o.shape);i=[];for(let c=0;c<u;c++){let l=new Uint32Array(t.slice(a,a+bi))[0];a+=bi;let p=new Uint8Array(t.slice(a,a+l));i.push(p),a+=l}}else{let u=mn[r];if(r==="float32")i=new Float32Array(t);else if(r==="int32")i=new Int32Array(t);else if(r==="bool")i=new Uint8Array(t);else if(r==="complex64"){i=new Float32Array(t);let c=new Float32Array(i.length/2),l=new Float32Array(i.length/2);for(let f=0;f<c.length;f++)c[f]=i[f*2],l[f]=i[f*2+1];let p=pn(c,n,"float32"),m=pn(l,n,"float32"),d=Ye(p,m);return p.dispose(),m.dispose(),d}else throw new Error(`Unsupported dtype in weight '${e}': ${r}`);a+=s*u}return pn(i,n,r)}async function pb(o,t,e){let r=new Uint8Array(t);for(;r.byteLength<e;){let{done:n,value:s}=await o.read();if(n&&s==null){let a=e-r.byteLength;throw new Error(`Reader is done but ${a} bytes are still expected`)}let i=new Uint8Array(r.length+s.byteLength);i.set(r,0),i.set(new Uint8Array(s),r.length),r=i}return r.buffer}async function hb(o,t){let e={},r=o.getReader(),n=new ArrayBuffer(0);for(let s of t){let i=await _A(s,async(c,l)=>(n=await pb(r,n,l),n.slice(c,l)));n=await pb(r,n,i);let a=n.slice(0,i);n=n.slice(i);let u=fb(s,a);if(e[s.name]=u,cb()==="webgpu"){let c=lb();"uploadToGPU"in c&&St(u.shape)>=D().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&c.uploadToGPU(u.dataId)}}return e}function OA(o){if(o===null)throw new Error(`Invalid input value: ${JSON.stringify(o)}`);let t=0,e=[];o.forEach(s=>{if(t+=s.byteLength,e.push(s.byteLength===s.buffer.byteLength?s:new s.constructor(s)),!(s instanceof Float32Array||s instanceof Int32Array||s instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${s.constructor.name}`)});let r=new Uint8Array(t),n=0;return e.forEach(s=>{r.set(new Uint8Array(s.buffer),n),n+=s.byteLength}),r.buffer}var Eh=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function mb(o){return Eh?Buffer.byteLength(o,"utf8"):new Blob([o]).size}function gb(o){if(Eh)return Buffer.from(o).toString("base64");let t=new Uint8Array(o),e="";for(let r=0,n=t.length;r<n;r++)e+=String.fromCharCode(t[r]);return btoa(e)}function xb(o){if(Eh){let r=Buffer.from(o,"base64");return r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)}let t=atob(o),e=new Uint8Array(t.length);for(let r=0;r<t.length;++r)e.set([t.charCodeAt(r)],r);return e.buffer}function Cb(o){return Ie.join(o)}function Rh(o){for(o=o.trim();o.endsWith("/");)o=o.slice(0,o.length-1);let e=o.split("/");return e[e.length-1]}function Fl(o,t){let e={modelTopology:o.modelTopology,format:o.format,generatedBy:o.generatedBy,convertedBy:o.convertedBy,weightsManifest:t};return o.signature!=null&&(e.signature=o.signature),o.userDefinedMetadata!=null&&(e.userDefinedMetadata=o.userDefinedMetadata),o.modelInitializer!=null&&(e.modelInitializer=o.modelInitializer),o.initializerSignature!=null&&(e.initializerSignature=o.initializerSignature),o.trainingConfig!=null&&(e.trainingConfig=o.trainingConfig),e}function Dh(o,t,e){let r={modelTopology:o.modelTopology,format:o.format,generatedBy:o.generatedBy,convertedBy:o.convertedBy};if(o.trainingConfig!=null&&(r.trainingConfig=o.trainingConfig),o.weightsManifest!=null){if(!t)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!e)throw new Error("modelJSON has weightsManifest but weightData is null");r.weightSpecs=t,r.weightData=e}return o.signature!=null&&(r.signature=o.signature),o.userDefinedMetadata!=null&&(r.userDefinedMetadata=o.userDefinedMetadata),o.modelInitializer!=null&&(r.modelInitializer=o.modelInitializer),o.initializerSignature!=null&&(r.initializerSignature=o.initializerSignature),r}async function Iu(o,t){let e,r;return o.weightsManifest!=null&&([e,r]=await t(o.weightsManifest)),Dh(o,e,r)}function Yo(o){if(o.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:o.modelTopology==null?0:mb(JSON.stringify(o.modelTopology)),weightSpecsBytes:o.weightSpecs==null?0:mb(JSON.stringify(o.weightSpecs)),weightDataBytes:o.weightData==null?0:new Ie(o.weightData).byteLength}}function Nc(o){let t=[];for(let e of o)t.push(...e.weights);return t}function MA(){let o=e=>{let r=e<<13,n=0;for(;(r&8388608)===0;)n-=8388608,r<<=1;return r&=-8388609,n+=947912704,r|n},t=new Uint32Array(2048);t[0]=0;for(let e=1;e<1024;e++)t[e]=o(e);for(let e=1024;e<2048;e++)t[e]=939524096+(e-1024<<13);return t}function LA(){let o=new Uint32Array(64);o[0]=0,o[31]=1199570944,o[32]=2147483648,o[63]=3347054592;for(let t=1;t<31;t++)o[t]=t<<23;for(let t=33;t<63;t++)o[t]=2147483648+(t-32<<23);return o}function BA(){let o=new Uint32Array(64);for(let t=0;t<64;t++)o[t]=1024;return o[0]=o[32]=0,o}function zA(){let o=MA(),t=LA(),e=BA();return r=>{let n=new ArrayBuffer(4*r.length),s=new Uint32Array(n);for(let i=0;i<r.length;i++){let a=r[i],u=o[e[a>>10]+(a&1023)]+t[a>>10];s[i]=u}return new Float32Array(n)}}var ge=class o{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return o.instance==null&&(o.instance=new o),o.instance}static registerSaveRouter(t){o.getInstance().saveRouters.push(t)}static registerLoadRouter(t){o.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return o.getHandlers(t,"save")}static getLoadHandlers(t,e){return o.getHandlers(t,"load",e)}static getHandlers(t,e,r){let n=[];return(e==="load"?o.getInstance().loadRouters:o.getInstance().saveRouters).forEach(i=>{let a=i(t,r);a!==null&&n.push(a)}),n}},bb=o=>ge.registerSaveRouter(o),yb=o=>ge.registerLoadRouter(o),wb=o=>ge.getSaveHandlers(o),Sb=(o,t)=>ge.getLoadHandlers(o,t);var Ah="tensorflowjs",Fh=1,ra="models_store",yi="model_info_store";function vb(){if(!D().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");let o=typeof window>"u"?self:window,t=o.indexedDB||o.mozIndexedDB||o.webkitIndexedDB||o.msIndexedDB||o.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function Ph(o){let t=o.result;t.createObjectStore(ra,{keyPath:"modelPath"}),t.createObjectStore(yi,{keyPath:"modelPath"})}var Qo=class{constructor(t){if(this.indexedDB=vb(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,t)}async load(){return this.databaseAction(this.modelPath)}databaseAction(t,e){return new Promise((r,n)=>{let s=this.indexedDB.open(Ah,Fh);s.onupgradeneeded=()=>Ph(s),s.onsuccess=()=>{let i=s.result;if(e==null){let a=i.transaction(ra,"readonly"),c=a.objectStore(ra).get(this.modelPath);c.onsuccess=()=>{if(c.result==null)return i.close(),n(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));r(c.result.modelArtifacts)},c.onerror=l=>(i.close(),n(c.error)),a.oncomplete=()=>i.close()}else{e.weightData=Ie.join(e.weightData);let a=Yo(e),u=i.transaction(yi,"readwrite"),c=u.objectStore(yi),l;try{l=c.put({modelPath:this.modelPath,modelArtifactsInfo:a})}catch(m){return n(m)}let p;l.onsuccess=()=>{p=i.transaction(ra,"readwrite");let m=p.objectStore(ra),d;try{d=m.put({modelPath:this.modelPath,modelArtifacts:e,modelArtifactsInfo:a})}catch(f){return n(f)}d.onsuccess=()=>r({modelArtifactsInfo:a}),d.onerror=f=>{c=u.objectStore(yi);let h=c.delete(this.modelPath);h.onsuccess=()=>(i.close(),n(d.error)),h.onerror=g=>(i.close(),n(d.error))}},l.onerror=m=>(i.close(),n(l.error)),u.oncomplete=()=>{p==null?i.close():p.oncomplete=()=>i.close()}}},s.onerror=i=>n(s.error)})}};Qo.URL_SCHEME="indexeddb://";var Ib=o=>D().getBool("IS_BROWSER")&&!Array.isArray(o)&&o.startsWith(Qo.URL_SCHEME)?VA(o.slice(Qo.URL_SCHEME.length)):null;ge.registerSaveRouter(Ib);ge.registerLoadRouter(Ib);function VA(o){return new Qo(o)}function WA(o){return o.startsWith(Qo.URL_SCHEME)?o.slice(Qo.URL_SCHEME.length):o}var Pl=class{constructor(){this.indexedDB=vb()}async listModels(){return new Promise((t,e)=>{let r=this.indexedDB.open(Ah,Fh);r.onupgradeneeded=()=>Ph(r),r.onsuccess=()=>{let n=r.result,s=n.transaction(yi,"readonly"),a=s.objectStore(yi).getAll();a.onsuccess=()=>{let u={};for(let c of a.result)u[c.modelPath]=c.modelArtifactsInfo;t(u)},a.onerror=u=>(n.close(),e(a.error)),s.oncomplete=()=>n.close()},r.onerror=n=>e(r.error)})}async removeModel(t){return t=WA(t),new Promise((e,r)=>{let n=this.indexedDB.open(Ah,Fh);n.onupgradeneeded=()=>Ph(n),n.onsuccess=()=>{let s=n.result,i=s.transaction(yi,"readwrite"),a=i.objectStore(yi),u=a.get(t),c;u.onsuccess=()=>{if(u.result==null)return s.close(),r(new Error(`Cannot find model with path '${t}' in IndexedDB.`));{let l=a.delete(t),p=()=>{c=s.transaction(ra,"readwrite");let d=c.objectStore(ra).delete(t);d.onsuccess=()=>e(u.result.modelArtifactsInfo),d.onerror=f=>r(u.error)};l.onsuccess=p,l.onerror=m=>(p(),s.close(),r(u.error))}},u.onerror=l=>(s.close(),r(u.error)),i.oncomplete=()=>{c==null?s.close():c.oncomplete=()=>s.close()}},n.onerror=s=>r(n.error)})}};var dn="/",ku="tensorflowjs_models",kb="info",UA="model_topology",GA="weight_specs",HA="weight_data",KA="model_metadata";function $b(o){return{info:[ku,o,kb].join(dn),topology:[ku,o,UA].join(dn),weightSpecs:[ku,o,GA].join(dn),weightData:[ku,o,HA].join(dn),modelMetadata:[ku,o,KA].join(dn)}}function Tb(o){for(let t of Object.values(o))window.localStorage.removeItem(t)}function qA(o){let t=o.split(dn);if(t.length<3)throw new Error(`Invalid key format: ${o}`);return t.slice(1,t.length-1).join(dn)}function XA(o){return o.startsWith(Zo.URL_SCHEME)?o.slice(Zo.URL_SCHEME.length):o}var Zo=class{constructor(t){if(!D().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=$b(this.modelPath)}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{let e=JSON.stringify(t.modelTopology),r=JSON.stringify(t.weightSpecs),n=Yo(t),s=Ie.join(t.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,e),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,gb(s));let i={format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,signature:t.signature!=null?t.signature:void 0,userDefinedMetadata:t.userDefinedMetadata!=null?t.userDefinedMetadata:void 0,modelInitializer:t.modelInitializer!=null?t.modelInitializer:void 0,initializerSignature:t.initializerSignature!=null?t.initializerSignature:void 0,trainingConfig:t.trainingConfig!=null?t.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(i)),{modelArtifactsInfo:n}}catch{throw Tb(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${n.modelTopologyBytes}, weightSpecsBytes=${n.weightSpecsBytes}, weightDataBytes=${n.weightDataBytes}.`)}}}async load(){let t=JSON.parse(this.LS.getItem(this.keys.info));if(t==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");let e={},r=JSON.parse(this.LS.getItem(this.keys.topology));if(r==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);e.modelTopology=r;let n=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(n==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);e.weightSpecs=n;let s=this.LS.getItem(this.keys.modelMetadata);if(s!=null){let a=JSON.parse(s);e.format=a.format,e.generatedBy=a.generatedBy,e.convertedBy=a.convertedBy,a.signature!=null&&(e.signature=a.signature),a.userDefinedMetadata!=null&&(e.userDefinedMetadata=a.userDefinedMetadata),a.modelInitializer!=null&&(e.modelInitializer=a.modelInitializer),a.initializerSignature!=null&&(e.initializerSignature=a.initializerSignature),a.trainingConfig!=null&&(e.trainingConfig=a.trainingConfig)}let i=this.LS.getItem(this.keys.weightData);if(i==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return e.weightData=xb(i),e}};Zo.URL_SCHEME="localstorage://";var Nb=o=>D().getBool("IS_BROWSER")&&!Array.isArray(o)&&o.startsWith(Zo.URL_SCHEME)?jA(o.slice(Zo.URL_SCHEME.length)):null;ge.registerSaveRouter(Nb);ge.registerLoadRouter(Nb);function jA(o){return new Zo(o)}var _l=class{constructor(){T(D().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),T(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){let t={},e=ku+dn,r=dn+kb;for(let n=0;n<this.LS.length;++n){let s=this.LS.key(n);if(s.startsWith(e)&&s.endsWith(r)){let i=qA(s);t[i]=JSON.parse(this.LS.getItem(s))}}return t}async removeModel(t){t=XA(t);let e=$b(t);if(this.LS.getItem(e.info)==null)throw new Error(`Cannot find model at path '${t}'`);let r=JSON.parse(this.LS.getItem(e.info));return Tb(e),r}};var $u="://",Fo=class o{constructor(){this.managers={}}static getInstance(){return o.instance==null&&(o.instance=new o),o.instance}static registerManager(t,e){T(t!=null,()=>"scheme must not be undefined or null."),t.endsWith($u)&&(t=t.slice(0,t.indexOf($u))),T(t.length>0,()=>"scheme must not be an empty string.");let r=o.getInstance();T(r.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),r.managers[t]=e}static getManager(t){let e=o.getInstance().managers[t];if(e==null)throw new Error(`Cannot find model manager for scheme '${t}'`);return e}static getSchemes(){return Object.keys(o.getInstance().managers)}};function Ol(o){if(o.indexOf($u)===-1)throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${Fo.getSchemes().join(",")}`);return{scheme:o.split($u)[0],path:o.split($u)[1]}}async function Eb(o,t,e=!1){T(o!==t,()=>`Old path and new path are the same: '${o}'`);let r=ge.getLoadHandlers(o);T(r.length>0,()=>`Copying failed because no load handler is found for source URL ${o}.`),T(r.length<2,()=>`Copying failed because more than one (${r.length}) load handlers for source URL ${o}.`);let n=r[0],s=ge.getSaveHandlers(t);T(s.length>0,()=>`Copying failed because no save handler is found for destination URL ${t}.`),T(s.length<2,()=>`Copying failed because more than one (${r.length}) save handlers for destination URL ${t}.`);let i=s[0],a=Ol(o).scheme,u=Ol(o).path,c=a===Ol(o).scheme,l=await n.load();e&&c&&await Fo.getManager(a).removeModel(u);let p=await i.save(l);return e&&!c&&await Fo.getManager(a).removeModel(u),p.modelArtifactsInfo}async function Rb(){let o=Fo.getSchemes(),t={};for(let e of o){let r=await Fo.getManager(e).listModels();for(let n in r){let s=e+$u+n;t[s]=r[n]}}return t}async function Db(o){let t=Ol(o);return Fo.getManager(t.scheme).removeModel(t.path)}async function Ab(o,t){return Eb(o,t,!1)}async function Fb(o,t){return Eb(o,t,!0)}var _h=class{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(t,e){return fetch(t,e)}now(){return performance.now()}encode(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${e}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)}decode(t,e){return new TextDecoder(e).decode(t)}setTimeoutCustom(t,e){if(typeof window>"u"||!D().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(t,e);return}this.functionRefs.push(t),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},e),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",r=>{if(r.source===window&&r.data.name===this.messageName){r.stopPropagation();let n=this.functionRefs[r.data.index];n(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(t){return Il(t)}};if(D().get("IS_BROWSER")){D().setPlatform("browser",new _h);try{Fo.registerManager(Zo.URL_SCHEME,new _l)}catch{}try{Fo.registerManager(Qo.URL_SCHEME,new Pl)}catch{}}var YA={importFetch:()=>Pb()},Oh;var Mh=class{constructor(){this.util=_b(),this.textEncoder=new this.util.TextEncoder}fetch(t,e){return D().global.fetch!=null?D().global.fetch(t,e):(Oh==null&&(Oh=YA.importFetch()),Oh(t,e))}now(){let t=process.hrtime();return t[0]*1e3+t[1]/1e6}encode(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${e}`);return this.textEncoder.encode(t)}decode(t,e){return t.length===0?"":new this.util.TextDecoder(e).decode(t)}isTypedArray(t){return this.util.types.isFloat32Array(t)||this.util.types.isInt32Array(t)||this.util.types.isUint8Array(t)||this.util.types.isUint8ClampedArray(t)}};D().get("IS_NODE")&&!D().get("IS_BROWSER")&&D().setPlatform("node",new Mh);function nt(o,t="float32",e){return t=t||"float32",Xt(o),new Dt(o,t,e)}function QA(o,t){let e=S(o,"x","cast");if(!sh(t))throw new Error(`Failed to cast to unknown dtype ${t}`);if(t==="string"&&e.dtype!=="string"||t!=="string"&&e.dtype==="string")throw new Error("Only strings can be casted to strings");let r={x:e},n={dtype:t};return $.runKernel(Ho,r,n)}var $t=I({cast_:QA});function ZA(o){let e={x:S(o,"x","clone","string_or_numeric")};return $.runKernel(Ko,e)}var Po=I({clone_:ZA});function Lh(o,t=!1){console.log(o.toString(t))}$h();var JA={buffer:nt,cast:$t,clone:Po,print:Lh};eb(JA);function tF(o,t){let e=S(o,"a","add"),r=S(t,"b","add");[e,r]=yt(e,r);let n={a:e,b:r};return $.runKernel("Add",n)}var pt=I({add_:tF});function eF(o,t){let e=S(o,"a","floorDiv"),r=S(t,"b","floorDiv");[e,r]=yt(e,r);let n={a:e,b:r};return $.runKernel(Nr,n)}var Bh=I({floorDiv_:eF});function oF(o,t){let e=S(o,"a","div"),r=S(t,"b","div");if([e,r]=yt(e,r),e.dtype==="int32"&&r.dtype==="int32")return Bh(e,r);let n={a:e,b:r},s={};return $.runKernel(Ir,n,s)}var Et=I({div_:oF});function rF(o,t){let e=S(o,"a","mul"),r=S(t,"b","mul");[e,r]=yt(e,r);let n={a:e,b:r};return $.runKernel(Wr,n)}var Q=I({mul_:rF});function nF(o){let t=S(o,"x","abs");if(t.dtype==="complex64"){let e={x:t};return $.runKernel(qn,e)}else{let e={x:t};return $.runKernel("Abs",e)}}var ke=I({abs_:nF});function sF(o){let e={x:S(o,"x","acos")};return $.runKernel(fr,e)}var iF=I({acos_:sF});function aF(o){let e={x:S(o,"x","acosh")};return $.runKernel(hr,e)}var uF=I({acosh_:aF});function cF(o){T(Array.isArray(o),()=>"The argument passed to tf.addN() must be a list of tensors"),T(o.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${o.length}`);let t=o.map((n,s)=>S(n,`tensors${s}`,"addN")),e=t[0];t.forEach(n=>{if(n.dtype!==e.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(n=>{if(!Oe(n.shape,e.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});let r=t;return $.runKernel(Mn,r)}var lF=I({addN_:cF});function pF(o,t=null,e=!1){let n={x:S(o,"x","all","bool")},s={axis:t,keepDims:e};return $.runKernel("All",n,s)}var mF=I({all_:pF});function dF(o,t=null,e=!1){let n={x:S(o,"x","any","bool")},s={axis:t,keepDims:e};return $.runKernel("Any",n,s)}var fF=I({any_:dF});function hF(o,t=0){let r={x:S(o,"x","argMax")},n={axis:t};return $.runKernel(Ln,r,n)}var gF=I({argMax_:hF});function xF(o,t=0){let r={x:S(o,"x","argMin")},n={axis:t};return $.runKernel(Bn,r,n)}var CF=I({argMin_:xF});function bF(o){let e={x:S(o,"x","asin")};return $.runKernel(gr,e)}var yF=I({asin_:bF});function wF(o){let e={x:S(o,"x","asinh")};return $.runKernel(xr,e)}var SF=I({asinh_:wF});function vF(o){let e={x:S(o,"x","atan")};return $.runKernel(Cr,e)}var IF=I({atan_:vF});function kF(o,t){let e=S(o,"a","atan2"),r=S(t,"b","atan2");[e,r]=yt(e,r);let n={a:e,b:r};return $.runKernel(yr,n)}var $F=I({atan2_:kF});function TF(o){let e={x:S(o,"x","atanh")};return $.runKernel(br,e)}var NF=I({atanh_:TF});function EF(o,t,e,r,n="NHWC",s){let i=o[3],a=[...t,i],u=Mb(n);return sa(o,a,e,s,r,null,null,u)}function Vh(o,t,e,r,n,s,i="channelsLast"){let[a,u]=Ec(t),c;if(i==="channelsLast")c=[a,u,o[3],o[3]];else if(i==="channelsFirst")c=[a,u,o[1],o[1]];else throw new Error(`Unknown dataFormat ${i}`);return sa(o,c,e,r,n,s,!1,i)}function RF(o,t,e,r,n,s,i="NDHWC"){let[a,u,c]=zh(t),l,p;if(i==="NDHWC")p="channelsLast",l=[a,u,c,o[4],o[4]];else if(i==="NCDHW")p="channelsFirst",l=[a,u,c,o[1],o[1]];else throw new Error(`Unknown dataFormat ${i}`);return Ob(o,l,e,r,n,!1,p,s)}function sa(o,t,e,r,n,s,i=!1,a="channelsLast"){let[u,c,l,p]=[-1,-1,-1,-1];if(a==="channelsLast")[u,c,l,p]=o;else if(a==="channelsFirst")[u,p,c,l]=o;else throw new Error(`Unknown dataFormat ${a}`);let[m,d,,f]=t,[h,g]=Ec(e),[x,b]=Ec(r),w=Tu(m,x),v=Tu(d,b),{padInfo:k,outHeight:N,outWidth:E}=FF(n,c,l,h,g,w,v,s,a),R=i?f*p:f,A;return a==="channelsFirst"?A=[u,R,N,E]:a==="channelsLast"&&(A=[u,N,E,R]),{batchSize:u,dataFormat:a,inHeight:c,inWidth:l,inChannels:p,outHeight:N,outWidth:E,outChannels:R,padInfo:k,strideHeight:h,strideWidth:g,filterHeight:m,filterWidth:d,effectiveFilterHeight:w,effectiveFilterWidth:v,dilationHeight:x,dilationWidth:b,inShape:o,outShape:A,filterShape:t}}function Ob(o,t,e,r,n,s=!1,i="channelsLast",a){let[u,c,l,p,m]=[-1,-1,-1,-1,-1];if(i==="channelsLast")[u,c,l,p,m]=o;else if(i==="channelsFirst")[u,m,c,l,p]=o;else throw new Error(`Unknown dataFormat ${i}`);let[d,f,h,,g]=t,[x,b,w]=zh(e),[v,k,N]=zh(r),E=Tu(d,v),R=Tu(f,k),A=Tu(h,N),{padInfo:F,outDepth:P,outHeight:_,outWidth:O}=PF(n,c,l,p,x,b,w,E,R,A,a),M=s?g*m:g,L;return i==="channelsFirst"?L=[u,M,P,_,O]:i==="channelsLast"&&(L=[u,P,_,O,M]),{batchSize:u,dataFormat:i,inDepth:c,inHeight:l,inWidth:p,inChannels:m,outDepth:P,outHeight:_,outWidth:O,outChannels:M,padInfo:F,strideDepth:x,strideHeight:b,strideWidth:w,filterDepth:d,filterHeight:f,filterWidth:h,effectiveFilterDepth:E,effectiveFilterHeight:R,effectiveFilterWidth:A,dilationDepth:v,dilationHeight:k,dilationWidth:N,inShape:o,outShape:L,filterShape:t}}function DF(o,t,e,r,n){r==null&&(r=Wh(o,t,e));let s=o[0],i=o[1],a=Rc((s-t+2*r)/e+1,n),u=Rc((i-t+2*r)/e+1,n);return[a,u]}function AF(o,t,e,r,n,s){n==null&&(n=Wh(o,t[0],r[0]));let i=[0,0,0,e];for(let a=0;a<3;a++)o[a]+2*n>=t[a]&&(i[a]=Rc((o[a]-t[a]+2*n)/r[a]+1,s));return i}function Wh(o,t,e,r=1){let n=Tu(t,r);return Math.floor((o[0]*(e-1)-e+n)/2)}function Ec(o){return typeof o=="number"?[o,o,o]:o.length===2?[o[0],o[1],1]:o}function zh(o){return typeof o=="number"?[o,o,o]:o}function Tu(o,t){return t<=1?o:o+(o-1)*(t-1)}function FF(o,t,e,r,n,s,i,a,u){let c,l,p;if(typeof o=="number"){c={top:o,bottom:o,left:o,right:o,type:o===0?"VALID":"NUMBER"};let d=DF([t,e],s,r,o,a);l=d[0],p=d[1]}else if(o==="same"){l=Math.ceil(t/r),p=Math.ceil(e/n);let m=Math.max(0,(l-1)*r+s-t),d=Math.max(0,(p-1)*n+i-e),f=Math.floor(m/2),h=m-f,g=Math.floor(d/2),x=d-g;c={top:f,bottom:h,left:g,right:x,type:"SAME"}}else if(o==="valid")c={top:0,bottom:0,left:0,right:0,type:"VALID"},l=Math.ceil((t-s+1)/r),p=Math.ceil((e-i+1)/n);else if(typeof o=="object"){let m=u==="channelsLast"?o[1][0]:o[2][0],d=u==="channelsLast"?o[1][1]:o[2][1],f=u==="channelsLast"?o[2][0]:o[3][0],h=u==="channelsLast"?o[2][1]:o[3][1];c={top:m,bottom:d,left:f,right:h,type:m===0&&d===0&&f===0&&h===0?"VALID":"EXPLICIT"},l=Rc((t-s+m+d)/r+1,a),p=Rc((e-i+f+h)/n+1,a)}else throw Error(`Unknown padding parameter: ${o}`);return{padInfo:c,outHeight:l,outWidth:p}}function PF(o,t,e,r,n,s,i,a,u,c,l){let p,m,d,f;if(o==="valid"&&(o=0),typeof o=="number"){p={top:o,bottom:o,left:o,right:o,front:o,back:o,type:o===0?"VALID":"NUMBER"};let g=AF([t,e,r,1],[a,u,c],1,[n,s,i],o,l);m=g[0],d=g[1],f=g[2]}else if(o==="same"){m=Math.ceil(t/n),d=Math.ceil(e/s),f=Math.ceil(r/i);let h=(m-1)*n+a-t,g=(d-1)*s+u-e,x=(f-1)*i+c-r,b=Math.floor(h/2),w=h-b,v=Math.floor(g/2),k=g-v,N=Math.floor(x/2),E=x-N;p={top:v,bottom:k,left:N,right:E,front:b,back:w,type:"SAME"}}else throw Error(`Unknown padding parameter: ${o}`);return{padInfo:p,outDepth:m,outHeight:d,outWidth:f}}function Rc(o,t){if(!t)return Math.trunc(o);switch(t){case"round":return Math.round(o);case"ceil":return Math.ceil(o);case"floor":return Math.floor(o);default:throw new Error(`Unknown roundingMode ${t}`)}}function na(o){let[t,e,r]=Ec(o);return t===1&&e===1&&r===1}function Fe(o,t){return na(o)||na(t)}function Jo(o){return Ec(o).every(t=>t>0)}function Mb(o){if(o==="NHWC")return"channelsLast";if(o==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${o}`)}function le(o,t,e){if(e!=null){if(typeof t=="string")throw Error(`Error in ${o}: pad must be an integer when using dimRoundingMode ${e} but got pad ${t}.`);if(typeof t=="number")T(dr(t),()=>`Error in ${o}: pad must be an integer when using dimRoundingMode ${e} but got pad ${t}.`);else if(typeof t=="object")t.forEach(r=>{r.forEach(n=>{T(dr(n),()=>`Error in ${o}: pad must be an integer when using dimRoundingMode ${e} but got pad ${n}.`)})});else throw Error(`Error in ${o}: Unknown padding parameter: ${t}`)}}function _F(o,t){let r={x:S(o,"x","reshape","string_or_numeric")},n={shape:t};return $.runKernel(Gs,r,n)}var V=I({reshape_:_F});function OF(o,t,e,r,n){let s=S(o,"x","avgPool","float32"),i=1;T(Fe(e,i),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${e} and dilations '${i}'`);let a=s,u=!1;s.rank===3&&(u=!0,a=V(s,[1,s.shape[0],s.shape[1],s.shape[2]])),T(a.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${a.rank}.`),le("avgPool",r,n);let c={x:a},l={filterSize:t,strides:e,pad:r,dimRoundingMode:n},p=$.runKernel(zn,c,l);return p=$t(p,s.dtype),u?V(p,[p.shape[1],p.shape[2],p.shape[3]]):p}var Uh=I({avgPool_:OF});function MF(o,t,e,r,n,s="NDHWC"){let i=S(o,"x","avgPool3d","float32"),a=i,u=!1;i.rank===4&&(u=!0,a=V(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),T(a.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${a.rank}.`),T(s==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),T(typeof e=="number"&&e>0||Array.isArray(e)&&e[0]>0&&e[1]>0&&e[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${e}'`),le("avgPool3d",r,n);let c={x:a},l={filterSize:t,strides:e,pad:r,dimRoundingMode:n,dataFormat:s},p=$.runKernel(Vn,c,l);return p=$t(p,a.dtype),u?V(p,[p.shape[1],p.shape[2],p.shape[3],p.shape[4]]):p}var LF=I({avgPool3d_:MF});function BF(o,t=0){T(o.length>=1,()=>"Pass at least one tensor to concat");let e=ln(o,"tensors","concat","string_or_numeric");if(e[0].dtype==="complex64"&&e.forEach(s=>{if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${s.dtype}. `)}),e.length===1)return Po(e[0]);let r=e,n={axis:t};return $.runKernel(Xn,r,n)}var pe=I({concat_:BF});function zF(o,t,e=!1,r=!1){let n=S(o,"a","matMul"),s=S(t,"b","matMul");[n,s]=yt(n,s);let i={a:n,b:s},a={transposeA:e,transposeB:r};return $.runKernel(Wn,i,a)}var At=I({matMul_:zF});function VF(o){let e={x:S(o,"x","sigmoid","float32")};return $.runKernel(Zr,e)}var fn=I({sigmoid_:VF});function WF(o,t,e){let r=S(o,"x","slice","string_or_numeric");if(r.rank===0)throw new Error("Slicing scalar is not possible");let n={x:r},s={begin:t,size:e};return $.runKernel(Zs,n,s)}var _t=I({slice_:WF});function UF(o){let e={x:S(o,"x","tanh","float32")};return $.runKernel(on,e)}var Ml=I({tanh_:UF});function GF(o,t,e,r,n,s){let i=S(o,"forgetBias","basicLSTMCell"),a=S(t,"lstmKernel","basicLSTMCell"),u=S(e,"lstmBias","basicLSTMCell"),c=S(r,"data","basicLSTMCell"),l=S(n,"c","basicLSTMCell"),p=S(s,"h","basicLSTMCell"),m=pe([c,p],1),d=At(m,a),f=pt(d,u),h=f.shape[0],g=f.shape[1]/4,x=[h,g],b=_t(f,[0,0],x),w=_t(f,[0,g],x),v=_t(f,[0,g*2],x),k=_t(f,[0,g*3],x),N=pt(Q(fn(b),Ml(w)),Q(l,fn(pt(i,v)))),E=Q(Ml(N),fn(k));return[N,E]}var HF=I({basicLSTMCell_:GF});function KF(o,t,e){let r=S(o,"x","batchToSpaceND"),n=t.reduce((a,u)=>a*u);T(r.rank>=1+t.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${t.length}`),T(e.length===t.length,()=>`crops.length is ${e.length} but should be equal to blockShape.length  ${t.length}`),T(r.shape[0]%n===0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${n}`);let s={x:r},i={blockShape:t,crops:e};return $.runKernel(Un,s,i)}var Gh=I({batchToSpaceND_:KF});function Lb(o){let t;return o.rank===0||o.rank===1?t=V(o,[1,1,1,o.size]):o.rank===2?t=V(o,[1,1,o.shape[0],o.shape[1]]):o.rank===3?t=V(o,[1,o.shape[0],o.shape[1],o.shape[2]]):t=o,t}function qF(o,t,e,r,n,s){s==null&&(s=.001);let i=S(o,"x","batchNorm"),a=S(t,"mean","batchNorm"),u=S(e,"variance","batchNorm"),c;n!=null&&(c=S(n,"scale","batchNorm"));let l;r!=null&&(l=S(r,"offset","batchNorm")),T(a.rank===u.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),T(l==null||a.rank===l.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),T(c==null||a.rank===c.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let m={x:Lb(i),scale:c,offset:l,mean:a,variance:u},d={varianceEpsilon:s},f=$.runKernel(Cs,m,d);return V(f,i.shape)}var ia=I({batchNorm_:qF});function XF(o,t,e,r,n,s){let i=S(o,"x","batchNorm"),a=S(t,"mean","batchNorm"),u=S(e,"variance","batchNorm"),c;n!=null&&(c=S(n,"scale","batchNorm"));let l;return r!=null&&(l=S(r,"offset","batchNorm")),T(i.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${i.rank}.`),T(a.rank===2||a.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${a.rank}.`),T(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${u.rank}.`),c!=null&&T(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${c.rank}.`),l!=null&&T(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${l.rank}.`),ia(i,a,u,l,c,s)}var jF=I({batchNorm2d_:XF});function YF(o,t,e,r,n,s){let i=S(o,"x","batchNorm"),a=S(t,"mean","batchNorm"),u=S(e,"variance","batchNorm"),c;n!=null&&(c=S(n,"scale","batchNorm"));let l;return r!=null&&(l=S(r,"offset","batchNorm")),T(i.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${i.rank}.`),T(a.rank===3||a.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${a.rank}.`),T(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${u.rank}.`),c!=null&&T(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${c.rank}.`),l!=null&&T(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${l.rank}.`),ia(i,a,u,l,c,s)}var QF=I({batchNorm3d_:YF});function ZF(o,t,e,r,n,s){let i=S(o,"x","batchNorm"),a=S(t,"mean","batchNorm"),u=S(e,"variance","batchNorm"),c;n!=null&&(c=S(n,"scale","batchNorm"));let l;return r!=null&&(l=S(r,"offset","batchNorm")),T(i.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${i.rank}.`),T(a.rank===4||a.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${a.rank}.`),T(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${u.rank}.`),c!=null&&T(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${c.rank}.`),l!=null&&T(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${l.rank}.`),ia(i,a,u,l,c,s)}var JF=I({batchNorm4d_:ZF});function t3(o,t,e){let r=S(o,"x","bincount"),n=S(t,"weights","bincount");T(r.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),T(e>=0,()=>`size must be non-negative, but got ${e}.`),T(n.size===r.size||n.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${n.shape}.`);let s={x:r,weights:n},i={size:e};return $.runKernel(Gn,s,i)}var Hh=I({bincount_:t3});function e3(o,t){let e=S(o,"x","bitwiseAnd"),r=S(t,"y","bitwiseAnd");if(!Oe(e.shape,r.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${e.shape}, y: ${r.shape}`);if(e.dtype!=="int32"||r.dtype!=="int32")throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${e.dtype} and type of y: ${r.dtype}`);let n={a:e,b:r};return $.runKernel(Vi,n)}var o3=I({bitwiseAnd_:e3});function r3(o,t){let e=S(o,"s0","broadcastArgs","int32"),r=S(t,"s1","broadcastArgs","int32");if(e.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${e.rank}`);if(r.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${r.rank}`);let n={s0:e,s1:r};return $.runKernel(Hn,n)}var n3=I({broadcastArgs_:r3});function s3(o,t){let e=S(o,"broadcastTo","x"),r=e.shape;if(Xt(t),t.length<e.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${e.rank}.`);if(t.length>e.rank){let c=e.shape.slice();for(;c.length<t.length;)c.unshift(1);e=V(e,c)}let n=e.shape,s=Array.from(t);for(let c=t.length-1;c>=0;c--)if(n[c]===t[c])s[c]=1;else if(e.shape[c]!==1)throw new Error(`broadcastTo(): [${r}] cannot be broadcast to [${t}].`);if(s.map((c,l)=>c>1?l:-1).filter(c=>c>=0).length===0)return Po(e);let a={x:e},u={reps:s};return $.runKernel(qo,a,u)}var aa=I({broadcastTo_:s3});function i3(o){let e={x:S(o,"x","ceil","float32")};return $.runKernel(wr,e)}var a3=I({ceil_:i3});function hn(o,t,e){Xt(o),e=e||_n(t);let r={shape:o,value:t,dtype:e};return $.runKernel(gs,{},r)}function u3(o,t,e){let r=S(o,"x","clipByValue");if(T(t<=e,()=>`Error in clip: min (${t}) must be less than or equal to max (${e}).`),t===e)return hn(r.shape,t,r.dtype);let n={x:r},s={clipValueMin:t,clipValueMax:e};return $.runKernel(Sr,n,s)}var c3=I({clipByValue_:u3});function l3(o){return pe(o,0)}var p3=I({concat1d_:l3});function m3(o,t){return pe(o,t)}var d3=I({concat2d_:m3});function f3(o,t){return pe(o,t)}var h3=I({concat3d_:f3});function g3(o,t){return pe(o,t)}var x3=I({concat4d_:g3});function C3(o,t,e,r,n="NHWC",s=[1,1],i){let a=S(o,"x","conv2d","float32"),u=S(t,"filter","conv2d","float32"),c=a,l=!1;a.rank===3&&(l=!0,c=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),T(c.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${c.rank}.`),T(u.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${u.rank}.`),le("conv2d",r,i);let p=n==="NHWC"?c.shape[3]:c.shape[1];T(p===u.shape[2],()=>`Error in conv2d: depth of input (${p}) must match input depth for filter ${u.shape[2]}.`),T(Fe(e,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`),T(Jo(s),()=>"Error in conv2D: Dilated rates should be larger than 0."),T(Jo(e),()=>"Error in conv2D: Strides should be larger than 0.");let m={x:c,filter:u},d={strides:e,pad:r,dataFormat:n,dilations:s,dimRoundingMode:i},f=$.runKernel(jn,m,d);return l?V(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var ua=I({conv2d_:C3});function b3(o,t,e,r,n="NWC",s=1,i){let a=S(o,"x","conv1d"),u=S(t,"filter","conv1d"),c=a,l=!1;a.rank===2&&(l=!0,c=V(a,[1,a.shape[0],a.shape[1]])),T(c.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${c.rank}.`),T(u.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${u.rank}.`),le("conv1d",r,i),T(c.shape[2]===u.shape[1],()=>`Error in conv1d: depth of input (${c.shape[2]}) must match input depth for filter ${u.shape[1]}.`),T(Fe(e,s),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${e} and dilation '${s}'`),T(Jo(s),()=>"Error in conv1D: Dilated rates should be larger than 0."),T(Jo(e),()=>"Error in conv1D: Stride should be larger than 0."),T(n==="NWC",()=>`Error in conv1d: got dataFormat of ${n} but only NWC is currently supported.`);let p=V(u,[1,u.shape[0],u.shape[1],u.shape[2]]),m=V(c,[c.shape[0],1,c.shape[1],c.shape[2]]),g=ua(m,p,[1,e],r,"NHWC",[1,s],i);return l?V(g,[g.shape[2],g.shape[3]]):V(g,[g.shape[0],g.shape[2],g.shape[3]])}var y3=I({conv1d_:b3});function w3(o,t,e,r,n,s="NHWC",i){T(o.length===t.rank,()=>`Length of inShape (${o.length}) and rank of dy (${t.rank}) must match`);let a=o,u=t,c=!1;t.rank===3&&(c=!0,u=V(t,[1,t.shape[0],t.shape[1],t.shape[2]]),a=[1,o[0],o[1],o[2]]),T(a.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${a.length}.`),T(u.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${u.rank}`),T(e.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${e.rank}`);let l=s==="NHWC"?a[3]:a[1],p=s==="NHWC"?u.shape[3]:u.shape[1];T(l===e.shape[2],()=>`Error in conv2dDerInput: depth of input (${l}) must match input depth for filter ${e.shape[2]}.`),T(p===e.shape[3],()=>`Error in conv2dDerInput: depth of output (${p}) must match output depth for filter ${e.shape[3]}.`),le("conv2dDerInput",n,i);let m={dy:u,filter:e},d={strides:r,pad:n,dataFormat:s,dimRoundingMode:i,inputShape:a},f=$.runKernel(Qn,m,d);return c?V(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var Ll=I({conv2DBackpropInput_:w3});function S3(o,t,e,r,n,s){let i=S(o,"x","conv2dTranspose"),a=S(t,"filter","conv2dTranspose");return Ll(e,i,a,r,n,"NHWC",s)}var v3=I({conv2dTranspose_:S3});function I3(o,t,e,r,n="NDHWC",s=[1,1,1]){let i=S(o,"x","conv3d"),a=S(t,"filter","conv3d"),u=i,c=!1;i.rank===4&&(c=!0,u=V(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),T(u.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${u.rank}.`),T(a.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${a.rank}.`),T(u.shape[4]===a.shape[3],()=>`Error in conv3d: depth of input (${u.shape[4]}) must match input depth for filter ${a.shape[3]}.`),T(Fe(e,s),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`),T(n==="NDHWC",()=>`Error in conv3d: got dataFormat of ${n} but only NDHWC is currently supported.`),T(Jo(s),()=>"Error in conv3D: Dilated rates should be larger than 0."),T(Jo(e),()=>"Error in conv3D: Strides should be larger than 0.");let l={x:u,filter:a},p={strides:e,pad:r,dataFormat:n,dilations:s},m=$.runKernel(Zn,l,p);return c?V(m,[m.shape[1],m.shape[2],m.shape[3],m.shape[4]]):m}var k3=I({conv3d_:I3});function $3(o,t,e,r,n){T(o.length===t.rank,()=>`Length of inShape (${o.length}) and rank of dy (${t.rank}) must match`);let s=o,i=t,a=!1;t.rank===4&&(a=!0,i=V(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),s=[1,o[0],o[1],o[2],o[3]]);let u=s[4],c=i.shape[4];T(s.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${s.length}.`),T(i.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${i.rank}`),T(e.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${e.rank}`),T(u===e.shape[3],()=>`Error in conv3dDerInput: depth of input (${u}) must match input depth for filter ${e.shape[3]}.`),T(c===e.shape[4],()=>`Error in conv3dDerInput: depth of output (${c}) must match output depth for filter ${e.shape[4]}.`);let l={dy:i,filter:e},p={pad:n,strides:r,inputShape:s},m=$.runKernel(Jn,l,p);return a?V(m,[m.shape[1],m.shape[2],m.shape[3],m.shape[4]]):m}var Bb=I({conv3DBackpropInput_:$3});function T3(o,t,e,r,n){let s=S(o,"x","conv3dTranspose"),i=S(t,"filter","conv3dTranspose");return Bb(e,s,i,r,n)}var N3=I({conv3dTranspose_:T3});function E3(o){let e={x:S(o,"x","cos","float32")};return $.runKernel("Cos",e)}var R3=I({cos_:E3});function D3(o){let e={x:S(o,"x","cosh","float32")};return $.runKernel(vr,e)}var A3=I({cosh_:D3});function F3(o,t=0,e=!1,r=!1){let s={x:S(o,"x","cumprod")},i={axis:t,exclusive:e,reverse:r};return $.runKernel(es,s,i)}var P3=I({cumprod_:F3});function _3(o,t=0,e=!1,r=!1){let s={x:S(o,"x","cumsum")},i={axis:t,exclusive:e,reverse:r};return $.runKernel(os,s,i)}var O3=I({cumsum_:_3});function M3(o,t,e,r=!1){let n=S(o,"x","denseBincount"),s=S(t,"weights","denseBincount");T(n.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${n.dtype}`),T(n.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${n.rank}.`),T(e>=0,()=>`size must be non-negative, but got ${e}.`),T(s.size===n.size||s.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${n.shape}, weights shape: ${s.shape}.`);let i={x:n,weights:s},a={size:e,binaryOutput:r};return $.runKernel(ns,i,a)}var L3=I({denseBincount_:M3});function B3(o,t,e="NHWC"){let r=S(o,"x","depthToSpace","float32"),n=e==="NHWC"?r.shape[1]:r.shape[2],s=e==="NHWC"?r.shape[2]:r.shape[3],i=e==="NHWC"?r.shape[3]:r.shape[1];T(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),T(n*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${n} and ${t}  for depthToSpace with input shape
    ${r.shape}`),T(s*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${s} and ${t} for depthToSpace with input shape
        ${r.shape}`),T(i%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${i} for depthToSpace with input shape ${r.shape}`);let a={x:r},u={blockSize:t,dataFormat:e};return $.runKernel(ss,a,u)}var z3=I({depthToSpace_:B3});function V3(o,t,e,r,n="NHWC",s=[1,1],i){let a=S(o,"x","depthwiseConv2d","float32"),u=S(t,"filter","depthwiseConv2d","float32"),c=a,l=!1;a.rank===3&&(l=!0,c=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),T(c.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${c.rank}.`),T(u.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${u.rank}.`);let p=n==="NHWC"?c.shape[3]:c.shape[1];T(p===u.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${p}) must match the inChannels dimension in filter ${u.shape[2]}.`),le("depthwiseConv2d",r,i);let m={x:c,filter:u},d={strides:e,pad:r,dataFormat:n,dilations:s,dimRoundingMode:i},f=$.runKernel(is,m,d);return l?V(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var Dc=I({depthwiseConv2d_:V3});function W3(o){let e={x:S(o,"x","diag")};return $.runKernel(cs,e)}var U3=I({diag_:W3});function G3(o,t,e,r,n=[1,1],s="NHWC"){let i=S(o,"x","dilation2d"),a=S(t,"filter","dilation2d");T(i.rank===3||i.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${i.rank}.`),T(a.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${a.rank}.`),T(s==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${s}`);let u=i,c=!1;i.rank===3&&(u=V(i,[1,i.shape[0],i.shape[1],i.shape[2]]),c=!0),T(u.shape[3]===a.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${u.shape[3]} vs ${a.shape[2]}`);let l={x:u,filter:a},p={strides:e,pad:r,dilations:n},m=$.runKernel(ls,l,p);return c?V(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var H3=I({dilation2d_:G3});var xo={};Ae(xo,{assertAndGetBroadcastShape:()=>Ft,getBroadcastDims:()=>zb,getReductionAxes:()=>Bl});function zb(o,t){let e=o.length,r=[];for(let n=0;n<e;n++){let s=e-1-n,i=o[s]||1;(t[t.length-1-n]||1)>1&&i===1&&r.unshift(s)}return r}function Bl(o,t){let e=[];for(let r=0;r<t.length;r++){let n=o[o.length-r-1],s=t.length-r-1,i=t[s];(n==null||n===1&&i>1)&&e.unshift(s)}return e}function Ft(o,t){let e=Math.max(o.length,t.length),r=new Array(e);for(let n=0;n<e;n++){let s=o[o.length-n-1];s==null&&(s=1);let i=t[t.length-n-1];if(i==null&&(i=1),s===1)r[e-n-1]=i;else if(i===1)r[e-n-1]=s;else if(s!==i){let a=`Operands could not be broadcast together with shapes ${o} and ${t}.`;throw Error(a)}else r[e-n-1]=s}return r}function K3(o,t){let e=S(o,"a","equal","string_or_numeric"),r=S(t,"b","equal","string_or_numeric");[e,r]=yt(e,r),Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(kr,n)}var Kh=I({equal_:K3});function q3(o,t,e){let r=S(t,"a","where"),n=S(e,"b","where"),s=S(o,"condition","where","bool"),i=Ft(Ft(s.shape,r.shape),n.shape),a=aa(s,i),u=aa(r,i),c=aa(n,i),l={condition:a,t:u,e:c};return $.runKernel(Qs,l)}var Co=I({where_:q3});function X3(o){let e={x:S(o,"x","zerosLike")};return $.runKernel(fi,e)}var xe=I({zerosLike_:X3});function j3(o,t){let e=S(o,"a","div"),r=S(t,"b","div");[e,r]=yt(e,r);let n=Et(e,r),s=xe(n),i=Kh(r,s);return Co(i,s,n)}var Y3=I({divNoNan_:j3});function Q3(o,t){let e=S(o,"t1","dot"),r=S(t,"t2","dot");T((e.rank===1||e.rank===2)&&(r.rank===1||r.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${e.rank} and ${r.rank}.`);let n=e.rank===1?e.size:e.shape[1],s=r.rank===1?r.size:r.shape[0];if(T(n===s,()=>`Error in dot: inner dimensions of inputs must match, but got ${n} and ${s}.`),e.rank===1&&r.rank===1){let i=V(e,[1,-1]),a=V(r,[-1,1]),u=At(i,a);return V(u,[])}else if(e.rank===1&&r.rank===2){let i=V(e,[1,-1]),a=V(r,[r.shape[0],r.shape[1]]),u=At(i,a);return V(u,[u.size])}else if(e.rank===2&&r.rank===1){let i=V(r,[-1,1]),a=At(e,i);return V(a,[a.size])}else{let i=V(r,[r.shape[0],r.shape[1]]);return At(e,i)}}var Z3=I({dot_:Q3});function J3(o,...t){let e=t.map((n,s)=>S(n,`tensors${s}`,"einsum")),r={equation:o};return $.runKernel(ps,e,r)}var ca=I({einsum_:J3});function tP(o){let e={x:S(o,"x","elu","float32")};return $.runKernel("Elu",e)}var qh=I({elu_:tP});function eP(o,t){let e=S(o,"x","ensureShape","string_or_numeric");if(!eh(e.shape,t))throw new Error(`EnsureShape: Shape of tensor ${e.shape} is not compatible with expected shape ${t}`);return o}var oP=I({ensureShape_:eP});function rP(o){let t=S(o,"x","erf");T(t.dtype==="int32"||t.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),t.dtype==="int32"&&(t=$t(t,"float32"));let e={x:t};return $.runKernel("Erf",e)}var nP=I({erf_:rP});function Xh(o,t){for(let e=0;e<o.length;++e)if(o[o.length-e-1]!==t-1-e)return!1;return!0}function Vb(o,t,e){let r=o.length+t.length,n=[],s=0,i=0;for(let a=0;a<r;a++)e.indexOf(a)===-1?n.push(o[s++]):n.push(t[i++]);return n}function sP(o,t){let e=[],r=o.length;for(let s=0;s<r;s++)t.indexOf(s)===-1&&e.push(o[s]);let n=t.map(s=>o[s]);return[e,n]}function gn(o,t){let e=t.map(r=>1);return Vb(o,e,t)}function iP(o,t,e){T(Xh(t,e),()=>`${o} supports only inner-most axes for now. Got axes ${t} and rank-${e} input.`)}function aP(o,t){if(Xh(o,t))return null;let e=[];for(let r=0;r<t;++r)o.indexOf(r)===-1&&e.push(r);return o.forEach(r=>e.push(r)),e}function uP(o){return o.map((t,e)=>[e,t]).sort((t,e)=>t[1]-e[1]).map(t=>t[0])}function cP(o,t){let e=[];for(let r=t-o;r<t;++r)e.push(r);return e}function pP(o,t=null,e=!1){let n={x:S(o,"x","max")},s={reductionIndices:t,keepDims:e};return $.runKernel("Max",n,s)}var xn=I({max_:pP});function mP(o,t=null,e=!1){let n={x:S(o,"x","min")},s={axis:t,keepDims:e};return $.runKernel("Min",n,s)}var zl=I({min_:mP});function dP(o,t){let e=S(o,"base","pow"),r=S(t,"exp","pow");[e,r]=yt(e,r);let n={a:e,b:r};return $.runKernel("Pow",n)}var wi=I({pow_:dP});function wt(o,t){if((ue(o)&&t!=="string"||Array.isArray(o))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&ue(o)&&!(o instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Le(o,[],[],t)}function fP(o){let e={x:S(o,"x","sqrt","float32")};return $.runKernel(tn,e)}var Qe=I({sqrt_:fP});function hP(o){let t=S(o,"x","square"),e={};return $.runKernel("Square",{x:t},e)}var $e=I({square_:hP});function gP(o,t=null,e=!1){let r=S(o,"x","sum");r.dtype==="bool"&&(r=$t(r,"int32"));let n={x:r},s={axis:t,keepDims:e};return $.runKernel("Sum",n,s)}var Ot=I({sum_:gP});function xP(o,t="euclidean",e=null,r=!1){o=S(o,"x","norm");let n=Wb(o,t,e),s=n.shape;if(r){let i=Pn(e,o.shape);s=gn(n.shape,i)}return V(n,s)}function Wb(o,t,e=null){if(o.rank===0)return ke(o);if(o.rank!==1&&e===null)return Wb(V(o,[-1]),t,e);if(o.rank===1||typeof e=="number"||Array.isArray(e)&&e.length===1){if(t===1)return Ot(ke(o),e);if(t===1/0)return xn(ke(o),e);if(t===-1/0)return zl(ke(o),e);if(t==="euclidean"||t===2)return Qe(Ot(wi(ke(o),wt(2,"int32")),e));throw new Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(e)&&e.length===2){if(t===1)return xn(Ot(ke(o),e[0]),e[1]-1);if(t===1/0)return xn(Ot(ke(o),e[1]),e[0]);if(t===-1/0)return zl(Ot(ke(o),e[1]),e[0]);if(t==="fro"||t==="euclidean")return Qe(Ot($e(o),e));throw new Error(`Error in norm: invalid ord value: ${t}`)}throw new Error(`Error in norm: invalid axis: ${e}`)}var Nu=I({norm_:xP});function CP(o,t=null,e=!1){return Nu(o,"euclidean",t,e)}var bP=I({euclideanNorm_:CP});function yP(o){let e={x:S(o,"x","exp")};return $.runKernel("Exp",e)}var _o=I({exp_:yP});function wP(o,t=0){let e=S(o,"x","expandDims","string_or_numeric");T(t<=e.rank,()=>"Axis must be <= rank of the tensor");let r={input:e},n={dim:t};return $.runKernel(hs,r,n)}var er=I({expandDims_:wP});function SP(o){let e={x:S(o,"x","expm1")};return $.runKernel($r,e)}var vP=I({expm1_:SP});function IP(o,t){let e=S(o,"x","tile","string_or_numeric");T(e.rank===t.length,()=>`Error in transpose: rank of input ${e.rank} must match length of reps ${t}.`);let r={x:e},n={reps:t};return $.runKernel(qo,r,n)}var la=I({tile_:IP});function kP(o,t,e,r="float32"){t==null&&(t=o);let n=nt([o,t],r),s=o<=t?o:t;for(let a=0;a<s;++a)n.set(1,a,a);let i=V(n.toTensor(),[o,t]);if(e==null)return i;if(e.length===1)return la(er(i,0),[e[0],1,1]);if(e.length===2)return la(er(er(i,0),0),[e[0],e[1],1,1]);if(e.length===3)return la(er(er(er(i,0),0),0),[e[0],e[1],e[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${e.length}D.`)}var jh=I({eye_:kP});function $P(o){let e={x:S(o,"x","floor","float32")};return $.runKernel(Tr,e)}var Yh=I({floor_:$P});function TP(o,t,e=0,r=0){let n=S(o,"x","gather"),s=S(t,"indices","gather","int32"),i={x:n,indices:s},a={axis:e,batchDims:r};return $.runKernel(bs,i,a)}var Qh=I({gather_:TP});function NP(o,t){let e=S(o,"a","greater","string_or_numeric"),r=S(t,"b","greater","string_or_numeric");[e,r]=yt(e,r),Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(Er,n)}var Eu=I({greater_:NP});function EP(o,t){let e=S(o,"a","greaterEqual","string_or_numeric"),r=S(t,"b","greaterEqual","string_or_numeric");[e,r]=yt(e,r),Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(Rr,n)}var Zh=I({greaterEqual_:EP});function RP(o){let e={input:S(o,"input","imag")};return $.runKernel(Ss,e)}var pa=I({imag_:RP});function DP(o){let e={x:S(o,"x","isFinite")};return $.runKernel(Dr,e)}var AP=I({isFinite_:DP});function FP(o){let e={x:S(o,"x","isInf")};return $.runKernel(Ar,e)}var PP=I({isInf_:FP});function _P(o){let e={x:S(o,"x","isNaN")};return $.runKernel(Fr,e)}var OP=I({isNaN_:_P});function MP(o,t=.2){let r={x:S(o,"x","leakyRelu")},n={alpha:t};return $.runKernel(vs,r,n)}var Jh=I({leakyRelu_:MP});function LP(o,t){let e=S(o,"a","less","string_or_numeric"),r=S(t,"b","less","string_or_numeric");[e,r]=yt(e,r),Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(Pr,n)}var Vl=I({less_:LP});function BP(o,t){let e=S(o,"a","lessEqual","string_or_numeric"),r=S(t,"b","lessEqual","string_or_numeric");[e,r]=yt(e,r),Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(_r,n)}var Ac=I({lessEqual_:BP});function zP(o,t,e){if(e<=0)throw new Error("The number of values should be positive.");let r={start:o,stop:t,num:e};return $.runKernel(Is,{},r)}function VP(o,t=5,e=1,r=1,n=.5){let s=S(o,"x","localResponseNormalization");T(s.rank===4||s.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${s.rank}.`),T(dr(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let i=s,a=!1;s.rank===3&&(a=!0,i=V(s,[1,s.shape[0],s.shape[1],s.shape[2]]));let u={x:i},c={depthRadius:t,bias:e,alpha:r,beta:n},l=$.runKernel("LRN",u,c);return a?V(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var WP=I({localResponseNormalization_:VP});function UP(o){let e={x:S(o,"x","log","float32")};return $.runKernel("Log",e)}var Si=I({log_:UP});function GP(o){let e={x:S(o,"x","log1p")};return $.runKernel(Or,e)}var tg=I({log1p_:GP});function HP(o){return T(Wo(o),()=>"The f passed in grad(f) must be a function"),(t,e)=>{let r=S(t,"x","tf.grad","string_or_numeric"),n=e!=null?S(e,"dy","tf.grad"):null;return $.tidy(()=>{let{value:s,grads:i}=$.gradients(()=>o(r),[r],n);return n!=null&&Gt(s.shape,n.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),Wl(i),i[0]})}}function KP(o){return T(Wo(o),()=>"The f passed in grads(f) must be a function"),(t,e)=>{T(Array.isArray(t),()=>"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s");let r=ln(t,"args","tf.grads","string_or_numeric"),n=e!=null?S(e,"dy","tf.grads"):null;return $.tidy(()=>{let{value:s,grads:i}=$.gradients(()=>o(...r),r,n);return n!=null&&Gt(s.shape,n.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),Wl(i),i})}}function qP(o){return T(Wo(o),()=>"The f passed in valueAndGrad(f) must be a function"),(t,e)=>{T(t instanceof Ut,()=>"The x passed in valueAndGrad(f)(x) must be a tensor"),T(e==null||e instanceof Ut,()=>"The dy passed in valueAndGrad(f)(x, dy) must be a tensor");let{grads:r,value:n}=$.gradients(()=>o(t),[t],e);return Wl(r),{grad:r[0],value:n}}}function XP(o){return T(Wo(o),()=>"The f passed in valueAndGrads(f) must be a function"),(t,e)=>{T(Array.isArray(t)&&t.every(n=>n instanceof Ut),()=>"The args passed in valueAndGrads(f)(args) must be array of tensors"),T(e==null||e instanceof Ut,()=>"The dy passed in valueAndGrads(f)(args, dy) must be a tensor");let r=$.gradients(()=>o(...t),t,e);return e!=null&&Gt(r.value.shape,e.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),Wl(r.grads),r}}function eg(o,t){T(Wo(o),()=>"The f passed in variableGrads(f) must be a function"),T(t==null||Array.isArray(t)&&t.every(c=>c instanceof un),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");let e=t!=null;if(!e){t=[];for(let c in $.registeredVariables)t.push($.registeredVariables[c])}let r=e?t.filter(c=>!c.trainable):null,n=t.length;t=t.filter(c=>c.trainable),T(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${n} variables is trainable.`);let s=!0,{value:i,grads:a}=$.gradients(o,t,null,s);T(a.some(c=>c!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),T(i.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${i.rank} tensor`);let u={};return t.forEach((c,l)=>{a[l]!=null&&(u[c.name]=a[l])}),r?.forEach(c=>u[c.name]=null),{value:i,grads:u}}function ze(o){return $.customGrad(o)}function Wl(o){if(o.filter(e=>e==null).length>0)throw new Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that
    the f you passed encloses all operations that lead from x to y.`)}function jP(o){let e={x:S(o,"x","neg")};return $.runKernel("Neg",e)}var Pe=I({neg_:jP});function YP(o){let e={x:S(o,"x","softplus")};return $.runKernel(Jr,e)}var og=I({softplus_:YP});function QP(o){let t=S(o,"x","logSigmoid");return ze(r=>({value:Pe(og(Pe(r))),gradFunc:i=>Q(i,fn(Pe(r)))}))(t)}var ZP=I({logSigmoid_:QP});function JP(o,t){let e=S(o,"a","sub"),r=S(t,"b","sub");[e,r]=yt(e,r);let n={a:e,b:r};return $.runKernel("Sub",n)}var ht=I({sub_:JP});function t_(o,t=-1){let e=S(o,"logits","logSoftmax");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${e.rank} and axis was ${t}`);return ze((n,s)=>{let a=xn(n,t,!0),u=ht(n,a),c=ht($t(u,"float32"),Si(Ot(_o(u),t,!0)));return s([c]),{value:c,gradFunc:(p,m)=>{let[d]=m,f=!0,h=_o(d);return ht(p,Q(Ot(p,t,f),h))}}})(e)}var e_=I({logSoftmax_:t_});function o_(o,t=null,e=!1){let r=S(o,"x","logSumExp"),n=Pn(t,r.shape),s=xn(r,n,!0),i=ht(r,s),a=_o(i),u=Ot(a,n),c=Si(u),l=pt(V(s,c.shape),c);if(e){let p=gn(l.shape,n);return V(l,p)}return l}var rg=I({logSumExp_:o_});function r_(o,t){let e=S(o,"a","logicalAnd","bool"),r=S(t,"b","logicalAnd","bool");Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(Mr,n)}var Ru=I({logicalAnd_:r_});function n_(o){let e={x:S(o,"x","logicalNot","bool")};return $.runKernel(Lr,e)}var ng=I({logicalNot_:n_});function s_(o,t){let e=S(o,"a","logicalOr","bool"),r=S(t,"b","logicalOr","bool");Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(Br,n)}var sg=I({logicalOr_:s_});function i_(o,t){let e=S(o,"a","logicalXor","bool"),r=S(t,"b","logicalXor","bool");return Ft(e.shape,r.shape),Ru(sg(o,t),ng(Ru(o,t)))}var a_=I({logicalXor_:i_});var Ul=2147483648;function u_(o,t,e="left"){let r=S(o,"sortedSequence","searchSorted"),n=S(t,"values","searchSorted"),s=r.shape[r.shape.length-1],i=n.shape[n.shape.length-1],a=V(r,[-1,s]),u=V(n,[-1,i]);if(a.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(a.shape[0]!==u.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(St(u.shape)>=Ul)throw new Error(`values tensor size must less than ${Ul}`);if(a.shape[1]>=Ul)throw new Error(`trailing dim_size must less than ${Ul} for int32 output type, was ${a.shape[1]}`);let c={sortedSequence:a,values:u},l={side:e};return $.runKernel(Ys,c,l)}var Gl=I({searchSorted_:u_});function c_(o,t){return Gl(o,t,"left")}function l_(o,t,e,r,n){let s=S(o,"x","maxPool"),i=1,a=s,u=!1;s.rank===3&&(u=!0,a=V(s,[1,s.shape[0],s.shape[1],s.shape[2]])),T(a.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${a.rank}.`),T(Fe(e,i),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${e} and dilations '${i}'`),le("maxPool",r,n);let c={x:a},l={filterSize:t,strides:e,pad:r,dimRoundingMode:n},p=$.runKernel($s,c,l);return u?V(p,[p.shape[1],p.shape[2],p.shape[3]]):p}var ig=I({maxPool_:l_});function p_(o,t=[1,1,1],e,r,n,s="NDHWC"){let i=S(o,"x","maxPool3d"),a=i,u=!1;i.rank===4&&(u=!0,a=V(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),T(a.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${a.rank}.`),T(s==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),le("maxPool3d",r,n);let c={x:a},l={filterSize:t,strides:e,pad:r,dimRoundingMode:n,dataFormat:s},p=$.runKernel(Ts,c,l);return u?V(p,[p.shape[1],p.shape[2],p.shape[3],p.shape[4]]):p}var m_=I({maxPool3d_:p_});function d_(o,t,e,r,n=!1){let i={x:S(o,"x","maxPoolWithArgmax")},a={filterSize:t,strides:e,pad:r,includeBatchInIndex:n},u=$.runKernel(Ns,i,a);return{result:u[0],indexes:u[1]}}var f_=I({maxPoolWithArgmax_:d_});function h_(o,t){let e=S(o,"a","maximum"),r=S(t,"b","maximum");[e,r]=yt(e,r),e.dtype==="bool"&&(e=$t(e,"int32"),r=$t(r,"int32")),Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(zr,n)}var ag=I({maximum_:h_});function g_(o,t=null,e=!1){let n={x:S(o,"x","mean")},s={axis:t,keepDims:e};return $.runKernel(Es,n,s)}var Du=I({mean_:g_});function uo(o,t="float32"){if(Xt(o),t==="complex64"){let r=uo(o,"float32"),n=uo(o,"float32");return Ye(r,n)}let e=Ya(St(o),t);return $.makeTensor(e,o,t)}function Cn(o,t="float32"){if(Xt(o),t==="complex64"){let r=Cn(o,"float32"),n=uo(o,"float32");return Ye(r,n)}let e=gc(St(o),t);return $.makeTensor(e,o,t)}function x_(o,t,{indexing:e="xy"}={}){if(e!=="xy"&&e!=="ij")throw new TypeError(`${e} is not a valid third argument to meshgrid`);if(o===void 0)return[];let r=S(o,"x","meshgrid",o instanceof Ut?o.dtype:"float32");if(t===void 0)return[r];let n=S(t,"y","meshgrid",t instanceof Ut?t.dtype:"float32"),s=St(r.shape),i=St(n.shape);return e==="xy"?(r=V(r,[1,-1]),n=V(n,[-1,1]),[At(Cn([i,1],r.dtype),r),At(n,Cn([1,s],n.dtype))]):(r=V(r,[-1,1]),n=V(n,[1,-1]),[At(r,Cn([1,i],r.dtype)),At(Cn([s,1],n.dtype),n)])}function C_(o,t){let e=S(o,"a","minimum"),r=S(t,"b","minimum");[e,r]=yt(e,r),e.dtype==="bool"&&(e=$t(e,"int32"),r=$t(r,"int32")),Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(Vr,n)}var Au=I({minimum_:C_});function b_(o,t,e){T(e==="reflect"||e==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${e}.`);let r=S(o,"x","mirrorPad");if(r.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");T(t.length===r.rank,()=>`Padding doesn't match input. Must be ${r.rank}. Got ${t.length}.`);let n=e==="reflect"?1:0;for(let a=0;a<r.rank;a++)T(t[a].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),T(t[a][0]>=0&&t[a][0]<=r.shape[a]-n&&t[a][1]>=0&&t[a][1]<=r.shape[a]-n,()=>`Padding in dimension ${a} cannot be greater than or equal to ${r.shape[a]-n} or less than 0 for input of shape ${r.shape}`);let s={paddings:t,mode:e},i={x:r};return $.runKernel(Rs,i,s)}var y_=I({mirrorPad_:b_});function w_(o,t){let e=S(o,"a","mod"),r=S(t,"b","mod");[e,r]=yt(e,r);let n={a:e,b:r};return $.runKernel("Mod",n)}var S_=I({mod_:w_});function v_(o,t=null,e=!1){o=S(o,"x","moments");let r=Pn(t,o.shape),n=Du(o,r,e),s=n.shape;e||(s=gn(n.shape,r));let i=$e(ht($t(o,"float32"),V(n,s))),a=Du(i,r,e);return{mean:n,variance:a}}var I_=I({moments_:v_});function k_(o,t,e,r){let n=S(t,"data","multiRNNCell"),s=ln(e,"c","multiRNNCell"),i=ln(r,"h","multiRNNCell"),a=n,u=[];for(let p=0;p<o.length;p++){let m=o[p](a,s[p],i[p]);u.push(m[0]),u.push(m[1]),a=m[1]}let c=[],l=[];for(let p=0;p<u.length;p+=2)c.push(u[p]),l.push(u[p+1]);return[c,l]}var $_=I({multiRNNCell_:k_});function T_(o,t,e,r=!1){let n=S(o,"logits","multinomial"),s=n.size,i=n.rank;if(s<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${s}.`);if(i>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${i}`);e=e||Math.random();let u={logits:i===1?V(n,[1,-1]):n},c={numSamples:t,seed:e,normalized:r},l=$.runKernel(As,u,c);return i===1?V(l,[l.size]):l}var N_=I({multinomial_:T_});function E_(o,t){let e=S(o,"a","notEqual","string_or_numeric"),r=S(t,"b","notEqual","string_or_numeric");[e,r]=yt(e,r),Ft(e.shape,r.shape);let n={a:e,b:r};return $.runKernel(Ur,n)}var ug=I({notEqual_:E_});function R_(o,t,e=1,r=0,n="int32"){if(t<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${t}`);let i={indices:S(o,"indices","oneHot","int32")},a={dtype:n,depth:t,onValue:e,offValue:r};return $.runKernel(Os,i,a)}var Hl=I({oneHot_:R_});function D_(o){let e={x:S(o,"x","onesLike")};return $.runKernel(_s,e)}var A_=I({onesLike_:D_});function F_(o,t){let e=S(o,"v1","outerProduct"),r=S(t,"v2","outerProduct");T(e.rank===1&&r.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${e.rank} and ${r.rank}.`);let n=V(e,[-1,1]),s=V(r,[1,-1]);return At(n,s)}var P_=I({outerProduct_:F_});function __(o,t,e=0){let r=S(o,"x","pad");if(r.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");let n={paddings:t,constantValue:e},s={x:r};return $.runKernel(Ls,s,n)}var bn=I({pad_:__});function O_(o,t,e=0){return T(t.length===2,()=>"Invalid number of paddings. Must be length of 2."),bn(o,[t],e)}var M_=I({pad1d_:O_});function L_(o,t,e=0){return T(t.length===2&&t[0].length===2&&t[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),bn(o,t,e)}var B_=I({pad2d_:L_});function z_(o,t,e=0){return T(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),bn(o,t,e)}var V_=I({pad3d_:z_});function W_(o,t,e=0){return T(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),bn(o,t,e)}var U_=I({pad4d_:W_});function G_(o,t,e){let r=S(o,"x","spaceToBatchND");T(r.rank>=1+t.length,()=>`input rank ${r.rank} should be > than [blockShape] ${t.length}`),T(e.length===t.length,()=>`paddings.shape[0] ${e.length} must be equal to [blockShape] ${t.length}`),T(r.shape.reduce((i,a,u)=>u>0&&u<=t.length?i&&(a+e[u-1][0]+e[u-1][1])%t[u-1]===0:i,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${e.toString()} must be divisible by blockShapes ${t.toString()}`);let n={x:r},s={blockShape:t,paddings:e};return $.runKernel(ti,n,s)}var cg=I({spaceToBatchND_:G_});function H_(o,t,e,r,n,s,i){n==null&&(n=[1,1]),s==null&&(s=1),r===0&&(r="valid");let a=S(o,"x","maxPool"),u=a,c=!1;a.rank===3&&(c=!0,u=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),T(Fe(s,n),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${s} and dilations '${n}'`);let l=Vh(u.shape,t,s,n,r),p=[l.dilationHeight,l.dilationWidth],m;r==="same"?m=q_([l.filterHeight,l.filterWidth],p):m=[[0,0],[0,0]];let d=p[0]===1&&p[1]===1,[f,h]=K_([l.inHeight,l.inWidth],p,m),g=d?r:"valid",x=d?u:cg(u,p,f),w=(e==="avg"?()=>Uh(x,t,s,g,i):()=>ig(x,t,s,g,i))(),v=d?w:Gh(w,p,h);return c?V(v,[v.shape[1],v.shape[2],v.shape[3]]):v}function K_(o,t,e){let r=e.map(l=>l[0]),n=e.map(l=>l[1]),s=o.concat(r,n),i=t.map((l,p)=>(l-s[p]%l)%l),a=n.map((l,p)=>l+i[p]),u=t.map((l,p)=>[r[p],a[p]]),c=t.map((l,p)=>[0,i[p]]);return[u,c]}function q_(o,t){let r=o.map((i,a)=>i+(i-1)*(t[a]-1)).map(i=>i-1),n=r.map(i=>Math.floor(i/2)),s=r.map((i,a)=>i-n[a]);return r.map((i,a)=>[n[a],s[a]])}var X_=I({pool_:H_});function j_(o,t){let e=S(o,"x","prelu"),r=S(t,"alpha","prelu"),n={x:e,alpha:r};return $.runKernel(zs,n)}var lg=I({prelu_:j_});function Y_(o,t=null,e=!1){let r=S(o,"x","prod");r.dtype==="bool"&&(r=$t(r,"int32"));let n={x:r},s={axis:t,keepDims:e};return $.runKernel(Vs,n,s)}var Q_=I({prod_:Y_});function Z_(o,t,e,r){let n=o.map((l,p)=>S(l,`tensors${p}`,"raggedGather","int32")),s=S(t,"paramsDenseValues","raggedGather"),i=S(e,"indices","raggedGather","int32"),a={paramsNestedSplits:n,paramsDenseValues:s,indices:i},u={outputRaggedRank:r},c=$.runKernel(su,a,u);return{outputNestedSplits:c.slice(0,c.length-1),outputDenseValues:c[c.length-1]}}var J_=I({raggedGather_:Z_});function tO(o,t,e){let r=S(o,"starts","raggedRange"),n=S(t,"limits","raggedRange",r.dtype),s=S(e,"deltas","raggedRange",r.dtype),i={starts:r,limits:n,deltas:s},a=$.runKernel(iu,i);return{rtNestedSplits:a[0],rtDenseValues:a[1]}}var eO=I({raggedRange_:tO});function oO(o,t,e,r,n){let s=S(o,"shape","raggedTensorToTensor","int32"),i=S(t,"values","raggedTensorToTensor"),a=S(e,"defaultValue","raggedTensorToTensor",i.dtype),u=r.map((p,m)=>S(p,`tensors${m}`,"raggedTensorToTensor","int32")),c={shape:s,values:i,defaultValue:a,rowPartitionTensors:u},l={rowPartitionTypes:n};return $.runKernel(au,c,l)}var rO=I({raggedTensorToTensor_:oO});function nO(o,t,e){Xt(o);let r=St(o),n=null;if(e==null||e==="float32")n=new Float32Array(r);else if(e==="int32")n=new Int32Array(r);else if(e==="bool")n=new Uint8Array(r);else throw new Error(`Unknown data type ${e}`);for(let s=0;s<r;s++)n[s]=t();return $.makeTensor(n,o,e)}var sO=I({rand_:nO});var jl=th(xg());var ay={};Ae(ay,{TEST_EPSILON_FLOAT16:()=>sy,createVideoElement:()=>bO,encodeStrings:()=>iy,expectArrayBuffersEqual:()=>CO,expectArraysClose:()=>dO,expectArraysEqual:()=>hO,expectNumbersClose:()=>gO,expectPromiseToFail:()=>fO,expectValuesInRange:()=>xO,play:()=>yO,testEpsilon:()=>bg});var mO=.001,sy=.1;function dO(o,t,e){return e==null&&(e=bg()),Cg(o,t,(r,n)=>yg(r,n,e))}function bg(){return $.backend.floatPrecision()===32?mO:sy}function Cg(o,t,e){let r=!0;if((ue(o)||ue(t))&&(r=!1),ue(o)&&ue(t)&&(r=!0),r){let i=o.constructor.name,a=t.constructor.name;if(i!==a)throw new Error(`Arrays are of different type. Actual: ${i}. Expected: ${a}`)}if(Array.isArray(o)&&Array.isArray(t)){let i=ve(o),a=ve(t);if(!Oe(i,a))throw new Error(`Arrays have different shapes. Actual: [${i}]. Expected: [${a}]`)}let n=ue(o)?o:Do(o),s=ue(t)?t:Do(t);if(n.length!==s.length)throw new Error(`Arrays have different lengths actual: ${n.length} vs expected: ${s.length}.
Actual:   ${n}.
Expected: ${s}.`);for(let i=0;i<s.length;++i){let a=n[i],u=s[i];if(!e(a,u))throw new Error(`Arrays differ: actual[${i}] = ${a}, expected[${i}] = ${u}.
Actual:   ${n}.
Expected: ${s}.`)}typeof expect<"u"&&expect().nothing()}function fO(o,t){o().then(()=>t.fail(),()=>t()),typeof expect<"u"&&expect().nothing()}function hO(o,t){let e=typeof t=="string"||typeof t=="number"||typeof t=="boolean"?[t]:t;return Eo(o)||Eo(o[0])||Eo(t)||Eo(t[0])?Cg(o,e,(r,n)=>r==n):Cg(o,t,(r,n)=>yg(r,n,0))}function gO(o,t,e){if(e==null&&(e=bg()),!yg(o,t,e))throw new Error(`Numbers differ: actual === ${o}, expected === ${t}`);typeof expect<"u"&&expect().nothing()}function yg(o,t,e){return!isFinite(o)&&!isFinite(t)?!0:!(isNaN(o)||isNaN(t)||Math.abs(o-t)>e)}function xO(o,t,e){for(let r=0;r<o.length;r++)if(o[r]<t||o[r]>e)throw new Error(`Value out of range:${o[r]} low: ${t}, high: ${e}`)}function CO(o,t){let e=new Float32Array(o),r=new Float32Array(t);if(e.length!==r.length)throw new Error(`Expected ArrayBuffer to be of length ${r.length}, but it was ${e.length}`);for(let n=0;n<r.length;n++)if(e[n]!==r[n])throw new Error(`Expected ArrayBuffer value at ${n} to be ${r[n]} but got ${e[n]} instead`)}function iy(o){for(let t=0;t<o.length;t++){let e=o[t];Array.isArray(e)?iy(e):o[t]=xi(e)}return o}function bO(o){let t=document.createElement("video");return"playsInline"in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position="fixed",t.style.left="0px",t.style.top="0px",t.preload="auto",t.appendChild(o),new Promise(e=>{t.addEventListener("loadeddata",r=>e(t)),t.load()})}async function yO(o){await o.play(),"requestVideoFrameCallback"in o&&await new Promise(t=>{o.requestVideoFrameCallback(t)})}var da=class{constructor(t,e,r,n,s){this.mean=t,this.stdDev=e,this.dtype=r,this.nextVal=NaN,this.truncated=n,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);let i=s||Math.random();this.random=jl.alea(i.toString())}nextValue(){if(!isNaN(this.nextVal)){let n=this.nextVal;return this.nextVal=NaN,n}let t,e,r=!1;for(;!r;){let n,s,i;do n=2*this.random()-1,s=2*this.random()-1,i=n*n+s*s;while(i>=1||i===0);let a=Math.sqrt(-2*Math.log(i)/i);t=this.mean+this.stdDev*n*a,e=this.mean+this.stdDev*s*a,(!this.truncated||this.isValidTruncated(t))&&(r=!0)}return(!this.truncated||this.isValidTruncated(e))&&(this.nextVal=this.convertValue(e)),this.convertValue(t)}convertValue(t){return this.dtype==null||this.dtype==="float32"?t:Math.round(t)}isValidTruncated(t){return t<=this.upper&&t>=this.lower}},ql=class{constructor(t,e,r,n){this.alpha=t,this.beta=1/e,this.dtype=r;let s=n||Math.random();this.randu=jl.alea(s.toString()),this.randn=new da(0,1,r,!1,this.randu()),t<1?this.d=t+2/3:this.d=t-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let t,e,r,n,s,i;for(;;){do n=this.randn.nextValue(),i=1+this.c*n;while(i<=0);if(i*=i*i,t=n*n,e=1-.331*t*t,r=.5*t+this.d*(1-i+Math.log(i)),s=this.randu(),s<e||Math.log(s)<r)break}return i=1/this.beta*this.d*i,this.alpha<1&&(i*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(i)}convertValue(t){return this.dtype==="float32"?t:Math.round(t)}},Xl=class{constructor(t=0,e=1,r,n){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=t,this.range=e-t,this.dtype=r,n==null&&(n=Math.random()),typeof n=="number"&&(n=n.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${t} - ${e} <= 1 and dtype is not float`);this.random=jl.alea(n)}convertValue(t){return this.canReturnFloat()?t:Math.round(t)}nextValue(){return this.convertValue(this.min+this.range*this.random())}};function wO(o,t,e=1,r="float32",n){if(Xt(o),e==null&&(e=1),r==null&&(r="float32"),r!=="float32"&&r!=="int32")throw new Error(`Unsupported data type ${r}`);let s=new ql(t,e,r,n),i=nt(o,r);for(let a=0;a<i.values.length;a++)i.values[a]=s.nextValue();return i.toTensor()}var SO=I({randomGamma_:wO});function vO(o,t=0,e=1,r,n){if(Xt(o),r!=null&&r==="bool")throw new Error(`Unsupported data type ${r}`);let s=new da(t,e,r,!1,n),i=nt(o,r);for(let a=0;a<i.values.length;a++)i.values[a]=s.nextValue();return i.toTensor()}var wg=I({randomNormal_:vO});function IO(o,t,e){if(t!=null&&t==="bool")throw new Error(`Unsupported data type ${t}`);return wg(o,0,1,t,e)}var kO=I({randomStandardNormal_:IO});function $O(o,t=0,e=1,r="float32",n){Xt(o);let s=nt(o,r),i=new Xl(t,e,null,n);for(let a=0;a<s.values.length;a++)s.values[a]=i.nextValue();return s.toTensor()}var Fc=I({randomUniform_:$O});function TO(o,t,e,r){return Fc(o,t,e,"int32",r)}var NO=I({randomUniformInt_:TO});function fa(o,t,e=1,r="float32"){if(e===0)throw new Error("Cannot have a step of zero");let n={start:o,stop:t,step:e,dtype:r};return $.runKernel(Ws,{},n)}function EO(o){let e={input:S(o,"input","real")};return $.runKernel(Us,e)}var vi=I({real_:EO});function RO(o){let e={x:S(o,"x","reciprocal")};return $.runKernel(Gr,e)}var DO=I({reciprocal_:RO});function AO(o){let e={x:S(o,"x","relu")};return $.runKernel(Hr,e)}var ha=I({relu_:AO});function FO(o){let e={x:S(o,"x","relu6")};return $.runKernel(Kr,e)}var Sg=I({relu6_:FO});function PO(o,t){let r={x:S(o,"x","reverse")},n={dims:t};return $.runKernel(qs,r,n)}var bo=I({reverse_:PO});function _O(o){let t=S(o,"x","reverse");return T(t.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${t.rank}.`),bo(t,0)}var OO=I({reverse1d_:_O});function MO(o,t){let e=S(o,"x","reverse");return T(e.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${e.rank}.`),bo(e,t)}var LO=I({reverse2d_:MO});function BO(o,t){let e=S(o,"x","reverse");return T(e.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${e.rank}.`),bo(e,t)}var zO=I({reverse3d_:BO});function VO(o,t){let e=S(o,"x","reverse");return T(e.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${e.rank}.`),bo(e,t)}var WO=I({reverse4d_:VO});function UO(o){let e={x:S(o,"x","round")};return $.runKernel(qr,e)}var vg=I({round_:UO});function GO(o){let e={x:S(o,"x","rsqrt","float32")};return $.runKernel(Xr,e)}var HO=I({rsqrt_:GO});function KO(o){let e={x:S(o,"x","selu")};return $.runKernel(jr,e)}var qO=I({selu_:KO});function XO(o,t,e,r,n,s=[1,1],i="NHWC"){let a=S(o,"x","separableConv2d"),u=S(t,"depthwiseFilter","separableConv2d"),c=S(e,"pointwiseFilter","separableConv2d"),l=a,p=!1;if(a.rank===3&&(p=!0,l=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");T(l.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${l.rank}.`),T(u.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${u.rank}.`),T(c.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${u.rank}.`),T(c.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${c.shape[0]}.`),T(c.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${c.shape[1]}.`);let m=u.shape[2],d=u.shape[3];T(c.shape[2]===m*d,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${m*d}, but got ${c.shape[2]}.`);let f=Dc(l,u,r,n,i,s),g=ua(f,c,1,"valid",i);return p?V(g,[g.shape[1],g.shape[2],g.shape[3]]):g}var jO=I({separableConv2d_:XO});async function YO(o,t){let e=S(o,"x","setdiff1d"),r=S(t,"y","setdiff1d");T(e.dtype===r.dtype,()=>`x and y should have the same dtype, but got x (${e.dtype}) and y (${r.dtype}).`),T(e.rank===1,()=>`x should be 1D tensor, but got x (${e.shape}).`),T(r.rank===1,()=>`y should be 1D tensor, but got y (${r.shape}).`);let n=await e.data(),s=await r.data(),i=new Set(s),a=0;for(let l=0;l<n.length;l++)i.has(n[l])||a++;let u=new Dt([a],e.dtype),c=new Dt([a],"int32");for(let l=0,p=0;l<n.length;l++)i.has(n[l])||(u.values[p]=n[l],c.values[p]=l,p++);return[u.toTensor(),c.toTensor()]}var QO=YO;function ZO(o){let e={x:S(o,"x","sign")};return $.runKernel(Qr,e)}var JO=I({sign_:ZO});function tM(o){let e={x:S(o,"x","sin","float32")};return $.runKernel("Sin",e)}var eM=I({sin_:tM});function oM(o){let e={x:S(o,"x","sinh")};return $.runKernel(Yr,e)}var rM=I({sinh_:oM});function nM(o,t,e){let r=S(o,"x","slice1d");return T(r.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${r.rank} tensor`),_t(r,[t],[e])}var sM=I({slice1d_:nM});function iM(o,t,e){let r=S(o,"x","slice2d");return T(r.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${r.rank} tensor`),_t(r,t,e)}var aM=I({slice2d_:iM});function uM(o,t,e){let r=S(o,"x","slice3d");return T(r.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${r.rank} tensor`),_t(r,t,e)}var cM=I({slice3d_:uM});function lM(o,t,e){let r=S(o,"x","slice4d");return T(r.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${r.rank} tensor`),_t(r,t,e)}var pM=I({slice4d_:lM});function mM(o,t=-1){let e=S(o,"logits","softmax","float32");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${e.rank} and dim was ${t}`);let r={logits:e},n={dim:t};return $.runKernel(oi,r,n)}var dM=I({softmax_:mM});function fM(o){T(o.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${o.dtype}.`);let t={input:o};return $.runKernel("FFT",t)}var Pc=I({fft_:fM});function hM(o){T(o.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${o.dtype}.`);let t={input:o};return $.runKernel(ws,t)}var Fu=I({ifft_:hM});function gM(o){let t=o.shape[o.shape.length-1],e=o.size/t,r;if(t<=2){let n=V(o,[e,t]);r=Fu(n)}else{let n=[e,2*(t-1)],s=V(vi(o),[e,t]),i=V(pa(o),[e,t]),a=bo(_t(s,[0,1],[e,t-2]),1),u=Q(bo(_t(i,[0,1],[e,t-2]),1),wt(-1)),c=pe([s,a],1),l=pe([i,u],1),p=V(Ye(c,l),[n[0],n[1]]);r=Fu(p)}if(r=vi(r),o.rank===3&&o.shape[0]!==0){let n=r,s=o.shape[0];r=V(r,[s,r.shape[0]/s,r.shape[1]]),n.dispose()}return r}var Ig=I({irfft_:gM});function xM(o,t,e=0){let n={x:S(o,"x","split")},s={numOrSizeSplits:t,axis:e};return $.runKernel(ei,n,s)}var Ii=I({split_:xM});function CM(o,t){T(o.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${o.dtype}`);let e=o.shape[o.shape.length-1],r=o.size/e,n;if(t!=null&&t<e){let f=o.shape.map(g=>0),h=o.shape.map(g=>g);h[o.shape.length-1]=t,n=_t(o,f,h),e=t}else if(t!=null&&t>e){let f=o.shape.map(h=>h);f[o.shape.length-1]=t-e,n=pe([o,uo(f)],o.shape.length-1),e=t}else n=o;let s=xe(n),i=V(Ye(n,s),[r,e]),a=Pc(i),u=Math.floor(e/2)+1,c=vi(a),l=pa(a),p=Ii(c,[u,e-u],c.shape.length-1),m=Ii(l,[u,e-u],l.shape.length-1),d=n.shape.slice();return d[n.shape.length-1]=u,V(Ye(p[0],m[0]),d)}var _c=I({rfft_:CM});function bM(o,t){let e=S(o,"a","squaredDifference"),r=S(t,"b","squaredDifference");[e,r]=yt(e,r),Ft(e.shape,r.shape);let n={a:e,b:r},s={};return $.runKernel(en,n,s)}var kg=I({squaredDifference_:bM});function yM(o,t){let e=S(o,"x","squeeze","string_or_numeric");return V(e,oh(e.shape,t).newShape)}var Oc=I({squeeze_:yM});function wM(o,t=0){let e=ln(o,"tensors","stack","string_or_numeric");T(e.length>=1,()=>"Pass at least one tensor to tf.stack"),e.length>0&&T(t<=e[0].rank,()=>"Axis must be <= rank of the tensor");let r=e,n={axis:t};return $.runKernel(Ms,r,n)}var ki=I({stack_:wM});function SM(o,t=0){let r={x:S(o,"x","step")},n={alpha:t};return $.runKernel(rn,r,n)}var $g=I({step_:SM});function vM(o,t,e,r,n=0,s=0,i=0,a=0,u=0){let l={x:S(o,"x","stridedSlice","string_or_numeric")},p={begin:t,end:e,strides:r,beginMask:n,endMask:s,ellipsisMask:i,newAxisMask:a,shrinkAxisMask:u};return $.runKernel(ii,l,p)}var IM=I({stridedSlice_:vM});function kM(o){let e={x:S(o,"x","tan","float32")};return $.runKernel("Tan",e)}var $M=I({tan_:kM});function Te(o,t){ao(o);let e=ve(o,t);if(e.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Le(o,null,e,t)}function ga(o,t,e){if(ao(o),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");let r=ve(o,e);if(r.length!==2&&r.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Le(o,t,r,e)}function Tg(o,t,e){if(ao(o),t!=null&&t.length!==3)throw new Error("tensor3d() requires shape to have three numbers");let r=ve(o,e);if(r.length!==3&&r.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return Le(o,t,r,e)}function TM(o,t,e){if(ao(o),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");let r=ve(o,e);if(r.length!==4&&r.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Le(o,t,r,e)}function NM(o,t,e){if(ao(o),t!=null&&t.length!==5)throw new Error("tensor5d() requires shape to have five numbers");let r=ve(o,e);if(r.length!==5&&r.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Le(o,t,r,e)}function EM(o,t,e){if(ao(o),t!=null&&t.length!==6)throw new Error("tensor6d() requires shape to have six numbers");let r=ve(o,e);if(r.length!==6&&r.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return t=t||r,Le(o,t,r,e)}var Yl={};Ae(Yl,{calculateShapes:()=>uy,validateInput:()=>Pu,validateUpdateShape:()=>Ng});function Ng(o,t,e){let r=t.rank>1?t.shape[t.rank-1]:1,n=t.rank>1?t.rank-1:1,s=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${e.shape}, indices.shape: ${t.shape}, shape: ${o}, sliceDim: ${r}, and batchDim: ${n}.`;if(e.rank<n)throw new Error(s+` update.rank < ${n}. `);if(o.length<r+(e.rank-n))throw new Error(s+` Output shape length < ${r+(e.rank-n)}`);if(e.rank!==n+o.length-r)throw new Error(s+` update.rank != ${n+o.length-r}`);for(let i=0;i<n;++i)if(e.shape[i]!==t.shape[i])throw new Error(s+` updates.shape[${i}] (${e.shape[i]}) != indices.shape[${i}] (${t.shape[i]}).`);for(let i=0;i<e.rank-n;++i)if(e.shape[i+n]!==o[i+r])throw new Error(s+` updates.shape[${i+n}] (${e.shape[i+n]}) != shape[${i+n}] (${o[i+n]})`)}function Pu(o,t,e){if(t.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(o.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${o.rank}.`);if(t.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(e.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${e}`);if(e.length===0){if(t.size===0)throw new Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(o.size===0)throw new Error(`Updates specified for empty output. updates shape: ${o.shape}`)}Ng(e,t,o)}function uy(o,t,e){let r=t.shape.length,n=r>1?t.shape[r-1]:1,s=e.length,i=1;for(let p=n;p<s;++p)i*=e[p];let a=n<1?1:n,u=St(t.shape)/a,c=[...Uo(e.slice(0,n)),1],l=St(e);return{sliceRank:n,numUpdates:u,sliceSize:i,strides:c,outputSize:l}}function RM(o,t,e){let r=S(o,"tensor","tensorScatterupdate"),n=S(t,"indices","tensorScatterupdate","int32"),s=S(e,"updates","tensorScatterupdate");if(Pu(s,n,r.shape),r.dtype!==s.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${r.dtype} and ${s.dtype}.`);let i={tensor:r,indices:n,updates:s},a={};return $.runKernel(js,i,a)}var DM=I({tensorScatterUpdate_:RM});function AM(o,t=1,e=!0){let r=S(o,"x","topk");if(r.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");let n=r.shape[r.shape.length-1];if(t<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>n)throw new Error(`'k' passed to topk() must be <= the last dimension (${n}) but got ${t}`);let s={x:r},i={k:t,sorted:e},[a,u]=$.runKernel(li,s,i);return{values:a,indices:u}}var FM=I({topk_:AM});function PM(o,t=0,e=1,r,n){if(Xt(o),r!=null&&r==="bool")throw new Error("Unsupported data type $ { dtype }");let s=new da(t,e,r,!0,n),i=nt(o,r);for(let a=0;a<i.values.length;a++)i.values[a]=s.nextValue();return i.toTensor()}var _M=I({truncatedNormal_:PM});function OM(o,t=0){let e=S(o,"x","unique","string_or_numeric");T(e.rank>0,()=>"The input tensor must be at least 1D");let r={x:e},n={axis:t},[s,i]=$.runKernel(hu,r,n);return{values:s,indices:i}}var MM=I({unique_:OM});function LM(o,t,e){let r=S(o,"x","unsortedSegmentSum"),n=S(t,"segmentIds","unsortedSegmentSum","int32");T(dr(e),()=>"numSegments must be of dtype int");let s={x:r,segmentIds:n},i={numSegments:e};return $.runKernel(di,s,i)}var BM=I({unsortedSegmentSum_:LM});function zM(o,t=0){let e=S(o,"x","unstack","string_or_numeric");T(t>=-e.shape.length&&t<e.shape.length,()=>`Axis = ${t} is not in [-${e.shape.length}, ${e.shape.length})`);let r={value:e},n={axis:t};return $.runKernel(mi,r,n)}var Mc=I({unstack_:zM});function VM(o,t){return Gl(o,t,"right")}function WM(o,t=!0,e,r){return $.makeVariable(o,t,e,r)}function Ql(o,t){let e=[];for(let s=0;s<t.length;s++)t[s]&&e.push(s);let r=nt(o,"int32"),n=nt([e.length,o.length],"int32");for(let s=0;s<e.length;s++){let i=r.indexToLoc(e[s]),a=s*o.length;n.values.set(i,a)}return n.toTensor()}async function UM(o){let t=S(o,"condition","whereAsync","bool"),e=await t.data(),r=Ql(t.shape,e);return o!==t&&t.dispose(),r}var Eg=UM;async function GM(o,t,e){let r=S(o,"tensor","boolMask"),n=S(t,"mask","boolMask","bool"),s=e??0,i=n.rank,a=r.shape;T(i>0,()=>"mask cannot be scalar"),Gt(a.slice(s,s+i),n.shape,"mask's shape must match the first K dimensions of tensor's shape,");let u=1;for(let h=s;h<s+i;h++)u*=a[h];let c=a.slice(0,s).concat([u],a.slice(s+i)),l=V(r,c),p=V(n,[-1]),m=await Eg(p),d=Oc(m,[1]),f=Qh(l,d,s);return o!==r&&r.dispose(),t!==n&&n.dispose(),d.dispose(),l.dispose(),p.dispose(),m.dispose(),f}var Uht=GM;function HM(o,t,e){let r=S(o,"x","transpose");if(t==null&&(t=r.shape.map((i,a)=>a).reverse()),T(r.rank===t.length,()=>`Error in transpose: rank of input ${r.rank} must match length of perm ${t}.`),t.forEach(i=>{T(i>=0&&i<r.rank,()=>`All entries in 'perm' must be between 0 and ${r.rank-1} but got ${t}`)}),r.rank<=1)return r.clone();let n={x:r},s={perm:t};return r.dtype==="complex64"?Bt(()=>{let i=vi(r),a=pa(r);return i=$.runKernel(Xo,{x:i},s),a=$.runKernel(Xo,{x:a},s),e&&(a=Pe(a)),Ye(i,a)}):$.runKernel(Xo,n,s)}var Lc=I({transpose_:HM});function KM(o,t,e,r,n=!0){let s=S(o,"v","movingAverage"),i=S(t,"x","movingAverage"),a=S(e,"decay","movingAverage");Ih(s,i),T(Oe(s.shape,i.shape),()=>"Shape mismatch in v and x");let u=wt(1),c=ht(u,a),l=Q(ht(i,s),c);if(n){T(r!=null,()=>"When using zeroDebias: true, step is required.");let p=S(r,"step","movingAverage");l=Et(l,ht(u,wi(a,p)))}return pt(s,l)}var lgt=I({movingAverage_:KM});function qM(o,t,e){Xt(e);let r=S(o,"indices","scatterND","int32"),n=S(t,"updates","scatterND");Pu(n,r,e);let s={indices:r,updates:n},i={shape:e};return $.runKernel(Xs,s,i)}var xgt=I({scatterND_:qM});function cy(o,t,e,r){if(o.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${o.dtype}.`);if(o.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${o.shape}.`);let n=o.rank>0?o.shape[0]:1,s=o.rank>1?o.shape[1]:1;if(e.length!==s)throw new Error(`outputShape has incorrect number of elements:, ${e.length}, should be: ${s}.`);let i=t.size;if(!(t.rank===0||t.rank===1&&i===n))throw new Error(`sparseValues has incorrect shape ${t.shape}, should be [] or [${n}]`);if(t.dtype!==r.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}function jM(o,t,e,r=0){Xt(e);let n=S(o,"sparseIndices","sparseToDense","int32"),s=S(t,"sparseValues","sparseToDense","string_or_numeric"),i=S(r,"defaultValue","sparseToDense",s.dtype);cy(n,s,e,i);let a={sparseIndices:n,sparseValues:s,defaultValue:i},u={outputShape:e};return $.runKernel(si,a,u)}var Igt=I({sparseToDense_:jM});function YM(o,t){let e=S(t,"indices","gatherND","int32"),n={params:S(o,"x","gatherND","string_or_numeric"),indices:e};return $.runKernel(ys,n)}var Rgt=I({gatherND_:YM});function ly(o,t){if(t==null)return o.shape.slice();if(Oe(o.shape,t))return t;if(o.shape.length===t.length){let e=[];for(let r=0;r<o.shape.length;r++)t[r]==null&&o.shape[r]!=null?e.push(o.shape[r]):e.push(t[r]);return e}return t}function QM(o,t,e,r){let n=S(o,"x","dropout");if(T(n.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${n.dtype} tensor instead.`),T(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),t===0)return o instanceof Ut?n.clone():n;let s=ly(n,e),i=1-t,a=Et(Yh(pt(Fc(s,0,1,"float32",r),i)),i);return Q(n,a)}var Wgt=I({dropout_:QM});function py(o){return Math.floor(Math.pow(2,Math.ceil(Math.log(o)/Math.log(2))))}function Zl(o,t,e){let r=1-o%2,n=new Float32Array(o);for(let s=0;s<o;++s){let i=2*Math.PI*s/(o+r-1);n[s]=t-e*Math.cos(i)}return Te(n,"float32")}async function ZM(o,t,e=1){let r=S(o,"predictions","inTopK"),n=S(t,"targets","inTopK");T(r.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${r.rank}`),T(r.rank-1===n.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${r.rank} and targets rank ${n.rank}`),Gt(r.shape.slice(0,r.shape.length-1),n.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");let s=r.shape[r.shape.length-1];T(e>0&&e<=s,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${s}), but got ${e}`);let i=await r.data(),a=await n.data(),[u,c]=[i.length/s,s],l=rh("bool",u);for(let p=0;p<u;p++){let m=p*c,d=i.subarray(m,m+c),f=[];for(let h=0;h<d.length;h++)f.push({value:d[h],index:h});f.sort((h,g)=>g.value-h.value),l[p]=0;for(let h=0;h<e;h++)if(f[h].index===a[p]){l[p]=1;break}}return o!==r&&r.dispose(),t!==n&&n.dispose(),pn(l,n.shape,"bool")}var jgt=ZM;var Cy={};Ae(Cy,{conv2d:()=>dy,depthwiseConv2d:()=>gy,matMul:()=>xy});function JM(o,t,e,r,n,s="NHWC",i){let a=o;o.rank===3&&(a=V(o,[1,o.shape[0],o.shape[1],o.shape[2]]));let u=t;u.rank===3&&(u=V(t,[1,t.shape[0],t.shape[1],t.shape[2]])),T(a.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${a.shape}.`),T(u.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${u.shape}.`),T(e.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${e}.`);let c=s==="NHWC"?a.shape[3]:a.shape[1],l=s==="NHWC"?u.shape[3]:u.shape[1];T(c===e[2],()=>`Error in conv2dDerFilter: depth of input ${c}) must match input depth in filter (${e[2]}.`),T(l===e[3],()=>`Error in conv2dDerFilter: depth of dy (${l}) must match output depth for filter (${e[3]}).`),le("conv2dDerFilter",n,i);let p={x:a,dy:u},m={strides:r,pad:n,dataFormat:s,dimRoundingMode:i,filterShape:e};return $.runKernel(Yn,p,m)}var my=I({conv2DBackpropFilter_:JM});function xa(o,t,e){if(e==null||e==="linear")return o;if(e==="relu")return Q(o,$g(t));throw new Error(`Cannot compute gradient for fused activation ${e}.`)}function Ca(o,t){let e=t,r=Bl(o.shape,t.shape);return r.length>0&&(e=Ot(e,r)),V(e,o.shape)}function ba(o,t,e,r){if(t==="linear")return o;if(t==="relu")return ha(o);if(t==="elu")return qh(o);if(t==="relu6")return Sg(o);if(t==="prelu")return lg(o,e);if(t==="leakyrelu")return Jh(o,r);if(t==="sigmoid")return fn(o);throw new Error(`Unknown fused activation ${t}.`)}var ya=(o,t)=>!(o>0)||t==="linear";function tL({x:o,filter:t,strides:e,pad:r,dataFormat:n="NHWC",dilations:s=[1,1],dimRoundingMode:i,bias:a,activation:u="linear",preluActivationWeights:c,leakyreluAlpha:l}){if(u=u||"linear",ya($.state.gradientDepth,u)===!1){T(n==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${n} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let N=ua(o,t,e,r,n,s,i);return a!=null&&(N=pt(N,a)),ba(N,u,c,l)}let p=S(o,"x","conv2d","float32"),m=S(t,"filter","conv2d","float32"),d=p,f=!1;p.rank===3&&(f=!0,d=V(p,[1,p.shape[0],p.shape[1],p.shape[2]])),T(d.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${d.rank}.`),T(m.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${m.rank}.`),le("fused conv2d",r,i);let h=n==="NHWC"?d.shape[3]:d.shape[1];T(m.shape[2]===h,()=>`Error in conv2d: depth of input (${h}) must match input depth for filter ${m.shape[2]}.`),T(Fe(e,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`);let g=sa(d.shape,m.shape,e,s,r,i),x;a!=null&&(x=S(a,"bias","fused conv2d"),[x]=yt(x,p),n==="NHWC"?Ft(g.outShape,x.shape):(T(x.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${x.shape.length}.`),T(x.shape.length===0||x.shape[0]===g.outChannels||x.shape[0]===1,()=>`Error in fused conv2d: bias shape (${x.shape}) is not compatible with the number of output channels (${g.outChannels})`)));let b;if(c!=null){let N=c.shape;if(T(N.length<=1||N.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${N.length}.`),N.length===1)T(N[0]===1||N[0]===g.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${N}) is not compatible with the number of output channels (${g.outChannels}).`);else if(N.length===3)try{Ft(N,g.outShape)}catch{let R=`Error in fused conv2d: PReLU activation weights (${N}) is not compatible with the output shape of the conv2d (${g.outShape}).`;throw Error(R)}b=S(c,"prelu weights","fused conv2d")}let w=(N,E)=>{T(n==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${n} but only NHWC is currently supported.`);let[R,A,F,P]=E,_=xa(N,F,u);T(na(s),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${s}'`);let O=Ll(A.shape,_,R,e,r),M=my(A,_,R.shape,e,r),L=[O,M];if(P!=null){let W=Ca(P,_);L.push(W)}return L},v={x:d,filter:m,bias:x,preluActivationWeights:b},k={strides:e,pad:r,dataFormat:n,dilations:s,dimRoundingMode:i,activation:u,leakyreluAlpha:l};return a==null?ze((E,R,A)=>{let F=$.runKernel(sn,v,k);return A([R,E,F]),f&&(F=V(F,[F.shape[1],F.shape[2],F.shape[3]])),{value:F,gradFunc:w}})(d,m):ze((E,R,A,F)=>{let P=$.runKernel(sn,v,k);return F([R,E,P,A]),f&&(P=V(P,[P.shape[1],P.shape[2],P.shape[3]])),{value:P,gradFunc:w}})(d,m,x)}var dy=I({fusedConv2d_:tL});function eL(o,t,e,r,n,s=[1,1],i){let a=o;o.rank===3&&(a=V(o,[1,o.shape[0],o.shape[1],o.shape[2]]));let u=t;u.rank===3&&(u=V(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let c={x:a,dy:u},l={strides:r,pad:n,dimRoundingMode:i,dilations:s,filterShape:e};return $.runKernel(as,c,l)}var fy=I({depthwiseConv2dNativeBackpropFilter_:eL});function oL(o,t,e,r,n,s=[1,1],i){let a=t,u=!1;t.rank===3&&(u=!0,a=V(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let c={dy:a,filter:e},l={strides:r,pad:n,dimRoundingMode:i,dilations:s,inputShape:o},p=$.runKernel(us,c,l);return u?V(p,[p.shape[1],p.shape[2],p.shape[3]]):p}var hy=I({depthwiseConv2dNativeBackpropInput_:oL});function rL({x:o,filter:t,strides:e,pad:r,dataFormat:n="NHWC",dilations:s=[1,1],dimRoundingMode:i,bias:a,activation:u="linear",preluActivationWeights:c,leakyreluAlpha:l}){if(ya($.state.gradientDepth,u)===!1){let k=Dc(o,t,e,r,n,s,i);return a!=null&&(k=pt(k,a)),ba(k,u,c,l)}let p=S(o,"x","depthwiseConv2d","float32"),m=S(t,"filter","depthwiseConv2d","float32"),d=p,f=!1;p.rank===3&&(f=!0,d=V(p,[1,p.shape[0],p.shape[1],p.shape[2]])),T(d.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${d.rank}.`),T(m.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${m.rank}.`),T(d.shape[3]===m.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${d.shape[3]}) must match the inChannels dimension in filter ${m.shape[2]}.`),s==null&&(s=[1,1]),T(Fe(e,s),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`),le("fused depthwiseConv2d",r,i);let h=sa(d.shape,m.shape,e,s,r,i,!0),g;a!=null&&(g=S(a,"bias","fused conv2d"),[g]=yt(g,p),Ft(h.outShape,g.shape));let x;c!=null&&(x=S(c,"prelu weights","fused depthwiseConv2d"));let b=(k,N)=>{T(na(s),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${s}'`);let[E,R,A,F]=N,P=xa(k,A,u),_=hy(R.shape,P,E,e,r,s,i),O=fy(R,P,E.shape,e,r,s,i);if(F!=null){let M=Ca(g,P);return[_,O,M]}return[_,O]},w={x:d,filter:m,bias:g,preluActivationWeights:x},v={strides:e,pad:r,dataFormat:n,dilations:s,dimRoundingMode:i,activation:u,leakyreluAlpha:l};return a==null?ze((N,E,R)=>{let A=$.runKernel(an,w,v);return R([E,N,A]),f&&(A=V(A,[A.shape[1],A.shape[2],A.shape[3]])),{value:A,gradFunc:b}})(d,m):ze((N,E,R,A)=>{let F=$.runKernel(an,w,v);return A([E,N,F,R]),f&&(F=V(F,[F.shape[1],F.shape[2],F.shape[3]])),{value:F,gradFunc:b}})(d,m,g)}var gy=I({fusedDepthwiseConv2d_:rL});function nL({a:o,b:t,transposeA:e=!1,transposeB:r=!1,bias:n,activation:s="linear",preluActivationWeights:i,leakyreluAlpha:a=.2}){if(ya($.state.gradientDepth,s)===!1){let P=At(o,t,e,r);return n!=null&&(P=pt(P,n)),ba(P,s,i,a)}let u=S(o,"a","fused matMul"),c=S(t,"b","fused matMul");[u,c]=yt(u,c);let l=e?u.shape[u.rank-2]:u.shape[u.rank-1],p=r?c.shape[c.rank-1]:c.shape[c.rank-2],m=e?u.shape[u.rank-1]:u.shape[u.rank-2],d=r?c.shape[c.rank-2]:c.shape[c.rank-1],f=u.shape.slice(0,-2),h=c.shape.slice(0,-2),g=St(f),x=St(h);T(l===p,()=>`Error in fused matMul: inner shapes (${l}) and (${p}) of Tensors with shapes ${u.shape} and ${c.shape} and transposeA=${e} and transposeB=${r} must match.`);let w=Ft(u.shape.slice(0,-2),c.shape.slice(0,-2)).concat([m,d]),v=e?V(u,[g,l,m]):V(u,[g,m,l]),k=r?V(c,[x,d,p]):V(c,[x,p,d]),N;n!=null&&(N=S(n,"bias","fused matMul"),[N]=yt(N,u),Ft(w,N.shape));let E;i!=null&&(E=S(i,"prelu weights","fused matMul"));let R=(P,_)=>{let[O,M,L,W]=_,X=xa(V(P,L.shape),L,s),U,q;if(!e&&!r?(U=At(X,M,!1,!0),q=At(O,X,!0,!1)):!e&&r?(U=At(X,M,!1,!1),q=At(X,O,!0,!1)):e&&!r?(U=At(M,X,!1,!0),q=At(O,X,!1,!1)):(U=At(M,X,!0,!0),q=At(X,O,!0,!0)),n!=null){let Y=Ca(W,X);return[U,q,Y]}else return[U,q]},A={a:v,b:k,bias:N,preluActivationWeights:E},F={transposeA:e,transposeB:r,activation:s,leakyreluAlpha:a};return n==null?ze((_,O,M)=>{let L=$.runKernel(nn,A,F);return M([_,O,L]),{value:V(L,w),gradFunc:R}})(v,k):ze((_,O,M,L)=>{let W=$.runKernel(nn,A,F);return L([_,O,W,M]),{value:V(W,w),gradFunc:R}})(v,k,N)}var xy=I({fusedMatMul_:nL});function sL(o){return Zl(o,.54,.46)}var by=I({hammingWindow_:sL});function iL(o){return Zl(o,.5,.5)}var Jl=I({hannWindow_:iL});function aL(o,t,e,r=!1,n=0){let s=0,i=[];for(;s+t<=o.size;)i.push(_t(o,s,t)),s+=e;if(r)for(;s<o.size;){let a=s+t-o.size,u=pe([_t(o,s,t-a),hn([a],n)]);i.push(u),s+=e}return i.length===0?ga([],[0,t]):V(pe(i),[i.length,t])}var tp=I({frame_:aL});function uL(o,t,e,r,n=Jl){r==null&&(r=py(t));let s=tp(o,t,e),i=Q(s,n(t));return _c(i,r)}var yy=I({stft_:uL});function cL(o,t,e,r,n="bilinear",s=0){let i=S(o,"image","cropAndResize"),a=S(t,"boxes","cropAndResize","float32"),u=S(e,"boxInd","cropAndResize","int32"),c=a.shape[0];T(i.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${i.rank}.`),T(a.rank===2&&a.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${c},4] but had shape ${a.shape}.`),T(u.rank===1&&u.shape[0]===c,()=>`Error in cropAndResize: boxInd must be have size [${c}] but had shape ${a.shape}.`),T(r.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),T(r[0]>=1&&r[1]>=1,()=>`cropSize must be atleast [1,1], but was ${r}`),T(n==="bilinear"||n==="nearest",()=>`method must be bilinear or nearest, but was ${n}`);let l={image:i,boxes:a,boxInd:u},p={method:n,extrapolationValue:s,cropSize:r};return $.runKernel(rs,l,p)}var wy=I({cropAndResize_:cL});function lL(o){let t=S(o,"image","flipLeftRight","float32");T(t.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);let e={image:t};return $.runKernel(xs,e,{})}var Sy=I({flipLeftRight_:lL});function pL(o){let t=S(o,"image","grayscaleToRGB"),e=t.rank-1,r=t.shape[e];T(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),T(r===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${r}.`);let n=new Array(t.rank);return n.fill(1,0,e),n[e]=3,la(t,n)}var vy=I({grayscaleToRGB_:pL});function mL(o){let t=S(o,"image","RGBToGrayscale"),e=t.rank-1,r=t.shape[e];T(t.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${t.rank}.`),T(r===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${r}.`);let n=t.dtype,s=$t(t,"float32"),i=Te([.2989,.587,.114]),a;switch(t.rank){case 2:a=ca("ij,j->i",s,i);break;case 3:a=ca("ijk,k->ij",s,i);break;case 4:a=ca("ijkl,l->ijk",s,i);break;case 5:a=ca("ijklm,m->ijkl",s,i);break;case 6:a=ca("ijklmn,n->ijklm",s,i);break;default:throw new Error("Not a valid tensor rank.")}return a=er(a,-1),$t(a,n)}var Iy=I({rgbToGrayscale_:mL});function dL(o,t,e=0,r=.5){let n=S(o,"image","rotateWithOffset","float32");T(n.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${n.rank}.`);let s={image:n},i={radians:t,fillValue:e,center:r};return $.runKernel(hi,s,i)}var ky=I({rotateWithOffset_:dL});function yo(o,t,e,r,n,s){r==null&&(r=.5),n==null&&(n=Number.NEGATIVE_INFINITY),s==null&&(s=0);let i=o.shape[0];return e=Math.min(e,i),T(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),T(o.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${o.rank}'`),T(o.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${o.shape[1]}`),T(t.rank===1,()=>"scores must be a 1D tensor"),T(t.shape[0]===i,()=>`scores has incompatible shape with boxes. Expected ${i}, but was ${t.shape[0]}`),T(0<=s&&s<=1,()=>`softNmsSigma must be in [0, 1], but was '${s}'`),{maxOutputSize:e,iouThreshold:r,scoreThreshold:n,softNmsSigma:s}}function fL(o,t,e,r=.5,n=Number.NEGATIVE_INFINITY){let s=S(o,"boxes","nonMaxSuppression","float32"),i=S(t,"scores","nonMaxSuppression","float32"),a=yo(s,i,e,r,n);e=a.maxOutputSize,r=a.iouThreshold,n=a.scoreThreshold;let u={maxOutputSize:e,iouThreshold:r,scoreThreshold:n};return $.runKernel(Fs,{boxes:s,scores:i},u)}var $y=I({nonMaxSuppression_:fL});function Ty(o,t,e){let r=hL(o,t,e),n=r<0?-(r+1):r;o.splice(n,0,t)}function hL(o,t,e){return xL(o,t,e||gL)}function gL(o,t){return o>t?1:o<t?-1:0}function xL(o,t,e){let r=0,n=o.length,s=0,i=!1;for(;r<n;){s=r+(n-r>>>1);let a=e(t,o[s]);a>0?r=s+1:(n=s,i=!a)}return i?r:-r-1}function ep(o,t,e,r,n){return Rg(o,t,e,r,n,0)}function op(o,t,e,r,n,s){return Rg(o,t,e,r,n,0,!1,s,!0)}function rp(o,t,e,r,n,s){return Rg(o,t,e,r,n,s,!0)}function Rg(o,t,e,r,n,s,i=!1,a=!1,u=!1){let c=[];for(let g=0;g<t.length;g++)t[g]>n&&c.push({score:t[g],boxIndex:g,suppressBeginIndex:0});c.sort(Ny);let l=s>0?-.5/s:0,p=[],m=[];for(;p.length<e&&c.length>0;){let g=c.pop(),{score:x,boxIndex:b,suppressBeginIndex:w}=g;if(x<n)break;let v=!1;for(let k=p.length-1;k>=w;--k){let N=CL(o,b,p[k]);if(N>=r){v=!0;break}if(g.score=g.score*bL(r,l,N),g.score<=n)break}g.suppressBeginIndex=p.length,v||(g.score===x?(p.push(b),m.push(g.score)):g.score>n&&Ty(c,g,Ny))}let d=p.length,f=e-d;a&&f>0&&(p.push(...new Array(f).fill(0)),m.push(...new Array(f).fill(0)));let h={selectedIndices:p};return i&&(h.selectedScores=m),u&&(h.validOutputs=d),h}function CL(o,t,e){let r=o.subarray(t*4,t*4+4),n=o.subarray(e*4,e*4+4),s=Math.min(r[0],r[2]),i=Math.min(r[1],r[3]),a=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),c=Math.min(n[0],n[2]),l=Math.min(n[1],n[3]),p=Math.max(n[0],n[2]),m=Math.max(n[1],n[3]),d=(a-s)*(u-i),f=(p-c)*(m-l);if(d<=0||f<=0)return 0;let h=Math.max(s,c),g=Math.max(i,l),x=Math.min(a,p),b=Math.min(u,m),w=Math.max(x-h,0)*Math.max(b-g,0);return w/(d+f-w)}function bL(o,t,e){let r=Math.exp(t*e*e);return e<=o?r:0}function Ny(o,t){return o.score-t.score||o.score===t.score&&t.boxIndex-o.boxIndex}async function yL(o,t,e,r=.5,n=Number.NEGATIVE_INFINITY){let s=S(o,"boxes","nonMaxSuppressionAsync"),i=S(t,"scores","nonMaxSuppressionAsync"),a=yo(s,i,e,r,n);e=a.maxOutputSize,r=a.iouThreshold,n=a.scoreThreshold;let u=await Promise.all([s.data(),i.data()]),c=u[0],l=u[1],{selectedIndices:p}=ep(c,l,e,r,n);return s!==o&&s.dispose(),i!==t&&i.dispose(),Te(p,"int32")}var Ey=yL;function wL(o,t,e,r=.5,n=Number.NEGATIVE_INFINITY,s=0){let i=S(o,"boxes","nonMaxSuppression"),a=S(t,"scores","nonMaxSuppression"),u=yo(i,a,e,r,n,s);e=u.maxOutputSize,r=u.iouThreshold,n=u.scoreThreshold,s=u.softNmsSigma;let c={boxes:i,scores:a},l={maxOutputSize:e,iouThreshold:r,scoreThreshold:n,softNmsSigma:s},p=$.runKernel(Ps,c,l);return{selectedIndices:p[0],selectedScores:p[1]}}var Ry=I({nonMaxSuppressionWithScore_:wL});async function SL(o,t,e,r=.5,n=Number.NEGATIVE_INFINITY,s=0){let i=S(o,"boxes","nonMaxSuppressionAsync"),a=S(t,"scores","nonMaxSuppressionAsync"),u=yo(i,a,e,r,n,s);e=u.maxOutputSize,r=u.iouThreshold,n=u.scoreThreshold,s=u.softNmsSigma;let c=await Promise.all([i.data(),a.data()]),l=c[0],p=c[1],{selectedIndices:m,selectedScores:d}=rp(l,p,e,r,n,s);return i!==o&&i.dispose(),a!==t&&a.dispose(),{selectedIndices:Te(m,"int32"),selectedScores:Te(d)}}var Dy=SL;function vL(o,t,e,r=.5,n=Number.NEGATIVE_INFINITY,s=!1){let i=S(o,"boxes","nonMaxSuppression"),a=S(t,"scores","nonMaxSuppression"),u=yo(i,a,e,r,n,null),c=u.maxOutputSize,l=u.iouThreshold,p=u.scoreThreshold,m={boxes:i,scores:a},d={maxOutputSize:c,iouThreshold:l,scoreThreshold:p,padToMaxOutputSize:s},f=$.runKernel(nu,m,d);return{selectedIndices:f[0],validOutputs:f[1]}}var Ay=I({nonMaxSuppressionPadded_:vL});async function IL(o,t,e,r=.5,n=Number.NEGATIVE_INFINITY,s=!1){let i=S(o,"boxes","nonMaxSuppressionAsync"),a=S(t,"scores","nonMaxSuppressionAsync"),u=yo(i,a,e,r,n,null),c=u.maxOutputSize,l=u.iouThreshold,p=u.scoreThreshold,[m,d]=await Promise.all([i.data(),a.data()]),{selectedIndices:f,validOutputs:h}=op(m,d,c,l,p,s);return i!==o&&i.dispose(),a!==t&&a.dispose(),{selectedIndices:Te(f,"int32"),validOutputs:wt(h,"int32")}}var Fy=IL;function kL(o,t,e=!1,r=!1){let n=S(o,"images","resizeBilinear");T(n.rank===3||n.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${n.rank}.`),T(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),T(r===!1||e===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let s=n,i=!1;n.rank===3&&(i=!0,s=V(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=t,a={images:s},u={alignCorners:e,halfPixelCenters:r,size:t},c=$.runKernel(Ks,a,u);return i?V(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var Py=I({resizeBilinear_:kL});function $L(o,t,e=!1,r=!1){let n=S(o,"images","resizeNearestNeighbor");T(n.rank===3||n.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${n.rank}.`),T(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),T(n.dtype==="float32"||n.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),T(r===!1||e===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let s=n,i=!1;n.rank===3&&(i=!0,s=V(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=t,a={images:s},u={alignCorners:e,halfPixelCenters:r,size:t},c=$.runKernel(Hs,a,u);return i?V(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var _y=I({resizeNearestNeighbor_:$L});function TL(o,t="binary",e=!1,r=.5){let n=S(o,"image","threshold"),s=.2989,i=.587,a=.114,u=n.shape[0]*n.shape[1],c=Q(Te([r]),255),l,p,m,d;if(T(n.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${n.rank}.`),T(n.shape[2]===3||n.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${n.shape[2]}.`),T(n.dtype==="int32"||n.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${n.dtype}.`),T(t==="otsu"||t==="binary",()=>`Method must be binary or otsu, but was ${t}`),n.shape[2]===3){[l,p,m]=Ii(n,[1,1,1],-1);let g=Q(l,s),x=Q(p,i),b=Q(m,a);d=pt(pt(g,x),b)}else d=o;if(t==="otsu"){let g=Hh($t(vg(d),"int32"),pn([]),256);c=NL(g,u)}let f=e?Ac(d,c):Eu(d,c);return $t(Q(f,255),"int32")}function NL(o,t){let e=Te([-1]),r=Te([0]),n=Te([0]),s,i,a,u,c,l;for(let p=0;p<o.size-1;p++){s=_t(o,0,p+1),i=_t(o,p+1),c=Et(Ot(s),t),l=Et(Ot(i),t);let m=Ot(Q(s,fa(0,s.size)));a=Et(m,Ot(s));let d=hn(i.shape,s.size),f=pt(fa(0,i.size),d),h=Q(i,f);u=Et(Ot(h),Ot(i));let g=ht(a,u),x=ht(a,u),b=Q(c,l);n=Q(Q(b,g),x);let w=Eu(n,r);r=Co(w,n,r),e=Co(w,Te([p]),e)}return e}var Oy=I({threshold_:TL});function EL(o,t,e="nearest",r="constant",n=0,s){let i=S(o,"image","transform","float32"),a=S(t,"transforms","transform","float32");T(i.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${i.rank}.`),T(a.rank===2&&(a.shape[0]===i.shape[0]||a.shape[0]===1)&&a.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),T(s==null||s.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${s}.`);let u={image:i,transforms:a},c={interpolation:e,fillMode:r,fillValue:n,outputShape:s};return $.runKernel(pi,u,c)}var My=I({transform_:EL});function RL(o,t,e){let r=S(o,"a","bandPart");T(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);let n=r.shape,[s,i]=r.shape.slice(-2),a,u;typeof t=="number"?(T(t%1===0,()=>`bandPart(): numLower must be an integer, got ${t}.`),T(t<=s,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${s}).`),a=S(t<0?s:t,"numLower","bandPart")):(T(t.dtype==="int32",()=>"bandPart(): numLower's dtype must be an int32."),a=Co(Vl(t,0),s,Au(t,s))),typeof e=="number"?(T(e%1===0,()=>`bandPart(): numUpper must be an integer, got ${e}.`),T(e<=i,()=>`bandPart(): numUpper (${e}) must not be greater than the number of columns (${i}).`),u=S(e<0?i:e,"numUpper","bandPart")):(T(e.dtype==="int32",()=>"bandPart(): numUpper's dtype must be an int32."),u=Co(Vl(e,0),i,Au(e,i)));let c=V(fa(0,s,1,"int32"),[-1,1]),l=fa(0,i,1,"int32"),p=ht(c,l),m=Ru(Ac(p,a),Zh(p,Pe(u))),d=uo([s,i],r.dtype);return V(ki(Mc(V(r,[-1,s,i])).map(f=>Co(m,f,d))),n)}var Ly=I({bandPart_:RL});function DL(o){let t;if(Array.isArray(o)){t=!1,T(o!=null&&o.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");let n=o[0].shape[0];for(let s=1;s<o.length;++s)T(o[s].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${o[s].shape[0]} vs. ${n})`)}else t=!0,o=Ii(o,o.shape[0],0).map(n=>Oc(n,[0]));T(o.length<=o[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${o.length}) exceeds number of dimensions (${o[0].shape[0]}).`);let e=[],r=o;for(let n=0;n<o.length;++n)e.push($.tidy(()=>{let s=r[n];if(n>0)for(let i=0;i<n;++i){let a=Q(Ot(Q(e[i],s)),e[i]);s=ht(s,a)}return Et(s,Nu(s,"euclidean"))}));return t?ki(e,0):e}var By=I({gramSchmidt_:DL});function AL(o,t=!1){if(T(o.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${o.rank}`),o.rank===2)return zy(o,t);{let e=o.shape.slice(0,o.shape.length-2).reduce((u,c)=>u*c),r=Mc(V(o,[e,o.shape[o.shape.length-2],o.shape[o.shape.length-1]]),0),n=[],s=[];r.forEach(u=>{let[c,l]=zy(u,t);n.push(c),s.push(l)});let i=V(ki(n,0),o.shape),a=V(ki(s,0),o.shape);return[i,a]}}function zy(o,t=!1){return $.tidy(()=>{T(o.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${o.shape.length}D Tensor.`);let e=o.shape[0],r=o.shape[1],n=jh(e),s=Po(o),i=ga([[1]],[1,1]),a=Po(i),u=e>=r?r:e;for(let c=0;c<u;++c){let l=s,p=a,m=n;[a,s,n]=$.tidy(()=>{let d=_t(s,[c,c],[e-c,1]),f=Nu(d),h=_t(s,[c,c],[1,1]),g=Co(Eu(h,0),ga([[-1]]),ga([[1]])),x=ht(h,Q(g,f)),b=Et(d,x);b.shape[0]===1?a=Po(i):a=pe([i,_t(b,[1,0],[b.shape[0]-1,b.shape[1]])],0);let w=Pe(Et(At(g,x),f)),v=_t(s,[c,0],[e-c,r]),k=Q(w,a),N=Lc(a);if(c===0)s=ht(v,At(k,At(N,v)));else{let A=ht(v,At(k,At(N,v)));s=pe([_t(s,[0,0],[c,r]),A],0)}let E=Lc(k),R=_t(n,[0,c],[e,n.shape[1]-c]);if(c===0)n=ht(R,At(At(R,a),E));else{let A=ht(R,At(At(R,a),E));n=pe([_t(n,[0,0],[e,c]),A],1)}return[a,s,n]}),me([l,p,m])}return!t&&e>r&&(n=_t(n,[0,0],[e,r]),s=_t(s,[0,0],[r,r])),[n,s]})}var Vy=I({qr_:AL});var re;(function(o){o[o.NONE=0]="NONE",o[o.MEAN=1]="MEAN",o[o.SUM=2]="SUM",o[o.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(re||(re={}));function FL(o,t,e=re.SUM_BY_NONZERO_WEIGHTS){let r=S(o,"losses","computeWeightedLoss"),n=null;t!=null&&(n=S(t,"weights","computeWeightedLoss"));let s=n==null?r:Q(r,n);if(e===re.NONE)return s;if(e===re.SUM)return Ot(s);if(e===re.MEAN){if(n==null)return Du(s);{let i=r.size/n.size,a=Et(Ot(s),Ot(n));return i>1?Et(a,wt(i)):a}}if(e===re.SUM_BY_NONZERO_WEIGHTS){if(n==null)return Et(Ot(s),wt(r.size));{let i=Q(n,Cn(r.shape)),a=$t(Ot(ug(i,wt(0))),"float32");return Et(Ot(s),a)}}throw Error(`Unknown reduction: ${e}`)}var Ne=I({computeWeightedLoss_:FL});function PL(o,t,e,r=re.SUM_BY_NONZERO_WEIGHTS){let n=S(o,"labels","absoluteDifference"),s=S(t,"predictions","absoluteDifference"),i=null;e!=null&&(i=S(e,"weights","absoluteDifference")),Gt(n.shape,s.shape,"Error in absoluteDifference: ");let a=ke(ht(n,s));return Ne(a,i,r)}var Wy=I({absoluteDifference_:PL});function _L(o,t,e,r,n=re.SUM_BY_NONZERO_WEIGHTS){let s=S(o,"labels","cosineDistance"),i=S(t,"predictions","cosineDistance"),a=null;r!=null&&(a=S(r,"weights","cosineDistance")),Gt(s.shape,i.shape,"Error in cosineDistance: ");let u=wt(1),c=ht(u,Ot(Q(s,i),e,!0));return Ne(c,a,n)}var Uy=I({cosineDistance_:_L});function OL(o,t,e,r=re.SUM_BY_NONZERO_WEIGHTS){let n=S(o,"labels","hingeLoss"),s=S(t,"predictions","hingeLoss"),i=null;e!=null&&(i=S(e,"weights","hingeLoss")),Gt(n.shape,s.shape,"Error in hingeLoss: ");let a=wt(1);n=ht(Q(wt(2),n),a);let u=ha(ht(a,Q(n,s)));return Ne(u,i,r)}var Gy=I({hingeLoss_:OL});function ML(o,t,e,r=1,n=re.SUM_BY_NONZERO_WEIGHTS){let s=S(o,"labels","huberLoss"),i=S(t,"predictions","huberLoss"),a=null;e!=null&&(a=S(e,"weights","huberLoss")),Gt(s.shape,i.shape,"Error in huberLoss: ");let u=wt(r),c=ke(ht(i,s)),l=Au(c,u),p=ht(c,l),m=pt(Q(wt(.5),$e(l)),Q(u,p));return Ne(m,a,n)}var Hy=I({huberLoss_:ML});function LL(o,t,e,r=1e-7,n=re.SUM_BY_NONZERO_WEIGHTS){let s=S(o,"labels","logLoss"),i=S(t,"predictions","logLoss"),a=null;e!=null&&(a=S(e,"weights","logLoss")),Gt(s.shape,i.shape,"Error in logLoss: ");let u=wt(1),c=wt(r),l=Pe(Q(s,Si(pt(i,c)))),p=Q(ht(u,s),Si(pt(ht(u,i),c))),m=ht(l,p);return Ne(m,a,n)}var Ky=I({logLoss_:LL});function BL(o,t,e,r=re.SUM_BY_NONZERO_WEIGHTS){let n=S(o,"labels","meanSquaredError"),s=S(t,"predictions","meanSquaredError"),i=null;e!=null&&(i=S(e,"weights","meanSquaredError")),Gt(n.shape,s.shape,"Error in meanSquaredError: ");let a=kg(n,s);return Ne(a,i,r)}var qy=I({meanSquaredError_:BL});function zL(o,t){let e=S(o,"labels","sigmoidCrossEntropyWithLogits"),r=S(t,"logits","sigmoidCrossEntropyWithLogits");Gt(e.shape,r.shape,"Error in sigmoidCrossEntropyWithLogits: ");let n=ha(r),s=Q(r,e),i=tg(_o(Pe(ke(r))));return pt(ht(n,s),i)}function VL(o,t,e,r=0,n=re.SUM_BY_NONZERO_WEIGHTS){let s=S(o,"multiClassLabels","sigmoidCrossEntropy"),i=S(t,"logits","sigmoidCrossEntropy"),a=null;if(e!=null&&(a=S(e,"weights","sigmoidCrossEntropy")),Gt(s.shape,i.shape,"Error in sigmoidCrossEntropy: "),r>0){let c=wt(r),l=wt(1),p=wt(.5);s=pt(Q(s,ht(l,c)),Q(p,c))}let u=zL(s,i);return Ne(u,a,n)}var Xy=I({sigmoidCrossEntropy_:VL});function WL(o,t,e=-1){if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was ${e}`);return ze((n,s,i)=>{let u=rg(s,[e],!0),c=ht($t(s,"float32"),u);i([n,c]);let l=Pe(Q(c,n));return{value:Ot(l,[e]),gradFunc:(d,f)=>{let[h,g]=f,x=gn(d.shape,[e]);return[Q(V(d,x),ht($t(h,"float32"),_o(g))),Q(V(d,x),ht(_o(g),$t(h,"float32")))]}}})(o,t)}function UL(o,t,e,r=0,n=re.SUM_BY_NONZERO_WEIGHTS){let s=S(o,"onehotLabels","softmaxCrossEntropy"),i=S(t,"logits","softmaxCrossEntropy"),a=null;if(e!=null&&(a=S(e,"weights","softmaxCrossEntropy")),Gt(s.shape,i.shape,"Error in softmaxCrossEntropy: "),r>0){let c=wt(r),l=wt(1),p=wt(s.shape[1]);s=pt(Q(s,ht(l,c)),Et(c,p))}let u=WL(s,i);return Ne(u,a,n)}var jy=I({softmaxCrossEntropy_:UL});function GL(o,t,e,r){let n=S(o,"indices","sparseFillEmptyRows","int32"),s=S(t,"values","sparseFillEmptyRows"),i=S(e,"denseShape","sparseFillEmptyRows","int32"),a=S(r,"defaultValue","sparseFillEmptyRows",s.dtype);if(n.rank!==2)throw new Error(`Indices should be Tensor2D but received shape
        ${n.shape}`);if(s.rank!==1)throw new Error(`Values should be Tensor1D but received shape ${s.shape}`);if(i.rank!==1)throw new Error(`Dense shape should be Tensor1D but received shape ${i.shape}`);if(a.rank!==0)throw new Error(`Default value should be a scalar but received shape ${a.shape}`);let u={indices:n,values:s,denseShape:i,defaultValue:a},c=$.runKernel(lu,u);return{outputIndices:c[0],outputValues:c[1],emptyRowIndicator:c[2],reverseIndexMap:c[3]}}var Yy=I({sparseFillEmptyRows_:GL});function HL(o,t,e){let r=S(o,"inputIndices","sparseReshape","int32"),n=S(t,"inputShape","sparseReshape","int32"),s=S(e,"newShape","sparseReshape","int32");if(r.rank!==2)throw new Error(`Input indices should be Tensor2D but received shape
        ${r.shape}`);if(n.rank!==1)throw new Error(`Input shape should be Tensor1D but received shape ${n.shape}`);if(s.rank!==1)throw new Error(`New shape should be Tensor1D but received shape ${s.shape}`);let i={inputIndices:r,inputShape:n,newShape:s},a=$.runKernel(pu,i);return{outputIndices:a[0],outputShape:a[1]}}var Qy=I({sparseReshape_:HL});function KL(o,t,e){let r=S(o,"data","sparseSegmentMean"),n=S(t,"indices","sparseSegmentMean","int32"),s=S(e,"segmentIds","sparseSegmentMean","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
          ${n.shape}`);if(s.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
          ${s.shape}`);let i={data:r,indices:n,segmentIds:s};return $.runKernel(ri,i)}var Zy=I({sparseSegmentMean_:KL});function qL(o,t,e){let r=S(o,"data","sparseSegmentSum"),n=S(t,"indices","sparseSegmentSum","int32"),s=S(e,"segmentIds","sparseSegmentSum","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
         ${n.shape}`);if(s.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
         ${s.shape}`);let i={data:r,indices:n,segmentIds:s};return $.runKernel(ni,i)}var Jy=I({sparseSegmentSum_:qL});function XL(o,t,e,r,n,s,i,a){let u=S(o,"data","stringNGrams","string");if(u.dtype!=="string")throw new Error("Data must be of datatype string");if(u.shape.length!==1)throw new Error(`Data must be a vector, saw: ${u.shape}`);let c=S(t,"dataSplits","stringNGrams");if(c.dtype!=="int32")throw new Error("Data splits must be of datatype int32");let l={separator:e,nGramWidths:r,leftPad:n,rightPad:s,padWidth:i,preserveShortSequences:a},p={data:u,dataSplits:c},m=$.runKernel(ai,p,l);return{nGrams:m[0],nGramsSplits:m[1]}}var tw=I({stringNGrams_:XL});function jL(o,t,e=!0){let r=S(o,"input","stringSplit","string"),n=S(t,"delimiter","stringSplit","string");if(r.rank!==1)throw new Error(`Input should be Tensor1D but received shape ${r.shape}`);if(n.rank!==0)throw new Error(`Delimiter should be a scalar but received shape ${n.shape}`);let s={skipEmpty:e},i={input:r,delimiter:n},a=$.runKernel(du,i,s);return{indices:a[0],values:a[1],shape:a[2]}}var ew=I({stringSplit_:jL});function YL(o,t){let e=S(o,"input","stringToHashBucketFast","string"),r={numBuckets:t};if(t<=0)throw new Error("Number of buckets must be at least 1");let n={input:e};return $.runKernel(fu,n,r)}var ow=I({stringToHashBucketFast_:YL});function QL(o,t,e,r=!0){let n=S(o,"input","staticRegexReplace","string"),s={pattern:t,rewrite:e,replaceGlobal:r};return $.runKernel(ji,{x:n},s)}var rw=I({staticRegexReplace_:QL});var uvt={fft:Pc,ifft:Fu,rfft:_c,irfft:Ig},dvt={hammingWindow:by,hannWindow:Jl,frame:tp,stft:yy},Evt={flipLeftRight:Sy,grayscaleToRGB:vy,resizeNearestNeighbor:_y,resizeBilinear:Py,rgbToGrayscale:Iy,rotateWithOffset:ky,cropAndResize:wy,nonMaxSuppression:$y,nonMaxSuppressionAsync:Ey,nonMaxSuppressionWithScore:Ry,nonMaxSuppressionWithScoreAsync:Dy,nonMaxSuppressionPadded:Ay,nonMaxSuppressionPaddedAsync:Fy,threshold:Oy,transform:My},Fvt={bandPart:Ly,gramSchmidt:By,qr:Vy},Uvt={absoluteDifference:Wy,computeWeightedLoss:Ne,cosineDistance:Uy,hingeLoss:Gy,huberLoss:Hy,logLoss:Ky,meanSquaredError:qy,sigmoidCrossEntropy:Xy,softmaxCrossEntropy:jy},Xvt={sparseFillEmptyRows:Yy,sparseReshape:Qy,sparseSegmentMean:Zy,sparseSegmentSum:Jy},Jvt={stringNGrams:tw,stringSplit:ew,stringToHashBucketFast:ow,staticRegexReplace:rw};var nw={};Ae(nw,{Serializable:()=>Bc,SerializationMap:()=>np,getRegisteredName:()=>JL,registerClass:()=>Ag});var ZL=new Map,Dg=new Map,Bc=class{getClassName(){return this.constructor.className}static fromConfig(t,e){return new t(e)}},np=class o{constructor(){this.classNameMap={}}static getMap(){return o.instance==null&&(o.instance=new o),o.instance}static register(t){o.getMap().classNameMap[t.className]=[t,t.fromConfig]}};function Ag(o,t,e){T(o.className!=null,()=>"Class being registered does not have the static className property defined."),T(typeof o.className=="string",()=>"className is required to be a string, but got type "+typeof o.className),T(o.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof t>"u"&&(t="Custom"),typeof e>"u"&&(e=o.className);let r=e,n=t+">"+r;return np.register(o),ZL.set(n,o),Dg.set(o,n),o}function JL(o){return Dg.has(o)?Dg.get(o):o.className}var Ve=class extends Bc{minimize(t,e=!1,r){let{value:n,grads:s}=this.computeGradients(t,r);if(r!=null){let i=r.map(a=>({name:a.name,tensor:s[a.name]}));this.applyGradients(i)}else this.applyGradients(s);return me(s),e?n:(n.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(t,e){return eg(t,e)}dispose(){this.iterations_!=null&&me(this.iterations_)}async saveIterations(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:wt(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(t){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(t){return this.iterations_=(await t[0].tensor.data())[0],t.slice(1)}};Object.defineProperty(Ve,Symbol.hasInstance,{value:o=>o.minimize!=null&&o.computeGradients!=null&&o.applyGradients!=null});var wa=class extends Ve{static get className(){return"Adadelta"}constructor(t,e,r=null){super(),this.learningRate=t,this.rho=e,this.epsilon=r,this.accumulatedGrads=[],this.accumulatedUpdates=[],r==null&&(this.epsilon=$.backend.epsilon())}applyGradients(t){(Array.isArray(t)?t.map(r=>r.name):Object.keys(t)).forEach((r,n)=>{let s=$.registeredVariables[r],i=!1;this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${r}/accum_grad`,variable:Bt(()=>xe(s).variable(i))}),this.accumulatedUpdates[n]==null&&(this.accumulatedUpdates[n]={originalName:`${r}/accum_var`,variable:Bt(()=>xe(s).variable(i))});let a=Array.isArray(t)?t[n].tensor:t[r];if(a==null)return;let u=this.accumulatedGrads[n].variable,c=this.accumulatedUpdates[n].variable;Bt(()=>{let l=pt(Q(u,this.rho),Q($e(a),1-this.rho)),p=Q(Et(Qe(pt(c,this.epsilon)),Qe(pt(u,this.epsilon))),a),m=pt(Q(c,this.rho),Q($e(p),1-this.rho));u.assign(l),c.assign(m);let d=pt(Q(p,-this.learningRate),s);s.assign(d)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(me(this.accumulatedGrads.map(t=>t.variable)),me(this.accumulatedUpdates.map(t=>t.variable)))}async getWeights(){let t=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=t.length/2,r=!1;this.accumulatedGrads=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})),this.accumulatedUpdates=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(r)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(t,e){return new t(e.learningRate,e.rho,e.epsilon)}};var Sa=class extends Ve{static get className(){return"Adagrad"}constructor(t,e=.1){super(),this.learningRate=t,this.initialAccumulatorValue=e,this.accumulatedGrads=[]}applyGradients(t){(Array.isArray(t)?t.map(r=>r.name):Object.keys(t)).forEach((r,n)=>{let s=$.registeredVariables[r];this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${r}/accumulator`,variable:Bt(()=>hn(s.shape,this.initialAccumulatorValue).variable(!1))});let i=Array.isArray(t)?t[n].tensor:t[r];if(i==null)return;let a=this.accumulatedGrads[n].variable;Bt(()=>{let u=pt(a,$e(i));a.assign(u);let c=pt(Q(Et(i,Qe(pt(u,$.backend.epsilon()))),-this.learningRate),s);s.assign(c)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&me(this.accumulatedGrads.map(t=>t.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=!1;this.accumulatedGrads=t.map(r=>({originalName:r.name,variable:r.tensor.variable(e)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(t,e){return new t(e.learningRate,e.initialAccumulatorValue)}};var va=class extends Ve{static get className(){return"Adam"}constructor(t,e,r,n=null){super(),this.learningRate=t,this.beta1=e,this.beta2=r,this.epsilon=n,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],Bt(()=>{this.accBeta1=wt(e).variable(),this.accBeta2=wt(r).variable()}),n==null&&(this.epsilon=$.backend.epsilon())}applyGradients(t){let e=Array.isArray(t)?t.map(r=>r.name):Object.keys(t);Bt(()=>{let r=ht(1,this.accBeta1),n=ht(1,this.accBeta2);e.forEach((s,i)=>{let a=$.registeredVariables[s],u=!1;this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${s}/m`,variable:Bt(()=>xe(a).variable(u))}),this.accumulatedSecondMoment[i]==null&&(this.accumulatedSecondMoment[i]={originalName:`${s}/v`,variable:Bt(()=>xe(a).variable(u))});let c=Array.isArray(t)?t[i].tensor:t[s];if(c==null)return;let l=this.accumulatedFirstMoment[i].variable,p=this.accumulatedSecondMoment[i].variable,m=pt(Q(l,this.beta1),Q(c,1-this.beta1)),d=pt(Q(p,this.beta2),Q($e(c),1-this.beta2)),f=Et(m,r),h=Et(d,n);l.assign(m),p.assign(d);let g=pt(Q(Et(f,pt(Qe(h),this.epsilon)),-this.learningRate),a);a.assign(g)}),this.accBeta1.assign(Q(this.accBeta1,this.beta1)),this.accBeta2.assign(Q(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&me(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedSecondMoment!=null&&me(this.accumulatedSecondMoment.map(t=>t.variable))}async getWeights(){let t=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t),Bt(()=>{this.accBeta1.assign(wi(this.beta1,this.iterations_+1)),this.accBeta2.assign(wi(this.beta2,this.iterations_+1))});let e=t.length/2,r=!1;this.accumulatedFirstMoment=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})),this.accumulatedSecondMoment=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(r)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon)}};var Ia=class extends Ve{static get className(){return"Adamax"}constructor(t,e,r,n=null,s=0){super(),this.learningRate=t,this.beta1=e,this.beta2=r,this.epsilon=n,this.decay=s,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],Bt(()=>{this.iteration=wt(0).variable(),this.accBeta1=wt(e).variable()}),n==null&&(this.epsilon=$.backend.epsilon())}applyGradients(t){let e=Array.isArray(t)?t.map(r=>r.name):Object.keys(t);Bt(()=>{let r=ht(1,this.accBeta1),n=Et(-this.learningRate,pt(Q(this.iteration,this.decay),1));e.forEach((s,i)=>{let a=$.registeredVariables[s],u=!1;this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${s}/m`,variable:xe(a).variable(u)}),this.accumulatedWeightedInfNorm[i]==null&&(this.accumulatedWeightedInfNorm[i]={originalName:`${s}/v`,variable:xe(a).variable(u)});let c=Array.isArray(t)?t[i].tensor:t[s];if(c==null)return;let l=this.accumulatedFirstMoment[i].variable,p=this.accumulatedWeightedInfNorm[i].variable,m=pt(Q(l,this.beta1),Q(c,1-this.beta1)),d=Q(p,this.beta2),f=ke(c),h=ag(d,f);l.assign(m),p.assign(h);let g=pt(Q(Et(n,r),Et(m,pt(h,this.epsilon))),a);a.assign(g)}),this.iteration.assign(pt(this.iteration,1)),this.accBeta1.assign(Q(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&me(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedWeightedInfNorm!=null&&me(this.accumulatedWeightedInfNorm.map(t=>t.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(t){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon,e.decay)}};var yn=class extends Ve{static get className(){return"SGD"}constructor(t){super(),this.learningRate=t,this.setLearningRate(t)}applyGradients(t){(Array.isArray(t)?t.map(r=>r.name):Object.keys(t)).forEach((r,n)=>{let s=Array.isArray(t)?t[n].tensor:t[r];if(s==null)return;let i=$.registeredVariables[r];Bt(()=>{let a=pt(Q(this.c,s),i);i.assign(a)})}),this.incrementIterations()}setLearningRate(t){this.learningRate=t,this.c!=null&&this.c.dispose(),this.c=ub(wt(-t))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(t){if(t=await this.extractIterations(t),t.length!==0)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(t,e){return new t(e.learningRate)}};var ka=class extends yn{static get className(){return"Momentum"}constructor(t,e,r=!1){super(t),this.learningRate=t,this.momentum=e,this.useNesterov=r,this.accumulations=[],this.m=wt(this.momentum)}applyGradients(t){(Array.isArray(t)?t.map(r=>r.name):Object.keys(t)).forEach((r,n)=>{let s=$.registeredVariables[r];this.accumulations[n]==null&&(this.accumulations[n]={originalName:`${r}/momentum`,variable:Bt(()=>xe(s).variable(!1))});let i=this.accumulations[n].variable,a=Array.isArray(t)?t[n].tensor:t[r];a!=null&&Bt(()=>{let u,c=pt(Q(this.m,i),a);this.useNesterov?u=pt(Q(this.c,pt(a,Q(c,this.m))),s):u=pt(Q(this.c,c),s),i.assign(c),s.assign(u)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&me(this.accumulations.map(t=>t.variable))}setMomentum(t){this.momentum=t}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=!1;this.accumulations=t.map(r=>({originalName:r.name,variable:r.tensor.variable(e)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(t,e){return new t(e.learningRate,e.momentum,e.useNesterov)}};var $a=class extends Ve{static get className(){return"RMSProp"}constructor(t,e=.9,r=0,n=null,s=!1){if(super(),this.learningRate=t,this.decay=e,this.momentum=r,this.epsilon=n,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=s,n==null&&(this.epsilon=$.backend.epsilon()),t==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(t){(Array.isArray(t)?t.map(r=>r.name):Object.keys(t)).forEach((r,n)=>{let s=$.registeredVariables[r],i=!1;this.accumulatedMeanSquares[n]==null&&(this.accumulatedMeanSquares[n]={originalName:`${r}/rms`,variable:Bt(()=>xe(s).variable(i))}),this.accumulatedMoments[n]==null&&(this.accumulatedMoments[n]={originalName:`${r}/momentum`,variable:Bt(()=>xe(s).variable(i))}),this.accumulatedMeanGrads[n]==null&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${r}/mg`,variable:Bt(()=>xe(s).variable(i))});let a=Array.isArray(t)?t[n].tensor:t[r];if(a==null)return;let u=this.accumulatedMeanSquares[n].variable,c=this.accumulatedMoments[n].variable;Bt(()=>{let l=pt(Q(u,this.decay),Q($e(a),1-this.decay));if(this.centered){let p=this.accumulatedMeanGrads[n].variable,m=pt(Q(p,this.decay),Q(a,1-this.decay)),d=Et(Q(a,this.learningRate),Qe(ht(l,pt($e(m),this.epsilon)))),f=pt(Q(c,this.momentum),d);u.assign(l),p.assign(m),c.assign(f);let h=ht(s,f);s.assign(h)}else{let p=pt(Q(u,this.decay),Q($e(a),1-this.decay)),m=pt(Q(c,this.momentum),Et(Q(a,this.learningRate),Qe(pt(p,this.epsilon))));u.assign(p),c.assign(m);let d=ht(s,m);s.assign(d)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&me(this.accumulatedMeanSquares.map(t=>t.variable)),this.accumulatedMeanGrads!=null&&this.centered&&me(this.accumulatedMeanGrads.map(t=>t.variable)),this.accumulatedMoments!=null&&me(this.accumulatedMoments.map(t=>t.variable))}async getWeights(){let t=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&t.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=this.centered?t.length/3:t.length/2,r=!1;this.accumulatedMeanSquares=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})),this.accumulatedMoments=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})),this.centered&&(this.accumulatedMeanGrads=t.slice(e*2,e*3).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(t,e){return new t(e.learningRate,e.decay,e.momentum,e.epsilon,e.centered)}};var tB=[wa,Sa,va,Ia,ka,$a,yn];function sw(){for(let o of tB)Ag(o)}var hw={};Ae(hw,{CompositeArrayBuffer:()=>Ie,browserFiles:()=>aw,browserHTTPRequest:()=>pw,concatenateArrayBuffers:()=>Cb,copyModel:()=>Ab,decodeWeights:()=>Al,decodeWeightsStream:()=>hb,encodeWeights:()=>db,fromMemory:()=>mw,fromMemorySync:()=>Lg,getLoadHandlers:()=>Sb,getModelArtifactsForJSON:()=>Iu,getModelArtifactsForJSONSync:()=>Dh,getModelArtifactsInfoForJSON:()=>Yo,getSaveHandlers:()=>wb,getWeightSpecs:()=>Nc,http:()=>ip,isHTTPScheme:()=>sp,listModels:()=>Rb,loadWeights:()=>cw,moveModel:()=>Fb,registerLoadRouter:()=>yb,registerSaveRouter:()=>bb,removeModel:()=>Db,weightsLoaderFactory:()=>Og,withSaveHandler:()=>dw,withSaveHandlerSync:()=>fw});var eB="model",oB=".json",rB=".weights.bin";function iw(o){return new Promise(t=>setTimeout(t)).then(o)}var _u=class o{constructor(t){if(!D().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(o.URL_SCHEME)&&(t=t.slice(o.URL_SCHEME.length)),(t==null||t.length===0)&&(t=eB),this.modelJsonFileName=t+oB,this.weightDataFileName=t+rB}async save(t){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");let e=Ie.join(t.weightData),r=window.URL.createObjectURL(new Blob([e],{type:"application/octet-stream"}));if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{let n=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],s=Fl(t,n),i=window.URL.createObjectURL(new Blob([JSON.stringify(s)],{type:"application/json"})),a=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(a.download=this.modelJsonFileName,a.href=i,await iw(()=>a.dispatchEvent(new MouseEvent("click"))),t.weightData!=null){let u=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;u.download=this.weightDataFileName,u.href=r,await iw(()=>u.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:Yo(t)}}}};_u.URL_SCHEME="downloads://";var Fg=class{constructor(t){if(t==null||t.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${t}`);this.jsonFile=t[0],this.weightsFiles=t.slice(1)}async load(){return new Promise((t,e)=>{let r=new FileReader;r.onload=n=>{let s=JSON.parse(n.target.result),i=s.modelTopology;if(i==null){e(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(s.weightsManifest==null){e(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){t({modelTopology:i});return}let u=Iu(s,c=>this.loadWeights(c));t(u)},r.onerror=n=>e(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),r.readAsText(this.jsonFile)})}loadWeights(t){let e=[],r=[];for(let i of t)e.push(...i.weights),r.push(...i.paths);let n=this.checkManifestAndWeightFiles(t),s=r.map(i=>this.loadWeightsFile(i,n[i]));return Promise.all(s).then(i=>[e,i])}loadWeightsFile(t,e){return new Promise((r,n)=>{let s=new FileReader;s.onload=i=>{let a=i.target.result;r(a)},s.onerror=i=>n(`Failed to weights data from file of path '${t}'.`),s.readAsArrayBuffer(e)})}checkManifestAndWeightFiles(t){let e=[],r=this.weightsFiles.map(s=>Rh(s.name)),n={};for(let s of t)s.paths.forEach(i=>{let a=Rh(i);if(e.indexOf(a)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${a}'`);if(e.push(a),r.indexOf(a)===-1)throw new Error(`Weight file with basename '${a}' is not provided.`);n[i]=this.weightsFiles[r.indexOf(a)]});if(e.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${e.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return n}},nB=o=>D().getBool("IS_BROWSER")&&!Array.isArray(o)&&o.startsWith(_u.URL_SCHEME)?sB(o.slice(_u.URL_SCHEME.length)):null;ge.registerSaveRouter(nB);function sB(o="model"){return new _u(o)}function aw(o){return new Fg(o)}function Pg(o,t,e,r){i(o),e=e??0,r=r??1,a(e,r);let n=0,s=u=>(u.then(c=>{let l=e+ ++n/o.length*(r-e);return t(l),c}),u);function i(u){T(u!=null&&Array.isArray(u)&&u.length>0,()=>"promises must be a none empty array")}function a(u,c){T(u>=0&&u<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${u}`),T(c>=0&&c<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${c}`),T(c>=u,()=>`startFraction must be no more than endFraction, but got startFraction ${u} and endFraction ${c}`)}return Promise.all(o.map(s))}async function _g(o,t){t==null&&(t={});let e=t.fetchFunc==null?D().platform.fetch:t.fetchFunc,r=o.map(p=>e(p,t.requestInit,{isBinary:!0})),a=(t.onProgress==null?await Promise.all(r):await Pg(r,t.onProgress,0,.5)).map(p=>p.arrayBuffer());return t.onProgress==null?await Promise.all(a):await Pg(a,t.onProgress,.5,1)}function uw(o,t){var e;let r=t.fetchFunc==null?D().platform.fetch:t.fetchFunc,n=0,s;return(e=t.onProgress)===null||e===void 0||e.call(t,0),new ReadableStream({pull:async i=>{for(var a;n<o.length;){s||(s=(await r(o[n],t.requestInit,{isBinary:!0})).body.getReader());let{done:u,value:c}=await s.read();if(u){n++,s=void 0,(a=t.onProgress)===null||a===void 0||a.call(t,n/o.length);continue}i.enqueue(c);return}i.close()}})}async function cw(o,t="",e,r){return Og(i=>_g(i,{requestInit:r}))(o,t,e)}function Og(o){return async(t,e="",r)=>{let n=t.map(()=>!1),s={},i=r!=null?r.map(()=>!1):[],a=[];if(t.forEach((d,f)=>{let h=0;d.weights.forEach(g=>{let x="quantization"in g?g.quantization.dtype:g.dtype,b=mn[x]*St(g.shape),w=()=>{n[f]=!0,s[f]==null&&(s[f]=[]),s[f].push({manifestEntry:g,groupOffset:h,sizeBytes:b})};r!=null?r.forEach((v,k)=>{v===g.name&&(w(),i[k]=!0)}):w(),a.push(g.name),h+=b})}),!i.every(d=>d)){let d=r.filter((f,h)=>!i[h]);throw new Error(`Could not find weights in manifest with names: ${d.join(", ")}. 
Manifest JSON has weights with names: ${a.join(", ")}.`)}let u=n.reduce((d,f,h)=>(f&&d.push(h),d),[]),c=[];u.forEach(d=>{t[d].paths.forEach(f=>{let h=e+(e.endsWith("/")?"":"/")+f;c.push(h)})});let l=await o(c),p={},m=0;return u.forEach(d=>{let f=t[d].paths.length,h=new Ie(l.slice(m,m+f));s[d].forEach(x=>{let b=h.slice(x.groupOffset,x.groupOffset+x.sizeBytes),w=Al(b,[x.manifestEntry]);for(let v in w)p[v]=w[v]}),m+=f}),p}}var iB="application/octet-stream",aB="application/json",zc=class{constructor(t,e){if(this.DEFAULT_METHOD="POST",e==null&&(e={}),this.weightPathPrefix=e.weightPathPrefix,this.weightUrlConverter=e.weightUrlConverter,e.fetchFunc!=null?(T(typeof e.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=e.fetchFunc):this.fetch=D().platform.fetch,T(t!=null&&t.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(t)&&T(t.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${t.length}).`),this.path=t,e.requestInit!=null&&e.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=e.requestInit||{},this.loadOptions=e}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");let e=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);e.body=new FormData;let r=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],n=Fl(t,r);if(e.body.append("model.json",new Blob([JSON.stringify(n)],{type:aB}),"model.json"),t.weightData!=null){let i=Ie.join(t.weightData);e.body.append("model.weights.bin",new Blob([i],{type:iB}),"model.weights.bin")}let s=await this.fetch(this.path,e);if(s.ok)return{modelArtifactsInfo:Yo(t),responses:[s]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${s.status}.`)}async loadModelJSON(){let t=await this.fetch(this.path,this.requestInit);if(!t.ok)throw new Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);let e;try{e=await t.json()}catch{let i=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?i+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":i+=" Please make sure the server is serving valid JSON for this request.",new Error(i)}let r=e.modelTopology,n=e.weightsManifest;if(r==null&&n==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return e}async load(){if(this.loadOptions.streamWeights)return this.loadStream();let t=await this.loadModelJSON();return Iu(t,e=>this.loadWeights(e))}async loadStream(){let t=await this.loadModelJSON(),e=await this.getWeightUrls(t.weightsManifest),r=Nc(t.weightsManifest),n=()=>uw(e,this.loadOptions);return Object.assign(Object.assign({},t),{weightSpecs:r,getWeightStream:n})}async getWeightUrls(t){let e=Array.isArray(this.path)?this.path[1]:this.path,[r,n]=uB(e),s=this.weightPathPrefix||r,i=[],a=[];for(let u of t)for(let c of u.paths)this.weightUrlConverter!=null?a.push(this.weightUrlConverter(c)):i.push(s+c+n);return this.weightUrlConverter&&i.push(...await Promise.all(a)),i}async loadWeights(t){let e=await this.getWeightUrls(t),r=Nc(t),n=await _g(e,this.loadOptions);return[r,n]}};zc.URL_SCHEME_REGEX=/^https?:\/\//;function uB(o){let t=o.lastIndexOf("/"),e=o.lastIndexOf("?"),r=o.substring(0,t),n=e>t?o.substring(e):"";return[r+"/",n]}function sp(o){return o.match(zc.URL_SCHEME_REGEX)!=null}var lw=(o,t)=>{if(typeof fetch>"u"&&(t==null||t.fetchFunc==null))return null;{let e=!0;if(Array.isArray(o)?e=o.every(r=>sp(r)):e=sp(o),e)return ip(o,t)}return null};ge.registerSaveRouter(lw);ge.registerLoadRouter(lw);function ip(o,t){return new zc(o,t)}function pw(o,t){return ip(o,t)}var Vc=class{constructor(t){this.modelArtifacts=t}load(){return this.modelArtifacts}},ap=class{constructor(t){this.saveHandler=t}save(t){return this.saveHandler(t)}},Mg=class{constructor(t){t.load&&(this.load=()=>Promise.resolve(t.load())),t.save&&(this.save=e=>Promise.resolve(t.save(e)))}};function mw(o,t,e,r){let n=arguments;return new Mg(Lg(...n))}function Lg(o,t,e,r){return arguments.length===1?o.modelTopology!=null||o.weightSpecs!=null?new Vc(o):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Vc({modelTopology:o})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Vc({modelTopology:o,weightSpecs:t,weightData:e,trainingConfig:r}))}function dw(o){return new ap(o)}function fw(o){return new ap(o)}var xw={};Ae(xw,{confusionMatrix:()=>gw});function cB(o,t,e){let r=S(o,"labels","confusionMatrix"),n=S(t,"predictions","confusionMatrix");T(e==null||e>0&&Number.isInteger(e),()=>`If provided, numClasses must be a positive integer, but got ${e}`),T(r.rank===1,()=>`Expected the rank of labels to be 1, but got ${r.rank}`),T(n.rank===1,()=>`Expected the rank of predictions to be 1, but got ${n.rank}`),T(r.shape[0]===n.shape[0],()=>`Mismatch in the number of examples: ${r.shape[0]} vs. ${n.shape[0]}. Labels and predictions should have the same number of elements.`),T(e>0&&Number.isInteger(e),()=>`numClasses is required to be a positive integer, but got ${e}`);let s=Hl($t(r,"int32"),e),i=Hl($t(n,"int32"),e),a=Lc(s),u=At(a,i);return $t(u,"int32")}var gw=I({confusionMatrix_:cB});var ww={};Ae(ww,{draw:()=>xB,fromPixels:()=>CB,fromPixelsAsync:()=>fB,toPixels:()=>gB});var Ta,Cw=!1;function bw(o,t=3){if(t>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(o==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let e=!1,r=!1,n=!1,s=!1,i=!1,a=!1;if(o.data instanceof Uint8Array)e=!0;else if(typeof ImageData<"u"&&o instanceof ImageData)r=!0;else if(typeof HTMLVideoElement<"u"&&o instanceof HTMLVideoElement)n=!0;else if(typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement)s=!0;else if(o.getContext!=null)i=!0;else if(typeof ImageBitmap<"u"&&o instanceof ImageBitmap)a=!0;else throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${o.constructor.name}`);if(xu(Yi,$.backendName)!=null){let f={pixels:o},h={numChannels:t};return $.runKernel(Yi,f,h)}let[c,l]=n?[o.videoWidth,o.videoHeight]:[o.width,o.height],p;if(i)p=o.getContext("2d").getImageData(0,0,c,l).data;else if(r||e)p=o.data;else if(s||n||a){if(Ta==null)if(typeof document>"u")if(typeof OffscreenCanvas<"u"&&typeof OffscreenCanvasRenderingContext2D<"u")Ta=new OffscreenCanvas(1,1).getContext("2d");else throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");else Ta=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});Ta.canvas.width=c,Ta.canvas.height=l,Ta.drawImage(o,0,0,c,l),p=Ta.getImageData(0,0,c,l).data}let m;if(t===4)m=new Int32Array(p);else{let f=c*l;m=new Int32Array(f*t);for(let h=0;h<f;h++)for(let g=0;g<t;++g)m[h*t+g]=p[h*4+g]}return Tg(m,[l,c,t],"int32")}function lB(o){return o!=null&&o.data instanceof Uint8Array}function pB(){return typeof window<"u"&&typeof ImageBitmap<"u"&&window.hasOwnProperty("createImageBitmap")}function mB(o){return o!=null&&o.width!==0&&o.height!==0}function dB(o){return pB()&&!(o instanceof ImageBitmap)&&mB(o)&&!lB(o)}async function fB(o,t=3){let e=null;if(D().getBool("WRAP_TO_IMAGEBITMAP")&&dB(o)){let r;try{r=await createImageBitmap(o,{premultiplyAlpha:"none"})}catch{r=null}r!=null&&r.width===o.width&&r.height===o.height?e=r:e=o}else e=o;return bw(e,t)}function yw(o){if(o.rank!==2&&o.rank!==3)throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${o.rank}.`);let t=o.rank===2?1:o.shape[2];if(t>4||t===2)throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${t}`);if(o.dtype!=="float32"&&o.dtype!=="int32")throw new Error(`Unsupported type for toPixels: ${o.dtype}. Please use float32 or int32 tensors.`)}function hB(o){let t=o?.alpha||1;if(t>1||t<0)throw new Error(`Alpha value ${t} is suppoed to be in range [0 - 1].`)}async function gB(o,t){let e=S(o,"img","toPixels");if(!(o instanceof Ut)){let c=e;e=$t(c,"int32"),c.dispose()}yw(e);let[r,n]=e.shape.slice(0,2),s=e.rank===2?1:e.shape[2],i=await e.data(),a=e.dtype==="float32"?255:1,u=new Uint8ClampedArray(n*r*4);for(let c=0;c<r*n;++c){let l=[0,0,0,255];for(let m=0;m<s;m++){let d=i[c*s+m];if(e.dtype==="float32"){if(d<0||d>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${d}.`)}else if(e.dtype==="int32"&&(d<0||d>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${d}.`);s===1?(l[0]=d*a,l[1]=d*a,l[2]=d*a):l[m]=d*a}let p=c*4;u[p+0]=Math.round(l[0]),u[p+1]=Math.round(l[1]),u[p+2]=Math.round(l[2]),u[p+3]=Math.round(l[3])}if(t!=null){Cw||xu(Wi,$.backendName)!=null&&(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),Cw=!0),t.width=n,t.height=r;let c=t.getContext("2d"),l=new ImageData(u,n,r);c.putImageData(l,0,0)}return e!==o&&e.dispose(),u}function xB(o,t,e){let r=S(o,"img","draw");if(!(o instanceof Ut)){let i=r;r=$t(i,"int32"),i.dispose()}yw(r),hB(e?.imageOptions);let n={image:r},s={canvas:t,options:e};$.runKernel(Wi,n,s)}var CB=I({fromPixels_:bw});var vw={};Ae(vw,{prepareAndValidate:()=>Sw});function Sw(o,t){let e=o.shape.length,r=t.shape.length;if(e<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${e}.`);if(r<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if(t.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[r-1]>e)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[r-1]} vs. ${e}`);if(St(o.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${o.shape}.`);let n=t.shape,s=n[n.length-1],i=1;for(let p=0;p<n.length-1;++p)i*=n[p];let a=o.shape,u=n.slice();u.pop();let c=1;for(let p=s;p<e;++p)c*=a[p],u.push(a[p]);let l=[...Uo(o.shape).map(p=>p/c),1].slice(0,s);return[u,i,c,l]}var ee={};Ae(ee,{assertParamsValid:()=>yB,computeFlatOffset:()=>kB,computeOutShape:()=>SB,getNormalizedAxes:()=>vB,isSliceContinous:()=>IB,maskToAxes:()=>wB,parseSliceParams:()=>$B,sliceInfo:()=>TB,startForAxis:()=>Dw,startIndicesWithElidedDims:()=>Nw,stopForAxis:()=>Aw,stopIndicesWithElidedDims:()=>Ew,stridesForAxis:()=>Rw,stridesWithElidedDims:()=>kw});var Bg=-2,bB=-1;function yB(o,t,e){let r=o.shape.length;T(r===t.length,()=>`Error in slice${r}D: Length of begin ${t} must match the rank of the array (${r}).`),T(r===e.length,()=>`Error in slice${r}D: Length of size ${e} must match the rank of the array (${r}).`);for(let n=0;n<r;++n)T(t[n]+e[n]<=o.shape[n],()=>`Error in slice${r}D: begin[${n}] + size[${n}] (${t[n]+e[n]}) would overflow input.shape[${n}] (${o.shape[n]})`)}function wB(o){let t=[],e=0;for(;o>0;)o&1&&t.push(e),o/=2,e++;return t}function SB(o,t,e){let r=[];for(let n=0;n<o.length;n++)r[n]=Math.ceil((t[n]-o[n])/e[n]);return r}function kw(o,t,e,r){let n=[...o];for(let s=n.length;s<r.length;s++)n.push(1);for(let s=0;s<e;s++)s===0?n[t]=1:(n.splice(t,0,1),n.pop());return n}function $w(o,t,e){return e<=o?e:e-(t-1)}function Tw(o,t){let e=[];for(let r=0;r<o;r++)e.push(t+r);return e}function vB(o,t,e,r,n,s,i,a,u){let c=o.length,l=new Array(c),p=new Array(c),m=new Array(c);if(t.length&&e>0){let d=t[0],f=e+1;l=Nw(i,d,f,r,o),p=Ew(a,d,f,n,o),m=kw(s,d,f,o)}else for(let d=0;d<c;d++)l[d]=Dw(i,r,s,o,d,u),p[d]=Aw(a,n,s,o,d,u),m[d]=Rw(s,d,u);return{begin:l,end:p,strides:m}}function Nw(o,t,e,r,n){let s=[...n],i=Tw(e,t);for(let a=0;a<s.length;a++)if(i.indexOf(a)>-1)s[a]=0;else{let u=$w(t,e,a),c=r[u];o&1<<u&&(c=0),s[a]=c}return s}function Ew(o,t,e,r,n){let s=[...n],i=Tw(e,t);for(let a=0;a<s.length;a++)if(i.indexOf(a)>-1)s[a]=Number.MAX_SAFE_INTEGER;else{let u=$w(t,e,a),c=r[u];o&1<<u&&(c=Number.MAX_SAFE_INTEGER),s[a]=c}for(let a=0;a<s.length;a++){let u=n[a];s[a]<0&&(s[a]+=u),s[a]=qa(0,s[a],n[a])}return s}function Rw(o,t,e){let r=o[t];return(e&1<<t||r==null)&&(r=1),r}function Dw(o,t,e,r,n,s){let i=t[n],a=e[n]||1;(o&1<<n||s&1<<n||i==null)&&(a>0?i=Number.MIN_SAFE_INTEGER:i=Number.MAX_SAFE_INTEGER);let u=r[n];return i<0&&(i+=u),i=qa(0,i,u-1),i}function Aw(o,t,e,r,n,s){let i=t[n],a=e[n]||1;(o&1<<n||s&1<<n||i==null)&&(a>0?i=Number.MAX_SAFE_INTEGER:i=Number.MIN_SAFE_INTEGER);let u=r[n];return i<0&&(i+=u),a>0?i=qa(0,i,u):i=qa(-1,i,u-1),i}function IB(o,t,e){let r=e.length;for(let n=0;n<e.length;n++)if(e[n]>1){r=n;break}for(let n=r+1;n<e.length;n++)if(t[n]>0||e[n]!==o[n])return!1;return!0}function kB(o,t){let e=o.length>0?o[o.length-1]:1;for(let r=0;r<o.length-1;r++)e+=o[r]*t[r];return e}function $B(o,t,e){let r,n=o.shape.length;typeof t=="number"?r=[t,...new Array(n-1).fill(0)]:t.length<n?r=t.concat(new Array(n-t.length).fill(0)):r=t.slice(),r.forEach(i=>{T(i!==-1,()=>"slice() does not support negative begin indexing.")});let s;return e==null?s=new Array(n).fill(-1):typeof e=="number"?s=[e,...new Array(n-1).fill(-1)]:e.length<n?s=e.concat(new Array(n-e.length).fill(-1)):s=e,s=s.map((i,a)=>i>=0?i:(T(i===-1,()=>`Negative size values should be exactly -1 but got ${i} for the slice() size at index ${a}.`),o.shape[a]-r[a])),[r,s]}function TB(o,t,e,r,n,s,i,a,u){let c;if(r==null?(c=new Array(t.length),c.fill(1)):c=r,i!=null&&(i&i-1)!==0)throw new Error("Multiple ellipses in slice is not allowed.");let l=!1,p={dims:c.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:e.slice(),strides:c.slice(),beginMask:n,endMask:s,ellipsisMask:i,newAxisMask:a,shrinkAxisMask:u};for(let w=0;w<p.dims;w++)l&&(1<<w&a)!==0&&p.numAddAxisAfterEllipsis++,1<<w&i&&(l=!0);l||(p.ellipsisMask|=1<<p.dims,p.dims++);let m={dims:o.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};NB(p,m);let d=!0,f=!0,h=!0,g=[],x=[];for(let w=0;w<o.length;++w){if(m.strides[w]===0)throw Error(`strides[${w}] must be non-zero`);let v=!!(m.shrinkAxisMask&1<<w),k=o[w];if(k===-1){g.push(v?1:-1);continue}let N=[m.beginMask&1<<w,m.endMask&1<<w],E=[m.strides[w]>0?0:-1,m.strides[w]>0?k:k-1];if(v&&m.strides[w]<=0)throw Error("only stride 1 allowed on non-range indexing.");h=h&&m.strides[w]===1;let R=!!(m.beginMask&1<<w&&m.endMask&1<<w);if(m.beginValid&&m.endValid){if(v){let _=m.begin[w]<0?k+m.begin[w]:m.begin[w];if(m.begin[w]=_,m.end[w]=m.begin[w]+1,_<0||_>=k)throw Error(`slice index ${m.begin[w]} of dimension ${w} out of bounds.`)}else m.begin[w]=Iw(m.begin[w],0,m.strides[w],k,N,E),m.end[w]=Iw(m.end[w],1,m.strides[w],k,N,E);let P=m.strides[w]===1&&m.begin[w]===0&&m.end[w]===k;d=d&&P,f=f&&(w===0&&m.strides[w]===1||P)}else d=d&&m.strides[w]===1&&R,f=f&&(w===0&&m.strides[w]===1||R);let A,F=!1;if(m.beginValid&&m.endValid?(A=m.end[w]-m.begin[w],F=!0):v?(A=1,F=!0):R&&k>=0&&(m.strides[w]<0?A=-k:A=k,F=!0),F){let P;A===0||A<0!=m.strides[w]<0?P=0:P=Math.trunc(A/m.strides[w])+(A%m.strides[w]!==0?1:0),g.push(P)}else g.push(-1)}for(let w=0;w<m.finalShapeGatherIndices.length;++w){let v=m.finalShapeGatherIndices[w];v>=0?x.push(g[v]):v===Bg&&x.push(1)}return{finalShapeSparse:x.filter((w,v)=>m.finalShapeGatherIndices[v]!==Bg),finalShape:x,isIdentity:d,sliceDim0:f,isSimpleSlice:h,begin:m.begin,end:m.end,strides:m.strides}}function NB(o,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let e=0;t.beginValid=o.begin!=null,t.endValid=o.end!=null,t.begin=new Array(t.dims),t.end=new Array(t.dims),t.strides=new Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=new Array(t.dims);for(let r=0;r<o.dims;r++)if(1<<r&o.ellipsisMask){let n=Math.min(t.dims-(o.dims-r)+1+o.numAddAxisAfterEllipsis,t.dims);for(;e<n;e++)t.begin[e]=0,t.end[e]=0,t.strides[e]=1,t.beginMask|=1<<e,t.endMask|=1<<e,t.finalShapeGatherIndices.push(e),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[e]=r}else if(1<<r&o.newAxisMask)t.finalShapeGatherIndices.push(Bg),t.finalShapeGatherIndicesSparse.push(-1);else{if(e===t.begin.length)throw Error(`Index out of range using input dim ${e}; input has only ${t.dims} dims, ${t.begin.length}.`);o.begin!=null&&(t.begin[e]=o.begin[r]),o.end!=null&&(t.end[e]=o.end[r]),t.strides[e]=o.strides[r],o.beginMask&1<<r&&(t.beginMask|=1<<e),o.endMask&1<<r&&(t.endMask|=1<<e),o.shrinkAxisMask&1<<r?(t.finalShapeGatherIndices.push(bB),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<e):(t.finalShapeGatherIndices.push(e),t.finalShapeGatherIndicesSparse.push(r)),t.inputShapeGatherIndicesSparse[e]=r,e++}}function Iw(o,t,e,r,n,s){if(n[t])return e>0?s[t]:s[t+1&1];{let i=o<0?r+o:o;return i<s[0]?s[0]:i>s[1]?s[1]:i}}var EB="4.22.0";var Wc=class{static sgd(t){return new yn(t)}static momentum(t,e,r=!1){return new ka(t,e,r)}static rmsprop(t,e=.9,r=0,n=null,s=!1){return new $a(t,e,r,n,s)}static adam(t=.001,e=.9,r=.999,n=null){return new va(t,e,r,n)}static adadelta(t=.001,e=.95,r=null){return new wa(t,e,r)}static adamax(t=.002,e=.9,r=.999,n=null,s=0){return new Ia(t,e,r,n,s)}static adagrad(t,e=.1){return new Sa(t,e)}};var RNt=Wc;var RB=typeof requestAnimationFrame<"u"?requestAnimationFrame:typeof setImmediate<"u"?setImmediate:o=>o();function zg(){return new Promise(o=>RB(()=>o()))}var y={};Ae(y,{ERF_A1:()=>qB,ERF_A2:()=>XB,ERF_A3:()=>jB,ERF_A4:()=>YB,ERF_A5:()=>QB,ERF_P:()=>KB,PARALLELIZE_THRESHOLD:()=>up,RowPartitionType:()=>or,SELU_SCALE:()=>HB,SELU_SCALEALPHA:()=>GB,applyActivation:()=>ba,assertAndGetBroadcastShape:()=>Ft,assertAxesAreInnerMostDims:()=>iP,assertParamsConsistent:()=>DB,assignToTypedArray:()=>rz,axesAreInnerMostDims:()=>Xh,calculateShapes:()=>uy,checkEinsumDimSizes:()=>cz,checkPadOnDimRoundingMode:()=>le,combineLocations:()=>Vb,combineRaggedTensorToTensorShapes:()=>FB,complexWithEvenIndex:()=>tz,complexWithOddIndex:()=>ez,computeConv2DInfo:()=>sa,computeConv3DInfo:()=>Ob,computeDefaultPad:()=>Wh,computeDilation2DInfo:()=>EF,computeOptimalWindowSize:()=>MB,computeOutAndReduceShapes:()=>sP,computeOutShape:()=>AB,computePool2DInfo:()=>Vh,computePool3DInfo:()=>RF,convertConv2DDataFormat:()=>Mb,decodeEinsumEquation:()=>az,eitherStridesOrDilationsAreOne:()=>Fe,expandShapeToKeepDim:()=>gn,exponent:()=>sz,exponents:()=>nz,fromStringArrayToUint8:()=>Rz,fromUint8ToStringArray:()=>Ez,getAxesPermutation:()=>aP,getBroadcastDims:()=>zb,getComplexWithIndex:()=>oz,getEinsumComputePath:()=>lz,getEinsumPermutation:()=>uz,getFusedBiasGradient:()=>Ca,getFusedDyActivation:()=>xa,getImageCenter:()=>LB,getInnerMostAxes:()=>cP,getPermuted:()=>zB,getRaggedRank:()=>_B,getReductionAxes:()=>Bl,getReshaped:()=>BB,getReshapedPermuted:()=>VB,getRowPartitionTypesHelper:()=>PB,getSliceBeginCoords:()=>WB,getSliceSize:()=>UB,getSparseFillEmptyRowsIndicesDenseShapeMismatch:()=>fz,getSparseFillEmptyRowsNegativeIndexErrorMessage:()=>hz,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:()=>gz,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:()=>bz,getSparseReshapeInputOutputMismatchErrorMessage:()=>wz,getSparseReshapeInputOutputMultipleErrorMessage:()=>yz,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:()=>xz,getSparseReshapeNegativeOutputDimErrorMessage:()=>Cz,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:()=>kz,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:()=>Sz,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:()=>vz,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:()=>Iz,getUndoAxesPermutation:()=>uP,isIdentityPermutation:()=>pz,log:()=>lA,mergeRealAndImagArrays:()=>ZB,prepareAndValidate:()=>Sw,prepareSplitSize:()=>dz,segment_util:()=>Wg,shouldFuse:()=>ya,slice_util:()=>ee,splitRealAndImagArrays:()=>JB,stridesOrDilationsArePositive:()=>Jo,tupleValuesAreOne:()=>na,upcastType:()=>Lt,validateDefaultValueShape:()=>OB,validateInput:()=>Pu,validateUpdateShape:()=>Ng,warn:()=>jo});function DB(o,t){let e=o[0].length;o.forEach((n,s)=>{T(n.length===e,()=>`Error in concat${e}D: rank of tensors[${s}] must be the same as the rank of the rest (${e})`)}),T(t>=0&&t<e,()=>`Error in concat${e}D: axis must be between 0 and ${e-1}.`);let r=o[0];o.forEach((n,s)=>{for(let i=0;i<e;i++)T(i===t||n[i]===r[i],()=>`Error in concat${e}D: Shape of tensors[${s}] (${n}) does not match the shape of the rest (${r}) along the non-concatenated axis ${s}.`)})}function AB(o,t){let e=o[0].slice();for(let r=1;r<o.length;r++)e[t]+=o[r][t];return e}var or;(function(o){o[o.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",o[o.VALUE_ROWIDS=1]="VALUE_ROWIDS",o[o.ROW_LENGTHS=2]="ROW_LENGTHS",o[o.ROW_SPLITS=3]="ROW_SPLITS",o[o.ROW_LIMITS=4]="ROW_LIMITS",o[o.ROW_STARTS=5]="ROW_STARTS"})(or||(or={}));function FB(o,t,e){let r=new Array;if(e==null&&t==null)return r;if(t==null)for(;r.length<o+e.length;)r.push(-1);else r=t.slice();if(e==null)return r;if(o+e.length!==r.length)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${o+e.length}, but shape.rank = ${r.length}`);for(let n=1;n<e.length;++n){let s=e[n],i=r[r.length-e.length+n],a=r[i];if(s>=0)if(a>=0){if(a!==s)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${n+o}] = ${s} but shape[${n+o}] = ${a}`)}else r[i]=s}return r}function PB(o){let t={FIRST_DIM_SIZE:or.FIRST_DIM_SIZE,VALUE_ROWIDS:or.VALUE_ROWIDS,ROW_LENGTHS:or.ROW_LENGTHS,ROW_SPLITS:or.ROW_SPLITS,ROW_LIMITS:or.ROW_LIMITS,ROW_STARTS:or.ROW_STARTS},e=[];for(let r of o)if(r in t)e.push(t[r]);else break;return e}function _B(o){return o.length===0?0:o[0]===or.FIRST_DIM_SIZE?o.length-1:o.length}function OB(o,t){if(o==null||t==null)return;let e=o.length,r=t.length;if(e>=r)throw new Error(`defaultValue.shape=${o} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${e} must be less than ragged tensor input flatValues.rank = ${r})`);for(let n=0;n<Math.min(e,r-1);++n){let s=o[n],i=t[n+1];if(s>=0&&i>=0&&s!==1&&s!==i)throw new Error(`defaultValue.shape=${o}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${n-o.length}] = ${s} but ragged tensor input.flatValues.shape[${n-o.length}] = ${i}`)}}var up=30;function MB(o){return o<=up?o:ja(o,Math.floor(Math.sqrt(o)))}function LB(o,t,e){let r=e*(typeof o=="number"?o:o[0]),n=t*(typeof o=="number"?o:o[1]);return[r,n]}function BB(o,t,e,r=!0){let n=[];if(r)n=n.concat(t.slice(0)),n.push(o[0]/e),n=n.concat(o.slice(1));else{n=n.concat(o[0]);let s=t.length;for(let i=0;i<s;++i)n=n.concat([o[i+1]/t[i],t[i]]);n=n.concat(o.slice(s+1))}return n}function zB(o,t,e=!0){let r=[];if(e){r.push(t);for(let n=t+1;n<o;++n)n<=2*t?(r.push(n),r.push(n-(t+1))):r.push(n)}else{let n=[],s=[];for(let i=1;i<o;++i)i>=t*2+1||i%2===1?s.push(i):n.push(i);r.push(...n),r.push(0),r.push(...s)}return r}function VB(o,t,e,r=!0){let n=[];r?n.push(o[0]/e):n.push(o[0]*e);for(let s=1;s<o.length;++s)s<=t.length?r?n.push(t[s-1]*o[s]):n.push(o[s]/t[s-1]):n.push(o[s]);return n}function WB(o,t){let e=[0];for(let r=0;r<t;++r)e.push(o[r][0]);return e}function UB(o,t,e){let r=o.slice(0,1);for(let n=0;n<e;++n)r.push(o[n+1]-t[n][0]-t[n][1]);return r}var GB=1.7580993408473768,HB=1.0507009873554805;var KB=.3275911,qB=.254829592,XB=-.284496736,jB=1.421413741,YB=-1.453152027,QB=1.061405429;function ZB(o,t){if(o.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${o.length}, imag: ${t.length}.`);let e=new Float32Array(o.length*2);for(let r=0;r<e.length;r+=2)e[r]=o[r/2],e[r+1]=t[r/2];return e}function JB(o){let t=new Float32Array(o.length/2),e=new Float32Array(o.length/2);for(let r=0;r<o.length;r+=2)t[r/2]=o[r],e[r/2]=o[r+1];return{real:t,imag:e}}function tz(o){let t=Math.ceil(o.length/4),e=new Float32Array(t),r=new Float32Array(t);for(let n=0;n<o.length;n+=4)e[Math.floor(n/4)]=o[n],r[Math.floor(n/4)]=o[n+1];return{real:e,imag:r}}function ez(o){let t=Math.floor(o.length/4),e=new Float32Array(t),r=new Float32Array(t);for(let n=2;n<o.length;n+=4)e[Math.floor(n/4)]=o[n],r[Math.floor(n/4)]=o[n+1];return{real:e,imag:r}}function oz(o,t){let e=o[t*2],r=o[t*2+1];return{real:e,imag:r}}function rz(o,t,e,r){o[r*2]=t,o[r*2+1]=e}function nz(o,t){let e=new Float32Array(o/2),r=new Float32Array(o/2);for(let n=0;n<Math.ceil(o/2);n++){let s=(t?2:-2)*Math.PI*(n/o);e[n]=Math.cos(s),r[n]=Math.sin(s)}return{real:e,imag:r}}function sz(o,t,e){let r=(e?2:-2)*Math.PI*(o/t),n=Math.cos(r),s=Math.sin(r);return{real:n,imag:s}}var Vg="->",iz=/->/g,Fw=",",Pw="...";function az(o,t){o=o.replace(/\s/g,"");let e=(o.length-o.replace(iz,"").length)/Vg.length;if(e<1)throw new Error("Equations without an arrow are not supported.");if(e>1)throw new Error(`Equation must contain exactly one arrow ("${Vg}").`);let[r,n]=o.split(Vg);T(r.indexOf(Pw)===-1,()=>`The ellipsis notation ("${Pw}") is not supported yet.`);let s=r.split(Fw),i=s.length;if(t!==i)throw new Error(`Expected ${i} input tensors, received ${t}`);if(i>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");let a=[];for(let m=0;m<n.length;++m){let d=n[m];if(!s.some(f=>f.indexOf(d)!==-1))throw new Error(`Output subscripts contain the label ${d} not present in the input subscripts.`);a.indexOf(d)===-1&&a.push(d)}for(let m=0;m<r.length;++m){let d=r[m];a.indexOf(d)===-1&&d!==Fw&&a.push(d)}let u=new Array(s.length);for(let m=0;m<i;++m){if(new Set(s[m].split("")).size!==s[m].length)throw new Error(`Found duplicate axes in input component ${s[m]}. Support for duplicate axes in input is not implemented yet.`);u[m]=[];for(let d=0;d<s[m].length;++d)u[m].push(a.indexOf(s[m][d]))}let c=a.length,l=n.length,p=[];for(let m=l;m<c;++m)p.push(m);return{allDims:a,summedDims:p,idDims:u}}function uz(o,t){let e=new Array(o);e.fill(-1);for(let n=0;n<t.length;++n)e[t[n]]=n;let r=[];for(let n=0;n<o;++n)e[n]===-1&&r.push(n);return e=e.filter(n=>n!==-1),{permutationIndices:e,expandDims:r}}function cz(o,t,e){let r=new Array(o);for(let n=0;n<e.length;++n){let s=e[n].shape;for(let i=0;i<t[n].length;++i)r[t[n][i]]===void 0?r[t[n][i]]=s[i]:T(r[t[n][i]]===s[i],()=>`Expected dimension ${r[t[n][i]]} at axis ${i} of input shaped ${JSON.stringify(s)}, but got dimension ${s[i]}`)}}function lz(o,t){let e=o,r=[],n=0;o.length===0&&e.push(-1),n=o.length+1;for(let i=0;i<n;++i)r.push([]);let s=[];for(let i=0;i<e.length;++i){let a=e[i],u=mz(t,a);for(let c of u)s.indexOf(c)===-1&&(r[i].push(c),s.push(c))}return{path:e,steps:r}}function pz(o){return o.every((t,e)=>t===e)}function mz(o,t){let e=[];for(let r=0;r<o.length;++r)(o[r].length===0||o[r].indexOf(t)!==-1||t===-1)&&e.push(r);return e}function dz(o,t,e=0){let r=[];if(typeof t=="number")T(o.shape[e]%t===0,()=>"Number of splits must evenly divide the axis."),r=new Array(t).fill(o.shape[e]/t);else{let n=t.reduce((i,a)=>(a===-1&&(i+=1),i),0);T(n<=1,()=>"There should be only one negative value in split array.");let s=t.indexOf(-1);if(s!==-1){let i=t.reduce((a,u)=>u>0?a+u:a);t[s]=o.shape[e]-i}T(o.shape[e]===t.reduce((i,a)=>i+a),()=>"The sum of sizes must match the size of the axis dimension."),r=t}return r}function fz(o){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${o}`}function hz(o,t){return`indices(${o}, 0) is invalid: ${t} < 0`}function gz(o,t,e){return`indices(${o}, 0) is invalid: ${t} >= ${e}`}function xz(o,t){return`only one output dimension may be -1, not both ${o} and ${t}`}function Cz(o,t){return`size ${o} must be non-negative, not ${t}`}function bz(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function yz(o,t){let e=St(o),r=St(t);return`Input to reshape is a SparseTensor with ${e}
  dense values, but the requested shape requires a multiple of ${r}. inputShape=${o} outputShape= ${t}`}function wz(o,t){let e=St(o),r=St(t);return`Input to reshape is a tensor with ${e} dense values, but the requested shape has ${r}. inputShape=${o} outputShape=${t}`}function Sz(){return"segment ids must be >= 0"}function vz(){return"segment ids are not increasing"}function Iz(o,t){return`Segment id ${o} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function kz(o,t,e){return`Bad: indices[${o}] == ${t} out of range [0, ${e})`}var Wg={};Ae(Wg,{collectGatherOpShapeInfo:()=>Nz,computeOutShape:()=>Tz,segOpComputeOptimalWindowSize:()=>$z});function $z(o,t){let e=!1,r;for(o<=up?(r=o,e=!0):r=ja(o,Math.floor(Math.sqrt(o)));!e;)r>t||r===o?e=!0:r=ja(o,r+1);return r}function Tz(o,t,e){let r=[],n=o.length;for(let s=0;s<n;s++)s!==t?r.push(o[s]):r.push(e);return r}function Nz(o,t,e,r){let n=t.shape.length,s=o.shape.length;if(r!==0&&(r<-n||r>n))throw new Error(`Expect batchDims in the range of [-${n}, ${n}], but got ${r}`);if(r<0&&(r+=n),r>s)throw new Error(`batchDims (${r}) must be less than rank(x) (
    ${s}).`);if(e<r)throw new Error(`batchDims (${r}) must be less than or equal to axis (${e}).`);for(let p=0;p<r;++p)if(o.shape[p]!==t.shape[p])throw new Error(`x.shape[${p}]: ${o.shape[p]} should be equal to indices.shape[${p}]: ${t.shape[p]}.`);let i=o.shape[e],a=[],u=1,c=1,l=1;for(let p=0;p<r;++p)a.push(o.shape[p]),u*=o.shape[p];for(let p=r;p<e;p++)a.push(o.shape[p]),c*=o.shape[p];for(let p=r;p<n;p++)a.push(t.shape[p]);for(let p=e+1;p<s;p++)a.push(o.shape[p]),l*=o.shape[p];return{batchSize:u,sliceSize:l,outerSize:c,dimSize:i,outputShape:a}}function Ez(o){try{return o.map(t=>wu(t))}catch(t){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${t}`)}}function Rz(o){return o.map(t=>xi(t))}var de={};Ae(de,{nonMaxSuppressionV3Impl:()=>ep,nonMaxSuppressionV4Impl:()=>op,nonMaxSuppressionV5Impl:()=>rp,whereImpl:()=>Ql});sw();function H(o,t){Array.isArray(o)||(o=[o]),o.forEach(e=>{e!=null&&C.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the CPU backend.`)})}var Dz=de.whereImpl,Uc=class o extends No{nextDataId(){return o.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new mr(this,Be())}write(t,e,r){this.firstUse&&(this.firstUse=!1,D().get("IS_NODE")&&y.warn(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));let n={id:this.nextDataId()};return this.data.set(n,{values:t,dtype:r,refCount:1}),n}makeTensorInfo(t,e,r){let n;if(e==="string"&&r!=null&&r.length>0&&C.isString(r[0])){let s=r.map(i=>C.encodeString(i));n=this.write(s,t,e)}else n=this.write(r,t,e);return{dataId:n,shape:t,dtype:e}}refCount(t){return this.data.has(t)?this.data.get(t).refCount:0}incRef(t){let e=this.data.get(t);e.refCount++}decRef(t){if(this.data.has(t)){let e=this.data.get(t);e.refCount--}}move(t,e,r,n,s){this.data.set(t,{values:e,dtype:n,refCount:s})}numDataIds(){return this.data.numDataIds()}async read(t){return this.readSync(t)}readSync(t){let{dtype:e,complexTensorInfos:r}=this.data.get(t);if(e==="complex64"){let n=this.readSync(r.real.dataId),s=this.readSync(r.imag.dataId);return y.mergeRealAndImagArrays(n,s)}return C.convertBackendValuesAndArrayBuffer(this.data.get(t).values,e)}bufferSync(t){let e=this.readSync(t.dataId);if(t.dtype==="string")try{let r=e.map(n=>C.decodeString(n));return nt(t.shape,t.dtype,r)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return nt(t.shape,t.dtype,e)}makeOutput(t,e,r){return Be().makeTensorFromTensorInfo(this.makeTensorInfo(e,r,t),this)}disposeData(t,e=!1){if(this.data.has(t)){if(this.data.get(t).refCount--,!e&&this.data.get(t).refCount>0)return!1;let{complexTensorInfos:r}=this.data.get(t);r!=null&&(this.disposeData(r.real.dataId,!0),this.disposeData(r.imag.dataId,!0)),this.data.delete(t)}return!0}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}async time(t){let e=C.now();return t(),{kernelMs:C.now()-e}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(t){H([t],"where");let e=this.readSync(t.dataId);return Dz(t.shape,e)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};Uc.nextDataId=0;var qc={};Ae(qc,{addImpl:()=>Hg,bincountImpl:()=>Lu,bincountReduceImpl:()=>cp,bitwiseAndImpl:()=>Kg,castImpl:()=>Gg,ceilImpl:()=>qg,concatImpl:()=>lp,equalImpl:()=>Xg,expImpl:()=>Yg,expm1Impl:()=>Zg,floorDivImpl:()=>tx,floorImpl:()=>Jg,gatherNdImpl:()=>pp,gatherV2Impl:()=>mp,greaterEqualImpl:()=>ox,greaterImpl:()=>ex,lessEqualImpl:()=>nx,lessImpl:()=>rx,linSpaceImpl:()=>dp,logImpl:()=>sx,maxImpl:()=>fp,maximumImpl:()=>ix,minimumImpl:()=>ax,multiplyImpl:()=>Gc,negImpl:()=>ux,notEqualImpl:()=>cx,prodImpl:()=>lx,raggedGatherImpl:()=>hp,raggedRangeImpl:()=>gp,raggedTensorToTensorImpl:()=>xp,rangeImpl:()=>Cp,rsqrtImpl:()=>mx,scatterImpl:()=>Oo,sigmoidImpl:()=>mS,simpleAbsImpl:()=>Ug,sliceImpl:()=>fx,sparseFillEmptyRowsImpl:()=>bp,sparseReshapeImpl:()=>yp,sparseSegmentReductionImpl:()=>zu,sqrtImpl:()=>hS,squaredDifferenceImpl:()=>hx,staticRegexReplaceImpl:()=>gx,stridedSliceImpl:()=>wp,stringNGramsImpl:()=>Sp,stringSplitImpl:()=>vp,stringToHashBucketFastImpl:()=>Ip,subImpl:()=>Cx,tileImpl:()=>kp,topKImpl:()=>$p,transposeImpl:()=>Bu,uniqueImpl:()=>Tp});function Ug(o){let t=new Float32Array(o.length);for(let e=0;e<o.length;++e)t[e]=Math.abs(o[e]);return t}var Az=o=>{let{x:t}=o.inputs,e=o.backend;H(t,"abs");let r=new Float32Array(C.sizeFromShape(t.shape)),n=e.data.get(t.dataId).values;return r=Ug(n),e.makeOutput(r,t.shape,t.dtype)},Ow={kernelName:"Abs",backendName:"cpu",kernelFunc:Az};function vt(o){return(t,e,r,n,s)=>{let i=y.assertAndGetBroadcastShape(t,e),a=i.length,u=C.computeStrides(i),c=C.sizeFromShape(i),l=C.getTypedArrayFromDType(s,c),p=t.length,m=e.length,d=C.computeStrides(t),f=C.computeStrides(e),h=y.getBroadcastDims(t,i),g=y.getBroadcastDims(e,i);if(h.length+g.length===0)for(let x=0;x<l.length;++x)l[x]=o(r[x%r.length],n[x%n.length]);else for(let x=0;x<l.length;++x){let b=C.indexToLoc(x,a,u),w=b.slice(-p);h.forEach(E=>w[E]=0);let v=C.locToIndex(w,p,d),k=b.slice(-m);g.forEach(E=>k[E]=0);let N=C.locToIndex(k,m,f);l[x]=o(r[v],n[N])}return[l,i]}}function he(o){let{inputs:t,backend:e}=o,{real:r,imag:n}=t,s=e.data.get(r.dataId).values,i=e.data.get(n.dataId).values,a=e.makeTensorInfo(r.shape,"complex64"),u=e.data.get(a.dataId);return u.complexTensorInfos={real:e.makeTensorInfo(r.shape,"float32",s),imag:e.makeTensorInfo(n.shape,"float32",i)},a}var Mw={kernelName:Kn,backendName:"cpu",kernelFunc:he};function Ou(o,t,e="float32"){if(e==="complex64"){let n=Ou(o,t,"float32"),s=Ou(o,t,"float32");return he({inputs:{real:n,imag:s},backend:o})}let r=C.makeZerosTypedArray(C.sizeFromShape(t),e);return o.makeTensorInfo(t,e,r)}function Ee(o){let{inputs:t,backend:e}=o,{x:r}=t;return e.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}var Lw={kernelName:Ko,backendName:"cpu",kernelFunc:Ee};function wo(o){let{inputs:t,backend:e}=o,{input:r}=t,n=e.data.get(r.dataId).complexTensorInfos.real,s=e.data.get(n.dataId).values;return e.makeTensorInfo(n.shape,n.dtype,s)}var Bw={kernelName:Us,backendName:"cpu",kernelFunc:wo};function Gg(o,t,e,r){if(r==="int32"){let n=Int32Array.from(o);return[t,"int32",n]}if(r==="bool"){let n=C.toTypedArray([0],e),[s,i]=vt((a,u)=>a!==u?1:0)(t,[],o,n,"bool");return[i,"bool",s]}throw new Error(`Error in Cast: failed to cast ${e} to ${r}`)}function So(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{dtype:s}=r;if(s==="complex64"){if(n.dtype==="complex64")return Ee({inputs:{x:n},backend:e});let l=Ou(e,n.shape,n.dtype),p=So({inputs:{x:n},backend:e,attrs:{dtype:"float32"}}),m=he({inputs:{real:p,imag:l},backend:e});return e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(p),m}if(n.dtype==="complex64"){let l=wo({inputs:{input:n},backend:e}),p=So({inputs:{x:l},backend:e,attrs:{dtype:s}});return e.disposeIntermediateTensorInfo(l),p}if(!C.hasEncodingLoss(n.dtype,s)){let l=Ee({inputs:{x:n},backend:e});return{dataId:l.dataId,shape:l.shape,dtype:s}}let i=e.data.get(n.dataId).values,[a,u,c]=Gg(i,n.shape,n.dtype,s);return e.makeTensorInfo(a,u,c)}var zw={kernelName:Ho,backendName:"cpu",kernelFunc:So};function Nt(o,t,e,r){return e==null?({inputs:n,backend:s})=>{let{a:i,b:a}=n,u=s;H([i,a],o);let c=u.data.get(i.dataId).values,l=u.data.get(a.dataId).values,p=i.dtype==="string"?y.fromUint8ToStringArray(c):c,m=i.dtype==="string"?y.fromUint8ToStringArray(l):l,d=r||i.dtype,[f,h]=t(i.shape,a.shape,p,m,d);return u.makeTensorInfo(h,d,f)}:({inputs:n,backend:s})=>{let{a:i,b:a}=n,u=s;if(i.dtype==="complex64"||a.dtype==="complex64"){let c=So({inputs:{x:i},backend:u,attrs:{dtype:"complex64"}}),l=u.data.get(c.dataId),p=l.complexTensorInfos.real,m=l.complexTensorInfos.imag,d=u.data.get(p.dataId).values,f=u.data.get(m.dataId).values,h=So({inputs:{x:a},backend:u,attrs:{dtype:"complex64"}}),g=u.data.get(h.dataId),x=g.complexTensorInfos.real,b=g.complexTensorInfos.imag,w=u.data.get(x.dataId).values,v=u.data.get(b.dataId).values,[k,N,E]=e(i.shape,a.shape,d,f,w,v),R=u.makeTensorInfo(E,"float32",k),A=u.makeTensorInfo(E,"float32",N),F=he({inputs:{real:R,imag:A},backend:u});return u.disposeIntermediateTensorInfo(c),u.disposeIntermediateTensorInfo(h),u.disposeIntermediateTensorInfo(R),u.disposeIntermediateTensorInfo(A),F}else{let c=u.data.get(i.dataId).values,l=u.data.get(a.dataId).values,p=r||i.dtype,[m,d]=t(i.shape,a.shape,c,l,p);return u.makeTensorInfo(d,p,m)}}}function Mu(o){return(t,e,r,n,s,i)=>{let a=y.assertAndGetBroadcastShape(t,e),u=C.sizeFromShape(a),c=a.length,l=C.computeStrides(a),p=C.getTypedArrayFromDType("float32",u),m=C.getTypedArrayFromDType("float32",u),d=y.getBroadcastDims(t,a),f=y.getBroadcastDims(e,a),h=y.mergeRealAndImagArrays(r,n),g=y.mergeRealAndImagArrays(s,i),x=t.length,b=C.computeStrides(t),w=e.length,v=C.computeStrides(e);if(d.length+f.length===0)for(let k=0;k<p.length;k++){let N=k%h.length,E=k%g.length,R=o(h[N*2],h[N*2+1],g[E*2],g[E*2+1]);p[k]=R.real,m[k]=R.imag}else for(let k=0;k<p.length;k++){let N=C.indexToLoc(k,c,l),E=N.slice(-x);d.forEach(_=>E[_]=0);let R=C.locToIndex(E,x,b),A=N.slice(-w);f.forEach(_=>A[_]=0);let F=C.locToIndex(A,w,v),P=o(h[R*2],h[R*2+1],g[F*2],g[F*2+1]);p[k]=P.real,m[k]=P.imag}return[p,m,a]}}var Hg=vt(((o,t)=>o+t)),Fz=Mu(((o,t,e,r)=>({real:o+e,imag:t+r}))),rr=Nt("Add",Hg,Fz),Vw={kernelName:"Add",backendName:"cpu",kernelFunc:rr};function Lu(o,t,e,r,n){let s=C.sizeFromShape(r),i=C.makeZerosTypedArray(n,e);for(let a=0;a<o.length;a++){let u=o[a];if(u<0)throw new Error("Input x must be non-negative!");u>=n||(s>0?i[u]+=t[a]:i[u]+=1)}return i}function cp(o,t,e,r=!1){let n=o.shape[0],s=o.shape[1],i=nt([n,e],t.dtype);for(let a=0;a<n;a++)for(let u=0;u<s;u++){let c=o.get(a,u);if(c<0)throw new Error("Input x must be non-negative!");c>=e||(r?i.set(1,a,c):t.size>0?i.set(i.get(a,c)+t.get(a,u),a,c):i.set(i.get(a,c)+1,a,c))}return i}var Kg=vt(((o,t)=>o&t)),Pz=Nt(Vi,Kg),Ww={kernelName:Vi,backendName:"cpu",kernelFunc:Pz};function Ce(o){return(t,e,r)=>{let n=C.getArrayFromDType(e,t.length);for(let s=0;s<t.length;++s)n[s]=o(t[s],r);return n}}function dt(o,t,e){let r=Ce(t);return Ue(o,r,e)}function Ue(o,t,e){return({inputs:r,attrs:n,backend:s})=>{let{x:i}=r;H(i,o);let a=s,u=a.data.get(i.dataId).values,c;if(i.dtype==="string"){if(!Array.isArray(u))throw new Error("String tensor's value was not an instance of Array");c=y.fromUint8ToStringArray(u)}else c=u;let l=e||i.dtype,p=t(c,l,n);return a.makeTensorInfo(i.shape,l,p)}}var qg=Ce(o=>Math.ceil(o)),_z=Ue(wr,qg),Uw={kernelName:wr,backendName:"cpu",kernelFunc:_z};function lp(o,t,e,r){let n=C.getArrayFromDType(e,C.sizeFromShape(t));if(r&&e!=="string"){let s=0;o.forEach(i=>{let a=C.sizeFromShape(i.shape);n.set(i.vals,s),s+=a})}else{let s=0;o.forEach(i=>{let a=e==="string"?y.fromUint8ToStringArray(i.vals):i.vals,u=0;for(let c=0;c<i.shape[0];++c){let l=c*t[1]+s;for(let p=0;p<i.shape[1];++p)n[l+p]=a[u++]}s+=i.shape[1]})}return n}var Xg=vt((o,t)=>o===t?1:0),jg=Nt(kr,Xg,null,"bool"),Gw={kernelName:kr,backendName:"cpu",kernelFunc:jg};var Yg=Ce(o=>Math.exp(o)),Qg=Ue("Exp",Yg,"float32"),Hw={kernelName:"Exp",backendName:"cpu",kernelFunc:Qg};var Zg=Ce(o=>Math.expm1(o)),Oz=Ue($r,Zg),Kw={kernelName:$r,backendName:"cpu",kernelFunc:Oz};var Jg=Ce(o=>Math.floor(o)),Mz=Ue(Tr,Jg),qw={kernelName:Tr,backendName:"cpu",kernelFunc:Mz};var tx=vt((o,t)=>Math.floor(o/t)),Lz=Nt(Nr,tx,null,"int32"),Xw={kernelName:Nr,backendName:"cpu",kernelFunc:Lz};function pp(o,t,e,r,n,s,i,a,u){let c=nt([r,s],e);for(let l=0;l<r;l++){let p=[],m=0;for(let d=0;d<n;d++){let f=o[l*n+d];m+=f*i[d],p.push(f)}if(m<0||m>=u/s)throw new Error(`Invalid indices: ${p} does not index into ${a}`);for(let d=0;d<s;d++)c.values[l*s+d]=t.get(...t.indexToLoc(m*s+d))}return c}function mp(o,t,e){let r=nt(e,o.dtype);for(let n=0;n<r.size;++n){let i=r.indexToLoc(n).slice(),a=i[0],u=i[2],c=t.locToIndex([a,u]);i[2]=t.values[c];let l=o.locToIndex(i);0<=l&&l<o.values.length&&(r.values[n]=o.values[l])}return r}var ex=vt((o,t)=>o>t?1:0),Bz=Nt(Er,ex,null,"bool"),jw={kernelName:Er,backendName:"cpu",kernelFunc:Bz};var ox=vt((o,t)=>o>=t?1:0),zz=Nt(Rr,ox,null,"bool"),Yw={kernelName:Rr,backendName:"cpu",kernelFunc:zz};var rx=vt((o,t)=>o<t?1:0),Vz=Nt(Pr,rx,null,"bool"),Qw={kernelName:Pr,backendName:"cpu",kernelFunc:Vz};var nx=vt((o,t)=>o<=t?1:0),Wz=Nt(_r,nx,null,"bool"),Zw={kernelName:_r,backendName:"cpu",kernelFunc:Wz};function dp(o,t,e){let r=(t-o)/(e-1),n=C.makeZerosTypedArray(e,"float32");n[0]=o;for(let s=1;s<n.length;s++)n[s]=n[s-1]+r;return n}var sx=Ce(o=>Math.log(o)),Uz=Ue("Log",sx),Jw={kernelName:"Log",backendName:"cpu",kernelFunc:Uz};function fp(o,t,e,r){let n=C.getTypedArrayFromDType(r,C.sizeFromShape(e));for(let s=0;s<n.length;++s){let i=s*t,a=o[i];for(let u=0;u<t;++u){let c=o[i+u];(Number.isNaN(c)||c>a)&&(a=c)}n[s]=a}return n}var ix=vt(((o,t)=>Math.max(o,t))),Gz=Nt(zr,ix),tS={kernelName:zr,backendName:"cpu",kernelFunc:Gz};var ax=vt(((o,t)=>Math.min(o,t))),Hz=Nt(Vr,ax),eS={kernelName:Vr,backendName:"cpu",kernelFunc:Hz};var Gc=vt(((o,t)=>o*t)),Kz=Mu(((o,t,e,r)=>({real:o*e-t*r,imag:o*r+t*e}))),Na=Nt(Wr,Gc,Kz),oS={kernelName:Wr,backendName:"cpu",kernelFunc:Na};function ux(o,t,e){let r=C.createScalarValue(-1,e);return Gc([],t,r,o,e)}function qz(o){let{inputs:t,backend:e}=o,{x:r}=t;H(r,"neg");let n=e.data.get(r.dataId).values,[s,i]=ux(n,r.shape,r.dtype);return e.makeTensorInfo(i,r.dtype,s)}var rS={kernelName:"Neg",backendName:"cpu",kernelFunc:qz};var cx=vt(((o,t)=>o!==t?1:0)),Xz=Nt(Ur,cx,null,"bool"),nS={kernelName:Ur,backendName:"cpu",kernelFunc:Xz};function Bu(o,t,e,r,n){let s=t.length,i=C.sizeFromShape(t),a=C.computeStrides(t),u=C.computeStrides(n),c=C.getTypedArrayFromDType(e,C.sizeFromShape(n));for(let l=0;l<i;++l){let p=C.indexToLoc(l,s,a),m=new Array(p.length);for(let f=0;f<m.length;f++)m[f]=p[r[f]];let d=C.locToIndex(m,s,u);c[d]=o[l]}return c}function Yt(o){let{inputs:t,attrs:e,backend:r}=o,{x:n}=t,{perm:s}=e;H(n,"transpose");let i=n.shape.length,a=new Array(i);for(let p=0;p<a.length;p++)a[p]=n.shape[s[p]];let u=r.data.get(n.dataId).values,c=Bu(u,n.shape,n.dtype,s,a);return{dataId:r.write(c,a,n.dtype),shape:a,dtype:n.dtype}}var sS={kernelName:Xo,backendName:"cpu",kernelFunc:Yt};function lx(o,t,e,r){let[n,s]=y.computeOutAndReduceShapes(o,r),i=Lt(t,"int32"),a=C.makeZerosTypedArray(C.sizeFromShape(n),i),u=C.sizeFromShape(s);for(let c=0;c<a.length;++c){let l=c*u,p=1;for(let m=0;m<u;++m)p*=e[l+m];a[c]=p}return{outVals:a,outShape:n,outDtype:i}}function jz(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;H(n,"prod");let a=n.shape.length,u=C.parseAxisParam(s,n.shape),c=y.getAxesPermutation(u,a),l=u,p=n,m=[];c!=null&&(p=Yt({inputs:{x:n},backend:e,attrs:{perm:c}}),m.push(p),l=y.getInnerMostAxes(l.length,a));let d=e.data.get(p.dataId).values,{outVals:f,outShape:h,outDtype:g}=lx(p.shape,p.dtype,d,l),x=h;return i&&(x=y.expandShapeToKeepDim(h,u)),m.forEach(b=>e.disposeIntermediateTensorInfo(b)),e.makeTensorInfo(x,g,f)}var iS={kernelName:Vs,backendName:"cpu",kernelFunc:jz};function Yz(o,t,e){o.forEach((r,n)=>{if(r<0||r>=e){let s=C.indexToLoc(n,t.length,C.computeStrides(t)).join(",");throw new Error(`indices[${s}] = ${r} is not in [0, ${e})`)}})}function Qz(o,t){for(let e=0;e<o.length;++e){let r=o[e],n=e===o.length-1?t:o[e+1].length;if(r.length===0)throw new Error("Ragged splits may not be empty");if(r[0]<0)throw new Error("Ragged splits must be non-negative");if(r[r.length-1]>n)throw new Error("Ragged splits must not point past values");for(let s=1;s<r.length;++s)if(r[s-1]>r[s])throw new Error("Ragged splits must be sorted in ascending order")}}function Zz(o,t,e,r){let n=[],s=0,i=t.length-1+e.length,a=new Array(i).fill(null).map(()=>[0]);Qz(e,r);let u=1;for(let c=0;c<t.length-1;++c){u*=t[c];let l=t[c+1];for(let p=1;p<u+1;++p)a[c].push(p*l)}for(let c=0;c<o.length;++c){let l=o[c],p=o[c]+1;for(let m=0;m<e.length;++m){let d=e[m],f=m+t.length-1;if(f>=0){let h=a[f],g=h[h.length-1]-d[l];for(let x=l;x<p;++x)a[f].push(d[x+1]+g)}l=d[l],p=d[p]}p!==l&&(n.push([l,p]),s+=p-l)}return{outSplits:a,valueSlices:n,numValues:s}}function Jz(o){let t=[];for(let e=0;e<o.length;++e){let r=o[e].length,n=C.getArrayFromDType("int32",r);t.push(n),o[e].forEach((s,i)=>n[i]=s)}return t}function aS(o,t){let e=o.slice(0,t);for(;e.length<t;)e.push(1);for(let r=t;r<o.length;r++)e[t-1]*=o[r];return e}function tV(o,t,e,r,n,s){let i=aS(t,2)[1],a=aS(s,2)[1],u=0;for(let c of e)for(let l=c[0];l<c[1];++l){for(let p=0;p<r;++p)n[u*a+p]=o[l*i+p];++u}}function eV(o,t,e,r,n){let s=t.slice();s[0]=n;let i=C.getArrayFromDType(e,C.sizeFromShape(s)),a=o.length,u=a===0?0:a/t[0];return tV(o,t,r,u,i,s),[i,s]}function hp(o,t,e,r,n,s,i,a){if(o.length===0)throw new Error("paramsNestedSplits must be non empty");if(t[0].length===0)throw new Error("Split tensors must not be scalars");let u=t[0][0]-1;if(Yz(s,i,u),r.length===0)throw new Error("params.rank must be nonzero");let c=r[0],{outSplits:l,valueSlices:p,numValues:m}=Zz(s,i,o,c),d=Jz(l),f=eV(e,r,n,p,m);return[d,f[0],f[1]]}var uS=2147483647;function gp(o,t,e,r,n,s,i){if(t.length>1)throw new Error("starts must be a scalar or vector");if(n.length>1)throw new Error("limits must be a scalar or vector");if(i.length>1)throw new Error("deltas must be a scalar or vector");let a=t.length===0,u=n.length===0,c=i.length===0,l=[];a||l.push(t[0]),u||l.push(n[0]),c||l.push(i[0]);for(let g=1;g<l.length;++g)if(l[g]!==l[g-1])throw new Error("starts, limits, and deltas must have the same shape");let p=l.length===0?1:l[0],m=C.getArrayFromDType("int32",p+1);m[0]=0;for(let g=0;g<p;++g){let x=a?o[0]:o[g],b=u?r[0]:r[g],w=c?s[0]:s[g];if(w===0)throw new Error("Requires delta != 0");let v;if(w>0&&b<x||w<0&&b>x)v=0;else if(v=Math.ceil(Math.abs((b-x)/w)),v>uS)throw new Error(`Requires ((limit - start) / delta) <= ${uS}`);m[g+1]=m[g]+v}let d=m[p],f=C.getArrayFromDType(e,d),h=0;for(let g=0;g<p;++g){let x=m[g+1]-m[g],b=a?o[0]:o[g],w=c?s[0]:s[g];for(let v=0;v<x;++v)f[h++]=b,b+=w}return[m,f]}var vo=y.RowPartitionType,px=class o{constructor(t,e,r,n,s,i,a,u,c,l){this.shape=t,this.shapeShape=e,this.values=r,this.valuesShape=n,this.valuesDType=s,this.defaultValue=i,this.defaultValueShape=a,this.rowPartitionValues=u,this.rowPartitionValuesShapes=c,this.rowPartitionTypes=y.getRowPartitionTypesHelper(l),this.raggedRank=y.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(t){return this.rowPartitionTypes[0]===vo.FIRST_DIM_SIZE?this.rowPartitionTypes[t+1]:this.rowPartitionTypes[t]}getRowPartitionTensor(t){return this.rowPartitionTypes[0]===vo.FIRST_DIM_SIZE?this.rowPartitionValues[t+1]:this.rowPartitionValues[t]}getMaxWidth(t){let e=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case vo.VALUE_ROWIDS:return o.getMaxWidthValueRowID(e);case vo.ROW_SPLITS:return o.getMaxWidthRowSplit(e);default:throw new Error(`Cannot handle partition type ${vo[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(t){let e=t.length;if(e===0||e===1)return 0;let r=0;for(let n=0;n<e-1;++n){let s=t[n+1]-t[n];s>r&&(r=s)}return r}static getMaxWidthValueRowID(t){let e=t.length;if(e===0)return 0;let r=0,n=t[0],s=0;for(let i=1;i<e;++i){let a=t[i];a!==n&&(n=a,s=Math.max(i-r,s),r=i)}return Math.max(e-r,s)}tensorShapeFromTensor(t,e,r=!0){if(e.length===0){if(t[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return lS(t,r)}calculateOutputSize(t){let e=this.valuesShape,r=this.defaultValueShape;y.validateDefaultValueShape(r,e);let n=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=y.combineRaggedTensorToTensorShapes(this.raggedRank,n,e);i[0]<0&&(i[0]=t);for(let a=1;a<=this.raggedRank;++a)i[a]<0&&(i[a]=this.getMaxWidth(a));return i}calculateFirstParentOutputIndex(t,e,r){let n=Math.min(t,r),s=[],i=0;for(let a=0;a<n;++a,i+=e)s.push(i);for(let a=n;a<t;++a)s.push(-1);return C.assert(s.length===t,()=>"Final length of result must be equal to firstDimension."),s}calculateOutputIndexRowSplit(t,e,r,n){let s=t.length,i=[];for(let a=0;a<s-1;++a){let u=t[a+1]-t[a],c=Math.min(n,u),l=e[a];l===-1&&(c=0);for(let p=0;p<c;++p)i.push(l),l+=r;for(let p=0;p<u-c;++p)i.push(-1)}if(s>0&&i.length!==t[s-1])throw new Error("Invalid row split size.");return i}calculateOutputIndexValueRowID(t,e,r,n){let s=t.length,i=[];if(s===0)return[];let a=0,u=t[0];if(u>=e.length)throw new Error(`Got currentValueRowId=${u}, which is not less than ${e.length}`);let c=e[u];i.push(c);for(let l=1;l<s;++l){let p=t[l];if(p===u)c>=0&&(++a,a<n?c+=r:c=-1);else{if(a=0,u=p,p>=e.length)throw new Error(`Got nextValueRowId=${p} which is not less than ${e.length}`);c=e[p]}i.push(c)}if(i.length!==t.length)throw new Error("Invalid row ids.");return i}calculateOutputIndex(t,e,r,n){let s=this.getRowPartitionTensor(t),i=this.getRowPartitionTypeByDimension(t);switch(i){case vo.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(s,e,r,n);case vo.ROW_SPLITS:if(s.length-1>e.length)throw new Error(`Row partition size is greater than output size: ${s.length-1} > ${e.length}`);return this.calculateOutputIndexRowSplit(s,e,r,n);default:throw new Error(`Unsupported partition type: ${vo[i]}`)}}getFirstDimensionSize(){let t=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");let e=this.rowPartitionTypes[0];switch(e){case vo.FIRST_DIM_SIZE:return t[0];case vo.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case vo.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${vo[e]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");let e=this.getFirstDimensionSize(),r=this.calculateOutputSize(e),n=new Array(this.raggedRank+1);n[n.length-1]=1;for(let u=n.length-2;u>=0;--u)n[u]=n[u+1]*r[u+1];let s=lS(r,!1),i=C.getArrayFromDType(this.valuesDType,C.sizeFromShape(s));if(n[0]*r[0]>0){let u=this.calculateFirstParentOutputIndex(e,n[0],r[0]);for(let c=1;c<=this.raggedRank;++c)u=this.calculateOutputIndex(c-1,u,n[c],r[c]);this.setOutput(this.raggedRank,u,i,s)}return[s,i]}setOutput(t,e,r,n){if(r.length===0)return;let s=this.values,i=r,a=n.slice();a=a.slice(t+1);let u=C.sizeFromShape(a),c=e.length,l=this.defaultValue;if(l.length!==u&&l.length!==1){let f=this.defaultValueShape;Bt(()=>{let h=V(l,f);l=aa(h,a).dataSync()})}let p=0,m=0,d=0;for(let f=0;f<=c;++f){let h=f<c?e[f]:-1;if(h===d){++d;continue}if(m<d){let g=s.subarray(p*u),x=i.subarray(m*u),b=(d-m)*u;cS(x,g,b)}if(f>=c){let g=r.length;h=Math.floor(g/u)}if(h>d)if(this.defaultValue.length===1)i.subarray(d*u,h*u).fill(this.defaultValue[0]),d=h;else for(;h>d;){let g=i.slice(d*u);cS(g,l,u),++d}h<0?(p=f+1,m=d):(p=f,m=d,d=m+1)}}};function cS(o,t,e){for(let r=0;r<e;r++)o[r]=t[r]}function lS(o,t){let e=[];for(let r of o){if(r<0){if(!t)throw new Error(`Dimension ${r} must be >= 0`);if(r<-1)throw new Error(`Dimension ${r} must be >= -1`);r=-1}e.push(r)}return e}function xp(o,t,e,r,n,s,i,a,u,c){return new px(o,t,e,r,n,s,i,a,u,c).compute()}function Cp(o,t,e,r){let n=o===t,s=o<t&&e<0,i=t<o&&e>1;if(n||s||i)return C.makeZerosTypedArray(0,r);let a=Math.abs(Math.ceil((t-o)/e)),u=C.makeZerosTypedArray(a,r);t<o&&e===1&&(e=-1),u[0]=o;for(let c=1;c<u.length;c++)u[c]=u[c-1]+e;return u}var mx=Ce(o=>1/Math.sqrt(o)),oV=Ue(Xr,mx),pS={kernelName:Xr,backendName:"cpu",kernelFunc:oV};function Oo(o,t,e,r,n,s,i,a,u,c){let l=[r/n,n],p=o.values,m=t.values;if(r===0)return nt(e,t.dtype);let d=u instanceof Dt?u:nt(l,t.dtype);typeof u=="string"||typeof u=="number"?d.values.fill(u):typeof u=="boolean"&&d.values.fill(+u);for(let f=0;f<s;f++){let h=[],g=0;for(let x=0;x<i;x++){let b=p[f*i+x];h.push(b),g+=b*a[x]}if(g<0||g>=r/n)throw new Error(`Invalid indices: ${h} does not index into ${e}`);for(let x=0;x<n;x++)c?d.values[g*n+x]+=m[f*n+x]:d.values[g*n+x]=t.rank===0?m[0]:m[f*n+x]}return d}var mS=Ce(o=>1/(1+Math.exp(-o))),dx=dt(Zr,o=>1/(1+Math.exp(-o))),dS={kernelName:Zr,backendName:"cpu",kernelFunc:dx};function fx(o,t,e,r,n){let s=ee.isSliceContinous(r,t,e),i=C.sizeFromShape(e),a=C.computeStrides(r);if(s){let p=ee.computeFlatOffset(t,a);return n==="string"?o.slice(p,p+i):o.subarray(p,p+i)}let u=n==="string"?y.fromUint8ToStringArray(o):o,c=nt(r,n,u),l=nt(e,n);for(let p=0;p<l.size;++p){let m=l.indexToLoc(p),d=m.map((f,h)=>f+t[h]);l.set(c.get(...d),...m)}return n==="string"?y.fromStringArrayToUint8(l.values):l.values}function Io(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{begin:s,size:i}=r;H(n,"slice");let[a,u]=ee.parseSliceParams(n,s,i);ee.assertParamsValid(n,a,u);let c=e.data.get(n.dataId).values,l=fx(c,a,u,n.shape,n.dtype);return e.makeTensorInfo(u,n.dtype,l)}var fS={kernelName:Zs,backendName:"cpu",kernelFunc:Io};function bp(o,t,e,r,n,s,i){let a=t[0],u=s[0],c=new Array(u),l=new Array(a),p=t[1];if(u===0){if(a!==0)throw new Error(y.getSparseFillEmptyRowsIndicesDenseShapeMismatch(a));let g=C.getArrayFromDType(e,0),x=C.getArrayFromDType(n,0);return[g,[0,p],x,c,l]}let m=!0,d=0,f=new Array(u).fill(0);for(let g=0;g<a;++g){let x=o[g*p];if(x<0)throw new Error(y.getSparseFillEmptyRowsNegativeIndexErrorMessage(g,x));if(x>=u)throw new Error(y.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(g,x,u));++f[x],m=m&&x>=d,d=x}let h=!0;for(let g=0;g<u;++g){let x=f[g]===0;c[g]=x,h=h&&!x,f[g]=Math.max(f[g],1),g>0&&(f[g]+=f[g-1])}if(h&&m){let g=o,x=r;for(let b=0;b<a;++b)l[b]=b;return[g,[a,p],x,c,l]}else{let g=f[u-1],x=C.getArrayFromDType(e,g*p),b=C.getArrayFromDType(n,g),w=new Array(u).fill(0);for(let v=0;v<a;++v){let k=o[v*p],N=w[k],E=(k===0?0:f[k-1])+N;w[k]++;for(let R=0;R<p;++R)x[E*p+R]=o[v*p+R];b[E]=r[v],l[v]=E}for(let v=0;v<u;++v)if(w[v]===0){let N=v===0?0:f[v-1];x[N*p+0]=v;for(let E=1;E<p;++E)x[N*p+E]=0;b[N]=i}return[x,[g,p],b,c,l]}}function yp(o,t,e,r,n){let s=C.sizeFromShape(r),i=t[0],a=n.length,u=[],c=1,l=-1;for(let g=0;g<a;++g){let x=n[g];if(x===-1){if(l!==-1)throw new Error(y.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(l,g));l=g,u.push(1)}else{if(x<0)throw new Error(y.getSparseReshapeNegativeOutputDimErrorMessage(g,x));c*=x,u.push(x)}}if(l!==-1){if(c<=0)throw new Error(y.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let g=Math.trunc(s/c);if(c*g!==s)throw new Error(y.getSparseReshapeInputOutputMultipleErrorMessage(r,u));u[l]=g}if(C.sizeFromShape(u)!==s)throw new Error(y.getSparseReshapeInputOutputMismatchErrorMessage(r,u));let m=r.length,d=[];if(m>0){d[m-1]=1;for(let g=m-2;g>=0;--g)d[g]=d[g+1]*r[g+1]}let f=[];if(a>0){f[a-1]=1;for(let g=a-2;g>=0;--g)f[g]=f[g+1]*u[g+1]}let h=C.getArrayFromDType(e,i*a);for(let g=0;g<i;++g){let x=0;for(let b=0;b<m;++b)x+=o[g*m+b]*d[b];for(let b=0;b<a;++b)h[g*a+b]=Math.trunc(x/f[b]),x%=f[b]}return[h,[i,a],u]}function zu(o,t,e,r,n,s=!1,i=0){let a=r.length,u=[t[0],o.length/t[0]],c=u[1],p=a>0?n[a-1]+1:0;if(p<0)throw new Error(y.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let m=t.slice();m[0]=p;let d=m.reduce((w,v)=>w*v,1),f=C.getArrayFromDType(e,d);if(a===0)return p>0&&f.fill(i),[f,m];if(p<=0)throw new Error(y.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let h=0,g=1,x=0,b=n[h];for(;;){let w=0;if(g<a){if(w=n[g],b===w){++g;continue}if(b>=w)throw new Error(y.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(b<0||b>=p)throw new Error(y.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(b,p));b>x&&f.fill(i,x*c,b*c);for(let v=h;v<g;++v){let k=r[v];if(k<0||k>=u[0])throw new Error(y.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(v,r[v],u[0]));for(let N=0;N<c;N++)f[b*c+N]+=o[k*c+N]}if(s)for(let v=0;v<c;v++)f[b*c+v]/=g-h;if(h=g,++g,x=b+1,b=w,g>a)break}return x<p&&f.fill(i,x*c,p*c),[f,m]}var hS=Ce(o=>Math.sqrt(o)),rV=dt(tn,o=>Math.sqrt(o)),gS={kernelName:tn,backendName:"cpu",kernelFunc:rV};var hx=vt(((o,t)=>{let e=o-t;return e*e})),nV=Nt(en,hx),xS={kernelName:en,backendName:"cpu",kernelFunc:nV};var gx=Ce((o,t)=>{let{pattern:e,replaceGlobal:r,rewrite:n}=t;return o.replace(new RegExp(e,r?"g":""),n)}),sV=Ue(ji,gx),CS={kernelName:ji,backendName:"cpu",kernelFunc:sV};function wp(o,t,e,r){let n=nt(o,t.dtype);for(let s=0;s<n.size;s++){let i=n.indexToLoc(s),a=new Array(i.length);for(let u=0;u<a.length;u++)a[u]=i[u]*e[u]+r[u];n.set(t.get(...a),...i)}return n}var xx=class{constructor(t,e,r,n,s,i){this.separator=C.encodeString(t),this.nGramWidths=e,this.leftPad=C.encodeString(r),this.rightPad=C.encodeString(n),this.padWidth=s,this.preserveShort=i}getPadWidth(t){return Math.min(this.padWidth<0?t-1:this.padWidth,t-1)}getNumNGrams(t,e){let r=this.getPadWidth(e);return Math.max(0,t+2*r-e+1)}createNGrams(t,e,r,n,s,i){for(let a=0;a<s;++a){let u=this.getPadWidth(i),c=Math.max(0,u-a),l=Math.max(0,u-(s-(a+1))),p=i-(c+l),m=e+(c>0?0:a-u),d=0;d+=c*this.leftPad.length;for(let b=0;b<p;++b)d+=t[m+b].length;d+=l*this.rightPad.length;let f=c+l+p-1;d+=f*this.separator.length,r[n+a]=new Uint8Array(d);let h=r[n+a],g=0,x=b=>b.forEach(w=>h[g++]=w);for(let b=0;b<c;++b)x(this.leftPad),x(this.separator);for(let b=0;b<p-1;++b)x(t[m+b]),x(this.separator);if(p>0){x(t[m+p-1]);for(let b=0;b<l;++b)x(this.separator),x(this.rightPad)}else{for(let b=0;b<l-1;++b)x(this.rightPad),x(this.separator);x(this.rightPad)}}}compute(t,e){let r=t.length,n=e.length;if(n>0){let u=e[0];if(u!==0)throw new Error(`First split value must be 0, got ${u}`);for(let c=1;c<n;++c){let l=e[c]>=u;if(l=l&&e[c]<=r,!l)throw new Error(`Invalid split value ${e[c]}, must be in [${u}, ${r}]`);u=e[c]}if(u!==r)throw new Error(`Last split value must be data size. Expected ${r}, got ${u}`)}let s=n-1,i=C.getArrayFromDType("int32",n);if(r===0||n===0){let u=new Array(r);for(let c=0;c<=s;++c)i[c]=0;return[u,i]}i[0]=0;for(let u=1;u<=s;++u){let c=e[u]-e[u-1],l=0;this.nGramWidths.forEach(p=>{l+=this.getNumNGrams(c,p)}),this.preserveShort&&c>0&&l===0&&(l=1),i[u]=i[u-1]+l}let a=new Array(i[s]);for(let u=0;u<s;++u){let c=e[u],l=i[u];if(this.nGramWidths.forEach(p=>{let m=e[u+1]-e[u],d=this.getNumNGrams(m,p);this.createNGrams(t,c,a,l,d,p),l+=d}),this.preserveShort&&l===i[u]){let p=e[u+1]-e[u];if(p===0)continue;let m=p+2*this.padWidth;this.createNGrams(t,c,a,l,1,m)}}return[a,i]}};function Sp(o,t,e,r,n,s,i,a){return new xx(e,r,n,s,i,a).compute(o,t)}function iV(o,t,e,r){if(!o.length)return;if(t.length===0){for(let s=0;s<o.length;++s)r.push(o.subarray(s,s+1));return}if(t.length===1){let s=t[0],i=o.indexOf(s);for(;i!==-1;){let a=o.subarray(0,i);(!e||a.length!==0)&&r.push(a),o=o.subarray(i+1),i=o.indexOf(s)}(!e||o.length!==0)&&r.push(o);return}let n=0;for(let s=0;s<o.length+1;s++)if(s===o.length||t.indexOf(o[s])!==-1){let i=o.subarray(n,s);(!e||i.length!==0)&&r.push(i),n=s+1}}function vp(o,t,e){let r=o.length,n=[],s=0,i=0,a=new Array(r);for(let m=0;m<r;++m){let d=n.length;iV(o[m],t,e,n);let f=n.length-d;a[m]=f,s+=f,i=Math.max(i,f)}let u=C.getArrayFromDType("int32",s*2),c=new Array(s),l=[r,i],p=0;for(let m=0;m<r;++m)for(let d=0;d<a[m];++d)u[p*2]=m,u[p*2+1]=d,c[p]=n[p],++p;return[u,c,l]}function Ip(o,t){let e=C.getArrayFromDType("int32",o.length);for(let r=0;r<o.length;++r)e[r]=C.fingerPrint64(o[r]).modulo(t).getLowBitsUnsigned();return e}var Cx=vt(((o,t)=>o-t)),aV=Mu(((o,t,e,r)=>({real:o-e,imag:t-r}))),Hc=Nt("Sub",Cx,aV),bS={kernelName:"Sub",backendName:"cpu",kernelFunc:Hc};function kp(o,t){let e=new Array(o.rank);for(let n=0;n<e.length;n++)e[n]=o.shape[n]*t[n];let r=nt(e,o.dtype);for(let n=0;n<r.values.length;++n){let s=r.indexToLoc(n),i=new Array(o.rank);for(let u=0;u<i.length;u++)i[u]=s[u]%o.shape[u];let a=o.locToIndex(i);r.values[n]=o.values[a]}return r}var Kc=(o,t)=>{let e=t.value-o.value;return e===0?o.index-t.index:e};function yS(o,t,e=0,r=o.length-1){for(;r>e;){if(r-e>600){let a=r-e+1,u=t-e+1,c=Math.log(a),l=.5*Math.exp(2*c/3),p=.5*Math.sqrt(c*l*(a-l)/a)*Math.sign(u-a/2),m=Math.max(e,Math.floor(t-u*l/a+p)),d=Math.min(r,Math.floor(t+(a-u)*l/a+p));yS(o,t,m,d)}let n=o[t],s=e,i=r;for(C.swap(o,e,t),Kc(o[r],n)>0&&C.swap(o,e,r);s<i;){for(C.swap(o,s,i),s++,i--;Kc(o[s],n)<0;)s=s+1;for(;Kc(o[i],n)>0;)i=i-1}Kc(o[e],n)===0?C.swap(o,e,i):(i=i+1,C.swap(o,i,r)),i<=t&&(e=i+1),t<=i&&(r=i-1)}}function $p(o,t,e,r,n){let s=t[t.length-1],[i,a]=[o.length/s,s],u=C.getTypedArrayFromDType(e,i*r),c=C.getTypedArrayFromDType("int32",i*r);for(let p=0;p<i;p++){let m=p*a,d=o.subarray(m,m+a),f=new Array(d.length);d.forEach((b,w)=>f[w]={value:b,index:w}),r<f.length&&(yS(f,r),f=f.slice(0,r)),n&&f.sort(Kc);let h=p*r,g=u.subarray(h,h+r),x=c.subarray(h,h+r);for(let b=0;b<r;b++)g[b]=f[b].value,x[b]=f[b].index}let l=t.slice();return l[l.length-1]=r,[nt(l,e,u),nt(l,"int32",c)]}function Tp(o,t,e,r){let n=C.parseAxisParam(t,e)[0],s=[1,e[0],1];for(let f=0;f<n;f++)s[0]*=e[f];s[1]=e[n];for(let f=n+1;f<e.length;f++)s[2]*=e[f];let i=new Map,a=new Int32Array(e[n]),u=new Dt(s,r,o),c=[],l=s[0]===1&&s[2]===1;for(let f=0;f<e[n];f++){let h;if(l)h=o[f].toString();else{let x=[];for(let b=0;b<s[0];b++)for(let w=0;w<s[2];w++)x.push(u.get(b,f,w));h=x.join(",")}let g=i.get(h);if(g!=null)a[f]=g;else{let x=i.size;i.set(h,x),a[f]=x,c.push(f)}}let p=s.slice();p[1]=i.size;let m=new Dt(p,r);c.forEach((f,h)=>{for(let g=0;g<s[0];g++)for(let x=0;x<s[2];x++)m.set(u.get(g,f,x),g,h,x)});let d=e.slice();return d[n]=p[1],{outputValues:m.values,outputShape:d,indices:a}}vu("cpu",()=>new Uc,1);var bx=dt("Elu",o=>o>=0?o:Math.exp(o)-1),wS={kernelName:"Elu",backendName:"cpu",kernelFunc:bx};function yx(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{alpha:s}=r;H([n],"leakyRelu");let i=C.sizeFromShape(n.shape),a=e.data.get(n.dataId).values,u=C.getTypedArrayFromDType("float32",i);for(let c=0;c<a.length;c++)u[c]=a[c]<0?s*a[c]:a[c];return e.makeTensorInfo(n.shape,"float32",u)}var SS={kernelName:vs,backendName:"cpu",kernelFunc:yx};var uV=vt((o,t)=>o<0?t*o:o);function wx(o){let{inputs:t,backend:e}=o,{x:r,alpha:n}=t;H([r,n],"prelu");let s=e.data.get(r.dataId).values,i=e.data.get(n.dataId).values,[a,u]=uV(r.shape,n.shape,s,i,"float32");return e.makeTensorInfo(u,"float32",a)}var vS={kernelName:zs,backendName:"cpu",kernelFunc:wx};var Sx=dt(Hr,o=>Math.max(0,o)),IS={kernelName:Hr,backendName:"cpu",kernelFunc:Sx};var vx=dt(Kr,o=>Math.min(Math.max(0,o),6)),kS={kernelName:Kr,backendName:"cpu",kernelFunc:vx};function Ea(o,t,e,r,n){if(e==="linear")return Ee({inputs:{x:t},backend:o});if(e==="relu")return Sx({inputs:{x:t},backend:o});if(e==="elu")return bx({inputs:{x:t},backend:o});if(e==="relu6")return vx({inputs:{x:t},backend:o});if(e==="prelu")return wx({inputs:{x:t,alpha:r},backend:o});if(e==="leakyrelu")return yx({inputs:{x:t},backend:o,attrs:{alpha:n}});if(e==="sigmoid")return dx({inputs:{x:t},backend:o});throw new Error(`Activation ${e} has not been implemented for the CPU backend.`)}function It(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{shape:s}=r,i=C.sizeFromShape(n.shape),a=C.inferFromImplicitShape(s,i),u=C.sizeFromShape(a);C.assert(i===u,()=>`The new shape (${a}) has ${u} elements and the old shape (${n.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`),e.incRef(n.dataId);let c=e.data.get(n.dataId);if(c.complexTensorInfos!=null){let l=c.complexTensorInfos.real,p=c.complexTensorInfos.imag;l.shape=a,p.shape=a}return{dataId:n.dataId,shape:a,dtype:n.dtype}}var $S={kernelName:Gs,backendName:"cpu",kernelFunc:It};function Ix(o){let{inputs:t,backend:e,attrs:r}=o,{a:n,b:s}=t,{transposeA:i,transposeB:a}=r;H([n,s],"matMul");let u=n.shape.length,c=s.shape.length,l=i?n.shape[u-2]:n.shape[u-1],p=a?s.shape[c-1]:s.shape[c-2],m=i?n.shape[u-1]:n.shape[u-2],d=a?s.shape[c-2]:s.shape[c-1],f=n.shape.slice(0,-2),h=s.shape.slice(0,-2),g=C.sizeFromShape(f),x=C.sizeFromShape(h),w=xo.assertAndGetBroadcastShape(n.shape.slice(0,-2),s.shape.slice(0,-2)).concat([m,d]);C.assert(l===p,()=>`Error in matMul: inner shapes (${l}) and (${p}) of Tensors with shapes ${n.shape} and ${s.shape} and transposeA=${i} and transposeB=${a} must match.`);let v=i?[g,l,m]:[g,m,l],k=a?[x,d,p]:[x,p,d],N=It({inputs:{x:n},backend:e,attrs:{shape:v}}),E=It({inputs:{x:s},backend:e,attrs:{shape:k}}),R=i?N.shape[1]:N.shape[2],A=i?N.shape[2]:N.shape[1],F=a?E.shape[1]:E.shape[2],P=Math.max(g,x),_=e.data.get(N.dataId).values,O=e.data.get(E.dataId).values,M=C.computeStrides(N.shape),L=C.computeStrides(E.shape),[W,X,U]=i?[M[0],1,M[1]]:[M[0],M[1],1],[q,Y,Z]=a?[1,L[1],L[0]]:[L[1],1,L[0]],et=A*F,J=nt([P,A,F],N.dtype),st=J.values,ot=e.blockSize;for(let ut=0;ut<P;ut++){let ft=ut%g,Ct=ut%x;for(let gt=0;gt<A;gt+=ot){let kt=Math.min(gt+ot,A);for(let Tt=0;Tt<F;Tt+=ot){let zt=Math.min(Tt+ot,F);for(let Kt=0;Kt<R;Kt+=ot){let ce=Math.min(Kt+ot,R);for(let qt=gt;qt<kt;qt++)for(let Wt=Tt;Wt<zt;Wt++){let ae=0;for(let oe=Kt;oe<ce;oe++){let lr=_[ft*W+qt*X+oe*U],Se=O[oe*q+Wt*Y+Ct*Z];ae+=lr*Se}st[ut*et+(qt*F+Wt)]+=ae}}}}}return e.disposeIntermediateTensorInfo(N),e.disposeIntermediateTensorInfo(E),e.makeTensorInfo(w,J.dtype,J.values)}var TS={kernelName:Wn,backendName:"cpu",kernelFunc:Ix};function cV(o){let{inputs:t,backend:e,attrs:r}=o,{a:n,b:s,bias:i,preluActivationWeights:a}=t,{transposeA:u,transposeB:c,activation:l,leakyreluAlpha:p}=r,m,d,f,h=[];m=Ix({inputs:{a:n,b:s},attrs:{transposeA:u,transposeB:c},backend:e}),i&&(d=rr({inputs:{a:m,b:i},backend:e}),h.push(m),m=d),l&&(f=Ea(e,m,l,a,p),h.push(m),m=f);for(let x of h)e.disposeIntermediateTensorInfo(x);return m}var NS={kernelName:nn,backendName:"cpu",kernelFunc:cV};var lV=dt(fr,o=>Math.acos(o)),ES={kernelName:fr,backendName:"cpu",kernelFunc:lV};var pV=dt(hr,o=>Math.acosh(o)),RS={kernelName:hr,backendName:"cpu",kernelFunc:pV};function mV(o){let{inputs:t,backend:e}=o,r=t;H(t,"addN");let n=r.map(a=>e.data.get(a.dataId).values),s=nt(r[0].shape,r[0].dtype),i=s.values;for(let a=0;a<r.length;a++){let u=n[a];for(let c=0;c<i.length;c++)i[c]+=u[c]}return e.makeTensorInfo(s.shape,s.dtype,s.values)}var DS={kernelName:Mn,backendName:"cpu",kernelFunc:mV};function dV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;H(n,"all");let a=C.parseAxisParam(s,n.shape),u=a,c=y.getAxesPermutation(u,n.shape.length),l=n;c!=null&&(l=Yt({inputs:{x:n},backend:e,attrs:{perm:c}}),u=y.getInnerMostAxes(u.length,n.shape.length)),y.assertAxesAreInnerMostDims("all",u,l.shape.length);let[p,m]=y.computeOutAndReduceShapes(l.shape,u),d=C.sizeFromShape(m),f=C.makeZerosTypedArray(C.sizeFromShape(p),l.dtype),h=e.data.get(l.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,w=h[b];for(let v=0;v<d;++v){let k=h[b+v];w=w&&k}f[x]=w}c!=null&&e.disposeIntermediateTensorInfo(l);let g=e.makeTensorInfo(p,l.dtype,f);if(i){let x=y.expandShapeToKeepDim(p,a),b=It({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}var AS={kernelName:"All",backendName:"cpu",kernelFunc:dV};function fV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;H(n,"any");let a=C.parseAxisParam(s,n.shape),u=a,c=y.getAxesPermutation(u,n.shape.length),l=n;c!=null&&(l=Yt({inputs:{x:n},backend:e,attrs:{perm:c}}),u=y.getInnerMostAxes(u.length,n.shape.length)),y.assertAxesAreInnerMostDims("any",u,l.shape.length);let[p,m]=y.computeOutAndReduceShapes(l.shape,u),d=C.sizeFromShape(m),f=C.makeZerosTypedArray(C.sizeFromShape(p),l.dtype),h=e.data.get(l.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,w=h[b];for(let v=0;v<d;++v){let k=h[b+v];w=w||k}f[x]=w}c!=null&&e.disposeIntermediateTensorInfo(l);let g=e.makeTensorInfo(p,l.dtype,f);if(i){let x=y.expandShapeToKeepDim(p,a),b=It({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}var FS={kernelName:"Any",backendName:"cpu",kernelFunc:fV};function hV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s}=r;H(n,"argMax");let i=C.parseAxisParam(s,n.shape),a=y.getAxesPermutation(i,n.shape.length),u=n,c=[];a!=null&&(u=Yt({inputs:{x:n},backend:e,attrs:{perm:a}}),c.push(u),i=y.getInnerMostAxes(i.length,u.shape.length)),i=[i[0]],y.assertAxesAreInnerMostDims("argMax",i,u.shape.length);let[l,p]=y.computeOutAndReduceShapes(u.shape,i),m=C.sizeFromShape(l),d=C.makeZerosTypedArray(m,"int32"),f=C.sizeFromShape(p),h=e.data.get(u.dataId).values;for(let g=0;g<d.length;++g){let x=g*f,b=h[x],w=0;for(let v=0;v<f;++v){let k=h[x+v];k>b&&(b=k,w=v)}d[g]=w}return c.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.makeTensorInfo(l,"int32",d)}var PS={kernelName:Ln,backendName:"cpu",kernelFunc:hV};function gV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s}=r;H(n,"argMin");let i=C.parseAxisParam(s,n.shape),a=y.getAxesPermutation(i,n.shape.length),u=n,c=[];a!=null&&(u=Yt({inputs:{x:n},backend:e,attrs:{perm:a}}),c.push(u),i=y.getInnerMostAxes(i.length,u.shape.length)),i=[i[0]],y.assertAxesAreInnerMostDims("argMin",i,u.shape.length);let[l,p]=y.computeOutAndReduceShapes(u.shape,i),m=C.sizeFromShape(l),d=C.makeZerosTypedArray(m,"int32"),f=C.sizeFromShape(p),h=e.data.get(u.dataId).values;for(let g=0;g<d.length;++g){let x=g*f,b=h[x],w=0;for(let v=0;v<f;++v){let k=h[x+v];k<b&&(b=k,w=v)}d[g]=w}return c.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.makeTensorInfo(l,"int32",d)}var _S={kernelName:Bn,backendName:"cpu",kernelFunc:gV};var xV=dt(gr,o=>Math.asin(o)),OS={kernelName:gr,backendName:"cpu",kernelFunc:xV};var CV=dt(xr,o=>Math.asinh(o)),MS={kernelName:xr,backendName:"cpu",kernelFunc:CV};var bV=dt(Cr,o=>Math.atan(o)),LS={kernelName:Cr,backendName:"cpu",kernelFunc:bV};var yV=vt((o,t)=>Math.atan2(o,t)),wV=Nt(yr,yV),BS={kernelName:yr,backendName:"cpu",kernelFunc:wV};var SV=dt(br,o=>Math.atanh(o)),zS={kernelName:br,backendName:"cpu",kernelFunc:SV};function Vu(o,t,e,r,n,s){let i=n.strideHeight,a=n.strideWidth,u=n.dilationHeight,c=n.dilationWidth,l=n.effectiveFilterHeight,p=n.effectiveFilterWidth,m=n.padInfo.top,d=n.padInfo.left,f=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,h=nt(n.outShape,e),g=h.values,x=n.outShape[1]*n.outShape[2]*n.outShape[3],b=n.outShape[2]*n.outShape[3],w=n.outShape[3];for(let v=0;v<n.batchSize;++v){let k=v*x,N=v*r[0];for(let E=0;E<n.inChannels;++E)for(let R=0;R<n.outHeight;++R){let A=R*i-m,F=Math.max(0,A),P=Math.min(n.inHeight,l+A),_=k+R*b;for(let O=0;O<n.outWidth;++O){let M=O*a-d,L=Math.max(0,M),W=Math.min(n.inWidth,p+M),X=f,U=0,q=0;for(let Z=F;Z<P;Z+=u){let et=N+Z*r[1];for(let J=L;J<W;J+=c){let st=et+J*r[2],ot=o[st+E];s==="max"&&ot>X?X=ot:s==="avg"&&(U+=ot,q++)}if(isNaN(X))break}let Y=_+O*w+E;g[Y]=s==="avg"?U/q:X}}}return h}function Np(o,t,e,r,n=!1,s=!1){let i=nt(r.outShape,"int32"),a=r.strideHeight,u=r.strideWidth,c=r.dilationHeight,l=r.dilationWidth,p=r.effectiveFilterHeight,m=r.effectiveFilterWidth,d=r.padInfo.top,f=r.padInfo.left,h=nt(t,e,o);for(let g=0;g<r.batchSize;++g)for(let x=0;x<r.inChannels;++x)for(let b=0;b<r.outHeight;++b){let w=b*a-d,v=w;for(;v<0;)v+=c;let k=Math.min(r.inHeight,p+w);for(let N=0;N<r.outWidth;++N){let E=N*u-f,R=E;for(;R<0;)R+=l;let A=Math.min(r.inWidth,m+E),F=Number.NEGATIVE_INFINITY,P=-1;for(let _=v;_<k;_+=c){let O=_-w;for(let M=R;M<A;M+=l){let L=M-E,W=h.get(g,_,M,x);W>F&&(F=W,n?P=s?((g*r.inHeight+_)*r.inWidth+M)*r.inChannels+x:(_*r.inWidth+M)*r.inChannels+x:P=O*m+L)}}i.set(P,g,b,N,x)}}return i}function Ep(o,t,e,r,n,s){let i=n.strideDepth,a=n.strideHeight,u=n.strideWidth,c=n.dilationDepth,l=n.dilationHeight,p=n.dilationWidth,m=n.effectiveFilterDepth,d=n.effectiveFilterHeight,f=n.effectiveFilterWidth,h=n.padInfo.front,g=n.padInfo.top,x=n.padInfo.left,b=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,w=nt(n.outShape,e),v=w.values,k=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],N=n.outShape[2]*n.outShape[3]*n.outShape[4],E=n.outShape[3]*n.outShape[4],R=n.outShape[4];for(let A=0;A<n.batchSize;++A){let F=A*k,P=A*r[0];for(let _=0;_<n.inChannels;++_)for(let O=0;O<n.outDepth;++O){let M=O*i-h,L=M;for(;L<0;)L+=c;let W=Math.min(n.inDepth,m+M),X=F+O*N;for(let U=0;U<n.outHeight;++U){let q=U*a-g,Y=q;for(;Y<0;)Y+=l;let Z=Math.min(n.inHeight,d+q),et=X+U*E;for(let J=0;J<n.outWidth;++J){let st=J*u-x,ot=st;for(;ot<0;)ot+=p;let ut=Math.min(n.inWidth,f+st),ft=et+J*R,Ct=b,gt=0,kt=0;for(let zt=L;zt<W;zt+=c){let Kt=P+zt*r[1];for(let ce=Y;ce<Z;ce+=l){let qt=Kt+ce*r[2];for(let Wt=ot;Wt<ut;Wt+=p){let ae=qt+Wt*r[3],oe=o[ae+_];if(s==="max"&&oe>Ct?Ct=oe:s==="avg"&&(gt+=oe,kt++),isNaN(Ct))break}if(isNaN(Ct))break}if(isNaN(Ct))break}let Tt=ft+_;v[Tt]=s==="avg"?gt/Math.max(kt,1):Ct}}}}return w}function VS(o,t){let e=nt(t.outShape,"int32"),r=t.strideDepth,n=t.strideHeight,s=t.strideWidth,i=t.dilationDepth,a=t.dilationHeight,u=t.dilationWidth,c=t.effectiveFilterDepth,l=t.effectiveFilterHeight,p=t.effectiveFilterWidth,m=t.padInfo.front,d=t.padInfo.top,f=t.padInfo.left;for(let h=0;h<t.batchSize;++h)for(let g=0;g<t.inChannels;++g)for(let x=0;x<t.outDepth;++x){let b=x*r-m,w=b;for(;w<0;)w+=i;let v=Math.min(t.inDepth,c+b);for(let k=0;k<t.outHeight;++k){let N=k*n-d,E=N;for(;E<0;)E+=a;let R=Math.min(t.inHeight,l+N);for(let A=0;A<t.outWidth;++A){let F=A*s-f,P=F;for(;P<0;)P+=u;let _=Math.min(t.inWidth,p+F),O=Number.NEGATIVE_INFINITY,M=-1;for(let L=w;L<v;L+=i){let W=L-b;for(let X=E;X<R;X+=a){let U=X-N;for(let q=P;q<_;q+=u){let Y=q-F,Z=o.get(h,L,X,q,g);Z>=O&&(O=Z,M=W*l*p+U*l+Y)}}}e.set(M,h,x,k,A,g)}}}return e}function vV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t;H(n,"avgPool");let{filterSize:s,strides:i,pad:a,dimRoundingMode:u}=r,c=1;C.assert(y.eitherStridesOrDilationsAreOne(i,c),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);let l=y.computePool2DInfo(n.shape,s,i,c,a,u),p;if(l.filterWidth===1&&l.filterHeight===1&&C.arraysEqual(l.inShape,l.outShape))p=Ee({inputs:{x:n},backend:e});else{let m=e.data.get(n.dataId).values,d=C.computeStrides(n.shape),f=Vu(m,n.shape,n.dtype,d,l,"avg");p=e.makeTensorInfo(l.outShape,n.dtype,f.values)}return p}var WS={kernelName:zn,backendName:"cpu",kernelFunc:vV};function IV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{filterSize:s,strides:i,pad:a,dimRoundingMode:u,dataFormat:c}=r;H(n,"avgPool3d");let l=y.computePool3DInfo(n.shape,s,i,1,a,u,c),p=e.data.get(n.dataId).values,m=Ep(p,n.shape,n.dtype,C.computeStrides(n.shape),l,"avg");return e.makeTensorInfo(m.shape,"float32",m.values)}var US={kernelName:Vn,backendName:"cpu",kernelFunc:IV};function kV(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,{filterSize:i,strides:a,pad:u,dimRoundingMode:c}=r;H([n,s],"avgPool3DGrad");let l=y.computePool3DInfo(s.shape,i,a,1,u,c),p=l.strideDepth,m=l.strideHeight,d=l.strideWidth,f=l.filterDepth,h=l.filterHeight,g=l.filterWidth,x=l.dilationDepth,b=l.dilationHeight,w=l.dilationWidth,v=l.effectiveFilterDepth,k=l.effectiveFilterHeight,N=l.effectiveFilterWidth,E=v-1-l.padInfo.front,R=N-1-l.padInfo.left,A=k-1-l.padInfo.top,F=nt(s.shape,"float32"),P=1/(f*h*g),_=e.bufferSync(n);for(let O=0;O<l.batchSize;++O)for(let M=0;M<l.inChannels;++M)for(let L=0;L<l.inDepth;++L)for(let W=0;W<l.inHeight;++W)for(let X=0;X<l.inWidth;++X){let U=L-E,q=W-A,Y=X-R,Z=0;for(let et=0;et<v;et+=x){let J=(U+et)/p;if(!(J<0||J>=l.outDepth||Math.floor(J)!==J))for(let st=0;st<k;st+=b){let ot=(q+st)/m;if(!(ot<0||ot>=l.outHeight||Math.floor(ot)!==ot))for(let ut=0;ut<N;ut+=w){let ft=(Y+ut)/d;if(ft<0||ft>=l.outWidth||Math.floor(ft)!==ft)continue;let Ct=_.get(O,J,ot,ft,M);Z+=Ct}}}F.set(Z*P,O,L,W,X,M)}return e.makeTensorInfo(F.shape,F.dtype,F.values)}var GS={kernelName:Za,backendName:"cpu",kernelFunc:kV};function $V(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,i=s;H([n,s],"avgPoolGrad");let{filterSize:a,strides:u,pad:c}=r,l=y.computePool2DInfo(i.shape,a,u,1,c),p=l.strideHeight,m=l.strideWidth,d=l.filterHeight,f=l.filterWidth,h=l.dilationHeight,g=l.dilationWidth,x=l.effectiveFilterHeight,b=l.effectiveFilterWidth,w=b-1-l.padInfo.left,v=x-1-l.padInfo.top,k=nt(i.shape,"float32"),N=1/(d*f),E=e.data.get(n.dataId).values,R=nt(n.shape,"float32",E);for(let A=0;A<l.batchSize;++A)for(let F=0;F<l.inChannels;++F)for(let P=0;P<l.inHeight;++P)for(let _=0;_<l.inWidth;++_){let O=P-v,M=_-w,L=0;for(let W=0;W<x;W+=h){let X=(O+W)/p;if(!(X<0||X>=l.outHeight||Math.floor(X)!==X))for(let U=0;U<b;U+=g){let q=(M+U)/m;if(q<0||q>=l.outWidth||Math.floor(q)!==q)continue;let Y=R.get(A,X,q,F);L+=Y}}k.set(L*N,A,P,_,F)}return e.makeTensorInfo(k.shape,k.dtype,k.values)}var HS={kernelName:Qa,backendName:"cpu",kernelFunc:$V};function TV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,scale:s,offset:i,mean:a,variance:u}=t;C.assert(a.shape.length===u.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),C.assert(i==null||a.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),C.assert(s==null||a.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),H([n,a,u,s,i],"batchNorm");let{varianceEpsilon:c}=r;c==null&&(c=.001);let l=e.data.get(n.dataId).values,p=e.data.get(a.dataId).values,m=e.data.get(u.dataId).values,d=s?e.data.get(s.dataId).values:new Float32Array([1]),f=i?e.data.get(i.dataId).values:new Float32Array([0]),h=new Float32Array(l.length),g=f.length,x=d.length,b=m.length,w=p.length,v=0,k=0,N=0,E=0;for(let R=0;R<l.length;++R)h[R]=f[v++]+(l[R]-p[k++])*d[N++]/Math.sqrt(m[E++]+c),v>=g&&(v=0),k>=w&&(k=0),N>=x&&(N=0),E>=b&&(E=0);return e.makeTensorInfo(n.shape,n.dtype,h)}var KS={kernelName:Cs,backendName:"cpu",kernelFunc:TV};function NV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockShape:s,crops:i}=r;H([n],"batchToSpaceND");let a=s.reduce((x,b)=>x*b),u=y.getReshaped(n.shape,s,a),c=y.getPermuted(u.length,s.length),l=y.getReshapedPermuted(n.shape,s,a),p=y.getSliceBeginCoords(i,s.length),m=y.getSliceSize(l,i,s.length),d=It({inputs:{x:n},backend:e,attrs:{shape:u}}),f=Yt({inputs:{x:d},backend:e,attrs:{perm:c}}),h=It({inputs:{x:f},backend:e,attrs:{shape:l}}),g=Io({inputs:{x:h},backend:e,attrs:{begin:p,size:m}});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),g}var qS={kernelName:Un,backendName:"cpu",kernelFunc:NV};function EV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,weights:s}=t,{size:i}=r,a=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,c=Lu(a,u,s.dtype,s.shape,i);return e.makeTensorInfo([i],s.dtype,c)}var XS={kernelName:Gn,backendName:"cpu",kernelFunc:EV};function RV(o){let{inputs:t,backend:e}=o,{s0:r,s1:n}=t,s=e.data.get(r.dataId).values,i=e.data.get(n.dataId).values,a=y.assertAndGetBroadcastShape(Array.from(s),Array.from(i));return e.makeTensorInfo([a.length],"int32",Int32Array.from(a))}var jS={kernelName:Hn,backendName:"cpu",kernelFunc:RV};var DV=dt(Sr,(o,t)=>{let e=t;return o>e.clipValueMax?e.clipValueMax:o<e.clipValueMin?e.clipValueMin:o}),YS={kernelName:Sr,backendName:"cpu",kernelFunc:DV};var AV=o=>{let{x:t}=o.inputs,e=o.backend,r=new Float32Array(C.sizeFromShape(t.shape)),n=e.data.get(t.dataId),s=n.complexTensorInfos.real,i=n.complexTensorInfos.imag,a=e.data.get(s.dataId).values,u=e.data.get(i.dataId).values;for(let c=0;c<a.length;c++){let l=a[c],p=u[c];r[c]=Math.hypot(l,p)}return e.makeOutput(r,t.shape,"float32")},QS={kernelName:qn,backendName:"cpu",kernelFunc:AV};function nr(o){let{inputs:t,backend:e}=o,{input:r}=t,n=e.data.get(r.dataId).complexTensorInfos.imag,s=e.data.get(n.dataId).values;return e.makeTensorInfo(n.shape,n.dtype,s)}var ZS={kernelName:Ss,backendName:"cpu",kernelFunc:nr};function $i(o){let{inputs:t,backend:e,attrs:r}=o,{axis:n}=r,s=C.parseAxisParam(n,t[0].shape)[0],i=t.map(h=>h.shape);y.assertParamsConsistent(i,s);let a=y.computeOutShape(t.map(h=>h.shape),s);if(C.sizeFromShape(a)===0)return e.makeTensorInfo(a,t[0].dtype,[]);let u=t.filter(h=>C.sizeFromShape(h.shape)>0);if(u.length===1)return Ee({inputs:{x:u[0]},backend:e});if(u[0].dtype==="complex64"){let h=u.map(v=>wo({inputs:{input:v},backend:e})),g=u.map(v=>nr({inputs:{input:v},backend:e})),x=$i({inputs:h,backend:e,attrs:{axis:s}}),b=$i({inputs:g,backend:e,attrs:{axis:s}}),w=he({inputs:{real:x,imag:b},backend:e});return h.forEach(v=>e.disposeIntermediateTensorInfo(v)),g.forEach(v=>e.disposeIntermediateTensorInfo(v)),e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(b),w}let c=u.map(h=>{let x=[-1,C.sizeFromShape(h.shape.slice(s))];return It({inputs:{x:h},backend:e,attrs:{shape:x}})}),l=c.map(h=>({vals:e.data.get(h.dataId).values,shape:h.shape}));a=y.computeOutShape(c.map(h=>h.shape),1);let p=c[0].shape[0]===1,m=lp(l,a,t[0].dtype,p),d=y.computeOutShape(u.map(h=>h.shape),s),f=e.makeTensorInfo(d,t[0].dtype,m);return c.forEach(h=>e.disposeIntermediateTensorInfo(h)),f}var JS={kernelName:Xn,backendName:"cpu",kernelFunc:$i};function kx(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dataFormat:u,dilations:c,dimRoundingMode:l}=r;H([n,s],"conv2d");let p=y.convertConv2DDataFormat(u),m=y.computeConv2DInfo(n.shape,s.shape,i,c,a,l,!1,p),d=m.filterHeight,f=m.filterWidth,h=m.dilationHeight,g=m.dilationWidth,x=m.padInfo.left,b=m.padInfo.top,w=m.dataFormat==="channelsLast",v=new Dt(m.outShape,n.dtype),k=C.computeStrides(n.shape),N=C.computeStrides(s.shape),E=k[0],R=w?k[1]:k[2],A=w?k[2]:1,F=w?1:k[1],P=v.strides[0],_=w?v.strides[1]:v.strides[2],O=w?v.strides[2]:1,M=w?1:v.strides[1],L=e.data.get(n.dataId).values,W=e.data.get(s.dataId).values,X=v.values;for(let U=0;U<m.batchSize;++U){let q=U*E,Y=U*P;for(let Z=0;Z<m.outHeight;++Z){let et=Y+Z*_,J=Z*m.strideHeight-b;for(let st=0;st<d;++st){let ot=J+st*h;if(ot<0||ot>=m.inHeight)continue;let ut=st*N[0],ft=q+ot*R;for(let Ct=0;Ct<m.outWidth;++Ct){let gt=et+Ct*O,kt=Ct*m.strideWidth-x;for(let Tt=0;Tt<f;++Tt){let zt=kt+Tt*g;if(zt<0||zt>=m.inWidth)continue;let Kt=ut+Tt*N[1],ce=ft+zt*A,qt=Kt;for(let Wt=0;Wt<m.inChannels;++Wt){let ae=L[ce+Wt*F];for(let oe=0;oe<m.outChannels;++oe)X[gt+oe*M]+=ae*W[qt+oe];qt+=m.outChannels}}}}}}return e.makeTensorInfo(v.shape,v.dtype,X)}var t0={kernelName:jn,backendName:"cpu",kernelFunc:kx};function FV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,pad:a,dataFormat:u,dimRoundingMode:c,filterShape:l}=r;H([n,s],"conv2dBackpropFilter");let p=y.convertConv2DDataFormat(u),m=y.computeConv2DInfo(n.shape,l,i,1,a,c,!1,p),{strideHeight:d,strideWidth:f,filterHeight:h,filterWidth:g}=m,x=m.dataFormat==="channelsLast",b=new Dt(m.filterShape,"float32"),w=m.padInfo.left,v=m.padInfo.top,k=e.data.get(n.dataId).values,N=e.data.get(s.dataId).values,E=new Dt(n.shape,n.dtype,k),R=new Dt(s.shape,s.dtype,N);for(let A=0;A<h;++A){let F=Math.max(0,Math.ceil((v-A)/d)),P=Math.min(m.outHeight,(m.inHeight+v-A)/d);for(let _=0;_<g;++_){let O=Math.max(0,Math.ceil((w-_)/f)),M=Math.min(m.outWidth,(m.inWidth+w-_)/f);for(let L=0;L<m.inChannels;++L)for(let W=0;W<m.outChannels;++W){let X=0;for(let U=0;U<m.batchSize;++U)for(let q=F;q<P;++q){let Y=A+q*d-v;for(let Z=O;Z<M;++Z){let et=_+Z*f-w;x?X+=E.get(U,Y,et,L)*R.get(U,q,Z,W):X+=E.get(U,L,Y,et)*R.get(U,W,q,Z)}}b.set(X,A,_,L,W)}}}return e.makeTensorInfo(b.shape,b.dtype,b.values)}var e0={kernelName:Yn,backendName:"cpu",kernelFunc:FV};function PV(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{inputShape:i,strides:a,pad:u,dataFormat:c,dimRoundingMode:l}=r;H([n,s],"conv2dBackpropInput");let p=C.computeStrides(s.shape),m=C.computeStrides(n.shape),d=y.convertConv2DDataFormat(c),f=y.computeConv2DInfo(i,s.shape,a,1,u,l,!1,d),h=new Dt(f.inShape,"float32"),g=h.values,x=e.data.get(n.dataId).values,b=e.data.get(s.dataId).values,[w,v,k]=p,{batchSize:N,filterHeight:E,filterWidth:R,inChannels:A,inHeight:F,inWidth:P,outChannels:_,outHeight:O,outWidth:M,strideHeight:L,strideWidth:W}=f;d=f.dataFormat;let X=E-1-f.padInfo.top,U=R-1-f.padInfo.left,q=d==="channelsLast",Y=h.strides[0],Z=q?h.strides[1]:h.strides[2],et=q?h.strides[2]:1,J=q?1:h.strides[1],st=m[0],ot=q?m[1]:m[2],ut=q?m[2]:1,ft=q?1:m[1];for(let Ct=0;Ct<N;++Ct)for(let gt=0;gt<A;++gt)for(let kt=0;kt<F;++kt){let Tt=kt-X,zt=Math.max(0,Math.ceil(Tt/L)),Kt=Math.min(O,(E+Tt)/L);for(let ce=0;ce<P;++ce){let qt=ce-U,Wt=Math.max(0,Math.ceil(qt/W)),ae=Math.min(M,(R+qt)/W),oe=0;for(let Se=zt;Se<Kt;++Se){let Rn=Se*L-Tt;for(let io=Wt;io<ae;++io){let _i=io*W-qt,To=st*Ct+ot*Se+ut*io,pr=w*(E-1-Rn)+v*(R-1-_i)+k*gt;for(let Dn=0;Dn<_;++Dn){let An=x[To+ft*Dn],Fn=b[pr+Dn];oe+=An*Fn}}}let lr=Y*Ct+Z*kt+et*ce+J*gt;g[lr]=oe}}return e.makeTensorInfo(h.shape,h.dtype,h.values)}var o0={kernelName:Qn,backendName:"cpu",kernelFunc:PV};function _V(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dilations:u}=r;H([n,s],"conv3d");let c=y.computeConv3DInfo(n.shape,s.shape,i,u,a),{filterDepth:l,filterHeight:p,filterWidth:m,dilationDepth:d,dilationHeight:f,dilationWidth:h,padInfo:g}=c,x=g.front,b=g.left,w=g.top,v=new Dt(c.outShape,n.dtype),k=e.data.get(n.dataId).values,N=e.data.get(s.dataId).values,E=v.values,R=C.computeStrides(n.shape),A=C.computeStrides(s.shape);for(let F=0;F<c.batchSize;++F){let P=F*R[0],_=F*v.strides[0];for(let O=0;O<c.outDepth;++O){let M=_+O*v.strides[1],L=O*c.strideDepth-x;for(let W=0;W<l;++W){let X=L+W*d;if(X<0||X>=c.inDepth)continue;let U=W*A[0],q=P+X*R[1];for(let Y=0;Y<c.outHeight;++Y){let Z=M+Y*v.strides[2],et=Y*c.strideHeight-w;for(let J=0;J<p;++J){let st=et+J*f;if(st<0||st>=c.inHeight)continue;let ot=U+J*A[1],ut=q+st*R[2];for(let ft=0;ft<c.outWidth;++ft){let Ct=Z+ft*c.outChannels,gt=ft*c.strideWidth-b;for(let kt=0;kt<m;++kt){let Tt=gt+kt*h;if(Tt<0||Tt>=c.inWidth)continue;let zt=ot+kt*A[2],Kt=ut+Tt*c.inChannels,ce=zt;for(let qt=0;qt<c.inChannels;++qt){let Wt=k[Kt+qt];for(let ae=0;ae<c.outChannels;++ae)E[Ct+ae]+=Wt*N[ce+ae];ce+=c.outChannels}}}}}}}}return e.makeTensorInfo(v.shape,v.dtype,v.values)}var r0={kernelName:Zn,backendName:"cpu",kernelFunc:_V};function OV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,pad:a,filterShape:u}=r;H([n,s],"conv3dBackpropFilterV2");let c=C.computeStrides(n.shape),l=C.computeStrides(s.shape),p=y.computeConv3DInfo(n.shape,u,i,1,a),m=p.strideDepth,d=p.strideHeight,f=p.strideWidth,h=p.filterDepth,g=p.filterHeight,x=p.filterWidth,b=new Dt(p.filterShape,"float32"),w=b.values,[v,k,N,E]=b.strides,R=e.data.get(s.dataId).values,[A,F,P,_]=l,O=e.data.get(n.dataId).values,[M,L,W,X]=c,U=p.padInfo.front,q=p.padInfo.left,Y=p.padInfo.top;for(let Z=0;Z<h;++Z){let et=Math.max(0,Math.ceil((U-Z)/m)),J=Math.min(p.outDepth,(p.inDepth+U-Z)/m),st=Z*v;for(let ot=0;ot<g;++ot){let ut=Math.max(0,Math.ceil((Y-ot)/d)),ft=Math.min(p.outHeight,(p.inHeight+Y-ot)/d),Ct=ot*k+st;for(let gt=0;gt<x;++gt){let kt=Math.max(0,Math.ceil((q-gt)/f)),Tt=Math.min(p.outWidth,(p.inWidth+q-gt)/f),zt=gt*N+Ct;for(let Kt=0;Kt<p.inChannels;++Kt){let ce=Kt*E+zt;for(let qt=0;qt<p.outChannels;++qt){let Wt=0;for(let ae=0;ae<p.batchSize;++ae){let oe=ae*M,lr=ae*A;for(let Se=et;Se<J;++Se){let io=(Z+Se*m-U)*L+oe,_i=Se*F+lr;for(let To=ut;To<ft;++To){let Dn=(ot+To*d-Y)*W+io,An=To*P+_i;for(let Fn=kt;Fn<Tt;++Fn){let Qf=(gt+Fn*f-q)*X+Dn,Zf=Fn*_+An;Wt+=O[Qf+Kt]*R[Zf+qt]}}}}w[ce+qt]=Wt}}}}}return e.makeTensorInfo(b.shape,b.dtype,b.values)}var n0={kernelName:Ja,backendName:"cpu",kernelFunc:OV};function MV(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{pad:i,strides:a,inputShape:u}=r;H([n],"conv3dBackpropInputV2");let c=C.computeStrides(n.shape),l=C.computeStrides(s.shape),p=y.computeConv3DInfo(u,s.shape,a,1,i),m=new Dt(p.inShape,"float32"),d=m.values,[f,h,g,x]=m.strides,b=e.data.get(n.dataId).values,[w,v,k,N]=c,E=e.data.get(s.dataId).values,[R,A,F,P]=l,{batchSize:_,filterDepth:O,filterHeight:M,filterWidth:L,inChannels:W,inDepth:X,inHeight:U,inWidth:q,outChannels:Y,outDepth:Z,outHeight:et,outWidth:J,strideDepth:st,strideHeight:ot,strideWidth:ut}=p,ft=O-1-p.padInfo.front,Ct=M-1-p.padInfo.top,gt=L-1-p.padInfo.left;for(let kt=0;kt<_;++kt)for(let Tt=0;Tt<W;++Tt)for(let zt=0;zt<X;++zt){let Kt=zt-ft,ce=Math.max(0,Math.ceil(Kt/st)),qt=Math.min(Z,(O+Kt)/st);for(let Wt=0;Wt<U;++Wt){let ae=Wt-Ct,oe=Math.max(0,Math.ceil(ae/ot)),lr=Math.min(et,(M+ae)/ot);for(let Se=0;Se<q;++Se){let Rn=Se-gt,io=Math.max(0,Math.ceil(Rn/ut)),_i=Math.min(J,(L+Rn)/ut),To=0;for(let pr=ce;pr<qt;++pr){let Dn=pr*st-Kt;for(let An=oe;An<lr;++An){let Fn=An*ot-ae;for(let hc=io;hc<_i;++hc){let Qf=hc*ut-Rn,Zf=w*kt+v*pr+k*An+N*hc,PD=R*(O-1-Dn)+A*(M-1-Fn)+F*(L-1-Qf)+P*Tt;for(let yl=0;yl<Y;++yl){let _D=b[Zf+yl],OD=E[PD+yl];To+=_D*OD}}}}d[f*kt+h*zt+g*Wt+x*Se+Tt]=To}}}return e.makeTensorInfo(m.shape,m.dtype,m.values)}var s0={kernelName:Jn,backendName:"cpu",kernelFunc:MV};var LV=dt("Cos",o=>Math.cos(o)),i0={kernelName:"Cos",backendName:"cpu",kernelFunc:LV};var BV=dt(vr,o=>Math.cosh(o)),a0={kernelName:vr,backendName:"cpu",kernelFunc:BV};function zV(o){let{inputs:t,backend:e,attrs:r}=o,{image:n,boxes:s,boxInd:i}=t,{cropSize:a,method:u,extrapolationValue:c}=r,[l,p,m,d]=n.shape,f=s.shape[0],[h,g]=a,x=nt([f,h,g,d],"float32"),b=e.data.get(s.dataId).values,w=e.data.get(i.dataId).values,v=e.data.get(n.dataId).values,k=C.computeStrides(n.shape),N=C.computeStrides(x.shape);for(let E=0;E<f;E++){let R=E*4,A=b[R],F=b[R+1],P=b[R+2],_=b[R+3],O=w[E];if(O>=l)continue;let M=h>1?(P-A)*(p-1)/(h-1):0,L=g>1?(_-F)*(m-1)/(g-1):0;for(let W=0;W<h;W++){let X=h>1?A*(p-1)+W*M:.5*(A+P)*(p-1);if(X<0||X>p-1){for(let U=0;U<g;U++)for(let q=0;q<d;q++){let Y=q+U*N[2]+W*N[1]+E*N[0];x.values[Y]=c}continue}if(u==="bilinear"){let U=Math.floor(X),q=Math.ceil(X),Y=X-U;for(let Z=0;Z<g;Z++){let et=g>1?F*(m-1)+Z*L:.5*(F+_)*(m-1);if(et<0||et>m-1){for(let ut=0;ut<d;ut++){let ft=ut+Z*N[2]+W*N[1]+E*N[0];x.values[ft]=c}continue}let J=Math.floor(et),st=Math.ceil(et),ot=et-J;for(let ut=0;ut<d;ut++){let ft=ut+J*k[2]+U*k[1]+O*k[0],Ct=v[ft];ft=ut+st*k[2]+U*k[1]+O*k[0];let gt=v[ft];ft=ut+J*k[2]+q*k[1]+O*k[0];let kt=v[ft];ft=ut+st*k[2]+q*k[1]+O*k[0];let Tt=v[ft],zt=Ct+(gt-Ct)*ot,Kt=kt+(Tt-kt)*ot;ft=ut+Z*N[2]+W*N[1]+E*N[0],x.values[ft]=zt+(Kt-zt)*Y}}}else for(let U=0;U<g;++U){let q=g>1?F*(m-1)+U*L:.5*(F+_)*(m-1);if(q<0||q>m-1){for(let et=0;et<d;et++){let J=et+U*N[2]+W*N[1]+E*N[0];x.values[J]=c}continue}let Y=Math.round(q),Z=Math.round(X);for(let et=0;et<d;et++){let J=et+Y*k[2]+Z*k[1]+O*k[0],st=et+U*N[2]+W*N[1]+E*N[0];x.values[st]=v[J]}}}}return e.makeTensorInfo(x.shape,x.dtype,x.values)}var u0={kernelName:rs,backendName:"cpu",kernelFunc:zV};function VV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,exclusive:i,reverse:a}=r;H(n,"cumprod");let u=y.getAxesPermutation([s],n.shape.length),c=n;u!=null&&(c=Yt({inputs:{x:n},backend:e,attrs:{perm:u}}));let l=y.getInnerMostAxes(1,n.shape.length)[0];if(l!==c.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${l}`);let p=Lt(c.dtype,"int32"),m=C.makeOnesTypedArray(C.sizeFromShape(c.shape),p),d=e.data.get(c.dataId).values,f=c.shape[c.shape.length-1],h=a?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<d.length;x+=f)for(let b=0;b<f;b++){let w=h(x,b);if(b===0)m[w]=i?1:d[w];else{let v=h(x,b-1);m[w]=i?d[v]*m[v]:d[w]*m[v]}}let g=e.makeTensorInfo(c.shape,p,m);if(u!=null){let x=y.getUndoAxesPermutation(u),b=Yt({inputs:{x:g},backend:e,attrs:{perm:x}});return e.disposeIntermediateTensorInfo(g),e.disposeIntermediateTensorInfo(c),b}return g}var c0={kernelName:es,backendName:"cpu",kernelFunc:VV};function WV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,exclusive:i,reverse:a}=r;H(n,"cumsum");let u=y.getAxesPermutation([s],n.shape.length),c=n;u!=null&&(c=Yt({inputs:{x:n},backend:e,attrs:{perm:u}}));let l=y.getInnerMostAxes(1,n.shape.length)[0];if(l!==c.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${l}`);let p=Lt(c.dtype,"int32"),m=C.makeZerosTypedArray(C.sizeFromShape(c.shape),p),d=e.data.get(c.dataId).values,f=c.shape[c.shape.length-1],h=a?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<d.length;x+=f)for(let b=0;b<f;b++){let w=h(x,b);if(b===0)m[w]=i?0:d[w];else{let v=h(x,b-1);m[w]=i?d[v]+m[v]:d[w]+m[v]}}let g=e.makeTensorInfo(c.shape,p,m);if(u!=null){let x=y.getUndoAxesPermutation(u),b=Yt({inputs:{x:g},backend:e,attrs:{perm:x}});return e.disposeIntermediateTensorInfo(g),e.disposeIntermediateTensorInfo(c),b}return g}var l0={kernelName:os,backendName:"cpu",kernelFunc:WV};function UV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,weights:s}=t,{size:i,binaryOutput:a}=r;if(n.shape.length===1){let u=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,l=Lu(u,c,s.dtype,s.shape,i);return e.makeTensorInfo([i],s.dtype,l)}else if(n.shape.length===2){let u=e.bufferSync(n),c=e.bufferSync(s),l=cp(u,c,i,a);return e.makeTensorInfo(l.shape,s.dtype,l.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var p0={kernelName:ns,backendName:"cpu",kernelFunc:UV};function GV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockSize:s,dataFormat:i}=r;C.assert(i==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${i}`);let a=n.shape[0],u=n.shape[1],c=n.shape[2],l=n.shape[3],p=u*s,m=c*s,d=l/(s*s),f=e.data.get(n.dataId).values,h=new Float32Array(a*p*m*d),g=0;for(let x=0;x<a;++x)for(let b=0;b<p;++b){let w=Math.floor(b/s),v=b%s;for(let k=0;k<m;++k){let N=Math.floor(k/s),E=k%s,R=(v*s+E)*d;for(let A=0;A<d;++A){let P=A+R+l*(N+c*(w+u*x));h[g++]=f[P]}}}return e.makeTensorInfo([a,p,m,d],n.dtype,h)}var m0={kernelName:ss,backendName:"cpu",kernelFunc:GV};function $x(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dilations:u,dimRoundingMode:c}=r;H([n,s],"depthwiseConv2DNative");let l=C.computeStrides(n.shape),p=C.computeStrides(s.shape),m=u;m==null&&(m=[1,1]),C.assert(y.eitherStridesOrDilationsAreOne(i,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${m}'`);let d=y.computeConv2DInfo(n.shape,s.shape,i,m,a,c,!0),{filterHeight:f,filterWidth:h,dilationHeight:g,dilationWidth:x,padInfo:b}=d,w=b.left,v=b.top,k=d.outChannels/d.inChannels,N=new Dt(d.outShape,n.dtype),E=e.data.get(n.dataId).values,R=e.data.get(s.dataId).values,A=N.values;for(let F=0;F<d.batchSize;++F){let P=F*l[0],_=F*N.strides[0];for(let O=0;O<d.outHeight;++O){let M=_+O*N.strides[1],L=O*d.strideHeight-v;for(let W=0;W<f;++W){let X=L+W*g;if(X<0||X>=d.inHeight)continue;let U=W*p[0],q=P+X*l[1];for(let Y=0;Y<d.outWidth;++Y){let Z=M+Y*N.strides[2],et=Y*d.strideWidth-w;for(let J=0;J<h;++J){let st=et+J*x;if(st<0||st>=d.inWidth)continue;let ot=U+J*p[1],ut=q+st*d.inChannels,ft=Z,Ct=ot;for(let gt=0;gt<d.inChannels;++gt){let kt=E[ut+gt];for(let Tt=0;Tt<k;++Tt)A[ft+Tt]+=kt*R[Ct+Tt];ft+=k,Ct+=k}}}}}}return e.makeTensorInfo(N.shape,N.dtype,N.values)}var d0={kernelName:is,backendName:"cpu",kernelFunc:$x};function HV(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,dilations:a,pad:u,dimRoundingMode:c,filterShape:l}=r;H([n,s],"depthwiseConv2dNativeBackpropFilter");let p=y.computeConv2DInfo(n.shape,l,i,a,u,c,!0),{strideHeight:m,strideWidth:d,filterHeight:f,filterWidth:h}=p,g=new Dt(p.filterShape,"float32"),x=p.padInfo.left,b=p.padInfo.top,w=p.outChannels/p.inChannels,v=e.data.get(n.dataId).values,k=new Dt(n.shape,n.dtype,v),N=e.data.get(s.dataId).values,E=new Dt(s.shape,s.dtype,N);for(let R=0;R<f;++R){let A=Math.max(0,Math.ceil((b-R)/m)),F=Math.min(p.outHeight,(p.inHeight+b-R)/m);for(let P=0;P<h;++P){let _=Math.max(0,Math.ceil((x-P)/d)),O=Math.min(p.outWidth,(p.inWidth+x-P)/d);for(let M=0;M<p.outChannels;++M){let L=Math.trunc(M/w),W=M%w,X=0;for(let U=0;U<p.batchSize;++U)for(let q=A;q<F;++q){let Y=R+q*m-b;for(let Z=_;Z<O;++Z){let et=P+Z*d-x;X+=k.get(U,Y,et,L)*E.get(U,q,Z,M)}}g.set(X,R,P,L,W)}}}return e.makeTensorInfo(g.shape,g.dtype,g.values)}var f0={kernelName:as,backendName:"cpu",kernelFunc:HV};function KV(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{strides:i,dilations:a,pad:u,dimRoundingMode:c,inputShape:l}=r;H([n,s],"depthwiseConv2DNativeBackpropInput");let p=C.computeStrides(n.shape),m=C.computeStrides(s.shape),d=y.computeConv2DInfo(l,s.shape,i,a,u,c,!0),f=new Dt(d.inShape,"float32"),h=f.values,[g,x,b]=f.strides,w=e.data.get(n.dataId).values,[v,k,N]=p,E=e.data.get(s.dataId).values,[R,A,F]=m,{batchSize:P,filterHeight:_,filterWidth:O,inChannels:M,inHeight:L,inWidth:W,outChannels:X,outHeight:U,outWidth:q,strideHeight:Y,strideWidth:Z}=d,et=_-1-d.padInfo.top,J=O-1-d.padInfo.left,st=X/M;for(let ot=0;ot<P;++ot)for(let ut=0;ut<M;++ut)for(let ft=0;ft<L;++ft){let Ct=ft-et,gt=Math.max(0,Math.ceil(Ct/Y)),kt=Math.min(U,(_+Ct)/Y);for(let Tt=0;Tt<W;++Tt){let zt=Tt-J,Kt=Math.max(0,Math.ceil(zt/Z)),ce=Math.min(q,(O+zt)/Z),qt=0;for(let Wt=gt;Wt<kt;++Wt){let ae=Wt*Y-Ct;for(let oe=Kt;oe<ce;++oe){let lr=oe*Z-zt,Se=v*ot+k*Wt+N*oe,Rn=R*(_-1-ae)+A*(O-1-lr)+F*ut;for(let io=0;io<st;++io){let _i=ut*st+io,To=w[Se+_i],pr=E[Rn+io];qt+=To*pr}}}h[g*ot+x*ft+b*Tt+ut]=qt}}return e.makeTensorInfo(f.shape,f.dtype,f.values)}var h0={kernelName:us,backendName:"cpu",kernelFunc:KV};function qV(o){let{inputs:t,backend:e}=o,{x:r}=t,n=C.sizeFromShape(r.shape),s=e.data.get(r.dataId).values,i=nt([n,n],r.dtype),a=i.values;for(let c=0;c<s.length;c++)a[c*n+c]=s[c];let u=[...r.shape,...r.shape];return e.makeTensorInfo(u,i.dtype,i.values)}var g0={kernelName:cs,backendName:"cpu",kernelFunc:qV};var x0={kernelName:ls,backendName:"cpu",kernelFunc:({inputs:o,backend:t,attrs:e})=>{let{x:r,filter:n}=o,{strides:s,pad:i,dilations:a}=e,u=t,c=u.data.get(r.dataId).values,l=r.shape.length,p=u.data.get(n.dataId).values,m=n.shape.length,{batchSize:d,inHeight:f,inWidth:h,inChannels:g,outHeight:x,outWidth:b,padInfo:w,strideHeight:v,strideWidth:k,filterHeight:N,filterWidth:E,dilationHeight:R,dilationWidth:A,outShape:F}=y.computeDilation2DInfo(r.shape,n.shape,s,i,"NHWC",a),P=C.sizeFromShape(F),_=F.length,O=C.getArrayFromDType(r.dtype,P);for(let L=0;L<d;++L)for(let W=0;W<x;++W){let X=W*v-w.top;for(let U=0;U<b;++U){let q=U*k-w.left;for(let Y=0;Y<g;++Y){let Z=Number.MIN_SAFE_INTEGER;for(let J=0;J<N;++J){let st=X+J*R;if(st>=0&&st<f)for(let ot=0;ot<E;++ot){let ut=q+ot*A;if(ut>=0&&ut<h){let ft=C.locToIndex([L,st,ut,Y],l,C.computeStrides(r.shape)),Ct=C.locToIndex([J,ot,Y],m,C.computeStrides(n.shape)),gt=c[ft]+p[Ct];gt>Z&&(Z=gt)}}}let et=C.locToIndex([L,W,U,Y],_,C.computeStrides(F));O[et]=Z}}}return{dataId:u.write(C.toTypedArray(O,r.dtype),F,r.dtype),shape:F,dtype:r.dtype}}};var C0={kernelName:yc,backendName:"cpu",kernelFunc:({inputs:o,backend:t,attrs:e})=>{let{x:r,filter:n,dy:s}=o,{strides:i,pad:a,dilations:u}=e,c=t,l=C.toNestedArray(r.shape,c.data.get(r.dataId).values),p=C.toNestedArray(n.shape,c.data.get(n.dataId).values),{batchSize:m,inHeight:d,inWidth:f,inChannels:h,outHeight:g,outWidth:x,padInfo:b,strideHeight:w,strideWidth:v,filterHeight:k,filterWidth:N,dilationHeight:E,dilationWidth:R,outShape:A}=y.computeDilation2DInfo(r.shape,n.shape,i,a,"NHWC",u);C.assert(s.rank===A.length,()=>`Error in ${yc}, dy must have the same rank as output ${A.length}, but got ${s.rank}`);let F=C.toNestedArray(A,c.data.get(s.dataId).values),P=C.makeZerosNestedTypedArray(n.shape,n.dtype);for(let O=0;O<m;++O)for(let M=0;M<g;++M){let L=M*w-b.top;for(let W=0;W<x;++W){let X=W*v-b.left;for(let U=0;U<h;++U){let q=Number.MIN_SAFE_INTEGER,Y=0,Z=0;for(let et=0;et<k;++et){let J=L+et*E;if(J>=0&&J<d)for(let st=0;st<N;++st){let ot=X+st*R;if(ot>=0&&ot<f){let ut=l[O][J][ot][U]+p[et][st][U];ut>q&&(q=ut,Y=et,Z=st)}}}P[Y][Z][U]+=F[O][M][W][U]}}}return{dataId:c.write(C.toTypedArray(P,r.dtype),n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};var b0={kernelName:bc,backendName:"cpu",kernelFunc:({inputs:o,backend:t,attrs:e})=>{let{x:r,filter:n,dy:s}=o,{strides:i,pad:a,dilations:u}=e,c=t,l=C.toNestedArray(r.shape,c.data.get(r.dataId).values),p=C.toNestedArray(n.shape,c.data.get(n.dataId).values),{batchSize:m,inHeight:d,inWidth:f,inChannels:h,outHeight:g,outWidth:x,padInfo:b,strideHeight:w,strideWidth:v,filterHeight:k,filterWidth:N,dilationHeight:E,dilationWidth:R,outShape:A}=y.computeDilation2DInfo(r.shape,n.shape,i,a,"NHWC",u);C.assert(s.rank===A.length,()=>`Error in ${bc}, dy must have the same rank as output ${A.length}, but got ${s.rank}`);let F=C.toNestedArray(A,c.data.get(s.dataId).values),P=C.makeZerosNestedTypedArray(r.shape,r.dtype);for(let O=0;O<m;++O)for(let M=0;M<g;++M){let L=M*w-b.top;for(let W=0;W<x;++W){let X=W*v-b.left;for(let U=0;U<h;++U){let q=Number.MIN_SAFE_INTEGER,Y=L<0?0:L,Z=X<0?0:X;for(let et=0;et<k;++et){let J=L+et*E;if(J>=0&&J<d)for(let st=0;st<N;++st){let ot=X+st*R;if(ot>=0&&ot<f){let ut=l[O][J][ot][U]+p[et][st][U];ut>q&&(q=ut,Y=J,Z=ot)}}}P[O][Y][Z][U]+=F[O][M][W][U]}}}return{dataId:c.write(C.toTypedArray(P,r.dtype),r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};function XV(o){let{inputs:t,backend:e,attrs:r}=o,{image:n}=t,{canvas:s,options:i}=r,{contextOptions:a,imageOptions:u}=i||{},c=u?.alpha||1,l=a?.contextType||"2d";if(l!=="2d")throw new Error(`Context type ${a.contextType} is not supported by the CPU backend.`);let p=s.getContext(l,a?.contextAttributes||{});if(p==null)throw new Error(`Could not get the context with ${l} type.`);let[m,d]=n.shape.slice(0,2),f=n.shape.length===2?1:n.shape[2],h=e.data.get(n.dataId).values,g=n.dtype==="float32"?255:1,x=new Uint8ClampedArray(d*m*4);for(let w=0;w<m*d;++w){let v=[0,0,0,255*c];for(let N=0;N<f;N++){let E=h[w*f+N];if(n.dtype==="float32"){if(E<0||E>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${E}.`)}else if(n.dtype==="int32"&&(E<0||E>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${E}.`);f===1?(v[0]=E*g,v[1]=E*g,v[2]=E*g):v[N]=E*g}let k=w*4;x[k+0]=Math.round(v[0]),x[k+1]=Math.round(v[1]),x[k+2]=Math.round(v[2]),x[k+3]=Math.round(v[3])}s.width=d,s.height=m;let b=new ImageData(x,d,m);return p.putImageData(b,0,0),n}var y0={kernelName:Wi,backendName:"cpu",kernelFunc:XV};function wn(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;H(n,"sum");let a;n.dtype==="bool"?a=So({inputs:{x:n},backend:e,attrs:{dtype:"int32"}}):a=Ee({inputs:{x:n},backend:e});let u=a.shape.length,c=C.parseAxisParam(s,a.shape),l=y.getAxesPermutation(c,u),p=c,m=a;l!=null&&(m=Yt({inputs:{x:a},backend:e,attrs:{perm:l}}),p=y.getInnerMostAxes(p.length,u)),y.assertAxesAreInnerMostDims("sum",p,m.shape.length);let[d,f]=y.computeOutAndReduceShapes(m.shape,p),h=y.upcastType(m.dtype,"int32"),g=Ou(e,d,h),x=C.sizeFromShape(f),b=e.data.get(g.dataId).values,w=e.data.get(m.dataId).values;for(let v=0;v<b.length;++v){let k=v*x,N=0;for(let E=0;E<x;++E)N+=w[k+E];b[v]=N}if(i){let v=y.expandShapeToKeepDim(g.shape,c),k=g;g=It({inputs:{x:g},backend:e,attrs:{shape:v}}),e.disposeIntermediateTensorInfo(k)}return e.disposeIntermediateTensorInfo(a),l!=null&&e.disposeIntermediateTensorInfo(m),g}var w0={kernelName:"Sum",backendName:"cpu",kernelFunc:wn};function jV(o){let{inputs:t,backend:e,attrs:r}=o,{equation:n}=r,s=t,{allDims:i,summedDims:a,idDims:u}=y.decodeEinsumEquation(n,s.length);y.checkEinsumDimSizes(i.length,u,s);let{path:c,steps:l}=y.getEinsumComputePath(a,u),p=l.length,m=null,d=i.length,f=[];for(let h=0;h<p;++h){for(let g of l[h]){let{permutationIndices:x,expandDims:b}=y.getEinsumPermutation(d,u[g]),w;y.isIdentityPermutation(x)?w=s[g]:(w=Yt({inputs:{x:s[g]},backend:e,attrs:{perm:x}}),f.push(w));let v=w.shape.slice();for(let k=0;k<b.length;++k)v.splice(b[k],0,1);C.arraysEqual(w.shape,v)||(w=It({inputs:{x:w},backend:e,attrs:{shape:v}}),f.push(w)),m===null?m=w:(m=Na({inputs:{a:w,b:m},backend:e}),f.push(m))}h<p-1&&(c[h]>=0&&(m=wn({inputs:{x:m},backend:e,attrs:{axis:c[h]-(i.length-d),keepDims:!1}}),f.push(m)),d--)}for(let h of f)h!==m&&e.disposeIntermediateTensorInfo(h);return m}var S0={kernelName:ps,backendName:"cpu",kernelFunc:jV};function YV(o){let{inputs:t,backend:e}=o,{dy:r,y:n}=t;H([r,n],"eluGrad");let s=new Float32Array(C.sizeFromShape(n.shape)),i=e.data.get(n.dataId).values,a=e.data.get(r.dataId).values;for(let u=0;u<i.length;++u){let c=i[u];c>=0?s[u]=a[u]:s[u]=a[u]*(c+1)}return e.makeTensorInfo(n.shape,"float32",s)}var v0={kernelName:tu,backendName:"cpu",kernelFunc:YV};var QV=y.ERF_P,ZV=y.ERF_A1,JV=y.ERF_A2,tW=y.ERF_A3,eW=y.ERF_A4,oW=y.ERF_A5,rW=dt("Erf",o=>{let t=Math.sign(o),e=Math.abs(o),r=1/(1+QV*e);return t*(1-((((oW*r+eW)*r+tW)*r+JV)*r+ZV)*r*Math.exp(-e*e))}),I0={kernelName:"Erf",backendName:"cpu",kernelFunc:rW};function Wu(o){let{inputs:t,backend:e,attrs:r}=o,{input:n}=t,{dim:s}=r,i=n.shape.length,a=n.shape.slice(),u=s;return s<0&&(C.assert(-(i+1)<=s,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),u=i+s+1),a.splice(u,0,1),It({inputs:{x:n},backend:e,attrs:{shape:a}})}var k0={kernelName:hs,backendName:"cpu",kernelFunc:Wu};var nW=vt((o,t)=>o/t),Xc=Nt(Ir,nW),jc={kernelName:Ir,backendName:"cpu",kernelFunc:Xc};function Rp(o,t,e){let r=o.shape,n=r[0],s=r[1],i=e.data.get(o.dataId),a=i.complexTensorInfos.real,u=i.complexTensorInfos.imag,c=[n,s],l=C.sizeFromShape(c),p=C.getTypedArrayFromDType("float32",l),m=C.getTypedArrayFromDType("float32",l);for(let g=0;g<n;g++){let x=Io({inputs:{x:a},backend:e,attrs:{begin:[g,0],size:[1,s]}}),b=Io({inputs:{x:u},backend:e,attrs:{begin:[g,0],size:[1,s]}}),w=he({inputs:{real:x,imag:b},backend:e}),{real:v,imag:k}=sW(w,t,e),N=y.mergeRealAndImagArrays(v,k);for(let E=0;E<s;E++){let R=y.getComplexWithIndex(N,E);p[g*s+E]=R.real,m[g*s+E]=R.imag}e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(b),e.disposeIntermediateTensorInfo(w)}let d=e.makeTensorInfo(c,"float32",p),f=e.makeTensorInfo(c,"float32",m),h=he({inputs:{real:d,imag:f},backend:e});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),h}function sW(o,t,e){let r=C.sizeFromShape(o.shape),n=e.data.get(o.dataId),s=e.data.get(n.complexTensorInfos.real.dataId).values,i=e.data.get(n.complexTensorInfos.imag.dataId).values;if(iW(r)){let a=Tx(s,i,r,t,e),u=[o.shape[0],o.shape[1]];if(t){let c=e.makeTensorInfo(u,"float32",a.real),l=e.makeTensorInfo(u,"float32",a.imag),p=e.makeTensorInfo([],"float32",C.createScalarValue(r,"float32")),m=Ee({inputs:{x:p},backend:e}),d=jc.kernelFunc({inputs:{a:c,b:p},backend:e}),f=jc.kernelFunc({inputs:{a:l,b:m},backend:e}),h=e.data.get(d.dataId).values,g=e.data.get(f.dataId).values;return e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),{real:h,imag:g}}return a}else{let a=y.mergeRealAndImagArrays(s,i),u=aW(a,r,t);return y.splitRealAndImagArrays(u)}}function iW(o){return(o&o-1)===0}function Tx(o,t,e,r,n){if(e===1)return{real:o,imag:t};let s=y.mergeRealAndImagArrays(o,t),i=e/2,a=y.complexWithEvenIndex(s),u=a.real,c=a.imag,l=[u.length],p=n.makeTensorInfo(l,"float32",u),m=n.makeTensorInfo(l,"float32",c),d=he({inputs:{real:p,imag:m},backend:n}),f=y.complexWithOddIndex(s),h=f.real,g=f.imag,x=[h.length],b=n.makeTensorInfo(x,"float32",h),w=n.makeTensorInfo(x,"float32",g),v=he({inputs:{real:b,imag:w},backend:n}),k=Tx(u,c,i,r,n),N=k.real,E=k.imag,R=[N.length],A=n.makeTensorInfo(R,"float32",N),F=n.makeTensorInfo(R,"float32",E),P=he({inputs:{real:A,imag:F},backend:n}),_=Tx(h,g,i,r,n),O=_.real,M=_.imag,L=[O.length],W=n.makeTensorInfo(L,"float32",O),X=n.makeTensorInfo(L,"float32",M),U=he({inputs:{real:W,imag:X},backend:n}),q=y.exponents(e,r),Y=[q.real.length],Z=n.makeTensorInfo(Y,"float32",q.real),et=n.makeTensorInfo(Y,"float32",q.imag),J=he({inputs:{real:Z,imag:et},backend:n}),st=Na({inputs:{a:J,b:U},backend:n}),ot=rr({inputs:{a:P,b:st},backend:n}),ut=Hc({inputs:{a:P,b:st},backend:n}),ft=wo({inputs:{input:ot},backend:n}),Ct=wo({inputs:{input:ut},backend:n}),gt=nr({inputs:{input:ot},backend:n}),kt=nr({inputs:{input:ut},backend:n}),Tt=$i({inputs:[ft,Ct],backend:n,attrs:{axis:0}}),zt=$i({inputs:[gt,kt],backend:n,attrs:{axis:0}}),Kt=n.data.get(Tt.dataId).values,ce=n.data.get(zt.dataId).values;return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(w),n.disposeIntermediateTensorInfo(v),n.disposeIntermediateTensorInfo(A),n.disposeIntermediateTensorInfo(F),n.disposeIntermediateTensorInfo(P),n.disposeIntermediateTensorInfo(W),n.disposeIntermediateTensorInfo(X),n.disposeIntermediateTensorInfo(U),n.disposeIntermediateTensorInfo(Z),n.disposeIntermediateTensorInfo(et),n.disposeIntermediateTensorInfo(J),n.disposeIntermediateTensorInfo(st),n.disposeIntermediateTensorInfo(ot),n.disposeIntermediateTensorInfo(ut),n.disposeIntermediateTensorInfo(ft),n.disposeIntermediateTensorInfo(gt),n.disposeIntermediateTensorInfo(Ct),n.disposeIntermediateTensorInfo(kt),n.disposeIntermediateTensorInfo(Tt),n.disposeIntermediateTensorInfo(zt),{real:Kt,imag:ce}}function aW(o,t,e){let r=new Float32Array(t*2);for(let n=0;n<t;n++){let s=0,i=0;for(let a=0;a<t;a++){let u=y.exponent(n*a,t,e),c=y.getComplexWithIndex(o,a);s+=c.real*u.real-c.imag*u.imag,i+=c.real*u.imag+c.imag*u.real}e&&(s/=t,i/=t),y.assignToTypedArray(r,s,i,n)}return r}function uW(o){let{inputs:t,backend:e}=o,{input:r}=t,n=C.sizeFromShape(r.shape),s=r.shape[r.shape.length-1],i=n/s,a=It({inputs:{x:r},backend:e,attrs:{shape:[i,s]}}),u=Rp(a,!1,e),c=It({inputs:{x:u},backend:e,attrs:{shape:r.shape}});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(u),c}var $0={kernelName:"FFT",backendName:"cpu",kernelFunc:uW};function Yc(o){let{backend:t,attrs:e}=o,{shape:r,value:n,dtype:s}=e,i=s||C.inferDtype(n),a=C.getArrayFromDType(i,C.sizeFromShape(r));return cW(a,n,i),t.makeTensorInfo(r,i,a)}var T0={kernelName:gs,backendName:"cpu",kernelFunc:Yc};function cW(o,t,e){o.fill(t)}var N0={kernelName:xs,backendName:"cpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{image:r}=o,n=e,s=C.getTypedArrayFromDType(r.dtype,C.sizeFromShape(r.shape)),[i,a,u,c]=r.shape,l=n.data.get(r.dataId).values;for(let m=0;m<i;m++){let d=m*u*a*c;for(let f=0;f<a;f++){let h=f*(u*c);for(let g=0;g<u;g++){let x=g*c;for(let b=0;b<c;b++){let w=Math.round(u-g-1),v=d+h+x+b,k=l[v];if(w>=0&&w<u){let N=w*c,E=d+h+N+b;k=l[E]}s[v]=k}}}}return{dataId:n.write(s,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};function lW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s,bias:i,preluActivationWeights:a}=t,{strides:u,pad:c,dataFormat:l,dilations:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=r,h=kx({inputs:{x:n,filter:s},backend:e,attrs:{strides:u,pad:c,dataFormat:l,dilations:p,dimRoundingMode:m}});if(i){let g=h;if(l==="NCHW"&&i.shape.length===1&&i.shape[0]!==1){let x=It({inputs:{x:i},backend:e,attrs:{shape:[i.shape[0],1,1]}});h=rr({inputs:{a:h,b:x},backend:e}),e.disposeIntermediateTensorInfo(x)}else h=rr({inputs:{a:h,b:i},backend:e});e.disposeIntermediateTensorInfo(g)}if(d){let g=h;if(l==="NCHW"&&d==="prelu"&&a.shape.length===1&&a.shape[0]!==1){let x=It({inputs:{x:a},backend:e,attrs:{shape:[a.shape[0],1,1]}});h=Ea(e,h,d,x,f),e.disposeIntermediateTensorInfo(x)}else h=Ea(e,h,d,a,f);e.disposeIntermediateTensorInfo(g)}return h}var E0={kernelName:sn,backendName:"cpu",kernelFunc:lW};function pW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s,bias:i,preluActivationWeights:a}=t,{strides:u,pad:c,dataFormat:l,dilations:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=r,h=$x({inputs:{x:n,filter:s},backend:e,attrs:{strides:u,pad:c,dataFormat:l,dilations:p,dimRoundingMode:m}});if(i){let g=h;h=rr({inputs:{a:h,b:i},backend:e}),e.disposeIntermediateTensorInfo(g)}if(d){let g=h;h=Ea(e,h,d,a,f),e.disposeIntermediateTensorInfo(g)}return h}var R0={kernelName:an,backendName:"cpu",kernelFunc:pW};function mW(o){let{inputs:t,backend:e}=o,{params:r,indices:n}=t,s=C.sizeFromShape(r.shape),i=n.shape,a=i[i.length-1],[u,c,l,p]=y.prepareAndValidate(r,n);if(c===0)return e.makeTensorInfo(u,r.dtype,[]);let m=e.data.get(n.dataId).values,d=e.bufferSync(r),f=pp(m,d,r.dtype,c,a,l,p,r.shape,s);return e.makeTensorInfo(u,r.dtype,f.values)}var D0={kernelName:ys,backendName:"cpu",kernelFunc:mW};function dW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,indices:s}=t,{axis:i,batchDims:a}=r;H([n,s],"gatherV2");let u=C.parseAxisParam(i,n.shape)[0],c=e.data.get(s.dataId).values,l=n.shape[u];for(let v=0;v<c.length;++v){let k=c[v];C.assert(k<=l-1&&k>=0,()=>`GatherV2: the index value ${k} is not in [0, ${l-1}]`)}let p=a;a==null&&(p=0);let m=C.sizeFromShape(s.shape),d=y.segment_util.collectGatherOpShapeInfo(n,s,u,p),f=It({inputs:{x:n},backend:e,attrs:{shape:[d.batchSize,d.outerSize,d.dimSize,d.sliceSize]}}),h=It({inputs:{x:s},backend:e,attrs:{shape:[d.batchSize,m/d.batchSize]}}),g=[d.batchSize,d.outerSize,m/d.batchSize,d.sliceSize],x=e.bufferSync(h),b=e.bufferSync(f),w=mp(b,x,g);return e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),e.makeTensorInfo(d.outputShape,w.dtype,w.values)}var A0={kernelName:bs,backendName:"cpu",kernelFunc:dW};function fW(o){let{inputs:t,backend:e}=o,{input:r}=t,n=C.sizeFromShape(r.shape),s=r.shape[r.shape.length-1],i=n/s,a=It({inputs:{x:r},backend:e,attrs:{shape:[i,s]}}),u=Rp(a,!0,e),c=It({inputs:{x:u},backend:e,attrs:{shape:r.shape}});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(u),c}var F0={kernelName:ws,backendName:"cpu",kernelFunc:fW};var hW=dt(Dr,o=>Number.isFinite(o)?1:0,"bool"),P0={kernelName:Dr,backendName:"cpu",kernelFunc:hW};var gW=dt(Ar,o=>Math.abs(o)===1/0?1:0,"bool"),_0={kernelName:Ar,backendName:"cpu",kernelFunc:gW};var xW=dt(Fr,o=>Number.isNaN(o)?1:0,"bool"),O0={kernelName:Fr,backendName:"cpu",kernelFunc:xW};function CW(o){let{backend:t,attrs:e}=o,{start:r,stop:n,num:s}=e,i=dp(r,n,s);return t.makeTensorInfo([i.length],"float32",i)}var M0={kernelName:Is,backendName:"cpu",kernelFunc:CW};var bW=dt(Or,o=>Math.log1p(o)),L0={kernelName:Or,backendName:"cpu",kernelFunc:bW};var yW=vt((o,t)=>o&&t),wW=Nt(Mr,yW,null,"bool"),B0={kernelName:Mr,backendName:"cpu",kernelFunc:wW};var SW=dt(Lr,o=>o?0:1,"bool"),z0={kernelName:Lr,backendName:"cpu",kernelFunc:SW};var vW=vt((o,t)=>o||t),IW=Nt(Br,vW,null,"bool"),V0={kernelName:Br,backendName:"cpu",kernelFunc:IW};function kW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{depthRadius:s,bias:i,alpha:a,beta:u}=r;H(n,"LRN");let c=n.shape[3],l=c-1,p=e.data.get(n.dataId).values,m=C.sizeFromShape(n.shape),d=new Float32Array(m);function f(h){let g=h%c,x=h-g+Math.max(0,g-s),b=h-g+Math.min(g+s,l),w=0;for(;x<=b;x++){let v=p[x];w+=v*v}return w}for(let h=0;h<m;h++){let g=f(h),x=p[h]*Math.pow(i+a*g,-u);d[h]=x}return e.makeTensorInfo(n.shape,n.dtype,d)}var W0={kernelName:"LRN",backendName:"cpu",kernelFunc:kW};function $W(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,y:s,dy:i}=t,{depthRadius:a,bias:u,alpha:c,beta:l}=r;H(i,"LRNGrad");let p=C.sizeFromShape(i.shape),m=i.shape[3],d=e.data.get(i.dataId).values,f=e.data.get(n.dataId).values,h=e.data.get(s.dataId).values,g=new Float32Array(p),x=p;for(let b=0;b<x;b++){let w=b%m,v=b-w+Math.max(0,w-a),k=b-w+Math.min(m,w+a+1),N=0;for(let E=v;E<k;E++)N+=Math.pow(f[E],2);N=c*N+u;for(let E=v;E<k;E++){let R=-2*c*l*f[E]*h[b]/N;b===E&&(R+=Math.pow(N,-l)),R*=d[b],g[E]+=R}}return e.makeTensorInfo(i.shape,n.dtype,g)}var U0={kernelName:eu,backendName:"cpu",kernelFunc:$W};function Nx(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{reductionIndices:s,keepDims:i}=r,a=e,u=n.shape,c=u.length,l=C.parseAxisParam(s,u),p=l,m=y.getAxesPermutation(p,c),d=a.data.get(n.dataId).values;if(m!=null){let v=new Array(c);for(let k=0;k<v.length;k++)v[k]=u[m[k]];d=Bu(d,u,n.dtype,m,v),p=y.getInnerMostAxes(p.length,c),u=v}H(n,"max"),y.assertAxesAreInnerMostDims("max",p,c);let[f,h]=y.computeOutAndReduceShapes(u,p),g=C.sizeFromShape(h),x=fp(d,g,f,n.dtype),b=a.write(x,f,n.dtype),w=f;return i&&(w=y.expandShapeToKeepDim(f,l)),{dataId:b,shape:w,dtype:n.dtype}}var G0={kernelName:"Max",backendName:"cpu",kernelFunc:Nx};function TW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t;H(n,"maxPool");let{filterSize:s,strides:i,pad:a,dimRoundingMode:u}=r,c=1;C.assert(y.eitherStridesOrDilationsAreOne(i,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);let l=y.computePool2DInfo(n.shape,s,i,c,a,u),p;if(l.filterWidth===1&&l.filterHeight===1&&C.arraysEqual(l.inShape,l.outShape))p=Ee({inputs:{x:n},backend:e});else{let m=e.data.get(n.dataId).values,d=C.computeStrides(n.shape),f=Vu(m,n.shape,n.dtype,d,l,"max");p=e.makeTensorInfo(l.outShape,n.dtype,f.values)}return p}var H0={kernelName:$s,backendName:"cpu",kernelFunc:TW};function NW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{filterSize:s,strides:i,pad:a,dimRoundingMode:u,dataFormat:c}=r;H(n,"maxPool3d");let l=y.computePool3DInfo(n.shape,s,i,1,a,u,c),p=e.data.get(n.dataId).values,m=Ep(p,n.shape,n.dtype,C.computeStrides(n.shape),l,"max");return e.makeTensorInfo(m.shape,"float32",m.values)}var K0={kernelName:Ts,backendName:"cpu",kernelFunc:NW};function EW(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,{filterSize:i,strides:a,pad:u,dimRoundingMode:c}=r;H([n,s],"maxPool3DGrad");let l=y.computePool3DInfo(s.shape,i,a,1,u,c),p=e.bufferSync(s),m=VS(p,l),d=l.strideDepth,f=l.strideHeight,h=l.strideWidth,g=l.dilationDepth,x=l.dilationHeight,b=l.dilationWidth,w=l.effectiveFilterDepth,v=l.effectiveFilterHeight,k=l.effectiveFilterWidth,N=w-1-l.padInfo.front,E=k-1-l.padInfo.left,R=v-1-l.padInfo.top,A=nt(s.shape,"float32"),F=e.bufferSync(n);for(let P=0;P<l.batchSize;++P)for(let _=0;_<l.inChannels;++_)for(let O=0;O<l.inDepth;++O)for(let M=0;M<l.inHeight;++M)for(let L=0;L<l.inWidth;++L){let W=O-N,X=M-R,U=L-E,q=0;for(let Y=0;Y<w;Y+=g){let Z=(W+Y)/d;if(!(Z<0||Z>=l.outDepth||Math.floor(Z)!==Z))for(let et=0;et<v;et+=x){let J=(X+et)/f;if(!(J<0||J>=l.outHeight||Math.floor(J)!==J))for(let st=0;st<k;st+=b){let ot=(U+st)/h;if(ot<0||ot>=l.outWidth||Math.floor(ot)!==ot)continue;let ut=w*v*k-1-m.get(P,Z,J,ot,_),ft=Y*v*k+et*k+st,Ct=ut===ft?1:0;if(Ct===0)continue;let gt=F.get(P,Z,J,ot,_);q+=gt*Ct}}}A.set(q,P,O,M,L,_)}return e.makeTensorInfo(A.shape,A.dtype,A.values)}var q0={kernelName:ru,backendName:"cpu",kernelFunc:EW};function RW(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s,output:i}=t,a=s;H([s,i],"maxPoolGrad");let{filterSize:u,strides:c,pad:l,dimRoundingMode:p}=r,m=y.computePool2DInfo(a.shape,u,c,1,l,p),d=e.data.get(a.dataId).values,f=nt(m.outShape,a.dtype,Np(d,a.shape,a.dtype,m).values),h=m.strideHeight,g=m.strideWidth,x=m.dilationHeight,b=m.dilationWidth,w=m.effectiveFilterHeight,v=m.effectiveFilterWidth,k=v-1-m.padInfo.left,N=w-1-m.padInfo.top,E=nt(a.shape,"float32"),R=e.data.get(n.dataId).values,A=nt(n.shape,"float32",R);for(let F=0;F<m.batchSize;++F)for(let P=0;P<m.inChannels;++P)for(let _=0;_<m.inHeight;++_)for(let O=0;O<m.inWidth;++O){let M=_-N,L=O-k,W=0;for(let X=0;X<w;X+=x){let U=(M+X)/h;if(!(U<0||U>=m.outHeight||Math.floor(U)!==U))for(let q=0;q<v;q+=b){let Y=(L+q)/g;if(Y<0||Y>=m.outWidth||Math.floor(Y)!==Y)continue;let Z=w*v-1-f.get(F,U,Y,P),et=X*v+q,J=Z===et?1:0;if(J===0)continue;let st=A.get(F,U,Y,P);W+=st*J}}E.set(W,F,_,O,P)}return e.makeTensorInfo(E.shape,E.dtype,E.values)}var X0={kernelName:ou,backendName:"cpu",kernelFunc:RW};function j0(o,t,e,r,n){let s=C.computeStrides(t),i=Vu(o,t,e,s,n,"max"),a=Np(o,t,e,n,!0,r);return[i.values,a.values]}var Y0={kernelName:Ns,backendName:"cpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{x:r}=o,{filterSize:n,strides:s,pad:i,includeBatchInIndex:a}=t,u=e;H(r,"MaxPoolWithArgmax");let c=u.data.get(r.dataId).values,l=y.computePool2DInfo(r.shape,n,s,[1,1],i),[p,m]=j0(c,r.shape,r.dtype,a,l),d=u.write(p,l.outShape,r.dtype),f=u.write(m,l.outShape,r.dtype);return[{dataId:d,shape:l.outShape,dtype:r.dtype},{dataId:f,shape:l.outShape,dtype:"int32"}]}};function DW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r,a=C.parseAxisParam(s,n.shape),c=y.computeOutAndReduceShapes(n.shape,a)[1],l=C.sizeFromShape(c),p=[],m=e.makeTensorInfo([],"float32",new Float32Array([l]));p.push(m);let d=So({inputs:{x:n},backend:e,attrs:{dtype:"float32"}});p.push(d);let f=Xc({inputs:{a:d,b:m},backend:e});p.push(f);let h=wn({inputs:{x:f},backend:e,attrs:{axis:s,keepDims:i}});return p.forEach(g=>e.disposeIntermediateTensorInfo(g)),h}var Q0={kernelName:Es,backendName:"cpu",kernelFunc:DW};function AW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;H(n,"min");let a=C.parseAxisParam(s,n.shape),u=a,c=y.getAxesPermutation(u,n.shape.length),l=n;c!=null&&(l=Yt({inputs:{x:n},backend:e,attrs:{perm:c}}),u=y.getInnerMostAxes(u.length,n.shape.length)),y.assertAxesAreInnerMostDims("min",u,l.shape.length);let[p,m]=y.computeOutAndReduceShapes(l.shape,u),d=C.sizeFromShape(m),f=C.makeZerosTypedArray(C.sizeFromShape(p),l.dtype),h=e.data.get(l.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,w=h[b];for(let v=0;v<d;++v){let k=h[b+v];(Number.isNaN(k)||k<w)&&(w=k)}f[x]=w}c!=null&&e.disposeIntermediateTensorInfo(l);let g=e.makeTensorInfo(p,l.dtype,f);if(i){let x=y.expandShapeToKeepDim(p,a),b=It({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}var Z0={kernelName:"Min",backendName:"cpu",kernelFunc:AW};function FW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{paddings:s,mode:i}=r;H(n,"mirrorPad");let a=s.map((w,v)=>w[0]+n.shape[v]+w[1]),u=s.map(w=>w[0]),c=s.map((w,v)=>w[0]+n.shape[v]),l=i==="reflect"?0:1,p=e.data.get(n.dataId).values,m=n.shape.length,d=C.computeStrides(n.shape),f=C.sizeFromShape(a),h=a.length,g=C.computeStrides(a),x=C.getTypedArrayFromDType(n.dtype,f);for(let w=0;w<f;w++){let v=C.indexToLoc(w,h,g);for(let N=0;N<h;N++)v[N]<u[N]?v[N]=u[N]*2-v[N]-l:v[N]>=c[N]&&(v[N]=(c[N]-1)*2-v[N]+l);v=v.map((N,E)=>N-u[E]);let k=C.locToIndex(v,m,d);x[w]=p[k]}return{dataId:e.write(x,a,n.dtype),shape:a,dtype:n.dtype}}var J0={kernelName:Rs,backendName:"cpu",kernelFunc:FW};var PW=vt(((o,t)=>{let e=o%t;return o<0&&t<0||o>=0&&t>=0?e:(e+t)%t})),_W=Nt("Mod",PW),tv={kernelName:"Mod",backendName:"cpu",kernelFunc:_W};var ov=th(xg());function Ex(o){let{inputs:t,backend:e,attrs:r}=o,{logits:n}=t,{dim:s}=r,i=n.shape.length,a=s;if(a===-1&&(a=i-1),a!==i-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${i} and dim was ${a}`);let u=C.parseAxisParam([a],n.shape),c=Nx({inputs:{x:n},backend:e,attrs:{reductionIndices:u,keepDims:!1}}),l=y.expandShapeToKeepDim(c.shape,u),p=It({inputs:{x:c},backend:e,attrs:{shape:l}}),m=Hc({inputs:{a:n,b:p},backend:e}),d=Qg({inputs:{x:m},backend:e}),f=wn({inputs:{x:d},backend:e,attrs:{axis:u,keepDims:!1}}),h=It({inputs:{x:f},backend:e,attrs:{shape:l}}),g=Xc({inputs:{a:d,b:h},backend:e});return e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),g}var ev={kernelName:oi,backendName:"cpu",kernelFunc:Ex};function OW(o){let{inputs:t,backend:e,attrs:r}=o,{logits:n}=t,{numSamples:s,seed:i,normalized:a}=r;H(n,"multinomial");let u=a?n:Ex({inputs:{logits:n},backend:e,attrs:{dim:-1}}),c=u.shape[0],l=u.shape[1],p=e.data.get(u.dataId).values,m=[c,s],d=C.makeZerosTypedArray(C.sizeFromShape(m),"int32");for(let f=0;f<c;++f){let h=f*l,g=new Float32Array(l-1);g[0]=p[h];for(let w=1;w<g.length;++w)g[w]=g[w-1]+p[h+w];let x=ov.alea(i.toString()),b=f*s;for(let w=0;w<s;++w){let v=x();d[b+w]=g.length;for(let k=0;k<g.length;k++)if(v<g[k]){d[b+w]=k;break}}}return a||e.disposeIntermediateTensorInfo(u),e.makeTensorInfo(m,"int32",d)}var rv={kernelName:As,backendName:"cpu",kernelFunc:OW};var MW=de.nonMaxSuppressionV3Impl;function LW(o){let{inputs:t,backend:e,attrs:r}=o,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:u}=r;H(n,"NonMaxSuppression");let c=e.data.get(n.dataId).values,l=e.data.get(s.dataId).values,{selectedIndices:p}=MW(c,l,i,a,u);return e.makeTensorInfo([p.length],"int32",new Int32Array(p))}var nv={kernelName:Fs,backendName:"cpu",kernelFunc:LW};var BW=de.nonMaxSuppressionV4Impl;function zW(o){let{inputs:t,backend:e,attrs:r}=o,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:u,padToMaxOutputSize:c}=r;H(n,"NonMaxSuppressionPadded");let l=e.data.get(n.dataId).values,p=e.data.get(s.dataId).values,{selectedIndices:m,validOutputs:d}=BW(l,p,i,a,u,c);return[e.makeTensorInfo([m.length],"int32",new Int32Array(m)),e.makeTensorInfo([],"int32",new Int32Array([d]))]}var sv={kernelName:nu,backendName:"cpu",kernelFunc:zW};var VW=de.nonMaxSuppressionV5Impl;function WW(o){let{inputs:t,backend:e,attrs:r}=o,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:u,softNmsSigma:c}=r;H(n,"NonMaxSuppressionWithScore");let l=e.data.get(n.dataId).values,p=e.data.get(s.dataId).values,m=i,d=a,f=u,h=c,{selectedIndices:g,selectedScores:x}=VW(l,p,m,d,f,h);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var iv={kernelName:Ps,backendName:"cpu",kernelFunc:WW};function UW(o){let{inputs:t,backend:e,attrs:r}=o,{indices:n}=t,{dtype:s,depth:i,onValue:a,offValue:u}=r;H(n,"oneHot");let c=C.sizeFromShape(n.shape),l=new Float32Array(c*i);l.fill(u);let p=e.data.get(n.dataId).values;for(let m=0;m<c;++m)p[m]>=0&&p[m]<i&&(l[m*i+p[m]]=a);return e.makeTensorInfo([...n.shape,i],s,l)}var av={kernelName:Os,backendName:"cpu",kernelFunc:UW};function Qc(o){let{inputs:t,backend:e}=o,{x:r}=t;if(r.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(r.dtype==="complex64"){let n=wo({inputs:{input:r},backend:e}),s=Qc({inputs:{x:n},backend:e}),i=nr({inputs:{input:r},backend:e}),a=Qc({inputs:{x:i},backend:e}),u=he({inputs:{real:s,imag:a},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(a),u}else return Yc({backend:e,attrs:{shape:r.shape,value:0,dtype:r.dtype}})}var uv={kernelName:fi,backendName:"cpu",kernelFunc:Qc};function cv(o){let{inputs:t,backend:e}=o,{x:r}=t;if(r.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(r.dtype==="complex64"){let n=wo({inputs:{input:r},backend:e}),s=cv({inputs:{x:n},backend:e}),i=nr({inputs:{input:r},backend:e}),a=Qc({inputs:{x:i},backend:e}),u=he({inputs:{real:s,imag:a},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(a),u}else return Yc({backend:e,attrs:{shape:r.shape,value:1,dtype:r.dtype}})}var lv={kernelName:_s,backendName:"cpu",kernelFunc:cv};function Rx(o){let{inputs:t,backend:e,attrs:r}=o,{axis:n}=r;if(t.length===1)return Wu({inputs:{input:t[0]},backend:e,attrs:{dim:n}});let s=t[0].shape,i=t[0].dtype;t.forEach(l=>{C.assertShapesMatch(s,l.shape,"All tensors passed to stack must have matching shapes"),C.assert(i===l.dtype,()=>"All tensors passed to stack must have matching dtypes")});let a=[],u=t.map(l=>{let p=Wu({inputs:{input:l},backend:e,attrs:{dim:n}});return a.push(p),p}),c=$i({inputs:u,backend:e,attrs:{axis:n}});return a.forEach(l=>e.disposeIntermediateTensorInfo(l)),c}var pv={kernelName:Ms,backendName:"cpu",kernelFunc:Rx};function GW(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{paddings:s,constantValue:i}=r;H(n,"pad");let a=s.map((b,w)=>b[0]+n.shape[w]+b[1]),u=s.map(b=>b[0]),c=e.data.get(n.dataId).values,l=C.sizeFromShape(n.shape),p=n.shape.length,m=C.computeStrides(n.shape),d=C.sizeFromShape(a),f=a.length,h=C.computeStrides(a),g=C.getTypedArrayFromDType(n.dtype,d);i!==0&&g.fill(i);for(let b=0;b<l;b++){let v=C.indexToLoc(b,p,m).map((N,E)=>N+u[E]),k=C.locToIndex(v,f,h);g[k]=c[b]}return{dataId:e.write(g,a,n.dtype),shape:a,dtype:n.dtype}}var Dp={kernelName:Ls,backendName:"cpu",kernelFunc:GW};var HW=vt((o,t)=>Math.pow(o,t)),KW=Nt("Pow",HW),mv={kernelName:"Pow",backendName:"cpu",kernelFunc:KW};function qW(o){let{inputs:t,backend:e,attrs:r}=o,{paramsNestedSplits:n,paramsDenseValues:s,indices:i}=t,{outputRaggedRank:a}=r,u=n.map(x=>e.data.get(x.dataId).values),c=n.map(x=>x.shape),l=e.data.get(s.dataId).values,p=e.data.get(i.dataId).values,[m,d,f]=hp(u,c,l,s.shape,s.dtype,p,i.shape,a),h=m.map(x=>e.makeTensorInfo([x.length],"int32",x)),g=e.makeTensorInfo(f,s.dtype,d);return h.concat([g])}var dv={kernelName:su,backendName:"cpu",kernelFunc:qW};function XW(o){let{inputs:t,backend:e}=o,{starts:r,limits:n,deltas:s}=t,i=e.data.get(r.dataId).values,a=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,[c,l]=gp(i,r.shape,r.dtype,a,n.shape,u,s.shape),p=e.makeTensorInfo([c.length],"int32",c),m=e.makeTensorInfo([l.length],r.dtype,l);return[p,m]}var fv={kernelName:iu,backendName:"cpu",kernelFunc:XW};function jW(o){let{inputs:t,backend:e,attrs:r}=o,{shape:n,values:s,defaultValue:i,rowPartitionTensors:a}=t,{rowPartitionTypes:u}=r,c=e.data.get(n.dataId).values,l=e.data.get(s.dataId).values,p=e.data.get(i.dataId).values,m=a.map(g=>e.data.get(g.dataId).values),d=a.map(g=>g.shape),[f,h]=xp(c,n.shape,l,s.shape,s.dtype,p,i.shape,m,d,u);return e.makeTensorInfo(f,s.dtype,h)}var hv={kernelName:au,backendName:"cpu",kernelFunc:jW};function YW(o){let{backend:t,attrs:e}=o,{start:r,stop:n,dtype:s,step:i}=e,a=Cp(r,n,i,s);return t.makeTensorInfo([a.length],s,a)}var gv={kernelName:Ws,backendName:"cpu",kernelFunc:YW};var QW=dt(Gr,o=>1/o),xv={kernelName:Gr,backendName:"cpu",kernelFunc:QW};function ZW(o){let{inputs:t,backend:e,attrs:r}=o,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:a}=r;H(n,"resizeBilinear");let u=C.computeStrides(n.shape),[c,l]=a,[p,m,d,f]=n.shape,h=e.data.get(n.dataId).values,g=new Float32Array(C.sizeFromShape([p,c,l,f])),x=[s&&c>1?m-1:m,s&&l>1?d-1:d],b=[s&&c>1?c-1:c,s&&l>1?l-1:l],w=0,v=x[0]/b[0],k=x[1]/b[1];for(let N=0;N<p;N++)for(let E=0;E<c;E++){let R;i?R=v*(E+.5)-.5:R=v*E;let A=Math.max(0,Math.floor(R)),F=R-A,P=Math.min(m-1,Math.ceil(R)),_=N*u[0]+A*u[1],O=N*u[0]+P*u[1];for(let M=0;M<l;M++){let L;i?L=k*(M+.5)-.5:L=k*M;let W=Math.max(0,Math.floor(L)),X=L-W,U=Math.min(d-1,Math.ceil(L)),q=_+W*u[2],Y=O+W*u[2],Z=_+U*u[2],et=O+U*u[2];for(let J=0;J<f;J++){let st=h[q+J],ot=h[Y+J],ut=h[Z+J],ft=h[et+J],Ct=st+(ut-st)*X,gt=ot+(ft-ot)*X,kt=Ct+(gt-Ct)*F;g[w++]=kt}}}return e.makeTensorInfo([p,c,l,f],"float32",g)}var Cv={kernelName:Ks,backendName:"cpu",kernelFunc:ZW};function JW(o){let{inputs:t,backend:e,attrs:r}=o,{images:n,dy:s}=t,{alignCorners:i}=r;H([s,n],"resizeBilinearGrad");let a=C.computeStrides(n.shape),[u,c,l,p]=n.shape,[,m,d]=s.shape,f=new Float32Array(u*c*l*p),h=[i&&m>1?c-1:c,i&&d>1?l-1:l],g=[i&&m>1?m-1:m,i&&d>1?d-1:d],x=h[0]/g[0],b=h[1]/g[1],w=e.data.get(s.dataId).values,v=0;for(let k=0;k<u;k++){let N=k*a[0];for(let E=0;E<m;E++){let R=E*x,A=Math.floor(R),F=Math.min(Math.ceil(R),c-1),P=N+A*a[1],_=N+F*a[1],O=R-A,M=1-O;for(let L=0;L<d;L++){let W=L*b,X=Math.floor(W),U=Math.min(Math.ceil(W),l-1),q=W-X,Y=1-q,Z=P+X*a[2],et=P+U*a[2],J=_+X*a[2],st=_+U*a[2],ot=M*Y,ut=M*q,ft=O*Y,Ct=O*q;for(let gt=0;gt<p;gt++){let kt=w[v++];f[Z+gt]+=kt*ot,f[et+gt]+=kt*ut,f[J+gt]+=kt*ft,f[st+gt]+=kt*Ct}}}}return e.makeTensorInfo([u,l,c,p],"float32",f)}var bv={kernelName:cu,backendName:"cpu",kernelFunc:JW};function tU(o){let{inputs:t,backend:e,attrs:r}=o,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:a}=r;H(n,"resizeNearestNeighbor");let u=C.computeStrides(n.shape),[c,l]=a,[p,m,d,f]=n.shape,h=e.data.get(n.dataId).values,g=new Float32Array(p*c*l*f),x=[s&&c>1?m-1:m,s&&l>1?d-1:d],b=[s&&c>1?c-1:c,s&&l>1?l-1:l],w=x[0]/b[0],v=x[1]/b[1],k=0;for(let N=0;N<p;N++){let E=N*u[0];for(let R=0;R<c;R++){let A=i?w*(R+.5):w*R,F=Math.min(m-1,s?Math.round(A):Math.floor(A));i&&(F=Math.max(0,F));let P=E+F*u[1];for(let _=0;_<l;_++){let O=i?v*(_+.5):v*_,M=Math.min(d-1,s?Math.round(O):Math.floor(O));i&&(M=Math.max(0,M));let L=P+M*u[2];for(let W=0;W<f;W++){let X=h[L+W];g[k++]=X}}}}return e.makeTensorInfo([p,c,l,f],n.dtype,g)}var yv={kernelName:Hs,backendName:"cpu",kernelFunc:tU};function eU(o){let{inputs:t,backend:e,attrs:r}=o,{images:n,dy:s}=t,{alignCorners:i}=r;H([s,n],"resizeNearestNeighborGrad");let a=C.computeStrides(n.shape),u=C.computeStrides(s.shape),[c,l,p,m]=n.shape,[,d,f]=s.shape,h=new Float32Array(c*l*p*m),g=e.data.get(s.dataId).values,x=[i&&d>1?l-1:l,i&&f>1?p-1:p],b=[i&&d>1?d-1:d,i&&f>1?f-1:f],w=x[0]/b[0],v=x[1]/b[1],k=1/w,N=1/v,E=Math.ceil(k)*2+2,R=Math.ceil(N)*2+2;for(let A=0;A<c;A++){let F=A*a[0];for(let P=0;P<l;P++){let _=F+P*a[1],O=Math.floor(P*k),M=Math.floor(O-E/2);for(let L=0;L<p;L++){let W=_+L*a[2],X=Math.floor(L*N),U=Math.floor(X-R/2);for(let q=0;q<m;q++){let Y=0;for(let Z=0;Z<E;Z++){let et=Z+M;if(et<0||et>=d)continue;let J=F+et*u[1],st=et*w,ot=Math.min(l-1,i?Math.round(st):Math.floor(st));if(P===ot)for(let ut=0;ut<R;ut++){let ft=ut+U;if(ft<0||ft>=f)continue;let Ct=J+ft*u[2],gt=ft*v,kt=Math.min(p-1,i?Math.round(gt):Math.floor(gt));L===kt&&(Y+=g[Ct+q])}}h[W+q]=Y}}}}return e.makeTensorInfo(n.shape,n.dtype,h)}var wv={kernelName:uu,backendName:"cpu",kernelFunc:eU};function oU(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{dims:s}=r;H(n,"reverse");let i=n.shape.length,a=C.parseAxisParam(s,n.shape);if(i===0)return Ee({inputs:{x:n},backend:e});let u=new Dt(n.shape,n.dtype),c=e.bufferSync(n);for(let l=0;l<u.size;l++){let p=u.indexToLoc(l),m=p.slice();a.forEach(d=>m[d]=n.shape[d]-1-m[d]),u.set(c.get(...m),...p)}return e.makeTensorInfo(u.shape,u.dtype,u.values)}var Sv={kernelName:qs,backendName:"cpu",kernelFunc:oU};var vv={kernelName:hi,backendName:"cpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{image:r}=o,{radians:n,fillValue:s,center:i}=t,a=e,u=C.getTypedArrayFromDType(r.dtype,C.sizeFromShape(r.shape)),[c,l,p,m]=r.shape,[d,f]=y.getImageCenter(i,l,p),h=255,g=Math.sin(n),x=Math.cos(n),b=a.data.get(r.dataId).values;for(let v=0;v<c;v++){let k=v*p*l*m;for(let N=0;N<l;N++){let E=N*(p*m);for(let R=0;R<p;R++){let A=R*m;for(let F=0;F<m;F++){let P=[c,N,R,F],_=P[2],O=P[1],M=(_-d)*x-(O-f)*g,L=(_-d)*g+(O-f)*x;M=Math.round(M+d),L=Math.round(L+f);let W=s;if(typeof s!="number"&&(F===3?W=h:W=s[F]),M>=0&&M<p&&L>=0&&L<l){let U=L*(p*m),q=M*m,Y=k+U+q+F;W=b[Y]}let X=k+E+A+F;u[X]=W}}}}return{dataId:a.write(u,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};var rU=dt(qr,o=>{let t=Math.floor(o);return o-t<.5?Math.floor(o):o-t>.5?Math.ceil(o):t%2===0?t:t+1}),Iv={kernelName:qr,backendName:"cpu",kernelFunc:rU};function nU(o){let{inputs:t,backend:e,attrs:r}=o,{indices:n,updates:s}=t,{shape:i}=r,{sliceRank:a,numUpdates:u,sliceSize:c,strides:l,outputSize:p}=y.calculateShapes(s,n,i),m=!0,d=e.bufferSync(n),f=e.bufferSync(s),h=Oo(d,f,i,p,c,u,a,l,0,m);return e.makeTensorInfo(i,h.dtype,h.values)}var kv={kernelName:Xs,backendName:"cpu",kernelFunc:nU};function sU(o,t){let e=0,r=o.length,n=0;for(;e<r;)n=Math.floor((e+r)/2),o[n]<t?e=n+1:r=n;return r}function iU(o,t){let e=0,r=o.length,n=0;for(;e<r;)n=Math.floor((e+r)/2),o[n]<=t?e=n+1:r=n;return r}function $v(o,t,e,r,n,s){let i=C.getArrayFromDType("int32",e*n);for(let a=0;a<e;++a){let u=o.slice(a*r,(a+1)*r),c=a*n;for(let l=0;l<n;++l)i[c+l]=s==="left"?sU(u,t[l+c]):iU(u,t[l+c])}return i}function aU(o){let{inputs:t,backend:e,attrs:r}=o,{sortedSequence:n,values:s}=t,{side:i}=r,a=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,c=$v(a,u,n.shape[0],n.shape[1],s.shape[1],i);return e.makeTensorInfo(s.shape,"int32",c)}var Tv={kernelName:Ys,backendName:"cpu",kernelFunc:aU};function uU(o){let{inputs:t,backend:e}=o,{condition:r,t:n,e:s}=t;H([r,n,s],"select");let i=r.shape.length,a=e.data.get(r.dataId).values,u=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,l=Lt(n.dtype,s.dtype),p=C.makeZerosTypedArray(C.sizeFromShape(n.shape),l),m=0,d=i===0||i>1||n.shape.length===1?1:C.sizeFromShape(n.shape.slice(1));for(let f=0;f<a.length;f++)for(let h=0;h<d;h++)a[f]===1?p[m++]=u[f]:p[m++]=c[f];return e.makeTensorInfo(n.shape,l,p)}var Nv={kernelName:Qs,backendName:"cpu",kernelFunc:uU};var cU=y.SELU_SCALEALPHA,lU=y.SELU_SCALE,pU=dt(jr,o=>o>=0?lU*o:cU*(Math.exp(o)-1)),Ev={kernelName:jr,backendName:"cpu",kernelFunc:pU};var mU=dt(Qr,o=>o<0?-1:o>0?1:0),Rv={kernelName:Qr,backendName:"cpu",kernelFunc:mU};var dU=dt("Sin",o=>Math.sin(o)),Dv={kernelName:"Sin",backendName:"cpu",kernelFunc:dU};var fU=dt(Yr,o=>Math.sinh(o)),Av={kernelName:Yr,backendName:"cpu",kernelFunc:fU};var hU=11920928955078125e-23,Fv=Math.log(hU)+2,gU=dt(Jr,o=>{let t=o>-Fv,e=o<Fv,r=Math.exp(o),n;return e?n=r:t?n=o:n=Math.log(1+r),n}),Pv={kernelName:Jr,backendName:"cpu",kernelFunc:gU};function xU(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockShape:s,paddings:i}=r;H([n],"spaceToBatchND");let a=C.sizeFromShape(s),u=[[0,0]];u.push(...i);for(let N=1+s.length;N<n.shape.length;++N)u.push([0,0]);let c=Dp.kernelFunc({inputs:{x:n},backend:e,attrs:{paddings:u,constantValue:0}}),l=y.getReshaped(c.shape,s,a,!1),p=y.getPermuted(l.length,s.length,!1),m=y.getReshapedPermuted(c.shape,s,a,!1),h=It({inputs:{x:c},backend:e,attrs:{shape:l}}),b=Yt({inputs:{x:h},backend:e,attrs:{perm:p}}),k=It({inputs:{x:b},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(b),k}var _v={kernelName:ti,backendName:"cpu",kernelFunc:xU};function CU(o){let{inputs:t,backend:e}=o,{indices:r,values:n,denseShape:s,defaultValue:i}=t;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${s.shape}`);if(r.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${r.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${n.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);let a=e.data.get(r.dataId).values,u=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,l=e.data.get(i.dataId).values[0],[p,m,d,f,h]=bp(a,r.shape,r.dtype,u,n.dtype,c,l);return[e.makeTensorInfo(m,r.dtype,p),e.makeTensorInfo([m[0]],n.dtype,d),e.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(g=>Number(g)))),e.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}var Ov={kernelName:lu,backendName:"cpu",kernelFunc:CU};function bU(o){let{inputs:t,backend:e}=o,{inputIndices:r,inputShape:n,newShape:s}=t;if(r.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${r.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let i=Array.from(e.data.get(n.dataId).values),a=e.data.get(r.dataId).values,u=Array.from(e.data.get(s.dataId).values),[c,l,p]=yp(a,r.shape,r.dtype,i,u);return[e.makeTensorInfo(l,r.dtype,c),e.makeTensorInfo([p.length],s.dtype,new Int32Array(p))]}var Mv={kernelName:pu,backendName:"cpu",kernelFunc:bU};function yU(o){let{inputs:t,backend:e}=o,{data:r,indices:n,segmentIds:s}=t;if(r.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let i=e.data.get(r.dataId).values,a=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,[c,l]=zu(i,r.shape,r.dtype,a,u,!0);return e.makeTensorInfo(l,r.dtype,c)}var Lv={kernelName:ri,backendName:"cpu",kernelFunc:yU};function wU(o){let{inputs:t,backend:e}=o,{data:r,indices:n,segmentIds:s}=t;if(r.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let i=e.data.get(r.dataId).values,a=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,[c,l]=zu(i,r.shape,r.dtype,a,u);return e.makeTensorInfo(l,r.dtype,c)}var Bv={kernelName:ni,backendName:"cpu",kernelFunc:wU};function SU(o){let{inputs:t,backend:e,attrs:r}=o,{sparseIndices:n,sparseValues:s,defaultValue:i}=t,{outputShape:a}=r,{sliceRank:u,numUpdates:c,sliceSize:l,strides:p,outputSize:m}=y.calculateShapes(s,n,a),d=!1,f=e.bufferSync(n),h;switch(s.dtype){case"bool":{let g=e.bufferSync(s),x=!!e.data.get(i.dataId).values[0];h=Oo(f,g,a,m,l,c,u,p,x,d);break}case"float32":{let g=e.bufferSync(s),x=e.data.get(i.dataId).values[0];h=Oo(f,g,a,m,l,c,u,p,x,d);break}case"int32":{let g=e.bufferSync(s),x=e.data.get(i.dataId).values[0];h=Oo(f,g,a,m,l,c,u,p,x,d);break}case"string":{let g=e.bufferSync(s),x=C.decodeString(e.data.get(i.dataId).values[0]);h=Oo(f,g,a,m,l,c,u,p,x,d);break}default:throw new Error(`Unsupported type ${s.dtype}`)}return e.makeTensorInfo(a,h.dtype,h.values)}var zv={kernelName:si,backendName:"cpu",kernelFunc:SU};function vU(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{numOrSizeSplits:s,axis:i}=r,a=C.parseAxisParam(i,n.shape)[0],u=y.prepareSplitSize(n,s,a),c=new Array(n.shape.length).fill(0),l=n.shape.slice();return u.map(p=>{let m=[...l];m[a]=p;let d=Io({inputs:{x:n},backend:e,attrs:{begin:c,size:m}});return c[a]+=p,d})}var Vv={kernelName:ei,backendName:"cpu",kernelFunc:vU};var Wv={kernelName:mu,backendName:"cpu",kernelFunc:({inputs:o,backend:t})=>{let{x:e}=o,r=t;H(e,"square");let n=r.data.get(e.dataId).values,s=new Float32Array(n.length);for(let a=0;a<n.length;++a){let u=n[a];s[a]=u*u}return{dataId:r.write(s,e.shape,e.dtype),shape:e.shape,dtype:e.dtype}}};var IU=dt(rn,(o,t)=>{let e=t;return isNaN(o)?NaN:o>0?1:e.alpha}),Uv={kernelName:rn,backendName:"cpu",kernelFunc:IU};function kU(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{begin:s,end:i,strides:a,beginMask:u,endMask:c,ellipsisMask:l,newAxisMask:p,shrinkAxisMask:m}=r;H(n,"stridedSlice");let{finalShapeSparse:d,finalShape:f,isIdentity:h,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:v}=ee.sliceInfo(n.shape,s,i,a,u,c,l,p,m),k;if(h)k=It({inputs:{x:n},backend:e,attrs:{shape:f}});else if(g||x){C.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let N=ee.computeOutShape(b,w,v),E=Io({inputs:{x:n},backend:e,attrs:{begin:b,size:N}});k=It({inputs:{x:E},backend:e,attrs:{shape:f}}),e.disposeIntermediateTensorInfo(E)}else{let N=e.bufferSync(n),E=wp(d,N,v,b);k=e.makeTensorInfo(f,E.dtype,E.values)}return k}var Gv={kernelName:ii,backendName:"cpu",kernelFunc:kU};function $U(o){let{inputs:t,backend:e,attrs:r}=o,{separator:n,nGramWidths:s,leftPad:i,rightPad:a,padWidth:u,preserveShortSequences:c}=r,{data:l,dataSplits:p}=t,m=e.data.get(l.dataId).values,d=e.data.get(p.dataId).values,[f,h]=Sp(m,d,n,s,i,a,u,c);return[e.makeTensorInfo([f.length],"string",f),e.makeTensorInfo(p.shape,"int32",h)]}var Hv={kernelName:ai,backendName:"cpu",kernelFunc:$U};function TU(o){let{inputs:t,backend:e,attrs:r}=o,{skipEmpty:n}=r,{input:s,delimiter:i}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);let a=e.data.get(s.dataId).values,u=e.data.get(i.dataId).values[0],[c,l,p]=vp(a,u,n),m=l.length;return[e.makeTensorInfo([m,2],"int32",c),e.makeTensorInfo([m],"string",l),e.makeTensorInfo([2],"int32",new Int32Array(p))]}var Kv={kernelName:du,backendName:"cpu",kernelFunc:TU};function NU(o){let{inputs:t,backend:e,attrs:r}=o,{numBuckets:n}=r,{input:s}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let i=e.data.get(s.dataId).values,a=Ip(i,n);return e.makeTensorInfo(s.shape,"int32",a)}var qv={kernelName:fu,backendName:"cpu",kernelFunc:NU};var EU=dt("Tan",o=>Math.tan(o)),Xv={kernelName:"Tan",backendName:"cpu",kernelFunc:EU};var RU=dt(on,o=>Math.tanh(o)),jv={kernelName:on,backendName:"cpu",kernelFunc:RU};function DU(o){let{inputs:t,backend:e}=o,{tensor:r,indices:n,updates:s}=t,{sliceRank:i,numUpdates:a,sliceSize:u,strides:c,outputSize:l}=y.calculateShapes(s,n,r.shape),p=!1,m=e.bufferSync(n),d=e.bufferSync(s),f=e.bufferSync(r),h=Oo(m,d,r.shape,l,u,a,i,c,f,p);return e.makeTensorInfo(r.shape,h.dtype,h.values)}var Yv={kernelName:js,backendName:"cpu",kernelFunc:DU};function AU(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{reps:s}=r;H(n,"tile");let i=kp(e.bufferSync(n),s);return e.makeTensorInfo(i.shape,i.dtype,i.values)}var Qv={kernelName:qo,backendName:"cpu",kernelFunc:AU};function FU(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{k:s,sorted:i}=r;H(n,"topk");let a=e.data.get(n.dataId).values,[u,c]=$p(a,n.shape,n.dtype,s,i);return[e.makeTensorInfo(u.shape,u.dtype,u.values),e.makeTensorInfo(c.shape,c.dtype,c.values)]}var Zv={kernelName:li,backendName:"cpu",kernelFunc:FU};function PU(o){let{inputs:t,attrs:e,backend:r}=o,{image:n,transforms:s}=t,{interpolation:i,fillMode:a,fillValue:u,outputShape:c}=e,[l,p,m,d]=n.shape,[f,h]=c??[p,m],g=[l,f,h,d],x=C.computeStrides(n.shape),b=x[0],w=x[1],v=x[2],k=C.computeStrides(g),N=k[0],E=k[1],R=k[2],A=C.getTypedArrayFromDType(n.dtype,C.sizeFromShape(g));A.fill(u);let F=r.data.get(n.dataId).values,P=r.data.get(s.dataId).values;for(let O=0;O<l;++O){let M=s.shape[0]===1?P:P.subarray(O*8,O*8+8);for(let L=0;L<f;++L)for(let W=0;W<h;++W)for(let X=0;X<d;++X){let U,q=M[6]*W+M[7]*L+1;if(q===0)continue;let Y=(M[0]*W+M[1]*L+M[2])/q,Z=(M[3]*W+M[4]*L+M[5])/q,et=Jv(Y,m,a),J=Jv(Z,p,a);switch(i){case"nearest":U=BU(F,p,m,b,w,v,O,J,et,X,u);break;case"bilinear":U=zU(F,p,m,b,w,v,O,J,et,X,u);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${i}`)}let st=O*N+L*E+W*R+X;A[st]=U}return r.makeTensorInfo(g,n.dtype,A)}return{dataId:r.write(A,g,n.dtype),shape:n.shape,dtype:n.dtype}}var tI={kernelName:pi,backendName:"cpu",kernelFunc:PU};function Jv(o,t,e){switch(e){case"reflect":return _U(o,t);case"wrap":return OU(o,t);case"nearest":return LU(o,t);default:return MU(o,t)}}function _U(o,t){let e=o;if(e<0)if(t<=1)e=0;else{let r=2*t;e<r&&(e=r*Math.trunc(-e/r)+e),e=e<-t?e+r:-e-1}else if(e>t-1)if(t<=1)e=0;else{let r=2*t;e-=r*Math.trunc(e/r),e>=t&&(e=r-e-1)}return C.clamp(0,e,t-1)}function OU(o,t){let e=o;if(e<0)if(t<=1)e=0;else{let r=t-1;e+=t*(Math.trunc(-e/r)+1)}else if(e>t-1)if(t<=1)e=0;else{let r=t-1;e-=t*Math.trunc(e/r)}return C.clamp(0,e,t-1)}function MU(o,t){return o}function LU(o,t){return C.clamp(0,o,t-1)}function Zc(o,t,e,r,n,s,i,a,u,c,l){let p=i*r+a*n+u*s+c;return 0<=a&&a<t&&0<=u&&u<e?o[p]:l}function BU(o,t,e,r,n,s,i,a,u,c,l){let p=Math.round(a),m=Math.round(u);return Zc(o,t,e,r,n,s,i,p,m,c,l)}function zU(o,t,e,r,n,s,i,a,u,c,l){let p=Math.floor(a),m=Math.floor(u),d=p+1,f=m+1,h=(f-u)*Zc(o,t,e,r,n,s,i,p,m,c,l)+(u-m)*Zc(o,t,e,r,n,s,i,p,f,c,l),g=(f-u)*Zc(o,t,e,r,n,s,i,d,m,c,l)+(u-m)*Zc(o,t,e,r,n,s,i,d,f,c,l);return(d-a)*h+(a-p)*g}function VU(o){let{inputs:t,attrs:e,backend:r}=o,{axis:n}=e,{x:s}=t;H(s,"unique");let i=r.data.get(s.dataId).values,{outputValues:a,outputShape:u,indices:c}=Tp(i,n,s.shape,s.dtype);return[r.makeTensorInfo(u,s.dtype,a),r.makeTensorInfo([c.length],"int32",c)]}var eI={kernelName:hu,backendName:"cpu",kernelFunc:VU};function WU(o){let{inputs:t,backend:e,attrs:r}=o,{value:n}=t,{axis:s}=r;s<0&&(s+=n.shape.length);let i=n.shape.length,a=n.shape[s],u=new Array(i-1),c=0;for(let d=0;d<i;d++)d!==s&&(u[c++]=n.shape[d]);let l=new Array(i).fill(0),p=n.shape.slice();p[s]=1;let m=new Array(a);for(let d=0;d<m.length;d++){l[s]=d;let f=Io({inputs:{x:n},backend:e,attrs:{begin:l,size:p}});m[d]=It({inputs:{x:f},backend:e,attrs:{shape:u}}),e.disposeIntermediateTensorInfo(f)}return m}var oI={kernelName:mi,backendName:"cpu",kernelFunc:WU};function UU(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,segmentIds:s}=t,{numSegments:i}=r;H(n,"unsortedSegmentSum");let a=n.shape.length,u=s.shape.length,c=[],l=[],p=a-u,m=s;for(let f=0;f<p;++f){let h=Wu({inputs:{input:m},backend:e,attrs:{dim:f+1}});m=h,l.push(h)}for(let f=0;f<i;++f){let h=C.createScalarValue(f,"int32"),g=e.makeTensorInfo([],"int32",h),x=jg({inputs:{a:g,b:m},backend:e}),b=So({inputs:{x},backend:e,attrs:{dtype:"float32"}}),w=Na({inputs:{a:b,b:n},backend:e}),v=wn({inputs:{x:w},backend:e,attrs:{axis:0,keepDims:!1}});c.push(v),l.push(g),l.push(x),l.push(b),l.push(w),l.push(v)}let d=Rx({inputs:c,backend:e,attrs:{axis:0}});return l.forEach(f=>e.disposeIntermediateTensorInfo(f)),d}var rI={kernelName:di,backendName:"cpu",kernelFunc:UU};var GU=[NS,Ow,ES,RS,Vw,DS,AS,FS,PS,_S,OS,MS,LS,BS,zS,WS,US,GS,HS,TS,KS,qS,XS,Ww,jS,zw,Uw,YS,Mw,QS,JS,t0,e0,o0,r0,n0,s0,i0,a0,u0,c0,l0,p0,m0,d0,f0,h0,g0,x0,C0,b0,y0,S0,wS,v0,Gw,I0,Hw,k0,Kw,$0,T0,N0,qw,Xw,E0,R0,D0,A0,jw,Yw,Lw,F0,ZS,P0,_0,O0,SS,Qw,Zw,M0,Jw,L0,B0,z0,V0,W0,U0,G0,tS,H0,K0,q0,X0,Y0,Q0,Z0,eS,J0,tv,rv,oS,rS,nv,sv,iv,nS,av,lv,pv,Dp,mv,vS,iS,dv,fv,hv,gv,Bw,jc,xv,IS,kS,$S,Cv,bv,yv,wv,Sv,vv,Iv,pS,kv,Tv,Nv,Ev,dS,Rv,Dv,Av,fS,ev,Pv,_v,Ov,Mv,Lv,Bv,zv,Vv,gS,Wv,xS,CS,Uv,Gv,Hv,Kv,qv,bS,w0,Xv,jv,Yv,Qv,Zv,tI,sS,eI,oI,rI,uv];for(let o of GU)Qi(o);var Ra={},Ap={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function nI(o,t){Ra[o]=t}function Ze(o,t){if(!(o in Ra)||t!=null){let r=KU(o,t);if(r!==null)Ra[o]=r;else return console.log("Could not get context for WebGL version",o),null}let e=Ra[o];return e==null||e.isContextLost()?(delete Ra[o],Ze(o)):(e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.disable(e.DITHER),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SAMPLE_COVERAGE),e.enable(e.SCISSOR_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),Ra[o])}function HU(o){if(!D().getBool("IS_SAFARI")&&typeof OffscreenCanvas<"u"&&o===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}function KU(o,t){if(o!==1&&o!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");let e=t??HU(o);return e.addEventListener("webglcontextlost",r=>{r.preventDefault(),delete Ra[o]},!1),D().getBool("SOFTWARE_WEBGL_ENABLED")&&(Ap.failIfMajorPerformanceCaveat=!1),o===1?e.getContext("webgl",Ap)||e.getContext("experimental-webgl",Ap):e.getContext("webgl2",Ap)}var Ti;(function(o){o[o.DENSE=0]="DENSE",o[o.SHARED_BATCH=1]="SHARED_BATCH"})(Ti||(Ti={}));var Re;(function(o){o[o.RENDER=0]="RENDER",o[o.UPLOAD=1]="UPLOAD",o[o.PIXELS=2]="PIXELS",o[o.DOWNLOAD=3]="DOWNLOAD"})(Re||(Re={}));var ye;(function(o){o[o.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",o[o.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",o[o.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",o[o.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",o[o.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(ye||(ye={}));function Da(o,t){return[t,o]}function sI(o,t){return o*t}function Jc(o){let t=C.sizeFromShape(o),e=Math.ceil(t/4);return C.sizeToSquarishShape(e)}function sr(o,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(o/2))]}function iI(o,t){let[e,r]=sr(o,t);return e*r*4}function tl(o,t){let e=o,r,n,s,i,a,u,c,l,p,m;return D().getNumber("WEBGL_VERSION")===2?(r=e.R32F,n=e.R16F,s=e.RGBA16F,i=e.RGBA32F,a=e.RED,c=4,l=1,p=e.HALF_FLOAT,m=e.FLOAT,u=e.RGBA8):(r=o.RGBA,n=o.RGBA,s=o.RGBA,i=e.RGBA,a=o.RGBA,c=4,l=4,p=t!=null?t.HALF_FLOAT_OES:null,m=o.FLOAT,u=o.RGBA),{internalFormatFloat:r,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:s,internalFormatPackedFloat:i,textureFormatFloat:a,downloadTextureFormat:u,downloadUnpackNumChannels:c,defaultNumChannels:l,textureTypeHalfFloat:p,textureTypeFloat:m}}function it(o,t){let e=t();return D().getBool("DEBUG")&&qU(o),e}function qU(o){let t=o.getError();if(t!==o.NO_ERROR)throw new Error("WebGL Error: "+YU(o,t))}var XU=596e-10,jU=65504;function aI(o){return!!(D().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||o===0||XU<Math.abs(o)&&Math.abs(o)<jU)}function YU(o,t){switch(t){case o.NO_ERROR:return"NO_ERROR";case o.INVALID_ENUM:return"INVALID_ENUM";case o.INVALID_VALUE:return"INVALID_VALUE";case o.INVALID_OPERATION:return"INVALID_OPERATION";case o.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case o.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case o.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${t}`}}function el(o,t){return Sn(o,()=>o.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function uI(o,t){let e=Sn(o,()=>o.createShader(o.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(it(o,()=>o.shaderSource(e,t)),it(o,()=>o.compileShader(e)),o.getShaderParameter(e,o.COMPILE_STATUS)===!1)throw console.log(o.getShaderInfoLog(e)),new Error("Failed to compile vertex shader.");return e}function cI(o,t){let e=Sn(o,()=>o.createShader(o.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(it(o,()=>o.shaderSource(e,t)),it(o,()=>o.compileShader(e)),D().get("ENGINE_COMPILE_ONLY"))return e;if(o.getShaderParameter(e,o.COMPILE_STATUS)===!1)throw _x(t,o.getShaderInfoLog(e)),new Error("Failed to compile fragment shader.");return e}var QU=/ERROR: [0-9]+:([0-9]+):/g;function _x(o,t){let e=QU.exec(t);if(e==null){console.log(`Couldn't parse line number in error: ${t}`),console.log(o);return}let r=+e[1],n=o.split(`
`),s=n.length.toString().length+2,i=n.map((p,m)=>C.rightPad((m+1).toString(),s)+p),a=0;for(let p=0;p<i.length;p++)a=Math.max(i[p].length,a);let u=i.slice(0,r-1),c=i.slice(r-1,r),l=i.slice(r);console.log(u.join(`
`)),console.log(t.split(`
`)[0]),console.log(`%c ${C.rightPad(c[0],a)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(l.join(`
`))}function lI(o){return Sn(o,()=>o.createProgram(),"Unable to create WebGLProgram.")}function pI(o,t){if(it(o,()=>o.linkProgram(t)),!D().get("ENGINE_COMPILE_ONLY")&&o.getProgramParameter(t,o.LINK_STATUS)===!1)throw console.log(o.getProgramInfoLog(t)),new Error("Failed to link vertex and fragment shaders.")}function Pp(o,t){if(it(o,()=>o.validateProgram(t)),o.getProgramParameter(t,o.VALIDATE_STATUS)===!1)throw console.log(o.getProgramInfoLog(t)),new Error("Shader program validation failed.")}function mI(o,t){let e=Sn(o,()=>o.createBuffer(),"Unable to create WebGLBuffer");return it(o,()=>o.bindBuffer(o.ARRAY_BUFFER,e)),it(o,()=>o.bufferData(o.ARRAY_BUFFER,t,o.STATIC_DRAW)),e}function dI(o,t){let e=Sn(o,()=>o.createBuffer(),"Unable to create WebGLBuffer");return it(o,()=>o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e)),it(o,()=>o.bufferData(o.ELEMENT_ARRAY_BUFFER,t,o.STATIC_DRAW)),e}function fI(o){return Sn(o,()=>o.createTexture(),"Unable to create WebGLTexture.")}function hI(o,t){let e=D().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(o<=0||t<=0){let r=`[${o}x${t}]`;throw new Error("Requested texture size "+r+" is invalid.")}if(o>e||t>e){let r=`[${o}x${t}]`,n=`[${e}x${e}]`;throw new Error("Requested texture size "+r+" greater than WebGL maximum on this browser / GPU "+n+".")}}function gI(o){return Sn(o,()=>o.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function Ox(o,t,e,r,n,s,i){let a=o.getAttribLocation(t,e);return a===-1?!1:(it(o,()=>o.bindBuffer(o.ARRAY_BUFFER,r)),it(o,()=>o.vertexAttribPointer(a,n,o.FLOAT,!1,s,i)),it(o,()=>o.enableVertexAttribArray(a)),!0)}function ZU(o,t,e){t4(o,e),it(o,()=>o.activeTexture(o.TEXTURE0+e)),it(o,()=>o.bindTexture(o.TEXTURE_2D,t))}function xI(o,t,e){return Sn(o,()=>o.getUniformLocation(t,e),'uniform "'+e+'" not present in program.')}function CI(o,t,e){return o.getUniformLocation(t,e)}function bI(o,t,e,r){it(o,()=>ZU(o,t,r)),it(o,()=>o.uniform1i(e,r))}function _p(o,t,e){it(o,()=>o.bindFramebuffer(o.FRAMEBUFFER,e)),it(o,()=>o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,t,0))}function Mx(o,t){it(o,()=>o.bindFramebuffer(o.FRAMEBUFFER,t)),it(o,()=>o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,null,0))}function ol(o){let t=o.checkFramebufferStatus(o.FRAMEBUFFER);if(t!==o.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+JU(o,t))}function JU(o,t){switch(t){case o.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case o.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case o.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case o.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${t}`}}function Sn(o,t,e){let r=it(o,()=>t());if(r==null)throw new Error(e);return r}function t4(o,t){let e=o.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=t+o.TEXTURE0;if(r<o.TEXTURE0||r>e){let n=`[gl.TEXTURE0, gl.TEXTURE${e}]`;throw new Error(`textureUnit must be in ${n}.`)}}function Ni(o,t=2){return C.sizeFromShape(o.slice(0,o.length-t))}function Ei(o){if(o.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[o.length>1?o[o.length-2]:1,o[o.length-1]]}function rl(o){let t=[1,1,1];return o.length===0||o.length===1&&o[0]===1||(t=[Ni(o),...Ei(o)]),t}function yI(o,t=!1){let e=D().getNumber("WEBGL_MAX_TEXTURE_SIZE"),r=D().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");r===1/0&&D().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(r=e/2),t&&(e=e*2,r=r*2,o=o.map((a,u)=>u>=o.length-2?C.nearestLargerEven(o[u]):o[u]),o.length===1&&(o=[2,o[0]])),o.length!==2&&(o=C.squeezeShape(o).newShape);let n=C.sizeFromShape(o),s=null;o.length<=1&&n<=e?s=[1,n]:o.length===2&&o[0]<=e&&o[1]<=e?s=o:o.length===3&&o[0]*o[1]<=e&&o[2]<=e?s=[o[0]*o[1],o[2]]:o.length===3&&o[0]<=e&&o[1]*o[2]<=e?s=[o[0],o[1]*o[2]]:o.length===4&&o[0]*o[1]*o[2]<=e&&o[3]<=e?s=[o[0]*o[1]*o[2],o[3]]:o.length===4&&o[0]<=e&&o[1]*o[2]*o[3]<=e&&(s=[o[0],o[1]*o[2]*o[3]]);let i=s!=null&&Math.max(...s)>r&&Math.min(...s)<=(t?2:1)&&Math.min(...s)>0;if(s==null||i)if(t){let a=Ni(o),u=2,c=2;o.length&&([u,c]=Ei(o)),n=a*(u/2)*(c/2),s=C.sizeToSquarishShape(n).map(l=>l*2)}else s=C.sizeToSquarishShape(n);return s}function Fp(o){return o%2===0}function Aa(o,t){if(o=o.slice(-2),t=t.slice(-2),C.arraysEqual(o,t)||!o.length||!t.length||o[0]===0||o[1]===0||t[0]===0||t[1]===0)return!0;if(o.length!==t.length){let e=o[o.length-1],r=t[t.length-1];if(e===r||Fp(e)&&Fp(r)&&(o[0]===1||t[0]===1))return!0}return o[1]===t[1]&&Fp(o[0])&&Fp(t[0])}var Ax,Fx;function wI(o){if(Ax==null){let t=Ze(o);Ax=t.getParameter(t.MAX_TEXTURE_SIZE)}return Ax}function SI(o){if(Fx==null){let t=Ze(o);Fx=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,Fx)}function vI(o){if(o===0)return 0;let t,e=Ze(o);return co(e,"EXT_disjoint_timer_query_webgl2")&&o===2?t=2:co(e,"EXT_disjoint_timer_query")?t=1:t=0,t}function co(o,t){return o.getExtension(t)!=null}function Lx(o){try{if(Ze(o)!=null)return!0}catch(t){return console.log("Error when getting WebGL context: ",t),!1}return!1}function II(o){if(o===0)return!1;let t=Ze(o);if(o===1){if(!co(t,"OES_texture_float"))return!1}else if(!co(t,"EXT_color_buffer_float"))return!1;return Px(t)}function kI(o){if(o===0)return!1;let t=Ze(o);if(o===1){if(!co(t,"OES_texture_float")||!co(t,"WEBGL_color_buffer_float"))return!1}else{if(co(t,"EXT_color_buffer_float"))return Px(t);let r="EXT_color_buffer_half_float";if(co(t,r)){let n=t.getExtension(r);return e4(t,n)}return!1}return Px(t)}function Px(o){let t=tl(o),e=o.createTexture();o.bindTexture(o.TEXTURE_2D,e),o.texImage2D(o.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let s=o.createFramebuffer();o.bindFramebuffer(o.FRAMEBUFFER,s),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0);let i=o.checkFramebufferStatus(o.FRAMEBUFFER)===o.FRAMEBUFFER_COMPLETE;return o.bindTexture(o.TEXTURE_2D,null),o.bindFramebuffer(o.FRAMEBUFFER,null),o.deleteTexture(e),o.deleteFramebuffer(s),i}function e4(o,t){let e=tl(o,t),r=o.createTexture();o.bindTexture(o.TEXTURE_2D,r),o.texImage2D(o.TEXTURE_2D,0,e.internalFormatHalfFloat,1,1,0,e.textureFormatFloat,e.textureTypeHalfFloat,null);let i=o.createFramebuffer();o.bindFramebuffer(o.FRAMEBUFFER,i),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,r,0);let a=o.checkFramebufferStatus(o.FRAMEBUFFER)===o.FRAMEBUFFER_COMPLETE;return o.bindTexture(o.TEXTURE_2D,null),o.bindFramebuffer(o.FRAMEBUFFER,null),o.deleteTexture(r),o.deleteFramebuffer(i),a}function $I(o){return o!==2?!1:Ze(o).fenceSync!=null}function ir(o,t){Array.isArray(o)||(o=[o]),o.forEach(e=>{e!=null&&C.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}var mt=D();mt.registerFlag("HAS_WEBGL",()=>mt.getNumber("WEBGL_VERSION")>0);mt.registerFlag("WEBGL_VERSION",()=>Lx(2)?2:Lx(1)?1:0);mt.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1);mt.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>mt.get("WEBGL_VERSION")===2);mt.registerFlag("WEBGL_CPU_FORWARD",()=>!0);mt.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1);mt.registerFlag("WEBGL_PACK",()=>mt.getBool("HAS_WEBGL"));mt.registerFlag("WEBGL_PACK_NORMALIZATION",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_PACK_CLIP",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_PACK_REDUCE",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_LAZILY_UNPACK",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_CONV_IM2COL",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>mt.getBool("WEBGL_PACK"));mt.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>wI(mt.getNumber("WEBGL_VERSION")));mt.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>SI(mt.getNumber("WEBGL_VERSION")));mt.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let o=mt.getNumber("WEBGL_VERSION");return o===0?0:vI(o)});mt.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>mt.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!Ci.isMobile());mt.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>II(mt.getNumber("WEBGL_VERSION")));mt.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>mt.getBool("WEBGL_FORCE_F16_TEXTURES")?!1:mt.getBool("WEBGL_RENDER_FLOAT32_CAPABLE"));mt.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>kI(mt.getNumber("WEBGL_VERSION")));mt.registerFlag("WEBGL_FENCE_API_ENABLED",()=>$I(mt.getNumber("WEBGL_VERSION")));mt.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>mt.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0);mt.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,o=>{if(typeof o!="number")throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${o}.`);if(o<0&&o!==-1)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${o}.`)});mt.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>Ci.isMobile()?1:-1,o=>{if(typeof o!="number")throw new Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${o}.`);if(o<0&&o!==-1)throw new Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${o}.`)});mt.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128);mt.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1);mt.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5);mt.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128);mt.registerFlag("WEBGL_EXP_CONV",()=>!1);mt.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>mt.getBool("IS_TEST"));mt.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0);mt.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1);mt.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1);mt.registerFlag("ENGINE_COMPILE_ONLY",()=>!1);function Qt(){let o,t,e,r,n,s,i,a,u,c;return D().getNumber("WEBGL_VERSION")===2?(o="#version 300 es",t="in",e="out",r="in",n="texture",s="outputColor",i="out vec4 outputColor;",a=D().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",u="",c=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(o="",t="attribute",e="varying",r="varying",n="texture2D",s="gl_FragColor",i="",a=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,c=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:o,attribute:t,varyingVs:e,varyingFs:r,texture2D:n,output:s,defineOutput:i,defineSpecialNaN:a,defineSpecialInf:u,defineRound:c}}function Mo(o,t,e="index"){let r=C.computeStrides(t);return r.map((n,s)=>{let i=`int ${o[s]} = ${e} / ${n}`,a=s===r.length-1?`int ${o[s+1]} = ${e} - ${o[s]} * ${n}`:`index -= ${o[s]} * ${n}`;return`${i}; ${a};`}).join("")}function Fa(o,t,e="index"){let r=C.computeStrides(t);return r.map((n,s)=>{let i=`int ${o[s]} = ${e} / outShapeStrides[${s}]`,a=s===r.length-1?`int ${o[s+1]} = ${e} - ${o[s]} * outShapeStrides[${s}]`:`index -= ${o[s]} * outShapeStrides[${s}]`;return`${i}; ${a};`}).join("")}function o4(o,t){let e=o.length,r=o.map(s=>`${t}[${s}]`),n=new Array(e-1);n[e-2]=r[e-1];for(let s=e-3;s>=0;--s)n[s]=`(${n[s+1]} * ${r[s+1]})`;return n}function TI(o,t,e="index"){let r=o.map((s,i)=>i),n=o4(r,t);return n.map((s,i)=>{let a=`int ${o[i]} = ${e} / ${n[i]}`,u=i===n.length-1?`int ${o[i+1]} = ${e} - ${o[i]} * ${n[i]}`:`index -= ${o[i]} * ${n[i]}`;return`${a}; ${u};`}).join("")}function Uu(o){let t=C.computeStrides(o).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function Gu(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}var Mp=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;var{getBroadcastDims:NI}=y;function EI(o,t,e){let r=[];if(o.forEach(d=>{let f=C.sizeFromShape(d.shapeInfo.logicalShape);if(d.shapeInfo.isUniform?r.push(`uniform float ${d.name}${f>1?`[${f}]`:""};`):(r.push(`uniform sampler2D ${d.name};`),r.push(`uniform int offset${d.name};`)),e.enableShapeUniforms){let{uniformShape:h}=Lp(e.packedInputs,d.shapeInfo.logicalShape,d.shapeInfo.texShape);switch(h.length){case 1:r.push(`uniform int ${d.name}Shape;`);break;case 2:r.push(`uniform ivec2 ${d.name}Shape;`);break;case 3:r.push(`uniform ivec3 ${d.name}Shape;`);break;case 4:r.push(`uniform ivec4 ${d.name}Shape;`);break;default:break}r.push(`uniform ivec2 ${d.name}TexShape;`)}}),e.enableShapeUniforms){switch(t.logicalShape.length){case 1:r.push("uniform int outShape;");break;case 2:r.push("uniform ivec2 outShape;"),r.push("uniform int outShapeStrides;");break;case 3:r.push("uniform ivec3 outShape;"),r.push("uniform ivec2 outShapeStrides;");break;case 4:r.push("uniform ivec4 outShape;"),r.push("uniform ivec3 outShapeStrides;");break;default:break}r.push("uniform ivec2 outTexShape;")}e.customUniforms&&e.customUniforms.forEach(d=>{r.push(`uniform ${d.type} ${d.name}${d.arrayIndex?`[${d.arrayIndex}]`:""};`)});let n=r.join(`
`),s=o.map(d=>r4(d,t,e.packedInputs,e.enableShapeUniforms)).join(`
`),i=t.texShape,a=Qt(),u=i4(a),c,l,p=c4(a);return t.isPacked?(c=n4(t.logicalShape,i,e.enableShapeUniforms),l=u4(a)):(c=s4(t.logicalShape,i,e.enableShapeUniforms),l=a4(a)),e.packedInputs&&(p+=d4),[p,u,l,n,c,s,e.userCode].join(`
`)}function Ku(o,t=!1){let e=o.shapeInfo.logicalShape;switch(e.length){case 0:return k4(o,t);case 1:return T4(o,t);case 2:return E4(o,t);case 3:return D4(o,t);case 4:return F4(o,t);case 5:return P4(o);case 6:return _4(o);default:throw new Error(`${e.length}-D input sampling is not yet supported`)}}function RI(o,t){switch(o.shapeInfo.logicalShape.length){case 0:return I4(o);case 1:return $4(o,t);case 2:return N4(o,t);case 3:return R4(o,t);default:return A4(o,t)}}function r4(o,t,e=!1,r){let n="";e?n+=RI(o,r):n+=Ku(o,r);let s=o.shapeInfo.logicalShape,i=t.logicalShape;return s.length<=i.length&&(e?n+=O4(o,t):n+=M4(o,t)),n}function n4(o,t,e){switch(o.length){case 0:return DI();case 1:return f4(o,t,e);case 2:return S4(o,t,e);case 3:return g4(o,t,e);default:return C4(o,t,e)}}function s4(o,t,e){switch(o.length){case 0:return DI();case 1:return h4(o,t,e);case 2:return v4(o,t,e);case 3:return x4(o,t,e);case 4:return b4(o,t,e);case 5:return y4(o,t);case 6:return w4(o,t);default:throw new Error(`${o.length}-D output sampling is not yet supported`)}}function i4(o){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${o.texture2D}(textureSampler, uv).r;
    }
  `}function a4(o){return`
    void setOutput(float val) {
      ${o.output} = vec4(val, 0, 0, 0);
    }
  `}function u4(o){return`
    void setOutput(vec4 val) {
      ${o.output} = val;
    }
  `}function c4(o){return`${o.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${o.varyingFs} vec2 resultUV;
    ${o.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${o.defineSpecialNaN}
    ${o.defineSpecialInf}
    ${o.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${l4}
    ${p4}
    ${m4}
  `}var l4=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,p4=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,m4=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,d4=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function DI(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function f4(o,t,e){let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];return r[0]===1?e?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${r[1]}.0);
      }
    `:r[1]===1?e?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${r[0]}.0);
      }
    `:e?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      return 2 * (resTexRC.x * ${r[1]} + resTexRC.y);
    }
  `}function h4(o,t,e){return t[0]===1?e?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${t[1]}.0);
      }
    `:t[1]===1?e?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${t[0]}.0);
      }
    `:e?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      return resTexRC.x * ${t[1]} + resTexRC.y;
    }
  `}function g4(o,t,e){if(e)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],n=Math.ceil(o[2]/2),s=n*Math.ceil(o[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec3(b, r, c);
    }
  `}function x4(o,t,e){if(e)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${Fa(["r","c","d"],o)}
    return ivec3(r, c, d);
  }
`;let r=Mo(["r","c","d"],o);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${r}
      return ivec3(r, c, d);
    }
  `}function C4(o,t,e){if(e)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],n=Math.ceil(o[o.length-1]/2),s=n*Math.ceil(o[o.length-2]/2),i=s,a="",u="b, r, c";for(let c=2;c<o.length-1;c++)i*=o[o.length-c-1],a=`
      int b${c} = index / ${i};
      index -= b${c} * ${i};
    `+a,u=`b${c}, `+u;return`
    ivec${o.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      ${a}

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec${o.length}(${u});
    }
  `}function b4(o,t,e){if(e)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${Fa(["r","c","d","d2"],o)}
      return ivec4(r, c, d, d2);
    }
  `;let r=Mo(["r","c","d","d2"],o);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${r}
      return ivec4(r, c, d, d2);
    }
  `}function y4(o,t){let e=Mo(["r","c","d","d2","d3"],o);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},
                             ${t[1]}));

      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${e}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function w4(o,t){let e=Mo(["r","c","d","d2","d3","d4"],o);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${e}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function S4(o,t,e){let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(C.arraysEqual(o,t))return e?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${r[0]}, ${r[1]}));
      }
    `;let n=Math.ceil(o[1]/2);return e?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));

      int index = resTexRC.x * ${r[1]} + resTexRC.y;
      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec2(r, c);
    }
  `}function v4(o,t,e){return C.arraysEqual(o,t)?e?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));
      }
    `:o[1]===1?e?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:o[0]===1?e?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:e?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      int r = index / ${o[1]};
      int c = index - r * ${o[1]};
      return ivec2(r, c);
    }
  `}function Pa(o){return`offset${o}`}function I4(o){let t=o.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),r=Qt();return`
    vec4 ${e}() {
      return ${r.texture2D}(${t}, halfCR);
    }
  `}function k4(o,t){let e=o.name,r="get"+e.charAt(0).toUpperCase()+e.slice(1);if(o.shapeInfo.isUniform)return`float ${r}() {return ${e};}`;let[n,s]=o.shapeInfo.texShape;if(n===1&&s===1)return`
      float ${r}() {
        return sampleTexture(${e}, halfCR);
      }
    `;let i=Pa(e);if(t)return`
    float ${r}() {
      vec2 uv = uvFromFlat(${e}TexShape[0], ${e}TexShape[1], ${i});
      return sampleTexture(${e}, uv);
    }
  `;let[a,u]=o.shapeInfo.texShape;return`
    float ${r}() {
      vec2 uv = uvFromFlat(${a}, ${u}, ${i});
      return sampleTexture(${e}, uv);
    }
  `}function $4(o,t){let e=o.name,r="get"+e.charAt(0).toUpperCase()+e.slice(1),n=o.shapeInfo.texShape,s=Qt();if(t)return`
    vec4 ${r}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${e}TexShape[0]) / 2.0), ceil(float(${e}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${s.texture2D}(${e}, uv);
    }
  `;let i=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];return`
    vec4 ${r}(int index) {
      vec2 uv = packedUVfrom1D(
        ${i[0]}, ${i[1]}, index);
      return ${s.texture2D}(${e}, uv);
    }
  `}function T4(o,t){let e=o.name,r="get"+e.charAt(0).toUpperCase()+e.slice(1);if(o.shapeInfo.isUniform)return`
      float ${r}(int index) {
        ${qu(o)}
      }
    `;let n=o.shapeInfo.texShape,s=n[0],i=n[1];if(i===1&&s===1)return`
      float ${r}(int index) {
        return sampleTexture(${e}, halfCR);
      }
    `;let a=Pa(e);return i===1?t?`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${a}) + 0.5) / float(${e}TexShape[0]));
        return sampleTexture(${e}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${a}) + 0.5) / ${s}.0);
        return sampleTexture(${e}, uv);
      }
    `:s===1?t?`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${a}) + 0.5) / float(${e}TexShape[1]), 0.5);
        return sampleTexture(${e}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${a}) + 0.5) / ${i}.0, 0.5);
        return sampleTexture(${e}, uv);
      }
    `:t?`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${e}TexShape[0], ${e}TexShape[1], index + ${a});
      return sampleTexture(${e}, uv);
    }
  `:`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${s}, ${i}, index + ${a});
      return sampleTexture(${e}, uv);
    }
  `}function N4(o,t){let e=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=o.shapeInfo.texShape,i=s[0],a=s[1],u=Qt();if(s!=null&&C.arraysEqual(e,s))return t?`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);

        return ${u.texture2D}(${r}, uv);
      }
    `:`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${a}.0, ${i}.0);

        return ${u.texture2D}(${r}, uv);
      }
    `;if(t)return`
    vec4 ${n}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${u.texture2D}(${r}, uv);
    }
  `;let c=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],l=Math.ceil(e[1]/2);return`
    vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l}, ${c[0]}, ${c[1]}, row, col);
      return ${u.texture2D}(${r}, uv);
    }
  `}function E4(o,t){let e=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=o.shapeInfo.texShape;if(s!=null&&C.arraysEqual(e,s)){if(t)return`
      float ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `;let m=s[0],d=s[1];return`
    float ${n}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${d}.0, ${m}.0);
      return sampleTexture(${r}, uv);
    }
  `}let{newShape:i,keptDims:a}=C.squeezeShape(e),u=i;if(u.length<e.length){let m=Xu(o,u),d=["row","col"];return`
      ${Ku(m,t)}
      float ${n}(int row, int col) {
        return ${n}(${ju(d,a)});
      }
    `}if(o.shapeInfo.isUniform)return`
      float ${n}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${e[1]}, 1)));
        ${qu(o)}
      }
    `;let c=s[0],l=s[1],p=Pa(r);return l===1?t?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${p}), vec3(${r}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${r}TexShape[0]));
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${p}), vec3(${e[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
      return sampleTexture(${r}, uv);
    }
  `:c===1?t?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${p}), vec3(${r}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${r}TexShape[1]), 0.5);
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${p}), vec3(${e[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${l}.0, 0.5);
      return sampleTexture(${r}, uv);
    }
  `:t?`
      float ${n}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${r}Shape[1] + col + ${p};
        vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index);
        return sampleTexture(${r}, uv);
      }
    `:`
  float ${n}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${e[1]} + col + ${p};
    vec2 uv = uvFromFlat(${c}, ${l}, index);
    return sampleTexture(${r}, uv);
  }
`}function R4(o,t){let e=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=o.shapeInfo.texShape,i=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];if(e[0]===1){let m=e.slice(1),d=[1,2],f=Xu(o,m),h=["b","row","col"];return`
        ${RI(f,t)}
        vec4 ${n}(int b, int row, int col) {
          return ${n}(${ju(h,d)});
        }
      `}let a=Qt();if(t)return`
    vec4 ${n}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${a.texture2D}(${r}, uv);
    }
  `;let u=i[0],c=i[1],l=Math.ceil(e[2]/2),p=l*Math.ceil(e[1]/2);return`
    vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${u}, ${c}, ${p}, ${l}, b, row, col);
      return ${a.texture2D}(${r}, uv);
    }
  `}function D4(o,t){let e=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=e[1]*e[2],i=e[2],{newShape:a,keptDims:u}=C.squeezeShape(e),c=a;if(c.length<e.length){let h=Xu(o,c),g=["row","col","depth"];return`
        ${Ku(h,t)}
        float ${n}(int row, int col, int depth) {
          return ${n}(${ju(g,u)});
        }
      `}if(o.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${s}, ${i}, 1)));
        ${qu(o)}
      }
    `;let l=o.shapeInfo.texShape,p=l[0],m=l[1],d=o.shapeInfo.flatOffset;if(m===s&&d==null)return t?`
      float ${n}(int row, int col, int depth) {
        int stride1 = ${r}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
        float ${n}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${i}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${m}.0, ${p}.0);
          return sampleTexture(${r}, uv);
        }
      `;if(m===i&&d==null)return t?`
      float ${n}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${r}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${n}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${e[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${m}.0, ${p}.0);
      return sampleTexture(${r}, uv);
    }
  `;let f=Pa(r);return t?`
    float ${n}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${r}Shape[1] * ${r}Shape[2];
      int stride1 = ${r}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${f};
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index);
      return sampleTexture(${r}, uv);
    }
    `:`
      float ${n}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${s} + col * ${i} + depth + ${f};
        vec2 uv = uvFromFlat(${p}, ${m}, index);
        return sampleTexture(${r}, uv);
      }
  `}function A4(o,t){let e=o.name,r="get"+e.charAt(0).toUpperCase()+e.slice(1),n=Qt();if(t)return`
    vec4 ${r}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${e}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${e}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${e}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${e}TexShape[0]) / 2.0), ceil(float(${e}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${n.texture2D}(${e}, uv);
    }
  `;let s=o.shapeInfo.logicalShape,i=s.length,a=o.shapeInfo.texShape,u=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)],c=u[0],l=u[1],p=Math.ceil(s[i-1]/2),m=p*Math.ceil(s[i-2]/2),d="int b, int row, int col",f=`b * ${m} + (row / 2) * ${p} + (col / 2)`;for(let h=2;h<i-1;h++)d=`int b${h}, `+d,m*=s[i-h-1],f=`b${h} * ${m} + `+f;return`
    vec4 ${r}(${d}) {
      int index = ${f};
      int texR = index / ${l};
      int texC = index - texR * ${l};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${l}, ${c});
      return ${n.texture2D}(${e}, uv);
    }
  `}function F4(o,t){let e=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=e[3],i=e[2]*s,a=e[1]*i,{newShape:u,keptDims:c}=C.squeezeShape(e);if(u.length<e.length){let b=Xu(o,u),w=["row","col","depth","depth2"];return`
      ${Ku(b,t)}
      float ${n}(int row, int col, int depth, int depth2) {
        return ${n}(${ju(w,c)});
      }
    `}if(o.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${a}, ${i}, ${s}, 1)));
        ${qu(o)}
      }
    `;let l=o.shapeInfo.flatOffset,p=o.shapeInfo.texShape,m=p[0],d=p[1],f=`int stride2 = ${r}Shape[3];`,h=`int stride1 = ${r}Shape[2] * stride2;`,g=`int stride0 = ${r}Shape[1] * stride1;`;if(d===a&&l==null)return t?`
      float ${n}(int row, int col, int depth, int depth2) {
        ${f}
        ${h}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${i}, ${s}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${m}.0);
        return sampleTexture(${r}, uv);
      }
    `;if(d===s&&l==null)return t?`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${r}Shape[1] * ${r}Shape[2], ${r}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${e[1]*e[2]}, ${e[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${m}.0);
        return sampleTexture(${r}, uv);
      }
    `;let x=Pa(r);return t?`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${f}
      ${h}
      ${g}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index + ${x});
      return sampleTexture(${r}, uv);
    }
  `:`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${a} + col * ${i} +
          depth * ${s} + depth2;
      vec2 uv = uvFromFlat(${m}, ${d}, index + ${x});
      return sampleTexture(${r}, uv);
    }
  `}function P4(o){let t=o.shapeInfo.logicalShape,e=o.name,r="get"+e.charAt(0).toUpperCase()+e.slice(1),n=t[4],s=t[3]*n,i=t[2]*s,a=t[1]*i,{newShape:u,keptDims:c}=C.squeezeShape(t);if(u.length<t.length){let h=Xu(o,u),g=["row","col","depth","depth2","depth3"];return`
      ${Ku(h)}
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        return ${r}(${ju(g,c)});
      }
    `}if(o.shapeInfo.isUniform)return`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${a}, ${i}, ${s}, ${n})) +
          depth3;
        ${qu(o)}
      }
    `;let l=o.shapeInfo.flatOffset,p=o.shapeInfo.texShape,m=p[0],d=p[1];if(d===a&&l==null)return`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${i}, ${s}, ${n}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${m}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(d===n&&l==null)return`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]},
               ${t[2]*t[3]}, ${t[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${m}.0);
        return sampleTexture(${e}, uv);
      }
    `;let f=Pa(e);return`
    float ${r}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${a} + col * ${i} + depth * ${s} +
          depth2 * ${n} + depth3 + ${f};
      vec2 uv = uvFromFlat(${m}, ${d}, index);
      return sampleTexture(${e}, uv);
    }
  `}function _4(o){let t=o.shapeInfo.logicalShape,e=o.name,r="get"+e.charAt(0).toUpperCase()+e.slice(1),{newShape:n,keptDims:s}=C.squeezeShape(t);if(n.length<t.length){let g=Xu(o,n),x=["row","col","depth","depth2","depth3","depth4"];return`
      ${Ku(g)}
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${r}(${ju(x,s)});
      }
    `}let i=t[5],a=t[4]*i,u=t[3]*a,c=t[2]*u,l=t[1]*c;if(o.shapeInfo.isUniform)return`
      float ${r}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${l}, ${c}, ${u}, ${a})) +
          dot(
            vec2(depth3, depth4),
            vec2(${i}, 1)));
        ${qu(o)}
      }
    `;let p=o.shapeInfo.flatOffset,m=o.shapeInfo.texShape,d=m[0],f=m[1];if(f===l&&p==null)return`
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${c}, ${u}, ${a}, ${i})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${d}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(f===i&&p==null)return`
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]*t[4]},
               ${t[2]*t[3]*t[4]},
               ${t[3]*t[4]},
               ${t[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${d}.0);
        return sampleTexture(${e}, uv);
      }
    `;let h=Pa(e);return`
    float ${r}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${l} + col * ${c} + depth * ${u} +
          depth2 * ${a} + depth3 * ${i} + depth4 + ${h};
      vec2 uv = uvFromFlat(${d}, ${f}, index);
      return sampleTexture(${e}, uv);
    }
  `}function qu(o){let t=o.name,e=C.sizeFromShape(o.shapeInfo.logicalShape);return e<2?`return ${t};`:`
    for (int i = 0; i < ${e}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function O4(o,t){let e=o.name,r=e.charAt(0).toUpperCase()+e.slice(1),n="get"+r+"AtOutCoords",s=o.shapeInfo.logicalShape.length,i=t.logicalShape.length,a=NI(o.shapeInfo.logicalShape,t.logicalShape),u=xt(i),c=i-s,l,p=["x","y","z","w","u","v"];s===0?l="":i<2&&a.length>=1?l="coords = 0;":l=a.map(b=>`coords.${p[b+c]} = 0;`).join(`
`);let m="";i<2&&s>0?m="coords":m=o.shapeInfo.logicalShape.map((b,w)=>`coords.${p[w+c]}`).join(", ");let d="return outputValue;",h=C.sizeFromShape(o.shapeInfo.logicalShape)===1,x=C.sizeFromShape(t.logicalShape)===1;if(s===1&&!h&&!x)d=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(h&&!x)i===1?d=`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:d=`
        return vec4(outputValue.x);
      `;else if(a.length){let b=s-2,w=s-1;a.indexOf(b)>-1&&a.indexOf(w)>-1?d="return vec4(outputValue.x);":a.indexOf(b)>-1?d="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":a.indexOf(w)>-1&&(d="return vec4(outputValue.xx, outputValue.zz);")}return`
    vec4 ${n}() {
      ${u} coords = getOutputCoords();
      ${l}
      vec4 outputValue = get${r}(${m});
      ${d}
    }
  `}function M4(o,t){let e=o.name,r=e.charAt(0).toUpperCase()+e.slice(1),n="get"+r+"AtOutCoords",s=t.texShape,i=o.shapeInfo.texShape,a=o.shapeInfo.logicalShape.length,u=t.logicalShape.length;if(!o.shapeInfo.isUniform&&a===u&&o.shapeInfo.flatOffset==null&&C.arraysEqual(i,s))return`
      float ${n}() {
        return sampleTexture(${e}, resultUV);
      }
    `;let c=xt(u),l=NI(o.shapeInfo.logicalShape,t.logicalShape),p=u-a,m,d=["x","y","z","w","u","v"];a===0?m="":u<2&&l.length>=1?m="coords = 0;":m=l.map(h=>`coords.${d[h+p]} = 0;`).join(`
`);let f="";return u<2&&a>0?f="coords":f=o.shapeInfo.logicalShape.map((h,g)=>`coords.${d[g+p]}`).join(", "),`
    float ${n}() {
      ${c} coords = getOutputCoords();
      ${m}
      return get${r}(${f});
    }
  `}function xt(o){if(o<=1)return"int";if(o===2)return"ivec2";if(o===3)return"ivec3";if(o===4)return"ivec4";if(o===5)return"ivec5";if(o===6)return"ivec6";throw Error(`GPU for rank ${o} is not yet supported`)}function Lp(o,t,e){let{newShape:r,keptDims:n}=C.squeezeShape(t),s=t.length,i=o&&s===3&&t[0]===1,a=i?t.slice(1):r,u=!o&&s>1&&!C.arraysEqual(t,e)&&r.length<s||i;return{useSqueezeShape:u,uniformShape:u?a:t,keptDims:n}}function Xu(o,t){let e=JSON.parse(JSON.stringify(o));return e.shapeInfo.logicalShape=t,e}function ju(o,t){return t.map(e=>o[e]).join(", ")}function FI(o,t,e,r){let n=e.map((l,p)=>{let m={logicalShape:l.shape,texShape:l.isUniform?null:l.texData.texShape,isUniform:l.isUniform,isPacked:l.isUniform?!1:l.texData.isPacked,flatOffset:null};return l.texData!=null&&l.texData.slice!=null&&l.texData.slice.flatOffset>0&&(m.flatOffset=l.texData.slice.flatOffset),{name:t.variableNames[p],shapeInfo:m}}),s=n.map(l=>l.shapeInfo),i={logicalShape:r.shape,texShape:r.texData.texShape,isUniform:!1,isPacked:r.texData.isPacked,flatOffset:null},a=EI(n,i,t),u=cI(o.gl,a),c=o.createProgram(u);return D().get("ENGINE_COMPILE_ONLY")?{program:t,fragmentShader:u,source:a,webGLProgram:c,inShapeInfos:s,outShapeInfo:i,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(o.buildVao(c),Object.assign({program:t,fragmentShader:u,source:a,webGLProgram:c,inShapeInfos:s,outShapeInfo:i},Bx(o,t,c)))}function Bx(o,t,e){let r=[],n=[],s,i,a,u=null,c=null;c=o.getUniformLocation(e,"NAN",!1),D().getNumber("WEBGL_VERSION")===1&&(u=o.getUniformLocation(e,"INFINITY",!1));let l=!1;for(let p of t.variableNames){let m={name:p,uniform:o.getUniformLocation(e,p,l),offset:o.getUniformLocation(e,`offset${p}`,l)};t.enableShapeUniforms&&(m.shape=o.getUniformLocation(e,`${p}Shape`,l),m.texShape=o.getUniformLocation(e,`${p}TexShape`,l)),r.push(m)}if(t.enableShapeUniforms&&(s=o.getUniformLocation(e,"outShape",l),a=o.getUniformLocation(e,"outShapeStrides",l),i=o.getUniformLocation(e,"outTexShape",l)),t.customUniforms)for(let p of t.customUniforms)n.push(o.getUniformLocation(e,p.name,l));return{variablesLocations:r,customUniformLocations:n,infLoc:u,nanLoc:c,outShapeLocation:s,outShapeStridesLocation:a,outTexShapeLocation:i}}function AI(o,t){if(o.length!==t.length)throw Error(`Binary was compiled with ${o.length} inputs, but was executed with ${t.length} inputs`);o.forEach((e,r)=>{let n=e.logicalShape,s=t[r],i=s.shape;if(!C.arraysEqual(n,i))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${n} and ${i} must match`);if(e.isUniform&&s.isUniform)return;let a=e.texShape,u=s.isUniform?null:s.texData.texShape;if(!C.arraysEqual(a,u))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${a} and ${u} must match`)})}function PI(o,t,e,r,n){t.program.enableShapeUniforms||(AI(t.inShapeInfos,e),AI([t.outShapeInfo],[r]));let s=r.texData.texture,i=r.texData.texShape;r.texData.isPacked?o.setOutputPackedMatrixTexture(s.texture,i[0],i[1]):o.setOutputMatrixTexture(s.texture,i[0],i[1]),o.setProgram(t.webGLProgram),o.bindVertexArray(t.webGLProgram.vao),D().getNumber("WEBGL_VERSION")===1&&t.infLoc!==null&&o.gl.uniform1f(t.infLoc,1/0),t.nanLoc!==null&&o.gl.uniform1f(t.nanLoc,NaN);for(let u=0;u<e.length;++u){let c=e[u],{uniform:l,offset:p,shape:m,texShape:d}=t.variablesLocations[u];if(m){let{uniformShape:f}=Lp(t.program.packedInputs,c.shape,c.texData.texShape);switch(f.length){case 1:o.gl.uniform1iv(m,new Int32Array(f));break;case 2:o.gl.uniform2iv(m,new Int32Array(f));break;case 3:o.gl.uniform3iv(m,new Int32Array(f));break;case 4:o.gl.uniform4iv(m,new Int32Array(f));break;default:break}}if(d&&o.gl.uniform2i(d,c.texData.texShape[0],c.texData.texShape[1]),l!=null){if(c.isUniform){if(C.sizeFromShape(c.shape)<2)o.gl.uniform1f(l,c.uniformValues[0]);else{let f=c.uniformValues;f instanceof Float32Array||(f=new Float32Array(f)),o.gl.uniform1fv(l,f)}continue}c.texData.slice!=null&&p!=null&&o.gl.uniform1i(p,c.texData.slice.flatOffset),o.setInputMatrixTexture(c.texData.texture.texture,l,u)}}let a=t.outShapeLocation;if(a)switch(r.shape.length){case 1:o.gl.uniform1iv(a,new Int32Array(r.shape));break;case 2:o.gl.uniform2iv(a,new Int32Array(r.shape));break;case 3:o.gl.uniform3iv(a,new Int32Array(r.shape));break;case 4:o.gl.uniform4iv(a,new Int32Array(r.shape));break;default:break}if(t.outShapeStridesLocation){let u=C.computeStrides(r.shape);switch(r.shape.length){case 2:o.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(u));break;case 3:o.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(u));break;case 4:o.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(u));break;default:break}}if(t.outTexShapeLocation&&o.gl.uniform2i(t.outTexShapeLocation,r.texData.texShape[0],r.texData.texShape[1]),t.program.customUniforms&&n)for(let u=0;u<t.program.customUniforms.length;++u){let c=t.program.customUniforms[u],l=t.customUniformLocations[u],p=n[u];if(c.type==="float")o.gl.uniform1fv(l,p);else if(c.type==="vec2")o.gl.uniform2fv(l,p);else if(c.type==="vec3")o.gl.uniform3fv(l,p);else if(c.type==="vec4")o.gl.uniform4fv(l,p);else if(c.type==="int")o.gl.uniform1iv(l,p);else if(c.type==="ivec2")o.gl.uniform2iv(l,p);else if(c.type==="ivec3")o.gl.uniform3iv(l,p);else if(c.type==="ivec4")o.gl.uniform4iv(l,p);else throw Error(`uniform type ${c.type} is not supported yet.`)}o.executeProgram()}function _I(o,t,e){let r="";t.concat(e).forEach(i=>{let a=i.texData!=null&&i.texData.slice!=null&&i.texData.slice.flatOffset>0;if(o.enableShapeUniforms&&!i.isUniform){let u=i.texData.texShape,{useSqueezeShape:c,uniformShape:l,keptDims:p}=Lp(o.packedInputs,i.shape,u),m="",d="",f="";if(l.length===1&&o.packedInputs){let k=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)];m=`${k[0]>1}_${k[1]>1}`}else if(l.length===2&&!o.packedInputs)d=`${l[0]>1}_${l[1]>1}`;else if(l.length>2&&!o.packedInputs){let k=C.computeStrides(l);f=`${k[0]===u[1]}_${k[k.length-1]===u[1]}`}let h=i.shape.length,g=l.length===2&&C.arraysEqual(i.shape,u),x=C.sizeFromShape(i.shape)===1,b=y.getBroadcastDims(i.shape,e.shape),w=!o.packedInputs&&h===e.shape.length&&C.arraysEqual(u,e.texData.texShape),v=o.packedInputs||l.length>2?"":`${u[0]>1}_${u[1]>1}`;r+=`${h}_${w}_${c?p:""}_${l.length}_${x}_${b}_${g}_${m}_${d}_${f}_${v}_${a}`}else{let u=i.isUniform?"uniform":i.texData.texShape;r+=`${i.shape}_${u}_${a}`}});let n=o.userCode,s=o.constructor.name;return s+="_"+r+"_"+n+`${D().getNumber("WEBGL_VERSION")}`,s}function Mt(o){return D().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&o<=4}var Bp=class{constructor(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=Ti.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let e=Qt();this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?Fa(["r","c","d"],t):Mo(["r","c","d"],t)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${e.output} = result;
      }
    `}};var zp=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=Ti.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let e=Qt();this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?Fa(["r","c","d"],t):Mo(["r","c","d"],t)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${e.output} = result;
      }
    `}};var Vp=class{constructor(t){this.variableNames=["A"],this.outTexUsage=Re.DOWNLOAD;let e=Qt();this.outputShape=t,this.userCode=`
      ${Mp}

      void main() {
        float x = getAAtOutCoords();
        ${e.output} = encode_float(x);
      }
    `}};var Wp=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=Re.DOWNLOAD;let e=Qt();this.outputShape=t,this.userCode=`
      ${Mp}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${e.output} = encode_float(x);
      }
    `}};var z4={R:0,G:1,B:2,A:3},nl=class{constructor(t,e=!1,r="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let n=Qt();this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length);let s="result";e&&(s="floor(result * 255. + 0.5)");let i="";for(let a=0;a<r.length;a++){let u=r[a];i+=`
          if(offset == ${a}) {
            result = values[${z4[u]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?Gu():Uu(t)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${r.length});

        flatIndex = idiv(flatIndex, ${r.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${n.texture2D}(A, uv);
          ${i}
        }
        ${n.output} = vec4(${s}, 0., 0., 0.);
      }
    `}};var Up=class{constructor(t,e=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let r=Qt();this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length);let n="",s="result";e&&(s="floor(result * 255. + 0.5)");for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){let u=i*2+a;n+=`
          localCoords = coords;
          if(localCoords[2] + ${a} < ${this.enableShapeUniforms?"outShape[2]":`${t[2]}`}) {
          localCoords[2] += ${a};
          if (localCoords[1] + ${i} < ${this.enableShapeUniforms?"outShape[1]":`${t[1]}`}) {
            localCoords[1] += ${i};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${r.texture2D}(A, uv);

            if (offset == 0) {
              result[${u}] = values[0];
            } else if (offset == 1) {
              result[${u}] = values[1];
            } else if (offset == 2) {
              result[${u}] = values[2];
            } else {
              result[${u}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?Gu():Uu(t)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${n}

          ${r.output} = ${s};
        }
    `}};function OI(o){let t=Qt(),e=`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return uI(o,e)}function MI(o){let t=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return mI(o,t)}function LI(o){let t=new Uint16Array([0,1,2,2,1,3]);return dI(o,t)}function sl(o,t,e,r,n,s){hI(t,e);let i=fI(o),a=o.TEXTURE_2D;return it(o,()=>o.bindTexture(a,i)),it(o,()=>o.texParameteri(a,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE)),it(o,()=>o.texParameteri(a,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)),it(o,()=>o.texParameteri(a,o.TEXTURE_MIN_FILTER,o.NEAREST)),it(o,()=>o.texParameteri(a,o.TEXTURE_MAG_FILTER,o.NEAREST)),D().getNumber("WEBGL_VERSION")===1?it(o,()=>o.texImage2D(a,0,r,t,e,0,n,s,null)):it(o,()=>o.texStorage2D(a,1,r,t,e)),it(o,()=>o.bindTexture(o.TEXTURE_2D,null)),{texture:i,texShape:[e,t]}}function zx(o){return o.internalFormatFloat}function BI(o,t,e,r){let[n,s]=Da(t,e);return sl(o,n,s,zx(r),r.textureFormatFloat,o.FLOAT)}function Vx(o){return o.internalFormatHalfFloat}function zI(o,t,e,r){let[n,s]=Da(t,e);return sl(o,n,s,Vx(r),r.textureFormatFloat,r.textureTypeHalfFloat)}function Wx(o){return o.downloadTextureFormat}function VI(o,t,e,r){let[n,s]=Da(t,e);return sl(o,n,s,Wx(r),o.RGBA,o.UNSIGNED_BYTE)}function Ux(o){return o.internalFormatPackedFloat}function WI(o,t,e,r){let[n,s]=sr(t,e);return sl(o,n,s,Ux(r),o.RGBA,o.FLOAT)}function Gx(o){return o.internalFormatPackedHalfFloat}function UI(o,t,e,r){let[n,s]=sr(t,e);return sl(o,n,s,Gx(r),o.RGBA,r.textureTypeHalfFloat)}function GI(o,t,e){return it(o,()=>o.bindBuffer(o.ARRAY_BUFFER,e)),Ox(o,t,"clipSpacePos",e,3,20,0)&&Ox(o,t,"uv",e,2,20,12)}function HI(o,t,e,r,n,s){it(o,()=>o.bindTexture(o.TEXTURE_2D,t));let i,a,u;n instanceof Uint8Array?(i=new Uint8Array(e*r*4),a=o.UNSIGNED_BYTE,u=o.RGBA):(i=new Float32Array(e*r*4),a=o.FLOAT,u=s.internalFormatPackedFloat),i.set(n),D().getNumber("WEBGL_VERSION")===2?it(o,()=>o.texSubImage2D(o.TEXTURE_2D,0,0,0,e,r,o.RGBA,a,i)):it(o,()=>o.texImage2D(o.TEXTURE_2D,0,u,e,r,0,o.RGBA,a,i)),it(o,()=>o.bindTexture(o.TEXTURE_2D,null))}function KI(o,t,e){it(o,()=>o.bindTexture(o.TEXTURE_2D,t)),e.data instanceof Uint8Array?D().getNumber("WEBGL_VERSION")===2?it(o,()=>o.texSubImage2D(o.TEXTURE_2D,0,0,0,e.width,e.height,o.RGBA,o.UNSIGNED_BYTE,e.data)):it(o,()=>o.texImage2D(o.TEXTURE_2D,0,o.RGBA,e.width,e.height,0,o.RGBA,o.UNSIGNED_BYTE,e.data)):D().getNumber("WEBGL_VERSION")===2?it(o,()=>o.texSubImage2D(o.TEXTURE_2D,0,0,0,o.RGBA,o.UNSIGNED_BYTE,e)):it(o,()=>o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,e)),it(o,()=>o.bindTexture(o.TEXTURE_2D,null))}function qI(o,t,e,r){let n=o.createBuffer();it(o,()=>o.bindBuffer(o.PIXEL_PACK_BUFFER,n));let a=4*4*t*e;return it(o,()=>o.bufferData(o.PIXEL_PACK_BUFFER,a,o.STREAM_READ)),it(o,()=>o.readPixels(0,0,e,t,o.RGBA,o.FLOAT,0)),it(o,()=>o.bindBuffer(o.PIXEL_PACK_BUFFER,null)),n}function XI(o,t,e){let r=o,n=new Float32Array(e);return r.bindBuffer(r.PIXEL_PACK_BUFFER,t),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,n),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),n}function jI(o,t,e,r){let[n,s]=Da(t,e),i=4,a=new Uint8Array(sI(t*e,i));return it(o,()=>o.readPixels(0,0,n,s,r.downloadTextureFormat,o.UNSIGNED_BYTE,a)),new Float32Array(a.buffer)}function YI(o,t,e,r,n,s,i,a){let u=o,c=new Float32Array(iI(s,i));return u.bindBuffer(u.PIXEL_PACK_BUFFER,t),u.getBufferSubData(u.PIXEL_PACK_BUFFER,0,c),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),c}function QI(o,t,e){let r=new Float32Array(t*e*4);return it(o,()=>o.readPixels(0,0,e,t,o.RGBA,o.FLOAT,r)),r}var Yu=class{constructor(t){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let e=D().getNumber("WEBGL_VERSION");if(t!=null?(this.gl=t,nI(e,t)):this.gl=Ze(e),t=this.gl,D().getNumber("WEBGL_VERSION")===2){let s=t;this.createVertexArray=()=>it(s,()=>s.createVertexArray()),this.bindVertexArray=i=>it(s,()=>s.bindVertexArray(i)),this.deleteVertexArray=i=>it(s,()=>s.deleteVertexArray(i)),this.getVertexArray=()=>it(s,()=>s.getParameter(s.VERTEX_ARRAY_BINDING))}else if(t!=null){let s=t.getExtension("OES_vertex_array_object");if(s==null)throw new Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>it(t,()=>s.createVertexArrayOES()),this.bindVertexArray=i=>it(t,()=>s.bindVertexArrayOES(i)),this.deleteVertexArray=i=>it(t,()=>s.deleteVertexArrayOES(i)),this.getVertexArray=()=>it(t,()=>t.getParameter(s.VERTEX_ARRAY_BINDING_OES))}let r="WEBGL_color_buffer_float",n="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),D().getNumber("WEBGL_VERSION")===1){let s="OES_texture_float",i="OES_texture_half_float";if(this.textureFloatExtension=el(this.gl,s),co(this.gl,i))this.textureHalfFloatExtension=el(this.gl,i);else if(D().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(r),co(this.gl,n))this.colorBufferHalfFloatExtension=el(this.gl,n);else if(D().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(r="EXT_color_buffer_float",co(this.gl,r))this.colorBufferFloatExtension=this.gl.getExtension(r);else if(co(this.gl,n))this.colorBufferHalfFloatExtension=this.gl.getExtension(n);else throw new Error("GL context does not support color renderable floats");this.vertexBuffer=MI(this.gl),this.indexBuffer=LI(this.gl),this.framebuffer=gI(this.gl),this.textureConfig=tl(this.gl,this.textureHalfFloatExtension)}get debug(){return D().getBool("DEBUG")}dispose(){if(this.disposed)return;this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let t=this.gl;it(t,()=>t.finish()),it(t,()=>t.bindFramebuffer(t.FRAMEBUFFER,null)),it(t,()=>t.deleteFramebuffer(this.framebuffer)),it(t,()=>t.bindBuffer(t.ARRAY_BUFFER,null)),it(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null)),it(t,()=>t.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(t,e){return this.throwIfDisposed(),BI(this.gl,t,e,this.textureConfig)}createFloat16MatrixTexture(t,e){return this.throwIfDisposed(),zI(this.gl,t,e,this.textureConfig)}createUnsignedBytesMatrixTexture(t,e){return this.throwIfDisposed(),VI(this.gl,t,e,this.textureConfig)}uploadPixelDataToTexture(t,e){this.throwIfDisposed(),KI(this.gl,t,e)}uploadDenseMatrixToTexture(t,e,r,n){this.throwIfDisposed(),HI(this.gl,t,e,r,n,this.textureConfig)}createFloat16PackedMatrixTexture(t,e){return this.throwIfDisposed(),UI(this.gl,t,e,this.textureConfig)}createPackedMatrixTexture(t,e){return this.throwIfDisposed(),WI(this.gl,t,e,this.textureConfig)}deleteMatrixTexture(t){this.throwIfDisposed(),this.outputTexture===t&&(Mx(this.gl,this.framebuffer),this.outputTexture=null),it(this.gl,()=>this.gl.deleteTexture(t))}downloadByteEncodedFloatMatrixFromOutputTexture(t,e,r){return this.downloadMatrixDriver(t,()=>jI(this.gl,e,r,this.textureConfig))}downloadPackedMatrixFromBuffer(t,e,r,n,s,i){return YI(this.gl,t,e,r,n,s,i,this.textureConfig)}downloadFloat32MatrixFromBuffer(t,e){return XI(this.gl,t,e)}createBufferFromTexture(t,e,r){this.bindTextureToFrameBuffer(t);let n=qI(this.gl,e,r,this.textureConfig);return this.unbindTextureToFrameBuffer(),n}createAndWaitForFence(){let t=this.createFence(this.gl);return this.pollFence(t)}createFence(t){let e,r;if(D().getBool("WEBGL_FENCE_API_ENABLED")){let n=t,s=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);t.flush(),r=()=>{let i=n.clientWaitSync(s,0,0);return i===n.ALREADY_SIGNALED||i===n.CONDITION_SATISFIED},e=s}else D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(e=this.beginQuery(),this.endQuery(),r=()=>this.isQueryAvailable(e,D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):r=()=>!0;return{query:e,isFencePassed:r}}downloadMatrixFromPackedTexture(t,e,r){return this.downloadMatrixDriver(t,()=>QI(this.gl,e,r))}createProgram(t){this.throwIfDisposed();let e=this.gl;this.vertexShader==null&&(this.vertexShader=OI(e));let r=lI(e);it(e,()=>e.attachShader(r,this.vertexShader)),it(e,()=>e.attachShader(r,t)),pI(e,r);let n=Object.assign(r,{vao:this.createVertexArray()});return this.debug&&Pp(e,n),n}buildVao(t){this.setProgram(t),this.bindVertexArray(t.vao);let e=this.gl;it(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),GI(e,t,this.vertexBuffer)}deleteProgram(t){this.throwIfDisposed(),t===this.program&&(this.program=null),t!=null&&(it(this.gl,()=>this.gl.deleteProgram(t)),this.deleteVertexArray(t.vao))}setProgram(t){this.throwIfDisposed(),this.program=t,this.program!=null&&this.debug&&Pp(this.gl,this.program),it(this.gl,()=>this.gl.useProgram(t))}getUniformLocation(t,e,r=!0){return this.throwIfDisposed(),r?xI(this.gl,t,e):CI(this.gl,t,e)}getAttributeLocation(t,e){return this.throwIfDisposed(),it(this.gl,()=>this.gl.getAttribLocation(t,e))}getUniformLocationNoThrow(t,e){return this.throwIfDisposed(),this.gl.getUniformLocation(t,e)}setInputMatrixTexture(t,e,r){this.throwIfDisposed(),this.throwIfNoProgram(),bI(this.gl,t,e,r)}setOutputMatrixTexture(t,e,r){this.setOutputMatrixTextureDriver(t,r,e)}setOutputPackedMatrixTexture(t,e,r){this.throwIfDisposed();let[n,s]=sr(e,r);this.setOutputMatrixTextureDriver(t,n,s)}setOutputMatrixWriteRegion(t,e,r,n){this.setOutputMatrixWriteRegionDriver(r,t,n,e)}setOutputPackedMatrixWriteRegion(t,e,r,n){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){this.program!=null&&Pp(this.gl,this.program),ol(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let t=this.gl;if(this.debug){let e=this.getVertexArray();console.assert(e===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()}it(t,()=>t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),it(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=el(this.gl,D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let r=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=r.createQuery();return r.beginQuery(n.TIME_ELAPSED_EXT,s),s}let t=this.getQueryTimerExtensionWebGL1(),e=t.createQueryEXT();return t.beginQueryEXT(t.TIME_ELAPSED_EXT,e),e}endQuery(){if(D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let e=this.gl,r=this.getQueryTimerExtensionWebGL2();e.endQuery(r.TIME_ELAPSED_EXT);return}let t=this.getQueryTimerExtensionWebGL1();t.endQueryEXT(t.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(t){return await C.repeatedTry(()=>this.disposed||this.isQueryAvailable(t,D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(t,D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(t,e){if(e===0)return null;if(e===2){let r=this.gl;return r.getQueryParameter(t,r.QUERY_RESULT)/1e6}else{let r=this.getQueryTimerExtensionWebGL1();return r.getQueryObjectEXT(t,r.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(t,e){if(e===0)return!0;if(e===2){let r=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=r.getQueryParameter(t,r.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(n.GPU_DISJOINT_EXT)),s&&!this.disjoint}else{let r=this.getQueryTimerExtensionWebGL1(),n=r.getQueryObjectEXT(t,r.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),n&&!this.disjoint}}pollFence(t){return new Promise(e=>{this.addItemToPoll(()=>t.isFencePassed(),()=>e())})}pollItems(){let t=W4(this.itemsToPoll.map(e=>e.isDoneFn));for(let e=0;e<=t;++e){let{resolveFn:r}=this.itemsToPoll[e];r()}this.itemsToPoll=this.itemsToPoll.slice(t+1)}addItemToPoll(t,e){if(this.itemsToPoll.push({isDoneFn:t,resolveFn:e}),this.itemsToPoll.length>1)return;let r;"setTimeoutCustom"in D().platform&&(r=D().platform.setTimeoutCustom.bind(D().platform)),C.repeatedTry(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,r)}bindTextureToFrameBuffer(t){this.throwIfDisposed(),_p(this.gl,t,this.framebuffer),this.debug&&ol(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture!=null?(_p(this.gl,this.outputTexture,this.framebuffer),this.debug&&ol(this.gl)):Mx(this.gl,this.framebuffer)}downloadMatrixDriver(t,e){this.bindTextureToFrameBuffer(t);let r=e();return this.unbindTextureToFrameBuffer(),r}setOutputMatrixTextureDriver(t,e,r){this.throwIfDisposed();let n=this.gl;_p(n,t,this.framebuffer),this.debug&&ol(n),this.outputTexture=t,it(n,()=>n.viewport(0,0,e,r)),it(n,()=>n.scissor(0,0,e,r))}setOutputMatrixWriteRegionDriver(t,e,r,n){this.throwIfDisposed(),it(this.gl,()=>this.gl.scissor(t,e,r,n))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(this.program==null)throw new Error("No GPU program is currently set.")}};function W4(o){let t=0;for(;t<o.length&&o[t]();++t);return t-1}var{addImpl:ZI,bincountImpl:Gp,bincountReduceImpl:JI,bitwiseAndImpl:t2,castImpl:e2,ceilImpl:o2,concatImpl:r2,equalImpl:n2,expImpl:s2,expm1Impl:i2,floorImpl:a2,gatherNdImpl:u2,gatherV2Impl:c2,greaterImpl:l2,greaterEqualImpl:p2,lessImpl:m2,lessEqualImpl:d2,linSpaceImpl:f2,logImpl:h2,maxImpl:g2,maximumImpl:x2,minimumImpl:C2,multiplyImpl:b2,negImpl:y2,notEqualImpl:w2,prodImpl:S2,raggedGatherImpl:v2,raggedRangeImpl:I2,raggedTensorToTensorImpl:k2,rangeImpl:$2,rsqrtImpl:T2,scatterImpl:N2,sigmoidImpl:E2,simpleAbsImpl:Hp,sliceImpl:R2,sparseFillEmptyRowsImpl:D2,sparseReshapeImpl:A2,sparseSegmentReductionImpl:Kp,sqrtImpl:F2,staticRegexReplaceImpl:P2,stridedSliceImpl:_2,stringNGramsImpl:O2,stringSplitImpl:M2,stringToHashBucketFastImpl:L2,subImpl:B2,tileImpl:z2,topKImpl:V2,transposeImpl:_a,uniqueImpl:W2}=qc;function Hx(o,t){return["x","y","z","w","u","v"].slice(0,t).map(e=>`${o}.${e}`)}function ne(o,t){return t===1?[o]:Hx(o,t)}function U2(o,t){if(o===1)return"rc";let e="";for(let r=0;r<o;r++)e+=t[r],r<o-1&&(e+=",");return e}var qp=class{constructor(t){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=t,this.rank=t.length,this.enableShapeUniforms=Mt(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=ne("rc",this.rank),r=xt(this.rank),n=this.getOutOfBoundsCondition(e),s=this.getSetup(e),i=this.getOutput(e);this.userCode=`
        void main() {
          ${r} rc = getOutputCoords();

          if(${n}) {
            setOutput(vec4(0));
          } else {
            ${s}

            setOutput(vec4(${i}));
          }
        }
      `}}getSourceCoordsArr(t){let e=[];for(let r=0;r<=1;r++)for(let n=0;n<=1;n++){let s=`${r===0?"r":"rp1"}, ${n===0?"c":"cp1"}`;for(let i=2;i<this.rank;i++)s=`${t[t.length-1-i]},`+s;e.push(s)}return e}getOutOfBoundsCondition(t){if(this.rank===1)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let e="";for(let r=this.rank-2;r<this.rank;r++)e+=`${t[r]} >= ${this.enableShapeUniforms?`outShape[${r}]`:this.outputShape[r]}`,r<this.rank-1&&(e+="||");return e}getSetup(t){if(this.rank===1)return"";let e=t.slice(-2),r=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],n=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${e[0]};
      int c = ${e[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${r};
      bool rEdge = rp1 >= ${n};
    `}getOutput(t){let e=this.getSourceCoordsArr(t);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?"outShape":this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${e[0]}),
            cEdge ? 0. : getA(${e[1]}),
            rEdge ? 0. : getA(${e[2]}),
            rEdge || cEdge ? 0. : getA(${e[3]})`}};var Qu=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length);let r="";for(let n=0;n<4;n++){let s="thisRC = rc;";n%2===1&&(s+="thisRC.z += 1;"),n>1&&(s+="thisRC.y += 1;"),r+=`
        ${s}
        ${n>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${n}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${n>0?"}":""}
      `}this.userCode=`
      ${U4(e,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?Gu():Uu(t)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":t[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":t[2]};

        ${r}

        setOutput(result);
      }
    `}};function U4(o,t){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t?TI(["r","c","d"],"inputShape"):Mo(["r","c","d"],o)}
      return ivec3(r, c, d);
    }
  `}var Xp=class{constructor(t){this.gpgpu=t,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(t,e,r){let n=H2(e,r),s=K2(t,n,r);s in this.freeTextures||(this.freeTextures[s]=[]),s in this.usedTextures||(this.usedTextures[s]=[]);let i=G2(t,n,this.gpgpu.gl,this.gpgpu.textureConfig,r);if(this.freeTextures[s].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=i,this.log();let u=this.freeTextures[s].pop();return this.usedTextures[s].push(u),u}let a;return n===ye.PACKED_2X2_FLOAT32?a=this.gpgpu.createPackedMatrixTexture(t[0],t[1]):n===ye.PACKED_2X2_FLOAT16?a=this.gpgpu.createFloat16PackedMatrixTexture(t[0],t[1]):n===ye.UNPACKED_FLOAT32?a=this.gpgpu.createFloat32MatrixTexture(t[0],t[1]):n===ye.UNPACKED_FLOAT16?a=this.gpgpu.createFloat16MatrixTexture(t[0],t[1]):n===ye.PACKED_4X1_UNSIGNED_BYTE&&(a=this.gpgpu.createUnsignedBytesMatrixTexture(t[0],t[1])),this.usedTextures[s].push(a),this.numUsedTextures++,this._numBytesAllocated+=i,this.log(),a}releaseTexture(t,e,r,n){if(this.freeTextures==null)return;let s=H2(r,n),i=K2(e,s,n);i in this.freeTextures||(this.freeTextures[i]=[]);let a=G2(e,s,this.gpgpu.gl,this.gpgpu.textureConfig,n),u=D().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");u!==-1&&this._numBytesAllocated>u?(this.gpgpu.deleteMatrixTexture(t.texture),this._numBytesAllocated-=a):(this.freeTextures[i].push(t),this.numFreeTextures++,this._numBytesFree+=a),this.numUsedTextures--;let c=this.usedTextures[i],l=c&&c.indexOf(t);if(l==null||l<0)throw new Error("Cannot release a texture that was never provided by this texture manager");c[l]=c[c.length-1],c.pop(),this.log()}log(){if(!this.logEnabled)return;let t=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${t})`);let e=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*e)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(let t in this.freeTextures)this.freeTextures[t].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let t in this.usedTextures)this.usedTextures[t].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function G4(o,t){let e=o;if(t===e.R32F)return 4;if(t===e.R16F)return 2;if(t===e.RGBA32F)return 16;if(t===o.RGBA)return 16;if(t===e.RGBA16F)return 8;if(t===e.RGBA8)return 4;throw new Error(`Unknown internal format ${t}`)}function G2(o,t,e,r,n){let s=H4(t,r),i;if(n){let[u,c]=sr(o[0],o[1]);i=u*c}else{let[u,c]=Da(o[0],o[1]);i=u*c}let a=G4(e,s);return i*a}function H4(o,t){switch(o){case ye.PACKED_2X2_FLOAT32:return Ux(t);case ye.PACKED_2X2_FLOAT16:return Gx(t);case ye.UNPACKED_FLOAT32:return zx(t);case ye.UNPACKED_FLOAT16:return Vx(t);case ye.PACKED_4X1_UNSIGNED_BYTE:return Wx(t);default:throw new Error(`Unknown physical texture type ${o}`)}}function K4(o){return D().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?o?ye.PACKED_2X2_FLOAT32:ye.UNPACKED_FLOAT32:o?ye.PACKED_2X2_FLOAT16:ye.UNPACKED_FLOAT16}function H2(o,t){if(o===Re.UPLOAD)return ye.PACKED_2X2_FLOAT32;if(o===Re.RENDER||o==null)return K4(t);if(o===Re.DOWNLOAD||o===Re.PIXELS)return ye.PACKED_4X1_UNSIGNED_BYTE;throw new Error(`Unknown logical texture type ${o}`)}function K2(o,t,e){return`${o[0]}_${o[1]}_${t}_${e}`}var we=class{constructor(t,e){this.variableNames=["A"],this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${e}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}},fe="if (isnan(x)) return x;",q2="return x;",Kx="return abs(x);";var X2="return (x >= 0.0) ? x : (exp(x) - 1.0);",j2=fe+`
  return (x < 0.0) ? 0.0 : x;
`,Y2=fe+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,ar="return x;",Q2="return 1.0 / (1.0 + exp(-1.0 * x));";var J2="return x;",t1=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,e1=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,o1=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,r1="return 1.0 / (1.0 + exp(-1.0 * x));",Ge=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${e}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}};var jp=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length);let e=t.length,r=ne("rc",e),n=xt(e),s=U2(e,r),i=r.slice(-2),a=e<=1?"rc":`vec2(${i.join(",")})`;this.userCode=`
      void main() {
        ${n} rc = getOutputCoords();
        vec4 packedInput = getA(${s});

        setOutput(getChannel(packedInput, ${a}));
      }
    `}};var X4=de.whereImpl,j4=1e-7,Y4=1e-4,Yp={};function Q4(o){return o in Yp||(Yp[o]={}),Yp[o]}var Z4=D().getNumber("CPU_HANDOFF_SIZE_THRESHOLD"),J4=600;function tG(){return D().global.screen==null?1024:D().global.screen.height*D().global.screen.width*window.devicePixelRatio*J4/1024/1024}var il=class o extends No{nextDataId(){return o.nextDataId++}constructor(t){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!D().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");let e;if(t!=null){if(t instanceof Yu)e=t;else{let r=Ze(D().getNumber("WEBGL_VERSION"),t);e=new Yu(r)}this.binaryCache={},this.gpgpuCreatedLocally=!1}else{let r=Ze(D().getNumber("WEBGL_VERSION"));e=new Yu(r),this.binaryCache=Q4(D().getNumber("WEBGL_VERSION")),this.gpgpuCreatedLocally=!0}this.gpgpu=e,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new Xp(this.gpgpu),this.numMBBeforeWarning=tG(),this.texData=new mr(this,Be())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(t,e,r,n,s,i){let a=this.makeTensorInfo(e,r),u=this.texData.get(a.dataId);u.isPacked=!1,u.texture={texture:t,texShape:[n,s]},u.texShape=[n,s];let c=rl(e),l=new nl(c,!1,i),p=this.runWebGLProgram(l,[a],r,[[n,s]]);return p.shape=e,u.texture=null,this.disposeIntermediateTensorInfo(a),p.dataId}write(t,e,r){if((D().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||D().getBool("DEBUG"))&&this.checkNumericalProblems(t),r==="complex64"&&t!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let n={id:this.nextDataId()};return this.texData.set(n,{shape:e,dtype:r,values:t,usage:Re.UPLOAD,refCount:1}),n}refCount(t){return this.texData.has(t)?this.texData.get(t).refCount:0}incRef(t){let e=this.texData.get(t);e.refCount++}decRef(t){if(this.texData.has(t)){let e=this.texData.get(t);e.refCount--}}move(t,e,r,n,s){if(D().getBool("DEBUG")&&this.checkNumericalProblems(e),n==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(t,{shape:r,dtype:n,values:e,usage:Re.UPLOAD,refCount:s})}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}readSync(t){let e=this.texData.get(t),{values:r,dtype:n,complexTensorInfos:s,slice:i,shape:a,isPacked:u}=e;if(i!=null){let m;u?m=new Ge(a,ar):m=new we(a,ar);let d=this.runWebGLProgram(m,[{dataId:t,shape:a,dtype:n}],n),f=this.readSync(d.dataId);return this.disposeIntermediateTensorInfo(d),f}if(r!=null)return this.convertAndCacheOnCPU(t);if(n==="string")return r;let c=this.activeTimers!=null,l;c&&(l=C.now());let p;if(n==="complex64"){let m=this.readSync(s.real.dataId),d=this.readSync(s.imag.dataId);p=y.mergeRealAndImagArrays(m,d)}else p=this.getValuesFromTexture(t);return c&&(this.downloadWaitMs+=C.now()-l),this.convertAndCacheOnCPU(t,p)}async read(t){if(this.pendingRead.has(t)){let f=this.pendingRead.get(t);return new Promise(h=>f.push(h))}let e=this.texData.get(t),{values:r,shape:n,slice:s,dtype:i,complexTensorInfos:a,isPacked:u}=e;if(s!=null){let f;u?f=new Ge(n,ar):f=new we(n,ar);let h=this.runWebGLProgram(f,[{dataId:t,shape:n,dtype:i}],i),g=this.read(h.dataId);return this.disposeIntermediateTensorInfo(h),g}if(r!=null)return this.convertAndCacheOnCPU(t);if(D().getBool("DEBUG")&&!D().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&D().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let c=null,l;if(i!=="complex64"&&D().get("WEBGL_BUFFER_SUPPORTED")){l=this.decode(t);let f=this.texData.get(l.dataId);c=this.gpgpu.createBufferFromTexture(f.texture.texture,...Jc(n))}this.pendingRead.set(t,[]),i!=="complex64"&&await this.gpgpu.createAndWaitForFence();let p;if(i==="complex64"){let f=await Promise.all([this.read(a.real.dataId),this.read(a.imag.dataId)]),h=f[0],g=f[1];p=y.mergeRealAndImagArrays(h,g)}else if(c==null)p=this.getValuesFromTexture(t);else{let f=C.sizeFromShape(n);p=this.gpgpu.downloadFloat32MatrixFromBuffer(c,f)}if(l!=null&&this.disposeIntermediateTensorInfo(l),c!=null){let f=this.gpgpu.gl;it(f,()=>f.deleteBuffer(c))}let m=this.convertAndCacheOnCPU(t,p),d=this.pendingRead.get(t);return this.pendingRead.delete(t),d.forEach(f=>f(m)),this.pendingDisposal.has(t)&&(this.pendingDisposal.delete(t),this.disposeData(t)&&Be().removeDataId(t,this),this.pendingDeletes--),m}readToGPU(t,e={}){let r=this.texData.get(t),{values:n,shape:s,slice:i,dtype:a,isPacked:u,texture:c}=r;if(a==="complex64")throw new Error("Does not support reading texture for complex64 dtype.");if(i!=null){let d;u?d=new Ge(s,ar):d=new we(s,ar);let f=this.runWebGLProgram(d,[{dataId:t,shape:s,dtype:a}],a),h=this.readToGPU(f,e);return this.disposeIntermediateTensorInfo(f),h}if(c==null)throw n!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");let l=this.decode(t,e.customTexShape),p=Be().makeTensorFromTensorInfo(l),m=this.texData.get(l.dataId);return Object.assign({tensorRef:p},m.texture)}bufferSync(t){let e=this.readSync(t.dataId);if(t.dtype==="string")try{let r=e.map(n=>C.decodeString(n));return nt(t.shape,t.dtype,r)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return nt(t.shape,t.dtype,e)}checkNumericalProblems(t){if(t!=null)for(let e=0;e<t.length;e++){let r=t[e];if(!aI(r))throw D().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error(`The value ${r} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${r} cannot be represented on this device.`)}}getValuesFromTexture(t){let{shape:e,dtype:r,isPacked:n}=this.texData.get(t),s=C.sizeFromShape(e);if(D().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){let m=this.decode(t),d=this.texData.get(m.dataId),f=this.gpgpu.downloadMatrixFromPackedTexture(d.texture.texture,...Jc(e)).subarray(0,s);return this.disposeIntermediateTensorInfo(m),f}let i=D().getBool("WEBGL_PACK")&&n===!0,a=i?rl(e):e,u=i?new Wp(a):new Vp(a),c=this.runWebGLProgram(u,[{shape:a,dtype:r,dataId:t}],"float32"),l=this.texData.get(c.dataId),p=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(l.texture.texture,l.texShape[0],l.texShape[1]).subarray(0,s);return this.disposeIntermediateTensorInfo(c),p}timerAvailable(){return D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(t){let e=this.activeTimers,r=[],n=!1;this.programTimersStack==null?(this.programTimersStack=r,n=!0):this.activeTimers.push(r),this.activeTimers=r,t();let s=C.flatten(this.activeTimers.map(u=>u.query)).filter(u=>u!=null),i=C.flatten(this.activeTimers.map(u=>u.name)).filter(u=>u!=null);this.activeTimers=e,n&&(this.programTimersStack=null);let a={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if(D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){let u=await Promise.all(s);a.kernelMs=C.sum(u),a.getExtraProfileInfo=()=>u.map((c,l)=>({name:i[l],ms:c})).map(c=>`${c.name}: ${c.ms}`).join(", ")}else a.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,a})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:C.now(),endMs:null}}endTimer(t){return D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),t):(t.endMs=C.now(),t)}async getQueryTime(t){if(D().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(t);let e=t;return e.endMs-e.startMs}disposeData(t,e=!1){if(this.pendingDisposal.has(t))return!1;if(!this.texData.has(t))return!0;if(e?this.texData.get(t).refCount=0:this.texData.get(t).refCount--,!e&&this.texData.get(t).refCount>0)return!1;if(this.pendingRead.has(t))return this.pendingDisposal.add(t),this.pendingDeletes++,!1;this.releaseGPUData(t);let{complexTensorInfos:r}=this.texData.get(t);return r!=null&&(this.disposeData(r.real.dataId,e),this.disposeData(r.imag.dataId,e)),this.texData.delete(t),!0}releaseGPUData(t){let{texture:e,dtype:r,texShape:n,usage:s,isPacked:i,slice:a}=this.texData.get(t),u=a&&a.origDataId||t,c=this.dataRefCount.get(u);c>1?this.dataRefCount.set(u,c-1):(this.dataRefCount.delete(u),e!=null&&(this.numBytesInGPU-=this.computeBytes(n,r),this.textureManager.releaseTexture(e,n,s,i)));let l=this.texData.get(t);l.texture=null,l.texShape=null,l.isPacked=!1,l.slice=null}getTexture(t){return this.uploadToGPU(t),this.texData.get(t).texture.texture}getDataInfo(t){return this.texData.get(t)}shouldExecuteOnCPU(t,e=Z4){return D().getBool("WEBGL_CPU_FORWARD")&&t.every(r=>this.texData.get(r.dataId).texture==null&&C.sizeFromShape(r.shape)<e)}getGPGPUContext(){return this.gpgpu}where(t){y.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");let e=t.dataSync();return X4(t.shape,e)}packedUnaryOp(t,e,r){let n=new Ge(t.shape,e),s=this.compileAndRun(n,[t],r);return Be().makeTensorFromTensorInfo(s)}abs(t){if(this.shouldExecuteOnCPU([t])&&t.dtype!=="complex64"){let n=Hp(this.texData.get(t.dataId).values);return this.makeOutput(t.shape,t.dtype,n)}if(D().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,Kx,t.dtype);let e=new we(t.shape,Kx),r=this.compileAndRun(e,[t]);return Be().makeTensorFromTensorInfo(r)}makeTensorInfo(t,e,r){let n;if(e==="string"&&r!=null&&r.length>0&&C.isString(r[0])){let s=r.map(i=>C.encodeString(i));n=this.write(s,t,e)}else n=this.write(r,t,e);return this.texData.get(n).usage=null,{dataId:n,shape:t,dtype:e}}makeOutput(t,e,r){return Be().makeTensorFromTensorInfo(this.makeTensorInfo(t,e,r),this)}unpackTensor(t){let e=new jp(t.shape);return this.runWebGLProgram(e,[t],t.dtype)}packTensor(t){let e=new qp(t.shape);return this.runWebGLProgram(e,[t],t.dtype,null,!0)}packedReshape(t,e){let r=[Ni(t.shape),...Ei(t.shape)],n={dtype:t.dtype,shape:r,dataId:t.dataId},s=[Ni(e),...Ei(e)],i=new Qu(s,r),a=!0,u=[r],c=this.runWebGLProgram(i,[n],t.dtype,u,a);return{dataId:c.dataId,shape:e,dtype:c.dtype}}decode(t,e){let r=this.texData.get(t),{isPacked:n,shape:s,dtype:i}=r;if(e!=null){let m=C.sizeFromShape(s),d=e[0]*e[1]*4;C.assert(m<=d,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}let a=rl(s),u;n?u=new zp(a):u=new Bp(a);let c=!0,l=[e??Jc(a)],p=this.runWebGLProgram(u,[{shape:a,dtype:i,dataId:t}],i,l,c,e);return{dtype:i,shape:s,dataId:p.dataId}}runWebGLProgram(t,e,r,n,s=!1,i){let a=this.makeTensorInfo(t.outputShape,r),u=this.texData.get(a.dataId);if(t.packedOutput&&(u.isPacked=!0),t.outPackingScheme===Ti.DENSE){let x=i??Jc(t.outputShape);u.texShape=x.map(b=>b*2)}if(t.outTexUsage!=null&&(u.usage=t.outTexUsage),C.sizeFromShape(a.shape)===0)return u.values=C.getTypedArrayFromDType(a.dtype,0),a;let c=[],l=e.map(x=>{if(x.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let b=this.texData.get(x.dataId);if(b.texture==null){if(!t.packedInputs&&C.sizeFromShape(x.shape)<=D().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:x.shape,texData:null,isUniform:!0,uniformValues:b.values};t.packedInputs&&(b.isPacked=!0,b.shape=x.shape)}if(this.uploadToGPU(x.dataId),!!b.isPacked!=!!t.packedInputs)x=b.isPacked?this.unpackTensor(x):this.packTensor(x),c.push(x),b=this.texData.get(x.dataId);else if(b.isPacked&&!Aa(b.shape,x.shape)){let w=x,v=x.shape;x.shape=b.shape,x=this.packedReshape(x,v),c.push(x),b=this.texData.get(x.dataId),w.shape=v}return{shape:x.shape,texData:b,isUniform:!1}});this.uploadToGPU(a.dataId);let p={shape:a.shape,texData:u,isUniform:!1},m=_I(t,l,p),d=this.getAndSaveBinary(m,()=>FI(this.gpgpu,t,l,p)),f=this.activeTimers!=null,h;f&&(h=this.startTimer()),D().get("ENGINE_COMPILE_ONLY")||PI(this.gpgpu,d,l,p,n),c.forEach(x=>this.disposeIntermediateTensorInfo(x)),f&&(h=this.endTimer(h),this.activeTimers.push({name:t.constructor.name,query:this.getQueryTime(h)}));let g=D().getNumber("WEBGL_FLUSH_THRESHOLD");if(g>0){let x=C.now();x-this.lastGlFlushTime>g&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=x)}if(!D().getBool("WEBGL_LAZILY_UNPACK")&&u.isPacked&&s===!1){let x=this.unpackTensor(a);return this.disposeIntermediateTensorInfo(a),x}return a}compileAndRun(t,e,r,n,s=!1){return r=r||e[0].dtype,this.runWebGLProgram(t,e,r,n,s)}getAndSaveBinary(t,e){return t in this.binaryCache||(this.binaryCache[t]=e()),this.binaryCache[t]}getTextureManager(){return this.textureManager}dispose(){this.disposed||(D().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return this.floatPrecisionValue==null&&(this.floatPrecisionValue=Bt(()=>{if(!D().get("WEBGL_RENDER_FLOAT32_ENABLED")){let t=D().getBool("DEBUG");D().set("DEBUG",!1);let e=this.abs(wt(1e-8)).dataSync()[0];if(D().set("DEBUG",t),e>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?j4:Y4}uploadToGPU(t){let e=this.texData.get(t),{shape:r,dtype:n,values:s,texture:i,usage:a,isPacked:u}=e;if(i!=null)return;let c=this.activeTimers!=null,l;c&&(l=C.now());let p=e.texShape;if(p==null&&(p=yI(r,u),e.texShape=p),s!=null){let m=rl(r),d,f=p[1],h=p[0],g=s instanceof Uint8Array||s instanceof Uint8ClampedArray;(u||!g)&&([f,h]=sr(p[0],p[1])),u?d=new Up(m,g):d=new nl(m,g);let x=g?[h,f]:p,b=this.makeTensorInfo(x,n),w=this.texData.get(b.dataId);g?w.usage=Re.PIXELS:w.usage=Re.UPLOAD,w.texShape=x,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),f,h,s);let v=[[h,f]],N=this.runWebGLProgram(d,[b],n,v,!0),E=this.texData.get(N.dataId);e.texShape=E.texShape,e.isPacked=E.isPacked,e.usage=E.usage,D().get("ENGINE_COMPILE_ONLY")?this.disposeData(N.dataId):(e.texture=E.texture,e.values=null,this.texData.delete(N.dataId)),this.disposeIntermediateTensorInfo(b),c&&(this.uploadWaitMs+=C.now()-l)}else{let m=this.acquireTexture(p,a,n,u);e.texture=m}}convertAndCacheOnCPU(t,e){let r=this.texData.get(t),{dtype:n}=r;return e!=null&&(r.values=eG(e,n)),r.values}acquireTexture(t,e,r,n){if(this.numBytesInGPU+=this.computeBytes(t,r),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){let s=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${s} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(t,e,n)}computeBytes(t,e){return t[0]*t[1]*C.bytesPerElement(e)}checkCompileCompletion(){for(let[,t]of Object.entries(this.binaryCache))this.checkCompletion_(t)}async checkCompileCompletionAsync(){let t=[];if(this.gpgpu.parallelCompilationExtension){for(let[,e]of Object.entries(this.binaryCache))t.push(this.checkCompletionAsync_(e));return Promise.all(t)}else{for(let[,e]of Object.entries(this.binaryCache)){let r=new Promise(n=>{try{this.checkCompletion_(e),n(!0)}catch(s){throw s}});t.push(r)}return Promise.all(t)}}async checkCompletionAsync_(t){return this.gpgpu.gl.getProgramParameter(t.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(t):(await zg(),this.checkCompletionAsync_(t))}checkCompletion_(t){if(this.gpgpu.gl.getProgramParameter(t.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(t.webGLProgram)),this.gpgpu.gl.getShaderParameter(t.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(_x(t.source,this.gpgpu.gl.getShaderInfoLog(t.fragmentShader)),new Error("Failed to compile fragment shader.")):new Error("Failed to link vertex and fragment shaders.");return!0}getUniformLocations(){for(let t of Object.values(this.binaryCache)){this.gpgpu.buildVao(t.webGLProgram);let{variablesLocations:e,customUniformLocations:r,infLoc:n,nanLoc:s,outShapeLocation:i,outShapeStridesLocation:a,outTexShapeLocation:u}=Bx(this.gpgpu,t.program,t.webGLProgram);t.variablesLocations=e,t.customUniformLocations=r,t.infLoc=n,t.nanLoc=s,t.outShapeLocation=i,t.outShapeStridesLocation=a,t.outTexShapeLocation=u}}createTensorFromGPUData(t,e,r){t.channels=t.channels||"RGBA";let{texture:n,height:s,width:i,channels:a}=t,u=Be().backend;if(!u.gpgpu.gl.isTexture(n))throw new Error("The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.");let c=u.writeTexture(n,e,r,s,i,a);return Be().makeTensorFromDataId(c,e,r,u)}};il.nextDataId=0;function eG(o,t){if(t==="float32"||t==="complex64")return o;if(t==="int32"||t==="bool"){let e=t==="int32"?new Int32Array(o.length):new Uint8Array(o.length);for(let r=0;r<e.length;++r)e[r]=Math.round(o[r]);return e}else throw new Error(`Unknown dtype ${t}`)}Ci.isBrowser()&&vu("webgl",()=>new il,2);var Zu=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;var He=class{constructor(t,e,r){this.variableNames=["A","B"],this.outputShape=y.assertAndGetBroadcastShape(e,r),this.enableShapeUniforms=Mt(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${t}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}};var to=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;var Je=class{constructor(t,e,r,n=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=y.assertAndGetBroadcastShape(e,r);let s=this.outputShape.length;this.enableShapeUniforms=Mt(s);let i="";if(n)if(s===0||C.sizeFromShape(this.outputShape)===1)i=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(i=`
          ${xt(s)} coords = getOutputCoords();
        `,s===1)this.enableShapeUniforms?i+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:i+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let u=ne("coords",s);this.enableShapeUniforms?i+=`
            bool nextRowOutOfBounds =
              (${u[s-2]} + 1) >= outShape[${s} - 2];
            bool nextColOutOfBounds =
              (${u[s-1]} + 1) >= outShape[${s} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:i+=`
            bool nextRowOutOfBounds =
              (${u[s-2]} + 1) >= ${this.outputShape[s-2]};
            bool nextColOutOfBounds =
              (${u[s-1]} + 1) >= ${this.outputShape[s-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${t}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${i}

        setOutput(result);
      }
    `}};function se(o){let{inputs:t,backend:e}=o,{x:r}=t;return e.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}var n1={kernelName:Ko,backendName:"webgl",kernelFunc:se};function Ke(o){let{inputs:t,backend:e}=o,{real:r,imag:n}=t,s=e.makeTensorInfo(r.shape,"complex64"),i=e.texData.get(s.dataId),a=se({inputs:{x:r},backend:e}),u=se({inputs:{x:n},backend:e});return i.complexTensorInfos={real:a,imag:u},s}var s1={kernelName:Kn,backendName:"webgl",kernelFunc:Ke};var qx="return (a < 0.) ? b * a : a;",Xx=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function oG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{alpha:s}=r,i=e.makeTensorInfo([],"float32",C.createScalarValue(s,"float32")),a=D().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Je(Xx,n.shape,i.shape):new He(qx,n.shape,i.shape),u=e.runWebGLProgram(a,[n,i],"float32");return e.disposeIntermediateTensorInfo(i),u}var i1={kernelName:vs,backendName:"webgl",kernelFunc:oG};var jx="return (a < 0.) ? b * a : a;",Yx=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function rG(o){let{inputs:t,backend:e}=o,{x:r,alpha:n}=t,s=D().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Je(Yx,r.shape,n.shape):new He(jx,r.shape,n.shape);return e.runWebGLProgram(s,[r,n],"float32")}var a1={kernelName:zs,backendName:"webgl",kernelFunc:rG};var ko="if (isnan(x)) return x;";function ct({opSnippet:o,packedOpSnippet:t,cpuKernelImpl:e,dtype:r}){return({inputs:n,backend:s})=>{let{x:i}=n,a=s,u=r||i.dtype;if(a.shouldExecuteOnCPU([i])&&e!=null){let p=a.texData.get(i.dataId),m=e(p.values,u);return a.makeTensorInfo(i.shape,u,m)}let c=D().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&t!=null,l;return c?l=new Ge(i.shape,t):l=new we(i.shape,o),a.runWebGLProgram(l,[i],u)}}function Pt({opSnippet:o,packedOpSnippet:t,checkOutOfBounds:e=!1,supportsComplex:r=!1,cpuKernelImpl:n,dtype:s}){return({inputs:i,backend:a})=>{let{a:u,b:c}=i,l=a;if(r&&u.dtype==="complex64"){let f=l.texData.get(u.dataId),h=l.texData.get(c.dataId),[g,x]=[[f.complexTensorInfos.real,h.complexTensorInfos.real],[f.complexTensorInfos.imag,h.complexTensorInfos.imag]].map(w=>{let[v,k]=w,N={dataId:v.dataId,dtype:v.dtype,shape:u.shape},E={dataId:k.dataId,dtype:k.dtype,shape:c.shape},R=new He(o,u.shape,c.shape);return l.runWebGLProgram(R,[N,E],Lt(v.dtype,k.dtype))}),b=Ke({inputs:{real:g,imag:x},backend:l});return l.disposeIntermediateTensorInfo(g),l.disposeIntermediateTensorInfo(x),b}let p=s||Lt(u.dtype,c.dtype);if((u.dtype==="string"||c.dtype==="string"||l.shouldExecuteOnCPU([u,c]))&&n!=null){let f=l.texData.get(u.dataId).values,h=l.texData.get(c.dataId).values,g=u.dtype==="string"?y.fromUint8ToStringArray(f):f,x=u.dtype==="string"?y.fromUint8ToStringArray(h):h,[b,w]=n(u.shape,c.shape,g,x,p),v=l.makeTensorInfo(w,p),k=l.texData.get(v.dataId);return k.values=b,v}let m=D().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&t!=null,d;return m?d=new Je(t,u.shape,c.shape,e):d=new He(o,u.shape,c.shape),l.runWebGLProgram(d,[u,c],p)}}function vn(o,t=!1){if(o==="linear")return t?J2:q2;if(o==="relu")return t?e1:j2;if(o==="elu")return t?t1:X2;if(o==="relu6")return t?o1:Y2;if(o==="prelu")return t?Yx:jx;if(o==="leakyrelu")return t?Xx:qx;if(o==="sigmoid")return t?r1:Q2;throw new Error(`Activation ${o} has not been implemented for the WebGL backend.`)}var Ju=class{constructor(t,e,r,n=!1,s=!1,i=!1,a=null,u=!1,c=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.enableShapeUniforms=Mt(this.outputShape.length);let l=n?t[1]:t[2],p=Math.ceil(l/2),m=n?"i * 2, rc.y":"rc.y, i * 2",d=s?"rc.z, i * 2":"i * 2, rc.z",f=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],h=s?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],g="",x="";a&&(u?g=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${a}
        }`:c?g=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${a}
        }`:g=`vec4 activation(vec4 x) {
          ${a}
        }`,x="result = activation(result);");let b=i?"result += getBiasAtOutCoords();":"";i&&this.variableNames.push("bias"),u&&this.variableNames.push("preluActivationWeights"),c&&this.variableNames.push("leakyreluAlpha");let w="rc.x",v="rc.x";t[0]<e[0]?w=`imod(rc.x, ${t[0]})`:e[0]<t[0]&&(v=`imod(rc.x, ${e[0]})`),this.userCode=`
      ${g}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${p}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${w};
        int batchB = ${v};
        for (int i = 0; i < ${p}; i++) {
          vec4 a = getMatrixA(batchA, ${m});
          vec4 b = getMatrixB(batchB, ${d});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${f[0]} * ${h[0]});
          result += (${f[1]} * ${h[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${b}

        ${x}

        setOutput(result);
      }
    `}};var Qx={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"},al=class{constructor(t,e,r){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=y.assertAndGetBroadcastShape(e,r),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${t}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}};var u1="return a * b;";function ul(o){let{inputs:t,backend:e}=o,{a:r,b:n}=t,s=y.upcastType(r.dtype,n.dtype);if(r.dtype==="complex64"){let a=e.texData.get(r.dataId),u=e.texData.get(n.dataId),c=new al(Qx.REAL,r.shape,n.shape),l=new al(Qx.IMAG,r.shape,n.shape),p=[{dataId:a.complexTensorInfos.real.dataId,dtype:a.complexTensorInfos.real.dtype,shape:r.shape},{dataId:a.complexTensorInfos.imag.dataId,dtype:a.complexTensorInfos.imag.dtype,shape:r.shape},{dataId:u.complexTensorInfos.real.dataId,dtype:u.complexTensorInfos.real.dtype,shape:n.shape},{dataId:u.complexTensorInfos.imag.dataId,dtype:u.complexTensorInfos.imag.dtype,shape:n.shape}],m=e.runWebGLProgram(c,p,"float32"),d=e.runWebGLProgram(l,p,"float32"),f=Ke({inputs:{real:m,imag:d},backend:e});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),f}if(e.shouldExecuteOnCPU([r,n])){let a=e.texData.get(r.dataId),u=e.texData.get(n.dataId),[c,l]=b2(r.shape,n.shape,a.values,u.values,s),p=e.makeTensorInfo(l,s),m=e.texData.get(p.dataId);return m.values=c,p}let i;return D().getBool("WEBGL_PACK_BINARY_OPERATIONS")?i=new Je(u1,r.shape,n.shape):i=new He(u1,r.shape,n.shape),e.runWebGLProgram(i,[r,n],s)}var c1={kernelName:Wr,backendName:"webgl",kernelFunc:ul};function l1(o,t,e){let r=[Ni(o.shape),...Ei(o.shape)],n={dtype:o.dtype,shape:r,dataId:o.dataId},s=[Ni(t),...Ei(t)],i=new Qu(s,r),a=!0,u=[r],c=e.runWebGLProgram(i,[n],o.dtype,u,a);return{dataId:c.dataId,shape:t,dtype:c.dtype}}function j(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{shape:s}=r,i=e,a=C.sizeFromShape(n.shape),u=C.inferFromImplicitShape(s,a),c=C.sizeFromShape(u);C.assert(a===c,()=>`The new shape (${u}) has ${c} elements and the old shape (${n.shape}) has ${a} elements. The new shape and old shape must have the same number of elements.`);let l=i.texData.get(n.dataId);return l.isPacked&&!Aa(n.shape,u)&&!(l.texture!==null&&Aa(l.shape,u))?l1(n,u,i):(i.incRef(n.dataId),{dataId:n.dataId,shape:u,dtype:n.dtype})}var p1={kernelName:Gs,backendName:"webgl",kernelFunc:j};var cl=class{constructor(t,e){this.variableNames=["x"];let{windowSize:r,batchSize:n,inSize:s,outSize:i}=t;this.outputShape=[n,i];let a=Math.floor(r/4)*4,u=r%4,c="sumValue += dot(values, ones);";if(e!=null){let p=1/e;c=`sumValue += dot(values * ${C.isInt(p)?p.toPrecision(2):p}, ones);`}let l="";s%r>0&&(l=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${l}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        float sumValue = 0.0;

        for (int i = 0; i < ${a}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${c}
        }

        int inIdx = inOffset + ${a};
        if (${u===1}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${c}
        } else if (${u===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${c}
        } else if (${u===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${c}
        }
        setOutput(sumValue);
      }
    `}};var Qp=class{constructor(t,e){this.variableNames=["x"];let{windowSize:r,batchSize:n,inSize:s,outSize:i}=t;this.outputShape=[n,i];let a="0.0",u="";e==="prod"?a="1.0":e==="min"?(a="1.0 / 1e-20",u="min"):e==="max"&&(a="-1.0 / 1e-20",u="max");let c=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="sum"?c="sumValue":e==="prod"?c="prodValue":e==="all"?c="allValue":e==="any"&&(c="anyValue");let l=Math.floor(r/4)*4,p=r%4,m=`
      if (${e==="sum"}) {
        sumValue += dot(values, ones);
      } else if (${e==="prod"}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${u}(values, minMaxValue);
        if (${e==="min"} || ${e==="max"}) {
          minMaxValue = ${u}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,d="vec4";e==="all"?(a="1.0",m=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,d="bvec4"):e==="any"&&(a="0.0",m=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,d="bvec4");let f="";s%r>0&&(f=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${a};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${f}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        vec4 minMaxValue = vec4(${a});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${l}; i += 4) {
          int inIdx = inOffset + i;
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${m}
        }

        int inIdx = inOffset + ${l};
        if (${p===1}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${m}
        } else if (${p===2}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${m}
        } else if (${p===3}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${m}
        }
        setOutput(${c});
      }
    `}};function sG(o){let t=[];for(;t.length===0||t[t.length-1].outSize!==1;){let e=t.length?t[t.length-1].outSize:o[1],r=y.computeOptimalWindowSize(e);t.push({inSize:e,windowSize:r,outSize:Math.ceil(e/r)})}return t}function eo(o,t,e,r){let n=sG(o.shape),s=o;for(let i=0;i<n.length;i++){let{inSize:a,windowSize:u,outSize:c}=n[i],l,p;e==="mean"?l=i===0?new cl({windowSize:u,inSize:a,batchSize:o.shape[0],outSize:c},a):new cl({windowSize:u,inSize:a,batchSize:o.shape[0],outSize:c}):l=new Qp({windowSize:u,inSize:a,batchSize:o.shape[0],outSize:c},e),p=s,s=r.runWebGLProgram(l,[s],t),p.dataId!==o.dataId&&r.disposeIntermediateTensorInfo(p)}return s}var Zp=class{constructor(t,e){this.variableNames=["A"];let r=new Array(t.length);for(let i=0;i<r.length;i++)r[i]=t[e[i]];this.outputShape=r,this.rank=r.length;let n=xt(this.rank),s=iG(e);this.userCode=`
    void main() {
      ${n} resRC = getOutputCoords();
      setOutput(getA(${s}));
    }
    `}};function iG(o){let t=o.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],r=new Array(t);for(let n=0;n<o.length;n++)r[o[n]]=e[n];return r.join()}var Jp=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let r=new Array(t.length);for(let l=0;l<r.length;l++)r[l]=t[e[l]];if(this.outputShape=r,this.rank=r.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let n=xt(this.rank),s=Hx("rc",this.rank),i=new Array(this.rank);for(let l=0;l<e.length;l++)i[e[l]]=s[l];let a=`vec2(${i.slice(-2).join()})`,u=`++${s[this.rank-1]} < ${r[this.rank-1]}`,c=`getChannel(getA(${i.join()}), ${a})`;this.userCode=`
    void main() {
      ${n} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${c};
      if(${u}) {
        result[1] = ${c};
      }
      --${s[this.rank-1]};
      if(++${s[this.rank-2]} < ${r[this.rank-2]}) {
        result[2] = ${c};
        if(${u}) {
          result[3] = ${c};
        }
      }
      setOutput(result);
    }
    `}};function Ri(o,t,e){let r=D().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Jp(o.shape,t):new Zp(o.shape,t);return e.runWebGLProgram(r,[o],o.dtype)}function m1(o,t,e,r){let n=t,s=o.shape.length,i=C.parseAxisParam(n,o.shape),a=i,u=y.getAxesPermutation(a,s),c=u!=null,l=o;c&&(l=Ri(o,u,r),a=y.getInnerMostAxes(a.length,s)),y.assertAxesAreInnerMostDims("sum",a,s);let[p,m]=y.computeOutAndReduceShapes(l.shape,a),d=p;e&&(d=y.expandShapeToKeepDim(p,i));let f=C.sizeFromShape(m),g=C.sizeFromShape(o.shape)/f,x=j({inputs:{x:l},attrs:{shape:[g,f]},backend:r}),b=cn(o.dtype),w=eo(x,b,"sum",r),v=j({inputs:{x:w},attrs:{shape:d},backend:r});return r.disposeIntermediateTensorInfo(x),r.disposeIntermediateTensorInfo(w),c&&r.disposeIntermediateTensorInfo(l),v}function Oa(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;return m1(n,s,i,e)}var d1={kernelName:"Sum",backendName:"webgl",kernelFunc:Oa};function Ht(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{perm:s}=r,i=e,a=n.shape.length,u=new Array(a);for(let l=0;l<u.length;l++)u[l]=n.shape[s[l]];let c;if(i.shouldExecuteOnCPU([n])){let p=i.texData.get(n.dataId).values,m=_a(p,n.shape,n.dtype,s,u);c=i.makeTensorInfo(u,n.dtype);let d=i.texData.get(c.dataId);d.values=m}else c=Ri(n,s,i);return c}var f1={kernelName:Xo,backendName:"webgl",kernelFunc:Ht};var Zx=1e3;function Ma({a:o,b:t,transposeA:e,transposeB:r,backend:n,bias:s=null,preluActivationWeights:i=null,leakyreluAlpha:a=0,activation:u=null}){let c=o.shape.length,l=t.shape.length,p=e?o.shape[c-2]:o.shape[c-1],m=r?t.shape[l-1]:t.shape[l-2],d=e?o.shape[c-1]:o.shape[c-2],f=r?t.shape[l-2]:t.shape[l-1],h=o.shape.slice(0,-2),g=t.shape.slice(0,-2),x=C.sizeFromShape(h),b=C.sizeFromShape(g),v=xo.assertAndGetBroadcastShape(o.shape.slice(0,-2),t.shape.slice(0,-2)).concat([d,f]);C.assert(p===m,()=>`Error in matMul: inner shapes (${p}) and (${m}) of Tensors with shapes ${o.shape} and ${t.shape} and transposeA=${e} and transposeB=${r} must match.`);let k=e?[x,p,d]:[x,d,p],N=r?[b,f,m]:[b,m,f],E=j({inputs:{x:o},backend:n,attrs:{shape:k}}),R=j({inputs:{x:t},backend:n,attrs:{shape:N}}),A=[E,R],F=Math.max(x,b),P=e?E.shape[1]:E.shape[2],_=s!=null,O=i!=null,M=u==="leakyrelu",L=u!=null?vn(u,!0):null,W=_||O||M||L!=null,X;if((d===1||f===1)&&P>Zx&&W===!1){let q=E,Y=R;e&&(q=Ht({inputs:{x:E},backend:n,attrs:{perm:[0,2,1]}}),A.push(q)),r&&(Y=Ht({inputs:{x:R},backend:n,attrs:{perm:[0,2,1]}}),A.push(Y));let Z=f!==1,et=f===1,J=q;Z&&(J=j({inputs:{x:q},backend:n,attrs:{shape:[F,P,1]}}),A.push(J));let st=f===1?2:1,ot=Y;et&&(ot=j({inputs:{x:Y},backend:n,attrs:{shape:[F,1,P]}}),A.push(ot));let ut=ul({inputs:{a:J,b:ot},backend:n});X=Oa({inputs:{x:ut},backend:n,attrs:{axis:st,keepDims:!0}}),A.push(ut)}else{let q=Lt(o.dtype,t.dtype),Y=new Ju(k,N,[F,d,f],e,r,_,L,O,M),Z=[E,R];if(s!=null&&Z.push(s),O&&Z.push(i),M){let et=n.makeTensorInfo([],"float32",C.createScalarValue(a,"float32"));Z.push(et),A.push(et)}X=n.runWebGLProgram(Y,Z,q)}let U=j({inputs:{x:X},backend:n,attrs:{shape:v}});A.push(X);for(let q of A)n.disposeIntermediateTensorInfo(q);return U}function aG(o){let{inputs:t,backend:e,attrs:r}=o,{a:n,b:s,bias:i,preluActivationWeights:a}=t,{transposeA:u,transposeB:c,activation:l,leakyreluAlpha:p}=r;return Ma({a:n,b:s,transposeA:u,transposeB:c,backend:e,bias:i,preluActivationWeights:a,leakyreluAlpha:p,activation:l})}var h1={kernelName:nn,backendName:"webgl",kernelFunc:aG};var g1="return abs(x);";function uG(o){let{inputs:t,backend:e}=o,{x:r}=t;if(e.shouldExecuteOnCPU([r])&&r.dtype!=="complex64"){let s=e.texData.get(r.dataId),i=Hp(s.values);return e.makeTensorInfo(r.shape,r.dtype,i)}let n;return D().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new Ge(r.shape,g1):n=new we(r.shape,g1),e.runWebGLProgram(n,[r],r.dtype)}var x1={kernelName:"Abs",backendName:"webgl",kernelFunc:uG};var cG=fe+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,lG=ct({opSnippet:cG}),C1={kernelName:fr,backendName:"webgl",kernelFunc:lG};var pG=fe+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,mG=ct({opSnippet:pG}),b1={kernelName:hr,backendName:"webgl",kernelFunc:mG};var y1="return a + b;",dG=Pt({opSnippet:y1,packedOpSnippet:y1,supportsComplex:!0,cpuKernelImpl:ZI}),w1={kernelName:"Add",backendName:"webgl",kernelFunc:dG};var tm=class{constructor(t,e){this.outputShape=[],this.outputShape=t,this.variableNames=e.map((s,i)=>`T${i}`);let r=[];this.variableNames.forEach(s=>{r.push(`float v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${r.join(`
        `)}

        float result = ${n};
        setOutput(result);
      }
    `}};var em=class{constructor(t,e){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.variableNames=e.map((s,i)=>`T${i}`);let r=[];this.variableNames.forEach(s=>{r.push(`vec4 v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${r.join(`
        `)}

        vec4 result = ${n};
        setOutput(result);
      }
    `}};function om(o){let{inputs:t,backend:e}=o,r=t;if(r.length===1)return se({inputs:{x:r[0]},backend:e});if(r.length>D().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){let u=Math.floor(r.length/2),c=om({inputs:r.slice(0,u),backend:e}),l=om({inputs:r.slice(u),backend:e});return om({inputs:[c,l],backend:e})}let n=r.map(u=>u.dtype).reduce((u,c)=>Lt(u,c)),s=r.map(u=>u.shape),a=D().getBool("WEBGL_PACK")?new em(r[0].shape,s):new tm(r[0].shape,s);return e.runWebGLProgram(a,r,n)}var S1={kernelName:Mn,backendName:"webgl",kernelFunc:om};function fG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r,a=n.shape.length,u=C.parseAxisParam(s,n.shape),c=u,l=y.getAxesPermutation(c,a),p=n;l!=null&&(p=Ht({inputs:{x:n},backend:e,attrs:{perm:l}}),c=y.getInnerMostAxes(c.length,a)),y.assertAxesAreInnerMostDims("all",c,a);let[m,d]=y.computeOutAndReduceShapes(p.shape,c),f=C.sizeFromShape(d),h=j({inputs:{x:p},backend:e,attrs:{shape:[-1,f]}}),g=eo(h,h.dtype,"all",e),x;if(i){let b=y.expandShapeToKeepDim(m,u);x=j({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=j({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),l!=null&&e.disposeIntermediateTensorInfo(p),x}var v1={kernelName:"All",backendName:"webgl",kernelFunc:fG};function hG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r,a=n.shape.length,u=C.parseAxisParam(s,n.shape),c=u,l=y.getAxesPermutation(c,a),p=n;l!=null&&(p=Ht({inputs:{x:n},backend:e,attrs:{perm:l}}),c=y.getInnerMostAxes(c.length,a)),y.assertAxesAreInnerMostDims("any",c,a);let[m,d]=y.computeOutAndReduceShapes(p.shape,c),f=C.sizeFromShape(d),h=j({inputs:{x:p},backend:e,attrs:{shape:[-1,f]}}),g=eo(h,h.dtype,"any",e),x;if(i){let b=y.expandShapeToKeepDim(m,u);x=j({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=j({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),l!=null&&e.disposeIntermediateTensorInfo(p),x}var I1={kernelName:"Any",backendName:"webgl",kernelFunc:hG};var rm=class{constructor(t,e,r){this.variableNames=["A"];let{windowSize:n,batchSize:s,outSize:i}=t;r||this.variableNames.push("bestIndicesA"),this.outputShape=[s,i];let a=e==="max"?">":"<",u=r?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${n}; i++) {
          int inIdx = ${u};
          float candidate = getA(batch, inIdx);
          if (candidate ${a} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}};var nm=class{constructor(t,e,r,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,C.assert(t.length>2,()=>`Packed arg${r.charAt(0).toUpperCase()+r.slice(1)} supports only inputs with rank above 2.`);let s=t[t.length-1],i=Math.ceil(s/e);this.outputShape=t.slice(0,-1),i>1&&this.outputShape.push(i),n||this.variableNames.push("bestIndicesA");let a=this.outputShape,u=a.length,c=xt(u),l=ne("coords",u),p,m;if(i===1){m=u+1;let R=xt(m);p=`
        ${R} sourceLocR = ${R}(${l.join()}, 0);
        ++${l[u-1]};
        ${R} sourceLocG = ${R}(${l.join()}, 0);
        ++${l[u-2]};
        ${R} sourceLocA = ${R}(${l.join()}, 0);
        --${l[u-1]};
        ${R} sourceLocB = ${R}(${l.join()}, 0);
        --${l[u-2]};`}else m=u,p=`
        ${c} sourceLocR = coords;
        ++${l[u-1]};
        ${c} sourceLocG = coords;
        ++${l[u-2]};
        ${c} sourceLocA = coords;
        --${l[u-1]};
        ${c} sourceLocB = coords;
        --${l[u-2]};`;let d=["x","y","z","w","u","v"].slice(0,m),f="."+d[m-1],h=d.map(R=>"int "+R),g=ne("sourceLocR",m-1).concat("inIdx.r"),x=ne("sourceLocG",m-1).concat("inIdx.g"),b=ne("sourceLocB",m-1).concat("inIdx.b"),w=ne("sourceLocA",m-1).concat("inIdx.a"),v=r==="max"?"greaterThan":"lessThan",k=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${b.join()}),
                             getBestIndicesAChannel(${w.join()})));`,N=`vec4(
            getAChannel(${g.join()}),
            hasNextCol ? getAChannel(${x.join()}) : 0.,
            hasNextRow ? getAChannel(${b.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${w.join()}) : 0.)`,E=n?"":`
      float getBestIndicesAChannel(${h.join()}) {
        return getChannel(getBestIndicesA(${d.join()}),
                                          vec2(${d.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${h.join()}) {
        return getChannel(getA(${d.join()}),
                               vec2(${d.slice(-2).join()}));
      }
      ${E}
      void main() {
        ${c} coords = getOutputCoords();
        bool hasNextCol = ${l[u-1]} < ${a[u-1]-1};
        bool hasNextRow = ${l[u-2]} < ${a[u-2]-1};
        ${p}
        ivec4 srcIdx = ivec4(sourceLocR${f}, sourceLocG${f},
          sourceLocB${f}, sourceLocA${f}) * ${e};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${N};

        for (int i = 0; i < ${e}; i++) {
          inIdx = srcIdx;
          ${k}
          vec4 candidate = ${N};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${v}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}};function k1(o,t,e,r=null){let n=t.shape[0],s=t.shape[1];r!=null&&(n=r.shape[0],s=r.shape[1]);let i=y.computeOptimalWindowSize(s),a={windowSize:i,inSize:s,batchSize:n,outSize:Math.ceil(s/i)},u=new rm(a,e,r==null),c=[t];r!=null&&c.push(r);let l=o.runWebGLProgram(u,c,"int32");if(l.shape[1]===1)return l;let p=k1(o,t,e,l);return o.disposeIntermediateTensorInfo(l),p}function $1(o,t,e,r=null){let n=r!=null?r.shape:t.shape,s=n[n.length-1],i=y.computeOptimalWindowSize(s),a=new nm(n,i,e,r==null),u=r==null?[t]:[t,r],c=o.runWebGLProgram(a,u,"int32");if(c.shape.length===t.shape.length){let l=$1(o,t,e,c);return o.disposeIntermediateTensorInfo(c),l}return c}function sm(o,t,e,r){let n=[e];if(y.assertAxesAreInnerMostDims("arg"+r.charAt(0).toUpperCase()+r.slice(1),n,t.shape.length),!D().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){let s=[],i=o.texData.get(t.dataId),a=i!==null&&i.isPacked,u=t;a&&(u=o.unpackTensor(t),s.push(u));let[c,l]=y.computeOutAndReduceShapes(u.shape,n),p=C.sizeFromShape(l),m=j({inputs:{x:u},backend:o,attrs:{shape:[-1,p]}});s.push(m);let d=k1(o,m,r);s.push(d);let f=j({inputs:{x:d},backend:o,attrs:{shape:c}});return s.forEach(h=>o.disposeIntermediateTensorInfo(h)),f}return $1(o,t,r)}function gG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s}=r,i=C.parseAxisParam(s,n.shape),a=y.getAxesPermutation(i,n.shape.length),u=n,c=[];a!=null&&(u=Ht({inputs:{x:n},backend:e,attrs:{perm:a}}),c.push(u),i=y.getInnerMostAxes(i.length,u.shape.length)),y.assertAxesAreInnerMostDims("argMax",[i[0]],u.shape.length);let l=sm(e,u,i[0],"max");return c.forEach(p=>e.disposeIntermediateTensorInfo(p)),l}var T1={kernelName:Ln,backendName:"webgl",kernelFunc:gG};function xG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s}=r,i=C.parseAxisParam(s,n.shape),a=y.getAxesPermutation(i,n.shape.length),u=n,c=[];a!=null&&(u=Ht({inputs:{x:n},backend:e,attrs:{perm:a}}),c.push(u),i=y.getInnerMostAxes(i.length,u.shape.length)),y.assertAxesAreInnerMostDims("argMin",[i[0]],u.shape.length);let l=sm(e,u,i[0],"min");return c.forEach(p=>e.disposeIntermediateTensorInfo(p)),l}var N1={kernelName:Bn,backendName:"webgl",kernelFunc:xG};var CG=fe+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,bG=ct({opSnippet:CG}),E1={kernelName:gr,backendName:"webgl",kernelFunc:bG};var yG=fe+"return log(x + sqrt(x * x + 1.0));",wG=ct({opSnippet:yG}),R1={kernelName:xr,backendName:"webgl",kernelFunc:wG};var SG=fe+`
  return atan(x);
`,vG=ct({opSnippet:SG}),D1={kernelName:Cr,backendName:"webgl",kernelFunc:vG};var IG=Zu+`
  return atan(a, b);
`,kG=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+to+`
  return result;
`,$G=Pt({opSnippet:IG,packedOpSnippet:kG}),A1={kernelName:yr,backendName:"webgl",kernelFunc:$G};var TG=fe+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,NG=ct({opSnippet:TG}),F1={kernelName:br,backendName:"webgl",kernelFunc:NG};var Lo=class{constructor(t,e,r,n=!1,s=!1){if(this.variableNames=["x"],e==="avg"&&r)throw new Error("Cannot compute positions for average pool.");let i=t.filterWidth,a=t.strideHeight,u=t.strideWidth,c=t.dilationHeight,l=t.dilationWidth,p=t.effectiveFilterHeight,m=t.effectiveFilterWidth,d=t.padInfo.top,f=t.padInfo.left;this.outputShape=t.outShape;let h=e==="avg",g=`((batch  * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + d`,x=`(xR * ${t.inWidth} + xC) * ${t.inChannels} + d`,b="0.0";if(h||(b="-1.0 / 1e-20"),r){this.userCode=`
        const ivec2 strides = ivec2(${a}, ${u});
        const ivec2 pads = ivec2(${d}, ${f});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${p};
              wR += ${c}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${m};
                wC += ${l}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${n?s?g:x:`wR * ${m} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let w="max",v=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="avg"&&(v="avgValue / max(count, 1.0)");let k=Math.floor(i/4)*4,N=i%4,E=`
      if (${h}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${w}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${a}, ${u});
      const ivec2 pads = ivec2(${d}, ${f});
      const float initializationValue = ${b};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${t.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${b});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${p};
            wR += ${c}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${t.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${k}; wC += 4) {
            int xC = xCCorner + wC * ${l};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              getValue(batch, xR, xC + 2 * ${l}, d),
              getValue(batch, xR, xC + 3 * ${l}, d)
            );

            ${E}
          }

          int xC = xCCorner + ${k};
          if (${N===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${E}
          } else if (${N===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              initializationValue,
              initializationValue
            );

            ${E}
          } else if (${N===3}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              getValue(batch, xR, xC + 2 * ${l}, d),
              initializationValue
            );

            ${E}
          }
        }
        setOutput(${v});
      }
    `}},Di=class{constructor(t,e,r,n=!1,s=!1){if(this.variableNames=["x"],e==="avg"&&r)throw new Error("Cannot compute positions for average pool.");let i=t.filterWidth,a=t.strideDepth,u=t.strideHeight,c=t.strideWidth,l=t.dilationDepth,p=t.dilationHeight,m=t.dilationWidth,d=t.effectiveFilterDepth,f=t.effectiveFilterHeight,h=t.effectiveFilterWidth,g=t.padInfo.front,x=t.padInfo.top,b=t.padInfo.left;this.outputShape=t.outShape;let w=e==="avg",v="0.0";if(w||(v="-1.0 / 1e-20"),r){this.userCode=`
        const ivec3 strides =
            ivec3(${a}, ${u}, ${c});
        const ivec3 pads = ivec3(${g}, ${x}, ${b});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${d};
              wD += ${l}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${t.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${f};
                wR += ${p}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${t.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${h};
                  wC += ${m}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${t.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${n?s?`(((batch * ${t.inDepth} + xD) * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + ch`:`((xD * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + ch`:`wD * ${f} * ${h} +
                      wR * ${h} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let k="max",N=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="avg"&&(N="avgValue / max(count, 1.0)");let E=Math.floor(i/4)*4,R=i%4,A=`
      if (${w}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${k}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${a}, ${u}, ${c});
      const ivec3 pads = ivec3(${g}, ${x}, ${b});
      const float initializationValue = ${v};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${t.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${v});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${d};
            wD += ${l}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${t.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${f};
            wR += ${p}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${E}; wC += 4) {
              int xC = xCCorner + wC * ${m};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                getValue(batch, xD, xR, xC + 3 * ${m}, ch)
              );

              ${A}
            }

            int xC = xCCorner + ${E};
            if (${R===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${A}
            } else if (${R===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                initializationValue,
                initializationValue
              );

              ${A}
            } else if (${R===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                initializationValue
              );

              ${A}
            }
          }
        }
        setOutput(${N});
      }
    `}};function EG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t;ir(n,"avgPool");let{filterSize:s,strides:i,pad:a,dimRoundingMode:u}=r,c=1;C.assert(y.eitherStridesOrDilationsAreOne(i,c),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);let l=y.computePool2DInfo(n.shape,s,i,c,a,u);if(l.filterWidth===1&&l.filterHeight===1&&C.arraysEqual(l.inShape,l.outShape))return se({inputs:{x:n},backend:e});let p=new Lo(l,"avg",!1);return e.runWebGLProgram(p,[n],"float32")}var P1={kernelName:zn,backendName:"webgl",kernelFunc:EG};function RG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{filterSize:s,strides:i,pad:a,dimRoundingMode:u,dataFormat:c}=r,l=[1,1,1],p=y.computePool3DInfo(n.shape,s,i,l,a,u,c),m=new Di(p,"avg",!1);return e.runWebGLProgram(m,[n],"float32")}var _1={kernelName:Vn,backendName:"webgl",kernelFunc:RG};var im=class{constructor(t){this.variableNames=["dy"],this.outputShape=t.inShape;let e=t.filterHeight,r=t.filterWidth,n=t.strideHeight,s=t.strideWidth,i=t.dilationHeight,a=t.dilationWidth,u=t.effectiveFilterHeight,c=t.effectiveFilterWidth,l=u-1-t.padInfo.top,p=c-1-t.padInfo.left,m=1/(e*r);this.userCode=`
      const ivec2 pads = ivec2(${l}, ${p});
      const float avgMultiplier = float(${m});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${u};
            wR += ${i}) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${c};
            wC+= ${a}) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}},am=class{constructor(t){this.variableNames=["dy"],this.outputShape=t.inShape;let e=t.filterDepth,r=t.filterHeight,n=t.filterWidth,s=t.strideDepth,i=t.strideHeight,a=t.strideWidth,u=t.dilationDepth,c=t.dilationHeight,l=t.dilationWidth,p=t.effectiveFilterDepth,m=t.effectiveFilterHeight,d=t.effectiveFilterWidth,f=p-1-t.padInfo.front,h=m-1-t.padInfo.top,g=d-1-t.padInfo.left,x=1/(e*r*n);this.userCode=`
      const ivec3 pads = ivec3(${f}, ${h}, ${g});
      const float avgMultiplier = float(${x});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${p};
            wD += ${u}) {
          float dyD = float(dyDCorner + wD) / ${s}.0;

          if (dyD < 0.0 || dyD >= ${t.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${m};
              wR += ${c}) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${d};
                wC += ${l}) {
              float dyC = float(dyCCorner + wC) / ${a}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function DG(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,i=s,{filterSize:a,strides:u,pad:c,dimRoundingMode:l}=r,p=[1,1,1],m=y.computePool3DInfo(i.shape,a,u,p,c,l),d=new am(m);return e.runWebGLProgram(d,[n],i.dtype)}var O1={kernelName:Za,backendName:"webgl",kernelFunc:DG};function AG(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,i=s;ir([n,s],"avgPoolGrad");let{filterSize:a,strides:u,pad:c}=r,l=y.computePool2DInfo(i.shape,a,u,1,c),p=new im(l);return e.runWebGLProgram(p,[n],i.dtype)}var M1={kernelName:Qa,backendName:"webgl",kernelFunc:AG};function FG(o){let{inputs:t,backend:e,attrs:r}=o,{a:n,b:s}=t,{transposeA:i,transposeB:a}=r;return Ma({a:n,b:s,transposeA:i,transposeB:a,backend:e})}var L1={kernelName:Wn,backendName:"webgl",kernelFunc:FG};var um=class{constructor(t,e,r,n,s,i){this.outputShape=[],this.variableNames=["x","mean","variance"],y.assertAndGetBroadcastShape(t,e),y.assertAndGetBroadcastShape(t,r);let a="0.0";n!=null&&(y.assertAndGetBroadcastShape(t,n),this.variableNames.push("offset"),a="getOffsetAtOutCoords()");let u="1.0";s!=null&&(y.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=t,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${a};
        float scale = ${u};
        float inv = scale * inversesqrt(variance + float(${i}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}};var cm=class{constructor(t,e,r,n,s,i){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],y.assertAndGetBroadcastShape(t,e),y.assertAndGetBroadcastShape(t,r);let a="vec4(0.0)";n!=null&&(y.assertAndGetBroadcastShape(t,n),this.variableNames.push("offset"),a="getOffsetAtOutCoords()");let u="vec4(1.0)";s!=null&&(y.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=t,this.userCode=`
      void main() {
        vec4 offset = ${a};
        vec4 scale = ${u};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${i}));

        setOutput((x - mean) * inv + offset);
      }
    `}};var PG=({inputs:o,backend:t,attrs:e})=>{let{x:r,mean:n,variance:s,offset:i,scale:a}=o;C.assert(n.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),C.assert(i==null||n.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),C.assert(a==null||n.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:u}=e;u==null&&(u=.001);let c=[r,n,s],l=null;i!=null&&(l=i.shape,c.push(i));let p=null;a!=null&&(p=a.shape,c.push(a));let m=D().getBool("WEBGL_PACK_NORMALIZATION")?new cm(r.shape,n.shape,s.shape,l,p,u):new um(r.shape,n.shape,s.shape,l,p,u);return t.runWebGLProgram(m,c,c[0].dtype)},B1={kernelName:Cs,backendName:"webgl",kernelFunc:PG};var lm=class{constructor(t){this.variableNames=["source"],this.outputShape=t,this.rank=t.length;let e=xt(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let r=_G(this.rank),n,s=t.map((i,a)=>`sourceLoc.${Jx[a]} = start[${a}] + coords.${Jx[a]};`);n=`
        ${e} sourceLoc;
        ${e} coords = getOutputCoords();
        ${s.join(`
`)}
      `,this.userCode=`
      void main() {
        ${n}
        setOutput(getSource(${r}));
      }
    `}},Jx=["x","y","z","w","u","v"];function _G(o){if(o===1)return"sourceLoc";if(o<=6)return Jx.slice(0,o).map(t=>"sourceLoc."+t).join(",");throw Error(`Slicing for rank ${o} is not yet supported`)}var pm=class{constructor(t){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.rank=t.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let e=xt(this.rank),r=ne("coords",this.rank),n=ne("sourceLoc",this.rank),s=this.rank===1?"sourceLoc":`vec2(${n.slice(-2).join()})`,i=`getChannel(getSource(${n.join()}), ${s})`,a=`
      result.x = ${i};
      if (++${r[this.rank-1]} < ${t[this.rank-1]}) {
        ++${n[this.rank-1]};
        result.y = ${i};
        --${n[this.rank-1]};
      }
    `,u=this.rank===1?"":`
      --${r[this.rank-1]};
      if (++${r[this.rank-2]} < ${t[this.rank-2]}) {
        ++${n[this.rank-2]};
        result.z = ${i};
        if (++${r[this.rank-1]} < ${t[this.rank-1]}) {
          ++${n[this.rank-1]};
          result.w = ${i};
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            ${e}(${t.map((l,p)=>`start[${p}]`).join()});`:t.map((l,p)=>`${n[p]} = ${r[p]} + start[${p}];`).join(`
`);this.userCode=`
      void main() {
        ${e} coords = getOutputCoords();
        ${e} sourceLoc;
        ${c}
        vec4 result = vec4(0.);
        ${a}
        ${u}
        setOutput(result);
      }
    `}};function OG(o,t,e,r){let n=r.texData.get(o.dataId),s=r.makeTensorInfo(e,o.dtype),i=r.texData.get(s.dataId);Object.assign(i,n),i.refCount=1,i.shape=e,i.dtype=o.dtype;let a=ee.computeFlatOffset(t,C.computeStrides(o.shape));n.slice&&(a+=n.slice.flatOffset),i.slice={flatOffset:a,origDataId:n.slice&&n.slice.origDataId||o.dataId};let u=r.dataRefCount.get(i.slice.origDataId)||1;return r.dataRefCount.set(i.slice.origDataId,u+1),s}function Bo(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{begin:s,size:i}=r,[a,u]=ee.parseSliceParams(n,s,i);if(ee.assertParamsValid(n,a,u),C.sizeFromShape(u)===0)return e.makeTensorInfo(u,n.dtype,[]);if(e.shouldExecuteOnCPU([n])||n.dtype==="string"){let p=e.texData.get(n.dataId),m=R2(p.values,a,u,n.shape,n.dtype);return e.makeTensorInfo(u,n.dtype,m)}let{isPacked:c}=e.texData.get(n.dataId),l=ee.isSliceContinous(n.shape,a,u);if(c||!l){let p=D().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new pm(u):new lm(u),m=[a];return e.runWebGLProgram(p,[n],n.dtype,m)}return e.uploadToGPU(n.dataId),OG(n,a,u,e)}var z1={kernelName:Zs,backendName:"webgl",kernelFunc:Bo};var MG=o=>{let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockShape:s,crops:i}=r;C.assert(n.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let a=s.reduce((b,w)=>b*w),u=y.getReshaped(n.shape,s,a),c=y.getPermuted(u.length,s.length),l=y.getReshapedPermuted(n.shape,s,a),p=y.getSliceBeginCoords(i,s.length),m=y.getSliceSize(l,i,s.length),d=[],f=j({inputs:{x:n},backend:e,attrs:{shape:u}}),h=Ht({inputs:{x:f},backend:e,attrs:{perm:c}}),g=j({inputs:{x:h},backend:e,attrs:{shape:l}}),x=Bo({inputs:{x:g},backend:e,attrs:{begin:p,size:m}});return d.push(f),d.push(h),d.push(g),d.forEach(b=>e.disposeIntermediateTensorInfo(b)),x},V1={kernelName:Un,backendName:"webgl",kernelFunc:MG};function LG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,weights:s}=t,{size:i}=r,a=e.readSync(n.dataId),u=e.readSync(s.dataId),c=Gp(a,u,s.dtype,s.shape,i);return e.makeTensorInfo([i],s.dtype,c)}var W1={kernelName:Gn,backendName:"webgl",kernelFunc:LG};var BG=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,zG=`
  return float(int(a.r) & int(b.r));
`;function VG(o){let{inputs:t,backend:e}=o,{a:r,b:n}=t,s=D().getBool("WEBGL_PACK_BINARY_OPERATIONS"),i=D().getNumber("WEBGL_VERSION");if(e.shouldExecuteOnCPU([r,n])||i===1){let u=e.texData.get(r.dataId).values,c=e.texData.get(n.dataId).values,[l,p]=t2(r.shape,n.shape,u,c,r.dtype),m=e.makeTensorInfo(p,r.dtype),d=e.texData.get(m.dataId);return d.values=l,m}let a;return s?a=new Je(BG,r.shape,n.shape,!1):a=new He(zG,r.shape,n.shape),e.runWebGLProgram(a,[r,n],r.dtype)}var U1={kernelName:Vi,backendName:"webgl",kernelFunc:VG};function WG(o){let{inputs:t,backend:e}=o,{s0:r,s1:n}=t,s=e.readSync(r.dataId),i=e.readSync(n.dataId),a=y.assertAndGetBroadcastShape(Array.from(s),Array.from(i));return e.makeTensorInfo([a.length],"int32",Int32Array.from(a))}var G1={kernelName:Hn,backendName:"webgl",kernelFunc:WG};var UG="return float(a != b);",tC=Pt({opSnippet:UG,cpuKernelImpl:w2,dtype:"bool"}),H1={kernelName:Ur,backendName:"webgl",kernelFunc:tC};function In(o){let{inputs:t,backend:e}=o,{input:r}=t,n=e.texData.get(r.dataId);return se({inputs:{x:n.complexTensorInfos.real},backend:e})}var K1={kernelName:Us,backendName:"webgl",kernelFunc:In};var GG="return float(int(x));";function q1(o,t){let e=new we(o.shape,GG),r=t.runWebGLProgram(e,[o],"int32");return{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}function eC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{dtype:s}=r;if(s==="complex64"){if(n.dtype==="complex64")return se({inputs:{x:n},backend:e});let i=uo(n.shape),a=eC({inputs:{x:n},backend:e,attrs:{dtype:"float32"}}),u=Ke({inputs:{real:a,imag:i},backend:e});return i.dispose(),e.disposeIntermediateTensorInfo(a),u}if(n.dtype==="complex64"){let i=In({inputs:{input:n},backend:e}),a=eC({inputs:{x:i},backend:e,attrs:{dtype:s}});return e.disposeIntermediateTensorInfo(i),a}if(!C.hasEncodingLoss(n.dtype,s)){let i=se({inputs:{x:n},backend:e});return{dataId:i.dataId,shape:i.shape,dtype:s}}if(e.shouldExecuteOnCPU([n])){let i=e.texData.get(n.dataId).values,[a,u,c]=e2(i,n.shape,n.dtype,s);return e.makeTensorInfo(a,u,c)}if(s==="int32")return q1(n,e);if(s==="bool"){let i=e.makeTensorInfo([],"bool",C.getTypedArrayFromDType("bool",1)),u=tC({inputs:{a:n,b:i},backend:e});return e.disposeIntermediateTensorInfo(i),u}throw new Error(`Error in Cast: failed to cast ${n.dtype} to ${s}`)}var X1={kernelName:Ho,backendName:"webgl",kernelFunc:eC};var j1="return ceil(x);",HG=ct({opSnippet:j1,packedOpSnippet:j1,cpuKernelImpl:o2}),Y1={kernelName:wr,backendName:"webgl",kernelFunc:HG};var mm=class{constructor(t){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=t,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}};var dm=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=t,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}};function KG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{clipValueMin:s,clipValueMax:i}=r,a;D().getBool("WEBGL_PACK_CLIP")?a=new dm(n.shape):a=new mm(n.shape);let u=[[s],[i]];return e.runWebGLProgram(a,[n],n.dtype,u)}var Q1={kernelName:Sr,backendName:"webgl",kernelFunc:KG};var fm=class{constructor(t){this.variableNames=["real","imag"],this.outputShape=t,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}};function Z1(o,t){return{dataId:t.dataId,dtype:t.dtype,shape:o.shape}}function qG(o){let{inputs:t,backend:e}=o,{x:r}=t,n=e.texData.get(r.dataId),s=new fm(r.shape),i=[Z1(r,n.complexTensorInfos.real),Z1(r,n.complexTensorInfos.imag)];return e.runWebGLProgram(s,i,i[0].dtype)}var J1={kernelName:qn,backendName:"webgl",kernelFunc:qG};var hm=class{constructor(t){this.outputShape=[],this.outputShape=y.computeOutShape(t,1),this.variableNames=t.map((i,a)=>`T${a}`);let e=new Array(t.length-1);e[0]=t[0][1];for(let i=1;i<e.length;i++)e[i]=e[i-1]+t[i][1];let r=[`if (yC < ${e[0]}) setOutput(getT0(yR, yC));`];for(let i=1;i<e.length;i++){let a=e[i-1];r.push(`else if (yC < ${e[i]}) setOutput(getT${i}(yR, yC-${a}));`)}let n=e.length,s=e[e.length-1];r.push(`else setOutput(getT${n}(yR, yC-${s}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${r.join(`
        `)}
      }
    `}};var xm=class{constructor(t,e){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=y.computeOutShape(t,e);let r=this.outputShape,n=r.length,s=xt(n),i=ne("coords",n),a=["x","y","z","w","u","v"].slice(0,n);this.variableNames=t.map((h,g)=>`T${g}`);let u=new Array(t.length-1);u[0]=t[0][e];for(let h=1;h<u.length;h++)u[h]=u[h-1]+t[h][e];let c=a[e],l=a.slice(-2),p=a.join(),m=`if (${c} < ${u[0]}) {
        return getChannel(
            getT0(${p}), vec2(${l.join()}));
        }`;for(let h=1;h<u.length;h++){let g=u[h-1];m+=`
        if (${c} < ${u[h]}  && ${c} >= ${u[h-1]}) {
          return getChannel(
            getT${h}(${gm(a,c,g)}),
            vec2(${gm(l,c,g)}));
        }`}let d=u.length,f=u[u.length-1];m+=`
        return getChannel(
          getT${d}(${gm(a,c,f)}),
          vec2(${gm(l,c,f)}));`,this.userCode=`
      float getValue(${a.map(h=>"int "+h)}) {
        ${m}
      }

      void main() {
        ${s} coords = getOutputCoords();
        vec4 result = vec4(getValue(${i}), 0., 0., 0.);

        ${i[n-1]} = ${i[n-1]} + 1;
        if (${i[n-1]} < ${r[n-1]}) {
          result.g = getValue(${i});
        }

        ${i[n-2]} = ${i[n-2]} + 1;
        if (${i[n-2]} < ${r[n-2]}) {
          result.a = getValue(${i});
        }

        ${i[n-1]} = ${i[n-1]} - 1;
        if (${i[n-2]} < ${r[n-2]} &&
            ${i[n-1]} < ${r[n-1]}) {
          result.b = getValue(${i});
        }
        setOutput(result);
      }
    `}};function gm(o,t,e){let r=o.indexOf(t);return o.map((s,i)=>i===r?`${s} - ${e}`:s).join()}function La(o){let{inputs:t,backend:e}=o,{input:r}=t,n=e.texData.get(r.dataId);return se({inputs:{x:n.complexTensorInfos.imag},backend:e})}var tk={kernelName:Ss,backendName:"webgl",kernelFunc:La};function tc(o,t,e){let r=o[0].dtype;if(r==="complex64"){let d=o.map(b=>In({inputs:{input:b},backend:e})),f=o.map(b=>La({inputs:{input:b},backend:e})),h=tc(d,t,e),g=tc(f,t,e),x=Ke({inputs:{real:h,imag:g},backend:e});return d.forEach(b=>e.disposeIntermediateTensorInfo(b)),f.forEach(b=>e.disposeIntermediateTensorInfo(b)),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),x}let n=e.shouldExecuteOnCPU(o);if(r==="string"&&(n=!0),n){let d=o.map(v=>{let N=[-1,C.sizeFromShape(v.shape.slice(t))];return j({inputs:{x:v},backend:e,attrs:{shape:N}})}),f=d.map(v=>({vals:e.readSync(v.dataId),shape:v.shape})),h=y.computeOutShape(d.map(v=>v.shape),1),g=d[0].shape[0]===1,x=r2(f,h,r,g),b=y.computeOutShape(o.map(v=>v.shape),t),w=e.makeTensorInfo(b,r,x);return d.forEach(v=>e.disposeIntermediateTensorInfo(v)),w}let s=o.filter(d=>C.sizeFromShape(d.shape)>0),i=D().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&s[0].shape.length>1;if(s.length===1){let d=i?new we(o[0].shape,ar):new Ge(o[0].shape,ar);return e.runWebGLProgram(d,o,r)}let a=D().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(s.length>a){let d=[];for(let h=0;h<s.length;h+=a){let g=s.slice(h,h+a);d.push(tc(g,t,e))}let f=tc(d,t,e);for(let h of d)e.disposeIntermediateTensorInfo(h);return f}if(i){let d=new xm(s.map(f=>f.shape),t);return e.runWebGLProgram(d,s,r)}let{tensors2D:u,outShape:c}=XG(s,t,e),l=new hm(u.map(d=>d.shape)),p=e.runWebGLProgram(l,u,r);u.forEach(d=>e.disposeIntermediateTensorInfo(d));let m=j({inputs:{x:p},attrs:{shape:c},backend:e});return e.disposeIntermediateTensorInfo(p),m}function XG(o,t,e){let r=y.computeOutShape(o.map(s=>s.shape),t);return{tensors2D:o.map(s=>j({inputs:{x:s},attrs:{shape:[-1,C.sizeFromShape(s.shape.slice(t))]},backend:e})),outShape:r}}function oC(o){let{inputs:t,backend:e,attrs:r}=o,{axis:n}=r,s=C.parseAxisParam(n,t[0].shape)[0],i=t.map(c=>c.shape);y.assertParamsConsistent(i,s);let a=y.computeOutShape(t.map(c=>c.shape),s);if(C.sizeFromShape(a)===0)return e.makeTensorInfo(a,t[0].dtype,[]);let u=t.filter(c=>C.sizeFromShape(c.shape)>0);return u.length===1?se({inputs:{x:u[0]},backend:e}):tc(u,s,e)}var ek={kernelName:Xn,backendName:"webgl",kernelFunc:oC};var ec=class{constructor(t,e=!1,r=null,n=!1,s=!1){this.variableNames=["x","W"],this.outputShape=t.outShape;let i=t.padInfo.top,a=t.padInfo.left,u=t.strideHeight,c=t.strideWidth,l=t.dilationHeight,p=t.dilationWidth,m=t.filterHeight,d=t.filterWidth,f=Math.floor(t.inChannels/4)*4,h=t.inChannels%4,g=t.dataFormat==="channelsLast",x=g?1:2,b=g?2:3,w=g?3:1,v="",k="";r&&(n?v=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:s?v=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:v=`
          float activation(float x) {
            ${r}
          }
        `,k="result = activation(result);");let N=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${v}

      const ivec2 strides = ivec2(${u}, ${c});
      const ivec2 pads = ivec2(${i}, ${a});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${w}];

        ivec2 xRCCorner =
            ivec2(coords[${x}], coords[${b}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${m}; wR++) {
          int xR = xRCorner + wR * ${l};

          if (xR < 0 || xR >= ${t.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${d}; wC++) {
            int xC = xCCorner + wC * ${p};

            if (xC < 0 || xC >= ${t.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${f}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${g}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${h===1}) {

              if (${g}) {
                dotProd +=
                    getX(batch, xR, xC, ${f}) *
                    getW(wR, wC, ${f}, d2);
              } else {
                dotProd +=
                    getX(batch, ${f}, xR, xC) *
                    getW(wR, wC, ${f}, d2);
              }

            } else if (${h===2}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2)
              );

              if (${g}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${h===3}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2),
                getW(wR, wC, ${f} + 2, d2)
              );

              if (${g}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1),
                  getX(batch, xR, xC, ${f} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC),
                  getX(batch, ${f} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${N}
        ${k}
        setOutput(result);
      }
    `}},Cm=class{constructor(t){this.variableNames=["x","W"],this.outputShape=t.outShape;let e=t.padInfo.front,r=t.padInfo.top,n=t.padInfo.left,s=t.strideDepth,i=t.strideHeight,a=t.strideWidth,u=t.dilationDepth,c=t.dilationHeight,l=t.dilationWidth,p=t.filterDepth,m=t.filterHeight,d=t.filterWidth,f=Math.floor(t.inChannels/4)*4,h=t.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${s}, ${i}, ${a});
      const ivec3 pads = ivec3(${e}, ${r}, ${n});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${p}; wF++) {
          int xF = xFCorner + wF * ${u};

          if (xF < 0 || xF >= ${t.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${m}; wR++) {
            int xR = xRCorner + wR * ${c};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d}; wC++) {
              int xC = xCCorner + wC * ${l};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${f}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${h===1}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${f}) *
                  getW(wF, wR, wC, ${f}, d2);
              } else if (${h===2}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${h===3}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1),
                  getX(batch, xF, xR, xC, ${f} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2),
                  getW(wF, wR, wC, ${f} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};var oc=class{constructor(t,e=!1,r=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=Mt(this.outputShape.length);let i=t.padInfo.left,a=t.strideWidth,u=t.dilationWidth,c=t.filterHeight,l=t.filterWidth,p=l,m=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let g=0;g<l;g++)m+=`
           vec4 xTexelC${g*2};
           int xTexelC${g*2}Ready;
           vec4 xTexelC${g*2+1};
           int xTexelC${g*2+1}Ready;
           vec4 xC${g};`;m+=`
     for (int r = 0; r < ${c}; r++) {
      for (int d1 = 0; d1 < ${t.inChannels}; d1 += 2) {
       `;for(let g=0;g<l;g++)m+=`
           xTexelC${g*2} = vec4(0.0);
           xTexelC${g*2}Ready = 0;
           xTexelC${g*2+1} = vec4(0.0);
           xTexelC${g*2+1}Ready = 0;
           xC${g} = vec4(0.0);`;m+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let g=0;g<(p+1)/2;g++){let x=g*2;if(m+=`
           xC = xCCorner + ${x*u};
           `,a===1){if(x<l&&(i%2===1?(m+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }
               `,u===1&&x>0?m+=`
                 xC${x} = vec4(xTexelC${x-2}.zw, xTexelC${x}.xy);
                 `:m+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${x} = vec4(previous.zw, xTexelC${x}.xy);
                   } else {
                     xC${x} = vec4(0.0, 0.0, xTexelC${x}.xy);
                   }
                   `):m+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xC${x} = xTexelC${x};
                 `,x+1<l)){let b=i%2===0?C.nearestLargerEven(u):u;u%2===0&&i%2===1||u%2!==0&&i%2!==1?(m+=`
                   xCOffset = xC + imod(pads[1], 2) + ${b};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                     xTexelC${x+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${x+1}.zw = vec2(0.0);
                     }
                     xTexelC${x+1}Ready = 1;
                   }
                   `,u>1?m+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${x+1} = vec4(previous.zw, xTexelC${x+1}.xy);
                     } else {
                      xC${x+1} = vec4(0.0, 0.0, xTexelC${x+1}.xy);
                     }
                     `:m+=`
                     xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.xy);
                     `):b===1?m+=`
                     xC${x+1} = xTexelC${x};
                     `:m+=`
                     xCOffset = xC + ${b};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                       xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${x+1}.zw = vec2(0.0);
                       }
                       xTexelC${x+1}Ready = 1;
                     }

                     xC${x+1} = xTexelC${x+1};
                     `}}else x<l&&(i%2===1?(m+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.0);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
               `,x+1<l&&(m+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${x+1} = vec4(xTexelC${x+1}.xy, final.xy);
                 `)):(m+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(
                   xTexelC${x}.xy, xTexelC${x+1}.xy);
               `,x+1<l&&(m+=`
                   xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
                 `)));x<l&&(m+=`
             wTexel = getW(r, ${x}, d1, d2);
             dotProd += xC${x}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${t.inChannels}) {
               dotProd += xC${x}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,x+1<l&&(m+=`
               wTexel = getW(r, ${x+1}, d1, d2);
               dotProd += xC${x+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${t.inChannels}) {
                 dotProd += xC${x+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}m+=`
     }
   `,m+=`
     }
   `,m+=`
     }
   `;let d="",f="";r&&(n?d=`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${r}
         }`:s?d=`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${r}
         }`:d=`vec4 activation(vec4 x) {
           ${r}
         }`,f="result = activation(result);");let h=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${d}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${m}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${h}
         ${f}
         setOutput(result);
       }
     `}};var bm=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=t,this.enableShapeUniforms=Mt(this.outputShape.length);let{dataFormat:r}=e,n=Qt(),s=r==="channelsLast",i=s?1:2,a=s?2:3,u=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${t[2]} && pos < ${t[1]}) {`,c="";for(let l=0;l<=1;l++)for(let p=0;p<=1;p++)c+=`
          blockIndex = rc.z + ${p};
          pos = rc.y + ${l};

          ${u}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${i}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${a}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${s}) {
                  innerDims = vec2(d1, ch);
                  result[${l*2+p}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${l*2+p}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${c}

        ${n.output} = result;
      }
    `}};function ym(o,t){let e=o.length;return e>=3?t?[...o.slice(0,-3),o[e-3]*o[e-2],o[e-1]]:[...o.slice(0,-3),o[e-3],o[e-2]*o[e-1]]:!t&&e===1&&o[0]>1?[o[0],1]:null}function wm({x:o,filter:t,convInfo:e,backend:r,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:i=0,activation:a=null}){let u=o.shape,c=r.texData.get(o.dataId),l=e.inChannels,p=u[0]*u[1]*u[2],m=e.outChannels,d=e.dataFormat==="channelsLast",f=!1,h=!1,g,x=[];if(s!=null){let v=ym(s.shape,d);v!=null&&(s=j({inputs:{x:s},backend:r,attrs:{shape:v}}),x.push(s))}if(n!=null){let v=ym(n.shape,d);v!=null&&(n=j({inputs:{x:n},backend:r,attrs:{shape:v}}),x.push(n))}if(!((p===1||m===1)&&l>Zx)&&c.isPacked&&d&&c.texture!=null&&u[2]%2!==0&&C.arraysEqual(c.shape.slice(-3),u.slice(-3))){let v=u[0]*u[1]*(u[2]+1),k={dataId:o.dataId,shape:[1,v,e.inChannels],dtype:o.dtype},N=c.shape;c.shape=c.shape.slice(),c.shape[c.shape.length-2]++,C.assert(Aa(c.shape,k.shape),()=>`packed reshape ${c.shape} to ${k.shape} isn't free`);let E=j({inputs:{x:t},backend:r,attrs:{shape:[1,e.inChannels,e.outChannels]}});x.push(E);let R=Ma({a:k,b:E,backend:r,transposeA:f,transposeB:h,bias:n,activation:a,preluActivationWeights:s,leakyreluAlpha:i}),A=r.texData.get(R.dataId);C.assert(A.isPacked,()=>"batchMatMul result is expected to be packed"),c.shape=N,A.shape=e.outShape,g=se({inputs:{x:R},backend:r}),g.shape=e.outShape,x.push(R)}else{let v=e.outHeight*e.outWidth,k=j({inputs:{x:o},backend:r,attrs:{shape:d?[e.batchSize,v,e.inChannels]:[e.batchSize,e.inChannels,v]}}),N=j({inputs:{x:t},backend:r,attrs:{shape:[1,e.inChannels,e.outChannels]}}),E=Ma({a:d?k:N,b:d?N:k,transposeA:!d,transposeB:h,backend:r,bias:n,activation:a,preluActivationWeights:s,leakyreluAlpha:i});g=j({inputs:{x:E},backend:r,attrs:{shape:e.outShape}}),x.push(k),x.push(N),x.push(E)}for(let v of x)r.disposeIntermediateTensorInfo(v);return g}function Sm({x:o,filter:t,convInfo:e,backend:r,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:i=0,activation:a=null}){let{filterWidth:u,filterHeight:c,inChannels:l,outWidth:p,outHeight:m,dataFormat:d}=e,f=d==="channelsLast",h=u*c*l,g=m*p,x=[e.batchSize,h,g],b=!0,w=!1,v=[];if(s!=null){let U=ym(s.shape,f);U!=null&&(s=j({inputs:{x:s},backend:r,attrs:{shape:U}}),v.push(s))}if(n!=null){let U=ym(n.shape,f);U!=null&&(n=j({inputs:{x:n},backend:r,attrs:{shape:U}}),v.push(n))}let k=j({inputs:{x:t},backend:r,attrs:{shape:[1,h,C.sizeFromShape(t.shape)/h]}});v.push(k);let N=new bm(x,e),E=[o.shape,[e.padInfo.top,e.padInfo.left],[e.strideHeight,e.strideWidth],[e.dilationHeight,e.dilationWidth],[e.inChannels],[e.filterWidth*e.inChannels],[e.outWidth]],R=r.runWebGLProgram(N,[o],"float32",E),A=j({inputs:{x:R},backend:r,attrs:{shape:x}});v.push(R),v.push(A);let F=n!=null,P=s!=null,_=a==="leakyrelu",O=a?vn(a,!0):null,M=new Ju(f?A.shape:k.shape,f?k.shape:A.shape,f?[e.batchSize,g,e.outChannels]:[e.batchSize,e.outChannels,g],b,w,F,O,P,_),L=f?[A,k]:[k,A];if(n&&L.push(n),P&&L.push(s),_){let U=r.makeTensorInfo([],"float32",C.createScalarValue(i,"float32"));L.push(U),v.push(U)}let W=r.runWebGLProgram(M,L,"float32"),X=j({inputs:{x:W},backend:r,attrs:{shape:e.outShape}});v.push(W);for(let U of v)r.disposeIntermediateTensorInfo(U);return X}function jG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dataFormat:u,dilations:c,dimRoundingMode:l}=r,p=y.convertConv2DDataFormat(u),m=y.computeConv2DInfo(n.shape,s.shape,i,c,a,l,!1,p),d;if(m.filterHeight===1&&m.filterWidth===1&&m.dilationHeight===1&&m.dilationWidth===1&&m.strideHeight===1&&m.strideWidth===1&&(m.padInfo.type==="SAME"||m.padInfo.type==="VALID"))d=wm({x:n,filter:s,convInfo:m,backend:e});else if(m.strideWidth<=2&&p==="channelsLast"&&D().getBool("WEBGL_EXP_CONV")){let h=new oc(m),g=[[m.padInfo.top,m.padInfo.left],[m.strideHeight,m.strideWidth],[m.dilationHeight,m.dilationWidth],[m.inHeight,m.inWidth]];d=e.runWebGLProgram(h,[n,s],"float32",g)}else if(D().getBool("WEBGL_CONV_IM2COL"))d=Sm({x:n,filter:s,convInfo:m,backend:e});else{let h=new ec(m);d=e.runWebGLProgram(h,[n,s],"float32")}let f=j({inputs:{x:d},backend:e,attrs:{shape:m.outShape}});return e.disposeIntermediateTensorInfo(d),f}var ok={kernelName:jn,backendName:"webgl",kernelFunc:jG};var vm=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideHeight,r=t.strideWidth,n=t.padInfo.top,s=t.padInfo.left,i=t.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yR = 0; yR < ${t.outHeight}; yR++) {
            int xR = wR + yR * ${e} - ${n};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${t.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${s};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              ${i?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}},Im=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterHeight,r=t.filterWidth,n=t.strideHeight,s=t.strideWidth,i=t.dataFormat==="channelsLast",a=e-1-t.padInfo.top,u=r-1-t.padInfo.left,c=i?1:2,l=i?2:3,p=i?3:1;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${u});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${p}];

        ivec2 dyCorner = ivec2(coords[${c}], coords[${l}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            for (int d2 = 0; d2 < ${t.outChannels}; d2++) {

              if (${i}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}},km=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideDepth,r=t.strideHeight,n=t.strideWidth,s=t.padInfo.front,i=t.padInfo.top,a=t.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yF = 0; yF < ${t.outDepth}; yF++) {
            int xF = wF + yF * ${e} - ${s};

            if (xF < 0 || xF >= ${t.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${t.outHeight}; yR++) {
              int xR = wR + yR * ${r} - ${i};

              if (xR < 0 || xR >= ${t.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${t.outWidth}; yC++) {
                int xC = wC + yC * ${n} - ${a};

                if (xC < 0 || xC >= ${t.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}},$m=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterDepth,r=t.filterHeight,n=t.filterWidth,s=t.strideDepth,i=t.strideHeight,a=t.strideWidth,u=e-1-t.padInfo.front,c=r-1-t.padInfo.top,l=n-1-t.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${u}, ${c}, ${l});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${e}; wF++) {
          float dyF = float(dyFCorner + wF) / ${s}.0;

          if (dyF < 0.0 || dyF >= ${t.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${e} - 1 - wF;

          for (int wR = 0; wR < ${r}; wR++) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${r} - 1 - wR;

            for (int wC = 0; wC < ${n}; wC++) {
              float dyC = float(dyCCorner + wC) / ${a}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${n} - 1 - wC;

              for (int d2 = 0; d2 < ${t.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function YG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,pad:a,dataFormat:u,dimRoundingMode:c,filterShape:l}=r,p=y.convertConv2DDataFormat(u),m=y.computeConv2DInfo(n.shape,l,i,1,a,c,!1,p),d=new vm(m);return e.runWebGLProgram(d,[n,s],"float32")}var rk={kernelName:Yn,backendName:"webgl",kernelFunc:YG};var Tm=class{constructor(t){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=t.inShape,this.enableShapeUniforms=Mt(this.outputShape.length);let e=t.filterHeight,r=t.filterWidth,n=e-1-t.padInfo.top,s=r-1-t.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${n}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            int wCPerm = ${r} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${t.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${t.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}};function QG(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{inputShape:i,strides:a,pad:u,dataFormat:c,dimRoundingMode:l}=r,p=y.convertConv2DDataFormat(c),m=y.computeConv2DInfo(i,s.shape,a,1,u,l,!1,p);if(D().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&p==="channelsLast"){let d=[[m.strideHeight,m.strideWidth]],f=new Tm(m);return e.runWebGLProgram(f,[n,s],"float32",d)}else{let d=new Im(m);return e.runWebGLProgram(d,[n,s],"float32")}}var nk={kernelName:Qn,backendName:"webgl",kernelFunc:QG};function ZG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dilations:u}=r,c=y.computeConv3DInfo(n.shape,s.shape,i,u,a),l=new Cm(c);return e.runWebGLProgram(l,[n,s],"float32")}var sk={kernelName:Zn,backendName:"webgl",kernelFunc:ZG};function JG(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,pad:a,filterShape:u}=r,c=y.computeConv3DInfo(n.shape,u,i,1,a),l=new km(c);return e.runWebGLProgram(l,[n,s],"float32")}var ik={kernelName:Ja,backendName:"webgl",kernelFunc:JG};function tH(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{pad:i,strides:a,inputShape:u}=r,c=y.computeConv3DInfo(u,s.shape,a,1,i),l=new $m(c);return e.runWebGLProgram(l,[n,s],"float32")}var ak={kernelName:Jn,backendName:"webgl",kernelFunc:tH};var eH=ko+`
  return cos(x);
`,oH=`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${to}
  return result;
`,rH=ct({opSnippet:eH,packedOpSnippet:oH}),uk={kernelName:"Cos",backendName:"webgl",kernelFunc:rH};var nH=`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`,sH=ct({opSnippet:nH}),ck={kernelName:vr,backendName:"webgl",kernelFunc:sH};var Nm=class{constructor(t,e,r,n,s){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[i,a,u,c]=t,[l]=e,[p,m]=r;this.outputShape=[l,p,m,c];let d=n==="bilinear"?1:0,[f,h]=[`${a-1}.0`,`${u-1}.0`],[g,x,b]=p>1?[`${(a-1)/(p-1)}`,"(y2-y1) * height_ratio",`y1*${f} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${f}`],[w,v,k]=m>1?[`${(u-1)/(m-1)}`,"(x2-x1) * width_ratio",`x1*${h} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${h}`];this.userCode=`
      const float height_ratio = float(${g});
      const float width_ratio = float(${w});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${i}) {
          return;
        }

        float height_scale = ${x};
        float width_scale = ${v};

        float in_y = ${b};
        if( in_y < 0.0 || in_y > ${f} ) {
          setOutput(float(${s}));
          return;
        }
        float in_x = ${k};
        if( in_x < 0.0 || in_x > ${h} ) {
          setOutput(float(${s}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${d} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}};var iH=o=>{let{inputs:t,backend:e,attrs:r}=o,{image:n,boxes:s,boxInd:i}=t,{cropSize:a,method:u,extrapolationValue:c}=r,l=new Nm(n.shape,s.shape,a,u,c);return e.runWebGLProgram(l,[n,s,i],"float32")},lk={kernelName:rs,backendName:"webgl",kernelFunc:iH};var Ba;(function(o){o.Prod="*",o.Sum="+"})(Ba||(Ba={}));var ll=class{constructor(t,e,r,n){this.op=t,this.outputShape=e,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let s=this.outputShape.length,i=this.op===Ba.Prod?"1.0":"0.0",a=r?i:`getX(${pk(s,"coords",this.op)})`,u=this.outputShape[this.outputShape.length-1],c="",l="";r?(c=n?`end != ${u-1}`:"end != 0",l=n?"end + 1":"end - 1"):(c=n?`end + pow2 < ${u}`:"end >= pow2",l=n?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${xt(s)} coords = getOutputCoords();
        int end = ${mk(s,"coords",this.op)};
        float val = ${a};
        int pow2 = int(pow(2.0, index));
        if (${c}) {
          int idx = ${l};
          ${mk(s,"coords",this.op)} = idx;
          val ${this.op}= getX(${pk(s,"coords",this.op)});
        }
        setOutput(val);
      }
    `}};function pk(o,t,e){if(o===1)return`${t}`;if(o===2)return`${t}.x, ${t}.y`;if(o===3)return`${t}.x, ${t}.y, ${t}.z`;if(o===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw new Error(`Cumulative ${e} for rank ${o} is not yet supported`)}function mk(o,t,e){if(o===1)return`${t}`;if(o===2)return`${t}.y`;if(o===3)return`${t}.z`;if(o===4)return`${t}.w`;throw new Error(`Cumulative ${e} for rank ${o} is not yet supported`)}function Em(o,t,e,r,n,s){let i=t.shape.length,a=y.getAxesPermutation([r],i),u=t;a!=null&&(u=Ht({inputs:{x:t},backend:e,attrs:{perm:a}}));let c=y.getInnerMostAxes(1,i)[0];if(c!==i-1)throw new Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${r}`);let l=u.shape[c],p=se({inputs:{x:u},backend:e});for(let m=0;m<=Math.ceil(Math.log2(l))-1;m++){let d=new ll(o,u.shape,!1,s),f=[[m]],h=p;p=e.runWebGLProgram(d,[p],p.dtype,f),e.disposeIntermediateTensorInfo(h)}if(n){let m=new ll(o,u.shape,n,s),d=p;p=e.runWebGLProgram(m,[p],p.dtype),e.disposeIntermediateTensorInfo(d)}if(a!=null){let m=y.getUndoAxesPermutation(a),d=Ht({inputs:{x:p},backend:e,attrs:{perm:m}});return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(u),d}return p}function aH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,exclusive:i,reverse:a}=r;return Em(Ba.Prod,n,e,s,i,a)}var dk={kernelName:es,backendName:"webgl",kernelFunc:aH};function uH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,exclusive:i,reverse:a}=r;return Em(Ba.Sum,n,e,s,i,a)}var fk={kernelName:os,backendName:"webgl",kernelFunc:uH};function cH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,weights:s}=t,{size:i,binaryOutput:a}=r;if(n.shape.length===1){let u=e.readSync(n.dataId),c=e.readSync(s.dataId),l=Gp(u,c,s.dtype,s.shape,i);return e.makeTensorInfo([i],s.dtype,l)}else if(n.shape.length===2){let u=e.bufferSync(n),c=e.bufferSync(s),l=JI(u,c,i,a);return e.makeTensorInfo(l.shape,s.dtype,l.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var hk={kernelName:ns,backendName:"webgl",kernelFunc:cH};var Rm=class{constructor(t,e,r){this.variableNames=["x"],this.outputShape=[],this.outputShape=t,this.blockSize=e,this.dataFormat=r,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${e};
      int offset_h = imod(h, ${e});
      int in_w = w / ${e};
      int offset_w = imod(w, ${e});
      int offset_d = (offset_h * ${e} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};function lH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockSize:s,dataFormat:i}=r,a=n.shape[0],u=i==="NHWC"?n.shape[1]:n.shape[2],c=i==="NHWC"?n.shape[2]:n.shape[3],l=i==="NHWC"?n.shape[3]:n.shape[1],p=u*s,m=c*s,d=l/(s*s),f=i==="NHWC"?[a,p,m,d]:[a,d,p,m],h=new Rm(f,s,i);return e.runWebGLProgram(h,[n],n.dtype)}var gk={kernelName:ss,backendName:"webgl",kernelFunc:lH};var rc=class{constructor(t,e=!1,r=null,n=!1,s=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=Mt(this.outputShape.length);let i=t.filterHeight,a=t.filterWidth,u=t.outChannels/t.inChannels,c="",l="";r&&(n?c=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:s?c=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:c=`
          float activation(float x) {
            ${r}
          }
        `,l="result = activation(result);");let p=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${c}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${u};
        int q = d2 - d1 * ${u};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${i}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${a}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${p}
        ${l}
        setOutput(result);
      }
    `}};var nc=class{constructor(t,e=!1,r=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=Mt(this.outputShape.length);let i=t.outChannels/t.inChannels,a=t.padInfo.left,u=t.strideWidth,c=t.dilationWidth,l=t.filterHeight,p=t.filterWidth,m=p,d=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let x=0;x<p;x++)d+=`
          vec4 xTexelC${x*2};
          int xTexelC${x*2}Ready;
          vec4 xTexelC${x*2+1};
          int xTexelC${x*2+1}Ready;
          vec4 xC${x};`;d+=`
    for (int r = 0; r < ${l}; r++) {
      `;for(let x=0;x<p;x++)d+=`
          xTexelC${x*2} = vec4(0.0);
          xTexelC${x*2}Ready = 0;
          xTexelC${x*2+1} = vec4(0.0);
          xTexelC${x*2+1}Ready = 0;
          xC${x} = vec4(0.0);`;d+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let x=0;x<(m+1)/2;x++){let b=x*2;if(d+=`
          xC = xCCorner + ${b*c};
          `,u===1){if(b<p&&(a%2===1?(d+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }
              `,c===1&&b>0?d+=`
                xC${b} = vec4(xTexelC${b-2}.zw, xTexelC${b}.xy);
                `:d+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${b} = vec4(previous.zw, xTexelC${b}.xy);
                  } else {
                    xC${b} = vec4(0.0, 0.0, xTexelC${b}.xy);
                  }
                  `):d+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                xC${b} = xTexelC${b};
                `,b+1<p)){let w=a%2===0?C.nearestLargerEven(c):c;c%2===0&&a%2===1||c%2!==0&&a%2!==1?(d+=`
                  xCOffset = xC + imod(pads[1], 2) + ${w};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                    xTexelC${b+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${b+1}.zw = vec2(0.0);
                    }
                    xTexelC${b+1}Ready = 1;
                  }
                  `,c>1?d+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${b+1} = vec4(previous.zw, xTexelC${b+1}.xy);
                    } else {
                     xC${b+1} = vec4(0.0, 0.0, xTexelC${b+1}.xy);
                    }
                    `:d+=`
                    xC${b+1} = vec4(xTexelC${b}.zw, xTexelC${b+1}.xy);
                    `):w===1?d+=`
                    xC${b+1} = xTexelC${b};
                    `:d+=`
                    xCOffset = xC + ${w};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                      xTexelC${b+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${b+1}.zw = vec2(0.0);
                      }
                      xTexelC${b+1}Ready = 1;
                    }

                    xC${b+1} = xTexelC${b+1};
                    `}}else b<p&&(a%2===1?(d+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${b+1}Ready == 0) {
                  xTexelC${b+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${b+1}.zw = vec2(0.0);
                  }
                  xTexelC${b+1}Ready = 1;
                }

                xC${b} = vec4(xTexelC${b}.zw, xTexelC${b+1}.zw);
              `,b+1<p&&(d+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${b+1} = vec4(xTexelC${b+1}.xy, final.xy);
                `)):(d+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                  xTexelC${b+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b+1}.zw = vec2(0.);
                  }
                  xTexelC${b+1}Ready = 1;
                }

                xC${b} = vec4(
                  xTexelC${b}.xy, xTexelC${b+1}.xy);
              `,b+1<p&&(d+=`
                  xC${b+1} = vec4(xTexelC${b}.zw, xTexelC${b+1}.zw);
                `)));b<p&&(d+=`
            wTexel = getW(r, ${b}, d1, q);
            dotProd += xC${b} * vec4(wTexel.xz, wTexel.xz);
          `,b+1<p&&(d+=`
              wTexel = getW(r, ${b+1}, d1, q);
              dotProd += xC${b+1} * vec4(wTexel.xz, wTexel.xz);
            `))}d+=`
    }
  `,d+=`
      }
    `;let f="",h="";r&&(n?f=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:s?f=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:f=`vec4 activation(vec4 x) {
          ${r}
        }`,h="result = activation(result);");let g=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${f}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${i};
        int q = d2 - d1 * ${i};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${d}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${g}
        ${h}
        setOutput(result);
      }
    `}};function pH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dilations:u,dimRoundingMode:c}=r,l=u;l==null&&(l=[1,1]),C.assert(y.eitherStridesOrDilationsAreOne(i,l),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${l}'`);let p=y.computeConv2DInfo(n.shape,s.shape,i,l,a,c,!0),m;D().getBool("WEBGL_PACK_DEPTHWISECONV")&&p.strideWidth<=2&&p.outChannels/p.inChannels===1?m=new nc(p):m=new rc(p);let d=[[p.padInfo.top,p.padInfo.left],[p.strideHeight,p.strideWidth],[p.dilationHeight,p.dilationWidth],[p.inHeight,p.inWidth]];return e.runWebGLProgram(m,[n,s],"float32",d)}var xk={kernelName:is,backendName:"webgl",kernelFunc:pH};var Dm=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideHeight,r=t.strideWidth,n=t.padInfo.top,s=t.padInfo.left,i=t.outChannels/t.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${i} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yR = 0; yR < ${t.outHeight}; yR++) {
            int xR = wR + yR * ${e} - ${n};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${t.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${s};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}},Am=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterHeight,r=t.filterWidth,n=t.strideHeight,s=t.strideWidth,i=e-1-t.padInfo.top,a=r-1-t.padInfo.left,u=t.outChannels/t.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${a});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${u}; dm++) {
              int d2 = d1 * ${u} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function mH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,dilations:a,pad:u,dimRoundingMode:c,filterShape:l}=r,p=y.computeConv2DInfo(n.shape,l,i,a,u,c,!0),m=new Dm(p);return e.runWebGLProgram(m,[n,s],"float32")}var Ck={kernelName:as,backendName:"webgl",kernelFunc:mH};function dH(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{strides:i,dilations:a,pad:u,dimRoundingMode:c,inputShape:l}=r,p=y.computeConv2DInfo(l,s.shape,i,a,u,c,!0),m=new Am(p);return e.runWebGLProgram(m,[n,s],"float32")}var bk={kernelName:us,backendName:"webgl",kernelFunc:dH};var Fm=class{constructor(t){this.variableNames=["X"],this.outputShape=[t,t],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}};function fH(o){let{inputs:t,backend:e}=o,{x:r}=t,n=[...r.shape,...r.shape],s=C.sizeFromShape(r.shape),i=j({inputs:{x:r},backend:e,attrs:{shape:[s]}}),a=new Fm(s),u=e.runWebGLProgram(a,[i],i.dtype),c=j({inputs:{x:u},backend:e,attrs:{shape:n}});return e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(u),c}var yk={kernelName:cs,backendName:"webgl",kernelFunc:fH};var Pm=class{constructor(t){this.variableNames=["x","W"],this.outputShape=t.outShape;let{inHeight:e,inWidth:r,padInfo:n,strideHeight:s,strideWidth:i,filterHeight:a,filterWidth:u,dilationHeight:c,dilationWidth:l}=t,{top:p,left:m}=n;this.userCode=`
      const ivec2 strides = ivec2(${s}, ${i});
      const ivec2 pads = ivec2(${p}, ${m});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${a}; h++) {
          int hIn = hBeg + h * ${c};

          if (hIn >= 0 && hIn < ${e}) {
            for (int w = 0; w < ${u}; w++) {
              int wIn = wBeg + w * ${l};

              if (wIn >= 0 && wIn < ${r}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}};function hH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dilations:u}=r,c=y.computeDilation2DInfo(n.shape,s.shape,i,a,"NHWC",u),l,p=new Pm(c);l=e.runWebGLProgram(p,[n,s],"float32");let m=j({inputs:{x:l},backend:e,attrs:{shape:c.outShape}});return e.disposeIntermediateTensorInfo(l),m}var wk={kernelName:ls,backendName:"webgl",kernelFunc:hH};function gH(o){let{inputs:t,backend:e,attrs:r}=o,{equation:n}=r,s=t,{allDims:i,summedDims:a,idDims:u}=y.decodeEinsumEquation(n,s.length);y.checkEinsumDimSizes(i.length,u,s);let{path:c,steps:l}=y.getEinsumComputePath(a,u),p=l.length,m=null,d=i.length,f=[];for(let h=0;h<p;++h){for(let g of l[h]){let{permutationIndices:x,expandDims:b}=y.getEinsumPermutation(d,u[g]),w;y.isIdentityPermutation(x)?w=s[g]:(w=Ht({inputs:{x:s[g]},backend:e,attrs:{perm:x}}),f.push(w));let v=w.shape.slice();for(let k=0;k<b.length;++k)v.splice(b[k],0,1);C.arraysEqual(w.shape,v)||(w=j({inputs:{x:w},backend:e,attrs:{shape:v}}),f.push(w)),m===null?m=w:(m=ul({inputs:{a:w,b:m},backend:e}),f.push(m))}h<p-1&&(c[h]>=0&&(m=Oa({inputs:{x:m},backend:e,attrs:{axis:c[h]-(i.length-d),keepDims:!1}}),f.push(m)),d--)}for(let h of f)h!==m&&e.disposeIntermediateTensorInfo(h);return m}var Sk={kernelName:ps,backendName:"webgl",kernelFunc:gH};var xH="return (x >= 0.0) ? x : (exp(x) - 1.0);",CH=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,bH=ct({opSnippet:xH,packedOpSnippet:CH}),vk={kernelName:"Elu",backendName:"webgl",kernelFunc:bH};var yH="return (b >= 0.0) ? a : a * (b + 1.0);",wH=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,SH=o=>{let{inputs:t,backend:e}=o,{dy:r,y:n}=t,s=D().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Je(wH,r.shape,n.shape):new He(yH,r.shape,n.shape);return e.runWebGLProgram(s,[r,n],r.dtype)},Ik={kernelName:tu,backendName:"webgl",kernelFunc:SH};var vH=`
  return vec4(equal(a, b));
`,IH="return float(a == b);",kH=Pt({opSnippet:IH,packedOpSnippet:vH,dtype:"bool",cpuKernelImpl:n2}),kk={kernelName:kr,backendName:"webgl",kernelFunc:kH};var $H=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${y.ERF_P};
  float a1 = ${y.ERF_A1};
  float a2 = ${y.ERF_A2};
  float a3 = ${y.ERF_A3};
  float a4 = ${y.ERF_A4};
  float a5 = ${y.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,TH=ct({opSnippet:$H}),$k={kernelName:"Erf",backendName:"webgl",kernelFunc:TH};var NH=ko+`
  return exp(x);
`,EH=`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,rC=ct({opSnippet:NH,packedOpSnippet:EH,cpuKernelImpl:s2,dtype:"float32"}),Tk={kernelName:"Exp",backendName:"webgl",kernelFunc:rC};function _m(o){let{inputs:t,attrs:e,backend:r}=o,{dim:n}=e,{input:s}=t,i=s.shape.length,a=s.shape.slice(),u=n;return n<0&&(C.assert(-(i+1)<=n,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),u=i+n+1),a.splice(u,0,1),j({inputs:{x:s},backend:r,attrs:{shape:a}})}var Nk={kernelName:hs,backendName:"webgl",kernelFunc:_m};var Ek="return exp(x) - 1.0;",RH=ct({opSnippet:Ek,packedOpSnippet:Ek,cpuKernelImpl:i2}),Rk={kernelName:$r,backendName:"webgl",kernelFunc:RH};var pl=class{constructor(t,e,r){this.variableNames=["real","imag"];let n=e[1];this.outputShape=e;let s=r?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,i=r?`${n}.0`:"1.0",a;if(t==="real")a="return real * expR - imag * expI;";else if(t==="imag")a="return real * expI + imag * expR;";else throw new Error(`FFT component must be either "real" or "imag", got ${t}.`);this.userCode=`
      const float exponentMultiplier = ${s};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${a}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${n});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${n}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${i};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}};function Om(o,t,e){let r=e.texData.get(o.dataId),n=C.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],i=n/s,a=j({inputs:{x:o},backend:e,attrs:{shape:[i,s]}}),u=a.shape,c=new pl("real",u,t),l=new pl("imag",u,t),p=[{dataId:r.complexTensorInfos.real.dataId,dtype:r.complexTensorInfos.real.dtype,shape:u},{dataId:r.complexTensorInfos.imag.dataId,dtype:r.complexTensorInfos.imag.dtype,shape:u}],m=e.runWebGLProgram(c,p,"float32"),d=e.runWebGLProgram(l,p,"float32"),f=Ke({inputs:{real:m,imag:d},backend:e});e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d);let h=j({inputs:{x:f},backend:e,attrs:{shape:o.shape}});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(f),h}function DH(o){let{inputs:t,backend:e}=o,{input:r}=t;return Om(r,!1,e)}var Dk={kernelName:"FFT",backendName:"webgl",kernelFunc:DH};var Mm=class{constructor(t,e){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=t,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}};function kn(o){let{backend:t,attrs:e}=o,{shape:r,value:n}=e,{dtype:s}=e;if(s=s||C.inferDtype(n),s==="string"){let i=C.getArrayFromDType(s,C.sizeFromShape(r));return i.fill(n),t.makeTensorInfo(r,s,i)}else{let i=new Mm(r,n),a=[[n]];return t.runWebGLProgram(i,[],s,a)}}var Ak={kernelName:gs,backendName:"webgl",kernelFunc:kn};var Lm=class{constructor(t){this.variableNames=["Image"],this.outputShape=[];let e=t[2];this.outputShape=t,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${e} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${e}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var Fk={kernelName:xs,backendName:"webgl",kernelFunc:({inputs:o,backend:t})=>{let{image:e}=o,r=t,n=new Lm(e.shape);return r.runWebGLProgram(n,[e],e.dtype)}};var Pk="return floor(x);",AH=ct({opSnippet:Pk,packedOpSnippet:Pk,cpuKernelImpl:a2}),_k={kernelName:Tr,backendName:"webgl",kernelFunc:AH};var FH=`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,PH=`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,_H=Pt({opSnippet:FH,packedOpSnippet:PH,dtype:"int32"}),Ok={kernelName:Nr,backendName:"webgl",kernelFunc:_H};var Bm=class{constructor(t){this.variableNames=["A"];let e=Qt(),[r,n]=t;this.outputShape=t,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${n}.0, ${r}.0);

        vec4 values = ${e.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}};var zm=class{constructor(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let e=Qt(),[r,n]=t;this.outputShape=t,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${n}.0, ${r}.0);
            vec4 values = ${e.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${e.output} = result;
      }
    `}};var Mk={kernelName:Yi,backendName:"webgl",kernelFunc:OH},sc,nC=D().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function OH(o){let{inputs:t,backend:e,attrs:r}=o,{pixels:n}=t,{numChannels:s}=r,i=typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement,a=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,[u,c]=i?[n.videoWidth,n.videoHeight]:[n.width,n.height],l=[c,u],p=[c,u,s];if(a||i){let h=D().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(sc==null||h!==nC)&&(nC=h,sc=document.createElement("canvas").getContext("2d",{willReadFrequently:nC})),sc.canvas.width=u,sc.canvas.height=c,sc.drawImage(n,0,0,u,c),n=sc.canvas}let m=e.makeTensorInfo(l,"int32");e.texData.get(m.dataId).usage=Re.PIXELS,e.gpgpu.uploadPixelDataToTexture(e.getTexture(m.dataId),n);let d=D().getBool("WEBGL_PACK")?new zm(p):new Bm(p),f=e.runWebGLProgram(d,[m],"int32");return e.disposeData(m.dataId),f}function MH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s,bias:i,preluActivationWeights:a}=t,{strides:u,pad:c,dataFormat:l,dilations:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=r,h=y.convertConv2DDataFormat(l),g=y.computeConv2DInfo(n.shape,s.shape,u,p,c,m,!1,h),x,b=[],w=i!=null,v=a!=null,k=d==="leakyrelu",N=()=>{let R=[n,s],A=(F,P)=>{if(P==="NCHW"&&F.shape.length===1&&F.shape[0]!==1){let _=j({inputs:{x:F},backend:e,attrs:{shape:[F.shape[0],1,1]}});return b.push(_),_}return F};if(w&&R.push(A(i,l)),v&&R.push(A(a,l)),k){let F=e.makeTensorInfo([],"float32",C.createScalarValue(f,"float32"));R.push(F),b.push(F)}return R};if(g.filterHeight===1&&g.filterWidth===1&&g.dilationHeight===1&&g.dilationWidth===1&&g.strideHeight===1&&g.strideWidth===1&&(g.padInfo.type==="SAME"||g.padInfo.type==="VALID"))x=wm({x:n,filter:s,convInfo:g,backend:e,bias:i,activation:d,preluActivationWeights:a,leakyreluAlpha:f});else if(g.strideWidth<=2&&h==="channelsLast"&&D().getBool("WEBGL_EXP_CONV")){let R=d?vn(d,!0):null,A=new oc(g,w,R,v,k),F=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],P=N();x=e.runWebGLProgram(A,P,"float32",F)}else if(D().getBool("WEBGL_CONV_IM2COL"))x=Sm({x:n,filter:s,convInfo:g,backend:e,bias:i,activation:d,preluActivationWeights:a,leakyreluAlpha:f});else{let R=d?vn(d,!1):null,A=new ec(g,w,R,v,k),F=N();x=e.runWebGLProgram(A,F,"float32")}let E=j({inputs:{x},backend:e,attrs:{shape:g.outShape}});return b.push(x),b.forEach(R=>e.disposeIntermediateTensorInfo(R)),E}var Lk={kernelName:sn,backendName:"webgl",kernelFunc:MH};function LH(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s,bias:i,preluActivationWeights:a}=t,{strides:u,pad:c,dilations:l,dimRoundingMode:p,activation:m,leakyreluAlpha:d}=r,f=[],h=l;h==null&&(h=[1,1]),C.assert(y.eitherStridesOrDilationsAreOne(u,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${u} and dilations '${h}'`);let g=y.computeConv2DInfo(n.shape,s.shape,u,h,c,p,!0),x=D().getBool("WEBGL_PACK_DEPTHWISECONV")&&g.strideWidth<=2&&g.outChannels/g.inChannels===1,b=m?vn(m,x):null,w=[n,s],v=i!=null,k=a!=null,N=m==="leakyrelu";if(v&&w.push(i),k&&w.push(a),N){let F=e.makeTensorInfo([],"float32",C.createScalarValue(d,"float32"));w.push(F),f.push(F)}let E;x?E=new nc(g,v,b,k,N):E=new rc(g,v,b,k,N);let R=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],A=e.runWebGLProgram(E,w,"float32",R);return f.forEach(F=>e.disposeIntermediateTensorInfo(F)),A}var Bk={kernelName:an,backendName:"webgl",kernelFunc:LH};var Vm=class{constructor(t,e,r,n){this.sliceDim=t,this.strides=e,this.paramsShape=n,this.variableNames=["x","indices"],this.outputShape=r;let s=xt(r.length),i=`
    int index;`;for(let a=0;a<this.sliceDim;a++)i+=`
          index = round(getIndices(coords[0], ${a}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[a]};
          flattenIndex += index * ${this.strides[a]};`;this.userCode=`
         void main() {
          ${s} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${i}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}};function BH(o){let{inputs:t,backend:e}=o,{params:r,indices:n}=t,s=n.shape,i=s[s.length-1],a=C.sizeFromShape(r.shape),[u,c,l,p]=y.prepareAndValidate(r,n),m=j({inputs:{x:n},backend:e,attrs:{shape:[c,i]}}),d=j({inputs:{x:r},backend:e,attrs:{shape:[C.sizeFromShape(r.shape)/l,l]}});if(e.shouldExecuteOnCPU([r,n])||r.dtype==="string"){let x=e.readSync(n.dataId),b=e.bufferSync(r),w=u2(x,b,r.dtype,c,i,l,p,r.shape,a);return e.makeTensorInfo(u,r.dtype,w.values)}let f=new Vm(i,p,[c,l],r.shape),h=e.runWebGLProgram(f,[d,m],d.dtype),g=j({inputs:{x:h},backend:e,attrs:{shape:u}});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(h),g}var zk={kernelName:ys,backendName:"webgl",kernelFunc:BH};var Wm=class{constructor(t,e){this.variableNames=["A","indices"],this.outputShape=e,this.rank=e.length;let r=xt(this.rank),n=zH(t,2);this.userCode=`
      void main() {
        ${r} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${t[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${n}));
      }
    `}};function zH(o,t){let e=["resRC.x","resRC.y","resRC.z","resRC.w"],r=[];for(let n=0;n<o.length;n++)n===2?r.push("index"):r.push(`${e[n]}`);return r.join()}function sC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,indices:s}=t,{axis:i,batchDims:a}=r,u=C.parseAxisParam(i,n.shape)[0];if(D().get("DEBUG")){let b=e.readSync(s.dataId),w=n.shape[u];for(let v=0;v<b.length;++v){let k=b[v];C.assert(k<=w-1&&k>=0,()=>`GatherV2: the index value ${k} is not in [0, ${w-1}]`)}}let c=y.segment_util.collectGatherOpShapeInfo(n,s,u,a),l=C.sizeFromShape(s.shape),p=[],m=j({inputs:{x:n},backend:e,attrs:{shape:[c.batchSize,c.outerSize,c.dimSize,c.sliceSize]}}),d=j({inputs:{x:s},backend:e,attrs:{shape:[c.batchSize,l/c.batchSize]}});p.push(m),p.push(d);let f=[c.batchSize,c.outerSize,l/c.batchSize,c.sliceSize];if(e.shouldExecuteOnCPU([n,s])||n.dtype==="string"){let b=e.bufferSync(d),w=e.bufferSync(m),v=c2(w,b,f);return p.forEach(k=>e.disposeIntermediateTensorInfo(k)),e.makeTensorInfo(c.outputShape,v.dtype,v.values)}let h=new Wm(m.shape,f),g=e.runWebGLProgram(h,[m,d],m.dtype);p.push(g);let x=j({inputs:{x:g},backend:e,attrs:{shape:c.outputShape}});return p.forEach(b=>e.disposeIntermediateTensorInfo(b)),x}var Vk={kernelName:bs,backendName:"webgl",kernelFunc:sC};var VH="return float(a > b);",WH=`
  return vec4(greaterThan(a, b));
`,UH=Pt({opSnippet:VH,packedOpSnippet:WH,cpuKernelImpl:l2,dtype:"bool"}),Wk={kernelName:Er,backendName:"webgl",kernelFunc:UH};var GH="return float(a >= b);",HH=`
  return vec4(greaterThanEqual(a, b));
`,KH=Pt({opSnippet:GH,packedOpSnippet:HH,dtype:"bool",cpuKernelImpl:p2}),Uk={kernelName:Rr,backendName:"webgl",kernelFunc:KH};function qH(o){let{inputs:t,backend:e}=o,{input:r}=t;return Om(r,!0,e)}var Gk={kernelName:ws,backendName:"webgl",kernelFunc:qH};var XH="return float(!isnan(x) && !isinf(x));",jH=ct({opSnippet:XH,dtype:"bool"}),Hk={kernelName:Dr,backendName:"webgl",kernelFunc:jH};var YH="return float(isinf(x));",QH=ct({opSnippet:YH,dtype:"bool"}),Kk={kernelName:Ar,backendName:"webgl",kernelFunc:QH};var ZH="return float(isnan(x));",JH=ct({opSnippet:ZH,dtype:"bool"}),qk={kernelName:Fr,backendName:"webgl",kernelFunc:JH};var tK="return float(a < b);",eK=`
  return vec4(lessThan(a, b));
`,oK=Pt({opSnippet:tK,packedOpSnippet:eK,cpuKernelImpl:m2,dtype:"bool"}),Xk={kernelName:Pr,backendName:"webgl",kernelFunc:oK};var rK="return float(a <= b);",nK=`
  return vec4(lessThanEqual(a, b));
`,sK=Pt({opSnippet:rK,packedOpSnippet:nK,cpuKernelImpl:d2,dtype:"bool"}),jk={kernelName:_r,backendName:"webgl",kernelFunc:sK};function iK(o){let{backend:t,attrs:e}=o,{start:r,stop:n,num:s}=e,i=f2(r,n,s);return t.makeTensorInfo([i.length],"float32",i)}var Yk={kernelName:Is,backendName:"webgl",kernelFunc:iK};var aK=ko+`
  return x < 0.0 ? 0./0. : log(x);
`,uK=`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,cK=ct({opSnippet:aK,packedOpSnippet:uK,cpuKernelImpl:h2}),Qk={kernelName:"Log",backendName:"webgl",kernelFunc:cK};var lK=ko+`
  return log(1.0 + x);
`,pK=ct({opSnippet:lK}),Zk={kernelName:Or,backendName:"webgl",kernelFunc:pK};var mK="return float(a >= 1.0 && b >= 1.0);",dK=`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,fK=Pt({opSnippet:mK,packedOpSnippet:dK,dtype:"bool"}),Jk={kernelName:Mr,backendName:"webgl",kernelFunc:fK};var hK="return float(!(x >= 1.0));",gK=ct({opSnippet:hK}),t$={kernelName:Lr,backendName:"webgl",kernelFunc:gK};var xK="return float(a >= 1.0 || b >= 1.0);",CK=`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,bK=Pt({opSnippet:xK,packedOpSnippet:CK,dtype:"bool"}),e$={kernelName:Br,backendName:"webgl",kernelFunc:bK};var Um=class{constructor(t,e,r,n,s){this.variableNames=["x"],this.outputShape=[];let i=e,a=t[3]-1;this.outputShape=t;let u,c=`float(${r}) + float(${n}) * sum`;s===.5?u=`inversesqrt(${c})`:s===1?u=`1.0/(${c})`:u=`exp(log(${c}) * float(-${s}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${i}; j <= ${i}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${a}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${u};
        setOutput(val);
      }
    `}};var Gm=class{constructor(t,e,r,n,s){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let i=e,a=t[3]-1;this.outputShape=t;let u,c=`float(${r}) + float(${n}) * sum`;s===.5?u=`inversesqrt(${c})`:s===1?u=`1.0/(${c})`:u=`exp(log(${c}) * float(-${s}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${i};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${i}; j <= ${i}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${a}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${u};
        setOutput(result);
      }
    `}};var yK=o=>{let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{depthRadius:s,bias:i,alpha:a,beta:u}=r,c=D().getBool("WEBGL_PACK_NORMALIZATION")?new Gm(n.shape,s,i,a,u):new Um(n.shape,s,i,a,u);return e.runWebGLProgram(c,[n],n.dtype)},o$={kernelName:"LRN",backendName:"webgl",kernelFunc:yK};var Hm=class{constructor(t,e,r,n,s){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=t,this.depth=t[3],this.depthRadius=e,this.bias=r,this.alpha=n,this.beta=s,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${e})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${e} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${n}) * norm + float(${r});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${n})
                * float(${s})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${s});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}};var wK=o=>{let{inputs:t,backend:e,attrs:r}=o,{x:n,y:s,dy:i}=t,{depthRadius:a,bias:u,alpha:c,beta:l}=r,p=new Hm(n.shape,a,u,c,l);return e.runWebGLProgram(p,[n,s,i],n.dtype)},r$={kernelName:eu,backendName:"webgl",kernelFunc:wK};function n$(o,t,e,r){let n=C.sizeFromShape(t),i=C.sizeFromShape(o.shape)/n,a=j({inputs:{x:o},attrs:{shape:[i,n]},backend:r}),u=eo(a,o.dtype,"max",r),c=j({inputs:{x:u},attrs:{shape:e},backend:r});return r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(u),c}function iC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{reductionIndices:s,keepDims:i}=r,a=n.shape.length,u=C.parseAxisParam(s,n.shape),c=u,l=y.getAxesPermutation(c,a),p=l!=null,m=e.shouldExecuteOnCPU([n]),d=n;if(p){if(m){let w=e.texData.get(d.dataId).values,v=new Array(a);for(let E=0;E<v.length;E++)v[E]=n.shape[l[E]];let k=_a(w,n.shape,n.dtype,l,v);d=e.makeTensorInfo(v,n.dtype);let N=e.texData.get(d.dataId);N.values=k}else d=Ri(n,l,e);c=y.getInnerMostAxes(c.length,a)}y.assertAxesAreInnerMostDims("max",c,a);let[f,h]=y.computeOutAndReduceShapes(d.shape,c),g=f;i&&(g=y.expandShapeToKeepDim(f,u));let x;if(m){let w=e.texData.get(d.dataId).values,v=g2(w,C.sizeFromShape(h),g,n.dtype);x=e.makeTensorInfo(g,n.dtype);let k=e.texData.get(x.dataId);k.values=v}else x=n$(d,h,g,e);return p&&e.disposeIntermediateTensorInfo(d),x}var s$={kernelName:"Max",backendName:"webgl",kernelFunc:iC};var SK=Zu+`
  return max(a, b);
`,vK=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+to+`
  return result;
`,IK=Pt({opSnippet:SK,packedOpSnippet:vK,cpuKernelImpl:x2}),i$={kernelName:zr,backendName:"webgl",kernelFunc:IK};function kK(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t;ir(n,"maxPool");let{filterSize:s,strides:i,pad:a,dimRoundingMode:u}=r,c=1;C.assert(y.eitherStridesOrDilationsAreOne(i,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);let l=y.computePool2DInfo(n.shape,s,i,c,a,u);if(l.filterWidth===1&&l.filterHeight===1&&C.arraysEqual(l.inShape,l.outShape))return se({inputs:{x:n},backend:e});let p=new Lo(l,"max",!1);return e.runWebGLProgram(p,[n],n.dtype)}var a$={kernelName:$s,backendName:"webgl",kernelFunc:kK};function $K(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{filterSize:s,strides:i,pad:a,dataFormat:u,dimRoundingMode:c}=r,l=[1,1,1],p=y.computePool3DInfo(n.shape,s,i,l,a,c,u),m=new Di(p,"max",!1);return e.runWebGLProgram(m,[n],n.dtype)}var u$={kernelName:Ts,backendName:"webgl",kernelFunc:$K};var Km=class{constructor(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;let e=t.strideHeight,r=t.strideWidth,n=t.dilationHeight,s=t.effectiveFilterHeight,i=t.effectiveFilterWidth,a=s-1-t.padInfo.top,u=i-1-t.padInfo.left,c=s*i-1;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${u});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${s};
          wR += ${n}) {
          float dyR = float(dyRCorner + wR) / ${e}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${i}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${c} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${i} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}},qm=class{constructor(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;let e=t.strideDepth,r=t.strideHeight,n=t.strideWidth,s=t.dilationDepth,i=t.dilationHeight,a=t.dilationWidth,u=t.effectiveFilterDepth,c=t.effectiveFilterHeight,l=t.effectiveFilterWidth,p=u-1-t.padInfo.front,m=c-1-t.padInfo.top,d=l-1-t.padInfo.left,f=u*c*l-1;this.userCode=`
      const ivec3 pads = ivec3(${p}, ${m}, ${d});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${u};
           wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${e}.0;

          if (dyD < 0.0 || dyD >= ${t.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${c};
              wR += ${i}) {
            float dyR = float(dyRCorner + wR) / ${r}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${l};
                wC += ${a}) {
              float dyC = float(dyCCorner + wC) / ${n}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${f} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${c} * ${l} +
                  wR * ${l} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function TK(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,i=s,{filterSize:a,strides:u,pad:c,dimRoundingMode:l}=r,p=[1,1,1],m=y.computePool3DInfo(i.shape,a,u,p,c,l),d=new Di(m,"max",!0),f=e.runWebGLProgram(d,[i],i.dtype),h=new qm(m),g=e.runWebGLProgram(h,[n,f],i.dtype);return e.disposeIntermediateTensorInfo(f),g}var c$={kernelName:ru,backendName:"webgl",kernelFunc:TK};function NK(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s,output:i}=t,a=s;ir([s,i],"maxPoolGrad");let{filterSize:u,strides:c,pad:l,dimRoundingMode:p}=r,m=y.computePool2DInfo(a.shape,u,c,1,l,p),d=!0,f=new Lo(m,"max",d),h=e.runWebGLProgram(f,[a],a.dtype),g=new Km(m),x=e.runWebGLProgram(g,[n,h],a.dtype);return e.disposeIntermediateTensorInfo(h),x}var l$={kernelName:ou,backendName:"webgl",kernelFunc:NK};function p$(o,t,e,r){let n=new Lo(e,"max",!1),s=r.runWebGLProgram(n,[o],"float32");n=new Lo(e,"max",!0,!0,t);let i=r.runWebGLProgram(n,[o],"float32");return[s,i]}var m$={kernelName:Ns,backendName:"webgl",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{x:r}=o,{filterSize:n,strides:s,pad:i,includeBatchInIndex:a}=t,u=e;C.assert(r.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${r.shape.length}.`);let c=[1,1];C.assert(y.eitherStridesOrDilationsAreOne(s,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${c}'`);let l=y.computePool2DInfo(r.shape,n,s,c,i),[p,m]=p$(r,a,l,u);return[p,m]}};function d$(o,t,e,r){let n=C.sizeFromShape(t),i=C.sizeFromShape(o.shape)/n,a=j({inputs:{x:o},attrs:{shape:[i,n]},backend:r}),u=eo(a,"float32","mean",r),c=j({inputs:{x:u},attrs:{shape:e},backend:r});return r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(u),c}var f$={kernelName:Es,backendName:"webgl",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{x:r}=o,{keepDims:n,axis:s}=t,i=e,a=r.shape.length,u=C.parseAxisParam(s,r.shape),c=u,l=y.getAxesPermutation(c,a),p=l!=null,m=i.shouldExecuteOnCPU([r]),d=[],f=r;if(p){if(m){let v=i.texData.get(f.dataId).values,k=new Array(a);for(let R=0;R<k.length;R++)k[R]=r.shape[l[R]];let N=_a(v,r.shape,r.dtype,l,k);f=i.makeTensorInfo(k,r.dtype);let E=i.texData.get(f.dataId);E.values=N}else f=Ri(r,l,i);d.push(f),c=y.getInnerMostAxes(c.length,a)}y.assertAxesAreInnerMostDims("sum",c,a);let[h,g]=y.computeOutAndReduceShapes(f.shape,c),x=h;n&&(x=y.expandShapeToKeepDim(h,u));let b=d$(f,g,x,i);for(let w of d)i.disposeIntermediateTensorInfo(w);return b}};function EK(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r,a=n.shape.length,u=C.parseAxisParam(s,n.shape),c=u,l=y.getAxesPermutation(c,a),p=n;l!=null&&(p=Ht({inputs:{x:n},backend:e,attrs:{perm:l}}),c=y.getInnerMostAxes(c.length,n.shape.length)),y.assertAxesAreInnerMostDims("min",c,a);let[m,d]=y.computeOutAndReduceShapes(p.shape,c),f=C.sizeFromShape(d),h=j({inputs:{x:p},backend:e,attrs:{shape:[-1,f]}}),g=eo(h,h.dtype,"min",e),x;if(i){let b=y.expandShapeToKeepDim(m,u);x=j({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=j({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),l!=null&&e.disposeIntermediateTensorInfo(p),x}var h$={kernelName:"Min",backendName:"webgl",kernelFunc:EK};var RK=Zu+`
  return min(a, b);
`,DK=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+to+`
  return result;
`,AK=Pt({opSnippet:RK,packedOpSnippet:DK,cpuKernelImpl:C2}),g$={kernelName:Vr,backendName:"webgl",kernelFunc:AK};var Xm=class{constructor(t,e,r){this.variableNames=["x"],this.outputShape=e.map((l,p)=>l[0]+t[p]+l[1]);let n=t.length,s=xt(n),i=e.map(l=>l[0]).join(","),a=e.map((l,p)=>l[0]+t[p]).join(","),u=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n),c=r==="reflect"?0:1;if(n===1){this.userCode=`
        int start = ${i};
        int end = ${a};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${c};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${c};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${s} start = ${s}(${i});
      ${s} end = ${s}(${a});

      void main() {
        ${s} outC = getOutputCoords();
        for (int i = 0; i < ${n}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${c};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${c};
          }
        }
        ${s} coords = outC - start;
        setOutput(getX(${u}));
      }
    `}};var jm=class{constructor(t,e,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.map((f,h)=>f[0]+t[h]+f[1]);let n=t.length,s=xt(n),i=e.map(f=>f[0]).join(","),a=e.map((f,h)=>f[0]+t[h]).join(","),u=ne("rc",n),c=ne("source",n),l=`${u[n-1]} < ${this.outputShape[n-1]}`,p=n===1?"source":`vec2(${c.slice(-2).join()})`,m=r==="reflect"?0:1,d="";if(n===1){let f=`
        ${s} source = rc;
        if (source < start) {
          source = start * 2 - source - ${m};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${m};
        }
        source -= start;
      `;d=`
        ${s} rc = outputLoc;
        ${f}
        result[0] = getChannel(getX(${c.join()}), ${p});
        ${u[n-1]} += 1;
        if(${l}) {
          ${f}
          result[1] = getChannel(getX(${c.join()}), ${p});
        }
      `}else{let f=`
        ${s} source = rc;
        ${s} lt = ${s}(lessThan(source, start));
        ${s} gte = ${s}(greaterThanEqual(source, end));
        ${s} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${m}) +
                gte * ((end - 1) * 2 - source + ${m});
        source -= start;
      `;d=`
        ${s} rc = outputLoc;
        ${f}
        result[0] = getChannel(getX(${c.join()}), ${p});
        ${u[n-1]} += 1;
        if(${l}) {
          ${f}
          result[1] = getChannel(getX(${c.join()}), ${p});
        }
        rc = outputLoc;
        ${u[n-2]} += 1;
        if(${u[n-2]} < ${this.outputShape[n-2]}) {
          ${f}
          result[2] = getChannel(getX(${c.join()}), ${p});
          ${u[n-1]} += 1;
          if(${l}) {
            ${f}
            result[3] = getChannel(getX(${c.join()}), ${p});
          }
        }
      `}this.userCode=`
      const ${s} start = ${s}(${i});
      const ${s} end = ${s}(${a});

      void main() {
        ${s} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${d}
        setOutput(result);
      }
    `}};var FK=({inputs:o,backend:t,attrs:e})=>{let{x:r}=o,{paddings:n,mode:s}=e,i=D().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new jm(r.shape,n,s):new Xm(r.shape,n,s);return t.runWebGLProgram(i,[r],r.dtype)},x$={kernelName:Rs,backendName:"webgl",kernelFunc:FK};var PK=`if (b == 0.0) return NAN;
  return mod(a, b);`,_K=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+to+`
  return result;
`,OK=Pt({opSnippet:PK,packedOpSnippet:_K}),C$={kernelName:"Mod",backendName:"webgl",kernelFunc:OK};var Ym=class{constructor(t,e,r){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[t,r],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${e-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${e-1}));
      }
    `}};var MK=`
if (a == b) {
  return 1.0;
};
return a / b;`,LK=`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,aC=Pt({opSnippet:MK,packedOpSnippet:LK,checkOutOfBounds:!0}),b$={kernelName:Ir,backendName:"webgl",kernelFunc:aC};var y$="return a - b;",uC=Pt({opSnippet:y$,packedOpSnippet:y$,supportsComplex:!0,cpuKernelImpl:B2}),w$={kernelName:"Sub",backendName:"webgl",kernelFunc:uC};function cC(o){let{inputs:t,backend:e,attrs:r}=o,{logits:n}=t,{dim:s}=r,i=C.parseAxisParam([s],n.shape),a=iC({inputs:{x:n},backend:e,attrs:{reductionIndices:i,keepDims:!1}}),u=y.expandShapeToKeepDim(a.shape,i),c=j({inputs:{x:a},backend:e,attrs:{shape:u}}),l=uC({inputs:{a:n,b:c},backend:e}),p=rC({inputs:{x:l},backend:e}),m=Oa({inputs:{x:p},backend:e,attrs:{axis:i,keepDims:!1}}),d=j({inputs:{x:m},backend:e,attrs:{shape:u}}),f=aC({inputs:{a:p,b:d},backend:e});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),f}var S$={kernelName:oi,backendName:"webgl",kernelFunc:cC};function BK(o){let{inputs:t,backend:e,attrs:r}=o,{logits:n}=t,{numSamples:s,seed:i,normalized:a}=r,u=a?n:cC({inputs:{logits:n},backend:e,attrs:{dim:n.shape.length-1}}),c=u.shape[0],l=u.shape[1],p=new Ym(c,l,s),m=[[i]],d=e.runWebGLProgram(p,[u],"int32",m);return a||e.disposeIntermediateTensorInfo(u),d}var v$={kernelName:As,backendName:"webgl",kernelFunc:BK};var zK=fe+`
  return -x;
`,VK=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function WK(o){let{inputs:t,backend:e}=o,{x:r}=t;if(e.shouldExecuteOnCPU([r])){let s=e.texData.get(r.dataId),[i,a]=y2(s.values,r.shape,r.dtype);return e.makeTensorInfo(a,r.dtype,i)}let n;return D().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new Ge(r.shape,VK):n=new we(r.shape,zK),e.runWebGLProgram(n,[r],r.dtype)}var I$={kernelName:"Neg",backendName:"webgl",kernelFunc:WK};var UK=de.nonMaxSuppressionV3Impl;function GK(o){y.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:r}=o,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:u}=r,c=e.readSync(n.dataId),l=e.readSync(s.dataId),{selectedIndices:p}=UK(c,l,i,a,u);return e.makeTensorInfo([p.length],"int32",new Int32Array(p))}var k$={kernelName:Fs,backendName:"webgl",kernelFunc:GK};var HK=de.nonMaxSuppressionV4Impl;function KK(o){y.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:r}=o,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:u,padToMaxOutputSize:c}=r,l=e.readSync(n.dataId),p=e.readSync(s.dataId),{selectedIndices:m,validOutputs:d}=HK(l,p,i,a,u,c);return[e.makeTensorInfo([m.length],"int32",new Int32Array(m)),e.makeTensorInfo([],"int32",new Int32Array([d]))]}var $$={kernelName:nu,backendName:"webgl",kernelFunc:KK};var qK=de.nonMaxSuppressionV5Impl;function XK(o){y.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:r}=o,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:u,softNmsSigma:c}=r,l=e.readSync(n.dataId),p=e.readSync(s.dataId),m=i,d=a,f=u,h=c,{selectedIndices:g,selectedScores:x}=qK(l,p,m,d,f,h);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var T$={kernelName:Ps,backendName:"webgl",kernelFunc:XK};var Qm=class{constructor(t,e,r,n){this.variableNames=["indices"],this.outputShape=[t,e],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${n}), float(${r}),
                      float(index == coords.y)));
      }
    `}};var jK=o=>{let{inputs:t,backend:e,attrs:r}=o,{indices:n}=t,{dtype:s,depth:i,onValue:a,offValue:u}=r,c=C.sizeFromShape(n.shape),l=new Qm(c,i,a,u),p=j({inputs:{x:n},backend:e,attrs:{shape:[c]}}),m=e.runWebGLProgram(l,[p],s);e.disposeIntermediateTensorInfo(p);let d=[...n.shape,i],f=j({inputs:{x:m},backend:e,attrs:{shape:d}});return e.disposeIntermediateTensorInfo(m),f},N$={kernelName:Os,backendName:"webgl",kernelFunc:jK};function ml(o){let{inputs:t,backend:e}=o,{x:r}=t;if(r.dtype==="complex64"){let n=In({inputs:{input:r},backend:e}),s=ml({inputs:{x:n},backend:e}),i=La({inputs:{input:r},backend:e}),a=ml({inputs:{x:i},backend:e}),u=Ke({inputs:{real:s,imag:a},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(a),u}else return kn({attrs:{shape:r.shape,dtype:r.dtype,value:r.dtype==="string"?"":0},backend:e})}var E$={kernelName:fi,backendName:"webgl",kernelFunc:ml};function R$(o){let{inputs:t,backend:e}=o,{x:r}=t;if(r.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(r.dtype==="complex64"){let n=In({inputs:{input:r},backend:e}),s=R$({inputs:{x:n},backend:e}),i=La({inputs:{input:r},backend:e}),a=ml({inputs:{x:i},backend:e}),u=Ke({inputs:{real:s,imag:a},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(a),u}else return kn({attrs:{shape:r.shape,dtype:r.dtype,value:1},backend:e})}var D$={kernelName:_s,backendName:"webgl",kernelFunc:R$};function YK(o){let{inputs:t,backend:e,attrs:r}=o,{axis:n}=r;if(t.length===1)return _m({inputs:{input:t[0]},backend:e,attrs:{dim:n}});let s=t[0].shape,i=t[0].dtype;t.forEach(l=>{C.assertShapesMatch(s,l.shape,"All tensors passed to stack must have matching shapes"),C.assert(i===l.dtype,()=>"All tensors passed to stack must have matching dtypes")});let a=[],u=t.map(l=>{let p=_m({inputs:{input:l},backend:e,attrs:{dim:n}});return a.push(p),p}),c=oC({inputs:u,backend:e,attrs:{axis:n}});return a.forEach(l=>e.disposeIntermediateTensorInfo(l)),c}var A$={kernelName:Ms,backendName:"webgl",kernelFunc:YK};var Zm=class{constructor(t,e,r){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=e.map((c,l)=>c[0]+t[l]+c[1]);let n=t.length,s=xt(n),i=e.map(c=>c[0]).join(","),a=e.map((c,l)=>c[0]+t[l]).join(","),u=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);if(n===1){this.userCode=`
        int start = ${i};
        int end = ${a};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${s} start = ${s}(${i});
      ${s} end = ${s}(${a});

      void main() {
        ${s} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${s} coords = outC - start;
          setOutput(getX(${u}));
        }
      }
    `}};var Jm=class{constructor(t,e,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=e.map((h,g)=>h[0]+t[g]+h[1]);let n=t.length,s=xt(n),i=e.map(h=>h[0]).join(","),a=e.map((h,g)=>h[0]+t[g]).join(","),u=ne("rc",n),c=ne("source",n),l=`${u[n-1]} < ${this.outputShape[n-1]}`,p=n===1?"source":`vec2(${c.slice(-2).join()})`,m=[`${s} rc = outputLoc;`,`${u[n-1]} += 1;
       if(${l}) {
      `,n===1?"":`}
       rc = outputLoc;
       ${u[n-2]} += 1;
       if(${u[n-2]} < ${this.outputShape[n-2]}) {`,n===1?"":`  ${u[n-1]} += 1;
         if(${l}) {`],d=n===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",f="";for(let h=0,g=n===1?2:4;h<g;h++)f+=`
        ${m[h]}
        if (${d}) {
          result[${h}] = float(value);
        } else {
          ${s} source = rc - start;
          result[${h}] = getChannel(getX(${c.join()}), ${p});
        }
      `;f+=n===1?"} ":"}}",this.userCode=`
      const ${s} start = ${s}(${i});
      const ${s} end = ${s}(${a});

      void main() {
        ${s} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${f}
        setOutput(result);
      }
    `}};var lC=o=>{let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{paddings:s,constantValue:i}=r;if(C.sizeFromShape(n.shape)===0){let c=s.map((l,p)=>l[0]+n.shape[p]+l[1]);return kn({backend:e,attrs:{shape:c,value:i,dtype:n.dtype}})}let a=D().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Jm(n.shape,s,i):new Zm(n.shape,s,i),u=[[i]];return e.runWebGLProgram(a,[n],n.dtype,u)},F$={kernelName:Ls,backendName:"webgl",kernelFunc:lC};var QK=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,ZK=`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+to+`
  return result;
`,JK=Pt({opSnippet:QK,packedOpSnippet:ZK}),P$={kernelName:"Pow",backendName:"webgl",kernelFunc:JK};function tq(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r,a=n.shape.length,u=[],c=C.parseAxisParam(s,n.shape),l=c,p=y.getAxesPermutation(l,a),m=n;p!=null&&(m=Ht({inputs:{x:n},backend:e,attrs:{perm:p}}),l=y.getInnerMostAxes(l.length,a),u.push(m)),y.assertAxesAreInnerMostDims("prod",l,a);let d;if(e.shouldExecuteOnCPU([m])){let f=e.texData.get(m.dataId).values,{outVals:h,outShape:g,outDtype:x}=S2(m.shape,m.dtype,f,l);d=e.makeTensorInfo(g,x,h)}else{let[f,h]=y.computeOutAndReduceShapes(m.shape,l),g=C.sizeFromShape(h),x=j({inputs:{x:m},backend:e,attrs:{shape:[-1,g]}}),b=cn(n.dtype),w=eo(x,b,"prod",e);d=j({inputs:{x:w},backend:e,attrs:{shape:f}}),u.push(x),u.push(w)}if(i){u.push(d);let f=y.expandShapeToKeepDim(d.shape,c);d=j({inputs:{x:d},backend:e,attrs:{shape:f}})}return u.forEach(f=>e.disposeIntermediateTensorInfo(f)),d}var _$={kernelName:Vs,backendName:"webgl",kernelFunc:tq};function eq(o){let{inputs:t,backend:e,attrs:r}=o,{paramsNestedSplits:n,paramsDenseValues:s,indices:i}=t,{outputRaggedRank:a}=r,u=n.map(x=>e.readSync(x.dataId)),c=n.map(x=>x.shape),l=e.readSync(s.dataId),p=e.readSync(i.dataId),[m,d,f]=v2(u,c,l,s.shape,s.dtype,p,i.shape,a),h=m.map(x=>e.makeTensorInfo([x.length],"int32",x)),g=e.makeTensorInfo(f,s.dtype,d);return h.concat([g])}var O$={kernelName:su,backendName:"webgl",kernelFunc:eq};function oq(o){let{inputs:t,backend:e}=o,{starts:r,limits:n,deltas:s}=t,i=e.readSync(r.dataId),a=e.readSync(n.dataId),u=e.readSync(s.dataId),[c,l]=I2(i,r.shape,r.dtype,a,n.shape,u,s.shape),p=e.makeTensorInfo([c.length],"int32",c),m=e.makeTensorInfo([l.length],r.dtype,l);return[p,m]}var M$={kernelName:iu,backendName:"webgl",kernelFunc:oq};function rq(o){let{inputs:t,backend:e,attrs:r}=o,{shape:n,values:s,defaultValue:i,rowPartitionTensors:a}=t,{rowPartitionTypes:u}=r,c=e.readSync(n.dataId),l=e.readSync(s.dataId),p=e.readSync(i.dataId),m=a.map(g=>e.readSync(g.dataId)),d=a.map(g=>g.shape),[f,h]=k2(c,n.shape,l,s.shape,s.dtype,p,i.shape,m,d,u);return e.makeTensorInfo(f,s.dtype,h)}var L$={kernelName:au,backendName:"webgl",kernelFunc:rq};var pC=o=>{let{backend:t,attrs:e}=o,{start:r,stop:n,step:s,dtype:i}=e,a=$2(r,n,s,i);return t.makeTensorInfo([a.length],i,a)},B$={kernelName:Ws,backendName:"webgl",kernelFunc:pC};var nq="return 1.0 / x;",sq=ct({opSnippet:nq}),z$={kernelName:Gr,backendName:"webgl",kernelFunc:sq};var iq=fe+`
  return (x < 0.0) ? 0.0 : x;
`,aq=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,uq=ct({opSnippet:iq,packedOpSnippet:aq}),V$={kernelName:Hr,backendName:"webgl",kernelFunc:uq};var cq=fe+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,lq=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,pq=ct({opSnippet:cq,packedOpSnippet:lq}),W$={kernelName:Kr,backendName:"webgl",kernelFunc:pq};var td=class{constructor(t,e,r,n,s){this.variableNames=["A"],this.outputShape=[];let[i,a,u,c]=t;this.outputShape=[i,e,r,c];let l=[n&&e>1?a-1:a,n&&r>1?u-1:u],p=[n&&e>1?e-1:e,n&&r>1?r-1:r],m;s?m="(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":m="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${l[0]/p[0]},
          ${l[1]/p[1]});
      const vec2 inputShapeRC = vec2(${a}.0, ${u}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${m};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}};var ed=class{constructor(t,e,r,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[i,a,u,c]=t;this.outputShape=[i,e,r,c];let l=[n&&e>1?a-1:a,n&&r>1?u-1:u],p=[n&&e>1?e-1:e,n&&r>1?r-1:r],m;s?m="(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":m="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${l[0]/p[0]},
          ${l[1]/p[1]},
          ${l[1]/p[1]});
      const vec3 inputShapeRC = vec3(${a}.0, ${u}.0,
                                     ${u}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${m};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${c-1};
        bool hasNextRow = coords.z < ${r-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}};function mq(o){let{inputs:t,backend:e,attrs:r}=o,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:a}=r,[u,c]=a,l=D().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new ed(n.shape,u,c,s,i):new td(n.shape,u,c,s,i);return e.runWebGLProgram(l,[n],"float32")}var U$={kernelName:Ks,backendName:"webgl",kernelFunc:mq};var od=class{constructor(t,e,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e;let[,n,s]=e,[,i,a]=t,u=[r&&i>1?n-1:n,r&&a>1?s-1:s],c=[r&&i>1?i-1:i,r&&a>1?a-1:a],l=u[0]/c[0],p=u[1]/c[1],m=1/l,d=1/p,f=Math.ceil(m)*2+2,h=Math.ceil(d)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${l});
        const float widthScale = float(${p});

        const float invHeightScale = float(${m});
        const float invWidthScale = float(${d});

        const int winHeight = int(${f});
        const int winWidth = int(${h});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${a}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${n-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${s-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function dq(o){let{inputs:t,backend:e,attrs:r}=o,{images:n,dy:s}=t,{alignCorners:i}=r,a=new od(s.shape,n.shape,i);return e.runWebGLProgram(a,[s],s.dtype)}var G$={kernelName:cu,backendName:"webgl",kernelFunc:dq};var rd=class{constructor(t,e,r,n,s){this.variableNames=["A"],this.outputShape=[];let[i,a,u,c]=t;this.outputShape=[i,e,r,c];let l=[n&&e>1?a-1:a,n&&r>1?u-1:u],p=[n&&e>1?e-1:e,n&&r>1?r-1:r],m=n?"0.5":"0.0",d;s?d="max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":d="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${l[0]/p[0]},
          ${l[1]/p[1]});
      const vec2 inputShapeRC = vec2(${a}.0, ${u}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${d};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${m})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}};var nd=class{constructor(t,e,r,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[i,a,u,c]=t;this.outputShape=[i,e,r,c];let l=[n&&e>1?a-1:a,n&&r>1?u-1:u],p=[n&&e>1?e-1:e,n&&r>1?r-1:r],m=n?"0.5":"0.0",d;s?d="max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":d="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${l[0]/p[0]},
          ${l[1]/p[1]},
          ${l[1]/p[1]});
      const vec3 inputShapeRC = vec3(${a}.0, ${u}.0,
                                     ${u}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${d};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${m})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${c-1};
        bool hasNextRow = coords.z < ${r-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}};function fq(o){let{inputs:t,backend:e,attrs:r}=o,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:a}=r,[u,c]=a,l=D().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new nd(n.shape,u,c,s,i):new rd(n.shape,u,c,s,i);return e.runWebGLProgram(l,[n],n.dtype)}var H$={kernelName:Hs,backendName:"webgl",kernelFunc:fq};var sd=class{constructor(t,e,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e;let[,n,s]=e,[,i,a]=t,u=[r&&i>1?n-1:n,r&&a>1?s-1:s],c=[r&&i>1?i-1:i,r&&a>1?a-1:a],l=u[0]/c[0],p=u[1]/c[1],m=1/l,d=1/p,f=Math.ceil(m)*2+2,h=Math.ceil(d)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${l});
        const float widthScale = float(${p});

        const float invHeightScale = float(${m});
        const float invWidthScale = float(${d});

        const int winHeight = int(${f});
        const int winWidth = int(${h});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${a}) {
              continue;
            }

            float sourceFracRow =
              float(${u[0]}) *
                (float(dyR) / float(${c[0]}));

            float sourceFracCol =
                float(${u[1]}) *
                  (float(dyC) / float(${c[1]}));

            int sourceNearestRow = int(min(
                float(int(${n}) - 1),
                ${r} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${s}) - 1),
                ${r} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function hq(o){let{inputs:t,backend:e,attrs:r}=o,{images:n,dy:s}=t,{alignCorners:i}=r,a=new sd(s.shape,n.shape,i);return e.runWebGLProgram(a,[s],s.dtype)}var K$={kernelName:uu,backendName:"webgl",kernelFunc:hq};var id=class{constructor(t,e){this.variableNames=["x"];let r=t.length;if(r>4)throw new Error(`WebGL backend: Reverse of rank-${r} tensor is not yet supported`);if(this.outputShape=t,r===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${t[0]} - coord - 1));
        }
      `;return}let n=a=>e.indexOf(a)!==-1&&t[a]!==1?`${t[a]} - coords[${a}] - 1`:`coords[${a}]`,s=t.map((a,u)=>n(u)).join(","),i=xt(r);this.userCode=`
      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${s}));
      }
    `}};var ad=class{constructor(t,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let r=t.length;if(r>4)throw new Error(`WebGL backend: Reverse of rank-${r} tensor is not yet supported`);this.outputShape=t;let n=ne("rc",r),s=`${n[r-1]} + 1 < ${this.outputShape[r-1]}`,i=`${n[r-2]} + 1 < ${this.outputShape[r-2]}`,a=xt(r);r===1?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${t[0]} - rc - 1),
            ${t[0]} - rc - 1);
          if(${s}){
              result.g = getChannel(getX(${t[0]} - (rc  + 1) - 1),
                ${t[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${a} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${u(n.slice())};
          if(${s}){
            result.g = ${c(n.slice())};
          }
          if(${i}) {
            result.b = ${l(n.slice())};
            if(${s}) {
              result.a = ${p(n.slice())};
            }
          }
          setOutput(result);
        }
    `;function u(f){return m(f)}function c(f){return f[r-1]="("+f[r-1]+" + 1)",m(f)}function l(f){return f[r-2]="("+f[r-2]+" + 1)",m(f)}function p(f){return f[r-1]="("+f[r-1]+" + 1)",f[r-2]="("+f[r-2]+" + 1)",m(f)}function m(f){let h=t.map((b,w)=>d(w,f)),g=h.join(","),x=h.slice(-2).join(",");return`getChannel(getX(${g}), vec2(${x}))`}function d(f,h){return e.indexOf(f)!==-1&&t[f]!==1?`${t[f]} - ${h[f]} - 1`:`${h[f]}`}}};function gq(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{dims:s}=r,i=n.shape.length,a=C.parseAxisParam(s,n.shape);if(i===0)return se({inputs:{x:n},backend:e});let u=D().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new ad(n.shape,a):new id(n.shape,a);return e.runWebGLProgram(u,[n],n.dtype)}var q$={kernelName:qs,backendName:"webgl",kernelFunc:gq};var ud=class{constructor(t,e){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let r=t[1],n=t[2];this.outputShape=t;let s="";typeof e=="number"?s=`float outputValue = ${e.toFixed(2)};`:s=`
        vec3 fill = vec3(${e.join(",")});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${s}
          if(coordX >= 0 && coordX < ${n} && coordY >= 0 && coordY < ${r}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var X$={kernelName:hi,backendName:"webgl",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{image:r}=o,{radians:n,fillValue:s,center:i}=t,a=e,u=new ud(r.shape,s),[c,l]=y.getImageCenter(i,r.shape[1],r.shape[2]),p=[[c,l,Math.sin(n),Math.cos(n)]];return a.runWebGLProgram(u,[r],r.dtype,p)}};var xq=`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`,Cq=ct({opSnippet:xq}),j$={kernelName:qr,backendName:"webgl",kernelFunc:Cq};var bq="return inversesqrt(x);",yq=ct({opSnippet:bq,cpuKernelImpl:T2}),Y$={kernelName:Xr,backendName:"webgl",kernelFunc:yq};var Ai=class{constructor(t,e,r,n,s,i,a=!0,u=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=i;let c=xt(s.length),l=xt(i.length),p="";r===1?p="i":r===2&&(p="i, j");let m=`getIndices(${p})`,d="";n===1?d="i":n===2&&(d="i, coords[1]");let f=`getUpdates(${d})`,h="";u&&(h="coords[0], coords[1]");let g=`getDefaultValue(${h})`,x=e>1?"strides[j]":"strides";this.userCode=`
        ${c} strides = ${c}(${s});

        void main() {
          ${l} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${t}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${e}; j++) {
              int index = round(${m});
              flattenedIndex += index * ${x};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${f};
              found = true;
            }
          }
          setOutput(mix(${g}, sum, float(found)));
        }
      `}};var cd=class{constructor(t,e,r,n,s,i,a=!0,u=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=i;let c=xt(s.length),l=xt(i.length),p="";r===1?p="i":r===2&&(p="i, j");let m=`getIndices(${p})`,d="";n===1?d="i":n===2&&(d="i, coords[1]");let f=`getUpdates(${d})`,h="";u&&(h="coords[0], coords[1]");let g=`getDefaultValue(${h})`,x=e>1?"strides[j]":"strides",b=e>1?"strides[j + 1]":"strides";this.userCode=`
        ${c} strides = ${c}(${s});

        void main() {
          ${l} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${t}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${e}; j+=2) {
              ivec4 index = round(${m});
              flattenedIndex += index.xz * ${x};
              if (j + 1 < ${e}) {
                flattenedIndex += index.yw * ${b};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${f};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${g}, sum, found));
        }
      `}};function wq(o){let{inputs:t,backend:e,attrs:r}=o,{indices:n,updates:s}=t,{shape:i}=r,{sliceRank:a,numUpdates:u,sliceSize:c,strides:l,outputSize:p}=y.calculateShapes(s,n,i),m=[p/c,c];if(p===0)return e.makeTensorInfo(i,n.dtype);let d=j({inputs:{x:n},backend:e,attrs:{shape:[u,a]}}),f=j({inputs:{x:s},backend:e,attrs:{shape:[u,c]}}),h=e.makeTensorInfo([],"float32",new Float32Array([0])),g;D().getBool("WEBGL_PACK")?g=new cd(u,a,d.shape.length,f.shape.length,l,m):g=new Ai(u,a,d.shape.length,f.shape.length,l,m);let x=e.runWebGLProgram(g,[f,d,h],f.dtype),b=j({inputs:{x},backend:e,attrs:{shape:i}});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(h),b}var Q$={kernelName:Xs,backendName:"webgl",kernelFunc:wq};var ld=class{constructor(t,e,r,n){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[t,r];let s="while (left < right) {",i=`for (int i = 0; i < ${Math.ceil(Math.log2(e+1))}; ++i) { if (left >= right) break;`,a=D().getNumber("WEBGL_VERSION")===2?s:i,u=n==="left"?"<":"<=";this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${a}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${u} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}};function Sq(o){let{inputs:t,backend:e,attrs:r}=o,{sortedSequence:n,values:s}=t,{side:i}=r,a=new ld(n.shape[0],n.shape[1],s.shape[1],i),u=[[n.shape[1]]];return e.runWebGLProgram(a,[n,s],"int32",u)}var Z$={kernelName:Ys,backendName:"webgl",kernelFunc:Sq};var pd=class{constructor(t,e,r){this.variableNames=["c","a","b"],this.outputShape=e;let n,s;if(r>4)throw Error(`Where for rank ${r} is not yet supported`);if(r===1)s="resRC",n="resRC";else{let a=["resRC.x","resRC.y","resRC.z","resRC.w"],u=[],c=[];for(let l=0;l<e.length;l++)c.push(`${a[l]}`),l<t&&u.push(`${a[l]}`);n=u.join(),s=c.join()}let i=xt(r);this.userCode=`
      void main() {
        ${i} resRC = getOutputCoords();
        float cVal = getC(${n});
        if (cVal >= 1.0) {
          setOutput(getA(${s}));
        } else {
          setOutput(getB(${s}));
        }
      }
    `}};function vq(o){let{inputs:t,backend:e}=o,{condition:r,t:n,e:s}=t,i=new pd(r.shape.length,n.shape,n.shape.length);return e.runWebGLProgram(i,[r,n,s],Lt(n.dtype,s.dtype))}var J$={kernelName:Qs,backendName:"webgl",kernelFunc:vq};var Iq=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${y.SELU_SCALEALPHA};
  float scale = ${y.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,kq=ct({opSnippet:Iq}),tT={kernelName:jr,backendName:"webgl",kernelFunc:kq};var $q=ko+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,Tq=`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Nq=ct({opSnippet:$q,packedOpSnippet:Tq,cpuKernelImpl:E2}),eT={kernelName:Zr,backendName:"webgl",kernelFunc:Nq};var Eq=`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`,Rq=ct({opSnippet:Eq}),oT={kernelName:Qr,backendName:"webgl",kernelFunc:Rq};var Dq=ko+`
  return sin(x);
`,Aq=`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${to}
  return result;
`,Fq=ct({opSnippet:Dq,packedOpSnippet:Aq}),rT={kernelName:"Sin",backendName:"webgl",kernelFunc:Fq};var Pq=`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`,_q=ct({opSnippet:Pq}),nT={kernelName:Yr,backendName:"webgl",kernelFunc:_q};var Oq=`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`,Mq=ct({opSnippet:Oq}),sT={kernelName:Jr,backendName:"webgl",kernelFunc:Mq};var Lq=o=>{let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockShape:s,paddings:i}=r;C.assert(n.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let a=s.reduce((x,b)=>x*b),u=[[0,0]];u.push(...i);for(let x=1+s.length;x<n.shape.length;++x)u.push([0,0]);let c=[],l=lC({inputs:{x:n},backend:e,attrs:{paddings:u,constantValue:0}}),p=y.getReshaped(l.shape,s,a,!1),m=y.getPermuted(p.length,s.length,!1),d=y.getReshapedPermuted(l.shape,s,a,!1),f=j({inputs:{x:l},backend:e,attrs:{shape:p}}),h=Ht({inputs:{x:f},backend:e,attrs:{perm:m}}),g=j({inputs:{x:h},backend:e,attrs:{shape:d}});return c.push(l),c.push(f),c.push(h),c.forEach(x=>e.disposeIntermediateTensorInfo(x)),g},iT={kernelName:ti,backendName:"webgl",kernelFunc:Lq};function Bq(o){let{inputs:t,backend:e}=o,{indices:r,values:n,denseShape:s,defaultValue:i}=t;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
         ${s.shape}`);if(r.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
         ${r.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
         ${n.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);let a=e.readSync(r.dataId),u=e.readSync(n.dataId),c=e.readSync(s.dataId),l=e.readSync(i.dataId)[0],[p,m,d,f,h]=D2(a,r.shape,r.dtype,u,n.dtype,c,l);return[e.makeTensorInfo(m,r.dtype,p),e.makeTensorInfo([m[0]],n.dtype,d),e.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(g=>Number(g)))),e.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}var aT={kernelName:lu,backendName:"webgl",kernelFunc:Bq};function zq(o){let{inputs:t,backend:e}=o,{inputIndices:r,inputShape:n,newShape:s}=t;if(r.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape ${r.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let i=Array.from(e.readSync(n.dataId)),a=e.readSync(r.dataId),u=Array.from(e.readSync(s.dataId)),[c,l,p]=A2(a,r.shape,r.dtype,i,u);return[e.makeTensorInfo(l,r.dtype,c),e.makeTensorInfo([p.length],s.dtype,new Int32Array(p))]}var uT={kernelName:pu,backendName:"webgl",kernelFunc:zq};function Vq(o){let{inputs:t,backend:e}=o,{data:r,indices:n,segmentIds:s}=t;if(r.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
              ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
              ${s.shape}`);let i=e.readSync(r.dataId),a=e.readSync(n.dataId),u=e.readSync(s.dataId),[c,l]=Kp(i,r.shape,r.dtype,a,u,!0);return e.makeTensorInfo(l,r.dtype,c)}var cT={kernelName:ri,backendName:"webgl",kernelFunc:Vq};function Wq(o){let{inputs:t,backend:e}=o,{data:r,indices:n,segmentIds:s}=t;if(r.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
             ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
             ${s.shape}`);let i=e.readSync(r.dataId),a=e.readSync(n.dataId),u=e.readSync(s.dataId),[c,l]=Kp(i,r.shape,r.dtype,a,u);return e.makeTensorInfo(l,r.dtype,c)}var lT={kernelName:ni,backendName:"webgl",kernelFunc:Wq};function Uq(o){let{inputs:t,backend:e,attrs:r}=o,{sparseIndices:n,sparseValues:s,defaultValue:i}=t,{outputShape:a}=r,{sliceRank:u,numUpdates:c,sliceSize:l,strides:p,outputSize:m}=y.calculateShapes(s,n,a),d=!1;if(s.dtype==="string"){let x=e.bufferSync(n),b=e.bufferSync(s),w=C.decodeString(e.readSync(i.dataId)[0]),v=N2(x,b,a,m,l,c,u,p,w,d);return e.makeTensorInfo(a,v.dtype,v.values)}let f=new Ai(c,u,n.shape.length,s.shape.length,p,[m,1],d),h=e.runWebGLProgram(f,[s,n,i],s.dtype),g=j({inputs:{x:h},backend:e,attrs:{shape:a}});return e.disposeIntermediateTensorInfo(h),g}var pT={kernelName:si,backendName:"webgl",kernelFunc:Uq};function Gq(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{numOrSizeSplits:s,axis:i}=r,a=C.parseAxisParam(i,n.shape)[0],u=y.prepareSplitSize(n,s,a),c=n.shape.length,l=new Array(c).fill(0),p=n.shape.slice();return u.map(m=>{let d=[...p];d[a]=m;let f=Bo({inputs:{x:n},backend:e,attrs:{begin:l,size:d}});return l[a]+=m,f})}var mT={kernelName:ei,backendName:"webgl",kernelFunc:Gq};var dT="return sqrt(x);",Hq=ct({opSnippet:dT,packedOpSnippet:dT,cpuKernelImpl:F2}),fT={kernelName:tn,backendName:"webgl",kernelFunc:Hq};var Kq="return x * x;",qq=ct({opSnippet:Kq}),hT={kernelName:mu,backendName:"webgl",kernelFunc:qq};var gT="return (a - b) * (a - b);",Xq=Pt({opSnippet:gT,packedOpSnippet:gT}),xT={kernelName:en,backendName:"webgl",kernelFunc:Xq};function jq(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t;if(n.dtype!=="string")throw new Error("Input must be of datatype string");let s=e.readSync(n.dataId),i=y.fromUint8ToStringArray(s),a=P2(i,"string",r);return e.makeTensorInfo(n.shape,"string",a)}var CT={kernelName:ji,backendName:"webgl",kernelFunc:jq};function Yq({inputs:o,attrs:t,backend:e}){let{x:r}=o,n=fe+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,s=new we(r.shape,n);return e.runWebGLProgram(s,[r],r.dtype)}var bT={kernelName:rn,backendName:"webgl",kernelFunc:Yq};var md=class{constructor(t,e,r){this.variableNames=["x"],this.outputShape=r;let n=r.length,s=xt(r.length),i=xt(r.length),a="";if(n===1)a="coords * strides + begin";else{let u=0;a=r.map((c,l)=>(u++,r.length===1?`coords * strides[${l}] + begin[${l}]`:`coords[${u-1}] * strides[${l}] + begin[${l}]`)).join(",")}this.userCode=`
      ${s} begin = ${s}(${t});
      ${s} strides = ${s}(${e});

      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${a}));
      }
    `}};function Qq(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{begin:s,end:i,strides:a,beginMask:u,endMask:c,ellipsisMask:l,newAxisMask:p,shrinkAxisMask:m}=r,{finalShapeSparse:d,finalShape:f,isIdentity:h,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:v}=ee.sliceInfo(n.shape,s,i,a,u,c,l,p,m),k;if(h)k=j({inputs:{x:n},backend:e,attrs:{shape:f}});else if(g||x){C.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let E=ee.computeOutShape(b,w,v),R=Bo({inputs:{x:n},backend:e,attrs:{begin:b,size:E}});k=j({inputs:{x:R},backend:e,attrs:{shape:f}}),e.disposeIntermediateTensorInfo(R)}else if(e.shouldExecuteOnCPU([n])){let R=e.readSync(n.dataId),A=nt(n.shape,n.dtype,R),F=_2(d,A,v,b);k=e.makeTensorInfo(f,n.dtype,F.values)}else{let R=new md(b,v,d);k=e.runWebGLProgram(R,[n],n.dtype)}let N=j({inputs:{x:k},backend:e,attrs:{shape:f}});return e.disposeIntermediateTensorInfo(k),N}var yT={kernelName:ii,backendName:"webgl",kernelFunc:Qq};function Zq(o){let{inputs:t,backend:e,attrs:r}=o,{separator:n,nGramWidths:s,leftPad:i,rightPad:a,padWidth:u,preserveShortSequences:c}=r,{data:l,dataSplits:p}=t,m=e.readSync(l.dataId),d=e.readSync(p.dataId),[f,h]=O2(m,d,n,s,i,a,u,c);return[e.makeTensorInfo([f.length],"string",f),e.makeTensorInfo(p.shape,"int32",h)]}var wT={kernelName:ai,backendName:"webgl",kernelFunc:Zq};function Jq(o){let{inputs:t,backend:e,attrs:r}=o,{skipEmpty:n}=r,{input:s,delimiter:i}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);let a=e.readSync(s.dataId),u=e.readSync(i.dataId)[0],[c,l,p]=M2(a,u,n),m=l.length;return[e.makeTensorInfo([m,2],"int32",c),e.makeTensorInfo([m],"string",l),e.makeTensorInfo([2],"int32",new Int32Array(p))]}var ST={kernelName:du,backendName:"webgl",kernelFunc:Jq};function t6(o){let{inputs:t,backend:e,attrs:r}=o,{numBuckets:n}=r,{input:s}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let i=e.readSync(s.dataId),a=L2(i,n);return e.makeTensorInfo(s.shape,"int32",a)}var vT={kernelName:fu,backendName:"webgl",kernelFunc:t6};var e6="return tan(x);",o6=ct({opSnippet:e6}),IT={kernelName:"Tan",backendName:"webgl",kernelFunc:o6};var r6=`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`,n6=ct({opSnippet:r6}),kT={kernelName:on,backendName:"webgl",kernelFunc:n6};function s6(o){let{inputs:t,backend:e,attrs:r}=o,{tensor:n,indices:s,updates:i}=t,{}=r,{sliceRank:a,numUpdates:u,sliceSize:c,strides:l,outputSize:p}=y.calculateShapes(i,s,n.shape),m=[p/c,c];if(p===0)return e.makeTensorInfo(n.shape,s.dtype);let d=j({inputs:{x:s},backend:e,attrs:{shape:[u,a]}}),f=j({inputs:{x:i},backend:e,attrs:{shape:[u,c]}}),h=j({inputs:{x:n},backend:e,attrs:{shape:m}}),g=new Ai(u,a,d.shape.length,f.shape.length,l,m,!1,!0),x=e.runWebGLProgram(g,[f,d,h],h.dtype),b=j({inputs:{x},backend:e,attrs:{shape:n.shape}});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(x),b}var $T={kernelName:js,backendName:"webgl",kernelFunc:s6};var dd=class{constructor(t,e){this.variableNames=["A"];let r=new Array(t.length);for(let i=0;i<r.length;i++)r[i]=t[i]*e[i];this.outputShape=r,this.rank=r.length;let n=xt(this.rank),s=i6(t);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        setOutput(getA(${s}));
      }
    `}};function i6(o){let t=o.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(t===1)return`imod(resRC, ${o[0]})`;let e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],r=[];for(let n=0;n<o.length;n++)r.push(`imod(${e[n]}, ${o[n]})`);return r.join()}function mC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{reps:s}=r;if(n.dtype==="string"||n.shape.length>5){let u=e.readSync(n.dataId),c=n.dtype==="string"?u.map(m=>C.decodeString(m)):u,l=nt(n.shape,n.dtype,c),p=z2(l,s);return e.makeTensorInfo(p.shape,p.dtype,p.values)}let i=new dd(n.shape,s);return e.runWebGLProgram(i,[n],n.dtype)}var TT={kernelName:qo,backendName:"webgl",kernelFunc:mC};var fd=class{constructor(t){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=t,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}},hd=class{constructor(t){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=t,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}};function za(o,t){t!==null&&o.disposeIntermediateTensorInfo(t)}function NT(o){let t=1;for(;t<o;)t*=2;return t}function a6(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{k:s,sorted:i}=r,a=D().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),u=D().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),c=n.shape,l=c[c.length-1];if(e.shouldExecuteOnCPU([n])||l<a||s>u){let F=e.readSync(n.dataId),[P,_]=V2(F,c,n.dtype,s,i);return[e.makeTensorInfo(P.shape,P.dtype,P.values),e.makeTensorInfo(_.shape,_.dtype,_.values)]}if(s===0)return c[c.length-1]=0,[e.makeTensorInfo(c,n.dtype,[]),e.makeTensorInfo(c,"int32",[])];if(l===1)return[n,kn({attrs:{shape:c,dtype:"int32",value:0},backend:e})];let p=e.texData.get(n.dataId),m=p!==null&&p.isPacked,d=m?e.unpackTensor(n):n,h=C.sizeFromShape(c)/l,g=j({inputs:{x:d},attrs:{shape:[h,l]},backend:e});m&&za(e,d);let x=NT(s),b=NT(l),w=null,v=()=>w===null?[g,g]:[g,w],k=(F,P,_)=>{let O=v(),M=new fd(_),W=[[l],[w===null?1:0],[Number.NEGATIVE_INFINITY],[F],[P]],X=w;w=e.runWebGLProgram(M,O,"int32",W),za(e,X)};for(let F=1;F<x;F*=2){let P=F*2;for(let _=F;_>=1;_/=2)k(P,_,[h,b])}for(let F=b;F>x;F/=2){let P=v(),_=new hd([h,F/2]),M=[[l],[w===null?1:0],[x]],L=w;w=e.runWebGLProgram(_,P,"int32",M),za(e,L);let W=x/2,X=W*2;for(let U=W;U>=1;U/=2)k(X,U,w.shape)}let N=w;w=Bo({inputs:{x:w},backend:e,attrs:{begin:0,size:[h,s]}}),za(e,N);let E=sC({inputs:{x:g,indices:w},backend:e,attrs:{axis:1,batchDims:1}});za(e,g);let R=c.slice(0,-1);R.push(s),N=w,w=j({inputs:{x:w},attrs:{shape:R},backend:e}),za(e,N);let A=E;return E=j({inputs:{x:E},attrs:{shape:R},backend:e}),za(e,A),[E,w]}var ET={kernelName:li,backendName:"webgl",kernelFunc:a6};var gd=class{constructor(t,e,r,n,s,i){this.variableNames=["Image","Transforms"],this.outputShape=i;let a=r==="nearest"?1:2,u;switch(n){case"constant":u=1;break;case"reflect":u=2;break;case"wrap":u=3;break;case"nearest":u=4;break;default:u=1;break}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${u} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${u} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${u} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${t} && 0 <= coordX && coordX < ${e}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${s});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${s});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${e}));
                float mapY = mapCoord(inY, float(${t}));

                if (${a} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}};function u6(o){let{inputs:t,backend:e,attrs:r}=o,{image:n,transforms:s}=t,{interpolation:i,fillMode:a,fillValue:u,outputShape:c}=r,[l,p,m,d]=n.shape,[f,h]=c??[p,m],g=[l,f,h,d],x=new gd(p,m,i,a,u,g);return e.runWebGLProgram(x,[n,s],"float32")}var RT={kernelName:pi,backendName:"webgl",kernelFunc:u6};function c6(o){let{inputs:t,attrs:e,backend:r}=o,{axis:n}=e,{x:s}=t;ir(s,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let i=r.readSync(s.dataId),{outputValues:a,outputShape:u,indices:c}=W2(i,n,s.shape,s.dtype);return[r.makeTensorInfo(u,s.dtype,a),r.makeTensorInfo([c.length],"int32",c)]}var DT={kernelName:hu,backendName:"webgl",kernelFunc:c6};function l6(o){let{inputs:t,backend:e,attrs:r}=o,{value:n}=t,{axis:s}=r;s<0&&(s+=n.shape.length);let i=n,a=i.shape.length,u=n.shape[s],c=new Array(a-1),l=0;for(let h=0;h<a;h++)h!==s&&(c[l++]=i.shape[h]);let p=[],m=new Array(a).fill(0),d=i.shape.slice();d[s]=1;let f=new Array(u);for(let h=0;h<f.length;h++){m[s]=h;let g=Bo({inputs:{x:i},backend:e,attrs:{begin:m,size:d}}),x=j({inputs:{x:g},backend:e,attrs:{shape:c}});f[h]=x,p.push(g)}return p.forEach(h=>e.disposeIntermediateTensorInfo(h)),f}var AT={kernelName:mi,backendName:"webgl",kernelFunc:l6};var xd=class{constructor(t,e){this.variableNames=["x","segmentIds"];let r=t.windowSize,n=t.batchSize,s=t.inSize,i=t.numSegments,a=i*Math.ceil(s/r);this.outputShape=[n,a];let u="0.0",c="sumValue",l=Math.floor(r/4)*4,p=r%4,m=`
        sumValue += dot(values, segFilter);
    `,d="";s%r>0&&(d=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `);let f="";s%r>0&&(f=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = ${u};

      float getValue(int batch, int inIdx) {
        ${d}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${f}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${i})) * float(${r}));
        int currentSeg = int(mod(float(outIdx), float(${i})));

        float sumValue = 0.0;

        for (int i = 0; i < ${l}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${m}
        }

        int inIdx = inOffset + ${l};
        if (${p===1}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${m}
        } else if (${p===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${m}
        } else if (${p===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${m}
        }
        setOutput(${c});
      }
    `}};function p6(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,segmentIds:s}=t,{numSegments:i}=r,a=n.shape.length,u=[],c=0,l=y.getAxesPermutation([c],a),p=n;l!=null&&(p=Ht({inputs:{x:n},backend:e,attrs:{perm:l}}),u.push(p),c=y.getInnerMostAxes(1,a)[0]);let m=y.segment_util.computeOutShape(p.shape,c,i),d=C.sizeFromShape([p.shape[c]]),f=j({inputs:{x:p},backend:e,attrs:{shape:[-1,d]}});u.push(f);let h=cn(n.dtype),g=(v,k,N,E,R)=>{let A=v.shape[0],F=v.shape[1],P=y.segment_util.segOpComputeOptimalWindowSize(F,R),_={windowSize:P,inSize:F,batchSize:A,numSegments:R},O=new xd(_,k),M=e.compileAndRun(O,[v,N],E);if(u.push(M),M.shape[1]===R)return M;let L=pC({backend:e,attrs:{start:0,stop:R,step:1,dtype:"float32"}}),W=mC({inputs:{x:L},backend:e,attrs:{reps:[F/P]}});return u.push(L),u.push(W),g(M,k,W,E,R)},x=g(f,"unsortedSegmentSum",s,h,i),b=j({inputs:{x},backend:e,attrs:{shape:m}}),w=b;if(l!=null){u.push(b);let v=y.getUndoAxesPermutation(l);w=Ht({inputs:{x:w},backend:e,attrs:{perm:v}})}return u.forEach(v=>e.disposeIntermediateTensorInfo(v)),w}var FT={kernelName:di,backendName:"webgl",kernelFunc:p6};var m6=[h1,x1,C1,b1,w1,S1,v1,I1,T1,N1,E1,R1,D1,A1,F1,P1,_1,O1,M1,L1,B1,V1,W1,U1,G1,X1,Y1,Q1,s1,J1,ek,ok,rk,nk,sk,ik,ak,uk,ck,lk,dk,fk,hk,gk,xk,Ck,bk,yk,wk,Sk,vk,Ik,kk,$k,Tk,Nk,Rk,Dk,Ak,Fk,_k,Ok,Mk,Lk,Bk,zk,Vk,Wk,Uk,n1,Gk,tk,Hk,Kk,qk,i1,Xk,jk,Yk,Qk,Zk,Jk,t$,e$,o$,r$,s$,i$,a$,u$,c$,l$,m$,f$,h$,g$,x$,C$,v$,c1,I$,k$,$$,T$,H1,N$,D$,A$,F$,P$,a1,_$,O$,M$,L$,B$,K1,b$,z$,V$,W$,p1,U$,G$,H$,K$,q$,X$,j$,Y$,Q$,Z$,J$,tT,eT,oT,rT,nT,z1,S$,sT,iT,aT,uT,cT,lT,pT,mT,fT,hT,xT,CT,bT,yT,wT,ST,vT,w$,d1,IT,kT,$T,TT,ET,RT,f1,DT,AT,FT,E$];for(let o of m6)Qi(o);var lo=D();lo.registerFlag("WEBGPU_DEFERRED_SUBMIT_BATCH_SIZE",()=>15);lo.registerFlag("WEBGPU_CPU_FORWARD",()=>!0);lo.registerFlag("WEBGPU_MATMUL_PROGRAM_TYPE",()=>-1);lo.registerFlag("WEBGPU_USE_NAIVE_CONV2D_TRANSPOSE",()=>!0);lo.registerFlag("WEBGPU_USE_LOW_POWER_GPU",()=>!1);lo.registerFlag("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e3);lo.registerFlag("WEBGPU_USE_PROFILE_TOOL",()=>!1);lo.registerFlag("WEBGPU_IMPORT_EXTERNAL_TEXTURE",()=>!0);lo.registerFlag("WEBGPU_USE_NAIVE_CONV2D_DEBUG",()=>!1);lo.registerFlag("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL",()=>-1);lo.registerFlag("WEBGPU_CONV_SEPARATE_IM2COL_SHADER",()=>!1);lo.registerFlag("WEBGPU_PRINT_SHADER",()=>"");lo.registerFlag("WEBGPU_ENGINE_COMPILE_ONLY",()=>!1);var Cd=class{constructor(t){t&&(this.vendor=t.vendor,this.architecture=t.architecture,this.intelGPUGeneration=this.getIntelGPUGeneration())}getIntelGPUGeneration(){if(this.isIntel()){if(this.architecture.startsWith("gen"))return Number(this.architecture.match(/\d+/));if(this.architecture.startsWith("xe"))return 12}return 0}isIntel(){return this.vendor==="intel"}};var bd=class{constructor(t){this.device=t,this.numUsedBuffers=0,this.numFreeBuffers=0,this.freeBuffers=new Map,this.usedBuffers=new Map,this.numBytesUsed=0,this.numBytesAllocated=0}acquireBuffer(t,e,r=!1,n=!0){let s,i=PT(t,e);return n?(this.freeBuffers.has(i)||this.freeBuffers.set(i,[]),this.freeBuffers.get(i).length>0?(s=this.freeBuffers.get(i).pop(),this.numFreeBuffers--):(s=this.device.createBuffer({size:t,usage:e,mappedAtCreation:r}),this.numBytesAllocated+=t)):(s=this.device.createBuffer({size:t,usage:e,mappedAtCreation:r}),this.numBytesAllocated+=t),this.usedBuffers.has(i)||this.usedBuffers.set(i,[]),this.usedBuffers.get(i).push(s),this.numUsedBuffers++,this.numBytesUsed+=t,s}releaseBuffer(t,e=!0){if(this.freeBuffers.size===0)return;let r=t.size,n=t.usage,s=PT(r,n),i=this.usedBuffers.get(s),a=i.indexOf(t);if(a<0)throw new Error("Cannot find the buffer in buffer manager");i[a]=i[i.length-1],i.pop(),this.numUsedBuffers--,this.numBytesUsed-=r,e?(this.freeBuffers.get(s).push(t),this.numFreeBuffers++):(t.destroy(),this.numBytesAllocated-=r)}getNumUsedBuffers(){return this.numUsedBuffers}getNumFreeBuffers(){return this.numFreeBuffers}dispose(){this.freeBuffers.forEach((t,e)=>{t.forEach(r=>{r.destroy()})}),this.usedBuffers.forEach((t,e)=>{t.forEach(r=>{r.destroy()})}),this.freeBuffers=new Map,this.usedBuffers=new Map,this.numUsedBuffers=0,this.numFreeBuffers=0,this.numBytesUsed=0,this.numBytesAllocated=0}};function PT(o,t){return`${o}_${t}`}var yd=class{constructor(t){this.device=t,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures=new Map,this.usedTextures=new Map,this.numBytesUsed=0,this.numBytesAllocated=0}acquireTexture(t,e,r,n){let s=OT(r),i=t*e*s,a=_T(t,e,r,n);if(this.freeTextures.has(a)||this.freeTextures.set(a,[]),this.usedTextures.has(a)||this.usedTextures.set(a,[]),this.numBytesUsed+=i,this.numUsedTextures++,this.freeTextures.get(a).length>0){this.numFreeTextures--;let c=this.freeTextures.get(a).shift();return this.usedTextures.get(a).push(c),c}this.numBytesAllocated+=i;let u=this.device.createTexture({size:[t,e],format:r,usage:n});return this.usedTextures.get(a).push(u),u}releaseTexture(t){if(this.freeTextures.size===0)return;let e=t.width,r=t.height,n=t.format,s=t.usage,i=_T(e,r,n,s);this.freeTextures.has(i)||this.freeTextures.set(i,[]),this.freeTextures.get(i).push(t),this.numFreeTextures++,this.numUsedTextures--;let a=this.usedTextures.get(i),u=a.indexOf(t);if(u<0)throw new Error("Cannot release a texture that was never provided by this texture manager");a.splice(u,1);let c=OT(n),l=e*r*c;this.numBytesUsed-=l}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){this.freeTextures.forEach((t,e)=>{t.forEach(r=>{r.destroy()})}),this.usedTextures.forEach((t,e)=>{t.forEach(r=>{r.destroy()})}),this.freeTextures=new Map,this.usedTextures=new Map,this.numUsedTextures=0,this.numFreeTextures=0,this.numBytesUsed=0,this.numBytesAllocated=0}};function _T(o,t,e,r){return`${o}_${t}_${e}_${r}`}function OT(o){if(o==="rgba8unorm")return 16;throw new Error(`${o} is not supported!`)}function MT(o,t){if(Math.max(...o)>5)throw new Error("Cannot symbolically compute strides for rank > 6 tensor.");let e=o.length,r="xyzwuv",n=o.map(i=>`${t}.${r[i]}`),s=new Array(e-1);s[e-2]=n[e-1];for(let i=e-3;i>=0;--i)s[i]=`(${s[i+1]} * ${n[i+1]})`;return s}var oo=(o,t,e)=>e==="int32"?`atomicAdd(${o}, bitcast<i32>(${t}));`:`
          {
            var oldValue = 0;
            loop {
              let newValueF32 = bitcast<f32>(oldValue) + (${t});
              let newValue = bitcast<i32>(newValueF32);
              let res = atomicCompareExchangeWeak(${o}, oldValue, newValue);
              if res.exchanged {
                break;
              }
              oldValue = res.old_value;
            }
          }`;var $n;(function(o){o[o.FROM_PIXELS=0]="FROM_PIXELS",o[o.DRAW=1]="DRAW"})($n||($n={}));var VT=(o,t,e,r,n)=>{let s={dtype:r.dtype,shape:r.shape},i=f6(e,s,t),a=o.createShaderModule({code:i,label:t.constructor.name}),u=D().get("WEBGPU_PRINT_SHADER");if(u!==""){u=u.toLowerCase();let c=u.split(",");(u==="all"||c.some(l=>t.shaderKey.toLowerCase().includes(l)))&&(console.group(t.shaderKey),console.debug(i),console.groupEnd())}return n?o.createComputePipelineAsync({compute:{module:a,entryPoint:"_start"},label:t.constructor.name,layout:"auto"}):o.createComputePipeline({compute:{module:a,entryPoint:"_start"},label:t.constructor.name,layout:"auto"})},bt=(o,t="f32")=>{switch(o){case 1:return`${t}`;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${o}-component ${t} is not supported.`)}};function Vt(o){if(o<=1)return"i32";if(o===2)return"vec2<i32>";if(o===3)return"vec3<i32>";if(o===4)return"vec4<i32>";if(o===5)return"vec5";if(o===6)return"vec6";throw Error(`GPU for rank ${o} is not yet supported`)}function $o(o){if(o===0)return"x";if(o===1)return"y";if(o===2)return"z";if(o===3)return"w";if(o===4)return"u";if(o===5)return"v";throw Error(`Index ${o} is not yet supported`)}function B(...o){let t;switch(o.length){case 0:t=`
        fn main()
      `;break;case 1:t=`
        fn main(${o[0]} : i32)
      `;break;default:throw Error("Unreachable")}return t}function LT(o,t){let e;return e=`
     ${d6(t)}
      fn _start(@builtin(local_invocation_id) LocalId : vec3<u32>,
                @builtin(global_invocation_id) GlobalId : vec3<u32>,
                @builtin(local_invocation_index) LocalIndex: u32,
                @builtin(workgroup_id) WorkgroupId : vec3<u32>,
                @builtin(num_workgroups) NumWorkgroups : vec3<u32>) {
        localId = LocalId;
        localIndex = LocalIndex;
        globalId = GlobalId;
        numWorkgroups = NumWorkgroups;
        workgroupId = WorkgroupId;
        ${o?"main(getGlobalIndex());":"main();"};
      }
    `,e}function d6(o){return`
  @compute @workgroup_size(${o.workgroupSize[0]}, ${o.workgroupSize[1]}, ${o.workgroupSize[2]})
`}function f6(o,t,e){let r=[],n=e.workgroupSize[0]*e.workgroupSize[1]*e.workgroupSize[2];if(e.outputComponent=e.outputComponent?e.outputComponent:1,r.push(`

      var<private> localId: vec3<u32>;
      var<private> localIndex: u32;
      var<private> globalId: vec3<u32>;
      var<private> numWorkgroups: vec3<u32>;
      var<private> workgroupId: vec3<u32>;

      // Only used when the y/z dimension of workgroup size is 1.
      fn getGlobalIndex() -> i32 {
        ${UT(e)?"  return i32(globalId.x);":`  return i32((workgroupId.z * numWorkgroups.x * numWorkgroups.y +
                workgroupId.y * numWorkgroups.x + workgroupId.x) * ${n}u +
                localIndex);
        `}
      }
    `),e.pixelsOpType!=null){let f=e.pixelsOpType===$n.FROM_PIXELS?`@group(0) @binding(0) var<storage, read_write> result: array<${Fi(t.dtype,e.outputComponent)}>;`:`@group(0) @binding(1) var<storage, read> inBuf : array<${Fi(o[0].dtype,e.outputComponent)}>;`,h=t.shape.length===3?"vec2<i32>":"i32";r.push(`
        struct Uniform {
          outShapeStrides : ${h},
          size            : i32,
          numChannels     : i32,
          alpha           : f32,
        };

        ${f}
        @group(0) @binding(2) var<uniform> uniforms: Uniform;
      `);let g=zT(e);return[BT,r.join(`
`),dl(t.shape),e.getUserCode(),LT(g,e)].join(`
`)}let s,i,a="struct Uniforms { NAN : f32, INFINITY : f32, ";e.variableNames.forEach((f,h)=>{let g=Vt(o[h].shape.length);a+=`${f.charAt(0).toLowerCase()+f.slice(1)}Shape : ${g}, `,s=o[h].shape.length-1,i=Vt(s),a+=`${f.charAt(0).toLowerCase()+f.slice(1)}ShapeStrides: ${i}, `});let u=Vt(t.shape.length);a+=`outShape : ${u}, `,s=t.shape.length-1,i=Vt(s),a+=`
         outShapeStrides: ${i}, `,e.size&&(a+="size : i32, "),e.uniforms&&(a+=e.uniforms),a+="};",a=S6(a),r.push(a),e.atomic?r.push(`
      @group(0) @binding(0) var<storage, read_write> result: array<atomic<i32>>;
    `):r.push(`
      @group(0) @binding(0) var<storage, read_write> result: array<${Fi(t.dtype,e.outputComponent)}>;
    `),e.variableNames.forEach((f,h)=>{r.push(`
      @group(0) @binding(${1+h}) var<storage, read> ${f}: array<${e.variableComponents?Fi(o[h].dtype,e.variableComponents[h]):Fi(o[h].dtype,e.outputComponent)}>;
        `)}),a!==""&&r.push(`
      @group(0) @binding(${1+e.variableNames.length}) var<uniform> uniforms: Uniforms;
      `);let c=b6(t.shape,e.dispatchLayout),l=[BT,r.join(`
`)+h6,dl(t.shape),c,y6(t.shape.length)];e.atomic||l.push(w6(t.shape,t.dtype,e.outputComponent)),e.variableNames.forEach((f,h)=>{l.push(`${dl(o[h].shape,f)}`)});let p=o.map((f,h)=>C6(f,t.shape,e.variableComponents?e.variableComponents[h]:e.outputComponent,e.dispatchLayout.x.length===t.shape.length)).join(`
`);l.push(p),l.push(e.getUserCode());let m=zT(e);return l.push(LT(m,e)),l.join(`
`)}function WT(o,t,e){let r=o.shaderKey;if(o.pixelsOpType!=null)return r;let n=[],s=[];t.forEach(l=>{n.push(l.shape),s.push(l.dtype)}),n.push(e.shape),s.push(e.dtype);let i=t.map(l=>y.getBroadcastDims(l.shape,e.shape)),a=t.map(l=>C.arraysEqual(l.shape,e.shape)).join("_"),u=i.map(l=>l.join("_")).join(";"),c=UT(o)?"flatDispatch":"";return r+="_"+(o.workgroupSize?o.workgroupSize.join(","):"")+n.map(l=>l.length).join(",")+s.join(",")+o.variableNames.join(",")+u+a+c,r}var BT=`
  struct vec5 {x: i32, y: i32, z: i32, w: i32, u: i32};
  struct vec6 {x: i32, y: i32, z: i32, w: i32, u: i32, v: i32};

  // Checks whether coordinates lie within the bounds of the shape.
  fn coordsInBounds2D(coord : vec2<i32>, shape : vec2<i32>) -> bool {
    return all(coord >= vec2<i32>(0)) && all(coord < shape);
  }
  fn coordsInBounds3D(coord : vec3<i32>, shape : vec3<i32>) -> bool {
    return all(coord >= vec3<i32>(0)) && all(coord < shape);
  }
  fn coordsInBounds4D(coord : vec4<i32>, shape : vec4<i32>) -> bool {
    return all(coord >= vec4<i32>(0)) && all(coord < shape);
  }

  fn getIndexFromCoords1D(coord : i32, shape : i32) -> i32 {
    return coord;
  }
  fn getIndexFromCoords2D(coords : vec2<i32>, shape : vec2<i32>) -> i32 {
    return dot(coords, vec2<i32>(shape.y, 1));
  }
  fn getIndexFromCoords3D(coords : vec3<i32>, shape : vec3<i32>) -> i32 {
    return dot(coords, vec3<i32>(shape.y * shape.z, shape.z, 1));
  }
  fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
    return dot(coords, vec4<i32>(
        shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
  }
  fn getIndexFromCoords5D(coords : vec5, shape : vec5) -> i32 {
    let shapeStrides: vec5 = vec5(shape.y * shape.z * shape.w * shape.u, shape.z * shape.w * shape.u, shape.w * shape.u, shape.u, 1);
    return coords.x*shapeStrides.x + coords.y*shapeStrides.y + coords.z*shapeStrides.z + coords.w*shapeStrides.w + coords.u*shapeStrides.u;
  }
  fn getIndexFromCoords6D(coords : vec6, shape : vec6) -> i32 {
    let shapeStrides: vec6 = vec6(shape.y * shape.z * shape.w * shape.u * shape.v, shape.z * shape.w * shape.u * shape.v, shape.w * shape.u * shape.v, shape.u * shape.v, shape.v, 1);
    return coords.x*shapeStrides.x + coords.y*shapeStrides.y + coords.z*shapeStrides.z + coords.w*shapeStrides.w + coords.u*shapeStrides.u + coords.v*shapeStrides.v;
  }

  // NaN defination in IEEE 754-1985 is :
  //   - sign = either 0 or 1.
  //   - biased exponent = all 1 bits.
  //   - fraction = anything except all 0 bits (since all 0 bits represents infinity).
  // https://en.wikipedia.org/wiki/IEEE_754-1985#Representation_of_non-numbers
  fn isnan(val: f32) -> bool {
    let floatToUint: u32 = bitcast<u32>(val);
    return (floatToUint & 0x7fffffffu) > 0x7f800000u;
  }
  fn isnanVec4(val : vec4<f32>) -> vec4<bool> {
    let floatToUint: vec4<u32> = bitcast<vec4<u32>>(val);
    return (floatToUint & vec4<u32>(0x7fffffffu)) > vec4<u32>(0x7f800000u);
  }
`,h6=`
  fn isinf(val: f32) -> bool {
    return abs(val) == uniforms.INFINITY;
  }
`;function dl(o,t=""){let e=o.length,r=t!==""?`get${t.charAt(0).toUpperCase()+t.slice(1)}CoordsFromIndex`:"getCoordsFromIndex",n=t!==""?`${t.charAt(0).toLowerCase()+t.slice(1)}ShapeStrides`:"outShapeStrides";if(e<=1)return`fn ${r}(index : i32) -> i32 { return index; }`;let s=C.computeStrides(o),i=Vt(e),a=[];for(let c=0;c<e;c++)a.push(`d${c}`);if(s.length===1)return`    fn ${r}(index : i32) -> vec2<i32> {
      let d0 = index / uniforms.${n}; let d1 = index - d0 * uniforms.${n};
      return vec2<i32>(d0, d1);
    }`;let u;return u="var index2 = index;"+s.map((c,l)=>{let p=`let ${a[l]} = index2 / uniforms.${n}.${$o(l)}`,m=l===s.length-1?`let ${a[l+1]} = index2 - ${a[l]} * uniforms.${n}.${$o(l)}`:`index2 = index2 - ${a[l]} * uniforms.${n}.${$o(l)}`;return`${p}; ${m};`}).join(""),`
    fn ${r}(index : i32) -> ${i} {
      ${u}
      return ${i}(${a.join(",")});
    }
  `}function g6(o,t){let e=o.name,r=o.shape.length,n=Vt(r),s="get"+e.charAt(0).toUpperCase()+e.slice(1),i=["d0","d1","d2","d3","d4","d5"].slice(0,r),a=i.map(l=>`${l} : i32`).join(", ");if(r<1)return`
      fn ${s}() -> ${bt(t)} {
        return ${bt(t)}(${e}[0]);
      }
    `;let u=`uniforms.${e.charAt(0).toLowerCase()+e.slice(1)}Shape`,c=`${r}D`;return r===0&&(c="1D"),`
    fn ${s}(${a}) -> ${bt(t)} {
      return ${bt(t)}(${e}[getIndexFromCoords${c}(${n}(${i.join(",")}),
        ${u})${t===1?"":` / ${t}`}]);
    }
   `}function x6(o,t,e,r){let n=o.name,s=n.charAt(0).toUpperCase()+n.slice(1),i="get"+s+"ByOutput",a=o.shape.length,u=t.length,c=Vt(u);if(C.arraysEqual(o.shape,t)&&r)return`
    fn ${i}Index(globalIndex : i32) -> ${bt(e)} {
      return ${bt(e)}(${n}[globalIndex]);
    }

    fn ${i}Coords(coords : ${c}) -> ${bt(e)} {
      return ${bt(e)}(${n}[${u>1?"getOutputIndexFromCoords(coords)":"coords"}${e===1?"":` / ${e}`}]);
    }
    `;let l=y.getBroadcastDims(o.shape,t),p=u-a,m="";if(a===0)return`
    fn ${i}Index(globalIndex : i32) -> ${bt(e)}{
      return get${s}();
    }

    fn ${i}Coords(coords : ${c}) -> ${bt(e)}{
      return get${s}();
    }
  `;u<2&&l.length>=1?m="coords = 0;":m=l.map(g=>`coords.${$o(g+p)} = 0;`).join(`
`);let d="";if(u<2&&a>0)d="coords";else if(u>1){let g=Vt(a),x=o.shape.map((b,w)=>`coords.${$o(w+p)}`).join(", ");d=`${g}(${x})`}else d="coords";let f=`uniforms.${n.charAt(0).toLowerCase()+n.slice(1)}Shape`,h=`${a}D`;return`
  fn ${i}Index(globalIndex : i32) -> ${bt(e)} {
    var coords = getCoordsFromIndex(globalIndex);
    ${m}
    return ${bt(e)}(${n}[getIndexFromCoords${h}(${d}, ${f})${e===1?"":` / ${e}`}]);
  }

  fn ${i}Coords(coordsIn : ${c}) -> ${bt(e)} {
    var coords = coordsIn;
    ${m}
    return ${bt(e)}(${n}[getIndexFromCoords${h}(${d}, ${f})${e===1?"":` / ${e}`}]);
  }
`}function C6(o,t,e,r){let n=g6(o,e);return o.shape.length<=t.length&&(n+=x6(o,t,e,r)),n}function b6(o,t){let{x:e,y:r=[],z:n=[]}=t,s=o.length,i=e.length+r.length+n.length;if(i!==s)return"";if(e.length===s)return`fn getOutputCoords() -> ${Vt(s)}{
    let globalIndex = getGlobalIndex();
    return getCoordsFromIndex(globalIndex);
  }
  `;let a="",u=[e,r,n];for(let m=0;m<u.length;m++){let d=u[m];if(d.length!==0)if(d.length===1)a+=`let d${d[0]} = i32(globalId[${m}]);`;else{let f=MT(d,"uniforms.outShape");a+=`var index${m} = i32(globalId[${m}]);`;for(let h=0;h<f.length;h++)a+=`let d${d[h]} = index${m} / ${f[h]};`,h===f.length-1?a+=`let d${d[h+1]} = index${m} - d${d[h]} * ${f[h]};`:a+=`index${m} = index${m} - d${d[h]} * ${f[h]};`}}let c=[];for(let m=0;m<i;m++)c.push(`d${m}`);let l=Vt(i),p=`fn getOutputCoords() -> ${l} {
  ${a}
`;return c.length===0?p+=`return ${l}(0); }`:p+=`return ${l}(${c.join(",")}); }`,p}function y6(o){let t="";switch(o){case 0:case 1:t+=`
        fn getOutputIndexFromCoords(coords : i32) -> i32 {
          return coords;
        }
        `;break;case 2:t+=`
        fn getOutputIndexFromCoords(coords : vec2<i32>) -> i32 {
          return dot(coords, vec2<i32>(uniforms.outShapeStrides, 1));
        }
        `;break;case 3:t+=`
        fn getOutputIndexFromCoords(coords : vec3<i32>) -> i32 {
          return dot(coords, vec3<i32>(uniforms.outShapeStrides.x, uniforms.outShapeStrides.y, 1));
        }
        `;break;case 4:t+=`
        fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
          return dot(coords, vec4<i32>(
            uniforms.outShapeStrides.x, uniforms.outShapeStrides.y, uniforms.outShapeStrides.z, 1));
        }
        `;break;case 5:t+=`
        fn getOutputIndexFromCoords(coords : vec5) -> i32 {
          return coords.x * uniforms.outShapeStrides.x +
              coords.y * uniforms.outShapeStrides.y +
              coords.z * uniforms.outShapeStrides.z +
              coords.w * uniforms.outShapeStrides.w +
              coords.u;
        }
        `;break;case 6:t+=`
        fn getOutputIndexFromCoords(coords : vec6) -> i32 {
          return coords.x * uniforms.outShapeStrides.x +
              coords.y * uniforms.outShapeStrides.y +
              coords.z * uniforms.outShapeStrides.z +
              coords.w * uniforms.outShapeStrides.w +
              coords.u * uniforms.outShapeStrides.u +
              coords.v;
        }
        `;break;default:C.assert(!1,()=>`Unsupported ${o}D shape`);break}return t}function UT(o){return o.dispatch[1]===1&&o.dispatch[2]===1}function Fi(o,t=1){if(o==="float32")return bt(t,"f32");if(o==="int32"||o==="bool")return bt(t,"i32");throw new Error(`type ${o} is not supported.`)}function w6(o,t,e){let r=o.length,n=Fi(t,e),s=`fn setOutputAtIndex(flatIndex : i32, value : ${bt(e)}) {
      result[flatIndex] = ${n}(value);
    }

    fn setOutputAtIndexI32(flatIndex : i32, value : ${bt(e,"i32")}) {
      result[flatIndex] = ${n}(value);
    }
    `;if(r>=2){let i=["d0","d1","d2","d3","d4","d5"].slice(0,r),a=Vt(r);s+=`
      fn setOutputAtCoords(${i.map(u=>`${u} : i32`).join(", ")}, value : ${bt(e)}) {
        let flatIndex = getOutputIndexFromCoords(${a}(${i.join(", ")}));
        setOutputAtIndex(flatIndex${e===1?"":` / ${e}`}, value);
      }
      fn setOutputAtCoordsI32(${i.map(u=>`${u} : i32`).join(", ")}, value : ${bt(e,"i32")}) {
        let flatIndex = getOutputIndexFromCoords(${a}(${i.join(", ")}));
        setOutputAtIndexI32(flatIndex${e===1?"":` / ${e}`}, value);
      }
    `}return s}function S6(o){let t=/(\w+)\s*:\s*vec(5|6)/g;o=o.replace(t,r=>"@align(16) "+r);let e=/vec(5|6)\s*,\s*(\w+)/g;return o=o.replace(e,(r,n,s)=>`vec${n}, @align(16) ${s}`),o}function zT(o){return!(o.dispatchLayout.hasOwnProperty("y")&&o.dispatchLayout.y.length!==0||o.dispatchLayout.hasOwnProperty("z")&&o.dispatchLayout.z.length!==0)}var Va=o=>{let t=1;for(let e=0;e<o.length;e++)t*=o[e];return t};function z(o,t,e=[1,1,1],r=[1,1,1]){let[n,s,i]=[Math.ceil(Va(o.x.map(a=>t[a]))/(e[0]*r[0])),o.y?Math.ceil(Va(o.y.map(a=>t[a]))/(e[1]*r[1])):1,o.z?Math.ceil(Va(o.z.map(a=>t[a]))/(e[2]*r[2])):1];return[n,s,i]}function GT(o,t,e,r=!1){let n=[8,8,1],s=[4,4,1];return r||(o<=8&&(s[1]=1),t<=16&&e<=16&&(n[0]=4)),{workgroupSize:n,elementsPerThread:s}}function wd(o,t,e=!1){if(e)return[8,8,1];let r=Va(o.x.map(s=>t[s])),n=Va(o.y.map(s=>t[s]));return r<=4?[4,16,1]:n<=4?[16,4,1]:[16,16,1]}function Sd(o,t,e=!1){if(e)return[4,4,1];let r=Va(o.x.map(s=>t[s])),n=Va(o.y.map(s=>t[s]));return r<=4?[1,2,1]:n<=4?[2,1,1]:[2,2,1]}function G(o){return{x:o.map((t,e)=>e)}}function dC(o){if(o==="float32"||o==="int32"||o==="bool"||o==="string")return 4;if(o==="complex64")return 8;throw new Error(`Unknown dtype ${o}`)}function vd(){return!!(typeof globalThis<"u"&&globalThis.navigator&&globalThis.navigator.gpu)}function Id(o,t){Array.isArray(o)||(o=[o]),o.forEach(e=>{e!=null&&C.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the WebGPU backend.`)})}var zo;(function(o){o[o.MatMulReduceProgram=0]="MatMulReduceProgram",o[o.MatMulSplitKProgram=1]="MatMulSplitKProgram",o[o.MatMulSmallOutputSizeProgram=2]="MatMulSmallOutputSizeProgram",o[o.MatMulPackedProgram=3]="MatMulPackedProgram",o[o.MatMulMax=4]="MatMulMax"})(zo||(zo={}));var I6=D().getNumber("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD"),k6=(o,t)=>{let e=o.limits.maxComputeWorkgroupsPerDimension,r=t.dispatchLayout,n=t.dispatch;if(n.every(i=>i<=e))return n;C.assert(n[0]>e&&r.y===void 0&&r.z===void 0,()=>"Dispatch size exceeds WebGPU limits in Y or Z dimension.");let s=Math.ceil(Math.sqrt(n[0]));return s>e?(s=Math.ceil(Math.cbrt(n[0])),C.assert(s<=e,()=>"Total dispatch size exceeds WebGPU maximum."),[s,s,s]):[s,s,1]},ic=class o extends No{nextDataId(){return o.nextDataId++}constructor(t,e){if(super(),this.commandQueueOwnedIds=new WeakSet,this.dispatchCountInPass=0,this.disposed=!1,this.downloadWaitMs=0,this.tensorDataPendingDisposal=[],this.queryResolveBuffer=null,this.querySet=null,this.querySetCount=2,this.stagingPendingDisposal=[],this.uniformPendingDisposal=[],this.uploadWaitMs=0,this.hasReadSyncWarned=!1,this.hasTimestampQueryWarned=!1,!vd())throw new Error("WebGPU is not supported on this device");this.pipelineCache={},this.device=t,this.queue=t.queue,this.commandEncoder=null,this.computePassEncoder=null,this.adapterInfo=new Cd(e),this.supportTimestampQuery=this.device.features.has("timestamp-query"),this.thresholdToIncreaseWorkgroups=this.adapterInfo.intelGPUGeneration>=12?16:8,this.bufferManager=new bd(this.device),this.textureManager=new yd(this.device),this.tensorMap=new mr(this,Be()),D().getBool("WEBGPU_USE_PROFILE_TOOL")&&(this.dummyCanvas=document.createElement("canvas"),this.dummyCanvas.width=1,this.dummyCanvas.height=1,this.dummyContext=this.dummyCanvas.getContext("webgpu"),this.dummyContext.configure({device:t,format:"bgra8unorm"}),document.body.appendChild(this.dummyCanvas))}floatPrecision(){return 32}disposeData(t,e=!1){if(!this.tensorMap.has(t))return!0;let r=this.tensorMap.get(t);return e?r.refCount=0:r.refCount--,r.refCount>0?!1:(r.complexTensorInfos!=null&&(this.disposeData(r.complexTensorInfos.real.dataId),this.disposeData(r.complexTensorInfos.imag.dataId)),this.commandQueueOwnedIds.has(t)?(this.tensorDataPendingDisposal.push(t),!0):(this.releaseResource(t),this.tensorMap.delete(t),!0))}memory(){return{numBytesInGPU:this.bufferManager.numBytesUsed,numBytesAllocatedInGPU:this.bufferManager.numBytesAllocated,unreliable:!1}}releaseResource(t){let e=this.tensorMap.get(t);if(!(!e||!e.resource)){if(e.external){e.resource=null;return}e.resource instanceof GPUBuffer?this.bufferManager.releaseBuffer(e.resource):e.resource instanceof GPUTexture&&this.textureManager.releaseTexture(e.resource),e.resource=null}}refCount(t){return this.tensorMap.has(t)?this.tensorMap.get(t).refCount:0}incRef(t){let e=this.tensorMap.get(t);e.refCount++}decRef(t){if(this.tensorMap.has(t)){let e=this.tensorMap.get(t);e.refCount--}}write(t,e,r){if(r==="complex64"&&t!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let n={id:this.nextDataId()};return this.tensorMap.set(n,{dtype:r,shape:e,values:t,refCount:1}),n}move(t,e,r,n,s){if(n==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.tensorMap.set(t,{dtype:n,shape:r,values:e,refCount:s})}submitQueue(){this.queue.submit([this.commandEncoder.finish()]),this.commandEncoder=null,this.dispatchCountInPass=0,this.commandQueueOwnedIds=new WeakSet,this.tensorDataPendingDisposal.forEach(t=>{this.releaseResource(t),this.tensorMap.delete(t)}),this.uniformPendingDisposal.forEach(t=>this.bufferManager.releaseBuffer(t)),this.stagingPendingDisposal.forEach(t=>this.bufferManager.releaseBuffer(t,!1)),this.tensorDataPendingDisposal=[],this.uniformPendingDisposal=[],this.stagingPendingDisposal=[]}ensureCommandEncoderReady(){this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder())}endComputePassEncoder(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}async checkCompileCompletionAsync(){let t;try{t=await Promise.all(Object.values(this.pipelineCache))}catch(e){throw new Error(e.message)}Object.keys(this.pipelineCache).map((e,r)=>{this.pipelineCache[e]=t[r]})}async getBufferData(t){if(D().getBool("WEBGPU_ENGINE_COMPILE_ONLY"))return console.warn("The data may be invalid since WEBGPU_ENGINE_COMPILE_ONLY is true, this can only be called when WEBGPU_ENGINE_COMPILE_ONLY is false"),null;let e=t.size,r=this.bufferManager.acquireBuffer(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ);this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(t,0,r,0,e),this.submitQueue(),await r.mapAsync(GPUMapMode.READ);let n=r.getMappedRange().slice(0);return r.unmap(),r!=null&&this.bufferManager.releaseBuffer(r),D().getBool("WEBGPU_USE_PROFILE_TOOL")&&(C.assert(this.dummyContext!==void 0,()=>"Fail to get context for profiling tool"),this.dummyContext.getCurrentTexture()),n}convertAndCacheOnCPU(t,e){let r=this.tensorMap.get(t);return r.values=e,r.values}readSync(t){let e=this.tensorMap.get(t),{values:r,complexTensorInfos:n}=e;if(r!=null||e.dtype==="string")return r;if(e.dtype==="complex64"){let h=this.readSync(n.real.dataId),g=this.readSync(n.imag.dataId),x=C.convertBackendValuesAndArrayBuffer(y.mergeRealAndImagArrays(h,g).buffer,"float32");return this.convertAndCacheOnCPU(t,x),x}this.hasReadSyncWarned||(this.hasReadSyncWarned=!0,console.warn("The performance of synchronously reading data from GPU to CPU is poor on the webgpu backend, please use asynchronous APIs instead."));let s=["opaque","premultiplied"],i=e.resource,a=i.size;C.assert(a%4===0,()=>"Because there is 4 bytes for one pixel, buffer size must be multiple of 4.");let u=a/4,c=new ArrayBuffer(a),l=256,p=256,m=s.map(h=>new OffscreenCanvas(l,p)),d=new OffscreenCanvas(l,p);this.endComputePassEncoder(),m.map((h,g)=>{let x=h.getContext("webgpu");return x.configure({device:this.device,format:"bgra8unorm",usage:GPUTextureUsage.COPY_DST,alphaMode:s[g]}),x.getCurrentTexture()}).map((h,g)=>{let x=l*4,b=(R,A,F)=>{this.ensureCommandEncoderReady(),this.commandEncoder.copyBufferToTexture({buffer:i,bytesPerRow:x,offset:F},{texture:h},{width:R,height:A}),this.submitQueue();let P=d.getContext("2d",{willReadFrequently:!0});P.clearRect(0,0,R,A),P.drawImage(m[g],0,0);let _=P.getImageData(0,0,R,A).data,O=s[g],M=new Uint8ClampedArray(c,F,R*A*4);for(let L=0;L<M.length;L+=4)if(O==="premultiplied")M[L+3]=_[L+3];else{let W=_[L];M[L]=_[L+2],M[L+1]=_[L+1],M[L+2]=W}},w=Math.floor(u/(l*p)),v=l,k=p,N=0;for(let R=0;R<w;R++)b(v,k,N),N+=l*p*4;let E=u%(l*p);k=Math.floor(E/l),k>0&&(b(v,k,N),N+=k*(l*4)),v=E%l,v>0&&b(v,1,N)});let f=C.convertBackendValuesAndArrayBuffer(c,e.dtype);return this.convertAndCacheOnCPU(t,f),f}async read(t){if(!this.tensorMap.has(t))throw new Error(`Tensor ${t} was not registered!`);let e=this.tensorMap.get(t),{values:r}=e;if(r!=null)return r;let n;if(e.dtype==="complex64"){let s=await Promise.all([this.read(e.complexTensorInfos.real.dataId),this.read(e.complexTensorInfos.imag.dataId)]),i=s[0],a=s[1];n=y.mergeRealAndImagArrays(i,a)}else{let s=await this.getBufferData(e.resource);n=C.convertBackendValuesAndArrayBuffer(s,e.dtype)}return this.convertAndCacheOnCPU(t,n),n}copyBuffer(t){let e=t.size,r=t.usage,n=this.bufferManager.acquireBuffer(e,r);return this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(t,0,n,0,e),this.submitQueue(),n}createTensorFromGPUData(t,e,r){let n=t.buffer;if(r==="complex64")throw new Error("Cannot write to a complex64 dtype. ");let s={id:this.nextDataId()};this.tensorMap.set(s,{dtype:r,shape:e,values:null,refCount:1,external:t.zeroCopy});let i=this.tensorMap.get(s),a=dC(i.dtype)*C.sizeFromShape(i.shape);if(t.buffer.size<a)throw new Error(`GPUBuffer size(${t.buffer.size}) is smaller than tensor size(${a})!`);if((t.buffer.usage&(GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC))!==(GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC))throw new Error("GPUBuffer.usage should include GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC!");return t.zeroCopy!==!0&&(n=this.copyBuffer(n)),i.resource=n,Be().makeTensorFromDataId(s,e,r,this)}readToGPU(t){let e=this.tensorMap.get(t),{values:r,dtype:n,shape:s,resource:i}=e;if(n==="complex64")throw new Error("Does not support reading buffer for complex64 dtype.");if(i==null)throw r!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");let a=i,u=a.size,c=a.usage,l=this.bufferManager.acquireBuffer(u,c);this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(i,0,l,0,u),this.submitQueue();let p=this.makeTensorInfo(s,n),m=Be().makeTensorFromTensorInfo(p),d=this.tensorMap.get(p.dataId);return d.resource=l,{tensorRef:m,buffer:l}}bufferSync(t){let e=this.readSync(t.dataId);if(t.dtype==="string")try{let r=e.map(n=>C.decodeString(n));return nt(t.shape,t.dtype,r)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return nt(t.shape,t.dtype,e)}async time(t){!this.supportTimestampQuery&&!this.hasTimestampQueryWarned&&(console.warn("This device doesn't support timestamp-query extension. Start Chrome browser with flag --enable-dawn-features=allow_unsafe_apis to try it again. Otherwise, zero will be shown for the kernel time when profiling mode is enabled."),this.hasTimestampQueryWarned=!0);let e=this.activeTimers,r=[],n=!1;this.programTimersStack==null?(this.programTimersStack=r,n=!0):this.activeTimers.push(r),this.activeTimers=r,t();let s=C.flatten(this.activeTimers.map(c=>c.query)).filter(c=>c!=null),i=C.flatten(this.activeTimers.map(c=>c.name)).filter(c=>c!=null);this.activeTimers=e,n&&(this.programTimersStack=null);let a={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},u=await Promise.all(s);return a.kernelMs=C.sum(u),a.getExtraProfileInfo=()=>u.map((c,l)=>({name:i[l],ms:c})).map(c=>`${c.name}: ${c.ms}`).join(", "),this.uploadWaitMs=0,this.downloadWaitMs=0,a}makeTensorInfo(t,e,r){return e==="string"&&r!=null&&r.length>0&&C.isString(r[0])&&(r=r.map(s=>C.encodeString(s))),{dataId:this.write(r,t,e),shape:t,dtype:e}}tensorToBinding(t){if(!t)return null;let r=this.tensorMap.get(t.dataId).resource;return r instanceof GPUBuffer?{buffer:r}:r instanceof GPUTexture?r.createView():r}uploadToGPU(t){let e=this.tensorMap.get(t);if(e.resource!=null)return;let r=dC(e.dtype)*C.sizeFromShape(e.shape),n,s=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST;if(e.values){if(n=this.bufferManager.acquireBuffer(r,s,!0),n.mapState==="unmapped"){let i=this.bufferManager.acquireBuffer(r,GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC,!0,!1),a=i.getMappedRange();e.dtype==="int32"||e.dtype==="bool"?new Int32Array(a).set(e.values):new Float32Array(a).set(e.values),i.unmap(),this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(i,0,n,0,r),this.stagingPendingDisposal.push(i)}else{let i=n.getMappedRange();e.dtype==="int32"||e.dtype==="bool"?new Int32Array(i).set(e.values):new Float32Array(i).set(e.values),n.unmap()}e.values=null}else n=this.bufferManager.acquireBuffer(r,s);e.resource=n}makeUniforms(t){let e=0,r=0,n=[],s=1;t.forEach(u=>{u.data.length===0&&(u.data=[1]);let c;switch(u.data.length){case 1:c=4;break;case 2:c=8;break;case 3:c=16;break;case 4:c=16;break;case 5:c=16;break;case 6:c=16;break;default:C.assert(!1,()=>`Unsupported ${u.data.length}D shape`)}(r===5||r===6)&&(c=16),c>s&&(s=c),e=Math.ceil(e/c)*c,r=u.data.length,n.push(e),e+=u.data.length*4}),e=Math.ceil(e/s)*s;let i=new ArrayBuffer(e);t.forEach((u,c)=>{let l=n[c];u.type==="int32"?new Int32Array(i,l,u.data.length).set(u.data):u.type==="uint32"?new Uint32Array(i,l,u.data.length).set(u.data):new Float32Array(i,l,u.data.length).set(u.data)});let a=this.bufferManager.acquireBuffer(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);return this.queue.writeBuffer(a,0,i,0,e),this.uniformPendingDisposal.push(a),{offset:0,size:e,buffer:a}}runWebGPUProgram(t,e,r,n,s){if(s||(s=this.makeTensorInfo(t.outputShape,r)),C.sizeFromShape(s.shape)===0)return this.tensorMap.get(s.dataId).values=C.getTypedArrayFromDType(s.dtype,0),s;this.uploadToGPU(s.dataId),t.dispatch=k6(this.device,t);let i=e.map((u,c)=>{if(u.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");return this.uploadToGPU(u.dataId),{dtype:this.tensorMap.get(u.dataId).dtype,shape:u.shape,name:t.variableNames[c]}});t.shaderKey=WT(t,i,s);let a=D().getBool("WEBGPU_ENGINE_COMPILE_ONLY");return t.shaderKey in this.pipelineCache||(this.pipelineCache[t.shaderKey]=VT(this.device,t,i,s,a)),t.pipeline=this.pipelineCache[t.shaderKey],a||this.recordAndSubmit(t,s,e,n),s}recordAndSubmit(t,e,r,n){if(t.pipeline instanceof Promise)throw new Error("Please call checkCompileCompletionAsync to ensure parallel compilation is done!");let s=[],i=[],a="int32";if(t.pixelsOpType==null){s.push({type:"float32",data:[NaN]},{type:"float32",data:[1/0]}),i=r.concat(e).map(d=>d.shape);let m="int32";i.map(d=>{s.push({type:m,data:d});let f=C.computeStrides(d);s.push({type:m,data:f})})}else{let m=C.computeStrides(e.shape);s.push({type:a,data:m})}if(t.size){let m=C.sizeFromShape(t.outputShape);s.push({type:a,data:[t.outputComponent?m/t.outputComponent:m]})}n&&(s=[...s,...n]);let u=[this.tensorToBinding(e),...r.map(m=>this.tensorToBinding(m)),this.makeUniforms(s)];r.forEach(m=>{this.commandQueueOwnedIds.add(m.dataId)}),this.commandQueueOwnedIds.add(e.dataId);let c=this.device.createBindGroup({layout:t.pipeline.getBindGroupLayout(0),entries:u.map((m,d)=>({binding:d,resource:m}))}),l=this.activeTimers!=null;this.ensureCommandEncoderReady();let p={};l&&this.supportTimestampQuery?(this.endComputePassEncoder(),this.querySet==null&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.querySetCount})),p.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1},this.computePassEncoder=this.commandEncoder.beginComputePass(p)):this.computePassEncoder||(this.computePassEncoder=this.commandEncoder.beginComputePass(p)),this.computePassEncoder.setPipeline(t.pipeline),this.computePassEncoder.setBindGroup(0,c),this.computePassEncoder.dispatchWorkgroups(t.dispatch[0],t.dispatch[1],t.dispatch[2]),this.dispatchCountInPass++,(l||D().get("WEBGPU_DEFERRED_SUBMIT_BATCH_SIZE")<=this.dispatchCountInPass||t.pixelsOpType===$n.DRAW)&&(this.endComputePassEncoder(),l?this.activeTimers.push({name:t.constructor.name,query:this.getQueryTime()}):this.submitQueue())}async getQueryTime(){if(!this.supportTimestampQuery)return 0;this.queryResolveBuffer==null&&(this.queryResolveBuffer=this.bufferManager.acquireBuffer(this.querySetCount*8,GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST|GPUBufferUsage.QUERY_RESOLVE)),this.commandEncoder.resolveQuerySet(this.querySet,0,this.querySetCount,this.queryResolveBuffer,0);let t=this.bufferManager.acquireBuffer(this.querySetCount*8,GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST);this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.querySetCount*8),this.submitQueue(),await t.mapAsync(GPUMapMode.READ);let e=new BigUint64Array(t.getMappedRange()),r=Number(e[1]-e[0])/1e6;return t.unmap(),this.bufferManager.releaseBuffer(t),r}shouldExecuteOnCPU(t,e=I6){return D().getBool("WEBGPU_CPU_FORWARD")&&t.every(r=>this.tensorMap.get(r.dataId).resource==null&&C.sizeFromShape(r.shape)<e)}numDataIds(){return this.tensorMap.numDataIds()-this.tensorDataPendingDisposal.length}dispose(){this.disposed||(this.querySet!=null&&this.querySet.destroy(),this.bufferManager.dispose(),this.textureManager.dispose(),this.disposed=!0)}};ic.nextDataId=0;vd()&&vu("webgpu",async()=>{let o={powerPreference:D().get("WEBGPU_USE_LOW_POWER_GPU")?"low-power":"high-performance"},t=await navigator.gpu.requestAdapter(o),e={},r=[];t.features.has("timestamp-query")&&r.push("timestamp-query"),t.features.has("bgra8unorm-storage")&&r.push(["bgra8unorm-storage"]),e.requiredFeatures=r;let n=t.limits;e.requiredLimits={maxComputeWorkgroupStorageSize:n.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.maxStorageBufferBindingSize,maxBufferSize:n.maxBufferSize,maxComputeWorkgroupSizeX:n.maxComputeWorkgroupSizeX,maxComputeInvocationsPerWorkgroup:n.maxComputeInvocationsPerWorkgroup};let s=await t.requestDevice(e),i="info"in t?t.info:"requestAdapterInfo"in t?await t.requestAdapterInfo():void 0;return new ic(s,i)},3);var at;(function(o){o[o.ADD=0]="ADD",o[o.ATAN2=1]="ATAN2",o[o.COMPLEX_MULTIPLY_IMAG=2]="COMPLEX_MULTIPLY_IMAG",o[o.COMPLEX_MULTIPLY_REAL=3]="COMPLEX_MULTIPLY_REAL",o[o.DIV=4]="DIV",o[o.ELU_DER=5]="ELU_DER",o[o.EQUAL=6]="EQUAL",o[o.FLOOR_DIV=7]="FLOOR_DIV",o[o.GREATER=8]="GREATER",o[o.GREATER_EQUAL=9]="GREATER_EQUAL",o[o.LESS=10]="LESS",o[o.LESS_EQUAL=11]="LESS_EQUAL",o[o.LOGICAL_AND=12]="LOGICAL_AND",o[o.LOGICAL_OR=13]="LOGICAL_OR",o[o.MAX=14]="MAX",o[o.MIN=15]="MIN",o[o.MOD=16]="MOD",o[o.MUL=17]="MUL",o[o.NOT_EQUAL=18]="NOT_EQUAL",o[o.POW=19]="POW",o[o.PRELU=20]="PRELU",o[o.SQUARED_DIFFERENCE=21]="SQUARED_DIFFERENCE",o[o.SUB=22]="SUB"})(at||(at={}));var $6="let resultTemp = a + b;",T6="let resultTemp = atan2(a, b);",N6="let resultTemp = areal * breal - aimag * bimag;",E6="let resultTemp = areal * bimag + aimag * breal;",R6="let resultTemp = a / b;",D6="let resultTemp = select(a * (b + 1.0), a, b >= b - b);",A6=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a == b);
`,F6=`
  let remainder =
      select(a % b, round(a % b), (round(a) == a) & (round(b) == b));
  let quotient = (a - remainder) / b;
  let resultTemp =
      round(select(quotient, quotient - 1, sign(remainder) == -sign(b)));
`,P6=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a > b);
`,_6=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a >= b);
`,O6=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a < b);
`,M6=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a <= b);
`,L6="return f32(a >= 1.0 && b >= 1.0);",B6=`return (vec4<f32>(a >= vec4<f32>(1.0)) *
  vec4<f32>(b >= vec4<f32>(1.0)));`,z6="return f32(a >= 1.0 || b >= 1.0);",V6=`return min(vec4<f32>(a >= vec4<f32>(1.0)) +
  vec4<f32>(b >= vec4<f32>(1.0)), vec4<f32>(1.0));`,W6="let resultTemp = max(a, b);",U6="let resultTemp = min(a, b);",G6=`
  let isNaN = b == 0.;
  var resultTemp = a % b;
  resultTemp = select((resultTemp + b) % b, resultTemp,
      (a < 0. && b < 0.) || (a >= 0. && b > 0.));
`,H6=`
  let isNaN = !vec4<bool>(b);
  var resultTemp = vec4<f32>(a % b);
  if (!((a[0] < 0. && b[0] < 0.) || (a[0] >= 0. && b[0] > 0.))) {
    resultTemp[0] = (resultTemp[0] + b[0]) % b[0];
  }
  if (!((a[1] < 0. && b[1] < 0.) || (a[1] >= 0. && b[1] > 0.))) {
    resultTemp[1] = (resultTemp[1] + b[1]) % b[1];
  }
  if (!((a[2] < 0. && b[2] < 0.) || (a[2] >= 0. && b[2] > 0.))) {
    resultTemp[2] = (resultTemp[2] + b[2]) % b[2];
  }
  if (!((a[3] < 0. && b[3] < 0.) || (a[3] >= 0. && b[3] > 0.))) {
    resultTemp[3] = (resultTemp[3] + b[3]) % b[3];
  }
`,K6="let resultTemp = a * b;",q6=`
  var resultTemp = f32(a != b);
  let valueForNaN = 1.0;
`,X6=`
  var resultTemp = vec4<f32>(a != b);
  let valueForNaN = 1.0;
`,j6=`
  let isNaN = a < 0.0 && floor(b) < b;
  if (b == 0.0) {
    return 1.0;
  }
  var resultTemp = select(sign(a) * pow(abs(a), b), pow(abs(a), b),
      round(abs(b) % 2.0) != 1.0);
`,Y6=`
  let isModRound1Bool = vec4<i32>(round(abs(b) % vec4<f32>(2.0))) == vec4<i32>(1);
  let isModRound1 = vec4<f32>(isModRound1Bool);
  let multiplier = sign(a) * isModRound1 + (vec4<f32>(1.0) - isModRound1);
  var resultTemp = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  let isExpZero = b == vec4<f32>(0.0);
  if (isExpZero.r) {
    resultTemp.r = 1.0;
  }
  if (isExpZero.g) {
    resultTemp.g = 1.0;
  }
  if (isExpZero.b) {
    resultTemp.b = 1.0;
  }
  if (isExpZero.a) {
    resultTemp.a = 1.0;
  }
  let isNaN = (a < vec4<f32>(0.0)) & (floor(b) < b);
`,Q6="if (a < 0.0) { return b * a; }  return a;",Z6=`
  let aLessThanZero = vec4<f32>(a < vec4<f32>(0.0));
  return (aLessThanZero * (b * a)) + ((vec4<f32>(1.0) - aLessThanZero) * a);
`,J6="let resultTemp = (a - b) * (a - b);",tX="let resultTemp = a - b;";function ac(o,t){let e;do{switch(o){case at.ATAN2:e=T6;break;case at.MAX:e=W6;break;case at.MIN:e=U6;break;case at.MOD:e=t?H6:G6;break;case at.NOT_EQUAL:e=t?X6:q6;break;case at.POW:e=t?Y6:j6;break;default:continue}let r,n,s;return t?(r="isnanVec4",n="vec4<f32>",s="vec4<bool>"):(r="isnan",n="f32",s="bool"),`
      let aIsNaN = ${r}(a);
      let aPostLegalization = select(a, ${n}(42), aIsNaN);
      let bIsNaN = ${r}(b);
      let bPostLegalization = select(b, ${n}(42), bIsNaN);
      let isNaN = false;
      let valueForNaN = uniforms.NAN;
      {
        let a = aPostLegalization;
        let b = bPostLegalization;
        ${e}
        return select(
            resultTemp, ${n}(valueForNaN),
            ${s}(isNaN) | aIsNaN | bIsNaN);
      }
    `}while(!1);switch(o){case at.ADD:e=$6;break;case at.COMPLEX_MULTIPLY_IMAG:e=E6;break;case at.COMPLEX_MULTIPLY_REAL:e=N6;break;case at.DIV:e=R6;break;case at.ELU_DER:e=D6;break;case at.EQUAL:e=A6;break;case at.FLOOR_DIV:e=F6;break;case at.GREATER:e=P6;break;case at.GREATER_EQUAL:e=_6;break;case at.LESS:e=O6;break;case at.LESS_EQUAL:e=M6;break;case at.LOGICAL_AND:return t?B6:L6;case at.LOGICAL_OR:return t?V6:z6;case at.MUL:e=K6;break;case at.PRELU:return t?Z6:Q6;case at.SQUARED_DIFFERENCE:e=J6;break;case at.SUB:e=tX;break;default:}return`
    ${e}
    return resultTemp;
  `}var K;(function(o){o[o.ABS=0]="ABS",o[o.ACOS=1]="ACOS",o[o.ACOSH=2]="ACOSH",o[o.ASIN=3]="ASIN",o[o.ASINH=4]="ASINH",o[o.ATAN=5]="ATAN",o[o.ATANH=6]="ATANH",o[o.CEIL=7]="CEIL",o[o.COS=8]="COS",o[o.COSH=9]="COSH",o[o.ELU=10]="ELU",o[o.ERF=11]="ERF",o[o.EXP=12]="EXP",o[o.EXPM1=13]="EXPM1",o[o.FLOOR=14]="FLOOR",o[o.IS_FINITE=15]="IS_FINITE",o[o.IS_INF=16]="IS_INF",o[o.IS_NAN=17]="IS_NAN",o[o.LINEAR=18]="LINEAR",o[o.LOG=19]="LOG",o[o.LOG1P=20]="LOG1P",o[o.LOGICAL_NOT=21]="LOGICAL_NOT",o[o.NEG=22]="NEG",o[o.RELU=23]="RELU",o[o.RELU6=24]="RELU6",o[o.LEAKYRELU=25]="LEAKYRELU",o[o.RECIPROCAL=26]="RECIPROCAL",o[o.ROUND=27]="ROUND",o[o.RSQRT=28]="RSQRT",o[o.SELU=29]="SELU",o[o.SIGMOID=30]="SIGMOID",o[o.SIGN=31]="SIGN",o[o.SIN=32]="SIN",o[o.SINH=33]="SINH",o[o.SOFTPLUS=34]="SOFTPLUS",o[o.SQRT=35]="SQRT",o[o.SQUARE=36]="SQUARE",o[o.STEP=37]="STEP",o[o.TAN=38]="TAN",o[o.TANH=39]="TANH",o[o.TO_INT=40]="TO_INT"})(K||(K={}));var eX="return abs(a);",oX=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  return acos(a);
`,rX=`
  if (a < 1.) {
    return uniforms.NAN;
  }
  return acosh(a);
`,nX=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  return asin(a);
`,sX="return asinh(a);",iX=`
  if (isnan(a)) {
    return uniforms.NAN;
  }
  return atan(a);
`,aX=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  if (a == 1.) {
    return uniforms.INFINITY;
  }
  if (a == -1.) {
    return -uniforms.INFINITY;
  }
  return atanh(a);
`,uX="return ceil(a);",cX="return cos(a);",lX=`
  let e2x = exp(-a);
  return (e2x + 1.0 / e2x) / 2.0;
`,pX="return exp(a) - 1.0;",mX="if (a >= 0.0) { return a; }  return (exp(a) - 1.0);",dX=`
  var resFloat = exp(a) - vec4<f32>(1.0);
  if (a.r >= 0.0) {
    resFloat.r = a.r;
  }
  if (a.g >= 0.0) {
    resFloat.g = a.g;
  }
  if (a.b >= 0.0) {
    resFloat.b = a.b;
  }
  if (a.a >= 0.0) {
    resFloat.a = a.a;
  }
  return resFloat;
`,fX=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  let p = ${y.ERF_P};
  let a1 = ${y.ERF_A1};
  let a2 = ${y.ERF_A2};
  let a3 = ${y.ERF_A3};
  let a4 = ${y.ERF_A4};
  let a5 = ${y.ERF_A5};

  let sign = sign(a);
  let absA = abs(a);
  let t = 1.0 / (1.0 + p * absA);
  return sign * (1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * exp(-absA * absA));
`,hX="return exp(a);",gX="return floor(a);",xX="return f32(!isnan(a) && !isinf(a));",CX="return f32(isinf(a));",bX="return f32(isnan(a));",yX="return a;",wX=`if (a < 0.0) { return uniforms.NAN; }
  return log(a);`,SX=`
  if (isnan(a)) { return a; }
  return log(1.0 + a);
`,vX="return f32(!(a >= 1.0));",IX="return -a;",kX="if (a < 0.0) { return uniforms.alpha * a; } return a;",$X=`
  let aLessThanZero = vec4<f32>(a < vec4<f32>(0.0));
  return (aLessThanZero * (uniforms.alpha * a)) + ((vec4<f32>(1.0) - aLessThanZero) * a);
`,TX="return 1.0 / a;",NX="return select(a, 0.0, a < 0.0);",EX="return clamp(a, 0.0, 6.0);",RX="return clamp(a, vec4<f32>(0.0, 0.0, 0.0, 0.0), vec4<f32>(6.0, 6.0, 6.0, 6.0));",DX=`
  return select(a, vec4<f32>(0.0), a < vec4<f32>(0.0));
`,AX="return round(a);",FX="return inverseSqrt(a);",PX=`
  if (a >= 0.0) {
    return ${y.SELU_SCALE} * a;
  } else {
    return ${y.SELU_SCALEALPHA} * (exp(a) - 1.0);
  }
`,_X="return 1.0 / (1.0 + exp(-1.0 * a));",OX="return sign(a);",MX="return sin(a);",LX=`
  let e2x = exp(a);
  return (e2x - 1.0 / e2x) / 2.0;
`,BX=`
  let epsilon = 1.1920928955078125e-7;
  let threshold = log(epsilon) + 2.0;

  let too_large = a > -threshold;
  let too_small = a < threshold;
  let exp_a = exp(a);

  if (too_large) {
    return a;
  } else if (too_small) {
    return exp_a;
  } else {
    return log(exp_a + 1.0);
  }
`,zX="return sqrt(a);",VX="return a * a;",WX=`
  if (isnan(a)) {
    return a;
  }

  return select(uniforms.stepAlpha, 1.0, a > 0.0);
`,UX="return tan(a);",GX=`
  let e2x = exp(-2.0 * abs(a));
  return sign(a) * (1.0 - e2x) / (1.0 + e2x);
`,HX="return f32(i32((a)));";function Tn(o,t){switch(o){case K.ABS:return eX;case K.ACOS:return oX;case K.ACOSH:return rX;case K.ASIN:return nX;case K.ASINH:return sX;case K.ATAN:return iX;case K.ATANH:return aX;case K.COS:return cX;case K.COSH:return lX;case K.CEIL:return uX;case K.ELU:return t?dX:mX;case K.ERF:return fX;case K.EXP:return hX;case K.EXPM1:return pX;case K.FLOOR:return gX;case K.IS_FINITE:return xX;case K.IS_INF:return CX;case K.IS_NAN:return bX;case K.LINEAR:return yX;case K.LOG:return wX;case K.LOG1P:return SX;case K.LOGICAL_NOT:return vX;case K.NEG:return IX;case K.LEAKYRELU:return t?$X:kX;case K.RECIPROCAL:return TX;case K.RELU:return t?DX:NX;case K.RELU6:return t?RX:EX;case K.ROUND:return AX;case K.RSQRT:return FX;case K.SELU:return PX;case K.SIGMOID:return _X;case K.SIGN:return OX;case K.SIN:return MX;case K.SINH:return LX;case K.SOFTPLUS:return BX;case K.SQRT:return zX;case K.SQUARE:return VX;case K.STEP:return WX;case K.TAN:return UX;case K.TANH:return GX;case K.TO_INT:return HX;default:throw new Error(`BinaryType ${o} is not implemented!`)}}function De(o,t=!1,e=!1,r=3){if(o===null)return"";let n="";if(o==="linear")n=Tn(K.LINEAR);else if(o==="relu")n=Tn(K.RELU,e);else if(o==="elu")n=Tn(K.ELU,e);else if(o==="relu6")n=Tn(K.RELU6,e);else if(o==="prelu")n=ac(at.PRELU,e);else if(o==="sigmoid")n=Tn(K.SIGMOID,e);else if(o==="leakyrelu")n=Tn(K.LEAKYRELU,e);else throw new Error(`Activation ${o} has not been implemented for the WebGPU backend.`);let i=bt(e?4:1),a="";return t?a=`
      fn activation(a : ${i}, coords : vec${r}<i32>) -> ${i} {
        let b = getPreluActivationWeightsByOutputCoords(coords);
        ${n}
      }`:a=`
      fn activation(a : ${i}, coords : vec${r}<i32>) -> ${i} {
        ${n}
      }`,a}function ro(o,t){return`
      ${o?"value = value + getBiasByOutputCoords(coords);":""}
      ${t?"value = activation(value, coords);":""}
      `}function fC(o,t,e=!1,r=!1,n=!1,s=1){C.assert(o&&s===1||!o,()=>`transposeA ${o} is not compatible with component size ${s}`);let i=`
      ${o?"value = getA(batch, col, row);":"value = getA(batch, row, col);"}

    `,a=t?"value = getB(batch, col, row);":"value = getB(batch, row, col);";return`
  fn mm_readA(batch: i32, row: i32, col: i32) -> ${bt(s)} {
    var value = ${bt(s)}(0.0);
    ${e&&n?i:`
    ${o?"if(row < uniforms.dimAOuter && col < uniforms.dimInner)":"if(row < uniforms.aShape[1] && col < uniforms.aShape[2])"}
    {
      ${i}
    }
    `}
    return value;
  }

  fn mm_readB(batch: i32, row: i32, col: i32) -> ${bt(s)} {
    var value = ${bt(s)}(0.0);
    ${a}
    return value;
  }
  `}function fl(o,t,e,r,n=!1,s=!1,i=!1,a=1){return`
  ${fC(e,r,n,s,i,a)}
  fn mm_write(batch: i32, row: i32, col: i32, valueIn: ${bt(a)}) {
    ${n&&s?"":"if (row < uniforms.dimAOuter && col < uniforms.dimBOuter)"}
    {
      var value = valueIn;
      let coords = vec3<i32>(batch, row, col);
      ${ro(o,t)}
      setOutputAtCoords(coords[0], coords[1], coords[2], value);
    }
  }
  `}var KX=(o,t)=>o?`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          kStart + inputRow,
          globalRowStart + inputCol * ${t});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          globalRow + innerRow,
          kStart + inputCol * ${t});
        `,qX=(o,t,e,r)=>{if(o)return`
      for (var k = 0; k < ${r}; k++) {
        let BCached0 = mm_Bsub[k][tileCol];
        let ACached0 = mm_Asub[k][localRow];
        for (var i = 0; i < ${e}; i++) {
          acc[i] = fma(BCached0, vec4<f32>(ACached0[i]), acc[i]);
        }
      }`;{let n="",s="";for(let i=0;i<t;i++)n+=`let BCached${i} = mm_Bsub[k * ${t} + ${i}][tileCol];`,s+=`acc[i] = fma(BCached${i}, vec4<f32>(ACached[${i}]), acc[i]);`;return`
      for (var k = 0; k < ${r/t}; k++) {
        ${n}
        for (var i = 0; i < ${e}; i++) {
          let ACached = mm_Asub[tileRow + i][k];
          ${s}
        }
      }`}};function Wa(o,t,e=!1,r=32,n=!1,s=32,i=!1){let a=t[1]*o[1],u=t[0]*o[0],c=e?a:r,l=e?r:a,p=c/t[0],m=r/t[1],d=o[1],f=o[0];return C.assert((e&&p===4&&o[1]===4||!e&&(p===3||p===4))&&c%t[0]===0&&r%t[1]===0&&o[0]===4,()=>`If transposeA ${e} is true, innerElementSize ${p} and workPerThread[1] ${o[1]} must be 4.
          Otherwise, innerElementSize ${p} must be 3 or 4.
      tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${r} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${o[0]} must be 4.`),`
  var<workgroup> mm_Asub : array<array<vec${p}<f32>, ${c/p}>, ${l}>;
  var<workgroup> mm_Bsub : array<array<vec4<f32>, ${u/o[0]}>, ${r}>;

  ${B()} {
    let localRow = i32(localId.y);
    let tileRow = localRow * ${d};
    let tileCol = i32(localId.x);

    let globalRow = i32(globalId.y) * ${d};
    let globalCol = i32(globalId.x) * ${f};
    let batch = ${n?"0":"i32(globalId.z)"};
    let batchA = ${n||!i?"batch":"batch % uniforms.aShape[0]"};
    let batchB = ${n||!i?"batch":"batch % uniforms.bShape[0]"};
    let globalRowStart = i32(workgroupId.y) * ${a};

    let numTiles = ${n?`${Math.ceil(s/r)}`:`(uniforms.dimInner - 1) / ${r} + 1`};
    var kStart = ${n?`i32(globalId.z) * ${s}`:"0"};

    var acc: array<vec4<f32>, ${d}>;

    // Loop over shared dimension.
    let tileRowB = localRow * ${m};
    for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        for (var innerRow = 0; innerRow < ${d}; innerRow++) {
            let inputRow = tileRow + innerRow;
            let inputCol = tileCol;
            ${KX(e,p)}
        }

        // Load one tile of B into local memory.
        for (var innerRow = 0; innerRow < ${m}; innerRow++) {
            let inputRow = tileRowB + innerRow;
            let inputCol = tileCol;
            mm_Bsub[inputRow][inputCol] = mm_readB(batchB, kStart + inputRow, globalCol);
        }
        kStart = kStart + ${r};
        workgroupBarrier();

        // Compute acc values for a single thread.
        ${qX(e,p,d,r)}
        workgroupBarrier();
    }

    for (var innerRow = 0; innerRow < ${d}; innerRow++) {
        mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
    }
  }`}var KT=o=>o?`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          kStart + inputRow,
          globalRowStart + inputCol);
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          globalRowStart + inputRow,
          kStart + inputCol);
        `,XX=o=>o?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];";function Ua(o,t,e=!1,r=32,n=!1,s=32,i=!1,a=!1){let u=o[1]*t[1],c=o[0]*t[0],l=e?u:r,p=e?r:u;C.assert(p%t[1]===0&&l%t[0]===0&&r%t[1]===0,()=>`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${l} must be divisible by workgroupSize[0]${t[0]}, tileInner ${r} must be divisible by workgroupSize[1]${t[1]}`);let m=p/t[1],d=l/t[0],f=r/t[1],h=o[1],g=o[0],x=i?`
      let localRow = i32(localId.y);
      let localCol = i32(localId.x);
      let globalRowStart = i32(workgroupId.y) * ${u};
      let globalColStart = i32(workgroupId.x) * ${c};

      // Loop over shared dimension.
      for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
          for (var inputCol = localCol; inputCol < ${l}; inputCol = inputCol + ${t[0]}) {
            ${KT(e)}
          }
        }
        // Load one tile of B into local memory.
        for (var inputRow = localRow; inputRow < ${r}; inputRow = inputRow + ${t[1]}) {
              for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
            mm_Bsub[inputRow][inputCol] = mm_readB(batchB,
              kStart + inputRow,
              globalColStart + inputCol);
          }
        }
        kStart = kStart + ${r};
        workgroupBarrier();

        // Compute acc values for a single thread.
        var BCached : array<f32, ${g}>;
        for (var k = 0; k < ${r}; k++) {
          for (var inner = 0; inner < ${g}; inner++) {
            BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
          }
          for (var innerRow = 0; innerRow < ${h}; innerRow++) {
            let ACached = ${e?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
            for (var innerCol = 0; innerCol < ${g}; innerCol++) {
              acc[innerRow][innerCol] =
                  fma(ACached, BCached[innerCol], acc[innerRow][innerCol]);
            }
          }
        }
        workgroupBarrier();
      }
      for (var innerRow = 0; innerRow < ${h}; innerRow++) {
        let gRow = globalRowStart + localRow + innerRow * ${t[1]};
        for (var innerCol = 0; innerCol < ${g}; innerCol++) {
          let gCol = globalColStart + localCol + innerCol * ${t[0]};
          mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
        }
      }
      `:`
  let tileRow = i32(localId.y) * ${h};
  let tileCol = i32(localId.x) * ${g};

  let globalRow = i32(globalId.y) * ${h};
  let globalCol = i32(globalId.x) * ${g};
  let globalRowStart = i32(workgroupId.y) * ${u};

  let tileRowA = i32(localId.y) * ${m};
  let tileColA = i32(localId.x) * ${d};
  let tileRowB = i32(localId.y) * ${f};
  // Loop over shared dimension.
  for (var t = 0; t < numTiles; t++) {
    // Load one tile of A into local memory.
    for (var innerRow = 0; innerRow < ${m}; innerRow++) {
      for (var innerCol = 0; innerCol < ${d}; innerCol++) {
        let inputRow = tileRowA + innerRow;
        let inputCol = tileColA + innerCol;
        ${KT(e)}
      }
    }

    // Load one tile of B into local memory.
    for (var innerRow = 0; innerRow < ${f}; innerRow++) {
      for (var innerCol = 0; innerCol < ${g}; innerCol++) {
        let inputRow = tileRowB + innerRow;
        let inputCol = tileCol + innerCol;
        mm_Bsub[inputRow][inputCol] = mm_readB(batchB,
          kStart + inputRow,
          globalCol + innerCol);
      }
    }
    kStart = kStart + ${r};
    workgroupBarrier();

    // Compute acc values for a single thread.
    var BCached : array<f32, ${g}>;
    for (var k = 0; k < ${r}; k++) {
      for (var inner = 0; inner < ${g}; inner++) {
        BCached[inner] = mm_Bsub[k][tileCol + inner];
      }

      for (var innerRow = 0; innerRow < ${h}; innerRow++) {
        ${XX(e)}
        for (var innerCol = 0; innerCol < ${g}; innerCol++) {
          acc[innerRow][innerCol] =
              fma(ACached, BCached[innerCol], acc[innerRow][innerCol]);
        }
      }
    }

    workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < ${h}; innerRow++) {
    for (var innerCol = 0; innerCol < ${g}; innerCol++) {
      mm_write(batch, globalRow + innerRow, globalCol + innerCol,
          acc[innerRow][innerCol]);
    }
  }
  `;return`
    var<workgroup> mm_Asub : array<array<f32, ${l}>, ${p}>;
    var<workgroup> mm_Bsub : array<array<f32, ${c}>, ${r}>;

    ${B()} {
      let batch = ${n?"0":"i32(globalId.z)"};
      let batchA = ${n||!a?"batch":"batch % uniforms.aShape[0]"};
      let batchB = ${n||!a?"batch":"batch % uniforms.bShape[0]"};
      let numTiles = ${n?`${Math.ceil(s/r)}`:`(uniforms.dimInner - 1) / ${r} + 1`};
      var kStart = ${n?`i32(globalId.z) * ${s}`:"0"};

      var acc : array<array<f32, ${g}>, ${h}>;

      // Without this initialization strange values show up in acc.
      for (var innerRow = 0; innerRow < ${h}; innerRow++) {
        for (var innerCol = 0; innerCol < ${g}; innerCol++) {
          acc[innerRow][innerCol] = 0.0;
        }
      }
      ${x}
    }
  `}var jX=o=>o?`
      mm_readA(batchA, colA, globalRow),
      mm_readA(batchA, colA + 1, globalRow),
      mm_readA(batchA, colA + 2, globalRow),
      mm_readA(batchA, colA + 3, globalRow)
  `:`
      mm_readA(batchA, globalRow, colA),
      mm_readA(batchA, globalRow, colA + 1),
      mm_readA(batchA, globalRow, colA + 2),
      mm_readA(batchA, globalRow, colA + 3)
  `;function YX(o,t=!1){C.assert(o[1]===1&&o[2]===1,()=>`A linear work group size is required. But got ${o}.`);let e=o[0]*4;return`
    var<workgroup> mm_Asub : array<vec4<f32>, ${o[0]}>;

    ${B()} {
      let tileCol = i32(localId.x);
      let globalCol = i32(globalId.x);
      let globalRow = i32(globalId.y);

      let numTiles = (uniforms.dimInner - 1) / ${e} + 1;
      let batch = i32(globalId.z);
      let batchA = batch % uniforms.aShape[0];
      let batchB = batch % uniforms.bShape[0];
      // Without this initialization strange values show up in acc.
      var acc = 0.0;

      // Loop over shared dimension.
      for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        let colA = t * ${e} + tileCol * 4;
        mm_Asub[tileCol] = vec4<f32>(${jX(t)});
        workgroupBarrier();

        // Compute acc values for a single thread.
        for (var k = 0; k < ${e/4}; k++) {
          let rowB = t * ${e} + k * 4;
          let BCached = vec4<f32>(mm_readB(batchB, rowB, globalCol),
                              mm_readB(batchB, rowB + 1, globalCol),
                              mm_readB(batchB, rowB + 2, globalCol),
                              mm_readB(batchB, rowB + 3, globalCol));

          let ACached = mm_Asub[k];
          acc = acc + dot(ACached, BCached);
        }

        workgroupBarrier();
      }

      mm_write(batch, globalRow, globalCol, acc);
    }
  `}var kd=class{constructor(t,e,r=!1,n=!1,s=null,i=null,a=null,u=!1){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=e,this.dispatchLayout={x:[2],y:[1],z:[0]};let c=r?t[1]:t[2];if(this.isVec4=(c%4===0&&!r||e[1]%4===0&&r)&&e[2]%4===0&&!n,this.outputComponent=this.isVec4?4:1,this.isVectorA=e[1]===1&&!r,!this.isVec4&&this.isVectorA)this.elementsPerThread=[1,1,1],this.workgroupSize=[32,1,1];else{let m=GT(e[1],c,e[2],r);this.workgroupSize=m.workgroupSize,this.elementsPerThread=m.elementsPerThread}this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread);let l=s!=null,p=a!=null;l&&this.variableNames.push("bias"),p&&this.variableNames.push("preluActivationWeights"),this.sequentialAccessByThreads=u,this.transposeA=r,this.transposeB=n,this.addBias=l,this.activation=i,this.hasPreluActivationWeights=p,[this.fitAOuter,this.fitBOuter,this.fitInner]=this.getShapeFit(e[1],e[2],c),this.shaderKey=`matMulPacked_${this.elementsPerThread}_${r}_${n}_${this.activation}_${this.fitAOuter}_${this.fitBOuter}_${this.fitInner}_${this.isVec4}_${this.isVectorA}_${this.sequentialAccessByThreads}`}getShapeFit(t,e,r){let n=this.workgroupSize[1]*this.elementsPerThread[1],s=this.workgroupSize[0]*this.elementsPerThread[0];!this.isVec4&&this.isVectorA?this.tileInner=this.workgroupSize[0]*4:this.tileInner=s;let i=t%n===0,a=e%s===0,u=r%this.tileInner===0;return[i,a,u]}getUserCode(){return`
      ${De(this.activation,this.hasPreluActivationWeights,this.isVec4)}
      ${fl(this.addBias,this.activation,!1,this.transposeB,this.fitAOuter,this.fitBOuter,this.fitInner,this.isVec4?4:1)}
      ${this.isVec4?Wa(this.elementsPerThread,this.workgroupSize,this.transposeA,this.tileInner,!1,null,!0):this.isVectorA?YX(this.workgroupSize,this.transposeA):Ua(this.elementsPerThread,this.workgroupSize,this.transposeA,this.tileInner,!1,null,this.sequentialAccessByThreads,!0)}
    `}};function QX(o){return`
    var<workgroup> sumValues : array<f32, ${o}>;
    ${B()} {
      let coords = getOutputCoords();
      let batch = coords[0];
      let batchA = batch % uniforms.aShape[0];
      let batchB = batch % uniforms.bShape[0];
      let row = coords[1];
      let col = coords[2];
      var sum = 0.0;
      let Length = uniforms.dimInner;
      for (var k = i32(localId.x); k < Length; k = k + ${o}) {
        let dataA = mm_readA(batchA, row, k);
        let dataB = mm_readB(batchB, k, col);
        sum = sum + dataA * dataB;
      }
      sumValues[localId.x] = sum;
      workgroupBarrier();

      for(var currentSize = ${o/2}u; currentSize > 1u;
          currentSize = currentSize / 2u) {
        if (localId.x < currentSize)
        {
          sumValues[localId.x] = sumValues[localId.x] + sumValues[localId.x + currentSize];
        }
        workgroupBarrier();
      }

      if (localId.x == 0u) {
        sum = sumValues[0] + sumValues[1];
        mm_write(batch, row, col, sum);
      }
    }
  `}var $d=class{constructor(t,e=!1,r=!1,n=null,s=null,i=null){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[256,1,1],this.outputShape=t,this.dispatchLayout={x:[],y:[1,2],z:[0]},this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize);let a=n!=null,u=i!=null;a&&this.variableNames.push("bias"),u&&this.variableNames.push("preluActivationWeights"),this.transposeA=e,this.transposeB=r,this.addBias=a,this.activation=s,this.hasPreluActivationWeights=u,this.shaderKey=`matMulReduce_${this.activation}_${e}_${r}`}getUserCode(){return`
      ${De(this.activation,this.hasPreluActivationWeights)}
      ${fl(this.addBias,this.activation,this.transposeA,this.transposeB)}
      ${QX(this.workgroupSize[0])}
    `}};function ZX(o){let t=o[1],e=o[0],r=t>e?t:e;return`
  var<workgroup> mm_Asub : array<array<f32, ${r}>, ${t}>;
  var<workgroup> mm_Bsub : array<array<f32, ${e}>, ${r}>;

  // If the output size is small for matrix multiplication, avoid to use vec4
  // and handle some elements per thread to optimally utilize the ALU.
  // Read data from global memory to registers firstly, then store them into
  // shared memory, so it is instruction-Level parallelism for arithmetic
  // operations and others handle IO operations between barrier api, makes ALU
  // and load/store units work simultaneously, could improves the performance.
  ${B()} {
    let tileRow = i32(localId.y);
    let tileCol = i32(localId.x);
    let globalRow = i32(globalId.y);
    let globalCol = i32(globalId.x);
    let batch = i32(globalId.z);
    let batchA = batch % uniforms.aShape[0];
    let batchB = batch % uniforms.bShape[0];

    // uniforms.dimInner should be greater than 0.
    let numTiles = (uniforms.dimInner - 1) / ${r} + 1;
    var acc = 0.0;

    var globalColA = tileCol;
    var globalRowB = 0;
    var regA = mm_readA(batchA, globalRow, globalColA);
    var regB0 = mm_readB(batchB, globalRowB + 2 * tileRow, globalCol);
    var regB1 = mm_readB(batchB, globalRowB + 2 * tileRow + 1, globalCol);
    globalColA = globalColA + ${r};
    globalRowB = globalRowB + ${r};

    for (var t = 0; t < numTiles; t = t + 1) {
      mm_Asub[tileRow][tileCol] = regA;
      mm_Bsub[2 * tileRow][tileCol] = regB0;
      mm_Bsub[2 * tileRow + 1][tileCol] = regB1;

      workgroupBarrier();

      regA = mm_readA(batchA, globalRow, globalColA);
      regB0 = mm_readB(batchB, globalRowB + 2 * tileRow, globalCol);
      regB1 = mm_readB(batchB, globalRowB + 2 * tileRow + 1, globalCol);
      globalColA = globalColA + ${r};
      globalRowB = globalRowB + ${r};

      for (var k = 0; k < ${r}; k = k + 1) {
        acc = acc + mm_Asub[tileRow][k] * mm_Bsub[k][tileCol];
      }
      workgroupBarrier();
    }

    mm_write(batch, globalRow, globalCol, acc);
  }
  `}var Td=class{constructor(t,e,r,n=!1,s=!1,i=null,a=null,u=null){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[16,8,1],this.outputShape=r,this.dispatchLayout={x:[2],y:[1],z:[0]},this.dispatch=[Math.ceil(r[2]/this.workgroupSize[0]),Math.ceil(r[1]/this.workgroupSize[1]),r[0]];let c=i!=null;c&&this.variableNames.push("bias");let l=u!=null;l&&this.variableNames.push("preluActivationWeights"),this.transposeA=n,this.transposeB=s,this.addBias=c,this.activation=a,this.hasPreluActivationWeights=l,this.shaderKey=`matMulSmallOutputSize_${this.activation}_${n}_${s}`}getUserCode(){return`
      ${De(this.activation,this.hasPreluActivationWeights)}
      ${fl(this.addBias,this.activation,this.transposeA,this.transposeB)}
      ${ZX(this.workgroupSize)}
    `}};var Nd=class{constructor(t,e,r=!1,n=!1){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[8,8,1],this.atomic=!0,this.splitedDimInner=128,C.assert(t[0]===1,()=>"MatMulSplitKProgram only supports batch = 1."),this.outputShape=t,this.dispatchLayout={x:[2],y:[1],z:[0,3]};let s=(r&&this.outputShape[1]%4===0||!r&&e%4===0)&&this.outputShape[2]%4===0;this.elementsPerThread=[4,4,this.splitedDimInner],this.outputComponent=s?4:1,s||(this.outputShape[1]<16&&(this.elementsPerThread[1]=1),this.outputShape[2]<16&&(this.elementsPerThread[0]=1)),this.dispatch=z(this.dispatchLayout,[this.outputShape[0],this.outputShape[1],this.outputShape[2],e],this.workgroupSize,this.elementsPerThread),this.transposeA=r,this.transposeB=n,this.shaderKey=`matMulSplitK_${r}_${n}_${this.elementsPerThread}_${this.outputComponent}`}getUserCode(){let t=this.outputComponent;return`
      ${fC(!1,this.transposeB,!1,!1,!1,t)}
      fn mm_write(batch: i32, row : i32, col : i32, value : ${bt(t)}) {
        if (row < uniforms.dimAOuter && col < uniforms.dimBOuter) {
          let coords = vec3<i32>(batch, row, col);
          let flatIndex = getOutputIndexFromCoords(coords);
          // The problem is that we should initialize output to zero before using.
          // Otherwise, the original value will be added to the result.
          for (var i = 0; i < ${t}; i = i + 1) {
            ${oo("&result[flatIndex + i]",`${t>1?"value[i]":"value"}`,"float32")}
          }
        }
      }
      ${t===4?Wa(this.elementsPerThread,this.workgroupSize,this.transposeA,32,!0,this.splitedDimInner):Ua(this.elementsPerThread,this.workgroupSize,this.transposeA,32,!0,this.splitedDimInner)}
    `}},Ed=class{constructor(t,e=null,r=null,n=null){this.uniforms="",this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.addBias=e!=null,this.hasPreluActivationWeights=n!=null,this.activation=r,this.addBias&&this.variableNames.push("bias"),this.hasPreluActivationWeights&&this.variableNames.push("preluActivationWeights"),this.shaderKey=`biasActivation_${r}`}getUserCode(){return`
    ${De(this.activation,this.hasPreluActivationWeights)}
    ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        var value = getXByOutputIndex(index);
        ${ro(this.addBias,this.activation)}
        setOutputAtIndex(index, value);
      }
    }
    `}};var Rd=class{constructor(t){this.variableNames=[],this.outputShape=[],this.uniforms="value : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="fill"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.size) {
        setOutputAtIndex(index, uniforms.value);
      }
    }
  `}};function Zt(o){let{backend:t,attrs:e}=o,{shape:r,value:n}=e,{dtype:s}=e;if(s=s||C.inferDtype(n),s==="string"){let i=C.getArrayFromDType(s,C.sizeFromShape(r));return i.fill(n),t.makeTensorInfo(r,s,i)}else{let i=new Rd(r),a=[{type:"float32",data:[n]}];return t.runWebGPUProgram(i,[],s,a)}}var qT={kernelName:gs,backendName:"webgpu",kernelFunc:Zt};function tt(o){let{inputs:t,attrs:e}=o,{x:r}=t,{shape:n}=e,s=C.sizeFromShape(r.shape),i=C.inferFromImplicitShape(n,s),a=C.sizeFromShape(i);return C.assert(s===a,()=>`The new shape (${i}) has ${a} elements and the old shape (${r.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`),o.backend.incRef(r.dataId),{dataId:r.dataId,shape:i,dtype:r.dtype}}var XT={kernelName:Gs,backendName:"webgpu",kernelFunc:tt};function Ga({a:o,b:t,transposeA:e,transposeB:r,backend:n,bias:s=null,preluActivationWeights:i=null,leakyreluAlpha:a=0,activation:u=null}){let c=o.shape.length,l=t.shape.length,p=e?o.shape[c-2]:o.shape[c-1],m=r?t.shape[l-1]:t.shape[l-2],d=e?o.shape[c-1]:o.shape[c-2],f=r?t.shape[l-2]:t.shape[l-1],h=o.shape.slice(0,-2),g=t.shape.slice(0,-2),x=C.sizeFromShape(h),b=C.sizeFromShape(g),v=xo.assertAndGetBroadcastShape(o.shape.slice(0,-2),t.shape.slice(0,-2)).concat([d,f]);C.assert(p===m,()=>`Error in matMul: inner shapes (${p}) and (${m}) of Tensors with shapes ${o.shape} and ${t.shape} and transposeA=${e} and transposeB=${r} must match.`);let k=e?[x,p,d]:[x,d,p],N=r?[b,f,m]:[b,m,f],E=tt({inputs:{x:o},backend:n,attrs:{shape:k}}),R=tt({inputs:{x:t},backend:n,attrs:{shape:N}}),A=[E,R],F=Math.max(x,b),P=[E,R],_=[{type:"int32",data:[d]},{type:"int32",data:[f]},{type:"int32",data:[p]}],O,M,L=[F,d,f],W=D().get("WEBGPU_MATMUL_PROGRAM_TYPE");if(W<0){let U=D().getNumber("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL"),q=U>0?U:n.thresholdToIncreaseWorkgroups,Y=F*Math.ceil(d/32)*Math.ceil(f/32);Y<=q||d<=8&&Y<=q*2?F*d*f<=128?W=zo.MatMulReduceProgram:F===1&&m>=2e3?W=zo.MatMulSplitKProgram:W=zo.MatMulSmallOutputSizeProgram:W=zo.MatMulPackedProgram}switch(W){case zo.MatMulReduceProgram:O=new $d(L,e,r,s,u,i);break;case zo.MatMulSplitKProgram:{if(M=Zt({backend:n,attrs:{shape:L,value:0,dtype:o.dtype}}),O=new Nd(L,m,e,r),s||u){M=n.runWebGPUProgram(O,P,o.dtype,_,M);let q=new Ed(M.shape,s,u,i),Y=null,Z=[M];s&&Z.push(s),i&&Z.push(i),u==="leakyrelu"&&(Y=[{type:"float32",data:[a]}],q.uniforms+=" alpha : f32,");let et=n.runWebGPUProgram(q,Z,M.dtype,Y);A.push(M);let J=tt({inputs:{x:et},backend:n,attrs:{shape:v}});A.push(et);for(let st of A)n.disposeData(st.dataId);return J}break}case zo.MatMulSmallOutputSizeProgram:O=new Td(k,N,L,e,r,s,u,i);break;case zo.MatMulPackedProgram:let U=n.adapterInfo.isIntel();O=new kd(k,L,e,r,s,u,i,U);break;default:throw new Error(`Unsupported MatMulProgramType ${W}.`)}s&&P.push(s),i&&P.push(i),u==="leakyrelu"&&(_.push({type:"float32",data:[a]}),O.uniforms+=" alpha : f32,"),M=n.runWebGPUProgram(O,P,o.dtype,_,M);let X=tt({inputs:{x:M},backend:n,attrs:{shape:v}});A.push(M);for(let U of A)n.disposeData(U.dataId);return X}function JX(o){let{inputs:t,backend:e,attrs:r}=o,{a:n,b:s,bias:i,preluActivationWeights:a}=t,{transposeA:u,transposeB:c,activation:l,leakyreluAlpha:p}=r;return Ga({a:n,b:s,transposeA:u,transposeB:c,backend:e,bias:i,preluActivationWeights:a,leakyreluAlpha:p,activation:l})}var jT={kernelName:nn,backendName:"webgpu",kernelFunc:JX};var hl=class{constructor(t,e,r){this.variableNames=["AReal","AImag","BReal","BImag"],this.workgroupSize=[128,1,1],this.size=!0,this.outputShape=y.assertAndGetBroadcastShape(e,r),this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`binaryOpComplex_${t}`,this.op=t}getUserCode(){return`
      fn binaryOpComplex(
          areal : f32, aimag : f32, breal : f32, bimag : f32) -> f32 {
        ${ac(this.op,!1)}
      }

      ${B("index")} {
        if(index < uniforms.size) {
          let areal = getARealByOutputIndex(index);
          let aimag = getAImagByOutputIndex(index);
          let breal = getBRealByOutputIndex(index);
          let bimag = getBImagByOutputIndex(index);
          setOutputAtIndex(index, binaryOpComplex(areal, aimag, breal, bimag));
        }
      }
    `}};var Nn=class{constructor(t,e,r){if(this.size=!0,this.variableNames=["A","B"],this.outputShape=y.assertAndGetBroadcastShape(e,r),this.dispatchLayout=G(this.outputShape),this.op=t,this.useSharedMemoryWithA=e.length<=1&&r.length>1&&e[0]<128,this.useSharedMemoryWithB=r.length<=1&&e.length>1&&r[0]<128,this.useSharedMemoryWithA||this.useSharedMemoryWithB)this.outputComponent=1,this.variableComponents=[1,1],this.lastDimensionSize=this.useSharedMemoryWithB?r[0]:e[0],this.shaderKey=`binary_${t}_${this.lastDimensionSize}`,this.type="shared",this.workgroupSize=[256,1,1];else{let n=e.length>0&&e[e.length-1]%4===0,s=r.length>0&&r[r.length-1]%4===0;n&&s?(this.outputComponent=4,this.variableComponents=[4,4]):n&&(C.isScalarShape(r)||r[r.length-1]===1)||s&&(C.isScalarShape(e)||e[e.length-1]===1)?(this.outputComponent=4,this.variableComponents=n?[4,1]:[1,4]):(this.outputComponent=1,this.variableComponents=[1,1]),this.type="nonshared",this.shaderKey=`binary_${t}_${this.variableComponents}`,this.workgroupSize=[128,1,1]}this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.outputComponent,1,1])}getUserCode(){let t,e=this.outputComponent===4?"vec4<f32>":"f32",r=`
    fn binaryOperation(a : ${e}, b : ${e}) -> ${e} {
      ${ac(this.op,this.outputComponent===4)}
    };
    `;if(this.type==="shared"){let n=this.lastDimensionSize>1?`coords[${this.outputShape.length-1}]`:"0",s=this.useSharedMemoryWithB?`let a = getAByOutputIndex(index);
          let b = sharedBuf[${n}];`:`let a = sharedBuf[${n}];
          let b = getBByOutputIndex(index);`;t=`
        ${r}
        var<workgroup> sharedBuf : array<f32, ${this.lastDimensionSize}>;
        ${B("index")} {
          // Fill in the shared memory buffer.
          let localIndex = i32(localId.x);
          if(localIndex < ${this.lastDimensionSize}) {
            sharedBuf[localIndex] = f32(${this.useSharedMemoryWithB?"B":"A"}[localIndex]);
          }
          workgroupBarrier();

          if(index < uniforms.size) {
            let coords = getCoordsFromIndex(index);
            ${s}
            setOutputAtIndex(index, binaryOperation(a, b));
          }
        }
        `}else t=`
       ${r}
       ${B("index")} {
         if (index < uniforms.size) {
           let coords = getCoordsFromIndex(index * ${this.outputComponent});
           let a = ${e}(getAByOutputCoords(coords));
           let b = ${e}(getBByOutputCoords(coords));
           setOutputAtIndex(index, binaryOperation(a, b));
         }
       }
       `;return t}};function ie(o){let{inputs:t}=o,{x:e}=t;return o.backend.incRef(e.dataId),{dataId:e.dataId,shape:e.shape,dtype:e.dtype}}var YT={kernelName:Ko,backendName:"webgpu",kernelFunc:ie};function po(o){let{inputs:t,backend:e}=o,{real:r,imag:n}=t,s=e.makeTensorInfo(r.shape,"complex64"),i=e.tensorMap.get(s.dataId),a=ie({inputs:{x:r},backend:e}),u=ie({inputs:{x:n},backend:e});return i.complexTensorInfos={real:a,imag:u},s}var QT={kernelName:Kn,backendName:"webgpu",kernelFunc:po};var no=class{constructor(t,e,r=""){this.variableNames=["A"],this.size=!0;let n=128;this.workgroupSize=[n,1,1],this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.op=e,r!==""&&(this.uniforms=r),this.shaderKey=`unary_${e}`}getUserCode(){return`
      fn unaryOperation(a : f32) -> f32 {
        ${Tn(this.op,!1)}
      }
      ${B("index")} {
        if (index < uniforms.size) {
          let a = getAByOutputIndex(index);
          setOutputAtIndex(index, unaryOperation(a));
        }
      }
      `}};function lt({opType:o,cpuKernelImpl:t,dtype:e}){return({inputs:r,backend:n})=>{let{x:s}=r,i=n,a=e||s.dtype;if(i.shouldExecuteOnCPU([s])&&t!=null){let c=i.tensorMap.get(s.dataId),l=t(c.values,a);return i.makeTensorInfo(s.shape,a,l)}let u=new no(s.shape,o);return i.runWebGPUProgram(u,[s],a)}}function Rt({opType:o,cpuKernelImpl:t,supportsComplex:e=!1,dtype:r}){return({inputs:n,backend:s})=>{let{a:i,b:a}=n,u=s;if(e&&i.dtype==="complex64"){let p=u.tensorMap.get(i.dataId),m=u.tensorMap.get(a.dataId),d,f;if(o!==at.MUL)[d,f]=[[p.complexTensorInfos.real,m.complexTensorInfos.real],[p.complexTensorInfos.imag,m.complexTensorInfos.imag]].map(g=>{let[x,b]=g,w={dataId:x.dataId,dtype:x.dtype,shape:i.shape},v={dataId:b.dataId,dtype:b.dtype,shape:a.shape},k=new Nn(o,i.shape,a.shape);return u.runWebGPUProgram(k,[w,v],Lt(x.dtype,b.dtype))});else{let g=new hl(at.COMPLEX_MULTIPLY_REAL,i.shape,a.shape),x=new hl(at.COMPLEX_MULTIPLY_IMAG,i.shape,a.shape),b=[{dataId:p.complexTensorInfos.real.dataId,dtype:p.complexTensorInfos.real.dtype,shape:i.shape},{dataId:p.complexTensorInfos.imag.dataId,dtype:p.complexTensorInfos.imag.dtype,shape:i.shape},{dataId:m.complexTensorInfos.real.dataId,dtype:m.complexTensorInfos.real.dtype,shape:a.shape},{dataId:m.complexTensorInfos.imag.dataId,dtype:m.complexTensorInfos.imag.dtype,shape:a.shape}];d=u.runWebGPUProgram(g,b,"float32"),f=u.runWebGPUProgram(x,b,"float32")}let h=po({inputs:{real:d,imag:f},backend:u});return u.disposeData(d.dataId),u.disposeData(f.dataId),h}let c=r||Lt(i.dtype,a.dtype);if((i.dtype==="string"||a.dtype==="string"||u.shouldExecuteOnCPU([i,a]))&&t!=null){let p=u.tensorMap.get(i.dataId).values,m=u.tensorMap.get(a.dataId).values,d=i.dtype==="string"?y.fromUint8ToStringArray(p):p,f=i.dtype==="string"?y.fromUint8ToStringArray(m):m,[h,g]=t(i.shape,a.shape,d,f,c);return u.makeTensorInfo(g,c,h)}let l=new Nn(o,i.shape,a.shape);return u.runWebGPUProgram(l,[i,a],c)}}var{addImpl:ZT,castImpl:JT,ceilImpl:tN,concatImpl:eN,equalImpl:oN,expImpl:rN,expm1Impl:nN,floorImpl:sN,floorDivImpl:iN,gatherNdImpl:aN,gatherV2Impl:uN,greaterEqualImpl:cN,greaterImpl:lN,lessEqualImpl:pN,lessImpl:mN,logImpl:dN,maxImpl:fN,maximumImpl:hN,minimumImpl:gN,multiplyImpl:xN,negImpl:CN,notEqualImpl:bN,prodImpl:yN,rangeImpl:wN,rsqrtImpl:SN,scatterImpl:vN,simpleAbsImpl:IN,sliceImpl:kN,stridedSliceImpl:$N,stringNGramsImpl:TN,subImpl:NN,tileImpl:EN,topKImpl:RN,transposeImpl:DN,uniqueImpl:Jue}=qc;var tj=lt({opType:K.ABS,cpuKernelImpl:IN}),AN={kernelName:"Abs",backendName:"webgpu",kernelFunc:tj};var ej=lt({opType:K.ACOS}),FN={kernelName:fr,backendName:"webgpu",kernelFunc:ej};var oj=lt({opType:K.ACOSH}),PN={kernelName:hr,backendName:"webgpu",kernelFunc:oj};var rj=Rt({opType:at.ADD,cpuKernelImpl:ZT,supportsComplex:!0}),_N={kernelName:"Add",backendName:"webgpu",kernelFunc:rj};var Dd=class{constructor(t){this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t[0],this.variableNames=t.map((e,r)=>`T${r}`),this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.shaderKey="addN"}getUserCode(){let t=[];this.variableNames.forEach(n=>{t.push(`let v${n} = get${n}ByOutputCoords(coords);`)});let e=this.variableNames.map(n=>`v${n}`).join(" + ");return`
      ${B("index")} {
        for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if (flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            ${t.join(`
        `)}
            setOutputAtIndex(flatIndex, ${e});
          }
        }
      }
    `}};function nj(o){let{inputs:t,backend:e}=o,r=t;if(r.length===1)return ie({inputs:{x:r[0]},backend:e});let n=r.map(a=>a.dtype).reduce((a,u)=>Lt(a,u)),s=r.map(a=>a.shape),i=new Dd(s);return e.runWebGPUProgram(i,r,n)}var ON={kernelName:Mn,backendName:"webgpu",kernelFunc:nj};var Ad=class{constructor(t,e){this.variableNames=["A"],this.workgroupSize=[16,16,1];let r=new Array(t.length);for(let n=0;n<r.length;n++)r[n]=t[e[n]];this.outputShape=r,this.dispatchLayout={x:[0],y:[1]},this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[1,1,1]),this.shaderKey="transposeShared"}getUserCode(){C.assert(this.workgroupSize[0]===this.workgroupSize[1],()=>`Must be a square tile, current tile shape is ${this.workgroupSize[0]} x ${this.workgroupSize[1]}`);let t=this.workgroupSize[0];return`
      var<workgroup> tile : array<array<f32, ${this.workgroupSize[0]+1}>, ${this.workgroupSize[0]}>;
      ${B()} {
        var x = i32(workgroupId.x) * ${t} + i32(localId.x);
        var y = i32(workgroupId.y) * ${t} + i32(localId.y);
        let width = uniforms.outShape[0];
        let height = uniforms.outShape[1];
        if (x < width && y < height) {
          tile[localId.y][localId.x] = f32(A[y * width + x]);
        }
        workgroupBarrier();

        x = i32(workgroupId.y) * ${t} + i32(localId.x);
        y = i32(workgroupId.x) * ${t} + i32(localId.y);
        if (x < height && y < width) {
          setOutputAtIndex((y * height + x), tile[localId.x]
            [localId.y]);
        }
      }
    `}};var Fd=class{constructor(t,e){this.variableNames=["A"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0;let r=new Array(t.length);for(let n=0;n<r.length;n++)r[n]=t[e[n]];this.outputShape=r,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.newDim=e,this.shaderKey=`transpose_${e}`}getUserCode(){let t=Vt(this.outputShape.length),e=hC(this.newDim);return`
      ${B("index")} {
        for(var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if(flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            setOutputAtIndex(flatIndex, A[getIndexFromCoords${this.outputShape.length}D(
              ${t}(${e}), uniforms.aShape)]);
          }
        }
      }
    `}};function hC(o){let t=o.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let e=new Array(t);for(let r=0;r<o.length;r++)e[o[r]]=`coords.${$o(r)}`;return e.join()}function _e(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{perm:s}=r,i=e,a=n.shape.length,u=new Array(a);for(let l=0;l<u.length;l++)u[l]=n.shape[s[l]];if(e.shouldExecuteOnCPU([n])){let p=i.tensorMap.get(n.dataId).values,m=DN(p,n.shape,n.dtype,s,u);return e.makeTensorInfo(u,n.dtype,m)}if(n.shape.length===2&&C.arraysEqual(s,[1,0])){let l=new Ad(n.shape,s);return i.runWebGPUProgram(l,[n],n.dtype)}let c=new Fd(n.shape,s);return i.runWebGPUProgram(c,[n],n.dtype)}var MN={kernelName:Xo,backendName:"webgpu",kernelFunc:_e};var Pd=class{constructor(t,e,r){this.variableNames=["x"],this.uniforms="reduceSize : i32,",this.size=!0,this.inputShape=[t.batchSize,t.inSize];let[n]=y.computeOutAndReduceShapes(this.inputShape,[1]);this.outputShape=n.length===0?[1]:n,t.inSize>=32768&&r>=512?this.workgroupSize=[512,1,1]:t.inSize>=4096?this.workgroupSize=[256,1,1]:this.workgroupSize=[64,1,1],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,[1,1,1]),this.reduceType=e,this.shaderKey=`reduce_${e}`}getUserCode(){let t="",e="0.0",r=this.workgroupSize[0];this.reduceType==="min"||this.reduceType==="max"?(t=`
         if (isnan(candidate)) {
          bestValue = uniforms.NAN;
         } else if (!isnan(bestValue) && candidate ${this.reduceType==="min"?"<":">"} bestValue)
           {  bestValue = candidate; }`,e="f32(x[offset])"):this.reduceType==="sum"||this.reduceType==="mean"?t=" bestValue = bestValue + candidate; ":this.reduceType==="prod"?(t=" bestValue = bestValue * candidate; ",e="1.0"):this.reduceType==="all"?(t=" bestValue = f32(bestValue >= 1.0 && candidate >= 1.0); ",e="1.0"):this.reduceType==="any"&&(t=" bestValue = f32(bestValue >= 1.0 || candidate >= 1.0); ",e="0.0");let n=this.reduceType==="mean"?"setOutputAtIndex(outputIndex, bestValue / f32(uniforms.reduceSize));":"setOutputAtIndex(outputIndex, bestValue);";return`
       fn DIV_CEIL(a : u32, b : u32) -> u32 {
        return ((a - 1u) / b + 1u);
       }

       ${`
         var<workgroup> xBestValues : array<f32, ${r}>;
       `}
       fn getOffset(outputIndex : i32) -> i32 {
         let outputCoords = getCoordsFromIndex(outputIndex);
         let offset = ${this.outputShape.length===1?"outputCoords":"outputCoords[0]"} * uniforms.reduceSize;
          return offset;
       }
       ${B("index")} {
         let outputIndex = index / ${r};
         let offset = getOffset(outputIndex);
         var bestValue = ${e};
         let Length = uniforms.reduceSize;
         let WorkPerThread = DIV_CEIL(u32(Length), ${r}u);
         for (var k = i32(localId.x); k < Length && outputIndex < uniforms.size;
             k = k + ${r}) {
           let candidate = f32(x[offset + k]);
           ${t}
         }
         xBestValues[localId.x] = bestValue;
         workgroupBarrier();

         var reduceSize = min(u32(Length), ${r}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (localId.x < currentSize) {
            let candidate = xBestValues[localId.x + interval];
            ${t}
            xBestValues[localId.x] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (localId.x == 0u && outputIndex < uniforms.size) {
          ${n}
        }
       }
     `}};var sj={mean:"float32",all:"bool",any:"bool"};function so(o,t,e,r,n){let s=o.shape.length,i=[],a=C.parseAxisParam(t,o.shape),u=a,c=y.getAxesPermutation(u,s),l=o;c!=null&&(l=_e({inputs:{x:o},attrs:{perm:c},backend:n}),u=y.getInnerMostAxes(u.length,s),i.push(l)),y.assertAxesAreInnerMostDims(r,u,s);let[p,m]=y.computeOutAndReduceShapes(l.shape,u),d=p;e&&(d=y.expandShapeToKeepDim(p,a));let f;if((r==="max"||r==="prod")&&n.shouldExecuteOnCPU([l])){let h=n.tensorMap.get(l.dataId).values;switch(r){case"max":let g=fN(h,C.sizeFromShape(m),d,o.dtype);f=n.makeTensorInfo(d,o.dtype,g);break;case"prod":let{outVals:x,outShape:b,outDtype:w}=yN(l.shape,l.dtype,h,u);f=n.makeTensorInfo(b,w,x);break;default:throw new Error(`${r} CPU implementation is not yet supported.`)}}else{let h=C.sizeFromShape(m),x=C.sizeFromShape(l.shape)/h,b={windowSize:h,inSize:h,batchSize:x,outSize:1},w=sj[r]||cn(o.dtype),v=[{type:"int32",data:[h]}],k=new Pd(b,r,n.device.limits.maxComputeWorkgroupSizeX),N=n.runWebGPUProgram(k,[l],w,v);i.push(N),f=tt({inputs:{x:N},attrs:{shape:d},backend:n})}return i.forEach(h=>n.disposeData(h.dataId)),f}function ij(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{keepDims:s,axis:i}=r;return so(n,i,s,"all",e)}var LN={kernelName:"All",backendName:"webgpu",kernelFunc:ij};function aj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{keepDims:s,axis:i}=r;return so(n,i,s,"any",e)}var BN={kernelName:"Any",backendName:"webgpu",kernelFunc:aj};var uc=class{constructor(t,e,r){this.workgroupSize=[64,1,1],this.variableNames=["x"],this.uniforms="infinityValue : f32,",this.size=!0;let n=[e];this.op=r==="min"?"<":">";let[s,i]=y.computeOutAndReduceShapes(t,n);this.outputShape=s.length===0?[1]:s,this.dispatchLayout=G(this.outputShape),C.sizeFromShape(i)<32?(this.type="plain",this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize)):(this.type="shared",this.dispatch=z(this.dispatchLayout,this.outputShape,[1,1,1])),this.inputShape=t,this.shaderKey=`argMinMax_${this.op}_${this.type}`}getUserCode(){let t=this.workgroupSize[0],e=()=>this.inputShape.length===1?"uniforms.xShape":`uniforms.xShape.${$o(this.inputShape.length-1)}`,r=()=>{let n="";if(this.outputShape.length===1)this.inputShape.length!==1&&(n+="outputCoords,");else for(let s=0;s<this.outputShape.length;s++)n+=`outputCoords.${$o(s)},`;return n};return this.type==="shared"?`
      fn DIV_CEIL(a : u32, b : u32) -> u32 {
        return ((a - 1u) / b + 1u);
      }

      ${`
      var<workgroup> xBestIndices : array<i32, ${t}>;
      var<workgroup> xBestValues : array<f32, ${t}>;
    `}

      ${B("index")} {
        let outputIndex = index / ${t};
        let reduceLength = ${e()};

        var bestIndex = i32(localId.x);
        var bestValue = uniforms.infinityValue;
        let outputCoords = getCoordsFromIndex(outputIndex);
        for (var k = i32(localId.x); k < reduceLength && outputIndex < uniforms.size;
            k = k + ${t}) {
          let candidate = getX(${r()} k);
          if (!isnan(candidate) && candidate ${this.op} bestValue) {
            bestValue = candidate;
            bestIndex = k;
          }
        }
        xBestValues[localId.x] = bestValue;
        xBestIndices[localId.x] = bestIndex;
        workgroupBarrier();

        var reduceSize = min(u32(reduceLength), ${t}u);
        for (var currentSize = reduceSize / 2u; reduceSize > 1u;
            currentSize = reduceSize / 2u) {
          let interval = DIV_CEIL(reduceSize, 2u);
          if (localId.x < currentSize) {
            let candidate = xBestValues[localId.x + interval];
            if (candidate ${this.op} bestValue) {
              bestValue = candidate;
              xBestValues[localId.x] = bestValue;
              xBestIndices[localId.x] = xBestIndices[localId.x + interval];
            }
          }
          reduceSize = interval;
          workgroupBarrier();
        }

        if (localId.x == 0u && outputIndex < uniforms.size) {
          setOutputAtIndexI32(outputIndex, xBestIndices[localId.x]);
        }
      }
    `:`
      ${B("index")} {
        if (index < uniforms.size) {
          let outputCoords = getCoordsFromIndex(index);
          var bestIndex = 0;
          var bestValue = getX(${r()} 0);
          let reduceLength = ${e()};
          for (var i = 1; i < reduceLength; i++) {
            let candidate = getX(${r()} i);
            if (candidate ${this.op} bestValue) {
              bestValue = candidate;
              bestIndex = i;
            }
          }
          setOutputAtIndexI32(index, bestIndex);
        }
      }
      `}};function uj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s}=r,i=C.parseAxisParam(s,n.shape),a=y.getAxesPermutation(i,n.shape.length),u=n,c=[];a!=null&&(u=_e({inputs:{x:n},backend:e,attrs:{perm:a}}),c.push(u),i=y.getInnerMostAxes(i.length,u.shape.length)),y.assertAxesAreInnerMostDims("argMax",[i[0]],u.shape.length);let l=new uc(u.shape,i[0],"max"),p=[{type:"float32",data:[Number.NEGATIVE_INFINITY]}],m=e.runWebGPUProgram(l,[u],"int32",p);return c.forEach(d=>e.disposeData(d.dataId)),m}var zN={kernelName:Ln,backendName:"webgpu",kernelFunc:uj};function cj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s}=r,i=C.parseAxisParam(s,n.shape),a=y.getAxesPermutation(i,n.shape.length),u=n,c=[];a!=null&&(u=_e({inputs:{x:n},backend:e,attrs:{perm:a}}),c.push(u),i=y.getInnerMostAxes(i.length,u.shape.length)),y.assertAxesAreInnerMostDims("argMin",[i[0]],u.shape.length);let l=new uc(u.shape,i[0],"min"),p=[{type:"float32",data:[Number.POSITIVE_INFINITY]}],m=e.runWebGPUProgram(l,[u],"int32",p);return c.forEach(d=>e.disposeData(d.dataId)),m}var VN={kernelName:Bn,backendName:"webgpu",kernelFunc:cj};var lj=lt({opType:K.ASIN}),WN={kernelName:gr,backendName:"webgpu",kernelFunc:lj};var pj=lt({opType:K.ASINH}),UN={kernelName:xr,backendName:"webgpu",kernelFunc:pj};var mj=lt({opType:K.ATAN}),GN={kernelName:Cr,backendName:"webgpu",kernelFunc:mj};var dj=Rt({opType:at.ATAN2}),HN={kernelName:yr,backendName:"webgpu",kernelFunc:dj};var fj=lt({opType:K.ATANH}),KN={kernelName:br,backendName:"webgpu",kernelFunc:fj};var _d=class{constructor(t){this.variableNames=["x"],this.uniforms="strides : vec2<i32>,",this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="poolWithFilterSizeEqualsOne"}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let batch = coords[0];
          let d = coords[3];

          let xRCCorner = coords.yz * uniforms.strides;
          let xRCorner = xRCCorner.x;
          let xCCorner = xRCCorner.y;

          let value = getX(batch, xRCorner, xCCorner, d);
          setOutputAtIndex(index, value);
        }
      }
    `}};var ur=class{constructor(t,e,r=!1,n=!1,s=!1){if(this.variableNames=["x"],this.uniforms="strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, convDims : vec2<i32>, filterDims : vec2<i32>,",this.workgroupSize=[128,1,1],this.size=!0,e==="avg"&&r)throw new Error("Cannot compute positions for average pool.");this.outputShape=t.outShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.poolType=e,this.computePositions=r,this.flattenPositions=n,this.includeBatchIndex=s,this.shaderKey=`pool2D_${e}_${r}_${n}_${s}`}getUserCode(){let t;this.poolType==="avg"?t="resultValue = resultValue + value; count = count + 1.0;":this.computePositions?t=`let currMaxValue = mix(value, maxValue, maxValueFound);
      if (value >= currMaxValue) {
        maxValue = value;
        maxValueFound = 1.0;
        maxPosition = ${this.flattenPositions?this.includeBatchIndex?"((batch * uniforms.xShape[1] + xR) * uniforms.xShape[2] + xC) * uniforms.xShape[3] + d":"(xR * uniforms.xShape[2] + xC) * uniforms.xShape[3] + d":"wR * uniforms.filterDims.y + wC"};
      }`:t="resultValue = max(value, resultValue);";let e="resultValue";return this.poolType==="avg"&&(e="resultValue / max(count, 1.0)"),`
      ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
          let batch = coords[0];
          let d = coords[3];
          let xRCCorner = vec2<i32>(coords.yz) * uniforms.strides - uniforms.pads;
          let xRCorner = xRCCorner.x;
          let xCCorner = xRCCorner.y;

          ${this.computePositions?`var maxValue = 0.0;
            var maxValueFound = 0.0;
            var maxPosition = 0;`:`var resultValue = ${this.poolType==="avg"?"0.0":"-1.0 / pow(10.0, -20.0)"};`}

          var count = 0.0;
          for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + uniforms.dilations.x) {
            let xR = xRCorner + wR;

            if (xR < 0 || xR >= uniforms.convDims.x) {
              continue;
            }

            for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + uniforms.dilations.y) {
              let xC = xCCorner + wC;
              if (xC < 0 || xC >= uniforms.convDims.y) {
                continue;
              }

              let value = getX(batch, xR, xC, d);
              ${t}
            }
          }

          ${this.computePositions?"setOutputAtIndexI32(index, maxPosition);":`setOutputAtIndex(index, ${e});`}
        }
      }
    `}},Pi=class{constructor(t,e,r=!1,n=!1,s=!1){if(this.variableNames=["x"],this.uniforms="strides : vec3<i32>, pads : vec3<i32>, convDims : vec3<i32>, filterDims : vec3<i32>,",this.workgroupSize=[128,1,1],this.size=!0,e==="avg"&&r)throw new Error("Cannot compute positions for average pool.");this.outputShape=t.outShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.poolType=e,this.computePositions=r,this.flattenPositions=n,this.includeBatchIndex=s,this.shaderKey=`pool3D_${e}_${r}_${n}_${s}`}getUserCode(){let t;this.poolType==="avg"?t="resultValue += value; count += 1.0;":this.computePositions?t=`let currMaxValue = mix(value, maxValue, maxValueFound);
      if (value >= currMaxValue) {
        maxValue = value;
        maxValueFound = 1.0;
        maxPosition = ${this.flattenPositions?this.includeBatchIndex?"(((batch * uniforms.xShape.y + xD) * uniforms.xShape.z + xR) * uniforms.xShape.w + xC) * uniforms.xShape.u + ch":"((xD * uniforms.xShape.z + xR) * uniforms.xShape.w + xC) * uniforms.xShape.u + ch":"wD * uniforms.filterDims.y * uniforms.filterDims.y + wR * uniforms.filterDims.z + wC"};
      }`:t="resultValue = max(value, resultValue);";let e="resultValue";return this.poolType==="avg"&&(e="resultValue / max(count, 1.0)"),`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let batch = coords.x;
          let ch = coords.u;

          let xCorner = vec3<i32>(coords.y, coords.z, coords.w) * uniforms.strides - uniforms.pads;
          let xDCorner = xCorner.x;
          let xRCorner = xCorner.y;
          let xCCorner = xCorner.z;

          ${this.computePositions?`var maxValue = 0.0;
            var maxValueFound = 0.0;
            var maxPosition = 0;`:`var resultValue = ${this.poolType==="avg"?"0.0":"-1.0 / pow(10.0, -20.0)"};`}

          var count = 0.0;
          for (var wD = 0; wD < uniforms.filterDims.x; wD++) {
            let xD = xDCorner + wD;
            if (xD < 0 || xD >= uniforms.convDims.x) {
              continue;
            }

            for (var wR = 0; wR < uniforms.filterDims.y; wR++) {
              let xR = xRCorner + wR;
              if (xR < 0 || xR >= uniforms.convDims.y) {
                continue;
              }

              for (var wC = 0; wC < uniforms.filterDims.z; wC++) {
                let xC = xCCorner + wC;
                if (xC < 0 || xC >= uniforms.convDims.z) {
                  continue;
                }

                let value = getX(batch, xD, xR, xC, ch);
                ${t}
              }
            }
          }

          ${this.computePositions?"setOutputAtIndexI32(index, maxPosition);":`setOutputAtIndex(index, ${e});`}
        }
      }
    `}};function gC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{reductionIndices:s,keepDims:i}=r;return so(n,s,i,"max",e)}var qN={kernelName:"Max",backendName:"webgpu",kernelFunc:gC};function xC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{keepDims:s,axis:i}=r;return so(n,i,s,"mean",e)}var XN={kernelName:Es,backendName:"webgpu",kernelFunc:xC};function Od(o,t,e,r){if(t.filterWidth===1&&t.filterHeight===1&&C.arraysEqual(t.inShape,t.outShape))return ie({inputs:{x:o},backend:r});if(t.filterWidth===t.inWidth&&t.filterHeight===t.inHeight&&t.batchSize===1&&t.padInfo.type==="VALID"){let i=o.shape.length,a=tt({inputs:{x:o},backend:r,attrs:{shape:[o.shape[i-3]*o.shape[i-2],o.shape[i-1]]}}),u;e==="avg"?u=xC({inputs:{x:a},backend:r,attrs:{axis:0,keepDims:!1}}):(C.assert(e==="max",()=>`Invalid pool type ${e}`),u=gC({inputs:{x:a},backend:r,attrs:{reductionIndices:0,keepDims:!1}}));let c=tt({inputs:{x:u},backend:r,attrs:{shape:t.outShape}});return r.disposeData(a.dataId),r.disposeData(u.dataId),c}let n,s=[{type:"int32",data:[t.strideHeight,t.strideWidth]}];return t.filterHeight===1&&t.filterWidth===1?n=new _d(t):(e==="avg"?n=new ur(t,"avg"):(C.assert(e==="max",()=>`Invalid pool type ${e}`),n=new ur(t,"max")),s.push({type:"int32",data:[t.padInfo.top,t.padInfo.left]},{type:"int32",data:[t.dilationHeight,t.dilationWidth]},{type:"int32",data:[t.inHeight,t.inWidth]},{type:"int32",data:[t.effectiveFilterHeight,t.effectiveFilterWidth]})),r.runWebGPUProgram(n,[o],o.dtype,s)}function hj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{filterSize:s,strides:i,pad:a,dimRoundingMode:u}=r,l=y.computePool2DInfo(n.shape,s,i,1,a,u);return Od(n,l,"avg",e)}var jN={kernelName:zn,backendName:"webgpu",kernelFunc:hj};function gj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{filterSize:s,strides:i,pad:a,dataFormat:u,dimRoundingMode:c}=r,l=[1,1,1],p=y.computePool3DInfo(n.shape,s,i,l,a,c,u),m=new Pi(p,"avg"),d=[{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.padInfo.front,p.padInfo.top,p.padInfo.left]},{type:"int32",data:[p.inDepth,p.inHeight,p.inWidth]},{type:"int32",data:[p.effectiveFilterDepth,p.effectiveFilterHeight,p.effectiveFilterWidth]}];return e.runWebGPUProgram(m,[n],n.dtype,d)}var YN={kernelName:Vn,backendName:"webgpu",kernelFunc:gj};var Md=class{constructor(t){this.variableNames=["dy"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32, avgMultiplier : f32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="avgPool2DBackprop"}getUserCode(){return`
      ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d = coords[3];

        let dyRCCorner = vec2<i32>(coords.yz) - uniforms.pads;
        let dyRCorner = dyRCCorner.x;
        let dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR = wR + uniforms.dilations[0]) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims[1]; wC = wC + uniforms.dilations[1]) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }
            let idyC = i32(dyC);

            let dyValue = getDy(batch, idyR, idyC, d);

            dotProd = dotProd + dyValue * uniforms.avgMultiplier;
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}},Ld=class{constructor(t){this.variableNames=["dy"],this.uniforms=`strides : vec3<i32>, pads : vec3<i32>, filterDims : vec3<i32>,
       outDepth : i32, outHeight : i32, outWidth : i32, avgMultiplier : f32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="avgPool3DBackprop"}getUserCode(){return`
      ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let ch = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyDCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wD = 0; wD < uniforms.filterDims[0]; wD++) {
          let dyD = f32(dyDCorner + wD) / f32(uniforms.strides[0]);

          if (dyD < 0.0 || dyD >= f32(uniforms.outDepth) || fract(dyD) > 0.0) {
            continue;
          }
          let idyD = i32(dyD);

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let dyValue = getDy(batch, idyD, idyR, idyC, ch);
              dotProd += dyValue * uniforms.avgMultiplier;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}};function xj(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,i=s,{filterSize:a,strides:u,pad:c,dimRoundingMode:l}=r,p=y.computePool3DInfo(i.shape,a,u,1,c,l),m=new Ld(p),d=1/(p.filterDepth*p.filterHeight*p.filterWidth),f=[{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.effectiveFilterDepth-1-p.padInfo.front,p.effectiveFilterHeight-1-p.padInfo.top,p.effectiveFilterWidth-1-p.padInfo.left]},{type:"int32",data:[p.effectiveFilterDepth,p.effectiveFilterHeight,p.effectiveFilterWidth]},{type:"int32",data:[p.outDepth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"float32",data:[d]}];return e.runWebGPUProgram(m,[n],i.dtype,f)}var QN={kernelName:Za,backendName:"webgpu",kernelFunc:xj};function Cj(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,i=s;Id([n,s],"avgPoolGrad");let{filterSize:a,strides:u,pad:c}=r,l=y.computePool2DInfo(i.shape,a,u,1,c),p=new Md(l),m=1/(l.filterHeight*l.filterWidth),d=[{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.effectiveFilterHeight-1-l.padInfo.top,l.effectiveFilterWidth-1-l.padInfo.left]},{type:"int32",data:[l.dilationHeight,l.dilationWidth]},{type:"int32",data:[l.effectiveFilterHeight,l.effectiveFilterWidth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]},{type:"float32",data:[m]}];return e.runWebGPUProgram(p,[n],i.dtype,d)}var ZN={kernelName:Qa,backendName:"webgpu",kernelFunc:Cj};function bj(o){let{inputs:t,backend:e,attrs:r}=o,{a:n,b:s}=t,{transposeA:i,transposeB:a}=r;return Ga({a:n,b:s,transposeA:i,transposeB:a,backend:e})}var JN={kernelName:Wn,backendName:"webgpu",kernelFunc:bj};var Bd=class{constructor(t,e){this.variableNames=["source"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.rank=e.length,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.start=t,this.uniforms=`start : ${Vt(t.length)}, `,this.shaderKey="slice"}getUserCode(){let t=Vt(this.rank),e=yj(this.rank),r;return this.start.length===1?r=this.outputShape.map((s,i)=>"sourceLoc = uniforms.start + coords;"):r=this.outputShape.map((s,i)=>`sourceLoc.${CC[i]} = uniforms.start.${$o(i)} + coords.${CC[i]};`),`
      ${B("index")} {
        if (index < uniforms.size) {
          var sourceLoc : ${t};
          let coords = getCoordsFromIndex(index);
          ${r.join(`
`)}
          setOutputAtIndex(index, getSource(${e}));
        }
      }
    `}},CC=["x","y","z","w","u","v"];function yj(o){if(o===1)return"sourceLoc";if(o<=6)return CC.slice(0,o).map(t=>`sourceLoc.${t}`).join(",");throw Error(`Slicing for rank ${o} is not yet supported`)}function Vo(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{begin:s,size:i}=r,[a,u]=ee.parseSliceParams(n,s,i);if(ee.assertParamsValid(n,a,u),e.shouldExecuteOnCPU([n])||n.dtype==="string"){let p=e.tensorMap.get(n.dataId),m=kN(p.values,a,u,n.shape,n.dtype);return e.makeTensorInfo(u,n.dtype,m)}if(C.sizeFromShape(u)===0)return e.makeTensorInfo(u,n.dtype,[]);let c=new Bd(a,u),l=[{type:"int32",data:a}];return e.runWebGPUProgram(c,[n],n.dtype,l)}var tE={kernelName:Zs,backendName:"webgpu",kernelFunc:Vo};var wj=o=>{let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockShape:s,crops:i}=r;C.assert(n.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGPU backend not implemented yet");let a=s.reduce((b,w)=>b*w),u=y.getReshaped(n.shape,s,a),c=y.getPermuted(u.length,s.length),l=y.getReshapedPermuted(n.shape,s,a),p=y.getSliceBeginCoords(i,s.length),m=y.getSliceSize(l,i,s.length),d=[],f=tt({inputs:{x:n},backend:e,attrs:{shape:u}}),h=_e({inputs:{x:f},backend:e,attrs:{perm:c}}),g=tt({inputs:{x:h},backend:e,attrs:{shape:l}}),x=Vo({inputs:{x:g},backend:e,attrs:{begin:p,size:m}});return d.push(f),d.push(h),d.push(g),d.forEach(b=>e.disposeData(b.dataId)),x},eE={kernelName:Un,backendName:"webgpu",kernelFunc:wj};var Sj=`
  fn bincount_write(index: i32, value: f32) {
    ${oo("&result[index]","value","float32")}
  }
`,vj=`
  fn bincount_write(index: i32, value: f32) {
    atomicStore(&result[index], bitcast<i32>(value));
  }
`,cc=class{constructor(t,e,r=!1){this.outputShape=[],this.variableNames=["x"],this.uniforms="binCountSize : i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.hasWeights=!0,this.binaryOutput=!1,this.outputShape=t,this.rank=t.length,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.binaryOutput=r,r&&(this.atomic=!1),this.hasWeights=e,this.hasWeights&&this.variableNames.push("w"),this.shaderKey=`bincount_${this.hasWeights}_${this.binaryOutput}_${this.rank}`}getUserCode(){return`
    ${this.binaryOutput?vj:Sj}
  ${B("index")} {
    ${this.rank===1?`if (index < uniforms.xShape) {
      let indexVal = i32(getX(index));
      if (indexVal < uniforms.binCountSize) {
        let value = ${this.binaryOutput?1:this.hasWeights?"getW(index)":"1."};
        bincount_write(indexVal, value);
      }
    }`:`let coord = getCoordsFromIndex(index);
    if (coordsInBounds2D(coord, uniforms.xShape)) {
      let indexVal = i32(getX(coord[0], coord[1]));
      if (indexVal < uniforms.binCountSize) {
        let value = ${this.binaryOutput?1:this.hasWeights?"getW(coord[0], coord[1])":"1."};
        bincount_write(coord.x * uniforms.binCountSize + indexVal, value);
      }
    }`}
  }
  `}};function Ij(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,weights:s}=t,{size:i}=r,a=C.sizeFromShape(n.shape),c=C.sizeFromShape(s.shape)>0,l=[i],p=s.dtype,m=Zt({backend:e,attrs:{shape:l,value:0,dtype:p}}),d=new cc([a],c),f=[{type:"int32",data:[i]}],h=c?[n,s]:[n];return e.runWebGPUProgram(d,h,p,f,m)}var oE={kernelName:Gn,backendName:"webgpu",kernelFunc:Ij};var zd=class{constructor(t){this.outputShape=[],this.variableNames=["s0","s1"],this.uniforms="s0Size : i32, s1Size : i32, ",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="broadcastArgs"}getUserCode(){return`
  ${B("index")} {
    if (index < uniforms.size) {
      var s0 = 1.0;
      var s1 = 1.0;
      let indexS0 = index - uniforms.size + uniforms.s0Size;
      let indexS1 = index - uniforms.size + uniforms.s1Size;
      if (indexS0 >= 0) {
        s0 = getS0(indexS0);
      }
      if (indexS1 >= 0) {
        s1 = getS1(indexS1);
      }

      if (s0 == 1.0) {
        setOutputAtIndex(index, s1);
      } else if (s1 == 1.0) {
        setOutputAtIndex(index, s0);
      } else if (s0 != s1) {
        setOutputAtIndex(index, uniforms.NAN);
      } else {
        setOutputAtIndex(index, s0);
      }
    }
  }
  `}};function kj(o){let{inputs:t,backend:e}=o,{s0:r,s1:n}=t;if(e.shouldExecuteOnCPU([r,n])){let l=e.tensorMap.get(r.dataId),p=e.tensorMap.get(n.dataId),m=l.values,d=p.values,f=y.assertAndGetBroadcastShape(Array.from(m),Array.from(d));return e.makeTensorInfo([f.length],"int32",Int32Array.from(f))}let s=C.sizeFromShape(r.shape),i=C.sizeFromShape(n.shape),a=Math.max(s,i),u=new zd(a),c=[{type:"int32",data:[s]},{type:"int32",data:[i]}];return e.runWebGPUProgram(u,[r,n],"int32",c)}var rE={kernelName:Hn,backendName:"webgpu",kernelFunc:kj};var bC=Rt({opType:at.NOT_EQUAL,dtype:"bool",cpuKernelImpl:bN}),nE={kernelName:Ur,backendName:"webgpu",kernelFunc:bC};function En(o){let{inputs:t,backend:e}=o,{input:r}=t,n=e.tensorMap.get(r.dataId);return ie({inputs:{x:n.complexTensorInfos.real},backend:e})}var sE={kernelName:Us,backendName:"webgpu",kernelFunc:En};function iE(o,t){let e=new no(o.shape,K.TO_INT),r=t.runWebGPUProgram(e,[o],"int32");return{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}function yC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{dtype:s}=r;if(s==="complex64"){if(n.dtype==="complex64")return ie({inputs:{x:n},backend:e});let i=uo(n.shape),a=yC({inputs:{x:n},backend:e,attrs:{dtype:"float32"}}),u=po({inputs:{real:a,imag:i},backend:e});return i.dispose(),e.disposeData(a.dataId),u}if(n.dtype==="complex64"){let i=En({inputs:{input:n},backend:e}),a=yC({inputs:{x:i},backend:e,attrs:{dtype:s}});return e.disposeData(i.dataId),a}if(!C.hasEncodingLoss(n.dtype,s)){let i=ie({inputs:{x:n},backend:e});return{dataId:i.dataId,shape:i.shape,dtype:s}}if(e.shouldExecuteOnCPU([n])){let i=e.tensorMap.get(n.dataId).values,[a,u,c]=JT(i,n.shape,n.dtype,s);return e.makeTensorInfo(a,u,c)}if(s==="int32")return iE(n,e);if(s==="bool"){let i=e.makeTensorInfo([],"bool",C.getTypedArrayFromDType("bool",1)),u=bC({inputs:{a:n,b:i},backend:e});return e.disposeData(i.dataId),u}throw new Error(`Error in Cast: failed to cast ${n.dtype} to ${s}`)}var aE={kernelName:Ho,backendName:"webgpu",kernelFunc:yC};var $j=lt({opType:K.CEIL,cpuKernelImpl:tN}),uE={kernelName:wr,backendName:"webgpu",kernelFunc:$j};var Vd=class{constructor(t){this.variableNames=["A"],this.uniforms="minVal : f32, maxVal : f32,",this.workPerThread=4,this.workgroupSize=[64,1,1],this.outputComponent=4,this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.shaderKey="clipVec4"}getUserCode(){return`
      ${B("index")} {
        if(index < uniforms.size) {
          let value = getAByOutputIndex(index);
          var clampedValue = clamp(
              value, vec4<f32>(uniforms.minVal), vec4<f32>(uniforms.maxVal));
          clampedValue = select(clampedValue, value, isnanVec4(value));
          setOutputAtIndex(index, clampedValue);
        }
      }
    `}};var Wd=class{constructor(t){this.variableNames=["A"],this.uniforms="minVal : f32, maxVal : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="clip"}getUserCode(){return`
      ${B("index")} {
        if(index < uniforms.size) {
          let value = getAByOutputIndex(index);
          if (isnan(value)) {
            setOutputAtIndex(index, value);
            return;
          }
          setOutputAtIndex(index, clamp(value, uniforms.minVal, uniforms.maxVal));
        }
      }
    `}};function Tj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{clipValueMin:s,clipValueMax:i}=r,a,u=[{type:"float32",data:[s]},{type:"float32",data:[i]}];return C.sizeFromShape(n.shape)%4===0?a=new Vd(n.shape):a=new Wd(n.shape),e.runWebGPUProgram(a,[n],n.dtype,u)}var cE={kernelName:Sr,backendName:"webgpu",kernelFunc:Tj};var Ud=class{constructor(t){this.outputShape=[],this.variableNames=["real","imag"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="complexAbs"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.size) {
        let re = abs(getRealByOutputIndex(index));
        let im = abs(getImagByOutputIndex(index));
        let mx = max(re, im);

        // The length function in wgsl may be not underflow-safe on some GPUs.
        // So the safe solution is to ensure underflow-safety in all cases.
        setOutputAtIndex(index, select(mx * length(vec2<f32>(1, min(re, im)/mx)), 0.0, mx == 0.0));
      }
    }
  `}};function lE(o,t){return{dataId:t.dataId,dtype:t.dtype,shape:o.shape}}function Nj(o){let{inputs:t,backend:e}=o,{x:r}=t,n=e.tensorMap.get(r.dataId),s=new Ud(r.shape),i=[lE(r,n.complexTensorInfos.real),lE(r,n.complexTensorInfos.imag)];return e.runWebGPUProgram(s,i,i[0].dtype)}var pE={kernelName:qn,backendName:"webgpu",kernelFunc:Nj};var Gd=class{constructor(t){this.uniforms="",this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=y.computeOutShape(t,1),this.variableNames=t.map((e,r)=>`T${r}`),this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.offsetLength=t.length-1;for(let e=0;e<this.offsetLength;e++)this.uniforms+=`offset${e} : i32,`;this.shaderKey="concat"}getUserCode(){let t=[];if(this.offsetLength>0){t.push("if (yC < uniforms.offset0){ setOutputAtCoords(coords.x, coords.y, getT0(yR, yC)); }");for(let s=1;s<this.offsetLength;s++)t.push(`else if (yC < uniforms.offset${[s]}){ setOutputAtCoords(coords.x, coords.y, getT${s}(yR, yC - uniforms.offset${s-1})); }`);let r=this.offsetLength,n=this.offsetLength-1;t.push(`else { setOutputAtCoords(coords.x, coords.y, getT${r}(yR, yC - uniforms.offset${n})); }`)}else t.push("setOutputAtCoords(coords.x, coords.y, getT0(yR, yC));");return`
      ${B("index")} {
        for(var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if(flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            let yR = coords.x;
            let yC = coords.y;

            ${t.join(`
        `)}
          }
        }
      }
    `}};function Ha(o){let{inputs:t,backend:e}=o,{input:r}=t,n=e.tensorMap.get(r.dataId);return ie({inputs:{x:n.complexTensorInfos.imag},backend:e})}var mE={kernelName:Ss,backendName:"webgpu",kernelFunc:Ha};function lc(o,t,e){let r=o[0].dtype;if(r==="complex64"){let f=o.map(w=>En({inputs:{input:w},backend:e})),h=o.map(w=>Ha({inputs:{input:w},backend:e})),g=lc(f,t,e),x=lc(h,t,e),b=po({inputs:{real:g,imag:x},backend:e});return f.forEach(w=>e.disposeData(w.dataId)),h.forEach(w=>e.disposeData(w.dataId)),e.disposeData(g.dataId),e.disposeData(x.dataId),b}let n=e.shouldExecuteOnCPU(o);if(r==="string"&&(n=!0),n){let f=o.map(k=>{let E=[-1,C.sizeFromShape(k.shape.slice(t))];return tt({inputs:{x:k},backend:e,attrs:{shape:E}})}),h=f.map(k=>({vals:e.readSync(k.dataId),shape:k.shape})),g=y.computeOutShape(f.map(k=>k.shape),1),x=f[0].shape[0]===1,b=eN(h,g,r,x),w=y.computeOutShape(o.map(k=>k.shape),t),v=e.makeTensorInfo(w,r,b);return f.forEach(k=>e.disposeData(k.dataId)),v}let s=e.device.limits.maxStorageBuffersPerShaderStage-1;if(o.length>s){let f=[];for(let g=0;g<o.length;g+=s){let x=o.slice(g,g+s);f.push(lc(x,t,e))}let h=lc(f,t,e);for(let g of f)e.disposeData(g.dataId);return h}let{tensors2D:i,outShape:a}=Ej(o,t,e),u=i.map(f=>f.shape),c=new Gd(u),l=[],p=new Array(u.length-1);if(p.length>0){p[0]=u[0][1],l.push({type:"int32",data:[p[0]]});for(let f=1;f<p.length;f++)p[f]=p[f-1]+u[f][1],l.push({type:"int32",data:[p[f]]})}let m=e.runWebGPUProgram(c,i,i[0].dtype,l);i.forEach(f=>e.disposeData(f.dataId));let d=tt({inputs:{x:m},backend:e,attrs:{shape:a}});return e.disposeData(m.dataId),d}function Ej(o,t,e){let r=y.computeOutShape(o.map(s=>s.shape),t);return{tensors2D:o.map(s=>tt({inputs:{x:s},backend:e,attrs:{shape:[C.sizeFromShape(s.shape.slice(0,t)),C.sizeFromShape(s.shape.slice(t))]}})),outShape:r}}function wC(o){let{inputs:t,backend:e,attrs:r}=o,{axis:n}=r,s=C.parseAxisParam(n,t[0].shape)[0],i=t.map(c=>c.shape);y.assertParamsConsistent(i,s);let a=y.computeOutShape(t.map(c=>c.shape),s);if(C.sizeFromShape(a)===0)return e.makeTensorInfo(a,t[0].dtype,[]);let u=t.filter(c=>C.sizeFromShape(c.shape)>0);return u.length===1?ie({inputs:{x:u[0]},backend:e}):lc(u,s,e)}var dE={kernelName:Xn,backendName:"webgpu",kernelFunc:wC};function Rj(o,t,e,r,n=!1,s=null,i=!1,a=4,u=4,c=4){let l=A=>{switch(A){case 1:return"resData = f32(x[xIndex]);";case 3:return"resData = vec3<f32>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);";case 4:return"resData = vec4<f32>(x[xIndex / 4]);";default:throw new Error(`innerElementSize ${A} is not supported.`)}},p=A=>{switch(A){case 1:return"return f32(W[row * uniforms.wShape[3] + col]);";case 4:return"return vec4<f32>(W[(row * uniforms.wShape[3] + col) / 4]);";default:throw new Error(`innerElementSize ${A} is not supported.`)}},m=o?`
      let coord = vec4<i32>(batch, xRow, xCol, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, xRow, xCol);
      `,d=o?`
      let coords = vec4<i32>(
        batch,
        row / outWidth,
        row % outWidth,
        col);
      `:`
      let coords = vec4<i32>(
        batch,
        row,
        col / outWidth,
        col % outWidth);
      `,f=o?"uniforms.xShape[1]":"uniforms.xShape[2]",h=o?"uniforms.xShape[2]":"uniforms.xShape[3]",g=o?"row":"col",x=o?"col":"row",b=`
      let inChannels = uniforms.wShape[2];
      let outWidth = ${o?"uniforms.outShape[2]":"uniforms.outShape[3]"};
      let outRow = ${g} / outWidth;
      let outCol = ${g} % outWidth;

      let WRow = ${x} / (uniforms.filterDims[1] * inChannels);
      let WCol = ${x} / inChannels % uniforms.filterDims[1];
      let xRow = outRow * uniforms.strides[0] + uniforms.dilations[0] * WRow - uniforms.pads[0];
      let xCol = outCol * uniforms.strides[1] + uniforms.dilations[1] * WCol - uniforms.pads[1];
      let xCh = ${x} % inChannels;
      var resData = ${bt(a)}(0.0);
      // The bounds checking is always needed since we use it to pad zero for
      // the 'same' padding type.
      if (xRow >= 0 && xRow < ${f} && xCol >= 0 && xCol < ${h}) {
        ${m}
        let xIndex = getIndexFromCoords4D(coord, uniforms.xShape);
        ${l(a)}
      }
      return resData;`,w=o?t&&r?`
      ${b}`:`
      if (row < uniforms.dimAOuter && col < uniforms.dimInner) {
        ${b}
      }
      return ${bt(a)}(0.0);`:r&&e?`
      ${b}`:`
      if (row < uniforms.dimInner && col < uniforms.dimBOuter) {
        ${b}
      }
      return ${bt(a)}(0.0);`,v=`${p(u)}`,k=bt(c),N=o?bt(a):bt(u),E=o?bt(u):bt(a);return`
      ${De(s,i,c===4,4)}
      fn mm_readA(batch: i32, row : i32, col : i32) -> ${N} {
        ${o?w:v}
      }

      fn mm_readB(batch: i32, row : i32, col : i32) -> ${E} {
        ${o?v:w}
      }

      fn mm_write(batch: i32, row : i32, col : i32, valueIn : ${k}) {
        if (row < uniforms.dimAOuter && col < uniforms.dimBOuter)
        {
        var value = valueIn;
        let outWidth = ${o?"uniforms.outShape[2]":"uniforms.outShape[3]"};
        ${d}
        ${ro(n,s)}
        setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }`}var Hd=class{constructor(t,e,r,n,s=!1,i=null,a=!1,u=!1){this.variableNames=["x","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, dilations : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=t.outShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.isVec4=((t.inChannels%4===0||t.inChannels%3===0)&&this.isChannelsLast||t.outWidth%4===0&&!this.isChannelsLast)&&t.outChannels%4===0,this.dispatchLayout=this.isChannelsLast?{x:[3],y:[1,2],z:[0]}:{x:[2,3],y:[1],z:[0]},this.workgroupSize=wd(this.dispatchLayout,this.outputShape,this.isVec4),this.elementsPerThread=Sd(this.dispatchLayout,this.outputShape,this.isVec4),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread),this.isVec4?(this.outputComponent=4,this.isChannelsLast&&t.inChannels%4!==0?(this.innerElementSize=3,this.variableComponents=[1,4]):(this.innerElementSize=4,this.variableComponents=[4,4]),s&&(this.variableNames.push("bias"),this.variableComponents.push(4)),a&&(this.variableNames.push("preluActivationWeights"),this.variableComponents.push(4))):(this.innerElementSize=this.elementsPerThread[0],s&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights")),this.sequentialAccessByThreads=u,this.addBias=s,this.activation=i,this.hasPreluActivationWeights=a,this.tileAOuter=this.workgroupSize[1]*this.elementsPerThread[1],this.tileBOuter=this.workgroupSize[0]*this.elementsPerThread[0],this.tileInner=Math.max(this.workgroupSize[0]*this.innerElementSize,this.workgroupSize[1]),this.fitAOuter=e%this.tileAOuter===0,this.fitBOuter=r%this.tileBOuter===0,this.fitInner=n%this.tileInner===0,this.shaderKey=`conv2DMM_${this.elementsPerThread}_${this.activation}}_${this.fitAOuter}_${this.fitBOuter}_${this.fitInner}_${this.isVec4}_${this.innerElementSize}_${this.isChannelsLast}_${this.sequentialAccessByThreads}`}getUserCode(){let t=this.isVec4?Wa(this.elementsPerThread,this.workgroupSize,!this.isChannelsLast,this.tileInner):Ua(this.elementsPerThread,this.workgroupSize,!this.isChannelsLast,this.tileInner,!1,null,this.sequentialAccessByThreads),e=this.isVec4?[this.innerElementSize,4,4]:[1,1,1];return`
    ${Rj(this.isChannelsLast,this.fitAOuter,this.fitBOuter,this.fitInner,this.addBias,this.activation,this.hasPreluActivationWeights,e[0],e[1],e[2])}
    ${t}
  `}};var Kd=class{constructor(t,e=!1,r=null,n=!1){this.variableNames=["x","W"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>,",this.workgroupSize=[4,4,8],this.outputShape=t.outShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.dispatchLayout=this.isChannelsLast?{x:[2],y:[1],z:[0,3]}:{x:[3],y:[2],z:[0,1]},this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.addBias=e,this.activation=r,this.hasPreluActivationWeights=n,e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.shaderKey=`conv2dnaive_${this.activation}_${this.isChannelsLast}`}getUserCode(){return`
       ${De(this.activation,this.hasPreluActivationWeights,!1,4)}
       fn readInp(batch : i32, row : i32, col : i32, chan : i32) -> f32{
         let coords = vec4<i32>(batch, row, col, chan);
         if (coordsInBounds4D(coords, uniforms.xShape)) {
           return  getX(batch, row, col, chan);
         } else {
          return 0.0;
         }
       }
       fn readFilt(row : i32, col : i32, xChannel : i32, outChannel : i32) -> f32{
         let coords = vec4<i32>(row, col, xChannel, outChannel);
         if(coordsInBounds4D(coords, uniforms.wShape)) {
           return getW(row, col, xChannel, outChannel);
          } else {
            return 0.0;
          }
       }
       fn writeResult(batch : i32, row : i32, col : i32, chan : i32, valueIn : f32) {
         let coords = ${this.isChannelsLast?"vec4<i32>(batch, row, col, chan);":"vec4<i32>(batch, chan, row, col);"}
         if (coordsInBounds4D(coords, uniforms.outShape)) {
           var value = valueIn;
           ${ro(this.addBias,this.activation)}
           setOutputAtCoords(coords.x, coords.y, coords.z, coords.w, value);
         }
       }
       ${B("index")} {
         let coords = getOutputCoords();
         let batch = coords[0];
         let outChannel = ${this.isChannelsLast?"coords[3];":"coords[1];"}
         let outRow = ${this.isChannelsLast?"coords[1];":"coords[2];"}
         let outCol = ${this.isChannelsLast?"coords[2];":"coords[3];"}
         var acc : f32 = 0.0;
         for (var row = 0; row < uniforms.filterDims[0]; row = row + 1) {
           for (var col = 0; col < uniforms.filterDims[1]; col = col + 1) {
             let xRow = outRow * uniforms.strides[0] + uniforms.dilations[0] * row - uniforms.pads[0];
             let xCol = outCol * uniforms.strides[1] + uniforms.dilations[1] * col - uniforms.pads[1];
             for (var xChannel = 0; xChannel < ${this.isChannelsLast?"uniforms.xShape[3];":"uniforms.xShape[1];"} xChannel = xChannel + 1) {
               ${this.isChannelsLast?"let v = readInp(batch, xRow, xCol, xChannel);":"let v = readInp(batch, xChannel, xRow, xCol);"}
               let f = readFilt(row, col, xChannel, outChannel);
               acc = acc + v * f;
             }
           }
         }
         writeResult(batch, outRow, outCol, outChannel, acc);
       }
     `}};var qd=class{constructor(t,e){this.variableNames=["x"],this.uniforms=`pads : vec2<i32>, strides : vec2<i32>, dilations : vec2<i32>, outWidth : i32, itemsPerBlockRow : i32,
       inChannels : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=e,this.shaderKey=`im2col_${this.isChannelsLast}`}getUserCode(){let t=this.isChannelsLast?1:2,e=this.isChannelsLast?2:3,r=this.isChannelsLast?"coords[1]":"coords[2]",n=this.isChannelsLast?"coords[2]":"coords[1]",s=this.isChannelsLast?"getX(batch, xRow, xCol, ch)":"getX(batch, ch, xRow, xCol)";return`
    ${B("index")} {
      let coords = getCoordsFromIndex(index);
      if(index < uniforms.size) {
        let batch = coords[0];
        let row = ${r};
        let col = ${n};
        let offsetY = (row / uniforms.outWidth) * uniforms.strides[0] - uniforms.pads[0];
        let xRow = offsetY + uniforms.dilations[0] * (col / uniforms.itemsPerBlockRow);
        var value = 0.0;
        if(xRow < uniforms.xShape[${t}] && xRow >= 0) {
          let offsetX = (row % uniforms.outWidth) * uniforms.strides[1] -
              uniforms.pads[1];
          let xCol = offsetX + uniforms.dilations[1] * ((col %
              uniforms.itemsPerBlockRow) / uniforms.inChannels);
          let ch = col % uniforms.inChannels;
          if(xCol < uniforms.xShape[${e}] && xCol >= 0) {
            value = ${s};
          }
        }
        setOutputAtIndex(index, value);
      }
    }
   `}};function Xd(o,t){let e=o.length;return e>=3?t?[...o.slice(0,-3),o[e-3]*o[e-2],o[e-1]]:[...o.slice(0,-3),o[e-3],o[e-2]*o[e-1]]:!t&&e===1&&o[0]>1?[o[0],1]:null}function Dj({x:o,filter:t,convInfo:e,backend:r,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:i=0,activation:a=null}){let u=e.dataFormat==="channelsLast",c=!u,l=!1,p=u&&e.filterHeight===e.inHeight&&e.filterWidth===e.inWidth&&e.padInfo.type==="VALID",m=[],d,f;if(p){let x=e.inHeight*e.inWidth*e.inChannels;d=tt({inputs:{x:o},backend:r,attrs:{shape:[1,e.batchSize,x]}}),f=tt({inputs:{x:t},backend:r,attrs:{shape:[1,x,e.outChannels]}})}else d=tt({inputs:{x:o},backend:r,attrs:{shape:u?[e.batchSize,e.inHeight*e.inWidth,e.inChannels]:[e.batchSize,e.inChannels,e.inHeight*e.inWidth]}}),f=tt({inputs:{x:t},backend:r,attrs:{shape:[1,e.inChannels,e.outChannels]}});if(m.push(d),m.push(f),s!=null){let x=Xd(s.shape,u);x!=null&&(s=tt({inputs:{x:s},backend:r,attrs:{shape:x}}),m.push(s))}if(n!=null){let x=Xd(n.shape,u);x!=null&&(n=tt({inputs:{x:n},backend:r,attrs:{shape:x}}),m.push(n))}let h=Ga({a:u?d:f,b:u?f:d,transposeA:c,transposeB:l,backend:r,bias:n,activation:a,preluActivationWeights:s,leakyreluAlpha:i}),g=tt({inputs:{x:h},backend:r,attrs:{shape:e.outShape}});m.push(h);for(let x of m)r.disposeData(x.dataId);return g}function Aj({x:o,filter:t,convInfo:e,backend:r,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:i=0,activation:a=null}){let{filterWidth:u,filterHeight:c,inChannels:l,strideWidth:p,strideHeight:m,padInfo:d,outWidth:f,outHeight:h,dilationWidth:g,dilationHeight:x,dataFormat:b}=e,w=b==="channelsLast",v=u*c*l,k=h*f,N=w?[e.batchSize,k,v]:[e.batchSize,v,k],E=new qd(N,w),R=[{type:"int32",data:[d.top,d.left]},{type:"int32",data:[m,p]},{type:"int32",data:[x,g]},{type:"int32",data:[f]},{type:"int32",data:[l*u]},{type:"int32",data:[l]}],A=r.runWebGPUProgram(E,[o],o.dtype,R),F=[];F.push(A);let P=tt({inputs:{x:t},backend:r,attrs:{shape:[1,v,-1]}});if(F.push(P),s!=null){let W=Xd(s.shape,w);W!=null&&(s=tt({inputs:{x:s},backend:r,attrs:{shape:W}}),F.push(s))}if(n!=null){let W=Xd(n.shape,w);W!=null&&(n=tt({inputs:{x:n},backend:r,attrs:{shape:W}}),F.push(n))}let M=Ga({a:w?A:P,b:w?P:A,transposeA:!w,transposeB:!1,backend:r,bias:n,activation:a,preluActivationWeights:s,leakyreluAlpha:i}),L=tt({inputs:{x:M},backend:r,attrs:{shape:e.outShape}});F.push(M);for(let W of F)r.disposeData(W.dataId);return L}function jd({x:o,filter:t,convInfo:e,backend:r,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:i=0,activation:a=null}){let u=n!=null,c=s!=null,l=e.dataFormat==="channelsLast",p=l&&e.filterHeight===e.inHeight&&e.filterWidth===e.inWidth&&e.padInfo.type==="VALID",m=D().getBool("WEBGPU_USE_NAIVE_CONV2D_DEBUG");if(!m&&(p||e.filterHeight===1&&e.filterWidth===1&&e.dilationHeight===1&&e.dilationWidth===1&&e.strideHeight===1&&e.strideWidth===1&&(e.padInfo.type==="SAME"||e.padInfo.type==="VALID")))return Dj({x:o,filter:t,convInfo:e,backend:r,bias:n,activation:a,preluActivationWeights:s,leakyreluAlpha:i});let d=D().getNumber("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL"),f=d>-1?d:r.thresholdToIncreaseWorkgroups,h=e.batchSize*Math.ceil(e.outHeight*e.outWidth/32)*Math.ceil(e.outChannels/32);if(D().getBool("WEBGPU_CONV_SEPARATE_IM2COL_SHADER")||h<=f)return Aj({x:o,filter:t,convInfo:e,backend:r,bias:n,preluActivationWeights:s,leakyreluAlpha:i,activation:a});let g,x=[e.padInfo.top,e.padInfo.left],b=[{type:"int32",data:[e.filterHeight,e.filterWidth]},{type:"int32",data:[...x]},{type:"int32",data:[e.strideHeight,e.strideWidth]},{type:"int32",data:[e.dilationHeight,e.dilationWidth]}];if(m)g=new Kd(e,u,a,c);else{let N=l?e.outHeight*e.outWidth:e.outChannels,E=l?e.outChannels:e.outHeight*e.outWidth,R=e.filterHeight*e.filterWidth*e.inChannels;b.push({type:"int32",data:[N]},{type:"int32",data:[E]},{type:"int32",data:[R]});let A=r.adapterInfo.isIntel();g=new Hd(e,N,E,R,u,a,c,A)}let w=[],v=[o,t];u&&(!l&&n.shape.length===1&&(n=tt({inputs:{x:n},backend:r,attrs:{shape:[n.shape[0],1,1]}}),w.push(n)),v.push(n)),c&&(!l&&s.shape.length===1&&(s=tt({inputs:{x:s},backend:r,attrs:{shape:[s.shape[0],1,1]}}),w.push(s)),v.push(s)),a==="leakyrelu"&&(b.push({type:"float32",data:[i]}),g.uniforms+=" alpha : f32,");let k=r.runWebGPUProgram(g,v,o.dtype,b);for(let N of w)r.disposeData(N.dataId);return k}function Fj(o){let{inputs:t,attrs:e,backend:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dataFormat:u,dilations:c,dimRoundingMode:l}=e,p=y.convertConv2DDataFormat(u),m=y.computeConv2DInfo(n.shape,s.shape,i,c,a,l,!1,p);return jd({x:n,filter:s,convInfo:m,backend:r})}var fE={kernelName:jn,backendName:"webgpu",kernelFunc:Fj};var Yd=class{constructor(t){this.variableNames=["dy","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, outBackprop : vec4<i32>,",this.workgroupSize=[64,1,1],this.size=!1,this.isVec4=!1,this.workPerThread=1,this.outputShape=t.inShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.isVec4=this.isChannelsLast&&t.outChannels%4===0&&t.inChannels%4===0,this.isVec4?(this.workPerThread=2,this.outputComponent=4,this.workgroupSize=[4,4,4],this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[4,this.workPerThread,1])):(this.size=!0,this.workPerThread=1,this.workgroupSize=[64,1,1],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize)),this.shaderKey=`conv2DDerInput_${this.isChannelsLast}_${this.isVec4}_${this.workPerThread}`}getUserCode(){let t=this.isChannelsLast?1:2,e=this.isChannelsLast?2:3,r=this.isChannelsLast?3:1,n=`
    ${B()} {
      let batch = i32(globalId.z) / uniforms.outShape[1];
      let r = i32(globalId.z) % uniforms.outShape[1];
      let c = i32(globalId.y) * ${this.workPerThread};
      let d1 = i32(globalId.x) * 4;

      let dyCorner = vec2<i32>(r, c) - uniforms.pads;

      // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
      // ? = to be determined. : = across all values in that axis.
      var dotProd: array<vec4<f32>, ${this.workPerThread}>;
      for (var i = 0; i < ${this.workPerThread}; i++) {
        dotProd[i] = vec4<f32>(0.0);
      }
      for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + 1) {
        let dyR = f32(dyCorner.x + wR) / f32(uniforms.strides.x);
        let wRPerm = uniforms.filterDims.x - 1 - wR;
        if (dyR < 0.0 || dyR >= f32(uniforms.outBackprop[1]) ||
            fract(dyR) > 0.0) {
          continue;
        }
        let idyR = i32(dyR);

        for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + 1) {
          let dyC = f32(dyCorner.y + wC) / f32(uniforms.strides.y);
          let dyC2 = f32(dyCorner.y + 1 + wC) / f32(uniforms.strides.y);
          let wCPerm = uniforms.filterDims.y - 1 - wC;
          var bDyCVal = true;
          var bDyCVal2 = true;
          if (dyC < 0.0 || dyC >= f32(uniforms.outBackprop[2]) ||
              fract(dyC) > 0.0) {
            bDyCVal = false;
          }
          if (dyC2 < 0.0 || dyC2 >= f32(uniforms.outBackprop[2]) ||
              fract(dyC2) > 0.0) {
            bDyCVal2 = false;
          }

          let idyC = i32(dyC);
          let idyC2 = i32(dyC2);
          if (bDyCVal && bDyCVal2) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[0] = dotProd[0] + tmpval;
              xValue = getDy(batch, idyR, idyC2, d2);
              dotProd[1] = dotProd[1] + vec4<f32>(dot(xValue, wValue0),
                                                  dot(xValue, wValue1),
                                                  dot(xValue, wValue2),
                                                  dot(xValue, wValue3));
            }
          } else if (bDyCVal) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[0] = dotProd[0] + tmpval;
            }
          } else if (bDyCVal2) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC2, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[1] = dotProd[1] + tmpval;
            }
          }
        }
      }

      for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
        let coords = vec4<i32>(batch, r, c + i, d1);
        if (coordsInBounds4D(coords, uniforms.outShape)) {
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], dotProd[i]);
        }
      }
    }
    `;return this.isVec4?`
    ${n}
    `:`
    ${B("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d1 = coords[${r}];

        let dyCorner = vec2<i32>(coords[${t}], coords[${e}]) - uniforms.pads;
        let dyRCorner = dyCorner.x;
        let dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + 1) {
          let dyR = (f32(dyRCorner) + f32(wR)) / f32(uniforms.strides.x);
          let wRPerm = uniforms.filterDims.x - 1 - wR;
          if (dyR < 0.0 || dyR >= f32(uniforms.outBackprop[1]) || fract(dyR) > 0.0 ||
              wRPerm < 0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + 1) {
            let dyC = (f32(dyCCorner) + f32(wC)) / f32(uniforms.strides.y);
            let wCPerm = uniforms.filterDims.y - 1 - wC;
            if (dyC < 0.0 || dyC >= f32(uniforms.outBackprop[2]) ||
                fract(dyC) > 0.0 || wCPerm < 0) {
              continue;
            }
            let idyC = i32(dyC);

            for (var d2 = 0; d2 < uniforms.outBackprop[3]; d2 = d2 + 1) {
              let xValue = ${this.isChannelsLast?"getDy(batch, idyR, idyC, d2)":"getDy(batch, d2, idyR, idyC)"};
              let wValue = getW(wRPerm, wCPerm, d1, d2);
              dotProd = dotProd + xValue * wValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}},Qd=class{constructor(t){this.variableNames=["x","dy"],this.uniforms="pads : vec2<i32>, strides : vec2<i32>, batchSize : i32, outHeight : i32, outWidth : i32, inHeight : i32, inWidth : i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=t.dataFormat==="channelsLast",this.shaderKey=`conv2DDerFilter_${this.isChannelsLast}`}getUserCode(){return`
    ${B("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wR = coords[0];
        let wC = coords[1];
        let d1 = coords[2];
        let d2 = coords[3];

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b = b + 1) {
          for (var yR = 0; yR < uniforms.outHeight; yR = yR + 1) {
            let xR = wR + yR * uniforms.strides[0] - uniforms.pads[0];
            if (xR < 0 || xR >= uniforms.inHeight) {
              continue;
            }

            for (var yC = 0; yC < uniforms.outWidth; yC = yC + 1) {
              let xC = wC + yC * uniforms.strides[1] - uniforms.pads[1];

              if (xC < 0 || xC >= uniforms.inWidth) {
                continue;
              }

              if (${this.isChannelsLast}) {
                let dyValue = getDy(b, yR, yC, d2);
                let xValue = getX(b, xR, xC, d1);
                dotProd = dotProd + xValue * dyValue;
              } else {
                let dyValue = getDy(b, d2, yR, yC);
                let xValue = getX(b, d1, xR, xC);
                dotProd = dotProd + xValue * dyValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}},Zd=class{constructor(t){this.variableNames=["x","dy"],this.uniforms=`pads : vec3<i32>, strides : vec3<i32>, batchSize : i32, outDepth : i32,
       outHeight : i32, outWidth : i32, inDepth : i32, inHeight : i32, inWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3DDerFilter"}getUserCode(){return`
    ${B("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wF = coords.x;
        let wR = coords.y;
        let wC = coords.z;
        let d1 = coords.w;
        let d2 = coords.u;

        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b++) {
          for (var yF = 0; yF < uniforms.outDepth; yF++) {
            let xF = wF + yF * uniforms.strides[0] - uniforms.pads[0];
            if (xF < 0 || xF >= uniforms.inDepth) {
              continue;
            }

            for (var yR = 0; yR < uniforms.outHeight; yR++) {
              let xR = wR + yR * uniforms.strides[1] - uniforms.pads[1];
              if (xR < 0 || xR >= uniforms.inHeight) {
                continue;
              }

              for (var yC = 0; yC < uniforms.outWidth; yC++) {
                let xC = wC + yC * uniforms.strides[2] - uniforms.pads[2];
                if (xC < 0 || xC >= uniforms.inWidth) {
                  continue;
                }

                let dyValue = getDy(b, yF, yR, yC, d2);
                let xValue = getX(b, xF, xR, xC, d1);
                dotProd += xValue * dyValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}},Jd=class{constructor(t){this.variableNames=["dy","W"],this.uniforms=`filterDims : vec3<i32>, pads : vec3<i32>, strides : vec3<i32>,
      outDepth : i32, outHeight : i32, outWidth : i32, outChannels : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3DDerInput"}getUserCode(){return`
    ${B("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let d1 = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyFCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        var dotProd = 0.0;
        for (var wF = 0; wF < uniforms.filterDims[0]; wF++) {
          let dyF = f32(dyFCorner + wF) / f32(uniforms.strides[0]);
          if (dyF < 0.0 || dyF >= f32(uniforms.outDepth) || fract(dyF) > 0.0) {
            continue;
          }
          let idyF = i32(dyF);

          let wFPerm = uniforms.filterDims[0] - 1 - wF;

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            let wRPerm = uniforms.filterDims[1] - 1 - wR;

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let wCPerm = uniforms.filterDims[2] - 1 - wC;

              for (var d2 = 0; d2 < uniforms.outChannels; d2++) {
                let xValue = getDy(batch, idyF, idyR, idyC, d2);
                let wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}};function Pj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,pad:a,dataFormat:u,dimRoundingMode:c,filterShape:l}=r,p=y.convertConv2DDataFormat(u),m=y.computeConv2DInfo(n.shape,l,i,1,a,c,!1,p),d=new Qd(m),f=[{type:"int32",data:[m.padInfo.top,m.padInfo.left]},{type:"int32",data:[m.strideHeight,m.strideWidth]},{type:"int32",data:[m.batchSize]},{type:"int32",data:[m.outHeight]},{type:"int32",data:[m.outWidth]},{type:"int32",data:[m.inHeight]},{type:"int32",data:[m.inWidth]}];return e.runWebGPUProgram(d,[n,s],n.dtype,f)}var hE={kernelName:Yn,backendName:"webgpu",kernelFunc:Pj};function _j(o=4){let t=s=>{switch(s){case 1:return"return W[getIndexFromCoords4D(coord, uniforms.wShape)];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = W[getIndexFromCoords4D(coord, uniforms.wShape)];
            let v1 = W[getIndexFromCoords4D(coord1, uniforms.wShape)];
            let v2 = W[getIndexFromCoords4D(coord2, uniforms.wShape)];
            let v3 = W[getIndexFromCoords4D(coord3, uniforms.wShape)];
            return vec4<f32>(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${s} is not supported.`)}},r=`if (row < uniforms.dimAOuter && col < uniforms.dimInner) {
        ${`
      let outRow = row / uniforms.outShape[2];
      let outCol = row % uniforms.outShape[2];

      let WRow = col / (uniforms.filterDims[1] * uniforms.outBackprop[3]);
      let WCol = col / uniforms.outBackprop[3] % uniforms.filterDims[1];
      let xR = f32(outRow - uniforms.pads[0] + WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(uniforms.outBackprop[1]) || fract(xR) > 0.0) {
        return ${bt(o)}(0.0);
      }
      if (xC < 0.0 || xC >= f32(uniforms.outBackprop[2]) || fract(xC) > 0.0) {
        return ${bt(o)}(0.0);
      }
      let coord = vec4<i32>(
          batch,
          i32(xR),
          i32(xC),
          col % uniforms.outBackprop[3]);
      return x[getIndexFromCoords4D(coord, uniforms.xShape)/${o}];`}
      }
      return ${bt(o)}(0.0);`;return`
  fn mm_readA(batch: i32, row : i32, col : i32) -> ${bt(o)} {
    ${r}
  }

  fn mm_readB(batch: i32, row : i32, col : i32) -> ${bt(o)} {
    let coordX = uniforms.filterDims.x - 1 -
        row / (uniforms.filterDims[1] * uniforms.outBackprop[3]);
    let coordY = uniforms.filterDims.y - 1 -
        (row / uniforms.outBackprop[3]) % uniforms.filterDims[1];
    if (row < uniforms.dimInner && col < uniforms.dimBOuter &&
        coordX >= 0 && coordY >= 0) {
      let rowInner = row % uniforms.outBackprop[3];
      let coord = vec4<i32>(coordX, coordY, col, rowInner);
      ${t(o)}
    }
    return ${bt(o)}(0.0);
  }

  fn mm_write(batch: i32, row : i32, col : i32, valueInput : ${bt(o)}) {
    if (row < uniforms.dimAOuter && col < uniforms.dimBOuter) {
      var value = valueInput;
      let outCoord = vec4<i32>(
          batch,
          row / uniforms.outShape[2],
          row % uniforms.outShape[2],
          col);
      result[getIndexFromCoords4D(outCoord, uniforms.outShape)/${o}] = value;
    }
  }`}var tf=class{constructor(t){this.variableNames=["x","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, outBackprop : vec4<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=t.inShape,C.assert(t.dataFormat==="channelsLast",()=>"TODO: NCHW is unimplemented"),this.isVec4=t.inChannels%4===0&&t.outChannels%4===0,this.dispatchLayout={x:[3],y:[1,2],z:[0]},this.workgroupSize=wd(this.dispatchLayout,this.outputShape,this.isVec4),this.elementsPerThread=Sd(this.dispatchLayout,this.outputShape,this.isVec4),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread),this.isVec4&&(this.outputComponent=4,this.variableComponents=[4,1]),this.shaderKey=`conv2DDerInputMM_${this.isVec4}_${this.elementsPerThread}`}getUserCode(){let t=this.isVec4?Wa(this.elementsPerThread,this.workgroupSize):Ua(this.elementsPerThread,this.workgroupSize);return`
    ${_j(this.isVec4?4:1)}
    ${t}
    `}};function Oj(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{inputShape:i,strides:a,pad:u,dataFormat:c,dimRoundingMode:l}=r,p=y.convertConv2DDataFormat(c),m=y.computeConv2DInfo(i,s.shape,a,1,u,l,!1,p),d=[{type:"int32",data:[m.filterHeight,m.filterWidth]},{type:"int32",data:[m.filterHeight-1-m.padInfo.top,m.filterWidth-1-m.padInfo.left]},{type:"int32",data:[m.strideHeight,m.strideWidth]},{type:"int32",data:[m.batchSize,m.outHeight,m.outWidth,m.outChannels]}],f;if(D().getBool("WEBGPU_USE_NAIVE_CONV2D_TRANSPOSE")||m.dataFormat!=="channelsLast")f=new Yd(m);else{f=new tf(m);let h=m.inHeight*m.inWidth,g=m.inChannels,x=m.filterHeight*m.filterWidth*m.outChannels;d.push({type:"uint32",data:[h]},{type:"uint32",data:[g]},{type:"uint32",data:[x]})}return e.runWebGPUProgram(f,[n,s],"float32",d)}var gE={kernelName:Qn,backendName:"webgpu",kernelFunc:Oj};var ef=class{constructor(t){this.variableNames=["x","W"],this.uniforms="filterDims: vec3<i32>, pads: vec3<i32>, strides: vec3<i32>, dilations: vec3<i32>,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3dnaive"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let batch = coords.x;
        let d2 = coords.u;

        let xFRCCorner = vec3<i32>(coords.y, coords.z, coords.w) * uniforms.strides - uniforms.pads;
        let xFCorner = xFRCCorner.x;
        let xRCorner = xFRCCorner.y;
        let xCCorner = xFRCCorner.z;

        let inputDepthNearestVec4 = (uniforms.xShape.u / 4) * 4;
        let inputDepthVec4Remainder = uniforms.xShape.u % 4;

        var dotProd = 0.0;
        for (var wF = 0; wF < uniforms.filterDims[0]; wF++) {
          let xF = xFCorner + wF * uniforms.dilations[0];
          if (xF < 0 || xF >= uniforms.xShape.y) {
            continue;
          }

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let xR = xRCorner + wR * uniforms.dilations[1];
            if (xR < 0 || xR >= uniforms.xShape.z) {
              continue;
            }

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let xC = xCCorner + wC * uniforms.dilations[2];
              if (xC < 0 || xC >= uniforms.xShape.w) {
                continue;
              }

              for (var d1 = 0; d1 < inputDepthNearestVec4; d1 += 4) {
                let xValues = vec4<f32>(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                let wValues = vec4<f32>(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (inputDepthVec4Remainder == 1) {
                dotProd += getX(batch, xF, xR, xC, inputDepthNearestVec4) *
                  getW(wF, wR, wC, inputDepthNearestVec4, d2);
              } else if (inputDepthVec4Remainder == 2) {
                let xValues = vec2<f32>(
                  getX(batch, xF, xR, xC, inputDepthNearestVec4),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1)
                );
                let wValues = vec2<f32>(
                  getW(wF, wR, wC, inputDepthNearestVec4, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (inputDepthVec4Remainder == 3) {
                let xValues = vec3<f32>(
                  getX(batch, xF, xR, xC, inputDepthNearestVec4),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2)
                );
                let wValues = vec3<f32>(
                  getW(wF, wR, wC, inputDepthNearestVec4, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 1, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }`}};function Mj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dilations:u}=r,c=y.computeConv3DInfo(n.shape,s.shape,i,u,a),l=[c.padInfo.front,c.padInfo.top,c.padInfo.left],p=[{type:"int32",data:[c.filterDepth,c.filterHeight,c.filterWidth]},{type:"int32",data:[...l]},{type:"int32",data:[c.strideDepth,c.strideHeight,c.strideWidth]},{type:"int32",data:[c.dilationDepth,c.dilationHeight,c.dilationWidth]}],m=new ef(c),d=Lt(n.dtype,s.dtype);return e.runWebGPUProgram(m,[n,s],d,p)}var xE={kernelName:Zn,backendName:"webgpu",kernelFunc:Mj};function Lj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,pad:a,filterShape:u}=r,c=y.computeConv3DInfo(n.shape,u,i,1,a),l=new Zd(c),p=[{type:"int32",data:[c.padInfo.front,c.padInfo.top,c.padInfo.left]},{type:"int32",data:[c.strideDepth,c.strideHeight,c.strideWidth]},{type:"int32",data:[c.batchSize]},{type:"int32",data:[c.outDepth]},{type:"int32",data:[c.outHeight]},{type:"int32",data:[c.outWidth]},{type:"int32",data:[c.inDepth]},{type:"int32",data:[c.inHeight]},{type:"int32",data:[c.inWidth]}];return e.runWebGPUProgram(l,[n,s],s.dtype,p)}var CE={kernelName:Ja,backendName:"webgpu",kernelFunc:Lj};function Bj(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{strides:i,pad:a,inputShape:u}=r,c=y.computeConv3DInfo(u,s.shape,i,1,a),l=new Jd(c),p=[{type:"int32",data:[c.filterDepth,c.filterHeight,c.filterWidth]},{type:"int32",data:[c.filterDepth-1-c.padInfo.front,c.filterHeight-1-c.padInfo.top,c.filterWidth-1-c.padInfo.left]},{type:"int32",data:[c.strideDepth,c.strideHeight,c.strideWidth]},{type:"int32",data:[c.outDepth]},{type:"int32",data:[c.outHeight]},{type:"int32",data:[c.outWidth]},{type:"int32",data:[c.outChannels]}];return e.runWebGPUProgram(l,[n,s],n.dtype,p)}var bE={kernelName:Jn,backendName:"webgpu",kernelFunc:Bj};var zj=lt({opType:K.COS}),yE={kernelName:"Cos",backendName:"webgpu",kernelFunc:zj};var Vj=lt({opType:K.COSH}),wE={kernelName:vr,backendName:"webgpu",kernelFunc:Vj};var of=class{constructor(t,e,r,n){this.variableNames=["Image","Boxes","BoxInd"],this.uniforms="extrapolationValue : f32,",this.workgroupSize=[64,1,1],this.size=!0;let[s]=e;this.outputShape=[s,r[0],r[1],t],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.methodId=n==="bilinear"?1:0,this.cropHeightBiggerThan1=this.outputShape[1]>1,this.cropWidthBiggerThan1=this.outputShape[2]>1,this.shaderKey=`cropAndResize_${this.methodId}_${this.cropHeightBiggerThan1}_${this.cropWidthBiggerThan1}`}getUserCode(){let[t,e]=["f32(uniforms.imageShape[1] - 1)","f32(uniforms.imageShape[2] - 1)"],[r,n,s]=this.cropHeightBiggerThan1?[`(${t} / f32(uniforms.outShape[1] - 1))`,"(y2-y1) * height_ratio",`y1*${t} + f32(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${t}`],[i,a,u]=this.cropWidthBiggerThan1?[`(${e} / f32(uniforms.outShape[2] - 1))`,"(x2-x1) * width_ratio",`x1*${e} + f32(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${e}`];return`
    ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let height_ratio = f32(${r});
        let width_ratio = f32(${i});
        let b = coords[0];
        let y = coords[1];
        let x = coords[2];
        let d = coords[3];
        // get box vals
        let y1 = getBoxes(b, 0);
        let x1 = getBoxes(b, 1);
        let y2 = getBoxes(b, 2);
        let x2 = getBoxes(b, 3);
        // get image in batch index
        let bInd = i32(round(getBoxInd(b)));
        if(bInd < 0 || bInd >= uniforms.outShape[0]) {
          return;
        }
        let height_scale = ${n};
        let width_scale = ${a};
        let in_y = ${s};
        if( in_y < 0.0 || in_y > ${t} ) {
          setOutputAtIndex(index, uniforms.extrapolationValue);
          return;
        }
        let in_x = ${u};
        if( in_x < 0.0 || in_x > ${e} ) {
          setOutputAtIndex(index, uniforms.extrapolationValue);
          return;
        }
        let sourceFracIndexCR = vec2<f32>(in_x,in_y);
        if(${this.methodId} == 1) {
          // Compute the four integer indices.
          let sourceFloorCR = vec2<i32>(sourceFracIndexCR);
          let sourceCeilCR = vec2<i32>(ceil(sourceFracIndexCR));
          let topLeft = getImage(bInd, sourceFloorCR.y, sourceFloorCR.x, d);
          let bottomLeft = getImage(bInd, sourceCeilCR.y, sourceFloorCR.x, d);
          let topRight = getImage(bInd, sourceFloorCR.y, sourceCeilCR.x, d);
          let bottomRight = getImage(bInd, sourceCeilCR.y, sourceCeilCR.x, d);
          let fracCR = sourceFracIndexCR - vec2<f32>(sourceFloorCR);
          let top = topLeft + (topRight - topLeft) * fracCR.x;
          let bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          let newValue = top + (bottom - top) * fracCR.y;
          setOutputAtIndex(index, newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          let sourceNearestCR = vec2<i32>(floor(
            sourceFracIndexCR + vec2<f32>(0.5,0.5)));
          let newValue = getImage(
            bInd, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutputAtIndex(index, newValue);
        }
      }
    }
    `}};var Wj=o=>{let{inputs:t,backend:e,attrs:r}=o,{image:n,boxes:s,boxInd:i}=t,{cropSize:a,method:u,extrapolationValue:c}=r,l=new of(n.shape[3],s.shape,a,u),p=[{type:"float32",data:[c]}];return e.runWebGPUProgram(l,[n,s,i],"float32",p)},SE={kernelName:rs,backendName:"webgpu",kernelFunc:Wj};var Ka;(function(o){o.Prod="*",o.Sum="+"})(Ka||(Ka={}));var gl=class{constructor(t,e,r,n){this.variableNames=["x"],this.uniforms="index : f32,",this.size=!0,this.workgroupSize=[128,1,1],this.outputShape=e,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.exclusive=r,this.reverse=n,this.op=t,this.shaderKey=`cum_${this.op}_${this.exclusive}_${this.reverse}`}getUserCode(){let t=this.outputShape.length,e=this.op===Ka.Prod?"1.0":"0.0",r=this.exclusive?e:`getX(${vE(t,"coords",this.op)})`,n=this.outputShape[this.outputShape.length-1],s="",i="";return this.exclusive?(s=this.reverse?`end != ${n-1}`:"end != 0",i=this.reverse?"end + 1":"end - 1"):(s=this.reverse?`end + pow2 < ${n}`:"end >= pow2",i=this.reverse?"end + pow2":"end - pow2"),`
      ${B("index")} {
       if (index < uniforms.size) {
         var coords = getCoordsFromIndex(index);

         let end = ${IE(t,"coords",this.op)};
         var val = ${r};
         let pow2 = i32(pow(2.0, uniforms.index));
         if (${s}) {
           let idx = ${i};
           ${IE(t,"coords",this.op)} = idx;
           val ${this.op}= getX(${vE(t,"coords",this.op)});
         }
         setOutputAtIndex(index, val);
       }
      }
    `}};function vE(o,t,e){if(o===1)return`${t}`;if(o===2)return`${t}.x, ${t}.y`;if(o===3)return`${t}.x, ${t}.y, ${t}.z`;if(o===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${e} for rank ${o} is not yet supported`)}function IE(o,t,e){if(o===1)return`${t}`;if(o===2)return`${t}.y`;if(o===3)return`${t}.z`;if(o===4)return`${t}.w`;throw Error(`Cumulative ${e} for rank ${o} is not yet supported`)}function rf(o,t,e,r,n,s){let i=t.shape.length,a=y.getAxesPermutation([r],i),u=t;a!=null&&(u=_e({inputs:{x:t},backend:e,attrs:{perm:a}}));let c=y.getInnerMostAxes(1,i)[0];if(c!==i-1)throw new Error(`WebGPU cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${r}`);let l=u.shape[c],p=ie({inputs:{x:u},backend:e});for(let m=0;m<=Math.ceil(Math.log2(l))-1;m++){let d=new gl(o,u.shape,!1,s),f=p,h=[{type:"float32",data:[m]}];p=e.runWebGPUProgram(d,[p],p.dtype,h),e.disposeData(f.dataId)}if(n){let m=new gl(o,u.shape,n,s),d=p,f=[{type:"float32",data:[0]}];p=e.runWebGPUProgram(m,[p],p.dtype,f),e.disposeData(d.dataId)}if(a!=null){let m=y.getUndoAxesPermutation(a),d=_e({inputs:{x:p},backend:e,attrs:{perm:m}});return e.disposeData(p.dataId),e.disposeData(u.dataId),d}return p}function Uj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,exclusive:i,reverse:a}=r;return rf(Ka.Prod,n,e,s,i,a)}var kE={kernelName:es,backendName:"webgpu",kernelFunc:Uj};function Gj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,exclusive:i,reverse:a}=r;return rf(Ka.Sum,n,e,s,i,a)}var $E={kernelName:os,backendName:"webgpu",kernelFunc:Gj};function Hj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,weights:s}=t,{size:i,binaryOutput:a}=r,u=n.shape.length===1,l=C.sizeFromShape(s.shape)>0,p=s.dtype,m=u?[n.shape[0]]:[n.shape[0],n.shape[1]],d=u?[i]:[n.shape[0],i],f=Zt({backend:e,attrs:{shape:d,value:0,dtype:p}}),h=new cc(m,l,a),g=[{type:"int32",data:[i]}],x=l?[n,s]:[n];return e.runWebGPUProgram(h,x,p,g,f)}var TE={kernelName:ns,backendName:"webgpu",kernelFunc:Hj};var nf=class{constructor(t,e){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.uniforms="blockSize : i32,",this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`depthToSpace_${e}`,this.dataFormat=e}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let h = ${this.getHeightCoordString()};
          let w = ${this.getWidthCoordString()};
          let d = ${this.getDepthCoordString()};

          let in_h = h / uniforms.blockSize;
          let offset_h = h % uniforms.blockSize;
          let in_w = w / uniforms.blockSize;
          let offset_w = w % uniforms.blockSize;
          let offset_d = (offset_h * uniforms.blockSize + offset_w) *
            ${this.getOutputDepthSize()};
          let in_d = d + offset_d;

          let rlt = ${this.getInputSamplingString()};
          setOutputAtIndex(index, rlt);
        }
      }`}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?"uniforms.outShape[3]":"uniforms.outShape[1]"}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};function Kj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockSize:s,dataFormat:i}=r,a=n.shape[0],u=i==="NHWC"?n.shape[1]:n.shape[2],c=i==="NHWC"?n.shape[2]:n.shape[3],l=i==="NHWC"?n.shape[3]:n.shape[1],p=u*s,m=c*s,d=l/(s*s),f=i==="NHWC"?[a,p,m,d]:[a,d,p,m],h=[{type:"int32",data:[s]}],g=new nf(f,i);return e.runWebGPUProgram(g,[n],n.dtype,h)}var NE={kernelName:ss,backendName:"webgpu",kernelFunc:Kj};var sf=class{constructor(t,e,r,n=!1,s=null,i=!1){this.variableNames=["x","W"],this.uniforms="pads : vec2<i32>, inDims : vec2<i32>,",this.workgroupSize=[16,16,1],this.outputShape=t,this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),n&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.addBias=n,this.activation=s,this.hasPreluActivation=i,this.filterHeight=e,this.filterWidth=r,this.shaderKey=`depthwiseNCHW_${this.activation}_${this.filterHeight}_${this.filterWidth}`}getUserCode(){let t=this.filterWidth*this.filterHeight,e=this.workgroupSize[0]*this.workgroupSize[1]*this.workgroupSize[2],r=this.workgroupSize[1]+this.filterHeight-1,n=this.workgroupSize[0]+this.filterWidth-1;return`
      ${De(this.activation,this.hasPreluActivation,!1,4)}

      var<workgroup> mm_Asub : array<array<f32, ${n}>, ${r}>;
      var<workgroup> mm_Bsub : array<array<f32, ${this.filterWidth}>, ${this.filterHeight}>;
      fn readX(batch : i32, channel : i32, row : i32, col : i32) -> f32 {
        var value = 0.0;
        if (row >=0 && row < uniforms.inDims[0] && col >=0 && col < uniforms.inDims[1])
        {
          value = getX(batch, channel, row, col);
        }
        return value;
      }

      ${B()} {
        let coords = getOutputCoords();
        let batch = coords[0];
        let xRCCorner = vec2<i32>(coords.zw) - uniforms.pads;
        let channelMul = uniforms.wShape[3];
        let d1 = coords[1] / channelMul;
        let q = coords[1] % channelMul;

        let inputRowStart = xRCCorner.x;
        let inputColStart = xRCCorner.y;

        let localRow = i32(localId.y);
        let localCol = i32(localId.x);

        // Load one tile of X into local memory.
        for (var inputRow = localRow; inputRow < ${r}; inputRow = inputRow + ${this.workgroupSize[1]}) {
          for (var inputCol = localCol; inputCol < ${n}; inputCol = inputCol + ${this.workgroupSize[0]}) {
            let rowOffset = inputRow - localRow;
            let colOffset = inputCol - localCol;
            mm_Asub[inputRow][inputCol] = readX(batch, d1, inputRowStart + rowOffset, inputColStart + colOffset);
          }
        }

        // Load one tile of W into local memory.
        var wIndex = i32(localIndex);
        ${t<e?`if (wIndex < ${t})`:`for(; wIndex < ${t}; wIndex = wIndex + ${e})`}

        {
          let wRow = wIndex / ${this.filterWidth};
          let wCol = wIndex % ${this.filterWidth};
          mm_Bsub[wRow][wCol] = getW(wRow, wCol, d1, q);
        }

        workgroupBarrier();

        var value = 0.0;
        for (var wR = 0; wR < ${this.filterHeight}; wR = wR + 1) {
          for (var wC = 0; wC < ${this.filterWidth}; wC = wC + 1) {
            let xVal = mm_Asub[localRow + wR][localCol + wC];
            let wVal = mm_Bsub[wR][wC];
            value = fma(xVal, wVal, value);
          }
        }
        ${ro(this.addBias,this.activation)}
        if (coordsInBounds4D(coords, uniforms.outShape)) {
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }
    `}};var pc=class{constructor(t,e=!1,r=null,n=!1){this.variableNames=["x","W"],this.uniforms="pads : vec2<i32>, inDims : vec2<i32>, virtualWidth : i32,",this.workgroupSize=[64,1,1],this.workPerThread=4,this.outputComponent=4,this.outputShape=t.outShape,this.virtualWidth=Math.ceil(this.outputShape[2]/this.workPerThread)*this.workPerThread;let s=[this.outputShape[0],this.outputShape[1],this.virtualWidth,this.outputShape[3]];this.dispatchLayout=G(s),this.dispatch=z(this.dispatchLayout,s,this.workgroupSize,[this.outputComponent*this.workPerThread,1,1]),C.assert(t.dataFormat==="channelsLast",()=>"TODO: NCHW is unimplemented"),e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.convInfo=t,this.addBias=e,this.activation=r,this.hasPreluActivation=n,this.shaderKey=`depthwiseVec4_${r}_${this.convInfo.filterHeight}_${this.convInfo.filterWidth}_${this.convInfo.strideHeight}_${this.convInfo.strideWidth}_${this.workPerThread}`}getUserCode(){let t=(this.workPerThread-1)*this.convInfo.strideWidth+this.convInfo.filterWidth,e=this.convInfo.strideHeight,r=this.convInfo.strideWidth;return`
      ${De(this.activation,this.hasPreluActivation,!0,4)}
      fn readX(batch : i32, row : i32, col : i32, channel : i32) -> vec4<f32> {
        var value = vec4<f32>(0.0);
        if (col >=0 && col < uniforms.inDims[1]) {
          value = getX(batch, row, col, channel);
        }
        return value;
      }

      ${B("index")} {
        let width0 = uniforms.outShape[3] / ${this.outputComponent};
        let d1 = (index % width0) * ${this.outputComponent};
        var index1 = index / width0;
        let width1 = uniforms.virtualWidth / ${this.workPerThread};
        let c = (index1 % width1) * ${this.workPerThread};
        index1 = index1 / width1;
        let r = index1 % uniforms.outShape[1];
        let batch = index1 / uniforms.outShape[1];

        let xRCCorner = vec2<i32>(r, c) * vec2<i32>(${e}, ${r}) - uniforms.pads;

        let xRCorner = xRCCorner.x;
        let xCCorner = xRCCorner.y;
        var xVals : array<vec4<f32>, ${t}>;
        var dotProd : array<vec4<f32>, ${this.workPerThread}>;
        for (var i = 0; i < ${this.workPerThread}; i++) {
          dotProd[i] = vec4<f32>(0.0);
        }

        // Use constant instead of uniform can give better performance.
        for (var wR = 0; wR < ${this.convInfo.filterHeight}; wR = wR + 1) {
          let xR = xRCorner + wR;
          if (xR >=0 && xR < uniforms.inDims[0]) {
            for (var i = 0; i < ${t}; i++) {
              xVals[i] = readX(batch, xR, xCCorner + i, d1);
            }
            for (var wC = 0; wC < ${this.convInfo.filterWidth}; wC = wC + 1) {
              let wValue = getW(wR, wC, d1, 0);
              for (var i = 0; i < ${this.workPerThread}; i++) {
                dotProd[i] = fma(xVals[i * ${r} + wC], wValue, dotProd[i]);
              }
            }
          }
        }

        for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let coords = vec4<i32>(batch, r, c + i, d1);
          if (coordsInBounds4D(coords, uniforms.outShape)) {
            var value = dotProd[i];
            ${ro(this.addBias,this.activation)}
            setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
          }
        }
      }
    `}};var mc=class{constructor(t,e=!1,r=null,n=!1){this.variableNames=["x","W"],this.uniforms=`pads : vec2<i32>, inDims : vec2<i32>, filterHeight : i32,
      filterWidth : i32, strides : vec2<i32>, dilations : vec2<i32>,`,this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=t.dataFormat==="channelsLast",e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.convInfo=t,this.addBias=e,this.activation=r,this.hasPreluActivation=n,this.shaderKey=`depthwise_${this.activation}_${this.isChannelsLast}`}getUserCode(){let t=this.isChannelsLast?"getX(batch, xR, xC, d1);":"getX(batch, d1, xR, xC);";return`
      ${De(this.activation,this.hasPreluActivation,!1,4)}

      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let batch = coords[0];
          let xRCCorner = vec2<i32>(coords.${this.isChannelsLast?"yz":"zw"}) * uniforms.strides - uniforms.pads;
          let d2 = coords[${this.isChannelsLast?3:1}];
          let channelMul = uniforms.wShape[3];
          let d1 = d2 / channelMul;
          let q = d2 % channelMul;

          let inputRowStart = xRCCorner.x;
          let inputColStart = xRCCorner.y;
          let inputRowEnd = inputRowStart + uniforms.filterHeight *
              uniforms.dilations[0];
          let inputColEnd = inputColStart + uniforms.filterWidth *
              uniforms.dilations[1];

          // Convolve x(?, ?, d1)|x(d1, ?, ?) with w(:, :, d1, q) to get
          // y(yR, yC, d2)|y(d2, yR, yC). ? = to be determined. : = across all
          // values in that axis. x(?, ?, d1) and y(yR, yC, d2) is for NHWC.
          // x(d1, ?, ?) and y(d2, yR, yC) is for NCHW.
          var value = 0.0;

          // Extract if checking out of for loop for performance.
          if (inputRowStart >= 0 && inputColStart >= 0 &&
            inputRowEnd < uniforms.inDims[0] &&
                inputColEnd < uniforms.inDims[1]) {
              for (var wR = 0; wR < uniforms.filterHeight; wR = wR + 1) {
                let xR = inputRowStart + wR * uniforms.dilations[0];

                for (var wC = 0; wC < uniforms.filterWidth; wC = wC + 1) {
                  let xC = inputColStart + wC * uniforms.dilations[1];

                  let xVal = ${t};
                  let wVal = getW(wR, wC, d1, q);
                  value = value + xVal * wVal;
                }
              }
            } else {
              for (var wR = 0; wR < uniforms.filterHeight; wR = wR + 1) {
                let xR = inputRowStart + wR * uniforms.dilations[0];

                if (xR < 0 || xR >= uniforms.inDims[0]) {
                  continue;
                }

                for (var wC = 0; wC < uniforms.filterWidth; wC = wC + 1) {
                  let xC = inputColStart + wC * uniforms.dilations[1];

                  if (xC < 0 || xC >= uniforms.inDims[1]) {
                    continue;
                  }

                  let xVal = ${t};
                  let wVal = getW(wR, wC, d1, q);
                  value = value + xVal * wVal;
                }
              }
            }
            ${ro(this.addBias,this.activation)}
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }
    `}};function qj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dataFormat:u,dilations:c,dimRoundingMode:l}=r,p=y.convertConv2DDataFormat(u),m=c;m==null&&(m=[1,1]);let d=y.computeConv2DInfo(n.shape,s.shape,i,m,a,l,!0,p),f=[{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.inHeight,d.inWidth]}],h=d.dataFormat==="channelsLast",g;return!h&&d.inHeight>16&&d.inWidth>16&&d.strideHeight===1&&d.strideWidth===1&&d.dilationWidth===1&&d.dilationHeight===1&&d.inChannels===d.outChannels?g=new sf(d.outShape,d.filterHeight,d.filterWidth):h&&d.outHeight>4&&d.outWidth>4&&d.strideWidth<=2&&d.inChannels===d.outChannels&&d.dilationHeight===1&&d.dilationWidth===1&&d.inChannels%4===0?(g=new pc(d),f.push({type:"int32",data:[g.virtualWidth]})):(g=new mc(d),f.push({type:"int32",data:[d.filterHeight]},{type:"int32",data:[d.filterWidth]},{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]})),e.runWebGPUProgram(g,[n,s],n.dtype,f)}var EE={kernelName:is,backendName:"webgpu",kernelFunc:qj};var af=class{constructor(t){this.variableNames=["x","dy"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, filterDims : vec2<i32>, outHeight : i32,
      outWidth : i32, inHeight : i32, inWidth : i32, batchSize : i32, channelMul : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="depthwise_conv2d_backprop_filter"}getUserCode(){return`
      ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wR = coords[0];
        let wC = coords[1];
        let d1 = coords[2];
        let dm = coords[3];
        let d2 = d1 * uniforms.channelMul + dm;

        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b++) {
          for (var yR = 0; yR < uniforms.outHeight; yR++) {
            let xR = wR + yR * uniforms.strides[0] - uniforms.pads[0];

            if (xR < 0 || xR >= uniforms.inHeight) {
              continue;
            }

            for (var yC = 0; yC < uniforms.outWidth; yC++) {
              let xC = wC + yC * uniforms.strides[1] - uniforms.pads[1];

              if (xC < 0 || xC >= uniforms.inWidth) {
                continue;
              }

              let dyValue = getDy(b, yR, yC, d2);
              let xValue = getX(b, xR, xC, d1);
              dotProd += xValue * dyValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}},uf=class{constructor(t){this.variableNames=["dy","W"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32, channelMul : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="depthwise_conv2d_backprop_input"}getUserCode(){return`
      ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d1 = coords[3];
        let dyCorner = coords.yz - uniforms.pads;
        let dyRCorner = dyCorner.x;
        let dyCCorner = dyCorner.y;

        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }

          let idyR = i32(dyR);
          let wRPerm = uniforms.filterDims[0] - 1 - wR;

          for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }

            let idyC = i32(dyC);
            let wCPerm = uniforms.filterDims[1] - 1 - wC;

            for (var dm = 0; dm < uniforms.channelMul; dm++) {
              let d2 = d1 * uniforms.channelMul + dm;
              let xValue = getDy(batch, idyR, idyC, d2);
              let wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}};function Xj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,dy:s}=t,{strides:i,dilations:a,pad:u,dimRoundingMode:c,filterShape:l}=r,p=y.computeConv2DInfo(n.shape,l,i,a,u,c,!0),m=new af(p),d=[{type:"int32",data:[p.strideHeight,p.strideWidth]},{type:"int32",data:[p.padInfo.top,p.padInfo.left]},{type:"int32",data:[p.filterHeight,p.filterWidth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"int32",data:[p.inHeight]},{type:"int32",data:[p.inWidth]},{type:"int32",data:[p.batchSize]},{type:"int32",data:[p.outChannels/p.inChannels]}];return e.runWebGPUProgram(m,[n,s],"float32",d)}var RE={kernelName:as,backendName:"webgpu",kernelFunc:Xj};function jj(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,filter:s}=t,{strides:i,dilations:a,pad:u,dimRoundingMode:c,inputShape:l}=r,p=y.computeConv2DInfo(l,s.shape,i,a,u,c,!0),m=new uf(p),d=[{type:"int32",data:[p.strideHeight,p.strideWidth]},{type:"int32",data:[p.filterHeight-1-p.padInfo.top,p.filterWidth-1-p.padInfo.left]},{type:"int32",data:[p.filterHeight,p.filterWidth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"int32",data:[p.outChannels/p.inChannels]}];return e.runWebGPUProgram(m,[n,s],n.dtype,d)}var DE={kernelName:us,backendName:"webgpu",kernelFunc:jj};var cf=class{constructor(t){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,t],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="diag"}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let value = select(0.0, getX(coords[0]), coords[0] == coords[1]);
          setOutputAtIndex(index, value);
        }
      }
    `}};function Yj(o){let{inputs:t,backend:e}=o,{x:r}=t,n=[...r.shape,...r.shape],s=C.sizeFromShape(r.shape),i=tt({inputs:{x:r},backend:e,attrs:{shape:[s]}}),a=new cf(s),u=e.runWebGPUProgram(a,[i],i.dtype),c=tt({inputs:{x:u},backend:e,attrs:{shape:n}});return e.disposeData(i.dataId),e.disposeData(u.dataId),c}var AE={kernelName:cs,backendName:"webgpu",kernelFunc:Yj};var lf=class{constructor(t){this.variableNames=["x","w"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="dilation2d"}getUserCode(){return`
       ${B("index")} {
         if (index < uniforms.size) {
           let neg_infinity = -3.4e38;
           let coords = getOutputCoords();
           let batch = coords.x;
           let d1 = coords.w;
           let outTopLeftCorner = coords.yz * uniforms.strides - uniforms.pads;
           let hBeg = outTopLeftCorner.x;
           let wBeg = outTopLeftCorner.y;

           var curVal = neg_infinity;
           for (var h = 0; h < uniforms.filterDims[0]; h = h + 1) {
             let hIn = hBeg + h * uniforms.dilations[0];

             if (hIn >= 0 && hIn < uniforms.xShape[1]) {
               for (var w = 0; w < uniforms.filterDims[1]; w = w + 1) {
                 let wIn = wBeg + w * uniforms.dilations[1];

                 if (wIn >= 0 && wIn < uniforms.xShape[2]) {
                   let val = getX(batch, hIn, wIn, d1) + getW(h, w, d1);
                   if (val > curVal) {
                     curVal = val;
                   }
                 }
               }
             }
           }

           setOutputAtIndex(index, curVal);
         }
       }
     `}};function Qj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s}=t,{strides:i,pad:a,dilations:u}=r,c=y.computeDilation2DInfo(n.shape,s.shape,i,a,"NHWC",u),l=[c.padInfo.top,c.padInfo.left],p=[{type:"int32",data:[c.filterHeight,c.filterWidth]},{type:"int32",data:[...l]},{type:"int32",data:[c.strideHeight,c.strideWidth]},{type:"int32",data:[c.dilationHeight,c.dilationWidth]}],m=new lf(c);return e.runWebGPUProgram(m,[n,s],n.dtype,p)}var FE={kernelName:ls,backendName:"webgpu",kernelFunc:Qj};var pf=class{constructor(t,e){if(this.variableNames=["x","w","dy"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>, dySize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t.inShape,this.dispatchLayout=G(t.outShape),this.dispatch=z(this.dispatchLayout,t.outShape,this.workgroupSize),e!=="float32"&&e!=="int32")throw new Error(`Dilation2DBackpropInput only supports float32 and int32
          types, does not support ${e} type.`);this.type=e,this.shaderKey="dilation2DBackpropInput"}getUserCode(){return`
       ${B("index")} {
         if (index < uniforms.dySize) {
           let coords = getDyCoordsFromIndex(index);
           let b = coords[0];
           let r = coords[1];
           let c = coords[2];
           let d = coords[3];

           let dyCorner = vec2<i32>(r, c) * uniforms.strides - uniforms.pads;
           var curVal = -3.4e38;  // neg_infinity
           var xRMax = 0;
           var xCMax = 0;

           // In the case of multiple argmax branches, we only back-propagate
           // along the last branch, i.e., the one with largest value of
           // 'wR * uniforms.filterDims[1] + wC', similarly to the max-pooling
           // backward routines.
           for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
             let xR = dyCorner.x + wR * uniforms.dilations[0];

             if (xR >= 0 && xR < uniforms.xShape[1]) {
               for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
                 let xC = dyCorner.y + wC * uniforms.dilations[1];

                 if (xC >= 0 && xC < uniforms.xShape[2]) {
                   let val = getX(b, xR, xC, d) + getW(wR, wC, d);
                   if (val > curVal) {
                     curVal = val;
                     xRMax = xR;
                     xCMax = xC;
                   }
                 }
               }
             }
           }

           let flatIndexIn = d + uniforms.xShape[3] *
               (xCMax + uniforms.xShape[2] * (xRMax + uniforms.xShape[1] * b));
           let value = getDy(b, r, c, d);
           ${oo("&result[flatIndexIn]","value",this.type)}
         }
       }
     `}},mf=class{constructor(t,e,r){if(this.variableNames=["x","w","dy"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>, dySize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t.filterShape,this.dispatchLayout=G(t.outShape),this.dispatch=z(this.dispatchLayout,t.outShape,this.workgroupSize),r!=="float32"&&r!=="int32")throw new Error(`Dilation2DBackpropFilter only supports float32 and int32
          types, does not support ${r} type.`);this.type=r,this.shaderKey="dilation2DBackpropFilter"}getUserCode(){return`
       ${B("index")} {
         if (index < uniforms.dySize) {
           let coords = getDyCoordsFromIndex(index);
           let b = coords[0];
           let r = coords[1];
           let c = coords[2];
           let d = coords[3];

           let dyCorner = vec2<i32>(r, c) * uniforms.strides - uniforms.pads;
           var curVal = -3.4e38;  // neg_infinity
           var wRMax = 0;
           var wCMax = 0;

           // In the case of multiple argmax branches, we only back-propagate
           // along the last branch, i.e., the one with largest value of
           // 'wR * uniforms.filterDims[1] + wC', similarly to the max-pooling
           // backward routines.
           for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
             let xR = dyCorner.x + wR * uniforms.dilations[0];

             if (xR >= 0 && xR < uniforms.xShape[1]) {
               for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
                 let xC = dyCorner.y + wC * uniforms.dilations[1];

                 if (xC >= 0 && xC < uniforms.xShape[2]) {
                   let val = getX(b, xR, xC, d) + getW(wR, wC, d);
                   if (val > curVal) {
                     curVal = val;
                     wRMax = wR;
                     wCMax = wC;
                   }
                 }
               }
             }
           }

           let flatIndexIn = d + uniforms.wShape[2] * (wCMax + wRMax * uniforms.wShape[1]);
           let value = getDy(b, r, c, d);
           ${oo("&result[flatIndexIn]","value",this.type)}
         }
       }
     `}};function Zj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s,dy:i}=t,{strides:a,pad:u,dilations:c}=r,l=y.computeDilation2DInfo(n.shape,s.shape,a,u,"NHWC",c),p=s.dtype,m=new mf(l,s.shape,p),d=[{type:"int32",data:[l.filterHeight,l.filterWidth]},{type:"int32",data:[l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.dilationHeight,l.dilationWidth]},{type:"int32",data:[C.sizeFromShape(l.outShape)]}],f=Zt({backend:e,attrs:{shape:s.shape,value:0,dtype:p}});return e.runWebGPUProgram(m,[n,s,i],p,d,f)}var PE={kernelName:yc,backendName:"webgpu",kernelFunc:Zj};function Jj(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s,dy:i}=t,{strides:a,pad:u,dilations:c}=r,l=y.computeDilation2DInfo(n.shape,s.shape,a,u,"NHWC",c),p=n.dtype,m=new pf(l,p),d=[{type:"int32",data:[l.filterHeight,l.filterWidth]},{type:"int32",data:[l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.dilationHeight,l.dilationWidth]},{type:"int32",data:[C.sizeFromShape(l.outShape)]}],f=Zt({backend:e,attrs:{shape:l.inShape,value:0,dtype:p}});return e.runWebGPUProgram(m,[n,s,i],p,d,f)}var _E={kernelName:bc,backendName:"webgpu",kernelFunc:Jj};var df=class{constructor(t,e,r){this.variableNames=["Image"],this.uniforms="alpha: f32,",this.workgroupSize=[64,1,1],this.pixelsOpType=$n.DRAW,this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.type=e,this.textureFormat=r,this.shaderKey=`draw_${e}_${r}`}getUserCode(){let t,e=this.type==="float32"?"value":"value / 255.0";return t=`
      if (uniforms.numChannels == 1) {
        rgba[0] = ${e};
        rgba[1] = ${e};
        rgba[2] = ${e};
      } else {
        rgba[d] = ${e};
      }`,`
       @group(0) @binding(0) var outImage : texture_storage_2d<${this.textureFormat}, write>;
       ${B("index")} {
         if (index < uniforms.size) {
           var rgba = vec4<f32>(0.0, 0.0, 0.0, uniforms.alpha);
           for (var d = 0; d < uniforms.numChannels; d = d + 1) {
             let value = f32(inBuf[index * uniforms.numChannels + d]);
             ${t}
           }
           rgba.x = rgba.x * rgba.w;
           rgba.y = rgba.y * rgba.w;
           rgba.z = rgba.z * rgba.w;
           let coords = getCoordsFromIndex(index);
           textureStore(outImage, vec2<i32>(coords.yx), rgba);
         }
       }
      `}};function t5(o){let{inputs:t,backend:e,attrs:r}=o,{image:n}=t,{canvas:s,options:i}=r,[a,u]=n.shape.slice(0,2),{imageOptions:c}=i||{},l=c?.alpha||1,p=e.device.features.has("bgra8unorm-storage")?"bgra8unorm":"rgba8unorm",m=[a,u],d=new df(m,n.dtype,p);s.width=u,s.height=a;let f="webgpu",h=s.getContext(f),g;h||(g=new OffscreenCanvas(u,a),h=g.getContext(f));let x=n.shape.length===3?n.shape[2]:1;h.configure({device:e.device,format:p,usage:GPUTextureUsage.STORAGE_BINDING,alphaMode:"premultiplied"});let b="int32",w=e.makeTensorInfo(m,b),v=e.tensorMap.get(w.dataId);v.resource=h.getCurrentTexture(),v.external=!0;let k=[{type:"uint32",data:[x]},{type:"float32",data:[l]}];if(e.runWebGPUProgram(d,[n],b,k,w),g){let N=s.getContext("2d");if(!N)throw new Error("Please make sure this canvas has only been used for 2d or webgpu context!");N.drawImage(g,0,0)}return e.disposeData(w.dataId),n}var OE={kernelName:Wi,backendName:"webgpu",kernelFunc:t5};var SC=Rt({opType:at.MUL,cpuKernelImpl:xN,supportsComplex:!0}),ME={kernelName:Wr,backendName:"webgpu",kernelFunc:SC};function vC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;return so(n,s,i,"sum",e)}var LE={kernelName:"Sum",backendName:"webgpu",kernelFunc:vC};function e5(o){let{inputs:t,backend:e,attrs:r}=o,{equation:n}=r,s=t,{allDims:i,summedDims:a,idDims:u}=y.decodeEinsumEquation(n,s.length);y.checkEinsumDimSizes(i.length,u,s);let{path:c,steps:l}=y.getEinsumComputePath(a,u),p=l.length,m=null,d=i.length,f=[];for(let h=0;h<p;++h){for(let g of l[h]){let{permutationIndices:x,expandDims:b}=y.getEinsumPermutation(d,u[g]),w;y.isIdentityPermutation(x)?w=s[g]:(w=_e({inputs:{x:s[g]},backend:e,attrs:{perm:x}}),f.push(w));let v=w.shape.slice();for(let k=0;k<b.length;++k)v.splice(b[k],0,1);C.arraysEqual(w.shape,v)||(w=tt({inputs:{x:w},backend:e,attrs:{shape:v}}),f.push(w)),m===null?m=w:(m=SC({inputs:{a:w,b:m},backend:e}),f.push(m))}h<p-1&&(c[h]>=0&&(m=vC({inputs:{x:m},backend:e,attrs:{axis:c[h]-(i.length-d),keepDims:!1}}),f.push(m)),d--)}for(let h of f)h!==m&&e.disposeData(h.dataId);return m}var BE={kernelName:ps,backendName:"webgpu",kernelFunc:e5};var o5=lt({opType:K.ELU}),zE={kernelName:"Elu",backendName:"webgpu",kernelFunc:o5};var r5=o=>{let{inputs:t,backend:e}=o,{dy:r,y:n}=t,s=new Nn(at.ELU_DER,r.shape,n.shape);return e.runWebGPUProgram(s,[r,n],r.dtype)},VE={kernelName:tu,backendName:"webgpu",kernelFunc:r5};var n5=Rt({opType:at.EQUAL,dtype:"bool",cpuKernelImpl:oN}),WE={kernelName:kr,backendName:"webgpu",kernelFunc:n5};var s5=lt({opType:K.ERF}),UE={kernelName:"Erf",backendName:"webgpu",kernelFunc:s5};var i5=lt({opType:K.EXP,cpuKernelImpl:rN,dtype:"float32"}),GE={kernelName:"Exp",backendName:"webgpu",kernelFunc:i5};function ff(o){let{inputs:t,attrs:e,backend:r}=o,{dim:n}=e,{input:s}=t,i=s.shape.length,a=s.shape.slice(),u=n;return n<0&&(C.assert(-(i+1)<=n,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),u=i+n+1),a.splice(u,0,1),tt({inputs:{x:s},backend:r,attrs:{shape:a}})}var HE={kernelName:hs,backendName:"webgpu",kernelFunc:ff};var a5=lt({opType:K.EXPM1,cpuKernelImpl:nN}),KE={kernelName:$r,backendName:"webgpu",kernelFunc:a5};var xl=class{constructor(t,e){this.variableNames=["real","imag"],this.outputShape=[],this.uniforms="exponentMultiplier : f32, denominator: f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.component=t,this.shaderKey=`fft_${t}`}getUserCode(){return`
    fn unaryOpComplex(real: f32, expR: f32, imag: f32, expI: f32) -> f32 {
      ${this.component==="real"?"return real * expR - imag * expI;":"return real * expI + imag * expR;"}
    }

    fn mulMatDFT(batch: i32, index: i32) -> f32 {
      let indexRatio = f32(index) / f32(uniforms.realShape[1]);
      let exponentMultiplierTimesIndexRatio =
          uniforms.exponentMultiplier * indexRatio;

      var result = 0.0;

      for (var i = 0; i < uniforms.realShape[1]; i = i + 1) {
        // x = (-2|2 * PI / N) * index * i;
        let x = exponentMultiplierTimesIndexRatio * f32(i);
        let expR = cos(x);
        let expI = sin(x);
        let real = getReal(batch, i);
        let imag = getImag(batch, i);

        result = result +
            unaryOpComplex(real, expR, imag, expI) / uniforms.denominator;
      }

      return result;
    }

    ${B("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        setOutputAtIndex(index, mulMatDFT(coords[0], coords[1]));
      }
    }
  `}};function hf(o,t,e){let r=e.tensorMap.get(o.dataId),n=C.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],i=n/s,a=[],u=tt({inputs:{x:o},backend:e,attrs:{shape:[i,s]}});a.push(u);let c=u.shape,l=new xl("real",c),p=new xl("imag",c),m=[{dataId:r.complexTensorInfos.real.dataId,dtype:r.complexTensorInfos.real.dtype,shape:c},{dataId:r.complexTensorInfos.imag.dataId,dtype:r.complexTensorInfos.imag.dtype,shape:c}],d=t?2*Math.PI:-2*Math.PI,f=t?c[1]:1,h=[{type:"float32",data:[d]},{type:"float32",data:[f]}],g=e.runWebGPUProgram(l,m,"float32",h);a.push(g);let x=e.runWebGPUProgram(p,m,"float32",h);a.push(x);let b=po({inputs:{real:g,imag:x},backend:e});a.push(b);let w=tt({inputs:{x:b},backend:e,attrs:{shape:o.shape}});return a.forEach(v=>e.disposeData(v.dataId)),w}function u5(o){let{inputs:t,backend:e}=o,{input:r}=t;return hf(r,!1,e)}var qE={kernelName:"FFT",backendName:"webgpu",kernelFunc:u5};var gf=class{constructor(t){this.outputShape=[],this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="flipLeftRight"}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let coordX = uniforms.xShape[2] - coords[2] - 1;
          let outputValue = getX(coords[0], coords[1], coordX, coords[3]);
          setOutputAtIndex(index, outputValue);
        }
      }
    `}};var XE={kernelName:xs,backendName:"webgpu",kernelFunc:({inputs:o,backend:t})=>{let{image:e}=o,r=t,n=new gf(e.shape);return r.runWebGPUProgram(n,[e],e.dtype)}};var c5=lt({opType:K.FLOOR,cpuKernelImpl:sN}),jE={kernelName:Tr,backendName:"webgpu",kernelFunc:c5};var l5=Rt({opType:at.FLOOR_DIV,cpuKernelImpl:iN,dtype:"int32"}),YE={kernelName:Nr,backendName:"webgpu",kernelFunc:l5};var xf=class{constructor(t,e,r=!1){this.pixelsOpType=$n.FROM_PIXELS,this.outputShape=[0],this.variableNames=[],this.workgroupSize=[256,1,1],this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[e,1,1]),this.importVideo=r,this.shaderKey=`fromPixels_${this.importVideo}`}getUserCode(){let t=this.importVideo?"textureLoad(src, vec2<i32>(coords.yx));":"textureLoad(src, vec2<i32>(coords.yx), 0)";return`
      @binding(1) @group(0) var src: ${this.importVideo?"texture_external":"texture_2d<f32>"};
      ${B("index")} {
        let flatIndex = index * uniforms.numChannels;
        if (flatIndex < uniforms.size) {
          let coords = getCoordsFromIndex(flatIndex);
          let values = ${t};
          for (var i = 0; i < uniforms.numChannels; i = i + 1) {
            result[flatIndex + i] = i32(floor(255.0 * values[i]));
          }
        }
      }
  `}};var QE={kernelName:Yi,backendName:"webgpu",kernelFunc:p5},dc,IC=D().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function p5(o){let{inputs:t,backend:e,attrs:r}=o,{pixels:n}=t,{numChannels:s}=r;if(n==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let i=typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement,a=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,u=typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas,c=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,[l,p]=i?[n.videoWidth,n.videoHeight]:[n.width,n.height],m=[p,l,s],d=D().getBool("WEBGPU_IMPORT_EXTERNAL_TEXTURE")&&i,f=i||a;if(c||u||f){let b;if(d)b=e.device.importExternalTexture({source:n});else{if(f){let O=D().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(dc==null||O!==IC)&&(IC=O,dc=document.createElement("canvas").getContext("2d",{willReadFrequently:IC})),dc.canvas.width=l,dc.canvas.height=p,dc.drawImage(n,0,0,l,p),n=dc.canvas}let F=GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,_=e.textureManager.acquireTexture(m[1],m[0],"rgba8unorm",F);e.queue.copyExternalImageToTexture({source:n},{texture:_},[m[1],m[0]]),b=_}let w=C.sizeFromShape(m),v=C.computeStrides(m),k=new xf(m,s,d),N=[{type:"uint32",data:[w]},{type:"uint32",data:[s]},{type:"uint32",data:[...v]}],E=e.makeTensorInfo([p,l],"int32"),R=e.tensorMap.get(E.dataId);R.resource=b;let A=e.runWebGPUProgram(k,[E],"int32",N);return e.disposeData(E.dataId),A}let h=n.data,g=h;if(s!=null&&s!==4){g=new Uint8Array(n.width*n.height*s);let b=h.length,w=0;for(let v=0;v<b;v++)v%4<s&&(g[w++]=h[v])}let x=e.makeTensorInfo(m,"int32",new Int32Array(g));return e.uploadToGPU(x.dataId),x}var Cf=class{constructor(t,e,r,n,s){this.uniforms="varianceEpsilon : f32,",this.workgroupSize=[128,1,1],this.size=!0,this.variableNames=["x","mean","variance"],y.assertAndGetBroadcastShape(t,e),y.assertAndGetBroadcastShape(t,r),this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),n!=null&&(y.assertAndGetBroadcastShape(t,n),this.variableNames.push("offset")),s!=null&&(y.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale")),this.offsetShape=n,this.scaleShape=s,this.shaderKey="batchNorm"}getUserCode(){let t="0.0";this.offsetShape!=null&&(t="getOffsetByOutputIndex(index)");let e="1.0";return this.scaleShape!=null&&(e="getScaleByOutputIndex(index)"),`
      ${B("index")} {
        if (index < uniforms.size)
        {
          let xValue = getXByOutputIndex(index);
          let meanValue = getMeanByOutputIndex(index);
          let varianValue = getVarianceByOutputIndex(index);
          let offsetValue = ${t};
          let scaleValue = ${e};
          let inv = scaleValue * inverseSqrt(varianValue + f32(uniforms.varianceEpsilon));
          setOutputAtIndex(index,dot(vec3<f32>(xValue, -meanValue, offsetValue), vec3<f32>(inv, inv, 1.0)));
        }
      }
  `}};var ZE={kernelName:Cs,backendName:"webgpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{x:r,scale:n,offset:s,mean:i,variance:a}=o,{varianceEpsilon:u}=t,c=e,l=[r,i,a],p=null;s!=null&&(p=s.shape,l.push(s));let m=null;n!=null&&(m=n.shape,l.push(n));let d=new Cf(r.shape,i.shape,a.shape,p,m),f=[{type:"float32",data:[u]}];return c.runWebGPUProgram(d,l,r.dtype,f)}};function m5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s,bias:i,preluActivationWeights:a}=t,{strides:u,pad:c,dataFormat:l,dilations:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=r,h=y.convertConv2DDataFormat(l),g=y.computeConv2DInfo(n.shape,s.shape,u,p,c,m,!1,h);return jd({x:n,filter:s,convInfo:g,backend:e,bias:i,preluActivationWeights:a,leakyreluAlpha:f,activation:d})}var JE={kernelName:sn,backendName:"webgpu",kernelFunc:m5};function d5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,filter:s,bias:i,preluActivationWeights:a}=t,{strides:u,pad:c,dilations:l,dimRoundingMode:p,activation:m,leakyreluAlpha:d}=r,f=l;f==null&&(f=[1,1]),C.assert(y.eitherStridesOrDilationsAreOne(u,f),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${u} and dilations '${f}'`);let h=y.computeConv2DInfo(n.shape,s.shape,u,f,c,p,!0),g=[n,s],x=i!=null,b=a!=null;x&&g.push(i),b&&g.push(a);let w=[{type:"int32",data:[h.padInfo.top,h.padInfo.left]},{type:"int32",data:[h.inHeight,h.inWidth]}],v;return h.outHeight>4&&h.outWidth>4&&h.strideWidth<=2&&h.inChannels===h.outChannels&&h.dilationHeight===1&&h.dilationWidth===1&&h.inChannels%4===0?(v=new pc(h,x,m,b),w.push({type:"int32",data:[v.virtualWidth]})):(v=new mc(h,x,m,b),w.push({type:"int32",data:[h.filterHeight]},{type:"int32",data:[h.filterWidth]},{type:"int32",data:[h.strideHeight,h.strideWidth]},{type:"int32",data:[h.dilationHeight,h.dilationWidth]})),m==="leakyrelu"&&(w.push({type:"float32",data:[d]}),v.uniforms+=" alpha : f32,"),e.runWebGPUProgram(v,g,"float32",w)}var tR={kernelName:an,backendName:"webgpu",kernelFunc:d5};var bf=class{constructor(t,e){this.variableNames=["A","indices"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`gathernd_${t}`,this.sliceDim=t,this.uniforms=`sliceDim : i32, strides : ${Vt(t)},`}getUserCode(){let t;return this.sliceDim>1?t="uniforms.strides[j]":t="uniforms.strides",`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          var flattenIndex = 0;
          for (var j = 0; j < uniforms.sliceDim; j = j + 1) {
            let indexTemp = i32(round(getIndices(coords[0], j)));
            let strideNum = ${t};
            flattenIndex = flattenIndex + indexTemp * strideNum;
          }

          setOutputAtIndex(index, getA(flattenIndex, coords[1]));
        }
      }
      `}};function f5(o){let{inputs:t,backend:e}=o,{params:r,indices:n}=t,s=n.shape,i=s[s.length-1],a=C.sizeFromShape(r.shape),[u,c,l,p]=y.prepareAndValidate(r,n),m=tt({inputs:{x:n},backend:e,attrs:{shape:[c,i]}}),d=tt({inputs:{x:r},backend:e,attrs:{shape:[C.sizeFromShape(r.shape)/l,l]}});if(e.shouldExecuteOnCPU([r,n])||r.dtype==="string"){let b=e.readSync(n.dataId),w=e.bufferSync(r),v=aN(b,w,r.dtype,c,i,l,p,r.shape,a);return e.makeTensorInfo(u,r.dtype,v.values)}let f=new bf(i,[c,l]),h=[{type:"int32",data:[i]},{type:"int32",data:p}],g=e.runWebGPUProgram(f,[d,m],d.dtype,h),x=tt({inputs:{x:g},backend:e,attrs:{shape:u}});return e.disposeData(m.dataId),e.disposeData(d.dataId),e.disposeData(g.dataId),x}var eR={kernelName:ys,backendName:"webgpu",kernelFunc:f5};var yf=class{constructor(t,e){this.variableNames=["A","indices"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.slice(),this.aShape=t,this.outputShape=e,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="gather"}getUserCode(){let t=h5(this.aShape);return`
      ${B("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          let indexZ = i32(getIndices(resRC.x, resRC.z));
          let inBounds = select(0.0, 1.0, indexZ >= 0 && indexZ < uniforms.aShape[2]);
          setOutputAtIndex(index, inBounds * getA(${t}));
        }
      }
    `}};function h5(o){let t=["resRC.x","resRC.y","resRC.z","resRC.w"],e=[];for(let r=0;r<o.length;r++)r===2?e.push("indexZ"):e.push(`${t[r]}`);return e.join()}function kC(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,indices:s}=t,{axis:i,batchDims:a}=r,u=C.parseAxisParam(i,n.shape)[0],c=y.segment_util.collectGatherOpShapeInfo(n,s,u,a),l=C.sizeFromShape(s.shape),p=[],m=tt({inputs:{x:n},backend:e,attrs:{shape:[c.batchSize,c.outerSize,c.dimSize,c.sliceSize]}}),d=tt({inputs:{x:s},backend:e,attrs:{shape:[c.batchSize,l/c.batchSize]}});p.push(m),p.push(d);let f=[c.batchSize,c.outerSize,l/c.batchSize,c.sliceSize];if(e.shouldExecuteOnCPU([n,s])){let w=e.tensorMap.get(d.dataId).values,v=nt(d.shape,d.dtype,w),N=e.tensorMap.get(m.dataId).values,E=nt(m.shape,m.dtype,N),R=uN(E,v,f);return p.forEach(A=>e.disposeData(A.dataId)),e.makeTensorInfo(c.outputShape,R.dtype,R.values)}let h=new yf(m.shape,f),g=e.runWebGPUProgram(h,[m,d],m.dtype);p.push(g);let x=tt({inputs:{x:g},backend:e,attrs:{shape:c.outputShape}});return p.forEach(b=>e.disposeData(b.dataId)),x}var oR={kernelName:bs,backendName:"webgpu",kernelFunc:kC};var g5=Rt({opType:at.GREATER,cpuKernelImpl:lN,dtype:"bool"}),rR={kernelName:Er,backendName:"webgpu",kernelFunc:g5};var x5=Rt({opType:at.GREATER_EQUAL,dtype:"bool",cpuKernelImpl:cN}),nR={kernelName:Rr,backendName:"webgpu",kernelFunc:x5};function C5(o){let{inputs:t,backend:e}=o,{input:r}=t;return hf(r,!0,e)}var sR={kernelName:ws,backendName:"webgpu",kernelFunc:C5};var b5=lt({opType:K.IS_FINITE,dtype:"bool"}),iR={kernelName:Dr,backendName:"webgpu",kernelFunc:b5};var y5=lt({opType:K.IS_INF,dtype:"bool"}),aR={kernelName:Ar,backendName:"webgpu",kernelFunc:y5};var w5=lt({opType:K.IS_NAN,dtype:"bool"}),uR={kernelName:Fr,backendName:"webgpu",kernelFunc:w5};function S5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{alpha:s}=r,i=[{type:"float32",data:[s]}],a=new no(n.shape,K.LEAKYRELU,"alpha : f32,");return e.runWebGPUProgram(a,[n],"float32",i)}var cR={kernelName:vs,backendName:"webgpu",kernelFunc:S5};var v5=Rt({opType:at.LESS,dtype:"bool",cpuKernelImpl:mN}),lR={kernelName:Pr,backendName:"webgpu",kernelFunc:v5};var I5=Rt({opType:at.LESS_EQUAL,dtype:"bool",cpuKernelImpl:pN}),pR={kernelName:_r,backendName:"webgpu",kernelFunc:I5};var wf=class{constructor(t){this.variableNames=[],this.outputShape=[],this.uniforms="start : f32, step : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="linSpace"}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
          setOutputAtIndex(index, uniforms.start + f32(index) * uniforms.step);
        }
      }
    `}};function k5(o){let{backend:t,attrs:e}=o,{start:r,stop:n,num:s}=e,i=(n-r)/(s-1),a=new wf(s),u=[{type:"float32",data:[r]},{type:"float32",data:[i]}];return t.runWebGPUProgram(a,[],"float32",u)}var mR={kernelName:Is,backendName:"webgpu",kernelFunc:k5};var $5=lt({opType:K.LOG,cpuKernelImpl:dN}),dR={kernelName:"Log",backendName:"webgpu",kernelFunc:$5};var T5=lt({opType:K.LOG1P}),fR={kernelName:Or,backendName:"webgpu",kernelFunc:T5};var N5=Rt({opType:at.LOGICAL_AND,dtype:"bool"}),hR={kernelName:Mr,backendName:"webgpu",kernelFunc:N5};var E5=lt({opType:K.LOGICAL_NOT}),gR={kernelName:Lr,backendName:"webgpu",kernelFunc:E5};var R5=Rt({opType:at.LOGICAL_OR}),xR={kernelName:Br,backendName:"webgpu",kernelFunc:R5};var CR=`
  var powValue = 0.0;
  let basis = uniforms.bias + uniforms.alpha * sum;
  if (uniforms.beta == 0.5) {
    powValue = inverseSqrt(basis);
  } else if (uniforms.beta == 1.0) {
    powValue = 1.0 / basis;
  } else {
    powValue = exp(log(basis) * (-uniforms.beta));
  }
`,Sf=class{constructor(t){this.outputShape=[],this.variableNames=["x"],this.uniforms="radius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="lrn"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let b = coords[0];
        let r = coords[1];
        let c = coords[2];
        let d = coords[3];

        let x = getX(b, r, c, d);
        var sum = 0.0;
        for (var i = -uniforms.radius; i <= uniforms.radius; i = i + 1) {
          let idx = d + i;
          if (idx >= 0 && idx < uniforms.xShape[3]) {
            let z = getX(b, r, c, idx);
            sum = sum + z * z;
          }
        }
        ${CR}

        setOutputAtIndex(index, x * powValue);
      }
    }
  `}},vf=class{constructor(t,e){this.outputShape=[],this.variableNames=["x"],this.uniforms="radius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[256,1,1],this.maxAllowRadius=16,C.assert(e<=this.maxAllowRadius,()=>`Radius must be less than or equal to ${this.maxAllowRadius}, current radius is ${e}`),this.outputShape=t,this.elementsPerWorkgroup=this.workgroupSize[0]-2*this.maxAllowRadius,this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=z(this.dispatchLayout,this.outputShape,[this.elementsPerWorkgroup,this.workgroupSize[1],this.workgroupSize[2]]),this.shaderKey="lrn_shared"}getUserCode(){return`
    var <workgroup>lrnSub: array<f32, ${this.workgroupSize[0]}>;
    const elementsPerWorkgroup = ${this.elementsPerWorkgroup};
    const maxAllowRadius = ${this.maxAllowRadius};

    ${B()} {
      let localDepth = i32(localId.x);
      let workgroupDepth = i32(workgroupId.x) * elementsPerWorkgroup;
      let xDepth = workgroupDepth + localDepth - maxAllowRadius;
      let b = i32(globalId.z) / uniforms.xShape[1];
      let r = i32(globalId.z) - b * uniforms.xShape[1];
      let c = i32(globalId.y);
      let d = workgroupDepth + localDepth;

      var x = 0.0;
      if (xDepth >= 0 && xDepth < uniforms.xShape[3]) {
        x = getX(b, r, c, xDepth);
      }
      lrnSub[localDepth] = x;
      workgroupBarrier();

      if (localDepth < elementsPerWorkgroup && d < uniforms.outShape[3]) {
        var sum = 0.0;
        let index = localDepth + maxAllowRadius;
        for (var i = -uniforms.radius; i <= uniforms.radius; i = i + 1) {
          let z = lrnSub[index + i];
          sum = sum + z * z;
        }
        ${CR}

        setOutputAtCoords(b, r, c, d, lrnSub[index] * powValue);
      }
    } `}};function D5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{depthRadius:s,bias:i,alpha:a,beta:u}=r,c;s>16?c=new Sf(n.shape):c=new vf(n.shape,s);let l=[{type:"int32",data:[s]},{type:"float32",data:[i]},{type:"float32",data:[a]},{type:"float32",data:[u]}];return e.runWebGPUProgram(c,[n],n.dtype,l)}var bR={kernelName:"LRN",backendName:"webgpu",kernelFunc:D5};var If=class{constructor(t){this.outputShape=[],this.variableNames=["inputImage","outputImage","dy"],this.uniforms="depthRadius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="lrn_grad"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let b = coords[0];
        let r = coords[1];
        let c = coords[2];

        let MIN_DEPTH_BEGIN = 0;
        let MAX_DEPTH_END = uniforms.outShape[3];
        var result = 0.0;
        for (var d = MIN_DEPTH_BEGIN; d < MAX_DEPTH_END; d++) {
          let depthBegin = max(MIN_DEPTH_BEGIN, d - uniforms.depthRadius);
          let depthEnd = min(MAX_DEPTH_END, d + uniforms.depthRadius + 1);

          var norm = 0.0;
          for (var k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; k++) {
            if (k < depthBegin) {
              continue;
            } else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            } else {
              break;
            }
          }

          norm = uniforms.alpha * norm + uniforms.bias;

          for (var k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; k++) {
            if (k < depthBegin) {
              continue;
            } else if (k >= depthBegin && k < depthEnd) {
              var dyi = -2.0 * uniforms.alpha * uniforms.beta
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d) / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * uniforms.beta);
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            } else {
              break;
            }
          }
        }

        setOutputAtIndex(index, result);
      }
    }
  `}};function A5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,y:s,dy:i}=t,{depthRadius:a,bias:u,alpha:c,beta:l}=r,p=new If(n.shape),m=[{type:"int32",data:[a]},{type:"float32",data:[u]},{type:"float32",data:[c]},{type:"float32",data:[l]}];return e.runWebGPUProgram(p,[n,s,i],n.dtype,m)}var yR={kernelName:eu,backendName:"webgpu",kernelFunc:A5};var F5=Rt({opType:at.MAX,cpuKernelImpl:hN}),wR={kernelName:zr,backendName:"webgpu",kernelFunc:F5};function P5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{filterSize:s,strides:i,pad:a,dimRoundingMode:u}=r,l=y.computePool2DInfo(n.shape,s,i,1,a,u);return Od(n,l,"max",e)}var SR={kernelName:$s,backendName:"webgpu",kernelFunc:P5};function _5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{filterSize:s,strides:i,pad:a,dataFormat:u,dimRoundingMode:c}=r,l=[1,1,1],p=y.computePool3DInfo(n.shape,s,i,l,a,c,u),m=new Pi(p,"max"),d=[{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.padInfo.front,p.padInfo.top,p.padInfo.left]},{type:"int32",data:[p.inDepth,p.inHeight,p.inWidth]},{type:"int32",data:[p.effectiveFilterDepth,p.effectiveFilterHeight,p.effectiveFilterWidth]}];return e.runWebGPUProgram(m,[n],n.dtype,d)}var vR={kernelName:Ts,backendName:"webgpu",kernelFunc:_5};var kf=class{constructor(t){this.variableNames=["dy","maxPos"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="maxPool2DBackprop"}getUserCode(){return`
      ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d = coords[3];

        let dyRCCorner = vec2<i32>(coords.yz) - uniforms.pads;
        let dyRCorner = dyRCCorner.x;
        let dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        let lastIndex = uniforms.filterDims[0] * uniforms.filterDims[1] - 1;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR += uniforms.dilations[0]) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims[1]; wC += uniforms.dilations[1]) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }
            let idyC = i32(dyC);

            let dyValue = getDy(batch, idyR, idyC, d);
            let maxPosValue = lastIndex - i32(getMaxPos(batch, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            let curPosValue = wR * uniforms.filterDims[1] + wC;
            let mask = select(0.0, 1.0, maxPosValue == curPosValue);
            dotProd += dyValue * mask;
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}},$f=class{constructor(t){this.variableNames=["dy","maxPos"],this.uniforms=`strides : vec3<i32>, pads : vec3<i32>, filterDims : vec3<i32>,
      outDepth : i32, outHeight : i32, outWidth : i32`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="maxPool3DBackprop"}getUserCode(){return`
      ${B("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let ch = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyDCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        let lastIndex = uniforms.filterDims[0] * uniforms.filterDims[1] * uniforms.filterDims[2] - 1;

        for (var wD = 0; wD < uniforms.filterDims[0]; wD++) {
          let dyD = f32(dyDCorner + wD) / f32(uniforms.strides[0]);

          if (dyD < 0.0 || dyD >= f32(uniforms.outDepth) || fract(dyD) > 0.0) {
            continue;
          }
          let idyD = i32(dyD);

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let dyValue = getDy(batch, idyD, idyR, idyC, ch);
              let maxPosValue = lastIndex - i32(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              let curPosValue = wD * uniforms.filterDims[1] * uniforms.filterDims[2] + wR * uniforms.filterDims[2] + wC;
              let mask = select(0.0, 1.0, maxPosValue == curPosValue);
              dotProd += dyValue * mask;
            }
          }
        }

        setOutputAtIndex(index, dotProd);
      }
    }
    `}};function O5(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s}=t,i=s,{filterSize:a,strides:u,pad:c,dimRoundingMode:l}=r,p=[1,1,1],m=y.computePool3DInfo(i.shape,a,u,p,c,l),d=new Pi(m,"max",!0),f=[{type:"int32",data:[m.strideDepth,m.strideHeight,m.strideWidth]},{type:"int32",data:[m.padInfo.front,m.padInfo.top,m.padInfo.left]},{type:"int32",data:[m.inDepth,m.inHeight,m.inWidth]},{type:"int32",data:[m.effectiveFilterDepth,m.effectiveFilterHeight,m.effectiveFilterWidth]}],h=e.runWebGPUProgram(d,[i],"int32",f),g=new $f(m);f=[{type:"int32",data:[m.strideDepth,m.strideHeight,m.strideWidth]},{type:"int32",data:[m.effectiveFilterDepth-1-m.padInfo.front,m.effectiveFilterHeight-1-m.padInfo.top,m.effectiveFilterWidth-1-m.padInfo.left]},{type:"int32",data:[m.effectiveFilterDepth,m.effectiveFilterHeight,m.effectiveFilterWidth]},{type:"int32",data:[m.outDepth]},{type:"int32",data:[m.outHeight]},{type:"int32",data:[m.outWidth]}];let x=e.runWebGPUProgram(g,[n,h],i.dtype,f);return e.disposeData(h.dataId),x}var IR={kernelName:ru,backendName:"webgpu",kernelFunc:O5};function M5(o){let{inputs:t,backend:e,attrs:r}=o,{dy:n,input:s,output:i}=t,a=s;Id([s,i],"maxPoolGrad");let{filterSize:u,strides:c,pad:l,dimRoundingMode:p}=r,m=y.computePool2DInfo(a.shape,u,c,1,l,p),d=new ur(m,"max",!0),f=[{type:"int32",data:[m.strideHeight,m.strideWidth]},{type:"int32",data:[m.padInfo.top,m.padInfo.left]},{type:"int32",data:[m.dilationHeight,m.dilationWidth]},{type:"int32",data:[m.inHeight,m.inWidth]},{type:"int32",data:[m.effectiveFilterHeight,m.effectiveFilterWidth]}],h=e.runWebGPUProgram(d,[a],"int32",f),g=new kf(m);f=[{type:"int32",data:[m.strideHeight,m.strideWidth]},{type:"int32",data:[m.effectiveFilterHeight-1-m.padInfo.top,m.effectiveFilterWidth-1-m.padInfo.left]},{type:"int32",data:[m.dilationHeight,m.dilationWidth]},{type:"int32",data:[m.effectiveFilterHeight,m.effectiveFilterWidth]},{type:"int32",data:[m.outHeight]},{type:"int32",data:[m.outWidth]}];let x=e.runWebGPUProgram(g,[n,h],a.dtype,f);return e.disposeData(h.dataId),x}var kR={kernelName:ou,backendName:"webgpu",kernelFunc:M5};function L5(o){let{inputs:t,backend:e,attrs:r}=o,{filterSize:n,strides:s,pad:i,includeBatchInIndex:a}=r,{x:u}=t;C.assert(u.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${u.shape.length}.`);let c=[1,1];C.assert(y.eitherStridesOrDilationsAreOne(s,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${c}'`);let l=y.computePool2DInfo(u.shape,n,s,c,i),p=[{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.dilationHeight,l.dilationWidth]},{type:"int32",data:[l.inHeight,l.inWidth]},{type:"int32",data:[l.effectiveFilterHeight,l.effectiveFilterWidth]}],m=new ur(l,"max",!1),d=e.runWebGPUProgram(m,[u],u.dtype,p);m=new ur(l,"max",!0,!0,a);let f=e.runWebGPUProgram(m,[u],"int32",p);return[d,f]}var $R={kernelName:Ns,backendName:"webgpu",kernelFunc:L5};function B5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;return so(n,s,i,"min",e)}var TR={kernelName:"Min",backendName:"webgpu",kernelFunc:B5};var z5=Rt({opType:at.MIN,cpuKernelImpl:gN}),NR={kernelName:Vr,backendName:"webgpu",kernelFunc:z5};var Tf=class{constructor(t,e,r){this.uniforms="",this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.map((n,s)=>n[0]+t[s]+n[1]),this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.xShape=t,e.map((n,s)=>{this.uniforms+=` pad${s} : vec2<i32>,`}),this.offset=r==="reflect"?0:1,this.shaderKey=`mirrorPad_${r}`}getUserCode(){let t=this.xShape.length,e=this.xShape.map((c,l)=>`uniforms.pad${l}[0]`).join(","),r=this.xShape.map((c,l)=>`uniforms.pad${l}[0] + uniforms.xShape${t>1?`[${l}]`:""}`).join(","),n=t===1?"start":"start[i]",s=t===1?"end":"end[i]",i=t===1?"outC":"outC[i]",a=Vt(t),u=t>1?["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,t):"coords";return`
      ${B("index")} {
        if (index < uniforms.size) {
          let start = ${a}(${e});
          let end = ${a}(${r});
          var outC = getCoordsFromIndex(index);
          for (var i = 0; i < ${t}; i = i + 1) {
            if (${i} < ${n}) {
              ${i} = ${n} * 2 - ${i} - ${this.offset};
            } else if(${i} >= ${s}) {
              ${i} = (${s} - 1) * 2 - ${i} + ${this.offset};
            }
          }
          let coords = outC - start;
          setOutputAtIndex(index, getX(${u}));
        }
      }
    `}};var ER={kernelName:Rs,backendName:"webgpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{x:r}=o,{paddings:n,mode:s}=t,i=e,a=n.map(l=>({type:"int32",data:[l[0],l[1]]})),u=new Tf(r.shape,n,s);return i.runWebGPUProgram(u,[r],r.dtype,a)}};var V5=Rt({opType:at.MOD}),RR={kernelName:"Mod",backendName:"webgpu",kernelFunc:V5};var Nf=class{constructor(t,e){this.variableNames=["probs"],this.outputShape=[],this.uniforms="seed : f32, numOutcomes: i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,e],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="multinomial"}getUserCode(){return`
    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    fn random (seed : f32, resultUV : vec2<f32>) -> f32 {
      let HASHSCALE1 = 443.8975;
      let p = resultUV * seed;
      var p3  = fract(vec3<f32>(p.xyx) * HASHSCALE1);
      p3 = p3 + dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${B("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let batch = coords[0];

        let resUV = vec2<f32>(f32(coords[1]) / f32(uniforms.outShape[1]),
            f32(coords[0]) / f32(uniforms.outShape[0]));
        let r = random(uniforms.seed, resUV);
        var cdf = 0.0;
        for (var i = 0; i < uniforms.numOutcomes - 1; i = i + 1) {
          cdf = cdf + getProbs(batch, i);

          if (r < cdf) {
            setOutputAtIndexI32(index, i);
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutputAtIndexI32(index, uniforms.numOutcomes - 1);
      }
    }
  `}};var Ef=class{constructor(t){this.variableNames=["logits"],this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=[this.outputShape[0],1,1],this.outputShape[1]>=4096?this.workgroupSize=[256,1,1]:this.workgroupSize=[64,1,1],this.shaderKey="softmax"}getUserCode(){return`
    var<workgroup> buf : array<f32, ${this.workgroupSize[0]}>;
    var<workgroup> rowMaxShared : f32;
    var<workgroup> rowSumShared : f32;
    const blockSize = ${this.workgroupSize[0]};
    ${B("index")} {
      let row = index / blockSize;
      let tid = i32(localId.x);
      let cols = uniforms.outShape[1];

      var threadMax = -3.402823e+38f;
      for (var col = tid; col < cols; col += blockSize) {
        let value = getLogits(row, col);
        threadMax = max(threadMax, value);
      }
      if (tid < cols) {
        buf[tid] = threadMax;
      }
      workgroupBarrier();

      var reduceSize = min(cols, blockSize);
      for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
        reduceSize = currSize + (reduceSize & 1);
        if (tid < currSize) {
          buf[tid] = max(buf[tid], buf[tid + reduceSize]);
        }
        workgroupBarrier();
      }

      if (tid == 0) {
        rowMaxShared = buf[0];
      }
      workgroupBarrier();

      var threadSum = 0.0;
      for (var col = tid; col < cols; col += blockSize) {
        let subExp = exp(getLogits(row, col) - rowMaxShared);
        threadSum += subExp;
      }
      buf[tid] = threadSum;
      workgroupBarrier();

      for (var currSize = blockSize >> 1;  currSize > 0; currSize = currSize >> 1) {
        if (tid < currSize) {
          buf[tid] = buf[tid] + buf[tid + currSize];
        }
        workgroupBarrier();
      }

      if (tid == 0) {
        rowSumShared = buf[0];
      }
      workgroupBarrier();

      for (var col = tid; col < cols; col += blockSize) {
        let value = exp(getLogits(row, col) - rowMaxShared) / rowSumShared;
        setOutputAtCoords(row, col, value);
      }
  }
    `}};function $C(o){let{inputs:t,backend:e,attrs:r}=o,{logits:n}=t,{dim:s}=r,i=tt({inputs:{x:n},backend:e,attrs:{shape:[C.sizeFromShape(n.shape)/n.shape[s],n.shape[s]]}}),a=new Ef(i.shape),u=e.runWebGPUProgram(a,[i],n.dtype),c=tt({inputs:{x:u},backend:e,attrs:{shape:n.shape}});return e.disposeData(i.dataId),e.disposeData(u.dataId),c}var DR={kernelName:oi,backendName:"webgpu",kernelFunc:$C};function W5(o){let{inputs:t,backend:e,attrs:r}=o,{logits:n}=t,{numSamples:s,seed:i,normalized:a}=r,u=a?n:$C({inputs:{logits:n},backend:e,attrs:{dim:n.shape.length-1}}),c=u.shape[0],l=u.shape[1],p=new Nf(c,s),m=[{type:"float32",data:[i]},{type:"int32",data:[l]}],d=e.runWebGPUProgram(p,[u],"int32",m);return a||e.disposeData(u.dataId),d}var AR={kernelName:As,backendName:"webgpu",kernelFunc:W5};function U5(o){let{inputs:t,backend:e}=o,{x:r}=t;if(e.shouldExecuteOnCPU([r])){let s=e.tensorMap.get(r.dataId),[i,a]=CN(s.values,r.shape,r.dtype);return e.makeTensorInfo(a,r.dtype,i)}let n=new no(r.shape,K.NEG);return e.runWebGPUProgram(n,[r],r.dtype)}var FR={kernelName:"Neg",backendName:"webgpu",kernelFunc:U5};function G5(o){console.warn("tf.nonMaxSuppression() in webgpu locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:r}=o,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:u}=r,c=e.readSync(n.dataId),l=e.readSync(s.dataId),{selectedIndices:p}=de.nonMaxSuppressionV3Impl(c,l,i,a,u);return e.makeTensorInfo([p.length],"int32",new Int32Array(p))}var PR={kernelName:Fs,backendName:"webgpu",kernelFunc:G5};function H5(o){console.warn("tf.nonMaxSuppression() in webgpu locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:r}=o,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:u,softNmsSigma:c}=r,l=e.readSync(n.dataId),p=e.readSync(s.dataId),m=i,d=a,f=u,h=c,{selectedIndices:g,selectedScores:x}=de.nonMaxSuppressionV5Impl(l,p,m,d,f,h);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var _R={kernelName:Ps,backendName:"webgpu",kernelFunc:H5};var Rf=class{constructor(t,e){this.variableNames=["x"],this.uniforms="onValue : f32, offValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,e],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="onehot"}getUserCode(){return`
      ${B("index")} {
        if(index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          setOutputAtIndex(index, mix(uniforms.offValue, uniforms.onValue,
                                      f32(i32(round(getX(coords.x))) == coords.y)));
        }
      }
    `}};function K5(o){let{inputs:t,backend:e,attrs:r}=o,{indices:n}=t,{dtype:s,depth:i,onValue:a,offValue:u}=r,c=C.sizeFromShape(n.shape),l=new Rf(c,i),p=tt({inputs:{x:n},backend:e,attrs:{shape:[c]}}),m=[{type:"float32",data:[a]},{type:"float32",data:[u]}],d=e.runWebGPUProgram(l,[p],s,m);e.disposeData(p.dataId);let f=[...n.shape,i],h=tt({inputs:{x:d},backend:e,attrs:{shape:f}});return e.disposeData(d.dataId),h}var OR={kernelName:Os,backendName:"webgpu",kernelFunc:K5};function Cl(o){let{inputs:t,backend:e}=o,{x:r}=t;if(r.dtype==="complex64"){let n=En({inputs:{input:r},backend:e}),s=Cl({inputs:{x:n},backend:e}),i=Ha({inputs:{input:r},backend:e}),a=Cl({inputs:{x:i},backend:e}),u=po({inputs:{real:s,imag:a},backend:e});return e.disposeData(n.dataId),e.disposeData(s.dataId),e.disposeData(i.dataId),e.disposeData(a.dataId),u}else return Zt({attrs:{shape:r.shape,dtype:r.dtype,value:r.dtype==="string"?"":0},backend:e})}var MR={kernelName:fi,backendName:"webgpu",kernelFunc:Cl};function LR(o){let{inputs:t,backend:e}=o,{x:r}=t;if(r.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(r.dtype==="complex64"){let n=En({inputs:{input:r},backend:e}),s=LR({inputs:{x:n},backend:e}),i=Ha({inputs:{input:r},backend:e}),a=Cl({inputs:{x:i},backend:e}),u=po({inputs:{real:s,imag:a},backend:e});return e.disposeData(n.dataId),e.disposeData(s.dataId),e.disposeData(i.dataId),e.disposeData(a.dataId),u}else return Zt({attrs:{shape:r.shape,dtype:r.dtype,value:1},backend:e})}var BR={kernelName:_s,backendName:"webgpu",kernelFunc:LR};function q5(o){let{inputs:t,backend:e,attrs:r}=o,{axis:n}=r;if(t.length===1)return ff({inputs:{input:t[0]},backend:e,attrs:{dim:n}});let s=t[0].shape,i=t[0].dtype;t.forEach(l=>{C.assertShapesMatch(s,l.shape,"All tensors passed to stack must have matching shapes"),C.assert(i===l.dtype,()=>"All tensors passed to stack must have matching dtypes")});let a=[],u=t.map(l=>{let p=ff({inputs:{input:l},backend:e,attrs:{dim:n}});return a.push(p),p}),c=wC({inputs:u,backend:e,attrs:{axis:n}});return a.forEach(l=>e.disposeData(l.dataId)),c}var zR={kernelName:Ms,backendName:"webgpu",kernelFunc:q5};function TC(o,t=!1){let e=o.length,r=Vt(e),n=o.map((p,m)=>`uniforms.pad${m}[0]`).join(","),s=o.map((p,m)=>`uniforms.pad${m}[0] + uniforms.xShape${e>1?`[${m}]`:""}`).join(","),i=e>1?`${r}(${n})`:`${n}`,a=e>1?`${r}(${s})`:`${s}`,u=e>1?"any(paddedCoords < start)":"paddedCoords < start",c=e>1?"any(paddedCoords >= end)":"paddedCoords >= end",l=e>1?["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,e):"coords";return`
        let start = ${i};
        let end = ${a};
        if (${u} || ${c}) {
          setOutputAtIndex(index, ${t?0:"uniforms.constantValue"});
        } else {
          let coords = paddedCoords - start;
          setOutputAtIndex(index, getX(${l}));
        }
  `}var Df=class{constructor(t,e){this.variableNames=["x"],this.uniforms="constantValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.map((r,n)=>r[0]+t[n]+r[1]),this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),e.map((r,n)=>{this.uniforms+=` pad${n} : vec2<i32>,`}),this.xShape=t,this.shaderKey="pad"}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
          let paddedCoords = getCoordsFromIndex(index);
          ${TC(this.xShape)}
        }
      }
    `}};var X5=o=>{let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{paddings:s,constantValue:i}=r;if(s.every(c=>C.arraysEqual(c,[0,0])))return ie({inputs:{x:n},backend:e});if(C.sizeFromShape(n.shape)===0){let c=s.map((l,p)=>l[0]+n.shape[p]+l[1]);return Zt({backend:e,attrs:{shape:c,value:i,dtype:n.dtype}})}let a=[{type:"float32",data:[i]}];s.map(c=>a.push({type:"int32",data:[c[0],c[1]]}));let u=new Df(n.shape,s);return e.runWebGPUProgram(u,[n],n.dtype,a)},VR={kernelName:Ls,backendName:"webgpu",kernelFunc:X5};var j5=Rt({opType:at.POW}),WR={kernelName:"Pow",backendName:"webgpu",kernelFunc:j5};function Y5(o){let{inputs:t,backend:e}=o,{x:r,alpha:n}=t,s=new Nn(at.PRELU,r.shape,n.shape);return e.runWebGPUProgram(s,[r,n],"float32")}var UR={kernelName:zs,backendName:"webgpu",kernelFunc:Y5};function Q5(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{axis:s,keepDims:i}=r;return so(n,s,i,"prod",e)}var GR={kernelName:Vs,backendName:"webgpu",kernelFunc:Q5};var Z5=o=>{let{backend:t,attrs:e}=o,{start:r,stop:n,step:s,dtype:i}=e,a=wN(r,n,s,i);return t.makeTensorInfo([a.length],i,a)},HR={kernelName:Ws,backendName:"webgpu",kernelFunc:Z5};var J5=Rt({opType:at.DIV}),KR={kernelName:Ir,backendName:"webgpu",kernelFunc:J5};var t8=lt({opType:K.RECIPROCAL}),qR={kernelName:Gr,backendName:"webgpu",kernelFunc:t8};var e8=lt({opType:K.RELU}),XR={kernelName:Hr,backendName:"webgpu",kernelFunc:e8};var o8=lt({opType:K.RELU6}),jR={kernelName:Kr,backendName:"webgpu",kernelFunc:o8};var Af=class{constructor(t,e,r){this.variableNames=["x"],this.uniforms="adjustHeightWidth : vec2<f32>, halfPixelCenters : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t[0],e,r,t[3]],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="resizeBilinear"}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let d = coords[3];
          let rc = coords.yz;

          let effectiveInSize = vec2<f32>(
            f32(uniforms.xShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.xShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveOutSize = vec2<f32>(
            f32(uniforms.outShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.outShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveInputOverOutputRatioRC =
              effectiveInSize / effectiveOutSize;

          // Fractional source index
          let sourceFracIndexRC =
            (vec2<f32>(rc) + vec2<f32>(uniforms.halfPixelCenters)) *
            effectiveInputOverOutputRatioRC - vec2<f32>(uniforms.halfPixelCenters);

          // Compute the four integer indices.
          let sourceFloorRC = vec2<i32>(sourceFracIndexRC);
          let sourceCeilRC = vec2<i32>(
            min(vec2<f32>(uniforms.xShape.yz) - vec2<f32>(1.0), ceil(sourceFracIndexRC)));

          let topLeft = getX(b, sourceFloorRC.x, sourceFloorRC.y, d);
          let bottomLeft = getX(b, sourceCeilRC.x, sourceFloorRC.y, d);
          let topRight = getX(b, sourceFloorRC.x, sourceCeilRC.y, d);
          let bottomRight = getX(b, sourceCeilRC.x, sourceCeilRC.y, d);

          let fracRC = sourceFracIndexRC - vec2<f32>(sourceFloorRC);

          let top = topLeft + (topRight - topLeft) * fracRC.y;
          let bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
          let newValue = top + (bottom - top) * fracRC.x;

          setOutputAtIndex(index, newValue);
        }
      }
    `}};function r8(o){let{inputs:t,backend:e,attrs:r}=o,{images:n}=t,{alignCorners:s,size:i,halfPixelCenters:a}=r,[u,c]=i,l=s&&u>1?1:0,p=s&&c>1?1:0,d=[{type:"float32",data:[l,p]},{type:"float32",data:[a?.5:0]}],f=new Af(n.shape,u,c);return e.runWebGPUProgram(f,[n],"float32",d)}var YR={kernelName:Ks,backendName:"webgpu",kernelFunc:r8};var Ff=class{constructor(t,e){this.variableNames=["dy"],this.uniforms=`effectiveXSize : vec2<i32>, effectiveYSize : vec2<i32>, heightScale : f32, widthScale : f32,
       invHeightScale : f32, invWidthScale : f32, winHeight : i32, winWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.alignCorners=e,this.shaderKey=`resizeBilinearBackprop_${e}`}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let b = coords[0];
          let d = coords[3];
          let r = coords[1];
          let c = coords[2];

          var accumulator = 0.0;

          // Compute bounds for where in dy we will look
          let startRLerp = floor(f32(r) * uniforms.invHeightScale);
          let startDyR = i32(startRLerp - f32(uniforms.winHeight / 2));

          let startCLerp = floor(f32(c) * uniforms.invWidthScale);
          let startDyC = i32(startCLerp - f32(uniforms.winWidth / 2));

          // Loop over dy
          for (var dyROffset = 0; dyROffset < uniforms.winHeight; dyROffset++) {
            let dyR = startDyR + dyROffset;

            // Guard against the window exceeding the bounds of dy
            if (dyR < 0 || dyR >= uniforms.dyShape[1]) {
              continue;
            }

            for (var dyCOffset = 0; dyCOffset < uniforms.winWidth; dyCOffset++) {
              let dyC = startDyC + dyCOffset;

              // Guard against the window exceeding the bounds of dy
              if (dyC < 0 || dyC >= uniforms.dyShape[2]) {
                continue;
              }

              let dxR = f32(dyR) * uniforms.heightScale;
              let topDxRIndex = i32(floor(dxR));
              let bottomDxRIndex = i32(min(ceil(dxR), f32(uniforms.outShape[1] - 1)));
              let dxRLerp = dxR - f32(topDxRIndex);
              let inverseDxRLerp = 1.0 - dxRLerp;

              let dxC = f32(dyC) * uniforms.widthScale;
              let leftDxCIndex = i32(floor(dxC));
              let rightDxCIndex = i32(min(ceil(dxC), f32(uniforms.outShape[2] - 1)));
              let dxCLerp = dxC - f32(leftDxCIndex);
              let inverseDxCLerp = 1.0 - dxCLerp;

              if (r == topDxRIndex && c == leftDxCIndex) {
                // topLeft
                accumulator +=
                  getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
              }

              if (r == topDxRIndex && c == rightDxCIndex) {
                // topRight
                accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
              }

              if (r == bottomDxRIndex && c == leftDxCIndex) {
                // bottomLeft
                accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
              }

              if (r == bottomDxRIndex && c == rightDxCIndex) {
                // bottomRight
                accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
              }
            }
          }
          // End loop over dy

          setOutputAtIndex(index, accumulator);
        }
      }
    `}};function n8(o){let{inputs:t,backend:e,attrs:r}=o,{images:n,dy:s}=t,{alignCorners:i}=r,[,a,u]=n.shape,[,c,l]=s.shape,p=[i&&c>1?a-1:a,i&&l>1?u-1:u],m=[i&&c>1?c-1:c,i&&l>1?l-1:l],d=p[0]/m[0],f=p[1]/m[1],h=1/d,g=1/f,x=Math.ceil(h)*2+2,b=Math.ceil(g)*2+2,w=new Ff(n.shape,i),v=[{type:"int32",data:p},{type:"int32",data:m},{type:"float32",data:[d]},{type:"float32",data:[f]},{type:"float32",data:[h]},{type:"float32",data:[g]},{type:"int32",data:[x]},{type:"int32",data:[b]}];return e.runWebGPUProgram(w,[s],s.dtype,v)}var QR={kernelName:cu,backendName:"webgpu",kernelFunc:n8};var Pf=class{constructor(t,e,r,n){this.variableNames=["x"],this.uniforms="adjustHeightWidth : vec2<f32>, roundBase : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t[0],e,r,t[3]],this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.halfPixelCenters=n,this.shaderKey=`resizeNearest_${n}`}getUserCode(){let t;return this.halfPixelCenters?t="max((vec2<f32>(rc) + vec2<f32>(0.5)) * effectiveInputOverOutputRatioRC, vec2<f32>(0.0))":t="vec2<f32>(rc) * effectiveInputOverOutputRatioRC",`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let d = coords[3];
          let rc = coords.yz;

          let effectiveInSize = vec2<f32>(
            f32(uniforms.xShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.xShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveOutSize = vec2<f32>(
            f32(uniforms.outShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.outShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveInputOverOutputRatioRC =
              effectiveInSize / effectiveOutSize;

          // Fractional source index
          let sourceFracIndexRC = ${t};

          // Compute the coordinators of nearest neighbor point.
          let inputShapeRC = vec2<f32>(f32(uniforms.xShape.y), f32(uniforms.xShape.z));
          let sourceNearestRC = vec2<i32>(
            min(inputShapeRC - 1.0, floor(sourceFracIndexRC + uniforms.roundBase)));
          let newValue = getX(b, sourceNearestRC.x, sourceNearestRC.y, d);

          setOutputAtIndex(index, newValue);
        }
      }
    `}};function s8(o){let{inputs:t,backend:e,attrs:r}=o,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:a}=r,[u,c]=a,l=s&&u>1?1:0,p=s&&c>1?1:0,d=[{type:"float32",data:[l,p]},{type:"float32",data:[s?.5:0]}],f=new Pf(n.shape,u,c,i);return e.runWebGPUProgram(f,[n],n.dtype,d)}var ZR={kernelName:Hs,backendName:"webgpu",kernelFunc:s8};var _f=class{constructor(t,e){this.variableNames=["dy"],this.uniforms=`effectiveXSize : vec2<i32>, effectiveYSize : vec2<i32>, invHeightScale : f32, invWidthScale : f32,
       winHeight : i32, winWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.alignCorners=e,this.shaderKey=`resizeNearestNeigborBackprop_${e}`}getUserCode(){return`
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let b = coords[0];
          let d = coords[3];
          let r = coords[1];
          let c = coords[2];

          var accumulator = 0.0;

          // Compute bounds for where in dy we will look
          let startRLerp = floor(f32(r) * uniforms.invHeightScale);
          let startDyR = i32(floor(startRLerp - f32(uniforms.winHeight / 2)));

          let startCLerp = floor(f32(c) * uniforms.invWidthScale);
          let startDyC = i32(floor(startCLerp - f32(uniforms.winWidth / 2)));

          // Loop over dy
          for (var dyROffset = 0; dyROffset < uniforms.winHeight; dyROffset++) {
            let dyR = startDyR + dyROffset;

            // Guard against the window exceeding the bounds of dy
            if (dyR < 0 || dyR >= uniforms.dyShape[1]) {
              continue;
            }

            for (var dyCOffset = 0; dyCOffset < uniforms.winWidth; dyCOffset++) {
              let dyC = startDyC + dyCOffset;

              // Guard against the window exceeding the bounds of dy
              if (dyC < 0 || dyC >= uniforms.dyShape[2]) {
                continue;
              }

              let sourceFracRow = f32(uniforms.effectiveXSize[0]) *
                  (f32(dyR) / f32(uniforms.effectiveYSize[0]));

              let sourceFracCol = f32(uniforms.effectiveXSize[1]) *
                  (f32(dyC) / f32(uniforms.effectiveYSize[1]));

              let sourceNearestRow =
                  i32(min(f32(uniforms.outShape[1] - 1),
                  ${this.alignCorners?"floor(sourceFracRow + 0.5)":"floor(sourceFracRow)"}));

              let sourceNearestCol =
                  i32(min(f32(uniforms.outShape[2] - 1),
                  ${this.alignCorners?"floor(sourceFracCol + 0.5)":"floor(sourceFracCol)"}));

              if (r == sourceNearestRow && c == sourceNearestCol) {
                accumulator += getDy(b, dyR, dyC, d);
              }
            }
          }
          // End loop over dy

          setOutputAtIndex(index, accumulator);
        }
      }
    `}};function i8(o){let{inputs:t,backend:e,attrs:r}=o,{images:n,dy:s}=t,{alignCorners:i}=r,[,a,u]=n.shape,[,c,l]=s.shape,p=[i&&c>1?a-1:a,i&&l>1?u-1:u],m=[i&&c>1?c-1:c,i&&l>1?l-1:l],d=p[0]/m[0],f=p[1]/m[1],h=1/d,g=1/f,x=Math.ceil(h)*2+2,b=Math.ceil(g)*2+2,w=new _f(n.shape,i),v=[{type:"int32",data:p},{type:"int32",data:m},{type:"float32",data:[h]},{type:"float32",data:[g]},{type:"int32",data:[x]},{type:"int32",data:[b]}];return e.runWebGPUProgram(w,[s],s.dtype,v)}var JR={kernelName:uu,backendName:"webgpu",kernelFunc:i8};var Of=class{constructor(t){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=" axis : vec4<i32>,",this.shaderKey="reverse"}getUserCode(){return`
      
      // Using uniform variables as judging conditions, so the function has
      // coherent execution within all threads.
      fn getReverseCoords(coords : vec4<i32>) -> vec4<i32> {
        var reverseCoords = coords;
        if (uniforms.axis[0] == 1) {
          reverseCoords[0] = uniforms.xShape[0] - coords[0] - 1;
        }
        if (uniforms.axis[1] == 1) {
          reverseCoords[1] = uniforms.xShape[1] - coords[1] - 1;
        }
        if (uniforms.axis[2] == 1) {
          reverseCoords[2] = uniforms.xShape[2] - coords[2] - 1;
        }
        if (uniforms.axis[3] == 1) {
          reverseCoords[3] = uniforms.xShape[3] - coords[3] - 1;
        }

        return reverseCoords;
      }
    
      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let reverseCoords = getReverseCoords(coords);
          setOutputAtIndex(index, getX(reverseCoords[0],
              reverseCoords[1], reverseCoords[2], reverseCoords[3]));
        }
      }
    `}};function a8(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{dims:s}=r,i=n.shape.length;if(i===0)return ie({inputs:{x:n},backend:e});let a=n.shape,u=[1,1,1,1];a.forEach((g,x)=>{let b=x+4-i;u[b]=g});let c=C.parseAxisParam(s,n.shape),l=[0,0,0,0];c.forEach(g=>{let x=g+4-i;l[x]=1});let p=[{type:"int32",data:l}],m=tt({inputs:{x:n},backend:e,attrs:{shape:u}}),d=new Of(u),f=e.runWebGPUProgram(d,[m],m.dtype,p);e.disposeData(m.dataId);let h=tt({inputs:{x:f},backend:e,attrs:{shape:a}});return e.disposeData(f.dataId),h}var tD={kernelName:qs,backendName:"webgpu",kernelFunc:a8};var Mf=class{constructor(t,e){this.outputShape=[],this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=`centerX : f32, centerY : f32, sinRadians : f32,
          cosRadians : f32,`,this.shaderKey="rotate",this.outputShape=t,typeof e=="number"?(this.uniforms+=" fillValue : f32,",this.fillSnippet="var outputValue = uniforms.fillValue;",this.shaderKey+="_float"):(this.uniforms+=" fillValue : vec3<f32>,",this.fillSnippet="var outputValue = uniforms.fillValue[coords[3]];",this.shaderKey+="_vec3")}getUserCode(){return`
        ${B("index")} {
          if (index < uniforms.size) {
            let coords = getCoordsFromIndex(index);
            let coordXFloat = (f32(coords[2]) - uniforms.centerX) *
                uniforms.cosRadians - (f32(coords[1]) - uniforms.centerY) *
                uniforms.sinRadians;
            let coordYFloat = (f32(coords[2]) - uniforms.centerX) *
                uniforms.sinRadians + (f32(coords[1]) - uniforms.centerY) *
                uniforms.cosRadians;
            let coordX = i32(round(coordXFloat + uniforms.centerX));
            let coordY = i32(round(coordYFloat + uniforms.centerY));
            ${this.fillSnippet}
            if(coordX >= 0 && coordX < uniforms.xShape[2] && coordY >= 0 &&
                coordY < uniforms.xShape[1]) {
              outputValue = getX(coords[0], coordY, coordX, coords[3]);
            }
            setOutputAtIndex(index, outputValue);
          }
        }
      `}};var eD={kernelName:hi,backendName:"webgpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{image:r}=o,{radians:n,fillValue:s,center:i}=t,a=e,u=new Mf(r.shape,s),[c,l]=y.getImageCenter(i,r.shape[1],r.shape[2]),p=[{type:"float32",data:[c]},{type:"float32",data:[l]},{type:"float32",data:[Math.sin(n)]},{type:"float32",data:[Math.cos(n)]}];return typeof s=="number"?p.push({type:"float32",data:[Number.parseFloat(s.toFixed(2))]}):p.push({type:"float32",data:s}),a.runWebGPUProgram(u,[r],r.dtype,p)}};var u8=lt({opType:K.ROUND}),oD={kernelName:qr,backendName:"webgpu",kernelFunc:u8};var c8=lt({opType:K.RSQRT,cpuKernelImpl:SN}),rD={kernelName:Xr,backendName:"webgpu",kernelFunc:c8};var cr=class{constructor(t,e,r,n,s,i,a,u=!0){this.variableNames=["updates","indices"],this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=i,this.type=a,this.sumDupeIndices=u,this.dispatchLayout=G(t),this.dispatch=z(this.dispatchLayout,t,this.workgroupSize),this.sliceDimGreaterThanOne=e>1,this.shaderKey=`scatter_${r}_${n}_${this.sliceDimGreaterThanOne}_${a}_${u}_${s.length}`;let c=Vt(s.length);this.uniforms=`sliceDim : i32, strides: ${c}, updatesSize: i32,`,this.updatesRank=n,this.indicesRank=r}getUserCode(){let t="";this.indicesRank===1?t="coords[0]":this.indicesRank===2&&(t="coords[0], j");let e=`getIndices(${t})`,r=this.sliceDimGreaterThanOne?"uniforms.strides[j]":"uniforms.strides",n="",s="";this.dispatchLayout.x.length===1?(n="flattenedIndex",s=`
      fn getUpdatesCoordsFromFlatIndex(index : i32) -> i32 {
        return index;
      }
      `):this.dispatchLayout.x.length===2&&(n="vec2<i32>(flattenedIndex, coords[1])",s=`
      fn getUpdatesCoordsFromFlatIndex(index : i32) -> vec2<i32> {
        // N.B. |updates| could be a scalar tensor, conceptually representing a
        // 2D tensor with all values equal to that. By design, its size must be
        // the same as |outShape[1]| in one dimension, and |indicesShape[0]|
        // gives the other.
        let sliceSize = uniforms.outShape[1];
        let d0 = index / sliceSize;
        let d1 = index - d0 * sliceSize;
        return vec2<i32>(d0, d1);
      }
      `);let a=`getUpdates(${Array.from({length:this.updatesRank},(c,l)=>`coords[${l}]`).join(", ")})`;return`
    ${s}
      ${B("index")} {
        if (index < uniforms.updatesSize) {
          let coords = getUpdatesCoordsFromFlatIndex(index);
          var flattenedIndex = 0;
          for (var j = 0; j < uniforms.sliceDim; j = j + 1) {
            let indexInside = i32(round(${e}));
            flattenedIndex = flattenedIndex + indexInside * ${r};
          }
          let updateValue =
              ${Fi(this.type)}(${a});
          let flatIndex = getOutputIndexFromCoords(${n});

          ${this.sumDupeIndices?oo("&result[flatIndex]","updateValue",this.type):"atomicStore(&result[flatIndex], bitcast<i32>(updateValue));"}
        }
      }`}};function l8(o){let{inputs:t,backend:e,attrs:r}=o,{indices:n,updates:s}=t,{shape:i}=r,{sliceRank:a,numUpdates:u,sliceSize:c,strides:l,outputSize:p}=y.calculateShapes(s,n,i),m=[p/c,c];if(p===0)return e.makeTensorInfo(i,n.dtype);let d=tt({inputs:{x:n},backend:e,attrs:{shape:[u,a]}}),f=tt({inputs:{x:s},backend:e,attrs:{shape:[u,c]}}),h=f.dtype,g=Zt({backend:e,attrs:{shape:m,value:0,dtype:h}}),x=C.sizeFromShape(f.shape),b=[{type:"int32",data:[a]},{type:"int32",data:l},{type:"int32",data:[x]}],w=new cr(f.shape,a,d.shape.length,f.shape.length,l,m,h),v=e.runWebGPUProgram(w,[f,d],h,b,g),k=tt({inputs:{x:v},backend:e,attrs:{shape:i}});return e.disposeData(d.dataId),e.disposeData(f.dataId),e.disposeData(v.dataId),k}var nD={kernelName:Xs,backendName:"webgpu",kernelFunc:l8};var Lf=class{constructor(t,e){this.outputShape=[],this.variableNames=["sortedSequence","values"],this.uniforms="numInputs : i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.side=e,this.shaderKey=`search_sorted_${e}`}getUserCode(){return`
      fn findBound(batch: i32, value: f32) -> i32 {
        var left = i32(0);
        var right = uniforms.numInputs;
        while (left < right) {
          var mid = (left + right) / 2;
          if (getSortedSequence(batch, mid) ${this.side==="left"?"<":"<="} value) {
            left = mid + 1;
          } else {
            right = mid;
          }
        }
        return right;
      }

      ${B("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let value = getValuesByOutputIndex(index);
          setOutputAtIndexI32(index, findBound(coords[0], value));
        }
      }
    `}};function p8(o){let{inputs:t,backend:e,attrs:r}=o,{sortedSequence:n,values:s}=t,{side:i}=r,a=new Lf([s.shape[0],s.shape[1]],i),u=[{type:"int32",data:[n.shape[1]]}];return e.runWebGPUProgram(a,[n,s],"int32",u)}var sD={kernelName:Ys,backendName:"webgpu",kernelFunc:p8};var Bf=class{constructor(t,e,r){this.variableNames=["c","a","b"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.cRank=t,this.rank=r,this.shaderKey="select"}getUserCode(){let t,e;if(this.rank>4)throw Error(`Where for rank ${this.rank} is not yet supported`);if(this.rank===1)e="resRC",t="resRC";else{let n=["resRC.x","resRC.y","resRC.z","resRC.w"],s=[],i=[];for(let a=0;a<this.outputShape.length;a++)i.push(`${n[a]}`),a<this.cRank&&s.push(`${n[a]}`);t=s.join(),e=i.join()}return`
      ${B("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          let cVal = getC(${t});
          if (cVal >= 1.0) {
            setOutputAtIndex(index, getA(${e}));
          } else {
            setOutputAtIndex(index, getB(${e}));
          }
        }
      }
    `}};function m8(o){let{inputs:t,backend:e}=o,{condition:r,t:n,e:s}=t,i=new Bf(r.shape.length,n.shape,n.shape.length);return e.runWebGPUProgram(i,[r,n,s],Lt(n.dtype,s.dtype))}var iD={kernelName:Qs,backendName:"webgpu",kernelFunc:m8};var d8=lt({opType:K.SELU}),aD={kernelName:jr,backendName:"webgpu",kernelFunc:d8};var f8=lt({opType:K.SIGMOID}),uD={kernelName:Zr,backendName:"webgpu",kernelFunc:f8};var h8=lt({opType:K.SIGN}),cD={kernelName:Qr,backendName:"webgpu",kernelFunc:h8};var g8=lt({opType:K.SIN}),lD={kernelName:"Sin",backendName:"webgpu",kernelFunc:g8};var x8=lt({opType:K.SINH}),pD={kernelName:Yr,backendName:"webgpu",kernelFunc:x8};var C8=lt({opType:K.SOFTPLUS}),mD={kernelName:Jr,backendName:"webgpu",kernelFunc:C8};var zf=class{constructor(t,e,r,n,s,i){this.variableNames=["x"],this.outputShape=[],this.uniforms="",this.workgroupSize=[64,1,1],this.size=!0;let a=new Array(n.length);for(let u=0;u<a.length;u++)a[u]=n[s[u]];this.outputShape=a,this.newDim=s,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.xShape=t,this.paddedXShape=e,this.uniforms+=`reshapedPaddedXShape : ${Vt(n.length)}, paddedXShapeStrides : ${Vt(i)}, `,r.map((u,c)=>{this.uniforms+=` pad${c} : vec2<i32>,`}),this.shaderKey=`spaceToBatchND_${s}`}getUserCode(){let t=Vt(this.outputShape.length),e=hC(this.newDim);return`
      ${dl(this.paddedXShape,"PaddedX")}
      ${B("index")} {
        if(index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let switchedIndex = getIndexFromCoords${this.outputShape.length}D(${t}(${e}), uniforms.reshapedPaddedXShape);
          let paddedCoords = getPaddedXCoordsFromIndex(switchedIndex);
          ${TC(this.xShape,!0)}
        }
      }
    `}};var b8=o=>{let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{blockShape:s,paddings:i}=r;C.assert(n.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGPU backend not implemented yet");let a=s.reduce((b,w)=>b*w),u=[[0,0]];u.push(...i);for(let b=1+s.length;b<n.shape.length;++b)u.push([0,0]);let c=u.map((b,w)=>b[0]+n.shape[w]+b[1]),l=y.getReshaped(c,s,a,!1),p=y.getPermuted(l.length,s.length,!1),m=y.getReshapedPermuted(c,s,a,!1),d=C.computeStrides(c),f=new zf(n.shape,c,u,l,p,d.length),h=[{type:"int32",data:l},{type:"int32",data:d}];u.map(b=>h.push({type:"int32",data:[b[0],b[1]]}));let g=e.runWebGPUProgram(f,[n],n.dtype,h),x=tt({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeData(g.dataId),x},dD={kernelName:ti,backendName:"webgpu",kernelFunc:b8};var Vf=class{constructor(t,e,r){this.variableNames=["input","indices","segmentIds"],this.outputShape=[],this.uniforms="segmentSize : i32, sparseSize : i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t,this.type=r,this.dispatchLayout=G([e]),this.dispatch=z(this.dispatchLayout,[e],this.workgroupSize),this.shaderKey="sparseSegmentSum"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.sparseSize) {
        let indexInSegmentIds = index / uniforms.segmentSize;
        let indexInSegment = index % uniforms.segmentSize;
        let indexInInput = indices[indexInSegmentIds];
        let segmentId = segmentIds[indexInSegmentIds];

        let value = input[indexInInput * uniforms.segmentSize + indexInSegment];
        let outIndex = segmentId * uniforms.segmentSize + indexInSegment;
        ${oo("&result[outIndex]","value",this.type)}
      }
    }
  `}},Wf=class{constructor(t,e){this.variableNames=["segmentIds"],this.outputShape=[],this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=[t],this.dispatchLayout=G(e),this.dispatch=z(this.dispatchLayout,e,this.workgroupSize),this.shaderKey="sparseSegmentIdCountProgram"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.segmentIdsShape) {
        let segmentId = segmentIds[index];
        ${oo("&result[segmentId]","1","int32")}
      }
    }
  `}},Uf=class{constructor(t,e){this.variableNames=["segmentSum","sameSegmentIdCount"],this.outputShape=[],this.uniforms="segmentSize : i32",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.type=e,this.dispatchLayout=G(t),this.dispatch=z(this.dispatchLayout,t,this.workgroupSize),this.shaderKey="sparseSegmentMean"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.size) {
        let segmentId = index / uniforms.segmentSize;
        let count = sameSegmentIdCount[segmentId];
        if (count != 0) {
          ${this.type==="float32"?"setOutputAtIndex(index, segmentSum[index] / f32(count));":"setOutputAtIndexI32(index, segmentSum[index] / count);"}
        }
      }
    }
  `}};function Gf(o,t,e,r=!1,n){let i=C.sizeFromShape(o.shape)/o.shape[0],a=o.dtype,u=C.sizeFromShape(t.shape),c=n.readSync(e.dataId),p=u>0?c[u-1]+1:0,m,d=o.shape.slice();d[0]=p;let f=u*i,h=Zt({backend:n,attrs:{shape:d,value:0,dtype:a}});m=new Vf(d,f,a);let g=[{type:"int32",data:[i]},{type:"int32",data:[f]}],x=n.runWebGPUProgram(m,[o,t,e],a,g,h);if(r)return x;let b=Zt({backend:n,attrs:{shape:[p],value:0,dtype:"int32"}});m=new Wf(p,e.shape);let w=n.runWebGPUProgram(m,[e],"int32",null,b),v=Zt({backend:n,attrs:{shape:d,value:0,dtype:a}});m=new Uf(d,a),g=[{type:"int32",data:[i]}];let k=n.runWebGPUProgram(m,[x,w],a,g,v);return n.disposeData(x.dataId),n.disposeData(w.dataId),k}function y8(o){let{inputs:t,backend:e}=o,{data:r,indices:n,segmentIds:s}=t;return Gf(r,n,s,!1,e)}var fD={kernelName:ri,backendName:"webgpu",kernelFunc:y8};function w8(o){let{inputs:t,backend:e}=o,{data:r,indices:n,segmentIds:s}=t;return Gf(r,n,s,!0,e)}var hD={kernelName:ni,backendName:"webgpu",kernelFunc:w8};var Hf=class{constructor(t,e){this.variableNames=["A"],this.workgroupSize=[64,1,1],this.size=!0;let r=new Array(t.length);for(let n=0;n<r.length;n++)r[n]=t[n]*e[n];this.outputShape=r,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.rank=this.outputShape.length,this.shaderKey="tile"}getUserCode(){let t=S8(this.rank,"uniforms.");return`
      ${B("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          setOutputAtIndex(index, getA(${t}));
        }
      }
    `}};function S8(o,t=""){if(o>=5)throw Error(`Tile for rank ${o} is not yet supported`);if(o===1)return`(resRC % ${t}aShape)`;let e=["resRC.x","resRC.y","resRC.z","resRC.w"],r=[];for(let n=0;n<o;n++)r.push(`(${e[n]} % ${t}aShape[${n}])`);return r.join()}function bl(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{reps:s}=r;if(e.shouldExecuteOnCPU([n])||n.dtype==="string"||n.shape.length>=5){let u=e.readSync(n.dataId),c=n.dtype==="string"?u.map(m=>C.decodeString(m)):u,l=nt(n.shape,n.dtype,c),p=EN(l,s);return e.makeTensorInfo(p.shape,p.dtype,p.values)}let i=new Hf(n.shape,s);return e.runWebGPUProgram(i,[n],n.dtype)}var gD={kernelName:qo,backendName:"webgpu",kernelFunc:bl};function v8(o){let{inputs:t,backend:e,attrs:r}=o,{sparseIndices:n,sparseValues:s,defaultValue:i}=t,{outputShape:a}=r,{sliceRank:u,numUpdates:c,sliceSize:l,strides:p,outputSize:m}=y.calculateShapes(s,n,a),d=!1;if(s.dtype==="string"){let R=e.bufferSync(n),A=e.bufferSync(s),F=C.decodeString(e.readSync(i.dataId)[0]),P=vN(R,A,a,m,l,c,u,p,F,d);return e.makeTensorInfo(a,P.dtype,P.values)}let f=[m/l,l],h=tt({inputs:{x:n},backend:e,attrs:{shape:[c,u]}}),g=s.shape.length?tt({inputs:{x:s},backend:e,attrs:{shape:[c,l]}}):ie({inputs:{x:s},backend:e}),x=g.dtype,b=e.makeTensorInfo([],x,C.makeZerosTypedArray(1,x)),w=tt({inputs:{x:i},backend:e,attrs:{shape:Array(f.length).fill(1)}}),v=bl({inputs:{x:w},backend:e,attrs:{reps:f}}),k=C.sizeFromShape([c,l]),N=[{type:"int32",data:[u]},{type:"int32",data:p},{type:"int32",data:[k]}];switch(c){case 0:break;case 1:{let R=new cr([c,l],u,h.shape.length,g.shape.length,p,f,x,d);e.runWebGPUProgram(R,[g,h],x,N,v)}break;default:{let R=new cr([c,l],u,h.shape.length,b.shape.length,p,f,x,d);e.runWebGPUProgram(R,[b,h],x,N,v)}{let R=new cr([c,l],u,h.shape.length,g.shape.length,p,f,x);e.runWebGPUProgram(R,[g,h],x,N,v)}}let E=tt({inputs:{x:v},backend:e,attrs:{shape:a}});return e.disposeData(h.dataId),e.disposeData(g.dataId),e.disposeData(w.dataId),e.disposeData(b.dataId),e.disposeData(v.dataId),E}var xD={kernelName:si,backendName:"webgpu",kernelFunc:v8};function I8(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{numOrSizeSplits:s,axis:i}=r,a=C.parseAxisParam(i,n.shape)[0],u=y.prepareSplitSize(n,s,a),c=n.shape.length,l=new Array(c).fill(0),p=n.shape.slice();return u.map(m=>{let d=[...p];d[a]=m;let f=Vo({inputs:{x:n},backend:e,attrs:{begin:l,size:d}});return l[a]+=m,f})}var CD={kernelName:ei,backendName:"webgpu",kernelFunc:I8};var k8=lt({opType:K.SQRT}),bD={kernelName:tn,backendName:"webgpu",kernelFunc:k8};var yD={kernelName:mu,backendName:"webgpu",kernelFunc:({inputs:o,backend:t})=>{let{x:e}=o,r=t,n=new no(e.shape,K.SQUARE);return r.runWebGPUProgram(n,[e],e.dtype)}};var $8=Rt({opType:at.SQUARED_DIFFERENCE}),wD={kernelName:en,backendName:"webgpu",kernelFunc:$8};function T8({inputs:o,attrs:t,backend:e}){let{x:r}=o,n=new no(r.shape,K.STEP,"stepAlpha : f32,"),s=[{type:"float32",data:[t.alpha]}];return e.runWebGPUProgram(n,[r],r.dtype,s)}var SD={kernelName:rn,backendName:"webgpu",kernelFunc:T8};var Kf=class{constructor(t){this.variableNames=["x"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]);let e=Vt(this.outputShape.length);this.uniforms=`begin : ${e},  strides : ${e}, `,this.shaderKey="stridedSlice"}getUserCode(){let t=this.outputShape.length,e="";if(t===1)e="coords * uniforms.strides + uniforms.begin";else{let n=0;e=this.outputShape.map((s,i)=>(n++,this.outputShape.length===1?`coords * uniforms.strides[${i}] + uniforms.begin[${i}]`:`coords[${n-1}] * uniforms.strides[${i}] + uniforms.begin[${i}]`)).join(",")}return`
       ${B("index")} {
         if (index < uniforms.size) {
           let coords = getCoordsFromIndex(index);
           setOutputAtIndex(index, getX(${e}));
         }
       }
     `}};function N8(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{begin:s,end:i,strides:a,beginMask:u,endMask:c,ellipsisMask:l,newAxisMask:p,shrinkAxisMask:m}=r,{finalShapeSparse:d,finalShape:f,isIdentity:h,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:v}=ee.sliceInfo(n.shape,s,i,a,u,c,l,p,m),k;if(h)k=tt({inputs:{x:n},backend:e,attrs:{shape:f}});else if(g||x){C.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let N=ee.computeOutShape(b,w,v),E=Vo({inputs:{x:n},backend:e,attrs:{begin:b,size:N}});k=tt({inputs:{x:E},backend:e,attrs:{shape:f}}),e.disposeData(E.dataId)}else if(e.shouldExecuteOnCPU([n])){let E=e.readSync(n.dataId),R=nt(n.shape,n.dtype,E),A=$N(d,R,v,b);k=e.makeTensorInfo(f,n.dtype,A.values)}else{let E=new Kf(d),R=[{type:"int32",data:b},{type:"int32",data:v}],A=e.runWebGPUProgram(E,[n],n.dtype,R);k=tt({inputs:{x:A},backend:e,attrs:{shape:f}}),e.disposeData(A.dataId)}return k}var vD={kernelName:ii,backendName:"webgpu",kernelFunc:N8};function E8(o){let{inputs:t,backend:e,attrs:r}=o,{separator:n,nGramWidths:s,leftPad:i,rightPad:a,padWidth:u,preserveShortSequences:c}=r,{data:l,dataSplits:p}=t,m=e.readSync(l.dataId),d=e.readSync(p.dataId),[f,h]=TN(m,d,n,s,i,a,u,c);return[e.makeTensorInfo([f.length],"string",f),e.makeTensorInfo(p.shape,"int32",h)]}var ID={kernelName:ai,backendName:"webgpu",kernelFunc:E8};var R8=Rt({opType:at.SUB,cpuKernelImpl:NN,supportsComplex:!0}),kD={kernelName:"Sub",backendName:"webgpu",kernelFunc:R8};var D8=lt({opType:K.TAN}),$D={kernelName:"Tan",backendName:"webgpu",kernelFunc:D8};var A8=lt({opType:K.TANH}),TD={kernelName:on,backendName:"webgpu",kernelFunc:A8};function F8(o){let{inputs:t,backend:e,attrs:r}=o,{tensor:n,indices:s,updates:i}=t,{}=r,{sliceRank:a,numUpdates:u,sliceSize:c,strides:l,outputSize:p}=y.calculateShapes(i,s,n.shape),m=[p/c,c];if(p===0)return e.makeTensorInfo(n.shape,s.dtype);let d=[],f=tt({inputs:{x:s},backend:e,attrs:{shape:[u,a]}});d.push(f);let h=tt({inputs:{x:i},backend:e,attrs:{shape:[u,c]}});d.push(h);let g=tt({inputs:{x:n},backend:e,attrs:{shape:m}});d.push(g);let x=bl({inputs:{x:g},backend:e,attrs:{reps:Array(m.length).fill(1)}}),b=new cr([u,c],a,f.shape.length,h.shape.length,l,m,n.dtype,!1),w=C.sizeFromShape([u,c]),v=[{type:"int32",data:[a]},{type:"int32",data:l},{type:"int32",data:[w]}],k=e.runWebGPUProgram(b,[h,f],g.dtype,v,x);d.push(k);let N=tt({inputs:{x:k},backend:e,attrs:{shape:n.shape}});return d.forEach(E=>e.disposeData(E.dataId)),N}var ND={kernelName:js,backendName:"webgpu",kernelFunc:F8};var qf=class{constructor(t){this.variableNames=["x","indices"],this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=`inputSize : i32, firstPass : i32, negativeInf : f32,
        dir : i32, inc : i32,`,this.shaderKey="swap"}getUserCode(){return`
        ${B("index")} {
          if (index < uniforms.size) {
            let outC = getCoordsFromIndex(index);
            let batch = outC[0];
            let elemIdx = outC[1];
            // We compare elements pair-wise within a group of size 2 * inc.
            // The comparing rule for each group alternates between ascending
            // and descending. Within each group, we compare each pair at
            // positions i and i+inc. To decide whether an element at position i
            // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
            // inc, it is in the first half of the group, we denote it as x0,
            // otherwise we denote it as x1.
            // For example, as shown in the Bitonic top K paper referenced
            // above, Figure5(a) shows that element[1] is in the second half of
            // the group when group size is 2, but it is in the first half of
            // the group when group size is 4.
            let isFirstInPair = elemIdx % (2 * uniforms.inc) < uniforms.inc;
            var i = 0;
            if (isFirstInPair) {
              i = elemIdx;
            } else {
              i = elemIdx - uniforms.inc;
            }

            var i0 = 0;
            if (uniforms.firstPass == 1) {
              i0 = i;
            } else {
              i0 = i32(getIndices(batch, i));
            }

            var i1 = 0;
            if (uniforms.firstPass == 1) {
              i1 = i + uniforms.inc;
            } else {
              i1 = i32(getIndices(batch, i + uniforms.inc));
            }

            var x0 = f32(0.0);
            var x1 = f32(0.0);
            if (i0 < uniforms.inputSize) {
              x0 = getX(batch, i0);
            } else {
              x0 = uniforms.negativeInf;
            }
            if (i1 < uniforms.inputSize) {
              x1 = getX(batch, i1);
            } else {
              x1 = uniforms.negativeInf;
            }

            let reverse = elemIdx % (2 * uniforms.dir) >= uniforms.dir;
            let isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
            if (reverse == isGreater) {
              // Elements in opposite order of direction
              let iTemp = i0;
              i0 = i1;
              i1 = iTemp;
            }
            if (isFirstInPair) {
              setOutputAtIndex(index, f32(i0));
            } else {
              setOutputAtIndex(index, f32(i1));
            }
          }
        }
      `}},Xf=class{constructor(t){this.variableNames=["x","indices"],this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms="inputSize : i32, firstPass : i32, k : i32,",this.shaderKey="merge"}getUserCode(){return`
        ${B("index")} {
          if (index < uniforms.size) {
            let outC = getCoordsFromIndex(index);
            let batch = outC[0];
            let elemIdx = outC[1];
            // The output size is half of the previous size.
            // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _
            // (k=4), we only need to output the indices at positions |, the
            // indices at positions _ can be thrown away, see Figure5(b) After
            // Phase 2 (Merge phase) in the Bitonic Top K paper referenced
            // above.
            // For example, the paper shows we only need to output the orange
            // bars. The output sequence should look like this | | | | | | | |.
            // Because the sequence is halved, to map the output index back to
            // the previous sequence to find the corresponding value, we need
            // to double the index. When we double the index, we basically
            // interpolate a position, so 2i looks like
            // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k
            // position of each 2k positions by - elemIdx % k. E.g. for output
            // at index 4,5,6,7, we want to get the corresponding element at
            // original index 8,9,10,11, for output at index 8,9,10,11,
            // we want to get the corresponding element at original index
            // 16,17,18,19, so on and so forth.

            var i = 0;
            if (elemIdx < uniforms.k) {
              i = elemIdx;
            } else {
              i = elemIdx * 2 - elemIdx % uniforms.k;
            }
            var i0 = 0;
            if (uniforms.firstPass == 1) {
              i0 = i;
            } else {
              i0 = i32(getIndices(batch, i));
            }
            var i1 = 0;
            if (uniforms.firstPass == 1) {
              i1 = i + uniforms.k;
            } else {
              i1 = i32(getIndices(batch, i + uniforms.k));
            }

            let x0 = getX(batch, i0);
            var x1 = f32(0.0);
            if (i1 < uniforms.inputSize) {
              x1 = getX(batch, i1);
            } else {
              x1 = x0;
            }

            if (x0 >= x1) {
              setOutputAtIndex(index, f32(i0));
            } else {
              setOutputAtIndex(index, f32(i1));
            }
          }
        }
      `}};function fc(o,t){t!==null&&o.disposeData(t.dataId)}function ED(o){let t=1;for(;t<o;)t*=2;return t}function P8(o){let{inputs:t,backend:e,attrs:r}=o,{x:n}=t,{k:s,sorted:i}=r,a=n.shape,u=a[a.length-1];if(e.shouldExecuteOnCPU([n])){let k=e.readSync(n.dataId),[N,E]=RN(k,a,n.dtype,s,i);return[e.makeTensorInfo(N.shape,N.dtype,N.values),e.makeTensorInfo(E.shape,E.dtype,E.values)]}if(s===0)return a[a.length-1]=0,[e.makeTensorInfo(a,n.dtype,[]),e.makeTensorInfo(a,"int32",[])];if(u===1)return[n,Zt({attrs:{shape:a,dtype:"int32",value:0},backend:e})];let l=C.sizeFromShape(a)/u,p=tt({inputs:{x:n},attrs:{shape:[l,u]},backend:e}),m=ED(s),d=ED(u),f=null,h=()=>f===null?[p,p]:[p,f],g=(k,N,E)=>{let R=h(),A=new qf(E),P=[{type:"int32",data:[u]},{type:"int32",data:[f===null?1:0]},{type:"float32",data:[Number.NEGATIVE_INFINITY]},{type:"int32",data:[k]},{type:"int32",data:[N]}],_=f;f=e.runWebGPUProgram(A,R,"int32",P),fc(e,_)};for(let k=1;k<m;k*=2){let N=k*2;for(let E=k;E>=1;E/=2)g(N,E,[l,d])}for(let k=d;k>m;k/=2){let N=h(),E=new Xf([l,k/2]),A=[{type:"int32",data:[u]},{type:"int32",data:[f===null?1:0]},{type:"int32",data:[m]}],F=f;f=e.runWebGPUProgram(E,N,"int32",A),fc(e,F);let P=m/2,_=P*2;for(let O=P;O>=1;O/=2)g(_,O,f.shape)}let x=f;f=Vo({inputs:{x:f},backend:e,attrs:{begin:0,size:[l,s]}}),fc(e,x);let b=kC({inputs:{x:p,indices:f},backend:e,attrs:{axis:1,batchDims:1}});fc(e,p);let w=a.slice(0,-1);w.push(s),x=f,f=tt({inputs:{x:f},attrs:{shape:w},backend:e}),fc(e,x);let v=b;return b=tt({inputs:{x:b},attrs:{shape:w},backend:e}),fc(e,v),[b,f]}var RD={kernelName:li,backendName:"webgpu",kernelFunc:P8};var jf=class{constructor(t){this.variableNames=["Image","Transforms"],this.uniforms="interpolationModeId : i32, fillModeId : i32, fillValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=G(this.outputShape),this.dispatch=z(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="transform"}getUserCode(){return`
          fn mapCoord(outCoord : f32, len : f32) -> f32{
            var inCoord = outCoord;
            if(uniforms.fillModeId == 2) {
              if (inCoord < 0.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz2 = 2.0 * len;
                  if (inCoord < sz2) {
                    inCoord = sz2 * f32(i32(f32(-inCoord / sz2))) +
                    inCoord;
                  }
                  if (inCoord < -len) {
                    inCoord = inCoord + sz2;
                  } else {
                    inCoord = -inCoord - 1.0;
                  }
                }
              } else if (inCoord > len - 1.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz2 = 2.0 * len;
                  inCoord = inCoord - sz2 * f32(i32(f32(inCoord / sz2)));
                  if (inCoord >= len) {
                    inCoord = sz2 - inCoord - 1.0;
                  }
                }
              }
              return clamp(inCoord, 0.0, len - 1.0);
            } else if (uniforms.fillModeId == 3) {
              if (inCoord < 0.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz = len - 1.0;
                  inCoord = inCoord + len * (f32(i32(f32(-inCoord / sz))) + 1.0);
                }
              } else if (inCoord > len - 1.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz = len - 1.0;
                  inCoord = inCoord - len * f32(i32(f32(inCoord / sz)));
                }
              }
              return clamp(inCoord, 0.0, len - 1.0);
            } else if (uniforms.fillModeId == 4) {
              return clamp(outCoord, 0.0, len - 1.0);
            }
            return outCoord;
          }
          fn readWithFillValue(batch : i32, coordY : i32, coordX : i32,
            channel : i32) -> f32 {
            var outputValue : f32;
            if (0 <= coordY && coordY < uniforms.imageShape[1] && 0 <= coordX && coordX < uniforms.imageShape[2]) {
                outputValue = getImage(batch, coordY, coordX, channel);
            } else {
              outputValue = uniforms.fillValue;
            }
            return outputValue;
          }

          ${B("index")} {
            if (index < uniforms.size) {
              let coords = getCoordsFromIndex(index);
              var outputValue : f32;
              let batch = coords[0];
              let x = coords[2];
              let y = coords[1];
              let channel = coords[3];
              let xf = f32(x);
              let yf = f32(y);
              let a1 = getTransforms(batch, 0);
              let a2 = getTransforms(batch, 1);
              let a3 = getTransforms(batch, 2);
              let b1 = getTransforms(batch, 3);
              let b2 = getTransforms(batch, 4);
              let b3 = getTransforms(batch, 5);
              let c1 = getTransforms(batch, 6);
              let c2 = getTransforms(batch, 7);
              let projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = uniforms.fillValue;
              } else {
                let inX = (a1 * xf + a2 * yf + a3) / projection;
                let inY = (b1 * xf + b2 * yf + b3) / projection;
                let mapX = mapCoord(inX, f32(uniforms.imageShape[2]));
                let mapY = mapCoord(inY, f32(uniforms.imageShape[1]));

                if (uniforms.interpolationModeId == 1) {
                  let coordY = i32(round(mapY));
                  let coordX = i32(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  let yFloor = floor(mapY);
                  let xFloor = floor(mapX);
                  let yCeil = yFloor + 1.0;
                  let xCeil = xFloor + 1.0;
                  let valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, i32(yFloor), i32(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, i32(yFloor), i32(xCeil), channel);
                  let valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, i32(yCeil), i32(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, i32(yCeil), i32(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutputAtIndex(index, outputValue);
            }
          }
        `}};function _8(o){let{inputs:t,backend:e,attrs:r}=o,{image:n,transforms:s}=t,{interpolation:i,fillMode:a,fillValue:u,outputShape:c}=r,[l,p,m,d]=n.shape,[f,h]=c??[p,m],g=[l,f,h,d],x=new jf(g),b=i==="nearest"?1:2,w;switch(a){case"constant":w=1;break;case"reflect":w=2;break;case"wrap":w=3;break;case"nearest":w=4;break;default:w=1;break}let v=[{type:"int32",data:[b]},{type:"int32",data:[w]},{type:"float32",data:[u]}];return e.runWebGPUProgram(x,[n,s],"float32",v)}var DD={kernelName:pi,backendName:"webgpu",kernelFunc:_8};function O8(o){let{inputs:t,backend:e,attrs:r}=o,{value:n}=t,{axis:s}=r;s<0&&(s+=n.shape.length);let i=n,a=i.shape.length,u=n.shape[s],c=new Array(a-1),l=0;for(let h=0;h<a;h++)h!==s&&(c[l++]=i.shape[h]);let p=[],m=new Array(a).fill(0),d=i.shape.slice();d[s]=1;let f=new Array(u);for(let h=0;h<f.length;h++){m[s]=h;let g=Vo({inputs:{x:i},backend:e,attrs:{begin:m,size:d}}),x=tt({inputs:{x:g},backend:e,attrs:{shape:c}});f[h]=x,p.push(g)}return p.forEach(h=>e.disposeData(h.dataId)),f}var AD={kernelName:mi,backendName:"webgpu",kernelFunc:O8};var Yf=class{constructor(t,e,r){if(this.outputShape=[],this.variableNames=["x","segmentIds"],this.uniforms="numSegments : i32, xSize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=e,this.dispatchLayout=G(t),this.dispatch=z(this.dispatchLayout,t,this.workgroupSize),r!=="float32"&&r!=="int32")throw new Error(`UnsortedSegmentSum only supports float32 and int32
              types, does not support ${r} type.`);this.type=r,this.shaderKey="unsortedSegmentSum"}getUserCode(){return`
    ${B("index")} {
      if (index < uniforms.xSize) {
        let coords = getXCoordsFromIndex(index);
        let b = coords[0];
        let inCol = coords[1];

        let segmentId = i32(getSegmentIds(inCol));
        if (segmentId >= 0) {
          let flatIndex = b * uniforms.numSegments + segmentId % uniforms.numSegments;
          let value = getX(b, inCol);

          ${oo("&result[flatIndex]","value",this.type)}
        }
      }
    }
  `}};function M8(o){let{inputs:t,backend:e,attrs:r}=o,{x:n,segmentIds:s}=t,{numSegments:i}=r,a=n.shape.length,u=[],c=0,l=y.getAxesPermutation([c],a),p=n;l!=null&&(p=_e({inputs:{x:n},backend:e,attrs:{perm:l}}),u.push(p),c=y.getInnerMostAxes(1,a)[0]);let m=y.segment_util.computeOutShape(p.shape,c,i),d=C.sizeFromShape([p.shape[c]]),f=tt({inputs:{x:p},backend:e,attrs:{shape:[-1,d]}});u.push(f);let h=n.dtype,g=[f.shape[0],i],x=Zt({backend:e,attrs:{shape:g,value:0,dtype:h}}),b=new Yf(f.shape,g,h),w=[{type:"int32",data:[i]},{type:"int32",data:[C.sizeFromShape(f.shape)]}],v=e.runWebGPUProgram(b,[f,s],h,w,x),k=tt({inputs:{x:v},backend:e,attrs:{shape:m}});u.push(v);let N=k;if(l!=null){u.push(k);let E=y.getUndoAxesPermutation(l);N=_e({inputs:{x:N},backend:e,attrs:{perm:E}})}return u.forEach(E=>e.disposeData(E.dataId)),N}var FD={kernelName:di,backendName:"webgpu",kernelFunc:M8};var L8=[jT,AN,FN,PN,_N,ON,LN,BN,zN,VN,WN,UN,GN,HN,KN,jN,YN,QN,ZN,JN,eE,oE,rE,aE,uE,cE,QT,pE,dE,fE,hE,gE,xE,CE,bE,yE,wE,SE,kE,$E,TE,NE,RE,DE,EE,AE,FE,PE,_E,OE,BE,zE,VE,WE,UE,GE,HE,KE,qE,qT,XE,QE,jE,YE,ZE,JE,tR,eR,oR,rR,nR,YT,sR,mE,iR,aR,uR,cR,lR,pR,mR,fR,dR,hR,gR,xR,bR,yR,qN,wR,SR,kR,vR,IR,$R,XN,TR,NR,ER,RR,AR,ME,FR,PR,_R,nE,OR,BR,zR,VR,WR,UR,GR,HR,sE,KR,qR,XR,jR,XT,YR,QR,ZR,JR,tD,eD,oD,rD,nD,sD,iD,aD,uD,cD,lD,pD,tE,SD,vD,ID,DR,mD,dD,fD,hD,xD,CD,bD,yD,wD,kD,LE,$D,TD,ND,gD,RD,DD,MN,AD,FD,MR];for(let o of L8)Qi(o);export{On as Abs,fr as Acos,hr as Acosh,wa as AdadeltaOptimizer,Sa as AdagradOptimizer,va as AdamOptimizer,Ia as AdamaxOptimizer,Go as Add,Mn as AddN,Bi as All,zi as Any,Ln as ArgMax,Bn as ArgMin,gr as Asin,xr as Asinh,Cr as Atan,yr as Atan2,br as Atanh,zn as AvgPool,Vn as AvgPool3D,Za as AvgPool3DGrad,Qa as AvgPoolGrad,Wn as BatchMatMul,Un as BatchToSpaceND,Gn as Bincount,Vi as BitwiseAnd,Hn as BroadcastArgs,G8 as BroadcastTo,Ho as Cast,wr as Ceil,Sr as ClipByValue,Kn as Complex,qn as ComplexAbs,Xn as Concat,jn as Conv2D,Yn as Conv2DBackpropFilter,Qn as Conv2DBackpropInput,Zn as Conv3D,Ja as Conv3DBackpropFilterV2,Jn as Conv3DBackpropInputV2,ts as Cos,vr as Cosh,rs as CropAndResize,es as Cumprod,os as Cumsum,mr as DataStorage,ns as DenseBincount,ss as DepthToSpace,is as DepthwiseConv2dNative,as as DepthwiseConv2dNativeBackpropFilter,us as DepthwiseConv2dNativeBackpropInput,cs as Diag,ls as Dilation2D,yc as Dilation2DBackpropFilter,bc as Dilation2DBackpropInput,Wi as Draw,ah as ENV,ps as Einsum,ms as Elu,tu as EluGrad,xc as Environment,kr as Equal,ds as Erf,fs as Exp,hs as ExpandDims,$r as Expm1,Ui as FFT,gs as Fill,xs as FlipLeftRight,Tr as Floor,Nr as FloorDiv,Yi as FromPixels,Cs as FusedBatchNorm,sn as FusedConv2D,an as FusedDepthwiseConv2D,ys as GatherNd,bs as GatherV2,Er as Greater,Rr as GreaterEqual,ws as IFFT,Ko as Identity,Ss as Imag,Dr as IsFinite,Ar as IsInf,Fr as IsNan,No as KernelBackend,Gi as LRN,eu as LRNGrad,vs as LeakyRelu,Pr as Less,_r as LessEqual,Is as LinSpace,ks as Log,Or as Log1p,K8 as LogSoftmax,Mr as LogicalAnd,Lr as LogicalNot,Br as LogicalOr,H8 as LogicalXor,q8 as LowerBound,X8 as MatrixBandPart,Hi as Max,$s as MaxPool,Ts as MaxPool3D,ru as MaxPool3DGrad,ou as MaxPoolGrad,Ns as MaxPoolWithArgmax,zr as Maximum,Es as Mean,Ki as Min,Vr as Minimum,Rs as MirrorPad,Ds as Mod,ka as MomentumOptimizer,As as Multinomial,Wr as Multiply,qi as Neg,Fs as NonMaxSuppressionV3,nu as NonMaxSuppressionV4,Ps as NonMaxSuppressionV5,Ur as NotEqual,ab as OP_SCOPE_SUFFIX,Os as OneHot,_s as OnesLike,Ve as Optimizer,Wc as OptimizerConstructors,Ms as Pack,Ls as PadV2,j8 as Pool,Bs as Pow,zs as Prelu,Vs as Prod,$a as RMSPropOptimizer,su as RaggedGather,iu as RaggedRange,au as RaggedTensorToTensor,Ws as Range,bh as Rank,Us as Real,Ir as RealDiv,Gr as Reciprocal,re as Reduction,Hr as Relu,Kr as Relu6,Gs as Reshape,Ks as ResizeBilinear,cu as ResizeBilinearGrad,Hs as ResizeNearestNeighbor,uu as ResizeNearestNeighborGrad,qs as Reverse,hi as RotateWithOffset,qr as Round,Xr as Rsqrt,yn as SGDOptimizer,Xs as ScatterNd,Ys as SearchSorted,Qs as Select,jr as Selu,Zr as Sigmoid,Qr as Sign,Js as Sin,Yr as Sinh,Zs as Slice,oi as Softmax,Jr as Softplus,ti as SpaceToBatchND,lu as SparseFillEmptyRows,pu as SparseReshape,ri as SparseSegmentMean,ni as SparseSegmentSum,si as SparseToDense,ei as SplitV,tn as Sqrt,mu as Square,en as SquaredDifference,ji as StaticRegexReplace,rn as Step,ii as StridedSlice,ai as StringNGrams,du as StringSplit,fu as StringToHashBucketFast,ui as Sub,Xi as Sum,ci as Tan,on as Tanh,Ut as Tensor,Dt as TensorBuffer,js as TensorScatterUpdate,qo as Tile,li as TopK,pi as Transform,Xo as Transpose,hu as Unique,mi as Unpack,di as UnsortedSegmentSum,Y8 as UpperBound,un as Variable,fi as ZerosLike,nn as _FusedMatMul,ke as abs,iF as acos,uF as acosh,pt as add,lF as addN,mF as all,fF as any,gF as argMax,CF as argMin,yF as asin,SF as asinh,IF as atan,$F as atan2,NF as atanh,Uh as avgPool,LF as avgPool3d,lb as backend,y as backend_util,HF as basicLSTMCell,ia as batchNorm,jF as batchNorm2d,QF as batchNorm3d,JF as batchNorm4d,Gh as batchToSpaceND,Hh as bincount,o3 as bitwiseAnd,Uht as booleanMaskAsync,n3 as broadcastArgs,aa as broadcastTo,xo as broadcast_util,ww as browser,nt as buffer,$t as cast,a3 as ceil,c3 as clipByValue,Po as clone,Ye as complex,pe as concat,p3 as concat1d,d3 as concat2d,h3 as concat3d,x3 as concat4d,y3 as conv1d,ua as conv2d,v3 as conv2dTranspose,k3 as conv3d,N3 as conv3dTranspose,nY as copyRegisteredKernels,R3 as cos,A3 as cosh,Zl as cosineWindow,P3 as cumprod,O3 as cumsum,ze as customGrad,L3 as denseBincount,FA as deprecationWarn,z3 as depthToSpace,Dc as depthwiseConv2d,Ci as device_util,U3 as diag,H3 as dilation2d,h7 as disableDeprecationWarnings,me as dispose,g7 as disposeVariables,Et as div,Y3 as divNoNan,Z3 as dot,Wgt as dropout,ca as einsum,qh as elu,f7 as enableDebugMode,d7 as enableProdMode,py as enclosingPowerOfTwo,Be as engine,oP as ensureShape,D as env,Kh as equal,nP as erf,bP as euclideanNorm,_o as exp,er as expandDims,vP as expm1,jh as eye,Pc as fft,hn as fill,v7 as findBackend,I7 as findBackendFactory,Yh as floor,Bh as floorDiv,Cy as fused,Qh as gather,Rgt as gatherND,vw as gather_util,cb as getBackend,lh as getGradient,xu as getKernel,vl as getKernelsForBackend,HP as grad,KP as grads,Eu as greater,Zh as greaterEqual,Fu as ifft,pa as imag,Evt as image,jgt as inTopKAsync,hw as io,Ig as irfft,AP as isFinite,PP as isInf,OP as isNaN,ub as keep,de as kernel_impls,Jh as leakyRelu,Vl as less,Ac as lessEqual,Fvt as linalg,zP as linspace,WP as localResponseNormalization,Si as log,tg as log1p,ZP as logSigmoid,e_ as logSoftmax,rg as logSumExp,Ru as logicalAnd,ng as logicalNot,sg as logicalOr,a_ as logicalXor,Uvt as losses,c_ as lowerBound,At as matMul,xw as math,xn as max,ig as maxPool,m_ as maxPool3d,f_ as maxPoolWithArgmax,ag as maximum,Du as mean,x7 as memory,x_ as meshgrid,zl as min,Au as minimum,y_ as mirrorPad,S_ as mod,I_ as moments,lgt as movingAverage,Q as mul,$_ as multiRNNCell,N_ as multinomial,Pe as neg,zg as nextFrame,Nu as norm,ug as notEqual,Hl as oneHot,Cn as ones,A_ as onesLike,I as op,P_ as outerProduct,bn as pad,M_ as pad1d,B_ as pad2d,V_ as pad3d,U_ as pad4d,X_ as pool,wi as pow,lg as prelu,Lh as print,Q_ as prod,C7 as profile,J_ as raggedGather,eO as raggedRange,rO as raggedTensorToTensor,sO as rand,SO as randomGamma,wg as randomNormal,kO as randomStandardNormal,Fc as randomUniform,NO as randomUniformInt,fa as range,w7 as ready,vi as real,DO as reciprocal,vu as registerBackend,eY as registerGradient,Qi as registerKernel,ha as relu,Sg as relu6,S7 as removeBackend,V as reshape,bo as reverse,OO as reverse1d,LO as reverse2d,zO as reverse3d,WO as reverse4d,_c as rfft,vg as round,HO as rsqrt,wt as scalar,xgt as scatterND,Yl as scatter_util,Gl as searchSorted,qO as selu,jO as separableConv2d,nw as serialization,y7 as setBackend,k7 as setPlatform,QO as setdiff1dAsync,fn as sigmoid,JO as sign,dvt as signal,eM as sin,rM as sinh,_t as slice,sM as slice1d,aM as slice2d,cM as slice3d,pM as slice4d,ee as slice_util,dM as softmax,og as softplus,cg as spaceToBatchND,Xvt as sparse,Igt as sparseToDense,uvt as spectral,Ii as split,Qe as sqrt,$e as square,kg as squaredDifference,Oc as squeeze,ki as stack,$g as step,IM as stridedSlice,Jvt as string,ht as sub,Ot as sum,cn as sumOutType,$M as tan,Ml as tanh,pn as tensor,Te as tensor1d,ga as tensor2d,Tg as tensor3d,TM as tensor4d,NM as tensor5d,EM as tensor6d,DM as tensorScatterUpdate,nb as tensor_util,ay as test_util,Bt as tidy,la as tile,b7 as time,FM as topk,RNt as train,Lc as transpose,_M as truncatedNormal,MM as unique,rY as unregisterGradient,oY as unregisterKernel,BM as unsortedSegmentSum,Mc as unstack,Lt as upcastType,VM as upperBound,C as util,qP as valueAndGrad,XP as valueAndGrads,WM as variable,eg as variableGrads,EB as version_core,Co as where,Eg as whereAsync,uo as zeros,xe as zerosLike};
