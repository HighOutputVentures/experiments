import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    data: {
      id: "1",
      slug: "nokia-3310",
      name: "Nokia 3310",
      brand: "Nokia",
      image: {
        url: "https://media.istockphoto.com/id/187032210/photo/mobile-phone.jpg?s=612x612&w=0&k=20&c=EFSin3N0b1T0AvAUPWkpVbO_udrDJ-0T0nm2ETIuG-M=",
        height: 1,
        width: 1,
      },
      price: 5999,
      stocks: 15,
    },
  },
});

export default app;
