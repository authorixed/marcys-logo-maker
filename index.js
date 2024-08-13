const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo text:',
    validate: (input) => input.length <= 3 || 'Text must be three characters or less.',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hexadecimal):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['Triangle', 'Circle', 'Square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hexadecimal):',
  },
];

inquirer.prompt(questions).then((answers) => {
  let shape;

  switch (answers.shape) {
    case 'Triangle':
      shape = new Triangle();
      break;
    case 'Circle':
      shape = new Circle();
      break;
    case 'Square':
      shape = new Square();
      break;
  }

  shape.setColor(answers.shapeColor);

  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
  ${shape.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">
    ${answers.text}
  </text>
</svg>`;

  fs.writeFileSync('logo.svg', svgContent.trim());
  console.log('Generated logo.svg');
});
