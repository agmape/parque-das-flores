/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { DISPONIVEIS, RESERVADOS, VENDIDOS } from "./Disponibilidade";

describe("Disponibilidade do mapa de 13/10/2026", () => {
  test("58 marcações verdes disponíveis", () => expect(DISPONIVEIS).toBe(58));
  test("153 marcações amarelas reservadas", () => expect(RESERVADOS).toBe(153));
  test("24 marcações vermelhas vendidas", () => expect(VENDIDOS).toBe(24));
  test("as marcações somam os 235 lotes", () => expect(DISPONIVEIS + RESERVADOS + VENDIDOS).toBe(235));
});