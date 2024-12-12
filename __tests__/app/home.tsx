import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders home page", () => {
  render(<Home />);

  expect(screen.getByText("Hola soy la página de inicio")).toBeInTheDocument();
});
