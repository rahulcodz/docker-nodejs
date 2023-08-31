import express, { Request, Response, Application } from "express"
import ip from "ip"
import cors from "cors"
import "dotenv/config"
import userRoutes from "./routes/user.routes"
import proejctRoutes from "./routes/project.routes"
import { HttpResponse } from "./domains/response"
import { Code } from "./enums/code.enum"
import { Status } from "./enums/status.enum"

export class App {
  private readonly app: Application
  private readonly APPLICATION_RUNNING = "application is running on:"
  private readonly ROUTE_NOT_FOUND = "Route does not exist on the server"

  constructor(
    private readonly port: string | number = process.env.SERVER_PORT || 8800
  ) {
    this.app = express()
    this.middleWare()
    this.routes()
  }

  listen(): void {
    this.app.listen(this.port)
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`)
  }
  private middleWare(): void {
    this.app.use(cors({ origin: "*" }))
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use("/project", proejctRoutes)
    this.app.use("/user", userRoutes)
    this.app.get("/", (_: Request, res: Response) =>
      res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            "Requested generated successfully"
          )
        )
    )
    this.app.all("*", (_: Request, res: Response) =>
      res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            this.ROUTE_NOT_FOUND
          )
        )
    )
  }
}
