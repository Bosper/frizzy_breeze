import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { Album } from './album.class';
import { Photo } from './photo.class';
import { AlbumCategory } from './category.class';
import { Navigation } from './navigation.class'

export class InMemoryData implements InMemoryDbService {

    createDb() {
        let albums: Album[] = [
            { id: 1, title: "Lazure Coast", photoId: [1, 2, 3], start: true, category: 1, desc: "Lorem Ipsum dolor sit amet", order: 7, active: true },
            { id: 2, title: "Dark Inside", photoId: [7], start: true, category: 2, desc: "Consectetur adipiscing elit", order: 6, active: true },
            { id: 3, title: "Powerfull", photoId: [5, 6], start: true, category: 1, desc: "Sed do eiusmod tempor", order: 8, active: true },
            { id: 4, title: "On the Sea", photoId: [1, 4, 2], start: true, category: 2, desc: "Incididunt ut labore et dolore", order: 4, active: true },
            { id: 5, title: "Memories of Past", photoId: [5, 3], start: false, category: 1, desc: "Ut enim ad minim veniam", order: 3, active: true },
            { id: 6, title: "Far Away", photoId: [2, 7], start: true, category: 2, desc: "Quis nostrud exercitation ullamco", order: 2, active: true },
            { id: 7, title: "Greek Demigod", photoId: [5, 3], start: false, category: 1, desc: "Laboris nisi ut aliquip ex ea commodo", order: 1, active: true },
            { id: 8, title: "Places of Doom", photoId: [1, 2, 4, 7], start: true, category: 3, desc: "At vero eos et accusamus et iusto", order: 5, active: true }
        ];

        let photos: Photo[] = [
            { id: 1, order: 1, active: true, url: "Numer raz" },
            { id: 2, order: 2, active: true, url: "Numer dwa" },
            { id: 3, order: 3, active: true, url: "Numer trzy" },
            { id: 4, order: 4, active: true, url: "Numer cztery" },
            { id: 5, order: 5, active: true, url: "Numer pięć" },
            { id: 6, order: 6, active: true, url: "Numer sześć" },
        ];

        let navigation: Navigation[] = [
            { id: 1, title: "portrait", url: "/portrait", active: false, display: true, category: 1 },
            { id: 2, title: "editorial", url: "/editorial", active: false, display: true, category: 2 },
            { id: 99, title: "vision", url: "/editorial", active: false, display: true, category: 3 }
        ]

        return { albums, photos, navigation }
    }
}