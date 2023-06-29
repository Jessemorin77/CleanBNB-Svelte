<script lang="ts">
  import avatar from "gradient-avatar";
  export let email: string;
  export let size: number;

  const userAvatar = (email: string) => avatar(email, size);
</script>

<div class="overflow-clip rounded-full">
  {@html userAvatar(email)}
</div>
