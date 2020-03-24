(function framework7ComponentLoader(t,e){void 0===e&&(e=!0);var a=document,i=window,n=t.$,r=(t.Template7,t.utils),s=t.device,l=(t.support,t.Class,t.Modal,t.ConstructorMethods,t.ModalMethods,{ignoreTypes:["checkbox","button","submit","range","radio","image"],createTextareaResizableShadow:function(){var t=n(a.createElement("textarea"));t.addClass("textarea-resizable-shadow"),t.prop({disabled:!0,readonly:!0}),l.textareaResizableShadow=t},textareaResizableShadow:void 0,resizeTextarea:function(t){var e=n(t);l.textareaResizableShadow||l.createTextareaResizableShadow();var a=l.textareaResizableShadow;if(e.length&&e.hasClass("resizable")){0===l.textareaResizableShadow.parents().length&&this.root.append(a);var r=i.getComputedStyle(e[0]);"padding-top padding-bottom padding-left padding-right margin-left margin-right margin-top margin-bottom width font-size font-family font-style font-weight line-height font-variant text-transform letter-spacing border box-sizing display".split(" ").forEach(function(t){var e=r[t];"font-size line-height letter-spacing width".split(" ").indexOf(t)>=0&&(e=e.replace(",",".")),a.css(t,e)});var s=e[0].clientHeight;a.val("");var o=a[0].scrollHeight;a.val(e.val()),a.css("height",0);var u=a[0].scrollHeight;s!==u&&(u>o?(e.css("height",u+"px"),e.trigger("textarea:resize",{initialHeight:o,currentHeight:s,scrollHeight:u})):u<s&&(e.css("height",""),e.trigger("textarea:resize",{initialHeight:o,currentHeight:s,scrollHeight:u})))}},validate:function(t){var e=n(t);if(e.length){var a=e.parents(".item-input"),i=e.parents(".input"),r=e[0].validity,s=e.dataset().errorMessage||e[0].validationMessage||"";if(r)if(r.valid)a.removeClass("item-input-invalid item-input-with-error-message"),i.removeClass("input-invalid input-with-error-message"),e.removeClass("input-invalid");else{var l=e.nextAll(".item-input-error-message, .input-error-message");s&&(0===l.length&&(l=n('<div class="'+(i.length?"input-error-message":"item-input-error-message")+'"></div>')).insertAfter(e),l.text(s)),l.length>0&&(a.addClass("item-input-with-error-message"),i.addClass("input-with-eror-message")),a.addClass("item-input-invalid"),i.addClass("input-invalid"),e.addClass("input-invalid")}}},validateInputs:function(t){var e=this;n(t).find("input, textarea, select").each(function(t,a){e.input.validate(a)})},focus:function(t){var e=n(t),a=e.attr("type");l.ignoreTypes.indexOf(a)>=0||(e.parents(".item-input").addClass("item-input-focused"),e.parents(".input").addClass("input-focused"),e.addClass("input-focused"))},blur:function(t){var e=n(t);e.parents(".item-input").removeClass("item-input-focused"),e.parents(".input").removeClass("input-focused"),e.removeClass("input-focused")},checkEmptyState:function(t){var e=n(t);if(e.is("input, select, textarea")||(e=e.find("input, select, textarea").eq(0)),e.length){var a=e.val(),i=e.parents(".item-input"),r=e.parents(".input");a&&"string"==typeof a&&""!==a.trim()||Array.isArray(a)&&a.length>0?(i.addClass("item-input-with-value"),r.addClass("input-with-value"),e.addClass("input-with-value"),e.trigger("input:notempty")):(i.removeClass("item-input-with-value"),r.removeClass("input-with-value"),e.removeClass("input-with-value"),e.trigger("input:empty"))}},scrollIntoView:function(t,e,a,i){void 0===e&&(e=0);var r=n(t),s=r.parents(".page-content, .panel").eq(0);if(!s.length)return!1;var l=s[0].offsetHeight,o=s[0].scrollTop,u=parseInt(s.css("padding-top"),10),p=parseInt(s.css("padding-bottom"),10),d=s.offset().top-o,c=r.offset().top-d,h=c+o-u,v=c+o-l+p+r[0].offsetHeight,f=h+(v-h)/2;return o>h?(s.scrollTop(a?f:h,e),!0):o<v?(s.scrollTop(a?f:v,e),!0):(i&&s.scrollTop(a?f:v,e),!1)},init:function(){var t=this;l.createTextareaResizableShadow(),n(a).on("click",".input-clear-button",function(){var t=n(this).siblings("input, textarea").eq(0),e=t.val();t.val("").trigger("input change").focus().trigger("input:clear",e)}),n(a).on("change input","input, textarea, select",function(){var e=n(this),a=e.attr("type"),i=e[0].nodeName.toLowerCase();l.ignoreTypes.indexOf(a)>=0||(t.input.checkEmptyState(e),null!==e.attr("data-validate-on-blur")||!e.dataset().validate&&null===e.attr("validate")||t.input.validate(e),"textarea"===i&&e.hasClass("resizable")&&t.input.resizeTextarea(e))},!0),n(a).on("focus","input, textarea, select",function(){var e=this;t.params.input.scrollIntoViewOnFocus&&(s.android?n(i).once("resize",function(){a&&a.activeElement===e&&t.input.scrollIntoView(e,t.params.input.scrollIntoViewDuration,t.params.input.scrollIntoViewCentered,t.params.input.scrollIntoViewAlways)}):t.input.scrollIntoView(e,t.params.input.scrollIntoViewDuration,t.params.input.scrollIntoViewCentered,t.params.input.scrollIntoViewAlways)),t.input.focus(e)},!0),n(a).on("blur","input, textarea, select",function(){var e=n(this),a=e[0].nodeName.toLowerCase();t.input.blur(e),(e.dataset().validate||null!==e.attr("validate"))&&t.input.validate(e),"textarea"===a&&e.hasClass("resizable")&&l.textareaResizableShadow&&l.textareaResizableShadow.remove()},!0),n(a).on("invalid","input, textarea, select",function(e){var a=n(this);null!==a.attr("data-validate-on-blur")||!a.dataset().validate&&null===a.attr("validate")||(e.preventDefault(),t.input.validate(a))},!0)}}),o={name:"input",params:{input:{scrollIntoViewOnFocus:s.android,scrollIntoViewCentered:!1,scrollIntoViewDuration:0,scrollIntoViewAlways:!1}},create:function(){r.extend(this,{input:{scrollIntoView:l.scrollIntoView.bind(this),focus:l.focus.bind(this),blur:l.blur.bind(this),validate:l.validate.bind(this),validateInputs:l.validateInputs.bind(this),checkEmptyState:l.checkEmptyState.bind(this),resizeTextarea:l.resizeTextarea.bind(this),init:l.init.bind(this)}})},on:{init:function(){this.input.init()},tabMounted:function(t){var e=this,a=n(t);a.find(".item-input, .input").each(function(t,a){n(a).find("input, select, textarea").each(function(t,a){var i=n(a);l.ignoreTypes.indexOf(i.attr("type"))>=0||e.input.checkEmptyState(i)})}),a.find("textarea.resizable").each(function(t,a){e.input.resizeTextarea(a)})},pageInit:function(t){var e=this,a=t.$el;a.find(".item-input, .input").each(function(t,a){n(a).find("input, select, textarea").each(function(t,a){var i=n(a);l.ignoreTypes.indexOf(i.attr("type"))>=0||e.input.checkEmptyState(i)})}),a.find("textarea.resizable").each(function(t,a){e.input.resizeTextarea(a)})}}};if(e){if(t.prototype.modules&&t.prototype.modules[o.name])return;t.use(o),t.instance&&(t.instance.useModuleParams(o,t.instance.params),t.instance.useModule(o))}return o}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
