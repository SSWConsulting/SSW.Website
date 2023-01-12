export const bookingFormSubmissionData = (
  values,
  isShareForm,
  contactReCaptcha,
  sourceWebPageURL
) => {
  let subject = isShareForm
    ? `Share This Page enquiry - ${values.referredCompany} - ${values.fullName}`
    : `Consulting enquiry - ${values.company} - ${values.fullName}`;

  let body = "Consulting enquiry from " + document.URL + "<br/>";
  body =
    body +
    "Company: " +
    (isShareForm ? values.referredCompany : values.company) +
    "<br/>";

  body = body + `Country: ${values.location}` + "<br/>";

  body = body + `State: ${values.states}` + "<br/>";

  body =
    body +
    "Name:  " +
    (isShareForm ? values.referredFullName : values.fullName) +
    "<br/>";

  body = body + `Phone: ${values.phone}` + "<br/>";

  body =
    body +
    "Email:   " +
    (isShareForm ? values.referredEmail : values.email) +
    "<br/>";

  body =
    body +
    (isShareForm
      ? `Referred By: ${values.fullName} (${values.email})`
      : `Note: ${values.note}`) +
    "<br/><br/>";

  const data = {
    Name: isShareForm ? values.referredFullName : values.fullName,
    Topic: subject,
    Company: isShareForm ? values.referredCompany : values.company,
    ...(!isShareForm && { Note: values.note }),
    Country: values.location,
    State: values.states,
    Email: isShareForm ? values.referredEmail : values.email,
    Phone: values.phone,
    Recaptcha: contactReCaptcha,
    SourceWebPageURL: sourceWebPageURL,
    EmailSubject: subject,
    EmailBody: body + "The associated CRM lead is ",
  };

  return data;
};
