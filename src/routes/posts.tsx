import { For, createResource } from "solid-js";
import { useRouteData, createRouteData } from "solid-start";
import { sdk } from "~/utils/api";
import { createServerData$ } from "solid-start/server";
 
export function routeData() {
  return createServerData$(async () => {
    const headers = {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || ""
    };
    const response = await sdk.posts({}, headers)
    return response.poc1_posts;
  });
}
 
export default function Page() {
  const posts = useRouteData<typeof routeData>();
 
  return (
    <ul>
      <For each={posts()}>
        {(post) => <li>{post.title}</li>}
      </For>
    </ul>
  );
}