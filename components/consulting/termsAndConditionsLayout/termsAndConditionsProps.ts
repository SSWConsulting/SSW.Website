import { TinaMarkdownContent } from "tinacms/dist/rich-text";

export type termsAndConditionsProps = {
    _body: TinaMarkdownContent | TinaMarkdownContent[],
    seo: {
      title: string
    },
    rates: {
      title: string,
      rateList: [{
        resource: string,
        standardHourlyRate: {
          AUD: string,
          GST: string
        },
        standardDailyRate: {
          AUD: string,
          GST: string
        },
        prepaidHourlyRate: {
          AUD: string,
          GST: string
        },
        prepaidDailyRate: {
          AUD: string,
          GST: string
        }
      }],
      link: {
        text: string,
        address: string
      }
    },
    terms: {
      title: string,
      introduction: string,
      content: TinaMarkdownContent | TinaMarkdownContent[]
    }
  };