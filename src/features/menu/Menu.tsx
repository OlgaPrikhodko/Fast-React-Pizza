import { useLoaderData } from "react-router-dom";

import { Pizza } from "@/types/menuTypes";
import { getMenu } from "@/services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData() as Pizza[];
  console.log(menu);
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
