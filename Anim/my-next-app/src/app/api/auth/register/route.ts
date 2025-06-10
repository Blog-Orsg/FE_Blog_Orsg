/* eslint-disable */
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const body = await request.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const userExistsResponse = await fetch(
    `${process.env.API_BASE_URL}/users/check-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!userExistsResponse.ok) {
    const errorData = await userExistsResponse.json();
    return new NextResponse(errorData.message || "Error checking email", {
      status: userExistsResponse.status,
    });
  }

  const userExists = await userExistsResponse.json();
  if (userExists.exists) {
    return new NextResponse("Email already exists", { status: 400 });
  }

  // Create the user by calling the external API
  const createUserResponse = await fetch(`${process.env.API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password, // Send the raw password directly
    }),
  });

  if (!createUserResponse.ok) {
    const errorData = await createUserResponse.json();
    return new NextResponse(errorData.message || "Error when register", {
      status: createUserResponse.status,
    });
  }

  const createdUser = await createUserResponse.json();
  return new NextResponse(JSON.stringify(createdUser), { status: 201 });
}
