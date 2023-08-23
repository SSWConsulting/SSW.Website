import { defineStaticConfig, TinaCMS } from "tinacms";
import { companyIndexSchema, companySchema } from "./collections/company";
import {
  consultingCategorySchema,
  consultingIndexSchema,
  consultingSchema,
  consultingTagSchema,
} from "./collections/consulting";
import { employmentSchema } from "./collections/employment";
import { eventsIndexSchema, eventsSchema } from "./collections/events";
import { globalSchema } from "./collections/global";
import { industrySchema } from "./collections/industry";
import { locationSchema } from "./collections/location";
import { marketingSchema } from "./collections/marketing";
import { newsletterSchema } from "./collections/newsletters";
import { officeIndexSchema, officeSchema } from "./collections/offices";
import { opportunitiesSchema } from "./collections/opportunities";
import { pagesSchema } from "./collections/pages";
import { paymentDetailsSchema } from "./collections/payment-details";
import { presenterSchema } from "./collections/presenter";
import { productsIndexSchema, productsSchema } from "./collections/products";
import { technologiesSchema } from "./collections/technologies";
import { testimonialCategoriesSchema } from "./collections/testimonialCategories";
import { testimonialSchema } from "./collections/testimonials";
import { trainingSchema } from "./collections/training";
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
  cmsCallback: (cms: TinaCMS) => {
    cms.flags.set("branch-switcher", true);
    return cms;
  },
  schema: {
    collections: [
      marketingSchema,
      globalSchema,
      pagesSchema,
      consultingIndexSchema,
      consultingCategorySchema,
      consultingTagSchema,
      consultingSchema,
      videoProductionSchema,
      testimonialSchema,
      testimonialCategoriesSchema,
      technologiesSchema,
      officeSchema,
      opportunitiesSchema,
      employmentSchema,
      officeIndexSchema,
      productsIndexSchema,
      productsSchema,
      trainingSchema,
      newsletterSchema,
      presenterSchema,
      locationSchema,
      industrySchema,
      companySchema,
      eventsSchema,
      companyIndexSchema,
      eventsIndexSchema,
      paymentDetailsSchema,
    ],
  },
});

export default config;
