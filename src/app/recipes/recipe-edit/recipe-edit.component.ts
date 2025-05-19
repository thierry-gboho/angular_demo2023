import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id!: number | null;
  editMode!: boolean;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const idString = params['id'];
        if (idString != null) {
          this.editMode = true;
          this.id = null;
        } else {
          this.editMode = false;
          this.id = +idString;
        }
        console.log('EditMode: ' + this.editMode);
      }
    )
  }

}
