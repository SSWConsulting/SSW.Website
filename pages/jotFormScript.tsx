import Script from "next/script";
import { useState } from "react";

const JotFormIframe = `
var existingURL = window.location.href;
if(!window.scriptExecuted || window.href != existingURL){ // This prevent from loading multiple JotForm's IFrames
  window.scriptExecuted = true;
  window.href = window.location.href;
  var _sf = new JotformFeedback({
    formId: '${process.env.NEXT_PUBLIC_JOTFORM_ID}',
    base: 'https://form.jotform.com/',
    windowTitle: 'Book an initial meeting now',
    backgroundColor: '#BD4B47',
    fontColor: '#FFFFFF',
    type: '1',
    height: 800,
    width: 700,
    openOnLoad: false
  });

  window.handleIFrameMessage = function(e) {
    if (window.addEventListener) {
        window.addEventListener("message", handleIFrameMessage, false);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleIFrameMessage);
    }
  }
}`;

const JotFormScript = () => {
  const [jotFormScriptLoad, setJotFormScriptLoad] = useState(false);
  return (
    <>
      <Script
        type="text/javascript"
        src="https://form.jotform.com/static/feedback2.js"
        id="feedback2"
        onLoad={() => setJotFormScriptLoad(true)}
      />
      {/* this must be loaded after feedback2.js */}
      {jotFormScriptLoad && (
        <Script id="iframe-creation" type="text/javascript">
          {JotFormIframe}
        </Script>
      )}
    </>
  );
};

export default JotFormScript;
