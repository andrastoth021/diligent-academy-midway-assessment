import { AppError } from "./app.error";
import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if (args.length > 0) throw new AppError('Error: The list command should not have any argument.');
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, args: string[]) {
  if (args.length !== 1) throw new AppError('Error: The details command should only have one argument.');
  const id: number = parseInt(args[0]);
  if (typeof id !== 'number') throw new AppError('Error: The argument is not a number. The details command only accepts one numeric argument.');
  
  const recipe = new Recipe(store);
  const foundRecipe: RecipeType = await recipe.getById(id);

  console.log(`ID: ${foundRecipe.id}`);
  console.log(`Name: ${foundRecipe.name}`);
}