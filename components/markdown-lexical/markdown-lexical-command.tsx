'use client';
import { GridSelection, LexicalCommand, NodeSelection, RangeSelection } from "lexical";

export const UPDATE_STATE_COMMAND: LexicalCommand<{ blockType: string, selection: null | RangeSelection | NodeSelection | GridSelection }> = { type: "UPDATE_STATE_COMMAND" }
