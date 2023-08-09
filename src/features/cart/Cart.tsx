import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearCart, getCart } from "./cartSlice";

import Button from "@/ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import LinkButton from "@/ui/LinkButton";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  const username = useSelector((state: RootState) => state.user.username);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.name} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
