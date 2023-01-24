/* eslint-disable no-undef */
export const pageview = (url) => {
  window.gtag("config", `${process.env.NEXT_PUBLIC_GTM_ID}`, {
    page_path: url,
  });
};
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
