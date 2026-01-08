import { defineStaticConfig, TinaCMS } from "tinacms";
import azureBannerSchema from "../components/util/showAzureBanner";
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

import { consultingv2Schema } from "./collections/consultingv2";
import { employmentSchema } from "./collections/employment";
import { eventsIndexSchema, eventsSchema } from "./collections/events";
import { eventsCalendarSchema } from "./collections/events-calendar";
import { eventsv2Schema } from "./collections/eventsv2";
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
import { phishingBannerSchema } from "./collections/phishing-banner";
import { presenterSchema } from "./collections/presenter";
import { productsIndexSchema, productsSchema } from "./collections/products";
import {
  technologiesSchema,
  v2TechnologyGroupsSchema,
  v2TechnologySchema,
} from "./collections/technologies";
import { testimonialCategoriesSchema } from "./collections/testimonialCategories";
import { testimonialSchema } from "./collections/testimonials";
import { trainingSchema } from "./collections/training";
import {
  userGroupGlobalSchema,
  userGroupPageSchema,
} from "./collections/usergroup";
import { videoProductionSchema } from "./collections/videoProduction";

const appendSharedSchemas = (
  schemas,
  leadingFields = [],
  trailingFields = []
) => {
  for (const schema of schemas) {
    if (!schema.fields) {
      continue;
    }
    schema.fields = [...leadingFields, ...schema.fields, ...trailingFields];
  }
  return schemas;
};
const formattedSchemas = () => {
  return [
    ...schemas,
    ...appendSharedSchemas(pageSchemas, [], [azureBannerSchema]),
  ].sort((a, b) => a.name.localeCompare(b.name));
};

const pageSchemas = [
  caseStudySchema,
  pagesSchema,
  articlesIndexSchema,
  articlesSchema,
  companyIndexSchema,
  companySchema,
  consultingv2Schema,
  consultingIndexSchema,
  consultingSchema,
  videoProductionSchema,
  employmentSchema,
  eventsv2Schema,
  eventsIndexSchema,
  eventsSchema,
  industrySchema,
  liveSchema,
  marketingSchema,
  officeIndexSchema,
  officeSchema,
  partnerIndexSchema,
  productsIndexSchema,
  industryIndexSchema,
  productsSchema,
  userGroupPageSchema,
  logosSchema,
  trainingSchema,
];

const schemas = [
  v2TechnologySchema,
  v2TechnologyGroupsSchema,
  paymentDetailsSchema,
  clientsCategorySchema,
  eventsCalendarSchema,
  consultingCategorySchema,
  consultingTagSchema,
  technologiesSchema,
  locationSchema,
  presenterSchema,
  newsletterSchema,
  testimonialSchema,
  testimonialCategoriesSchema,
  opportunitiesSchema,
  globalSchema,
  megaMenuSchema,
  phishingBannerSchema,
  userGroupGlobalSchema,
];
const config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch: "page-previews-tina",
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
    collections: formattedSchemas(),
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
