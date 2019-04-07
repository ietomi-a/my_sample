let nextTodoId = 0;
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};


// export function print_nextTodoId() {
//   console.log("nextTodoId = ", nextTodoId );
// }
