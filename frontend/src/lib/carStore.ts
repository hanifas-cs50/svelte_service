import { get, writable } from 'svelte/store';

type Car = {
	id: number;
	brand: string;
	model: string;
	price: number;
};

let initialized = false;
export const cars = writable<Car[]>([]);

export async function initializeCars() {
	if (!initialized) {
		try {
			const res = await fetch('http://localhost:5000/cars');
			if (!res.ok) throw new Error('Failed to fetch cars');

			const data = await res.json();
			cars.set(data);
		} catch (err) {
			console.error('Error loading cars:', err);
		  throw new Error((err as Error).message);
		}
		initialized = true;
	}
}

export function getCar(id: number) {
	return get(cars).find((car) => car.id === id);
}

export async function addCar(model: string, brand: string, price: number) {
	const currCars = get(cars);
	const maxId = currCars.length > 0 ? Math.max(...currCars.map((c) => c.id)) : 0;

	try {
		const response = await fetch('http://localhost:5000/cars', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ model, brand, price })
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Server error: ', errorText);
			throw new Error(`Server error: ${errorText}`);
		}

		cars.update((currentCars) => {
			return [...currentCars, { id: maxId + 1, model, brand, price }];
		});
	} catch (err) {
		console.error('Error adding car:', err);
		throw new Error((err as Error).message);
	}
}

export async function editCar(id: number, model: string, brand: string, price: number) {
  try {
    const response = await fetch(
      `http://localhost:5000/cars/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, brand, price }),
      }
    );
    
		if (!response.ok) {
			const errorText = await response.text();
			console.error('Server error: ', errorText);
			throw new Error(`Server error: ${errorText}`);
		}

    cars.update((currentCars) =>
      currentCars.map((car) => (car.id === id ? { ...car, model, brand, price } : car))
    );
  } catch (err) {
    console.error('Error updating car: ', err);
		throw new Error((err as Error).message);
  }
}

export async function deleteCar(id: number) {
  try {    
    const response = await fetch(`http://localhost:5000/cars/${id}`, {
      method: "DELETE",
    });

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Server error: ', errorText);
			throw new Error(`Server error: ${errorText}`);
		}

    cars.update((currentCars) => currentCars.filter((car) => car.id !== id));
  } catch (err) {
    console.error('Error deleting car: ', err);
		throw new Error((err as Error).message);
  }
}
