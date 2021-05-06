import { render } from "@testing-library/react";
import App, { AppProps } from ".";

const renderApp = (props: Partial<AppProps> = {}) => {
  const defaultProps: AppProps = {
    rootStyle: {
      flexDirection: "row",
    },
  };
  return render(<App {...defaultProps} {...props} />);
};

describe("<App />", () => {
  it("should be created", () => {
    const instance = renderApp();
    expect(instance).toBeTruthy();
  });
});
