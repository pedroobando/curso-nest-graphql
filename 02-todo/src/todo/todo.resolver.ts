import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoServices: TodoService) {}

  //! Querys
  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() status: StatusArgs): Todo[] {
    return this.todoServices.findAll(status);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoServices.findOne(id);
  }

  //! Mutations
  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoServices.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(
    @Args('updateTodoInput')
    updateTodoInput: UpdateTodoInput,
  ) {
    console.log(updateTodoInput);
    return this.todoServices.update(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'removeTodo' })
  removeTodo(@Args('id', { type: () => Int }) id: number): boolean {
    console.log(id);
    // return true;
    return this.todoServices.remove(id);
  }

  //!Agregations
  @Query(() => Int, { name: 'totalTodo' })
  totalTodo(): number {
    return this.todoServices.totalTodos;
  }

  @Query(() => Int, { name: 'completeTodo' })
  completeTodo(): number {
    return this.todoServices.completedTodos;
  }

  @Query(() => Int, { name: 'pendingTodo' })
  pendingTodo(): number {
    return this.todoServices.pendingTodos;
  }
}
