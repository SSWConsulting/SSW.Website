import { defineStaticConfig, TinaCMS, useCMS, wrapFieldsWithMeta } from "tinacms";
import {
  consultingCategorySchema,
  consultingIndexSchema,
  consultingSchema,
  consultingTagSchema,
} from "./collections/consulting";
import { educationalSchema } from "./collections/educational";
import { globalSchema } from "./collections/global";
import { marketingSchema } from "./collections/marketing";
import { officeSchema, officeIndexSchema } from "./collections/offices";
import { pagesSchema } from "./collections/pages";
import { technologiesSchema } from "./collections/technologies";
import { productsIndexSchema } from "./collections/products";
import { testimonialCategoriesSchema } from "./collections/testimonialCategories";
import { testimonialSchema } from "./collections/testimonials";
import { employmentSchema } from "./collections/employment";
import { trainingSchema } from "./collections/training";
import { newsletterSchema } from "./collections/newsletters";
import { newsletterCopySchema } from "./collections/newsletters-copy";
import { opportunitiesSchema } from "./collections/opportunities";

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
      mediaRoot: "uploads",
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
      testimonialSchema,
      testimonialCategoriesSchema,
      technologiesSchema,
      officeSchema,
      opportunitiesSchema,
      employmentSchema,
      officeIndexSchema,
      productsIndexSchema,
      trainingSchema,
      educationalSchema,
      newsletterSchema,
      newsletterCopySchema,
    ],
  },
});

export default config;
