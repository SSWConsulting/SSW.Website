import Script from "next/script";
import React, { PropsWithChildren, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Template, TinaField } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { UtilityButton } from "../button/utilityButton";

export type formType = "0" | "1" | "2";

export interface JotFormEmbedProps extends PropsWithChildren {
  data: {
    jotForm: {
      id: string;
      formTitle: string;
      backgroundColor: string;
      fontColor: string;
      formType: formType;
      height: number;
      width: number;
    };
    containerClass: string;
    buttonClass?: string;
    buttonText: string;
    animated?: boolean;
  };
}

export const JotFormEmbed: React.FC<JotFormEmbedProps> = ({
  data,
  children,
}) => {
  const { jotForm, containerClass, buttonClass, buttonText, animated } = data;
  const [jotFormScriptLoad, setJotFormScriptLoad] = useState(false);

  const JotFormIframe = `
  // https://form.jotform.com/ {{ defaultSetting.jotForm.id }}
  var existingURL = window.location.href;
  if(!window.scriptExecuted || window.href != existingURL){ // This prevent from loading multiple JotForm's IFrames
    window.scriptExecuted = true;
    window.href = window.location.href;
    var iFrame = new JotformFeedback({
      formId: ${jotForm?.id},
      base: 'https://form.jotform.com/',
      windowTitle: '${jotForm?.formTitle}',
      backgroundColor: '${jotForm?.backgroundColor}',
      fontColor: '${jotForm?.fontColor}',
      type: '${jotForm?.formType}',
      height: ${jotForm?.height},
      width: ${jotForm?.width},
      openOnLoad: false
    });

    var ifr = document.getElementById("lightbox-${jotForm?.id}");
    if (ifr) {
      var src = ifr.src;
      var iframeParams = [];
      if (window.location.href && window.location.href.indexOf("?") > -1) {
        iframeParams = iframeParams.concat(window.location.href.substr(window.location.href.indexOf("?") + 1).split('&'));
      }
      if (src && src.indexOf("?") > -1) {
        iframeParams = iframeParams.concat(src.substr(src.indexOf("?") + 1).split("&"));
        src = src.substr(0, src.indexOf("?"))
      }
      iframeParams.push("isIframeEmbed=1");
      ifr.src = src + "?" + iframeParams.join('&');
    }
    window.handleIFrameMessage = function(e) {
      if (typeof e.data === 'object') { return; }
      var args = e.data.split(":");
      if (args.length > 2) { iframe = document.getElementById("lightbox-" + args[(args.length - 1)]); } else { iframe = document.getElementById("lightbox"); }
      if (!iframe) { return; }
      switch (args[0]) {
        case "scrollIntoView":
          iframe.scrollIntoView();
          break;
        case "setHeight":
          iframe.style.height = args[1] + "px";
          if (!isNaN(args[1]) && parseInt(iframe.style.minHeight) > parseInt(args[1])) {
            iframe.style.minHeight = args[1] + "px";
          }
          break;
        case "collapseErrorPage":
          if (iframe.clientHeight > window.innerHeight) {
            iframe.style.height = window.innerHeight + "px";
          }
          break;
        case "reloadPage":
          window.location.reload();
          break;
        case "loadScript":
          if( !window.isPermitted(e.origin, ['jotform.com', 'jotform.pro']) ) { break; }
          var src = args[1];
          if (args.length > 3) {
              src = args[1] + ':' + args[2];
          }
          var script = document.createElement('script');
          script.src = src;
          script.type = 'text/javascript';
          document.body.appendChild(script);
          break;
        case "exitFullscreen":
          if      (window.document.exitFullscreen)        window.document.exitFullscreen();
          else if (window.document.mozCancelFullScreen)   window.document.mozCancelFullScreen();
          else if (window.document.mozCancelFullscreen)   window.document.mozCancelFullScreen();
          else if (window.document.webkitExitFullscreen)  window.document.webkitExitFullscreen();
          else if (window.document.msExitFullscreen)      window.document.msExitFullscreen();
          break;
      }
      var isJotForm = (e.origin.indexOf("jotform") > -1) ? true : false;
      if(isJotForm && "contentWindow" in iframe && "postMessage" in iframe.contentWindow) {
        var urls = {"docurl":encodeURIComponent(document.URL),"referrer":encodeURIComponent(document.referrer)};
        iframe.contentWindow.postMessage(JSON.stringify({"type":"urls","value":urls}), "*");
      }
    };
    window.isPermitted = function(originUrl, whitelisted_domains) {
      var url = document.createElement('a');
      url.href = originUrl;
      var hostname = url.hostname;
      var result = false;
      if( typeof hostname !== 'undefined' ) {
        whitelisted_domains.forEach(function(element) {
          if( hostname.slice((-1 * element.length - 1)) === '.'.concat(element) ||  hostname === element ) {
                result = true;
            }
          });
        return result;
      }
    };

    window.handleIFrameMessage = function(e) {
      if (window.addEventListener) {
        window.addEventListener("message", handleIFrameMessage, false);
      } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleIFrameMessage);
      }
    }
  }`;

  if (!jotForm?.id) return <></>;

  const jotFormButtonClass = `${buttonClass} lightbox-${jotForm?.id}`; // lightbox-id class is a trigger point for the JotForm IFrame
  return (
    <>
      {!jotFormScriptLoad && (
        <Script
          type="text/javascript"
          src="https://form.jotform.com/static/feedback2.js"
          id="feedback2"
          onLoad={() => setJotFormScriptLoad(true)}
        />
      )}
      {/* this must be loaded after feedback2.js */}
      {jotFormScriptLoad && (
        <Script id="iframe-creation" type="text/javascript">
          {JotFormIframe}
        </Script>
      )}
      <div
        className={twMerge("flex w-full flex-col items-center", containerClass)}
        data-tina-field={tinaField(data, "buttonText")}
      >
        <UtilityButton
          className={jotFormButtonClass}
          buttonText={buttonText}
          animated={animated}
        />
        {children}
      </div>
    </>
  );
};

export const jotFormSchema: TinaField = {
  type: "object",
  name: "jotForm",
  label: "JotForm Properties",
  fields: [
    {
      type: "string",
      name: "id",
      label: "Id",
      required: true,
    },
    {
      type: "string",
      name: "formTitle",
      label: "Form Title",
      required: true,
    },
    {
      type: "string",
      name: "backgroundColor",
      label: "Background Color",
      required: true,
    },
    {
      type: "string",
      name: "fontColor",
      label: "Font Color",
      required: true,
    },
    {
      type: "string",
      name: "formType",
      label: "Form Type",
      required: true,

      options: [
        {
          value: "0",
          label: "Form with Title",
        },
        {
          value: "1",
          label: "Form without Title and white border",
        },
        {
          value: "2",
          label: "Form without Title and black border",
        },
      ],
    },
    {
      type: "number",
      name: "height",
      label: "Height",
      required: true,
      description: "px",
    },
    {
      type: "number",
      name: "width",
      label: "Width",
      required: true,
      description: "px",
    },
  ],
};

export const jotFormEmbedSchema: Template = {
  name: "JotFormEmbed",
  label: "JotForm Embed",
  fields: [
    jotFormSchema,
    {
      type: "string",
      name: "containerClass",
      label: "Container Class",
    },
    {
      type: "string",
      label: "Button Class",
      name: "buttonClass",
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
    },
    {
      type: "boolean",
      label: "Animated",
      name: "animated",
    },
  ],
};
