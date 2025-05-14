## SUBSCRIBE Platform Assignmnet

# Sales Tax Calculator

A command-line application that calculates sales tax for a shopping basket and prints receipts. Built as part of a technical assignment.

## Problem Description

The application calculates sales tax based on the following rules:
- Basic sales tax of 10% applies to all goods, except:
  - Books
  - Food
  - Medical products
- Import duty of 5% applies to all imported goods with no exemptions
- Sales tax is rounded up to the nearest 0.05

## Setup

```bash
# Install dependencies
npm install
```

## Usage

Run the application:
```bash
npm start
```

Follow the interactive prompts to:
1. Enter item quantity
2. Enter item name
3. Enter item price
4. Select item category*
5. Choose to add more items or complete the basket

The application will then display a receipt showing:
- Items with their quantities and prices including tax
- Total sales tax
- Total amount

## Testing

Run the test suite:
```bash
npm test
```

### Assumptions and Considerations

**Obviously this isn't a fool proof solution, the application assumes the user will sensibly categorise the object according to it's correct category, as well as it assumes the user will correctly identify an object as imported, when adding items*

*Given more time, a solution to determine the category based on the items name could be developed, but I felt that was out of the scope (as it would likely require external libraries or AI), and a lot more than would be required for this assessment*  
