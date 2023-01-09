import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const BookingForm = ({ isShareForm }) => {
  const ACTIVE_INPUT = {
    FullName: "Full Name *",
    Email: "Email *",
    Phone: "Phone *",
    Location: "Location",
    States: "States",
    Note: "Message",
    Company: "Company",
    ClassShow: "show",
    ReferredCompany: "Referred Company",
    ReferredFullName: "Referred FullName",
    ReferredEmail: "Referred Email",
    None: "",
  };

  const countriesList = [
    {
      label: "Australia",
      value: "australia",
    },
    {
      label: "China",
      value: "china",
    },
    {
      label: "Europe",
      value: "eu",
    },
    {
      label: "South America",
      value: "southamerica",
    },
    {
      label: "USA",
      value: "usa",
    },

    {
      label: "Other",
      value: "other",
    },
  ];

  const australianStates = [
    {
      label: "Australian Capital Territory",
      value: "ACT",
    },
    {
      label: "New South Wales",
      value: "NSW",
    },
    {
      label: "Northern Territory",
      value: "NT",
    },
    {
      label: "Queensland",
      value: "QLD",
    },
    {
      label: "South Australia",
      value: "SA",
    },
    {
      label: "Tasmania",
      value: "TAS",
    },
    {
      label: "Victoria",
      value: "VIC",
    },
    {
      label: "Western Australia",
      value: "WA",
    },
  ];

  //Show FomrStates and Active label
  const [isShowState, setIsShowState] = useState(false);
  const [activeLabel, setActiveLabel] = useState({});

  //ContactForm title
  const contactFormTitle = "Get your project started!";

  //ShareForm title
  const shareFormTitle = "Share this Page...";

  //Form Validation
  const [validated, setValidated] = useState(false);

  //Form Data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("Other");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");

  //ShareForm additional fields
  const [referredFullName, setReferredFullName] = useState("");
  const [referredEmail, setReferredEmail] = useState("");
  const [referredCompany, setReferredCompany] = useState("");

  const handleInput = (targetInput, value) => {
    if (
      (targetInput == ACTIVE_INPUT.FullName ||
        targetInput == ACTIVE_INPUT.Email ||
        targetInput == ACTIVE_INPUT.Phone ||
        targetInput == ACTIVE_INPUT.Location ||
        targetInput == ACTIVE_INPUT.Company ||
        targetInput == ACTIVE_INPUT.Note ||
        targetInput == ACTIVE_INPUT.ReferredCompany ||
        targetInput == ACTIVE_INPUT.ReferredFullName ||
        targetInput == ACTIVE_INPUT.ReferredEmail) &&
      value.trim().length > 0
    ) {
      setActiveLabel({ ...activeLabel, [targetInput]: true });
      switch (targetInput) {
        case ACTIVE_INPUT.FullName:
          setFullName(value);
        case ACTIVE_INPUT.Email:
          setEmail(value);
        case ACTIVE_INPUT.Phone:
          setPhone(value);
        case ACTIVE_INPUT.Location:
          if (state.trim().length > 0) {
            setState("Other");
          }
          setLocation(value);
        case ACTIVE_INPUT.Company:
          setCompany(value);
        case ACTIVE_INPUT.Note:
          setNote(value);
        case ACTIVE_INPUT.ReferredCompany:
          setReferredCompany(value);
        case ACTIVE_INPUT.ReferredFullName:
          setReferredFullName(value);
        case ACTIVE_INPUT.ReferredEmail:
          setReferredEmail(value);
        default:
          break;
      }
    } else if (targetInput == ACTIVE_INPUT.States && location == "australia") {
      setActiveLabel({ ...activeLabel, [targetInput]: true });
      setState(value);
    } else {
      setActiveLabel({ ...activeLabel, [targetInput]: false });
    }
  };
  //Check the validation of form
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      const subject = "Consulting enquiry - " + company + " - " + fullName;
      let body = "Consulting enquiry from " + document.URL + "<br/>";
      body = body + "Company: " + company + "<br/>";
      body = body + "State:  " + state + "<br/>";
      body = body + "Name:  " + fullName + "<br/>";
      body = body + "Phone:   " + phone + "<br/>";
      body = body + "Email:   " + email + "<br/>";
      body = body + "Note:    " + note + "<br/><br/>";
      const data = {
        Name: fullName,
        Topic: subject,
        Company: company,
        Note: note,
        Country: location,
        State: state,
        Email: email,
        Phone: phone,
        EmailSubject: subject,
        EmailBody: body + "The associated CRM lead is ",
      };
      axios
        .post("https://www.ssw.com.au/ssw/api/crm/createlead", data)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  };

  //Load states if selected country is Australia
  let theStateList;
  if (!isShowState) {
    theStateList = (
      <>
        <Form.Group controlId="australianStateSelect">
          <div className="field-wrapper">
            <Form.Label
              className={
                activeLabel[ACTIVE_INPUT.States] == true
                  ? ACTIVE_INPUT.ClassShow
                  : ACTIVE_INPUT.None
              }
            >
              {ACTIVE_INPUT.States}
            </Form.Label>
            <Form.Select
              required
              onClick={(e) => {
                handleInput(ACTIVE_INPUT.States, e.currentTarget.value);
              }}
            >
              <option className="d-none" value="">
                State
              </option>
              {australianStates.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>
      </>
    );
  } else {
    theStateList = null;
  }

  //Form fields checked either it is ShareForm or BookingForm
  let theFormFields;
  if (!isShareForm) {
    theFormFields = (
      <>
        <Form.Group as={Col} controlId="validationCompany">
          <div className="field-wrapper">
            <Form.Label
              className={
                activeLabel[ACTIVE_INPUT.Company] == true
                  ? ACTIVE_INPUT.ClassShow
                  : ACTIVE_INPUT.None
              }
            >
              {ACTIVE_INPUT.Company}
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                handleInput(ACTIVE_INPUT.Company, e.currentTarget.value);
              }}
              type="text"
              placeholder={ACTIVE_INPUT.Company}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide your full name.
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <Form.Group controlId="contactFormNote">
          <div className="field-wrapper">
            <Form.Label
              className={
                activeLabel[ACTIVE_INPUT.Note] == true
                  ? ACTIVE_INPUT.ClassShow
                  : ACTIVE_INPUT.None
              }
            >
              {ACTIVE_INPUT.Note}
            </Form.Label>

            <Form.Control
              as="textarea"
              placeholder="Note"
              rows={4}
              maxLength={2000}
              name="address"
              required
              onChange={(e) => {
                handleInput(ACTIVE_INPUT.Note, e.currentTarget.value);
              }}
            />
            <small>Maximium 2000 characters</small>
            <Form.Control.Feedback type="invalid">
              Please provide note.
            </Form.Control.Feedback>
          </div>
        </Form.Group>
      </>
    );
  } else if (isShareForm) {
    theFormFields = (
      <>
        <Form.Group as={Col} controlId="validationCompany">
          <div className="field-wrapper">
            <Form.Label
              className={
                activeLabel[ACTIVE_INPUT.ReferredCompany] == true
                  ? ACTIVE_INPUT.ClassShow
                  : ACTIVE_INPUT.None
              }
            >
              {ACTIVE_INPUT.ReferredCompany}
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                handleInput(
                  ACTIVE_INPUT.ReferredCompany,
                  e.currentTarget.value
                );
              }}
              required
              type="text"
              placeholder={ACTIVE_INPUT.ReferredCompany}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide your referred company .
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCompany">
          <div className="field-wrapper">
            <Form.Label
              className={
                activeLabel[ACTIVE_INPUT.ReferredFullName] == true
                  ? ACTIVE_INPUT.ClassShow
                  : ACTIVE_INPUT.None
              }
            >
              {ACTIVE_INPUT.ReferredFullName}
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                handleInput(
                  ACTIVE_INPUT.ReferredFullName,
                  e.currentTarget.value
                );
              }}
              required
              type="text"
              placeholder={ACTIVE_INPUT.ReferredFullName}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide your referred full name.
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCompany">
          <div className="field-wrapper">
            <Form.Label
              className={
                activeLabel[ACTIVE_INPUT.ReferredEmail] == true
                  ? ACTIVE_INPUT.ClassShow
                  : ACTIVE_INPUT.None
              }
            >
              {ACTIVE_INPUT.ReferredEmail}
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                handleInput(ACTIVE_INPUT.ReferredEmail, e.currentTarget.value);
              }}
              required
              type="text"
              placeholder={ACTIVE_INPUT.ReferredEmail}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide your Referred email.
            </Form.Control.Feedback>
          </div>
        </Form.Group>
      </>
    );
  } else {
    theFormFields = null;
  }

  return (
    <div className="modal-content">
      <div className="modal-body">
        <div className="get-started-form">
          <h2>{isShareForm ? shareFormTitle : contactFormTitle}</h2>
          <Form
            noValidate
            validated={validated}
            className="form-group"
            onSubmit={handleSubmit}
          >
            <Form.Group as={Col} controlId="validationFullName">
              <div className="field-wrapper">
                <Form.Label
                  className={
                    activeLabel[ACTIVE_INPUT.FullName] == true
                      ? ACTIVE_INPUT.ClassShow
                      : ACTIVE_INPUT.None
                  }
                >
                  {ACTIVE_INPUT.FullName}
                </Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleInput(ACTIVE_INPUT.FullName, e.currentTarget.value);
                  }}
                  required
                  type="text"
                  placeholder={ACTIVE_INPUT.FullName}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your full name.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="validationEmail">
              <div className="field-wrapper">
                <Form.Label
                  className={
                    activeLabel[ACTIVE_INPUT.Email] == true ? "show" : ""
                  }
                >
                  {ACTIVE_INPUT.Email}
                </Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleInput(ACTIVE_INPUT.Email, e.currentTarget.value);
                  }}
                  required
                  type="email"
                  placeholder={ACTIVE_INPUT.Email}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide valid email.
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="validationPhone">
              <div className="field-wrapper">
                <Form.Label
                  className={
                    activeLabel[ACTIVE_INPUT.Phone] == true
                      ? ACTIVE_INPUT.ClassShow
                      : ACTIVE_INPUT.None
                  }
                >
                  {ACTIVE_INPUT.Phone}
                </Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleInput(ACTIVE_INPUT.Phone, e.currentTarget.value);
                  }}
                  type="phone"
                  required
                  placeholder={ACTIVE_INPUT.Phone}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide valid Phone number.
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <Form.Group controlId="locationSelect">
              <div className="field-wrapper">
                <Form.Label
                  className={
                    activeLabel[ACTIVE_INPUT.Location] == true
                      ? ACTIVE_INPUT.ClassShow
                      : ACTIVE_INPUT.None
                  }
                >
                  {ACTIVE_INPUT.Location}
                </Form.Label>
                <Form.Select
                  required
                  onClick={(e) => {
                    handleInput(ACTIVE_INPUT.Location, e.currentTarget.value);
                  }}
                  onChange={(e) => {
                    e.currentTarget.value == "australia"
                      ? setIsShowState(true)
                      : setIsShowState(false);
                  }}
                >
                  <option className="d-none" value="">
                    Location
                  </option>
                  {countriesList.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
            {theStateList}
            {theFormFields}
            <Button className="btn done" type="submit">
              SUBMIT
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;