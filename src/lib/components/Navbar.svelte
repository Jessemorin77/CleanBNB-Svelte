<script lang="ts">
  import User from "carbon-icons-svelte/lib/User.svelte";
  import TextMiningApplier from "carbon-icons-svelte/lib/TextMiningApplier.svelte";

  import { clickOutside } from "$lib/utils";
  import { site } from "$lib/config";
  import clsx from "clsx";
  import Avatar from "./Avatar.svelte";
  import { Hexagon } from "lucide-svelte";

  export let user: App.Locals["user"];
  // Menu toggle action
  let showMenu = false;
</script>

<nav class="fixed z-30 w-full border-b border-gray-200 bg-white">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="ml-2 flex items-center justify-start">
        <a href="/" class="flex items-center space-x-2">
          <Hexagon />
          <span class="text-md self-center whitespace-nowrap font-semibold"> Flowbite </span>
        </a>
      </div>
      <div class="flex items-center">
        <!-- Profile -->
        <div class="relative ml-3 flex items-center">
          <div>
            <button
              type="button"
              class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300"
              id="user-menu-button-2"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-2"
              use:clickOutside={() => {
                showMenu = false;
              }}
              on:click={() => {
                showMenu = !showMenu;
              }}
            >
              <span class="sr-only">Open user menu</span>
              <Avatar email={user.email} size={32} />
            </button>
          </div>
          <!-- Dropdown menu -->
          <div
            class={clsx(
              "fixed right-5 top-9 z-50 my-4 list-none divide-y divide-gray-100 rounded border bg-white text-base shadow-lg",
              {
                visible: showMenu,
                invisible: !showMenu,
              }
            )}
            id="dropdown-2"
          >
            <div class="px-4 py-3" role="none">
              <!-- <p class="text-sm text-gray-900" role="none">
                {user.email}
              </p> -->
              <p class="truncate text-sm font-medium text-gray-900" role="none">
                {user.email}
              </p>
            </div>
            <ul class="py-1" role="none">
              <li>
                <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
                  >Settings</a
                >
              </li>
              <li>
                <a href="/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
                  >Log out</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
