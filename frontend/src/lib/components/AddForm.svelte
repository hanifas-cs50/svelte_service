<script lang="ts">
  let {
    addCar,
    addStatus = $bindable(),
  }: {
    addCar: (newCar: {
      model: string;
      brand: string;
      price: number;
    }) => Promise<void>;
    addStatus: { loading: boolean; success: boolean; error: string };
  } = $props();
  let model = $state("");
  let brand = $state("");
  let price = $state(0);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!brand.trim() || !model.trim()) {
      addStatus.error = "All fields are required.";
      return;
    }

    if (isNaN(price) || price <= 0) {
      addStatus.error = "Price must be a positive number.";
      return;
    }

    const payload = {
      model: model.trim(),
      brand: brand.trim(),
      price: Number(price),
    };
    addCar(payload);

    model = "";
    brand = "";
    price = 0;
  }
</script>

<form class="max-w-md w-full p-4 rounded shadow" onsubmit={onSubmit}>
  <h1 class="text-center text-xl font-bold">Add Car</h1>
  <div class="mb-4 grid">
    <label class="font-medium" for="model">Model :</label>
    <input
      class="px-2 py-1.5 mt-0.5 outline-none border-b-2 hover:border-blue-500 focus:border-blue-500 rounded-t bg-zinc-100 focus:bg-zinc-200/70"
      autocomplete="off"
      type="text"
      name="model"
      id="model"
      bind:value={model}
      required
    />
  </div>
  <div class="mb-4 grid">
    <label class="font-medium" for="brand">Brand :</label>
    <input
      class="px-2 py-1.5 mt-0.5 outline-none border-b-2 hover:border-blue-500 focus:border-blue-500 rounded-t bg-zinc-100 focus:bg-zinc-200/70"
      autocomplete="off"
      type="text"
      name="brand"
      id="brand"
      bind:value={brand}
      required
    />
  </div>
  <div class="mb-4 grid">
    <label class="font-medium" for="price">Price :</label>
    <input
      class="px-2 py-1.5 mt-0.5 outline-none border-b-2 hover:border-blue-500 focus:border-blue-500 rounded-t bg-zinc-100 focus:bg-zinc-200/70"
      autocomplete="off"
      type="number"
      name="price"
      id="price"
      bind:value={price}
      min="1"
      max="9999"
      required
    />
  </div>
  <button
    class="w-full p-2 mb-2 text-white font-medium rounded bg-blue-500/90 hover:bg-blue-500"
    type="submit"
    disabled={addStatus.loading}
  >
    {#if addStatus.loading}
      <span class="animate-spin mr-2">⏳</span> Submitting...
    {:else}
      Submit
    {/if}
  </button>

  {#if addStatus.error.length > 0}
    <div
      class="w-full p-2 flex justify-between items-center text-white font-medium rounded bg-red-500"
    >
      Error: {addStatus.error}
      <button
        class="cursor-pointer"
        type="button"
        aria-label="close"
        onclick={() => (addStatus.error = "")}
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
  {#if addStatus.success}
    <div
      class="w-full p-2 flex justify-between items-center text-white font-medium rounded bg-green-500"
    >
      Sent Successfully
      <button
        class="cursor-pointer"
        type="button"
        aria-label="close"
        onclick={() => (addStatus.success = false)}
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
</form>
