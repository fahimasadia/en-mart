import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

interface iProduct {
    name: string;
    info: { size: string, price: string }[];
    img: string[];
    tags: string[];
    searchString: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'E-N MART';
    products: iProduct[] = [];
    filteredProducts: iProduct[] = [];

    lastSearchKey: string = '';
    searchTimeout: any;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getAll().subscribe(res => {
            res.split('\n').forEach(product => {
                const [name, info, img, tags] = product.split(',');
                this.products.push({
                    name: name,
                    info: info.split('&&').map(d => {
                        const [s, p] = d.split('-');
                        return { size: s, price: p };
                    }),
                    img: img.split('&&'),
                    tags: tags.split('&&'),
                    searchString: name + ' ' + info.replace(/&&/g, ' ') + ' ' + tags.replace(/&&/g, ' ')
                });
            });
            this.filteredProducts = [...this.products];
        });
    }

    search(key: string) {
        if (key.length < 3) {
            key = '';
        }

        if (key != this.lastSearchKey) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.lastSearchKey = key;
                this.filteredProducts = this.products.filter(product => {
                    return product.searchString.indexOf(key) != -1;
                });
            }, 500);
        }
    }
}
