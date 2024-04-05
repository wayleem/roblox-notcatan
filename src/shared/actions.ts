type Action_Create<T> = { id: string; data: T; type: "CREATE" }
type Action_Merge<T> = { id: string; data: Partial<T>; type: "MERGE" }
type Action_Update<T> = {
  id: string
  key: keyof T
  value: unknown
  type: "UPDATE_KEY"
}
type Action_Del = { id: string; type: "DEL" }
type Action_Flush = { id: string; type: "PING" }

export type MyActions<T> =
  | Action_Create<T>
  | Action_Merge<T>
  | Action_Update<T>
  | Action_Del
  | Action_Flush

export function create<T>(id: string, data: T): Action_Create<T> {
  return {
    type: "CREATE",
    id,
    data
  }
}

export function merge<T>(id: string, data: Partial<T>): Action_Merge<T> {
  return {
    type: "MERGE",
    id,
    data
  }
}

export function update<T>(id: string, key: keyof T, value: unknown): Action_Update<T> {
  return {
    type: "UPDATE_KEY",
    id,
    key,
    value
  }
}

export function del(id: string): Action_Del {
  return {
    type: "DEL",
    id
  }
}

export function flush(id: string): Action_Flush {
  return {
    type: "PING",
    id
  }
}


