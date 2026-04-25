import { Component, Inject, ElementRef, ViewChild  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent { 



  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  selectDivContent(): void {
    const range = document.createRange();
    const contentDiv = document.getElementById("contentPop");
    
    if (contentDiv) {
        range.selectNodeContents(contentDiv);
        const selection = window.getSelection();
        
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);

            try {
              document.execCommand("copy");
              console.log("Content copied to clipboard with formatting!");
          } catch (err) {
              console.error("Failed to copy content: ", err);
          }
        }
    } else {
        console.error("Element with id 'contentToSelect' not found.");
    }
}
  
}
