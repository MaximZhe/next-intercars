"use server";

export async function getCreateTicket({ orderId }: { orderId: string | string[] | undefined }) {
  const data = {
    OrderId: orderId,
    Lang: "RUS",
  };
  try {
    const response = await fetch(
      "http://api.intercars-tickets.com/api/v1/alphabank/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );
    return response.json();
  } catch (error) {
    return error;
  }
}