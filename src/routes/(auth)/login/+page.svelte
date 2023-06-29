<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import Alert from "$lib/components/Alert.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div class="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pb-24 md:h-screen">
  <a href="/" class="mb-8 flex items-center justify-center text-2xl font-semibold lg:mb-10">
    <!-- <img src="/images/logo.svg" class="mr-4 h-11" alt="FlowBite Logo" /> -->
    <span>Flowbite</span>
  </a>
  <div class="w-full max-w-xl space-y-8 rounded-md border p-6 shadow sm:p-8">
    <h2 class="text-2xl font-bold text-gray-900">Sign in to platform</h2>

    {#if form?.error?.message}
      <Alert type="danger" description={form.error.message} />
    {/if}

    <form
      class="mt-8 space-y-6"
      action="?/login"
      method="POST"
      use:enhance={() => {
        return async ({ result }) => {
          // rerun the `load` function for the page
          // https://kit.svelte.dev/docs/modules#$app-navigation-invalidateall
          invalidateAll();

          // since we're customizing the default behaviour
          // we don't want to reimplement what `use:enhance` does
          // so we can use `applyResult` and pass the `result`
          await applyAction(result);
        };
      }}
    >
      <div>
        <label for="email" class="mb-2 block text-sm font-medium text-gray-900"> Email </label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="password" class="mb-2 block text-sm font-medium text-gray-900">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>

      <div class="flex items-start">
        <a href="/forgot-password" class="ml-auto text-sm text-primary-700 hover:underline"> Forgot Password? </a>
      </div>

      <button
        type="submit"
        class="w-full rounded-md bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto"
      >
        Login to your account
      </button>

      <div class="text-sm font-medium text-gray-500">
        Don't have an account?
        <a href="/register" class="text-primary-700 hover:underline"> Create account </a>
      </div>
    </form>
  </div>
</div>
