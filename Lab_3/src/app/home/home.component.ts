import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    foodForm: FormGroup;
    item;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) { }
    
    ngOnInit() {
        this.foodForm = this.formBuilder.group({
            FoodItem: ['', Validators.required]
        });
    }

    onSubmit() {
        const base = 'https://api.nutritionix.com/v1_1/search/';
        const food = this.foodForm.controls.FoodItem.value + '?results=0:1&fields=*';
        const appID = '&appId=0f5ef57a';
        const apiKey = '&appKey=338b625f882a2a2bb7e8eaada93afd45';
        this.http.get(base + food + appID + apiKey)
            .subscribe((data: any) => this.item = {
                name: data.hits[0].fields.item_name,
                calories:  data.hits[0].fields.nf_calories,
                weight: data.hits[0].fields.nf_serving_weight_grams
            });
    }
}