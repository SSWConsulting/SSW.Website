//decode email address and bind events when load 
$(document).ready(function() {
    //Select all the links contain encode attribute
    $("a[encode]").each(function() {
        // Decode email address if the keeptext attribute is not true
        if ($(this).attr("keeptext") != "true") {
            $(this).text(decodeEmail($(this).attr("encode")));
        }
        //Remove all the events from the html tag which causing JavaScript error in CRM 
        $(this).removeAttr("onmouseover");
        $(this).removeAttr("onmouseout");
        $(this).removeAttr("onclick");
        bindEvents(this);
    })

});

//Binding events
function bindEvents(obj) {
    //Add event
    //    $(obj).mouseover(function() {
    //        self.status = 'mailto:' + decodeEmail($(this).attr("encode"));
    //    });

    //    $(obj).mouseout(function() {
    //        self.status = '';
    //    });

    //    $(obj).click(function() {
    //        //check emailsubject and emailbody
    //        if ($(this).attr("emailsubject") != null & $(this).attr("emailbody") == null) {
    //            //subject only
    //            sendEmailWithSubject($(this).attr("encode"), $(this).attr("emailsubject"), this);
    //        }
    //        else if ($(this).attr("emailsubject") != null & $(this).attr("emailbody") != null) {
    //            //subject and body
    //            sendEmailWithSubjectAndBody($(this).attr("encode"), $(this).attr("emailsubject"), $(this).attr("emailbody"), this);
    //        }
    //        else {
    //            //no subject and body
    //            sendEmail($(this).attr("encode"), this);
    //        }
    //    });

    //Add href link
    if ($(obj).attr("emailsubject") != null & $(obj).attr("emailbody") == null) {
        //subject only
        $(obj).attr("href", "mailto:" + decodeEmail($(obj).attr("encode")) + "?subject=" + $(obj).attr("emailsubject"));
    }
    else if ($(obj).attr("emailsubject") != null & $(obj).attr("emailbody") != null) {
        //subject and body
        $(obj).attr("href", "mailto:" + decodeEmail($(obj).attr("encode")) + "?subject=" + $(obj).attr("emailsubject") + "&body=" + $(obj).attr("emailbody"));
    }
    else {
        //no subject and body
        $(obj).attr("href", "mailto:" + decodeEmail($(obj).attr("encode")));
    }
}

//function to decode email address
function decodeEmail(encodedString) {
    // holds the decoded email address
    var email = "";
    if (encodedString != null) {
        // go through and decode the email address
        for (i = 0; i < encodedString.length; i += 2) {
            // holds each letter (2 digits)
            var letter = "";
            letter = encodedString.charAt(i) + encodedString.charAt(i + 1);
            // build the real email address
            email += String.fromCharCode(parseInt(letter, 16));
        }
    }
    return email;
}

//function to encode email address
function encodeEmail(decodedString) {
    // gets the email address to be decoded
    var stringencoded = "";
    for (i = 0; i < decodedString.length; i++) {
        stringencoded += decodedString.charCodeAt(i).toString(16);
    }
    return stringencoded;
}

//function to send email without subject
function sendEmail(para, object) {
    if (para != null) {
        var email = "mailto:" + decodeEmail(para);
        if (object != null) {
            object.href = email;
        }
    }
}

//function to send email with subject
function sendEmailWithSubject(para, emailSubject, object) {
    // do the mailto: link
    if (para != null) {
        var email = "mailto:" + decodeEmail(para);
        if (object != null) {
            object.href = email + "?subject=" + emailSubject;
            if (object.getAttribute("keepText") != "true" || object.keepText != "true")
                if (object.innerText != null) {
                object.innerText = decodeEmail(para);
            }
        }
    }
}

//function to send email with subject and body
function sendEmailWithSubjectAndBody(para, emailSubject, emailBody, object) {
    if (para != null) {
        var email = "mailto:" + decodeEmail(para);
        if (object != null) {
            object.href = email + "?subject=" + emailSubject + "&body=" + emailBody;
            if (object.getAttribute("keepText") != "true" || object.keepText != "true")
                if (object.innerText != null) {
                object.innerText = decodeEmail(para);
            }
        }
    }
}