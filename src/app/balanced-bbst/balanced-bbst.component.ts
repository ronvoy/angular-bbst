import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-balanced-bbst',
  templateUrl: './balanced-bbst.component.html',
  styleUrls: ['./balanced-bbst.component.css'],
  encapsulation: ViewEncapsulation.None, // Add this line
})
export class BalancedBbstComponent {
  inputCount = 0;
  arrayField: number[] = [];
  sortedArray: number[] = [];
  bstOutput = '';

  addInputField() {
    this.inputCount++;
    this.arrayField.push(null);
  }

  test() {
    this.sortedArray = [
      ...new Set(
        this.arrayField
          .filter((item) => item !== null)
          .map((item) => parseInt(item.toString()))
      ),
    ];
    this.sortedArray.sort((a, b) => a - b);
    this.bstOutput = this.node(this.sortedArray, 1);
  }

  private node(array: number[], level: number): string {
    const length = array.length;
    let output = '';

    if (length > 1) {
      const medianIndex = Math.floor((length + 1) / 2);
      const medianElement = array[medianIndex - 1];
      const leftElement = array.slice(0, medianIndex - 1);
      const rightElement = array.slice(medianIndex, length);

      if (level === 1) {
        output = `root element in level ${level} = ${medianElement}`;
      } else {
        output = `<br>node element in level ${level} = ${medianElement}`;
      }

      if (leftElement.length !== 0) {
        output += `<br>left element of ${level} = ${leftElement}`;
      }
      if (rightElement.length !== 0) {
        output += `<br>right element of level ${level} = ${rightElement}`;
      }
      output += `<br>`;

      level++;
      output += this.node(leftElement, level);
      output += this.node(rightElement, level);
    }

    return output;
  }
}
