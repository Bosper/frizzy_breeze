import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { Album } from './album.class';
import { Photo } from './photo.class';
import { AlbumCategory } from './category.class';
import { Navigation } from './navigation.class'

export class InMemoryData implements InMemoryDbService {

    createDb() {
        let albums: Album[] = [
            { id: 1, title: "Editorial", photoId: [1, 2, 3], start: true, category: 1 },
            { id: 2, title: "Advertisment", photoId: [7], start: true, category: 2 },
            { id: 3, title: "Nude", photoId: [5, 6], start: true, category: 1 },
            { id: 4, title: "Personal", photoId: [1, 4, 2], start: true, category: 2 },
            { id: 4, title: "Vision", photoId: [5, 3], start: false, category: 1 },
            { id: 4, title: "Places", photoId: [2, 7], start: true, category: 2 },
            { id: 4, title: "Portrait", photoId: [5, 3], start: false, category: 1 }
        ];

        let photos: Photo[] = [
            { id: 1, order: 1, active: true, url: "Numer raz" },
            { id: 2, order: 2, active: true, url: "Numer dwa" },
            { id: 3, order: 3, active: true, url: "Numer trzy" },
            { id: 4, order: 4, active: true, url: "Numer cztery" },
            { id: 5, order: 5, active: true, url: "Numer pięć" },
            { id: 6, order: 6, active: true, url: "Numer sześć" },
            { id: 7, order: 7, active: true, url: "Numer siedem" }
        ];

        let categories: AlbumCategory[] = [
            { id: 1, title: "Portraits" },
            { id: 2, title: "Editorial" }
        ];

        let navigation: Navigation[] = [
            { id: 1, title: "portrait", url: "/portrait", active: false, display: true, category: 1 },
            { id: 2, title: "editorial", url: "/editorial", active: false, display: true, category: 2 },
        ]

        return { albums, photos, categories, navigation }
    }
}