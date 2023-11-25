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
    this.bstOutput = this.node(array, 1);
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
