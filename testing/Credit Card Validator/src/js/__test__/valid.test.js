import { luhnAlgorithm, validateNumber } from '../validate';

test.each([
  ['validate card number', '4556778484372066', 'visa'],
  ['validate card number', '375014506496098', 'american-express'],
  ['validate card number', '5291692720355644', 'master-card'],
  ['validate card number', '3531946832734871', 'jcb'],
  ['validate card number', '5893665490624094', 'maestro'],
  ['validate card number', '6011248675596794', 'discover'],
  ['validate card number', '2200219717921688', 'mir'],
  ['validate card number', null, false],
])(('it should be %s'), (_, input, expected) => {
  expect(validateNumber(input)).toBe(expected);
});

test.each([
  ['validate algorithm luhna', '2200219717921688', true],
  ['validate algorithm luhna', '77777777777', false],
])(('it should be %s'), (_, input, expected) => {
  expect(luhnAlgorithm(input)).toBe(expected);
});
