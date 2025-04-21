import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  // the css class open is attached if opened is true else it is not attached to the tag element
  @HostBinding('class.open')
  opened = false;

  // listen to the click event on the host element to update the opened property
  @HostListener('click')
  toggleOpen() {
    this.opened = !this.opened;
  }

}
