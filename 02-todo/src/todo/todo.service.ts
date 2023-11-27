import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo } from './entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Espacio', done: false },
    { id: 3, description: 'Piedra del Poder', done: false },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    let todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      todo = null;
      throw new BadRequestException(`Todo by id:${id} not found`);
    }
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

  update(id: number, updateTodoInput: UpdateTodoInput): Todo {
    const { description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    return todoToUpdate;
  }

  remove(id: number): boolean {
    try {
      const todoToRemove = this.findOne(id);
      this.todos = this.todos.filter((todo) => todo.id !== todoToRemove.id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
