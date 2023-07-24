const CACHE_MINS = 60;

import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: CACHE_MINS * 60 });

export { cache };
