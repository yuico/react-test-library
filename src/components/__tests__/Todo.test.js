import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Todo from '../Todo'

afterEach(() => {
  cleanup();
})

test('should render completed todo component', () => {
  const todo = {id:1, title: "title1", completed: true}
  render(<Todo todo={todo} />);

  const todoElement = screen.getByTestId('todo-1');
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent('title1');
  expect(todoElement).toContainHTML('<div data-testid="todo-1"><strike><h1>todo - title1</h1></strike></div>');
});

test('should render non-completed todo component', () => {
  const todo = {id:2, title: "title2", completed: false}
  render(<Todo todo={todo} />);

  const todoElement = screen.getByTestId('todo-2');
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent('title2');
  expect(todoElement).not.toContainHTML('<strike>');
});

test('matches snapshot', () => {
  const todo = {id: 3, title: 'title3', completed: false}
  const tree = renderer.create(<Todo todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
})

