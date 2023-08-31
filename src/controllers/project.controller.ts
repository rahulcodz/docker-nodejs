import { Request, Response } from "express"
import { HttpResponse } from "../domains/response"
import { Code } from "../enums/code.enum"
import { Status } from "../enums/status.enum"
import { PROEJCTS_QUERY } from "../queries/project.query"
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2"
import { connection } from "../configs/mysql.config"
import { Project } from "../interfaces/project"

type ResultSet = [
  RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader,
  FieldPacket[]
]

export const createProject = async (
  req: Request,
  res: Response
): Promise<Response<Project>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  )
  let patient: Project = { ...req.body }
  try {
    const pool = await connection()
    const result: ResultSet = await pool.query(
      PROEJCTS_QUERY.CREATE_PROEJCT,
      Object.values(patient)
    )
    patient = { id: (result[0] as ResultSetHeader).insertId, ...req.body }
    return res
      .status(Code.CREATED)
      .send(
        new HttpResponse(
          Code.CREATED,
          Status.CREATED,
          "Patient created",
          patient
        )
      )
  } catch (error: unknown) {
    console.error(error)
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occurred"
        )
      )
  }
}

export const deleteProject = async (
  req: Request,
  res: Response
): Promise<Response<Project>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  )
  try {
    const pool = await connection()
    const result: ResultSet = await pool.query(PROEJCTS_QUERY.SELECT_PROEJCT, [
      req.params.patientId,
    ])
    if ((result[0] as Array<any>).length > 0) {
      const result: ResultSet = await pool.query(
        PROEJCTS_QUERY.DELETE_PROEJCT,
        [req.params.patientId]
      )
      return res
        .status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, "Patient deleted"))
    } else {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            "Patient not found"
          )
        )
    }
  } catch (error: unknown) {
    console.error(error)
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occurred"
        )
      )
  }
}

export const getProject = async (
  req: Request,
  res: Response
): Promise<Response<Project>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  )
  try {
    const pool = await connection()
    const result: ResultSet = await pool.query(PROEJCTS_QUERY.SELECT_PROEJCT, [
      req.params.patientId,
    ])
    if ((result[0] as Array<any>).length > 0) {
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(Code.OK, Status.OK, "Project retrieved", result[0])
        )
    } else {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            "Project not found"
          )
        )
    }
  } catch (error: unknown) {
    console.error(error)
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occurred"
        )
      )
  }
}

export const getProjects = async (
  req: Request,
  res: Response
): Promise<Response<Project[]>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  )
  try {
    const pool = await connection()
    const result: ResultSet = await pool.query(PROEJCTS_QUERY.SELECT_PROJECTS)
    return res
      .status(Code.OK)
      .send(
        new HttpResponse(Code.OK, Status.OK, "Project retrieved", result[0])
      )
  } catch (error: unknown) {
    console.error(error)
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occurred"
        )
      )
  }
}

export const updateProject = async (
  req: Request,
  res: Response
): Promise<Response<Project>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  )
  let patient: Project = { ...req.body }
  try {
    const pool = await connection()
    const result: ResultSet = await pool.query(PROEJCTS_QUERY.UPDATE_PROEJCT, [
      req.params.patientId,
    ])
    if ((result[0] as Array<any>).length > 0) {
      const result: ResultSet = await pool.query(
        PROEJCTS_QUERY.UPDATE_PROEJCT,
        [...Object.values(patient), req.params.patientId]
      )
      return res.status(Code.OK).send(
        new HttpResponse(Code.OK, Status.OK, "Patient updated", {
          ...patient,
          id: req.params.patientId,
        })
      )
    } else {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            "Patient not found"
          )
        )
    }
  } catch (error: unknown) {
    console.error(error)
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occurred"
        )
      )
  }
}
