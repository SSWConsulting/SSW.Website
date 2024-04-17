import preval from 'next-plugin-preval';

import { platform } from '../../../tailwind.config.js';

async function getTailwindPlatformColors() {
  return platform.map((p) => ({ ...p, className: `bg-platform-${p.name}` }))
}

export default preval(getTailwindPlatformColors());
