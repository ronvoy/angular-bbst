import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-balanced-bbst',
  templateUrl: './balanced-bbst.component.html',
  styleUrls: ['./balanced-bbst.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BalancedBbstComponent {
  inputCount = 0;
  arrayField: number[] = [];
  sortedArray: number[] = [];
  bstOutput = '';
  updateButtonText = '';

  ngOnInit(): void {
    console.log('Balanced BBST component initialized');
  }

  addInputField() {
    console.log('addInputField called');
    this.inputCount++;

    // Create a new array element in arrayField
    this.arrayField.push(null);

    // Get the reference to the container element in Angular
    const container = document.getElementById('input-container');

    // Create a new div element
    const inputFieldDiv = document.createElement('div');

    // Create a new input element
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.name = `input-${this.inputCount}`;

    // Create a new delete button element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    // Add a click event listener to the delete button
    deleteButton.addEventListener('click', () => {
      // Remove the input field div when the delete button is clicked
      container.removeChild(inputFieldDiv);

      // Also, remove the corresponding element from arrayField
      this.arrayField.splice(this.arrayField.indexOf(null), 1);
    });

    // Append the input field and delete button to the div
    inputFieldDiv.appendChild(inputField);
    inputFieldDiv.appendChild(deleteButton);

    // Append the div to the container
    container.appendChild(inputFieldDiv);
  }

  test() {
    const inputContainer = document.getElementById('input-container');
    const arrField = [];
    const inputFields = inputContainer.querySelectorAll('input');
    inputFields.forEach(function (inputField) {
      arrField.push(inputField.value);
    });

    // Assuming you have a button with an id 'submit' in your Angular template
    // Use Angular binding to update the button text
    // e.g., <button id="submit" [textContent]="updateButtonText"></button>
    this.updateButtonText = 'Update Value';

    let array = arrField.map(function (item) {
      return parseInt(item);
    });

    const uniqarray = [...new Set(array)];
    array = uniqarray;

    array.sort(function (a, b) {
      return a - b;
    });

    // Use Angular binding to update the sorted array
    this.sortedArray = array;

    // Call the node function and update the bstOutput
    this.bstOutput = this.node(array, 1, 0, 0);
    this.createBinaryTreeTable(array);
  }

  private node(
    array: number[],
    level: number,
    direction: number,
    previousMedianElement: number
  ): string {
    const length = array.length;
    let output = '';

    // Example (even number of elements):
    // [5,6,7,3,4,2,1,8,9,10].sort
    // [1,2,3,4,5,6,7,8,9,10].length = 10
    // [1,2,3,4,5,6,7,8,9,10].medianIndex = 5
    // [1,2,3,4,5,6,7,8,9,10].medianElement = 6
    // [1,2,3,4,5,6,7,8,9,10].leftElement = [1,2,3,4,5]
    // [1,2,3,4,5,6,7,8,9,10].rightElement = [7,8,9,10]

    // Example (odd number of elements):
    // [5,6,7,3,4,2,1,8,9].sort
    // [1,2,3,4,5,6,7,8,9].length = 9
    // [1,2,3,4,5,6,7,8,9].medianIndex = 4
    // [1,2,3,4,5,6,7,8,9].medianElement = 5
    // [1,2,3,4,5,6,7,8,9].leftElement = [1,2,3,4]
    // [1,2,3,4,5,6,7,8,9].rightElement = [6,7,8,9]

    if (length > 1) {
      const medianIndex = Math.floor((length + 1) / 2);
      const medianElement = array[medianIndex - 1];
      const leftElement = array.slice(0, medianIndex - 1);
      const rightElement = array.slice(medianIndex, length);

      if (level == 1 && direction == 0) {
        output = `root element in level ${level} = ${medianElement}`;
      } else {
        if (direction == -1) {
          output = `<br>level ${level}: left node of ${previousMedianElement} = ${medianElement}`;
        }
        if (direction == 1) {
          output = `<br>level ${level}: right node of ${previousMedianElement} = ${medianElement}`;
        }
      }

      if (leftElement.length == 0) {
        output += `<br>left part of element ${medianElement} = N/A`;
      } else {
        output += `<br>left part of element ${medianElement} = ${leftElement}`;
      }

      if (rightElement.length == 0) {
        output += `<br>right part of element ${medianElement} = N/A`;
      } else {
        output += `<br>right part of element ${medianElement} = ${rightElement}`;
      }

      output += `<br>`;
      level++;
      output += this.node(leftElement, level, -1, medianElement);
      output += this.node(rightElement, level, 1, medianElement);
    } else if (length == 1 && level == 1) {
      output = `<br><br>root element in level ${level} = ${array[0]}`;
    } else if (length == 0 && level == 1) {
      output = `<br><br>root element in level ${level} = null`;
    }

    return output;
  }

  private createBinaryTreeTable(array: number[]): HTMLTableElement {
    const table = document.createElement('table');
    const levels = Math.ceil(Math.log2(array.length + 1)); // Calculate the number of levels

    for (let i = 0; i < levels; i++) {
      const row = table.insertRow();

      for (let j = 0; j < Math.pow(2, i); j++) {
        const cell = row.insertCell();
        const index = Math.pow(2, i) - 1 + j;

        if (index < array.length) {
          cell.textContent = array[index].toString(); // Convert number to string
          const colspan = Math.pow(2, levels - i - 1);
          cell.colSpan = colspan;
        }
      }
    }

    return table;
  }
}
