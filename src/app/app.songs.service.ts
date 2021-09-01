import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { interval, Subject, Subscription } from 'rxjs';
import { ISongs, ISong } from "./app.interfaces";

@Injectable()
export class Songs {
    public get: Subject<ISongs>;
    private interval: Subscription;

    constructor(private http: HttpClient) {
        this.get = new Subject<ISongs>();
        this.getSongs();
        this.interval = interval(5000).subscribe(() => this.getSongs());
    }

    ngOnDestroy() {
        this.interval.unsubscribe();
    }

    private getSongs(): void {
        this.http.get('http://localhost:4200/eska_api/combine.jsonp?callback=jsonp', {responseType: 'text'}).subscribe(data => {
            const songDetails: string = data.slice('jsonp('.length, -2);
            const jsonResponseData: any = JSON.parse(songDetails);
            const eskaRockSongs: JSON = jsonResponseData['108']['songs'];

            const current: ISong = this.parseSongFromJson(eskaRockSongs[0]);
            current.image = current.image.replace('ru-0-ra-200,200-n', 'ru-1-r-512,512-n');
            const last: ISong = this.parseSongFromJson(eskaRockSongs[1]);
            
            console.log(`Current: ${current.artist}, ${current.image}`);
            console.log(`Last: ${last.artist}, ${last.image}`);

            this.get.next({
              current,
              last
            });
        });
    }

    private parseSongFromJson(json: string): ISong {
        return {
            image: json['images']['200x200'],
            artist: json['artists'][0]['name'],
            song: json['name']
        }
    }
}
