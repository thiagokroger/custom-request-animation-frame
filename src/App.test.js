import { render } from "@testing-library/react";
import { requestAnimationFrameMock } from "./mock_requestAnimationFrame";
import { customRequestAnimationFrame } from "./requestAnimationFrame";
import App from "./App";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

jest.mock("./requestAnimationFrame", () => ({
  customRequestAnimationFrame: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("render ball", async () => {
    customRequestAnimationFrame.mockImplementation(requestAnimationFrameMock);
    render(<App />);
    const firstCall = customRequestAnimationFrame.mock.calls.length;
    expect(firstCall).toBe(1);

    await sleep(1000);
    const secondCall = customRequestAnimationFrame.mock.calls.length;
    expect(secondCall).toBeGreaterThan(firstCall);

    await sleep(1000);
    const thirdCall = customRequestAnimationFrame.mock.calls.length;
    expect(thirdCall).toBeGreaterThan(firstCall);
    expect(thirdCall).toBeGreaterThan(secondCall);
  });
});
