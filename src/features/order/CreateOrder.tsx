// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionFunction,
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

import store, { AppDispatch, RootState } from "@/store";
import { fetchAddress } from "@/features/user/userSlice";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from "@/features/cart/cartSlice";

import { OrderPost } from "@/types/orderTypes";

import { createOrder } from "@/services/apiRestaurant";
import { formatCurrency } from "@/utils/helpers";

import Button from "@/ui/Button";
import EmptyCart from "@/features/cart/EmptyCart";

type OrderForm = Omit<OrderPost, "cart" | "priority" | "id"> & {
  cart: string;
  priority?: "on";
};
type PostFormError = Partial<Pick<OrderPost, "phone">>;

const CreateOrder: React.FC = () => {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state: RootState) => state.user);

  const isLoadingAdddress = addressStatus === "loading";

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData() as PostFormError;

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            name="customer"
            type="text"
            className="input grow"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              disabled={isLoadingAdddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position?.longitude && !position?.latitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAdddress}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?{" "}
            {priorityPrice !== 0 && `(+${formatCurrency(priorityPrice)})`}
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <input
            type="hidden"
            name="position"
            value={
              position?.latitude && position.longitude
                ? `${position?.latitude}, ${position?.longitude}`
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAdddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as OrderForm;

  const order: OrderPost = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);

  const errors: PostFormError = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
