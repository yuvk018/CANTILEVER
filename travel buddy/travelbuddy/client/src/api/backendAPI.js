// import API from "./api";
// export async function getMe() {
//   return API.get("/users/me").then((r) => r.data);
// }
// export async function updateMe(payload) {
//   return API.put("/users/me", payload).then((r) => r.data);
// }
// export async function listActivities() {
//   return API.get("/activities").then((r) => r.data);
// }
// export async function createActivity(payload) {
//   return API.post("/activities", payload).then((r) => r.data);
// }
// export async function getMatches() {
//   return API.get("/matches").then((r) => r.data);
// }
// export async function getChatRoomMessages(room) {
//   return API.get(`/chat/${room}`).then((r) => r.data);
// }
// export async function postChatMessage(room, payload) {
//   return API.post(`/chat/${room}`, payload).then((r) => r.data);
// }
import API from "./api";

export async function getMe() {
  return API.get("/users/me").then((r) => r.data);
}

export async function updateMe(payload) {
  return API.put("/users/me", payload).then((r) => r.data);
}

export async function listActivities() {
  return API.get("/activities").then((r) => r.data);
}

export async function createActivity(payload) {
  return API.post("/activities", payload).then((r) => r.data);
}

export async function getMatches() {
  return API.get("/matches").then((r) => r.data);
}

export async function getChatRoomMessages(room) {
  return API.get(`/chat/${room}`).then((r) => r.data);
}

export async function postChatMessage(room, payload) {
  return API.post(`/chat/${room}`, payload).then((r) => r.data);
}
