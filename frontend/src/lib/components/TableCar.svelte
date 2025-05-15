<script lang="ts">
  import type { Car } from "$lib/store/carStore";

  let {
    filteredCars,
    deleteCar,
    deleteStatus = $bindable(),
    editData = $bindable(),
    editSuccess,
  }: {
    filteredCars: Car[];
    deleteCar: (carId: number) => void;
    deleteStatus: { loading: boolean; success: boolean; error: string };
    editData: Car;
    editSuccess: boolean;
  } = $props();
</script>

<table class="max-w-md w-full mb-4 border border-collapse">
  <thead>
    <tr>
      <th class="p-2 border">No.</th>
      <th class="p-2 border">Brand</th>
      <th class="p-2 border">Model</th>
      <th class="p-2 border">Price</th>
      <th class="p-2 border" colspan="2">Action</th>
    </tr>
  </thead>
  <tbody>
    {#each filteredCars as car, i (car.id)}
      <tr
        class={editData.id === car.id
          ? "*:text-white *:bg-zinc-500 *:border-zinc-600"
          : ""}
      >
        <td class="p-2 border text-center">{i + 1}</td>
        <td class="p-2 border">{car.brand}</td>
        <td class="p-2 border">{car.model}</td>
        <td class="p-2 border">{car.price}</td>
        <td class="w-16 border">
          {#if editData.id === car.id}
            <button
              class="w-full py-2 font-medium text-white bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer"
              type="button"
              onclick={() =>
                (editData = { id: 0, brand: "", model: "", price: 0 })}
              >Cancel</button
            >
          {:else}
            <button
              class="w-full py-2 font-medium text-white bg-blue-500/80 hover:bg-blue-500/90 cursor-pointer"
              type="button"
              onclick={() => (editData = { ...car })}>Edit</button
            >
          {/if}
        </td>
        <td class="w-16 border">
          <button
            class="w-full py-2 font-medium text-white bg-red-500/80 hover:bg-red-500/90 cursor-pointer"
            type="button"
            onclick={() => deleteCar(car.id)}
            disabled={editData.id === car.id}>Delete</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>

{#if deleteStatus.error.length > 0}
  <div
    class="max-w-md w-full p-2 mb-4 flex justify-between items-center font-medium rounded bg-red-500/90"
  >
    Error: {deleteStatus.error}
    <button
      class="cursor-pointer"
      type="button"
      aria-label="close"
      onclick={() => (deleteStatus.error = "")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
{/if}

{#if deleteStatus.success}
  <div
    class="max-w-md w-full p-2 mb-4 flex justify-between items-center font-medium rounded bg-yellow-500/90"
  >
    Car deleted
    <button
      class="cursor-pointer"
      type="button"
      aria-label="close"
      onclick={() => (deleteStatus.success = false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
{/if}

{#if editSuccess}
<div
  class="max-w-md w-full p-2 flex justify-between items-center text-white font-medium rounded bg-green-500"
>
  Edited Successfully
  <button
    class="cursor-pointer"
    type="button"
    aria-label="close"
    onclick={() => (editSuccess = false)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="3"
      stroke="currentColor"
      class="size-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  </button>
</div>
{/if}