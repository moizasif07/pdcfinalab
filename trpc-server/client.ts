import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./index.js";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc"
    })
  ]
});

async function main() {
  const start = performance.now();

  const result = await client.uploadImage.mutate({});

  const end = performance.now();

  console.log("Result:", result);
  console.log("Response time:", (end - start).toFixed(2), "ms");
}

main();
