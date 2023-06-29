<script lang="ts">
  import clsx from "clsx";

  export let title: string = "";
  export let description: string;
  export let type: "danger" | "success" | "warning" | "info";
</script>

<div
  class={clsx("mb-4 rounded-lg p-4  text-sm", {
    "bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800": type == "danger",
    "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800": type == "success",
    "bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-800": type == "info",
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800": type == "warning",
  })}
  role="alert"
>
  {#if title && title != ""}
    <span class="font-medium">{title}!</span>
  {/if}

  {description}
</div>
