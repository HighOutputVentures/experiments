// The goal of this page is to have bad lighthouse result

import { useEffect, useState } from "react";

const Index = () => {
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);

  const data = Array.from(Array(50000)).map((_, id) => id + 1);

  // trying to emulate layout shift
  const set = async () => {
    setTimeout(() => {
      setUrl("/img1.jpg");
    }, 1000);

    setTimeout(() => {
      setShow(true);
    }, 1400);
  };

  useEffect(() => {
    set();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "50px 100px",
        textAlign: "center",
      }}
    >
      {/* Not using proper html semantics */}
      <div>Sample of an unoptimized app</div>
      <div>The goal of this page is to have bad lighthouse result</div>

      {/* Ignoring alt and not using NextImage -- Accessibility */}
      <img
        src={url}
        height={500}
        style={{
          objectFit: "cover",
        }}
      />

      {/* More layout shifts */}
      {show && (
        <div>
          <img
            src={"/face.jpg"}
            height={500}
            style={{
              objectFit: "cover",
            }}
          />
          <img
            src={url}
            height={500}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div style={{ maxHeight: 300, overflow: "auto" }}>
        <ul>
          {data.map((x, id) => (
            <li key={`${id}-${x}`}>{x}</li>
          ))}
        </ul>
      </div>

      <p>
        Id adipisicing adipisicing pariatur dolore dolor consequat ut culpa
        proident incididunt dolor nostrud ipsum. Quis ea amet ut deserunt
        consectetur laborum anim esse aliquip voluptate reprehenderit Lorem
        excepteur dolor. Eu duis commodo proident in. Qui qui id commodo Lorem
        reprehenderit. Enim qui mollit exercitation nostrud cillum voluptate
        esse ea mollit ex aute amet dolor irure.
      </p>
      <p>
        Id adipisicing adipisicing pariatur dolore dolor consequat ut culpa
        proident incididunt dolor nostrud ipsum. Quis ea amet ut deserunt
        consectetur laborum anim esse aliquip voluptate reprehenderit Lorem
        excepteur dolor. Eu duis commodo proident in. Qui qui id commodo Lorem
        reprehenderit. Enim qui mollit exercitation nostrud cillum voluptate
        esse ea mollit ex aute amet dolor irure.
      </p>
      <p>
        Id adipisicing adipisicing pariatur dolore dolor consequat ut culpa
        proident incididunt dolor nostrud ipsum. Quis ea amet ut deserunt
        consectetur laborum anim esse aliquip voluptate reprehenderit Lorem
        excepteur dolor. Eu duis commodo proident in. Qui qui id commodo Lorem
        reprehenderit. Enim qui mollit exercitation nostrud cillum voluptate
        esse ea mollit ex aute amet dolor irure.
      </p>
      <p>
        Id adipisicing adipisicing pariatur dolore dolor consequat ut culpa
        proident incididunt dolor nostrud ipsum. Quis ea amet ut deserunt
        consectetur laborum anim esse aliquip voluptate reprehenderit Lorem
        excepteur dolor. Eu duis commodo proident in. Qui qui id commodo Lorem
        reprehenderit. Enim qui mollit exercitation nostrud cillum voluptate
        esse ea mollit ex aute amet dolor irure.
      </p>
      <p>
        Id adipisicing adipisicing pariatur dolore dolor consequat ut culpa
        proident incididunt dolor nostrud ipsum. Quis ea amet ut deserunt
        consectetur laborum anim esse aliquip voluptate reprehenderit Lorem
        excepteur dolor. Eu duis commodo proident in. Qui qui id commodo Lorem
        reprehenderit. Enim qui mollit exercitation nostrud cillum voluptate
        esse ea mollit ex aute amet dolor irure.
      </p>
      <p>
        Id adipisicing adipisicing pariatur dolore dolor consequat ut culpa
        proident incididunt dolor nostrud ipsum. Quis ea amet ut deserunt
        consectetur laborum anim esse aliquip voluptate reprehenderit Lorem
        excepteur dolor. Eu duis commodo proident in. Qui qui id commodo Lorem
        reprehenderit. Enim qui mollit exercitation nostrud cillum voluptate
        esse ea mollit ex aute amet dolor irure.
      </p>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  // adding delay to trigger bad ttfb

  await new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 2000);
  });
  return {
    props: {},
  };
}
