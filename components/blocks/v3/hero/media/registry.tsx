import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Registry of pluggable RHS media compositions for the v3 hero.
 *
 * Tina can't store JSX in JSON, so the `mediaType` schema field stores a
 * string key and the hero resolves it to a component here at render time.
 * Each entry owns its own internal layout/animation — the hero is agnostic.
 *
 * To add a new composition: drop a component in this folder and register its
 * key below, then add the same key to the `mediaType` options in the schema.
 */
export const heroMediaRegistry: Record<string, ComponentType> = {
  reactConsultingSvg: dynamic(() => import("./ReactConsultingHeroMedia")),
};

export type HeroMediaKey = keyof typeof heroMediaRegistry;
