import { Pipe, PipeTransform } from '@angular/core';
import { Album } from '../app/album.class';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform( array: Array<Album> ) {
        array.sort((a: any, b: any) => {
            if (a.order < b.order) {
                return -1;
            } else if (a.order > b.order) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
