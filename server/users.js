const users = []

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  if (users.find((user) => user.room === room && user.name === name)) {
    return { error: 'user exist' }
  }

  if (!name || !room) {
    return { error: "name and room is required" }
  }

  const user = { id, name, room }

  users.push(user)

  return { user }
}

const getUser = (id) => {

  return users.find((user) => user.id === id)

}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) return users.splice(index, 1)[0]
}

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room)
}
module.exports = { addUser, getUser, removeUser, getUsersInRoom } 