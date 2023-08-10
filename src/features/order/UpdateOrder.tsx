import {
  ActionFunction,
  ActionFunctionArgs,
  useFetcher,
} from "react-router-dom";
import { updateOrder } from "@/services/apiRestaurant";
import Button from "@/ui/Button";

const UpdateOrder: React.FC = () => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export const action: ActionFunction = async ({
  params,
}: ActionFunctionArgs) => {
  if (!params.orderId) return null;

  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
};
