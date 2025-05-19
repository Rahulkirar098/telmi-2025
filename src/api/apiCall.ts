import { instance } from './index';
import { endpoints } from './endpoints';

export const auth = {
  login: (body: any) => {
    return instance.post(endpoints.auth.loginUser, body);
  },
};

export const main = {
  getSingleProfile: (body: any) => {
    return instance.post(endpoints.main.getSingleProfile, body)
  }
}


export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkMjFkOGVjYy01YmJjLTRiZGUtYmE5OC0wZWU5MzIwMTYyMzkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc0NzY0MjA3MSwiZXhwIjoxNzQ4MjQ2ODcxfQ.P_7H_xuMWP_Q-yFZKTzGWFasPnuyxojBb14iha_m1Bc";

export const createMeeting = async ({ token }:any) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};
