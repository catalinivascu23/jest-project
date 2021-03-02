import loans from '../data';

test('the loans data is correct', () => {
  expect(loans).toMatchSnapshot();
  expect(loans).toHaveLength(4);
  expect(loans.map(loans => loans.name)).toEqual([
    'HVAC loan',
    'Solar loan',
    'Battery loan',
    'Roofing loan',
  ]);
});

for (let i = 0; i < loans.length; i += 1) {
  it(`loan[${i}] should have properties (id, name, amount)`, () => {
    expect(loans[i]).toHaveProperty('id');
    expect(loans[i]).toHaveProperty('name');
    expect(loans[i]).toHaveProperty('amount');
  });
}

// default jest mock function
test('mock implementation of a basic function', () => {
  const mock = jest.fn(() => 'I am a mock function');

  expect(mock('Calling my mock function!')).toBe('I am a mock function');
  expect(mock).toHaveBeenCalledWith('Calling my mock function!');
});

// mock the return value and test calls
test('mock return value of a function one time', () => {
  const mock = jest.fn();

  // we can chain these!
  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('there!');

  mock(); // first call 'Hello'
  mock(); // second call 'there!'

  expect(mock).toHaveBeenCalledTimes(2); // we know it's been called two times

  mock('Hello', 'there', 'Steve'); // call it with 3 different arguments
  expect(mock).toHaveBeenCalledWith('Hello', 'there', 'Steve');

  mock('Steve'); // called with 1 argument
  expect(mock).toHaveBeenLastCalledWith('Steve');
});

// mock the return value
test('mock implementation of a function', () => {
  const mock = jest.fn().mockImplementation(() => 'mock test');
  expect(mock('mockParam')).toBe('mock test');
  expect(mock).toHaveBeenCalledWith('mockParam');
});

// spying on a single function of an imported module, we can spy on its usage
// by default the original function gets called
test('spying using original implementation', () => {
  const loan = {
    name: n => `Loan name: ${n}`,
  };
  const spy = jest.spyOn(loan, 'name');
  expect(loan.name('HVAC')).toBe('Loan name: HVAC');
  expect(spy).toHaveBeenCalledWith('HVAC');
});

// we can mock the implementation of a function from a module
test('spying using mockImplementation', () => {
  const loan = {
    name: n => `Loan name: ${n}`,
  };
  const spy = jest.spyOn(loan, 'name');
  spy.mockImplementation(n => `Loan funded`);

  expect(loan.name('Roofing')).toBe('Loan funded');
  spy.mockRestore(); // back to original implementation
  expect(loan.name('Roofing')).toBe('Loan name: Roofing');
});

test('loan returns Battery loan last', () => {
  const loan1 = loans[0];
  const loan2 = loans[1];
  const loan3 = loans[2];
  const loan = jest.fn(currentLoan => currentLoan.name);

  loan(loan1); // hvac loan
  loan(loan2); // solar loan
  loan(loan3); // battery loan

  expect(loan).toHaveLastReturnedWith('Battery loan');
});

test('loan data is Roofing loan and matches as an object', () => {
  const roofingLoan = {
    id: 4,
    name: 'Roofing loan',
    amount: 20000
  };
  expect(loans[3]).toMatchObject(roofingLoan);
});

// async example, always return a promise (can switch out resolves with reject)
test('expect a promise to resolve', async () => {
  const user = {
    getFullName: jest.fn(() => Promise.resolve('Joe Doe')),
  };
  await expect(user.getFullName('Joe Doe')).resolves.toBe('Joe Doe');
});

test('expect a promise to reject', async () => {
  const user = {
    getFullName: jest.fn(() =>
      Promise.reject(new Error('Something went wrong'))
    ),
  };
  await expect(user.getFullName('Joe Doe')).rejects.toThrow(
    'Something went wrong'
  );
});
