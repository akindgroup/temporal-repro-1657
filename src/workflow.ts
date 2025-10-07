import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "./activities.js";

const { sampleActivity } = proxyActivities<typeof activities>({})

export const workflow = async () => {
  let pointer: null | number = 0

  do {
    const result = await sampleActivity({ pointer })
    pointer = result.pointer
  } while (pointer !== null)
}
