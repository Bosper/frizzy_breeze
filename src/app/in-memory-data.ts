import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryData implements InMemoryDbService {
    createDb() {
        let albums = [
            { id: 1, title: "Editorial", photoId: [1, 2, 3] },
            { id: 1, title: "Advertisment", photoId: [4] },
            { id: 1, title: "Nude", photoId: [2] },
            { id: 1, title: "Personal", photoId: [3, 4] }
        ];

        let photos = [
            { id: 1, order: 1, active: true, url: "Numer raz" },
            { id: 2, order: 2, active: true, url: "Numer dwa" },
            { id: 3, order: 3, active: true, url: "Numer trzy" }
        ];

        return { albums, photos }
    }
}