import type { NextRequest } from "next/server";

function parseOperand(value: string | null): number {
  const input = value?.trim() ?? "";
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(input)) {
    return Number.NaN;
  }
  return Number(input);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const a = parseOperand(searchParams.get("a"));
  const b = parseOperand(searchParams.get("b"));
  const operation = searchParams.get("operation");

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return Response.json({ error: "Invalid numbers" }, { status: 400 });
  }

  let result: number;
  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b === 0) {
        return Response.json({ error: "Cannot divide by zero" }, { status: 400 });
      }
      result = a / b;
      break;
    default:
      return Response.json({ error: "Invalid operation" }, { status: 400 });
  }

  if (!Number.isFinite(result)) {
    return Response.json({ error: "Result is out of range" }, { status: 400 });
  }

  return Response.json({ a, b, operation, result });
}
