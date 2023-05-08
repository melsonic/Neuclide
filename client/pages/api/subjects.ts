export default function handler(req, res) {
  res.status(200).json(
    [
      {
        id: 1,
        name: "digital image processing",
        present: 1,
        absent: 1,
      },
      {
        id: 2,
        name: "graphics and multimedia",
        present: 0,
        absent: 0,
      },
      {
        id: 3,
        name: "principles of programming languages",
        present: 0,
        absent: 0,
      },
      {
        id: 4,
        name: "compiler design",
        present: 0,
        absent: 0,
      },
    ],
  );
}
