import { render, screen } from '@testing-library/react';
import Home from "./components/Home";

describe("<Home />", () => {
  it("should render view", () => {
    render(<Home />);
    expect(screen.getByTestId("home")).toMatchSnapshot();
    expect(screen.getByTestId('home')).toHaveTextContent('Scanner');
  });
});