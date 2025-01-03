import { defineStaticConfig, TinaCMS } from "tinacms";
import { articlesIndexSchema, articlesSchema } from "./collections/articles";
import { caseStudySchema } from "./collections/case-study";
import {
  clientsCategorySchema,
  companyIndexSchema,
  companySchema,
} from "./collections/company";
import {
  consultingCategorySchema,
  consultingIndexSchema,
  consultingSchema,
  consultingTagSchema,
} from "./collections/consulting";
import {
  consultingv2Schema,
  consultingv2TechnologyGroupsSchema,
  consultingv2TechnologySchema,
} from "./collections/consultingv2";
import { employmentSchema } from "./collections/employment";
import { eventsIndexSchema, eventsSchema } from "./collections/events";
import { eventsCalendarSchema } from "./collections/events-calendar";
import { globalSchema } from "./collections/global";
import { industryIndexSchema, industrySchema } from "./collections/industry";
import { liveSchema } from "./collections/live";
import { locationSchema } from "./collections/location";
import { logosSchema } from "./collections/logos";
import { marketingSchema } from "./collections/marketing";
import { megaMenuSchema } from "./collections/megamenu";
import { newsletterSchema } from "./collections/newsletters";
import { officeIndexSchema, officeSchema } from "./collections/offices";
import { opportunitiesSchema } from "./collections/opportunities";
import { pagesSchema } from "./collections/pages";
import { partnerIndexSchema } from "./collections/partner";
import { paymentDetailsSchema } from "./collections/payment-details";
import { presenterSchema } from "./collections/presenter";
import { productsIndexSchema, productsSchema } from "./collections/products";
import { technologiesSchema } from "./collections/technologies";
import { testimonialCategoriesSchema } from "./collections/testimonialCategories";
import { testimonialSchema } from "./collections/testimonials";
import { trainingSchema } from "./collections/training";
import {
  userGroupGlobalSchema,
  userGroupPageSchema,
} from "./collections/usergroup";
import { videoProductionSchema } from "./collections/videoProduction";

const config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  ui: {
    previewUrl: (context) => {
      const { branch } = context;
      const url =
        branch === "main"
          ? "https://www.ssw.com.au"
          : process.env.NEXT_PUBLIC_SLOT_URL;

      return {
        url: url,
      };
    },
  },
  cmsCallback: async (cms: TinaCMS) => {
    cms.flags.set("branch-switcher", true);
    return cms;
  },
  schema: {
    collections: [
      pagesSchema,
      globalSchema,
      megaMenuSchema,
      articlesIndexSchema,
      articlesSchema,
      companyIndexSchema,
      companySchema,
      clientsCategorySchema,
      paymentDetailsSchema,
      caseStudySchema,
      consultingv2Schema,
      consultingv2TechnologyGroupsSchema,
      consultingv2TechnologySchema,
      consultingIndexSchema,
      consultingSchema,
      videoProductionSchema,
      consultingCategorySchema,
      consultingTagSchema,
      technologiesSchema,
      employmentSchema,
      opportunitiesSchema,
      eventsIndexSchema,
      eventsSchema,
      eventsCalendarSchema,
      locationSchema,
      presenterSchema,
      logosSchema,
      industrySchema,
      liveSchema,
      marketingSchema,
      newsletterSchema,
      officeIndexSchema,
      officeSchema,
      partnerIndexSchema,
      productsIndexSchema,
      industryIndexSchema,
      productsSchema,
      testimonialSchema,
      testimonialCategoriesSchema,
      trainingSchema,
      userGroupPageSchema,
      userGroupGlobalSchema,
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});

export default config;
