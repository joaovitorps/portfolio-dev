import { renderToStaticMarkup } from "react-dom/server";
import { CartoonButton } from "./cartoon-button";

const cartoonButtonExpectations = [
  /href="\/v1"/,
  /check `\/v1` here/,
  /bg-\[#ff6b35\]/,
  /rounded-full/,
  /overflow-hidden/,
  /right-\[-100%\]/,
  /opacity-0/,
  /group-hover:opacity-100/,
  /group-hover:right-\[200%\]/,
];

const html = renderToStaticMarkup(
  <CartoonButton href="/v1" label="check `/v1` here" color="bg-[#ff6b35]" />,
);

for (const expectation of cartoonButtonExpectations) {
  if (!expectation.test(html)) {
    throw new Error(`CartoonButton did not match ${expectation}`);
  }
}
