<script lang="ts">
  import { onMount } from "svelte";
  import type { Car } from "$lib/store/carStore";
  import AddForm from "$lib/components/AddForm.svelte";
  import TableCar from "$lib/components/TableCar.svelte";
  import EditForm from "$lib/components/EditForm.svelte";

  let cars = $state<Car[]>([]);
  let searchQuery = $state("");
  let filteredCars = $derived.by<Car[]>(() =>
    cars.filter(
      (car) =>
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  let carsLoad = $state(false);
  let carsError = $state("");

  let addStatus = $state({
    loading: false,
    success: false,
    error: "",
  });
  let deleteStatus = $state({
    loading: false,
    success: false,
    error: "",
  });
  let editData: Car = $state({ id: 0, brand: "", model: "", price: 0 });
  let editStatus = $state({
    loading: false,
    success: false,
    error: "",
  });

  async function addCar(newCar: {
    model: string;
    brand: string;
    price: number;
  }): Promise<void> {
    addStatus.loading = true;
    let lastId: number = 0;

    if (cars.length > 0) {
      lastId = cars[cars.length - 1].id;
    }

    try {
      const response = await fetch("http://localhost:5000/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });

      if (!response.ok) {
        const errorText = await response.text();
        addStatus.error = `Server error: ${errorText}`;
        return;
      }

      cars.push({
        id: lastId + 1,
        brand: newCar.brand,
        model: newCar.model,
        price: newCar.price,
      });
      addStatus.error = "";
      addStatus.success = true;
    } catch (error) {
      addStatus.error = `Network error: ${(error as Error).message}`;
    } finally {
      addStatus.loading = false;
    }
  }

  async function editCar(updatedCar: Car): Promise<void> {
    editStatus.loading = true;
    const index = cars.findIndex((car) => car.id === updatedCar.id);
    try {
      const response = await fetch(
        `http://localhost:5000/cars/${updatedCar.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCar),
        }
      );

      editStatus.error = "";
      editStatus.success = true;
    } catch (error) {
      editStatus.error = `Network error: ${(error as Error).message}`;
    } finally {
      editStatus.loading = false;
    }
    cars[index] = updatedCar;
  }

  async function deleteCar(carId: number): Promise<void> {
    deleteStatus.loading = true;
    // console.log(carId);
    try {
      const response = await fetch(`http://localhost:5000/cars/${carId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        deleteStatus.error = `Server error: ${errorText}`;
        return;
      }

      cars = cars.filter((car) => car.id !== carId);
      deleteStatus.error = "";
      deleteStatus.success = true;
    } catch (error) {
      deleteStatus.error = `Network error: ${(error as Error).message}`;
    } finally {
      deleteStatus.loading = false;
    }
  }

  async function loadCars(): Promise<void> {
    carsLoad = true;
    carsError = "";

    try {
      const res = await fetch("http://localhost:5000/cars");
      if (!res.ok) throw new Error("Failed to fetch cars");

      const data = await res.json();
      cars = data;
    } catch (err) {
      cars = [];
      carsError = (err as Error).message;
      console.error("Error loading cars:", err);
    } finally {
      carsLoad = false;
    }
  }

  onMount(() => {
    loadCars();
  });
</script>

<div class="min-h-screen pt-8 flex flex-col items-center">
  <h1 class="mb-8 text-center text-3xl font-bold">CARS</h1>
  <input
    class="max-w-md w-full mb-4 p-4 rounded shadow"
    type="text"
    name="search"
    id="search"
    placeholder="Search by car brand or model..."
    bind:value={searchQuery}
  />
  {#if carsLoad}
    <div class="text-gray-600">Loading cars...</div>
  {:else if carsError}
    <div class="text-red-600">Error: {carsError}</div>
    <button
      class="underline text-blue-500/80 hover:text-blue-500 cursor-pointer"
      onclick={() => loadCars()}
      type="button">Reload</button
    >
  {:else if filteredCars.length === 0}
    <div class="text-gray-500">No cars found.</div>
  {:else}
    <TableCar
      {filteredCars}
      {deleteCar}
      bind:deleteStatus
      bind:editData
      editSuccess={editStatus.success}
    />
  {/if}
  {#if editData.id === 0}
    <AddForm {addCar} bind:addStatus />
  {:else}
    <EditForm {editCar} bind:editData bind:editStatus />
  {/if}
</div>
