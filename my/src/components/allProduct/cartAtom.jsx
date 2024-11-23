import { atom } from 'jotai';

export const cartAtom = atom(JSON.parse(localStorage.getItem("cart")) || []);