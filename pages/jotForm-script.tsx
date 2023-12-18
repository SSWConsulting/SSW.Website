export const JotFormIframe = `
      if(!window.scriptExecuted ){
        window.scriptExecuted = true;
        var _sf = new JotformFeedback({
          formId: '233468468973070',
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

export const JotForm = () => {
  return <></>;
};
