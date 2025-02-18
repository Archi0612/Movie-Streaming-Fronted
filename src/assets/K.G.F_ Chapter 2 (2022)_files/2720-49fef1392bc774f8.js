"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2720],{62720:function(e,t,i){let a,r;i.r(t),i.d(t,{__N_SSP:function(){return ev},default:function(){return eO}});var s,o,n=i(52322),l=i(66898),d=i(11778),E=i(70314),c=i.n(E),I=i(2784),u=i(25436),T=i(83128),g=i(83827),m=i(16189);let p=(0,m.createLogger)()("util_fetchAdServiceAd"),h=async e=>{try{return await (0,g.db)(e)}catch(e){return p.error("makeAdServiceAdAJAXRequest failed",e),null}};var A=i(12859),S=i(66617),f=i(33192),R=i(14865),b=i(45103),w=i(56812),y=i(77594),D=i(46392),M=i(81988),L=i(17138),_=i(45194),v=i(25321),O=i(28827),N=i(11793),C=i(52817),P=i(72779),H=i.n(P),$=i(73282),k=i(88173),x=i(11817);let B={NO_ELEMENT:"advertising banner/interstitial component or iframe are undefined",NO_IFRAME_CONTENT:"banner or interstitial was clicked on, but no contentDocument was found in iframe",NO_CLICK_TARGET:"banner or interstitial was clicked on, but no clickable element was found in iframe"},G=(0,m.createLogger)()("");function j(e,t,i){let a=t?.querySelector("iframe");if(!a){G.error(B.NO_ELEMENT);return}let r=a.contentDocument;if(!r||!r.elementFromPoint){G.error(B.NO_IFRAME_CONTENT);return}let{left:s,top:o}=a.getBoundingClientRect(),n=r.elementFromPoint(e.clientX-s,e.clientY-o);if(n){n.dispatchEvent(new MouseEvent(e.type,{bubbles:!0,cancelable:!0})),(0,x.P)(i);return}let l=t?.querySelector("#interstitial_sponsored");if(l){let{left:t,top:a,width:r,height:s}=l.getBoundingClientRect(),o=e.clientX-t,n=e.clientY-a;if(o>0&&o<=r&&n>0&&n<=s){l.dispatchEvent(new MouseEvent(e.type,{bubbles:!0,cancelable:!0})),(0,x.P)(i);return}}G.error(B.NO_CLICK_TARGET)}var U=i(42057);let W=e=>{let{galleryUrl:t}=e,i=(0,O.N)({id:"mediaViewer_ariaLabel_gallery",defaultMessage:"gallery"});return(0,n.jsx)(b.IconButton,{"data-testid":"mv-gallery-button",name:"grid-view",label:i,href:t,onColor:"base"})},F=e=>{let{state:t,className:i,imagePosition:a}=e,r={countLabel:(0,O.N)(k.KL.countLabel,{position:a,total:t.totalImages})},s=`${k.Nw[t.type]}_mv`,o=(0,I.useRef)(null);return(0,n.jsx)($.ol,{className:H()(k.$C.ACTION_BAR,A.$,i),refTagPrefix:s,shareProps:{shareBody:Y,emailSubject:Y,label:V},breadcrumbProps:{refTagPrefix:s,"data-testid":"mv-breadcrumb-close-button"},actions:(0,n.jsxs)(n.Fragment,{children:[!t.showInterstitial&&!!t.position&&t.totalImages&&(0,n.jsx)(U.vI,{"data-testid":k.$C.ACTION_BAR_GALLERY_COUNT,children:r.countLabel}),(0,n.jsx)(W,{galleryUrl:s?`${t.galleryUrl}?ref_=${s}_sm`:t.galleryUrl})]}),heightClass:"extended",children:!t.showInterstitial&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(v.ZP,{name:A.A.MEDIAVIEWER_BANNER}),(0,n.jsx)(U.Ov,{ref:o,onClick:e=>{j(e,o.current,"ad-banner")}})]})})},V={id:"mediaViewer_ariaLabel_shareOnSocialMedia",defaultMessage:"share on social media"},Y={id:"mediaViewer_shareText_viewThisImage",defaultMessage:"View this image on IMDb!"},K=1e3/60;function Z(){clearTimeout(a),a=void 0}function q(e){return e>0?Math.min(450,e):e<0?Math.max(-450,e):0}function X(e,t,i){30>Math.abs(e)?(t(0),Z()):(i(),t(q(-e)),Z(),setTimeout(()=>t(0),K))}var z=i(5632),J=i(18174),Q=i.n(J),ee=i(26806),et=i(72072),ei=i(62298),ea=i(66662),er=i(27261),es=i(98046),eo=i(87712),en=i(19126),el=i.n(en);let ed=(e,t)=>{let i=e?el().parse(window.location.search.replace("?","")):{};return t||delete i.ref_,el().stringify(i)};var eE=i(72579),ec=i.n(eE);let eI=(e,t)=>{switch(e){case eo.b.NAME:return ec()(t,`${e}.${e}Text.text`,"");case eo.b.TITLE:let i=ec()(t,`${e}.${e}Text.text`,""),a=ec()(t,`${e}.releaseYear.year`,"");return a?`${i} (${a})`:i;case eo.b.GALLERY:return ec()(t,"imageGallery.galleryText","");case eo.b.LIST:return ec()(t,`${e}.name.originalText`,"")}},eu=(e,t)=>e===eo.b.NAME||e===eo.b.TITLE?`/${e}/${t}/mediaindex/`:`/${e}/${t}/`,eT=(e,t)=>{let i=[];return t.forEach(t=>{let a=e===eo.b.LIST?{...t,node:{...t.node.item,caption:t.node.description?.originalText||t.node.item.caption}}:{...t};i.push(a)}),i},eg=(e,t,i)=>{let a=k.Qn[e],r=e===eo.b.LIST?"items":"images",s=`${a}.${r}`,o=`${a}.wrapFront`,n=`${a}.wrapBack`,l=a=>({images:eT(e,ec()(i,`${a}.edges`,[])),title:eI(e,i),galleryUrl:eu(e,t),total:ec()(i,`${a}.total`,0),startCursor:ec()(i,`${a}.pageInfo.startCursor`,""),hasPreviousPage:ec()(i,`${a}.pageInfo.hasPreviousPage`,!1),endCursor:ec()(i,`${a}.pageInfo.endCursor`,""),hasNextPage:ec()(i,`${a}.pageInfo.hasNextPage`,!1)}),d=l(s),E=l(o),c=l(n),I=d.total?d:E.total?E:c;return{images:[...d.images,...E.images,...c.images],title:I.title,galleryUrl:I.galleryUrl,total:I.total,startCursor:I.startCursor,hasPreviousPage:I.hasPreviousPage,endCursor:I.endCursor,hasNextPage:d.hasNextPage}},em=(e,t,i,a,r,s)=>{let o=[],n={main:void 0};switch(e){case"init":n.main={id:t,jumpTo:r,first:k.kH,last:k.kH/2,lastYes:!0,firstYes:!0};break;case"left":o=[...Array(k.kH).keys()].map(e=>{let t=i-e;return t<=0?null:t}),n.main={id:t,before:a,last:k.kH,lastYes:!0,firstYes:!1};break;case"right":o=[...Array(k.kH).keys()].map(e=>{let t=i+e;return t>s?null:t}),n.main={id:t,after:a,first:k.kH,lastYes:!1,firstYes:!0}}return o=o.filter(e=>null!==e),"init"!==e&&o.length<1&&(n.main=void 0),{fetchPositions:o,args:n}},ep=(e,t)=>{let i,a;let r=e.position||0,s=e.media&&e.media[r],o=s?.node.id;return o&&(i=e.vanitySubType&&e.vanityType?`/[${k.Ek}]/[vanityOrId]/[idWithVanity]/mediaviewer/[img]`:`/[${k.Ek}]/[vanityOrId]/mediaviewer/[img]`,a=e.vanitySubType&&e.vanityType?`/${e.vanityType}/${e.vanitySubType}/${e.listId}/mediaviewer/${o}/${t&&`?${t}`}`:`/${e.vanityType??e.type}/${e.listId}/mediaviewer/${o}/${t&&`?${t}`}`),{url:i,path:a}},eh=(e,t,i)=>{let a=k.Nw[t],r=k.k6[e];return`${a}_${i?"mv_ad":"mv"}_${r}`},eA=e=>{var t;return Math.abs(e)===k.ve||0==((Math.abs(e)-k.ve)%(t=k.gG)+t)%t},eS=e=>{var t;return 0==((Math.abs(e)-k.ve)%(t=k.HP)+t)%t};(s=o||(o={})).INITIALIZE="INITIALIZE",s.PAGE_LEFT="page-left",s.PAGE_RIGHT="page-right",s.GOTO_IMAGE_ID="goto-image-id",s.UPDATE_DISTANCE="update-distance",s.UPDATE_UNSEEN_INTERSTITIAL_AVAILABLE="UPDATE_UNSEEN_INTERSTITIAL_AVAILABLE",s.FETCH_IMAGES="FETCH-IMAGES",s.FETCH_IMAGES_PENDING="FETCH-IMAGES-PENDING",s.FETCH_IMAGES_DONE="FETCH-IMAGES-DONE",s.FETCH_IMAGES_FAILED="FETCH-IMAGES-FAILED",s.SHOW_EDIT_DRAWER="SHOW-EDIT-DRAWER",s.HIDE_EDIT_DRAWER="HIDE-EDIT-DRAWER",s.SHOW_REPORT_DRAWER="SHOW-REPORT-DRAWER",s.HIDE_REPORT_DRAWER="HIDE-REPORT-DRAWER",s.SHOW_BOTTOM_SHEET="SHOW-BOTTOM-SHEET",s.HIDE_BOTTOM_SHEET="HIDE-BOTTOM-SHEET",s.SHOW_PAGER="SHOW-PAGER",s.HIDE_PAGER="HIDE-PAGER",s.SET_MOUSE_TIMEOUT_ID="SET-MOUSE-TIMEOUT-ID",s.SET_LAST_TIME_MOUSE_MOVED="SET-LAST-TIME-MOUSE-MOVED";let ef=(0,m.createLogger)()("useMediaViewerState"),eR={initialize:e=>(t,i)=>{let{initialImageId:a,type:r,listId:s}=i();e||(t(a?eR.fetchImageBatch({direction:"init",jumpTo:a}):eR.fetchImageBatch({direction:"init",position:0})),t({type:"INITIALIZE",payload:{setState:{position:0,type:r,listId:s,initialImageId:a,enablePagers:!0}}}))},gotoImageId:e=>(t,i)=>{let a=Object.values(i().media).find(t=>t.node.id===e);t(a?{type:"goto-image-id",payload:{position:a.position}}:eR.fetchImageBatch({direction:"init",jumpTo:e}))},fetchImageBatch:e=>(t,i)=>{let{jumpTo:a,direction:r,position:s}=e,o=i(),{type:n,listId:l,media:d,isUserLoggedIn:E}=o,{fetchPositions:I,args:u}=em(r,l,s,d[o.position]?.cursor,a,o.totalImages),T=n===eo.b.LIST,{publicRuntimeConfig:g}=c()();t({type:"FETCH-IMAGES-PENDING",payload:{fetchPositions:I,setState:{initiallyLoading:0===I.length&&!s}}}),Promise.all([!!u.main&&o.gqlClient.query((0,k.s)(n),u.main,{url:g.graphQLEndpoint,serverSideCacheable:!(T&&E)}).toPromise().then(e=>{let a=eg(n,l,e.data);if(a.images.length<1){let e="mediaviewer queryData image was empty";throw ef.error(e,{type:i().type,id:i().listId}),Error(e)}t({type:"FETCH-IMAGES-DONE",payload:{direction:r,fetchPositions:I,fetchResult:a}})}).catch(e=>{ef.error("mediaviewer query resulted in error",{type:i().type,id:i().listId,error:e}),t({type:"FETCH-IMAGES-FAILED",payload:{fetchPositions:I,setState:{initiallyLoading:!1},fetchError:e}})})].filter(Boolean))},page:e=>(t,i)=>{let a,r,s;let o=i(),n={left:-1,right:1,load_left:-4,load_right:4},l=o.pageDirection;if(o.loading[o.position]&&!o.showInterstitial||!o.enablePagers)return;let d=o.showInterstitial;eA(i().distance)&&(i().unseenInterstitialAvailable=!1),eS(i().distance)&&o.adHandlers?.updateBannerAd(),t(eR.updateDistance(n[e])),t(eR.stageInterstitialAd());let E=i().showInterstitial,c=d&&l!==e,I=E||c?i().position:i().position+n[e],T=i().position+n[`load_${e}`],g={type:o.type,subType:u.SubPageType.MEDIA_SINGLE,id:o.listId};switch(e){case"left":r=I<=0?i().totalImages:I,a=T<=0?1:r===i().totalImages?i().totalImages:T,s="page-left";break;case"right":r=I>o.totalImages?1:I,a=T>o.totalImages?i().totalImages:1===r?1:T,s="page-right"}o.media[r]||(a=r),o.media[a]||o.errors[a]||o.loading[a]||t(eR.fetchImageBatch({direction:e,position:r}));let m=eh(e,o.type,d);i().showInterstitial?(0,er.K8)(m,g,`mvi-${s}`,es.qB.ACTION_ONLY):(0,er.K8)(m,g,`mv-${s}`,es.qB.PAGE_HIT),t({type:s,payload:{position:r,refTag:m}})},updateDistance:e=>(t,i)=>{t({type:"update-distance",payload:{distance:i().distance+e}})},stageInterstitialAd:()=>async(e,t)=>{if(!t().unseenInterstitialAvailable){let i=await t().adHandlers?.updateInterstitialAd(),a=!(0,ei.Wd)(i?.slotsMap?.[A.A.INTERSTITIAL]);e({type:"UPDATE_UNSEEN_INTERSTITIAL_AVAILABLE",payload:{unseenInterstitialAvailable:a}}),eA(t().distance)&&(t().showInterstitial=a)}},showEdit:()=>({type:"SHOW-EDIT-DRAWER"}),hideEdit:()=>({type:"HIDE-EDIT-DRAWER"}),showReport:()=>({type:"SHOW-REPORT-DRAWER"}),hideReport:()=>({type:"HIDE-REPORT-DRAWER"}),showBottomSheet:()=>({type:"SHOW-BOTTOM-SHEET"}),hideBottomSheet:()=>({type:"HIDE-BOTTOM-SHEET"}),showPager:()=>({type:"SHOW-PAGER"}),hidePager:()=>({type:"HIDE-PAGER"}),setMouseTimeoutId:e=>t=>{t({type:"SET-MOUSE-TIMEOUT-ID",payload:{mouseTimeoutId:e}})},setLastTimeMouseMoved:e=>t=>{t({type:"SET-LAST-TIME-MOUSE-MOVED",payload:{lastTimeMouseMoved:e}})}},eb=function(e,t){let i,{type:a,payload:r}=t;switch(a){case"INITIALIZE":i={...e,...r?.setState};break;case"FETCH-IMAGES-PENDING":{let{fetchPositions:t}=r,a={...e.loading},s={...e.media};t.forEach(e=>{s[e]||(a[e]=!0)}),i={...e,loading:a,...r?.setState};break}case"FETCH-IMAGES-DONE":{let{fetchResult:t,fetchPositions:a,direction:s}=r,o={...e.media},n={...e.loading};t.images.forEach(e=>{if(o[e.position]||(o[e.position]=e,n[e.position]=!1),(0,R.getIsBrowser)()){let t=new Image;t.srcset=(0,ea.gA)(e.node,!0),t.src=e.node.url}}),a?.forEach(e=>{n[e]=!1});let l="init"===s?t.images?.[0]?.position:ey(e.position,n,o,s,t);i={...e,initiallyLoading:!1,position:l,media:o,loading:n,listTitle:t.title,totalImages:t.total,enablePagers:t.total>1,galleryUrl:t.galleryUrl};break}case"FETCH-IMAGES-FAILED":{let{fetchPositions:t,fetchError:a}=r,s={...e.loading},o={...e.errors},n={...e.media};t.forEach(e=>{s[e]=!1,n[e]||(o[e]=a)}),i={...e,...r?.setState,errors:o,loading:s};break}case"page-left":case"page-right":case"goto-image-id":i={...e,position:r.position,refTag:r.refTag};break;case"update-distance":{let t=r?.distance??0,a=e.distance>t?"left":"right",s=eA(t)&&e.unseenInterstitialAvailable,o=eA(t-1),n=eA(t+1);i={...e,distance:r.distance,showInterstitial:s,prevIsInterstitial:o,nextIsInterstitial:n,pageDirection:a};break}case"UPDATE_UNSEEN_INTERSTITIAL_AVAILABLE":{let{unseenInterstitialAvailable:t}=r;i={...e,unseenInterstitialAvailable:t};break}case"SHOW-EDIT-DRAWER":i={...e,showEditDrawer:!0,showReportDrawer:!1};break;case"HIDE-EDIT-DRAWER":i={...e,showEditDrawer:!1};break;case"SHOW-REPORT-DRAWER":i={...e,showReportDrawer:!0,showEditDrawer:!1};break;case"HIDE-REPORT-DRAWER":i={...e,showReportDrawer:!1};break;case"SHOW-BOTTOM-SHEET":i={...e,showBottomSheet:!0};break;case"HIDE-BOTTOM-SHEET":i={...e,showBottomSheet:!1};break;case"SHOW-PAGER":i={...e,pagerVisibility:!0};break;case"HIDE-PAGER":i={...e,pagerVisibility:!1};break;case"SET-MOUSE-TIMEOUT-ID":i={...e,mouseTimeoutId:r.mouseTimeoutId};break;case"SET-LAST-TIME-MOUSE-MOVED":i={...e,lastTimeMouseMoved:r.lastTimeMouseMoved};break;default:throw Error("No reducer defined for type: "+a)}return ef.debug("reduced",a,"to new state",i,"payload",r),i},ew=(e,t,i,a,r,s,o,n,l)=>{let d=(0,ee.m8)(),E=(0,z.useRouter)(),[c,u]=(0,I.useState)(!0),T={type:e,listId:t,initialImageId:i,vanitySubType:r,vanityType:a,refTag:s,gqlClient:d,media:{},errors:{},loading:{},distance:0,showEditDrawer:!1,showReportDrawer:!1,showBottomSheet:!0,pagerVisibility:!0,mouseTimeoutId:0,lastTimeMouseMoved:new Date,enablePagers:!0,pageDirection:"init",adHandlers:o,isUserLoggedIn:n,adBannerCleared:!1,unseenInterstitialAvailable:!1,showInterstitial:!1,prevIsInterstitial:!1,nextIsInterstitial:!1,initiallyLoading:!1};l&&(T=eb(T,{type:"FETCH-IMAGES-DONE",payload:{direction:T.pageDirection,fetchResult:l,fetchPositions:l.images?.map(e=>e.position)}}));let g=Q()(eb,T),m=g[0],p=g[1],h={pageLeft:()=>p(eR.page("left")),pageRight:()=>p(eR.page("right")),showEdit:()=>p(eR.showEdit()),hideEdit:()=>p(eR.hideEdit()),showReport:()=>p(eR.showReport()),hideReport:()=>p(eR.hideReport()),showBottomSheet:()=>p(eR.showBottomSheet()),hideBottomSheet:()=>p(eR.hideBottomSheet()),gotoImageId:e=>p(eR.gotoImageId(e)),showPager:()=>p(eR.showPager()),hidePager:()=>p(eR.hidePager()),setMouseTimeoutId:e=>p(eR.setMouseTimeoutId(e)),setLastTimeMouseMoved:e=>p(eR.setLastTimeMouseMoved(e))},A=e=>{et.M6.isRightArrowKey(e)?h.pageRight():et.M6.isLeftArrowKey(e)&&h.pageLeft()};(0,I.useEffect)(()=>(window.addEventListener("keydown",A),()=>{window.removeEventListener("keydown",A)}),[]);let S=(0,I.useRef)(void 0),f=(0,I.useRef)(!1);return(0,I.useEffect)(()=>{let{url:e,path:t}=ep(m,ed((0,R.getIsBrowser)(),c)),i=m.position||0,a=m.media&&m.media[i],r=a?.node.id,s=S.current;if(s&&i!==s&&a&&e){if(S.current=m.position,!r)return;if(!f.current){f.current=!0;return}E.replace(e,t,{shallow:!0,imageId:r})}else 0>window.location.href.indexOf(r)&&e&&E.replace(e,t,{shallow:!0,imageId:r})},[m.position,m.media]),(0,I.useEffect)(()=>{p(eR.initialize(l)),u(!1)},[]),(0,I.useDebugValue)(m),{state:m,actions:h}},ey=(e,t,i,a,r)=>{let s=e,o="left"===a;if(void 0!==s&&!t[s]&&!i[s]){if(r.images.length){let e=o?r.images.length-1:0;s=r.images[e].position}else{let e=Object.keys(i).sort();e.length&&(o&&e.reverse(),s=e.reduce((e,t)=>{let i=e,a=Number(t);return void 0===i?i=a:o&&a<s&&i>s?i=a:a>s&&i<s&&(i=a),i},void 0))}}return s},eD=e=>{let{type:t,listId:i,imgId:s,vanityType:o,vanitySubType:l,refTag:d,adHandlers:E,initialQueryData:c,initialQueryError:u}=e,T=(0,C.n)(),g=(0,N.Z)(),{state:m,actions:p}=ew(t,i,s,o,l,d,E,T,c?eg(t,i,c):void 0),{showInterstitial:h,errors:S,position:P,loading:H,media:$,totalImages:x,initiallyLoading:B}=m,[G,W]=(0,I.useState)(0),V=(0,I.useRef)(null),Y=S[P],z=$[P]?.node,J=$[P-1]?.node,Q=$[P+1]?.node,ee=$[P]?.position,et=H[P]||B,ei=$[P]?.node.correctionLink?.url,ea=$[P]?.node.reportingLink?.url,er={countLabel:(0,O.N)(k.KL.countLabel,{position:ee,total:x}),previousImageLabel:(0,O.N)(k.KL.previousImageLabel),nextImageLabel:(0,O.N)(k.KL.nextImageLabel),closePromptLabel:(0,O.N)(k.KL.closePromptLabel)},es=(0,b.useSwipeable)({onSwipedLeft:e=>{X(-e.deltaX,e=>W(e),p.pageRight)},onSwipedRight:e=>{X(-e.deltaX,e=>W(e),p.pageLeft)},onSwiping:e=>{var t,i;t=-e.deltaX,i=e=>W(e),a?r=()=>{i(q(t))}:(i(q(t)),a=setTimeout(()=>{r&&r(),Z()},K))},onSwiped:()=>{var e;e=e=>W(e),Z(),setTimeout(()=>e(0),K)}});function eo(e){let t=document.getElementsByClassName(e);return!!(t.length>0&&t[0].matches(":hover"))}function en(){return!(0,R.getIsNode)()&&(0,f.getIsMdot)(window.location.hostname)}function el(){if(et||en())return;let e=eo(k.$C.PAGE_LEFT),t=eo(k.$C.PAGE_RIGHT);e||t||p.hidePager()}if((0,I.useEffect)(()=>{en()&&p.showPager()},[]),(0,I.useEffect)(()=>{p.setMouseTimeoutId(setTimeout(el,5e3))},[]),(0,I.useEffect)(()=>{h&&clearTimeout(m.mouseTimeoutId)},[h]),Y||u)return(0,n.jsx)(U.Bc,{});let ed={image:z||void 0,title:m.listTitle,description:z?.caption?.plainText||m.listTitle,openGraphData:{type:M.s.Website}};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(D.Se,{...ed}),(0,n.jsx)(_.Z,{}),(0,n.jsx)(b.PageContentContainer,{children:(0,n.jsx)(F,{state:m,imagePosition:ee})}),(0,n.jsxs)(U.zb,{"data-testid":k.$C.PARENT,className:k.$C.PARENT,children:[(0,n.jsx)(U.GX,{...es,onMouseMove:()=>{m.pagerVisibility||p.showPager(),+new Date().getTime()-m.lastTimeMouseMoved.getTime()>400&&(clearTimeout(m.mouseTimeoutId),p.setLastTimeMouseMoved(new Date),p.setMouseTimeoutId(setTimeout(el,2e3)))},"data-testid":k.$C.TOUCH_HANDLER,onClick:e=>{h?j(e,V.current,"ad-interstitial"):m.showBottomSheet?p.hideBottomSheet():p.showBottomSheet()},children:(0,n.jsx)(U.D5,{})}),m.enablePagers&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(U.f$,{isVisible:!et&&m.pagerVisibility,direction:"left",onSelect:p.pageLeft,className:k.$C.PAGE_LEFT,ariaLabel:er.previousImageLabel}),(0,n.jsx)(U.ed,{isVisible:!et&&m.pagerVisibility,direction:"right",onSelect:p.pageRight,className:k.$C.PAGE_RIGHT,ariaLabel:er.nextImageLabel})]}),et&&!h&&(0,n.jsx)(U.zL,{"data-testid":k.$C.LOADER,children:(0,n.jsx)(b.Loader,{})}),h&&(0,n.jsx)(U.C1,{offset:G,ref:V,isMdot:en(),children:(0,n.jsx)(v.ZP,{name:A.A.INTERSTITIAL})}),!m.showInterstitial&&!Y&&!u&&!et&&z&&(0,n.jsx)(y.Z,{image:z,"data-testid":k.$C.IMAGE,offset:G,prevImage:m.prevIsInterstitial?void 0:J,nextImage:m.nextIsInterstitial?void 0:Q},"image-"+z.id),!m.showInterstitial&&!Y&&!et&&z&&(0,n.jsx)(L.V,{className:k.$C.MEDIA_SHEET,imageData:z,content:{contextTitle:`${m.listTitle}`,contextCount:er.countLabel},editFlow:ei&&g?{desktopLink:ei,desktopOnOpen:()=>p.showEdit(),resolveMobileURL:e=>e.correctionLink.url}:void 0,reportFlow:ea&&g?{desktopLink:ea,desktopOnOpen:()=>p.showReport(),resolveMobileURL:e=>e.reportingLink.url}:void 0,listId:i,isClosed:!m.showBottomSheet,onCloseClicked:p.hideBottomSheet,onOpenClicked:p.showBottomSheet,refTagPrefix:`${k.Nw[m.type]}_mv`}),(0,n.jsx)(b.Drawer,{"data-testid":"mv-contribute-edit-drawer",className:k.$C.CONTRIBUTE_EDIT_DRAWER,isOpen:m.showEditDrawer,onCloseClicked:p.hideEdit,closePromptLabel:er.closePromptLabel,children:z&&(0,n.jsx)(w.o,{src:ei,onCloseMeCallback:p.hideEdit,className:k.$C.CONTRIBUTE_EDIT_IFRAME})}),(0,n.jsx)(b.Drawer,{className:k.$C.CONTRIBUTE_REPORT_DRAWER,isOpen:m.showReportDrawer,onCloseClicked:p.hideReport,children:z&&(0,n.jsx)(w.o,{src:ea,onCloseMeCallback:p.hideReport,className:k.$C.CONTRIBUTE_REPORT_IFRAME})})]})]})};var eM=i(42644),eL=i(42951),e_=i(14170),ev=!0,eO=e=>{let{type:t,id:i,vanityType:a,vanitySubType:r,refTag:s,validImageId:o,initialQueryData:E,initialQueryError:I}=e,g=(0,eM.D)();return g.clientSideUrl=(0,S.$l)(c()().publicRuntimeConfig.adsPublicSiteHost,(0,d.isDevNodeEnv)(),g.clientSideUrl),(0,n.jsx)(T.ZP,{children:(0,n.jsxs)(e_.Z,{hideNav:!0,hideFooter:!0,hideNavigationProgressBar:!0,baseColor:"baseAlt",orientContent:"full",cti:u.CTIS.GALLERIES_CTI,children:[(0,n.jsx)(eD,{type:t,listId:i,imgId:o,vanityType:a,vanitySubType:r,refTag:s,adHandlers:{updateBannerAd:async()=>{let e=JSON.parse(JSON.stringify(g));delete e.slotSizeMap[A.A.INTERSTITIAL],await h(e)},updateInterstitialAd:async()=>{if(g.isAbpEnabled)return;let e=JSON.parse(JSON.stringify(g));return delete e.slotSizeMap[A.A.MEDIAVIEWER_BANNER],h(e)}},initialQueryData:E,initialQueryError:I}),(0,eL.YN)(),(0,n.jsx)(l.CSAPageATFScript,{})]})})}}}]);