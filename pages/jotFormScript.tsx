import Script from "next/script";

const JotFormIframe = `
var existingURL = window.location.href;
if(!window.scriptExecuted || window.href != existingURL){
  window.scriptExecuted = true;
  window.href = window.location.href;
  var _sf = new JotformFeedback({
    formId: '${process.env.NEXT_PUBLIC_JOTFORM_ID}',
    base: 'https://form.jotform.com/',
    windowTitle: 'Book an initial meeting now',
    backgroundColor: '#BD4B47',
    fontColor: '#FFFFFF',
    type: '0',
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
  return (
    <>
      <Script
        type="text/javascript"
        src="https://form.jotform.com/static/feedback2.js"
        id="feedback2"
      />
      <Script id="" type="text/javascript" strategy="lazyOnload">
        {JotFormIframe}
      </Script>
    </>
  );
};

export default JotFormScript;
