export default class SwapiService {
	_apiBase = 'https://swapi.py4e.com/api//';

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`);
		}
		const body = await res.json();
		return body;
	}

	async getAllPeople() {
		const res = await this.getResource(`/people/`);
		return res.results;
	}

	async getPerson(id) {
		const person = await this.getResource(`/people/${id}`);
		return this._transformPlanet(person);
	}

	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);
		return res.results;
	}

	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}`);
		return this._transformPlanet(planet);
	}

	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results.map(this._transformPlanet);
	}

	async getStarship(id) {
		const starship = await this.getResource(`/starships/${id}`);
		return this._transformPlanet(starship);
	}

	_extractId(item) {
		const idRegExp = /\/([0-9]*)\/$/;
		return item.url.match(idRegExp[1]);
	}

	_transformPlanet(planet) {
		return {
			id: this._extractId(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period,
			diameter: planet.diameter,
		};
	}
	_transformStarship(starship) {
		return {
			id: this._extractId(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.costInCredits,
			length: starship.length,
			crew: starship.crew,
			passengers: starship.passengers,
			cargoCapacity: starship.cargoCapacity,
		};
	}
	_transformPerson(person) {
		return {
			id: this._extractId(person),
			name: person.name,
			gender: person.gender,
			birthYear: person.birthYear,
			eyeColor: person.eyeColor,
		};
	}
}
