import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { LinkButton } from "./LinkButton";

function Error() {
  const error = useRouteError();
  console.log(error);

  const errorMessage = isRouteErrorResponse(error)
    ? error.data
    : (error as Error)?.message || "Unknown Error";

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
