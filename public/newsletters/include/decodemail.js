
function decodeit(test) {
    // gets the email address to be decoded
    var Decodedstring = test;

    var email = "";

    for (i = 0; i < Decodedstring.length; i += 2) {
        // holds each letter (2 digits)
        var letter = "";
        letter = Decodedstring.charAt(i) + Decodedstring.charAt(i + 1);

        // parse it to normal
        email += String.fromCharCode(parseInt(letter, 16));

    }

    return email;
}

function decodeEmail(encodedEmail) {
    // holds the decoded email address
    var email = "";

    // go through and decode the email address
    for (i = 0; i < encodedEmail.length;) {
        // holds each letter (2 digits)
        var letter = "";
        letter = encodedEmail.charAt(i) + encodedEmail.charAt(i + 1);

        // build the real email address
        email += String.fromCharCode(parseInt(letter, 16));
        i += 2;
    }

    return email;
}
function encodeit(decodedEmail) {
    // gets the email address to be decoded
    var stringtoencode = decodedEmail;
    var stringencoded = "";

    for (i = 0; i < stringtoencode.length; i++) {

        stringencoded += stringtoencode.charCodeAt(i).toString(16);
    }

    return stringencoded;

}


function sendEmailWithSubject(para, emailSubject, object) {
    // do the mailto: link

    if (para != null) {

        var email = "mailto:" + decodeit(para);

        if (object != null) {

            object.href = email + "?subject=" + emailSubject;



            if (object.getAttribute("keepText") != "true" || object.keepText != "true")
                if (object.innerText != null) {

                    object.innerText = decodeit(para);

                }
        }
    }
}

function sendEmailWithoutSubject(para, object) {

    if (para != null) {

        var email = "mailto:" + decodeit(para);

        if (object != null) {

            object.href = email;
        }
    }
}

function sendEmailWithSubjectAndBody(para, emailSubject, emailBody, object) {
    if (para != null) {
        var email = "mailto:" + decodeit(para);
        if (object != null) {
            object.href = email + "?subject=" + emailSubject + "&body=" + emailBody;

            if (object.getAttribute("keepText") != "true" || object.keepText != "true")
                if (object.innerText != null) {

                    object.innerText = decodeit(para);

                }
        }
    }
}


function displayStatus(encodedEmail) {
    self.status = "mailto:" + decodeit(encodedEmail);
}

// clear the statusbar message
function clearStatus() {
    self.status = "";
}
function onLoading() {

    var i = 0;

    //var email = "mailto:" + decodeit("696e666f72407373772e636f6d2e6175");

    var array = document.getElementsByTagName('a');

    if (array != null) {
        for (i = 0; i < array.length; i++) {

            //only apply value when attribute is not null, otherwise, it will apply string 'null' value in IE, which will cause buttons disappear problem on sign in page
            if (array[i].getAttribute("process") != null && array[i].process == null) {
                array[i].process = array[i].getAttribute("process");
            }
            if (array[i].getAttribute("category") != null && array[i].category == null) {
                array[i].category = array[i].getAttribute("category");
            }
            if (array[i].getAttribute("encode") != null && array[i].encode == null) {
                array[i].encode = array[i].getAttribute("encode");
            }
            if (array[i].getAttribute("keepText") != null && array[i].keepText == null) {
                array[i].keepText = array[i].getAttribute("keepText");
            }

            if (array[i].process == 'true' && array[i].category == 'info') {

                if (array[i].innerText != null) {
                    array[i].innerText = decodeit('696e666f407373772e636f6d2e6175');

                }
                else {

                    array[i].textContent = decodeit('696e666f407373772e636f6d2e6175');
                }

            }
            else if (array[i].process == 'true' && array[i].category == 'HelenMoore') {
                if (array[i].innerText != null) {
                    array[i].innerText = decodeit('48656c656e4d6f6f7265407373772e636f6d2e6175');

                }
                else {

                    array[i].textContent = decodeit('48656c656e4d6f6f7265407373772e636f6d2e6175');
                }

            }
            else if (array[i].process == 'true' && array[i].category == 'Ulysses') {
                if (array[i].innerText != null) {
                    array[i].innerText = decodeit('756C7973736573407373772E636F6D2E6175');

                }
                else {

                    array[i].textContent = decodeit('756C7973736573407373772E636F6D2E6175');
                }

            }
            else if (array[i].innerText != null) {
                if (array[i].encode != null && (array[i].keepText != "true" || array[i].keepText == null))
                    array[i].innerText = decodeit(array[i].encode);

            }
            else {
                if (array[i].getAttribute("encode") != null && array[i].getAttribute("keepText") != "true") {
                    array[i].textContent = decodeit(array[i].getAttribute("encode"));
                }
            }


        }
    }
}
function sendEmail(encodedEmail, emailSubject) {
    let loc = 'mailto:' + decodeEmail(encodedEmail);
    if (emailSubject && emailSubject.length) {
        loc += '?subject=' + emailSubject;
    }
    location.href = loc;
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(onLoading);
