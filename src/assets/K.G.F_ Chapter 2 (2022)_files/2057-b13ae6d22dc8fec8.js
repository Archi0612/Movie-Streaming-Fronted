"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2057],{77594:function(e,t,i){i.d(t,{C:function(){return y},Z:function(){return T}});var a=i(52322),r=i(30382),n=i.n(r);i(2784);var o=i(79855),s=i(48574),l=i(66662),d=i(11836),c=i(19596),m=i(91842);let f=`
    position: absolute;
    left: 50%;
    user-select: none;
    max-height: 100%;
    max-width: 100%;

    /* hide left/right image affordance when not on a touch device */
    ${m.mediaQueries.devices.onCursorScreens} {
        &.peek { display: none; }
    }
`,u=`
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
`,g=`
    top: 40%;
    transform: translate(-50%, -40%);
`,p=`
    top: 20%;
    transform: translate(-50%, -20%);
`,h=c.default.img.withConfig({componentId:"sc-7c0a9e7c-0"})([""," ",""],f,g),b=c.default.img.withConfig({componentId:"sc-7c0a9e7c-1"})([""," ",""],f,p),x=c.default.div.withConfig({componentId:"sc-7c0a9e7c-2"})([""," ",""],u,g),I=c.default.div.withConfig({componentId:"sc-7c0a9e7c-3"})([""," ",""],u,p),w=n()`
    fragment MediaViewerImageMeta on Image {
        id
        url
        height
        width
        caption {
            plainText
        }
    }
`;function $(e,t){return e>t?{ImageElement:h,ContainerElement:x}:{ImageElement:b,ContainerElement:I}}let y=e=>{let{image:t,offset:i,prevImage:r,nextImage:n}=e,c=(0,o.Z)(),m=(0,s.wL)("MediaViewer_Image");if(!t||!t.url||!t.height||!t.width)return m.error("mediaviewer image missing required metadata",{id:t.id}),(0,a.jsx)(I,{className:"image-metadata-failure",children:(0,a.jsx)(d.F,{})});let f=$(t.height,t.width),u=f.ImageElement,g=f.ContainerElement,p=$(r?.height??0,r?.width??0),h=p.ImageElement,b=p.ContainerElement,x=$(n?.height??0,n?.width??0),w=x.ImageElement,y=x.ContainerElement,T=c.formatMessage({id:"mediaViewerImage_alt_missingCaption",defaultMessage:"Photo is missing caption."}),v=i||0;return(0,a.jsxs)(a.Fragment,{children:[r&&r.url&&(0,a.jsx)(b,{style:{maxHeight:`${r&&r.height||t.height}px`,maxWidth:`${r&&r.width||t.width}px`,left:`calc(-60% + ${v}px)`},children:(0,a.jsx)(h,{className:"peek",src:r.url,sizes:"100vw",srcSet:(0,l.gA)(r,!0),"data-image-id":`${r.id}-prev`,alt:r.caption?.plainText||T})}),(0,a.jsx)(g,{style:{maxHeight:`${t.height}px`,maxWidth:`${t.width}px`,left:`calc(50% + ${v}px)`},children:(0,a.jsx)(u,{src:t.url,sizes:"100vw",srcSet:(0,l.gA)(t,!0),"data-image-id":`${t.id}-curr`,alt:t.caption?.plainText||T})}),n&&n.url&&(0,a.jsx)(y,{style:{maxHeight:`${n&&n.height||t.height}px`,maxWidth:`${n&&n.width||t.width}px`,left:`calc(160% + ${v}px)`},children:(0,a.jsx)(w,{className:"peek",src:n.url,sizes:"100vw",srcSet:(0,l.gA)(n,!0),"data-image-id":`${n.id}-prev`,alt:n.caption?.plainText||T})})]})};y.fragments={image:w};var T=y},17138:function(e,t,i){i.d(t,{V:function(){return ea}});var a=i(52322),r=i(72779),n=i.n(r);i(2784);var o=i(45103),s=i(51218),l=i(28827),d=i(11817);function c(e){let{attributionUrl:t,text:i}=e,a=i||t;return t&&a?`<a href="${t}" target="_blank" rel="noopener nofollow">${a}</a>`:a?`${a}`:void 0}var m=i(30382),f=i.n(m),u=i(80218);let g={PARENT:"media-sheet",ATTR_BANNER:"media-sheet__attr-banner",COUNT_DISPLAY:"media-sheet__count-display"},p=f()`
    fragment MediaSheetImageMeta on Image {
        copyright
        createdBy
        caption {
            plaidHtml(queryParams: $queryParams)
        }
        titles {
            id
            titleText {
                text
            }
        }
        source {
            attributionUrl
            text
            banner {
                url
                attributionUrl
            }
        }
        names {
            id
            nameText {
                text
            }
        }
        countries {
            text
        }
        languages {
            text
        }
        # On mobile, we need to refetch correctionLink and reportingLink
        # data with isInIframe: false.
        #
        # This refetching is handled by the ContributeActionButton component.
        correctionLink(
            relatedId: $id
            contributionContext: {
                isInIframe: true
                returnUrl: "${(0,u.Pj)()}"
                business: "consumer"
            }
        ) {
            url
        }
        reportingLink(
            relatedId: $id
            contributionContext: {
                isInIframe: true
                returnUrl: "${(0,u.Pj)()}"
                business: "consumer"
            }
        ) {
            url
        }
    }
`,h=f()`
    fragment MediaSheetListItemMeta on ListItemNode {
        description {
            originalText {
                plaidHtml(queryParams: $queryParams)
            }
        }
    }
`,b={id:"common_buttons_close",defaultMessage:"Close"},x={id:"common_buttons_open",defaultMessage:"Open"},I={id:"mediaSheet_ariaLabel_edit",defaultMessage:"Edit tags"},w={id:"mediaSheet_ariaLabel_report",defaultMessage:"Report image"},$={id:"mediaSheet_label_name",defaultMessage:"People"},y={id:"mediaSheet_label_title",defaultMessage:"Titles"},T={id:"mediaSheet_label_country",defaultMessage:"Countries"},v={id:"mediaSheet_label_language",defaultMessage:"Languages"},_={id:"mediaSheet_attribution_photoBy",defaultMessage:"Photo by"},C={id:"mediaSheet_attribution_courtesy",defaultMessage:"Image courtesy"};var M=i(26806),P=i(96446),L=i(69635),j=i(19596),A=i(91842);let E=(0,j.default)(o.IconButton).withConfig({componentId:"sc-860b674-0"})(["","{margin-right:calc(var(--ipt-pageMargin) - 0.75rem);}"],A.mediaQueries.breakpoints.above.l);var k=e=>{let{name:t,label:i,className:r,isButton:n,onSelect:o,href:s}=e,l={name:t,label:i,className:r,onSelect:o,"data-testid":`mv-contrib-${t}`};return(0,a.jsx)(E,{...l,href:n?void 0:s})},S=e=>{let t=(0,M.m8)(),i=(0,P.nu)(),r=(0,o.useBreakpointsAsConfig)();if(!e.flow)return null;let s=`${e.flow.desktopLink}&ref_=${e.refTagPrefix}_edt`,l=r.l||r.xl;return(0,a.jsx)(k,{name:e.actionName,label:e.label,className:n()(e.className),onSelect:a=>{l?i?e.flow.desktopOnOpen():(0,L.r)("mv_signin"):(a.preventDefault(),t.query(f()`
                        query ContributeActionButton(
                            $imageId: ID!
                            $relatedId: ID!
                            $returnUrl: URL!
                        ) {
                            image(id: $imageId) {
                                correctionLink(
                                    relatedId: $relatedId
                                    contributionContext: {
                                        isInIframe: false
                                        returnUrl: $returnUrl
                                        business: "consumer"
                                    }
                                ) {
                                    url
                                }
                                reportingLink(
                                    relatedId: $relatedId
                                    contributionContext: {
                                        isInIframe: false
                                        returnUrl: $returnUrl
                                        business: "consumer"
                                    }
                                ) {
                                    url
                                }
                            }
                        }
                    `,{...e.query,returnUrl:window.location.href}).toPromise().then(t=>{let i=e.flow.resolveMobileURL(t.data.image);window.open(i,"_self")}).catch(e=>{throw e}))},href:s,isButton:l})};let N=j.default.div.withConfig({componentId:"sc-9422afe0-0"})(["position:absolute;bottom:0;width:100%;max-height:calc(53% - 1.5rem);display:flex;z-index:2;","{max-height:calc(50%);}"],A.mediaQueries.devices.onTouchScreens),R=(0,j.default)(o.PageContentContainer).withConfig({componentId:"sc-9422afe0-1"})(["position:relative;display:flex;width:100%;"]),V=j.default.div.withConfig({componentId:"sc-9422afe0-2"})([""," "," background:rgba(",",0.85);background:rgba(",",0.85);border-top:1px solid ",";border-top:1px solid ",";width:100%;display:flex;flex-direction:column;overflow:auto;transition:all 0.5s ease-out ","{height:100%;overflow:hidden;}"],(0,A.setTypographyType)("body"),(0,A.setPropertyToColorVar)("color","ipt-on-baseAlt-color"),(0,A.getColorVarValue)("ipt-baseAlt-shade3-rgb"),(0,A.getColorVar)("ipt-baseAlt-shade3-rgb"),(0,A.getColorVarValue)("ipt-baseAlt-border-color"),(0,A.getColorVar)("ipt-baseAlt-border-color"),A.mediaQueries.breakpoints.above.l),B=j.default.div.withConfig({componentId:"sc-9422afe0-3"})([""," "," display:flex;justify-content:space-between;padding:0.5rem 1rem;padding:0.5rem ",";flex-shrink:0;"],(0,A.setTypographyType)("bodySmall"),(0,A.setPropertyToColorVar)("color","ipt-on-baseAlt-accent1-color"),(0,A.getSpacingVar)("ipt-pageMargin")),D=j.default.span.withConfig({componentId:"sc-9422afe0-4"})(["display:none;","{display:flex;}"],A.mediaQueries.breakpoints.only.m),Y=`
    position: relative;
    &::after {
        content: '';
        background: linear-gradient(
            to top,
            ${(0,A.getColorVarValue)("ipt-baseAlt-shade3-color")},
            transparent
        );
        background: linear-gradient(
            to top,
            ${(0,A.getColorVar)("ipt-baseAlt-shade3-color")},
            transparent
        );
        height: 1rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
    }
`,U=j.default.div.withConfig({componentId:"sc-9422afe0-5"})(["display:flex;flex-direction:column;","{height:100%;}"],A.mediaQueries.breakpoints.above.l),O=j.default.div.withConfig({componentId:"sc-9422afe0-6"})(["display:flex;flex-direction:column;overflow:auto;flex-grow:2;","{flex-direction:row;overflow:hidden;","}"],A.mediaQueries.breakpoints.above.l,Y),Q=j.default.div.withConfig({componentId:"sc-9422afe0-7"})(["width:100%;text-align:center;padding:0 1rem 0.5rem 1rem;padding:0 "," 0.5rem ",";","{","}"],(0,A.getSpacingVar)("ipt-pageMargin"),(0,A.getSpacingVar)("ipt-pageMargin"),A.mediaQueries.breakpoints.above.l,(0,A.setPropertyToColorVar)("background","ipt-baseAlt-shade3-bg")),q=(0,j.default)(o.HTMLContent).withConfig({componentId:"sc-9422afe0-8"})(["padding:0 1rem 1rem;padding:0 "," 1rem;","{overflow:auto;flex-grow:1;width:60%;padding-right:1rem;height:100%;}"],(0,A.getSpacingVar)("ipt-pageMargin"),A.mediaQueries.breakpoints.above.l),H=j.default.div.withConfig({componentId:"sc-9422afe0-9"})([""," margin:0 1rem;margin:0 ",";min-height:1px;min-width:1px;","{margin:0 0 1rem 0;}"],(0,A.setPropertyToColorVar)("background","ipt-baseAlt-border-color"),(0,A.getSpacingVar)("ipt-pageMargin"),A.mediaQueries.breakpoints.above.l),G=j.default.div.withConfig({componentId:"sc-9422afe0-10"})(["margin:0 1rem;margin:0 ",";padding-top:1rem;","{margin:0;padding:0 0.25rem 1rem 1rem;width:35%;overflow:auto;height:100%;}"],(0,A.getSpacingVar)("ipt-pageMargin"),A.mediaQueries.breakpoints.above.l),F=j.default.div.withConfig({componentId:"sc-9422afe0-11"})(["display:flex;justify-content:center;padding:0.5rem 0;","{margin-top:-0.5rem;justify-content:flex-start;flex-shrink:1;flex-direction:column;padding-top:0;}"],A.mediaQueries.breakpoints.above.l),z=`
    display: none;
    position: absolute;
    right: 4.5rem;
    ${A.mediaQueries.breakpoints.above.l} {
        display: block;
    }
`,W=(0,j.default)(o.IconBorderButton).withConfig({componentId:"sc-9422afe0-12"})([""," top:-1.125rem;z-index:1;transition:opacity 0.5s ease-in;opacity:",";visibility:",";"],z,e=>e.opacity,e=>e.visibility),K=(0,j.default)(o.IconBorderButton).withConfig({componentId:"sc-9422afe0-13"})([""," bottom:4rem;transition:opacity 0.5s ease-in;opacity:",";visibility:",";"],z,e=>e.opacity,e=>e.visibility),X=j.default.div.withConfig({componentId:"sc-9422afe0-14"})(["margin-bottom:0.25rem;",""],(0,A.setTypographyType)("bodySmall")),Z=j.default.span.withConfig({componentId:"sc-9422afe0-15"})(["margin-right:0.5rem;font-weight:500;"]),J=(0,j.default)(o.HTMLContent).withConfig({componentId:"sc-9422afe0-16"})([""," ",""],(0,A.setPropertyToColorVar)("color","ipt-on-baseAlt-textSecondary-color"),(0,A.setTypographyType)("copyright")),ee=j.default.img.withConfig({componentId:"sc-9422afe0-17"})(["max-width:100%;"]),et=e=>{let t=[],i=e.refTagPrefix?`?ref_=${e.refTagPrefix}`:"";for(let r=0;r<e.array.length;r++){let n=e.array[r];n.nameText?.text&&n.id?t.push((0,a.jsx)(o.TextLink,{href:`/name/${n.id}/${i}`,text:n.nameText.text},`image-name-link-${n.id}`)):n.titleText?.text&&n.id?t.push((0,a.jsx)(o.TextLink,{href:`/title/${n.id}/${i}`,text:n.titleText.text},`image-title-link-${n.id}`)):n.text&&t.push((0,a.jsx)("span",{children:n.text},`item-meta-${n.text}`)),r<e.array.length-1&&t.push(", ")}return(0,a.jsx)(a.Fragment,{children:t.length>0&&(0,a.jsxs)(X,{children:[(0,a.jsx)(Z,{children:e.title}),(0,a.jsx)("span",{children:t})]})})},ei=(e,t)=>{(0,s.isEnterOrSpaceKey)(e)&&t()},ea=e=>{let t={closeSheetAriaLabel:(0,l.N)(b),openSheetAriaLabel:(0,l.N)(x),editAriaLabel:(0,l.N)(I),reportAriaLabel:(0,l.N)(w),nameLabel:(0,l.N)($),titleLabel:(0,l.N)(y),countryLabel:(0,l.N)(T),languageLabel:(0,l.N)(v),photoByAttributionPrefix:(0,l.N)(_),courtesyAttributionPrefix:(0,l.N)(C)},{content:i,imageData:r,editFlow:s,reportFlow:m,isClosed:f,onCloseClicked:u,onOpenClicked:p}=e,h=f?0:1,M=f?"hidden":"visible",P=function(e,t){let{copyright:i,createdBy:a,source:r}=e;if(!i&&!a&&!r)return;let n=r&&c(r)?`${t.courtesyText} ${c(r)}`:void 0,o=[a?`${t.photoByText} ${a}`:void 0,i?`&copy;&nbsp;${i}`:void 0,n].filter(e=>!!e);return o.length?o.join(" - "):void 0}(r,{photoByText:t.photoByAttributionPrefix,courtesyText:t.courtesyAttributionPrefix}),L=()=>{r?.source?.text==="gettyimages.com"?(0,d.P)("offsite-gettyimages"):r?.source?.text==="mptvimages.com"&&(0,d.P)("offsite-mptvimages")};return(0,a.jsx)(N,{className:n()(e.className),children:(0,a.jsx)(o.SetPalette,{palette:"dark",children:(0,a.jsxs)(R,{children:[(0,a.jsx)(K,{name:"info",className:"media-sheet__open",label:t.openSheetAriaLabel,onSelect:p,opacity:f?1:0,visibility:f?"visible":"hidden"}),(0,a.jsx)(W,{label:t.closeSheetAriaLabel,className:"media-sheet__close",name:"clear",onSelect:u,opacity:h,visibility:M}),(0,a.jsx)(V,{"aria-hidden":f,style:{opacity:h,visibility:M},"data-testid":g.PARENT,children:(0,a.jsxs)(U,{children:[(0,a.jsxs)(B,{role:"presentation",children:[(0,a.jsx)("span",{children:i.contextTitle}),(0,a.jsx)(D,{"data-testid":g.COUNT_DISPLAY,children:i.contextCount})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(q,{html:r.caption?.plaidHtml||""}),(0,a.jsx)(H,{}),(0,a.jsxs)(G,{children:[r.names&&(0,a.jsx)(et,{array:r.names,title:t.nameLabel,refTagPrefix:e.refTagPrefix}),r.titles&&(0,a.jsx)(et,{array:r.titles,title:t.titleLabel,refTagPrefix:e.refTagPrefix}),r.countries&&(0,a.jsx)(et,{array:r.countries,title:t.countryLabel,refTagPrefix:e.refTagPrefix}),r.languages&&(0,a.jsx)(et,{array:r.languages,title:t.languageLabel,refTagPrefix:e.refTagPrefix}),P&&(0,a.jsx)("div",{onClick:L,onKeyDown:e=>{ei(e,L)},"data-testid":"copyright",children:(0,a.jsx)(J,{html:P})})]}),(0,a.jsxs)(F,{children:[(0,a.jsx)(S,{flow:s,actionName:"edit",label:t.editAriaLabel,className:"media-sheet__edit",refTagPrefix:e.refTagPrefix,query:{imageId:e.imageData.id,relatedId:e.listId}}),(0,a.jsx)(S,{flow:m,label:t.reportAriaLabel,className:"media-sheet__report",actionName:"flag",refTagPrefix:e.refTagPrefix,query:{imageId:e.imageData.id,relatedId:e.listId}})]})]}),r.source?.banner&&(0,a.jsx)(Q,{"data-testid":g.ATTR_BANNER,children:(0,a.jsx)("a",{href:r.source.banner.attributionUrl,rel:"nofollow noopener noreferrer",target:"_blank",children:(0,a.jsx)(ee,{src:r.source.banner.url,height:r.source.banner.height,width:r.source.banner.width})})})]})})]})})})};ea.fragments={image:p,listItem:h}},88173:function(e,t,i){i.d(t,{$C:function(){return v},Ek:function(){return I},HP:function(){return b},KL:function(){return T},Nw:function(){return $},Qn:function(){return w},gG:function(){return h},k6:function(){return y},kH:function(){return x},s:function(){return g},ve:function(){return p}});var a=i(30382),r=i.n(a),n=i(77594),o=i(17138),s=i(87712);let l=r()`
    fragment MediaViewerMeta on ImageConnection {
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
        edges {
            position
            cursor
            node {
                ...MediaViewerImageMeta
                ...MediaSheetImageMeta
            }
        }
    }

    ${n.C.fragments.image}
    ${o.V.fragments.image}
`,d=r()`
    fragment MediaViewerListMeta on ListConnection {
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
        edges {
            position
            cursor
            node {
                item {
                    ...MediaViewerImageMeta
                    ...MediaSheetImageMeta
                }
                ...MediaSheetListItemMeta
            }
        }
    }
    ${n.C.fragments.image}
    ${o.V.fragments.image}
    ${o.V.fragments.listItem}
`,c=r()`
    query NameImages(
        $id: ID!
        $before: ID
        $after: ID
        $jumpTo: ID
        $first: Int
        $last: Int
        $lastYes: Boolean!
        $firstYes: Boolean!
        $queryParams: String
    ) {
        name(id: $id) {
            nameText {
                text
            }
            meta {
                publicationStatus
            }
            images(first: $first, after: $after, jumpTo: $jumpTo)
                @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
            wrapFront: images(last: $last, before: $before)
                @include(if: $lastYes) {
                total
                ...MediaViewerMeta
            }
            wrapBack: images(first: $first) @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
        }
    }
    ${l}
`,m=r()`
    query TitleImages(
        $id: ID!
        $before: ID
        $after: ID
        $jumpTo: ID
        $first: Int
        $last: Int
        $lastYes: Boolean!
        $firstYes: Boolean!
        $queryParams: String
    ) {
        title(id: $id) {
            titleText {
                text
            }
            meta {
                publicationStatus
            }
            releaseYear {
                year
            }
            images(first: $first, after: $after, jumpTo: $jumpTo)
                @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
            wrapFront: images(last: $last, before: $before)
                @include(if: $lastYes) {
                total
                ...MediaViewerMeta
            }
            wrapBack: images(first: $first) @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
        }
    }
    ${l}
`,f=r()`
    query GalleryImages(
        $id: ID!
        $before: ID
        $after: ID
        $jumpTo: ID
        $first: Int
        $last: Int
        $lastYes: Boolean!
        $firstYes: Boolean!
        $queryParams: String
    ) {
        imageGallery(id: $id) {
            galleryText
            images(first: $first, after: $after, jumpTo: $jumpTo)
                @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
            wrapFront: images(last: $last, before: $before)
                @include(if: $lastYes) {
                total
                ...MediaViewerMeta
            }
            wrapBack: images(first: $first) @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
        }
    }
    ${l}
`,u=r()`
    query ListImages(
        $id: ID!
        $before: ID
        $after: ID
        $jumpTo: ID
        $first: Int
        $last: Int
        $lastYes: Boolean!
        $firstYes: Boolean!
        $queryParams: String
    ) {
        list(id: $id) {
            name {
                originalText
            }
            items(first: $first, after: $after, jumpTo: $jumpTo)
                @include(if: $firstYes) {
                total
                ...MediaViewerListMeta
            }
            wrapFront: items(last: $last, before: $before)
                @include(if: $lastYes) {
                total
                ...MediaViewerListMeta
            }
            wrapBack: items(first: $first) @include(if: $firstYes) {
                total
                ...MediaViewerListMeta
            }
        }
    }
    ${d}
`,g=e=>{switch(e){case s.b.GALLERY:return f;case s.b.LIST:return u;case s.b.NAME:return c;case s.b.TITLE:return m;default:throw Error("Unknown MediaViewerType: "+e)}},p=3,h=6,b=3,x=20,I="vanity",w={title:"title",name:"name",gallery:"imageGallery",list:"list"},$={title:"tt",name:"nm",gallery:"rg",list:"ls"},y={right:"nxt",left:"prev"},T={countLabel:{id:"mediaViewer_galleryCount_label",defaultMessage:"{position} of {total}"},previousImageLabel:{id:"mediaSheet_ariaLabel_previousImage",defaultMessage:"Previous"},nextImageLabel:{id:"mediaSheet_ariaLabel_nextImage",defaultMessage:"Next"},closePromptLabel:{id:"common_ariaLabel_closePrompt",defaultMessage:"Close Prompt"}},v={PARENT:"media-viewer",ACTION_BAR:"media-viewer__action-bar",ACTION_BAR_GALLERY_COUNT:"action-bar__gallery-count",MEDIA_SHEET:"media-viewer__media-sheet",PAGE_RIGHT:"media-viewer__page-right",PAGE_LEFT:"media-viewer__page-left",LOADER:"media-viewer__loader",IMAGE:"media-viewer__image",TOUCH_HANDLER:"media-viewer__touch-handler",CONTRIBUTE_EDIT_DRAWER:"contribute-edit-drawer",CONTRIBUTE_EDIT_IFRAME:"contribute-edit-iframe",CONTRIBUTE_REPORT_DRAWER:"contribute-report-drawer",CONTRIBUTE_REPORT_IFRAME:"contribute-report-iframe",PAGER_VISIBLE:"ipc-pager--visible"}},42057:function(e,t,i){i.d(t,{Bc:function(){return x},C1:function(){return I},D5:function(){return h},GX:function(){return p},Ov:function(){return g},ed:function(){return f},f$:function(){return m},vI:function(){return w},zL:function(){return b},zb:function(){return c}});var a=i(19596),r=i(45103),n=i(91842),o=i(11836),s=i(88173);let l=()=>`
    top: calc(47% - 4vh);
    transform: translateY(-47%);
`,d=`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
`,c=a.default.div.withConfig({componentId:"sc-c7067688-0"})(["overflow:hidden;position:relative;:focus{outline:0;}.",",.","{display:none;}","{height:calc(100vh - 5rem);.",",.","{display:block;}}height:calc(100vh - 7rem);"],s.$C.CONTRIBUTE_EDIT_DRAWER,s.$C.CONTRIBUTE_REPORT_DRAWER,n.mediaQueries.breakpoints.above.m,s.$C.CONTRIBUTE_EDIT_DRAWER,s.$C.CONTRIBUTE_REPORT_DRAWER),m=(0,a.default)(r.Pager).withConfig({componentId:"sc-c7067688-1"})(["","{left:0.25rem;}","{","}",""],n.mediaQueries.breakpoints.below.xs,n.mediaQueries.breakpoints.above.xs,(0,n.setPropertyToSpacingVar)("left","ipt-pageMargin"),l),f=(0,a.default)(r.Pager).withConfig({componentId:"sc-c7067688-2"})(["","{right:0.25rem;}","{","}",""],n.mediaQueries.breakpoints.below.xs,n.mediaQueries.breakpoints.above.xs,(0,n.setPropertyToSpacingVar)("right","ipt-pageMargin"),l),u=`
    position: absolute;
    top: 0;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
`,g=a.default.div.withConfig({componentId:"sc-c7067688-3"})([""," height:'50px';width:'365px';"],u),p=a.default.div.withConfig({componentId:"sc-c7067688-4"})([""," height:100%;width:100%;","{overflow-x:auto;}"],u,n.mediaQueries.devices.onTouchScreens),h=a.default.div.withConfig({componentId:"sc-c7067688-5"})(["","{position:absolute;height:100%;width:120%;}","{display:none;}"],n.mediaQueries.devices.onTouchScreens,n.mediaQueries.devices.onCursorScreens),b=a.default.div.withConfig({componentId:"sc-c7067688-6"})(["",""],d),x=(0,a.default)(o.F).withConfig({componentId:"sc-c7067688-7"})(["&&{","}"],d),I=a.default.div.withConfig({componentId:"sc-c7067688-8"})(["@keyframes slide-in{0%{left:50%;}100%{left:50%;}}"," height:100%;width:100%;animation:slide-in 1s;left:",";display:flex;align-items:center;justify-content:center;z-index:1;","{z-index:0;}> div{width:100%;height:100%;}#interstitial_responsive_wrapper,#interstitial_wrapper{display:flex;width:100%;height:100%;flex-direction:column;justify-content:center;align-items:center;}#interstitialplaceholderPattern{display:none;}"],d,e=>`calc(50% + ${e.offset}px)`,n.mediaQueries.devices.onTouchScreens),w=a.default.span.withConfig({componentId:"sc-c7067688-9"})([""," vertical-align:middle;","{display:none;}","{margin-right:0.325rem;text-align:right;}"],(0,n.setPropertyToColorVar)("color","ipt-on-baseAlt-accent1-color"),n.mediaQueries.breakpoints.only.m,n.mediaQueries.breakpoints.above.m)},87712:function(e,t,i){var a,r;i.d(t,{b:function(){return a}}),(r=a||(a={})).TITLE="title",r.NAME="name",r.GALLERY="gallery",r.LIST="list"}}]);