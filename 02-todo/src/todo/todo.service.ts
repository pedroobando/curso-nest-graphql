import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Espacio', done: true },
    { id: 3, description: 'Piedra del Poder', done: false },
    { id: 4, description: 'Piedra del Realidad', done: false },
    { id: 5, description: 'Piedra del Mente', done: true },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.done).length;
  }

  get pendingTodos(): number {
    return this.todos.filter((todo) => !todo.done).length;
  }

  findAll({ status }: StatusArgs): Todo[] {
    if (status !== null) {
      return this.todos.filter((todo) => todo.done == status);
    }

    return this.todos;
  }

  // findAll({ status }: StatusArgs): Todo[] {
  //   if (status !== undefined)
  //     return this.todos.filter((todo) => todo.done === status);
  //   return this.todos;
  // }

  findOne(id: number): Todo {
    let todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo by id:${id} not found`);

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    //const { description } = createTodoInput;
    const maxId: number = Math.max(...this.todos.map(({ id }) => id), 0) + 1;
    const todo = new Todo();
    todo.id = maxId;
    todo.description = createTodoInput.description;
    this.todos.push(todo);
    return todo;
  }

  update({ id, description, done }: UpdateTodoInput): Todo {
    // const { description, done, id } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((theTodo) => {
      return theTodo.id !== id ? theTodo : todoToUpdate;
    });
    return todoToUpdate;
  }

  remove(id: number): boolean {
    const todoToRemove = this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== todoToRemove.id);
    return true;
  }
}
