// CONTRACT — see docs/SPEC.md §4 and §5 (data model)
// Exports: createTask(task), updateTask(id, changes), deleteTask(id),
//          listTasks(rangeStart, rangeEnd), subscribeToTasks(callback)
// Depends on: supabase-client.js (only its exported `supabase` object)
//
// STATUS: not yet implemented — Sprint 1

export async function createTask(task) { throw new Error('not implemented'); }
export async function updateTask(id, changes) { throw new Error('not implemented'); }
export async function deleteTask(id) { throw new Error('not implemented'); }
export async function listTasks(rangeStart, rangeEnd) { throw new Error('not implemented'); }
export function subscribeToTasks(callback) { throw new Error('not implemented'); }
