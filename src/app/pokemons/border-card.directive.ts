import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';
  
@Directive({
  selector: '[pkmnBorderCard]'  //selecteur entre crochets -> directive d'attribut
})
export class BorderCardDirective 
{
    private initialColor: string = '#f5f5f5';   //couleur grise
    private defaultColor: string = '#009688';   //Couleur verte 
    private defaultHeight: number = 180;    //hauteur définie

    constructor(private el: ElementRef) 
    {
        this.setBorder(this.initialColor);  
        this.setHeight(this.defaultHeight);    
    }

    //Gestion de la couleur paramétrable du borderCard
    @Input('pkmnBorderCard') borderColor: string;   //alias

    //Gestion d'entrée de souris
    @HostListener('mouseenter') onMouseEnter()
    {
        this.setBorder(this.borderColor || this.defaultColor);  
    }

    //Gestion de sortie de souris
    @HostListener("mouseleave") onMouseLeave()
    {
        this.setBorder(this.initialColor);
    }
  
    private setBorder(color: string) 
    {
        let border = 'solid 4px ' + color;
        this.el.nativeElement.style.border = border;
    }
  
    private setHeight(height: number) 
    {
        this.el.nativeElement.style.height = height + 'px';
    }
}