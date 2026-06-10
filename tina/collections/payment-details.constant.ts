// Field-name constants shared between the payment-details Tina collection and
// the PaymentBlock component. Lives in its own dependency-free file so the
// component doesn't import the collection (which pulls the tinacms runtime
// into the client bundle).
export const paymentDetailsBlockConstant = {
  value: "paymentDetails",
  bankName: "bankName",
  accountName: "accountName",
  bsbNumber: "bsbNumber",
  accountNumber: "accountNumber",
  swiftNumber: "swiftNumber",
  abn: "abn",
  acn: "acn",
};
