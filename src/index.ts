import { Elysia } from "elysia";
import { z } from "zod";
import openapi from "@elysiajs/openapi";

// const BetterAuthHandler = new Elysia().mount()


const MainServer = new Elysia()
  .get("/", () => "Hello Elysia\n")
  .get("/users/:id", ({ params }: any) => {
    const userId = params.id;
    return { id: userId, name: 'Matheus Alexandre' }
  }, {
    params: z.object({
      id: z.string()
    }),
    detail: {
      summary: "Get user by ID",
      tags: ["User"]
    },
    response: {
      200: z.object({
        id: z.string(),
        name: z.string()
      }),
      404: z.object({
        message: z.string()
      })
    }
  })
  .use(openapi())
  .listen(4040);


console.log(
  `🦊 Elysia is running at http://${MainServer.server?.hostname}:${MainServer.server?.port}`
);
