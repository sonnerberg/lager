#!/usr/bin/env node
import fetch from "node-fetch";
import { api_key, base_url } from "../config/config.js";

const fetchToken = async () => {
  const {
    data: { token },
  } = await (
    await fetch(`${base_url}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: "test@test.com",
        password: "test",
        api_key,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
  ).json();

  return token;
};

const fetchInvoices = async () => {
  const { data: invoices } = await (
    await fetch(`${base_url}/invoices?api_key=${api_key}`, {
      headers: { "x-access-token": await fetchToken() },
    })
  ).json();

  return invoices;
};

const fetchOrders = async () => {
  const { data: orders } = await (
    await fetch(`${base_url}/orders?api_key=${api_key}`)
  ).json();

  return orders;
};

const fetchOrder = async (id) => {
  const { data: order } = await (
    await fetch(`${base_url}/orders/${id}?api_key=${api_key}`)
  ).json();

  return order;
};

const getTotalPriceOfOrder = async (id) => {
  const { data: order } = await (
    await fetch(`${base_url}/orders/${id}?api_key=${api_key}`)
  ).json();
  let sum = 0;

  order.order_items.forEach((item) => {
    sum += item.amount * item.price;
  });

  return sum;
};

const createInvoice = async (order_id) => {
  const token = await fetchToken();
  const total_price = await getTotalPriceOfOrder(order_id);
  const today = new Date();
  const creation_date = today.toLocaleDateString("se");
  const days_until_due = 30;
  const due_date = new Date(
    +today.setDate(today.getDate() + days_until_due)
  ).toLocaleDateString("se");
  console.log("creation_date", creation_date);
  console.log("due_date", due_date);
  const invoice = await (
    await fetch(`${base_url}/invoices`, {
      method: "POST",
      body: JSON.stringify({
        api_key,
        order_id,
        total_price,
        creation_date,
        due_date,
      }),
      headers: { "content-type": "application/json", "x-access-token": token },
    })
  ).json();

  return invoice;
};

const deleteAllInvoices = async () => {
  const invoices = await fetchInvoices();

  invoices.forEach(async ({ id }) => {
    await fetch(`${base_url}/invoices`, {
      method: "DELETE",
      body: JSON.stringify({
        api_key,
        id,
      }),
      headers: {
        "content-type": "application/json",
        "x-access-token": await fetchToken(),
      },
    });
  });
};

console.log(await deleteAllInvoices());
console.log(await createInvoice(7307));
console.log(await fetchInvoices());
