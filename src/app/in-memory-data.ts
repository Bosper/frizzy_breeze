import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryData implements InMemoryDbService {
    createDb() {
        let albums = [
            { id: 1, title: "Editorial", photoId: [1, 2, 3] },
            { id: 2, title: "Advertisment", photoId: [7] },
            { id: 3, title: "Nude", photoId: [5, 6] },
            { id: 4, title: "Personal", photoId: [1, 4, 2] }
        ];

        let photos = [
            { id: 1, order: 1, active: true, url: "Numer raz" },
            { id: 2, order: 2, active: true, url: "Numer dwa" },
            { id: 3, order: 3, active: true, url: "Numer trzy" },
            { id: 4, order: 4, active: true, url: "Numer cztery" },
            { id: 5, order: 5, active: true, url: "Numer pięć" },
            { id: 6, order: 6, active: true, url: "Numer sześć" },
            { id: 7, order: 7, active: true, url: "Numer siedem" }
        ];

        return { albums, photos }
    }
}