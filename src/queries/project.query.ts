export const PROEJCTS_QUERY = {
  SELECT_PROJECTS:
    "SELECT * FROM projectdb.project ORDER BY created_at DESC LIMIT 50",
  SELECT_PROEJCT: "SELECT * FROM projectdb.project WHERE id = ?",
  CREATE_PROEJCT:
    "INSERT INTO projectdb.project(first_name, last_name, email, address, diagnosis, phone, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
  UPDATE_PROEJCT:
    "UPDATE projectdb.project SET first_name = ?, last_name = ?, email = ?, address = ?, diagnosis = ?, phone = ?, status = ?, image_url = ? WHERE id = ?",
  DELETE_PROEJCT: "DELETE FROM projectdb.project WHERE id = ?",
}
