import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

    storeUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9EiNFIAuSbrCCBQO8_eJgcsra1a1Jy9WyiI79Z-yhQJEvOjn-aBhFSJ2uSHQDOWJ3UwvuU95ufaFs/pub?output=csv';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.storeUrl, {responseType: 'text'});
    }
}
