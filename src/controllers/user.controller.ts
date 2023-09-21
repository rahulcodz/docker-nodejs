import { Request, Response } from "express"

class UserController {
  async registerUser(req: Request, res: Response) {
    const person = new Person("Rahul", 20)
    res.json(person)
  }

  async loginUser(req: Request, res: Response) {
    const person = new Person("Rahul", 20)
    res.json(person)
  }
}
class Person {
  name: String
  age: Number
  constructor(name: String, age: Number) {
    this.name = name
    this.age = age
  }

  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    )
  }
}

export const userController = new UserController()
