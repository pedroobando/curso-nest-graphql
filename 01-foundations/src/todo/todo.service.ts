
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'piedra del alma', done: false },
    { id: 2, description: 'piedra del tiempo', done: false },
    { id: 3, description: 'piedra del espacio', done: false },
  ];
  create({ description }: CreateTodoDto) {
    const newTodo = new Todo();

    newTodo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    newTodo.description = description;
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id == id);
    if (!todo) {
      throw new NotFoundException(`Todo with #${id} not found`);
    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const { done, description } = updateTodoDto;

    const todo = this.findOne(id);

    todo.description = description;
    todo.done = done;

    return todo;
  }

  remove(id: number) {
    const todo = this.findOne(id);

    this.todos.splice(id - 1, 1);
    return true;
  }
}
