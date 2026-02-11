import { Elysia } from "elysia";
import { z } from "zod";
import openapi from "@elysiajs/openapi";
import { betterAuthPlugin, OpenAPI, Session } from "./plugins/better-auth";
import cors from "@elysiajs/cors";

const MainServer = new Elysia()
  .use(
    cors({
      origin: "http://localhost:4040",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths()
    }
  }))
  .use(betterAuthPlugin)
  .get("/", () => "Hello Elysia\n")
  .get("/users/:id", ({ params, session }: { params: any, session: Session }) => {
    const userId = params.id;

    // const authenticatedUser = session.user.name;

    return { id: userId, name: 'Matheus Alexandre' }
  }, {   
    auth: true,
    detail: {
      summary: "Get user by ID",
      tags: ["User"]
    },
    params: z.object({
      id: z.string()
    }),
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
  .listen(4040);


console.log(
  `🦊 Elysia is running at http://${MainServer.server?.hostname}:${MainServer.server?.port}`
);
