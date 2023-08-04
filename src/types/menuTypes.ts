// const menu = {
//   id: 18,
//   name: "Tofu and Mushroom",
//   unitPrice: 15,
//   imageUrl:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-18.jpg",
//   ingredients: ["marinara", "mozzarella", "tofu", "mushrooms", "bell peppers"],
//   soldOut: false,
// };

export interface Pizza {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}
